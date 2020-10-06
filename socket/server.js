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
io.on('connection', socket =>{
  //Conexão
  console.log('socket conectado: ' + socket.id)

  //Emits
  socket.emit('previousMessages', messages)
  socket.emit('setSpeechesList', speechesList)
  socket.emit('posts', files)
  socket.emit('lastVote', lastVote)

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
    io.emit('finishVote', vote)
  })

  
})
server.listen(3001)
