// 활동기(프로 플랜)에는 `npm run cron:on`, 비활동기(Hobby 플랜)에는 `npm run cron:off`를 실행한 뒤 커밋/배포하세요.
// Vercel Hobby 플랜은 vercel.json에 crons 필드가 있으면 배포 자체가 거부되므로,
// 필드를 통째로 추가/제거하는 방식으로 크론을 활성화/비활성화합니다.
const fs = require('fs');
const path = require('path');

const VERCEL_JSON_PATH = path.join(__dirname, '..', 'vercel.json');

const CRAWL_CRON = {
  path: '/api/crawl',
  schedule: '5 * * * *',
};

function main() {
  const mode = process.argv[2];
  if (mode !== 'on' && mode !== 'off') {
    console.error('사용법: node scripts/toggle-crawl-cron.js <on|off>');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(VERCEL_JSON_PATH, 'utf8'));

  if (mode === 'on') {
    config.crons = [CRAWL_CRON];
  } else {
    delete config.crons;
  }

  fs.writeFileSync(VERCEL_JSON_PATH, JSON.stringify(config, null, 2) + '\n');
  console.log(`크론이 ${mode === 'on' ? '활성화' : '비활성화'}되었습니다. vercel.json을 커밋 후 배포하세요.`);
}

main();
