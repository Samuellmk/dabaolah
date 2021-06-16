// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
// import { createStackNavigator } from "@react-navigation/stack"
// import { FlatList } from "react-native-gesture-handler";
// import * as SQLite from "expo-sqlite"
// import { useEffect } from "react/cjs/react.production.min";
// import firebase from "./database/firestoreDB"

// const localDB = SQLite.openDatabase("savedStalls.db")
// const db = firebase.firestore()
// const stallsRef = db.collection('stores')
// const locationsRef = db.collection('locations')
// const cuisinesRef = db.collection('cuisines')

// // TODO retrieve more info from firestore using name of stall
// // const savedStallsObj = savedStallsList.map((stall) => {
// //   return {
// //     name: stall,
// //   };
// // });


// function SavedScreenLoading() {
//   let [savedStalls, setSavedStalls] = useState([]);
//   let [savedStallsInfo, setSavedStallsInfo] = useState([])

//   // put loading skeleton screen here


//   function retrieveData() {
//     db.transaction((tx) => {
//       tx.executeSql(
//       "SELECT * FROM savedStalls",
//       null,
//       (txObj, { rows: { _array } }) => setSavedStalls(_array),
//       (txObj, error) => console.error("Error ", error)
//       );
//     });
    
//     for (stall of savedStalls) {
//       const snapshot = await stallsRef.where('storeName', '==', stall.storeName).get();
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
//     db.transaction((tx) => {
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
//   // let [stallArray, setStallArray] = useState(savedStallsObj);
//   let [stallArray, setStallArray] = useState([
//     { storeName: 'xiang xiang', location: 'bedok', cuisine: 'chinese, taiwanese', picture1: 'pic1' },
//     { storeName: 'so pho', location: 'plaza sing', cuisine: 'vietnamese', picture1: 'pic1' }
//   ]);

//   useEffect(() => {
//     navigation.setOptions({
//       headerBottom: () => (
//         // filter buttons here
//         <Text>
//           insert filter buttons here
//         </Text>
//       ),
//     });
//   });

//   // filter function?
//   // unsave function?

//   // dk whether to put const or function
//   const renderStall = ({ stall }) => {
//     return (
//       // TODO some styling/layout to organise all the info to render
//       // maybe can put this into a component (if got time)
//       <View>
//         <Text>{stall.name}</Text>
//         <Text>{stall.location}</Text>
//         {/* save icon */}
//       </View>

//     );
//   };

//   return (
//     // TODO layout of saved list of stores
//     // should 'call' the StallInfo() function on press of one of the stores, and
//     // pass in the doc name (ID) of the store so can retrieve other info in StallInfo()
//     // load the screen using onPress={() => navigation.navigate({nameOfStall(CHANGETHIS)})}
//     <View>
//       <FlatList
//         data={stallArray}
//         renderItem={renderStall}
//         keyExtractor={(stall) => stall.name}
//       />
//     </View>
//     // <View style={styles.container}>
//     //   <Text>Saved!</Text>
//     // </View>
//   );
// }


// stall info screen (after clicking on a stall in the list)
// function StallInfo() {
//   return (
//     // TODO layout of stall info screen
//   )
// }


// const Stack = createStackNavigator;

// export default function SavedStack() {
//   return (
//     // TODO filter buttons and their effects
//     <Stack.Navigator>
//       <Stack.Screen name='Saved Hawkers - Loading' component={SavedScreenLoading} />
//       <Stack.Screen name='Saved Hawkers' component={SavedScreenLoaded} />
//       <Stack.Screen name={nameOfStall(CHANGETHIS)} component={StallInfo} /> //TODO change the name of stall
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
// });
