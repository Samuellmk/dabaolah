import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, SectionList, SafeAreaView, Image, FlatList, TouchableOpacity, } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { ListItemBase } from 'react-native-elements/dist/list/ListItemBase';
// import ScrollingButtonMenu from 'react-native-scrolling-button-menu';


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

const filterList = [
  {
    status: "All"
  },
  {
    status: "Chinese"
  },
  {
    status: "Halal"
  },
  {
    status: "Western"
  },
  {
    status: "Vegetarian"
  }
]

export default () => {

  const [filterStatus, setFilterStatus] = useState("All")
  const [dataList, setDataList] = useState(SECTIONS.data)
  const setFilterStatusFunc = filterStatus => {
    if(status !== "All") {   // purple and green
      setDataList([...(SECTIONS.data).filter(e => e.status === status)])
    }
    else  {
      setDataList(SECTIONS.data)
    }
    setFilterStatus(status)
  }

  return (
    <>
      <View style={styles.headerStyle}>
        <View style={{flexDirection: "row"}}>
          <Ionicons name="chevron-back" size={24} color="#fbaf03" style={styles.backArrow}/>
          <Text style={styles.headerText}>All Hawkers</Text>
        </View>
        {/* <SafeAreaView style={styles.filterButtonsContainer}> */}
          <View style={styles.filterButtonsList}>
            {
              filterList.map(e => (
                <TouchableOpacity 
                  style={[styles.filterBtn, filterStatus === e.status && styles.filterBtnActive]}
                  onPress={() => setFilterStatusFunc(e.status)}>
                  <Text>{e.status}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        {/* </SafeAreaView> */}
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
    status: "New",
    data: [
      {
        key: '1',
        text: 'Xiang Xiang Taiwanese Cuisine',
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
    status: "Our Picks",
    data: [
      {
        key: '1',
        text: 'Xiang Xiang Traditional Cuisine',
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
    title: 'Halal Certified',
    status: "Halal",
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
  {
    title: 'Chinese Food',
    status: "Chinese",
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
    backgroundColor:"#fbaf03", 
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
    marginTop: 55,
    marginLeft: 7,
    color: "#2b2b2b"
  },
  filterButtonsList: {
    flex: 0.7,
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 10,
  },
  filterBtn: {
    width: Dimensions.get('window').width / 4.5,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: "#d6d6d6",
    borderRadius: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  filterBtnActive: {
    backgroundColor: "#ffc687",
    borderColor: "#c78842",
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 22,
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
    color: '#363636',
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