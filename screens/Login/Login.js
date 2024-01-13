import React from "react";

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import axios from "axios";
const Login = ({ navigation }) => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const register = () => {
        (async () => {
            const BASE_URL = `https://chat-app-three-umber.vercel.app`;
            const response = await axios.post(`${BASE_URL}/api/users`, {
                name: name,
                phoneNumber: phoneNumber,
            });

            navigation.navigate("Check");
        })();
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Number"
                    placeholderTextColor="#003f5c"
                    value={name}
                    onChangeText={(name) => setName(name)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Number"
                    placeholderTextColor="#003f5c"
                    value={phoneNumber}
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={register}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
