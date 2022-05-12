import styled from "styled-components";

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

const Statistics = ({ stats }) => (
  <div style={{ display: "flex", height: "80px" }}>
    {Object.entries(stats).map(([key, val]) => (
      <StatsContainer key={key}>
        <Stat>{val}</Stat>
        <StatsLabel>{key}</StatsLabel>
      </StatsContainer>
    ))}
  </div>
);

export default Statistics;
