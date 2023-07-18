import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import ProfileIcon from "../components/ProfileIcon";
const EditProfile = () => {
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [age, setAge] = useState("18");
    const phoneNumber = "123";

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


    const updateData = async () => {
        if (validateInputs()) {
            const dataToSend = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                imageBuf: "Image buf",
                phoneNumber: phoneNumber,
            };
            
            const response = await fetch(`http://10.0.2.2:3000/user`, {
                method: "PUT",
                body: JSON.stringify(dataToSend),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.text();
            console.log(data);

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
                <Text style={styles.text}>Update profile picture</Text>
            </Pressable>

            
            <View style={styles.form}>
                <Text style={styles.title}>First name:</Text>
                <TextInput style={styles.textInput} onChangeText={setFirstName} value={firstName} onPressIn={()=> {setFirstName("")}}/>
            
                <Text style={styles.title}>Last name:</Text>
                <TextInput style={styles.textInput} onChangeText={setLastName} value={lastName} onPressIn={()=> {setLastName("")}}/>
            
                <Text style={styles.title}>Age:</Text>
                <TextInput style={styles.textInput} onChangeText={setAge} value={age} onPressIn={()=> {setAge("")}}/>
            </View>


            <PrimaryButton
                onPress={updateData}
                text="Update profile"
            />
        </View>
    );
};










export default EditProfile;

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
        marginVertical: 20,
        width: "70%"
    },
    title: {
        color: "#777"
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: "#777",
        marginBottom: 20
    }
});
