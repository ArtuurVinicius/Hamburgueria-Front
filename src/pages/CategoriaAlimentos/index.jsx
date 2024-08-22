import { useState } from 'react';
import './style.css';

function CadCategorias() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);

    const handleAddCategory = () => {
        if (categoryName.trim() === '') {
            alert('O nome da categoria não pode estar vazio.');
            return;
        }

        if (categories.some(cat => cat.name === categoryName)) {
            alert('Já existe uma categoria com esse nome.');
            return;
        }

        setCategories([...categories, { id: Date.now(), name: categoryName, productCount: 0 }]);
        setCategoryName('');
    };

    const handleEditCategory = (id) => {
        const newName = prompt('Digite o novo nome da categoria:');
        if (newName && !categories.some(cat => cat.name === newName)) {
            setCategories(categories.map(cat => cat.id === id ? { ...cat, name: newName } : cat));
        } else {
            alert('Nome inválido ou já existente.');
        }
        setEditingCategory(null);
    };

    const handleDeleteCategory = (id) => {
        if (window.confirm('Tem certeza de que deseja excluir esta categoria?')) {
            setCategories(categories.filter(cat => cat.id !== id));
        }
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="category-manager">
            <div className="back-button">
                <button onClick={handleGoBack}>Voltar</button>
            </div>
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
                        <button onClick={() => handleEditCategory(category.id)}>Editar</button>
                        <button onClick={() => handleDeleteCategory(category.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CadCategorias;
