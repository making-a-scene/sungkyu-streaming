import React, { useState, useEffect, useRef } from "react";

const TweetSkeleton: React.FC = () => (
    <div className="event-tweet-skeleton">
        <div className="tweet-skeleton-header">
            <div className="tweet-skeleton-avatar" />
            <div className="tweet-skeleton-name-group">
                <div className="tweet-skeleton-name" />
                <div className="tweet-skeleton-handle" />
            </div>
        </div>
        <div className="tweet-skeleton-body">
            <div className="tweet-skeleton-line" />
            <div className="tweet-skeleton-line short" />
        </div>
        <div className="tweet-skeleton-image" />
    </div>
);

const TweetEmbed: React.FC<{ tweetId: string; ready: boolean }> = ({ tweetId, ready }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const createdRef = useRef(false);

    useEffect(() => {
        if (!ref.current || !ready || createdRef.current) return;
        createdRef.current = true;

        const observer = new MutationObserver(() => {
            const iframe = ref.current?.querySelector('iframe');
            if (iframe) {
                observer.disconnect();
                iframe.addEventListener('load', () => setIsLoaded(true));
            }
        });
        observer.observe(ref.current, { childList: true, subtree: true });

        (window as any).twttr.widgets.createTweet(tweetId, ref.current, {
            theme: 'dark',
            align: 'center',
            dnt: true,
        });
    }, [tweetId, ready]);

    return (
        <div className="event-tweet-container">
            {!isLoaded && <TweetSkeleton />}
            <div ref={ref} style={{ display: isLoaded ? 'block' : 'none' }} />
        </div>
    );
};

interface TweetEmbedListProps {
    tweetIds: string[];
    pageSize?: number;
}

const TweetEmbedList: React.FC<TweetEmbedListProps> = ({ tweetIds, pageSize = 3 }) => {
    const [twttrReady, setTwttrReady] = useState(false);
    const [visibleCount, setVisibleCount] = useState(pageSize);

    useEffect(() => {
        if ((window as any).twttr?.widgets) {
            setTwttrReady(true);
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
            (window as any).twttr?.ready?.(() => setTwttrReady(true));
        };
    }, []);

    // tweetIds가 변경되면 페이지네이션 리셋
    useEffect(() => {
        setVisibleCount(pageSize);
    }, [tweetIds, pageSize]);

    const visibleTweets = tweetIds.slice(0, visibleCount);
    const hasMore = visibleCount < tweetIds.length;

    return (
        <div className="event-tweet-list">
            {visibleTweets.map((id) => (
                <TweetEmbed key={id} tweetId={id} ready={twttrReady} />
            ))}
            {hasMore && (
                <button
                    className="tweet-load-more-btn"
                    onClick={() => setVisibleCount((prev) => prev + pageSize)}
                >
                    더 보기
                </button>
            )}
        </div>
    );
};

export default TweetEmbedList;
