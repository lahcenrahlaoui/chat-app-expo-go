import "react-native-gesture-handler";

import Chat from "./screens/Chat/Chat";
import Chats from "./screens/Chats/Chats";
import ImportDB from "./screens/ImportDB/ImportDB";

import { NavigationContainer } from "@react-navigation/native";

import * as React from "react";
import {useState} from  "react"

import { createStackNavigator } from "@react-navigation/stack";

import LogoTitle from "./LogoTitle";
import Login from "./screens/Login/Login";
const Stack = createStackNavigator();

import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";

import { thunk } from "redux-thunk";
import Check from "./screens/Check/Check";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const App = () => {
    const [isSignedIn , setIsSignedIn] =  useState(true);
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    {isSignedIn ? (
                        <>
                            <Stack.Screen
                                name="ImportDB"
                                component={ImportDB}
                            />
                            <Stack.Screen name="Chats" component={Chats} />
                            <Stack.Screen
                                name="Chat"
                                component={Chat}
                                options={(route, navigation) => ({
                                    headerTitle: (props) => {
                                        props["image"] =
                                            route.route.params.image;
                                        props["name"] = route.route.params.name;
                                        return <LogoTitle {...props} />;
                                    },
                                })}
                            />
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
        </Provider>
    );
};

export default App;

// import 'react-native-gesture-handler';

// import Chat from "./screens/Chat/Chat";
// import Chats from "./screens/Chats/Chats";
// // import "react-native-gesture-handler";

// import {
//     SafeAreaProvider,
//     SafeAreaView,
//     useSafeAreaInsets,
// } from "react-native-safe-area-context";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import * as React from "react";
// import { Text, View } from "react-native";

// import { Image } from "react-native";

// import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

// import img2 from "./v.png";

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// function Demo() {
//     const insets = useSafeAreaInsets();

//     return (
//         <View
//             style={{
//                 flex: 1,
//                 justifyContent: "space-between",
//                 alignItems: "center",

//                 // Paddings to handle safe area
//                 paddingTop: insets.top,
//                 paddingBottom: insets.bottom,
//                 paddingLeft: insets.left,
//                 paddingRight: insets.right,
//             }}
//         >
//             <Text>This is top text.</Text>
//             <Text>This is bottom text.</Text>
//         </View>
//     );
// }

// function LogoTitle() {
//     return (
//         <View
//             style={{
//                 height: 60,
//                 display: "flex",
//                 gap: 10,
//                 flexDirection: "row",
//                 backgroundColor: "blue",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//             }}
//         >
//             <View
//                 style={{
//                     display: "flex",
//                     gap: 8,
//                     flexDirection: "row",

//                     alignItems: "center",
//                 }}
//             >
//                 <Image
//                     source={img2}
//                     style={{
//                         width: 35,
//                         height: 35,
//                         objectFit: "cover",
//                         gap: 10,
//                         borderRadius: 50,
//                         backgroundColor: "#b4b4b4a2",
//                     }}
//                 />
//                 <Text>khaled</Text>
//             </View>
//             <View
//                 style={{
//                     display: "flex",
//                     gap: 20,
//                     flexDirection: "row",

//                     alignItems: "center",
//                 }}
//             >
//                 <AntDesign name="videocamera" size={24} color="black" />
//                 <AntDesign name="camerao" size={24} color="black" />
//                 <Entypo name="dots-three-vertical" size={24} color="black" />
//             </View>
//         </View>
//     );
// }

// const App = () => {
//     return (
//         // <NavigationContainer>
//         //     <Stack.Navigator initialRouteName="Chats">
//         //         <Stack.Screen name="Home">
//         //             {() => (
//         //                 <Tab.Navigator
//         //                     initialRouteName="Analitics"
//         //                     tabBar={() => null}
//         //                     screenOptions={{ headerShown: false }}
//         //                 >
//         //                     <Tab.Screen name="Analitics" component={Demo} />
//         //                     <Tab.Screen name="Profile" component={Demo} />
//         //                 </Tab.Navigator>
//         //             )}
//         //         </Stack.Screen>

//         //         <Stack.Screen name="Chats" component={Chats} />
//         //         <Stack.Screen name="Chat" component={Chat} />
//         //     </Stack.Navigator>
//         // </NavigationContainer>
//         <SafeAreaProvider>
//             <NavigationContainer>
//                 <Stack.Navigator
//                     initialRouteName="Home"
//                     screenOptions={{
//                         headerStyle: {
//                             backgroundColor: "#ffffff",
//                         },
//                         headerTintColor: "#646464",
//                     }}
//                 >
//                     <Stack.Screen name="Chats" component={Chats} />
//                     <Stack.Screen
//                         name="Chat"
//                         component={Chat}
//                         options={{
//                             headerTitle: (props) => {
//                                 console.log(props);
//                                 return <LogoTitle {...props} />;
//                             },
//                         }}
//                     />
//                 </Stack.Navigator>
//             </NavigationContainer>
//         </SafeAreaProvider>
//     );
// };

// export default App;
