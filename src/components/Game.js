import { useEffect } from "react";
import { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Keyboard from "./Keyboard";
import { letters, status } from "../constants";
import { words } from "../words";

const shake = keyframes`
    10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const flip = keyframes`
  from {
    transform: rotateX(-90deg);
  }

  to {
    transform: rotateX(0);
  }
`;

const animation = (props) =>
  css`
    animation: ${shake} 0.6s linear;
  `;

const flipAnimation = (props) =>
  css`
    animation: ${flip} 250ms ease-in;
  `;

const GameContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
`;

const ErrorMsgContainer = styled.div`
  display: flex;
  position: absolute;
  top: 9.5%;
  left: 50%;
  transform: translate(-50%, 0);
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
  color: white;
  font-weight: bold;
  background-color: black;
`;

const Board = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  height: 420px;
  width: 350px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
  ${({ shakeErr }) => shakeErr && animation}
`;

const Tile = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  color: black;
  text-transform: uppercase;
  ${({ isFlipping }) => isFlipping && flipAnimation};
  transition: transform 0.25s ease-in-out;
  user-select: none;
  border: 2px solid
    ${({ cellColor, hasLetter }) =>
      cellColor === status.unguessed
        ? hasLetter
          ? "#86888a"
          : "#d3d6da"
        : cellColor};
  color: ${({ cellColor }) =>
    cellColor === status.unguessed ? "black" : "white"};
  background-color: ${({ cellColor }) =>
    cellColor === status.unguessed ? "white" : cellColor};
`;

const WinningTile = styled(Tile)`
  background-image: url(/images/trump.png);
  max-width: 100%;
  max-height: 100%;
  display: block;
  background-size: contain;
`;

const Game = () => {
  const answer = "TRUMP";
  const [board, setBoard] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [rowErrorIdx, setRowErrorIdx] = useState(null);
  const [guessedWord, setGuessedWord] = useState("");
  const [gameState, setGameState] = useState("active");
  const [currentTileFlip, setCurrentTileFlip] = useState(null);
  const [winningRow, setWinningRow] = useState(null);
  const [cellStatuses, setCellStatuses] = useState(
    Array(6).fill(Array(5).fill(status.unguessed))
  );
  const [letterStatuses, setLetterStatuses] = useState(
    letters.reduce((letterMap, letter) => {
      letterMap[letter] = status.unguessed;
      return letterMap;
    }, {})
  );

  const addLetter = (letter) => {
    setBoard((curr) => {
      if (currentCol > 4) {
        return curr;
      }
      const newBoard = [...curr];
      newBoard[currentRow][currentCol] = letter;
      return newBoard;
    });
    if (currentCol < 5) {
      setCurrentCol((curr) => curr + 1);
    }
  };

  const isValidWord = (word) => {
    if (word.length < 5) return [false, "Not enough letters."];
    if (!words.includes(word.toLowerCase())) {
      return [false, "Not in word list."];
    }
    return [true];
  };

  //   const setCellColors = (word) => {
  //     setCellStatuses((curr) => {
  //       const newCellStatuses = [...curr];
  //       const newRow = [...curr[currentRow]];
  //       for (let i = 0; i < 5; i++) {
  //         if (word[i] === answer[i]) {
  //           newRow[i] = status.green;
  //         } else if (answer.includes(word[i])) {
  //           newRow[i] = status.yellow;
  //         } else {
  //           newRow[i] = status.gray;
  //         }
  //       }
  //       newCellStatuses[currentRow] = newRow;
  //       return newCellStatuses;
  //     });
  //   };

  const setKeyboardColors = (word) => {
    setLetterStatuses((curr) => {
      const newLetterStatuses = { ...curr };
      for (let i = 0; i < word.length; i++) {
        if (word[i] === answer[i]) {
          newLetterStatuses[word[i]] = status.green;
        } else if (answer.includes(word[i])) {
          newLetterStatuses[word[i]] = status.yellow;
        } else {
          newLetterStatuses[word[i]] = status.gray;
        }
      }

      return newLetterStatuses;
    });
  };

  useEffect(() => {
    if (currentTileFlip === null) return;
    if (!guessedWord) return;
    if (currentTileFlip === 5) {
      setKeyboardColors(guessedWord);
      if (guessedWord === "TRUMP") {
        setWinningRow(currentRow);
        setGameState("inactive");
      }
      setCurrentTileFlip(null);
      setGuessedWord("");
      setCurrentRow((curr) => curr + 1);
      setCurrentCol(0);
      return;
    }
    setTimeout(() => {
      setCellStatuses((curr) => {
        const newCellStatuses = [...curr];
        const newRow = [...curr[currentRow]];
        if (guessedWord[currentTileFlip] === answer[currentTileFlip]) {
          newRow[currentTileFlip] = status.green;
        } else if (answer.includes(guessedWord[currentTileFlip])) {
          newRow[currentTileFlip] = status.yellow;
        } else {
          newRow[currentTileFlip] = status.gray;
        }
        newCellStatuses[currentRow] = newRow;
        return newCellStatuses;
      });
      setCurrentTileFlip((curr) => curr + 1);
    }, 250);
  }, [currentRow, currentTileFlip, guessedWord]);

  const onEnterPress = () => {
    // prevents pressing enter multiple times while tiles are changing color
    if (guessedWord) return;

    const word = board[currentRow].join("");
    const [valid, err] = isValidWord(word);
    if (!valid) {
      setErrorMsg(err);
      setRowErrorIdx(currentRow);
      return;
    }

    setGuessedWord(word);
    setCurrentTileFlip(0);
  };
  const onDeletePress = () => {
    if (currentCol === 0) return;

    setBoard((curr) => {
      const newBoard = [...curr];
      newBoard[currentRow][currentCol - 1] = "";
      return newBoard;
    });

    setCurrentCol((curr) => curr - 1);
  };

  useEffect(() => {}, [board]);

  useEffect(() => {
    if (errorMsg.length === 0) return;
    setTimeout(() => {
      setErrorMsg("");
      setRowErrorIdx(null);
    }, 1200);
  }, [errorMsg]);

  return (
    <GameContainer>
      {errorMsg && <ErrorMsgContainer>{errorMsg}</ErrorMsgContainer>}
      <Container>
        <Board>
          {board.map((row, rowIdx) => (
            <Row
              key={rowIdx}
              shakeErr={rowIdx === rowErrorIdx}
              winningRow={winningRow === rowIdx}
            >
              {row.map((tile, tileIdx) =>
                winningRow === rowIdx ? (
                  <WinningTile key={tileIdx} />
                ) : (
                  <Tile
                    key={tileIdx}
                    hasLetter={tile !== ""}
                    isFlipping={
                      (currentTileFlip === tileIdx && currentRow) === rowIdx
                    }
                    cellColor={cellStatuses[rowIdx][tileIdx]}
                  >
                    {tile}
                  </Tile>
                )
              )}
            </Row>
          ))}
        </Board>
      </Container>
      <Keyboard
        addLetter={addLetter}
        onEnterPress={onEnterPress}
        onDeletePress={onDeletePress}
        gameDisabled={gameState !== "active"}
        letterStatuses={letterStatuses}
      />
    </GameContainer>
  );
};

export default Game;
