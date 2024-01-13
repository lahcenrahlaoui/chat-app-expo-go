import { faker } from "@faker-js/faker";
import * as images from "../images";

// export const importDb = async (db, setDb, isLoading, setIsLoading) => {
//     let result = await DocumentPicker.getDocumentAsync({
//         copyToCacheDirectory: true,
//     });

//     console.log("result.assets");
//     console.log(result.assets[0].uri);

//     setIsLoading(true);
//     const file = FileSystem.documentDirectory + "SQLite";
//     const check = !(await FileSystem.getInfoAsync(file)).exists;
//     const encodingType = {
//         encoding: FileSystem.EncodingType.Base64,
//     };
//     if (check) {
//         await FileSystem.makeDirectoryAsync(file);
//     }

//     const base64 = await FileSystem.readAsStringAsync(
//         result.assets[0].uri,
//         encodingType
//     );

//     await FileSystem.writeAsStringAsync(
//         file + "/example.db",
//         base64,
//         encodingType
//     );
//     await db.closeAsync();
//     setDb(SQLite.openDatabase("example.db"));
// };

// export const exportDb = async (db, setDb, isLoading, setIsLoading) => {
//     if (Platform.OS === "android") {
//         const permissions =
//             await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
//         if (permissions.granted) {
//             const base64 = await FileSystem.readAsStringAsync(
//                 FileSystem.documentDirectory + "SQLite/example.db",
//                 {
//                     encoding: FileSystem.EncodingType.Base64,
//                 }
//             );

//             await FileSystem.StorageAccessFramework.createFileAsync(
//                 permissions.directoryUri,
//                 "example.db",
//                 "application/octet-stream"
//             )
//                 .then(async (uri) => {
//                     await FileSystem.writeAsStringAsync(uri, base64, {
//                         encoding: FileSystem.EncodingType.Base64,
//                     });
//                 })
//                 .catch((e) => console.log(e));
//         } else {
//             console.log("Permission not granted");
//         }
//     } else {
//         await Sharing.shareAsync(
//             FileSystem.documentDirectory + "SQLite/example.db"
//         );
//     }
// };

export const users = [
    {
        image: images.img_1,
        name: faker.person.firstName(),
        message: faker.lorem.words({ min: 1, max: 8 }),
    },
    {
        image: images.img_2,
        name: faker.person.firstName(),
        message: faker.lorem.words({ min: 1, max: 8 }),
    },
    {
        image: images.img_3,
        name: faker.person.firstName(),
        message: faker.lorem.words({ min: 1, max: 8 }),
    },
    {
        image: images.img_4,
        name: faker.person.firstName(),
        message: faker.lorem.words({ min: 1, max: 8 }),
    },
    {
        image: images.img_5,
        name: faker.person.firstName(),
        message: faker.lorem.words({ min: 1, max: 8 }),
    },
];

/*****************************************



const [db, setDb] = useState(SQLite.openDatabase("example.db"));
const [isLoading, setIsLoading] = useState(true);
const [names, setNames] = useState([]);
const [messages, setMessages] = useState([]);
const [search, setSearch] = useState("");

const [currentMessage, setCurrentMessage] = useState(undefined);

const exportDb = async () => {
    if (Platform.OS === "android") {
        const permissions =
            await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
            const base64 = await FileSystem.readAsStringAsync(
                FileSystem.documentDirectory + "SQLite/example.db",
                {
                    encoding: FileSystem.EncodingType.Base64,
                }
            );

            await FileSystem.StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                "example.db",
                "application/octet-stream"
            )
                .then(async (uri) => {
                    await FileSystem.writeAsStringAsync(uri, base64, {
                        encoding: FileSystem.EncodingType.Base64,
                    });
                })
                .catch((e) => console.log(e));
        } else {
            console.log("Permission not granted");
        }
    } else {
        await Sharing.shareAsync(
            FileSystem.documentDirectory + "SQLite/example.db"
        );
    }
};

const importDb = async () => {
    let result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
    });

    console.log("result.assets");
    console.log(result.assets[0].uri);

    setIsLoading(true);
    const file = FileSystem.documentDirectory + "SQLite";
    const check = !(await FileSystem.getInfoAsync(file)).exists;
    const encodingType = {
        encoding: FileSystem.EncodingType.Base64,
    };
    if (check) {
        await FileSystem.makeDirectoryAsync(file);
    }

    const base64 = await FileSystem.readAsStringAsync(
        result.assets[0].uri,
        encodingType
    );

    await FileSystem.writeAsStringAsync(
        file + "/example.db",
        base64,
        encodingType
    );
    await db.closeAsync();
    setDb(SQLite.openDatabase("example.db"));
};

useEffect(() => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
        );
    });

    db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM names",
            null,
            (txObj, resultSet) => setNames(resultSet.rows._array),
            (txObj, error) => console.log(error)
        );
    });

    setIsLoading(false);
}, [db]);

// if (isLoading) {
//     return (
//         <View style={styles.container}>
//             <Text>Loading db ...</Text>
//         </View>
//     );
// }

const addName = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO names (name) values (?)",
            [currentMessage],
            (txObj, resultSet) => {
                let existingNames = [...names];
                existingNames.push({
                    id: resultSet.insertId,
                    name: currentMessage,
                });
                setNames(existingNames);
                setCurrentMessage(undefined);
            },
            (txObj, error) => console.log(error)
        );
    });
};

const deleteName = (id) => {
    db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM names WHERE id = ?",
            [id],
            (txObj, resultSet) => {
                if (resultSet.rowsAffected > 0) {
                    let existingNames = [...names].filter(
                        (name) => name.id !== id
                    );
                    setNames(existingNames);
                }
            },
            (txObj, error) => console.log(error)
        );
    });
};

const updateName = (id) => {
    db.transaction((tx) => {
        tx.executeSql(
            "UPDATE names SET name = ? WHERE id = ?",
            [currentMessage, id],
            (txObj, resultSet) => {
                if (resultSet.rowsAffected > 0) {
                    let existingNames = [...names];
                    const indexToUpdate = existingNames.findIndex(
                        (name) => name.id === id
                    );
                    existingNames[indexToUpdate].name = currentMessage;
                    setNames(existingNames);
                    setCurrentMessage(undefined);
                }
            },
            (txObj, error) => console.log(error)
        );
    });
};

const addOne = () => {
    (async () => {
        const BASE_URL = `https://chat-app-three-umber.vercel.app`;
        const response = await axios.post(`${BASE_URL}/api/messages`, {
            content: currentMessage,
            from: "u3",
            to: "u4",
        });
        console.log(response.data);
    })();
    setMessages((state) => {
        return [...state, currentMessage];
    });

    setCurrentMessage("");
};
******************************/
