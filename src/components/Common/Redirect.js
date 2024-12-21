import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Redirect({message}) {
  const [countdown, setCountdown] = useState(3); // Countdown starting at 3 seconds
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000); // Decrease countdown by 1 every second

      return () => clearTimeout(timerId); // Clear timeout if the component unmounts or countdown changes
    } else {
      navigate('/'); // Redirect to home page when countdown reaches 0
    }
  }, [countdown, navigate]);

  return (
    <div>
      <h1>{message}</h1>
      <p>Redirecting to home in {countdown}...</p>
    </div>
  );
}

export default Redirect;