import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState, useEffect, useCallback, useRef } from "react";
import '../App.css';

const EVENT_CATEGORIES = ["전체", "스트리밍", "다운로드", "앨범 초동", "헬퍼"] as const;
type Category = typeof EVENT_CATEGORIES[number];

interface TweetItem {
    tweetId: string;
    category: Category;
}

const TWEET_LIST: TweetItem[] = [
    // 스트리밍
    { tweetId: "2029518660063441366", category: "스트리밍" },
    { tweetId: "2029366271805145398", category: "스트리밍" },
    { tweetId: "2029454809552830491", category: "스트리밍" },
    { tweetId: "2029449466902966439", category: "스트리밍" },
    { tweetId: "2029205893469102515", category: "스트리밍" },
    // 다운로드
    { tweetId: "2029460634505466162", category: "다운로드" },
    // 헬퍼
    { tweetId: "2026649084564759008", category: "헬퍼" },
    // 앨범 초동
    { tweetId: "2029568985285689619", category: "앨범 초동" },
];

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

function useSequentialTweetLoader(tweetIds: string[]) {
    const [loadedSet, setLoadedSet] = useState<Set<string>>(new Set());
    const containerRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const queueRef = useRef<string[]>([]);
    const loadingRef = useRef(false);

    const setRef = useCallback((id: string, el: HTMLDivElement | null) => {
        if (el) containerRefs.current.set(id, el);
        else containerRefs.current.delete(id);
    }, []);

    const processQueue = useCallback(async () => {
        if (loadingRef.current) return;
        loadingRef.current = true;

        while (queueRef.current.length > 0) {
            const id = queueRef.current.shift()!;
            const el = containerRefs.current.get(id);
            if (!el) continue;

            try {
                await (window as any).twttr.widgets.createTweet(id, el, {
                    theme: 'dark',
                    align: 'center',
                    dnt: true,
                });
            } catch { /* skip failed tweet */ }
            setLoadedSet(prev => new Set(prev).add(id));
        }

        loadingRef.current = false;
    }, []);

    const startLoading = useCallback((ids: string[]) => {
        queueRef.current = [...ids];
        loadingRef.current = false;
        setLoadedSet(new Set());

        const tryStart = () => {
            if ((window as any).twttr?.widgets) {
                processQueue();
            } else {
                document.addEventListener('twttr:loaded', () => processQueue(), { once: true });
            }
        };
        // 약간의 딜레이로 refs가 연결될 시간 확보
        requestAnimationFrame(tryStart);
    }, [processQueue]);

    useEffect(() => {
        startLoading(tweetIds);
    }, [tweetIds.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

    return { loadedSet, setRef };
}

const Event = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("전체");

    const loadTwitterWidget = useCallback(() => {
        if ((window as any).twttr?.widgets) return;
        (window as any).twttr = (window as any).twttr || {};
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
        script.onload = () => {
            const check = setInterval(() => {
                if ((window as any).twttr?.widgets) {
                    clearInterval(check);
                    document.dispatchEvent(new CustomEvent('twttr:loaded'));
                }
            }, 100);
        };
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        loadTwitterWidget();
    }, [loadTwitterWidget]);

    const filteredTweets = activeCategory === "전체"
        ? TWEET_LIST
        : TWEET_LIST.filter(t => t.category === activeCategory);

    const filteredIds = filteredTweets.map(t => t.tweetId);
    const { loadedSet, setRef } = useSequentialTweetLoader(filteredIds);

    return (
        <div className="app">
            <Header />
            <div className="event-page-title-section">
                <img src="/event-icon-filled.svg" alt="" className="event-title-icon" />
                <span className="event-title-text">이벤트</span>
            </div>
            <main className="main-content event-main">
                <div className="event-filter-bar">
                    {EVENT_CATEGORIES.map((cat) => (
                        <div
                            key={cat}
                            className={`event-filter-pill ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </div>
                    ))}
                </div>
                <div className="event-tweet-list">
                    {filteredTweets.map((tweet) => {
                        const loaded = loadedSet.has(tweet.tweetId);
                        return (
                            <div className="event-tweet-container" key={tweet.tweetId}>
                                {!loaded && <TweetSkeleton />}
                                <div
                                    ref={(el) => setRef(tweet.tweetId, el)}
                                    style={{ display: loaded ? 'block' : 'none' }}
                                />
                            </div>
                        );
                    })}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Event;