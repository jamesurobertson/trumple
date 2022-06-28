import { wordLength } from "../../config";
import { RowContainer } from "./FilledRow";
import Tile from "./Tile";

const CurrentRow = ({ currentGuess, hasError, inBoard = true }) => {
  const filledCells = [...currentGuess];
  const emptyCells = Array.from(Array(wordLength - currentGuess.length >= 0 ? wordLength - currentGuess.length : 0));
  const row = [...filledCells, ...emptyCells];
  return (
    <RowContainer shakeErr={hasError} length={wordLength}>
      {row.map((tile, idx) => (
        <Tile key={idx} letter={tile} isCurrentRow={true} inBoard={inBoard} />
      ))}
    </RowContainer>
  );
};

export default CurrentRow;
