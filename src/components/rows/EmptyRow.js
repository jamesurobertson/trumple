import { wordLength } from "../../config";
import { RowContainer } from "./FilledRow";
import Tile from "./Tile";

const EmptyRow = () => (
  <RowContainer length={wordLength}>
    {Array.from(Array(wordLength)).map((_, idx) => (
      <Tile key={idx} />
    ))}
  </RowContainer>
);

export default EmptyRow;
