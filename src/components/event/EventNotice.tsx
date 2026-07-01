import React, { useEffect, useState } from 'react';
import { EventMessages } from '../../data/eventLocale';

interface EventNoticeProps {
  messages: EventMessages;
  deadline: Date; // 모집 마감 시각 (KST)
}

// 마감 약 3일 전부터 true 로 수동 전환 → 카운트다운(192:04:28 형식) 표시.
// false 면 정적 마감 안내 텍스트(deadlineNotice)를 같은 위치에 표시.
const SHOW_COUNTDOWN = true;

// 마감까지 남은 시간을 "H:MM:SS" 형식으로 (Figma: 192:04:28 처럼 시간은 패딩 없음)
const formatRemaining = (deadline: Date): string => {
  const diff = deadline.getTime() - Date.now();
  if (diff <= 0) return '00:00:00';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const EventNotice: React.FC<EventNoticeProps> = ({ messages, deadline }) => {
  const [remaining, setRemaining] = useState(() => formatRemaining(deadline));

  useEffect(() => {
    if (!SHOW_COUNTDOWN) return;
    const tick = () => setRemaining(formatRemaining(deadline));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return (
    <div className="event-notice">
      <div className="event-notice-badge">
        <span className="event-notice-dot" />
        <span className="event-notice-badge-text">{messages.noticeBadge}</span>
      </div>
      <div className="event-notice-text">
        <p className="event-notice-body">{messages.noticeBody}</p>
        <p className="event-notice-footnote">{messages.noticeFootnote}</p>
      </div>
      {SHOW_COUNTDOWN ? (
        <div className="event-notice-countdown">
          <span className="event-notice-countdown-label">{messages.countdownLabel}</span>
          <span className="event-notice-countdown-time">{remaining}</span>
        </div>
      ) : (
        <div className="event-notice-deadline">{messages.deadlineNotice}</div>
      )}
    </div>
  );
};

export default EventNotice;
