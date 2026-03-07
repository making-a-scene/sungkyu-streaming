import React, { useState, useEffect } from 'react';
import '../App.css';
import ImagePopup from './ImagePopup';

const ALBUM_NAME = "OFF THE MAP";

export type VotingInfo = {
    title: string;
    description: string;
    method: string;
    dueDate: Date;
    guideImgPath: string;
    votingLink: string;
    isImportant: boolean;
}

export const VOTING_INFO_LIST: VotingInfo[] = [
    { title: "뮤직뱅크 · 팬 스테이지 픽", description: "1위 시, Fan's Stage Pick 트로피 수여", method: "Fancast 앱, 무제한 투표, 무료/유료 재화", dueDate: new Date('2026-03-12T17:00:00+09:00'), guideImgPath: "/guide-vote-musicbank.png", votingLink: "https://fancast.go.link/d8UJW", isImportant: true },
    { title: "엠카운트다운 · 사전투표", description: "엠카운트다운 차트 집계 10% 반영", method: "엠넷플러스 앱, 매일 최대 5표, 다계정 가능", dueDate: new Date('2026-03-10T23:59:59+09:00'), guideImgPath: "/guide-vote-mcd.png", votingLink: "https://mnetplus.onelink.me/TRa8/t9zck1c1?custom_link_value=vote%2Fv2%2F69a7e47c7f785f2002486a45", isImportant: false },
    { title: "쇼챔피언 · 사전투표", description: "쇼챔피언 차트 집계 20% 반영", method: "아이돌챔프 앱, 무제한 투표, 무료/유료 재화,\n다계정 가능", dueDate: new Date('2026-03-09T14:59:59+09:00'), guideImgPath: "/guide-vote-showchamp.png", votingLink: "https://promo-web.idolchamp.com/app_proxy.html?deeplink=https%3A%2F%2Fapp.idolchamp.com%2Fopen%2Fvote%2F01KJTF316DSMV3VZG77SK3BPFE", isImportant: false },
    { title: "음중 · STAGE M PICK", description: "1위 시, STAGE M PICK 트로피 수여", method: "Muniverse 어플(권장) 또는 웹사이트,\n무제한 투표, 무료/유료 재화, 다계정 가능", dueDate: new Date('2026-03-12T11:00:00+09:00'), guideImgPath: "/guide-vote-musiccore.png", votingLink: "https://www.muniverse.io/votes/e9fc0a7c-9061-41ce-8ec1-973ba8835e9c", isImportant: true },
    { title: "엠카 · 엠카PICK 스테이지", description: "1위 시, 비하인드 영상 공개 + 먼슬리 후보", method: "엠넷플러스 앱, 매일 최대 5표, 다계정 가능,\n무제한 집계 영상 조회수와 합산", dueDate: new Date('2026-03-09T11:59:59+09:00'), guideImgPath: "/guide-vote-mcd-stage.png", votingLink: "https://mnetplus.onelink.me/TRa8/t9zck1c1?custom_link_value=vote%2Fv2%2F69a64417362edd561ed06d86", isImportant: true },
    { title: "인기가요 · 사전투표", description: "인기가요 차트 집계 5% 반영", method: "LiNC 앱, 매일 최대 10표, 다계정 가능", dueDate: new Date('2026-03-06T23:59:59+09:00'), guideImgPath: "", votingLink: "", isImportant: false }
];

interface VoteCardProps {
    info: VotingInfo;
}

const useCountdown = (dueDate: Date) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const update = () => {
            const now = new Date();
            const diff = dueDate.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft('종료');
                setIsExpired(true);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const timeStr = `${days}일 ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            setTimeLeft(timeStr);
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [dueDate]);

    return { timeLeft, isExpired };
};

const VoteCard: React.FC<VoteCardProps> = ({ info }) => {
    const [popupImage, setPopupImage] = useState<string | null>(null);
    const { timeLeft, isExpired } = useCountdown(info.dueDate);

    if (isExpired) {
        return (
            <div className="vote-card vote-card-expired">
                <div className="vote-card-inner">
                    <div className="vote-card-top">
                        <div className="vote-card-header">
                            <span className="vote-card-title">{info.title}</span>
                            <div className="vote-card-info">
                                <span className="vote-card-description">{info.description}</span>
                                <span className="vote-card-method">
                                    {info.method.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {i > 0 && <br />}
                                            {line}
                                        </React.Fragment>
                                    ))}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="vote-card-bottom">
                        <div />
                        <span className="vote-card-ended-label">종료된 투표</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="vote-card">
            <div className="vote-card-inner">
                <div className="vote-card-top">
                    <div className="vote-card-header">
                        <div className="vote-card-title-row">
                            <span className="vote-card-title">{info.title}</span>
                            {info.isImportant && (
                                <span className="vote-card-badge">화력 집중</span>
                            )}
                        </div>
                        <div className="vote-card-info">
                            <span className="vote-card-description">{info.description}</span>
                            <span className="vote-card-method">
                                {info.method.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {i > 0 && <br />}
                                        {line}
                                    </React.Fragment>
                                ))}
                            </span>
                        </div>
                    </div>
                    {info.guideImgPath && (
                        <div
                            className="vote-card-guide-link"
                            onClick={() => setPopupImage(process.env.PUBLIC_URL + info.guideImgPath)}
                        >
                            <span>음총팀 투표 가이드 보기</span>
                            <img
                                src={process.env.PUBLIC_URL + '/arrow-icon.svg'}
                                alt=""
                                className="vote-card-guide-arrow"
                            />
                        </div>
                    )}
                </div>
                <div className="vote-card-bottom">
                    <div className="vote-card-countdown">
                        <span className="vote-card-countdown-label">투표 종료까지</span>
                        <span className="vote-card-countdown-time">{timeLeft}</span>
                    </div>
                    {info.votingLink && (
                        <a href={info.votingLink} target="_blank" rel="noreferrer" className="vote-card-button">
                            투표하기
                        </a>
                    )}
                </div>
            </div>

            {popupImage && (
                <ImagePopup imageSrc={popupImage} onClose={() => setPopupImage(null)} />
            )}
        </div>
    );
};

export { ALBUM_NAME };
export default VoteCard;
