import styled from '@emotion/styled';

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto 0;
  box-sizing: border-box;

  font-size: 20cqw;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;
