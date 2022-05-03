import { maxWordLength } from "../../config";
import { RowContainer } from "./FilledRow";
import Tile from "./Tile";

const EmptyRow = () => (
  <RowContainer wordLength={maxWordLength}>
    {Array.from(Array(maxWordLength)).map((_, i) => (
      <Tile key={i} />
    ))}
  </RowContainer>
);

export default EmptyRow;
