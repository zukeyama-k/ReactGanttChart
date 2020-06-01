import { eachDayOfInterval, startOfMonth, addMonths, isToday, isSunday, isSaturday, } from 'date-fns';
export const getIntervalDate = (start, end) => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + start);
    const endDate = addMonths(currentDate, end);
    currentDate.setDate(0);
    endDate.setDate(0);
    const intervalDate = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endDate,
    });
    return intervalDate;
};
export const getChartColor = (i, CHART_COLOR) => {
    const num = i % Object.keys(CHART_COLOR).length;
    switch (num) {
        case 0:
            return CHART_COLOR.PINK;
            break;
        case 1:
            return CHART_COLOR.BLUE;
            break;
        case 2:
            return CHART_COLOR.GREEN;
            break;
        default:
            return CHART_COLOR.PINK;
    }
};
export const getDayColor = (date, isHoliday, DAY_COLOR) => {
    if (isToday(date))
        return DAY_COLOR.TODAY;
    if (isSunday(date) || isHoliday(date))
        return DAY_COLOR.HOLIDAY;
    if (isSaturday(date))
        return DAY_COLOR.SATURDAY;
    return 'none';
};
