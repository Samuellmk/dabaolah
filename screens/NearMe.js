import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SectionList,
  FlatList,
  Image,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";

export default function NearMe({ route, navigation }) {
  const { text } = route.params;

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.headerStyle}>
        <StatusBar style="dark" />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={24}
            color="black"
            style={styles.backArrow}
            resizeMode="center"
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 20, marginTop: 40 }}>
          <Text style={styles.headerText1}>I'm near...</Text>
          <Text style={styles.headerText2}>{text}</Text>
        </View>
      </View>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View style={styles.containerPick}>
          <View style={{ marginLeft: 20, marginRight: 20 }}>
            <Text style={styles.sectionHeaderPick}>Our Picks</Text>
            <View
              style={{
                padding: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("./sample_pic.jpg")} // this needs to change to variable item.uri instead to generate different images
                style={styles.itemPhoto}
              />
            </View>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemText}>{PICK[0].data[0].text}</Text>
              <View style={styles.itemTextContainer2}>
                <FontAwesome5
                  style={{ margin: 3 }}
                  name="walking"
                  size={16}
                  color="#363636"
                />
                <Text style={styles.itemText2}>
                  {PICK[0].data[0].walkingTime} ∙ {PICK[0].data[0].distance}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Divider
          marginTop={10}
          color="#ebebeb"
          width={7}
          orientation="horizontal"
        />

        <View style={{ flex: 1 }}>
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
                  style={{ marginTop: 10 }}
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
        </View>
      </View>
    </View>
  );
}

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image
        source={require("./sample_pic.jpg")} // this needs to change to variable item.uri instead to generate different images
        style={styles.itemPhotoForFlat}
        resizeMode="cover"
      />
      <View style={styles.itemTextContainerForFlat}>
        <Text style={styles.itemText}>{item.text}</Text>
        <View style={styles.itemTextContainer2}>
          <FontAwesome5
            style={{ margin: 3 }}
            name="walking"
            size={16}
            color="#363636"
          />
          <Text style={styles.itemText2}>
            {item.walkingTime} ∙ {item.distance}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flex: 0.2,
    backgroundColor: "#fbaf03",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    flexDirection: "row",
  },
  backArrow: {
    marginLeft: 20,
    marginTop: 75,
    fontSize: 30,
  },
  headerText1: {
    flex: 0.3,
    marginTop: 20,
    fontSize: 20,
    color: "#2b2b2b",
  },
  headerText2: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    color: "#293845",
  },
  containerPick: {
    flex: 1.5,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 25,
    color: "#363636",
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20,
  },
  sectionHeaderPick: {
    fontWeight: "800",
    fontSize: 25,
    color: "#363636",
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    // margin: 10,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  itemPhoto: {
    width: 385,
    height: 240,
  },
  itemTextContainer: {
    width: 385,
    height: 240,
  },
  itemPhotoForFlat: {
    width: 140,
    height: 140,
  },
  itemTextContainerForFlat: {
    width: 140,
    height: 60,
  },
  itemTextContainer2: {
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 5,
  },
  itemText: {
    color: "#363636",
    fontSize: 20,
    fontWeight: "bold",
  },
  itemText2: {
    color: "#5c5c5c",
    marginTop: 5,
  },
});

const PICK = [
  {
    data: [
      {
        key: "1",
        text: "Diang Diang Traditional Taiwanese Cuisine",
        uri: "https://picsum.photos/id/1011/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
    ],
  },
];

const SECTIONS = [
  {
    title: "Newly Added",
    data: [
      {
        key: "1",
        text: "Xiang Xiang Traditional Taiwanese Cuisine",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
        uri: "./sample_pic.jpg", // this doesn't work... (like when i input item.uri as a variable into the image source)
      },
      {
        key: "2",
        text: "Item text 2",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
        uri: "https://picsum.photos/id/10/200",
      },

      {
        key: "3",
        text: "Item text 3",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
        uri: "https://picsum.photos/id/1002/200",
      },
      {
        key: "4",
        text: "Item text 4",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
        uri: "https://picsum.photos/id/1006/200",
      },
      {
        key: "5",
        text: "Item text 5",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
        uri: "https://picsum.photos/id/1008/200",
      },
    ],
  },
  {
    title: "Chinese Food",
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://picsum.photos/id/1020/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://picsum.photos/id/1024/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1027/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1035/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1038/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
    ],
  },
];
