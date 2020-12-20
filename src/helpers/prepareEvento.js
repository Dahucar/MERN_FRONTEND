import moment from "moment";

export const prepareEvents = ( events = [] ) => {
    return events.map(
        ( eventIte ) => ({
            ...eventIte,
            end: moment( eventIte.end ).toDate(),
            start: moment( eventIte.start ).toDate()
        })
    );
}