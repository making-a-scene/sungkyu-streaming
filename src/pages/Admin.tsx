import React, { useState } from 'react';
import ImagePopup from '../components/ImagePopup';
import './admin.css';
import {
  TOUR_CITIES,
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
        메시지: d.message,
        '이미지 URL': d.imageUrl,
        이메일: d.email || '',
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
      };
    }
    default:
      return base;
  }
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

const DetailView: React.FC<{ sub: EventSubmission; onImage: (u: string) => void }> = ({
  sub,
  onImage,
}) => {
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
      return (
        <>
          {d.nickname && <Field label="이름/닉네임" value={d.nickname} />}
          <Field label="가장 기억에 남는 순간" value={d.whyLike} />
          <div className="admin-field">
            <span className="admin-field-label">좋아하는 곡</span>
            <div className="admin-field-value">
              {(d.songs || []).map((song, i) => (
                <div key={i} className="admin-song">
                  <b>{song.title}</b> — {song.reason || <em>이유 없음</em>}
                </div>
              ))}
            </div>
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
      return (
        <>
          {(d.cities || []).map((c, i) => (
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
        </>
      );
    }
    default:
      return null;
  }
};

const Admin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<EventFormType>('message');
  const [submissions, setSubmissions] = useState<EventSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [popupImage, setPopupImage] = useState<string | null>(null);

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
        <span className="admin-total">총 {submissions.length}건</span>
        <button className="admin-export" onClick={handleExport} disabled={!submissions.length}>
          엑셀 다운로드
        </button>
      </div>

      {loading ? (
        <p className="admin-status">불러오는 중…</p>
      ) : error ? (
        <p className="admin-error">{error}</p>
      ) : submissions.length === 0 ? (
        <p className="admin-status">아직 제출이 없습니다.</p>
      ) : (
        <div className="admin-list">
          {submissions.map((s) => (
            <div key={s.id} className="admin-card">
              <div className="admin-card-meta">
                {s.createdAt} · {s.lang.toUpperCase()}
              </div>
              <DetailView sub={s} onImage={setPopupImage} />
            </div>
          ))}
        </div>
      )}

      {popupImage && <ImagePopup imageSrc={popupImage} onClose={() => setPopupImage(null)} />}
    </div>
  );
};

export default Admin;
