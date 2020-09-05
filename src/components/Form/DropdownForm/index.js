import React from 'react';
import PropTypes from 'prop-types';

import * as El from './dropdownFormStyled';
import Title from '../../Title';
import Dropdown from '../../Dropdown';

function DropdownForm(props) {
  return (
    <El.DropdownFormWrap>
      <Title margin="5pt 0" disabled={props.disabled}>{props.data.title}</Title>
      <Dropdown
        data={props.data}
        onSelect={props.onSelect}
        onDisabledClick={props.onDisabledClick}
        disabled={props.disabled} />
    </El.DropdownFormWrap>
  );
}

DropdownForm.propTypes = {
  data: PropTypes.object,
  onSelect: PropTypes.func,
  onDisabledClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DropdownForm;
