import styled from 'styled-components';

const ImageOverlay = styled.div`
  background-image: url(/images/trump.png);
  background-size: cover;
  position: absolute;
  inset: 0;
  z-index: 10;
`;

const WinningImageOverlay = () => <ImageOverlay />;

export default WinningImageOverlay;
