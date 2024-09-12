import { useState, useEffect } from 'react';
import { getCategory, createCategory, updateCategory, deleteCategory } from "../../services/categoryService";
import './style.css';

function CadCategorias() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);

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

    const handleEditCategory = async (id) => {
        const newName = prompt('Digite o novo nome da categoria:');
        if (newName && !categories.some(cat => cat.name === newName)) {

            await updateCategory(id, { name: newName });
            

            const updatedCategories = await getCategory();
            setCategories(updatedCategories);
        } else {
            alert('Nome inválido ou já existente.');
        }
        setEditingCategory(null);
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm('Tem certeza de que deseja excluir esta categoria?')) {

            await deleteCategory(id);
            

            const updatedCategories = await getCategory();
            setCategories(updatedCategories);
        }
    };

    return (
        <div className="category-manager">
            <h1 id='tituloGerenciamento'>Gerenciamento de Categorias</h1>
            <div className="category-form">
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Nome da Categoria"
                />
                <button onClick={handleAddCategory}>Adicionar Categoria</button>
            </div>
            <ul className="category-list">
                {categories.map(category => (
                    <li key={category.id}>
                        <span>{category.name} ({category.productCount} produtos)</span>
                        <button id='actionEdit' onClick={() => handleEditCategory(category.id)}>Editar</button>
                        <button id='actionRemove' onClick={() => handleDeleteCategory(category.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CadCategorias;
