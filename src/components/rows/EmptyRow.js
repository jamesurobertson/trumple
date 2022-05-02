import { RowContainer } from "./FilledRow";
import Tile from "./Tile";

const EmptyRow = () => (
  <RowContainer>
    {Array.from(Array(5)).map((_, i) => (
      <Tile key={i} />
    ))}
  </RowContainer>
);

export default EmptyRow;
