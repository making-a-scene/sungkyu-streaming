import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import ImagePopup from '../../components/ImagePopup';
import { uploadImage } from '../../utils/uploadImage';
import './tourMemoryForm.css';
import './fanartForm.css';
import { getStoredLang, eventMessages } from '../../data/eventLocale';
import { fanartFormMessages, FANART_MAX_MESSAGE } from '../../data/fanartFormLocale';
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
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 15V4M12 4l-4 4M12 4l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DONE_CHECK = process.env.PUBLIC_URL + '/event/a6e250c4399efd85c898730916d0caa8ee959082.svg';

type Step = 'consent' | 'write' | 'review' | 'done';

const FanartForm: React.FC = () => {
  const navigate = useNavigate();
  const lang = getStoredLang();
  const t = fanartFormMessages[lang];
  const em = eventMessages[lang];

  usePreventZoom();

  const [step, setStep] = useState<Step>('consent');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [message, setMessage] = useState('');
  const [consentData, setConsentData] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [consentEmail, setConsentEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [popup, setPopup] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // 단계 전환 시 페이지 최상단으로 (body 가 스크롤 컨테이너라 함께 리셋)
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [step]);

  const canSubmit = !submitting && !!imageFile && (email.trim() === '' || (isValidEmail(email) && consentEmail));

  // 이미지 선택 (업로드는 제출 시)
  const handleFile = (files: FileList | null) => {
    if (!files || !files[0]) return;
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(files[0]);
    setImagePreview(URL.createObjectURL(files[0]));
    if (fileRef.current) fileRef.current.value = '';
  };

  const submit = async () => {
    if (!canSubmit || !imageFile) return;
    setSubmitting(true);
    try {
      // 제출 시점에 이미지 압축 후 업로드 (서버 경유 → CORS 없음)
      const imageUrl = await uploadImage(imageFile);
      const r = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'fanart',
          lang,
          data: {
            nickname: nickname.trim() || undefined,
            email: email.trim() || undefined,
            imageUrl,
            message,
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
      <p className="tour-prompt">{t.uploadTitle}</p>
      {imagePreview ? (
        <div className="fanart-preview">
          <img src={imagePreview} alt="" onClick={() => setPopup(imagePreview)} />
          <button
            type="button"
            className="fanart-remove"
            onClick={() => {
              URL.revokeObjectURL(imagePreview);
              setImageFile(null);
              setImagePreview('');
            }}
          >
            <CloseIcon />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="fanart-upload-box"
          onClick={() => fileRef.current?.click()}
        >
          <UploadIcon />
          <span className="fanart-upload-cta">{t.uploadCta}</span>
          <span className="fanart-upload-hint">{t.uploadHint}</span>
        </button>
      )}
      <div className="tour-message-box">
        <AutoGrowTextarea
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, FANART_MAX_MESSAGE))}
          placeholder={t.messagePlaceholder}
        />
        <span className="tour-message-count">{message.length}/{FANART_MAX_MESSAGE}자</span>
      </div>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files)} />
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
          <button type="button" className="tour-nav-next" disabled={!imageFile} onClick={() => { setStep('review'); window.scrollTo(0, 0); }}>
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
      {popup && <ImagePopup imageSrc={popup} onClose={() => setPopup(null)} />}
    </div>
  );
};

export default FanartForm;
