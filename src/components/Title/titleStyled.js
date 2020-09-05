import styled from 'styled-components';

const TitleText = styled.p`
  padding: ${props => props.padding || 0};
  margin: ${props => props.margin || 0};
  color: ${props => props.color || (props.disabled && '#cecece') || 'black'};
  font-size: ${props => props.fontSize || '12pt'};
  text-align: ${props => props.textAlign || 'left'};
`;

export { TitleText };
