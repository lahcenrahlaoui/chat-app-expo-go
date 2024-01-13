import { Platform, View } from "react-native";

import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

import img from "./v.png";

import InputTextChat from "./InputTextChat";
import ScrollViewChat from "./ScrollViewChat";

import axios from "axios";

import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../actions";

function Chat(props) {
    const { route, navigation } = props;
    const { name } = route.params;

    console.log(name);
    const state = useSelector((state) =>
        state.messages.data.filter((item) => {
            return item.talkWith === name;
        })
    );

    // const exportDb = async () => {
    //     if (Platform.OS === "android") {
    //         const permissions =
    //             await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    //         if (permissions.granted) {
    //             const base64 = await FileSystem.readAsStringAsync(
    //                 FileSystem.documentDirectory + "SQLite/example.db",
    //                 {
    //                     encoding: FileSystem.EncodingType.Base64,
    //                 }
    //             );

    //             await FileSystem.StorageAccessFramework.createFileAsync(
    //                 permissions.directoryUri,
    //                 "example.db",
    //                 "application/octet-stream"
    //             )
    //                 .then(async (uri) => {
    //                     await FileSystem.writeAsStringAsync(uri, base64, {
    //                         encoding: FileSystem.EncodingType.Base64,
    //                     });
    //                 })
    //                 .catch((e) => console.log(e));
    //         } else {
    //             console.log("Permission not granted");
    //         }
    //     } else {
    //         await Sharing.shareAsync(
    //             FileSystem.documentDirectory + "SQLite/example.db"
    //         );
    //     }
    // };

    console.log("statement");
    console.log(state);

    const [messages, setMessages] = useState([]);

    const [currentMessage, setCurrentMessage] = useState(undefined);

    const dispatch = useDispatch();
    const addOne = () => {
        (async () => {
            const BASE_URL = `https://chat-app-three-umber.vercel.app`;
            const response = await axios.post(`${BASE_URL}/api/messages`, {
                content: currentMessage,
                from: "u3",
                to: "u4",
            });
            console.log(response.data);
        })();

        const data = {
            id: Date.now(),
            content: currentMessage,
            createdAt: new Date(), 
            talkWith: name,
        };

        dispatch(setMessage(data));
      

        setCurrentMessage("");
    };

    return (
        <>
            <View style={styles.parentContainer}>
                <View source={img} resizeMode="cover" style={styles.container}>
                    {/* <TopBar /> */}

                    <ScrollViewChat messages={state} />
                    <InputTextChat
                        currentMessage={currentMessage}
                        setCurrentMessage={setCurrentMessage}
                        addOne={addOne}
                    />
                </View>
            </View>
        </>
    );
}

export default Chat;
