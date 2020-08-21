import React, { useState, useEffect } from 'react'
import { Button } from 'antd-mobile';
import { getCertificateDetail } from '@/services/index'
import WxImageViewer from 'react-wx-images-viewer';
import './index.less'
import { ErrorShowType } from 'umi';

export default (props: any) => {
  const [authentFlag, setAuthentFlag] = useState('')
  const [info, setInfo] = useState<any>({})
  const [isOpen,setOpen] = useState(false)
  const [imgs,setImgs] = useState([])
  useEffect(() => {
    console.log(props)
    if (props.location.state) {
      setAuthentFlag(props.location.state.authentFlag)
    }
    if (authentFlag == '1') {
      getCertificateDetail({}).then(res => {
        if (res.result) {
          if(res.data){
            let arr = res.data.certificateUrl.split(',')
            setImgs(arr)
            setInfo(res.data)
          }
          
        }
      })
    }
  }, [authentFlag])
  return (
    <div className="register">
      {
        authentFlag == '1' ? (
          <div className="info">
            <div className="card">
              <div className="tit">个体工商户执照详情</div>
              <p>字号名称：（{info.brandName}）</p>
              <p>注册号：{info.registNum}</p>
              <p>经营范围：{info.businessScope}</p>
              <p>组织形式：{info.organizeForm}</p>
              <p>经营场所：{info.placeBusiness}</p>
              {/* <p>经营场所：xxxxxxx</p> */}
              <p>执照有效期：{info.effectiveTimeBegin}至{info.effectiveTimeEnd}</p>
              <p>发证机关：{info.issuingAuthority}</p>
            </div>
            <div className="card">
              <img src={info.certificateUrl} onClick={()=>{setOpen(true)}} alt=""/>
            </div>
            {
              isOpen ? <WxImageViewer onClose={()=>{setOpen(false)}} urls={imgs} /> : ""
            }
          </div>
        ) : (
            <div className="audit">
              <img src={require('../../assets/ic_audit.png')} />
              <p>个体工商户注册审核中</p>
            </div>
          )
      }

    </div>
  )
}
