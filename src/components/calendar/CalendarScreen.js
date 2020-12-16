import React, { useState } from 'react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

import { Navbar } from '../ui/Navbar'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/event';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    // TODO: leer del store todos los eventos

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') );

    const onDoubleClick = ( event ) => {
        dispatch( uiOpenModal() );
    }    
    
    const onSelectEvent = ( event ) => {
        dispatch( eventSetActive( event ) );
    }

    const eventStyleGetter = ( event, star, end, isSelected ) => {
    }
    
    const onViewChangue = ( event ) => {
        setLastView(event);
        localStorage.setItem('lastView', event);
    }

    const handleSelectEventoCalendar = (e) => {
        console.log(e);
        dispatch( eventClearActiveEvent() );
    }

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChangue }
                view={ lastView }
                onSelectSlot={ handleSelectEventoCalendar }
                selectable={ true }
                components={{ 
                    event: CalendarEvent
                }}
            />


                <AddNewFab />

                {
                    (activeEvent) && <DeleteEventFab />
                }
            <CalendarModal />
        </div>
    )
}
