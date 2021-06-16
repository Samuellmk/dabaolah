import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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

export default function Details() {
        return (
            <View style={styles.container}>
              <Text style={styles.title}>Xiang Xiang Traditional Taiwanese Cuisine</Text>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
              {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
              <Image style={styles.image} source={require("./sample_pic.jpg")}/>
              <View style={{flexDirection:"row"}}>
                <MaterialIcons name="location-on" size={24} color="black" />
                <Text style={styles.address}>860 River Valley Road</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <FontAwesome5 name="walking" size={24} color="black" />
                <Text style={styles.walkingDist}>Walking Time: 10min</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Ionicons name="ios-call" size={24} color="black" />
                <Text style={styles.contact}>Contact Details: 92837167</Text>
              </View>
            </View>
          );
      }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "white"
  },
  title: {
    // flex: 0.3,
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 100,
    textAlign: "center"
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
  }

});