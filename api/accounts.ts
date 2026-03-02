import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';
import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

const REDIS_KEY = 'streaming:accounts';

interface Account {
  platform: string;
  idNo: string;
  accountId: string;
  inUse: boolean;
}

/**
 * 음원 사이트 아이디 관리 API
 *
 * POST /api/accounts          - 엑셀 파일에서 아이디를 파싱하여 Redis에 저장
 * GET  /api/accounts          - 저장된 전체 아이디 목록 조회
 * GET  /api/accounts?platform=멜론  - 특정 플랫폼 아이디만 조회
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const redis = await createClient({ url: process.env.REDIS_URL }).connect();

  try {
    if (req.method === 'POST') {
      return await seedAccounts(redis, res);
    }

    // GET
    return await getAccounts(redis, req, res);
  } catch (error) {
    console.error('Accounts API error:', error);
    return res.status(500).json({ error: 'Internal server error', detail: String(error) });
  } finally {
    await redis.disconnect();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function seedAccounts(redis: any, res: VercelResponse) {
  const TARGET_PLATFORMS = ['멜론', '벅스', '지니'];

  // 엑셀 파일에서 음원사이트, ID No., ID 컬럼 위치 (0-indexed: 6, 7, 8)
  const PLATFORM_COL = 6;
  const ID_NO_COL = 7;
  const ACCOUNT_ID_COL = 8;

  const filePath = path.join(process.cwd(), 'public', '김성규 음원총공팀 아이디관리(팀공유, 보안유의).xlsx');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: '엑셀 파일을 찾을 수 없습니다.' });
  }

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: (string | undefined)[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  const accounts: Account[] = [];

  for (const row of rows) {
    const platform = row[PLATFORM_COL]?.toString().trim();
    const idNo = row[ID_NO_COL]?.toString().trim();
    const accountId = row[ACCOUNT_ID_COL]?.toString().trim();

    if (!platform || !idNo || !accountId) continue;
    if (!TARGET_PLATFORMS.includes(platform)) continue;

    accounts.push({
      platform,
      idNo,
      accountId,
      inUse: false,
    });
  }

  if (accounts.length === 0) {
    return res.status(400).json({ error: '파싱된 아이디가 없습니다.' });
  }

  await redis.set(REDIS_KEY, JSON.stringify(accounts));

  const summary = TARGET_PLATFORMS.reduce(
    (acc, p) => {
      acc[p] = accounts.filter((a) => a.platform === p).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return res.status(200).json({
    ok: true,
    total: accounts.length,
    summary,
    message: 'Redis에 아이디 목록이 저장되었습니다.',
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getAccounts(redis: any, req: VercelRequest, res: VercelResponse) {
  const data = await redis.get(REDIS_KEY);

  if (!data) {
    return res.status(404).json({ error: '저장된 아이디가 없습니다. POST /api/accounts 를 먼저 호출하세요.' });
  }

  const accounts: Account[] = JSON.parse(data);

  const platform = req.query.platform as string | undefined;
  const filtered = platform ? accounts.filter((a) => a.platform === platform) : accounts;

  return res.status(200).json({
    total: filtered.length,
    accounts: filtered,
  });
}
