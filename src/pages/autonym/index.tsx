import React, { useState, useEffect } from 'react';
import { Button, InputItem, ImagePicker, Toast ,List} from 'antd-mobile';
import './index.less';
import { upload, credentialVerifyCard, credentialVerifyByMobile, detectAuth } from '@/services/index'
import CanvasDraw from "react-canvas-draw";
import Cookies from 'js-cookie'
import { createForm } from 'rc-form';

const autonym =(props:any) => {
  const [filesZ, setFilesZ] = useState<any>([])
  const [filesF, setFilesF] = useState<any>([])
  const [data, setData] = useState<any>({ name: '', identity: '', bankAccount: '' })
  const [imgSrc, setSrc] = useState('')
  const signCanvas = React.createRef();
  const [show,setShow] = useState(true)
  const { getFieldProps } = props.form;
  const myRef=React.createRef();
  useEffect(() => {
    if (filesZ.length > 0 && filesF.length > 0) {
      getName()
    }
  }, [filesZ, filesF])


  const onChange = (type: string, event: any) => {
    if (event.length > 0) {
      upImg(event[0].file, type)
    } else if (type == '1') {
      setFilesZ([])
    } else if (type == '2') {
      setFilesF([])
    }
  }

  const getName = () => {
    let data = {
      identityImage: filesZ[0].url,
      identityBackImage: filesF[0].url
    }
    credentialVerifyCard(data).then(res => {
      if (res.result) {
        // setData({ name: res.data.realName, identity: res.data.idcardNum })
      }
    })
  }

  const upImg = (file: any, type: string) => {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('type', '1')
    upload(formData).then(res => {
      if (res.result) {
        if (type == '1') {
          setFilesZ([{ url: res.data, title: '身份证人像面' }])
        } else if (type == '2') {
          setFilesF([{ url: res.data, title: '身份证国徽面' }])
        }
      }
    })
  }

  const sub = () => {
    let user = JSON.parse(Cookies.get('user')||'{}')
    if (filesF.length == 0 || filesZ.length == 0) {
      Toast.info('请上传有效身份证！') 
    } else if (data.name == '') {
      Toast.info('请填写姓名！')
    } else if (data.identity == '') {
      Toast.info('请填写身份证号码！')
    } else if (data.bankAccount == '') {
      Toast.info('请填写银行卡号!')
    }else if(imgSrc==''){
      Toast.info('请手写签名！')
    } else {
      let obj = {
        name: data.name,
        identity: data.identity,
        mobile: user.phone,
        bankAccount:data.bankAccount,
        sign:imgSrc
      }
      credentialVerifyByMobile(obj).then(res => {
        if (res.result) {
          //腾讯云人脸核身
          detectAuth({
            idCard: data.identity,
            name: data.name,
            identityImage: filesZ[0].url,
            redirectUrl: `${window.location.origin}/complete`
          }).then(res => {
            if (res.result) {
              localStorage.setItem('bizToken', res.data.bizToken)
              window.location.href = res.data.url
            }
          })
        }
      })
    }
  }

  const clear = () => {
    signCanvas.current.clear();
    setSrc('')
    // console.log(signCanvas.current.canvas.drawing.toDataURL('image/png'))
  }

  const create=()=>{
    setSrc(signCanvas.current.canvas.drawing.toDataURL('image/png'))
  }



  return (
    <div className="autonym">
      <div className="upimg">
        <div className="card imgz">
          <ImagePicker
            length="1"
            files={filesZ}
            onChange={onChange.bind(this, '1')}
            selectable={filesZ.length < 1}
          />
          <p className="des">
            点击拍摄/上传人像面
          </p>
        </div>
        <div className="card imgF">
          <ImagePicker
            length="1"
            files={filesF}
            onChange={onChange.bind(this, '2')}
            selectable={filesF.length < 1}
          />
          <p className="des">
            点击拍摄/上传国徽面
          </p>
        </div>
        <div className="text">拍摄须知</div>
      </div>
      <div className="form">
        <List>
        <InputItem
          placeholder="请输入真实姓名"
          clear
          value={data.name}
          onFocus={()=>{setShow(true)}}
          onChange={(v) => { setData({ ...data, name: v }) }}
        >真实姓名</InputItem>
        <InputItem
          placeholder="请填写证件号码"
          clear
          value={data.identity}
          onFocus={()=>{setShow(true)}}
          onChange={(v) => { setData({ ...data, identity: v }) }}
        >证件号码</InputItem>
        <InputItem
          placeholder="请填写银行卡号"
          clear
          onFocus={()=>{setShow(true)}}
          value={data.bankAccount}
          onChange={(v) => { setData({ ...data, bankAccount: v }) }}
        >银行卡号</InputItem>
        <div className="canvas">
              <CanvasDraw
                ref={signCanvas}
                brushColor="#000"
                brushRadius={1}
                lazyRadius={0}
                canvasWidth={"100%"}
                canvasHeight={170}
                loadTimeOffset={0}
                hideGrid={true}
              />      
              {
                imgSrc!=''&&(
                  <img  src={imgSrc} />
                )
              }    
              {
                show&&(
                  <div className="shade" onClick={()=>{setShow(false)}}></div>
                )
              }
        </div>
        <div className="action">
          <Button type="warning" onClick={clear}>清除</Button>
          <Button type="primary" onClick={create}>生成并预览</Button>
        </div>


        <Button className="mt20" type="primary" onClick={sub}>提交</Button>
        </List>
      </div>

    </div>
  );
}

export default  createForm()(autonym);

