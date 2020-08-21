import React, { useState, useEffect } from 'react';
import { Button, InputItem, Checkbox, Toast } from 'antd-mobile';
import './index.less';
import { myInfo } from '@/services/index'
import Cookies from 'js-cookie'
export default (props: any) => {
  const navList = [
    {
      src: require('../../assets/ic_my1.png'),
      tit: '我的收入',
      url: 'income'
    }, {
      src: require('../../assets/ic_my2.png'),
      tit: '签约信息',
      url: 'sign'
    }, {
      src: require('../../assets/ic_my3.png'),
      tit: '众包任务',
      url: 'myTask'
    }, {
      src: require('../../assets/ic_my4.png'),
      tit: '收款账户',
      url: 'account'
    }, {
      src: require('../../assets/ic_my6.png'),
      tit: '个体工商注册',
      url: 'register'
    },
  ]
  const [info, setInfo] = useState<any>({
    balance: 0,
    name: '',
    idCard: '',
    authentFlag: '0'
  })

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    myInfo({}).then(res => {
      if (res.result) {
        setInfo(res.data)
      }
    })
  }

  const toPage = (url: string) => {
    if (url == 'register') {
      props.history.push({ pathname: url, state: { authentFlag: info.authentFlag } })
    } else {
      props.history.push(url)
    }
  }

  const loginOut=()=>{
    Cookies.remove('token')
    Cookies.remove('user')
    props.history.push('login')
  }


  return (
    <div className="my">
      <header>
        <div className="name"><span>{info.name}</span><span className="loginOut" onClick={loginOut}>退出登录</span></div>
        <div className="code">{info.idCard}</div>
        <div className="income">
          <div className="tit">总收入</div>
          <div className="total">￥{info.balance}</div>
        </div>
      </header>
      <nav>
        {
          navList.map((item: any, index: number) => (
            <div className="list" key={index} onClick={toPage.bind(this, item.url)}>
              <div className="lt">
                <img className="icon" src={item.src} />
                <span className="tit">{item.tit}</span>
              </div>
              <div className="rt"></div>
            </div>
          ))
        }
      </nav>
      <div className="tabBar">
        <div className="item">
          <img src={require('../../assets/ic_task.png')} />
          <div className="name">任务大厅</div>
        </div>
        <div className="item">
          <img src={require('../../assets/ic_my_hover.png')} />
          <div className="name ftC1">我的</div>
        </div>
      </div>
    </div>
  );
}
