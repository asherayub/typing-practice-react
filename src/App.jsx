import React, { useEffect, useState, useRef } from "react";
import {
  AiOutlinePoweroff,
  AiOutlineClockCircle,
  AiTwotoneEdit,
} from "react-icons/ai";
 
export default function App() {
  const [text, setText] = useState("");
  const [words, setWords] = useState(0);
  const [time, setTime] = useState(5);
  const [startGame, setStartGame] = useState(false);
  const [power, setPower] = useState(false);

  const textareaRef = useRef();

  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);
  };
  const startPlay = () => {
    setStartGame(true);
    setText("");
    setWords(0);
    if (time === 0) {
      setTime(5);
    } else setTime(time);
    textareaRef.current.disabled = false;
    textareaRef.current.focus();
  };
  const endPlay = () => {
    countWords();
    setStartGame(false);
  };
  const countWords = () => {
    const wordsArr = text
      .trim()
      .split(" ")
      .filter((word) => word !== "").length;

    setWords(wordsArr);
  };

  useEffect(() => {
    if (startGame && time !== 0)
      setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    else endPlay();
  }, [time, startGame]);

  return (
    <main>
      <section className="game">
        <textarea
          className={power ? "power-is-on" : ""}
          ref={textareaRef}
          disabled={!startGame}
          cols={30}
          rows={10}
          value={text}
          onChange={handleChange}
        />
        <div className="bottom">
          <h2 className="time">
            <AiOutlineClockCircle /> {time}
          </h2>
          <input
            className="add-time"
            placeholder="Time"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={!startGame && !power}
          />
          <button
            className="start-btn"
            disabled={!startGame && !power}
            onClick={startPlay}
          >
            Start Game
          </button>
          <h2 className="words">
            <AiTwotoneEdit /> {words}
          </h2>
          <button
            style={{ border: `2px solid ${power ? "#21f838" : "transparent"}` }}
            className="power-btn"
            onClick={() => setPower((prev) => !prev)}
          >
            <AiOutlinePoweroff />
          </button>
        </div>
      </section>
    </main>
  );
}
