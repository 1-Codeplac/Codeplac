# Estágio 1: Build (Pode manter o maven com openjdk, ele costuma funcionar ainda)
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

# Estágio 2: Runtime (Onde estava o erro)
# Trocamos 'openjdk:17-jdk-slim' por 'eclipse-temurin:17-jre-alpine' ou 'slim'
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app
EXPOSE 8080

COPY --from=build /app/target/codeplac-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]
