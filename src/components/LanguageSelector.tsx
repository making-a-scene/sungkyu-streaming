import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

interface Language {
    label: string;
    path: string;
}

const LANGUAGES: Language[] = [
    { label: '한국어', path: '/lv4-ko' },
    { label: 'English', path: '/lv4-en' },
    { label: '中文', path: '/lv4-ch' },
    { label: '日本語', path: '/lv4-ja' },
];

interface LanguageSelectorProps {
    currentPath: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentPath }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const selectorRef = useRef<HTMLDivElement>(null);

    const currentLanguage = LANGUAGES.find(lang => lang.path === currentPath) || LANGUAGES[0];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectorRef.current && !selectorRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (lang: Language) => {
        setIsOpen(false);
        if (lang.path !== currentPath) {
            navigate(lang.path);
        }
    };

    return (
        <div className="language-selector-wrapper" ref={selectorRef}>
            <button
                className="language-selector"
                onClick={() => setIsOpen(!isOpen)}
            >
                <img src="/globe-icon.svg" alt="" className="language-selector-icon" />
                <span className="language-selector-label">{currentLanguage.label}</span>
                <img
                    src="/dropdown-arrow.svg"
                    alt=""
                    className={`language-selector-arrow ${isOpen ? 'open' : ''}`}
                />
            </button>
            {isOpen && (
                <div className="language-dropdown">
                    {LANGUAGES.map(lang => (
                        <div
                            key={lang.path}
                            className={`language-dropdown-item ${lang.path === currentPath ? 'active' : ''}`}
                            onClick={() => handleSelect(lang)}
                        >
                            {lang.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
