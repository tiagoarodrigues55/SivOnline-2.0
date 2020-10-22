import React, { useState, ChangeEvent, FormEvent} from 'react'
import api from '../../services/api'
import {useHistory} from 'react-router-dom'
import {Div} from './styles'
import logo from '../../assets/logo.png'

const Index: React.FC = () => {
  const history = useHistory()
  const [data, setData] = useState({email: '', password: ''})
  function login(event: FormEvent){
    event.preventDefault()
    api.post('/auth',{
        email:data.email,
        password:data.password
    }).then(res=>{
      console.log(res.data.token.token)

      localStorage.setItem('token', res.data.token.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      api.get('getUserInfo', {headers: {Authorization : `Bearer ${res.data.token.token}`}}).then(res=>{
      localStorage.setItem('representation', res.data.representation)

        if(res.data.representation_type === 'Mesa'){
          history.push('/Moderator')
        }else{
          if(res.data.representation_type === 'Delegado'){
            history.push('/Delegate')

          }else{
            
          }
        }

      })

    }).catch(err=>console.log(err))
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target
    
    setData({...data, [name]: value})
  }
  return (
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
  )
}
export default Index