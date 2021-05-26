***SivOnline-2.0***

Este é o repositório da plataforma de simulações virtuais em desenvolvimento. 
A ideia do projeto é criar uma plataforma que contemple toda a experiencia de uma simulações modelo MUN, em formato virtual.


Para roda-lo na sua máquina é importante que você tenha alguns programas instalados:
- node.js  || software para rodar comandos javascript no backend e no frontend
- npm || instalador padrão do node
- yarn || instalador que eu utilizei para construir a aplicação
- adonis || framework que facilita a criação de aplicações backend em javascript
- banco de dados a sua escolha

**Instalando o Node** 


existem várias formas de instalar o node e o npm mas eu recomendo utilizar a seguinte sequência de comandos:

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

source ~/.bashrc

nvm install v12.18.4


**Instalando o yarn** 


Para instalar o yarn também é simples, basta rodar o comando:

npm install -g yarn

**Instalando o adonis** 

O adonis foi desativado, por hora não estamos utilizando, portanto essa etapa não é necessária

Para instalar o adonis basta rodar o comando:

npm i -g @adonisjs/cli


**Fazendo o projeto rodar** 


A pasta frontend, possui um projeto em react.js por isso é necessário rodar os comandos "yarn install", seguindo de "yarn start", automaticamente deve abrir um aba no seu navegador rodando a aplicação em localhost.

Essa parte também não é necessária por não estarmos utilizando o adonis

// A pasta server possui um backend em adonis.js, para rodar a aplicação é necessário configura-lo para a sua máquina, dentro da pasta tem um arquivo chamado .env.example, utilize esse padrão para criar o arquivo .env, eu utilizei um banco postgres porém acredito que deve rodar em qualquer banco relacional. Após configurado, é importante instalar as dependências através do comando "yarn install" e rodar as migrações para ele sincronizar o banco de dados, através do comando "adonis migration:run". Feito isso o servidor deve rodar tranquilamente após o comando "adonis serve".

Por fim temos a conexão com o websocket, essa é mais simples, precisamos apenas entrar na pasta socket instalar as dependencias com "yarn install" e rodar "node server".
