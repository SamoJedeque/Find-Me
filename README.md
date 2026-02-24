Find Me

Sistema web de geolocalização em tempo real onde usuários podem visualizar sua própria posição e a localização de outros usuários conectados no mapa.

🚀 Tecnologias Utilizadas
🔹 Backend

Node.js

Express

Socket.IO

Sequelize

PostgreSQL

🔹 Frontend

React

React Leaflet

Leaflet

Socket.IO Client

🎯 Funcionalidades

✅ Registro de usuários

✅ Autenticação básica

✅ Captura da geolocalização do usuário

✅ Atualização de localização em tempo real

✅ Exibição de múltiplos usuários no mapa

✅ Comunicação em tempo real via WebSockets

✅ Persistência de dados com PostgreSQL

🗺️ Como Funciona

O usuário faz login no sistema.

O navegador solicita permissão para acessar a localização.

A posição (latitude e longitude) é enviada ao backend via Socket.IO.

O servidor atualiza a posição no banco de dados.

Todos os usuários conectados recebem as atualizações em tempo real.

O mapa exibe os usuários online.

⚙️ Instalação (Desenvolvimento)
🔹 Backend
npm install
npm start

Certifique-se de configurar o arquivo .env:

PORT=3000
DATABASE_URL=sua_string_postgres
🔹 Frontend
npm install
npm run dev
🌐 Deploy

Backend pode ser hospedado no Render ou Railway

Frontend pode ser hospedado no Vercel

HTTPS é obrigatório para funcionamento da geolocalização

 Observações

A geolocalização funciona apenas em localhost ou ambientes HTTPS.

O navegador deve conceder permissão de localização.

O sistema utiliza WebSockets para atualização instantânea.



Desenvolvido por Samo Jedequê 
Projeto educacional para prática de Node.js, React e WebSockets.
