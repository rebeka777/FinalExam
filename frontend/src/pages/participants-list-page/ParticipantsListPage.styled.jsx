import { styled } from 'styled-components';

export const StyledCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  text-align: center;
  margin-top: 10px;
  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
  }
`;
