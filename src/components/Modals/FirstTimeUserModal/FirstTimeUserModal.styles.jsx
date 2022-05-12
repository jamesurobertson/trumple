import styled from 'styled-components';

export const Text = styled.p`
  font-size: 16px;  
`;

export const BoldText = styled(Text)`
  font-weight: bold; 
`;

export const TextBlock = styled.div`
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  height: 3rem;
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({theme}) => (theme === "dark" ? "white" : "black")};
  margin-right: .5rem;
`;

export const CorrectTextBlock = styled(TextBlock)`
  background: #538d4e;
`;

export const IncorrectSpotTextBlock = styled(TextBlock)`
  background: #b59f3a;
`;

export const IncorrectTextBlock = styled(TextBlock)`
  background: #3a3a3d;
  color: #FFFFFF;
`;

export const LineBreak = styled.div`
  border-bottom: 1px solid ${({theme}) => (theme === "dark" ? "white" : "black")};
  width: 100%;
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: baseline;
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 100%;
  inset: 0;
  background: rgba(${({theme}) => (theme === "dark" ? "0,0,0,.7" : "0,0,0,.8")});
`;

export const ExampleWrapper = styled.div``;