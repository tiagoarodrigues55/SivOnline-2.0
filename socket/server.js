const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')
const axios = require('axios')
const api = axios.create({
  baseURL: 'http://localhost:5001/siv-2021/us-central1/app/api',
});

const {
  userJoin,
  getCurrentUser,
} = require('./user');

app.use(cors());

async function getToFirebase(path){
  const response = await api.get(path)
  return response.data
}

async function main(){
  let users = await getToFirebase('/read/users');
  let messages = await getToFirebase('/read/messages');
  let speechesList = []
  let actions = []
  let favorables = []
  let againsts = []
  let lastVote 
  let voteTitle
  let speaker
  let aplausos = []
  let speakers = []
  let postsPreview = []
  let privateDocs = []
  let delegates = []
  let Docs = await getToFirebase('/read/docs');
  let posts = await getToFirebase('/read/posts');

  const meet = {
    room: '',
    password: ''
  }

  io.on('connection', socket =>{

    socket.on('connected', ({username, representation_type})=>{
      const user = userJoin(socket.id, username)
      if(representation_type==="Mesa"){
        socket.join('Mesa')
      }
      if(representation_type==="Chefe de imprensa"){
        socket.join('Chefe de imprensa')
      }
      if(representation_type==="Staff"){
        socket.join('Staff')
      }
      if(representation_type==="Delegado"){
        socket.join('Delegado')
      }
      if(representation_type==="Imprensa"){
        socket.join('Imprensa')
      }
      if(representation_type==="Investidor"){
        socket.join('Investidor')
      }
    })

    //Conexão
    console.log('socket conectado: ' + socket.id)

    //Emits

    socket.emit('PreviousEmits', {
      speechesList,
      posts,
      lastVote,
      Docs,
    })


    if(meet.room !== ''){
      socket.emit('setMeet', meet)
      console.log('emit meetRoom' + meet)
    }

    if(!actions[0]){
      io.to('Mesa').emit('setActions', [])

    }else{
      io.to('Mesa').emit('setActions', actions)
    }
    users.map(res=>res.representation_type === 'Delegado' ? delegates.push(res) : null)
    socket.emit('getDelegates', delegates)

    //Chat
    socket.on('sendMessage', ({author, destiny, content})=>{
      const Destiny = getCurrentUser(destiny)
      messages.push({author, destiny, content})
      api.post('/create/messages', {author, destiny, content})
      if(!Destiny){
        return
      }
      socket.to(Destiny.id).emit('newMessage', author)
    })
    socket.on('changeContat', ({contat, user})=>{

      let Messages = []
      if(!user){
        console.log('user is null')
        return
      }
      messages.map(msg=>{
        if(msg.author === user && msg.destiny === contat){
          Messages.push({content: msg.content, my: 'mine'})
        }
        if(msg.destiny === user && msg.author === contat){
          Messages.push({content: msg.content, my: 'notMine'})
        }
      })
      socket.emit('setMessages', Messages)
    })



    //Lista de Discursos

    socket.on('newSubscribe', representation =>{
      speechesList.push(representation)
      io.emit('setSpeechesList', speechesList)
    })
    socket.on('removeSubscribe', () =>{
      speechesList.shift()
      io.emit('setSpeechesList', speechesList)
    })

    //Questões e Moções
    socket.on('newAction', action=>{
      actions.push(action)
      io.to('Mesa').emit('setActions', actions)
    })
    socket.on('removeAction', action=>{
      actions = actions.filter(filter)
      if(!actions[0]){
        console.log([])
        io.to('Mesa').emit('setActions', [])
      }else{
        io.to('Mesa').emit('setActions', actions)
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
      posts.push(file)
      api.post('/create/posts', file)
      io.emit('posts', posts)
    })

    //Votes

    socket.on('newVote', vote=>{
      io.emit('newVote', vote)
      voteTitle = vote.title
    })
    
    socket.on('responseY', representation=>{
      favorables.push(representation)
      io.emit('favorables', favorables)
    })
    socket.on('responseN', representation=>{
      againsts.push(representation)
      io.emit('againsts', againsts)
    })
    socket.on('finishVote', vote=>{
      favorables = []
      againsts = []
      lastVote = vote
      vote.title = voteTitle
      api.post('/create/votes', vote)
      io.emit('finishVote', vote)
    })

  
    //Docs
    socket.on('newPrivateDoc', doc=>{
      privateDocs.push(doc)
      io.emit("setPrivateDocs", privateDocs)
      io.emit("newDoc", doc)
    })
    socket.on('newPublicDoc', doc=>{
      io.emit("newDoc", doc)
      Docs.push(doc)
      api.post('/create/docs', doc)
      io.emit("setPublicDocs", Docs)
    })

    //Cronometro

    socket.on('startStop', (status)=>{
      io.emit('chronometer', status)
    })
    socket.on('reset', ()=>{
      io.emit('reset')
    })
    socket.on('setSpeechesTime', (time)=>{
      io.emit('setSpeechesTime', time)
    })
    //PostsPreview

    socket.on('postsPreview', post=>{
      postsPreview.push(post)
      io.to("Chefe de imprensa").emit('setPostsPreview', postsPreview)
    })
    socket.on('removePostPreview', post=>{
      console.log('removePostPreview: ')
      postsPreview = postsPreview.filter(filter)
      console.log(postsPreview)
      if(!postsPreview[0]){
        console.log([])
        io.to("Chefe de imprensa").emit('setPostsPreview', [])


      }else{
        console.log(postsPreview[0].name)

        io.to("Chefe de imprensa").emit('setPostsPreview', postsPreview)

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
      api.post('/create/users', user)
    })

    socket.on('login', user=>{
      console.log(user)
      api.post('/auth', user).then(res=>{
        socket.emit('login', res.data)
      })
    })

    socket.on('getUsers', ()=>{
      socket.emit('getUsers', users)
    })

    //jitsi
    socket.on("changeSpeaker", ({id, participants})=>{
      const participant = participants.find(part=>part.participantId === id.id)
      if(speaker !== participant.displayName){
        const now = new Date().getTime()
        speakers.push({speaker: participant.displayName, date:now})
      }
      speaker = participant.displayName
      updatePoints()
    })
    socket.on("aplauso", ()=>{
      const now = new Date().getTime()
      aplausos.push({speaker, date: now})
    })
  })
  server.listen(3001)

  async function updatePoints(){
    for(let delegate of delegates){
      let newPoints = 0
      aplausos.map(({speaker})=>{
        if(speaker === delegate.username){
          newPoints ++ 
        }
      })
      delegate.points += newPoints
      await api.put(`update/users/${delegate.id}`, delegate)
      socket.emit('getDelegates', delegates)

    }
  }
}
main()

