// expo imports
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as SQLite from "expo-sqlite";
import axios from "axios";
import {
    BASE_URL,
    IS_LOADING_CHATS_FROM_LOCAL_FILE,
    IS_LOADING_INDIVIDUAL_CHAT_FROM_LOCAL_FILE,
    IS_LOADING_USERS,
    LOAD_CHATS_FROM_LOCAL_FILE,
    LOAD_INDIVIDUAL_CHAT_FROM_LOCAL_FILE,
    LOAD_USERS,
} from "../constants/constants";

export const importDataBase = () => async (dispatch) => {
    // loading
    dispatch({
        type: "IS_LOADING",
    });

    // make db
    let db = SQLite.openDatabase("example.db");

    // import file
    const importDb = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true,
        });

        const file = FileSystem.documentDirectory + "SQLite";
        const check = !(await FileSystem.getInfoAsync(file)).exists;
        const encodingType = { encoding: FileSystem.EncodingType.Base64 };
        if (check) {
            await FileSystem.makeDirectoryAsync(file);
        }

        const base64 = await FileSystem.readAsStringAsync(
            result.assets[0].uri,
            encodingType
        );

        await FileSystem.writeAsStringAsync(
            file + "/example.db",
            base64,
            encodingType
        );

        db.closeAsync();
        db = SQLite.openDatabase("example.db");
    };

    await importDb();

    // // functions
    // const failliarAll = (txObj, error) => {
    //     console.error(error);
    // };
    // const successAll = async (txObj, resultSet) => {
    //     dispatch({
    //         type: "IMPORT_DB",
    //         payload: resultSet.rows._array,
    //     });
    // };

    // // transaction
    // db.transaction((tx) => {
    //     tx.executeSql(
    //         "SELECT talkWith FROM messages GROUP BY talkWith",
    //         null,
    //         successAll,
    //         failliarAll
    //     );
    // });

    // functions success and failliar
    const failliarChats = (txObj, error) => {
        console.error(error);
    };
    const successChats = async (txObj, resultSet) => {
        dispatch({
            type: "LOAD_CHATS",
            payload: resultSet.rows._array,
        });
    };
    const query = `SELECT  talkWithId , content , createdAt  FROM messages  GROUP BY talkWithId`;
    // transaction
    db.transaction((tx) => {
        tx.executeSql(query, null, successChats, failliarChats);
    });

    ///////////////////////////////////
    ///////////////////////////////////
    ///////////////////////////////////
    ///////////////////////////////////
    ///////////////////////////////////
    ///////////////////////////////////
    ///////////////////////////////////
    // functions messages
    const failliarMessages = (txObj, error) => {
        console.error(error);
    };
    const successMessages = async (txObj, resultSet) => {
        dispatch({
            type: "LOAD_MESSAGES",
            payload: resultSet.rows._array,
        });
    };

    // transaction
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM messages ",
            null,
            successMessages,
            failliarMessages
        );
    });
};

export const importChats = () => async (dispatch) => {
    // loading
    dispatch({
        type: IS_LOADING_CHATS_FROM_LOCAL_FILE,
    });

    // make db
    let db = SQLite.openDatabase("example.db");
    // import file
    const importDb = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true,
        });

        const file = FileSystem.documentDirectory + "SQLite";
        const check = !(await FileSystem.getInfoAsync(file)).exists;
        const encodingType = { encoding: FileSystem.EncodingType.Base64 };
        if (check) {
            await FileSystem.makeDirectoryAsync(file);
        }

        const base64 = await FileSystem.readAsStringAsync(
            result.assets[0].uri,
            encodingType
        );

        await FileSystem.writeAsStringAsync(
            file + "/example.db",
            base64,
            encodingType
        );

        db.closeAsync();
        db = SQLite.openDatabase("example.db");
    };
    await importDb();
    // functions success and failliar
    const failliarChats = (txObj, error) => {
        console.error(error);
    };
    const successChats = async (txObj, resultSet) => {
        dispatch({
            type: LOAD_CHATS_FROM_LOCAL_FILE,
            payload: resultSet.rows._array,
        });
    };
    const query = `SELECT  talkWithId , content , createdAt  FROM messages  GROUP BY talkWithId`;
    // transaction
    db.transaction((tx) => {
        tx.executeSql(query, null, successChats, failliarChats);
    });

    dispatch({
        type: IS_LOADING_INDIVIDUAL_CHAT_FROM_LOCAL_FILE,
    });

    /////////////////////////
    /////////////////////////
    /////////////////////////
    /////////////////////////
    /////////////////////////
    /////////////////////////
    /////////////////////////

    // functions success and failliar
    const failliarAll = (txObj, error) => {
        console.error(error);
    };
    const successAll = async (txObj, resultSet) => {
        dispatch({
            type: LOAD_INDIVIDUAL_CHAT_FROM_LOCAL_FILE,
            payload: resultSet.rows._array,
        });
    };
    const queryAll = `SELECT * FROM messages`;
    // transaction
    db.transaction((tx) => {
        tx.executeSql(queryAll, null, successAll, failliarAll);
    });

    ///////////////////////
    ///////////////////////
    ///////////////////////
    ///////////////////////
    ///////////////////////
    ///////////////////////

    dispatch({
        type: IS_LOADING_USERS,
    });

    // functions success and failliar
    const failliarUsers = (txObj, error) => {
        console.error(error);
    };
    const successUsers = async (txObj, resultSet) => {
        // const response = await axios.get("/api/users", {});

        const _ids = resultSet.rows._array.map((item) => {
            return item.talkWithId;
        });

        const response = await axios.get(`${BASE_URL}/api/users/all`, {
            params: { _ids: _ids },
        });

        dispatch({
            type: LOAD_USERS,
            payload: response.data.users,
        });
    };
    const queryUsers = `SELECT talkWithId FROM messages GROUP BY talkWithId`;
    // transaction
    db.transaction((tx) => {
        tx.executeSql(queryUsers, null, successUsers, failliarUsers);
    });
};

export const importSpecificChat = (user) => async (dispatch) => {
    // loading
    dispatch({
        type: IS_LOADING_INDIVIDUAL_CHAT_FROM_LOCAL_FILE,
    });

    // make db
    let db = SQLite.openDatabase("example.db");

    // import file
    const importDb = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true,
        });

        const file = FileSystem.documentDirectory + "SQLite";
        const check = !(await FileSystem.getInfoAsync(file)).exists;
        const encodingType = { encoding: FileSystem.EncodingType.Base64 };
        if (check) {
            await FileSystem.makeDirectoryAsync(file);
        }

        const base64 = await FileSystem.readAsStringAsync(
            result.assets[0].uri,
            encodingType
        );

        await FileSystem.writeAsStringAsync(
            file + "/example.db",
            base64,
            encodingType
        );

        db.closeAsync();
        db = SQLite.openDatabase("example.db");
    };

    await importDb();

    // functions success and failliar
    const failliarChat = (txObj, error) => {
        console.error(error);
    };
    const successChat = async (txObj, resultSet) => {
        dispatch({
            type: LOAD_INDIVIDUAL_CHAT_FROM_LOCAL_FILE,
            payload: resultSet.rows._array,
        });
    };
    const query = `SELECT * FROM messages WHERE talkWithId=${user}`;
    // transaction
    db.transaction((tx) => {
        tx.executeSql(query, null, successChat, failliarChat);
    });
};
