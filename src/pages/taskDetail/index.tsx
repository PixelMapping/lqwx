import React, { useState, useEffect } from 'react';
import { Button, InputItem, Checkbox, Toast } from 'antd-mobile';
import './index.less';
import { signUp,enrollDetail } from '@/services/index'
import Item from 'antd-mobile/lib/popover/Item';
export default (props: any) => {

  const [info, setInfo] = useState<any>({})

  useEffect(() => {
    console.log(props)
    if (props.location.state) {
      setInfo(props.location.state.row)
    }
  }, []);


  const imgs=()=>{
    let urls=info.annexUrls.split(',')||[]
    return(      
        urls.map((item:string)=>(
          <img src={item} />
        ))
    )
  }



  const apply=()=>{
    signUp({taskId:info.id}).then(res=>{
      if(res.result){
        props.history.push({pathname:'progress',state:{id:res.data}})
      }
    })
  }

  const toHome=()=>{
    props.history.push('home')
  }

  return (
    <div className="detail">
      <div className="content">
        <div className="head">任务编号：{info.taskNum}</div>
        <div className="info">
          <div className="tit">{info.name}</div>
          <div className="des">
            <span>
              <img className="ic1" src={require('../../assets/ic_detail1.png')} />
              {info.businessLabel}-{info.industryLabel}
            </span>
            <span>
              <img className="ic2" src={require('../../assets/ic_detail2.png')} />
              {info.provinceName}-{info.cityName}
            </span>
          </div>
          <div className="flex">
            <div>已报名人数<br />{info.signNum}</div>
            <div>工作地点<br />{info.cityName}</div>
            <div>截止时间<br />{info.signEndTime}</div>
          </div>
        </div>
        <div className="cont">
          {
            info.signFlag == 0 ? (
              <div className="detailInfo">
                <div className="tit">任务详情</div>
                <div className="other">
                  <p>{info.description}</p>
                  <div className="imgs">
                    {imgs()}
                  </div>
                </div>
                <div className="time">
                  <p>任务开始时间：{info.releaseTime}</p>
                  {/* <p>结束时间：2021年9月</p> */}
                </div>
              </div>
            ) : (
                <div className="progress">
                  <div className="tit">任务状态</div>
                  <div className="state">
                    <div>
                      <img src={require('../../assets/ic_pro1.png')} />
                      <p>已报名</p>
                    </div>
                    <div className="line"></div>
                    <div>
                      <img src={require('../../assets/ic_pro1.png')} />
                      <p>被录用</p>
                    </div>
                    <div className="line"></div>
                    <div>
                      <img src={require('../../assets/ic_pro1.png')} />
                      <p>提交验收</p>
                    </div>
                    <div className="line"></div>
                    <div>
                      <img src={require('../../assets/ic_pro1.png')} />
                      <p>验证通过</p>
                    </div>
                    <div className="line"></div>
                    <div>
                      <img src={require('../../assets/ic_pro1.png')} />
                      <p>结算完成</p>
                    </div>
                  </div>
                </div>
              )
          }



        </div>
        <div className="company">
          <div className="lt">
            <img className="ic3" src={require('../../assets/pic_com.png')} />
          </div>
          <div className="rt">
            <div className="tit">灵趣用工</div>
            <img className="ic4" src={require('../../assets/icon_cer.png')} />
          </div>
        </div>
      </div>
      <footer>
        <Button type="primary" onClick={apply}>报名</Button>
        {/* <Button type="ghost" onClick={toHome}>返回任务大厅</Button> */}
      </footer>
    </div>
  );
}
