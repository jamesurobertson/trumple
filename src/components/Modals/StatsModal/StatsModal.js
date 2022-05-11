import styled from "styled-components";
import GuessDistribution from "./GuessDistribution";
import Statistics from "./Statistics";
import StatsModalFooter from "./StatsModalFooter";

export const SectionLabel = styled.div`
  font-weight: bold;
  text-transform: uppercase;
`;

const StatsModal = ({ closeAndReset, statistics }) => (
  <>
    <Statistics stats={statistics.stats} />
    <GuessDistribution guesses={statistics.guesses} />
    <StatsModalFooter closeAndReset={closeAndReset} />
  </>
);

export default StatsModal;
