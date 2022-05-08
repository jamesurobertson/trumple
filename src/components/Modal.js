import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { status } from "../config";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
  width: 90%;
  max-width: 500px;
  height: 90%;
  max-height: 400px;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.color};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  padding: 16px;
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

const Modal = ({ reset, close, isOpen, stats }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = () => {
      const toDate = new Date();
      const tomorrow = new Date();

      tomorrow.setHours(24, 0, 0, 0);

      let diffMS = tomorrow.getTime() / 1000 - toDate.getTime() / 1000;
      let diffHr = Math.floor(diffMS / 3600);

      diffMS = diffMS - diffHr * 3600;
      let diffMi = Math.floor(diffMS / 60);
      diffMS = diffMS - diffMi * 60;
      let diffS = Math.floor(diffMS);
      let result = diffHr < 10 ? "0" + diffHr : diffHr;
      result += ":" + (diffMi < 10 ? "0" + diffMi : diffMi);
      result += ":" + (diffS < 10 ? "0" + diffS : diffS);
      setTime(result);
    };
    setInterval(interval, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen || time.length === 0) return null;
  const sum = Object.values(stats.guesses).reduce((sum, num) => sum + num, 0);
  return (
    <Container>
      <div style={{ height: "16px", display: "flex", justifyContent: "right", width: "100%" }}>
        <div style={{ cursor: "pointer" }} onClick={close}>
          x
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
            <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
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
          Rest Game
        </Button>
      </div>
    </Container>
  );
};

export default Modal;
