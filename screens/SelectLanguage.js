import { Text, View, StyleSheet, Image } from "react-native";
import SelectLanguageButton from "../components/SelectLanguageButton";
import Logo from "../components/Logo";
import PhoneNumberVerify from "./PhoneNumberVerify";

const SelectLanguage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Logo />
            <SelectLanguageButton
                language="Русский"
                onPress={() => {
                    console.log(`Selected: Ru`);
                    navigation.navigate("phoneNumberVerify");
                }}
            />
            <SelectLanguageButton
                language="English"
                onPress={() => {
                    console.log(`Selected: En`);
                    navigation.navigate("phoneNumberVerify");
                }}
            />
            <SelectLanguageButton
                language="O'zbekcha"
                onPress={() => {
                    console.log(`Selected: Uz`);
                    navigation.navigate("phoneNumberVerify");
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8FF",
        alignItems: "center",
        justifyContent: "center",
    },
});
export default SelectLanguage;
