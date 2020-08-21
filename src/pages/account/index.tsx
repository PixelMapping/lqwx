import React, { useState, useEffect } from 'react'
import { Modal, Button, Toast } from 'antd-mobile';
import './index.less'
import { bankPage,delBank } from '@/services/index'
export default (props:any) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    bankPage({}).then(res => {
      if (res.result) {
        setList(res.data)
      }
    })
  }

  const toAdd=()=>{
    props.history.push('addAccount')
  }

  const del=(bankId:string)=>{
    delBank({bankId:bankId}).then(res=>{
      if(res.result){
        Toast.success('删除成功！',2,()=>{
          getData()
        })       
      }
    })
  }

  return (
    <div className="account">

      {
        list.length == 0 ? (
          <div className="default">
            <div className="text">您还没有添加收款账户</div>
          </div>
        ) : (
            <div className="cont">
              {
                list.map((item: any) => (
                  <div className="list">
                    <span>{item.bankAccount}</span>
                    <div className="icon" onClick={del.bind(this,item.bankId)}></div>
                  </div>
                ))
              }
            </div>
          )
      }

      <footer>
        <Button type="primary" onClick={toAdd}>添加收款账户</Button>
      </footer>
    </div>
  )
}
