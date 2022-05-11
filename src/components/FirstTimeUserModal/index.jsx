import {
  FirstTimeUserModalWrapper,
  Text,
  CorrectTextBlock,
  IncorrectSpotTextBlock,
  IncorrectTextBlock,
  BoldText,
  TextBlock,
  LineBreak,
  FlexRow,
  StyledCloseIcon,
  Overlay,
  ExampleWrapper
} from './FirstTimeUserModal.styles'

export default function FirstTimeUserModal({ theme, resetFirstTimeUser }) {
  const handleClose = () => resetFirstTimeUser(false)
  return (
    <>
      <FirstTimeUserModalWrapper theme={theme}>
        <StyledCloseIcon theme={theme} onClick={handleClose}/>
        <FlexRow>
          <Text>{'Guess the'}</Text>&nbsp;
          <BoldText>{'TRUMPLE'}</BoldText>&nbsp;
          <Text>{'in six tries.'}</Text>
        </FlexRow>
        <Text>{'Each guess must be a valid five-letter word. Hit the enter button to submit.'}</Text>
        <Text>{'After each guess, the color of the tiles will change to show how close your guess was to the word.'}</Text>
        <LineBreak theme={theme} />
        
        <Text>{'Examples'}</Text>
        <ExampleWrapper>
          <FlexRow>
            <CorrectTextBlock theme={theme}>{'W'}</CorrectTextBlock>
            <TextBlock theme={theme}>{'E'}</TextBlock>
            <TextBlock theme={theme}>{'A'}</TextBlock>
            <TextBlock theme={theme}>{'R'}</TextBlock>
            <TextBlock theme={theme}>{'Y'}</TextBlock>
          </FlexRow>
          <Text>{'The letter W is in the word and in the correct spot.'}</Text>
        </ExampleWrapper>

        <ExampleWrapper>
          <FlexRow>
            <TextBlock theme={theme}>{'P'}</TextBlock>
            <IncorrectSpotTextBlock theme={theme}>{'I'}</IncorrectSpotTextBlock>
            <TextBlock theme={theme}>{'L'}</TextBlock>
            <TextBlock theme={theme}>{'L'}</TextBlock>
            <TextBlock theme={theme}>{'S'}</TextBlock>
          </FlexRow>
          <Text>{'The letter I is in the word but in the wrong spot.'}</Text>
        </ExampleWrapper>

        <ExampleWrapper>
          <FlexRow>
            <TextBlock theme={theme}>{'V'}</TextBlock>
            <TextBlock theme={theme}>{'A'}</TextBlock>
            <TextBlock theme={theme}>{'G'}</TextBlock>
            <IncorrectTextBlock theme={theme}>{'U'}</IncorrectTextBlock>
            <TextBlock theme={theme}>{'E'}</TextBlock>
          </FlexRow>
          <Text>{'The letter U is not in the word in any spot.'}</Text>
        </ExampleWrapper>

        <LineBreak theme={theme} />

        <BoldText>{'A new TRUMPLE will be available each day!'}</BoldText>
      </FirstTimeUserModalWrapper>
      <Overlay theme={theme} />
    </>
  )
}