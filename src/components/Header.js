import styled from "styled-components";

const Container = styled.div`
  height: 50px;
  border-bottom: 1px solid #d3d6da;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Clear Sans", "Helvetica Neue", "Arial", "sans-serif";
  font-size: 2rem;
`;

const Header = ({ onClick }) => {
  return (
    <Container>
      <div></div>
      <div onClick={onClick}>TRUMPLE</div>
      <div></div>
    </Container>
  );
};

export default Header;
