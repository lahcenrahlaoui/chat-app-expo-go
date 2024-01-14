import {
    ADD_MESSAGE_TO_STORE,
    ADD_NEW_CHAT,
    ADD_NEW_USER,
    IS_LOADING_CHATS_FROM_LOCAL_FILE,
    IS_LOADING_INDIVIDUAL_CHAT_FROM_LOCAL_FILE,
    IS_LOADING_USERS,
    LOAD_CHATS_FROM_LOCAL_FILE,
    LOAD_INDIVIDUAL_CHAT_FROM_LOCAL_FILE,
    LOAD_USERS,
} from "../constants/constants";

const initialMessages = [];

const initial = {
    isLoading: false,
    data: [],
};

export const messagesReducer = (state = initial, action) => {
    switch (action.type) {
        case IS_LOADING_INDIVIDUAL_CHAT_FROM_LOCAL_FILE:
            return {
                ...state,
                isLoading: true,
            };
        case LOAD_INDIVIDUAL_CHAT_FROM_LOCAL_FILE:
            return {
                isLoading: false,
                data: action.payload,
            };
        case ADD_MESSAGE_TO_STORE:
            return { isLoading: false, data: [...state.data, action.payload] };
        default:
            return state;
    }
};

const initialDB = {
    isLoading: false,
    data: [],
};

export const dataBaseReducer = (state = initialDB, action) => {
    switch (action.type) {
        case "IS_LOADING":
            return {
                ...state,
                isLoading: true,
            };
        case "IMPORT_DB":
            return {
                data: action.payload,
                isLoading: false,
            };
        case "CREATE_DB":
            return [...state, action.payload];
        default:
            return state;
    }
};

const initialChats = {
    isLoading: false,
    data: [],
};
export const chatsReducer = (state = initialChats, action) => {
    switch (action.type) {
        case IS_LOADING_CHATS_FROM_LOCAL_FILE:
            return {
                ...state,
                isLoading: true,
            };
        case LOAD_CHATS_FROM_LOCAL_FILE:
            console.log(action.payload);
            return {
                isLoading: false,
                data: action.payload,
            };

        case ADD_NEW_CHAT:
            return {
                data: [...state.data, action.payload],
                isLoading: false,
            };

        default:
            return state;
    }
};

const initialUsers = {
    isLoading: false,
    data: [],
};

export const usersReducer = (state = initialUsers, action) => {
    switch (action.type) {
        case IS_LOADING_USERS:
            return {
                ...state,
                isLoading: true,
            };
        case LOAD_USERS:
            return {
                isLoading: false,
                data: action.payload,
            };
        case ADD_NEW_USER:
            return {
                data: [...state.data, action.payload],
                isLoading: false,
            };
        default:
            return state;
    }
};
