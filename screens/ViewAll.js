import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import SkeletonContent from "react-native-skeleton-content";
import { ListItemBase } from "react-native-elements/dist/list/ListItemBase";
import firebase from "../database/firestoreDB";
import * as SQLite from "expo-sqlite";

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

  // const snapshot = await stallsRef.get();
  // if (snapshot.empty) {
  //   console.log('No matching stalls.');
  //   return;
  // }
  // snapshot.forEach(doc => {
  //   setStallsInfo([
  //     ...stallsInfo,
  //     {
  //       storeName: doc.storeName,
  //       location: doc.location, // NOTE: this location is the number, not the actual location
  //       cuisine: doc.cuisine, // NOTE: this cuisine is the number, not the actual cuisine
  //       pic1: doc.picture1,
  //       pic2: doc.picture2,
  //       pic3: doc.picture3
  //     },
  //   ]);
  // });

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

export default function ViewAll({ navigation }) {
  const ListItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Details", { item })}
        >
          <Image
            source={{ uri: item.picture1 }}
            style={styles.itemPhoto}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText} numberOfLines={2}>
            {item.storeName}
          </Text>
          <View style={styles.itemTextContainer2}>
            <FontAwesome5
              style={{ margin: 3 }}
              name="walking"
              size={16}
              color="#363636"
            />
            {/* <Text style={styles.itemText2}>{item.walkingTime} ??? {item.distance}</Text> */}
            <Text style={styles.itemText2}>~20 mins ??? 1.8km</Text>
          </View>
        </View>
      </View>
    );
  };

  //shauna's db
  const [savedStalls, setSavedStalls] = useState([]);
  const [stallsInfo, setStallsInfo] = useState([]);
  const [cuisines, setCuisines] = useState([]);

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

    return () => {
      retrieveStalls();
      retrieveCuisines();
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
  //shauna's db

  //skele states and variables
  const viewAllSkeleLayout = [
    {
      width: "40%",
      height: "4%",
      borderRadius: 15,
      marginRight: 200,
    },
    {
      width: "80%",
      height: "20%",
      borderRadius: 30,
      marginRight: 30,
      marginTop: 15,
    },
    {
      width: "70%",
      height: "2%",
      borderRadius: 15,
      marginRight: 30,
      marginTop: 13,
      marginRight: 70,
    },
    {
      width: "60%",
      height: "2%",
      borderRadius: 15,
      marginRight: 30,
      marginTop: 13,
      marginRight: 110,
    },
    {
      width: "60%",
      height: "2%",
      borderRadius: 15,
      marginRight: 30,
      marginTop: 13,
      marginRight: 110,
      marginBottom: 50,
    },
    {
      width: "40%",
      height: "4%",
      borderRadius: 15,
      marginRight: 200,
    },
    {
      width: "80%",
      height: "20%",
      borderRadius: 30,
      marginRight: 30,
      marginTop: 15,
    },
    {
      width: "70%",
      height: "2%",
      borderRadius: 15,
      marginRight: 30,
      marginTop: 13,
      marginRight: 70,
    },
    {
      width: "60%",
      height: "2%",
      borderRadius: 15,
      marginRight: 30,
      marginTop: 13,
      marginRight: 110,
    },
    {
      width: "60%",
      height: "2%",
      borderRadius: 15,
      marginRight: 30,
      marginTop: 13,
      marginRight: 110,
      marginBottom: 90,
    },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const LOAD_TIME = 2000;

  // should load only after db fetches data?
  useEffect(() => {
    if (isLoading) {
      const timeoutId = setTimeout(() => setIsLoading(false), LOAD_TIME);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  //filter button states
  var sectionData = [...SECTIONS];
  for (var section1 of sectionData) {
    for (var cuisineObj of cuisines) {
      if (section1.status === "New") {
        section1.data = stallsInfo.filter((stall) => {
          return stall.location > 12;
        });
        break;
      } else if (section1.status === "Our Picks") {
        section1.data = stallsInfo.filter((stall) => {
          return (
            stall.location === 1 ||
            stall.location === 10 ||
            stall.location === 3 ||
            stall.location === 7 ||
            stall.location === 8
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
        break;
      }
    }
  }

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

  return (
    <>
      <View style={styles.headerStyle}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="chevron-back"
            size={24}
            color="#fbaf03"
            style={styles.backArrow}
          />
          <Text style={styles.headerText}>All Hawkers</Text>
        </View>
        {/* <SafeAreaView style={styles.filterButtonsContainer}> */}
        <View style={styles.filterButtonsList}>
          {filterList.map((e) => (
            <TouchableOpacity
              style={[
                styles.filterBtn,
                filterStatus === e.status && styles.filterBtnActive,
              ]}
              onPress={() => {
                setFilterStatusFunc(e.status);
                setIsLoading(true);
              }}
            >
              <Text>{e.status}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* </SafeAreaView> */}
      </View>

      <SkeletonContent isLoading={isLoading} layout={viewAllSkeleLayout}>
        <View style={styles.container}>
          <StatusBar style="dark" />
          <SafeAreaView style={{ flex: 1 }}>
            <SectionList
              // contentContainerStyle={{ paddingHorizontal:0 }}
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
          </SafeAreaView>
        </View>
      </SkeletonContent>
    </>
  );
}

const SECTIONS = [
  {
    title: "Newly Added",
    status: "New",
    data: [
      {
        key: "1",
        storeName: "Xiang Xiang Taiwanese Cuisine",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
        uri: "./sample_pic.jpg", // this doesn't work... (like when i input item.uri as a variable into the image source)
      },
      {
        key: "2",
        storeName: "Item text 2",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
        uri: "https://picsum.photos/id/10/200",
      },

      {
        key: "3",
        storeName: "Item text 3",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
        uri: "https://picsum.photos/id/1002/200",
      },
      {
        key: "4",
        storeName: "Item text 4",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
        uri: "https://picsum.photos/id/1006/200",
      },
      {
        key: "5",
        storeName: "Item text 5",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
        uri: "https://picsum.photos/id/1008/200",
      },
    ],
  },
  {
    title: "Our Picks",
    status: "Our Picks",
    data: [
      {
        key: "1",
        storeName: "Xiang Xiang Traditional Cuisine",
        uri: "https://picsum.photos/id/1011/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
      {
        key: "2",
        storeName: "Item text 2",
        uri: "https://picsum.photos/id/1012/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },

      {
        key: "3",
        storeName: "Item text 3",
        uri: "https://picsum.photos/id/1013/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
      {
        key: "4",
        storeName: "Item text 4",
        uri: "https://picsum.photos/id/1015/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
      {
        key: "5",
        storeName: "Item text 5",
        uri: "https://picsum.photos/id/1016/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
    ],
  },
  {
    title: "Halal Certified",
    status: "Halal",
    data: [
      {
        key: "1",
        storeName: "Item text 1",
        uri: "https://picsum.photos/id/1020/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
      {
        key: "2",
        storeName: "Item text 2",
        uri: "https://picsum.photos/id/1024/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },

      {
        key: "3",
        storeName: "Item text 3",
        uri: "https://picsum.photos/id/1027/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
      {
        key: "4",
        storeName: "Item text 4",
        uri: "https://picsum.photos/id/1035/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
      {
        key: "5",
        storeName: "Item text 5",
        uri: "https://picsum.photos/id/1038/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
    ],
  },
  {
    title: "Chinese Food",
    status: "Chinese",
    data: [
      {
        key: "1",
        storeName: "Item text 1",
        uri: "https://picsum.photos/id/1020/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
      {
        key: "2",
        storeName: "Item text 2",
        uri: "https://picsum.photos/id/1024/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },

      {
        key: "3",
        storeName: "Item text 3",
        uri: "https://picsum.photos/id/1027/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
      {
        key: "4",
        storeName: "Item text 4",
        uri: "https://picsum.photos/id/1035/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
      {
        key: "5",
        storeName: "Item text 5",
        uri: "https://picsum.photos/id/1038/200",
        walkingTime: "~ 10 mins",
        distance: "2.5 km",
      },
    ],
  },
];

const styles = StyleSheet.create({
  headerStyle: {
    flex: 0.2,
    backgroundColor: "#fbaf03",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    // flexDirection: "row",
    // transform: [{ translateY: -35 }]
    // marginBottom: 10,
  },
  backArrow: {
    marginLeft: 10,
    marginTop: 55,
    fontSize: 30,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 50,
    marginLeft: 7,
    color: "#2b2b2b",
  },
  filterButtonsList: {
    flex: 0.7,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignSelf: "center",
    marginLeft: 65,
    marginTop: 5,
  },
  filterBtn: {
    width: Dimensions.get("window").width / 5,
    height: 30,
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
    borderRadius: 10,
  },
  itemTextContainer: {
    height: 60,
    width: 140,
  },
  itemTextContainer2: {
    flexDirection: "row",
  },
  itemText: {
    color: "#363636",
    marginTop: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  itemText2: {
    color: "#5c5c5c",
    marginTop: 5,
    fontSize: 13,
  },
});
