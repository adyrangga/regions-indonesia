import React from 'react';

import * as El from './buttonStyled';

export default function Button(props) {
    return <El.ButtonEl {...props} type="button">{props.children}</El.ButtonEl>
}

