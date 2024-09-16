import { useState, useEffect } from 'react';
import { getCategory, createCategory, updateCategory, deleteCategory } from "../../services/categoryService";
import './style.css';
import { useNavigate } from 'react-router-dom'; // Se estiver usando React Router

function CadCategorias() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const navigate = useNavigate(); // Hook para navegar entre páginas

    useEffect(() => {
        const loadCategories = async () => {
            const categoryData = await getCategory();
            setCategories(categoryData);
        };
        loadCategories();
    }, []);

    const handleAddCategory = async () => {
        if (categoryName.trim() === '') {
            alert('O nome da categoria não pode estar vazio.');
            return;
        }

        if (categories.some(cat => cat.name === categoryName)) {
            alert('Já existe uma categoria com esse nome.');
            return;
        }

        const newCategory = { name: categoryName, productCount: 0 };

        await createCategory(newCategory);
        
        const updatedCategories = await getCategory();
        setCategories(updatedCategories);

        setCategoryName('');
    };

    const handleEditCategory = async (idCategory) => {
        const newName = prompt('Digite o novo nome da categoria:');
        if (newName && !categories.some(cat => cat.name === newName)) {

            await updateCategory(idCategory, { name: newName });
            

            const updatedCategories = await getCategory();
            setCategories(updatedCategories);
        } else {
            alert('Nome inválido ou já existente.');
        }
        setEditingCategory(null);
    };

    const handleDeleteCategory = async (idCategory) => {
        if (window.confirm('Tem certeza de que deseja excluir esta categoria?')) {

            await deleteCategory(idCategory);
            

            const updatedCategories = await getCategory();
            setCategories(updatedCategories);
        }
    };

    // Função para voltar para a página anterior
    const handleGoBack = () => {
        navigate(-1); // Volta para a página anterior
    };

    return (
        <div className="category-manager">
            <button id="voltar" onClick={handleGoBack}>Voltar</button> {/* Botão de voltar */}
            <h1 id='tituloGerenciamento'>Gerenciamento de Categorias</h1>
            <div className="category-form">
                <input  
                    id="nomeCategoria"
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Nome da Categoria"
                />
                <button id="adicionarCategoria" onClick={handleAddCategory}>Adicionar Categoria</button>
            </div>
            <ul className="category-list">
                {categories.map(category => (
                    <li key={category.idCategory} id="categoria"> {/* Alterado para idCategory */}
                        <span>{category.name} ({category.productCount} produtos)</span>
                        <button id='actionEdit' onClick={() => handleEditCategory(category.idCategory)}>Editar</button> 
                        <button id='actionRemove' onClick={() => handleDeleteCategory(category.idCategory)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CadCategorias;
