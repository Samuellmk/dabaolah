import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SectionList, SafeAreaView, Image, } from 'react-native';

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image
        source={require("./sample_pic.jpg")} // this needs to change to variable item.uri instead to generate different images
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.text}</Text>
      <Text style={styles.itemText2}>{item.walkingDist}</Text>
    </View>
  );
};

export default () => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          renderItem={({ item, section }) => {
            return <ListItem item={item} />;
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const SECTIONS = [
  {
    title: 'Newly Added',
    data: [
      {
        key: '1',
        text: 'Xiang Xiang Traditional Taiwanese Cuisine',
        walkingDist: '~ 10 mins',
        uri: './sample_pic.jpg', // this doesn't work... (like when i input item.uri as a variable into the image source)
      },
      {
        key: '2',
        text: 'Item text 2',
        walkingDist: '~ 10 mins',
        uri: 'https://picsum.photos/id/10/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        walkingDist: '~ 10 mins',
        uri: 'https://picsum.photos/id/1002/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        walkingDist: '~ 10 mins',
        uri: 'https://picsum.photos/id/1006/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        walkingDist: '~ 10 mins',
        uri: 'https://picsum.photos/id/1008/200',
      },
    ],
  },
  {
    title: 'Our Picks',
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1011/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1012/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1013/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1015/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1016/200',
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
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1024/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1027/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1035/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1038/200',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 25,
    color: '#303030',
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: '#363636',
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 120,
  },
  itemText2: {
    color: "#5c5c5c",
    marginRight: 120,
    marginTop: 5,
  },
});