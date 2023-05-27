import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import ProfileIcon from "../components/ProfileIcon";

const SignUp = ({navigation}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const phoneNumber = "+99899";

    const validateInputs = () => {
        const letters = /^[A-Za-z]+$/;
        const numbers = /^[0-9]+$/;
        if (!firstName.match(letters) || !firstName.length) {
            console.log("invalid first name");
            Alert.alert("Invalid first name");
        } else if (!lastName.match(letters) || !lastName.length) {
            console.log("invalid last name");
            Alert.alert("Invalid last name");
        } else if (
            !age.match(numbers) ||
            !age.length ||
            parseInt(age) < 16 ||
            parseInt(age) > 100
        ) {
            console.log("invalid age");
            Alert.alert("Invalid age");
        } else {
            return true;
        }
        return false;
    };

    const sendData = async () => {
        if (validateInputs()) {
            const dataToSend = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                imageBuf: "Image buf",
                phoneNumber: phoneNumber,
            };
            
            const response = await fetch("http://10.0.2.2:3000/user", {
                method: "POST",
                body: JSON.stringify(dataToSend),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.text();
            console.log(data);
            if(data === "Successfully signed in.")
            {
                navigation.navigate("main");
            }

        }
    };

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => {
                    console.log("Pick image");
                }}
            >
                <ProfileIcon />
            </Pressable>
            <Pressable
                onPress={() => {
                    console.log("Pick image");
                }}
            >
                <Text style={styles.text}>Add profile picture</Text>
            </Pressable>
            <View style={styles.form}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setFirstName}
                    value={firstName}
                    placeholder="First name"
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={setLastName}
                    placeholder="Last name"
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={setAge}
                    placeholder="Age"
                    keyboardType="numeric"
                />
            </View>

            <PrimaryButton text={"Sign Up"} onPress={sendData} />
        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8FF",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "blue",
    },
    form: {
        width: "100%",
        alignItems: "center",
        marginVertical: "15%",
    },
    textInput: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 50,
        width: "70%",
        height: 46,
        margin: 10,
        paddingLeft: 20,
    },
});
