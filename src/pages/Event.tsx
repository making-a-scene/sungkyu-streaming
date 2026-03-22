import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import TweetEmbedList from "../components/TweetEmbedList";
import React, { useState } from "react";
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

const Event = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("전체");

    const filteredTweetIds = (activeCategory === "전체"
        ? TWEET_LIST
        : TWEET_LIST.filter(t => t.category === activeCategory)
    ).map(t => t.tweetId);

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
                <TweetEmbedList tweetIds={filteredTweetIds} pageSize={3} />
            </main>
            <Footer />
        </div>
    );
}

export default Event;
