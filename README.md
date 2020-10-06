#SivOnline-1.0

Este é o repositório da plataforma de simulações virtuais em desenvolvimento. 
A ideia do projeto é criar uma plataforma que contemple toda a experiencia de uma simulações modelo MUN, em formato virtual.

A pasta frontend, possui um projeto em react.js por isso é necessário rodar os comandos "yarn install", seguindo de "yarn start", automaticamente deve abrir um aba no seu navegador rodando a aplicação em localhost.

A pasta server possui um backend em adonis.js, para rodar a aplicação é necessário configura-lo para a sua máquina, dentro da pasta tem um arquivo chamado .env.example, utilize esse padrão para criar o arquivo .env, eu utilizei um banco postgres porém acredito que deve rodar em qualquer banco relacional. Após configurado, é importante instalar as dependências através do comando "yarn install" e rodar as migrações para ele sincronizar o banco de dados, através do comando "adonis migration:run". Feito isso o servidor deve rodar tranquilamente após o comando "adonis serve".

Por fim temos a conexão com o websocket, essa é mais simples, precisamos apenas entrar na pasta socket e rodar "node server".
