import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EventEntryCard from './EventEntryCard';
import { EventMessages, formatCount } from '../../data/eventLocale';
import type { EventCounts } from '../../data/eventForms';

// 4개 진입 카드의 정적 메타데이터 (이미지/폭/폼 경로).
// 텍스트는 messages 에서, 누적 수치는 /api/submissions?action=counts 에서 주입.
// 폼 경로(formPath)는 폼 페이지 디자인 확정 후 라우트 연결 예정 (현재 미연결).
interface CardMeta {
  key: keyof EventMessages['cards'];
  image: string;
  imageWidth: number;
  formPath?: string;
}

const CARD_META: CardMeta[] = [
  {
    key: 'memory',
    image: process.env.PUBLIC_URL + '/event/ccff584c723a2504004a0abf2afdd8155377bf0d.png',
    imageWidth: 90,
    formPath: '/event/memory',
  },
  {
    key: 'letter',
    image: process.env.PUBLIC_URL + '/event/631f4974ef0a745dd01d2a214cbc20870d7582fd.png',
    imageWidth: 105,
    formPath: '/event/message',
  },
  {
    key: 'otm',
    image: process.env.PUBLIC_URL + '/event/961578577c85d6ce53e83cd38fdbc6d7a50249e0.png',
    imageWidth: 108,
  },
  {
    key: 'fanart',
    image: process.env.PUBLIC_URL + '/event/bbbe6f047cc115cfb6679019828b1d2bcd26e490.png',
    imageWidth: 110,
  },
];

// 카드별 누적 수치 매핑 (추억=사진 총 장수, 나머지=제출 건수)
const countFor = (key: CardMeta['key'], counts: EventCounts | null): number => {
  if (!counts) return 0;
  switch (key) {
    case 'memory':
      return counts.tourPhotosTotal;
    case 'letter':
      return counts.message;
    case 'otm':
      return counts.album;
    case 'fanart':
      return counts.fanart;
    default:
      return 0;
  }
};

interface EventEntrySectionProps {
  messages: EventMessages;
}

const EventEntrySection: React.FC<EventEntrySectionProps> = ({ messages }) => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState<EventCounts | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/submissions?action=counts')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d) setCounts(d as EventCounts);
      })
      .catch(() => {
        /* 로컬 dev 등 /api 미동작 시 무시 (카운트 0 표시) */
      });
    return () => {
      alive = false;
    };
  }, []);

  const handleClick = (meta: CardMeta) => {
    if (meta.formPath) {
      navigate(meta.formPath);
      return;
    }
    toast.info('폼은 준비 중입니다. 곧 오픈됩니다!', { autoClose: 1500, hideProgressBar: true });
  };

  return (
    <div className="event-cards">
      {CARD_META.map((meta) => {
        const text = messages.cards[meta.key];
        return (
          <EventEntryCard
            key={meta.key}
            title={text.title}
            desc={text.desc}
            cta={text.cta}
            count={formatCount(text.countLabel, countFor(meta.key, counts))}
            image={meta.image}
            imageWidth={meta.imageWidth}
            onClick={() => handleClick(meta)}
          />
        );
      })}
    </div>
  );
};

export default EventEntrySection;
