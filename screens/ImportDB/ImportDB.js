import { Button, View, Text } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { importDataBase } from "../../actions";
import { useEffect } from "react";
import { importChats } from "../../actions/importAction";

function ImportDB({ navigation }) {
    const dispatch = useDispatch();

    const handleImportData = async () => {
      
        
        dispatch(importChats());
        navigation.navigate("Chats");
    };
    const handleWithoutImport = async () => {
        // dispatch(importChats());
        navigation.navigate("Chats");
    };

    // const state = useSelector((state) => state.database);

    // const filterState = state?.data?.filter((state) => state !== "undefined");

    // const renderData = filterState?.map((message, index) => {
    //     return (
    //         <View key={index}>
    //             <Text>{JSON.stringify(message)}</Text>
    //         </View>
    //     );
    // });

    return (
        <>
            <View>
                <Button title="import db" onPress={handleImportData} />
                <Button title="without import " onPress={handleWithoutImport} />
                {/* {renderData} */}
            </View>
        </>
    );
}

export default ImportDB;
