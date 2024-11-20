import { useState, useEffect } from 'react';
import { getCategory, createCategory, updateCategory, deleteCategory } from "../../services/categoryService";
import './style.css';
import { useNavigate } from 'react-router-dom';

function CadCategorias() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState(''); // Este campo irá armazenar o nome da categoria
    const [editingCategory, setEditingCategory] = useState(null); // Armazena a categoria que está sendo editada
    const navigate = useNavigate();

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

    const handleEditCategory = (category) => {
        // Quando o usuário clicar no botão editar, preencher o campo com o nome da categoria a ser editada
        setEditingCategory(category.idCategory); 
        setCategoryName(category.name); // Preenche o input com o nome atual da categoria
    };

    const handleSaveEditCategory = async () => {
        if (categoryName.trim() === '') {
            alert('O nome da categoria não pode estar vazio.');
            return;
        }

        if (categories.some(cat => cat.name === categoryName)) {
            alert('Já existe uma categoria com esse nome.');
            return;
        }

        await updateCategory(editingCategory, { name: categoryName });

        const updatedCategories = await getCategory();
        setCategories(updatedCategories);

        // Após salvar, limpa o campo de edição e o estado de edição
        setEditingCategory(null);
        setCategoryName('');
    };

    const handleDeleteCategory = async (idCategory) => {
        await deleteCategory(idCategory);
        const updatedCategories = await getCategory();
        setCategories(updatedCategories);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="category-manager">
            <div className="header-container">
                <button id="voltar" onClick={handleGoBack}>Voltar</button> {/* Botão de voltar */}
            </div>
            <h1 id='tituloGerenciamento'>Gerenciamento de Categorias</h1>
            <div className="category-form">
                <input  
                    id="nomeCategoria"
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Nome da Categoria"
                />
                <button 
                    id="adicionarCategoria" 
                    onClick={editingCategory ? handleSaveEditCategory : handleAddCategory}
                >
                    {editingCategory ? 'Salvar Alterações' : 'Adicionar Categoria'}
                </button>
            </div>
            <ul className="category-list">
                {categories.map(category => (
                    <li key={category.idCategory} id="categoria"> {/* Alterado para idCategory */}
                        <span>{category.name}</span>
                        <button id='actionEdit' onClick={() => handleEditCategory(category)}>Editar</button> 
                        <button id='actionRemove' onClick={() => handleDeleteCategory(category.idCategory)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CadCategorias;
