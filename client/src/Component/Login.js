import React, {useState} from 'react'
import { useInRouterContext, useNavigate } from "react-router-dom";
import axios from "axios";

import '../css/board.css';

const Login = () => {

    const [message, setMessage] = useState('');
    const [userid, setUserid] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();

    function onsubmit(){
        if( !userid ){ return alert('아이디를 입력하세요'); }
        if( !pwd ){ return alert('패스워드를 입력하세요'); }

        axios.post('/api/member/login', {userid, pwd})
        .then((result)=>{
            console.log(result.data);
            if( result.data == 'ok'){
                navigate('/main');
            }else{
                setMessage( result.data );
            }
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    return (
        <div className='login'>      
            <form id='login-form'>
                <div className='field'>
                    <label>USER ID</label>
                    <input type='text' value={userid} onChange={(e)=>{ setUserid(e.currentTarget.value);}} />
                </div>
                <div className='field'>
                    <label>PASSWORD</label>
                    <input type='password'  value={pwd} onChange={(e)=>{ setPwd(e.currentTarget.value);}} />
                </div>
                <div className='btns'>
                    <input type="button" value='LOGIN' onClick={()=>{ onsubmit(); }} />
                    <input type="button" value='JOIN' onClick={()=>{ navigate('/joinForm'); }}/>
                </div>
                <div>{message}</div>
            </form>    
        </div>
    )
}

export default Login
