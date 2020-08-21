import React, { useState ,useEffect } from 'react'
import { Button } from 'antd-mobile';
import {getMultipleSign} from '@/services/index'
import './index.less'
import Cookies from 'js-cookie'

export default (props:any)=>{
  const [info,setInfo]=useState<any>({})


  useEffect(()=>{
    getMultipleSign({}).then(res=>{
      if(res.result){
        setInfo(res.data)
      }
    })
  },[])

  const toSing=()=>{
    window.location.href=info.url
  }

  const goNext=()=>{
    let user=JSON.parse(Cookies.get('user')||'{}')
    user.signFlag=1
    Cookies.set('user',user,{ expires: 7 })

    props.history.push('home')
  }

  return(
    <div className="entrust">
      {
        info!=''&&(
          <div className={info.signStatus=='1'?'list hover':'list'} onClick={toSing}>
          <div className="lt">
            {/* <img src={require('../../assets/icon_entrust1.png')} alt=""/> */}
            {
              info.signStatus==1?(
                <img src={require('../../assets/icon_entrust2.png')} alt=""/>
              ):(
                <img src={require('../../assets/icon_entrust1.png')} alt=""/> 
              )
            }
            <div className="info">
            <div className="tit">{info.title}</div>
            <p>{info.describe}</p>
            </div>
          </div>
          <div className="rt"></div>
      </div>
        )
      }
      <Button type="primary" disabled={info.signStatus!=1} onClick={goNext} className="btns">下一步</Button>
    </div>
  )
}
