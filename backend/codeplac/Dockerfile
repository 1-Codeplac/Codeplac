# Estágio 1: Build 
FROM maven:3.8.4-openjdk-17 AS build

# Definindo argumentos 
ARG DB_USERNAME=mockUser
ARG DB_PASSWORD=mockPassword
ARG DB_URL=jdbc:mysql://mockUrl:3306/mockDb

WORKDIR /app
COPY . .

# Compila o projeto
RUN mvn clean install -DskipTests

# Estágio 2: Runtime (Execução) 
FROM openjdk:17-jdk-slim

WORKDIR /app
EXPOSE 8080

# Copia o jar do estágio de build para a imagem final
COPY --from=build /app/target/codeplac-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]
