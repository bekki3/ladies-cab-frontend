import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import { useState, useRef } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";
import Logo from "../components/Logo";

const PhoneNumberVerify = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const recaptchaVerifier = useRef(null);

    let phoneNumberLength;

    const onChangeTextHandler = (text) => {
        const phoneNumber = text.replace(/[^\d]/g, "");
        phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 3) {
            setPhoneNumber(phoneNumber);
        } else if (phoneNumberLength < 6) {
            setPhoneNumber(
                `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`
            );
        } else if (phoneNumberLength < 8) {
            setPhoneNumber(
                `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
                    2,
                    5
                )}-${phoneNumber.slice(5, 7)}`
            );
        } else {
            setPhoneNumber(
                `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
                    2,
                    5
                )}-${phoneNumber.slice(5, 7)}-${phoneNumber.slice(7, 9)}`
            );
        }
    };

    const sendVerification = () => {
        const stdPhoneNumber = `+998${phoneNumber.replace(/[^\d]/g, "")}`
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(
                stdPhoneNumber ,
                recaptchaVerifier.current
            )
            .then((verId)=>{
                //console.log("verificatrion id: ", verId);
                navigation.navigate("codeVerify", {
                    confirmCode: confirmCode,
                    verificationId: verId,
                    stdPhoneNumber: stdPhoneNumber
                });
            })
            .catch((err) => {
                console.error(err);
            });
                
        setPhoneNumber("");
        
    };

    const confirmCode = (verificationId, code) => {
        console.log("code: ", code);
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase
            .auth()
            .signInWithCredential(credential)
            .then(() => {
                //setCode("");
                //Alert.alert("Logged in successfully");
                //navigation.navigate("");
                navigation.navigate("signUp");
            })
            .catch((err) => {
                console.error(err);
                Alert.alert("Log in error");
            });
        
    };

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <Logo />
            <Text style={{ margin: 6 }}>Login with your phone number</Text>
            <View style={styles.phoneInputContainer}>
                <Text style={styles.phoneInputText}>+998</Text>
                <TextInput
                    onChangeText={onChangeTextHandler}
                    keyboardType="phone-pad"
                    style={styles.phoneInput}
                    placeholder="(xx) xxx-xx-xx"
                    value={phoneNumber}
                    maxLength={14}
                />
            </View>

            <Pressable
                onPress={sendVerification}
                style={[
                    styles.sendCodeButton,
                    {
                        backgroundColor:
                            phoneNumber.length < 14 ? "#CCCCCC" : "#DC37AD",
                    },
                ]}
            >
                <Text style={styles.sendCodeText}>Send verification</Text>
            </Pressable>
        </View>
    );
};

export default PhoneNumberVerify;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8FF",
        alignItems: "center",
        justifyContent: "center",
    },
    phoneInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 50,
        paddingHorizontal: 12,
        width: "80%",
    },
    phoneInputText: {
        fontSize: 16,
    },
    phoneInput: {
        height: 50,
        paddingHorizontal: 4,
        fontSize: 16,
    },
    sendCodeButton: {
        justifyContent: "center",
        borderRadius: 50,
        width: "80%",
        height: 46,
        margin: 10,
    },
    sendCodeText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
    },
});
