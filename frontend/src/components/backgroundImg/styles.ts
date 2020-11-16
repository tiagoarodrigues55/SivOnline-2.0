import styled from 'styled-components';

import BackgroundImg from '../../assets/background.jpg';
import BackgroundImg2 from '../../assets/background2.jpg';
const backgroundImg = [BackgroundImg, BackgroundImg2]
export const Background = styled.div`
  flex: 1;
  background: url(${props => backgroundImg[props.theme.backgroundImg]}) no-repeat center;
  background-size: cover;
  position: absolute;
  min-height: 900px;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: unset;
  z-index: -1;
`;
