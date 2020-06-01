import Styled from 'styled-components';
import { CELLWIDTH } from '../config';
export const Head = Styled.div `
  width: 100%;
  height: 40px;
  color: #fff;
  background: #312f2f;
  padding: 8px 0;
  box-sizing: border-box;
`;
export const FlexRow = Styled.div `
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background: #fff;
  color: #333;
  border-top: ${(props) => (props.index === 0 ? 'none' : 'solid 1px #dedede')};
  box-sizing: border-box;
`;
export const Day = Styled.div `
  width: ${CELLWIDTH}px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: solid 1px #dedede; 
  border-bottom: solid 1px #dedede;
  text-align: center;
  box-sizing: border-box;
`;
export const Schedule = Styled.div `
  position: absolute;
  top: 5px;
  left: ${(props) => props.left};
  width: ${(props) => props.width};
  height: 30px;
  border-radius: 5px;
  background: ${(props) => props.backgroundColor};
  opacity: 0.7;
  box-sizing: border-box;
`;
