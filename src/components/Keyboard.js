import React, { useMemo } from 'react';
import styled from 'styled-components';
import { keyboardLetters, colors } from '../config';
import { useGameState } from '../contexts/GameStateContext';
import useKeydownListener from '../hooks/useKeydownListener';
import Backspace from './icons/Backspace';

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
  background-color: ${({ letterColor }) => letterColor};
  color: ${({ letterColor }) => (letterColor === colors.unguessed ? 'black' : 'white')};
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
  background-color: ${colors.unguessed};
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

const Keyboard = () => {
  const {
    gameState: { keyboardColors },
    addLetter,
    addWord,
    deleteLetter,
  } = useGameState();
  useKeydownListener({ onEnter: addWord, onDelete: deleteLetter, onAddLetter: addLetter });

  const keys = useMemo(() => {
    return keyboardLetters.map((row, idx) => (
      <Row key={idx}>
        {idx === 1 && <HalfStep />}
        {idx === keyboardLetters.length - 1 && <NonLetterButton onClick={addWord}>enter</NonLetterButton>}
        {row.map((letter) => (
          <LetterButton key={letter} letterColor={keyboardColors[letter]} onClick={() => addLetter(letter)}>
            {letter}
          </LetterButton>
        ))}
        {idx === 1 && <HalfStep />}

        {idx === keyboardLetters.length - 1 && (
          <NonLetterButton aria-label="backspace" onClick={deleteLetter}>
            <Backspace />
          </NonLetterButton>
        )}
      </Row>
    ));
  }, [keyboardColors, deleteLetter, addLetter, addWord]);

  return <Container>{keys}</Container>;
};

export default Keyboard;
