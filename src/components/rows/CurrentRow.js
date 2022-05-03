import { wordLength } from "../../config";
import { RowContainer } from "./FilledRow";
import Tile from "./Tile";

const CurrentRow = ({ rowValue, hasError }) => {
  const filledCells = [...rowValue];
  const emptyCells = Array.from(Array(wordLength - rowValue.length));
  const row = [...filledCells, ...emptyCells];
  return (
    <RowContainer shakeErr={hasError} length={wordLength}>
      {row.map((tile, idx) => (
        <Tile key={idx} letter={tile} isCurrentRow={true} />
      ))}
    </RowContainer>
  );
};

export default CurrentRow;
