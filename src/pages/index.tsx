import React ,{ useState, useEffect }from 'react';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import styles from './index.less';
import {fakeAccountLogin} from '@/services/index'

export default (props:any) => {
  useEffect(() => {
    console.log(props)
  }, [])
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button>default</Button><WhiteSpace />

      <div className={styles.demo}>你们的呢</div>
    </div>
  );
}
