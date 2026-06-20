import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import ImagePopup from '../../components/ImagePopup';
import { uploadImage } from '../../utils/uploadImage';
import './tourMemoryForm.css';
import {
  TOUR_CITIES,
  MAX_PHOTOS_PER_CITY,
  type TourCityEntry,
  type EventCounts,
} from '../../data/eventForms';
import { getStoredLang, eventMessages, formatCount } from '../../data/eventLocale';
import { tourFormMessages } from '../../data/tourFormLocale';

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
const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 15V4M12 4l-4 4M12 4l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const LETTER_IMG = process.env.PUBLIC_URL + '/event/631f4974ef0a745dd01d2a214cbc20870d7582fd.png';
const OTM_IMG = process.env.PUBLIC_URL + '/event/961578577c85d6ce53e83cd38fdbc6d7a50249e0.png';

type Step = 'cities' | 'consent' | 'upload' | 'review' | 'done';
interface Entry {
  message: string;
  // 선택 시점엔 로컬 File + 미리보기만 보관, 제출 시 업로드한다
  photos: { file: File; preview: string; caption: string }[];
}

const MAX_MESSAGE = 428;
const emptyEntry = (): Entry => ({ message: '', photos: [] });

const TourMemoryForm: React.FC = () => {
  const navigate = useNavigate();
  const lang = getStoredLang();
  const t = tourFormMessages[lang];
  const em = eventMessages[lang];

  const [step, setStep] = useState<Step>('cities');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [consentData, setConsentData] = useState(false);
  const [entries, setEntries] = useState<Record<string, Entry>>({});
  const [uploadIndex, setUploadIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [consentEmail, setConsentEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [counts, setCounts] = useState<EventCounts | null>(null);
  const [popup, setPopup] = useState<string | null>(null);
  const [activeDot, setActiveDot] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/submissions?action=counts')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setCounts(d as EventCounts))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setActiveDot(0);
    if (carouselRef.current) carouselRef.current.scrollLeft = 0;
  }, [uploadIndex]);

  // 선택 도시(TOUR_CITIES 원래 순서 유지)
  const orderedSelected = TOUR_CITIES.filter((c) => selectedIds.includes(c.id));
  const currentCity = orderedSelected[uploadIndex];
  const getEntry = (id: string): Entry => entries[id] || emptyEntry();
  const setEntry = (id: string, e: Entry) => setEntries((prev) => ({ ...prev, [id]: e }));

  const toggleCity = (id: string) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  // ---------- 이미지 선택 (PC/모바일 공통, 업로드는 제출 시) ----------
  const handleFiles = (files: FileList | null) => {
    if (!files || !currentCity) return;
    let photos = [...getEntry(currentCity.id).photos];
    for (let i = 0; i < files.length; i++) {
      if (photos.length >= MAX_PHOTOS_PER_CITY) {
        toast.info(t.maxPhotoError, { autoClose: 1500, hideProgressBar: true });
        break;
      }
      photos = [...photos, { file: files[i], preview: URL.createObjectURL(files[i]), caption: '' }];
    }
    setEntry(currentCity.id, { ...getEntry(currentCity.id), photos });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePhoto = (idx: number) => {
    const e = getEntry(currentCity!.id);
    const target = e.photos[idx];
    if (target) URL.revokeObjectURL(target.preview);
    setEntry(currentCity!.id, { ...e, photos: e.photos.filter((_, i) => i !== idx) });
  };
  const updateCaption = (idx: number, cap: string) => {
    const e = getEntry(currentCity!.id);
    setEntry(currentCity!.id, {
      ...e,
      photos: e.photos.map((p, i) => (i === idx ? { ...p, caption: cap } : p)),
    });
  };
  const updateMessage = (msg: string) => {
    setEntry(currentCity!.id, { ...getEntry(currentCity!.id), message: msg.slice(0, MAX_MESSAGE) });
  };

  // ---------- 네비게이션 ----------
  const isLastCity = uploadIndex === orderedSelected.length - 1;
  const goNext = () => {
    if (isLastCity) {
      setStep('review');
      window.scrollTo(0, 0);
    } else {
      setUploadIndex((i) => i + 1);
    }
  };
  const goPrev = () => {
    if (uploadIndex === 0) setStep('consent');
    else setUploadIndex((i) => i - 1);
  };

  const canSubmit = !submitting && (email.trim() === '' || consentEmail);

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      // 제출 시점에 모든 사진을 업로드한다
      const cities: TourCityEntry[] = [];
      for (const c of orderedSelected) {
        const entry = getEntry(c.id);
        const photos: { url: string; caption: string }[] = [];
        for (const p of entry.photos) {
          const url = await uploadImage(p.file);
          photos.push({ url, caption: p.caption });
        }
        cities.push({ cityId: c.id, message: entry.message, photos });
      }
      const r = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'tour',
          lang,
          data: { email: email.trim() || undefined, cities },
        }),
      });
      if (!r.ok) throw new Error();
      setStep('done');
      window.scrollTo(0, 0);
    } catch {
      toast.error('제출에 실패했습니다. 다시 시도해주세요.', { autoClose: 2000, hideProgressBar: true });
    } finally {
      setSubmitting(false);
    }
  };

  const onCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const slide = el.querySelector('.tour-photo-slide') as HTMLElement | null;
    const w = slide ? slide.offsetWidth + 16 : el.offsetWidth;
    setActiveDot(Math.round(el.scrollLeft / w));
  };

  // ---------- 단계별 본문 ----------
  const renderCities = () => (
    <div className="tour-body-inner">
      <p className="tour-prompt">{t.citiesPrompt}</p>
      <div className="tour-city-grid">
        {TOUR_CITIES.map((c) => {
          const selected = selectedIds.includes(c.id);
          const n = counts?.tourPhotos?.[c.id] ?? 0;
          return (
            <button
              key={c.id}
              type="button"
              className={`tour-city-card${selected ? ' selected' : ''}`}
              onClick={() => toggleCity(c.id)}
            >
              <span className="tour-city-name">{c.name}</span>
              <span className="tour-city-date">{c.dateLabel}</span>
              <span className="tour-city-count">{t.accumulated(n)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderConsent = () => (
    <div className="tour-body-inner">
      <p className="tour-prompt">{t.consentTitle}</p>
      <div className="tour-consent-box">
        {t.consentIntro.map((p, i) => (
          <p key={`in${i}`} className="tour-consent-p">{p}</p>
        ))}
        <p className="tour-consent-sub">{t.consentCautionTitle}</p>
        <ul className="tour-consent-list">
          {t.consentCautions.map((p, i) => <li key={`c${i}`}>{p}</li>)}
        </ul>
        <p className="tour-consent-sub">{t.consentUseTitle}</p>
        <ul className="tour-consent-list">
          {t.consentUses.map((p, i) => <li key={`u${i}`}>{p}</li>)}
        </ul>
        {t.consentOutro.map((p, i) => (
          <p key={`out${i}`} className="tour-consent-p">{p}</p>
        ))}
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

  const renderUpload = () => {
    if (!currentCity) return null;
    const entry = getEntry(currentCity.id);
    const showUploadCard = entry.photos.length < MAX_PHOTOS_PER_CITY;
    const dotCount = entry.photos.length + (showUploadCard ? 1 : 0);
    return (
      <div className="tour-body-inner tour-upload">
        <p className="tour-city-title">{currentCity.name} | {currentCity.dateLabel}</p>

        <div className="tour-carousel" ref={carouselRef} onScroll={onCarouselScroll}>
          {entry.photos.map((p, idx) => (
            <div className="tour-photo-slide" key={idx}>
              <div className="tour-polaroid">
                <div className="tour-photo-wrap">
                  <img src={p.preview} alt="" onClick={() => setPopup(p.preview)} />
                  <button type="button" className="tour-photo-remove" onClick={() => removePhoto(idx)}>
                    <CloseIcon />
                  </button>
                </div>
                <input
                  className="tour-photo-caption"
                  value={p.caption}
                  onChange={(e) => updateCaption(idx, e.target.value)}
                  placeholder={t.photoMemoPlaceholder}
                  maxLength={60}
                />
              </div>
            </div>
          ))}
          {showUploadCard && (
            <div className="tour-photo-slide" key="upload">
              <div className="tour-polaroid">
                <button
                  type="button"
                  className="tour-upload-box"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadIcon />
                  <span className="tour-upload-cta">{t.uploadCta}</span>
                  <span className="tour-upload-hint">{t.uploadHint}</span>
                </button>
                <span className="tour-photo-caption-placeholder" />
              </div>
            </div>
          )}
        </div>

        {dotCount > 1 && (
          <div className="tour-dots">
            {Array.from({ length: dotCount }).map((_, i) => (
              <span key={i} className={`tour-dot${i === activeDot ? ' active' : ''}`} />
            ))}
          </div>
        )}

        <div className="tour-message-box">
          <textarea
            value={entry.message}
            onChange={(e) => updateMessage(e.target.value)}
            placeholder={t.cityMessagePlaceholder(currentCity.name)}
            maxLength={MAX_MESSAGE}
          />
          <span className="tour-message-count">{entry.message.length}/{MAX_MESSAGE}자</span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    );
  };

  const renderReview = () => (
    <div className="tour-body-inner">
      <p className="tour-prompt">{t.reviewTitle}</p>

      <div className="tour-summary">
        {orderedSelected.map((c) => {
          const e = getEntry(c.id);
          const desc = e.message.trim()
            ? t.summaryPhotosMsg(e.photos.length)
            : t.summaryPhotos(e.photos.length);
          return (
            <div key={c.id} className="tour-summary-row">
              <CheckIcon />
              <span className="tour-summary-city">{c.name}</span>
              <span className="tour-summary-desc">{desc}</span>
            </div>
          );
        })}
        <p className="tour-summary-total">{t.reviewTotal(orderedSelected.length)}</p>
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

  const renderDone = () => (
    <div className="tour-body-inner tour-done">
      <div className="tour-done-check"><CheckIcon /></div>
      <p className="tour-done-title">{t.doneTitle}</p>
      <p className="tour-done-sub">{t.doneSub}</p>
      <p className="tour-done-more">{t.doneMore}</p>
      <div className="tour-done-cards">
        <button type="button" className="tour-done-card" onClick={() => navigate('/')}>
          <span className="tour-done-card-title">{em.cards.letter.title}</span>
          <span className="tour-done-card-desc">{em.cards.letter.desc}</span>
          <img src={LETTER_IMG} alt="" />
          <span className="tour-done-card-btn">
            {em.cards.letter.cta}
            <em>{formatCount(em.cards.letter.countLabel, counts?.message ?? 0)}</em>
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
    if (step === 'cities') {
      return (
        <div className="tour-nav">
          <button type="button" className="tour-nav-back" onClick={() => navigate('/')}>
            <ChevronLeft /> {t.backHome}
          </button>
          <button
            type="button"
            className="tour-nav-next"
            disabled={selectedIds.length === 0}
            onClick={() => { setStep('consent'); window.scrollTo(0, 0); }}
          >
            {t.cont} <ChevronRight />
          </button>
        </div>
      );
    }
    if (step === 'consent') {
      return (
        <div className="tour-nav">
          <button type="button" className="tour-nav-back" onClick={() => { setStep('cities'); window.scrollTo(0, 0); }}>
            <ChevronLeft /> {t.backCities}
          </button>
          <button
            type="button"
            className="tour-nav-next"
            disabled={!consentData}
            onClick={() => { setUploadIndex(0); setStep('upload'); window.scrollTo(0, 0); }}
          >
            {t.cont} <ChevronRight />
          </button>
        </div>
      );
    }
    if (step === 'upload' && currentCity) {
      const entry = getEntry(currentCity.id);
      const hasPhoto = entry.photos.length > 0;
      const backLabel = uploadIndex === 0 ? t.backConsent : t.backTo(orderedSelected[uploadIndex - 1].name);
      const nextLabel = isLastCity ? t.complete : t.next(orderedSelected[uploadIndex + 1].name);
      return (
        <div className="tour-nav">
          <button type="button" className="tour-nav-back" onClick={goPrev}>
            <ChevronLeft /> {backLabel}
          </button>
          <button type="button" className="tour-nav-next" disabled={!hasPhoto} onClick={goNext}>
            {nextLabel} <ChevronRight />
          </button>
        </div>
      );
    }
    if (step === 'review') {
      return (
        <div className="tour-nav">
          <button type="button" className="tour-nav-back" onClick={() => { setStep('upload'); setUploadIndex(orderedSelected.length - 1); window.scrollTo(0, 0); }}>
            <ChevronLeft /> {t.backTo(orderedSelected[orderedSelected.length - 1].name)}
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
        {step === 'cities' && renderCities()}
        {step === 'consent' && renderConsent()}
        {step === 'upload' && renderUpload()}
        {step === 'review' && renderReview()}
        {step === 'done' && renderDone()}
      </main>
      {step !== 'done' && renderNav()}
      {popup && <ImagePopup imageSrc={popup} onClose={() => setPopup(null)} />}
    </div>
  );
};

export default TourMemoryForm;
