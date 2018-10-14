const express = require('express');
const utils = require('utility');

const userModels = require('./module');

const Router = express.Router();
const User = userModels.getModel('user');
const _filter = {'password': 0, '__v': 0};

Router.get('/info', function (request, response) {
  const {userid} = request.cookies;
  // 用户没有cookie
  if (!userid) {
    return response.json({code: 1})
  }
  User.findOne({_id: userid}, _filter,  function (err, doc) {
    if (err) {
      return response.json({code: 1, msg: '后端出错了'})
    } 
    if (doc) {
      return response.json({code: 0, result: doc})
    }
    
  })
});

Router.post('/register', function (req, res) {
  console.log(req.body);
  const {user, password, type} = req.body;
  User.findOne({user: user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }

    const userModel = new User({user,password: md5Pwd(password), type});
    userModel.save(function (err, doc) {
      if (err) {
        return res.json({code: 1, msg: '后端出错了'})
      }
      const { user, type, _id } = doc;
      res.cookie('userid', doc._id);
      return res.json({code: 0, result: { user, type, _id }});
    });
  })
});

Router.post('/login', function (req, res) {
  const {user, password} = req.body;
  User.findOne({user, password: md5Pwd(password)}, {password:0}, function (err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或密码错误'})
    }
    res.cookie('userid', doc._id);
    return res.json({code: 0, result: doc})
  })
});

Router.post('/update', function (req, res) {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.json({code:1})
  }
  const body = req.body;
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body);
    return res.json({code:0, result: data});
  })
});

Router.get('/list', function (request, response) {
  // User.remove({}, function (e, d) {});
  User.find({}, function (err, doc) {
    return response.json(doc)
  })
});

function md5Pwd(pwd) {
  const salt = '@#$%10.wokm';
  return utils.md5(pwd + salt);
}

module.exports = Router;
