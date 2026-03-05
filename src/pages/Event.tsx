import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState, useEffect, useCallback } from "react";
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
    { tweetId: "2026650597106266526", category: "헬퍼" },
    // 앨범 초동
    { tweetId: "2029568985285689619", category: "앨범 초동" },
];

const TweetEmbed: React.FC<{ tweetId: string }> = ({ tweetId }) => {
    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.innerHTML = '';

        const anchor = document.createElement('a');
        anchor.href = `https://twitter.com/i/status/${tweetId}`;
        ref.current.appendChild(anchor);

        if ((window as any).twttr?.widgets) {
            (window as any).twttr.widgets.createTweet(tweetId, ref.current, {
                theme: 'dark',
                align: 'center',
                dnt: true,
            });
        }
    }, [tweetId]);

    return <div className="event-tweet-container" ref={ref} />;
};

const Event = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("전체");

    const loadTwitterWidget = useCallback(() => {
        if ((window as any).twttr) return;
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        loadTwitterWidget();
    }, [loadTwitterWidget]);

    const filteredTweets = activeCategory === "전체"
        ? TWEET_LIST
        : TWEET_LIST.filter(t => t.category === activeCategory);

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
                    {filteredTweets.map((tweet) => (
                        <TweetEmbed key={tweet.tweetId} tweetId={tweet.tweetId} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Event;