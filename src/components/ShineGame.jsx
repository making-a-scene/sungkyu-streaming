import SongChantModal from './SongChantModal';
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/lyricsGame.css';
const BLOCKS = [{
  p: "1절",
  lines: ["늘 항상 이 맘 때쯤엔", "니가 내게 했던 그 말이 떠올라", "언젠가 오랜 시간이 지나", "우리 함께가 아니더라도", "눈부실 정도로 아름다운", "지금 이 순간을 꼭 기억해줘", "모든게 희미해져 가도", "이 순간만큼은 꼭 잊지 말고 선명히"]
}, {
  p: "1절 후렴",
  lines: ["나의 손을 꼭 잡고", "조용히 입을 맞추던", "너의 모습을 기억해", "I miss you oh yes I do", "나의 발등에 올라", "사랑을 속삭여주던", "너의 눈빛을 기억해", "I miss you oh I still do"]
}, {
  p: "2절",
  lines: ["늘 항상 이 계절이 오면", "너와 나의 마지막 즈음이 떠올라", "모든게 멀어지고 또 그 어떤 것도", "돌이킬 수가 없었던", "눈부시게 빛나던 순간들엔", "어느새 어두운 그늘지고", "지켜질 수 없었던 약속들만", "힘없이 부서지고 있던 그때", "하지만 난"]
}, {
  p: "2절 후렴",
  lines: ["나의 손을 꼭 잡고", "조용히 입을 맞추던", "너의 모습을 기억해", "I miss you oh yes I do", "나의 발등에 올라", "사랑을 속삭여주던", "너의 눈빛을 기억해", "I miss you oh I still do"]
}, {
  p: "브릿지",
  lines: ["너의 목소리 너의 그 눈빛", "내게 와서 머물러주던 너의 손길", "그 어떤 것도 잊질 못해", "마치 손을 내밀면 닿을 듯 선명해", "너의 숨소리 너의 그 손짓", "나를 따뜻하게 감싸주던 그 손길", "그 어떤 것도 잊질 못해", "마치 손을 내밀면 닿을 듯 선명해"]
}, {
  p: "아웃트로",
  lines: ["I miss you", "I miss you", "I miss you"]
}];

// 비슷한 두 소절: 같은 줄 위치에 [첫 번째, 두 번째] 버전. 같은 줄은 문맥으로만 보여준다.
const GROUPS = [{
  name: "후렴",
  slots: [["나의 손을 꼭 잡고", "나의 발등에 올라"], ["조용히 입을 맞추던", "사랑을 속삭여주던"], ["너의 모습을 기억해", "너의 눈빛을 기억해"], ["I miss you oh yes I do", "I miss you oh I still do"]]
}, {
  name: "브릿지",
  slots: [["너의 목소리 너의 그 눈빛", "너의 숨소리 너의 그 손짓"], ["내게 와서 머물러주던 너의 손길", "나를 따뜻하게 감싸주던 그 손길"], ["그 어떤 것도 잊질 못해", "그 어떤 것도 잊질 못해"], ["마치 손을 내밀면 닿을 듯 선명해", "마치 손을 내밀면 닿을 듯 선명해"]]
}];
const VERS = ["첫 번째", "두 번째"];
const OK = "#ffd24a",
  NG = "#ff5c47",
  SEC = 20;
const varies = v => v[0] !== v[1];
function shuffle(a) {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

// 두 줄에서 처음 달라지는 단어 (너무 짧으면 다음 단어까지)
function diffWord(a, b) {
  const ta = a.split(" "),
    tb = b.split(" ");
  let i = ta.findIndex((t, k) => t !== tb[k]);
  if (i < 0) i = 0;
  let word = ta[i];
  if (word.length < 2 && ta[i + 1]) word += " " + ta[i + 1];
  const at = ta.slice(0, i).join(" ").length + (i > 0 ? 1 : 0);
  return {
    word,
    at
  };
}

// 상대 소절과 다른 단어만 흰색 볼드
function boldDiff(text, twin, base) {
  const ta = text.split(" "),
    tb = twin.split(" ");
  return ta.map((t, i) => {
    const d = t !== tb[i];
    return {
      t: t + (i < ta.length - 1 ? " " : ""),
      color: d ? "#ffffff" : base,
      w: d ? "800" : "500"
    };
  });
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
function lineChoices(gi, si, vi) {
  const v = GROUPS[gi].slots[si],
    answer = v[vi],
    twin = v[1 - vi];
  const pool = shuffle(GROUPS.flatMap((g, gj) => g.slots.filter((x, k) => varies(x) && !(gj === gi && k === si)).flat())).filter(t => t !== answer && t !== twin);
  return shuffle([answer, twin, pool[0]]);
}
class ShineGame extends React.Component {
  state = {
    screen: "home",
    game: "blank",
    diff: 0,
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
  get blankCount() {
    return GROUPS.reduce((n, g) => n + g.slots.filter(varies).length * 2, 0);
  }
  buildBlank() {
    const mode = ["choice", "part", "full"][this.state.diff];
    const qs = [];
    GROUPS.forEach((g, gi) => g.slots.forEach((v, si) => {
      if (varies(v)) [0, 1].forEach(vi => qs.push({
        gi,
        si,
        vi
      }));
    }));
    return shuffle(qs).map(({
      gi,
      si,
      vi
    }) => {
      const v = GROUPS[gi].slots[si],
        answer = v[vi],
        twin = v[1 - vi];
      const base = {
        gi,
        si,
        vi,
        answer,
        mode,
        pre: "",
        post: "",
        choices: [],
        typeTarget: answer
      };
      if (mode === "full") return base;
      if (mode === "part") {
        const d = diffWord(answer, twin);
        return {
          ...base,
          typeTarget: d.word,
          pre: answer.slice(0, d.at),
          post: answer.slice(d.at + d.word.length)
        };
      }
      return {
        ...base,
        choices: lineChoices(gi, si, vi)
      };
    });
  }
  buildFull() {
    const qs = [];
    let row = 0;
    BLOCKS.forEach(b => b.lines.forEach(t => {
      GROUPS.forEach((g, gi) => g.slots.forEach((v, si) => {
        if (!varies(v)) return;
        const vi = v.indexOf(t);
        if (vi >= 0) qs.push(this.state.fullDiff === 1 ? {
          row,
          gi,
          si,
          vi,
          answer: t,
          mode: "full",
          typeTarget: t,
          choices: []
        } : {
          row,
          gi,
          si,
          vi,
          answer: t,
          mode: "choice",
          choices: lineChoices(gi, si, vi)
        });
      }));
      row += 1;
    }));
    return qs;
  }
  get fullCount() {
    return this.buildFull().length;
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
  ensureClock() {
    const s = this.state,
      playing = (s.screen === "play" || s.screen === "full") && !s.feedback && !s.lyricsOpen;
    if (playing && !this._iv) this.startClock();
    if (!playing && this._iv) this.stopClock();
  }
  tick = () => {
    const s = this.state;
    if ((s.screen !== "play" && s.screen !== "full") || s.feedback) return;
    const elapsed = (Date.now() - this._t0) / 1000;
    if (elapsed >= SEC) {
      this.setState({
        elapsed: SEC
      });
      this.resolve(null, true);
    } else this.setState({
      elapsed
    });
  };
  componentDidMount() {
    this.ensureClock();
  }
  componentWillUnmount() {
    this.stopClock();
  }
  componentDidUpdate() {
    this.ensureClock();
    const s = this.state;
    const tk = s.screen + ":" + s.qi + ":" + (s.feedback || "");
    const cq = s.questions[s.qi];
    if ((s.screen === "play" || s.screen === "full") && cq && cq.mode !== "choice" && !s.feedback && this._typeInput && tk !== this._typeKey) {
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
      if (this.state.screen === "full") this.scrollToActive(smooth && ms === 60);
    }, ms));
  }
  reset(screen, game, questions) {
    this.setState({
      screen,
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
      if (screen === "full") this.queueScroll(false);
    });
  }
  startBlank = () => this.reset("play", "blank", this.buildBlank());
  startFull = () => this.reset("full", "full", this.buildFull());
  resolve(picked, timeout) {
    const s = this.state,
      q = s.questions[s.qi];
    if (s.feedback || !q) return;
    this.stopClock();
    const norm = t => String(t == null ? "" : t).normalize("NFC").toLowerCase().replace(/[\s!.,'"()]+/g, "");
    const target = q.typeTarget != null ? q.typeTarget : q.answer;
    const ok = !timeout && (q.mode !== "choice" ? norm(picked) !== "" && norm(picked) === norm(target) : picked === q.answer);
    const combo = ok ? s.combo + 1 : 0;
    this.setState({
      feedback: ok ? "correct" : timeout ? "timeout" : "wrong",
      picked,
      combo,
      results: s.results.concat([ok]),
      bestCombo: Math.max(s.bestCombo, combo),
      score: s.score + (ok ? 100 + (combo - 1) * 20 : 0),
      correct: s.correct + (ok ? 1 : 0),
      missed: ok ? s.missed : s.missed.concat([{
        p: GROUPS[q.gi].name + " " + VERS[q.vi],
        t: q.answer
      }])
    });
  }
  next = () => {
    const s = this.state;
    if (s.qi + 1 >= s.questions.length) {
      this.stopClock();
      this.setState({
        screen: "result"
      });
    } else this.setState({
      qi: s.qi + 1,
      feedback: null,
      picked: null,
      typed: "",
      elapsed: 0
    }, () => {
      this.startClock();
      if (this.state.screen === "full") this.queueScroll(true);
    });
  };
  studyCards() {
    const cards = [];
    GROUPS.forEach(g => g.slots.forEach((v, si) => {
      if (!varies(v)) return;
      cards.push({
        kicker: g.name + " · " + (si + 1) + "번째 줄",
        rows: VERS.map((p, vi) => ({
          p,
          parts: boldDiff(v[vi], v[1 - vi], "#c9c9c9")
        }))
      });
    }));
    return cards;
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
      {this.state.lyricsOpen && <SongChantModal title="Shine" onClose={this.toggleLyrics} />}
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
                  "fontWeight": "bold",
                  "letterSpacing": "-0.03em",
                  "lineHeight": "1.1",
                  "whiteSpace": "nowrap"
                }}>{"Shine"}</div>
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
                }}>{"가사 보기"}</button>
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
                    "color": "#ffd24a"
                  }}>{"게임 1 · 떼창"}</div>
                  <button onClick={v.onStudy} style={{
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
                  "fontWeight": "bold",
                  "letterSpacing": "-0.03em",
                  "lineHeight": "1.25"
                }}>{"비슷한 소절 가사 맞히기"}</div>
                <div style={{
                  "fontSize": "14px",
                  "lineHeight": "1.6",
                  "color": "#b5b5b5"
                }}>{"비슷한 두 소절에서 달라지는 가사를 채워요."}</div>
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
                  }}>{"첫 번째 "}<span style={{
                      "color": "#8f8f8f"
                    }}>{"·"}</span>{" 나의 "}<span style={{
                      "color": "#ffd24a",
                      "fontWeight": "800"
                    }}>{"손을"}</span>{" 꼭 잡고"}</div>
                  <div style={{
                    "fontSize": "14px",
                    "lineHeight": "1.6",
                    "color": "#e4e4e4"
                  }}>{"두 번째 "}<span style={{
                      "color": "#8f8f8f"
                    }}>{"·"}</span>{" 나의 "}<span style={{
                      "color": "#ffd24a",
                      "fontWeight": "800"
                    }}>{"발등에"}</span>{" 올라"}</div>
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
                  "fontSize": "11px",
                  "fontWeight": "800",
                  "letterSpacing": "0.1em",
                  "color": "#ffffff"
                }}>{"게임 2 · 전체"}</div>
                <div style={{
                  "fontSize": "24px",
                  "fontWeight": "bold",
                  "letterSpacing": "-0.03em",
                  "lineHeight": "1.25"
                }}>{"처음부터 끝까지 빈칸 채우기"}</div>
                <div style={{
                  "fontSize": "14px",
                  "lineHeight": "1.6",
                  "color": "#b5b5b5"
                }}>{"전체 가사 속 헷갈리는 줄을 순서대로 채워요."}</div>
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
                }}>{"Shine"}</span>
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
              {v.isBlank && <>
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
                    "gap": "8px"
                  }}>
                    <div style={{
                      "fontSize": "11px",
                      "fontWeight": "800",
                      "letterSpacing": "0.1em",
                      "color": "#6f6f6f"
                    }}>{v.groupName}</div>
                    <div style={{
                      "display": "grid",
                      "gridTemplateColumns": "1fr 1fr",
                      "gap": "6px"
                    }}>
                      {v.partChips.map((c, index) => <React.Fragment key={index}>
                        <div style={{
                          "display": "flex",
                          "flexDirection": "column",
                          "gap": "6px"
                        }}>
                          <span style={{
                            "height": "4px",
                            "borderRadius": "999px",
                            "background": c.bar
                          }}></span>
                          <span style={{
                            "fontSize": "13.5px",
                            "fontWeight": c.w,
                            "letterSpacing": "-0.01em",
                            "color": c.fg
                          }}>{c.t}</span>
                        </div>
                      </React.Fragment>)}
                    </div>
                  </div>
                  <div style={{
                    "display": "flex",
                    "flexDirection": "column",
                    "gap": "0px"
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
                      }}>{r.slot}</span></div>
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
                  "height": "260px"
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
                      }}>{"두 소절 비교"}</div>
                      {v.compare.map((c, index) => <React.Fragment key={index}>
                        <div style={{
                          "display": "grid",
                          "gridTemplateColumns": "8px 60px 1fr",
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
                            "fontSize": "12.5px",
                            "fontWeight": "800",
                            "color": c.pc,
                            "whiteSpace": "nowrap"
                          }}>{c.p}</span>
                          <span style={{
                            "fontSize": "15px",
                            "lineHeight": "1.45",
                            "fontWeight": c.w,
                            "color": c.color
                          }}>{c.t}</span>
                        </div>
                      </React.Fragment>)}
                    </div>
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
                }}>{"바뀌는 가사 미리 외우기"}</span>
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
                  "color": "#ffd24a"
                }}>{v.studyKicker}</div>
                <div style={{
                  "display": "flex",
                  "flexDirection": "column",
                  "gap": "12px"
                }}>
                  {v.studyRows.map((r, index) => <React.Fragment key={index}>
                    <div style={{
                      "display": "flex",
                      "flexDirection": "column",
                      "gap": "5px",
                      "background": "#141414",
                      "borderRadius": "14px",
                      "padding": "12px 14px"
                    }}>
                      <span style={{
                        "fontSize": "11px",
                        "fontWeight": "800",
                        "letterSpacing": "0.06em",
                        "color": "#ffd24a"
                      }}>{r.p}</span>
                      <span style={{
                        "fontSize": "18px",
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
              <button onClick={v.onStartBlank} style={{
                "fontFamily": "inherit",
                "fontSize": "16px",
                "fontWeight": "800",
                "height": "56px",
                "borderRadius": "999px",
                "border": "0",
                "cursor": "pointer",
                "background": "#ffd24a",
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
                "background": "#ffffff",
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
                      "color": "#ffd24a"
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
                    "fontWeight": "600"
                  }}>{"놓친 자리 없어요. 이대로 콘서트장 가도 됩니다"}</div>
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
    const base = {
      isHome: s.screen === "home",
      isPlaying: s.screen === "play" || s.screen === "full",
      isBlank: s.screen === "play",
      isFull: s.screen === "full",
      isStudy: s.screen === "study",
      isResult: s.screen === "result",
      score: s.score,
      bestCombo: s.bestCombo,
      blankCount: this.blankCount,
      fullCount: this.fullCount,
      diffs: ["보기 고르기", "단어 입력", "전체 입력"].map((label, i) => ({
        label,
        bg: s.diff === i ? "#ffffff" : "transparent",
        fg: s.diff === i ? "#0b0b0b" : "#8f8f8f",
        onClick: () => this.setState({
          diff: i
        })
      })),
      starts1: [["보기 고르기", "3개 중 고르기"], ["단어 입력", "달라지는 단어만 입력"], ["전체 입력", "빈 줄 전체 입력"]].map(([label, d], i) => ({
        label,
        desc: this.blankCount + "문제 · " + d,
        play: OK,
        line: i ? "1px solid #3a3a3a" : "0",
        onClick: () => this.setState({
          diff: i
        }, this.startBlank)
      })),
      starts2: [["보기 고르기", "3개 중 고르기"], ["전체 입력", "빈 줄 전체를 직접 입력"]].map(([label, d], i) => ({
        label,
        desc: this.fullCount + "칸 · " + d,
        play: "#ffffff",
        line: i ? "1px solid #3a3a3a" : "0",
        onClick: () => this.setState({
          fullDiff: i
        }, this.startFull)
      })),
      goHome: nav("home"),
      onStartBlank: this.startBlank,
      onStartFull: this.startFull,
      onStudy: () => {
        this.stopClock();
        this.setState({
          screen: "study",
          studyIdx: 0
        });
      },
      onRetry: () => s.game === "full" ? this.startFull() : this.startBlank()
    };
    if (s.screen === "study") {
      const cards = this.studyCards();
      const i = Math.min(s.studyIdx, cards.length - 1),
        card = cards[i];
      return {
        ...base,
        studyCounter: i + 1 + " / " + cards.length,
        studyDots: cards.map((c, ci) => ({
          bg: ci === i ? "#ffd24a" : ci < i ? "#4a4a4a" : "#1f1f1f"
        })),
        studyKicker: card.kicker,
        studyRows: card.rows,
        prevFg: i > 0 ? "#ffffff" : "#5a5a5a",
        studyPrev: () => this.setState({
          studyIdx: Math.max(0, i - 1)
        }),
        studyNext: () => i + 1 >= cards.length ? this.startBlank() : this.setState({
          studyIdx: i + 1
        })
      };
    }
    if (s.screen === "result") {
      const rate = Math.round(s.correct / Math.max(1, s.questions.length) * 100);
      return {
        ...base,
        correctRate: rate,
        missed: s.missed,
        perfect: s.missed.length === 0,
        resultGame: s.game === "full" ? "처음부터 끝까지 빈칸 채우기" : "비슷한 소절 가사 맞히기",
        praise: rate === 100 ? "완벽해요. 두 소절 다 구분했어요" : rate >= 70 ? "거의 다 왔어요. 한 번만 더" : "헷갈리는 줄부터 다시 볼까요"
      };
    }
    const q = s.questions[s.qi];
    if (!base.isPlaying || !q) return base;
    const fb = s.feedback,
      tone = fb === "correct" ? OK : NG;
    const slot = GROUPS[q.gi].slots[q.si];
    const typing = q.mode !== "choice";
    const v = {
      ...base,
      playTitle: s.screen === "full" ? "처음부터 끝까지 빈칸 채우기" : "비슷한 소절 가사 맞히기",
      timePct: Math.max(0, 100 - s.elapsed / SEC * 100),
      timeColor: s.elapsed / SEC > 0.75 ? "#8f8f8f" : "#ffffff",
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
      typeHint: q.mode === "full" ? "이 줄 전체를 입력하세요" : "빈칸에 들어갈 말을 입력하세요",
      typedValue: s.typed,
      typeRef: el => {
        this._typeInput = el;
      },
      onTypeChange: e => this.setState({
        typed: e.target.value
      }),
      onTypeKey: e => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing && !fb) {
          const val = e.target.value;
          if (val.trim()) this.resolve(val);
        }
      },
      onTypeSubmit: () => {
        const val = this._typeInput ? this._typeInput.value : s.typed;
        if (!fb && val.trim()) this.resolve(val);
      },
      submitBg: s.typed.trim() ? "#ffd24a" : "#2a2a2a",
      submitFg: s.typed.trim() ? "#0b0b0b" : "#5f5f5f",
      feedback: !!fb,
      fbTone: tone,
      fbVerdict: fb === "correct" ? "정답" : fb === "timeout" ? "시간 초과" : "오답",
      fbTitle: q.answer,
      gained: fb === "correct" ? "+" + (100 + s.combo * 20 - 20) : "",
      compare: VERS.map((p, vi) => {
        const same = vi === q.vi;
        return {
          p,
          t: slot[vi],
          w: same ? "800" : "500",
          color: same ? "#ffffff" : "#9a9a9a",
          pc: same ? tone : "#6f6f6f",
          dot: same ? tone : "#3a3a3a"
        };
      }),
      nextLabel: s.qi + 1 >= s.questions.length ? "결과 보기" : "다음",
      onNext: () => {
        if (fb) this.next();
      }
    };
    if (s.screen === "play") {
      const g = GROUPS[q.gi];
      v.groupName = g.name;
      v.partChips = VERS.map((p, vi) => ({
        t: p + " 소절",
        w: vi === q.vi ? "800" : "500",
        fg: vi === q.vi ? "#ffd24a" : "#5f5f5f",
        bar: vi === q.vi ? "#ffd24a" : "#2a2a2a"
      }));
      v.lines = g.slots.map((ver, si) => {
        const empty = {
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
        if (si !== q.si) {
          return {
            ...empty,
            parts: boldDiff(ver[q.vi], ver[1 - q.vi], "#c9c9c9"),
            after: [],
            mark: "transparent",
            markH: "0px",
            size: 14.5,
            w: "500",
            color: "#c9c9c9"
          };
        }
        const t = !fb ? "#ffd24a" : tone;
        const target = typing ? q.typeTarget : q.answer;
        return {
          parts: q.pre ? [{
            t: q.pre,
            color: "#9a9a9a",
            w: "500"
          }] : [],
          after: q.post ? [{
            t: q.post,
            color: "#9a9a9a",
            w: "500"
          }] : [],
          mark: t,
          markH: "22px",
          size: 15,
          w: "800",
          color: t,
          slotText: fb ? target : typing ? s.typed : "",
          slotDisplay: "inline-flex",
          slotW: fb ? "0" : Math.max(96, target.length * 14) + "px",
          slotH: fb ? "auto" : "26px",
          slotPad: "2px 12px",
          slotBorder: "2px " + (fb ? "solid " + tone : "dashed #6a5a24"),
          slotBg: fb === "correct" ? OK : fb ? "#2a1512" : "#201d14",
          slotColor: fb === "correct" ? "#0b0b0b" : fb ? "#ffb5aa" : "#ffd24a",
          slotAnim: fb ? "none" : "slotPulse 1.6s ease-in-out infinite"
        };
      });
    }
    if (s.screen === "full") {
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
        slotAnim: "none"
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
        b.lines.forEach(text => {
          const hit = byRow[ri];
          if (hit) {
            const active = hit.i === s.qi,
              done = hit.i < s.qi || (active && fb),
              answered = active && fb;
            rows.push({
              active: active ? "true" : "false",
              pre: "",
              slot: done ? hit.q.answer : active && hit.q.mode === "full" ? s.typed : "",
              size: active ? 16 : 14.5,
              weight: active ? "700" : "500",
              color: active ? "#ffffff" : done ? "#9a9a9a" : "#5a5a5a",
              pad: "3px 6px",
              slotDisplay: "inline-flex",
              slotW: active && !fb ? Math.max(120, hit.q.answer.length * 13) + "px" : done ? "0" : "120px",
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
              pre: text,
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
export default ShineGame;
