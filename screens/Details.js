import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';

// restaurantName = [""]
// const SECTIONS =[
//   {
//     title: 'Newly Added',
//     status: 'New',
//     data:[
//       {
//         key: '1',
//         text: 'Xiang Xiang Taiwanese Cuisine',
//         walkingTime: '~10minutes',
//         distance: '2.5km',
//         uri: 'assets/images/favicon.png'
//       }
//     ]
//   }
// ]

export default function Details({ route, navigation }) {
  const { item } = route.params;
  console.log(item);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="chevron-back"
          size={24}
          color="black"
          style={styles.backArrow}
          resizeMode="center"
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>{item.storeName}</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Image style={styles.image} source={{ uri: item.picture1 }} />
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons name="location-on" size={30} color="black" />
          <Text style={styles.address}>{item.address}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5 name="walking" size={24} color="black" />
          <Text style={styles.walkingDist}>
            Walking Time: {item.duration == null ? "20mins" : item.duration}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="ios-call" size={24} color="black" />
          <Text style={styles.contact}>Contact Details: -</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
  },
  title: {
    // flex: 0.3,
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 50,
    marginRight: 50,
    textAlign: "center",
  },
  image: {
    marginTop: 30,
    width: "80%",
    height: "40%",
    borderRadius: 20,
    marginBottom: 40,
  },
  address: {
    fontSize: 25,
    marginLeft: 15,
    marginBottom: 20,
  },
  walkingDist: {
    fontSize: 20,
    marginLeft: 15,
    marginBottom: 20,
  },
  contact: {
    fontSize: 20,
    marginLeft: 15,
    marginBottom: 20,
  },
  backArrow: {
    marginLeft: 20,
    marginTop: 75,
    fontSize: 30,
    backgroundColor: "white",
  },
});
