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
  justify-content: end;
  align-items: center;
  color: white;
  padding-right: 5px;
  height: 20px;
  font-size: 14px;
  width: ${({ percentile }) => `${percentile + 8}%`};
  background-color: gray;
  margin: 5px;
`;

const GuessDistribution = ({ guesses }) => {
  const values = Object.values(guesses);
  const totalGuesses = values.reduce((sum, num) => sum + num, 0);

  return (
    <>
      <SectionLabel>Guess Distribution</SectionLabel>
      <Container>
        {values.map((guess, idx) => (
          <DistributionContainer key={idx}>
            <div>{idx + 1}</div>
            <DistributionBar percentile={(guess / totalGuesses || 0) * 100}>{guess}</DistributionBar>
          </DistributionContainer>
        ))}
      </Container>
    </>
  );
};

export default GuessDistribution;
