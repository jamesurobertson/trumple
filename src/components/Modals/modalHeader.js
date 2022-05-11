import CloseIcon from "../icons/CloseIcon";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height: 24px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`;

const IconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  right: 0;
`;

const ModalHeader = ({ onClose, title }) => (
  <Container>
    <Title>{title}</Title>
    <IconContainer onClick={onClose} aria-label="Close Modal">
      <CloseIcon />
    </IconContainer>
  </Container>
);

export default ModalHeader;
