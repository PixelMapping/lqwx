import React, { useState, useEffect } from 'react';
import { Button, InputItem, Checkbox,Toast,List } from 'antd-mobile';
import './index.less';
import { loginSmsCode ,login,myInfo} from '@/services/index'
const AgreeItem = Checkbox.AgreeItem;
import Cookies from 'js-cookie'


export default (props:any) => {

  let [formData,setForm] = useState({phone:'',code:'',check:false})
  let [time,setTime] = useState(60)

  useEffect(() => {
   let token=Cookies.get('token')
   let user=JSON.parse(Cookies.get('user')||'{}')
   if(token){
    myInfo({}).then(res=>{
      if(res.data.authentFlag=='0'){
        props.history.push('/autonym')
      }else if(user.signFlag!='1'){
        props.history.push('/entrust')
      }else{
        props.history.push('/home')
      }
    })
    
   }
  }, [])

  const goAgree = ()=>{
    props.history.push('agreement')
  }

  const getCode =()=>{
    if(formData.phone.length!=11){
      Toast.info('请输入正确的手机号码！')
      return
    }
    let timer=setInterval(()=>{
      if(time>0){
        setTime(--time)
      }else{
        clearInterval(timer)
        setTime(60)
      }
    },1000)
    loginSmsCode({phone:formData.phone}).then(res=>{
      if(res.result){
        Toast.info('发送成功！')
      }
    })
   
  }

  const changeInput =(key:string,event:any)=>{
    setForm({...formData,[key]:event})
  }

  const changeCheck =(e:any)=>{
    setForm({...formData,check:e.target.checked})
  }

  const sub =()=>{
    console.log(formData)
    if(formData.phone==''||formData.phone.length!=11){
      Toast.info('请输入正确的手机号！');
      return
    }else if(formData.code==''){
      Toast.info('请输入验证码！')
      return
    }else if(!formData.check){
      Toast.info('请阅读并同意服务协议！')
      return
    }else{
      let data={phone:formData.phone,code:formData.code}
      login(data).then(res=>{
        if(res.result){
          Cookies.set('token',res.data.token,{ expires: 7 })          
          Cookies.set('user',res.data.user,{ expires: 7 })
          if(res.data.user.authentFlag==''||res.data.user.authentFlag==0){
            props.history.push('/autonym')
          }else if(res.data.user.signFlag!=1){
            props.history.push('/entrust')
          }else{
            props.history.push('/home')
          }
        }
      })
    }
  }

  return (
    <div className="login">
      <div className="cont">
      <header></header>
      <div className="form">
        <div className="phone">
          <InputItem onChange={changeInput.bind(this,'phone')} maxLength={11} placeholder="请输入手机号码"></InputItem>
        </div>
        <div className="code">
          <InputItem onChange={changeInput.bind(this,'code')} placeholder="请输入验证码"></InputItem>
          <Button onClick={getCode} disabled={time==60?false:true} size="small">{time==60?'获取验证码':(time+'s')}</Button>
        </div>
        <div className="des">未注册手机验证后自动登录</div>
        <Button type="primary" className="mt30" onClick={sub}>登录</Button>

      </div>
      </div>
      <footer>
        <div className="bot">
          <AgreeItem data-seed="logId" onChange={changeCheck}>
            <a onClick={goAgree} style={{color:"#999"}}>登录注册即代表您已阅读并同意<span className="ftC1">《服务协议》</span>
            </a>
          </AgreeItem>
        </div>
      </footer>
    </div>
  );
}
