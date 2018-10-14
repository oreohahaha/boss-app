import {getRedirectPath} from './../../utils/utils';
import axios from 'axios';

const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const UPDATE = 'UPDATE';

// reducer
const initialState = {
  isAuth: false,
  redirectTo: '',
  msg: '',
  user: '',
  password: '',
  type: ''
};

export function user(state=initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        redirectTo: getRedirectPath(action.payload),
        msg: '',
        ...action.payload
      };
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      };
    case ERROR_MSG:
      return {
        ...state,
        isAuth: false,
        msg: action.msg
      };
    default:
      return state
  }
}

function errorMsg(msg) {
  return { type: ERROR_MSG, msg }
}


function authSuccess(data) {
  return {type:AUTH_SUCCESS, payload: data}
}


// action
export function loadData(userinfo) {
  return {
    type: LOAD_DATA,
    payload: userinfo
  }
}

export function register({user, password, re_password, type}) {
  if (!user || !password || !type) {
    return errorMsg('用户名密码必须输入');
  }
  if (password !== re_password) {
    return errorMsg('两次密码必须相等');
  }
  return dispatch => (
    axios.post('/user/register', {user, password, type}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        // success
        dispatch(authSuccess({user, password, type}));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    })
  )
}

export function login({user, password}) {
  if (!user || !password) {
    return errorMsg('用户名和密码不能为空');
  }
  return dispatch => {
    axios.post('/user/login', {user, password}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.result));
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        // success
        dispatch(authSuccess(res.data.result));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    })
  }
}
