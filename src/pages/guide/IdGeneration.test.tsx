import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import IdGeneration from './IdGeneration';

// CRA's Jest resolver cannot resolve React Router 7's DOM package exports.
// Use the actual router implementation through its CommonJS entry for these tests.
jest.mock('react-router-dom', () => {
  global.TextEncoder = require('util').TextEncoder;
  return jest.requireActual('react-router');
}, { virtual: true });

jest.mock('../../components/Header', () => () => null);
jest.mock('../../components/Footer', () => () => null);
jest.mock('../../components/GuideMenu', () => () => null);

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <output data-testid="pathname">{location.pathname}</output>
      <button onClick={() => navigate(-1)}>뒤로</button>
      <button onClick={() => navigate(1)}>앞으로</button>
    </>
  );
};

const renderGuide = (path: string) => render(
  <MemoryRouter initialEntries={[path]}>
    <Navigation />
    <Routes>
      <Route path="/guide/id-generation" element={<IdGeneration />} />
      <Route path="/guide/id-generation/:service" element={<IdGeneration />} />
    </Routes>
  </MemoryRouter>
);

beforeEach(() => {
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

test.each([
  ['melon', '멜론', 'guide-melon.png'],
  ['genie', '지니', 'guide-genie.png'],
  ['bugs', '벅스', 'guide-bugs.png'],
  ['flo', '플로', 'guide-flo.png'],
  ['vibe', '바이브', 'guide-vibe.png'],
  ['dual-number', '듀얼 넘버', 'guide-number.png'],
  ['virtual-number', '안심번호', 'guide-virtual-number.png'],
])('opens the %s guide directly', (service, label, image) => {
  renderGuide(`/guide/id-generation/${service}`);
  expect(screen.getByText(label).closest('.tab-item')).toHaveClass('selected');
  expect(screen.getAllByAltText('guide')[0]).toHaveAttribute('src', `/${image}`);
});

test('keeps the selected guide in sync with tab clicks and browser history', () => {
  renderGuide('/guide/id-generation/melon');
  fireEvent.click(screen.getByText('지니'));
  expect(screen.getByTestId('pathname')).toHaveTextContent('/guide/id-generation/genie');
  expect(screen.getByAltText('guide')).toHaveAttribute('src', '/guide-genie.png');

  fireEvent.click(screen.getByText('뒤로'));
  expect(screen.getByText('멜론').closest('.tab-item')).toHaveClass('selected');
  expect(screen.getByAltText('guide')).toHaveAttribute('src', '/guide-melon.png');

  fireEvent.click(screen.getByText('앞으로'));
  expect(screen.getByText('지니').closest('.tab-item')).toHaveClass('selected');
  expect(screen.getByAltText('guide')).toHaveAttribute('src', '/guide-genie.png');
});

test.each(['/guide/id-generation', '/guide/id-generation/unknown'])(
  'shows the default guide for %s', (path) => {
    renderGuide(path);
    expect(screen.getByTestId('pathname').textContent).toBe('/guide/id-generation/melon');
    expect(screen.getByText('멜론').closest('.tab-item')).toHaveClass('selected');
    expect(screen.getByAltText('guide')).toHaveAttribute('src', '/guide-melon.png');
  }
);
