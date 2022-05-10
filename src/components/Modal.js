import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { status } from "../config";
import { timeTillMidnight } from "../utils";
import CloseIcon from "./icons/CloseIcon";

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: ${({ theme }) => `${theme.modalBackdropColor}`};
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
  width: 90%;
  max-width: 500px;
  height: 90%;
  max-height: 400px;
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  color: ${({ theme }) => theme.color};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
`;

const SectionLabel = styled.div`
  font-weight: bold;
  text-transform: uppercase;
`;

const StatsContainer = styled.div`
  flex: 1;
`;

const Stat = styled.div`
  font-size: 36px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const StatsLabel = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const Flex = styled.div`
  display: flex;
`;

const widths = [0, 20, 50, 80, 100];
const DistributionContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  color: white;
  padding-right: 5px;
  height: 20px;
  font-size: 14px;
  width: ${({ guess }) => `${guess + 8}%`};
  background-color: gray;
  margin: 5px;
`;

const Button = styled.button`
  display: flex;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px;
  color: white;
  font-weight: bold;
  background-color: ${status.green};
  z-index: 100;
`;

const Modal = ({ reset, close, stats }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(timeTillMidnight());
    const setTimeTillMidnight = () => {
      const t = timeTillMidnight();
      setTime(t);
    };
    const interval = setInterval(setTimeTillMidnight, 1000);
    return () => clearInterval(interval);
  }, []);

  if (time.length === 0) return null;
  const sum = Object.values(stats.guesses).reduce((sum, num) => sum + num, 0);
  return (
    <Backdrop onClick={close}>
      <Container onClick={(e) => e.stopPropagation()}>
        <div style={{ height: "16px", display: "flex", justifyContent: "right", width: "100%" }}>
          <div style={{ cursor: "pointer" }} onClick={close}>
            <CloseIcon />
          </div>
        </div>
        <SectionLabel style={{ height: "30px", fontWeight: "bold" }}>Statistics</SectionLabel>
        <Flex style={{ height: "80px" }}>
          {Object.entries(stats.stats).map(([key, val]) => (
            <StatsContainer key={key}>
              <Stat>{val}</Stat>
              <StatsLabel>{key}</StatsLabel>
            </StatsContainer>
          ))}
        </Flex>
        <SectionLabel>Guess Distribution</SectionLabel>
        <div style={{ width: "80%" }}>
          {Object.values(stats.guesses).map((guess, idx) => {
            return (
              <div key={idx} style={{ width: "100%", display: "flex", alignItems: "center" }}>
                <div>{idx + 1}</div>
                <DistributionContainer guess={(guess / sum) * 100}>{guess}</DistributionContainer>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", paddingTop: "10px", width: "100%", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SectionLabel>Next Trumple</SectionLabel>
            {time}
          </div>
          <div style={{ border: "1px solid black", margin: "0 10px" }} />
          <Button
            onClick={() => {
              close();
              reset();
            }}
          >
            Reset Game
          </Button>
        </div>
      </Container>
    </Backdrop>
  );
};

export default Modal;
