package com.exemplo.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class TokenService {

    // Chave secreta para assinar o token. É uma boa prática armazená-la em um arquivo de configuração.
    private final String secret = "sua-chave-super-secreta-com-pelo-menos-32-caracteres-123";
    
    // Método para gerar o token
    public String generateToken(String username) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        
        // Define o tempo de expiração do token (por exemplo, 24 horas)
        Instant expirationTime = Instant.now().plus(1, ChronoUnit.DAYS);

        return Jwts.builder()
                .setSubject(username) // O "dono" do token
                .setIssuedAt(new Date()) // Quando o token foi emitido
                .setExpiration(Date.from(expirationTime)) // Quando o token expira
                .signWith(key) // Assina o token com a sua chave secreta
                .compact(); // Constrói e compacta o token em uma string
    }

    // Método para validar e extrair o nome de usuário do token
    public String getSubject(String token) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        
        // Usa a nova sintaxe para o parser do JWT
        return Jwts.parser()
                .setSigningKey(key) // Usa a mesma chave secreta para validar a assinatura
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}