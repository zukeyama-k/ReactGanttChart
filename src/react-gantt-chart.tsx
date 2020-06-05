import React, { useState, createContext } from 'react';
import Styled from 'styled-components';
import { isSunday, isToday, isSaturday } from 'date-fns';
import HeadRows from './component/HeadRows';
import Rows from './component/Rows';
import Days from './component/Days';
import Paging from './component/Paging';
import en from  'date-fns/locale/en-US';

import { 
  SHOWMONTH
 } from './config';
import { getIntervalDate } from './util';
import { HeadRowsDataType, RootProps, DefaultOptionsType, Context } from './type/type';

export const Options = createContext({} as Context);

const GanttChartContainer = Styled.div`
  display: flex;
  width: 100%;
  border: solid 1px #dedede;
  box-sizing: border-box;
`;

const GanttChartHeader = Styled.div`
  width: 280px;
  border-right: solid 1px #c3c3c3; 
  box-sizing: border-box;
`;

const GanttChartBody = Styled.div`
  overflow-x: scroll;
  width: calc(100% - 280px);
  box-sizing: border-box;
`;

const defaultOptions: DefaultOptionsType = {
  showMonth: SHOWMONTH,
  locale: en,
  headTitle: '',
  headFormat: 'yyyy/MM',
  currentFormat: 'yyyy/MM/dd',
  getPagingPrevLetter: (month: number) => 'prev',
  getPagingNextLetter: (month: number) => 'next',
  getDayColor: (date: Date) :string => 'none',
  getChartColor: (i: number) :string => 'rgba(0, 0,0 , 0.7)'
};

interface Coordinate {
  coordinate: {
    remark: string;
    point: { x: number, y: number };
  }
}

const Tooltips:React.FC<Coordinate> = ({ coordinate, children }) => {
  const { remark, point } = coordinate;
  return (
    <div style={{
      position: 'absolute',
      padding: '3px 5px',
      fontSize: '12px',
      top: `${point.y - 20}px`,
      left: `${point.x}px`,
      height: 'auto',
      borderRadius: '3px',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
      boxShadow: "-3px 6px 19px -4px rgba(0, 0, 0, 0.54)" }}
    >
     { remark }
    </div>
  )
}

const ReactGanttChart: React.FC<RootProps> = ({
  data,
  option
}) => {
  const products: HeadRowsDataType[] = data;
  const extendsOptions:DefaultOptionsType = { ...defaultOptions, ...option }; 
  const [[start, end], setPage] = useState([1, extendsOptions.showMonth - 1]);
  const [coordinate, setTooltips] = useState({ remark: '', point: { x: 0, y: 0} });
  const context: Context = {
    options: extendsOptions,
    state: {
      usePage: { val: [start, end], set: setPage },
      useTooltips: { val: coordinate, set: setTooltips }
    }
  };
  const intervalDate: Date[] = getIntervalDate(start, end);
  const intervalManth: { [key: number]: Date } = intervalDate.reduce(
    (
      accumulator: { [key: number]: Date },
      currentValue: Date
    ): { [key: number]: Date } => {
      return {
        ...accumulator,
        [`${currentValue.getFullYear()}${
          currentValue.getMonth() + 1
        }`]: currentValue,
      };
    },
    {}
  );
 
  return (
    <>
      <Options.Provider value={context}>
        <Paging set={setPage} value={[start, end]} />
        <GanttChartContainer>
          <GanttChartHeader>
            <HeadRows rows={products} />
          </GanttChartHeader>
          <GanttChartBody>
            <Days days={intervalManth} data={intervalDate} />
            <Rows intervalDate={intervalDate} data={products} />
          </GanttChartBody>
          { 
          !!coordinate.remark && (<Tooltips coordinate={coordinate} />)
          }       
        </GanttChartContainer>

      </Options.Provider>
    </>
  );
};

export default ReactGanttChart;
