import React, { useEffect, useRef, useState } from 'react';
import { Lang, LANGS, LANG_LABELS } from '../../data/eventLocale';

interface LanguageToggleProps {
  lang: Lang;
  onChange: (lang: Lang) => void;
}

const GLOBE_ICON = process.env.PUBLIC_URL + '/event/c88695c54fe584fb94a1310c753bc4dd3230fdff.svg';
const ARROW_ICON = process.env.PUBLIC_URL + '/event/a1a0fc364123e61bacbc3418ae3ef3bcba6bc726.svg';

const LanguageToggle: React.FC<LanguageToggleProps> = ({ lang, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const handleSelect = (l: Lang) => {
    onChange(l);
    setOpen(false);
  };

  return (
    <div className="lang-toggle" ref={ref}>
      <button
        type="button"
        className="lang-toggle-btn"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <img src={GLOBE_ICON} alt="" className="lang-toggle-globe" />
        <span className="lang-toggle-label">{LANG_LABELS[lang]}</span>
        <img src={ARROW_ICON} alt="" className={`lang-toggle-arrow${open ? ' open' : ''}`} />
      </button>
      {open && (
        <ul className="lang-toggle-menu" role="listbox">
          {LANGS.map((l) => (
            <li
              key={l}
              role="option"
              aria-selected={l === lang}
              className={`lang-toggle-item${l === lang ? ' active' : ''}`}
              onClick={() => handleSelect(l)}
            >
              {LANG_LABELS[l]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageToggle;
