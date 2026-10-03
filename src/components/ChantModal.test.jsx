import React from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import SongChantModal from './SongChantModal';
import chantData from '../data/sungkyu-chant.json';

beforeEach(() => jest.useFakeTimers());
afterEach(() => { cleanup(); jest.useRealTimers(); });

test.each(['60초', 'Shine', 'Small Talk'])('%s uses the existing chant data and closes with Escape', title => {
  const item = chantData.find(song => song.title === title);
  const onClose = jest.fn();
  const { container, unmount } = render(<SongChantModal title={title} onClose={onClose} />);
  expect(screen.getByRole('dialog', { name: `${title} 가사·응원법` })).toBeTruthy();
  expect(document.body.style.overflow).toBe('hidden');
  expect(container.querySelectorAll('.chant-line').length).toBe(item.chant.split('\n').length);
  if (item.youtube_url) expect(container.querySelector('iframe').title).toBe(title);
  const dialog = screen.getByRole('dialog');
  fireEvent.click(dialog);
  act(() => jest.advanceTimersByTime(300));
  expect(onClose).not.toHaveBeenCalled();
  fireEvent.keyDown(document, { key: 'Escape' });
  act(() => jest.advanceTimersByTime(250));
  expect(onClose).toHaveBeenCalledTimes(1);
  unmount();
  expect(document.body.style.overflow).toBe('');
});
