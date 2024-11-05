
import { ScrollView, StyleSheet, View } from "react-native";
import Slider from "../screens/Slider";
import Categories from "../screens/Categories";
import Products from "../screens/Products";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from "expo-router";
import { TextInput } from "react-native-paper";
export default function HomeScreen() {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
          <Link href="./search">
            <View style={styles.searchBar}>
              <Icon name="magnify" size={20} color="#888" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm sản phẩm..."
                placeholderTextColor="#888"
              />
            </View>
          </Link>
          <Link href="../cart">
            <Icon name="cart" size={30} color="#000" style={styles.cartIcon} />
          </Link>
        </View>
        <Slider />
        <Categories />
        <Products />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom:10,
  },
  searchBar: {
    borderColor:"#000",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flex: 1,
    marginRight: 10,
    elevation: 2, // Đổ bóng cho thanh tìm kiếm (Android)
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingVertical: 0,
    paddingLeft: 10,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    marginRight: 10,
  },
  cartIcon: {
    padding: 5,
  },
});
