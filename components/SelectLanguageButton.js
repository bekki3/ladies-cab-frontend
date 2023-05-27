import { Pressable, StyleSheet, Text } from "react-native"
const SelectLanguageButton = ({language, onPress}) =>{

    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{language}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#ffffff",
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 50,
        margin: 10,
        width: "60%",
        height: 46,
        justifyContent: "center"
    },
    text: {
        textAlign: "center",
        color: "#555",
        fontSize: 18,
    }
})

export default SelectLanguageButton;