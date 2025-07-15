# Projeto Schedio

Este repositório contém o backend e frontend do sistema Schedio.
* O backend é composto por uma **API** robusta para gerenciamento de usuários, projetos e atividades. Desenvolvido com ***Spring Boot***, ele oferece funcionalidades de autenticação JWT, persistência de dados com JPA e documentação de API interativa via Swagger.
* O frontend é a interface de usuário do sistema, uma aplicação de gerenciamento de projetos desenvolvida com **React** e **Vite**. Ele oferece uma experiência interativa e dinâmica para que os usuários possam gerenciar seus projetos e atividades de forma eficiente.

# Executando o Backend do Schedio 

## Configuração do Banco de Dados MySQL
#### 1. Certifique-se de que o MySQL Server esteja em execução e acessível *(logado)*.

#### 2. Abra o IntelliJ IDEA.
* 1. Selecione "Open" (Abrir) e navegue até a pasta backend do projeto. O IntelliJ deve reconhecê-lo automaticamente como um projeto Maven, importando as dependências listadas no pom.xml.

* 2. Aguarde o IntelliJ concluir a indexação e o download das dependências do Maven.

* 3. Ajuste o Arquivo **'application.properties'**:

    * No IntelliJ, navegue até ```src/main/resources``` e abra o arquivo ```application.properties``` e faça as seguintes alterações:
    * 1.  ```spring.datasource.url```: Se o seu MySQL Server não estiver em ```localhost:3306```, você precisará alterar este endereço IP e a porta. Exemplo: ```jdbc:mysql://[seu_ip_mysql]:[sua_porta_my…```.
    * 2. Substitua os valores de username e password padrão ```username=root``` e ```password=root``` pelas suas credenciais no MySQL Server. Exemplo: ```username=[seu usuário]``` e ```password=[sua senha]```.

## Executando a Aplicação (API)
#### 1. Localize a Classe Principal
* No IntelliJ, navegue até ```src/main/java/com/now/schedio``` e localize a classe ```SchedioApplication.java```.

#### 2. Execute a Aplicação
* Clique com o botão direito na classe ```SchedioApplication.java``` e selecione ***"Run 'SchedioApplication.main()'"***.

*O Spring Boot embutirá um servidor Tomcat, então você não precisa de uma instalação separada do Tomcat Server.*
*A aplicação será iniciada na porta 8080 por padrão. Você verá logs no console do IntelliJ indicando o início do servidor e a conexão com o banco de dados.*

# Executando o Frontend (React com Vite)

Este guia detalha os passos para configurar e executar a aplicação frontend, desenvolvida com React e Vite.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* **Node.js e npm**: Essencial para gerenciar as dependências do projeto e executar o ambiente de desenvolvimento.
    * Recomendamos a versão LTS (Long Term Support) do Node.js, disponível em [nodejs.org](https://nodejs.org/). O `npm` (Node Package Manager) é instalado automaticamente com o Node.js.

## Instalação e Execução

Siga os passos abaixo para colocar o frontend em funcionamento:

### 1. Navegar até o diretório do projeto

Primeiro, abra seu terminal ou prompt de comando e navegue até o diretório `frontend` do projeto:

```
cd [local]/gps/frontend
```

### 2. Instalar as dependências
Com o terminal no diretório frontend, instale todas as dependências necessárias para o projeto. As dependências estão listadas no arquivo package.json.

```
npm install --force
```

### 3. Executar o servidor de desenvolvimento
Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento do Vite. Os scripts de execução são definidos no package.json e a configuração do Vite está em vite.config.ts.

```
npm run dev
```

# Acessar a aplicação
Uma vez que o servidor de desenvolvimento estiver em execução, o terminal exibirá o endereço local onde a aplicação está sendo executada (geralmente http://localhost:5173). **Abra este endereço em seu navegador web**.

Observação: Para que a funcionalidade completa da aplicação funcione, o servidor backend (que se comunica com a API) também precisa estar em execução. O frontend está configurado para se comunicar com um backend em http://localhost:8080.