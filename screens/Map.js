import React, { useState, useRef } from "react";
import { View, Button } from "react-native";
import { WebView } from "react-native-webview";
import { Asset, useAssets } from "expo-asset";
import { readAsStringAsync } from 'expo-file-system';
import { Linking } from "react-native";
import * as Location from 'expo-location';


const Map = () => {
    //const [location, setLocation] = useState(null);
    const webViewRef = useRef(null);
    const [index, indexLoadingError] = useAssets(require("../assets/map.html"));
    const mapHtml = Asset.fromModule(require("../assets/map.html")).uri;
    const [html, setHtml] = useState("");

    if (index) {
        readAsStringAsync(index[0].localUri).then((data) => {
            setHtml(data);
        });
    }

    async function getLocationAsync() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      return location.coords;
    }

    const deepLink = async (fromLatLng, toLatLng) => {
      try {
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${fromLatLng.lat},${fromLatLng.lng}&destination=${toLatLng.lat},${toLatLng.lng}&travelmode=driving`);
        //Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${toLatLng.lat},${toLatLng.lng}&travelmode=driving`);

      } catch (error) {
        console.error(error);
      }
    };

    const onMessage = (payload) => {

      let data = JSON.parse(payload.nativeEvent.data);
        if(data.type === "log")
        {
          console.log(data.message);
        } 
        else if(data.type === "command"){
          if(data.command === "deepLink")
          {
            let fromLatLng = data.fromLatLng;
            let toLatLng = data.toLatLng;
            deepLink(fromLatLng, toLatLng);
          }else if(data.command === "getLocation")
          {
            const promise = getLocationAsync();
            promise.then((coords)=> {
              const {latitude, longitude} = coords;
              console.log("data", latitude, longitude);
              const message = {type: "coords", data: coords}
              webViewRef.current.injectJavaScript(`postMessageToWebview(${JSON.stringify(message)})`); 
            })
                     
          }
        }
      };
    
    return (
        <View style={{ flex: 1 }}>

            <WebView
                ref={webViewRef}
                onLoad={() => {}}
                source={{ html }}
                onMessage={onMessage}
            />
        </View>
    );
}

export default Map;
