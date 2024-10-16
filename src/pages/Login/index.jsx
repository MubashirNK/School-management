import React, { useState } from 'react'

function Login() {

const [formData,setFormdata]=useState({
    email:"",
    password:""

});

const handleChange=(event) => {
    const {name,value}=event.target
    setFormdata((prevdata)=>({...prevdata,[name]:value}))
}
  return (
    <div>
<h2>Login</h2>
<form action=""><div>
    
</div>
 <div>
<label htmlFor="username">
    <input type="text" placeholder='email' name='email' value={formData.email} onChange={handleChange} />
</label>
</div>

 <div>
<label htmlFor="password" > 
    <input type="text"  placeholder="password" name="password" value={formData.password}/>
</label>
</div>

<button type='submit'>Login</button>

</form>


    </div>
  )
}

export default Login