import { combineReducers } from "redux";
import { dataBaseReducer, messagesReducer , chatsReducer } from "./dataReducer";

const reducers = combineReducers({
    messages: messagesReducer,
    database: dataBaseReducer,
    chats : chatsReducer
});

export default reducers;
