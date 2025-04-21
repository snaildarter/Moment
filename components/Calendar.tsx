import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const events = [
  { title: '会议', date: '2025-04-11' },
  { title: '午餐', date: '2025-04-21' },
];

// 定义 selfEvents 数组中每个元素的类型
type EventType = {
  title: string;
  date: string;
};

// 定义 Calendar 组件的 props 类型
type CalendarProps = {
  selfEvents?: EventType[];
};

const Calendar: React.FC<CalendarProps> = ({ selfEvents }) => {
  return (
    <div style={{ height: 500 }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={selfEvents || events}
        editable={true}
        selectable={true}
      />
    </div>
  );
};

export default Calendar;
