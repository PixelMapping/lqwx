import { defineConfig } from 'umi';

export default defineConfig({
  extraPostCSSPlugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-px-to-viewport')({
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是375
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
    }),
  ],
  proxy: {
    '/applets/': {
      target: 'http://123.56.68.98:8880',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    }, 
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{
    path: '/',
    component: '@/layouts/index.js',
    routes:[
    { path: '/login', component: '@/pages/login',title:'登录'},
    { path: '/agreement', component: '@/pages/agreement', title:'服务协议'},
    { path: '/autonym', component: '@/pages/autonym',title:'实名认证' },
    { path: '/complete', component: '@/pages/complete',title:'认证完成' },
    { path: '/home', component: '@/pages/home',title:'任务大厅' },
    { path: '/taskDetail', component: '@/pages/taskDetail',title:'任务详情'},
    { path: '/progress', component: '@/pages/progress',title:'任务进度'},
    { path: '/register', component: '@/pages/register',title:'个体工商户注册'},
    { path: '/entrust', component: '@/pages/entrust',title:'灵趣用工'},
    { path: '/upLoad', component: '@/pages/upLoad',title:'上传验收图片'},
    { path: '/my', component: '@/pages/my' ,title:'我的'},
    { path: '/income', component: '@/pages/income',title:'我的收入' },
    { path: '/myTask', component: '@/pages/myTask',title:'众包任务'},
    { path: '/account', component: '@/pages/account',title:'银行卡' },
    { path: '/addAccount', component: '@/pages/addAccount',title:'添加银行卡' },
    { path: '/sign', component: '@/pages/sign',title:'签约信息' },
    { path: '/test', component: '@/pages/test',title:'测试' },
    ]
  }
    
  ],
});

