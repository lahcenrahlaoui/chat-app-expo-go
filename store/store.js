// import AsyncStorage from "@react-native-async-storage/async-storage";

// import { applyMiddleware, compose, createStore } from "redux";
// import { combineReducers } from "redux";
// import { thunk } from "redux-thunk";
// import { persistStore, persistReducer } from "redux-persist";

// import reducers from "../reducers";

// import {
//     dataBaseReducer,
//     messagesReducer,
//     chatsReducer,
//     usersReducer,
// } from "../reducers/dataReducer";

// const persistConfig = {
//     key: "root",
//     storage: AsyncStorage,
// };

// const reducersPersist = combineReducers({
//     messages: persistReducer(persistConfig, messagesReducer),
//     database: persistReducer(persistConfig, dataBaseReducer),
//     chats: persistReducer(persistConfig, chatsReducer),
//     users: persistReducer(persistConfig, usersReducer),
// });

// export const storeBeforPersist = createStore(
//     reducersPersist,
//     compose(applyMiddleware(thunk))
// );

// export const storePersist = persistStore(storeBeforPersist);

// /******************************************** */
// /******************************************** */
// /******************************************** */
// /******************************************** */
// /******************************************** */

// export const store = createStore(reducers, compose(applyMiddleware(thunk)));

import AsyncStorage from "@react-native-async-storage/async-storage";

import { applyMiddleware, compose, createStore } from "redux";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";

// import reducers from "../reducers";

import {
    dataBaseReducer,
    messagesReducer,
    chatsReducer,
    usersReducer,
} from "../reducers/dataReducer";

// configuration to store every reducer alone
const persistConfigMessage = {
    key: "message",
    storage: AsyncStorage,
};
const persistConfigdatabase = {
    key: "database",
    storage: AsyncStorage,
};
const persistConfigChats = {
    key: "chats",
    storage: AsyncStorage,
};
const persistConfigUsers = {
    key: "users",
    storage: AsyncStorage,
};

const reducers = combineReducers({
    messages: persistReducer(persistConfigMessage, messagesReducer),
    database: persistReducer(persistConfigdatabase, dataBaseReducer),
    chats: persistReducer(persistConfigChats, chatsReducer),
    users: persistReducer(persistConfigUsers, usersReducer),
});

export const store = createStore(reducers, compose(applyMiddleware(thunk)));

export const persist_store = persistStore(store);

// export const store = createStore(reducers, compose(applyMiddleware(thunk)));

/******************************************** */
/******************************************** */
/******************************************** */
/******************************************** */
/******************************************** */
