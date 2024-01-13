import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

import { View, TextInput } from "react-native";
const SearchComponent = ({ search, setSearch , handleSearch }) => {
  
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 5,
                paddingBottom: 5,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <TextInput
                style={{
                    width: "84%",
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 11,
                    paddingBottom: 11,

                    backgroundColor: "#cfcfcf7a",
                }}
                placeholder="Type a message"
                value={search}
                onChangeText={setSearch}
            />
            <MaterialCommunityIcons
                name="account-search"
                size={27}
                color="#000"
                onPress={handleSearch}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 11,
                    paddingRight: 11,
                    paddingTop: 11,
                    paddingBottom: 11,
                    backgroundColor: "#ffffff",
                }}
            />
        </View>
    );
};

export default SearchComponent;
