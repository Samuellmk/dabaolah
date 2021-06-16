import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';

// restaurantName = [""]
const SECTIONS =[
  {
    title: 'Newly Added',
    status: 'New',
    data:[
      {
        key: '1',
        text: 'Xiang Xiang Taiwanese Cuisine',
        walkingTime: '~10minutes',
        distance: '2.5km',
        uri: 'assets/images/favicon.png'
      }
    ]
  }
]

export default function Details() {
  for (let i=0; i<SECTIONS.length; i++){
    for (let j=0; j<SECTIONS[i].data.length;j++){
      if (SECTIONS[i].data[j].key=='1'){
        return (
            <View style={styles.container}>
              <Text style={styles.title}>{SECTIONS[i].data[j].text}</Text>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
              {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
              <Image source={SECTIONS[i].data[j].uri}/>
              <Text>Distance={SECTIONS[i].data[j].distance}, {SECTIONS[i].data[j].walkingTime} by foot</Text>
            </View>
          );
      }
    }
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 100
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});