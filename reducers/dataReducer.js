const initialMessages = [];

const initial = {
    isLoading: false,
    data: [],
};

export const messagesReducer = (state = initial, action) => {
    switch (action.type) {
        case "LOAD_MESSAGES":
            return {
                isLoading: false,
                data: action.payload,
            };
        case "ADD_MESSAGE":
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
        case "IS_LOADING_CHATS":
            return {
                ...state,
                isLoading: true,
            };
        case "LOAD_CHATS":
            return {
                data: action.payload,
                isLoading: false,
            };

        case "ADD_CHAT":
            return {
                data: [...state.data, action.payload],
                isLoading: false,
            };

        default:
            return state;
    }
};
