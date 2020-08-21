import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd-mobile';
import './index.less';
import { signPage } from '@/services/index'

export default () => {
  const tabs = [
    { title: '全部', key: '' },
    { title: '待签约', key: '0' },
    { title: '生效中', key: '1' },
    { title: '已失效', key: '2' }
  ];
  const [list, setList] = useState([])
  const [key, setKey] = useState('')

  useEffect(()=>{
    getData('')
  },[])

  const changeTab = (tab: any, index: number) => {
    setKey(tab.key)
    getData(tab.key)
  }

  const getData = (effectStatus: string) => {
    signPage({ page: 1, limit: 1000, effectStatus: effectStatus }).then(res => {
      if (res.result) {
        setList(res.data.rows)
      }
    })
  }

  const toDetail=(url:string)=>{
    window.location.href=url
  }

  return (
    <div className="sign">
      <Tabs tabs={tabs}
        initialPage={'t1'}
        onChange={changeTab}
      >

        {
          (list.length == 0 && key == '') ? (
            <div className="default">
              <p>暂无签约信息</p>
            </div>
          ) : (
              <div className="cont">
                {
                  list.map((item: any) => (
                    <div className="list" key={item.signId} onClick={toDetail.bind(this,item.signUrl)}>
                      <div className="tit">{item.taskName}-{item.title}</div>
                      <div className="time">2020-03-20 15:13:17 <span>{tabs[Number(item.effectStatus)+1].title}</span></div>
                      <div className="foot">
                        协议来自：{item.enterpriseName}
                      </div>
                    </div>
                  ))
                }
              </div>
            )
        }
      </Tabs>
    </div>
  )
}
