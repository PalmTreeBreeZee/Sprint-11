import React, { useState } from 'react'
import PT from 'prop-types'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
   fetch('http://localhost:9000/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: values.username,
        password: values.password
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(res =>{
      if(!res.ok) throw new Error(`Something went wrong: ${res.status}`)
      const data = res.json()
      return data
    })
    .then(data => console.log('Success: ', data))
    .catch(err => console.log('Whoops :', err.message))
  }
  
  const isDisabled = () => {
    // ✨ implement
    // Trimmed username must be >= 3, and
    // trimmed password must be >= 8 for
    // the button to become enabled
    
    console.log(evt)
    if(values.username.length >= 3 && values.password.length >= 8){
      
    }
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
