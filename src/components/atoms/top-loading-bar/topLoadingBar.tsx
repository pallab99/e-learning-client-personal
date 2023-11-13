import { useState, useEffect } from 'react';
import './topLoadingBar.style.scss';
function LoadingBar() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const barStyle = {
    width: loading ? '100%' : '0%',
    transition: 'width 0.5s',
  };

  return (
    <div className="loading-bar">
      <div className="bar" style={barStyle}></div>
    </div>
  );
}

export default LoadingBar;
