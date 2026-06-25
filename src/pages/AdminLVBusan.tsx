import React, { useState } from 'react';
import ImagePopup from '../components/ImagePopup';
import './admin.css';
import {
  TOUR_CITIES,
  OTM_TRACKS,
  type EventFormType,
  type EventSubmission,
  type MessageFormData,
  type AlbumFormData,
  type FanartFormData,
  type TourFormData,
} from '../data/eventForms';

const TABS: { type: EventFormType; label: string }[] = [
  { type: 'message', label: 'To. 성규' },
  { type: 'album', label: '우리가 사랑한 OTM' },
  { type: 'fanart', label: '팬아트' },
  { type: 'tour', label: 'LV4 추억 모으기' },
];

const cityName = (id: string) => TOUR_CITIES.find((c) => c.id === id)?.name.ko ?? id;
const trackTitle = (id: number) => OTM_TRACKS.find((t) => t.id === id)?.title ?? `곡 #${id}`;

// ---- 엑셀 행 변환 (폼별) ----
const toRow = (s: EventSubmission): Record<string, string> => {
  const base: Record<string, string> = { 제출시각: s.createdAt, 언어: s.lang };
  switch (s.formType) {
    case 'message': {
      const d = s.data as MessageFormData;
      return {
        ...base,
        '이름/닉네임': d.nickname || '',
        '나에게 성규는': d.aboutSungkyu,
        '좋은 이유': d.whyLike,
        '좋았던 무대': d.bestStage,
        '성규에게': d.letter,
        '이메일': d.email || '',
      };
    }
    case 'album': {
      const d = s.data as AlbumFormData;
      return {
        ...base,
        '이름/닉네임': d.nickname || '',
        '가장 기억에 남는 순간': d.whyLike,
        '좋아하는 곡': (d.songs || []).map((x) => `${x.title}: ${x.reason}`).join(' | '),
        '이메일': d.email || '',
      };
    }
    case 'fanart': {
      const d = s.data as FanartFormData;
      return {
        ...base,
        '이름/닉네임': d.nickname || '',
        '메시지': d.message,
        '이미지 URL': d.imageUrl,
        '이메일': d.email || '',
      };
    }
    case 'tour': {
      const d = s.data as TourFormData;
      return {
        ...base,
        '도시별 기록': (d.cities || [])
          .map(
            (c) =>
              `[${cityName(c.cityId)}] ${c.message} / 사진: ${(c.photos || [])
                .map((p) => `${p.url}${p.caption ? `(${p.caption})` : ''}`)
                .join(', ')}`,
          )
          .join('  ||  '),
        '이메일': d.email || '',
      };
    }
    default:
      return base;
  }
};

// ---- 제출 데이터에서 이미지 URL 모으기 (fanart / tour 만 이미지 보유) ----
interface ImageEntry {
  url: string;
  name: string; // zip 내부 파일명
}
const extOf = (url: string) => {
  const m = url.split('?')[0].match(/\.(jpe?g|png|gif|webp|heic|bmp)$/i);
  return m ? m[0].toLowerCase() : '.jpg';
};
const collectImages = (subs: EventSubmission[]): ImageEntry[] => {
  const raw: { url: string; label: string }[] = [];
  subs.forEach((s) => {
    if (s.formType === 'fanart') {
      const d = s.data as FanartFormData;
      if (d.imageUrl) raw.push({ url: d.imageUrl, label: 'fanart' });
    } else if (s.formType === 'tour') {
      const d = s.data as TourFormData;
      (d.cities || []).forEach((c) => {
        (c.photos || []).forEach((p) => {
          if (p.url) raw.push({ url: p.url, label: cityName(c.cityId) });
        });
      });
    }
  });
  // 순번 prefix 로 파일명 중복 방지: 001_fanart.jpg, 002_부산.jpg …
  return raw.map((e, i) => ({
    url: e.url,
    name: `${String(i + 1).padStart(3, '0')}_${e.label}${extOf(e.url)}`,
  }));
};

// ---- 상세 뷰 ----
const Field: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="admin-field">
    <span className="admin-field-label">{label}</span>
    <span className="admin-field-value">{value || <em>—</em>}</span>
  </div>
);

const Thumb: React.FC<{ url: string; caption?: string; onImage: (u: string) => void }> = ({
  url,
  caption,
  onImage,
}) => (
  <figure className="admin-thumb">
    <img src={url} alt="" onClick={() => onImage(url)} />
    {caption && <figcaption>{caption}</figcaption>}
    <a className="admin-thumb-dl" href={url} target="_blank" rel="noreferrer">
      원본
    </a>
  </figure>
);

// 칩 기반 필터 바 (투어 도시 / OTM 곡 공용)
interface FilterOption {
  id: string;
  label: string;
  count: number;
}
const FilterBar: React.FC<{
  options: FilterOption[];
  selected: string | null;
  allCount: number;
  onSelect: (id: string | null) => void;
}> = ({ options, selected, allCount, onSelect }) => (
  <div className="admin-filterbar">
    <button
      className={`admin-filterbar-chip${selected === null ? ' active' : ''}`}
      onClick={() => onSelect(null)}
    >
      전체 <span className="admin-filterbar-count">{allCount}</span>
    </button>
    {options.map((o) => (
      <button
        key={o.id}
        className={`admin-filterbar-chip${selected === o.id ? ' active' : ''}`}
        onClick={() => onSelect(o.id)}
      >
        {o.label} <span className="admin-filterbar-count">{o.count}</span>
      </button>
    ))}
  </div>
);

const DetailView: React.FC<{
  sub: EventSubmission;
  onImage: (u: string) => void;
  songFilter?: number | null;
  cityFilter?: string | null;
}> = ({ sub, onImage, cityFilter, songFilter }) => {
  switch (sub.formType) {
    case 'message': {
      const d = sub.data as MessageFormData;
      return (
        <>
          {d.nickname && <Field label="이름/닉네임" value={d.nickname} />}
          <Field label="나에게 성규는 …(이)다!" value={d.aboutSungkyu} />
          <Field label="성규가 좋은 이유" value={d.whyLike} />
          <Field label="가장 좋았던 무대" value={d.bestStage} />
          <Field label="성규에게" value={d.letter} />
          {d.email && <Field label="이메일" value={d.email} />}
        </>
      );
    }
    case 'album': {
      const d = sub.data as AlbumFormData;
      const songs = songFilter
        ? (d.songs || []).filter((song) => song.trackId === songFilter)
        : d.songs || [];
      return (
        <>
          {d.nickname && <Field label="이름/닉네임" value={d.nickname} />}
          {!songFilter && <Field label="가장 기억에 남는 순간" value={d.whyLike} />}
          <div className="admin-field">
            <span className="admin-field-label">
              {songFilter ? `좋아하는 곡 — ${trackTitle(songFilter)}` : '좋아하는 곡'}
            </span>
            <div className="admin-field-value">
              {songs.map((song, i) => (
                <div key={i} className="admin-song">
                  <b>{song.title}</b> — {song.reason || <em>이유 없음</em>}
                </div>
              ))}
            </div>
            {d.email && <Field label="이메일" value={d.email} />}
          </div>
        </>
      );
    }
    case 'fanart': {
      const d = sub.data as FanartFormData;
      return (
        <>
          {d.nickname && <Field label="이름/닉네임" value={d.nickname} />}
          <Field label="메시지" value={d.message} />
          {d.imageUrl && (
            <div className="admin-thumbs">
              <Thumb url={d.imageUrl} onImage={onImage} />
            </div>
          )}
          {d.email && <Field label="이메일" value={d.email} />}
        </>
      );
    }
    case 'tour': {
      const d = sub.data as TourFormData;
      const cities = cityFilter
        ? (d.cities || []).filter((c) => c.cityId === cityFilter)
        : d.cities || [];
      return (
        <>
          {cities.map((c, i) => (
            <div key={i} className="admin-city">
              <div className="admin-city-name">{cityName(c.cityId)}</div>
              <Field label="도시 메시지" value={c.message} />
              {(c.photos || []).length > 0 && (
                <div className="admin-thumbs">
                  {c.photos.map((p, j) => (
                    <Thumb key={j} url={p.url} caption={p.caption} onImage={onImage} />
                  ))}
                </div>
              )}
            </div>
          ))}
          {d.email && <Field label="이메일" value={d.email} />}
        </>
      );
    }
    default:
      return null;
  }
};

const AdminLVBusan: React.FC = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<EventFormType>('message');
  const [submissions, setSubmissions] = useState<EventSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [popupImage, setPopupImage] = useState<string | null>(null);
  const [cityFilter, setCityFilter] = useState<string | null>(null);
  const [songFilter, setSongFilter] = useState<number | null>(null);
  const [zipping, setZipping] = useState(false);

  const load = async (type: EventFormType, pw: string): Promise<boolean> => {
    setLoading(true);
    setError('');
    try {
      const r = await fetch(`/api/submissions?type=${type}&password=${encodeURIComponent(pw)}`);
      if (r.status === 401) {
        setError('비밀번호가 올바르지 않습니다.');
        return false;
      }
      if (!r.ok) {
        setError('조회에 실패했습니다.');
        return false;
      }
      const data = await r.json();
      setSubmissions(data.submissions || []);
      return true;
    } catch {
      setError('네트워크 오류입니다. (배포 환경 또는 vercel dev 에서만 동작)');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!password) return;
    const ok = await load(activeType, password);
    if (ok) setToken(password);
  };

  const handleTab = async (type: EventFormType) => {
    setActiveType(type);
    setCityFilter(null);
    setSongFilter(null);
    if (token) await load(type, token);
  };

  const handleExport = async () => {
    if (!submissions.length) return;
    const XLSX = await import('xlsx'); // 관리자가 누를 때만 로드 (메인 번들 분리)
    const ws = XLSX.utils.json_to_sheet(submissions.map(toRow));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, activeType);
    XLSX.writeFile(wb, `submissions-${activeType}.xlsx`);
  };

  const handleDownloadImages = async () => {
    const images = collectImages(submissions);
    if (!images.length) return;
    setZipping(true);
    try {
      const JSZip = (await import('jszip')).default; // 버튼 누를 때만 로드
      const zip = new JSZip();
      let failed = 0;
      // Blob URL 은 공개 CORS 라서 클라이언트 fetch 가능. 실패분은 건너뜀.
      await Promise.all(
        images.map(async (img) => {
          try {
            const res = await fetch(img.url);
            if (res.ok) zip.file(img.name, await res.blob());
            else failed += 1;
          } catch {
            failed += 1;
          }
        }),
      );
      const blob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `images-${activeType}.zip`;
      a.click();
      URL.revokeObjectURL(a.href);
      if (failed) setError(`이미지 ${failed}건은 다운로드에 실패해 제외했습니다.`);
    } finally {
      setZipping(false);
    }
  };

  if (!token) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <h1>제출 관리</h1>
          <p>관리자 비밀번호를 입력하세요.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="비밀번호"
            autoFocus
          />
          <button onClick={handleLogin} disabled={loading || !password}>
            {loading ? '확인 중…' : '로그인'}
          </button>
          {error && <p className="admin-error">{error}</p>}
        </div>
      </div>
    );
  }

  // 항목별 제출 건수 집계 (한 제출이 같은 항목을 여러 번 담아도 1건으로 계산)
  const countBy = (keyOf: (s: EventSubmission) => (string | number)[]) =>
    submissions.reduce<Record<string, number>>((acc, s) => {
      new Set(keyOf(s)).forEach((k) => {
        acc[String(k)] = (acc[String(k)] || 0) + 1;
      });
      return acc;
    }, {});

  // 현재 탭에 담긴 이미지 개수 (fanart / tour 만 보유) — 0 이면 ZIP 버튼 숨김
  const imageCount = collectImages(submissions).length;

  // 투어 탭: 도시별 / 앨범 탭: 곡별
  const tourCityCounts =
    activeType === 'tour'
      ? countBy((s) => ((s.data as TourFormData).cities || []).map((c) => c.cityId))
      : {};
  const albumSongCounts =
    activeType === 'album'
      ? countBy((s) => ((s.data as AlbumFormData).songs || []).map((x) => x.trackId))
      : {};

  // 선택된 도시/곡 필터 적용
  const visibleSubmissions =
    activeType === 'tour' && cityFilter
      ? submissions.filter((s) =>
          ((s.data as TourFormData).cities || []).some((c) => c.cityId === cityFilter),
        )
      : activeType === 'album' && songFilter
        ? submissions.filter((s) =>
            ((s.data as AlbumFormData).songs || []).some((x) => x.trackId === songFilter),
          )
        : submissions;

  return (
    <div className="admin">
      <header className="admin-header">
        <h1>제출 관리</h1>
        <button
          className="admin-logout"
          onClick={() => {
            setToken(null);
            setPassword('');
            setSubmissions([]);
          }}
        >
          로그아웃
        </button>
      </header>

      <div className="admin-tabs">
        {TABS.map((t) => (
          <button
            key={t.type}
            className={`admin-tab${activeType === t.type ? ' active' : ''}`}
            onClick={() => handleTab(t.type)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="admin-toolbar">
        <span className="admin-total">
          총 {submissions.length}건
          {activeType === 'tour' && cityFilter && (
            <> · {cityName(cityFilter)} {visibleSubmissions.length}건</>
          )}
          {activeType === 'album' && songFilter && (
            <> · {trackTitle(songFilter)} {visibleSubmissions.length}건</>
          )}
        </span>
        <button className="admin-export" onClick={handleExport} disabled={!submissions.length}>
          엑셀 다운로드
        </button>
        {imageCount > 0 && (
          <button className="admin-export" onClick={handleDownloadImages} disabled={zipping}>
            {zipping ? '압축 중…' : `이미지 ZIP (${imageCount})`}
          </button>
        )}
      </div>

      {activeType === 'tour' && submissions.length > 0 && (
        <FilterBar
          selected={cityFilter}
          allCount={submissions.length}
          onSelect={(id) => setCityFilter(id)}
          options={TOUR_CITIES.filter((c) => tourCityCounts[c.id]).map((c) => ({
            id: c.id,
            label: c.name.ko,
            count: tourCityCounts[c.id],
          }))}
        />
      )}

      {activeType === 'album' && submissions.length > 0 && (
        <FilterBar
          selected={songFilter === null ? null : String(songFilter)}
          allCount={submissions.length}
          onSelect={(id) => setSongFilter(id === null ? null : Number(id))}
          options={OTM_TRACKS.filter((t) => albumSongCounts[t.id]).map((t) => ({
            id: String(t.id),
            label: t.title,
            count: albumSongCounts[t.id],
          }))}
        />
      )}

      {loading ? (
        <p className="admin-status">불러오는 중…</p>
      ) : error ? (
        <p className="admin-error">{error}</p>
      ) : submissions.length === 0 ? (
        <p className="admin-status">아직 제출이 없습니다.</p>
      ) : visibleSubmissions.length === 0 ? (
        <p className="admin-status">
          {activeType === 'album' ? '해당 곡의 제출이 없습니다.' : '해당 도시의 제출이 없습니다.'}
        </p>
      ) : (
        <div className="admin-list">
          {visibleSubmissions.map((s) => (
            <div key={s.id} className="admin-card">
              <div className="admin-card-meta">
                {s.createdAt} · {s.lang.toUpperCase()}
              </div>
              <DetailView
                sub={s}
                onImage={setPopupImage}
                cityFilter={cityFilter}
                songFilter={songFilter}
              />
            </div>
          ))}
        </div>
      )}

      {popupImage && <ImagePopup imageSrc={popupImage} onClose={() => setPopupImage(null)} />}
    </div>
  );
};

export default AdminLVBusan;
