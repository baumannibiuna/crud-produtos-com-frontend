package com.exemplo.crudprodutos.repository;
// Importa a nossa classe de entidade Produto.
import com.exemplo.crudprodutos.model.Produto;

// Importa a interface JpaRepository do Spring Data.
import org.springframework.data.jpa.repository.JpaRepository;

// Importa a anotação @Repository para indicar que esta é uma interface de repositório.
import org.springframework.stereotype.Repository;


// A anotação @Repository marca esta interface como um "Componente" do Spring.
// Ela é especializada para a camada de persistência de dados.
@Repository
// Esta é a declaração da nossa interface. Interfaces são como contratos.
// Ela "estende" JpaRepository, o que significa que ela herda todos os métodos CRUD prontos.
// Precisamos especificar duas coisas para o JpaRepository entre <>:
// 1. O tipo da entidade que ele vai gerenciar (no nosso caso, 'Produto').
// 2. O tipo da chave primária dessa entidade (no nosso caso, o 'id' é do tipo 'Long').


public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    // É isso! Não precisamos escrever nenhum código aqui dentro por enquanto.
    // O Spring Data JPA vai automaticamente criar uma implementação desta interface em tempo de execução
    // com métodos como: save(), findById(), findAll(), deleteById(), etc. É a mágica do Spring!
}