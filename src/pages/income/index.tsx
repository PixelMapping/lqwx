import React, { useState, useEffect, Component } from 'react';
import { Button, InputItem, Checkbox, Toast } from 'antd-mobile';
import './index.less';
import { myIncome, myInfo } from '@/services/index'
export default () => {
  const [list, setList] = useState([])

  useEffect(() => {
    myIncome({ page: 1, limit: 1000 }).then(res => {
      if (res.result) {
        setList(res.data.rows)
      }
    })
  }, [])



  return (
    <div className="income">
      <div className="head">全部收入</div>
      <div className="cont">
        {
          list.map((item: any, index: number) => (
            <div className="list" key={index}>
              <div className="lt">
                <p>任务编号：{item.taskNum}</p>
                <p>任务名称：{item.name}</p>
                <p>收入日期：{item.payTime}</p>
                <p>收款卡号：{item.bankAccount}</p>
              </div>
              <div className="rt">
                +{item.payAmount}
            </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

