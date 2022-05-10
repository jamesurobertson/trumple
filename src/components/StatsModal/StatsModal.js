import styled from "styled-components";
import GuessDistribution from "./GuessDistribution";
import StatsModalHeader from "./StatsModalHeader";
import Statistics from "./Statistics";
import StatsModalFooter from "./StatsModalFooter";

export const SectionLabel = styled.div`
  font-weight: bold;
  text-transform: uppercase;
`;

const StatsModal = ({ reset, close, statistics }) => (
  <>
    <StatsModalHeader close={close} />
    <Statistics stats={statistics.stats} />
    <GuessDistribution guesses={statistics.guesses} />
    <StatsModalFooter close={close} reset={reset} />
  </>
);

export default StatsModal;
