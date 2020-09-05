import React from 'react';
import PropTypes from 'prop-types';

import * as El from './dropdownStyled';

function Dropdown(props) {
  return (
    <El.DropdownWrap>
      {props.disabled && (
        <El.DisabledLayer
          onClick={() => props.onDisabledClick(props.data.title)} />
      )}
      <El.DropdownBox onChange={v => props.onSelect(v)} disabled={props.disabled}>
        <El.DropdownList value="0">Pilih..</El.DropdownList>
        {props.data && props.data.list.map((v, i) => (
          <El.DropdownList key={i.toString()} value={v.id}>{v.nama}</El.DropdownList>
        ))}
      </El.DropdownBox>
    </El.DropdownWrap>
  );
}

Dropdown.propTypes = {
  data: PropTypes.object,
  onSelect: PropTypes.func,
  onDisabledClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Dropdown;
