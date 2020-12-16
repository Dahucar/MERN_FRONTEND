// Combinacioón de todos mis reducers.

import { combineReducers } from "redux";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    // Listado de todos mis reducers.
    ui: uiReducer,
    calendar: calendarReducer
});