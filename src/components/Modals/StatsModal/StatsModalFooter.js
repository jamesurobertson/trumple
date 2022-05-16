import { colors } from '../../../config';
import styled from 'styled-components';
import { SectionLabel } from '.';
import CountdownTimer from './CountdownTimer';

const Container = styled.div`
  display: flex;
  padding-top: 10px;
  width: 100%;
  justify-content: center;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px;
  color: white;
  font-weight: bold;
  background-color: ${colors.correct};
  z-index: 100;
  text-transform: uppercase;
`;

const Divider = styled.div`
  border: 1px solid ${({ theme }) => theme.color};
  margin: 0 10px;
`;

const StatsModalFooter = ({ closeAndReset }) => (
  <Container>
    <FlexColumn>
      <SectionLabel>Next Trumple</SectionLabel>
      <CountdownTimer />
    </FlexColumn>
    <Divider />

    <Button onClick={closeAndReset}>Reset Game</Button>
  </Container>
);

export default StatsModalFooter;
