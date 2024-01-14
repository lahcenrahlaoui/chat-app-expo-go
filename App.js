import "react-native-gesture-handler";

import RootNavigator from "./RootNavigator";
import * as React from "react";
import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { store , storePersist } from "./store/store";

const App = () => {
    const [existData, setExistData] = useState();

    // storeData("ssssss");

    useEffect(() => {
        (async () => {
            try {
                const value = (await AsyncStorage.getItem("my-key")) || "";
                if (value.length === 0) {
                    setExistData(false);
                } else {
                    setExistData(true);
                }
            } catch (e) {
                // error reading value
            }
        })();
    }, []);

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

    return (
        <Provider store={store}>

                <RootNavigator />

        </Provider>
    );
};

export default App;

// import "react-native-gesture-handler";

// import * as React from "react";

// import { Provider } from "react-redux";

// import AsyncStorage from "@react-native-async-storage/async-storage";

// import { store } from "./store/store";
// import RootNavigator from "./RootNavigator";

// const App = () => {
//     return (
//         <Provider store={store}>
//             <RootNavigator />
//         </Provider>
//     );
// };

// export default App;

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
