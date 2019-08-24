// pages/records/records.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    overall: 0,
    overall_d:true,
    currentData: 0,
    score: [],
    sentence:[],
    userInfo: {},
    Score: ["star", "star", "star", "star", "star"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    this.setData({
      overall: app.globalData.score/10
    })
    if ((app.globalData.score / 10)>=95){
      this.setData({
        overall_d:false
      })
    }
    this.scorePost();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }

  },

  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  handleBack:function(){
    app.globalData.first=false;
    app.globalData.score=0;
    console.log(app.globalData.score)
    wx.redirectTo({
      url: '../records/records',
    })
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '口语读读乐',
      path: 'pages/records/records',
      success: function (res) {
        // 转发成功
        console.log(res);
      }
    }

  },

  //请求分数排名
  scoreGet: function () {
    var that = this;
    wx.request({
      url: 'https://kouxunspeak.lenovoresearch2019.cn/user/scoresort',
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "token": app.globalData.token
      },
      success(res) {
        console.log(res)

        var score_data = res.data.data
        var score_set = new Array()
        for (var i = 0; i < score_data.length; i++) {
         if(parseInt(score_data[i]["score"]) >= 95) 
          {
            score_set.push({ "nickName": score_data[i]["alias"], "avatar": score_data[i]["avatar"], "c":4,"d": 0 })
          } else {
            score_set.push({ "nickName": score_data[i]["alias"], "avatar": score_data[i]["avatar"],"c": (parseInt(score_data[i]["score"]) + 5) / 20 - 1, "d": (parseInt(score_data[i]["score"]) + 5) % 20 })
          }
        }
        that.setData({
          score: score_set
        })
      }
    })
  },

  //请求句子排名
  sentenceGet: function () {
    var that = this;
    wx.request({
      url: 'https://kouxunspeak.lenovoresearch2019.cn/user/numbersort',
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "token": app.globalData.token
      },
      success(res) {
        console.log(res)

        var score_data = res.data.data

        that.setData({
          sentence: score_data
        })
      }
    })
  },
  

  //发送总成绩
  scorePost: function () {
    var that = this;
    wx.request({
      url: 'https://kouxunspeak.lenovoresearch2019.cn/user/updatescore',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: "token=" + app.globalData.token + "&score=" + this.data.overall,
      success(res) {
        console.log(res)
        that.scoreGet();
        that.sentenceGet();
      }
    })
  }



})