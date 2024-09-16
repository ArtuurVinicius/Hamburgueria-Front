import axios from 'axios';

const API_URL = 'http://localhost:8080/category';

export const getCategory = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createCategory = async (category) => {
    const response = await axios.post(API_URL, category);
    return response.data;
};

export const updateCategory = async (id, category) => {
    const response = await axios.patch(`${API_URL}/${id}`, category);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
