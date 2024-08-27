import { useState, useEffect } from "react";
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
  });
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    setCategories(["Burgers", "Fries", "Drinks"]); // Exemplo de categorias
    setProducts([
      {
        id: 1,
        name: "Cheeseburger",
        description: "Delicious cheeseburger",
        category: "Burgers",
      },
      {
        id: 2,
        name: "French Fries",
        description: "Crispy fries",
        category: "Fries",
      },
    ]);
  }, []);

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm({
      ...form,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...selectedProduct, ...form } : p
        )
      );
    } else {
      setProducts([...products, { ...form, id: products.length + 1 }]);
    }
    setForm({ name: "", description: "", image: null, category: "" });
    setSelectedProduct(null);
  };

  const handleRemove = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((p) =>
    categoryFilter ? p.category === categoryFilter : true
  );

  return (
    <div className="product-management">
      <form id="product-form" className="product-form" onSubmit={handleSubmit}>
        <h2>{selectedProduct ? "Editar Produto" : "Cadastro de Produto"}</h2>

        <label htmlFor="product-name">Nome do Produto:</label>
        <input
          type="text"
          id="product-name"
          className="cadastro"
          name="name"
          value={form.name}
          onChange={handleFormChange}
          required
        />

        <label htmlFor="product-description">Descrição:</label>
        <textarea
          id="product-description"
          className="cadastro"
          name="description"
          value={form.description}
          onChange={handleFormChange}
          required
        ></textarea>

        <label htmlFor="product-image">Imagem do Produto (opcional):</label>
        <div className="file-input-wrapper">
          <button type="button" className="custom-file-button">
            Escolher Arquivo
          </button>
          <input
            type="file"
            id="product-image"
            name="image"
            accept="image/*"
            onChange={handleFormChange}
          />
        </div>

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
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="button-group">
          <button className="botaoCadastro" type="submit">
            Salvar Produto
          </button>
          <button
            className="botaoCadastro"
            type="reset"
            onClick={() =>
              setForm({ name: "", description: "", image: null, category: "" })
            }
          >
            Cancelar
          </button>
        </div>
      </form>

      <div className="product-list">
        <h2>Lista de Produtos</h2>

        <label htmlFor="category-filter">Filtrar por Categoria:</label>
        <select
          id="category-filter"
          className="cadastro"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      id="actionEdit"
                      onClick={() => setSelectedProduct(product)}
                    >
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
