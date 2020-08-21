import React, {useState, useEffect } from 'react'
import { List, InputItem, Button, Toast } from 'antd-mobile';
import './index.less'
import Cookies from 'js-cookie'
import { addBank} from '@/services/index'

export default () => {
  const [form,setForm] = useState({name:'',account:''})

  useEffect(() => {
    let user=JSON.parse(Cookies.get('user')||'{}')
    if(user){
      setForm({...form,name:user.name})
    }
  }, []);

  const sub=()=>{
    if(form.name==''){
      Toast.info('请输入开户人姓名！')
    }else if(form.account==''){
      Toast.info('请输入银行卡卡号！')
    }else{
      addBank({openName:form.name,bankAccount:form.account}).then(res=>{
        if(res.result){
          Toast.success('添加成功！',2,()=>{
            window.history.go(-1)
          })
        }
      })
    }
  }

  return (
    <div className="addAcount">
      <div className="cont">
      <List>
        <InputItem
          placeholder="请输入持卡人姓名"
          value={form.name}
          onChange={(v)=>{setForm({...form,name:v})}}
          clear
        >
          持卡人
        </InputItem>
        <InputItem
          placeholder="请输入银行卡卡号"
          value={form.account}
          onChange={(v)=>{setForm({...form,account:v})}}
          clear
        >
          银行账号
        </InputItem>
      </List>
      </div>
      <footer>
        <Button type="primary" onClick={sub}>完成</Button>
      </footer>
    </div>
  )
}
