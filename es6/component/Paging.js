import React, { useContext } from 'react';
import { addMonths, subMonths } from 'date-fns';
import Styled from 'styled-components';
import { Options } from '../react-gantt-chart';
const Button = Styled.button `
  margin-right: 10px;
  font-size: 13px;
  border-radius: 5px;
  color: #67ad95;
  font-weight: bold;
`;
const Paging = ({ set, value, children }) => {
    const context = useContext(Options);
    const [start, end] = value;
    const prev = () => {
        set([
            subMonths(start, context.options.showMonth),
            subMonths(end, context.options.showMonth),
        ]);
    };
    const next = () => {
        set([
            addMonths(start, context.options.showMonth),
            addMonths(end, context.options.showMonth),
        ]);
    };
    return (React.createElement("div", { style: { display: 'flex', alignItems: 'center', marginBottom: '10px' } },
        React.createElement(Button, { onClick: prev }, context.options.getPagingPrevLetter(context.options.showMonth)),
        children,
        React.createElement(Button, { onClick: next }, context.options.getPagingNextLetter(context.options.showMonth))));
};
export default Paging;
