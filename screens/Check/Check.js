import React from "react";

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import axios from "axios";
const Check = (props) => {
    const [code, setCode] = useState("");

    const { setIsSignedIn } = props.route.params;
    const checkCode = () => {
        setIsSignedIn(true);
        console.warn("done!!!!!!!!");
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Number"
                    placeholderTextColor="#003f5c"
                    value={code}
                    onChangeText={(code) => setCode(code)}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={checkCode}>
                <Text style={styles.loginText}>submit code </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Check;
