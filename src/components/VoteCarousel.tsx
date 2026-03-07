import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../App.css';
import VoteCard, { VOTING_INFO_LIST, ALBUM_NAME } from './VoteCard';

type TabFilter = 'important' | 'active' | 'ended';

const VoteCarousel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabFilter>('important');
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const lastX = useRef(0);
    const lastTime = useRef(0);
    const velocity = useRef(0);
    const momentumRaf = useRef<number>(0);

    const now = new Date();

    const filteredList = VOTING_INFO_LIST.filter((info) => {
        const isExpired = info.dueDate.getTime() <= now.getTime();
        switch (activeTab) {
            case 'important':
                return info.isImportant && !isExpired;
            case 'active':
                return !isExpired;
            case 'ended':
                return isExpired;
        }
    });

    useEffect(() => {
        setActiveIndex(0);
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }, [activeTab]);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const el = scrollRef.current;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) {
            setActiveIndex(0);
            return;
        }
        const ratio = el.scrollLeft / maxScroll;
        const index = Math.round(ratio * (filteredList.length - 1));
        setActiveIndex(Math.min(Math.max(index, 0), filteredList.length - 1));
    };

    const stopMomentum = useCallback(() => {
        if (momentumRaf.current) {
            cancelAnimationFrame(momentumRaf.current);
            momentumRaf.current = 0;
        }
    }, []);

    const startMomentum = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;

        let v = velocity.current;
        const decay = 0.95;
        const minVelocity = 0.5;

        const step = () => {
            v *= decay;
            if (Math.abs(v) < minVelocity) return;
            el.scrollLeft -= v;
            momentumRaf.current = requestAnimationFrame(step);
        };

        momentumRaf.current = requestAnimationFrame(step);
    }, []);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        stopMomentum();
        isDragging.current = true;
        startX.current = e.pageX;
        scrollLeft.current = scrollRef.current.scrollLeft;
        lastX.current = e.pageX;
        lastTime.current = Date.now();
        velocity.current = 0;
        scrollRef.current.style.cursor = 'grabbing';
    }, [stopMomentum]);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging.current || !scrollRef.current) return;
        e.preventDefault();

        const now = Date.now();
        const dt = now - lastTime.current;
        const dx = e.pageX - lastX.current;

        if (dt > 0) {
            velocity.current = dx / dt * 16;
        }

        lastX.current = e.pageX;
        lastTime.current = now;

        const walk = e.pageX - startX.current;
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }, []);

    const onMouseUp = useCallback(() => {
        if (!isDragging.current) return;
        isDragging.current = false;
        if (scrollRef.current) {
            scrollRef.current.style.cursor = 'grab';
        }
        startMomentum();
    }, [startMomentum]);

    useEffect(() => {
        return () => stopMomentum();
    }, [stopMomentum]);

    const tabs: { key: TabFilter; label: string }[] = [
        { key: 'important', label: '화력 집중 투표' },
        { key: 'active', label: '진행 중 투표' },
        { key: 'ended', label: '종료된 투표' },
    ];

    return (
        <div className="vote-carousel-section">
            <h2 className="home-section-title">🗳️ {ALBUM_NAME} 투표 모아 보기!</h2>
            <div className="vote-carousel-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`vote-carousel-tab ${activeTab === tab.key ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="vote-carousel-content">
                <div
                    className="vote-carousel-scroll"
                    ref={scrollRef}
                    onScroll={handleScroll}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                >
                    {filteredList.length > 0 ? (
                        <>
                            {filteredList.map((info, i) => (
                                <VoteCard key={info.title} info={info} />
                            ))}
                            <div className="vote-carousel-spacer" />
                        </>
                    ) : (
                        <div className="vote-carousel-empty">해당하는 투표가 없습니다.</div>
                    )}
                </div>
                {filteredList.length > 1 && (
                    <div className="vote-carousel-dots">
                        {filteredList.map((_, i) => (
                            <span
                                key={i}
                                className={`vote-carousel-dot ${i === activeIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VoteCarousel;
