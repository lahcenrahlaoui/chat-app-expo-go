import "react-native-gesture-handler";

import * as React from "react";
import { Text, View } from "react-native";

import { Image } from "react-native";

import { AntDesign, Entypo } from "@expo/vector-icons";

function LogoTitle({ name, image }) {
    return (
        <View
            style={{
                width: "100%",
                height: 60,
                display: "flex",
                gap: 10,
                flexDirection: "row",

                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <View
                style={{
                    display: "flex",
                    gap: 8,
                    flexDirection: "row",

                    alignItems: "center",
                }}
            >
                <Image
                    source={{uri : image}}
                    style={{
                        width: 35,
                        height: 35,
                        objectFit: "cover",
                        gap: 10,
                        borderRadius: 50,
                        backgroundColor: "#b4b4b4a2",
                    }}
                />
                <Text>{name}</Text>
            </View>
            <View
                style={{
                    display: "flex",
                    gap: 20,
                    flexDirection: "row",

                    alignItems: "center",
                }}
            >
                <AntDesign name="videocamera" size={24} color="black" />
                <AntDesign name="camerao" size={24} color="black" />
                <Entypo name="dots-three-vertical" size={24} color="black" />
            </View>
        </View>
    );
}

export default LogoTitle;
