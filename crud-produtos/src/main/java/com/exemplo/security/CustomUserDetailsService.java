// src/main/java/com/exemplo/security/CustomUserDetailsService.java

package com.exemplo.security;

import com.exemplo.usuarios.model.Usuarios;
import com.exemplo.usuarios.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;

@Service // Anotamos como um serviço para o Spring gerenciar
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuariosRepository usuariosRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Busca o usuário no banco de dados usando o seu repositório
        Usuarios usuario = usuariosRepository.findByNome(username)
            .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));

        // Cria uma lista de permissões (roles). Por enquanto, vamos dar um ROLE_USER.
        List<GrantedAuthority> authorities = Collections.singletonList(
            new SimpleGrantedAuthority("ROLE_USER")
        );

        // Retorna um objeto UserDetails com os dados do usuário e suas permissões
        return new org.springframework.security.core.userdetails.User(
            usuario.getNome(),
            usuario.getSenha(),
            authorities
        );
    }
}