import request from '../utils/request';

//获取验证码
export async function loginSmsCode(params:any) {
  return request('/applets/login/loginSmsCode.do', {
    method: 'GET',
    params: params,
  });
}

//登录
export async function login(params:any) {
  return request('/applets/login/login.do', {
    method: 'POST',
    data: params,
  });
}

//根据类型上传
export async function upload(params:any) {
  return request('/applets/document/upload', {
    method: 'POST',
    data: params,
  });
}

//身份证识别
export async function credentialVerifyCard(params:any) {
  return request('/applets/baseUser/credentialVerifyCard.do', {
    method: 'POST',
    data: params,
  });
}

//实名认证
export async function credentialVerifyByMobile(params:any) {
  return request('/applets/baseUser/credentialVerifyByMobile.do', {
    method: 'POST',
    data: params,
  });
}


//实名核身鉴权
export async function detectAuth(params:any) {
  return request('/applets/tencent/detectAuth.do', {
    method: 'GET',
    params: params,
  });
}

//获取实名核身结果
export async function getDetectInfo(params:any) {
  return request('/applets/tencent/getDetectInfo.do', {
    method: 'GET',
    params: params,
  });
}

//任务大厅列表
export async function getPersonTaskPage(params:any) {
  return request('/applets/task/getPersonTaskPage.do', {
    method: 'GET',
    params: params,
  });
}

//报名
export async function signUp(params:any) {
  return request('/applets/enroll/signUp.do', {
    method: 'POST',
    data: params,
  });
}

//提交验收
export async function submitCheck(params:any) {
  return request('/applets/enroll/submitCheck.do', {
    method: 'POST',
    data: params,
  });
}

//获取任务类型
export async function allTaskType(params:any) {
  return request('/applets/taskType/allTaskType.do', {
    method: 'get',
    params: params,
  });
}

//任务进度
export async function enrollDetail(params:any) {
  return request('/applets/enroll/enrollDetail.do', {
    method: 'get',
    params: params,
  });
}

//我的
export async function myInfo(params:any) {
  return request('/applets/baseUser/myInfo.do', {
    method: 'get',
    params: params,
  });
}

//我的收入
export async function myIncome(params:any) {
  return request('/applets/settleTask/myIncome.do', {
    method: 'get',
    params: params,
  });
}

//收款账户
export async function bankPage(params:any) {
  return request('/applets/bank/bankPage.do', {
    method: 'get',
    params: params,
  });
}

//新增银行卡
export async function addBank(params:any) {
  return request('/applets/bank/addBank.do', {
    method: 'POST',
    data: params,
  });
}

//删除银行卡
export async function delBank(params:any) {
  return request('/applets/bank/delBank.do', {
    method: 'DELETE',
    data: params,
  });
}

//签约信息
export async function signPage(params:any) {
  return request('/applets/sign/signPage.do', {
    method: 'get',
    params: params,
  });
}

//众包任务
export async function enrollPage(params:any) {
  return request('/applets/enroll/enrollPage.do', {
    method: 'get',
    params: params,
  });
}

//修改银行卡号
export async function uptBankAccount(params:any) {
  return request('/applets/enroll/uptBankAccount.do', {
    method: 'PUT',
    data: params,
  });
}

//修改银行卡号
export async function getPreviewURL(params:any) {
  return request('/applets/sign/getPreviewURL.do', {
    method: 'get',
    params: params,
  });
}



//个体工商户详情
export async function getCertificateDetail(params:any) {
  return request('/applets/personAnnex/getCertificateDetail.do', {
    method: 'get',
    params: params,
  });
}


//个体工商户详情
export async function getMultipleSign(params:any) {
  return request('/applets/sign/getMultipleSign.do', {
    method: 'get',
    params: params,
  });
}