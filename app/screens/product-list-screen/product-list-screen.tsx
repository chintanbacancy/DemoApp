import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, ViewStyle } from "react-native"
import _ from 'lodash'
import { Icon, Screen, Text } from "../../components"
import Swipeable from 'react-native-swipeable';
import { SwipeListView } from 'react-native-swipe-list-view';
// import { useNavigation } from "@react-navigation/native"
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native';

// import { useStores } from "../../models"
import { color } from "../../theme"
import { DATA } from "../../utils/demoData";
import { load, save } from "../../utils/storage"
import { async } from "validate.js"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}


export const ProductListScreen = observer(function ProductListScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  const [listData, setListData] = useState([]);
  const [listCloneData, setListCloneData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [search, setSearch] = useState("");


  useEffect(() => {
    setListData(DATA)
    setListCloneData(DATA)
    async function fetchCartData() {
      let cart = await load('cart');
      setCartData(cart)

    }
    fetchCartData()
  }, []);



  const onSearchFilter = (value) => {

    if (value === '') {
      setListData(listCloneData)
    }

    const regex = new RegExp(`${value.trim()}`, 'i');
    let updatedList = listCloneData.filter(film => film.title.search(regex) >= 0);
    setListData(updatedList)
  }

  const toggelFromCart = (item) => {
    let updatedCartData: any = cartData?cartData:[];
    if (_.find(updatedCartData, item)) {
      _.remove(updatedCartData, function (n) {
        return n.id == item.id;
      })
    } else {
      updatedCartData.push(item)
    }
    setForceUpdate(!forceUpdate)
    setCartData(updatedCartData)
    save('cart', updatedCartData)
  }


  const Item = ({ title, item }) => (
    <View style={styles.item}>
      <Icon style={{
        height: 200, width: 200, marginBottom: 10
      }} icon={'product'} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{item.price}</Text>
      <TouchableOpacity
        style={{
          height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#DC1957', borderRadius: 5, marginTop: 5, width: 200
        }}
        onPress={() => toggelFromCart(item)}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, }}> {_.find(cartData, item) ? "Item added in cart" : "Add To Cart"}</Text>
      </TouchableOpacity>

    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} item={item} />
  );
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed">
      <View style={{ paddingStart: 20, backgroundColor: "#DC1957", height: 50, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 20, color: "white" }}  >Product List</Text>
      </View>
      <View style={{ paddingStart: 20, height: 50, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', height: 40, width: "100%", paddingEnd: 20, marginRight: 20 }}
          placeholder={'Search Product'}
          placeholderTextColor={'#ccc'}
          value={search}
          onChangeText={(text) => {
            setSearch(text)
            onSearchFilter(text)
          }}
        />
      </View>

      <SwipeListView
        data={listData}
        renderItem={renderItem}
        extraData={listData}
        keyExtractor={item => item.id.toString()}
        renderHiddenItem={(data, rowMap) => (
          <View style={{
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 15,
          }}>
            <TouchableOpacity onPress={() => toggelFromCart(data.item)} >
              <Icon style={{ height: 50, width: 50, marginLeft: 25 }} icon={"addTocart"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggelFromCart(data.item)} >
              <Icon style={{ height: 50, width: 50, resizeMode: 'contain', marginRight: 25 }} icon={"removeCart"} />
            </TouchableOpacity>

          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    </Screen>
  )
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    borderColor: '#f9c2ff',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 330,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 10,
    color: color.palette.black
  },
});
