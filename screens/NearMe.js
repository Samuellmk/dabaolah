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
  Dimensions,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import firebase from "../database/firestoreDB";
import * as SQLite from "expo-sqlite";
import { TouchableWithoutFeedback } from "react-native";
// DB Stuff

const localDB = SQLite.openDatabase("savedStalls.db");
const db = firebase.firestore();
const stallsRef = db.collection("stores");
const locationsRef = db.collection("locations");
const cuisinesRef = db.collection("cuisines");

async function retrieveData() {
  [savedStalls, setSavedStalls] = useState([]);
  [stallsInfo, setStallsInfo] = useState([]);

  localDB.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM savedStalls",
      null,
      (txObj, { rows: { _array } }) => setSavedStalls(_array),
      (txObj, error) => console.error("Error ", error)
    );
  });

  const unsubscribe = firebase
    .firestore()
    .collection("stores")
    .onSnapshot((collection) => {
      const stalls = collection.docs.map((doc) => doc.data());
      setStallsInfo(stalls);
    });

  return () => {
    unsubscribe();
    return stallsInfo;
  };
}

const filterList = [
  {
    status: "All",
  },
  {
    status: "Chinese",
  },
  {
    status: "Halal",
  },
  {
    status: "Western",
  },
  {
    status: "Vegetarian",
  },
];

const END = {
  latitude: 1.35, //1.3551
  longitude: 103.68, //103.6843
};
const haversine = require("haversine");

export default function NearMe({ route, navigation }) {
  const { text, currentCoords } = route.params;

  const [savedStalls, setSavedStalls] = useState([]);
  const [stallsInfo, setStallsInfo] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [locations, setLocations] = useState([]);

  console.log("distance: ", haversine(currentCoords, END));
  console.log(locations[9]);
  async function retrieveData() {
    localDB.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM savedStalls",
        null,
        (txObj, { rows: { _array } }) => setSavedStalls(_array),
        (txObj, error) => console.error("Error ", error)
      );
    });

    const retrieveStalls = firebase
      .firestore()
      .collection("stores")
      .onSnapshot((collection) => {
        const stalls = collection.docs.map((doc) => doc.data());
        setStallsInfo(stalls);
      });
    const retrieveCuisines = firebase
      .firestore()
      .collection("cuisines")
      .onSnapshot((collection) => {
        const cuis = collection.docs.map((doc) => doc.data());
        setCuisines(cuis);
      });
    const retrieveLocations = firebase
      .firestore()
      .collection("locations")
      .onSnapshot((collection) => {
        const cuis = collection.docs.map((doc) => doc.data());
        setLocations(cuis);
      });

    return () => {
      retrieveStalls();
      retrieveCuisines();
      retrieveLocations();
    };
  }

  useEffect(() => {
    localDB.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS
        savedStalls
        (storeName TEXT PRIMARY KEY,
          location TEXT);`
        );
      },
      null,
      retrieveData
    );
  }, []);

  var sectionData = [...SECTIONS];
  // for (var section1 of sectionData) {
  //   for (var cuisineObj of cuisines) {
  //     if (section1.status === "New") {
  //       section1.data = stallsInfo.filter((stall) => {
  //         return stall.location < 4;
  //       });
  //       break;
  //     }
  //     else if (section1.status === "Our Picks") {
  //       section1.data = stallsInfo.filter((stall) => {
  //         return stall.location === 3 ||
  //           stall.location === 7 ||
  //           stall.location === 8
  //       });
  //       PICK[0].data = stallsInfo.filter((stall) => {
  //         return stall.location === 3 ||
  //           stall.location === 7 ||
  //           stall.location === 8
  //       });
  //       break;
  //     }
  //     else if (section1.status === cuisineObj.cuisine) {
  //       var cuisineNum = 1 + cuisines.findIndex((stallCuisine) => {
  //         return stallCuisine === cuisineObj;
  //       });
  //       section1.data = stallsInfo.filter((stall) => {
  //         return stall.cuisine === cuisineNum;
  //       });
  //       break;
  //     };
  //   };
  // };
  for (var section1 of sectionData) {
    for (var cuisineObj of cuisines) {
      if (section1.status === "New") {
        section1.data = stallsInfo.filter((stall) => {
          return stall.location < 4;
        });
        break;
      } else if (section1.status === "Our Picks") {
        PICK[0].data = stallsInfo.filter((stall) => {
          return (
            stall.location === 3 || stall.location === 7 || stall.location === 8
          );
        });
        break;
      } else if (section1.status === cuisineObj.cuisine) {
        var cuisineNum =
          1 +
          cuisines.findIndex((stallCuisine) => {
            return stallCuisine === cuisineObj;
          });
        section1.data = stallsInfo.filter((stall) => {
          return stall.cuisine === cuisineNum;
        });
      }
    }
  }
  // sectionData.shift(); // remove "newly added"
  sectionData.shift(); // remove "our picks"
  // remove some stalls for nearme page
  sectionData[0]["data"].shift();
  sectionData[1]["data"].shift();
  sectionData[2]["data"].shift();
  sectionData[2]["data"].shift();
  sectionData[2]["data"].shift();
  sectionData[2]["data"].pop();
  sectionData[2]["data"].pop();
  sectionData[2]["data"].pop();

  // const featuredList =  sectionData.filter((section2) => {
  //   return section2.status === "Our Picks";
  // });
  // for (var featured of featuredList.data) {
  //   PICK = [...PICK, featured];
  // }

  // Location Stuff

  const [filterStatus, setFilterStatus] = useState("All");
  const [dataList, setDataList] = useState(sectionData);

  const setFilterStatusFunc = (filterStatus) => {
    if (filterStatus !== "All") {
      // Chinese or Halal
      setDataList([...sectionData.filter((e) => e.status === filterStatus)]);
    } else {
      setDataList(sectionData);
    }
    setFilterStatus(filterStatus);
  };

  const ListItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Details", { item })}
        >
          <Image
            source={{ uri: item.picture1 }} // this needs to change to variable item.uri instead to generate different images
            style={styles.itemPhotoForFlat}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
        <View style={styles.itemTextContainerForFlat}>
          <Text style={styles.itemText}>{item.storeName}</Text>
          <View style={styles.itemTextContainer2}>
            <FontAwesome5
              style={{ margin: 3 }}
              name="walking"
              size={16}
              color="#363636"
            />
            <Text style={styles.itemText2}>~10 mins ??? 1.1km</Text>
            {/* <Text style={styles.itemText2}>
              {item.walkingTime} ??? {item.distance}
            </Text> */}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.headerStyle}>
        <StatusBar style="dark" />
        <View style={{ flex: 1, flexDirection: "row" }}>
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
        <View style={styles.filterButtonsList}>
          {filterList.map((e) => (
            <TouchableOpacity
              style={[
                styles.filterBtn,
                filterStatus === e.status && styles.filterBtnActive,
              ]}
              onPress={() => setFilterStatusFunc(e.status)}
            >
              <Text>{e.status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View style={{ flex: 1 }}>
          <SectionList
            // contentContainerStyle={{ paddingHorizontal:0 }}
            ListHeaderComponent={
              filterStatus == "All" ? OurPick(currentCoords, navigation) : null
            }
            stickySectionHeadersEnabled={false}
            sections={dataList}
            renderSectionHeader={({ section }) => (
              <>
                <Text style={styles.sectionHeader}>{section.title}</Text>
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({ item }) => <ListItem item={item} />}
                  keyExtractor={(item) => item.storeName}
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

function OurPick(currentCoords, navigation) {
  const pickLocation = {
    latitude: 1.3509008,
    longitude: 103.720027,
  };
  const item = {
    address: "Old Airport Hawker Centre",
    location: 3,
    picture1:
      "https://www.mstar.com.my/image/830/553?url=https%3A%2F%2Fclips.mstar.com.my%2Fimages%2Fblob%2F060C5AE0-169F-401F-B0A4-5FE4FF1EA167",
    picture2: "",
    picture3: "",
    storeName: "Sinar Hijrah Muslim Food",
    duration: "7 min",
  };
  return (
    <>
      <View style={styles.containerPick}>
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <Text style={styles.sectionHeaderPick}>Featured</Text>
          <View
            style={{
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Details", { item })}
            >
              <Image
                source={{ uri: PICK[0]["data"][0].picture1 }}
                // source={require("./sample_pic.jpg")} // this needs to change to variable item.uri instead to generate different images
                style={styles.itemPhoto}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.itemTextContainer}>
            <Text style={styles.featuredText}>
              {PICK[0]["data"][0].storeName}
            </Text>
            {/* <Text style={styles.itemText}>{PICK[0].storeName}</Text> */}
            <View style={styles.itemTextContainer2}>
              <FontAwesome5
                style={{ margin: 3 }}
                name="walking"
                size={16}
                color="#363636"
              />
              <Text style={styles.itemText2}>
                ~7min ??? 0.8km
                {Number(
                  (
                    (haversine(currentCoords, pickLocation) / 5) *
                    60
                  ).toPrecision(2)
                ) + " mins"}{" "}
                ???{" "}
                {Number(haversine(currentCoords, pickLocation).toPrecision(2)) +
                  " km"}
              </Text>
              {/* <Text style={styles.itemText2}>
                {PICK[0].data[0].walkingTime} ??? {PICK[0].data[0].distance}
              </Text> */}
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
    </>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    flex: 0.25,
    backgroundColor: "#fbaf03",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  backArrow: {
    marginLeft: 20,
    marginTop: 75,
    fontSize: 30,
  },
  headerText1: {
    flex: 0.5,
    marginTop: 10,
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
    fontSize: 22,
    color: "#363636",
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20,
  },
  sectionHeaderPick: {
    fontWeight: "800",
    fontSize: 22,
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
    height: 80,
  },
  itemPhotoForFlat: {
    width: 140,
    height: 140,
  },
  itemTextContainerForFlat: {
    width: 140,
    height: 70,
  },
  itemTextContainer2: {
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 5,
  },
  itemText: {
    color: "#363636",
    fontSize: 15,
    fontWeight: "bold",
  },
  itemText2: {
    color: "#5c5c5c",
    marginTop: 3,
  },
  featuredText: {
    color: "#363636",
    fontSize: 19,
    fontWeight: "bold",
  },
  filterButtonsList: {
    flex: 0.25,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 10,
    marginLeft: 65,
    marginBottom: 15,
  },
  filterBtn: {
    width: Dimensions.get("window").width / 5,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#d6d6d6",
    borderRadius: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    backgroundColor: "#ededed",
  },
  filterBtnActive: {
    backgroundColor: "#ffe29c",
    borderColor: "#c78842",
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
    title: "Our Picks",
    status: "Our Picks",
    data: [],
  },
  {
    title: "Newly Added",
    status: "New",
    data: [],
  },
  {
    title: "Halal Certified",
    status: "Halal",
    data: [],
  },
  {
    title: "Chinese Food",
    status: "Chinese",
    data: [],
  },
];

// const SECTIONS = [
//   {
//     title: "Newly Added",
//     data: [
//       {
//         key: "1",
//         text: "Xiang Xiang Traditional Taiwanese Cuisine",
//         walkingTime: "~ 10 mins",
//         distance: "2.5 km",
//         uri: "./sample_pic.jpg", // this doesn't work... (like when i input item.uri as a variable into the image source)
//       },
//       {
//         key: "2",
//         text: "Item text 2",
//         walkingTime: "~ 10 mins",
//         distance: "2.5 km",
//         uri: "https://picsum.photos/id/10/200",
//       },

//       {
//         key: "3",
//         text: "Item text 3",
//         walkingTime: "~ 10 mins",
//         distance: "2.5 km",
//         uri: "https://picsum.photos/id/1002/200",
//       },
//       {
//         key: "4",
//         text: "Item text 4",
//         walkingTime: "~ 10 mins",
//         distance: "2.5 km",
//         uri: "https://picsum.photos/id/1006/200",
//       },
//       {
//         key: "5",
//         text: "Item text 5",
//         walkingTime: "~ 10 mins",
//         distance: "2.5 km",
//         uri: "https://picsum.photos/id/1008/200",
//       },
//     ],
//   },
//   {
//     title: "Chinese Food",
//     data: [
//       {
//         key: "1",
//         text: "Item text 1",
//         uri: "https://picsum.photos/id/1020/200",
//         walkingTime: "~ 10 mins",
//         distance: "2.5 km",
//       },
//       {
//         key: "2",
//         text: "Item text 2",
//         uri: "https://picsum.photos/id/1024/200",
//         walkingTime: "~ 10 mins",
//         distance: "2.5 km",
//       },

//       {
//         key: "3",
//         text: "Item text 3",
//         uri: "https://picsum.photos/id/1027/200",
//         walkingTime: "~ 10 mins",
//         distance: "2.5 km",
//       },
//       {
//         key: "4",
//         text: "Item text 4",
//         uri: "https://picsum.photos/id/1035/200",
//         walkingTime: "~ 10 mins",
//         distance: "2.5 km",
//       },
//       {
//         key: "5",
//         text: "Item text 5",
//         uri: "https://picsum.photos/id/1038/200",
//         walkingTime: "~ 10 mins",
//         distance: "2.5 km",
//       },
//     ],
//   },
// ];
