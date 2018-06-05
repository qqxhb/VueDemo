import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
var Mock = require('mockjs')
import store from '../vuex/store'
let axiosmock = window.axiosmock = new MockAdapter(axios)
let _Users = Mock.mock({
  'userList|20': [{
    'id|+1': 1,
    'logo': Mock.Random.image('720x300'),
    'nikeName': /^[a-zA-Z_]{4,10}$/,
    'userName': /^[a-zA-Z_]{4,10}$/,
    'mobile': /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
    'email': /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    'status|1': '已激活',
    'userType|1': '后台配置用户',
    'role|0-1':[1,2,3,4],
    'desc|1':''
  }]
}).userList;

//获取用户信息
axiosmock.onGet('/user/info').reply(config => {
  let id = config.id;
  return new Promise((resolve, reject) => {
    let user = null;
    setTimeout(() => {
      let hasUser = _Users.some(u => {
        if (u.id === id) {
          user = JSON.parse(JSON.stringify(u));
          return true;
        }
      });
      if (hasUser) {
        resolve([200, { code: 200, msg: '查询成功', user }]);
      } else {
        resolve([200, { code: 500, msg: 'ID错误' }]);
      }
    }, 500);
  });
});

//获取用户列表（分页）
axiosmock.onGet('/user/list').reply(config => {
  let { page,size, name } = JSON.parse(config.data);
  let mockUsers = _Users.filter(user => {
    if (name && user.userName.indexOf(name) == -1) return false;
    return true;
  });
  let total = mockUsers.length;
  mockUsers = mockUsers.filter((u, index) => index < size * page && index >= size * (page - 1));
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([200, {
        total: total,
        users: mockUsers
      }]);
    }, 500);
  });
});

//删除用户
axiosmock.onGet('/user/delete').reply(config => {
  let id = config.id;
  _Users = _Users.filter(u => u.id !== id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([200, {
        code: 200,
        msg: '删除成功'
      }]);
    }, 500);
  });
});

//编辑用户
axiosmock.onGet('/user/edit').reply(config => {
  let { id, userName, nikeName, mobile , email, status ,userType,desc} = JSON.parse(config.data);
  _Users.some(u => {
    if (u.id === id) {
      u.userName = userName;
      u.nikeName = nikeName;
      u.mobile = mobile;
      u.email = email;
      u.status = status;
      u.userType = userType;
      u.desc = desc;
      return true;
    }else{
      return false;
    }
  });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([200, {
        code: 200,
        msg: '编辑成功'
      }]);
    }, 500);
  });
});
//编辑角色
axiosmock.onGet('/user/role').reply(config => {
  let { id, role} = JSON.parse(config.data);
  _Users.some(u => {
    if (u.id === id) {
      u.role = role;
      return true;
    }else{
      return false;
    }
  });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([200, {
        code: 200,
        msg: '编辑成功'
      }]);
    }, 500);
  });
});
//新增用户
axiosmock.onGet('/user/add').reply(config => {
  let { id, userName, nikeName, mobile , email, status ,userType,desc} = JSON.parse(config.data);
  _Users.push({
    id :_Users[_Users.length-1].id+1,
    logo:Mock.Random.image('720x300'),
    userName : userName,
    nikeName : nikeName,
    mobile : mobile,
    email : email,
    status : status,
    userType : userType,
    desc : desc
  });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([200, {
        code: 200,
        msg: '新增成功'
      }]);
    }, 500);
  });
});



axiosmock.onAny().passThrough()
