import React, { useState, useEffect } from 'react';
import { SearchBar, Button, Icon, Menu, ActivityIndicator ,InputItem} from 'antd-mobile';
import './index.less';
import { allTaskType, getPersonTaskPage } from '@/services/index'
const Down = () => (<Icon type='down' size="xxs" color="#bbb" />)
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps: any;
if (isIPhone) {
  wrapProps = {
    onTouchStart: (e: any) => e.preventDefault(),
  };
}
const initData = [
  {
    value: '1',
    label: '全部任务',
  }, {
    value: '2',
    label: '进行中',
  }
]

const timeData = [
  {
    value: '1',
    label: '展示最近'
  }, {
    value: '2',
    label: '展示最早'
  }
]


export default (props: any) => {
  const [show, setShow] = useState(false)
  const [modal,setModal] = useState(false)
  const [type, setType] = useState('task')
  const [classData, setClass] = useState([])
  const [list, setList] = useState([])
  const [val,setVal] = useState<any>({
    task:['1'],
    class:[],
    time:['1']
  })
  const [totals,setTotal] = useState({
    totalAmountMin:'',
    totalAmountMax:''
  })
  const [searchData, setSearch] = useState({
    page: 1,
    limit: 1000,
    search: '',
    taskTypeId: '',
    totalAmountMin: '',
    totalAmountMax: '',
    sortStatus: '1',
    status: ''
  })

  useEffect(() => {
    getData(searchData)
    getList()
  }, [])


  const getData = (data:any) => {
    getPersonTaskPage(data).then(res => {
      if (res.result) {
        setList(res.data.rows)
      }
    })
  }

  const getList = () => {
    allTaskType({}).then(res => {
      if (res.result) {
        // setClass(res.data)
        res.data.forEach((item: any) => {
          item.value = item.id
          item.label = item.text
          item.children.forEach((row: any) => {
            row.value = row.id
            row.label = row.text
          })
        });
        res.data.unshift({value:'',label:'全部',children:[{value:'',label:'全部'}]})
        setClass(res.data)
      }
    })
  }


  const onChange = (e: any) => {
    let v=e[0]
    if(type=='task'){
      setSearch({...searchData,status:v=='1'?'':v})
      getData({...searchData,status:v=='1'?'':v})
      setVal({...val,[type]:e})
      setShow(false)
    }else if(type=='time'){
      setSearch({...searchData,sortStatus:v})
      getData({...searchData,sortStatus:v})
      setVal({...val,[type]:e})
      setShow(false)
    }
  }

  const changeCLass=(value:any)=>{
    setSearch({...searchData,taskTypeId:value[1]})
    getData({...searchData,taskTypeId:value[1]})
    setVal({...val,[type]:value})
    setShow(false)
  }

  const changText=(val:any)=>{
    setSearch({...searchData,search:val})
    getData({...searchData,search:val})
  }

  const menuEl = () => {
    let data: any = {
      task: initData,
      time: timeData,
      class: classData
    }
    return (
      <Menu
        className="single-foo-menu"
        data={data[type]}
        value={val[type]}
        level={(type == 'task' || type == 'time') ? 1 : 2}
        multiSelect={(type == 'task' || type == 'time') ? false : true}
        onChange={onChange}
        onOk={changeCLass}
        height={document.documentElement.clientHeight * 0.5}
      />
    )
  }

  const changeTotal=(type:string,event:any)=>{
    setTotal({...totals,[type]:event})
  }

  const confirmTotal=()=>{    
    setSearch({...searchData,totalAmountMin:totals.totalAmountMin,totalAmountMax:totals.totalAmountMax})
    getData({...searchData,totalAmountMin:totals.totalAmountMin,totalAmountMax:totals.totalAmountMax})
    setModal(false)
  }

  const menuML = ()=>{
    return (
      <div className="modal">
        <div className="cont">
        <div className="tit">任务金额</div>
        <div className="num">
          <InputItem value={totals.totalAmountMin} onChange={changeTotal.bind(this,'totalAmountMin')} type="text" placeholder="最低金额"/>
          <span className="line"></span>
          <InputItem value={totals.totalAmountMax} onChange={changeTotal.bind(this,'totalAmountMax')} type="text" placeholder="最高金额"/>
        </div>
        <div className="tag">
          <span onClick={()=>{setTotal({totalAmountMin:'0',totalAmountMax:'999'})}}>￥0~￥999</span>
          <span onClick={()=>{setTotal({totalAmountMin:'1000',totalAmountMax:'5000'})}}>￥1000~￥5000</span>
          <span onClick={()=>{setTotal({totalAmountMin:'5000',totalAmountMax:''})}}>￥5000以上</span>
        </div>
        </div>
        
        <div className="btns">
          <Button className="set" onClick={()=>{setTotal({totalAmountMin:'',totalAmountMax:''})}}>重置</Button>
          <Button className="com" onClick={confirmTotal} type="primary">确定</Button>
        </div>
      </div>
    )
  }

  const loadingEl = (
    <div style={{ position: 'absolute', width: '100%', height: document.documentElement.clientHeight * 0.5, display: 'flex', justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </div>
  );

  const onMaskClick = () => {
    setShow(false)
  }

  const handleClick = (val: string) => {
    setShow(true)
    setModal(false)
    setType(val)
  }

  const closeModal=()=>{
    setModal(false)
  }

  const toDetail = (row:any) => {
    if(row.signFlag==0){
      props.history.push({pathname:'taskDetail',state:{row:row}})
    }else{
      props.history.push({pathname:'progress',state:{id:row.enrollId}})
    }
    
  }

  return (
    <div className="task">
      <SearchBar placeholder="任务名称/任务编号" onSubmit={changText} maxLength={15} />
      <nav>
        <span onClick={handleClick.bind(this, 'task')}>全部任务 <Down></Down></span>
        <span onClick={handleClick.bind(this, 'class')}>分类 <Down></Down></span>
        <span onClick={handleClick.bind(this, 'time')}>发布时间 <Down></Down></span>
        <span onClick={()=>{setModal(true);setShow(false)}}>筛选 <Down></Down></span>
      </nav>
      {show ? initData ? menuEl() : loadingEl : null}
      {show ? <div className="menu-mask" onClick={onMaskClick} /> : null}
      {modal? menuML():null}
      {modal ? <div className="menu-mask" onClick={closeModal} /> : null}
      <div className="cont">
        {
          list.map((item: any) => {
            return (
              <div className="list" key={item.id} onClick={toDetail.bind(this, item)}>
                <div className="head">
                  <div className="lt"><img src={require('../../assets/task_list.png')} /></div>
                  <div className="rt">
                    <div className="tit">{item.name}</div>
                    <p>￥{item.singleMinAmount}-￥{item.singleMaxAmount}</p>
                  </div>
                </div>
                <div className="bot">
                  <div>已报名人数<br />{item.signNum}</div>
                  <div>工作地点<br />{item.provinceName}-{item.cityName}</div>
                  <div>截至时间<br />{item.signEndTime}</div>
                </div>
              </div>
            )
          })
        }


      </div>
    </div>
  );
}
