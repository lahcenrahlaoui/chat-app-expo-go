import React, { useRef } from "react";
import { ScrollView, Text, View } from "react-native";

const ScrollViewChat = ({ messages }) => {
    
    const newRef = useRef();
    const showMessages = messages.map((message, index) => {
        const s1 = {
            width: "max-content",
            alignSelf: "flex-start",
            paddingRight: 15,
            paddingLeft: 15,
            paddingBottom: 10,
            paddingTop: 10,
            borderRadius: 20,
            fontSize: 16,
            marginTop: 5,
            marginBottom: 5,
            color: "black",
            backgroundColor: "#94949492",
        };
        const s2 = {
            width: "max-content",
            paddingRight: 15,
            paddingLeft: 15,
            paddingBottom: 10,
            paddingTop: 10,
            borderRadius: 20,
            fontSize: 16,
            marginTop: 5,
            marginBottom: 5,
            alignSelf: "flex-end",
            textAlign: "right",
            color: "black",
            backgroundColor: "#ca010192",
        };
        const st = message.status === "1" ? s1 : s2;
        return (
            <View key={index}>
                <View>
                    <Text style={st}>{message.content}</Text>
                </View>
            </View>
        );
    });

    return (
        <ScrollView
            ref={newRef}
            onContentSizeChange={() =>
                newRef.current.scrollToEnd({ animated: true })
            }
            style={{
                paddingLeft: 10,
                paddingRight: 10,
            }}
        >
            {showMessages}
        </ScrollView>
    );
};

export default ScrollViewChat;
