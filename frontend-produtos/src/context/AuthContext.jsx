// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Cria o contexto de autenticação
const AuthContext = createContext();

// Provedor de Autenticação, que irá envolver nossa aplicação
export const AuthProvider = ({ children }) => {
    // Estado para verificar se o usuário está logado
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Estado para armazenar o token de autenticação, se necessário
    const [token, setToken] = useState(null); 
    // URL do endpoint de login na nossa API
    const loginUrl = "http://localhost:8080/api/auth/login";

    // Função para fazer o login
    const login = async (username, password) => {
        try {
            // Faz a requisição POST para a API com os dados de login
            const response = await axios.post(
                loginUrl,
                { username, password },
                {
                    withCredentials: false // Permite enviar cookies com a requisição
                }
            );

            // Se a resposta for bem-sucedida, atualiza o estado de autenticação
            if (response.status === 200) {
                // Opcionalmente, pode salvar o token ou dados do usuário no localStorage
                const fetchedToken = response.data; // Supondo que a API retorne um token
                setToken(response.data); 
                localStorage.setItem('token', fetchedToken); // Armazena o token no localStorage
                setIsAuthenticated(true); // Atualiza o estado de autenticação
                console.log("Login bem-sucedido:", fetchedToken);
                return true; // Retorna true para indicar sucesso
            }
        } catch (error) {
            console.error("Erro no login:", error);
            setIsAuthenticated(false);
            setToken(null); // Limpa o token em caso de erro
            return false; // Retorna false para indicar falha
        }
    };

    // Função para fazer o logout
    const logout = () => {
        setIsAuthenticated(false);
        setToken(null); // Limpa o token
        localStorage.removeItem('token'); // Remove o token do localStorage
        // Limpa quaisquer dados de usuário do localStorage
        console.log("Logout realizado.");
    };

    // Valor do contexto, que será acessível aos componentes filhos
    const value = {
        isAuthenticated,
        token,
        login,
        logout,
    };

    // Retorna o provedor com o valor do contexto e renderiza os filhos
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar o contexto de autenticação de forma mais simples
export const useAuth = () => {
    return useContext(AuthContext);
};