import { useEffect, useState } from 'react';

const ROW = 6;
const COL = 7;

const initialTable = [...Array(ROW)]
  .map(() => [...Array(COL)].fill({}))
  .map((row, rowIndex) =>
    row.map((cell, cellIndex) => ({ ...cell, id: rowIndex * COL + cellIndex })),
  );

const todayDate = new Date();

const useCalendar = (date) => {
  const [calendar, setCalendar] = useState(initialTable);

  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDate = new Date(year, month, 1);

    setCalendar((prevCalendar) =>
      prevCalendar.map((row) =>
        row.map((cell) => {
          const cellDate = new Date(year, month, cell.id - firstDate.getDay() + 2);
          return {
            ...cell,
            date: cellDate,
            isToday: todayDate.getTime() === cellDate.getTime(),
            isInMonth: month === cellDate.getMonth(),
          };
        }),
      ),
    );
  }, [date]);

  return calendar;
};

export default useCalendar;
