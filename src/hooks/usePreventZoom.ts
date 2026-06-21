import { useEffect } from 'react';

/**
 * 모바일(iOS Safari)에서 input/textarea/select 포커스 시 발생하는
 * 자동 확대(zoom)를 막는다.
 *
 * iOS 는 입력 요소의 font-size 가 16px 미만이면 포커스 시 화면을 확대한다.
 * 폼 입력 폰트를 Figma 시안대로 14px 로 유지하려면 viewport 의 maximum-scale 을
 * 1 로 고정해 자동 확대를 차단해야 한다.
 *
 * index.html 의 viewport 를 전역으로 바꾸면 차트 등 다른 페이지의 핀치 줌까지
 * 막히므로, 이 훅을 사용하는 폼 페이지에 머무는 동안에만 적용하고
 * 벗어날 때 원래 viewport 설정으로 되돌린다.
 */
export function usePreventZoom() {
  useEffect(() => {
    const vp = document.querySelector('meta[name="viewport"]');
    if (!vp) return;
    const prev = vp.getAttribute('content') || '';
    vp.setAttribute(
      'content',
      'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    );
    return () => {
      vp.setAttribute('content', prev);
    };
  }, []);
}
