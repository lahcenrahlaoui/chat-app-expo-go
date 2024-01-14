import { Platform, View } from "react-native";

import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as SQLite from "expo-sqlite";
import { useState } from "react";

import img from "./v.png";

import InputTextChat from "./InputTextChat";
import ScrollViewChat from "./ScrollViewChat";

import axios from "axios";

import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../actions";
import { BASE_URL, user_first, user_second } from "../../constants/constants";

import { createSelector } from "reselect";

// start component

function Chat(props) {
    const current_user = user_first;
    const reciever_user = user_second;

    const { route } = props;
    const { name, talkWithId } = route.params;

    const messages = useSelector((state) => state.messages.data.filter(item => item.talkWithId === talkWithId));

    const [currentMessage, setCurrentMessage] = useState(undefined);

    const dispatch = useDispatch();
    const addOne = () => {
        const data = {
            content: currentMessage,
            createdAt: new Date(),
            current_user,
            talkWithId: talkWithId,
        };

        dispatch(setMessage(data));

        setCurrentMessage("");
    };

    return (
        <>
            <View style={styles.parentContainer}>
                <View source={img} resizeMode="cover" style={styles.container}>
                    <ScrollViewChat messages={messages} />
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
