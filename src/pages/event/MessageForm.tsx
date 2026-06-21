import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import './tourMemoryForm.css'; // 공통 폼 스타일(tour-*) 재사용
import './messageForm.css';
import { getStoredLang, eventMessages, formatCount } from '../../data/eventLocale';
import {
  messageFormMessages,
  MSG_MAX_WHY,
  MSG_MAX_STAGE,
  MSG_MAX_LETTER,
  MSG_MAX_ABOUT,
} from '../../data/messageFormLocale';
import type { EventCounts } from '../../data/eventForms';
import { usePreventZoom } from '../../hooks/usePreventZoom';

// ---------- 인라인 아이콘 ----------
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
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MEMORY_IMG = process.env.PUBLIC_URL + '/event/ccff584c723a2504004a0abf2afdd8155377bf0d.png';
const OTM_IMG = process.env.PUBLIC_URL + '/event/961578577c85d6ce53e83cd38fdbc6d7a50249e0.png';

type Step = 'write' | 'consent' | 'review' | 'done';

const MessageForm: React.FC = () => {
  const navigate = useNavigate();
  const lang = getStoredLang();
  const t = messageFormMessages[lang];
  const em = eventMessages[lang];

  usePreventZoom();

  const [step, setStep] = useState<Step>('consent');
  const [about, setAbout] = useState('');
  const [whyLike, setWhyLike] = useState('');
  const [bestStage, setBestStage] = useState('');
  const [letter, setLetter] = useState('');
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

  const anyFilled = !!(about.trim() || whyLike.trim() || bestStage.trim() || letter.trim());
  const canSubmit = !submitting && (email.trim() === '' || consentEmail);

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const r = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'message',
          lang,
          data: {
            nickname: nickname.trim() || undefined,
            email: email.trim() || undefined,
            aboutSungkyu: about,
            whyLike,
            bestStage,
            letter,
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

      <div className="msg-about">
        <span className="msg-about-label">{t.aboutLabel}</span>
        <input
          className="msg-about-input"
          value={about}
          onChange={(e) => setAbout(e.target.value.slice(0, MSG_MAX_ABOUT))}
          placeholder={t.aboutPlaceholder}
        />
        <span className="msg-about-suffix">{t.aboutSuffix}</span>
      </div>

      <div className="msg-field">
        <p className="msg-field-title">{t.whyLikeTitle}</p>
        <div className="msg-field-input">
          <textarea
            className="msg-field-textarea"
            value={whyLike}
            onChange={(e) => setWhyLike(e.target.value.slice(0, MSG_MAX_WHY))}
            placeholder={t.whyLikePlaceholder}
          />
          <span className="msg-field-count">{whyLike.length}/{MSG_MAX_WHY}자</span>
        </div>
      </div>

      <div className="msg-field">
        <p className="msg-field-title">{t.bestStageTitle}</p>
        <div className="msg-field-input">
          <textarea
            className="msg-field-textarea"
            value={bestStage}
            onChange={(e) => setBestStage(e.target.value.slice(0, MSG_MAX_STAGE))}
            placeholder={t.bestStagePlaceholder}
          />
          <span className="msg-field-count">{bestStage.length}/{MSG_MAX_STAGE}자</span>
        </div>
      </div>

      <div className="msg-field">
        <p className="msg-field-title">{t.letterTitle}</p>
        <div className="msg-field-input">
          <textarea
            className="msg-field-textarea msg-field-textarea-lg"
            value={letter}
            onChange={(e) => setLetter(e.target.value.slice(0, MSG_MAX_LETTER))}
            placeholder={t.letterPlaceholder}
          />
          <span className="msg-field-count">{letter.length}/{MSG_MAX_LETTER}자</span>
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
      <div className="tour-done-check"><CheckIcon /></div>
      <p className="tour-done-title">{t.doneTitle}</p>
      <p className="tour-done-sub">{t.doneSub}</p>
      <p className="tour-done-more">{t.doneMore}</p>
      <div className="tour-done-cards">
        <button type="button" className="tour-done-card" onClick={() => navigate('/event/memory')}>
          <span className="tour-done-card-title">{em.cards.memory.title}</span>
          <span className="tour-done-card-desc">{em.cards.memory.desc}</span>
          <img src={MEMORY_IMG} alt="" />
          <span className="tour-done-card-btn">
            {em.cards.memory.cta}
            <em>{formatCount(em.cards.memory.countLabel, counts?.tourPhotosTotal ?? 0)}</em>
          </span>
        </button>
        <button type="button" className="tour-done-card" onClick={() => navigate('/')}>
          <span className="tour-done-card-title">{em.cards.otm.title}</span>
          <span className="tour-done-card-desc">{em.cards.otm.desc}</span>
          <img src={OTM_IMG} alt="" />
          <span className="tour-done-card-btn">
            {em.cards.otm.cta}
            <em>{formatCount(em.cards.otm.countLabel, counts?.album ?? 0)}</em>
          </span>
        </button>
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
        {step === 'write' && renderWrite()}
        {step === 'consent' && renderConsent()}
        {step === 'review' && renderReview()}
        {step === 'done' && renderDone()}
      </main>
      {step !== 'done' && renderNav()}
    </div>
  );
};

export default MessageForm;
