import './Login.css';
import FreelancerDashboard from './FreelancerDashboard';
import {useRef, useState, useEffect, useContext} from 'react';
import {MdEmail, MdLock} from 'react-icons/md'; 
import axios from 'axios';
const Login = () =>{

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  
  useEffect(()=>{
    emailRef.current.focus()
  }, [])
  
  useEffect(()=>{
    setErrMsg('')
  }, [email, password])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/freelancer/login',
                        JSON.stringify({email, password}),
                        {
                          headers: {'Content-Type': 'application/json'}
                        }
      );
      console.log(response);
      const accessToken = response?.data?.signature;
      setEmail('');
      setPassword('');
      setSuccess(true);
    } catch(err){
      if(!err?.response){
        setErrMsg("No Server Response")
      } else if(err.response?.status === 403) {
        setErrMsg("Invalid Password")
      }else{
        setErrMsg("Login Credentials Failed")
      }
      errRef.current.focus();
    }
  }
  
  return (
  <>
    {success? (
      <>
      <FreelancerDashboard />
      </>
   )
      :
   (
     <div className="login-root">
      <div className="box-root flex-flex flex-direction--column">
        <div className="formbg-outer">
          <div className="formbg">
            <div className="formbg-inner padding-horizontal--48">
              <span className="padding-bottom--15">
                Welcome back
              </span>
              <p ref={errRef} className= {errMsg ? "errmsg" : "offscreen"} aria-live= "assertive">{errMsg}</p>                 
              <form id="stripe-login" onSubmit={handleSubmit}>
                <div className="field padding-bottom--24">
                  <span className="icon"><MdEmail /></span>
                  <input 
                      type="email"
                      name="email"
                      ref={emailRef}
                      autoComplete= "off"
                      onChange = {(e)=>setEmail(e.target.value)}
                      value={email}
                      placeholder="Email-Address"
                      required />
                </div>
                <div className="field padding-bottom--24">
                  <span className="icon"><MdLock /></span>
                  <input
                      type="password"
                      name="password"
                      autoComplete= "off"
                      value= {password}
                      onChange= {(e)=> setPassword(e.target.value)}
                      placeholder="Password"
                      required />
                </div>
   
                <div className="field padding-bottom--24">
                  <input type="submit" name="submit" value="Log in to your account" />
                </div>
              </form>
              <div className="reg">
              Just getting started? &nbsp;
              Create an account
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
   )}
    </>
  )
}
export default Login;
