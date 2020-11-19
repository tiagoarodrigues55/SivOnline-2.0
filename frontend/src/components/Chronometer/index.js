
import React, { Component } from 'react'



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
          <button name={this.state.status} onClick={()=>{this.props.socket.emit('startStop', this.state.status)}}>
            {this.state.status}
          </button>
          <button onClick={()=>{ this.props.socket.emit('reset')}}>Reset</button>
       
            <input onChange={(e)=>{
              this.setState({count : Number(e.target.value), startCount: Number(e.target.value)})
              this.props.socket.emit('setSpeechesTime', Number(e.target.value))
            }
              
              } type="number"/>
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
    this.props.socket.on('chronometer', (status)=>{
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
   this.props.socket.on('reset', ()=>{
    this.setState({count: this.state.startCount})
   })
   this.props.socket.on('setSpeechesTime', (time)=>{
    this.setState({count: time})
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