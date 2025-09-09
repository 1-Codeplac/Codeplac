FROM ubuntu:latest AS build

ARG DB_USERNAME=mockUser
ARG DB_PASSWORD=mockPassword
ARG DB_URL=jdbc:mysql://mockUrl:3306/mockDb

RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
COPY . .

RUN apt-get install maven -y
RUN mvn clean install -Dspring.datasource.username=$DB_USERNAME -Dspring.datasource.password=$DB_PASSWORD -Dspring.datasource.url=$DB_URL

FROM openjdk:17-jdk-slim

EXPOSE 8080

COPY --from=build target/codeplac-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]
