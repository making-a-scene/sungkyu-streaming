import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

declare global {
    interface Window {
        twttr?: {
            widgets: {
                createTweet: (tweetId: string, el: HTMLElement, options?: object) => Promise<HTMLElement>;
            };
        };
    }
}

const TWEET_IDS: Record<string, string> = {
    'id-donate': '2018307405084569685',
    'helper': '2022634475734409269',
    'fundraise': '2019395677214982498',
};

const ActionButtons: React.FC = () => {
    const [activeTweet, setActiveTweet] = useState<string | null>(null);
    const tweetContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!document.getElementById('twitter-widget-script')) {
            const script = document.createElement('script');
            script.id = 'twitter-widget-script';
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    useEffect(() => {
        if (activeTweet && tweetContainerRef.current) {
            tweetContainerRef.current.innerHTML = '';

            const renderTweet = () => {
                if (window.twttr && tweetContainerRef.current) {
                    window.twttr.widgets.createTweet(activeTweet, tweetContainerRef.current, {
                        theme: 'dark',
                        align: 'center',
                    });
                } else {
                    setTimeout(renderTweet, 200);
                }
            };
            renderTweet();
        }
    }, [activeTweet]);

    const handleClose = () => {
        setActiveTweet(null);
    };

    return (
        <>
            <div className="action-buttons-bar">
                <div className="action-buttons-inner">
                    <div className="action-button" onClick={() => setActiveTweet(TWEET_IDS['id-donate'])}>아이디 기부</div>
                    <div className="action-divider" />
                    <div className="action-button" onClick={() => setActiveTweet(TWEET_IDS['helper'])}>헬퍼 신청</div>
                    <div className="action-divider" />
                    <div className="action-button" onClick={() => setActiveTweet(TWEET_IDS['fundraise'])}>음총 모금</div>
                </div>
            </div>

            {activeTweet && (
                <div className="tweet-popup-overlay" onClick={handleClose}>
                    <div className="tweet-popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="tweet-popup-close" onClick={handleClose}>
                            <img src={process.env.PUBLIC_URL + '/close-icon.svg'} alt="닫기" />
                        </button>
                        <div ref={tweetContainerRef} className="tweet-popup-embed" />
                    </div>
                </div>
            )}
        </>
    );
};

export default ActionButtons;
