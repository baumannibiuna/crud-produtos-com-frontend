// src/components/AdminPage.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminPage = () => {
    // Usamos o hook para acessar o estado de autenticação e a função de logout
    const [users, setUsers] = useState([]);
    const { token, logout } = useAuth();
    const apiUrl = 'http://localhost:8080/api/usuarios'; // URL da API de usuários

    useEffect(() => {
        if (token) {
            axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}` // Envia o token no cabeçalho da requisição
                }
            }).then(response => {
                setUsers(response.data);
            }).catch(error => {
                console.error('Erro ao buscar usuários:', error);
            });
        }
    }, [token]);


    return (
        <div>
            <h2>Painel de Administração de Usuários</h2>
            <p>Bem-vindo! Você está logado e pode gerenciar os usuários.</p>
            <button onClick={logout}>Sair (Logout)</button>

            <div>
                <h2>Lista de Usuarios</h2>
                {users.length === 0 ? (
                    <p>Nenhum usuario encontrado.</p>
                ) : (
                    <ul>
                        {users.map(usuario => (
                            // A key é importante para o React gerenciar a lista de forma eficiente
                            <li key={usuario.id}>
                                <h3>{usuario.nome}</h3>
                                <p>{usuario.senha}</p>
                                <p>Email: {usuario.email}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdminPage;