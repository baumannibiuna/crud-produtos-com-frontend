# Usando imagem base multi-arch para ARM64
FROM --platform=linux/arm64 eclipse-temurin:17-jre-focal

# Definindo diretório de trabalho
WORKDIR /app

# Copiando o JAR gerado pelo build
COPY crud-produtos-0.0.1-SNAPSHOT.jar app.jar

# Expondo a porta da aplicação
EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]