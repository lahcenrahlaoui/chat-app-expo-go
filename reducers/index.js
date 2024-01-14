import { combineReducers } from "redux";
import { dataBaseReducer, messagesReducer , chatsReducer, usersReducer } from "./dataReducer";

const reducers = combineReducers({
    messages: messagesReducer,
    database: dataBaseReducer,
    chats : chatsReducer , 
    users : usersReducer
});

export default reducers;
