import { TextInput, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import axios from "axios";
const InputTextChat = ({ currentMessage, setCurrentMessage, addOne }) => {
    

    return (
        <View
            style={{
                display: "flex",
                gap: 10,
                flexDirection: "row",
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 5,
                paddingBottom: 5,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <TextInput
                style={{
                    width: "82%",
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 11,
                    paddingBottom: 11,
                    borderRadius: 35,
                    backgroundColor: "#cfcfcf7a",
                }}
                placeholder="Type a message"
                value={currentMessage}
                onChangeText={setCurrentMessage}
            />
            <MaterialIcons
                name="send"
                size={35}
                color="#000"
                onPress={addOne}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 10,
                    paddingRight: 6,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 30,
                    backgroundColor: "#ffffff",
                }}
            />
        </View>
    );
};

export default InputTextChat;
