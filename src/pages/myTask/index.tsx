import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd-mobile';
import './index.less';
import { enrollPage } from '@/services/index'


export default (props: any) => {
  const tabs = [
    { title: '全部', key: '' },
    { title: '未录用', key: '1' },
    { title: '已取消', key: '2' },
    { title: '进行中', key: '3' },
    { title: '已结算', key: '4' },
  ];
  const [list, setList] = useState([])
  const [key,setKey] = useState('')

  useEffect(() => {
    getData('')
  }, [])

  const getData = (status: string) => {
    let data = {
      page: 1,
      limit: 1000,
      status: status
    }
    enrollPage(data).then(res => {
      if (res.result) {
        setList(res.data.rows)
      }
    })
  }

  const changeTab = (tab: any, index: number) => {
    setKey(tab.key)
    getData(tab.key)
  }

  const toProgress = (id: string) => {
    props.history.push({ pathname: 'progress', state: { id: id } })
  }

  return (
    <div className="mytask">
      <Tabs tabs={tabs}
        initialPage={'t1'}
        onChange={changeTab}
      >


        {
          (list.length == 0 && key=='')? (
            <div className="default">
              <p>您还没有众包任务</p>
            </div>
          ) : (
              <div className="cont">
                {
                  list.map((item: any) => {
                    return (
                      <div className="list" key={item.enrollId} onClick={toProgress.bind(this, item.enrollId)}>
                        <div className="lt">
                          <img src={require("../../assets/icon.png")} />
                          <div>
                            <p className="info">{item.taskName}<span>{item.statusName}</span></p>
                            <p className="total">￥{item.singleMinAmount}-￥{item.singleMaxAmount}</p>
                          </div>
                        </div>
                        <div className="arrow"></div>
                      </div>
                    )

                  })
                }
              </div>
            )
        }


      </Tabs>
    </div>
  )
}
