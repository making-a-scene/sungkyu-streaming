import React from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import LyricsGame from './LyricsGame';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}), { virtual: true });

beforeEach(() => jest.useFakeTimers());
afterEach(() => { cleanup(); jest.useRealTimers(); });

function mountGame() {
  const ref = React.createRef();
  render(<LyricsGame ref={ref} />);
  return ref;
}

test('all three rounds contain unique choices and correct answers, and finish with results', () => {
  const ref = mountGame();
  for (const start of ['startBlank', 'startCall', 'startFull']) {
    act(() => ref.current[start]());
    const game = ref.current;
    expect(game.state.questions.length).toBeGreaterThan(0);
    if (start === 'startCall') {
      for (const call of ['어나더미! 김성규!', '또 다른 너! 김성규!']) {
        expect(game.state.questions.some(q => q.kind === 'which' && q.answer === call)).toBe(true);
      }
    }
    for (const q of game.state.questions) {
      expect(new Set(q.choices).size).toBe(3);
      expect(q.choices).toContain(q.answer);
      act(() => game.resolveBlank(q.answer));
      act(() => game.next());
    }
    expect(game.state.screen).toBe('result');
    expect(game.state.correct).toBe(game.state.questions.length);
    expect(screen.getByText('정답률')).toBeTruthy();
  }
});

test('20-second timeout resolves once and next question restarts the timer', () => {
  const ref = mountGame();
  fireEvent.click(screen.getByText('9문제 풀기'));
  act(() => jest.advanceTimersByTime(20100));
  expect(ref.current.state.feedback).toBe('timeout');
  expect(ref.current.state.results).toEqual([false]);
  act(() => ref.current.resolveBlank(ref.current.state.questions[0].answer));
  expect(ref.current.state.results).toEqual([false]);
  fireEvent.click(screen.getByText('다음'));
  expect(ref.current.state.elapsed).toBe(0);
  act(() => jest.advanceTimersByTime(20100));
  expect(ref.current.state.results).toEqual([false, false]);
});

test('study cards lead into quiz and typing ignores whitespace without double submission', () => {
  const ref = mountGame();
  fireEvent.click(screen.getAllByText('먼저 외우기')[0]);
  expect(screen.getByText('바뀌는 가사 미리 외우기')).toBeTruthy();
  fireEvent.click(screen.getByText('바로 문제 풀기'));
  act(() => ref.current.setState({ screen: 'home', g1Diff: 2 }));
  act(() => ref.current.startBlank());
  const q = ref.current.state.questions[0];
  fireEvent.change(screen.getByPlaceholderText('여기에 입력'), { target: { value: q.answer.replace(/ /g, '') } });
  fireEvent.keyDown(screen.getByPlaceholderText('여기에 입력'), { key: 'Enter' });
  expect(ref.current.state.feedback).toBe('correct');
  expect(ref.current.state.score).toBe(100);
  act(() => ref.current.resolveBlank(q.answer));
  expect(ref.current.state.score).toBe(100);
});

test.each([1, 2])('cheering input mode %i uses the right target and ignores spaces and exclamation marks', mode => {
  const ref = mountGame();
  act(() => ref.current.setState({ g2Diff: mode }));
  act(() => ref.current.startCall());
  const game = ref.current;
  expect(game.state.questions).toHaveLength(5);
  expect(game.state.questions.every(q => q.kind === 'which' && q.choices.length === 0)).toBe(true);
  for (const q of game.state.questions) {
    if (q.spot.pair === 'kim') {
      expect(q.post).toBe(mode === 1 ? ' 김성규!' : '');
      expect(q.typeTarget.includes('김성규')).toBe(mode === 2);
    }
    const input = screen.getByPlaceholderText('여기에 입력');
    fireEvent.change(input, { target: { value: q.typeTarget.replace(/[\s!]/g, '') } });
    fireEvent.keyDown(input, { key: 'Enter', isComposing: true });
    expect(game.state.feedback).toBeNull();
    fireEvent.click(screen.getByText('확인'));
    expect(game.state.feedback).toBe('correct');
    act(() => game.next());
  }
  expect(game.state.screen).toBe('result');
  expect(game.state.correct).toBe(5);
});

test('lyrics viewer pauses the current game and returns to the same question', () => {
  const ref = mountGame();
  act(() => ref.current.startBlank());
  act(() => jest.advanceTimersByTime(3000));
  const elapsed = ref.current.state.elapsed;
  fireEvent.click(screen.getByText('가사 · 응원법 보기'));
  expect(ref.current.state.screen).toBe('sheet');
  act(() => jest.advanceTimersByTime(21000));
  expect(ref.current.state.elapsed).toBe(elapsed);
  fireEvent.click(screen.getByText('가사 · 응원법 닫기'));
  expect(ref.current.state.screen).toBe('play');
  expect(ref.current.state.qi).toBe(0);
  expect(ref.current.state.feedback).toBeNull();
});
