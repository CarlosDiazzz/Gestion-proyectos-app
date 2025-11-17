import { Calendar as BigCalendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface CalendarProps {
    events: Event[];
    style?: React.CSSProperties;
}

export function Calendar({ events, style }: CalendarProps) {
    return (
        <div>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={style || { height: 500 }}
            />
        </div>
    );
}
