import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

export default function NearMe() {
  const [text, onChangeText] = useState("");
  const [location, setLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  })();
  let msg = "Waiting..";
  if (errorMsg) {
    msg = errorMsg;
  } else if (location) {
    msg = JSON.stringify(location);
  }

  console.log("My location:", msg);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 1.3551,
          longitude: 103.6848,
          latitudeDelta: 0,
          longitudeDelta: 0,
          zoom: 13,
        }}
        showsMyLocationButton={true}
        customMapStyle={mapStyle}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height - 80,
        }}
      >
        <Marker coordinate={location.coords} />
      </MapView>
      <Callout>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter your address"
        />
      </Callout>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  map: {},
  input: {
    height: 50,
    width: 0.8 * Dimensions.get("window").width,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 0.1 * Dimensions.get("window").height,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.5, // IOS
    shadowRadius: 1, //IOS
    fontSize: 20,
  },
  roundbutton: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: "white",
    position: "absolute",
    top: 0.82 * Dimensions.get("window").height,
    left: 0.7 * Dimensions.get("window").width,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.5, // IOS
    shadowRadius: 1, //IOS
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStyle = [
  { stylers: [{ visibility: "off" }] },
  { featureType: "water", stylers: [{ visibility: "on" }] },
  { featureType: "poi", stylers: [{ visibility: "on" }] },
  { featureType: "transit", stylers: [{ visibility: "on" }] },
  { featureType: "landscape", stylers: [{ visibility: "on" }] },
  { featureType: "road", stylers: [{ visibility: "on" }] },
  { featureType: "administrative", stylers: [{ visibility: "on" }] },
  /* followed by your style if you have specific styles
    , otherwise remove the last comma */
];
