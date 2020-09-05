import React from 'react';

import * as El from './spinnerStyled';

export default function Spinner(props) {
    return (
        <El.SpinnerOverlay displaySpinner={props.displaySpinner}>
            <El.SpinnerLoading />
        </El.SpinnerOverlay>
    );
}
