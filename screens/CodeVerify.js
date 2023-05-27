import { Text, View, StyleSheet, TextInput, Button, Pressable } from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";



const CodeVerify = ({ navigation, route }) => {
    const [code, setCode] = useState("");
    //console.log(route);
    const params = route.params;
    return (
        <View style={sytles.container}>
            <Text style={sytles.primaryText}>Enter verification code</Text>
            <Text style={sytles.text}>
                A code has been sent to {params.stdPhoneNumber}
            </Text>
            <TextInput
                style={sytles.textInput}
                onChangeText={setCode}
                placeholder="Enter the code"
                keyboardType="phone-pad"
            />
            <View style={sytles.resendView}>
                <Text style={sytles.resendText}>Didn't receive a code?</Text>
                <Pressable
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={sytles.resendButton}
                >
                    <Text style={sytles.resendButtonText}>Resend</Text>
                </Pressable>
            </View>

            <PrimaryButton
                text={"Verify Now"}
                onPress={() => {
                    params.confirmCode(params.verificationId, code);
                }}
            />
        </View>
    );
};

const sytles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8FF",
        alignItems: "center",
        justifyContent: "center",
    },
    primaryText: {
        fontWeight: "bold",
        fontSize: 18,
        margin: 10
    },
    text: {
        opacity: 0.4,
        margin: 10
    },
    textInput: {
        width: "60%",
        fontSize: 24,
        borderBottomWidth: 3,
        borderBottomColor: "#ccc",
        margin: 20,
        textAlign: "center"
    },
    resendView: {
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
    },
    resendText: {
        margin: 2,
    },
    resendButton: {
        margin: 2,
    },
    resendButtonText: {
        fontWeight: "bold",
        color: "blue"
    }
});

export default CodeVerify;
