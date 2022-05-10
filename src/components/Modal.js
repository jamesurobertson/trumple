import styled from "styled-components";

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: ${({ theme }) => `${theme.modalBackdropColor}`};
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
  width: 90%;
  max-width: 500px;
  height: 90%;
  max-height: 400px;
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  color: ${({ theme }) => theme.color};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
`;

export const SectionLabel = styled.div`
  font-weight: bold;
  text-transform: uppercase;
`;

const Modal = ({ close, children }) => {
  return (
    <Backdrop onClick={close}>
      <Container onClick={(e) => e.stopPropagation()}>{children}</Container>
    </Backdrop>
  );
};

export default Modal;
