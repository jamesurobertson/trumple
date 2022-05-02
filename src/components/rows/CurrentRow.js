import { RowContainer } from "./FilledRow";
import Tile from "./Tile";

const CurrentRow = ({ word, hasError }) => {
  const filledCells = [...word];
  const emptyCells = Array.from(Array(5 - word.length));
  const row = [...filledCells, ...emptyCells];
  return (
    <RowContainer shakeErr={hasError}>
      {row.map((tile, idx) => (
        <Tile
          key={idx}
          hasLetter={tile !== ""}
          letter={tile}
          isCurrentRow={true}
        ></Tile>
      ))}
    </RowContainer>
  );
};

export default CurrentRow;
