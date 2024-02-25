import './Login.scss'
import SectionDivider from '/src/components/sectionDivider/SectionDivider'
import axios from 'axios'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  const handleInputChange = (state, stateHandler) => {
    stateHandler(state); 
  };

  const handlelogin = (event) => {
    event.preventDefault; 

    let data = {
      email: email,
      password: password, 
    }

    axios.post('/login', data)
    .then(() => {
      
      console.log('axios post request login sent'); 
    })
    .catch(err => {
      console.log('axios post request login failed', err); 
    })
  };
  
  



  return (
    <section className='login'>
       
        <form className='login__form'>
        <span>Sign In</span>
            <div className='login__form-group'>
              <label htmlFor='email'>Email Address</label>
              <div className='login__textBox'>
                <input value={email} onChange={(e) => {handleInputChange(e.target.value, setEmail)}}type='text' id='email' name='email'></input>
              </div>
            </div>
           
            <div className='login__form-group'>
              <label htmlFor='password'>Password</label>
              <div className='login__textBox'>
                <input value={password} onChange={(e) => {handleInputChange(e.target.value, setPassword)}}type='password' id='password' name='password'></input>
              </div>
            </div>
            <span>Forgot your password?</span>
            <div className='form__button-container '>
              <button className='form__button form__button-stylesBlack' onClick={(evt) => handlelogin(evt)} type='button'>Sign In</button>
            </div>
        </form>
        <SectionDivider/>
        <div className='login__option'>
            <span>Don't have an account?</span>
            <div className='form__button-container'>
              <Link to='/register'>
                <button className='form__button form__button-stylesWhite'>Create Account</button>
              </Link>
            </div>
        </div>
       
    </section>
  )
}

export default Login