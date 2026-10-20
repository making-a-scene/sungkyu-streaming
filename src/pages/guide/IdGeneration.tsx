import React, { useLayoutEffect, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "../../App.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TabView from "../../components/TabView";
import GuideMenu from "../../components/GuideMenu";

const tabs = ["멜론", "지니", "벅스", "플로", "바이브", "듀얼 넘버", "안심번호"];
const servicePaths = ["melon", "genie", "bugs", "flo", "vibe", "dual-number", "virtual-number"];
const signupLinks: Record<string, string> = {
  melon: "https://accounts.melon.com/join/choice?cpId=WP10",
  genie: "https://member.genie.co.kr/account/create/agree?svc=W",
  bugs: "https://secure.bugs.co.kr/member/join/memberMain",
  flo: "https://www.music-flo.com/member/signup",
  vibe: "https://nid.naver.com/user2/V2Join.nhn",
};

const IdGeneration = () => {
  const { service } = useParams<{ service: string }>();
  const navigate = useNavigate();
  const selectedTab = service ? servicePaths.indexOf(service) : 0;

  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [selectedTab]);

  if (!service || selectedTab === -1) {
    return <Navigate to="/guide/id-generation/melon" replace />;
  }

  return (
    <div className="app">
      <Header />
      <GuideMenu />
      <TabView
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={(index) => navigate(`/guide/id-generation/${servicePaths[index]}`)}
      />
      <main className="main-content" ref={mainRef}>
        {signupLinks[service] && (
          <div className="id-generation-shortcut">
            <a
              className="id-generation-signup-link"
              href={signupLinks[service]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tabs[selectedTab]} 아이디 생성 바로가기 (새 탭)`}
            >
              아이디 생성 바로가기
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
        {selectedTab === 0 && (
          <img
            src={process.env.PUBLIC_URL + "/guide-melon.png"}
            alt="guide"
            style={{ width: "100%", maxWidth: "880px", display: "block" }}
          />
        )}
        {selectedTab === 1 && (
          <img
            src={process.env.PUBLIC_URL + "/guide-genie.png"}
            alt="guide"
            style={{ width: "100%", maxWidth: "880px", display: "block" }}
          />
        )}
        {selectedTab === 2 && (
          <>
            <img
              src={process.env.PUBLIC_URL + "/guide-bugs.png"}
              alt="guide"
              style={{ width: "100%", maxWidth: "880px", display: "block" }}
            />
            <img
              src={process.env.PUBLIC_URL + "/guide-virtual-number.png"}
              alt="guide"
              style={{ width: "100%", maxWidth: "880px", display: "block" }}
            />
            <img
              src={process.env.PUBLIC_URL + "/guide-number.png"}
              alt="guide"
              style={{ width: "100%", maxWidth: "880px", display: "block" }}
            />
          </>
        )}
        {selectedTab === 3 && (
          <img
            src={process.env.PUBLIC_URL + "/guide-flo.png"}
            alt="guide"
            style={{ width: "100%", maxWidth: "880px", display: "block" }}
          />
        )}
        {selectedTab === 4 && (
          <img
            src={process.env.PUBLIC_URL + "/guide-vibe.png"}
            alt="guide"
            style={{ width: "100%", maxWidth: "880px", display: "block" }}
          />
        )}
        {selectedTab === 5 && (
          <img
            src={process.env.PUBLIC_URL + "/guide-number.png"}
            alt="guide"
            style={{ width: "100%", maxWidth: "880px", display: "block" }}
          />
        )}
        {selectedTab === 6 && (
          <img
            src={process.env.PUBLIC_URL + "/guide-virtual-number.png"}
            alt="guide"
            style={{ width: "100%", maxWidth: "880px", display: "block" }}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default IdGeneration;
