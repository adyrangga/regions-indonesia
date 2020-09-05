import styled from 'styled-components';
import spinner from '../../images/spinner.gif';

const SpinnerOverlay = styled.div`
  position: absolute;
  display: ${props => props.displaySpinner ? 'flex': 'none'};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 101;
  align-items: center;
  justify-content: center;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  background-color: rgba(255, 255, 255, 0.5);
`;

const SpinnerLoading = styled.div`
  display: block;
  background-image: url(${spinner});
  background-size: 100% 100%;
  width: 25vw;
  height: 25vw;
`;

export { SpinnerOverlay, SpinnerLoading };
