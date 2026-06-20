import React from 'react';
import { toast } from 'react-toastify';
import EventEntryCard from './EventEntryCard';
import { EventMessages, formatCount } from '../../data/eventLocale';

// 4개 진입 카드의 정적 메타데이터 (이미지/폭/폼 경로).
// 텍스트는 messages 에서, 누적 수치는 counts 에서 주입.
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
  },
  {
    key: 'letter',
    image: process.env.PUBLIC_URL + '/event/631f4974ef0a745dd01d2a214cbc20870d7582fd.png',
    imageWidth: 105,
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

interface EventEntrySectionProps {
  messages: EventMessages;
  // 도시/항목별 누적 수치. 폼 제출 API 연동 후 실제 값 주입. 미지정 시 디자인 더미값.
  counts?: Partial<Record<keyof EventMessages['cards'], number>>;
}

const DEFAULT_COUNT = 428; // 디자인 더미값 (Redis 연동 전까지)

const EventEntrySection: React.FC<EventEntrySectionProps> = ({ messages, counts }) => {
  const handleClick = (meta: CardMeta) => {
    if (meta.formPath) {
      // TODO: 폼 라우트 연결 후 navigate(meta.formPath)
      return;
    }
    toast.info('폼은 준비 중입니다. 곧 오픈됩니다!', { autoClose: 1500, hideProgressBar: true });
  };

  return (
    <div className="event-cards">
      {CARD_META.map((meta) => {
        const text = messages.cards[meta.key];
        const n = counts?.[meta.key] ?? DEFAULT_COUNT;
        return (
          <EventEntryCard
            key={meta.key}
            title={text.title}
            desc={text.desc}
            cta={text.cta}
            count={formatCount(text.countLabel, n)}
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
