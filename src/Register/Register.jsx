import './Register.scss'
import SectionDivider from '/src/components/sectionDivider/SectionDivider'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { useState, useEffect } from 'react'; 
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [email, setEmail] = useState(''); 
  const [emailError, setEmailError] = useState('');
  const [emailValidated, setEmailValidated] = useState(false); 
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState(''); 
  const [passwordError, setPasswordError] = useState('');
  const [passwordValidated, setPasswordValidated] = useState(false); 
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [firstName, setFirstName] = useState(''); 
  const [firstNameError, setFirstNameError] = useState('');
  const [firstNameValidated, setFirstNameValidated] = useState(false); 
  const [firstNameTouched, setFirstNameTouched] = useState(false);

  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [cityValidated, setCityValidated] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);

  const navigate = useNavigate();

  const cities = [
    { name: "New York" },
    { name: "Los Angeles" },
    { name: "Chicago" },
  ];

  const handleCityChange = (selectedCity) => {
    setCityTouched(true);
    setCity(selectedCity);
    const error = ''; // Implement any specific validation logic for city if needed
    setCityError(error);
    setCityValidated(!error);
  };

  const notify = () => {
    toast("Login successful!", {
      position: "top-center",
      autoClose: false, // Disable auto-close
      closeOnClick: true, // Allow closing by clicking anywhere on the toast
      pauseOnHover: true,
      draggable: true, // Allow drag to dismiss
      theme: "colored", // Use the default colored theme
    });
  };

 
  

 

  const [formValidated, setFormValidated] = useState(false); 

  //function that does client side verification and sets the state
  const handleEmailChange = (email) => {
    setEmailTouched(true);
    setEmail(email);
    const error = handleEmailValidation(email); 
    setEmailError(error); 
    setEmailValidated(!error); 

  };

  const handleEmailValidation = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email.toLowerCase())) {
      return 'Enter a valid Email';
    } else {
      return '';
    }
  }
  
  const handlePasswordChange = (password) => {
    setPasswordTouched(true);
    setPassword(password); 
    const error = handlePasswordValidation(password); 
    setPasswordError(error)
    setPasswordValidated(!error); 

  };

  const handlePasswordValidation = (password) => {
    if (password.length < 8) {
      return('Must be 8 characters or more'); 
    } else if (password.length > 20) {
      return('Must be 20 characters or less'); 
    } else if (!/[A-Z]/.test(password)) {
      return('Must contain at least one uppercase letter');
    } else if (!/[0-9]/.test(password)) {
      return('Must contain at least one number');
    } else {
      return(''); 
    }
  }

  

  

  const handleNameChange = (newName) => { 
    setFirstNameTouched(true);
    setFirstName(newName); 
    const error = handleNameValidation(newName); 
    setFirstNameError(error); 
    setFirstNameValidated(!error); 
  }

 
  const handleNameValidation = (name) => {
    if (name.length > 1 && name.length < 20) {
      return '';
    } else {
      return 'Enter a valid name';
    }
  };


  useEffect(() => {
    // This function will now automatically be called whenever any of the dependencies change.
    const validateForm = () => {
      if (emailValidated && passwordValidated && firstNameValidated && cityValidated) {
        console.log("Form is validated");
        setFormValidated(true);
      } else {
        console.log('Changes done, form is not validated yet');
        setFormValidated(false);
      }
    };
  
    validateForm();
  }, [emailValidated, passwordValidated, firstNameValidated, cityValidated]); // Add all the dependencies here

  //function to send the data to the server
  const sendData = (event) => {
    event.preventDefault(); 
    console.log('about to send data');
   
    let userData = {
      firstName: firstName, 
      email: email, 
      password: password, 
      cityName: city
    }

    axios.post('http://localhost:8080/register', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(results => {
      console.log('success', results); 
      navigate('/signin');
    })
    .catch(err => {
      console.log("there was an error", err.response); 
    })
  } 

  return (
    <section className='register'>
        <form className='register__form' onSubmit={sendData}>
        <span>Register</span>
            <div className='register__form-group'>
              <label htmlFor='email'>Email Address</label>
              <div className='register__textBox' 
              style={{ border: emailTouched && !emailValidated ? '1px solid rgb(182, 2, 24)' : '' }}>
                <input value={email} type='email' onChange={(e) => {handleEmailChange(e.target.value)}} id='email' name='email'></input>
                <div className='register__form-error'>
                  <span>{emailError}</span>
                </div>
              </div>
            </div>

          <div className='register__form-group'>
            <label htmlFor='firstName'>First Name</label>
            <div className='register__textBox' style={{ border: firstNameTouched && !firstNameValidated ? '1px solid rgb(182, 2, 24)' : '' }}>
                <input value={firstName} type='text' onChange={(e) => {handleNameChange(e.target.value, 'first')}} id='firstName' name='firstName'></input>
                <div className='register__form-error'>
                  <span>{firstNameError}</span>
                </div>
            </div>
          </div>
           
          {/* Password */}
          <div className='register__form-group'>
            <label htmlFor='password'>Password</label>
            <div className='register__textBox'  style={{ border: passwordTouched && !passwordValidated ? '1px solid rgb(182, 2, 24)' : '' }}>
              <input value={password}  type='password' onChange={(e) => {handlePasswordChange(e.target.value)}} id='password' name='password'></input>
              <div className='register__form-error'>
                <span>{passwordError}</span>
              </div>
            </div>
          </div>

          <div className='register__form-group'>
  <label aria-label="city" htmlFor='city'></label>
  <select
    value={city}
    onChange={(e) => handleCityChange(e.target.value)}
    className='register__select'
    style={{ border: cityTouched && !cityValidated ? '1px solid rgb(182, 2, 24)' : '' }}
    id='city'
    name='city'
  >
    <option value=''>Select a city</option>
    {cities.map((city, index) => (
      <option key={index} value={city.name}>{city.name}</option>
    ))}
  </select>
  <div className='register__form-error'>
    <span>{cityError}</span>
  </div>
</div>
            
          <div className='form__button-container '><button disabled={formValidated ? false: true} onClick={(e) => sendData(e)} id="sendButton" className='form__button form__button-stylesBlack' type='submit'>Create Account</button></div>
        </form>
        <SectionDivider/>
        <div className='register__option'>
            <span>Already have an account?</span>

            <div className='form__button-container'>
              <Link to='/signin'>
                <button className='form__button form__button-stylesWhite'>Sign In</button>
              </Link>
            </div>
        </div>
       
    </section>
  )
}

export default Register