import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [variant, setVariant] = useState("");

  const product = {
    name: "iPhone 16 Pro 256GB",
    details: "iPhone 16 Pro Max. Sở hữu thiết kế titan tuyệt đẹp. Điều Khiển Camera. 4K Dolby Vision tốc độ 120 fps. Và chip A18 Pro.",
    imageUrl:
      "assets/images/product/iphone-16-pro-max-black.jpg",
    sizes: ["256GB", "512GB"],
    variants: ["Trắng", "Đen", "Xanh"],
  };

  const addToCart = () => {
    alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //   const selectSize = (selectedSize) => {
  //     setSize(selectedSize);
  //   };

  //   const selectVariant = (selectedVariant) => {
  //     setVariant(selectedVariant);
  //   };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDetails}>{product.details}</Text>

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
              editable={false} // Không cho phép người dùng nhập trực tiếp
            />
            <TouchableOpacity
              onPress={increaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Chọn dung lượng:</Text>
          <View style={styles.optionsContainer}>
            {product.sizes.map((sizeOption) => (
              <TouchableOpacity
                key={sizeOption}
                style={[
                  styles.optionButton,
                  size === sizeOption && styles.selectedOption,
                ]}
                // onPress={() => selectSize(sizeOption)}
              >
                <Text style={styles.optionButtonText}>{sizeOption}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Chọn màu:</Text>
          <View style={styles.optionsContainer}>
            {product.variants.map((variantOption) => (
              <TouchableOpacity
                key={variantOption}
                style={[
                  styles.optionButton,
                  variant === variantOption && styles.selectedOption,
                ]}
                // onPress={() => selectVariant(variantOption)}
              >
                <Text style={styles.optionButtonText}>{variantOption}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Link href="./">
            <TouchableOpacity style={styles.button} onPress={addToCart}>
              <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </>
  );
};

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
    marginBottom: 10,
    color: "#333",
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
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  selectedOption: {
    backgroundColor: "#28a745",
  },
  optionButtonText: {
    color: "#333",
    fontSize: 16,
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
});

export default ProductDetail;
