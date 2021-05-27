import React, { useState, ChangeEvent, FormEvent, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Div} from './styles'
import logo from '../../assets/logo.png'
import {useSocket} from '../../socket'
interface User{
  token: string,
  representation: string,
  representation_type: string,
  newspaper_group?: string
}
const Index: React.FC = () => {
  const socket = useSocket()

  const history = useHistory()
  const [data, setData] = useState({email: '', password: ''})
  function login(event: FormEvent){
    event.preventDefault()
    console.log(data)
    socket.emit('login', {email: data.email, password: data.password})
  
  }

  useEffect(()=>{
    socket.on('login', (data: User)=>{
      console.log(data)
      localStorage.setItem('representation', data.representation)
      localStorage.setItem('representation_type', data.representation_type)
  
        if(data.representation_type === 'Mesa'){
          history.push('/Moderator')
        }else{
          if(data.representation_type === 'Delegado'){
            history.push('/Delegate')
  
          }else{
            if(data.representation_type === 'Staff'){
              history.push('/Staff')
          }else{
            if(data.representation_type === 'Imprensa'){
              if(data.newspaper_group){
            localStorage.setItem('newspaper_group', data.newspaper_group)
              }
            history.push('/Newspaper')
            }else{
              if(data.representation_type === 'Chefe de imprensa'){
  
                history.push('/NewspaperBoss')
              }else{
                if(data.representation_type === 'Panóptico'){
  
                  history.push('/Panoptic')
                }else{
                  if(data.representation_type === 'Intervenção'){
  
                    history.push('/Intervention')
                  }else{
                    if(data.representation_type === 'Investidor'){
  
                      history.push('/Investidor')
                    }else{
                    console.log(data.representation_type)
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
    
  },[])

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target
    
    setData({...data, [name]: value})
  }
  return (
    <>
      <Div>
        <div>
          <img src={logo} alt=""/>
          <section>
            <form onSubmit={login}>
            <input type="email" name="email" placeholder="exemplo@alunoviva.com.br"  onChange={handleInputChange}/>
            <input type="password" name="password" placeholder="senha" onChange={handleInputChange}/>
            <button type="submit">Entrar</button>
            </form>
          </section>
        </div>
      </Div>

    </>
  )
}
export default Index