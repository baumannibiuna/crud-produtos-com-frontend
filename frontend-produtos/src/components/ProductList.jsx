// src/components/ProductList.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  // Estado para armazenar a lista de produtos
  const [products, setProducts] = useState([]);
  
  // URL da sua API de produtos
  const apiUrl = 'http://localhost:8080/api/produtos';

  // O hook useEffect é usado para buscar os dados quando o componente é montado
  useEffect(() => {
    // Usamos o Axios para fazer uma requisição GET para a sua API
    axios.get(apiUrl)
      .then(response => {
        // Se a requisição for bem-sucedida, atualizamos o estado com os dados
        setProducts(response.data);
      })
      .catch(error => {
        // Em caso de erro, mostramos a mensagem no console
        console.error('Houve um erro ao buscar os produtos!', error);
      });
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez, na montagem

  return (
    <div>
      <h2>Lista de Produtos</h2>
      {products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <ul>
          {products.map(product => (
            // A key é importante para o React gerenciar a lista de forma eficiente
            <li key={product.id}>
              <h3>{product.nome}</h3>
              <p>{product.descricao}</p>
              <p>Preço: R$ {product.preco.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;