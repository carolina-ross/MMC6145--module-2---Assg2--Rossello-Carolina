import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [bestTime, setBestTime] = useState(null);
  const [previousTime, setPreviousTime] = useState(null);

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

    const handleGameStart = () => {
    timerReset();
    timerStart();
  };

  const handleGameEnd = () => {
    timerStop();
    // set the previous time to the current time
    setPreviousTime(time);

    // check if the current time is less than the best time
    // and update the best time if necessary
    if (!bestTime || time < bestTime) {
      setBestTime(time);
    }
  };


  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        time={time}
        bestTime={bestTime}
        previousTime={previousTime}
        openModal={() => setShowModal(true)}
      />
      <CardGame
        // add onGameStart, onGameEnd props
        onGameStart={handleGameStart}
        onGameEnd={handleGameEnd}
        cardTexts={cardTexts}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}

