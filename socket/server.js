const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')

const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sivOn',
  password: 'Tiago2003',
  port: 5432,
})
app.use(cors())
let users = [
  {
    id: 1,
    username: "Tiago Rodrigues",
    email: "tiago.americano.03@gmail.com",
    password: "Tiago2003",
    representation_type: "Mesa",
    representation: "Mesa-Tiago",
    created_at: "2020-10-01 16:22:43",
    updated_at: "2020-10-01 16:22:43"
  },
  {
    id: 2,
    username: "Marcos Rodrigues",
    email: "marcos.americano.03@gmail.com",
    password: "Marcos2003",
    representation_type: "Delegado",
    representation: "Brasil",
    created_at: "2020-10-01 16:23:45",
    updated_at: "2020-10-01 16:23:45"
  },
  {
    id: 3,
    username: "Rafael Rodrigues",
    email: "rafael.americano.03@gmail.com",
    password: "Rafael2003",
    representation_type: "Staff",
    representation: "Rafael",
    created_at: "2020-10-27 15:32:23",
    updated_at: "2020-10-27 15:32:23"
  },
  {
    id: 4,
    username: "Bento Rodrigues",
    email: "bento.americano.03@gmail.com",
    password: "Bento2003",
    representation_type: "Imprensa",
    representation: "Bento",
    group: 0,
    created_at: "2020-11-03 10:52:40",
    updated_at: "2020-11-03 10:52:40"
  },
  {
    id: 5,
    username: "Pedro José",
    email: "pedro.almeida@alunoviva.com.br",
    password: "PedroSiv",
    representation_type: "Chefe de imprensa",
    representation: "Pedro José",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 6,
    username: "Pablito",
    email: "pablo.quijada@escolaviva.com.br",
    password: "PabloSiv",
    representation_type: "Mesa",
    representation: "Mesa-Pablo",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 7,
    username: "Pedro Toldi",
    email: "pedro.toldi@alunoviva.com.br",
    password: "PedroSiv",
    representation_type: "Mesa",
    representation: "Mesa-Pedro",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 8,
    username: "Victória Schalch",
    email: "victoria.schalch@alunoviva.com.br",
    password: "VictoriaSiv",
    representation_type: "imprensa",
    representation: "imprensa-Victória",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 9,
    username: "Fernanda Boffelli",
    email: "fernanda.bofelli@alunoviva.com.br",
    password: "FernandaSiv",
    representation_type: "Staff",
    representation: "Staff-Fernanda",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 10,
    username: "Fernanda Issa",
    email: "fernanda.bottini@alunoviva.com.br",
    password: "FernandaSiv",
    representation_type: "Delegado",
    representation: "Delegada-Fernanda",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 11,
    username: "Caio Suplicy",
    email: "caio.suplicy@alunoviva.com.br",
    password: "CaioSiv",
    representation_type: "Mesa",
    representation: "Mesa-Caio",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 12,
    username: "Artur Santos",
    email: "artur.santos@alunoviva.com.br",
    password: "ArturSiv",
    representation_type: "Delegado",
    representation: "Delegado-Artur",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  
]
let messages = []
let speechesList = []
let actions = []
let files = []
let favorables = []
let againsts = []
let lastVote 
let voteTitle
let privateDocs = []
let publicDocs = []
let postsPreview = []

const meet = {
  room: '',
  password: ''
}
;(async () => {
  await client.connect()
  const usersPrevious = await client.query('SELECT * from users ')
  const messagesPrevious = await client.query('SELECT * from messages ')
  // const postsPrevious = await client.query('SELECT * from posts ')
  // const publicDocsPrevious = await client.query('SELECT * from public_docs ')
  // const privateDocsPrevious = await client.query('SELECT * from private_docs ')
  users = usersPrevious.rows
  addVipClub()
  messages = messagesPrevious.rows
  // files = postsPrevious.rows
  // publicDocs = publicDocsPrevious.rows
  // privateDocs = privateDocsPrevious.rows
  // await client.end()
})()

function addVipClub(){
  users.push( {
    id: 420,
    username: "Tiago Rodrigues",
    email: "tiago.americano.03@gmail.com",
    password: "Tiago2003",
    representation_type: "Mesa",
    representation: "Mesa-Tiago",
    created_at: "2020-10-01 16:22:43",
    updated_at: "2020-10-01 16:22:43"
  },
  {
    id: 421,
    username: "Pedro José",
    email: "pedro.almeida@alunoviva.com.br",
    password: "PedroSiv",
    representation_type: "Chefe de imprensa",
    representation: "Pedro José",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 423,
    username: "Artur Santos",
    email: "artur.santos@alunoviva.com.br",
    password: "ArturSiv",
    representation_type: "Panóptico",
    representation: "Artur",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 424,
    username: "Fernanda Issa",
    email: "fernanda.bottini@alunoviva.com.br",
    password: "FernandaSiv",
    representation_type: "Panóptico",
    representation: "Fernanda Issa",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 425,
    username: "Fernanda Boffelli",
    email: "fernanda.boffelli@alunoviva.com.br",
    password: "FernandaSiv",
    representation_type: "Panóptico",
    representation: "Fernanda Boffeli",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 426,
    username: "Victória Schalch",
    email: "victoria.schalch@alunoviva.com.br",
    password: "VictoriaSiv",
    representation_type: "Intervenção",
    representation: "Victória Schalch",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 427,
    username: "Pedro Toldi",
    email: "pedro.toldi@alunoviva.com.br",
    password: "PedroSiv",
    representation_type: "Mesa",
    representation: "Mesa-Pedro",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 428,
    username: "Pablito",
    email: "pablo.quijada@escolaviva.com.br",
    password: "PabloSiv",
    representation_type: "Panóptico",
    representation: "Pablito",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 429,
    username: "Clara Suplicy",
    email: "clara.suplicy@alunoviva.com.br",
    password: "ClaraSiv",
    representation_type: "Mesa",
    representation: "Mesa-Clara",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 430,
    username: "Diego Garcia",
    email: "diego.garcia@alunoviva.com.br",
    password: "DiegoSiv",
    representation_type: "Staff",
    representation: "Staff-Diego",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 431,
    username: "Caio Suplicy",
    email: "caio.suplicy@alunoviva.com.br",
    password: "CaioSiv",
    representation_type: "Panóptico",
    representation: "Caio Suplicy",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 432,
    username: "Thiago Kuhl",
    email: "thiago.kuhl@escolaviva.com.br",
    password: "ThiagoSiv",
    representation_type: "Panóptico",
    representation: "Thiago Kuhl",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 433,
    username: "Guilherme Vieira",
    email: "guilherme.vieira@escolaviva.com.br",
    password: "GuilhermeSiv",
    representation_type: "Panóptico",
    representation: "Guilherme Vieira",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 434,
    username: "José Pedro",
    email: 'jose.pedro@escolaviva.com.br',
    password: "JoseSiv",
    representation_type: "Panóptico",
    representation: "José Pedro",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 434,
    username: "Jonison Silva",
    email: 'jonison.silva@escolaviva.com.br',
    password: "JoseSiv",
    representation_type: "Panóptico",
    representation: "Jonison Silva",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 435,
    username: "Ana Carvalho",
    email: 'ana.carvalho@escolaviva.com.br',
    password: "AnaSiv",
    representation_type: "Staff",
    representation: "Staff-Ana",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 436,
    username: "Giulia Orioli",
    email: 'giulia.orioli@escolaviva.com.br',
    password: "GiuliaSiv",
    representation_type: "Staff",
    representation: "Staff-Giulia",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 437,
    username: "Luan Foresti",
    email: 'luan.foresti@escolaviva.com.br',
    password: "LuanSiv",
    representation_type: "Chefe de imprensa",
    representation: "Imprensa-Luan",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 438,
    username: "Laura Santos",
    email: 'laura.santos@escolaviva.com.br',
    password: "LauraSiv",
    representation_type: "Chefe de imprensa",
    representation: "Imprensa-Laura",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 439,
    username: "Lucas Costa",
    email: 'lucas.costa@escolaviva.com.br',
    password: "LucasSiv",
    representation_type: "Chefe de imprensa",
    representation: "Imprensa-Lucas",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 440,
    username: "Karime Zamora",
    email: 'karime.zamora@escolaviva.com.br',
    password: "KarimeSiv",
    representation_type: "Panóptico",
    representation: "Karime Zamora",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 440,
    username: "Tomas Porto",
    email: 'tomas.porto@escolaviva.com.br',
    password: "TomasSiv",
    representation_type: "Panóptico",
    representation: "Tomas Porto",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 441,
    username: "Karime Zamora",
    email: 'karime.zamora@escolaviva.com.br',
    password: "KarimeSiv",
    representation_type: "Panóptico",
    representation: "Karime Zamora",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  {
    id: 442,
    username: "Isabela dos Santos",
    email: 'Isabela.dossantos@escolaviva.com.br',
    password: "IsabelaSiv",
    representation_type: "Panóptico",
    representation: "Isabela dos Santos",
    created_at: "2020-11-03 11:05:21",
    updated_at: "2020-11-03 11:05:21"
  },
  
  )
}
io.on('connection', socket =>{
  //Conexão
  console.log('socket conectado: ' + socket.id)

  //Emits
  socket.emit('PreviousEmits', {
    previousMessages : messages,
    speechesList,
    posts: files,
    lastVote,
    publicDocs,
    privateDocs,
    postsPreview
  })


  if(meet.room !== ''){
    socket.emit('setMeet', meet)
    console.log('emit meetRoom' + meet)
  }

  if(!actions[0]){
  io.emit('setActions', [])
  }else{
    io.emit('setActions', actions)
  }

  //Chat
  socket.on('changeContat', data=>{
    let Messages = []
    messages.map(msg=>{
      if(msg.author === data.user && msg.destiny === data.contat){
        Messages.push({content: msg.content, my: 'mine'})
      }else{
      }
      if(msg.destiny === data.user && msg.author === data.contat){
        Messages.push({content: msg.content, my: 'notMine'})
      }else{

      }
    })
    socket.emit('previousMessages', Messages)
  })
  socket.on('sendMessage', data =>{
    messages.push(data)
    socket.broadcast.emit('receivedMessage',data)
    console.log('sendMessage: ')
    console.log(data)
    const {author, destiny, content} = data
    const text = 'INSERT INTO messages(author, destiny, content) VALUES($1, $2, $3) RETURNING *'
    const values = [author, destiny, content]
      client.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows)
      }
    })
  })

  //Lista de Discursos

  socket.on('newSubscribe', representation =>{
    speechesList.push(representation)
    console.log('speechesList: ')
    console.log(speechesList)

    io.emit('setSpeechesList', speechesList)
  })
  socket.on('removeSubscribe', () =>{
    speechesList.shift()
    io.emit('setSpeechesList', speechesList)
  })

  //Questões e Moções
  socket.on('newAction', action=>{
    console.log('newAction')
    actions.push(action)
    console.log('New Action: ')
    console.log(actions)

    io.emit('setActions', actions)
  })
  socket.on('removeAction', action=>{
    console.log('removeAction')
    actions = actions.filter(filter)
    console.log(actions)
    if(!actions[0]){
      console.log([])
    io.emit('setActions', [])

    }else{
      console.log(actions[0].title)

      io.emit('setActions', actions)
    }
    function filter(i){
      if(i.description!==action.description || i.representation !== action.representation){
      console.log(i, action)
      return true
      }else{

        return false
      }
    }
  })

  //Imprensa
  socket.on('post', file=>{
    files.push(file)
    console.log('New Post: ')
    console.log(file)
    io.emit('posts', files)
    const {title, description, link} = file
    const text = 'INSERT INTO posts(title, description, link) VALUES($1, $2, $3) RETURNING *'
    const values = [title, description, link]
      client.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows)
      }
    })
  })

  //Votes

  socket.on('newVote', vote=>{
    console.log('newVote: ' + JSON.stringify(vote))
    io.emit('newVote', vote)
    voteTitle = vote.title
  })
  
  socket.on('responseY', representation=>{
    favorables.push(representation)
    console.log('responseY: ' + favorables)

    io.emit('favorables', favorables)
  })
  socket.on('responseN', representation=>{
    againsts.push(representation)
    console.log('responseN: ' + againsts)

    io.emit('againsts', againsts)

  })
  socket.on('finishVote', vote=>{
    console.log('finishVote: ' + vote)
     favorables = []
     againsts = []
     lastVote = vote
     vote.title = voteTitle
    io.emit('finishVote', vote)

  })

 

  //Docs
  socket.on('newPrivateDoc', doc=>{
    privateDocs.push(doc)
    io.emit("setPrivateDocs", privateDocs)
    io.emit("newDoc", doc)
    console.log('New Private Doc: ')
    console.log(doc)
    const {name, link, user} = doc
    const text = 'INSERT INTO private_docs(name, link, user) VALUES($1, $2, $3) RETURNING *'
    const values = [name, link, user]
      client.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows)
      }
    })
  })
  socket.on('newPublicDoc', doc=>{
    io.emit("newDoc", doc)
    console.log('New Public  Doc: ')
    console.log(doc)
    publicDocs.push(doc)
    io.emit("setPublicDocs", publicDocs)
    const {name, link} = doc
    const text = 'INSERT INTO public_docs(name, link) VALUES($1, $2) RETURNING *'
    const values = [name, link]
      client.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows)
      }
    })

  })

  //Cronometro

  socket.on('startStop', (status)=>{
    io.emit('chronometer', status)
    console.log(status+ ' chronometer')
  })
  socket.on('reset', ()=>{
    io.emit('reset')
    console.log('reset chronometer')
  })

  //PostsPreview

  socket.on('postsPreview', post=>{
    console.log('postsPreview: ')
    postsPreview.push(post)
    console.log(post)

    io.emit('setPostsPreview', postsPreview)
  })
  socket.on('removePostPreview', post=>{
    console.log('removePostPreview: ')
    postsPreview = postsPreview.filter(filter)
    console.log(postsPreview)
    if(!postsPreview[0]){
      console.log([])
    io.emit('setPostsPreview', [])

    }else{
      console.log(postsPreview[0].name)

      io.emit('setPostsPreview', postsPreview)
    }
    function filter(i){
      if(i.description!==post.description || i.representation !== post.representation){
      console.log(i, post)
      return true
      }else{
        return false
      }
    }
  })

  //login
  socket.on('Cadastro', user=>{
  
    const text = 'INSERT INTO users(username, email, password, representation_type, representation) VALUES($1, $2, $3, $4, $5) RETURNING *'
    const values = [user.username, user.email, user.password, user.representation_type, user.representation]
    // callback
    ;(async () =>{
      await client.connect()
    
      client.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows)
      }
    })
    })()
  })

  socket.on('login', user=>{
    
    for(i of users){
      if(user.email === i.email && user.password === i.password){
        socket.emit('login', i)
        socket.emit('PreviousEmits', {
          previousMessages : messages,
          speechesList,
          posts: files,
          lastVote,
          publicDocs,
          privateDocs,
          postsPreview
        })
        console.log('login: ')
        console.log(user)
      }
    }
   
  })

  socket.on('getUsers', ()=>{
    socket.emit('getUsers', users)
  })

  //Intervenção

  socket.on('AddUser', ()=>{
    console.log("AddUser")
    users.push({
      
      id: 100,
      username: "Guilherme Sá",
      email: "guilherme.sa@alunoviva.com.br",
      password: "SivGuilherme",
      representation_type: "Delegado",
      representation: "Brasil",
      created_at: "2020-10-01 16:22:43",
      updated_at: "2020-10-01 16:22:43"
    
    })
    io.emit('getUsers', users)
  })
  socket.on('intervention', ()=>{
    privateDocs = []
    publicDocs = []
    io.emit('intervention')
    io.emit("setPublicDocs", publicDocs)
    io.emit("setPrivateDocs", privateDocs)
    console.log('intervention')
  })
  socket.on('inactiveChat', ()=>{
    console.log('inactiveChat')
    io.emit('inactiveChat')
  })
  socket.on('inactiveNews', ()=>{
    console.log('inactiveNews')

    io.emit('inactiveNews')
  })
  socket.on('activeChat', ()=>{
    console.log('activeChat')
    io.emit('activeChat')
  })
  socket.on('activeNews', ()=>{
    console.log('activeNews')

    io.emit('activeNews')
  })
})
server.listen(3001)


