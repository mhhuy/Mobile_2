import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { fetchProducts } from "../api/products";
import { Link, useRouter } from "expo-router";
import { IMAGE_URL } from "../url";

interface Product {
  id: number;
  name: string;
  category_id: number;
  description: string;
  image: string;
  price: number;
}

const Products: React.FC = (navigation) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Sử dụng useRouter để điều hướng

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        if (Array.isArray(productsData)) {
          setProducts(productsData);
        } else {
          console.error("Products data is not an array");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4081" />;
  }

  return (
    <View style={styles.productsContainer}>
      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <Link
            href={{
              pathname: "/detail/[id]/productdetail",
              params: { id: product.id },
            }}
          >           
            <View>
              <Image
                source={{
                  uri: `${IMAGE_URL}/products/${product.image}`,
                }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>
                <Text style={styles.productName}>{product.name}</Text>
              </Text>
              <Text style={styles.productPrice}>
                {product.price.toLocaleString()} đ
              </Text>
            </View>            
          </Link>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buyButton}>
              <Link href="../cart">
                <Icon
                  name="cart-outline"
                  size={30}
                  color="#EE0000"
                  style={styles.cartIcon}
                />
              </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton}>
              <Link href="../cart" style={styles.textButton}>
                Mua ngay
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
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
    marginBottom: 15,
    alignItems: "center",
  },
  cartIcon: {
    padding: 2,
  },
  productImage: {
    height: 120,
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
});
