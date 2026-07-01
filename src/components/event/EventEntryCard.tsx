import React from 'react';

interface EventEntryCardProps {
  title: string;
  desc: string;       // \n 줄바꿈 (CSS white-space: pre-line)
  cta: string;        // 활성 상태 CTA ("참여하기") / disabled 시 마감 문구로 대체
  count: string;      // 이미 치환된 누적 문구 ("지금까지 428장 누적!")
  image: string;      // 이미지 경로
  imageWidth: number; // Figma 기준 이미지 폭(px), 높이는 80 고정
  disabled?: boolean; // dueDate 도달 시 true. count 미노출 + 버튼 비활성화.
  onClick?: () => void;
}

const EventEntryCard: React.FC<EventEntryCardProps> = ({
  title,
  desc,
  cta,
  count,
  image,
  imageWidth,
  disabled,
  onClick,
}) => {
  return (
    <div className="event-card">
      <div className="event-card-top">
        <div className="event-card-texts">
          <p className="event-card-title">{title}</p>
          <p className="event-card-desc">{desc}</p>
        </div>
        <div className="event-card-image">
          <img src={image} alt="" style={{ width: imageWidth, height: 80 }} />
        </div>
      </div>
      <button
        type="button"
        className="event-card-btn"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
      >
        <span className="event-card-btn-cta">{cta}</span>
        {!disabled && <span className="event-card-btn-count">{count}</span>}
      </button>
    </div>
  );
};

export default EventEntryCard;
