import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SelectLanguage from "./screens/SelectLanguage";
import PhoneNumberVerify from "./screens/PhoneNumberVerify";
import CodeVerify from "./screens/CodeVerify";
import SignUp from "./screens/SignUp";
import EditProfile from "./screens/EditProfile";
import Main from "./screens/Main";


const Stack = createNativeStackNavigator();

export default function App() {
    return (
       
            <NavigationContainer>
                <Stack.Navigator initialRouteName="selectLanguage" screenOptions={{headerStyle: {backgroundColor: "#F8F8FF"}}}>
                    <Stack.Screen name="selectLanguage" component={SelectLanguage} options={{title: "Select Language"}}/>
                    <Stack.Screen name="phoneNumberVerify" component={PhoneNumberVerify} options={{title: "Login"}} />
                    <Stack.Screen name="codeVerify" component={CodeVerify} options={{title: "Verify Code"}} />
                    <Stack.Screen name="signUp" component={SignUp} options={{title: "Sign Up"}} />
                    <Stack.Screen name="editProfile" component={EditProfile} options={{title: "Edit Profile"}} />
                    <Stack.Screen name="main" component={Main} options={{title: "Main Page"}} />
                </Stack.Navigator>
            </NavigationContainer>
    );
}


