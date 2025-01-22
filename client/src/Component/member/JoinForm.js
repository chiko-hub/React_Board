import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const JoinForm = () => {

    const [userid, setUserid] = useState('');
    const [idRes, setIdRes] = useState('');
    const [reid, setReid ] = useState('');
    const navigate = useNavigate();

    


    function idCheck(){
        axios.post('/api/member/idcheck', {userid})
        .then((result)=>{
            if( result.data == 'ok'){
                setIdRes('사용가능');
                setReid(userid);
            }else{
                setIdRes('사용불가능');
                setReid('');
            }
        })
        .catch((err)=>{});
    }

    const [pwd, setPwd] = useState("");
    const [pwdchk, setPwdchk] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    function onsubmit(){
        // 입력한 내용을 회원 가입을 합니다.
        // 비어있거나 맞지 않거나 아이디중복체크를 하지 않았다면 alert으로 알려주세요
        // 회원가입의 결과도 alert 으로 알려주고 최종 로그인 페이지로 이동합니다.
        // 서버의 라우터이름은 join 입니다.
        if( !userid ){ return alert('아이디를 입력하세요');   }
        if( !pwd ){  return alert('패스워드를 입력하세요');   }
        if( !name ){ return alert('이름을 입력하세요');   }
        if( !email ){  return alert('이메일을 입력하세요');   }
        if( !phone ){ return alert('전화번호를 입력하세요');   }
        if( pwd != pwdchk ){  return alert('패스워드확인이 일치하지 않습니다');   }
        if( userid != reid ){ return alert('아이디 중복검사를 하지 않았습니다.');}

        axios.post('/api/member/join', {userid, pwd, name, email, phone})
        .then((result)=>{
            if( result.data=='ok'){
                alert('회원가입이 완료되었습니다. 로그인하세요');
            }else{
                alert('회원가입에 문제가 있습니다. 관리자에게 문의하세요');
            }
            navigate('/');
        }).catch((err)=>{
            console.error(err);
            navigate('/');
        })
    }

    return (
        <div className='login'>
            <form id='login-form'>
                <h2>JOIN FORM</h2>
                <div className='field'>
                    <label>USERID</label>
                    <div style={{display:'flex', flex:'3'}}>
                        <input type='text' style={{flex:'1'}} value={userid} onChange={(e)=>{ setUserid( e.currentTarget.value ); }}/>
                        <input type='button' value='ID CHECK'  style={{flex:'1'}} onClick={()=>{ idCheck(); }}/>
                        <div  style={{flex:'1'}}>{idRes}</div>
                        <input type='hidden' name='reid' value={reid} />
                    </div>
                </div>
                <div className='field'>
                    <label>PASSWORD</label>
                    <input type='password'value={pwd} onChange={(e)=>{ setPwd( e.currentTarget.value ); }}/>
                </div>
                <div className='field'>
                    <label>ReType PW</label>
                    <input type='password'value={pwdchk} onChange={(e)=>{ setPwdchk( e.currentTarget.value ); }}/>
                </div>
                <div className='field'>
                    <label>NAME</label>
                    <input type='text' value={name} onChange={(e)=>{ setName( e.currentTarget.value ); }}/>
                </div>
                <div className='field'>
                    <label>PHONE</label>
                    <input type='text' value={phone} onChange={(e)=>{ setPhone( e.currentTarget.value ); }}/>
                </div>
                <div className='field'>
                    <label>EMAIL</label>
                    <input type='text' value={email} onChange={(e)=>{ setEmail( e.currentTarget.value ); }}/>
                </div>
                <div className='btns' >
                    <input type='button' value='JOIN' onClick={()=>{ onsubmit(); }} />
                    <input type='button' value='BACK' onClick={()=>{ navigate('/'); }}/>
                </div>
            </form>
        </div>
    )
}

export default JoinForm
