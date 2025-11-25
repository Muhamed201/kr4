import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [inputTime, setInputTime] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      alert('Время вышло!');
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, time]);

  const handleStart = () => {
    if (inputTime > 0) {
      setTime(parseInt(inputTime));
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
    setInputTime('');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <div className="timer-container">
        <h1>Таймер обратного отсчёта</h1>
        
        <div className="input-section">
          <input
            type="number"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            placeholder="Введите секунды"
            min="1"
            disabled={isActive}
          />
          <button 
            onClick={handleStart} 
            disabled={isActive || !inputTime}
          >
            Установить
          </button>
        </div>

        <div className="timer-display">
          <div className="time">{formatTime(time)}</div>
        </div>

        <div className="controls">
          {isActive && (
            <button 
              onClick={handlePauseResume}
              className={isPaused ? 'resume' : 'pause'}
            >
              {isPaused ? 'Продолжить' : 'Пауза'}
            </button>
          )}
          <button 
            onClick={handleReset}
            disabled={!isActive && time === 0}
          >
            Сброс
          </button>
        </div>

        <div className="status">
          {!isActive && time === 0 && 'Таймер не запущен'}
          {isActive && !isPaused && 'Таймер работает...'}
          {isPaused && 'Таймер на паузе'}
        </div>
      </div>
    </div>
  );
}

export default App;