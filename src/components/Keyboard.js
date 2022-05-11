import React, { useMemo } from "react";
import styled from "styled-components";
import { keyboardLetters, status } from "../config";
import useKeydownListener from "../hooks/useKeydownListener";

const Container = styled.div`
  height: auto;
  margin: 0 8px;
  height: 200px;
`;

const LetterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-weight: bold;
  border: 0;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  text-transform: uppercase;

  background-color: ${({ letterColor }) => (letterColor === status.unguessed ? "#d3d6da" : letterColor)};
  color: ${({ letterColor }) => (letterColor === status.unguessed ? "black" : "white")};

  &:last-child {
    margin: 0;
  }
`;

const HalfStep = styled.div`
  height: 58px;
  margin: 0 8px 0 0;
`;

const NonLetterButton = styled(LetterButton)`
  padding: 5px;
  background-color: #d3d6da;
  color: black;
`;

const Row = styled.div`
  display: flex;
  margin: 0 auto 8px;
  touch-action: manipulation;
  width: 100%;
  &:last-child {
    margin: 0;
  }
`;

const Keyboard = ({ onAddLetter, onEnter, onDelete, keyboardColors }) => {
  useKeydownListener({ onEnter, onDelete, onAddLetter });

  const keys = useMemo(() => {
    return keyboardLetters.map((row, idx) => (
      <Row key={idx}>
        {idx === 1 && <HalfStep />}
        {idx === keyboardLetters.length - 1 && <NonLetterButton onClick={onEnter}>enter</NonLetterButton>}
        {row.map((letter) => (
          <LetterButton key={letter} letterColor={keyboardColors[letter]} onClick={() => onAddLetter(letter)}>
            {letter}
          </LetterButton>
        ))}
        {idx === 1 && <HalfStep />}

        {idx === keyboardLetters.length - 1 && (
          <NonLetterButton aria-label="backspace" onClick={onDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
              <path
                fill="black"
                d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
              ></path>
            </svg>
          </NonLetterButton>
        )}
      </Row>
    ));
  }, [keyboardColors, onDelete, onAddLetter, onEnter]);

  return <Container>{keys}</Container>;
};

export default Keyboard;
