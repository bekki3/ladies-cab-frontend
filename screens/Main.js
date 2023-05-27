import { View, Text, StyleSheet } from "react-native";
const Main = ({navigation}) => {


    return(
        <View>
            <Text>
                This is Main page
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8FF",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Main;