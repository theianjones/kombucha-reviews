import styled from 'styled-components';
import MEDIA from 'helpers/mediaTemplates';

export const Title = styled.span`
  display: block;
  font-size: 2rem;
  font-weight: 500;
  margin: 2rem 2rem 1rem;
`;

export const Copy = styled.p`
  color: #02056d;
  margin: 2rem 0rem;

  ${MEDIA.TABLET`
    margin-bottom: 4rem;
  `};
`;
