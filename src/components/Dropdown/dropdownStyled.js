import styled from 'styled-components';

const DropdownWrap = styled.div`
  position: relative;
  display: block;
`;

const DropdownBox = styled.select`
  width: 100%;
  padding: 5pt;
`;

const DropdownList = styled.option`
  width: 100%;
  padding: 5pt;
`;

const DisabledLayer = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export { DropdownWrap, DropdownBox, DropdownList, DisabledLayer };
