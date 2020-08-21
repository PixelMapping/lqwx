import React, { useEffect } from 'react'
import { Icon, Toast } from 'antd-mobile';
import { getDetectInfo} from '@/services/index'
import './index.less'
import Cookies from 'js-cookie'

export default (props:any)=>{
  useEffect(()=>{
    getInfo()
  },[])

  const getInfo=()=>{
    let bizToken=localStorage.getItem('bizToken')
    let user=JSON.parse(Cookies.get('user')||'{}')
    getDetectInfo({bizToken:bizToken,phone:user.phone}).then(res=>{
      if(res.result){
        Toast.info('认证完成即将跳转授权页面',2,()=>{
          props.history.push('/entrust')
        })
      }
    })
  }


  return(
    <div className="complete">
        <Icon type="check-circle" size="lg" color="#FFF"></Icon>
        <p>已完成人脸识别</p>
    </div>
  )
}
