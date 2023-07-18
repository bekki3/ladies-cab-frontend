import { Image, StyleSheet } from "react-native";
const ProfileIcon = () => {
    return (
        <Image
            style={styles.image}
            source={require("../images/profileIcon.png")}
        />
    );
};
const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    }
})
export default ProfileIcon;
