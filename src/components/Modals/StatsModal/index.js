import styled from "styled-components";
import { useStats } from "../../../contexts/StatsContext";
import Modal from "../Modal";
import GuessDistribution from "./GuessDistribution";
import Statistics from "./Statistics";
import StatsModalFooter from "./StatsModalFooter";

export const SectionLabel = styled.div`
  font-weight: bold;
  text-transform: uppercase;
`;

const StatsModal = () => {
  const { statsState, closeAndResetStatsModal, toggleStatsModal, statsModalIsOpen } = useStats();
  const { stats, guesses } = statsState;

  if (!statsModalIsOpen) return null;
  return (
    <Modal onClose={toggleStatsModal} title="Statistics">
      <Statistics stats={stats} />
      <GuessDistribution guesses={guesses} />
      <StatsModalFooter closeAndReset={closeAndResetStatsModal} />
    </Modal>
  );
};

export default StatsModal;
