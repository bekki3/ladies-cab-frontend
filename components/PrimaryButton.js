import { View, Text, Pressable, StyleSheet } from "react-native";

const PrimaryButton = (props) => {


    return (
        <Pressable onPress={props.onPress} style={styles.container}>
                <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#D1397E",
        justifyContent: "center",
        borderRadius: 50,
        width: "70%",
        height: 46,
    },
    text: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
    },
})