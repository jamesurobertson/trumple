import { keyboardLetters, status } from "../constants";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.75rem;
  user-select: none;
  height: auto;
`;

const LetterButton = styled.button`
  height: 58px;
  width: 38px;
  border-radius: 4px;
  border: 0;
  font-weight: bold;
  margin: 0 6px 0 0;

  background-color: ${({ letterColor }) =>
    letterColor === status.unguessed ? "#d3d6da" : letterColor};
  color: ${({ letterColor }) =>
    letterColor === status.unguessed ? "black" : "white"};
`;

const HalfStep = styled.div`
  height: 58px;
  width: 19px;
  margin: 0 6px 0 0;
`;

const NonLetterButton = styled.button`
  height: 58px;
  border-radius: 4px;
  border: 0;
  font-weight: bold;
  margin: 0 6px 0 0;
  background-color: #d3d6da;
  flex: 1;
`;

const Row = styled.div`
  display: flex;
  margin: 0 auto 8px;
  touch-action: manipulation;
  width: 100%;
  justify-content: space-between;
`;

const Keyboard = ({
  onAddLetter,
  onEnterPress,
  onDeletePress,
  keyboardColors,
}) => {
  useEffect(() => {
    const listener = (e) => {
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
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                />
              </svg>
            </NonLetterButton>
          )}
        </Row>
      ))}
    </Container>
  );
};

export default Keyboard;
