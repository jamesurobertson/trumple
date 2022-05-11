import { useEffect } from "react";
import styled from "styled-components";

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

const Toast = ({ message, clearToast }) => {
  useEffect(() => {
    if (message.length === 0) return;
    const timeout = setTimeout(clearToast, 1000);
    return () => clearTimeout(timeout);
  }, [message, clearToast]);

  if (!message) return null;
  return <Container>{message}</Container>;
};

export default Toast;
