import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { createStackNavigator } from "@react-navigation/stack"
import { FlatList } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite"
import { useEffect } from "react/cjs/react.production.min";
import firebase from "../database/firestoreDB"

const localDB = SQLite.openDatabase("savedStalls.db")
const db = firebase.firestore()
const stallsRef = db.collection('stores')
const locationsRef = db.collection('locations')
const cuisinesRef = db.collection('cuisines')


// function SavedScreenLoading() {
//   let [savedStalls, setSavedStalls] = useState([]);
//   let [savedStallsInfo, setSavedStallsInfo] = useState([])

//   // put loading skeleton screen here


//   // async function retrieveData() {
//   const retrieveData = async function() {
//     localDB.transaction((tx) => {
//       tx.executeSql(
//       "SELECT * FROM savedStalls",
//       null,
//       (txObj, { rows: { _array } }) => setSavedStalls(_array),
//       (txObj, error) => console.error("Error ", error)
//       );
//     });
    
//     for (stall of savedStalls) {
//       const snapshot = db.collection('stores').where('storeName', '==', stall.storeName).get();
//       if (snapshot.empty) {
//         console.log('No matching stalls.');
//         return;
//       }
//       snapshot.forEach(doc => {
//         setSavedStallsInfo([
//           ...savedStallsInfo,
//           {
//             storeName: doc.storeName,
//             location: doc.location, // NOTE: this location is the number, not the actual location
//             cuisine: doc.cuisine, // NOTE: this cuisine is the number, not the actual cuisine
//             pic1: doc.picture1,
//             pic2: doc.picture2,
//             pic3: doc.picture3
//           },
//         ]);
//       });
//     };
//   };

//   // DB stuff
//   useEffect(() => {
//     localDB.transaction((tx) => {
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS
//         savedStalls
//         (storeName TEXT PRIMARY KEY,
//           location TEXT);`
//       );
//     }, null, retrieveData);
//   }, []);

//   // navigate to savedScreenLoaded when retrieveData() function is done
// }


// function SavedScreenLoaded() {
//   let [savedStalls, setSavedStalls] = useState(["Say Seng Famous Tau Kwa Pau", "Original Famous Penang Laksa"]);
//   let [savedStallsInfo, setSavedStallsInfo] = useState([])

  // let [stallArray, setStallArray] = useState([
  //   { storeName: 'xiang xiang', location: 'bedok', cuisine: 'chinese, taiwanese', picture1: "https://scontent.fsin9-1.fna.fbcdn.net/v/t39.30808-6/cp0/e15/q65/p720x720/201904060_548937682768053_8486622696023999788_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=b9115d&_nc_ohc=Uy89MyKrzVoAX8gzYuj&_nc_ht=scontent.fsin9-1.fna&tp=3&oh=e7670819e3a707b832f9feb9f0139688&oe=60EFB53F" },
  //   { storeName: 'so pho', location: 'plaza sing', cuisine: 'vietnamese', picture1: "https://scontent.fsin9-1.fna.fbcdn.net/v/t39.30808-6/cp0/e15/q65/p720x720/201904060_548937682768053_8486622696023999788_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=b9115d&_nc_ohc=Uy89MyKrzVoAX8gzYuj&_nc_ht=scontent.fsin9-1.fna&tp=3&oh=e7670819e3a707b832f9feb9f0139688&oe=60EFB53F" }
  // ]);

  //// for filtering
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerBottom: () => (
  //       // filter buttons here
  //       <Text>
  //         insert filter buttons here
  //       </Text>
  //     ),
  //   });
  // });

  // filter function?
  // unsave function?

  // // dk whether to put const or function
  // const renderStall = ({ stall }) => {
  //   return (
  //     // TODO some styling/layout to organise all the info to render
  //     // maybe can put this into a component (if got time)
  //     <View>
  //       <Text>{stall.name}</Text>
  //       <Text>{stall.location}</Text>
  //       {/* save icon */}
  //     </View>

  //   );
  // };

//   const ListItem = ({ item }) => {
//     return (
//       <View style={styles.item}>
//         <Image
//           source={{ uri: item.picture1 }}
//           style={styles.itemPhoto}
//           resizeMode="cover"
//         />
//         <View style={styles.itemTextContainer}>
//           <Text style={styles.itemText} numberOfLines={2}>{item.storeName}</Text>
//           <View style={styles.itemTextContainer2}>
//             <FontAwesome5 style={{ margin: 3 }} name="walking" size={16} color="#363636" />
//             {/* <Text style={styles.itemText2}>{item.walkingTime} ∙ {item.distance}</Text> */}
//             <Text style={styles.itemText2}>~10 mins ∙ 2.5km</Text>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   async function retrieveData() {
//     localDB.transaction((tx) => {
//       tx.executeSql(
//         "SELECT * FROM savedStalls",
//         null,
//         (txObj, { rows: { _array } }) => setSavedStalls([...savedStalls, _array]),
//         (txObj, error) => console.error("Error ", error)
//       );
//     });

//     for (stall of savedStalls) {
//       const snapshot = stallsRef.where('storeName', '==', stall.storeName).get();
//       if (snapshot.empty) {
//         console.log('No matching stalls.');
//         return;
//       }
//       snapshot.forEach(doc => {
//         setSavedStallsInfo([
//           ...savedStallsInfo,
//           {
//             storeName: doc.storeName,
//             location: doc.location, // NOTE: this location is the number, not the actual location
//             cuisine: doc.cuisine, // NOTE: this cuisine is the number, not the actual cuisine
//             pic1: doc.picture1,
//             pic2: doc.picture2,
//             pic3: doc.picture3
//           },
//         ]);
//       });
//     };
//   };

//   useEffect(() => {
//     localDB.transaction((tx) => {
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS
//         savedStalls
//         (storeName TEXT PRIMARY KEY,
//           location TEXT);`
//       );
//     }, null, retrieveData);
//   }, []);

//   return (
//     // TODO layout of saved list of stores
//     // should 'call' the StallInfo() function on press of one of the stores, and
//     // pass in the doc name (ID) of the store so can retrieve other info in StallInfo()
//     // load the screen using onPress={() => navigation.navigate({nameOfStall(CHANGETHIS)})}
//     <View>
//       <FlatList
//         data={savedStallsInfo}
//         // renderItem={renderStall}
//         renderItem={({ item }) => <ListItem item={item} />}
//         keyExtractor={(stall) => stall.storeName}
//       />
//     </View>
//     // <View style={styles.container}>
//     //   <Text>Saved!</Text>
//     // </View>
//   );
// }


// // stall info screen (after clicking on a stall in the list)
// // function StallInfo() {
// //   return (
// //     // TODO layout of stall info screen
// //   )
// // }


// const Stack = createStackNavigator;

export default function SavedStack() {
  return(<Text style={{margin: 100}}>Saved!</Text>)
}
//   return (
//     // TODO filter buttons and their effects
//     <Stack.Navigator>
//       {/* <Stack.Screen name='Saved Hawkers - Loading' component={SavedScreenLoading} /> */}
//       <Stack.Screen name='Saved Hawkers' component={SavedScreenLoaded} />
//       {/* <Stack.Screen name={nameOfStall(CHANGETHIS)} component={StallInfo} /> */}
//       {/* TODO change the name of stall */}
//     </Stack.Navigator>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerStyle: {
//     flex: 0.2,
//     backgroundColor: "#FE8B33",
//     borderBottomRightRadius: 15,
//     borderBottomLeftRadius: 15,
//     flexDirection: "row",
//     // transform: [{ translateY: -35 }]
//     // marginBottom: 10,
//   },
//   backArrow: {
//     marginLeft: 10,
//     marginTop: 35,
//     fontSize: 30,
//   },
//   headerText: {
//     fontSize: 30,
//     fontWeight: "bold",
//     marginTop: 35,
//     marginLeft: 7,
//     color: "#2b2b2b"
//   },
//   // container: {
//   //   flex: 1,
//   //   backgroundColor: 'white',
//   // },
//   sectionHeader: {
//     fontWeight: '800',
//     fontSize: 25,
//     color: '#363636',
//     marginTop: 20,
//     marginBottom: 5,
//     marginLeft: 18,
//   },
//   item: {
//     // margin: 10,
//     marginLeft: 20,
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   itemPhoto: {
//     width: 140,
//     height: 140,
//   },
//   itemTextContainer: {
//     height: 60,
//     width: 140,
//   },
//   itemTextContainer2: {
//     flexDirection: "row",
//   },
//   itemText: {
//     color: '#363636',
//     marginTop: 5,
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   itemText2: {
//     color: "#5c5c5c",
//     marginTop: 5,
//   },
// });