# InvestSimples

**Plataforma de educação financeira, simulações e gerenciamento de finanças pessoais.**

O InvestSimples é uma aplicação web desenvolvida como projeto de Trabalho de Conclusão de Curso (TCC), com o objetivo de reunir recursos de educação financeira e ferramentas práticas em um único ambiente.

A proposta é oferecer aos usuários uma plataforma na qual possam aprender sobre finanças, realizar simulações e organizar sua vida financeira.

## 📌 Funcionalidades

O projeto está organizado em três áreas principais:

* **📚 Cursos:** ambiente dedicado à disponibilização de conteúdos educacionais, com páginas de cursos e aulas.
* **🧮 Calculadora e simulações:** ferramentas para realizar cálculos e simulações relacionados à educação financeira.
* **💰 Finanças pessoais:** área destinada ao gerenciamento e à organização das informações financeiras do usuário.
* **🔐 Autenticação:** cadastro e login de usuários, com suporte à identificação de diferentes níveis de acesso.

> O projeto está em desenvolvimento. A disponibilidade de cada funcionalidade pode variar conforme o estágio atual da implementação.

## 🛠️ Tecnologias utilizadas

### Frontend

* [React](https://react.dev/) — construção da interface.
* [TypeScript](https://www.typescriptlang.org/) — tipagem estática e maior segurança no desenvolvimento.
* [Vite](https://vite.dev/) — ambiente de desenvolvimento e build.
* [React Router](https://reactrouter.com/) — gerenciamento da navegação entre páginas.
* [Axios](https://axios-http.com/) — comunicação com a API.
* [React Icons](https://react-icons.github.io/react-icons/) — utilização de ícones na interface.

### Backend

* [Python](https://www.python.org/) — linguagem utilizada no servidor.
* [FastAPI](https://fastapi.tiangolo.com/) — construção da API REST.
* [SQLAlchemy](https://www.sqlalchemy.org/) — interação com o banco de dados.
* [Alembic](https://alembic.sqlalchemy.org/) — gerenciamento de migrações do banco de dados.
* [Pydantic](https://docs.pydantic.dev/) — validação e estruturação de dados.
* [Supabase](https://supabase.com/) — serviços de banco de dados e integração.

### Autenticação e segurança

* JWT para autenticação baseada em tokens.
* Passlib e bcrypt para recursos relacionados à proteção de senhas.

## 🏗️ Arquitetura do projeto

A aplicação utiliza uma arquitetura separada entre frontend e backend, permitindo que a interface se comunique com os serviços disponibilizados pela API.

```text
InvestSimples/
├── backend/
│   ├── app/
│   |   ├── core/
│   |   ├── models/
│   |   ├── routers/
│   |   ├── schemas/
│   |   └── ...
│   ├── main.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   |   ├── api/
│   |   ├── assets/
│   |   ├── components/
│   |   ├── contexts/
│   |   ├── layout/
│   |   ├── pages/
│   |   ├── types/
│   |   ├── utils/
│   |   ├── app.tsx
│   |   ├── main.tsx
│   |   └── ...
│   ├── index.html
│   ├── package.json
│   └── ...
├── LICENSE
├── README.md
└── todo.md
```

* **Frontend:** responsável pela interface, navegação e interação com o usuário.
* **Backend:** responsável pela API, validação das requisições, autenticação e regras de negócio.
* **Banco de dados:** utilizado para persistir as informações da aplicação.

A estrutura interna dos diretórios pode conter outros módulos e arquivos além dos representados acima.

## Como executar o projeto

### Pré-requisitos

Antes de começar, instale:

* [Git](https://git-scm.com/)
* [Node.js e npm](https://nodejs.org/)
* [Python](https://www.python.org/)
* Uma instância do Supabase configurada para o projeto, ou as credenciais do ambiente de banco de dados utilizado.

### 1. Clone o repositório

```bash
git clone https://github.com/eSeiichi/InvestSimples.git
cd InvestSimples
```

### 2. Configure o backend

Entre no diretório do backend:

```bash
cd backend
```

Crie um ambiente virtual Python:

```bash
python -m venv venv
```

Ative o ambiente virtual.

**Windows (PowerShell):**

```powershell
.\venv\Scripts\Activate.ps1
```

**Windows (Prompt de Comando):**

```bat
venv\Scripts\activate.bat
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Configure as variáveis de ambiente necessárias para a conexão com o banco de dados e os serviços utilizados pelo backend, conforme a configuração da aplicação.

Inicie o servidor:

```bash
uvicorn main:app --reload
```

Por padrão, a API estará disponível em:

* API: http://localhost:8000
* Documentação interativa: http://localhost:8000/docs

A documentação interativa permite consultar os endpoints disponíveis e testar as requisições da API.

### 3. Configure o frontend

Abra outro terminal na raiz do projeto e entre no diretório do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação. Por padrão:

http://localhost:5173

### 4. Verifique a conexão entre frontend e backend

Certifique-se de que:

* O backend esteja em execução.
* O banco de dados esteja configurado e acessível.
* O frontend esteja apontando para o endereço correto da API.
* As variáveis de ambiente necessárias estejam configuradas.

**Observação:** os nomes das variáveis de ambiente e as etapas exatas de configuração devem seguir os arquivos e as configurações atuais do projeto. Não compartilhe credenciais, tokens ou senhas no repositório.

## 📖 Documentação da API

Durante a execução do backend, o FastAPI disponibiliza uma documentação interativa dos endpoints:

* Swagger UI: http://localhost:8000/docs
* ReDoc: http://localhost:8000/redoc

Esses endereços são disponibilizados pelo FastAPI quando a documentação automática está habilitada.

## 🎯 Objetivos do projeto

O desenvolvimento do InvestSimples também busca aplicar conhecimentos de desenvolvimento de software na construção de uma aplicação web completa, envolvendo:

* Desenvolvimento de interfaces com React e TypeScript.
* Construção e consumo de APIs REST.
* Persistência e modelagem de dados.
* Autenticação e controle de acesso.
* Integração entre frontend, backend e banco de dados.
* Organização e manutenção de um projeto de software.

## 📍 Status do desenvolvimento

O InvestSimples está em desenvolvimento como projeto de TCC. Novas funcionalidades, melhorias na interface e ajustes na integração entre os componentes podem ser realizados ao longo do projeto.

Para acompanhar as tarefas e os próximos passos, consulte o arquivo [`todo.md`](./todo.md).

## 👨‍💻 Autor

Desenvolvido por **eSeiichi**.

* GitHub: [@eSeiichi](https://github.com/eSeiichi)
* Repositório: [InvestSimples](https://github.com/eSeiichi/InvestSimples)

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [`LICENSE`](./LICENSE) para obter os termos completos.
