import styled from 'styled-components';
import Board from './Board';
import Keyboard from './Keyboard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: calc(100% - 50px);
`;

const Game = () => (
  <Container>
    <Board />
    <Keyboard />
  </Container>
);

export default Game;
