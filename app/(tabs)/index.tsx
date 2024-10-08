import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button,  TextInput } from "react-native-paper";
import Swiper from "react-native-swiper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {
  type SliderImage = {
    id: number;
    source: any; // Bạn có thể sử dụng kiểu cụ thể hơn nếu cần
  };

  const sliderImages: SliderImage[] = [
    { id: 1, source: require("../../assets/images/slider/tải xuống.jpg") },
    { id: 2, source: require("../../assets/images/slider/tải xuống.jpg") },
    { id: 3, source: require("../../assets/images/slider/tải xuống.jpg") },
  ];
  const products = [
    { id: 1, name: "iPhone 16 Pro 512GB", price:"25.000.000", image: require("@/assets/images/product/iphone-16-pro-max-natural.jpg") },
    { id: 2, name: "Iphone 16 pro max", price:"25.000.000",image: require("@/assets/images/product/iphone-16-pro-max.jpg") },
    { id: 3, name: "iPhone 16 128GB", price:"25.000.000",image: require("@/assets/images/product/iphone-16-plus-pink.jpg") },
    { id: 4, name: "iphone 16 Plus", price:"25.000.000",image: require("@/assets/images/product/iphone-16-plus-ultramarine.jpg") },
    { id: 5, name: "iPhone 16 Pro 256GB", price:"25.000.000",image: require("@/assets/images/product/iphone-16-pro-max-black.jpg") },
  ];
  const categories = [
    { id: 1, name: "Điện thoại"},
    { id: 2, name: "Laptop"},
    { id: 3, name: "Máy tính bảng"},
    { id: 4, name: ""},
    { id: 5, name: ""},
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}> 
        <View style={styles.container}>
      <TextInput 
        style={styles.searchInput} 
        placeholder="Tìm kiếm..." 
      />
      <Link href="../cart"><Icon name="cart" size={30} color="#000" style={styles.cartIcon} />
      </Link>
    </View>
    <View>
          <Swiper
            style={styles.wrapper}
            showsPagination={true}
            autoplay={true}
            autoplayTimeout={3}
          >
            <View style={styles.slide}>
              <Image
                source={{ uri: "../../assets/images/slider/tải xuống.jpg" }} // Thay thế bằng URL hình ảnh thực
                style={styles.image}
              />
              {/* <Text style={styles.text}>Slide 1</Text> */}
            </View>
            <View style={styles.slide}>
              <Image
                source={{ uri: "../../assets/images/slider/tải xuống.jpg" }} // Thay thế bằng URL hình ảnh thực
                style={styles.image}
              />
              {/* <Text style={styles.text}>Slide 2</Text> */}
            </View>
            <View style={styles.slide}>
              <Image
                source={{ uri: "../../assets/images/slider/tải xuống.jpg" }} // Thay thế bằng URL hình ảnh thực
                style={styles.image}
              />
              {/* <Text style={styles.text}>Slide 3</Text> */}
            </View>
          </Swiper>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
            {categories.map((category) => ( 
              <View key={category.id} style={styles.containerButton}>
              <Button mode="contained" style={styles.button}>
              {/* onPress={handleSubmit} */}
              {category.name}
            </Button>
            </View>
            ))}
            
            
         
        </ScrollView> 

      <View style={styles.productsContainer}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            
            <Image source={product.image} style={styles.productImage}></Image>
            
            <ThemedText type="title" style={styles.productName}>
              <Link href="../productdetail">{product.name}</Link>
            </ThemedText>
            <ThemedText  style={styles.productPrice}>
            <Link href="../productdetail">{product.price}</Link>
            </ThemedText>
            
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buyButton}>
              <ThemedText type="default"><Link href="../cart"><Icon name="cart-outline" size={30} color="#EE0000" style={styles.cartIcon} /></Link></ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton}>
              <ThemedText type="default"><Link href="../cart">Mua ngay</Link></ThemedText>
            </TouchableOpacity>
      </View>
          </View>
        ))}
      </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8', // Màu nền thanh tìm kiếm
    borderRadius: 8, // Bo góc
    elevation: 2, // Đổ bóng (chỉ trên Android)
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginRight: 10, // Khoảng cách giữa thanh tìm kiếm và biểu tượng
    marginTop: 10,
  },
  cartIcon: {
    padding: 5,
    marginTop: 10,
  },
  wrapper: {
    height: 220,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 50,
    marginBottom:10,
  },
  button: {
    margin: 5,
    backgroundColor:"#003366"
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  productCard: {
    width: "50%",
    height: "60%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingTop: 10,
    marginBottom: 15,
    paddingBottom: 10,

    alignItems: "center",

  },
  productImage: {
    height: '50%',
    width: "70%",
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 5,
    textAlign: "center",
    color:'black'
  },
  productPrice:{
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 5,
    textAlign: "center",
    color:'red'
  },
  addButton: {
    marginTop: 8,
    backgroundColor: "#003366",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buyButton: {
    backgroundColor: '#white',
    borderRadius: 8,
    borderColor:'#EE0000',
    flex: 1,
    marginRight: 5,
    marginTop:15,
  },
  addButton2: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
