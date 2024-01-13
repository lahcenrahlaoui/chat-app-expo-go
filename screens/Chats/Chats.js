import { useRef, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";

// expo imports
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as SQLite from "expo-sqlite";

import { img_1 as img } from "../../images";

// import data users placeholder
import { users } from "../../utils";

import { styles } from "./styles";

import SearchComponent from "./SearchComponent";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../../actions";
function Chats({ navigation }) {
    const [search, setSearch] = useState("");

    const dispatch = useDispatch();
    const handleSearch = () => {
        console.log(search);
        dispatch(addChat(search, navigation));
    };

    const state = useSelector((state) => state.chats);

    const showUsers = state?.data?.map((user, index) => {
        return (
            <View key={index}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Chat", {
                            name: user.talkWith,
                            image: user.image,
                        })
                    }
                >
                    <View style={styles.showUsers}>
                        <Image source={user.image} style={styles.image} />
                        <View style={styles.userContainer}>
                            <Text style={styles.name}>{user.talkWith}</Text>
                            <Text style={styles.message}>{user.content}</Text>
                            <Text style={styles.message}>{user.createdAt}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderBottomColor: "#d1d1d1",
                            borderBottomWidth: 1,
                            marginRight: 60,
                            marginLeft: 60,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    });
    const newRef = useRef();

    return (
        <>
            <View style={styles.parentContainer}>
                <View source={img} resizeMode="cover" style={styles.container}>
                    <SearchComponent
                        search={search}
                        setSearch={setSearch}
                        handleSearch={handleSearch}
                    />
                    <ScrollView
                        ref={newRef}
                        onContentSizeChange={() =>
                            newRef.current.scrollToEnd({ animated: true })
                        }
                        style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                            gap: 10,
                        }}
                    >
                        {showUsers.length ? (
                            showUsers
                        ) : (
                            <Text>there is no users , search for friends </Text>
                        )}

                        {/* <Text>{JSON.stringify(state)}</Text> */}
                    </ScrollView>
                </View>
            </View>
        </>
    );
}

export default Chats;
