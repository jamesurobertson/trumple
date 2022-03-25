import { keyboardLetters, status } from "../constants";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: auto;
  margin: 0 8px;
  height: 200px;
`;

const LetterButton = styled.div`
  height: 58px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 0;
  font-weight: bold;
  margin: 0 6px 0 0;

  background-color: ${({ letterColor }) =>
    letterColor === status.unguessed ? "#d3d6da" : letterColor};
  color: ${({ letterColor }) =>
    letterColor === status.unguessed ? "black" : "white"};

  &:last-child {
    margin: 0;
  }
`;

const HalfStep = styled.div`
  height: 58px;
  margin: 0 8px 0 0;
`;

const NonLetterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 58px;
  border-radius: 4px;
  border: 0;
  padding: 5px;
  font-weight: bold;
  margin: 0 6px 0 0;
  background-color: #d3d6da;
  color: black;
  &:last-child {
    margin: 0;
  }
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

const Keyboard = ({
  onAddLetter,
  onEnterPress,
  onDeletePress,
  keyboardColors,
}) => {
  useEffect(() => {
    const listener = (e) => {
      if (e.ctrlKey || e.metaKey) {
        return;
      }
      if (e.code === "Enter") {
        onEnterPress();
      } else if (e.code === "Backspace") {
        onDeletePress();
      } else {
        const key = e.key.toUpperCase();
        if (key.length === 1 && key >= "A" && key <= "Z") {
          onAddLetter(key);
        }
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [onEnterPress, onDeletePress, onAddLetter]);

  return (
    <Container>
      {keyboardLetters.map((row, idx) => (
        <Row key={idx}>
          {idx === 1 && <HalfStep />}
          {idx === keyboardLetters.length - 1 && (
            <NonLetterButton onClick={onEnterPress}>ENTER</NonLetterButton>
          )}
          {row.map((letter) => (
            <LetterButton
              key={letter}
              letterColor={keyboardColors[letter]}
              onClick={() => onAddLetter(letter)}
            >
              {letter}
            </LetterButton>
          ))}
          {idx === 1 && <HalfStep />}

          {idx === keyboardLetters.length - 1 && (
            <NonLetterButton onClick={onDeletePress}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
              >
                <path
                  fill="black"
                  d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
                ></path>
              </svg>
            </NonLetterButton>
          )}
        </Row>
      ))}
    </Container>
  );
};

export default Keyboard;
