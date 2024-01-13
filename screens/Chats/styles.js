import { StyleSheet } from "react-native";

// styles 
export const styles = StyleSheet.create({
    parentContainer: {
        height: "100%",
        backgroundColor: "#e7e7e792",
    },
    header: {
        display: "flex",
        justifyContent: "center",
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: "#1f5a5792",
        height: 70,
    },
    container: {
        height: "100%",
        backgroundColor: "#e7e7e792",
        display: "flex ",
        flexDirection: "col",
        justifyContent: "space-between",
    },
    showUsers: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 0,

        paddingBottom: 16,
        paddingTop: 16,
        gap: 10,
    },
    message: {
        color: "#666666",
        fontSize: 13,
    },
    image: { width: 45, height: 45, backgroundColor: "red", borderRadius: 50 },
    name: {
        fontSize: 15,
        fontWeight: "600",
        color: "#242424",
    },
    userContainer: {
        display: "flex",
        flexDirection: "col",
        justifyContent: "space-between",
        width: "100%",
    },
});