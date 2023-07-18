import React, { useState } from "react";
import { View, Button } from "react-native";
import { WebView } from "react-native-webview";
import { Asset } from "expo-asset";
import { useAssets } from "expo-asset";
import { readAsStringAsync } from 'expo-file-system';
import { Linking } from "react-native";


const Map = () => {
    //const [location, setLocation] = useState(null);
    const [index, indexLoadingError] = useAssets(require("../assets/map.html"));
    const mapHtml = Asset.fromModule(require("../assets/map.html")).uri;
    const [html, setHtml] = useState("");

    if (index) {
        readAsStringAsync(index[0].localUri).then((data) => {
            setHtml(data);
        });
    }

    const deepLink = async (fromLatLng, toLatLng) => {
      try {
        //Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${fromLatLng.lat},${fromLatLng.lng}&destination=${toLatLng.lat},${toLatLng.lng}&travelmode=driving`);
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${toLatLng.lat},${toLatLng.lng}&travelmode=driving`);

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
          }
        }
      };
    
    return (
        <View style={{ flex: 1 }}>

            <WebView
                onLoad={() => {}}
                source={{ html }}
                onMessage={onMessage}
            />
        </View>
    );
}

export default Map;
