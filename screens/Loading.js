import { StatusBar } from "expo-status-bar";
import SkeletonContent from 'react-native-skeleton-content';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

const firstLayout = [
  {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  {
    flexDirection: 'column',
    marginRight: 10,
    children: [
      {
        width: "100%",
        height: "50%",
        marginBottom: 10
      },
      {
        width: "50%",
        height: "20%",
        marginBottom: 10
      },
      {
        width: 100,
        height: 20
      }
    ]
  },
];
const secondLayout = [
  {
    width: 240,
    height: "20%",
    marginBottom: 20,
  },
  {
    width: "100%",
    height: 60,
  }
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

const INTERVAL_REFRESH = 3000;

export default function() {
    const [isLoading, setIsLoading] = useState(true);
  
    // only for demo purposes
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
          <Card style={styles.card}>
            <SkeletonContent
              containerStyle={styles.top}
              layout={firstLayout}
              isLoading={isLoading}>
              <View style={styles.imageContainer}>
                <Image
                  source={{uri:"https://en.meming.world/images/en/thumb/2/2c/Surprised_Pikachu_HD.jpg/300px-Surprised_Pikachu_HD.jpg"}}
                  style={styles.image}
                />
              </View>
              <View style={styles.nested}>
                  <Text style={styles.normalText}>Nested 1</Text>
                  <Text style={styles.normalText}>Nested 2</Text>
                  <Text style={styles.normalText}>Nested 3</Text>
              </View>
            </SkeletonContent>
  
            <SkeletonContent
              containerStyle={styles.titleContainer}
              layout={secondLayout}
              isLoading={isLoading}>
              <Text style={styles.bigText}>Benjamin Franklin</Text>
              <Text style={[styles.normalText, { marginTop: 20}]}>
                An investment in knowledge pays the best interest.
              </Text>
            </SkeletonContent>
  
            <SkeletonContent
              layout={thirdLayout}
              containerStyle={styles.descContainer}
              isLoading={isLoading}>
              <Text style={styles.normalText}>
                “It is easier to prevent bad habits than to break them.“
              </Text>
            </SkeletonContent>
          </Card>
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
    resizeMode: 'contain',
    height: 36,
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
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalText: {
    fontSize: 18,
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  card: {
    height: 400,
    width: 300,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  nested: {
    flexDirection: 'column',
    marginRight: 20
  }
});

