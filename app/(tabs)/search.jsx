import { Link, useFocusEffect, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from "react";
import { Text } from "react-native";
import { IMAGE_URL } from "../url";
import { fetchSearchProducts } from "../api/products";

export default function HomeScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term) {
      setIsLoading(true);
      const results = await fetchSearchProducts(term);
      setFilteredData(results);
      setIsLoading(false);
    } else {
      setFilteredData([]);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredData([]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer} key={item.id}>
      
      <Image
        source={{ uri: `${IMAGE_URL}/products/${item.image}` }}
        style={styles.productImage}
      />
      
      <View style={styles.textContainer}>
      <TouchableOpacity onPress={() =>
              router.push({
                pathname: "/detail/[id]/productdetail",
                params: { id: item.id },
              })
            }>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price.toLocaleString()} đ</Text>
      </TouchableOpacity>
        
        <TouchableOpacity style={styles.addButton}>
          <Link href="../cart" style={styles.textButton}>Mua ngay</Link>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buyButton}>
        <Link href="../cart">
          <Icon name="cart-outline" size={30} color="#EE0000" style={styles.cartIcon} />
        </Link>
      </TouchableOpacity>
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
      resetSearch();
    }, [])
  );
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Link href="./search">
            <View style={styles.searchBar}>
              <Icon name="magnify" size={20} color="#000" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm sản phẩm..."
                placeholderTextColor="#888"
                value={searchTerm}
                onChangeText={handleSearch}
              />
            </View>
          </Link>
          <Link href="../cart">
            <Icon name="cart" size={30} color="#000" style={styles.cartIcon} />
          </Link>
        </View>
        {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}
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
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    elevation: 2, // Đổ bóng cho thanh tìm kiếm (Android)
    paddingRight:0,
    marginRight: 0,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    marginRight: 10,
  },
  cartIcon: {
    padding: 5,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  productCard: {
    width: "48%", // Điều chỉnh để có khoảng cách tốt hơn
    backgroundColor: "#ffffff",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  cartIcon2: {
    padding: 2,
  },
  productImage: {
    height: 140,
    width: "100%", // Đảm bảo hình ảnh chiếm đầy chiều rộng của card
    borderRadius: 8,
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 5,
    textAlign: "center",
    color: "black",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 5,
    textAlign: "center",
    color: "red",
  },
  addButton: {
    marginTop: 8,
    backgroundColor: "#003366",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%", // Đảm bảo các nút nằm trên cùng một dòng
  },
  buyButton: {
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#EE0000",
    marginRight: 10,
    paddingVertical: 5,
    alignItems: "center",
    paddingLeft: 10,
    marginTop: 8,
  },
  textButton: {
    color: "white",
  },
  list: {
    paddingBottom: 20,
  },
  //
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom:5,
  },
  productImage: {
    width: '30%', // Image takes 3 parts
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '400',
    color: 'red',
  },
  buyButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#EE0000',
    padding: 5,
  },
  addButton: {
    marginTop: 8,
    backgroundColor: '#003366',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    color: '#fff',
  },
  cartIcon: {
    padding: 5,
  },
});
