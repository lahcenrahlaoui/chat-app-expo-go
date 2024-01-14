import AsyncStorage from "@react-native-async-storage/async-storage";

import { applyMiddleware, compose, createStore } from "redux";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";

import reducers from "../reducers";

import {
    dataBaseReducer,
    messagesReducer,
    chatsReducer,
    usersReducer,
} from "../reducers/dataReducer";

const createNewStore = (initialState = undefined) => {
    const persistConfig = { key: "root", storage: AsyncStorage };
    const store = createStore(
        persistReducer(persistConfig, reducers),
        initialState,
        createMiddleware()
    );
    const persistor = persistStore(store);
};

const loadState = (state) => {
    createNewStore(state);
    callbacks.forEach((callback) => {
        callback();
    });
};

export const loadStore = (json) => {
    return new Promise((resolve, reject) => {
        let state;

        try {
            state = JSON.parse(json);
        } catch (err) {
            return reject(err);
        }

        if (!persistor) {
            return resolve(loadState(state));
        }
        persistor
            .purge()
            .then(() => {
                return resolve(loadState(state));
            })
            .catch(() => {
                return resolve(loadState(state));
            });
    });
};

const getStore = (storeReplaceCallback = null) => {
    if (storeReplaceCallback) {
        callbacks.push(storeReplaceCallback);
    }

    if (!store) {
        createNewStore();
    }

    return { store, persistor };
};
