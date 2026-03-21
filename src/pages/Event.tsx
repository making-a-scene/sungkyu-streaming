import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import React, { useState, useEffect, useRef } from "react";
import '../App.css';

const EVENT_CATEGORIES = ["전체", "핫스테이지 투표"] as const;
type Category = typeof EVENT_CATEGORIES[number];

interface TweetItem {
    tweetId: string;
    category: Category;
}

const TWEET_LIST: TweetItem[] = [
    // 핫스테이지 투표
    { tweetId: "2031004486601502817", category: "핫스테이지 투표" },
    { tweetId: "2031202345372233831", category: "핫스테이지 투표" },
    { tweetId: "2031264566605394309", category: "핫스테이지 투표" },
    { tweetId: "2031308885928325472", category: "핫스테이지 투표" }
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

const TweetEmbed: React.FC<{ tweetId: string; ready: boolean }> = ({ tweetId, ready }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!ref.current || !ready) return;
        ref.current.innerHTML = '';

        const anchor = document.createElement('a');
        anchor.href = `https://twitter.com/i/status/${tweetId}`;
        ref.current.appendChild(anchor);

        // iframe이 삽입되면 load 이벤트를 기다려서 콘텐츠 렌더 완료 후 스켈레톤 해제
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

        return () => observer.disconnect();
    }, [tweetId, ready]);

    return (
        <div className="event-tweet-container">
            {!isLoaded && <TweetSkeleton />}
            <div ref={ref} style={{ display: isLoaded ? 'block' : 'none' }} />
        </div>
    );
};

const Event = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("전체");
    const [twttrReady, setTwttrReady] = useState(false);

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

    const filteredTweets = activeCategory === "전체"
        ? TWEET_LIST
        : TWEET_LIST.filter(t => t.category === activeCategory);

    return (
        <div className="app">
            <Header />
            <PageTitle icon="/event-icon-filled.svg" title="이벤트" />
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
                    {filteredTweets.map((tweet) => (
                        <TweetEmbed key={tweet.tweetId} tweetId={tweet.tweetId} ready={twttrReady} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Event;
