import { RowContainer } from "./Row";
import Tile from "./Tile";

const EmptyRow = () => {
  return (
    <RowContainer>
      {Array.from(Array(5)).map((_, i) => (
        <Tile key={i} />
      ))}
    </RowContainer>
  );
};

export default EmptyRow;
