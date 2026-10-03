import React from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import ShineGame from './ShineGame';
import SmallTalkGame from './SmallTalkGame';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}), { virtual: true });

beforeEach(() => jest.useFakeTimers());
afterEach(() => { cleanup(); jest.useRealTimers(); });

const games = [
  ['Shine', ShineGame, ['startBlank', 'startFull']],
  ['Small Talk', SmallTalkGame, ['startCall', 'startLong', 'startFull']],
];

test.each(games)('%s choice rounds finish with unique choices, scores and results', (name, Component, starts) => {
  const ref = React.createRef();
  render(<Component ref={ref} />);
  expect(screen.getByRole('link', { name: '‹ 곡 선택' }).getAttribute('href')).toBe('/lyrics-practice');
  for (const start of starts) {
    act(() => ref.current[start]());
    const game = ref.current;
    expect(game.state.questions.length).toBeGreaterThan(0);
    for (const q of game.state.questions) {
      expect(new Set(q.choices).size).toBe(3);
      expect(q.choices).toContain(q.answer);
      act(() => game.resolve(q.answer));
      const score = game.state.score;
      act(() => game.resolve(q.answer));
      expect(game.state.score).toBe(score);
      act(() => game.next());
    }
    expect(game.state.screen).toBe('result');
    expect(game.state.correct).toBe(game.state.questions.length);
    expect(screen.getByText('100%')).toBeTruthy();
  }
});

test.each(games)('%s full input accepts normalized answers, pauses for lyrics, and times out correctly', (name, Component) => {
  const ref = React.createRef();
  render(<Component ref={ref} />);
  fireEvent.click(screen.getByText(name === 'Shine' ? '가사 보기' : '가사·응원법 보기'));
  expect(screen.getByRole('dialog', { name: `${name} 가사·응원법` })).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: '가사·응원법 닫기' }));
  act(() => jest.advanceTimersByTime(250));
  expect(ref.current.state.screen).toBe('home');
  fireEvent.click(screen.getAllByText('전체 입력')[name === 'Shine' ? 1 : 1]);
  const game = ref.current;
  expect(game.state.game).toBe('full');
  const q = game.state.questions[0];
  fireEvent.change(screen.getByPlaceholderText('여기에 입력'), { target: { value: q.answer.toUpperCase().replace(/[\s!()]/g, '') } });
  fireEvent.click(screen.getByText('확인'));
  expect(game.state.feedback).toBe('correct');
  act(() => game.next());
  const seconds = name === 'Shine' ? 20 : 30;
  act(() => jest.advanceTimersByTime((seconds - 1) * 1000));
  expect(game.state.feedback).toBeNull();
  act(() => jest.advanceTimersByTime(1100));
  expect(game.state.feedback).toBe('timeout');
  expect(game.state.results).toEqual([true, false]);
});
