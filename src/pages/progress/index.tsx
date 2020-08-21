import React, { useState, useEffect } from 'react';
import { Button, Picker, List, Toast } from 'antd-mobile';
import './index.less';
import { enrollDetail, bankPage ,uptBankAccount} from '@/services/index'


export default (props: any) => {

  const [info, setInfo] = useState<any>({ taskStatus: 0 })
  const [list, setList] = useState([])
  const status = [
    {
      label: '无',
      class: '',
    },
    {
      label: '已报名',
      class: 'status1'
    }, {
      label: '被录用',
      class: 'status2'
    }, {
      label: '未录用',
      class: 'status3'
    }, {
      label: '提交验收',
      class: 'status4'
    }, {
      label: '验收通过',
      class: 'status5'
    }, {
      label: '未通过',
      class: 'status6'
    }, {
      label: '结算完成',
      class: 'status7'
    },
  ]

  useEffect(() => {
    if (props.location.state) {
      enrollDetail({ enrollId: props.location.state.id }).then(res => {
        if (res.result) {
          setInfo(res.data)
        }
      })
    }
    bankPage({}).then(res => {
      if (res.result) {
        let arr = res.data.map((item: any) => {
          return {
            label: item.bankAccount,
            value: item.bankAccount
          }
        })
        setList(arr)
      }
    })
  }, []);


  const toHome = () => {
    props.history.push('home')
  }

  const toUpimg = () => {
    props.history.push({ pathname: 'upLoad', state: { enrollId: info.enrollId } })
  }

  const CustomChildren = (props: any) => {
    let text=props.extra.substring(props.extra.length-4)  
    return (
      <div className="flex" onClick={info.taskStatus==1?(props.onClick):()=>{}}>
        <span>银行卡{text}</span>
        <span className="arrow"></span>
      </div>
    )
  }

  const changeAccount=(val:any)=>{
    uptBankAccount({enrollId:info.enrollId,account:val[0]}).then(res=>{
      if(res.result){
        Toast.success('修改成功！')
        setInfo({...info,bankAccount:val[0]})
      }
    })
  } 

  return (
    <div className="progress">
      <div className="content">
        <div className="head">任务编号：{info.taskNum}</div>
        <div className="info">
          <div className="tit">{info.taskName} <span className="tag">{info.statusName}</span></div>
          <div className="des">
            <span>￥{info.singleMinAmount}-￥{info.singleMaxAmount}</span>
            <span className="ml20">{info.area}</span>
          </div>

        </div>
        <div className="cont">
          <div className="tit">任务状态</div>
          <div className="state">
            <div>
              <img src={require('../../assets/ic_pro1.png')} />
              <p>已报名</p>
            </div>
            <div className="line"></div>
            <div>
              {
                info.taskStatus == 1 && (
                  <img src={require('../../assets/ic_pro2_1.png')} />
                )
              }
              {
                (info.taskStatus >= 2 && info.taskStatus != 3) && (
                  <img src={require('../../assets/ic_pro2_2.png')} />
                )
              }
              {
                info.taskStatus == 3 && (
                  <img src={require('../../assets/ic_pro2_3.png')} />
                )
              }
              <p>{info.taskStatus == 3 ? '未录用' : '被录用'}</p>
            </div>
            <div className="line"></div>
            <div>
              {
                info.taskStatus >= 4 ? (
                  <img src={require('../../assets/ic_pro3_2.png')} />
                ) : (
                    <img src={require('../../assets/ic_pro3_1.png')} />
                  )
              }
              <p>提交验收</p>
            </div>
            <div className="line"></div>
            <div>
              {
                (info.taskStatus == 5 || info.taskStatus == 7) && (
                  <img src={require('../../assets/ic_pro4_2.png')} />
                )
              }
              {
                info.taskStatus == 6 && (
                  <img src={require('../../assets/ic_pro3_3.png')} />
                )
              }
              {
                info.taskStatus < 5 && (
                  <img src={require('../../assets/ic_pro4_1.png')} />
                )
              }
              <p>{info.taskStatus == 6 ? '未通过' : '验收通过'}</p>
            </div>
            <div className="line"></div>
            <div>
              {
                info.taskStatus == 7 && (
                  <img src={require('../../assets/ic_pro5_2.png')} />
                )
              }
              {
                info.taskStatus < 7 && (
                  <img src={require('../../assets/ic_pro5_1.png')} />
                )
              }
              <p>结算完成</p>
            </div>
          </div>
        </div>
        <div className="blank">
          <span className="text">收款账户</span>
          <Picker data={list} value={[info.bankAccount]} onChange={changeAccount} cols={1} >
            <CustomChildren>Customized children</CustomChildren>
          </Picker>
        </div>
        <div>

        </div>
      </div>
      <footer>
        {
          info.taskStatus == 4 && (
            <Button className="mb10" type="primary" disabled>等待验收</Button>
          ) 
        }
        {
          info.taskStatus<4 &&
          (
            <Button className="mb10" type="primary" disabled={info.isCheck == 0} onClick={toUpimg}>提交验收</Button>
          )
        }
        <Button type="ghost" onClick={toHome}>返回任务大厅</Button>
      </footer>
    </div>
  );
}
