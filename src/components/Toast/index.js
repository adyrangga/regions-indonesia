/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as El from './toastStyled';
import Title from '../Title';

function Toast(props) {
  const [state, setState] = useState({
    toastWrap: false,
    toastDisplay: false,
  });

  useEffect(() => {
    if (props.isShow) {
      setState(prevState => ({
          ...prevState,
          toastWrap: true,
      }))
    }
  }, [props])

  useEffect(() => {
    if (state.toastWrap) {
      const timerToast = setTimeout(() => {
        setState(prevState => ({
            ...prevState,
            toastDisplay: true,
            }));
      }, 100);
      return () => clearTimeout(timerToast);
    }
  }, [state.toastWrap])

  useEffect(() => {
    if (state.toastDisplay) {
      const timerToast = setTimeout(() => {
          setState(prevState => ({
              ...prevState,
              toastDisplay: false,
              }));
      }, 3000);
      return () => clearTimeout(timerToast);
    }
  }, [state.toastDisplay])

  useEffect(() => {
    if (state.toastWrap && !state.toastDisplay) {
      const timerToast = setTimeout(() => {
        setState(prevState => ({
            ...prevState,
            toastWrap: false,
            toastDisplay: false,
            }));
      }, 2100);
      return () => clearTimeout(timerToast);
    }
  }, [state.toastDisplay])

  return (
    <El.ToastOverlay displayToast={state.toastWrap}>
      <El.ToastBody isShow={state.toastDisplay}>
      <Title padding="5pt 10pt" color="white">{props.title}</Title>
      </El.ToastBody>
    </El.ToastOverlay>
  );
}

Toast.propTypes = {
  isShow: PropTypes.bool,
  title: PropTypes.string,
}

export default Toast;
