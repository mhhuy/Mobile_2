import { fetchProductDetail } from "@/app/api/products";
import { IMAGE_URL } from "@/app/url";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Product {
  id: number;
  name: string;
  category_id: number;
  description: string;
  image: string;
  price: number;
}

const productdetail = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const loadProductdetail = async () => {
      try {
        const res = await fetchProductDetail(id);
        setProduct(res.product);
        const response = await fetchProductDetail(id);
        setProducts(response.related_products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProductdetail();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4081" />;
  }

  const addToCart = () => {
    alert(`Đã thêm ${quantity} ${product?.name} vào giỏ hàng!`);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={{ uri: `${IMAGE_URL}/products/${product?.image}` }}
            style={styles.image}
          />
          <Text style={styles.productName}>{product?.name}</Text>
          <Text style={styles.productPrice}>
            {product?.price.toLocaleString()} đ
          </Text>{" "}
          {/* Thêm thẻ hiển thị giá sản phẩm */}
          <Text style={styles.productDetails}>{product?.description}</Text>
          <Text style={styles.label}>Số lượng:</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={quantity.toString()}
              keyboardType="numeric"
              editable={false}
            />
            <TouchableOpacity
              onPress={increaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Link href="./">
            <TouchableOpacity style={styles.button} onPress={addToCart}>
              <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginVertical: 10,
              textAlign: "center",
              color: "black",
              backgroundColor: "#fff",
              padding: 10,
            }}
          >
            Sản phẩm khác
          </Text>
        </View>
        <View style={styles.productsContainer}>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/detail/[id]/productdetail",
                    params: { id: product.id },
                  })
                }
              >
                <View>
                  <Image
                    source={{
                      uri: `${IMAGE_URL}/products/${product.image}`,
                    }}
                    style={styles.productImage}
                  />
                  <Text style={styles.productName2}>
                    <Text style={styles.productName2}>{product.name}</Text>
                  </Text>
                  <Text style={styles.productPrice2}>
                    {product.price.toLocaleString()} đ
                  </Text>
                </View>
              </TouchableOpacity>

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
      </ScrollView>
    </>
  );
};

export default productdetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  productName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
    color: "#DD0000", // Màu giá sản phẩm
  },
  productDetails: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  quantityButton: {
    backgroundColor: "#DD0000",
    borderRadius: 5,
    padding: 10,
    width: 40,
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    width: 60,
    textAlign: "center",
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#DD0000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
    marginBottom: 15,
    alignItems: "center",
  },
  //   cartIcon: {
  //     padding: 2,
  //   },
  productImage: {
    height: 120,
    width: "100%", // Đảm bảo hình ảnh chiếm đầy chiều rộng của card
    borderRadius: 8,
  },
  productName2: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 5,
    textAlign: "center",
    color: "black",
  },
  productPrice2: {
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
  cartIcon: {
    padding: 5,
    marginTop: 10,
  },
});
