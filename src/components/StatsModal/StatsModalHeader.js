import CloseIcon from "../icons/CloseIcon";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: right;
  height: 16px;
  width: 100%;
`;

const StatsModalHeader = ({ close }) => {
  return (
    <Container>
      <div style={{ cursor: "pointer" }} onClick={close}>
        <CloseIcon />
      </div>
    </Container>
  );
};

export default StatsModalHeader;