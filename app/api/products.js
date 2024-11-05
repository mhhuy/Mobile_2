import {API_URL} from "../url";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Trả về danh sách sản phẩm
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const fetchProductDetail = async (id) => {
  const response = await fetch(`${API_URL}/product/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return await response.json();
};

export const fetchProductCategories = async (id) => {
  try {
    const response = await fetch(`${API_URL}/product-categories/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Trả về danh sách sản phẩm
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const fetchSearchProducts = async (query) => {
  try {
    const response = await fetch(
      `${API_URL}/products-search?query=${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};