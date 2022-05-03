import styled from "styled-components";

const ImageOverlay = styled.div`
  background-image: url(/images/trump.png);
  position: absolute;
  inset: 0;
`;

const WinningImageOverlay = () => <ImageOverlay />;

export default WinningImageOverlay;
