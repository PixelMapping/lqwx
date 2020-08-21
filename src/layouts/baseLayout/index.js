import React from 'react';
import { TabBar } from 'antd-mobile';
import { history } from 'umi'
import 'antd-mobile/dist/antd-mobile.css';
import styles from './baseLayout.less';

const TabBarData = [
  {
    id: 'home',
    name: '任务大厅',
    icon: require('../../assets/ic_task.png'),
    selectedicon: require('../../assets/ic_task_hover.png'),
    url: '/home',
  },
  {
    id: 'my',
    name: '我的',
    icon: require('../../assets/ic_my.png'),
    selectedicon: require('../../assets/ic_my_hover.png'),
    url: '/my',
  }
];

class BaseLayout extends React.Component {

  constructor(props){
    super(props)
    console.log('base')
  }

  isTabBarSelect = (url) => {
    const {location: {pathname}} = this.props;
    if (pathname == '/' && url == '/home') {
      return true;
    } else {
      return pathname === url;
    }
  }
  render() {
    return (
      <div className={styles.baseLayout}>
      <TabBar
        unselectedTintColor="#333"
        tintColor="#ef5f55"
        barTintColor="white"
        tabBarPosition='bottom'
      >
        {
          TabBarData.map(t => {
            const isSelect = this.isTabBarSelect(t.url);
            return  (<TabBar.Item
                title={t.name}
                key={t.id}
                icon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${t.icon}) center center /  21px 21px no-repeat` }}
                />
                }
                selectedIcon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${t.selectedicon}) center center /  21px 21px no-repeat` }}
                />
                }
                // badge={1}
                onPress={() => {
                  history.push(t.url);
                }}
                selected={isSelect}
                data-seed="logId"
              >
                {isSelect?this.props.children:''}
              </TabBar.Item>
            )
          })
        }
      </TabBar>
      </div>
    );
  }
}

export default BaseLayout;
