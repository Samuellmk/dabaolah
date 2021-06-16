import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableHighlight,
} from "react-native";

import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

import { Ionicons } from "@expo/vector-icons";

export default function NearMe() {
  const [text, onChangeText] = useState("");
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    heading: 0,
    speed: 0,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState("");
  const [currentCoords, setCurrentCoords] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setLocation(location);

      setCurrentCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      console.log(location);
      if (currentCoords !== null) {
        const readOnlyAddress = await Location.reverseGeocodeAsync(
          currentCoords
        );
        setAddress(readOnlyAddress[0]);
        if (address.street != null) {
          onChangeText(address.street);
        } else {
          onChangeText("");
        }
        console.log("My Street", { text });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 1.3551,
          longitude: 103.6843,
          latitudeDelta: 0,
          longitudeDelta: 0,
          zoom: 13,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        customMapStyle={mapStyle}
        style={styles.map}
        showsIndoors={false}
        showsBuildings={false}
        showsIndoorLevelPicker={false}
      >
        <Marker coordinate={location.coords} />
      </MapView>
      <Callout>
        <View style={styles.input}>
          <View style={{ flex: 10 }}>
            <TextInput
              style={{ backgroundColor: "transparent" }}
              onChangeText={onChangeText}
              value={text}
              placeholder="Enter your address"
              clearButtonMode="while-editing"
              dataDetectorTypes="address"
              onSubmitEditing={() => this.myFunction()}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableHighlight
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                this._fetchResults();
              }}
              underlayColor="transparent"
            >
              <Ionicons name="send" size={24} color="grey" />
            </TouchableHighlight>
          </View>
        </View>
      </Callout>
    </View>
  );
}

function submit() {
  console.log("Submited");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 80,
  },
  input: {
    flexDirection: "row",
    height: 50,
    width: 0.8 * Dimensions.get("window").width,
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 0.1 * Dimensions.get("window").height,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
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
