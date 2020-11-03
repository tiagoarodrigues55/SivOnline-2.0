const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

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
  }

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
      }
      if(msg.destiny === data.user && msg.author === data.contat){
        Messages.push({content: msg.content, my: 'notMine'})
      }
    })
    console.log(Messages)
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
    console.log(actions)

    socket.emit('setActions', actions)
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
    console.log(files)
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
  })
  socket.on('newPublicDoc', doc=>{
    io.emit("newDoc", doc)

    publicDocs.push(doc)
    io.emit("setPublicDocs", publicDocs)
    console.log(publicDocs)
  })

  //Cronometro

  socket.on('startStop', (status)=>{
    socket.emit('chronometer', status)
  })
  socket.on('reset', ()=>{
    socket.emit('reset')
  })

  //PostsPreview

  socket.on('postsPreview', post=>{
    console.log('postsPreview')
    postsPreview.push(post)
    console.log(post)

    socket.emit('setPostsPreview', postsPreview)
  })
  socket.on('removePostPreview', post=>{
    console.log('removePostPreview')
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
})
server.listen(3001)


