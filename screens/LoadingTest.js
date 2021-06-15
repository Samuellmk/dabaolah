import { StatusBar } from "expo-status-bar";
import SkeletonContent from "react-native-skeleton-content";
import React, { useState, useEffect, Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
// import { Card } from 'react-native-paper';


const firstLayout = [
  {
    width: 250,
    height: 140,
    borderRadius: 20,
    marginRight: 20,
    marginTop: 20,
  },
];
const secondLayout = [
  {
    width: 240,
    height: "20%",
    // marginBottom: 20,
    borderRadius: 15
  },
];
const thirdLayout = [
  {
    width: 220,
    height: 20,
    marginBottom: 8,
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
            </SkeletonContent>
            
            <SkeletonContent
              containerStyle={styles.top}
              layout={firstLayout}
              isLoading={isLoading}>
              <View style = {imageContainerStyle.imageContainer}>
                <View style = {imageContainerStyle.rowContainer}>
                    <Image
                      source={require('./sample_pic.jpg')}
                      style={styles.image}/>
                    <Image
                      source={require('./sample_pic.jpg')}
                      style={styles.image}/>
                    <Image
                        source={require('./sample_pic.jpg')}
                        style={styles.image}/>
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
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  image: {
    resizeMode: "contain",
    width: 50,
    height: 50, // width and height values don't matter here?
    padding: 60, // higher padding is larger image and smaller border (for some reason)
    marginHorizontal: 10,
  },
  titleContainer: {
    width: 300,
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  descContainer: {
    width: 300,
    padding: 20,
    flex: 1,
  },
  top: {
    width: 300,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  bigText: {
    fontWeight: "bold",
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
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    // flex: 1,
  },
});
