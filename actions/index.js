// expo imports
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as SQLite from "expo-sqlite";
import axios from "axios";
import {
    ADD_MESSAGE_TO_STORE,
    ADD_NEW_CHAT,
    ADD_NEW_USER,
    BASE_URL,
} from "../constants/constants";
export const getMessages = () => (dispatch) => {
    // const messages =
    // const [db, setDb] = useState(SQLite.openDatabase("example.db"));
};

export const setMessage = (data) => async (dispatch) => {
    const preparedData = {
        content: data.content,
        from: data.current_user,
        to: data.talkWithId,
    };

    const response = await axios.post(`${BASE_URL}/api/messages`, preparedData);

    const dataToRedux = {
        id: response.data.message._id,
        content: response.data.message.content,
        createdAt: response.data.message.createdAt,
        talkWithId: response.data.message.to,
        status: 1,
    };
    console.log(dataToRedux);

    dispatch({
        type: ADD_MESSAGE_TO_STORE,
        payload: dataToRedux,
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
    const response = await axios.get(`${BASE_URL}/api/users`, {
        params: { _id: search },
    });

    // warning dont use this syntax .... just return object from the server use it here
    // exp ::>> const user = response.data.user     <---- without the array syntax ...
    const user = response.data.user[0];

    console.log(user);
    const preparedChat = {
        content: "",
        createdat: Date.now(),
        talkWithId: user._id,
    };

    dispatch({
        type: ADD_NEW_CHAT,
        payload: preparedChat,
    });

    const preparedUser = {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        picture: user.picture,
    };

      dispatch({
        type: ADD_NEW_USER,
        payload: preparedUser,
    });

    navigation.navigate("Chat", {
        talkWithId: user._id,
        name: user.name,
        image: user.picture,
    });
};
