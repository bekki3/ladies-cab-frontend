import { Image, StyleSheet } from "react-native";
const Logo = () => {
    return (
        <Image
            style={styles.image}
            source={require("../images/logo-white.png")}
        />
    );
};
const styles = StyleSheet.create({
    image: {
        width: "60%",
        height: "50%",
    }
})
export default Logo;
