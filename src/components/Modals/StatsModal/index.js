import styled from "styled-components";
import { useStats } from "../../../contexts/StatsContext";
import { useGameState } from "../../../contexts/GameStateContext";
import Modal from "../Modal";
import GuessDistribution from "./GuessDistribution";
import Statistics from "./Statistics";
import StatsModalFooter from "./StatsModalFooter";
import { constructClipboardString } from "../../../utils";

export const SectionLabel = styled.div`
  font-weight: bold;
  text-transform: uppercase;
`;

const StatsModal = () => {
  const { statsState, closeAndResetStatsModal, toggleStatsModal, statsModalIsOpen } = useStats();
  const { stats, guesses } = statsState;
  const { gameState, gameDispatch } = useGameState();

  const copyGameResultsToClipboard = () => {
    const shareableString = constructClipboardString(gameState);
    navigator.clipboard.writeText(shareableString);
    gameDispatch({ type: "toastMessage", payload: "Copied results to Clipboard" });
  };

  if (!statsModalIsOpen) return null;
  return (
    <Modal onClose={toggleStatsModal} title="Statistics">
      <Statistics stats={stats} />
      <GuessDistribution guesses={guesses} />
      <StatsModalFooter
        closeAndReset={closeAndResetStatsModal}
        copyGameResultsToClipboard={copyGameResultsToClipboard}
      />
    </Modal>
  );
};

export default StatsModal;
