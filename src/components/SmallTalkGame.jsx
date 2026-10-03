import SongChantModal from './SongChantModal';
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/lyricsGame.css';
const Y = "y",
  B = "b";
const L = (...segs) => segs.map(s => typeof s === "string" ? [s] : s);
const CHORUS = tail => [L("난 필요해 ", ["Small talk!", Y], " and conversations"), L("밤새도록 ", ["Small talk!", Y], " about where you been"), L("I just came for the ", ["small talk!", Y], " and conversations"), L("I came for the ", ["small talk!", Y], " 끝나지 않게"), L(tail)];
const POST = shout => [L("You got me thinking"), L("You got me dreaming ", ["about you", Y]), L("You got me dreaming"), L("You got me thinking ", ["about you", Y]), L("You got me thinking"), L("You got me dreaming ", ["about you", Y]), L("You got me dreaming"), shout ? L("You got me thinking ", ["about you!", Y], " ", ["함성", B]) : L("You got me thinking ", ["about you!", Y])];
const LONG = ["빠져나갈 수가 없어 김성규는 약이 없어", "넌 온통 날 지배하지 난 너라면 뭐든 좋아", "언제나 고마워 영원히 함께해", "사랑해 김성규 스!몰!토!크!"];
const BLOCKS = [{
  p: "인트로",
  lines: [L(["김성규! 김성규! 김성규! 김성규!", B])]
}, {
  p: "1절",
  lines: [L("I've been running on an adrenaline"), L("더 빨라지는 호흡이 ", ["가빠!", Y], " 숨 가빠"), L("몸이 반응하는 걸 알지"), L("아무렇지 않은 척하질 ", ["않아!", Y]), L("Oh that's right"), L("머릴 거치지 않고 나온 말들"), L("You got me thinking selfishly"), L(["아무렇게 말하지 (Oh no)", Y]), L("방금 뱉은 말도 난 기억 못 해"), L("넌 온통 날 지배하지"), L("Lemme know Lemme know"), L("Baby pls talk to me")]
}, {
  p: "1절 프리코러스",
  lines: [L("어디로든 흘러가면 되니까 ", ["어디든!", B]), L("쓸데없는 말 일단 뭐라도 좋아 (Coz I need it)"), L("내 안은 요동쳐 이미"), L("Gotta scream it loud ", ["난 좋아!", B]), L("Coz it's way too late to up and back down")]
}, {
  p: "1절 후렴",
  lines: CHORUS("Lemme know")
}, {
  p: "포스트 코러스",
  lines: POST(false)
}, {
  p: "2절",
  lines: [L("Well 너도 알잖아 네가 얘길 시작하면"), L("'가나다'만 읊어도 서사로 들리는걸"), L(["빠져나올 길이 없어!", Y]), L(["너란 것은 약이 없어!", Y]), L("I'm feeling crazy"), L("This is what you do to me"), L("Filter 없이 튀어나온 말들"), L("You got me thinking selfishly"), L(["아무렇게 말하지 (Oh no)", Y]), L("방금 뱉은 말에 의민 없지"), L("넌 온통 날 지배하지"), L("Get it up"), L("Get it up"), L("Baby give it to me")]
}, {
  p: "2절 프리코러스",
  lines: [L("어디로든 흘러가면 되니까 ", ["어디든!", B]), L("의미 없는 말 난 오히려 좋아 (Coz I need it)"), L("내 안은 요동쳐 이미"), L("Gotta scream it loud ", ["난 좋아!", B]), L("Coz it's way too late to up and back down")]
}, {
  p: "2절 후렴",
  lines: CHORUS("Lemme know Lemme know")
}, {
  p: "포스트 코러스",
  lines: POST(true)
}, {
  p: "응원법 구간",
  lines: LONG.map((t, i) => i === 3 ? L([t, B], " ", ["(함성)", B]) : L([t, B]))
}, {
  p: "마지막 후렴",
  lines: CHORUS("Lemme know Lemme know")
}, {
  p: "아웃트로",
  lines: [L(["You got me thinking", Y]), L(["You got me dreaming about you", Y]), L(["You got me dreaming", Y]), L(["You got me thinking about you", Y]), L(["You got me thinking", Y]), L(["You got me dreaming about you", Y]), L(["You got me dreaming", Y]), L(["You got me thinking about you!", Y], " ", ["함성", B])]
}];
const SHORT_CALLS = ["가빠!", "않아!", "어디든!", "난 좋아!"];
const LONG_CONF = ["빠져나올 길이 없어 너란 것은 약이 없어", "넌 온통 날 지배하지 난 오히려 좋아", "언제나 함께해 영원히 고마워", "고마워 김성규 스!몰!토!크!"];
const LONG_KEYS = [["빠져나갈", "김성규는", "약이"], ["지배하지", "너라면", "뭐든"], ["고마워", "영원히", "함께해"], ["사랑해", "김성규"]];
const POOLS = {
  short: ["가빠!", "않아!", "어디든!", "난 좋아!", "Small talk!", "about you"],
  long: ["아무렇게 말하지 (Oh no)", "빠져나올 길이 없어!", "너란 것은 약이 없어!", "빠져나갈 수가 없어", "김성규는 약이 없어"],
  outro: ["You got me thinking", "You got me dreaming", "You got me thinking about you", "You got me dreaming about you"]
};
const OK = "#ffd24a",
  NG = "#ff5c47",
  BLUE = "#5b8cff";
const norm = t => String(t == null ? "" : t).normalize("NFC").toLowerCase().replace(/[\s!()'.,]+/g, "");
const lineText = l => l.map(s => s[0]).join("");
function shuffle(a) {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}
function pickOthers(pool, answer, n) {
  const seen = new Set([norm(answer)]);
  return shuffle(pool).filter(t => {
    const k = norm(t);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, n);
}
function choiceState(fb, t, answer, picked) {
  if (!fb) return {
    bg: "#3a3a3a",
    fg: "#ffffff",
    border: "#2a2a2a",
    badge: "",
    badgeBg: "transparent",
    badgeFg: "transparent"
  };
  if (t === answer) return {
    bg: "#2b2515",
    fg: "#ffffff",
    border: OK,
    badge: "정답",
    badgeBg: OK,
    badgeFg: "#0b0b0b"
  };
  if (t === picked) return {
    bg: "#2a1512",
    fg: "#ffb5aa",
    border: NG,
    badge: "내 선택",
    badgeBg: NG,
    badgeFg: "#0b0b0b"
  };
  return {
    bg: "#141414",
    fg: "#5f5f5f",
    border: "#3a3a3a",
    badge: "",
    badgeBg: "transparent",
    badgeFg: "transparent"
  };
}

// 짧은 응원법 자리: 앞 줄 / 응원법이 들어가는 줄 / 뒤 줄
const CALLSPOTS = [];
BLOCKS.forEach((b, bi) => b.lines.forEach((l, li) => {
  l.forEach((seg, si) => {
    if (SHORT_CALLS.indexOf(seg[0]) < 0) return;
    const prevL = li > 0 ? b.lines[li - 1] : BLOCKS[bi - 1] ? BLOCKS[bi - 1].lines.slice(-1)[0] : null;
    const nextL = b.lines[li + 1] || (BLOCKS[bi + 1] ? BLOCKS[bi + 1].lines[0] : null);
    CALLSPOTS.push({
      part: b.p,
      call: seg[0],
      kind: seg[1],
      pre: l.slice(0, si).map(s => s[0]).join(""),
      post: l.slice(si + 1).map(s => s[0]).join(""),
      prev: prevL ? lineText(prevL) : "",
      next: nextL ? lineText(nextL) : ""
    });
  });
}));
class SmallTalkGame extends React.Component {
  state = {
    screen: "home",
    game: "call",
    diff1: 0,
    diff2: 0,
    fullDiff: 0,
    qi: 0,
    score: 0,
    combo: 0,
    bestCombo: 0,
    correct: 0,
    questions: [],
    picked: null,
    feedback: null,
    missed: [],
    results: [],
    elapsed: 0,
    typed: "",
    studyIdx: 0
  };
  get sec() {
    const q = this.state.questions[this.state.qi];
    return q && q.mode === "full" ? 30 : 20;
  }
  buildCall() {
    const mode = this.state.diff1 === 1 ? "full" : "choice";
    return shuffle(CALLSPOTS).map(sp => ({
      sp,
      answer: sp.call,
      mode,
      typeTarget: sp.call,
      choices: mode === "choice" ? shuffle([sp.call].concat(pickOthers(SHORT_CALLS, sp.call, 2))) : []
    }));
  }
  buildLong() {
    const mode = ["choice", "part", "full"][this.state.diff2];
    const order = [0, 1, 2, 3].concat(shuffle([0, 1, 2, 3]));
    return order.map(li => {
      const answer = LONG[li],
        base = {
          li,
          answer,
          mode,
          typeTarget: answer,
          pre: "",
          post: "",
          choices: []
        };
      if (mode === "full") return base;
      if (mode === "part") {
        const word = LONG_KEYS[li][Math.floor(Math.random() * LONG_KEYS[li].length)];
        const at = answer.indexOf(word);
        return {
          ...base,
          typeTarget: word,
          pre: answer.slice(0, at),
          post: answer.slice(at + word.length)
        };
      }
      const other = shuffle(LONG.filter((_, k) => k !== li))[0];
      return {
        ...base,
        choices: shuffle([answer, LONG_CONF[li], other])
      };
    });
  }
  buildFull() {
    const cands = [];
    let row = 0;
    BLOCKS.forEach(b => b.lines.forEach(l => {
      l.forEach((seg, si) => {
        if (seg[1] !== Y) return;
        const answer = seg[0];
        const poolKey = /^You got me/.test(answer) ? "outro" : answer.length > 8 ? "long" : "short";
        cands.push({
          row,
          answer,
          block: b.p,
          must: ["가빠!", "않아!", "아무렇게 말하지 (Oh no)", "빠져나올 길이 없어!", "너란 것은 약이 없어!"].indexOf(answer) >= 0,
          pre: l.slice(0, si).map(s => s[0]).join(""),
          post: l.slice(si + 1).map(s => s[0]).join(""),
          choices: shuffle([answer].concat(pickOthers(POOLS[poolKey], answer, 2)))
        });
      });
      row += 1;
    }));
    const byRow = {};
    const must = cands.filter(c => c.must);
    must.forEach(c => {
      byRow[c.row] = c;
    });
    shuffle(cands.filter(c => !c.must)).forEach(c => {
      if (Object.keys(byRow).length < 16 && !byRow[c.row]) byRow[c.row] = c;
    });
    const typingMode = this.state.fullDiff === 1;
    return Object.values(byRow).sort((a, b) => a.row - b.row).map(q => typingMode ? {
      ...q,
      mode: "full",
      typeTarget: q.answer,
      choices: []
    } : {
      ...q,
      mode: "choice"
    });
  }
  startClock() {
    this.stopClock();
    this._t0 = Date.now() - (this.state.elapsed || 0) * 1000;
    this._iv = setInterval(this.tick, 60);
  }
  stopClock() {
    if (this._iv) {
      clearInterval(this._iv);
      this._iv = null;
    }
  }
  tick = () => {
    const s = this.state;
    if (s.screen !== "play" || s.feedback) return;
    const elapsed = (Date.now() - this._t0) / 1000;
    if (elapsed >= this.sec) {
      this.setState({
        elapsed: this.sec
      });
      this.resolve(null, true);
    } else this.setState({
      elapsed
    });
  };
  componentWillUnmount() {
    this.stopClock();
  }
  componentDidUpdate() {
    const s = this.state;
    const tk = s.qi + ":" + (s.feedback || "") + ":" + s.screen;
    const q = s.questions[s.qi];
    if (s.screen === "play" && q && q.mode !== "choice" && !s.feedback && this._typeInput && tk !== this._typeKey) {
      this._typeKey = tk;
      this._typeInput.focus();
    }
  }
  scrollToActive(smooth) {
    const sc = this._root?.querySelector("[data-full-scroller]");
    const row = sc && sc.querySelector('[data-active="true"]');
    if (!sc || !row) return;
    const delta = row.getBoundingClientRect().top - sc.getBoundingClientRect().top;
    const top = Math.max(0, sc.scrollTop + delta - sc.clientHeight / 2 + row.offsetHeight / 2);
    if (smooth && sc.scrollTo) sc.scrollTo({
      top,
      behavior: "smooth"
    });else sc.scrollTop = top;
  }
  queueScroll(smooth) {
    [60, 220].forEach(ms => setTimeout(() => {
      if (this.state.game === "full" && this.state.screen === "play") this.scrollToActive(smooth && ms === 60);
    }, ms));
  }
  reset(game, questions) {
    this.setState({
      screen: "play",
      game,
      qi: 0,
      score: 0,
      combo: 0,
      bestCombo: 0,
      correct: 0,
      questions,
      picked: null,
      feedback: null,
      missed: [],
      results: [],
      typed: "",
      elapsed: 0
    }, () => {
      this.startClock();
      if (game === "full") this.queueScroll(false);
    });
  }
  startCall = () => this.reset("call", this.buildCall());
  startLong = () => this.reset("long", this.buildLong());
  startFull = () => this.reset("full", this.buildFull());
  resolve(picked, timeout) {
    const s = this.state,
      q = s.questions[s.qi];
    if (s.feedback || !q) return;
    this.stopClock();
    const ok = !timeout && (q.mode !== "choice" ? norm(picked) === norm(q.typeTarget) && norm(picked) !== "" : picked === q.answer);
    const combo = ok ? s.combo + 1 : 0;
    const miss = s.game === "call" ? {
      p: q.sp.part,
      pc: BLUE,
      t: (q.sp.pre + q.sp.call + q.sp.post).trim()
    } : s.game === "long" ? {
      p: "긴 응원법 " + (q.li + 1) + "번째 줄",
      pc: BLUE,
      t: q.answer
    } : {
      p: q.block,
      pc: OK,
      t: q.pre + q.answer + q.post
    };
    this.stopClock();
    this.setState({
      feedback: ok ? "correct" : timeout ? "timeout" : "wrong",
      picked,
      combo,
      results: s.results.concat([ok]),
      bestCombo: Math.max(s.bestCombo, combo),
      score: s.score + (ok ? 100 + (combo - 1) * 20 : 0),
      correct: s.correct + (ok ? 1 : 0),
      missed: ok ? s.missed : s.missed.concat([miss])
    });
  }
  next = () => {
    const s = this.state;
    if (s.qi + 1 >= s.questions.length) {
      this.stopClock();
      this.setState({
        screen: "result"
      });
      return;
    }
    this.setState({
      qi: s.qi + 1,
      feedback: null,
      picked: null,
      typed: "",
      elapsed: 0
    }, () => {
      this.startClock();
      if (this.state.game === "full") this.queueScroll(true);
    });
  };
  studyCards() {
    if (this.state.game === "long") {
      return LONG.map((t, i) => ({
        kicker: "긴 응원법 · " + (i + 1) + "번째 줄",
        rows: [i > 0 ? {
          p: "앞 줄",
          parts: [{
            t: LONG[i - 1],
            color: "#8f8f8f",
            w: "500"
          }],
          bg: "#141414",
          pc: "#6f6f6f"
        } : null, {
          p: i + 1 + "번째 줄",
          parts: [{
            t,
            color: BLUE,
            w: "800"
          }],
          bg: "#101826",
          pc: BLUE
        }, i < 3 ? {
          p: "다음 줄",
          parts: [{
            t: LONG[i + 1],
            color: "#8f8f8f",
            w: "500"
          }],
          bg: "#141414",
          pc: "#6f6f6f"
        } : null].filter(Boolean)
      }));
    }
    const seen = {};
    return CALLSPOTS.filter(sp => seen[sp.part + sp.call] ? false : seen[sp.part + sp.call] = true).map(sp => ({
      kicker: sp.part,
      rows: [{
        p: "앞 줄",
        parts: [{
          t: sp.prev,
          color: "#8f8f8f",
          w: "500"
        }],
        bg: "#141414",
        pc: "#6f6f6f"
      }, {
        p: sp.kind === B ? "응원법만 크게" : "가사와 함께",
        parts: [{
          t: sp.pre,
          color: "#c9c9c9",
          w: "500"
        }, {
          t: sp.call,
          color: sp.kind === B ? BLUE : OK,
          w: "800"
        }, {
          t: sp.post,
          color: "#c9c9c9",
          w: "500"
        }],
        bg: "#101826",
        pc: BLUE
      }, {
        p: "뒤 줄",
        parts: [{
          t: sp.next,
          color: "#8f8f8f",
          w: "500"
        }],
        bg: "#141414",
        pc: "#6f6f6f"
      }]
    }));
  }
  slotLine(q, fb, typed, pre, post, typing, size) {
    const tone = fb === "correct" ? OK : NG,
      t = !fb ? "#ffd24a" : tone;
    const target = typing ? q.typeTarget : q.answer;
    return {
      parts: pre ? [{
        t: pre,
        color: "#9a9a9a",
        w: "500"
      }] : [],
      after: post ? [{
        t: post,
        color: "#9a9a9a",
        w: "500"
      }] : [],
      mark: t,
      markH: "22px",
      size: size || 15,
      w: "800",
      color: t,
      slotText: fb ? target : typing ? typed : "",
      slotDisplay: "inline-flex",
      slotW: fb ? "0" : Math.max(72, target.length * 14) + "px",
      slotH: fb ? "auto" : "26px",
      slotPad: "2px 12px",
      slotBorder: "2px " + (fb ? "solid " + tone : "dashed #6a5a24"),
      slotBg: fb === "correct" ? OK : fb ? "#2a1512" : "#201d14",
      slotColor: fb === "correct" ? "#0b0b0b" : fb ? "#ffb5aa" : "#ffd24a",
      slotAnim: fb ? "none" : "slotPulse 1.6s ease-in-out infinite"
    };
  }
  plainLine(text, color) {
    return {
      parts: [{
        t: text,
        color,
        w: "500"
      }],
      after: [],
      mark: "transparent",
      markH: "0px",
      size: 14.5,
      w: "500",
      color,
      slotText: "",
      slotDisplay: "none",
      slotW: "0",
      slotH: "auto",
      slotPad: "0",
      slotBorder: "0",
      slotBg: "transparent",
      slotColor: "transparent",
      slotAnim: "none"
    };
  }
  toggleLyrics = () => {
    const lyricsOpen = !this.state.lyricsOpen;
    this.stopClock();
    this.setState({ lyricsOpen }, () => {
      if (!lyricsOpen && !this.state.feedback && ["play", "call", "full"].includes(this.state.screen)) this.startClock();
    });
  };
  render() {
    const v = this.renderVals();
    return <div className="lyrics-game" ref={el => {
      this._root = el;
    }}>
      {this.state.lyricsOpen && <SongChantModal title="Small Talk" onClose={this.toggleLyrics} />}
<div style={{
        "minHeight": "100vh",
        "background": "#1e1e1e",
        "display": "flex",
        "justifyContent": "center",
        "fontFamily": "Pretendard,'Apple SD Gothic Neo','Noto Sans KR','Malgun Gothic',sans-serif",
        "color": "#ffffff"
      }}>
        <div style={{
          "width": "100%",
          "maxWidth": "480px",
          "display": "flex",
          "flexDirection": "column",
          "minHeight": "100vh",
          "paddingBottom": "28px"
        }}>
          <div style={{
            "height": "20px"
          }}></div>
          {v.isHome && <>
            <div style={{
              "display": "flex",
              "flexDirection": "column",
              "gap": "20px",
              "padding": "4px 20px 0"
            }}>
              <div style={{
                "display": "grid",
                "gridTemplateColumns": "1fr auto 1fr",
                "alignItems": "center",
                "gap": "10px"
              }}>
                <Link to="/lyrics-practice" style={{
                  "justifySelf": "start",
                  "display": "flex",
                  "alignItems": "center",
                  "gap": "4px",
                  "height": "40px",
                  "padding": "0 4px",
                  "textDecoration": "none",
                  "color": "#cfcfcf",
                  "fontSize": "13px",
                  "fontWeight": "700",
                  "whiteSpace": "nowrap"
                }}>{"‹ 곡 선택"}</Link>
                <div style={{
                  "fontSize": "22px",
                  "fontWeight": "800",
                  "letterSpacing": "-0.03em",
                  "lineHeight": "1.1",
                  "whiteSpace": "nowrap"
                }}>{"Small Talk"}</div>
                <button type="button" onClick={this.toggleLyrics} style={{
                  "justifySelf": "end",
                  "fontFamily": "inherit",
                  "height": "29px",
                  "padding": "8px 14px",
                  "borderRadius": "999px",
                  "background": "#3a3a3a",
                  "color": "#ffffff",
                  "fontSize": "11px",
                  "fontWeight": "600",
                  "border": "0",
                  "cursor": "pointer",
                  "whiteSpace": "nowrap"
                }}>{"가사·응원법 보기"}</button>
              </div>
              <div style={{
                "background": "#3a3a3a",
                "borderRadius": "20px",
                "padding": "22px 20px",
                "display": "flex",
                "flexDirection": "column",
                "gap": "12px"
              }}>
                <div style={{
                  "display": "flex",
                  "alignItems": "center",
                  "justifyContent": "space-between",
                  "gap": "10px"
                }}>
                  <div style={{
                    "fontSize": "11px",
                    "fontWeight": "800",
                    "letterSpacing": "0.1em",
                    "color": "#5b8cff"
                  }}>{"게임 1 · 응원법"}</div>
                  <button onClick={v.onStudyCall} style={{
                    "fontFamily": "inherit",
                    "display": "flex",
                    "alignItems": "center",
                    "gap": "6px",
                    "fontSize": "13px",
                    "fontWeight": "700",
                    "height": "34px",
                    "padding": "0 14px 0 12px",
                    "borderRadius": "999px",
                    "border": "1px solid #6a6a6a",
                    "background": "#4a4a4a",
                    "color": "#ffffff",
                    "cursor": "pointer",
                    "whiteSpace": "nowrap"
                  }} type="button"><svg viewBox={"0 0 24 24"} width={"15"} height={"15"} fill={"none"} stroke={"#ffffff"} strokeWidth={"2.2"} strokeLinecap={"round"} strokeLinejoin={"round"}><path d={"M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2Z"}></path><path d={"M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7Z"}></path></svg>{"먼저 외우기"}</button>
                </div>
                <div style={{
                  "fontSize": "24px",
                  "fontWeight": "800",
                  "letterSpacing": "-0.03em",
                  "lineHeight": "1.25"
                }}>{"이 자리 응원법 맞히기"}</div>
                <div style={{
                  "fontSize": "14px",
                  "lineHeight": "1.6",
                  "color": "#b5b5b5"
                }}>{"앞뒤 가사를 보고 들어갈 응원법을 골라요."}</div>
                <div style={{
                  "display": "flex",
                  "flexDirection": "column",
                  "gap": "6px",
                  "background": "#141414",
                  "borderRadius": "14px",
                  "padding": "14px 16px"
                }}>
                  <div style={{
                    "fontSize": "14px",
                    "lineHeight": "1.6",
                    "color": "#e4e4e4"
                  }}>{"더 빨라지는 호흡이 "}<span style={{
                      "color": "#ffd24a",
                      "fontWeight": "800"
                    }}>{"가빠!"}</span>{" 숨 가빠"}</div>
                  <div style={{
                    "fontSize": "14px",
                    "lineHeight": "1.6",
                    "color": "#e4e4e4"
                  }}>{"Gotta scream it loud "}<span style={{
                      "color": "#5b8cff",
                      "fontWeight": "800"
                    }}>{"난 좋아!"}</span></div>
                </div>
                <div style={{
                  "display": "flex",
                  "flexDirection": "column",
                  "background": "#2a2a2a",
                  "borderRadius": "16px",
                  "overflow": "hidden"
                }}>
                  {v.starts1.map((d, index) => <React.Fragment key={index}>
                    <button onClick={d.onClick} style={{
                      "fontFamily": "inherit",
                      "display": "grid",
                      "gridTemplateColumns": "1fr auto",
                      "alignItems": "center",
                      "gap": "12px",
                      "width": "100%",
                      "textAlign": "left",
                      "padding": "14px 14px 14px 16px",
                      "border": "0",
                      "borderTop": d.line,
                      "background": "transparent",
                      "color": "#ffffff",
                      "cursor": "pointer"
                    }} type="button">
                      <span style={{
                        "display": "flex",
                        "flexDirection": "column",
                        "gap": "2px",
                        "minWidth": "0"
                      }}>
                        <span style={{
                          "fontSize": "15px",
                          "fontWeight": "800",
                          "letterSpacing": "-0.01em"
                        }}>{d.label}</span>
                        <span style={{
                          "fontSize": "12px",
                          "color": "#9a9a9a"
                        }}>{d.desc}</span>
                      </span>
                      <span style={{
                        "width": "30px",
                        "height": "30px",
                        "borderRadius": "999px",
                        "background": d.play,
                        "display": "flex",
                        "alignItems": "center",
                        "justifyContent": "center",
                        "flexShrink": "0"
                      }}><svg viewBox={"0 0 24 24"} width={"13"} height={"13"} fill={"#0b0b0b"}><path d={"M7 4.5v15l12-7.5Z"}></path></svg></span>
                    </button>
                  </React.Fragment>)}
                </div>
              </div>
              <div style={{
                "background": "#3a3a3a",
                "borderRadius": "20px",
                "padding": "22px 20px",
                "display": "flex",
                "flexDirection": "column",
                "gap": "12px"
              }}>
                <div style={{
                  "display": "flex",
                  "alignItems": "center",
                  "justifyContent": "space-between",
                  "gap": "10px"
                }}>
                  <div style={{
                    "fontSize": "11px",
                    "fontWeight": "800",
                    "letterSpacing": "0.1em",
                    "color": "#5b8cff"
                  }}>{"게임 2 · 긴 응원법"}</div>
                  <button onClick={v.onStudyLong} style={{
                    "fontFamily": "inherit",
                    "display": "flex",
                    "alignItems": "center",
                    "gap": "6px",
                    "fontSize": "13px",
                    "fontWeight": "700",
                    "height": "34px",
                    "padding": "0 14px 0 12px",
                    "borderRadius": "999px",
                    "border": "1px solid #6a6a6a",
                    "background": "#4a4a4a",
                    "color": "#ffffff",
                    "cursor": "pointer",
                    "whiteSpace": "nowrap"
                  }} type="button"><svg viewBox={"0 0 24 24"} width={"15"} height={"15"} fill={"none"} stroke={"#ffffff"} strokeWidth={"2.2"} strokeLinecap={"round"} strokeLinejoin={"round"}><path d={"M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2Z"}></path><path d={"M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7Z"}></path></svg>{"먼저 외우기"}</button>
                </div>
                <div style={{
                  "fontSize": "24px",
                  "fontWeight": "800",
                  "letterSpacing": "-0.03em",
                  "lineHeight": "1.25"
                }}>{"긴 응원법 외우기"}</div>
                <div style={{
                  "fontSize": "14px",
                  "lineHeight": "1.6",
                  "color": "#b5b5b5"
                }}>{"네 줄짜리 응원법을 한 줄씩 채워요."}</div>
                <div style={{
                  "display": "flex",
                  "flexDirection": "column",
                  "gap": "4px",
                  "background": "#141414",
                  "borderRadius": "14px",
                  "padding": "14px 16px"
                }}>
                  <div style={{
                    "fontSize": "14px",
                    "lineHeight": "1.6",
                    "color": "#5b8cff",
                    "fontWeight": "700"
                  }}>{"빠져나갈 수가 없어 김성규는 약이 없어"}</div>
                  <div style={{
                    "fontSize": "14px",
                    "lineHeight": "1.6",
                    "color": "#6f6f6f"
                  }}>{"⋯ 사랑해 김성규 스!몰!토!크!"}</div>
                </div>
                <div style={{
                  "display": "flex",
                  "flexDirection": "column",
                  "background": "#2a2a2a",
                  "borderRadius": "16px",
                  "overflow": "hidden"
                }}>
                  {v.starts2.map((d, index) => <React.Fragment key={index}>
                    <button onClick={d.onClick} style={{
                      "fontFamily": "inherit",
                      "display": "grid",
                      "gridTemplateColumns": "1fr auto",
                      "alignItems": "center",
                      "gap": "12px",
                      "width": "100%",
                      "textAlign": "left",
                      "padding": "14px 14px 14px 16px",
                      "border": "0",
                      "borderTop": d.line,
                      "background": "transparent",
                      "color": "#ffffff",
                      "cursor": "pointer"
                    }} type="button">
                      <span style={{
                        "display": "flex",
                        "flexDirection": "column",
                        "gap": "2px",
                        "minWidth": "0"
                      }}>
                        <span style={{
                          "fontSize": "15px",
                          "fontWeight": "800",
                          "letterSpacing": "-0.01em"
                        }}>{d.label}</span>
                        <span style={{
                          "fontSize": "12px",
                          "color": "#9a9a9a"
                        }}>{d.desc}</span>
                      </span>
                      <span style={{
                        "width": "30px",
                        "height": "30px",
                        "borderRadius": "999px",
                        "background": d.play,
                        "display": "flex",
                        "alignItems": "center",
                        "justifyContent": "center",
                        "flexShrink": "0"
                      }}><svg viewBox={"0 0 24 24"} width={"13"} height={"13"} fill={"#0b0b0b"}><path d={"M7 4.5v15l12-7.5Z"}></path></svg></span>
                    </button>
                  </React.Fragment>)}
                </div>
              </div>
              <div style={{
                "background": "#3a3a3a",
                "borderRadius": "20px",
                "padding": "22px 20px",
                "display": "flex",
                "flexDirection": "column",
                "gap": "12px"
              }}>
                <div style={{
                  "fontSize": "11px",
                  "fontWeight": "800",
                  "letterSpacing": "0.1em",
                  "color": "#ffffff"
                }}>{"게임 3 · 떼창"}</div>
                <div style={{
                  "fontSize": "24px",
                  "fontWeight": "800",
                  "letterSpacing": "-0.03em",
                  "lineHeight": "1.25"
                }}>{"처음부터 끝까지 빈칸 채우기"}</div>
                <div style={{
                  "fontSize": "14px",
                  "lineHeight": "1.6",
                  "color": "#b5b5b5"
                }}>{"전체 가사 속 떼창 부분을 순서대로 채워요."}</div>
                <div style={{
                  "display": "flex",
                  "flexDirection": "column",
                  "background": "#2a2a2a",
                  "borderRadius": "16px",
                  "overflow": "hidden"
                }}>
                  {v.starts3.map((d, index) => <React.Fragment key={index}>
                    <button onClick={d.onClick} style={{
                      "fontFamily": "inherit",
                      "display": "grid",
                      "gridTemplateColumns": "1fr auto",
                      "alignItems": "center",
                      "gap": "12px",
                      "width": "100%",
                      "textAlign": "left",
                      "padding": "14px 14px 14px 16px",
                      "border": "0",
                      "borderTop": d.line,
                      "background": "transparent",
                      "color": "#ffffff",
                      "cursor": "pointer"
                    }} type="button">
                      <span style={{
                        "display": "flex",
                        "flexDirection": "column",
                        "gap": "2px",
                        "minWidth": "0"
                      }}>
                        <span style={{
                          "fontSize": "15px",
                          "fontWeight": "800",
                          "letterSpacing": "-0.01em"
                        }}>{d.label}</span>
                        <span style={{
                          "fontSize": "12px",
                          "color": "#9a9a9a"
                        }}>{d.desc}</span>
                      </span>
                      <span style={{
                        "width": "30px",
                        "height": "30px",
                        "borderRadius": "999px",
                        "background": d.play,
                        "display": "flex",
                        "alignItems": "center",
                        "justifyContent": "center",
                        "flexShrink": "0"
                      }}><svg viewBox={"0 0 24 24"} width={"13"} height={"13"} fill={"#0b0b0b"}><path d={"M7 4.5v15l12-7.5Z"}></path></svg></span>
                    </button>
                  </React.Fragment>)}
                </div>
              </div>
            </div>
 </>}
          {v.isPlaying && <>
            <div style={{
              "display": "flex",
              "flexDirection": "column",
              "gap": "16px",
              "padding": "0 20px"
            }}>
              <div style={{
                "display": "grid",
                "gridTemplateColumns": "1fr auto 1fr",
                "alignItems": "center",
                "gap": "10px"
              }}>
                <button onClick={v.goHome} style={{
                  "justifySelf": "start",
                  "fontFamily": "inherit",
                  "display": "flex",
                  "alignItems": "center",
                  "gap": "4px",
                  "height": "40px",
                  "padding": "0 4px",
                  "border": "0",
                  "background": "transparent",
                  "textDecoration": "none",
                  "color": "#cfcfcf",
                  "fontSize": "13px",
                  "fontWeight": "700",
                  "cursor": "pointer",
                  "whiteSpace": "nowrap"
                }} type="button" aria-label="게임 선택으로 돌아가기">{"‹ 뒤로"}</button>
                <span style={{
                  "fontSize": "17px",
                  "fontWeight": "800",
                  "letterSpacing": "-0.02em",
                  "color": "#ffffff",
                  "whiteSpace": "nowrap"
                }}>{"Small Talk"}</span>
                <span></span>
              </div>
              <div style={{
                "display": "flex",
                "flexDirection": "column",
                "gap": "7px"
              }}>
                <div style={{
                  "display": "flex",
                  "alignItems": "center",
                  "justifyContent": "space-between",
                  "gap": "12px"
                }}>
                  <span style={{
                    "display": "flex",
                    "alignItems": "baseline",
                    "gap": "6px"
                  }}>
                    <span style={{
                      "fontSize": "19px",
                      "fontWeight": "800",
                      "letterSpacing": "-0.02em",
                      "color": "#ffffff"
                    }}>{v.score}</span>
                    <span style={{
                      "fontSize": "11px",
                      "fontWeight": "700",
                      "color": "#8f8f8f"
                    }}>{"P"}</span>
                  </span>
                  <span style={{
                    "display": "flex",
                    "alignItems": "center",
                    "gap": "3px",
                    "flexWrap": "wrap",
                    "justifyContent": "flex-end",
                    "maxWidth": "75%"
                  }}>
                    {v.progress.map((p, index) => <React.Fragment key={index}>
                      <svg viewBox={"0 0 24 24"} width={"15"} height={"15"} fill={p.fill} stroke={p.stroke} strokeWidth={"2"}><path d={"M12 20.5 3.8 12.3a5 5 0 0 1 7.1-7.1l1.1 1.1 1.1-1.1a5 5 0 1 1 7.1 7.1Z"}></path></svg>
                    </React.Fragment>)}
                  </span>
                </div>
                <div style={{
                  "height": "3px",
                  "borderRadius": "999px",
                  "background": "#1f1f1f",
                  "overflow": "hidden"
                }}>
                  <div style={{
                    "height": "100%",
                    "borderRadius": "999px",
                    "background": v.timeColor,
                    "width": v.timePct + "%"
                  }}></div>
                </div>
              </div>
              {v.isCard && <>
                <div style={{
                  "background": "#3a3a3a",
                  "borderRadius": "20px",
                  "padding": "18px",
                  "display": "flex",
                  "flexDirection": "column",
                  "gap": "12px"
                }}>
                  <div style={{
                    "display": "flex",
                    "flexDirection": "column",
                    "gap": "4px"
                  }}>
                    <div style={{
                      "fontSize": "11px",
                      "fontWeight": "800",
                      "letterSpacing": "0.1em",
                      "color": "#6f6f6f"
                    }}>{v.groupName}</div>
                    <div style={{
                      "fontSize": "12px",
                      "fontWeight": "700",
                      "color": "#8f8f8f"
                    }}>{v.prompt}</div>
                  </div>
                  <div style={{
                    "display": "flex",
                    "flexDirection": "column",
                    "gap": "2px"
                  }}>
                    {v.lines.map((l, index) => <React.Fragment key={index}>
                      <div style={{
                        "display": "grid",
                        "gridTemplateColumns": "3px 1fr",
                        "gap": "9px",
                        "alignItems": "center",
                        "padding": "2px 8px 2px 0"
                      }}>
                        <span style={{
                          "width": "3px",
                          "height": l.markH,
                          "borderRadius": "999px",
                          "background": l.mark
                        }}></span>
                        <span style={{
                          "fontSize": l.size + "px",
                          "lineHeight": "1.35",
                          "fontWeight": l.w,
                          "color": l.color
                        }}>{l.parts.map((p, index) => <React.Fragment key={index}><span style={{
                              "color": p.color,
                              "fontWeight": p.w
                            }}>{p.t}</span></React.Fragment>)}<span style={{
                            "display": l.slotDisplay,
                            "alignItems": "center",
                            "minWidth": l.slotW,
                            "height": l.slotH,
                            "padding": l.slotPad,
                            "borderRadius": "10px",
                            "border": l.slotBorder,
                            "background": l.slotBg,
                            "color": l.slotColor,
                            "fontWeight": "800",
                            "animation": l.slotAnim
                          }}>{l.slotText}</span>{l.after.map((a, index) => <React.Fragment key={index}><span style={{
                              "color": a.color,
                              "fontWeight": a.w
                            }}>{a.t}</span></React.Fragment>)}</span>
                      </div>
                    </React.Fragment>)}
                  </div>
                </div>
 </>}
              {v.isFull && <>
                <div data-full-scroller={"1"} style={{
                  "position": "relative",
                  "background": "#3a3a3a",
                  "borderRadius": "20px",
                  "padding": "18px",
                  "height": "320px",
                  "overflowY": "auto",
                  "display": "flex",
                  "flexDirection": "column",
                  "gap": "3px"
                }}>
                  {v.fullRows.map((r, index) => <React.Fragment key={index}>
                    <div data-active={r.active} style={{
                      "fontSize": r.size + "px",
                      "lineHeight": "1.45",
                      "fontWeight": r.weight,
                      "color": r.color,
                      "padding": r.pad
                    }}>{r.pre}<span style={{
                        "display": r.slotDisplay,
                        "minWidth": r.slotW,
                        "height": r.slotH,
                        "verticalAlign": "middle",
                        "alignItems": "center",
                        "background": r.slotBg,
                        "color": r.slotColor,
                        "border": r.slotBorder,
                        "borderRadius": "8px",
                        "padding": r.slotPad,
                        "fontWeight": "800",
                        "animation": r.slotAnim
                      }}>{r.slot}</span>{r.post}</div>
                  </React.Fragment>)}
                </div>
 </>}
              {v.hasChoices && <>
                <div style={{
                  "display": "flex",
                  "flexDirection": "column",
                  "gap": "8px",
                  "opacity": v.choiceOpacity
                }}>
                  {v.choices.map((c, index) => <React.Fragment key={index}>
                    <button onClick={c.onClick} style={{
                      "fontFamily": "inherit",
                      "textAlign": "left",
                      "fontSize": "16px",
                      "fontWeight": "600",
                      "minHeight": "56px",
                      "padding": "12px 16px",
                      "borderRadius": "16px",
                      "cursor": "pointer",
                      "background": c.bg,
                      "color": c.fg,
                      "border": "2px solid " + c.border,
                      "display": "flex",
                      "alignItems": "center",
                      "justifyContent": "space-between",
                      "gap": "10px"
                    }} type="button" disabled={v.feedback}><span>{c.t}</span><span style={{
                        "fontSize": "10.5px",
                        "fontWeight": "800",
                        "padding": "4px 9px",
                        "borderRadius": "999px",
                        "whiteSpace": "nowrap",
                        "flexShrink": "0",
                        "background": c.badgeBg,
                        "color": c.badgeFg
                      }}>{c.badge}</span></button>
                  </React.Fragment>)}
                </div>
 </>}
              {v.isTyping && <>
                <div style={{
                  "display": "flex",
                  "flexDirection": "column",
                  "gap": "10px",
                  "opacity": v.choiceOpacity
                }}>
                  <div style={{
                    "fontSize": "12px",
                    "fontWeight": "700",
                    "color": "#8f8f8f"
                  }}>{v.typeHint}</div>
                  <input value={v.typedValue} onChange={v.onTypeChange} onKeyDown={v.onTypeKey} ref={v.typeRef} placeholder={"여기에 입력"} style={{
                    "fontFamily": "inherit",
                    "fontSize": "17px",
                    "height": "56px",
                    "padding": "0 16px",
                    "borderRadius": "16px",
                    "border": "2px solid #3a3a3a",
                    "background": "#141414",
                    "color": "#ffffff",
                    "outline": "none",
                    "boxShadow": "none"
                  }} aria-label={v.typeHint} disabled={v.feedback} />
                  <button onClick={v.onTypeSubmit} style={{
                    "fontFamily": "inherit",
                    "fontSize": "16px",
                    "fontWeight": "800",
                    "height": "54px",
                    "borderRadius": "999px",
                    "border": "0",
                    "cursor": "pointer",
                    "background": v.submitBg,
                    "color": v.submitFg
                  }} type="button">{"확인"}</button>
                </div>
 </>}
              {v.feedback && <>
                <div style={{
                  "height": v.sheetSpace
                }}></div>
                <div className="lyrics-game-feedback">
                  <div style={{
                    "width": "100%",
                    "maxWidth": "480px",
                    "background": "#161616",
                    "borderTop": "4px solid " + v.fbTone,
                    "borderRadius": "24px 24px 0 0",
                    "boxShadow": "0 -18px 40px rgba(0,0,0,0.55)",
                    "padding": "16px 20px 22px",
                    "display": "flex",
                    "flexDirection": "column",
                    "gap": "12px",
                    "pointerEvents": "auto"
                  }}>
                    <div style={{
                      "display": "flex",
                      "justifyContent": "space-between",
                      "alignItems": "center",
                      "gap": "12px"
                    }}>
                      <span style={{
                        "display": "flex",
                        "flexDirection": "column",
                        "gap": "3px"
                      }}>
                        <span style={{
                          "fontSize": "12px",
                          "fontWeight": "800",
                          "letterSpacing": "0.08em",
                          "color": v.fbTone
                        }}>{v.fbVerdict}</span>
                        <span style={{
                          "fontSize": "16px",
                          "fontWeight": "800",
                          "letterSpacing": "-0.02em",
                          "lineHeight": "1.35",
                          "color": "#ffffff"
                        }}>{v.fbTitle}</span>
                      </span>
                      <span style={{
                        "fontSize": "15px",
                        "fontWeight": "800",
                        "color": v.fbTone,
                        "whiteSpace": "nowrap"
                      }}>{v.gained}</span>
                    </div>
                    {v.hasCompare && <>
                      <div style={{
                        "display": "flex",
                        "flexDirection": "column",
                        "gap": "7px",
                        "background": "#0f0f0f",
                        "borderRadius": "16px",
                        "padding": "14px 16px"
                      }}>
                        <div style={{
                          "fontSize": "11px",
                          "fontWeight": "800",
                          "letterSpacing": "0.08em",
                          "color": "#6f6f6f"
                        }}>{v.compareTitle}</div>
                        {v.compare.map((c, index) => <React.Fragment key={index}>
                          <div style={{
                            "display": "grid",
                            "gridTemplateColumns": "8px 1fr",
                            "gap": "10px",
                            "alignItems": "center"
                          }}>
                            <span style={{
                              "width": "8px",
                              "height": "8px",
                              "borderRadius": "999px",
                              "background": c.dot
                            }}></span>
                            <span style={{
                              "fontSize": "14.5px",
                              "lineHeight": "1.45",
                              "fontWeight": c.w,
                              "color": c.color
                            }}>{c.t}</span>
                          </div>
                        </React.Fragment>)}
                      </div>
 </>}
                    <button onClick={v.onNext} style={{
                      "fontFamily": "inherit",
                      "fontSize": "16px",
                      "fontWeight": "800",
                      "height": "54px",
                      "borderRadius": "999px",
                      "border": "0",
                      "cursor": "pointer",
                      "background": "#ffffff",
                      "color": "#0b0b0b"
                    }} type="button">{v.nextLabel}</button>
                  </div>
                </div>
 </>}
            </div>
 </>}
          {v.isStudy && <>
            <div style={{
              "display": "flex",
              "flexDirection": "column",
              "gap": "14px",
              "padding": "0 20px"
            }}>
              <div style={{
                "display": "grid",
                "gridTemplateColumns": "1fr auto 1fr",
                "alignItems": "center",
                "gap": "10px"
              }}>
                <button onClick={v.goHome} style={{
                  "justifySelf": "start",
                  "fontFamily": "inherit",
                  "display": "flex",
                  "alignItems": "center",
                  "gap": "4px",
                  "height": "40px",
                  "padding": "0 4px",
                  "border": "0",
                  "background": "transparent",
                  "textDecoration": "none",
                  "color": "#cfcfcf",
                  "fontSize": "13px",
                  "fontWeight": "700",
                  "cursor": "pointer",
                  "whiteSpace": "nowrap"
                }} type="button" aria-label="게임 선택으로 돌아가기">{"‹ 뒤로"}</button>
                <span style={{
                  "fontSize": "17px",
                  "fontWeight": "800",
                  "letterSpacing": "-0.02em",
                  "color": "#ffffff",
                  "whiteSpace": "nowrap"
                }}>{v.studyTitle}</span>
                <span style={{
                  "justifySelf": "end",
                  "fontSize": "13px",
                  "fontWeight": "700",
                  "color": "#8f8f8f"
                }}>{v.studyCounter}</span>
              </div>
              <div style={{
                "display": "flex",
                "gap": "4px"
              }}>
                {v.studyDots.map((d, index) => <React.Fragment key={index}>
                  <span style={{
                    "flex": "1",
                    "height": "4px",
                    "borderRadius": "999px",
                    "background": d.bg
                  }}></span>
                </React.Fragment>)}
              </div>
              <div style={{
                "background": "#3a3a3a",
                "borderRadius": "20px",
                "padding": "22px 20px",
                "display": "flex",
                "flexDirection": "column",
                "gap": "16px",
                "minHeight": "240px"
              }}>
                <div style={{
                  "fontSize": "11px",
                  "fontWeight": "800",
                  "letterSpacing": "0.1em",
                  "color": "#5b8cff"
                }}>{v.studyKicker}</div>
                <div style={{
                  "display": "flex",
                  "flexDirection": "column",
                  "gap": "10px"
                }}>
                  {v.studyRows.map((r, index) => <React.Fragment key={index}>
                    <div style={{
                      "display": "flex",
                      "flexDirection": "column",
                      "gap": "5px",
                      "background": r.bg,
                      "borderRadius": "14px",
                      "padding": "12px 14px"
                    }}>
                      <span style={{
                        "fontSize": "11px",
                        "fontWeight": "800",
                        "letterSpacing": "0.06em",
                        "color": r.pc
                      }}>{r.p}</span>
                      <span style={{
                        "fontSize": "17px",
                        "lineHeight": "1.45",
                        "fontWeight": "500",
                        "color": "#c9c9c9"
                      }}>{r.parts.map((p, index) => <React.Fragment key={index}><span style={{
                            "color": p.color,
                            "fontWeight": p.w
                          }}>{p.t}</span></React.Fragment>)}</span>
                    </div>
                  </React.Fragment>)}
                </div>
              </div>
              <div style={{
                "display": "flex",
                "gap": "8px"
              }}>
                <button onClick={v.studyPrev} style={{
                  "flex": "1",
                  "fontFamily": "inherit",
                  "fontSize": "15px",
                  "fontWeight": "700",
                  "height": "54px",
                  "borderRadius": "999px",
                  "border": "1px solid #3a3a3a",
                  "cursor": "pointer",
                  "background": "transparent",
                  "color": v.prevFg
                }} type="button">{"이전"}</button>
                <button onClick={v.studyNext} style={{
                  "flex": "1",
                  "fontFamily": "inherit",
                  "fontSize": "15px",
                  "fontWeight": "800",
                  "height": "54px",
                  "borderRadius": "999px",
                  "border": "0",
                  "cursor": "pointer",
                  "background": "#ffffff",
                  "color": "#0b0b0b"
                }} type="button">{"다음"}</button>
              </div>
              <button onClick={v.studyToQuiz} style={{
                "fontFamily": "inherit",
                "fontSize": "16px",
                "fontWeight": "800",
                "height": "56px",
                "borderRadius": "999px",
                "border": "0",
                "cursor": "pointer",
                "background": "#5b8cff",
                "color": "#0b0b0b"
              }} type="button">{"바로 문제 풀기"}</button>
            </div>
 </>}
          {v.isResult && <>
            <div style={{
              "display": "flex",
              "flexDirection": "column",
              "gap": "14px",
              "padding": "0 20px"
            }}>
              <div style={{
                "background": v.resultBg,
                "color": "#0b0b0b",
                "borderRadius": "24px",
                "padding": "26px 22px"
              }}>
                <div style={{
                  "fontSize": "12px",
                  "fontWeight": "700"
                }}>{"라운드 종료 · " + v.resultGame}</div>
                <div style={{
                  "fontSize": "62px",
                  "fontWeight": "800",
                  "letterSpacing": "-0.04em",
                  "lineHeight": "1",
                  "marginTop": "10px"
                }}>{v.score}</div>
                <div style={{
                  "fontSize": "13px",
                  "fontWeight": "600",
                  "marginTop": "8px"
                }}>{v.praise}</div>
              </div>
              <div style={{
                "display": "grid",
                "gridTemplateColumns": "1fr 1fr",
                "gap": "10px"
              }}>
                <div style={{
                  "background": "#3a3a3a",
                  "borderRadius": "16px",
                  "padding": "16px 14px"
                }}>
                  <div style={{
                    "fontSize": "11px",
                    "color": "#8f8f8f",
                    "fontWeight": "600"
                  }}>{"정답률"}</div>
                  <div style={{
                    "fontSize": "24px",
                    "fontWeight": "800",
                    "marginTop": "6px"
                  }}>{v.correctRate + "%"}</div>
                </div>
                <div style={{
                  "background": "#3a3a3a",
                  "borderRadius": "16px",
                  "padding": "16px 14px"
                }}>
                  <div style={{
                    "fontSize": "11px",
                    "color": "#8f8f8f",
                    "fontWeight": "600"
                  }}>{"최고 콤보"}</div>
                  <div style={{
                    "fontSize": "24px",
                    "fontWeight": "800",
                    "marginTop": "6px"
                  }}>{v.bestCombo}</div>
                </div>
              </div>
              <div style={{
                "background": "#3a3a3a",
                "borderRadius": "20px",
                "padding": "18px",
                "display": "flex",
                "flexDirection": "column",
                "gap": "12px"
              }}>
                <div style={{
                  "fontSize": "13px",
                  "fontWeight": "700",
                  "color": "#9a9a9a"
                }}>{"놓친 자리"}</div>
                {v.missed.map((m, index) => <React.Fragment key={index}>
                  <div style={{
                    "display": "flex",
                    "flexDirection": "column",
                    "gap": "4px",
                    "background": "#141414",
                    "borderRadius": "14px",
                    "padding": "12px 14px"
                  }}>
                    <span style={{
                      "fontSize": "11px",
                      "fontWeight": "800",
                      "color": m.pc
                    }}>{m.p}</span>
                    <span style={{
                      "fontSize": "15px",
                      "fontWeight": "600",
                      "lineHeight": "1.45"
                    }}>{m.t}</span>
                  </div>
                </React.Fragment>)}
                {v.perfect && <>
                  <div style={{
                    "fontSize": "15px",
                    "fontWeight": "600",
                    "color": "#ffd24a"
                  }}>{"한 문제도 놓치지 않았어요 ✦"}</div>
 </>}
              </div>
              <button onClick={v.onRetry} style={{
                "fontFamily": "inherit",
                "fontSize": "16px",
                "fontWeight": "800",
                "height": "56px",
                "borderRadius": "999px",
                "border": "0",
                "cursor": "pointer",
                "background": "#ffffff",
                "color": "#0b0b0b"
              }} type="button">{"한 번 더"}</button>
              <button onClick={v.goHome} style={{
                "fontFamily": "inherit",
                "fontSize": "16px",
                "fontWeight": "700",
                "height": "56px",
                "borderRadius": "999px",
                "border": "1px solid #3a3a3a",
                "cursor": "pointer",
                "background": "transparent",
                "color": "#ffffff"
              }} type="button" aria-label="게임 선택으로 돌아가기">{"처음으로"}</button>
            </div>
 </>}
        </div>
      </div>
    </div>;
  }
  renderVals() {
    const s = this.state;
    const nav = screen => () => {
      this.stopClock();
      this.setState({
        screen
      });
    };
    const seg = (labels, key, cur) => labels.map((label, i) => ({
      label,
      bg: cur === i ? "#ffffff" : "transparent",
      fg: cur === i ? "#0b0b0b" : "#8f8f8f",
      onClick: () => this.setState({
        [key]: i
      })
    }));
    const base = {
      isHome: s.screen === "home",
      isPlaying: s.screen === "play",
      isStudy: s.screen === "study",
      isResult: s.screen === "result",
      isCard: s.screen === "play" && s.game !== "full",
      isFull: s.screen === "play" && s.game === "full",
      score: s.score,
      bestCombo: s.bestCombo,
      callCount: CALLSPOTS.length,
      longCount: 8,
      fullCount: this.buildFull().length,
      diffs1: seg(["보기 고르기", "직접 입력"], "diff1", s.diff1),
      diffs2: seg(["보기 고르기", "단어 입력", "전체 입력"], "diff2", s.diff2),
      starts3: [["보기 고르기", "3개 중 고르기"], ["전체 입력", "빈칸 전체를 직접 입력"]].map(([label, d], i) => ({
        label,
        desc: this.buildFull().length + "칸 · " + d,
        play: "#ffffff",
        line: i ? "1px solid #3a3a3a" : "0",
        onClick: () => this.setState({
          fullDiff: i
        }, this.startFull)
      })),
      starts1: [{
        label: "보기 고르기",
        desc: CALLSPOTS.length + "문제 · 3개 중 고르기",
        level: "쉬움"
      }, {
        label: "단어 입력",
        desc: CALLSPOTS.length + "문제 · 빈 단어만 입력",
        level: "어려움"
      }].map((o, i) => ({
        ...o,
        play: BLUE,
        line: i ? "1px solid #3a3a3a" : "0",
        onClick: () => this.setState({
          diff1: i
        }, this.startCall)
      })),
      starts2: [{
        label: "보기 고르기",
        desc: "8문제 · 3개 중 고르기",
        level: "쉬움"
      }, {
        label: "단어 입력",
        desc: "8문제 · 빈 단어만 입력",
        level: "보통"
      }, {
        label: "전체 입력",
        desc: "8문제 · 한 줄 전체 입력",
        level: "어려움"
      }].map((o, i) => ({
        ...o,
        play: BLUE,
        line: i ? "1px solid #3a3a3a" : "0",
        onClick: () => this.setState({
          diff2: i
        }, this.startLong)
      })),
      starts1Count: CALLSPOTS.length,
      starts2Count: 8,
      goHome: nav("home"),
      onStartCall: this.startCall,
      onStartLong: this.startLong,
      onStartFull: this.startFull,
      onStudyCall: () => {
        this.stopClock();
        this.setState({
          screen: "study",
          game: "call",
          studyIdx: 0
        });
      },
      onStudyLong: () => {
        this.stopClock();
        this.setState({
          screen: "study",
          game: "long",
          studyIdx: 0
        });
      },
      onRetry: () => s.game === "call" ? this.startCall() : s.game === "long" ? this.startLong() : this.startFull()
    };
    if (s.screen === "study") {
      const cards = this.studyCards();
      const i = Math.min(s.studyIdx, cards.length - 1),
        card = cards[i];
      const go = () => s.game === "long" ? this.startLong() : this.startCall();
      return {
        ...base,
        studyTitle: s.game === "long" ? "긴 응원법 미리 외우기" : "응원법 미리 외우기",
        studyCounter: i + 1 + " / " + cards.length,
        studyDots: cards.map((c, ci) => ({
          bg: ci === i ? BLUE : ci < i ? "#4a4a4a" : "#1f1f1f"
        })),
        studyKicker: card.kicker,
        studyRows: card.rows,
        prevFg: i > 0 ? "#ffffff" : "#5a5a5a",
        studyPrev: () => this.setState({
          studyIdx: Math.max(0, i - 1)
        }),
        studyNext: () => i + 1 >= cards.length ? go() : this.setState({
          studyIdx: i + 1
        }),
        studyToQuiz: go
      };
    }
    if (s.screen === "result") {
      const rate = Math.round(s.correct / Math.max(1, s.questions.length) * 100);
      return {
        ...base,
        correctRate: rate,
        missed: s.missed,
        perfect: s.missed.length === 0,
        resultGame: s.game === "call" ? "이 자리 응원법 맞히기" : s.game === "long" ? "긴 응원법 외우기" : "처음부터 끝까지 빈칸 채우기",
        resultBg: s.game === "full" ? "#ffffff" : BLUE,
        praise: rate === 100 ? s.game === "call" ? "응원법 자리를 모두 맞혔어요. 공연장에서 크게 외쳐 주세요!" : s.game === "long" ? "긴 응원법까지 완벽해요. 사랑해 김성규 스!몰!토!크!" : "떼창 구간을 빈틈없이 채웠어요. 공연장에서 같이 불러요!" : rate >= 70 ? "거의 다 왔어요. 한 번만 더" : "먼저 외우기부터 다시 볼까요"
      };
    }
    const q = s.questions[s.qi];
    if (s.screen !== "play" || !q) return base;
    const fb = s.feedback,
      tone = fb === "correct" ? OK : NG,
      typing = q.mode !== "choice",
      sec = this.sec;
    const v = {
      ...base,
      playTitle: s.game === "call" ? "이 자리 응원법 맞히기" : s.game === "long" ? "긴 응원법 외우기" : "처음부터 끝까지 빈칸 채우기",
      timePct: Math.max(0, 100 - s.elapsed / sec * 100),
      timeColor: s.elapsed / sec > 0.75 ? "#8f8f8f" : "#ffffff",
      progress: s.questions.map((_, i) => {
        if (i < s.results.length) return s.results[i] ? {
          fill: OK,
          stroke: OK
        } : {
          fill: "none",
          stroke: "#3a3a3a"
        };
        return {
          fill: "none",
          stroke: i === s.results.length ? "#ffffff" : "#5a5a5a"
        };
      }),
      hasChoices: !typing,
      isTyping: typing,
      choiceOpacity: fb ? 0.55 : 1,
      choices: q.choices.map(t => ({
        t,
        ...choiceState(fb, t, q.answer, s.picked),
        onClick: () => {
          if (!fb) this.resolve(t);
        }
      })),
      typeHint: q.mode === "full" ? s.game === "long" ? "이 줄 전체를 입력하세요" : s.game === "full" ? "빈칸에 들어갈 가사를 입력하세요 (느낌표·띄어쓰기는 무시)" : "응원법을 입력하세요 (느낌표·띄어쓰기는 무시)" : "빈칸에 들어갈 말을 입력하세요",
      typedValue: s.typed,
      typeRef: el => {
        this._typeInput = el;
      },
      onTypeChange: e => this.setState({
        typed: e.target.value
      }),
      onTypeKey: e => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing && !fb && s.typed.trim()) this.resolve(s.typed);
      },
      onTypeSubmit: () => {
        if (!fb && s.typed.trim()) this.resolve(s.typed);
      },
      submitBg: s.typed.trim() ? BLUE : "#2a2a2a",
      submitFg: s.typed.trim() ? "#0b0b0b" : "#5f5f5f",
      feedback: !!fb,
      fbTone: tone,
      fbVerdict: fb === "correct" ? "정답" : fb === "timeout" ? "시간 초과" : "오답",
      fbTitle: q.answer,
      gained: fb === "correct" ? "+" + (100 + s.combo * 20 - 20) : "",
      hasCompare: s.game === "long",
      compareTitle: "긴 응원법 전체",
      compare: s.game === "long" ? LONG.map((t, i) => ({
        t,
        w: i === q.li ? "800" : "500",
        color: i === q.li ? "#ffffff" : "#8f8f8f",
        dot: i === q.li ? tone : "#3a3a3a"
      })) : [],
      sheetSpace: s.game === "long" ? "300px" : "160px",
      nextLabel: s.qi + 1 >= s.questions.length ? "결과 보기" : "다음",
      onNext: () => {
        if (fb) this.next();
      }
    };
    if (s.game === "call") {
      v.groupName = q.sp.part;
      v.prompt = "이 자리에 들어갈 응원법은?";
      v.lines = [this.plainLine(q.sp.prev, "#8f8f8f"), this.slotLine(q, fb, s.typed, q.sp.pre, q.sp.post, typing, 15), this.plainLine(q.sp.next, "#8f8f8f")];
    }
    if (s.game === "long") {
      v.groupName = "긴 응원법 · " + (q.li + 1) + " / 4번째 줄";
      v.prompt = "빈 줄에 들어갈 응원법은?";
      v.lines = LONG.map((t, i) => i === q.li ? this.slotLine(q, fb, s.typed, q.pre, q.post, typing, 15) : this.plainLine(t, "#c9c9c9"));
    }
    if (s.game === "full") {
      const byRow = {};
      s.questions.forEach((x, xi) => {
        byRow[x.row] = {
          q: x,
          i: xi
        };
      });
      const rows = [];
      const none = {
        slot: "",
        slotDisplay: "none",
        slotW: "0",
        slotH: "auto",
        slotBg: "transparent",
        slotColor: "#ffffff",
        slotBorder: "0",
        slotPad: "0",
        slotAnim: "none",
        post: ""
      };
      let ri = 0;
      BLOCKS.forEach(b => {
        rows.push({
          ...none,
          active: "false",
          pre: "",
          size: 11,
          weight: "800",
          color: "#6f6f6f",
          pad: rows.length ? "7px 0 0" : "0"
        });
        b.lines.forEach(l => {
          const hit = byRow[ri];
          if (hit) {
            const active = hit.i === s.qi,
              done = hit.i < s.qi || (active && fb),
              answered = active && fb;
            rows.push({
              active: active ? "true" : "false",
              pre: hit.q.pre,
              post: hit.q.post,
              slot: done ? hit.q.answer : active && hit.q.mode === "full" ? s.typed : "",
              size: active ? 16 : 14.5,
              weight: active ? "700" : "500",
              color: active ? "#ffffff" : done ? "#9a9a9a" : "#5a5a5a",
              pad: "3px 6px",
              slotDisplay: "inline-flex",
              slotW: active && !fb ? Math.max(84, hit.q.answer.length * 13) + "px" : done ? "0" : Math.max(48, hit.q.answer.length * 9) + "px",
              slotH: active && !fb ? "24px" : done ? "auto" : "18px",
              slotBg: answered ? fb === "correct" ? OK : "#2a1512" : active ? "#201d14" : done ? "transparent" : "#242424",
              slotColor: answered ? fb === "correct" ? "#0b0b0b" : "#ffb5aa" : "#ffd24a",
              slotBorder: answered ? "2px solid " + tone : active ? "2px dashed #6a5a24" : "0",
              slotPad: active ? "1px 10px" : "0",
              slotAnim: active && !fb ? "slotPulse 1.6s ease-in-out infinite" : "none"
            });
          } else {
            rows.push({
              ...none,
              active: "false",
              pre: lineText(l),
              size: 14.5,
              weight: "500",
              color: "#8f8f8f",
              pad: "3px 6px"
            });
          }
          ri += 1;
        });
      });
      v.fullRows = rows;
      v.progress = [];
    }
    return v;
  }
}
export default SmallTalkGame;
