// expo imports
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as SQLite from "expo-sqlite";

export const getMessages = () => (dispatch) => {
    // const messages =
    // const [db, setDb] = useState(SQLite.openDatabase("example.db"));
};

export const setMessage = (data) => (dispatch) => {

    console.log(data)
    dispatch({
        type: "ADD_MESSAGE",
        payload: data,
    });
};

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

    // functions
    const failliarAll = (txObj, error) => {
        console.log(error);
    };
    const successAll = async (txObj, resultSet) => {
        dispatch({
            type: "IMPORT_DB",
            payload: resultSet.rows._array,
        });
        // dispatch({
        //     type: "LOAD_CHATS",
        //     payload: resultSet.rows._array,
        // });
    };

    // transaction
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT talkWith FROM messages GROUP BY talkWith",
            null,
            successAll,
            failliarAll
        );
    });

    ////////////////////////////
    ////////////////////////////
    ////////////////////////////
    ////////////////////////////
    ////////////////////////////
    // functions
    const failliarChats = (txObj, error) => {
        console.log(error);
    };
    const successChats = async (txObj, resultSet) => {
        dispatch({
            type: "LOAD_CHATS",
            payload: resultSet.rows._array,
        });
    };

    // transaction
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT  talkWith , content , createdAt  FROM messages  GROUP BY talkWith  ",
            null,
            successChats,
            failliarChats
        );
    });

    // functions messages
    const failliarMessages = (txObj, error) => {
        console.log(error);
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

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
export const createDataBase = () => async (dispatch) => {
    let db = SQLite.openDatabase("example.db");

    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS messages(   id INTEGER PRIMARY KEY ,
                                                    content  ,
                                                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP ,
                                                    talkWith ,
                                                    status ,
                )`
        );
    });

    dispatch({
        type: "CREATE_DB",
    });
};

export const addChat = (search, navigation) => async (dispatch) => {
    const user = {
        name: search,
    };

    dispatch({
        type: "ADD_CHAT",
        payload: user,
    });
    navigation.navigate("Chat", {
        name: user.name,
        image: user.image,
    });
};
