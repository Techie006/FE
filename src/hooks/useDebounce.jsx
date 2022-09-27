import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    // delay ms 뒤에 debounce 값을 변경해주는 타이머 설정
    // delay 값 미입력시 0.5초가 디폴트값
    const timer = setTimeout(() => setDebounce(value), delay || 500);

    return () => {
      // 컴포넌트 unmount 시 setTimeout 시간 초기화
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounce;
};

export default useDebounce;
