import { StatusBar } from "expo-status-bar";
import SkeletonContent from 'react-native-skeleton-content';
import React, { useState, useEffect , Component} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
// import { Card } from 'react-native-paper';

// DEBUG TO DO:
// 1. DEBUG ANIMATION OF SKELETON LOADING??

// TO DO:
// 1. combine 'big words' with pics to be 'newly added'
// 2. combine 'some other words here' with pics to be descriptions and walking times


const firstLayout = [
  {
    width: 250,
    height: 140,
    borderRadius: 20,
    marginRight: 20,
    marginTop: 20,
  },
  // {
  //   flexDirection: 'column',
  //   marginRight: 10,
  //   children: [
  //     {
  //       width: "100%",
  //       height: "50%",
  //       marginBottom: 10
  //     },
  //     {
  //       width: "50%",
  //       height: "20%",
  //       marginBottom: 10
  //     },
  //     {
  //       width: 100,
  //       height: 20
  //     }
  //   ]
  // },
];
const secondLayout = [
  {
    width: 240,
    height: "20%",
    marginBottom: 20,
  },
  // {
  //   width: "100%",
  //   height: 60,
  // }
];
const thirdLayout = [
  {
    width: 220,
    height: 20,
    marginBottom: 8
  },
  {
    width: 180,
    height: 20,
  },
];

const INTERVAL_REFRESH = 2000;


export default function() {
    const [isLoading, setIsLoading] = useState(true);
  
    // should load only after db fetches data?
    useEffect(() => {
        if(!isLoading){
           const timeoutId = setTimeout(() => setIsLoading(true), INTERVAL_REFRESH);
           return () => clearTimeout(timeoutId);
        }
        else{
          const timeoutId = setTimeout(() => setIsLoading(false), INTERVAL_REFRESH);
          return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);
  
      return (
        <View style={styles.container}>
          {/* <Card style={styles.card}> */}
            <SkeletonContent
              containerStyle={styles.titleContainer}
              layout={secondLayout}
              isLoading={isLoading}>
              <Text style={styles.bigText}>big words</Text>
              {/* <Text style={[styles.normalText, { marginTop: 20}]}>
                words below big words
              </Text> */}
            </SkeletonContent>
            
            <SkeletonContent
              containerStyle={styles.top}
              layout={firstLayout}
              isLoading={isLoading}
              >
              <View style = {imageContainerStyle.imageContainer}>
                <View style = {imageContainerStyle.rowContainer}>
                  {/* <View style={styles.imageContainer}> */}
                    <Image
                      source={require('./193756610_10225806831827515_3314437409129576622_n.jpg')}
                      style={styles.image}
                    />
                  {/* </View> */}
                  {/* <View style={styles.imageContainer}> */}
                    <Image
                      source={require('./193756610_10225806831827515_3314437409129576622_n.jpg')}
                      style={styles.image}
                    />
                  {/* </View> */}
                    <Image
                        source={require('./193756610_10225806831827515_3314437409129576622_n.jpg')}
                        style={styles.image}
                      />
                    <Image
                      source={require('./193756610_10225806831827515_3314437409129576622_n.jpg')}
                      style={styles.image}
                    />
                </View>
              </View>
              {/* <View style={styles.nested}>
                  <Text style={styles.normalText}>Nested 1</Text>
                  <Text style={styles.normalText}>Nested 2</Text>
                  <Text style={styles.normalText}>Nested 3</Text>
              </View> */}
            </SkeletonContent>
  
            <SkeletonContent
              layout={thirdLayout}
              containerStyle={styles.descContainer}
              isLoading={isLoading}>
              <Text style={styles.normalText}>
                some other words here
              </Text>
            </SkeletonContent>
          {/* </Card> */}
        </View>
      );
    }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  image: {
    resizeMode: 'contain', // i honestly dk what this does
    width: 50,
    height: 90,
    padding: 60, //why is this resizing the images??? NANI???????!?!?!?!!
  },
  titleContainer: {
    width: 300,
    padding: 20,
    justifyContent: 'flex-start',
    flex: 2,
  },
  descContainer: {
    width: 300,
    padding: 20,
    flex: 1,
  },
  top: {
    width: 300,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  normalText: {
    fontSize: 18,
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  // card: {
  //   height: 400,
  //   width: 300,
  //   borderRadius: 10,
  //   backgroundColor: '#fff',
  // },
  // nested: {
  //   flexDirection: 'column',
  //   marginRight: 20
  // }
});

const imageContainerStyle = StyleSheet.create({
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: "row",
    // flex: 1,
  },
})

