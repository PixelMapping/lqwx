import React, { useState, useEffect } from 'react'
import { ImagePicker,Button, Toast } from 'antd-mobile';
import './index.less'
import { upload ,submitCheck} from '@/services/index'

export default (props:any) => {
  const [fileList, setFiles] = useState<any>([])
  const [enrollId,setId] = useState('')

  useEffect(()=>{
    if(props.location.state){
      setId(props.location.state.enrollId)
    }
  },[])

  const onChange = (files: any, type: string, index: any) => {
    if (type == 'add') {
      let data = new FormData()
      data.append('file', files[files.length-1].file)
      data.append('type', '3')
      upload(data).then(res => {
        console.log(res)
        if (res.result) {
          setFiles([...fileList, { url: res.data }])
        }
      })
    } else if (type == 'remove') {
      let newList=[...fileList]
      newList.splice(index,1)
      setFiles(newList)
    }

  }

  const sub=()=>{
    let arr=fileList.map((item:any)=>{return item.url})
    console.log(arr)
    let data={
      enrollId:enrollId,
      urls:arr
    }
    if(data.urls==''){
      Toast.info('请先上传任务图片！')
      return
    }
    submitCheck(data).then(res=>{
      if(res.result){
        Toast.success('提交成功！',3,()=>{
          window.history.go(-1)
        })
      }
      
    })
  }

  return (
    <div className="upload">
      <p>请提交任务图片</p>
      <ImagePicker
        files={fileList}
        onChange={onChange}
        onImageClick={(index, fs) => console.log(index, fs)}
        selectable={fileList.length < 10}
        multiple={false}
      />
      <Button type="primary" className="btns" onClick={sub}>提交验收</Button>
    </div>
  )
}
