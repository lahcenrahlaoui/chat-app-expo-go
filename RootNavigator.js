import "react-native-gesture-handler";

import Chat from "./screens/Chat/Chat";
import Chats from "./screens/Chats/Chats";
import ImportDB from "./screens/ImportDB/ImportDB";
import Login from "./screens/Login/Login";
import Check from "./screens/Check/Check";

import { NavigationContainer } from "@react-navigation/native";

import * as React from "react";
import { useState, useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LogoTitle from "./LogoTitle";

import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const RootNavigator = () => {
    // local storage persist
    /////////////////////////////////////
    /////////////////////////////////////
    /////////////////////////////////////
    /////////////////////////////////////
    /////////////////////////////////////
    // const storeData = async (value) => {
    //     try {
    //         const jsonValue = JSON.stringify(value);
    //         await AsyncStorage.setItem("my-key", jsonValue);

    //         console.log("data here " + value);
    //     } catch (e) {}
    // };

    // const getData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem("my-key");

    //         if (value !== null) {
    //             console.log("value here ");
    //             console.log(value);
    //             return value;
    //         } else {
    //             console.log("no value    ");
    //             return "";
    //         }
    //     } catch (e) {
    //         // error reading value
    //     }
    // };

    // console.log(existData._j);
    // options

    // options for the topbar

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    const [isSignedIn, setIsSignedIn] = useState(true);
    const [existData, setExistData] = useState();
    const chats = useSelector((state) => state.chats);

    useEffect(() => {
        setExistData(() => (chats?.data?.length ? true : false));
    }, [chats]);

    const options = (route, navigation) => ({
        headerTitle: (props) => {
            props["image"] = route.route.params.image;
            props["name"] = route.route.params.name;
            return <LogoTitle {...props} />;
        },
    });

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isSignedIn ? (
                    <>
                        {!existData ? (
                            <Stack.Screen
                                name="ImportDB"
                                component={ImportDB}
                            />
                        ) : (
                            <>
                                <Stack.Screen name="Chats" component={Chats} />
                                <Stack.Screen
                                    name="Chat"
                                    component={Chat}
                                    options={options}
                                />
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen
                            name="Check"
                            component={Check}
                            initialParams={{ setIsSignedIn: setIsSignedIn }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
