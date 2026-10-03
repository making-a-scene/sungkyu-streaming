import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../App.css';

export type ChantItem = {
  title: string;
  releaseDate: string;
  is_fanchat: boolean;
  aliases: string[];
  chant: string;
  tag?: string;
  youtube_url?: string;
};

const getYoutubeEmbedUrl = (url: string): string => {
  const match = url.match(/youtu\.be\/([^?]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  return url;
};

// Parse chant text with color markers
const parseChant = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, lineIndex) => {
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let keyCounter = 0;

    while (remaining.length > 0) {
      const blueStart = remaining.indexOf('[[');
      const yellowStart = remaining.indexOf('<<');

      if (blueStart === -1 && yellowStart === -1) {
        if (remaining) {
          parts.push(
            <span key={`${lineIndex}-${keyCounter++}`}>{remaining}</span>,
          );
        }
        break;
      }

      let nextMarkerStart: number;
      let isBlue: boolean;

      if (blueStart === -1) {
        nextMarkerStart = yellowStart;
        isBlue = false;
      } else if (yellowStart === -1) {
        nextMarkerStart = blueStart;
        isBlue = true;
      } else {
        if (blueStart < yellowStart) {
          nextMarkerStart = blueStart;
          isBlue = true;
        } else {
          nextMarkerStart = yellowStart;
          isBlue = false;
        }
      }

      if (nextMarkerStart > 0) {
        parts.push(
          <span key={`${lineIndex}-${keyCounter++}`}>
            {remaining.substring(0, nextMarkerStart)}
          </span>,
        );
      }

      const endMarker = isBlue ? ']]' : '>>';
      const endIndex = remaining.indexOf(endMarker, nextMarkerStart + 2);

      if (endIndex === -1) {
        parts.push(
          <span key={`${lineIndex}-${keyCounter++}`}>
            {remaining.substring(nextMarkerStart)}
          </span>,
        );
        break;
      }

      const coloredText = remaining.substring(nextMarkerStart + 2, endIndex);
      const colorClass = isBlue ? 'chant-blue' : 'chant-yellow';
      parts.push(
        <span key={`${lineIndex}-${keyCounter++}`} className={colorClass}>
          {coloredText}
        </span>,
      );

      remaining = remaining.substring(endIndex + 2);
    }

    return (
      <p key={lineIndex} className="chant-line">
        {parts.length > 0 ? parts : '\u00A0'}
      </p>
    );
  });
};

const ChantModal = ({ item, onClose }: { item: ChantItem; onClose: () => void }) => {
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const handleClose = useCallback(() => {
    if (closeTimer.current) return;
    setIsClosing(true);
    closeTimer.current = setTimeout(onClose, 250);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
      if (event.key === 'Tab') {
        const controls = dialog.current?.querySelectorAll<HTMLElement>('button, iframe, a[href], input, [tabindex="0"]');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [handleClose]);

  return (
        <div
          className={`cheering-modal-overlay ${isClosing ? 'closing' : ''}`}
          onClick={handleClose}
        >
          <div
            role="dialog"
            ref={dialog}
            aria-modal="true"
            aria-label={`${item.title} 가사·응원법`}
            className={`cheering-modal ${isClosing ? 'closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cheering-modal-header">
              <div className="cheering-modal-title-container">
                <span className="cheering-modal-title">
                  {item.title}
                </span>
                {item.tag && (
                  <span className="cheering-song-tag">{item.tag}</span>
                )}
                <span
                  className={`cheering-modal-badge ${item.is_fanchat ? 'fanchat' : 'chorus'}`}
                >
                  {item.is_fanchat ? '응원법' : '떼창곡'}
                </span>
              </div>
              <button
                type="button"
                aria-label="가사·응원법 닫기"
                ref={closeButton}
                className="cheering-modal-close"
                onClick={handleClose}
              >
                <img
                  src={process.env.PUBLIC_URL + '/close-icon.svg'}
                  alt="Close"
                />
              </button>
            </div>
            <div className="cheering-modal-content">
              <div className="cheering-modal-info-box">
                <span className="info-text-yellow">노란색</span>
                <span className="info-text">은 노래 가사를 같이, </span>
                <span className="info-text-blue">파란색</span>
                <span className="info-text">은 응원법만 크게 외치기</span>
              </div>
              {item.youtube_url && (
                <div className="cheering-modal-youtube">
                  <iframe
                    src={getYoutubeEmbedUrl(item.youtube_url)}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              <div className="cheering-modal-lyrics">
                {parseChant(item.chant)}
              </div>
            </div>
          </div>
        </div>
  );
};

export default ChantModal;
