import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {  ViewStyle } from "react-native"
import _ from 'lodash'
import { Icon, Screen, Text } from "../../components"
import { SwipeListView } from 'react-native-swipe-list-view';
import {  View, StyleSheet, StatusBar, TextInput, TouchableOpacity,Image } from 'react-native';
import { color } from "../../theme"
import { DATA, productImage } from "../../utils/demoData";
import { load, save } from "../../utils/storage"


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
      <Image
        style={styles.listImageStyle}
        source={{
          uri: productImage,
        }}/>
      {/* <Icon style={styles.listImageStyle} icon={'product'} /> */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}> Price:- {item.price}</Text>
      <TouchableOpacity
        style={styles.listItemButton}
        onPress={() => toggelFromCart(item)}>
        <Text style={styles.listItemButtonText}> {_.find(cartData, item) ? "Added In cart" : "Add To Cart"}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} item={item} />
  );

  const emptyComponent = ({ item }) => (
    <View style={{alignItems:"center",marginTop:20}} >
      <Text style={{color:"black",fontSize:14,marginStart:15}} >No Products Found</Text>
    </View>
  );

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed">
      <View style={styles.headerOuterView }>
        <Text style={ styles.headertext}>Product List</Text>
      </View>
      <View style={styles.searchBarOuterView }>
        <TextInput
          style={styles.searchBarText}
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
        ListEmptyComponent={emptyComponent}
        extraData={listData}
        keyExtractor={item => item.id.toString()}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.hiddenButtonOuterStyle}>
            <TouchableOpacity onPress={() => toggelFromCart(data.item)} >
              <Icon style={ styles.addCartStyle} icon={"addTocart"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggelFromCart(data.item)} >
              <Icon style={ styles.removeCartStyle} icon={"removeCart"} />
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
    borderColor: '#DC1957',
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
    fontSize: 16,
    color: color.palette.black
  },
  removeCartStyle:{
    height: 50, width: 50, resizeMode: 'contain', marginRight: 25
  },
  addCartStyle:{
    height: 50, width: 50, marginLeft: 25
  },
  hiddenButtonOuterStyle:{
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  listImageStyle:{
    height: 200, width: 200, marginBottom: 10
  },
  listItemButton:{
    height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#DC1957', borderRadius: 5, marginTop: 5, width: 200
  },
  listItemButtonText:{
    color: 'white', textAlign: 'center', fontSize: 16,
  },
  headerOuterView:{
     backgroundColor: "#DC1957", height: 50, alignItems: "center", justifyContent: "center"
  },
  headertext:{
    fontSize: 20, color: "white" 
  },
  searchBarOuterView:{
    paddingStart: 20, height: 50, alignItems: "center", justifyContent: "center"
  },
  searchBarText:{
    borderBottomWidth: 1, borderBottomColor: '#ccc', height: 40, width: "100%", paddingEnd: 20, marginRight: 20
  }
});
