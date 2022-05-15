import CloseIcon from '../icons/CloseIcon';
import styled from 'styled-components';
import IconContainer from '../icons/Icon';

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height: 1.5rem;
  width: 100%;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const RightAbsolute = styled.div`
  position: absolute;
  right: 0;
`;

const ModalHeader = ({ onClose, title }) => (
  <Container>
    <Title>{title}</Title>
    <RightAbsolute>
      <IconContainer title="Close" onClick={onClose} Icon={CloseIcon} />
    </RightAbsolute>
  </Container>
);

export default ModalHeader;
