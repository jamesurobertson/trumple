import { useEffect } from 'react';
import styled from 'styled-components';
import { useGameState } from '../contexts/GameStateContext';

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 9.5%;
  left: 50%;
  transform: translate(-50%, 0);
  border: 1px solid #181a18;
  border-radius: 4px;
  padding: 10px;
  color: ${({ theme }) => theme.backgroundColor};
  font-weight: bold;
  background-color: ${({ theme }) => theme.color};
  z-index: 100;
`;

const Toast = () => {
  const {
    gameState: { toastMessage },
    clearToast,
  } = useGameState();

  useEffect(() => {
    if (toastMessage.length === 0) return;
    const timeout = setTimeout(clearToast, 1000);
    return () => clearTimeout(timeout);
  }, [toastMessage, clearToast]);

  if (!toastMessage) return null;
  return <Container>{toastMessage}</Container>;
};

export default Toast;
