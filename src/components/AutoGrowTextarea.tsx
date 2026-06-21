import React, { useCallback, useEffect, useRef } from 'react';

/**
 * 내용이 길어지면 높이가 자동으로 늘어나는 textarea.
 * CSS 의 min-height 를 시작 높이로 두고, 입력에 따라 scrollHeight 만큼 키운다.
 * (CSS 에 overflow: hidden 을 함께 줘야 늘어나는 동안 스크롤바가 깜빡이지 않는다.)
 */
type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const AutoGrowTextarea: React.FC<Props> = ({ value, onChange, ...rest }) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  // 값이 바뀔 때(외부 변경·초기 렌더 포함)마다 높이 재계산
  useEffect(() => {
    resize();
  }, [value, resize]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => {
        onChange?.(e);
        resize();
      }}
      {...rest}
    />
  );
};

export default AutoGrowTextarea;
