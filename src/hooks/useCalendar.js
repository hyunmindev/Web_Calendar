import { useEffect, useState } from 'react';

const ROW = 6;
const COL = 7;

const todayDate = new Date();

const initialTable = [...Array(ROW)]
  .map(() => [...Array(COL)].fill({}))
  .map((row, rowIndex) =>
    row.map((cell, cellIndex) => ({ id: rowIndex * COL + cellIndex, date: todayDate })),
  );

const useCalendar = (date) => {
  const [calendar, setCalendar] = useState(initialTable);

  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDate = new Date(year, month, 1);
    const deltaDay = firstDate.getDay() || firstDate.getDay() + 7;

    setCalendar((prevCalendar) =>
      prevCalendar.map((row) =>
        row.map((cell) => {
          const cellDate = new Date(year, month, cell.id - deltaDay + 2);
          return {
            ...cell,
            date: cellDate,
            isToday: todayDate.getTime() === cellDate.getTime(),
            isInMonth: month === cellDate.getMonth(),
            epochTime: Math.floor(cellDate / 8.64e7),
          };
        }),
      ),
    );
  }, [date]);

  return calendar;
};

export default useCalendar;
