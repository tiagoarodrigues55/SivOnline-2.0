
import React, { Component } from 'react'
import io from 'socket.io-client'
const socket = io(process.env.SOCKET_URL || 'I hate typescript')

class Chronometer extends Component {


  constructor (props) {
    super(props)
    this.state = {
      count: 1,
      startCount: 100,
      status: 'start'
    }
  }
  render () {
    const {count} = this.state
    if(this.props.moderator){
      return (
        <div>
          <h1>{count}</h1>
          <button name={this.state.status} onClick={()=>{socket.emit('startStop', this.state.status)}}>
            {this.state.status}
          </button>
          <button onClick={()=>{ socket.emit('reset')}}>Reset</button>
       
            <input onChange={(e)=>this.setState({count : Number(e.target.value), startCount: Number(e.target.value)})} type="number"/>
        </div>
      )
    }
    return (
      <div>
        <h1>{count}</h1>
      </div>
    )
  }

  // setInterval
  // clearInterval
  componentDidMount () {
    const {startCount} = this.props
    this.setState({
      count: startCount
    })
    socket.on('chronometer', (status)=>{
      if(status==='start'){
       console.log(this.state.status) 
       this.doIntervalChange()
       this.setState({
        count: this.state.count,
        status: 'stop'
      })
     }else{
       console.log(this.state.status)
       clearInterval(this.myInterval)
       this.setState({
         count: this.state.count,
         status: 'start'
       })
     }
   })
   socket.on('reset', ()=>{
    this.setState({count: this.state.startCount})
   })
    // this.doIntervalChange()
  }

  doIntervalChange = () => {
      this.myInterval = setInterval(() => {
      this.setState(prevState => ({
        count: prevState.count - 1
      }))
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.myInterval)
  }
}

export default Chronometer