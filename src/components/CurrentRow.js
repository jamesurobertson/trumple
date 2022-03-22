import { RowContainer } from "./Row";
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
          style={{ animationDelay: `${idx * 0.35}ms` }}
          letter={tile}
          isCurrentRow={true}
        ></Tile>
      ))}
    </RowContainer>
  );
};

export default CurrentRow;
