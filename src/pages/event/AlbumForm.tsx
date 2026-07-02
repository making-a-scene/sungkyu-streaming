import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import './tourMemoryForm.css';
import './messageForm.css';
import './albumForm.css';
import { getStoredLang, eventMessages, formatCount } from '../../data/eventLocale';
import { albumFormMessages, ALBUM_MAX_MOMENT, ALBUM_MAX_REASON } from '../../data/albumFormLocale';
import { OTM_TRACKS, formatTrackTitle, type EventCounts } from '../../data/eventForms';
import { usePreventZoom } from '../../hooks/usePreventZoom';
import { isValidEmail } from '../../utils/validateEmail';
import AutoGrowTextarea from '../../components/AutoGrowTextarea';

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MEMORY_IMG = process.env.PUBLIC_URL + '/event/ccff584c723a2504004a0abf2afdd8155377bf0d.png';
const LETTER_IMG = process.env.PUBLIC_URL + '/event/631f4974ef0a745dd01d2a214cbc20870d7582fd.png';
const DONE_CHECK = process.env.PUBLIC_URL + '/event/a6e250c4399efd85c898730916d0caa8ee959082.svg';

type Step = 'consent' | 'write' | 'review' | 'done';
interface SongEntry {
  trackId: number;
  title: string;
  reason: string;
}

const AlbumForm: React.FC = () => {
  const navigate = useNavigate();
  const lang = getStoredLang();
  const t = albumFormMessages[lang];
  const em = eventMessages[lang];

  usePreventZoom();

  const [step, setStep] = useState<Step>('consent');
  const [moment, setMoment] = useState('');
  const [songs, setSongs] = useState<SongEntry[]>([]);
  const [consentData, setConsentData] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [consentEmail, setConsentEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [counts, setCounts] = useState<EventCounts | null>(null);

  useEffect(() => {
    fetch('/api/submissions?action=counts')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setCounts(d as EventCounts))
      .catch(() => {});
  }, []);

  // 단계 전환 시 페이지 최상단으로 (body 가 스크롤 컨테이너라 함께 리셋)
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [step]);

  const selectedIds = songs.map((s) => s.trackId);
  const anyFilled = !!(moment.trim() || songs.length > 0);
  const canSubmit = !submitting && (email.trim() === '' || (isValidEmail(email) && consentEmail));

  const addSong = (trackId: number) => {
    const tr = OTM_TRACKS.find((x) => x.id === trackId);
    if (!tr) return;
    setSongs((prev) => [...prev, { trackId, title: formatTrackTitle(tr), reason: '' }]);
  };
  const changeSong = (i: number, trackId: number) => {
    const tr = OTM_TRACKS.find((x) => x.id === trackId);
    if (!tr) return;
    setSongs((prev) => prev.map((s, idx) => (idx === i ? { ...s, trackId, title: formatTrackTitle(tr) } : s)));
  };
  const updateReason = (i: number, reason: string) => {
    setSongs((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, reason: reason.slice(0, ALBUM_MAX_REASON) } : s)),
    );
  };

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const r = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'album',
          lang,
          data: {
            nickname: nickname.trim() || undefined,
            email: email.trim() || undefined,
            whyLike: moment,
            songs,
          },
        }),
      });
      if (!r.ok) throw new Error();
      setStep('done');
      window.scrollTo(0, 0);
    } catch {
      toast.error(t.submitError, { autoClose: 2000, hideProgressBar: true });
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- 작성 ----------
  const renderWrite = () => (
    <div className="tour-body-inner">
      <div className="msg-guides">
        {t.guides.map((g, i) => (
          <div key={i} className="msg-guide-item">
            <CheckIcon />
            <span>{g}</span>
          </div>
        ))}
      </div>

      <div className="otm-write-group">
        <div className="msg-field">
          <div className="msg-field-head">
            <p className="msg-field-title">{t.momentTitle}</p>
            <p className="msg-field-subtitle">{t.momentSubtitle}</p>
          </div>
          <div className="msg-field-input">
            <AutoGrowTextarea
              className="msg-field-textarea msg-field-textarea-lg"
              value={moment}
              onChange={(e) => setMoment(e.target.value.slice(0, ALBUM_MAX_MOMENT))}
              placeholder={t.momentPlaceholder}
            />
            <span className="msg-field-count">{moment.length}/{ALBUM_MAX_MOMENT}자</span>
          </div>
        </div>

        <div className="otm-songs-box">
          <p className="otm-songs-title">{t.songsTitle}</p>
          {songs.map((s, i) => (
            <div key={i} className="otm-song">
              <div className="otm-select-wrap">
                <select
                  className="otm-select"
                  value={s.trackId}
                  onChange={(e) => changeSong(i, Number(e.target.value))}
                >
                  {OTM_TRACKS.filter((tr) => tr.id === s.trackId || !selectedIds.includes(tr.id)).map(
                    (tr) => (
                      <option key={tr.id} value={tr.id}>{formatTrackTitle(tr)}</option>
                    ),
                  )}
                </select>
                <span className="otm-select-arrow"><ChevronDown /></span>
              </div>
              <div className="msg-field-input">
                <AutoGrowTextarea
                  className="msg-field-textarea"
                  value={s.reason}
                  onChange={(e) => updateReason(i, e.target.value)}
                  placeholder={t.songReasonPlaceholder}
                />
                <span className="msg-field-count">{s.reason.length}/{ALBUM_MAX_REASON}자</span>
              </div>
            </div>
          ))}
          {songs.length < OTM_TRACKS.length && (
            <div className="otm-song">
              <div className="otm-select-wrap">
                <select
                  className="otm-select otm-select-empty"
                  value=""
                  onChange={(e) => {
                    if (e.target.value) addSong(Number(e.target.value));
                  }}
                >
                  <option value="" disabled hidden>{t.songSelect}</option>
                  {OTM_TRACKS.filter((tr) => !selectedIds.includes(tr.id)).map((tr) => (
                    <option key={tr.id} value={tr.id}>{formatTrackTitle(tr)}</option>
                  ))}
                </select>
                <span className="otm-select-arrow"><ChevronDown /></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ---------- 동의 ----------
  const renderConsent = () => (
    <div className="tour-body-inner">
      <p className="tour-prompt">{t.consentTitle}</p>
      <div className="tour-consent-box">
        {t.consentIntro.map((p, i) => <p key={`in${i}`} className="tour-consent-p">{p}</p>)}
        <p className="tour-consent-sub">{t.consentCautionTitle}</p>
        <ul className="tour-consent-list">
          {t.consentCautions.map((p, i) => <li key={`c${i}`}>{p}</li>)}
        </ul>
        <p className="tour-consent-sub">{t.consentUseTitle}</p>
        <ul className="tour-consent-list">
          {t.consentUses.map((p, i) => <li key={`u${i}`}>{p}</li>)}
        </ul>
        {t.consentOutro.map((p, i) => <p key={`out${i}`} className="tour-consent-p">{p}</p>)}
      </div>
      <button
        type="button"
        className={`tour-check-row${consentData ? ' checked' : ''}`}
        onClick={() => setConsentData((v) => !v)}
      >
        <span className="tour-check-box">{consentData && <CheckIcon />}</span>
        <span className="tour-check-label">{t.consentCheck}</span>
      </button>
    </div>
  );

  // ---------- 제출 확인 ----------
  const renderReview = () => (
    <div className="tour-body-inner">
      <p className="tour-prompt">{t.reviewTitle}</p>
      <div className="tour-email-box">
        <p className="tour-email-title">{t.nicknameTitle}</p>
        <p className="tour-email-desc">{t.nicknameDesc}</p>
        <input
          className="tour-email-input"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder={t.nicknamePlaceholder}
        />
      </div>
      <div className="tour-email-box">
        <p className="tour-email-title">{t.emailTitle}</p>
        <p className="tour-email-desc">{t.emailDesc}</p>
        <input
          type="email"
          className="tour-email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
        />
        {email.trim() !== '' && !isValidEmail(email) && (
          <p className="tour-email-error">{em.emailInvalid}</p>
        )}
      </div>
      {email.trim() !== '' && (
        <div className="tour-email-consent">
          <p className="tour-email-consent-title">{t.emailConsentTitle}</p>
          <ul className="tour-consent-list">
            {t.emailConsentItems.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
          <button
            type="button"
            className={`tour-check-row${consentEmail ? ' checked' : ''}`}
            onClick={() => setConsentEmail((v) => !v)}
          >
            <span className="tour-check-box">{consentEmail && <CheckIcon />}</span>
            <span className="tour-check-label">{t.emailConsentCheck}</span>
          </button>
        </div>
      )}
    </div>
  );

  // ---------- 완료 ----------
  const renderDone = () => (
    <div className="tour-body-inner tour-done">
      <div className="tour-done-message">
        <img className="tour-done-check" src={DONE_CHECK} alt="" />
        <div className="tour-done-heading">
          <p>{t.doneTitle}</p>
          <p>{t.doneSub}</p>
        </div>
      </div>
    </div>
  );

  // ---------- 하단 네비 ----------
  const renderNav = () => {
    if (step === 'consent') {
      return (
        <div className="tour-nav">
          <button type="button" className="tour-nav-back" onClick={() => navigate('/')}>
            <ChevronLeft /> {t.backHome}
          </button>
          <button type="button" className="tour-nav-next" disabled={!consentData} onClick={() => { setStep('write'); window.scrollTo(0, 0); }}>
            {t.cont} <ChevronRight />
          </button>
        </div>
      );
    }
    if (step === 'write') {
      return (
        <div className="tour-nav">
          <button type="button" className="tour-nav-back" onClick={() => { setStep('consent'); window.scrollTo(0, 0); }}>
            <ChevronLeft /> {t.backConsent}
          </button>
          <button type="button" className="tour-nav-next" disabled={!anyFilled} onClick={() => { setStep('review'); window.scrollTo(0, 0); }}>
            {t.writeComplete} <ChevronRight />
          </button>
        </div>
      );
    }
    if (step === 'review') {
      return (
        <div className="tour-nav">
          <button type="button" className="tour-nav-back" onClick={() => { setStep('write'); window.scrollTo(0, 0); }}>
            <ChevronLeft /> {t.backWrite}
          </button>
          <button type="button" className="tour-nav-next" disabled={!canSubmit} onClick={submit}>
            {submitting ? t.submitting : t.submit} <ChevronRight />
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="tour-form">
      <Header />
      <div className="tour-form-titlebar">
        <span>{t.title}</span>
      </div>
      <main className="tour-form-body">
        {step === 'consent' && renderConsent()}
        {step === 'write' && renderWrite()}
        {step === 'review' && renderReview()}
        {step === 'done' && renderDone()}
      </main>
      {step !== 'done' && renderNav()}
    </div>
  );
};

export default AlbumForm;
