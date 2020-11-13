const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')
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
    username: "Fernanda Bofelli",
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

io.on('connection', socket =>{
  //Conexão
  console.log('socket conectado: ' + socket.id)

  //Emits
  socket.emit('previousMessages', messages)
  socket.emit('setSpeechesList', speechesList)
  socket.emit('posts', files)
  socket.emit('lastVote', lastVote)
  socket.emit("setPublicDocs", publicDocs)
  socket.emit("setPrivateDocs", privateDocs)
  socket.emit('setPostsPreview', postsPreview)

  if(meet.room !== ''){
    socket.emit('setMeet', meet)
    console.log('emit meetRoom' + meet)
  }
  console.log('setActions' + actions)

  if(!actions[0]){
  io.emit('setActions', [])
  }else{
    io.emit('setActions', actions)
  }

  //Chat
  socket.on('changeContat', data=>{
    console.log('changeContat', data.contat)
    let Messages = []
    messages.map(msg=>{
      if(msg.author === data.user && msg.destiny === data.contat){
        Messages.push({content: msg.content, my: 'mine'})
      }else{
        console.log(msg.author, data.user, msg.destiny, data.contat)
      }
      if(msg.destiny === data.user && msg.author === data.contat){
        Messages.push({content: msg.content, my: 'notMine'})
      }else{
        console.log(msg.author, data.user, msg.destiny, data.contat)

      }
    })
    console.log(messages)
    socket.emit('previousMessages', Messages)
  })
  socket.on('sendMessage', data =>{
    messages.push(data)
    socket.broadcast.emit('receivedMessage',data)
    console.log('sendMessage: ')
    console.log(data)
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
  })
  socket.on('newPublicDoc', doc=>{
    io.emit("newDoc", doc)
    console.log('New Public  Doc: ')
    console.log(doc)
    publicDocs.push(doc)
    io.emit("setPublicDocs", publicDocs)
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
      console.log(postsPreview[0].title)

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


  socket.on('login', user=>{
    
    for(i of users){
      if(user.email === i.email && user.password === i.password){
        socket.emit('login', i)
        console.log('login: ')
        console.log(user)
      }
    }
   
  })

  socket.on('getUsers', ()=>{
    socket.emit('getUsers', users)
  })
})
server.listen(3001)


