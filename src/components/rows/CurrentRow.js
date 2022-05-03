import { maxWordLength } from "../../config";
import { RowContainer } from "./FilledRow";
import Tile from "./Tile";

const CurrentRow = ({ word, hasError }) => {
  const filledCells = [...word];
  const emptyCells = Array.from(Array(maxWordLength - word.length));
  const row = [...filledCells, ...emptyCells];
  return (
    <RowContainer shakeErr={hasError} wordLength={maxWordLength}>
      {row.map((tile, idx) => (
        <Tile key={idx} hasLetter={tile !== ""} letter={tile} isCurrentRow={true}></Tile>
      ))}
    </RowContainer>
  );
};

export default CurrentRow;
