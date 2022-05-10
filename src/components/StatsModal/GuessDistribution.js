import styled from "styled-components";
import { SectionLabel } from "./StatsModal";

const Container = styled.div`
  width: 80%;
`;

const DistributionContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const DistributionBar = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  color: white;
  padding-right: 5px;
  height: 20px;
  font-size: 14px;
  width: ${({ guess }) => `${(guess || 0) + 8}%`};
  background-color: gray;
  margin: 5px;
`;

const GuessDistribution = ({ guesses }) => {
  const sum = Object.values(guesses).reduce((sum, num) => sum + num, 0);

  return (
    <>
      <SectionLabel>Guess Distribution</SectionLabel>
      <Container>
        {Object.values(guesses).map((guess, idx) => (
          <DistributionContainer key={idx}>
            <div>{idx + 1}</div>
            <DistributionBar guess={(guess / sum) * 100}>{guess}</DistributionBar>
          </DistributionContainer>
        ))}
      </Container>
    </>
  );
};

export default GuessDistribution;
