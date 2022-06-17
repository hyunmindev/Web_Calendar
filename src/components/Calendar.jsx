import { Fragment, useState } from 'react';
import styled from 'styled-components';

import useCalendar from '../hooks/useCalendar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  width: 216px;
  text-align: center;
`;

const Row = styled.div`
  display: flex;

  div:nth-child(6) {
    background-color: rgba(0, 0, 255, 0.05);
  }

  div:nth-child(7) {
    background-color: rgba(255, 0, 0, 0.05);
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 64px;
  border: 1px solid #cccccc;
  position: relative;

  &&& {
    background-color: ${({ blur }) => (blur ? 'rgba(0, 0, 0, 0.1)' : '')};
    color: ${({ blur }) => (blur ? 'rgba(0, 0, 0, 0.2)' : '')};
  }

  p {
    font-size: 12px;
    margin: 0;

    &:nth-child(1) {
      position: absolute;
      left: 4px;
      top: 4px;
    }

    &:nth-child(2) {
      position: absolute;
      right: 4px;
      bottom: 4px;
    }
  }
`;

const todayDate = new Date();
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const cycleNames = ['주', '주', '야', '비', '비'];

function Calendar() {
  const [relativeDate, setRelativeDate] = useState(todayDate);
  const calendar = useCalendar(relativeDate);

  const decreaseMonth = () =>
    setRelativeDate((date) => new Date(date.setMonth(date.getMonth() - 1)));
  const increaseMonth = () =>
    setRelativeDate((date) => new Date(date.setMonth(date.getMonth() + 1)));

  return (
    <Wrapper>
      <Header>
        <button
          type='button'
          onClick={decreaseMonth}
        >
          ⬅️
        </button>
        <Title>
          {relativeDate.getFullYear()}년 {relativeDate.getMonth() + 1}월
        </Title>
        <button
          type='button'
          onClick={increaseMonth}
        >
          ➡️
        </button>
      </Header>
      <Row>
        {dayNames.map((dayName) => (
          <Cell key={dayName}>{dayName}</Cell>
        ))}
      </Row>
      {calendar.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map(({ id, date, isInMonth, epochTime }, cellIndex) => (
            <Fragment key={id}>
              <Cell blur={!isInMonth}>
                <p>{date.getDate() ?? ''}</p>
                <p>{cycleNames[(epochTime + 1) % 5]}</p>
                {(epochTime + 1) % 5 === 3 && (cellIndex === 4 || cellIndex === 5) && <p>🌟</p>}
              </Cell>
            </Fragment>
          ))}
        </Row>
      ))}
    </Wrapper>
  );
}

export default Calendar;
