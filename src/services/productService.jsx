// src/services/productService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/product';

export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await axios.patch(`${API_URL}/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
