import React from 'react';
import '../pages/lyricsGame.css';
const BLOCKS = [{
  p: "1절",
  lines: [{
    k: [["종종 걸어오다 멈춰"]]
  }, {
    k: [["두리번대다가 너와 마주친 "], ["시선!", "y"]]
  }, {
    k: [["황급히 고개를 돌려"]]
  }, {
    k: [["발 끝만 보다가 천천히 올려봐"]]
  }, {
    k: [["커지는 눈 조금씩 벌어지는 입술"]]
  }, {
    k: [["어나더미! 김성규!", "b"]]
  }, {
    k: [["내 심장이 귓가를 울려"]]
  }]
}, {
  p: "1절 후렴",
  lines: [{
    k: [["60초면 충분한 "], ["story", "y"]],
    tricky: true
  }, {
    k: [["내 맘으로 넌 들어왔어"]],
    tricky: true
  }, {
    k: [["난 의심치 "], ["않아", "y"]],
    tricky: true
  }, {
    k: [["날 가져간걸"]],
    tricky: true,
    sing: true
  }, {
    k: [["짧지 않은 time"]]
  }, {
    k: [["넌 그런 사람", "y"]],
    sing: true
  }, {
    k: [["내겐 충분한 "], ["story", "y"]]
  }, {
    k: [["이유 따위 난 필요 없어"]],
    tricky: true
  }, {
    k: [["날 설레게 "], ["했고", "y"], [" 널 찾게 했어"]],
    tricky: true
  }, {
    k: [["처음의 그 time"]],
    tricky: true
  }]
}, {
  p: "떼창 구간",
  lines: [{
    k: [["너의 목소리가 끊겨"]],
    sing: true
  }, {
    k: [["천천히 차올라 흘러 넘치는 "], ["눈물!", "y"]],
    sing: true
  }, {
    k: [["가슴으로 너를 안고"]],
    sing: true
  }, {
    k: [["한참을 있다가 서서히 떼어내 "], ["육!십!초!", "b"]],
    sing: true
  }]
}, {
  p: "2절",
  lines: [{
    k: [["멍한 눈빛 할 말을 잃은 내 두 입술"]],
    sing: true
  }, {
    k: [["또 다른 너! 김성규!", "b"]]
  }, {
    k: [["니 한숨에 심장이 멈춰"]],
    sing: true
  }]
}, {
  p: "2절 후렴",
  lines: [{
    k: [["60초로 충분한 "], ["story", "y"]],
    tricky: true
  }, {
    k: [["내 삶에서 넌 사라졌어"]],
    tricky: true
  }, {
    k: [["널 잡지 않았어"]],
    tricky: true
  }, {
    k: [["이 맘을 본 건"]],
    tricky: true
  }, {
    k: [["짧지 않은 time"]]
  }, {
    k: [["넌 그런 사람", "y"]],
    sing: true
  }, {
    k: [["네겐 충분한 "], ["story", "y"]]
  }, {
    k: [["선명하게 넌 전해졌어"]],
    tricky: true
  }, {
    k: [["넌 아프다 "], ["했고", "y"], [" 난 보내줬어"]],
    tricky: true
  }, {
    k: [["마지막 그 time"]],
    tricky: true
  }]
}, {
  p: "브릿지",
  lines: [{
    k: [["(내 두 개의 story)", "y"], [" 뜨겁고도 "], ["(story)", "y"]],
    sing: true
  }, {
    k: [["차가운 time "], ["(with U)", "y"]],
    sing: true
  }, {
    k: [["둘 다 니가 준 기억들"]],
    sing: true
  }, {
    k: [["(내 두 개의 story)", "y"], [" 같은 시간 다른 너"]]
  }, {
    k: [["내 양 날의 기억"]]
  }]
}, {
  p: "마지막 후렴",
  lines: [{
    k: [["60초면 충분한 "], ["story", "y"]]
  }, {
    k: [["내 맘으로 넌 들어왔어"]]
  }, {
    k: [["난 의심치 "], ["않아", "y"]],
    sing: true
  }, {
    k: [["날 가져간걸"]]
  }, {
    k: [["짧지 않은 time"]],
    sing: true
  }, {
    k: [["넌 그런 사람", "y"]],
    sing: true
  }, {
    k: [["내겐 충분한 "], ["story", "y"]],
    sing: true,
    tricky: true
  }, {
    k: [["내 삶에서 넌 사라졌어"]],
    tricky: true
  }, {
    k: [["널 잡지 않았어 니 맘을 본걸"]],
    tricky: true
  }, {
    k: [["짧지 않은 time"]],
    tricky: true
  }]
}];
const PARTS = ["1절 후렴", "2절 후렴", "마지막 후렴"];
const SLOTS = [{
  v: ["60초면 충분한 story", "60초로 충분한 story", "60초면 충분한 story"],
  call: true,
  sing: [false, false, false]
}, {
  v: ["내 맘으로 넌 들어왔어", "내 삶에서 넌 사라졌어", "내 맘으로 넌 들어왔어"],
  sing: [false, false, false],
  hl: ["내", "넌", "내"]
}, {
  v: ["난 의심치 않아", "널 잡지 않았어", "난 의심치 않아"],
  call: true,
  sing: [false, false, true],
  hl: ["난", "널", "난"]
}, {
  v: ["날 가져간걸", "이 맘을 본 건", "날 가져간걸"],
  sing: [true, false, false],
  hl: ["날", null, "날"]
}, {
  v: ["짧지 않은 time", "짧지 않은 time", "짧지 않은 time"],
  sing: [false, false, true],
  always: true
}, {
  v: ["넌 그런 사람", "넌 그런 사람", "넌 그런 사람"],
  call: true,
  sing: [true, true, true]
}, {
  v: ["내겐 충분한 story", "네겐 충분한 story", "내겐 충분한 story"],
  call: true,
  sing: [false, false, true],
  hl: ["내겐", "네겐", "내겐"]
}, {
  v: ["이유 따위 난 필요 없어", "선명하게 넌 전해졌어", "내 삶에서 넌 사라졌어"],
  sing: [false, false, false],
  hl: ["난", "넌", "내"]
}, {
  v: ["날 설레게 했고 널 찾게 했어", "넌 아프다 했고 난 보내줬어", "널 잡지 않았어 니 맘을 본걸"],
  call: true,
  sing: [false, false, false],
  hl: ["날", "넌", null]
}, {
  v: ["처음의 그 time", "마지막 그 time", "짧지 않은 time"],
  sing: [false, false, true]
}];

// 응원법이 들어가는 자리 — 1절/2절은 같은 자리에서 콜이 달라진다
const CALLSPOTS = [{
  part: "1절",
  before: "커지는 눈 조금씩 벌어지는 입술",
  call: "어나더미! 김성규!",
  after: "내 심장이 귓가를 울려",
  only: true,
  pair: "kim",
  core: true
}, {
  part: "2절",
  before: "멍한 눈빛 할 말을 잃은 내 두 입술",
  call: "또 다른 너! 김성규!",
  after: "니 한숨에 심장이 멈춰",
  only: true,
  pair: "kim",
  core: true
}, {
  part: "1절",
  before: "두리번대다가 너와 마주친",
  call: "시선!",
  after: "황급히 고개를 돌려"
}, {
  part: "떼창 구간",
  before: "천천히 차올라 흘러 넘치는",
  call: "눈물!",
  after: "가슴으로 너를 안고"
}, {
  part: "떼창 구간",
  before: "한참을 있다가 서서히 떼어내",
  call: "육!십!초!",
  only: true,
  after: "— 구간 끝"
}];
const DIFFS = [{
  key: 0,
  label: "",
  extra: 2,
  sec: 20,
  note: "선택지 3개 · 20초",
  cnote: "20초"
}];
const OK = "#ffd24a",
  NG = "#ff5c47";

// 정답/오답 상태는 색 + 기호로 이중 표시한다
function choiceState(fb, t, answer, picked) {
  if (!fb) return {
    bg: "#1c1c1c",
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
    border: "#1c1c1c",
    badge: "",
    badgeBg: "transparent",
    badgeFg: "transparent"
  };
}
function shuffle(a) {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}
class LyricsGame extends React.Component {
  state = {
    screen: "home",
    game: "blank",
    diff: 1,
    g1Diff: 0,
    g2Diff: 0,
    typed: "",
    studyIdx: 0,
    results: [],
    qi: 0,
    score: 0,
    combo: 0,
    bestCombo: 0,
    correct: 0,
    questions: [],
    picked: null,
    feedback: null,
    missed: [],
    elapsed: 0,
    seq: [],
    seqPart: "",
    idx: 0,
    tapped: false,
    judge: null,
    hits: 0,
    misses: 0,
    earlies: 0,
    totalCalls: 0
  };
  get cfg() {
    return DIFFS[0];
  }
  get roundLength() {
    // 게임 1은 후렴에서 달라지는 자리 전부를 출제한다
    const varied = SLOTS.filter(s => new Set(s.v).size > 1 || s.always).length;
    return Math.max(3, this.props.roundLength ?? varied);
  }
  get callRoundLength() {
    return Math.min(CALLSPOTS.length + (this.state.g2Diff === 0 ? 1 : 0), this.roundLength);
  }
  get fullRoundLength() {
    return Math.max(6, this.roundLength + 4) + CALLSPOTS.length;
  }

  // 세 후렴 중 이 자리에서 달라지는 첫 단어 (없으면 첫 단어)
  diffWord(slot, pi) {
    const tk = slot.v[pi].split(" ");
    const others = slot.v.filter((_, j) => j !== pi).map(v => v.split(" "));
    for (let i = 0; i < tk.length; i++) {
      if (others.some(o => o[i] !== tk[i])) return tk[i];
    }
    return (slot.hl && slot.hl[pi]) || tk[0];
  }
  buildBlank() {
    const varied = SLOTS.map((s, i) => i).filter(i => new Set(SLOTS[i].v).size > 1 || SLOTS[i].always);
    // 달라지는 자리를 하나도 빠짐없이 한 번씩 (후렴은 자리마다 무작위)
    const combos = shuffle(varied).map(si => ({
      si,
      pi: Math.floor(Math.random() * PARTS.length)
    }));
    return combos.slice(0, this.roundLength).map(({
      si,
      pi
    }) => {
      const slot = SLOTS[si],
        answer = slot.v[pi];
      const mode = this.state.g1Diff === 2 ? "full" : this.state.g1Diff === 1 ? "part" : "choice";
      if (mode === "full") return {
        si,
        pi,
        answer,
        mode,
        typeTarget: answer,
        pre: "",
        post: "",
        choices: []
      };
      if (mode === "part") {
        const word = this.diffWord(slot, pi);
        const at = answer.indexOf(word);
        return {
          si,
          pi,
          answer,
          mode,
          typeTarget: word,
          choices: [],
          pre: answer.slice(0, at),
          post: answer.slice(at + word.length)
        };
      }
      let choices = Array.from(new Set(slot.v));
      const others = shuffle(SLOTS.filter((_, i) => i !== si).flatMap(s => s.v)).filter(t => choices.indexOf(t) < 0);
      choices = choices.concat(others).slice(0, 3);
      return {
        si,
        pi,
        answer,
        mode,
        typeTarget: answer,
        pre: "",
        post: "",
        choices: shuffle(choices)
      };
    });
  }
  buildCall() {
    const allCalls = CALLSPOTS.map(s => s.call);
    const core = CALLSPOTS.filter(s => s.core);
    const rest = CALLSPOTS.filter(s => !s.core);
    // 1절/2절 김성규 콜은 매 라운드 반드시 출제 (콜 고르기 + 자리 고르기)
    const qs = [];
    const mode = this.state.g2Diff === 2 ? "full" : this.state.g2Diff === 1 ? "part" : "choice";
    core.forEach(spot => qs.push({
      kind: "which",
      spot
    }));
    if (mode === "choice") qs.push({
      kind: "where",
      spot: core[Math.floor(Math.random() * core.length)]
    });
    shuffle(rest).forEach(spot => qs.push({
      kind: "which",
      spot
    }));
    if (mode !== "choice") {
      // 입력 모드: "김성규!"처럼 공통 꼬리는 보여주고 달라지는 앞부분만 입력
      return shuffle(qs).slice(0, this.callRoundLength).map(q => {
        const call = q.spot.call,
          tail = " 김성규!";
        const hasTail = mode === "part" && call.endsWith(tail);
        return {
          ...q,
          mode,
          answer: call,
          choices: [],
          typeTarget: hasTail ? call.slice(0, -tail.length) : call,
          post: hasTail ? tail : ""
        };
      });
    }
    return shuffle(qs).slice(0, this.callRoundLength).map(q => {
      if (q.kind === "where") {
        const others = shuffle(CALLSPOTS.filter(s => s !== q.spot).map(s => s.before));
        return {
          ...q,
          answer: q.spot.before,
          choices: shuffle([q.spot.before].concat(others.slice(0, 2)))
        };
      }
      const others = shuffle(allCalls.filter(c => c !== q.spot.call));
      const paired = CALLSPOTS.find(s => s.pair && s.pair === q.spot.pair && s !== q.spot);
      const must = paired ? [paired.call] : [];
      const pool = must.concat(others.filter(c => must.indexOf(c) < 0)).slice(0, 2);
      return {
        ...q,
        answer: q.spot.call,
        choices: shuffle([q.spot.call].concat(pool))
      };
    });
  }
  startClock() {
    this.stopClock();
    this._t0 = Date.now() - (this.state.elapsed || 0) * 1000;
    this._iv = setInterval(this.tickBlank, 60);
  }
  stopClock() {
    if (this._iv) {
      clearInterval(this._iv);
      this._iv = null;
    }
  }
  ensureClock() {
    const s = this.state,
      playing = (s.screen === "play" || s.screen === "call" || s.screen === "full") && !s.feedback;
    if (playing && !this._iv) this.startClock();
    if (!playing && this._iv) this.stopClock();
  }
  componentDidMount() {
    this.ensureClock();
  }
  componentDidUpdate() {
    this.ensureClock();
    const tk = this.state.screen + ":" + this.state.qi + ":" + (this.state.feedback || "");
    const typingNow = (this.state.screen === "play" && this.state.g1Diff > 0) || (this.state.screen === "call" && this.state.g2Diff > 0);
    if (typingNow && !this.state.feedback && this._typeInput && tk !== this._typeKey) {
      this._typeKey = tk;
      this._typeInput.focus();
    }
    // 문제가 바뀔 때만 한 번 맞춰 준다 (매 틱마다 잡으면 사용자가 스크롤을 못 한다)
    const key = this.state.screen + ":" + this.state.qi;
    if (this.state.screen !== "full") this._scrollKey = null;
    if (this.state.screen === "full" && key !== this._scrollKey) {
      const sc = this._root?.querySelector("[data-full-scroller]");
      const row = sc && sc.querySelector('[data-active="true"]');
      if (!sc || !row) return;
      this._scrollKey = key;
      const first = this.state.qi === 0;
      requestAnimationFrame(() => {
        const delta = row.getBoundingClientRect().top - sc.getBoundingClientRect().top;
        const top = sc.scrollTop + delta - sc.clientHeight / 2 + row.offsetHeight / 2;
        sc.scrollTo({
          top: Math.max(0, top),
          behavior: first ? "auto" : "smooth"
        });
      });
    }
  }
  componentWillUnmount() {
    this.stopClock();
  }
  tickBlank = () => {
    const sc = this.state.screen;
    if ((sc !== "play" && sc !== "call" && sc !== "full") || this.state.feedback) return;
    const elapsed = (Date.now() - this._t0) / 1000;
    if (elapsed >= this.cfg.sec) {
      this.setState({
        elapsed: this.cfg.sec
      });
      this.resolveBlank(null, true);
    } else this.setState({
      elapsed
    });
  };
  buildFull() {
    const rows = [];
    BLOCKS.forEach((b, bi) => b.lines.forEach((l, li) => rows.push({
      bi,
      li,
      t: l.k.map(k => k[0]).join(""),
      tricky: !!l.tricky,
      call: l.k.some(k => k[1])
    })));
    // 괄호가 섞인 토큰은 조각으로 보여서 보기로 쓰지 않는다
    // 게임 1과 같은 범위: 세 후렴의 출제 자리만
    const cand = rows.map((r, i) => ({
      r,
      i,
      pi: PARTS.indexOf(BLOCKS[r.bi].p)
    })).filter(({
      r,
      pi
    }) => pi >= 0 && SLOTS[r.li] && (new Set(SLOTS[r.li].v).size > 1 || SLOTS[r.li].always));
    // 응원법 자리: 응원법 자체가 빈칸이 되고, 보기는 다른 응원법
    const allCalls = CALLSPOTS.map(c => c.call);
    const callQs = rows.map((r, i) => {
      const line = BLOCKS[r.bi].lines[r.li];
      const spot = CALLSPOTS.find(c => c.part === BLOCKS[r.bi].p && line.k.some(k => k[1] && k[0].trim() === c.call));
      if (!spot) return null;
      const full = line.k.map(k => k[0]).join("");
      const at = full.indexOf(spot.call);
      const paired = CALLSPOTS.find(c => c.pair && c.pair === spot.pair && c !== spot);
      const others = (paired ? [paired.call] : []).concat(shuffle(allCalls.filter(c => c !== spot.call && (!paired || c !== paired.call))));
      return {
        row: i,
        answer: spot.call,
        isCall: true,
        choices: shuffle([spot.call].concat(others.slice(0, 2))),
        pre: full.slice(0, at),
        post: full.slice(at + spot.call.length)
      };
    }).filter(Boolean);
    const lyricN = Math.max(0, this.fullRoundLength - callQs.length);
    const picked = shuffle(cand).slice(0, lyricN);
    // 게임 1과 같은 보기: 그 자리의 세 후렴 버전 + 부족하면 다른 자리 가사
    const lyricQs = picked.map(({
      r,
      i,
      pi
    }) => {
      const slot = SLOTS[r.li],
        answer = slot.v[pi];
      let choices = Array.from(new Set(slot.v));
      const others = shuffle(SLOTS.filter((_, k) => k !== r.li).flatMap(x => x.v)).filter(t => choices.indexOf(t) < 0);
      choices = shuffle(choices.concat(others).slice(0, 3));
      return {
        row: i,
        answer,
        choices,
        pre: "",
        post: ""
      };
    });
    return lyricQs.concat(callQs).sort((a, b) => a.row - b.row);
  }
  studyCards() {
    if (this.state.game === "call") {
      return CALLSPOTS.map(spot => ({
        kicker: spot.part + " 응원법",
        rows: [{
          p: "앞 가사",
          t: spot.before,
          color: "#9a9a9a",
          w: "500",
          bg: "#141414",
          pc: "#6f6f6f"
        }, {
          p: "응원법",
          t: spot.call,
          color: "#5b8cff",
          w: "800",
          bg: "#101826",
          pc: "#5b8cff"
        }, {
          p: "뒤 가사",
          t: spot.after,
          color: "#9a9a9a",
          w: "500",
          bg: "#141414",
          pc: "#6f6f6f"
        }],
        tip: spot.pair === "kim" ? "1절과 2절에서 같은 자리에 다른 응원법이 들어갑니다. 짝으로 외우세요." : spot.only ? "가사 없이 응원법만 크게 외치는 구간이에요." : "가사와 겹쳐서 외치는 응원법이에요."
      }));
    }
    return SLOTS.map((slot, i) => ({
      slot,
      i
    })).filter(({
      slot
    }) => new Set(slot.v).size > 1 || slot.always).map(({
      slot,
      i
    }) => ({
      kicker: "후렴 " + (i + 1) + "번째 줄",
      rows: PARTS.map((p, pi) => {
        const same = PARTS.map((x, xi) => xi !== pi && slot.v[xi] === slot.v[pi]).some(Boolean);
        return {
          p: p + (same ? " (다른 후렴과 같음)" : ""),
          t: slot.v[pi],
          color: "#ffffff",
          w: "700",
          bg: "#141414",
          pc: same ? "#6f6f6f" : "#ffd24a"
        };
      }),
      tip: new Set(slot.v).size === 3 ? "세 후렴이 전부 달라요. 가장 헷갈리는 자리입니다." : new Set(slot.v).size === 1 ? "세 후렴 모두 같아요. 바뀌지 않는 자리입니다." : "두 가지만 구분하면 되는 자리예요."
    }));
  }
  startBlank = () => {
    this.setState({
      screen: "play",
      game: "blank",
      qi: 0,
      score: 0,
      combo: 0,
      bestCombo: 0,
      correct: 0,
      questions: this.buildBlank(),
      picked: null,
      feedback: null,
      missed: [],
      results: [],
      typed: "",
      elapsed: 0
    }, () => this.startClock());
  };
  startFull = () => {
    this.setState({
      screen: "full",
      game: "full",
      qi: 0,
      score: 0,
      combo: 0,
      bestCombo: 0,
      correct: 0,
      questions: this.buildFull(),
      picked: null,
      feedback: null,
      missed: [],
      results: [],
      typed: "",
      elapsed: 0
    }, () => this.startClock());
  };
  startCall = () => {
    this.setState({
      screen: "call",
      game: "call",
      qi: 0,
      score: 0,
      combo: 0,
      bestCombo: 0,
      correct: 0,
      questions: this.buildCall(),
      picked: null,
      feedback: null,
      missed: [],
      results: [],
      typed: "",
      elapsed: 0
    }, () => this.startClock());
  };
  resolveBlank(picked, timeout) {
    const s = this.state,
      q = s.questions[s.qi];
    if (s.feedback || !q) return;
    this.stopClock();
    const norm = t => String(t == null ? "" : t).replace(s.game === "call" ? /[\s!]+/g : /\s+/g, "").trim();
    const typing = (s.game === "blank" || s.game === "call") && q.mode && q.mode !== "choice";
    const ok = !timeout && (typing ? norm(picked) === norm(q.typeTarget) : picked === q.answer);
    const combo = ok ? s.combo + 1 : 0;
    const results = s.results.concat([ok]);
    const miss = s.game === "call" ? {
      p: q.spot.part,
      pc: "#5b8cff",
      t: q.kind === "where" ? q.spot.call + " — " + q.spot.before : q.spot.call
    } : s.game === "full" ? {
      p: q.isCall ? "응원법" : "빈칸",
      pc: q.isCall ? "#5b8cff" : "#ffffff",
      t: q.pre + q.answer + q.post
    } : {
      p: PARTS[q.pi],
      pc: "#ffd24a",
      t: q.answer
    };
    this.setState({
      feedback: ok ? "correct" : timeout ? "timeout" : "wrong",
      picked,
      combo,
      results,
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
    } else this.setState({
      qi: s.qi + 1,
      feedback: null,
      picked: null,
      typed: "",
      elapsed: 0
    }, () => this.startClock());
  };
  render() {
    const v = this.renderVals();
    return <div className="lyrics-game" ref={el => {
      this._root = el;
    }}>
      <div style={{
        "minHeight": "auto",
        "background": "transparent",
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
          "minHeight": "auto",
          "paddingBottom": "28px"
        }}>
          {v.isHome && <> 
            <div style={{
              "display": "flex",
              "flexDirection": "column",
              "gap": "20px",
              "padding": "4px 20px 0"
            }}>
              <div style={{
                "background": "#1c1c1c",
                "borderRadius": "20px",
                "padding": "22px 20px",
                "display": "flex",
                "alignItems": "center",
                "gap": "14px"
              }}>
                <div style={{
                  "display": "flex",
                  "flexDirection": "column",
                  "gap": "4px"
                }}>
                  <div style={{
                    "fontSize": "26px",
                    "fontWeight": "800",
                    "letterSpacing": "-0.03em",
                    "lineHeight": "1.1"
                  }}>{"60초"}</div>
                  <div style={{
                    "fontSize": "13px",
                    "color": "#9a9a9a"
                  }}>{"김성규"}</div>
                </div>
              </div>
              <div style={{
                "background": "#1c1c1c",
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
                  "color": "#ffd24a"
                }}>{"게임 1 · 헷갈리는 가사"}</div>
                <div style={{
                  "fontSize": "24px",
                  "fontWeight": "800",
                  "letterSpacing": "-0.03em",
                  "lineHeight": "1.25"
                }}>{"후렴 빈칸 채우기"}</div>
                <div style={{
                  "fontSize": "14px",
                  "lineHeight": "1.6",
                  "color": "#b5b5b5"
                }}>{"후렴마다 달라지는 가사를 채워요."}</div>
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
                  }}>{"1절 후렴 "}<span style={{
                      "color": "#8f8f8f"
                    }}>{"·"}</span>{" 60초"}<span style={{
                      "color": "#ffd24a",
                      "fontWeight": "800"
                    }}>{"면"}</span>{" 충분한 story"}</div>
                  <div style={{
                    "fontSize": "14px",
                    "lineHeight": "1.6",
                    "color": "#e4e4e4"
                  }}>{"2절 후렴 "}<span style={{
                      "color": "#8f8f8f"
                    }}>{"·"}</span>{" 60초"}<span style={{
                      "color": "#ffd24a",
                      "fontWeight": "800"
                    }}>{"로"}</span>{" 충분한 story"}</div>
                </div>
                <div style={{
                  "display": "flex",
                  "gap": "6px",
                  "background": "#141414",
                  "borderRadius": "999px",
                  "padding": "5px"
                }}>
                  {v.g1Diffs.map((d, index) => <React.Fragment key={index}>
                    <button onClick={d.onClick} style={{
                      "flex": "1",
                      "fontFamily": "inherit",
                      "fontSize": "13.5px",
                      "fontWeight": "700",
                      "height": "42px",
                      "borderRadius": "999px",
                      "border": "0",
                      "cursor": "pointer",
                      "background": d.bg,
                      "color": d.fg
                    }} type="button">{d.label}</button>
                  </React.Fragment>)}
                </div>
                <div style={{
                  "display": "flex",
                  "gap": "8px"
                }}>
                  <button onClick={v.onStudyBlank} style={{
                    "flex": "1",
                    "fontFamily": "inherit",
                    "fontSize": "15px",
                    "fontWeight": "700",
                    "height": "56px",
                    "borderRadius": "999px",
                    "border": "1px solid #3a3a3a",
                    "cursor": "pointer",
                    "background": "transparent",
                    "color": "#ffffff"
                  }} type="button">{"먼저 외우기"}</button>
                  <button onClick={v.onStartBlank} style={{
                    "flex": "1",
                    "fontFamily": "inherit",
                    "fontSize": "15px",
                    "fontWeight": "800",
                    "height": "56px",
                    "borderRadius": "999px",
                    "border": "0",
                    "cursor": "pointer",
                    "background": "#ffd24a",
                    "color": "#0b0b0b"
                  }} type="button">{v.roundLength + "문제 풀기"}</button>
                </div>
              </div>
              <div style={{
                "background": "#1c1c1c",
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
                  "color": "#5b8cff"
                }}>{"게임 2 · 응원법"}</div>
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
                  }}>{"1절 "}<span style={{
                      "color": "#8f8f8f"
                    }}>{"·"}</span>
                    <span style={{
                      "color": "#5b8cff",
                      "fontWeight": "800"
                    }}>{"어나더미! 김성규!"}</span></div>
                  <div style={{
                    "fontSize": "14px",
                    "lineHeight": "1.6",
                    "color": "#e4e4e4"
                  }}>{"2절 "}<span style={{
                      "color": "#8f8f8f"
                    }}>{"·"}</span>
                    <span style={{
                      "color": "#5b8cff",
                      "fontWeight": "800"
                    }}>{"또 다른 너! 김성규!"}</span></div>
                </div>
                <div style={{
                  "display": "flex",
                  "gap": "6px",
                  "background": "#141414",
                  "borderRadius": "999px",
                  "padding": "5px"
                }}>
                  {v.g2Diffs.map((d, index) => <React.Fragment key={index}>
                    <button onClick={d.onClick} style={{
                      "flex": "1",
                      "fontFamily": "inherit",
                      "fontSize": "13.5px",
                      "fontWeight": "700",
                      "height": "42px",
                      "borderRadius": "999px",
                      "border": "0",
                      "cursor": "pointer",
                      "background": d.bg,
                      "color": d.fg
                    }} type="button">{d.label}</button>
                  </React.Fragment>)}
                </div>
                <div style={{
                  "display": "flex",
                  "gap": "8px"
                }}>
                  <button onClick={v.onStudyCall} style={{
                    "flex": "1",
                    "fontFamily": "inherit",
                    "fontSize": "15px",
                    "fontWeight": "700",
                    "height": "56px",
                    "borderRadius": "999px",
                    "border": "1px solid #3a3a3a",
                    "cursor": "pointer",
                    "background": "transparent",
                    "color": "#ffffff"
                  }} type="button">{"먼저 외우기"}</button>
                  <button onClick={v.onStartCall} style={{
                    "flex": "1",
                    "fontFamily": "inherit",
                    "fontSize": "15px",
                    "fontWeight": "800",
                    "height": "56px",
                    "borderRadius": "999px",
                    "border": "0",
                    "cursor": "pointer",
                    "background": "#5b8cff",
                    "color": "#0b0b0b"
                  }} type="button">{v.callRoundLength + "문제 풀기"}</button>
                </div>
              </div>
              <div style={{
                "background": "#1c1c1c",
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
                }}>{"게임 3 · 전체 가사"}</div>
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
                }}>{"전체 가사 속 빈 단어를 순서대로 채워요."}</div>
                <button onClick={v.onStartFull} style={{
                  "fontFamily": "inherit",
                  "fontSize": "15px",
                  "fontWeight": "800",
                  "height": "56px",
                  "borderRadius": "999px",
                  "border": "0",
                  "cursor": "pointer",
                  "background": "#ffffff",
                  "color": "#0b0b0b"
                }} type="button">{v.fullRoundLength + "칸 채우기"}</button>
              </div>
            </div>
 </>}
          {v.isPlay && <> 
            <div style={{
              "display": "flex",
              "flexDirection": "column",
              "gap": "16px",
              "padding": "0 20px"
            }}>
              <div style={{
                "display": "grid",
                "gridTemplateColumns": "40px 1fr auto",
                "alignItems": "center",
                "gap": "10px"
              }}>
                <button onClick={v.goHome} style={{
                  "width": "40px",
                  "height": "40px",
                  "borderRadius": "999px",
                  "background": "#1c1c1c",
                  "border": "0",
                  "color": "#ffffff",
                  "fontSize": "16px",
                  "cursor": "pointer",
                  "fontFamily": "inherit"
                }} type="button" aria-label="게임 선택으로 돌아가기">{"‹"}</button>
                <span style={{
                  "fontSize": "13px",
                  "fontWeight": "600",
                  "color": "#9a9a9a"
                }}>{"후렴 빈칸 채우기"}</span>
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
              <div style={{
                "background": "#1c1c1c",
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
                    "display": "grid",
                    "gridTemplateColumns": "1fr 1fr 1fr",
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
                      "borderRadius": "8px",
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
                  "height": "280px"
                }}></div>
                <div className="lyrics-game-feedback">
                  <div style={{
                    "width": "100%",
                    "maxWidth": "480px",
                    "background": "#161616",
                    "borderTop": "4px solid " + v.fbTitleColor,
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
                          "color": v.fbTitleColor
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
                        "color": v.fbTitleColor
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
                      }}>{"이 자리 세 후렴 비교"}</div>
                      {v.compare.map((c, index) => <React.Fragment key={index}>
                        <div style={{
                          "display": "grid",
                          "gridTemplateColumns": "8px 78px 1fr",
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
          {v.isCall && <> 
            <div style={{
              "display": "flex",
              "flexDirection": "column",
              "gap": "16px",
              "padding": "0 20px"
            }}>
              <div style={{
                "display": "grid",
                "gridTemplateColumns": "40px 1fr auto",
                "alignItems": "center",
                "gap": "10px"
              }}>
                <button onClick={v.goHome} style={{
                  "width": "40px",
                  "height": "40px",
                  "borderRadius": "999px",
                  "background": "#1c1c1c",
                  "border": "0",
                  "color": "#ffffff",
                  "fontSize": "16px",
                  "cursor": "pointer",
                  "fontFamily": "inherit"
                }} type="button" aria-label="게임 선택으로 돌아가기">{"‹"}</button>
                <span style={{
                  "fontSize": "13px",
                  "fontWeight": "600",
                  "color": "#9a9a9a"
                }}>{"이 자리 응원법 맞히기"}</span>
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
              <div style={{
                "background": "#1c1c1c",
                "borderRadius": "20px",
                "padding": "20px",
                "display": "flex",
                "flexDirection": "column",
                "gap": "14px"
              }}>
                <div style={{
                  "display": "flex",
                  "gap": "6px",
                  "flexWrap": "wrap"
                }}>
                  <span style={{
                    "fontSize": "11px",
                    "fontWeight": "800",
                    "padding": "5px 12px",
                    "borderRadius": "999px",
                    "background": "#ffffff",
                    "color": "#0b0b0b",
                    "whiteSpace": "nowrap",
                    "flexShrink": "0"
                  }}>{v.spotPart}</span>
                </div>
                <div style={{
                  "fontSize": "12px",
                  "fontWeight": "700",
                  "color": "#8f8f8f"
                }}>{v.callPrompt}</div>
                <div style={{
                  "display": "flex",
                  "flexDirection": "column",
                  "gap": "4px"
                }}>
                  <div style={{
                    "fontSize": "14.5px",
                    "lineHeight": "1.35",
                    "fontWeight": "500",
                    "color": "#c9c9c9",
                    "padding": "2px 0"
                  }}>{v.spotBefore}</div>
                  <div style={{
                    "display": "inline-flex",
                    "alignItems": "center",
                    "alignSelf": "flex-start",
                    "minWidth": v.spotW,
                    "height": "26px",
                    "boxSizing": "border-box",
                    "fontSize": "15px",
                    "lineHeight": "1.35",
                    "fontWeight": "800",
                    "letterSpacing": "-0.02em",
                    "color": v.spotColor,
                    "background": v.spotBg,
                    "border": v.spotBorder,
                    "borderRadius": "10px",
                    "padding": v.spotPad,
                    "animation": v.spotAnim
                  }}>{v.spotSlot}</div>
                  <div style={{
                    "fontSize": "14.5px",
                    "lineHeight": "1.35",
                    "fontWeight": "500",
                    "color": "#c9c9c9",
                    "padding": "2px 0"
                  }}>{v.spotAfter}</div>
                </div>
              </div>
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
                      "fontWeight": "700",
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
                  "height": "250px"
                }}></div>
                <div className="lyrics-game-feedback">
                  <div style={{
                    "width": "100%",
                    "maxWidth": "480px",
                    "background": "#161616",
                    "borderTop": "4px solid " + v.fbTitleColor,
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
                          "color": v.fbTitleColor
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
                        "color": v.fbTitleColor
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
                      }}>{"헷갈리는 짝"}</div>
                      {v.compare.map((c, index) => <React.Fragment key={index}>
                        <div style={{
                          "display": "grid",
                          "gridTemplateColumns": "8px 44px 1fr",
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
                      "background": "#5b8cff",
                      "color": "#0b0b0b"
                    }} type="button">{v.nextLabel}</button>
                  </div>
                </div>
 </>}
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
                  "background": "#1c1c1c",
                  "borderRadius": "16px",
                  "padding": "16px 14px"
                }}>
                  <div style={{
                    "fontSize": "11px",
                    "color": "#8f8f8f",
                    "fontWeight": "600"
                  }}>{v.rateLabel}</div>
                  <div style={{
                    "fontSize": "24px",
                    "fontWeight": "800",
                    "marginTop": "6px"
                  }}>{v.correctRate + "%"}</div>
                </div>
                <div style={{
                  "background": "#1c1c1c",
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
                "background": "#1c1c1c",
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
                }}>{v.missLabel}</div>
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
                    "fontWeight": "600"
                  }}>{"놓친 데 없어요. 이대로 콘서트장 가도 됩니다"}</div>
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
          {v.isFull && <> 
            <div style={{
              "display": "flex",
              "flexDirection": "column",
              "gap": "14px",
              "padding": "0 20px"
            }}>
              <div style={{
                "display": "grid",
                "gridTemplateColumns": "40px 1fr auto",
                "alignItems": "center",
                "gap": "10px"
              }}>
                <button onClick={v.goHome} style={{
                  "width": "40px",
                  "height": "40px",
                  "borderRadius": "999px",
                  "background": "#1c1c1c",
                  "border": "0",
                  "color": "#ffffff",
                  "fontSize": "16px",
                  "cursor": "pointer",
                  "fontFamily": "inherit"
                }} type="button" aria-label="게임 선택으로 돌아가기">{"‹"}</button>
                <span style={{
                  "fontSize": "13px",
                  "fontWeight": "600",
                  "color": "#9a9a9a"
                }}>{"전체 가사 빈칸"}</span>
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
              <div data-full-scroller={"1"} style={{
                "position": "relative",
                "background": "#1c1c1c",
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
                    "fontWeight": "700",
                    "minHeight": "54px",
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
              {v.feedback && <> 
                <div style={{
                  "height": "150px"
                }}></div>
                <div className="lyrics-game-feedback">
                  <div style={{
                    "width": "100%",
                    "maxWidth": "480px",
                    "background": "#161616",
                    "borderTop": "4px solid " + v.fbTitleColor,
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
                          "color": v.fbTitleColor
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
                        "color": v.fbTitleColor
                      }}>{v.gained}</span>
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
                "gridTemplateColumns": "40px 1fr auto",
                "alignItems": "center",
                "gap": "10px"
              }}>
                <button onClick={v.goHome} style={{
                  "width": "40px",
                  "height": "40px",
                  "borderRadius": "999px",
                  "background": "#1c1c1c",
                  "border": "0",
                  "color": "#ffffff",
                  "fontSize": "16px",
                  "cursor": "pointer",
                  "fontFamily": "inherit"
                }} type="button" aria-label="게임 선택으로 돌아가기">{"‹"}</button>
                <span style={{
                  "fontSize": "15px",
                  "fontWeight": "800",
                  "letterSpacing": "-0.02em"
                }}>{v.studyTitle}</span>
                <span style={{
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
                "background": "#1c1c1c",
                "borderRadius": "20px",
                "padding": "22px 20px",
                "display": "flex",
                "flexDirection": "column",
                "gap": "16px",
                "minHeight": "280px"
              }}>
                <div style={{
                  "fontSize": "11px",
                  "fontWeight": "800",
                  "letterSpacing": "0.1em",
                  "color": v.studyAccent
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
                        "fontSize": "18px",
                        "lineHeight": "1.45",
                        "fontWeight": r.w,
                        "color": r.color
                      }}>{r.t}</span>
                    </div>
                  </React.Fragment>)}
                </div>
                <div style={{
                  "fontSize": "13px",
                  "lineHeight": "1.6",
                  "color": "#9a9a9a"
                }}>{v.studyTip}</div>
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
                "background": v.studyAccent,
                "color": "#0b0b0b"
              }} type="button">{"바로 문제 풀기"}</button>
            </div>
 </>}
          {v.isSheet && <> 
            <div style={{
              "display": "flex",
              "flexDirection": "column",
              "gap": "14px",
              "padding": "0 20px"
            }}>
              <div style={{
                "display": "flex",
                "alignItems": "center",
                "gap": "10px"
              }}>
                <button onClick={v.goHome} style={{
                  "width": "40px",
                  "height": "40px",
                  "borderRadius": "999px",
                  "background": "#1c1c1c",
                  "border": "0",
                  "color": "#ffffff",
                  "fontSize": "16px",
                  "cursor": "pointer",
                  "fontFamily": "inherit"
                }} type="button" aria-label="게임 선택으로 돌아가기">{"‹"}</button>
                <span style={{
                  "fontSize": "20px",
                  "fontWeight": "800",
                  "letterSpacing": "-0.02em"
                }}>{"60초 · 응원법 가사"}</span>
              </div>
              <div style={{
                "background": "#1c1c1c",
                "borderRadius": "18px",
                "padding": "16px 18px",
                "display": "flex",
                "flexDirection": "column",
                "gap": "8px"
              }}>
                <div style={{
                  "display": "flex",
                  "alignItems": "center",
                  "gap": "10px",
                  "fontSize": "12.5px",
                  "color": "#cfcfcf"
                }}><span style={{
                    "width": "14px",
                    "height": "14px",
                    "borderRadius": "4px",
                    "background": "#ffd24a",
                    "flexShrink": "0"
                  }}></span>{"가사와 함께 외치는 응원법"}</div>
                <div style={{
                  "display": "flex",
                  "alignItems": "center",
                  "gap": "10px",
                  "fontSize": "12.5px",
                  "color": "#cfcfcf"
                }}><span style={{
                    "width": "14px",
                    "height": "14px",
                    "borderRadius": "4px",
                    "background": "#5b8cff",
                    "flexShrink": "0"
                  }}></span>{"응원법만 크게 외치는 구간"}</div>
                <div style={{
                  "display": "flex",
                  "alignItems": "center",
                  "gap": "10px",
                  "fontSize": "12.5px",
                  "color": "#cfcfcf"
                }}><span style={{
                    "width": "14px",
                    "height": "14px",
                    "borderRadius": "4px",
                    "background": "rgba(255,210,74,0.22)",
                    "flexShrink": "0"
                  }}></span>{"최근 공연 떼창 구간"}</div>
                <div style={{
                  "display": "flex",
                  "alignItems": "center",
                  "gap": "10px",
                  "fontSize": "12.5px",
                  "color": "#cfcfcf"
                }}><span style={{
                    "width": "14px",
                    "height": "14px",
                    "borderRadius": "4px",
                    "background": "#0b0b0b",
                    "borderBottom": "2px solid #ffffff",
                    "flexShrink": "0"
                  }}></span>{"팬들이 가장 헷갈리는 줄"}</div>
              </div>
              {v.sheet.map((b, index) => <React.Fragment key={index}>
                <div style={{
                  "display": "flex",
                  "flexDirection": "column",
                  "gap": "8px",
                  "background": "#141414",
                  "borderRadius": "18px",
                  "padding": "16px 18px"
                }}>
                  <div style={{
                    "fontSize": "11px",
                    "fontWeight": "800",
                    "letterSpacing": "0.08em",
                    "color": "#8f8f8f"
                  }}>{b.p}</div>
                  {b.lines.map((l, index) => <React.Fragment key={index}>
                    <div style={{
                      "fontSize": "16px",
                      "lineHeight": "1.55",
                      "fontWeight": "600",
                      "background": l.bg,
                      "borderRadius": "6px",
                      "padding": "2px 6px",
                      "borderBottom": l.ul
                    }}>
                      {l.k.map((k, index) => <React.Fragment key={index}><span style={{
                          "color": k.color,
                          "fontWeight": k.w
                        }}>{k.t}</span></React.Fragment>)}
                    </div>
                  </React.Fragment>)}
                </div>
              </React.Fragment>)}
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
      isPlay: s.screen === "play",
      isCall: s.screen === "call",
      isResult: s.screen === "result",
      isSheet: s.screen === "sheet",
      isFull: s.screen === "full",
      fullRoundLength: this.fullRoundLength,
      fullNote: "후렴 자리 + 응원법 " + CALLSPOTS.length + "곳 · 선택지 3개 · 칸당 " + this.cfg.sec + "초",
      onStartFull: this.startFull,
      score: s.score,
      bestCombo: s.bestCombo,
      roundLength: this.roundLength,
      callRoundLength: this.callRoundLength,
      diffLabel: "",
      g2Diffs: ["보기 고르기", "단어 입력", "전체 입력"].map((label, i) => ({
        label,
        bg: s.g2Diff === i ? "#ffffff" : "transparent",
        fg: s.g2Diff === i ? "#0b0b0b" : "#8f8f8f",
        onClick: () => this.setState({
          g2Diff: i
        })
      })),
      g1Diffs: ["보기 고르기", "단어 입력", "전체 입력"].map((label, i) => ({
        label,
        bg: s.g1Diff === i ? "#ffffff" : "transparent",
        fg: s.g1Diff === i ? "#0b0b0b" : "#8f8f8f",
        onClick: () => this.setState({
          g1Diff: i
        })
      })),
      blankNote: ["보기 3개 중 고르기", "달라지는 단어만 직접 입력", "빈 줄 전체를 직접 입력"][s.g1Diff] + " · 문제당 " + this.cfg.sec + "초",
      callNote: "1절 · 2절 김성규 응원법은 매 라운드 출제 · " + this.cfg.sec + "초",
      remain: Math.max(0, (s.questions.length || 0) - s.results.length),
      progress: (s.questions || []).map((_, i) => {
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
      goHome: nav("home"),
      goSheet: nav("sheet"),
      sheetBg: s.screen === "sheet" ? "#ffffff" : "#1c1c1c",
      sheetFg: s.screen === "sheet" ? "#0b0b0b" : "#cfcfcf",
      onStartBlank: this.startBlank,
      onStartCall: this.startCall,
      isStudy: s.screen === "study",
      onStudyBlank: () => {
        this.stopClock();
        this.setState({
          screen: "study",
          game: "blank",
          studyIdx: 0
        });
      },
      onStudyCall: () => {
        this.stopClock();
        this.setState({
          screen: "study",
          game: "call",
          studyIdx: 0
        });
      },
      onRetry: () => s.game === "call" ? this.startCall() : s.game === "full" ? this.startFull() : this.startBlank()
    };
    if (s.screen === "full") {
      const q3 = s.questions[s.qi];
      if (!q3) return base;
      const fb3 = s.feedback;
      const byRow = {};
      s.questions.forEach((x, xi) => {
        byRow[x.row] = {
          q: x,
          i: xi
        };
      });
      const rows = [];
      let ri = 0;
      BLOCKS.forEach(b => {
        rows.push({
          active: "false",
          pre: b.p,
          slot: "",
          post: "",
          size: 11,
          weight: "800",
          color: "#6f6f6f",
          pad: "10px 4px 2px",
          slotDisplay: "none",
          slotW: "0",
          slotH: "auto",
          slotBg: "transparent",
          slotColor: "#ffffff",
          slotBorder: "0",
          slotPad: "0",
          slotAnim: "none"
        });
        b.lines.forEach(l => {
          const text = l.k.map(k => k[0]).join("");
          const hit = byRow[ri];
          if (hit) {
            const done = hit.i < s.qi || (hit.i === s.qi && fb3);
            const active = hit.i === s.qi;
            const answered = active && fb3;
            rows.push({
              pre: hit.q.pre,
              slot: done ? hit.q.answer : "",
              post: hit.q.post,
              size: active ? 16 : 14.5,
              weight: active ? "700" : "500",
              color: active ? "#ffffff" : done ? "#9a9a9a" : "#5a5a5a",
              pad: "3px 6px",
              slotDisplay: "inline-flex",
              slotW: active && !fb3 ? Math.max(84, hit.q.answer.length * 14) + "px" : "0",
              slotH: active && !fb3 ? "24px" : "auto",
              slotBg: answered ? fb3 === "correct" ? OK : "#2a1512" : active ? "#201d14" : "transparent",
              slotColor: answered ? fb3 === "correct" ? "#0b0b0b" : "#ffb5aa" : done ? "#ffd24a" : "#ffd24a",
              slotBorder: answered ? "2px solid " + (fb3 === "correct" ? OK : NG) : active ? "2px dashed #6a5a24" : "0",
              slotPad: active ? "1px 10px" : "0",
              slotAnim: active && !fb3 ? "slotPulse 1.6s ease-in-out infinite" : "none",
              active: active ? "true" : "false"
            });
          } else {
            rows.push({
              active: "false",
              pre: text,
              slot: "",
              post: "",
              size: 14.5,
              weight: "500",
              color: "#8f8f8f",
              pad: "3px 6px",
              slotDisplay: "none",
              slotW: "0",
              slotH: "auto",
              slotBg: "transparent",
              slotColor: "#ffffff",
              slotBorder: "0",
              slotPad: "0",
              slotAnim: "none"
            });
          }
          ri += 1;
        });
      });
      return {
        ...base,
        timePct: Math.max(0, 100 - s.elapsed / this.cfg.sec * 100),
        timeColor: s.elapsed / this.cfg.sec > 0.75 ? "#8f8f8f" : "#ffffff",
        qLabel: s.qi + 1 + " / " + s.questions.length + " 칸",
        fullRows: rows,
        scrollRef: el => {
          this._scroller = el;
        },
        choices: q3.choices.map(t => ({
          t,
          ...choiceState(fb3, t, q3.answer, s.picked),
          onClick: () => {
            if (!fb3) this.resolveBlank(t);
          }
        })),
        feedback: !!fb3,
        noFeedback: !fb3,
        choiceOpacity: fb3 ? 0.55 : 1,
        fbBg: fb3 === "correct" ? "#ffffff" : "#3a3a3a",
        fbFg: fb3 === "correct" ? "#0b0b0b" : "#ffffff",
        fbVerdict: fb3 === "correct" ? "정답" : fb3 === "timeout" ? "시간 초과" : "오답",
        fbTitle: q3.answer,
        fbTitleColor: fb3 === "correct" ? OK : NG,
        gained: fb3 === "correct" ? "+" + (100 + s.combo * 20 - 20) : "",
        nextLabel: fb3 ? s.qi + 1 >= s.questions.length ? "결과 보기" : "다음 칸" : "건너뛰기",
        nextBg: fb3 ? "#ffffff" : "#1c1c1c",
        nextFg: fb3 ? "#0b0b0b" : "#cfcfcf",
        onNext: () => {
          if (!fb3) {
            this.resolveBlank(null);
            setTimeout(this.next, 350);
          } else this.next();
        }
      };
    }
    if (s.screen === "study") {
      const cards = this.studyCards();
      const i = Math.min(s.studyIdx || 0, cards.length - 1);
      const card = cards[i],
        isCall = s.game === "call";
      return {
        ...base,
        studyTitle: isCall ? "응원법 미리 외우기" : "바뀌는 가사 미리 외우기",
        studyCounter: i + 1 + " / " + cards.length,
        studyAccent: isCall ? "#5b8cff" : "#ffd24a",
        studyDots: cards.map((c, ci) => ({
          bg: ci === i ? isCall ? "#5b8cff" : "#ffd24a" : ci < i ? "#4a4a4a" : "#1f1f1f"
        })),
        studyKicker: card.kicker,
        studyRows: card.rows,
        studyTip: card.tip,
        prevFg: i > 0 ? "#ffffff" : "#5a5a5a",
        studyPrev: () => this.setState({
          studyIdx: Math.max(0, i - 1)
        }),
        studyNext: () => i + 1 >= cards.length ? isCall ? this.startCall() : this.startBlank() : this.setState({
          studyIdx: i + 1
        }),
        studyToQuiz: () => isCall ? this.startCall() : this.startBlank()
      };
    }
    if (s.screen === "sheet") {
      base.sheet = BLOCKS.map(b => ({
        p: b.p,
        lines: b.lines.map(l => ({
          bg: l.sing ? "rgba(255,210,74,0.16)" : "transparent",
          ul: l.tricky ? "2px solid #6f6f6f" : "0",
          k: l.k.map(k => ({
            t: k[0],
            color: k[1] === "y" ? "#ffd24a" : k[1] === "b" ? "#5b8cff" : "#ffffff",
            w: k[1] ? "800" : "600"
          }))
        }))
      }));
      return base;
    }
    if (s.screen === "result") {
      const isCall = s.game === "call";
      const rate = Math.round(s.correct / Math.max(1, s.questions.length) * 100);
      return {
        ...base,
        correctRate: rate,
        missed: s.missed,
        perfect: s.missed.length === 0,
        resultGame: isCall ? "이 자리 응원법 맞히기" : s.game === "full" ? "전체 가사 빈칸 채우기" : "후렴 빈칸 채우기",
        resultBg: isCall ? "#5b8cff" : "#ffffff",
        rateLabel: "정답률",
        missLabel: isCall ? "놓친 응원법" : "놓친 자리",
        praise: rate === 100 ? isCall ? "응원법 다 잡았어요. 맨 앞줄 자격 있음" : "완벽해요. 후렴 세 번 다 구분했어요" : rate >= 70 ? "거의 다 왔어요. 한 번만 더" : isCall ? "1절과 2절 응원법부터 다시 볼까요" : "헷갈리는 자리부터 다시 볼까요"
      };
    }
    if (s.screen === "call") {
      const q2 = s.questions[s.qi];
      if (!q2) return base;
      const fb2 = s.feedback,
        spot = q2.spot,
        where = q2.kind === "where";
      const pairSpots = CALLSPOTS.filter(x => x.pair === "kim");
      return {
        ...base,
        timePct: Math.max(0, 100 - s.elapsed / this.cfg.sec * 100),
        timeColor: s.elapsed / this.cfg.sec > 0.75 ? "#8f8f8f" : "#ffffff",
        qLabel: s.qi + 1 + " / " + s.questions.length,
        spotPart: where ? "응원법 → 자리" : spot.part,
        kindLabel: spot.only ? "응원법만 외치는 구간" : "가사와 함께",
        kindBg: spot.only ? "#5b8cff" : "#ffd24a",
        callPrompt: where ? "이 응원법 바로 앞에 나오는 가사는?" : "이 자리에 들어갈 응원법은?",
        spotBefore: where ? "" : spot.before,
        spotAfter: where ? "" : spot.after,
        spotSlot: where ? spot.call : fb2 ? q2.answer : q2.mode && q2.mode !== "choice" ? s.typed + (q2.post || "") : "",
        hasChoices: !q2.mode || q2.mode === "choice",
        isTyping: q2.mode && q2.mode !== "choice",
        typeHint: q2.mode === "full" ? "응원법 전체를 입력하세요" : q2.post ? "\"" + q2.post.trim() + "\" 앞부분을 입력하세요" : "응원법을 입력하세요",
        typedValue: s.typed,
        typeRef: el => {
          this._typeInput = el;
        },
        onTypeChange: e => this.setState({
          typed: e.target.value
        }),
        onTypeKey: e => {
          if (e.key === "Enter" && !e.nativeEvent.isComposing && !fb2 && s.typed.trim()) this.resolveBlank(s.typed);
        },
        onTypeSubmit: () => {
          if (!fb2 && s.typed.trim()) this.resolveBlank(s.typed);
        },
        submitBg: s.typed.trim() ? "#5b8cff" : "#2a2a2a",
        submitFg: s.typed.trim() ? "#0b0b0b" : "#5f5f5f",
        spotColor: where ? "#5b8cff" : fb2 === "correct" ? "#0b0b0b" : fb2 ? "#ffb5aa" : "#ffd24a",
        spotBg: where ? "#141414" : fb2 === "correct" ? OK : fb2 ? "#2a1512" : "#201d14",
        spotBorder: where ? "2px solid #243049" : "2px " + (fb2 ? "solid " + (fb2 === "correct" ? OK : NG) : "dashed #6a5a24"),
        spotW: where ? "0" : Math.max(96, q2.answer.length * 14) + "px",
        spotH: "26px",
        spotPad: "0 12px",
        spotAnim: where || fb2 ? "none" : "slotPulse 1.6s ease-in-out infinite",
        choices: q2.choices.map(t => ({
          t,
          ...choiceState(fb2, t, q2.answer, s.picked),
          onClick: () => {
            if (!fb2) this.resolveBlank(t);
          }
        })),
        feedback: !!fb2,
        noFeedback: !fb2,
        choiceOpacity: fb2 ? 0.55 : 1,
        fbBg: fb2 === "correct" ? "#5b8cff" : "#3a3a3a",
        fbFg: fb2 === "correct" ? "#0b0b0b" : "#ffffff",
        fbVerdict: fb2 === "correct" ? "정답" : fb2 === "timeout" ? "시간 초과" : "오답",
        fbTitle: q2.answer,
        fbTitleColor: fb2 === "correct" ? OK : NG,
        gained: fb2 === "correct" ? "+" + (100 + s.combo * 20 - 20) : "",
        compare: pairSpots.map(x => {
          const same = x.part === spot.part,
            tone = fb2 === "correct" ? OK : NG;
          return {
            p: x.part,
            t: x.call,
            w: same ? "800" : "500",
            color: same ? "#ffffff" : "#9a9a9a",
            pc: same ? tone : "#6f6f6f",
            dot: same ? tone : "#3a3a3a"
          };
        }),
        nextLabel: fb2 ? s.qi + 1 >= s.questions.length ? "결과 보기" : "다음" : "건너뛰기",
        nextBg: fb2 ? "#5b8cff" : "#1c1c1c",
        nextFg: fb2 ? "#0b0b0b" : "#cfcfcf",
        onNext: () => {
          if (!fb2) {
            this.resolveBlank(null);
            setTimeout(this.next, 350);
          } else this.next();
        }
      };
    }
    const q = s.questions[s.qi];
    if (s.screen !== "play" || !q) return base;
    const fb = s.feedback,
      slot = SLOTS[q.si];
    return {
      ...base,
      timePct: Math.max(0, 100 - s.elapsed / this.cfg.sec * 100),
      timeColor: s.elapsed / this.cfg.sec > 0.75 ? "#8f8f8f" : "#ffffff",
      qLabel: s.qi + 1 + " / " + s.questions.length,
      partLabel: PARTS[q.pi],
      isSing: !!slot.sing[q.pi],
      hasCall: !!slot.call,
      partChips: PARTS.map((p, pi) => ({
        t: p,
        w: pi === q.pi ? "800" : "500",
        fg: pi === q.pi ? "#ffd24a" : "#5f5f5f",
        bar: pi === q.pi ? "#ffd24a" : "#2a2a2a"
      })),
      lines: SLOTS.map((sl, i) => {
        const blank = i === q.si;
        if (blank) {
          const tone = !fb ? "#ffd24a" : fb === "correct" ? OK : NG;
          const typing = q.mode !== "choice";
          const live = typing && !fb ? s.typed : "";
          const shown = fb ? typing ? q.typeTarget : q.answer : live;
          const gap = "#9a9a9a";
          return {
            parts: q.pre ? [{
              t: q.pre,
              color: gap,
              w: "500"
            }] : [],
            after: q.post ? [{
              t: q.post,
              color: gap,
              w: "500"
            }] : [],
            mark: tone,
            markH: "22px",
            size: 15,
            w: "800",
            color: tone,
            slotText: shown,
            slotDisplay: "inline-flex",
            slotW: fb ? "0" : Math.max(96, (typing ? q.typeTarget : q.answer).length * 14) + "px",
            slotH: fb ? "auto" : "26px",
            slotPad: fb ? "2px 12px" : "2px 12px",
            slotBorder: "2px " + (fb ? "solid " + tone : "dashed #6a5a24"),
            slotBg: fb === "correct" ? OK : fb ? "#2a1512" : "#201d14",
            slotColor: fb === "correct" ? "#0b0b0b" : fb ? "#ffb5aa" : "#ffd24a",
            slotAnim: fb ? "none" : "slotPulse 1.6s ease-in-out infinite"
          };
        }
        const text = sl.v[q.pi];
        const base = "#c9c9c9";
        const hl = sl.hl && sl.hl[q.pi];
        let parts = [{
          t: text,
          color: base,
          w: "500"
        }];
        if (hl && text.indexOf(hl) >= 0) {
          const at = text.indexOf(hl);
          parts = [{
            t: text.slice(0, at),
            color: base,
            w: "500"
          }, {
            t: hl,
            color: "#ffffff",
            w: "800"
          }, {
            t: text.slice(at + hl.length),
            color: base,
            w: "500"
          }].filter(p => p.t !== "");
        }
        return {
          parts,
          after: [],
          mark: "transparent",
          markH: "0px",
          size: 14.5,
          w: "500",
          color: base,
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
      }),
      choices: q.choices.map(t => ({
        t,
        ...choiceState(fb, t, q.answer, s.picked),
        onClick: () => {
          if (!fb) this.resolveBlank(t);
        }
      })),
      hasChoices: q.mode === "choice",
      isTyping: q.mode !== "choice",
      typeHint: q.mode === "full" ? "이 줄 전체를 입력하세요" : "빈칸에 들어갈 말을 입력하세요",
      typedValue: s.typed,
      typeRef: el => {
        this._typeInput = el;
      },
      onTypeChange: e => this.setState({
        typed: e.target.value
      }),
      onTypeKey: e => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing && !fb && s.typed.trim()) this.resolveBlank(s.typed);
      },
      onTypeSubmit: () => {
        if (!fb && s.typed.trim()) this.resolveBlank(s.typed);
      },
      submitBg: s.typed.trim() ? "#ffd24a" : "#2a2a2a",
      submitFg: s.typed.trim() ? "#0b0b0b" : "#5f5f5f",
      feedback: !!fb,
      noFeedback: !fb,
      choiceOpacity: fb ? 0.55 : 1,
      fbBg: fb === "correct" ? "#ffffff" : "#3a3a3a",
      fbFg: fb === "correct" ? "#0b0b0b" : "#ffffff",
      fbVerdict: fb === "correct" ? "정답" : fb === "timeout" ? "시간 초과" : "오답",
      fbTitle: fb === "correct" ? q.answer : q.answer,
      fbTitleColor: fb === "correct" ? OK : NG,
      gained: fb === "correct" ? "+" + (100 + s.combo * 20 - 20) : "",
      compare: PARTS.map((p, pi) => {
        const same = pi === q.pi;
        const tone = fb === "correct" ? OK : NG;
        return {
          p,
          t: slot.v[pi],
          w: same ? "800" : "500",
          color: same ? "#ffffff" : "#9a9a9a",
          pc: same ? tone : "#6f6f6f",
          dot: same ? tone : "#3a3a3a"
        };
      }),
      nextLabel: fb ? s.qi + 1 >= s.questions.length ? "결과 보기" : "다음" : "건너뛰기",
      nextBg: fb ? "#ffffff" : "#1c1c1c",
      nextFg: fb ? "#0b0b0b" : "#cfcfcf",
      onNext: () => {
        if (!fb) {
          this.resolveBlank(null);
          setTimeout(this.next, 350);
        } else this.next();
      }
    };
  }
}
export default LyricsGame;
