import { Image, Text, View } from "react-native";

import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

import img2 from "./v.png";
const TopBar = () => {
    return (
        <View
            style={{
                width: "100%",
                height: 60,
                display: "flex",
                gap: 10,
                flexDirection: "row",
                paddingLeft: 5,
                paddingRight: 5,
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#75e940a1",
                marginTop: "10%",
            }}
        >
            <View
                style={{
                    display: "flex",
                    gap: 8,
                    flexDirection: "row",
                    paddingLeft: 5,
                    paddingRight: 5,
                    alignItems: "center",
                }}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
                <Image
                    source={img2}
                    style={{
                        width: 35,
                        height: 35,
                        objectFit: "cover",
                        gap: 10,
                        borderRadius: 50,
                        backgroundColor: "#b4b4b4a2",
                    }}
                />
                <Text>khaled</Text>
            </View>
            <View
                style={{
                    display: "flex",
                    gap: 20,
                    flexDirection: "row",
                    paddingLeft: 5,
                    paddingRight: 5,
                    alignItems: "center",
                }}
            >
                <AntDesign name="videocamera" size={24} color="black" />
                <AntDesign name="camerao" size={24} color="black" />
                <Entypo name="dots-three-vertical" size={24} color="black" />
            </View>
        </View>
    );
};

export default TopBar;
