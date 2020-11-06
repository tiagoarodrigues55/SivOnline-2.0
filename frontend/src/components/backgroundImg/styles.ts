import styled from 'styled-components';

import BackgroundImg from '../../assets/background.jpg';

export const Background = styled.div`
  flex: 1;
  background: url(${BackgroundImg}) no-repeat center;
  background-size: cover;
  position: absolute;
  min-height: 900px;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: unset;
  z-index: -1;
`;
