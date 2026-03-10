import styled from '@emotion/styled';

export default styled.blockquote`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  margin: 0;
  padding: 2cqw;
  box-sizing: border-box;

  font-size: 5cqw;
  font-style: italic;
  font-weight: 300;
  line-height: 1.4;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};

  &::before {
    content: open-quote;
    align-self: flex-start;
  }

  &::after {
    content: close-quote;
    align-self: flex-end;
  }
`;
