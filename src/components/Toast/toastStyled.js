import styled from 'styled-components';

const ToastOverlay = styled.div`
  position: absolute;
  display: ${props => props.displayToast ? 'block': 'none'};
  top: 2vh;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 100;
`;

const ToastBody = styled.div`
  position: relative;
  background-color: red;
  border-radius: 5em;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: max-content;
  box-shadow: 0 0 10px rgba(0,0,0,0.6);
  -moz-box-shadow: 0 0 10px rgba(0,0,0,0.6);
  -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.6);
  -o-box-shadow: 0 0 10px rgba(0,0,0,0.6);
  opacity: ${props => props.isShow ? 1 : 0};;
  transition: opacity ease-out 2s;
`;

export { ToastOverlay, ToastBody };
