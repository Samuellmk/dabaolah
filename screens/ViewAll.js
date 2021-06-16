// import { StatusBar } from "expo-status-bar";
// import React, { useState, useEffect, Component } from "react";
// import { Text, View, StyleSheet, Image } from "react-native";
// import SkeletonContent from "react-native-skeleton-content";
// import Constants from "expo-constants";
// // import { Card } from 'react-native-paper';

// // TO DO:
// // header [DONE]
// // bubble filters  --- npm install --save react-native-scrolling-button-menu
// // nav tabs (incoporate back)
// // button touchable opacity
// // ... if word length exceeds container width
// // divider don't appear below , maybe can do on top of each section then hide with header
// // 


// const firstLayout = [
//   {
//     width: 250,
//     height: 140,
//     borderRadius: 20,
//     marginRight: 20,
//     marginTop: 20,
//   },
//   // {
//   //   flexDirection: 'column',
//   //   marginRight: 10,
//   //   children: [
//   //     {
//   //       width: "100%",
//   //       height: "50%",
//   //       marginBottom: 10
//   //     },
//   //     {
//   //       width: "50%",
//   //       height: "20%",
//   //       marginBottom: 10
//   //     },
//   //     {
//   //       width: 100,
//   //       height: 20
//   //     }
//   //   ]
//   // },
// ];
// const secondLayout = [
//   {
//     width: 240,
//     height: "20%",
//     // marginBottom: 20,
//     borderRadius: 15
//   },
// ];
// const thirdLayout = [
//   {
//     width: 220,
//     height: 20,
//     marginBottom: 8,
//   },
//   {
//     width: 180,
//     height: 20,
//   },
// ];

// const INTERVAL_REFRESH = 2000;

// export default function() {
//     const [isLoading, setIsLoading] = useState(true);
  
//     // should load only after db fetches data?
//     useEffect(() => {
//         if(!isLoading){
//            const timeoutId = setTimeout(() => setIsLoading(true), INTERVAL_REFRESH);
//            return () => clearTimeout(timeoutId);
//         }
//         else{
//           const timeoutId = setTimeout(() => setIsLoading(false), INTERVAL_REFRESH);
//           return () => clearTimeout(timeoutId);
//         }
//     }, [isLoading]);
  
//       return (
//         <View style={styles.container}>
//           {/* <Card style={styles.card}> */}
//             <SkeletonContent
//               containerStyle={styles.titleContainer}
//               layout={secondLayout}
//               isLoading={isLoading}>
//               <Text style={styles.bigText}>big words</Text>
//             </SkeletonContent>
            
//             <SkeletonContent
//               containerStyle={styles.top}
//               layout={firstLayout}
//               isLoading={isLoading}>
//               <View style = {imageContainerStyle.imageContainer}>
//                 <View style = {imageContainerStyle.rowContainer}>
//                     <Image
//                       source={require('./sample_pic.jpg')}
//                       style={styles.image}/>
//                     <Image
//                       source={require('./sample_pic.jpg')}
//                       style={styles.image}/>
//                     <Image
//                         source={require('./sample_pic.jpg')}
//                         style={styles.image}/>
//                 </View>
//               </View>
//               {/* <View style={styles.nested}>
//                   <Text style={styles.normalText}>Nested 1</Text>
//                   <Text style={styles.normalText}>Nested 2</Text>
//                   <Text style={styles.normalText}>Nested 3</Text>
//               </View> */}
//             </SkeletonContent>
  
//             <SkeletonContent
//               layout={thirdLayout}
//               containerStyle={styles.descContainer}
//               isLoading={isLoading}>
//               <Text style={styles.normalText}>
//                 some other words here
//               </Text>
//             </SkeletonContent>
//           {/* </Card> */}
//         </View>
//       );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: "#ecf0f1",
//   },
//   image: {
//     resizeMode: "contain",
//     width: 50,
//     height: 50, // width and height values don't matter here?
//     padding: 60, // higher padding is larger image and smaller border (for some reason)
//     marginHorizontal: 10,
//   },
//   titleContainer: {
//     width: 300,
//     padding: 20,
//     justifyContent: "center",
//     flex: 1,
//   },
//   descContainer: {
//     width: 300,
//     padding: 20,
//     flex: 1,
//   },
//   top: {
//     width: 300,
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 20,
//   },
//   bigText: {
//     fontWeight: "bold",
//     fontSize: 28,
//   },
//   // card: {
//   //   height: 400,
//   //   width: 300,
//   //   borderRadius: 10,
//   //   backgroundColor: '#fff',
//   // },
//   // nested: {
//   //   flexDirection: 'column',
//   //   marginRight: 20
//   // }
// });

// const imageContainerStyle = StyleSheet.create({
//   imageContainer: {
//     width: 45,
//     height: 45,
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
//   rowContainer: {
//     flexDirection: "row",
//     // flex: 1,
//   },
// });

import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, SectionList, SafeAreaView, Image, FlatList, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import firebase from "../database/firestoreDB";
// import ScrollingButtonMenu from 'react-native-scrolling-button-menu';

const db = firebase.firestore()
const stallsRef = db.collection('stores')
const locationsRef = db.collection('locations')
const cuisinesRef = db.collection('cuisines')

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image
        source={require("./sample_pic.jpg")} // this needs to change to variable item.uri instead to generate different images
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemText}>{item.text}</Text>
        <View style={styles.itemTextContainer2}>
          <FontAwesome5 style={{margin:3}} name="walking" size={16} color="#363636" />
          <Text style={styles.itemText2}>{item.walkingTime} ∙ {item.distance}</Text>
        </View>
      </View>
    </View>
  );
};

export default () => {
  return (
    <>
      <View style={styles.headerStyle}>
        <Ionicons name="chevron-back" size={24} color="black" style={styles.backArrow}/>
        <Text style={styles.headerText}>All Hawkers</Text>
      </View>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <SafeAreaView style={{ flex: 1 }}>
          <SectionList
            // contentContainerStyle={{ paddingHorizontal:0 }}
            stickySectionHeadersEnabled={false}
            sections={SECTIONS}
            renderSectionHeader={({ section }) => (
              <>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item }) => <ListItem item={item} />}
                showsHorizontalScrollIndicator={false}
              />
              <Divider 
                style={{marginTop: 10}}
                color="#ebebeb"
                width={7} 
                orientation="horizontal" 
              />
              </>
            )}
            renderItem={({ item, section }) => {
              return null;
            }}
          />
        </SafeAreaView>
      </View>
    </>
  );
};

const SECTIONS = [
  {
    title: 'Newly Added',
    data: [
      {
        key: '1',
        text: 'Xiang Xiang Traditional Taiwanese Cuisine',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
        uri: './sample_pic.jpg', // this doesn't work... (like when i input item.uri as a variable into the image source)
      },
      {
        key: '2',
        text: 'Item text 2',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
        uri: 'https://picsum.photos/id/10/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
        uri: 'https://picsum.photos/id/1002/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
        uri: 'https://picsum.photos/id/1006/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
        uri: 'https://picsum.photos/id/1008/200',
      },
    ],
  },
  {
    title: 'Our Picks',
    data: [
      {
        key: '1',
        text: 'Xiang Xiang Traditional Taiwanese Cuisine',
        uri: 'https://picsum.photos/id/1011/200',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1012/200',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1013/200',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1015/200',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1016/200',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
      },
    ],
  },
  {
    title: 'Chinese Food',
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1020/200',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1024/200',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1027/200',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1035/200',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1038/200',
        walkingTime: '~ 10 mins',
        distance: '2.5 km',
      },
    ],
  },
];

const styles = StyleSheet.create({
  headerStyle: {
    flex: 0.2,
    backgroundColor:"#FE8B33", 
    borderBottomRightRadius: 15, 
    borderBottomLeftRadius: 15,
    flexDirection: "row",
    // transform: [{ translateY: -35 }]
    // marginBottom: 10,
  },
  backArrow: {
    marginLeft: 10, 
    marginTop: 35,
    fontSize: 30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 35,
    marginLeft: 7,
    color: "#2b2b2b"
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 25,
    color: '#363636',
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 18,
  },
  item: {
    // margin: 10,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  itemPhoto: {
    width: 140,
    height: 140,
  },
  itemTextContainer: {
    height: 60,
    width: 140,
  },
  itemTextContainer2: {
    flexDirection: "row",
  },
  itemText: {
    color: '#363636',
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  itemText2: {
    color: "#5c5c5c",
    marginTop: 5,
  },
});