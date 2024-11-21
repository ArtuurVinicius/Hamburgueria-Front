import { useState, useEffect } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../services/productService";
import { getCategory } from "../../services/categoryService";
import "./style.css";

function CadProdutos() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
    category: "",
    price: 0,
  });
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoriesData = await getCategory();
        setCategories(categoriesData);

        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Erro ao buscar dados iniciais:", error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setForm({
        name: selectedProduct.name,
        description: selectedProduct.description,
        image: selectedProduct.image,
        category: selectedProduct.category,
        price: selectedProduct.price,
      });
    }
  }, [selectedProduct]);

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm({
      ...form,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, form);
      } else {
        await createProduct(form);
      }

      const productsData = await getProducts();
      setProducts(productsData);
      setForm({ name: "", description: "", image: null, category: "", price: 0 });
      setSelectedProduct(null);
    } catch (error) {
      console.error("Erro ao salvar produto", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await deleteProduct(id);
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Erro ao remover produto", error);
    }
  };

  const filteredProducts = products.filter((p) =>
    categoryFilter ? p.category === categoryFilter : true
  );

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="product-management">
      <button
        id="voltar"
        onClick={handleGoBack}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "#2EBFA5",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Voltar
      </button>

      <form id="product-form" className="product-form" onSubmit={handleSubmit}>
        <h2>{selectedProduct ? "Editar Produto" : "Cadastro de Produto"}</h2>

        <label htmlFor="product-name">Nome do Produto:</label>
        <input
          type="text"
          id="product-name"
          className="cadastro"
          placeholder="Hambúrguer"
          name="name"
          value={form.name}
          onChange={handleFormChange}
          required
        />

        <label htmlFor="product-description">Descrição:</label>
        <textarea
          id="product-description"
          className="cadastro"
          placeholder="Sem cebola"
          name="description"
          value={form.description}
          onChange={handleFormChange}
          required
        ></textarea>

        <label htmlFor="product-price">Preço:</label>
        <input
          type="number"
          id="product-price"
          className="cadastro"
          placeholder="Digite o preço"
          name="price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
          required
        />

        <label htmlFor="product-category">Categoria:</label>
        <select
          id="product-category"
          className="cadastro"
          name="category"
          value={form.category}
          onChange={handleFormChange}
          required
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="button-group">
          <button className="botaoCadastro" type="submit">
            Salvar Produto
          </button>
          <button
            className="botaoCadastro"
            type="button"
            onClick={() =>
              setForm({ name: "", description: "", image: null, category: "", price: 0 })
            }
          >
            Cancelar
          </button>
        </div>
      </form>

      <div className="product-list">
        <h2>Lista de Produtos</h2>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>
                    R${typeof product.price === "number" ? product.price.toFixed(2) : "N/A"}
                  </td>
                  <td>
                    <button id="actionEdit" onClick={() => setSelectedProduct(product)}>
                      Editar
                    </button>
                    <button
                      id="actionRemove"
                      onClick={() => handleRemove(product.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-products">
                  Nenhum produto encontrado nesta categoria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CadProdutos;
