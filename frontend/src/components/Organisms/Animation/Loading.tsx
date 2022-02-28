import lottie from 'lottie-web';
import loadingAnimation from '@src/assets/loading.json';
import React, { useRef, useEffect } from 'react';

const Loading = () => {
  const loading = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: loading.current as any,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loadingAnimation,
    });
    return () => lottie.stop();
  }, []);
  return <div ref={loading}></div>;
};

export default Loading;
