import { useRef, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

// expo imports
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as SQLite from "expo-sqlite";

import { img_1 as img } from "../../images";

import { styles } from "./styles";
import SearchComponent from "./SearchComponent";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../../actions";

// start component

function Chats({ navigation }) {
    // get data from redux

    const { chats, users } = useSelector((state) => {
        return {
            chats: state.chats,
            users: state.users,
        };
    });

    const [search, setSearch] = useState("");

    const dispatch = useDispatch();
    const handleSearch = () => {
        dispatch(addChat(search, navigation));
    };

    // useEffect(() => {
    //     console.log("usersState");
    //     (async () => {
    //         // this is for one user , lets say that user has the next id >> 65a2a5bc06111d8be89165b0
    //         // const response = await axios.get(`${BASE_URL}/api/users/all`, {
    //         //     params: { _id: "65a2a5bc06111d8be89165b0" },
    //         // });
    //         const response = await axios.get(`${BASE_URL}/api/users/all`, {
    //             params: { _ids: usersState.data },
    //         });

    //         setUsersData(response.data.users);
    //     })();
    // }, [usersState]);

    const showUsers = chats?.data?.map((user, index) => {
        const u = users?.data?.filter((x) => x._id === user.talkWithId)[0];

        return (
            <View key={index}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Chat", {
                            talkWithId: user.talkWithId,
                            name: u?.name,
                            image: u?.picture,
                        })
                    }
                >
                    <View style={styles.showUsers}>
                        <Image
                            source={{
                                uri: u?.picture,
                            }}
                            style={styles.image}
                        />
                        <View style={styles.userContainer}>
                            <Text style={styles.name}>{u?.name}</Text>
                            <Text style={styles.message}>{user.content}</Text>
                            <Text style={styles.message}>{user.createdat}</Text>
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
                        {showUsers?.length ? (
                            showUsers
                        ) : (
                            <Text>there is no users , search for friends </Text>
                        )}
                    </ScrollView>
                </View>
            </View>
        </>
    );
}

export default Chats;
