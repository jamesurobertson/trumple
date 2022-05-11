import styled from 'styled-components';

export const FirstTimeUserModalWrapper = styled.section`
  position: fixed;
  z-index: 10;
  left: 50%;
  top: 4rem;
  transform: translate(-50%, 0);
  height: fit-content;
  width: 500px;
  background: ${({theme}) => (theme === "dark" ? "black" : "white" )};
  padding: 2rem;
  border: 1px solid ${({theme}) => (theme === "dark" ? "white" : "black")};
`;

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

const CloseIcon = ({className, ...rest}) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...rest} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const StyledCloseIcon = styled(CloseIcon)`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  position: absolute;
  right: 2rem;
  top: 2rem;
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