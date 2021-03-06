import styled from 'styled-components';
import Modal from '../Modal';
import FilledRow from '../../rows/FilledRow';
import { gridGap, tileSize, title, wordLength } from '../../../config';
import { BoardGrid } from '../../Board';
import { useStats } from '../../../contexts/StatsContext';

export const Text = styled.div`
  margin: 10px 0;
  font-size: 14px;
`;

export const BoldText = styled(Text)`
  font-weight: bold;
`;

export const BoldSpan = styled.span`
  font-weight: bold;
`;

export const LineBreak = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  width: 100%;
`;

const HowToModal = () => {
  const {
    statsState: { isFirstTimeUser },
  } = useStats();

  const { toggleHelpModal } = useStats();

  const gridWidth = (wordLength - 1) * gridGap + wordLength * tileSize;

  if (!isFirstTimeUser) return null;

  return (
    <Modal onClose={toggleHelpModal} title="How To Play">
      <div>
        <Text>
          Guess the <BoldSpan>{title}</BoldSpan> in six tries.
        </Text>
        <Text> Each guess must be a valid five-letter word. Hit the enter button to submit. </Text>
        <Text>After each guess, the color of the tiles will change to show how close your guess was to the word.</Text>
        <LineBreak />
        <Text>Example</Text>
        <BoardGrid maxGuesses={1} gridHeight={tileSize} gridWidth={gridWidth}>
          <FilledRow guess={'WORDS'} isRevealing={true} answer={'WXXRS'} />
        </BoardGrid>
        <Text>
          The letters <BoldSpan>W</BoldSpan> and <BoldSpan>S</BoldSpan> are in the word and in the correct spot.
        </Text>
        <Text>
          The letter <BoldSpan>R</BoldSpan> is in the word but in the wrong spot.
        </Text>
        <Text>
          The letters <BoldSpan>O</BoldSpan> and <BoldSpan>D</BoldSpan> are not in the word in any spot.
        </Text>
        <LineBreak />
        <BoldText>A new {title} will be available each day!</BoldText>
      </div>
    </Modal>
  );
};

export default HowToModal;
