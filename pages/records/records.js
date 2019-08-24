// pages/records/records.js
const app = getApp();
var Data = require('../../utils/util.js');
var touchDot = 0;
var interval = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    context: "",
    array: [],
    array_sort: 0,
    current_p: 0,
    starHidden: true,
    Score: ["star", "star", "star", "star", "star"],
    score_c: 0,
    score_b: false,
    left: false,
    sentences: [],
    src: "",
    voice: false,
    id: "",
    maskHidden: false,
    double: false,
    overall: 0,
    shadow: "0rpx 0rpx 100rpx #FFF",

    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (!app.globalData.first) {
      this.setData({
        maskHidden: true,
        shadow: "4rpx 10rpx 10rpx #000"
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      if (app.globalData.first && app.globalData.jscode_post) {
        this.loginToken();
      } else {
        this.sentencesGet()
      }
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        if (app.globalData.first && app.globalData.jscode_post) {
          this.loginToken();
        } else {
          this.sentencesGet()
        }
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          if (app.globalData.first && app.globalData.jscode_post) {
            this.loginToken();
          } else {
            this.sentencesGet()
          }
        }
      })
    }

    this.recorderManager = wx.getRecorderManager()
    this.recorderManager.onStop((res) => {
      console.log("stop")
      this.setData({
        src: res.tempFilePath
      })
      this.loadPOST();
    })

    //播放音频管理
    this.innerAudioContext = wx.createInnerAudioContext();
  },


  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.iv = e.detail.iv
    app.globalData.encryptedData = e.detail.encryptedData
    this.setData({
      userInfo: e.detail.userInfo
    })
    if (!this.data.hasUserInfo) {
      this.loginToken()
    }
    this.setData({
      hasUserInfo: true,
      maskHidden: true,
      shadow: "4rpx 10rpx 10rpx #000"
    })
  },

  handleTouchStart: function (e) {
    this.startTime = e.timeStamp;
    console.log("开始了")
    this.setData({ shadow: "0rpx 0rpx 100rpx #FFF" });
  },
  handleTouchEnd: function (e) {
    this.endTime = e.timeStamp;
    console.log(this.endTime)
    console.log("touchend")
    this.recorderManager.stop();
    wx.hideToast();
    this.setData({ shadow: "4rpx 10rpx 10rpx #000" });
  },

  handleClick: function (e) {
    console.log("点击")
    if (this.endTime - this.startTime < 350) {
      wx.showModal({
        showCancel: false,
        content: '你的录音时间太短了，请重录。'
      })
    }
  },

  handleLongPress: function (e) {
    console.log("长按")
    wx.showToast({
      title: "正在录音",
      icon: "none",
      duration: 60000
    });
    this.innerAudioContext.stop();

    this.recorderManager.start({
      duration: 60000,
      sampleRate: 16000,//采样率，有效值 8000/16000/44100
      numberOfChannels: 1,//录音通道数，有效值 1/2
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小
      audioSource: 'auto'//指定录音的音频输入源
    })

  },

  handleBofang: function () {
    if (this.data.voice) {
      wx.hideToast();
      this.innerAudioContext.stop()
      this.innerAudioContext.src = this.data.src;
      this.innerAudioContext.play()
    }
  },
  handleAI: function () {
    console.log(111);
    wx.hideToast();
    this.innerAudioContext.stop()
    this.innerAudioContext.src = this.data.sentences[this.data.array_sort - 1]["ttsAudio"]
    this.innerAudioContext.play()
  },

  refreshText: function () {
    var that = this;
    var content_set = "";
    var array_set = this.data.sentences[this.data.array_sort]["content"].split(/ /);
    var getArray = new Array();
    for (var i = 0; i < array_set.length; i++) {
      if (i == 0) {
        getArray.push(array_set[i])
      } else {
        getArray.push(" " + array_set[i])
      }
    }
    var sort_set = this.data.array_sort;
    var array_Set = new Array();
    for (var i = 0; i < getArray.length; i++) {
      content_set += getArray[i];
      array_Set.push({ content: getArray[i], color: "rgb(0, 0, 0)" });
    }
    if (sort_set < 10) {
      sort_set++
    }
    this.setData({
      context: content_set,
      array_sort: sort_set,
      array: array_Set,
      current_p: 10 * sort_set,
      starHidden: true
    })

  },

  loadPOST: function () {
    var that = this

    wx.uploadFile({
      url: "https://kouxunspeak.lenovoresearch2019.cn/api/score/ai",
      filePath: that.data.src,
      name: 'packFile',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData:
      {
        "token": app.globalData.token,
        "id": that.data.sentences[[that.data.array_sort - 1]]["id"],
        "audioType": "mp3",
        "coreType": "sent.eval",
        "precision": "0.5",
        "qType": "1",
        "refText": that.data.context,
        "scale": "100"
      },
      success: function (res) {
        var data = JSON.parse(res.data)
        console.log(data)
        that.setData({
          left: true
        })
        wx.showToast({
          title: '综合分数：' + data["result"]["overall"] + "\n"
            + "流利度:" + data["result"]["fluency"]
            + "  完整度:" + data["result"]["integrity"]
            + "  发音:" + data["result"]["pronunciation"],
          icon: 'none',
          duration: 2000
        })

        var array_set = new Array();
        var i;
        for (i = 0; i < data["result"]["words"].length; i++) {
          console.log(that.data.array[i])
          if (data["result"]["words"][i]["scores"]["overall"] >= 80) {
            array_set.push({ content: that.data.array[i]["content"], color: "#33CC00" });
          } else if (data["result"]["words"][i]["scores"]["overall"] >= 60) {
            array_set.push({ content: that.data.array[i]["content"], color: "#FFCC00" });
          } else {
            array_set.push({ content: that.data.array[i]["content"], color: "#FF0000" });
          }
        }
        that.setData({
          array: array_set,
          voice: true,
          overall: data["result"]["overall"]
        })
        console.log(array_set)

        var star_c = (data["result"]["overall"] + 5) / 20
        var star_b
        if (data["result"]["overall"] < 95) {
          star_b = (data["result"]["overall"] + 5) % 20
        } else {
          star_b = 0
        }
        that.setData({
          score_c: star_c - 1,
          score_b: star_b,
          starHidden: false
        })
      },
      fail: function (res) {
        console.log(res);
        wx.showToast({
          title: '请再读一遍',
        })
      },
      complete: function (res) {

      }
    })
  },
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
    this.setData({
      double: false
    })
  },
  touchMove: function (e) {
    var touchMove = e.touches[0].pageX;
    if (touchMove - touchDot <= -20 && !this.data.double) {
      if (this.data.left) {
        wx.hideToast();
        this.setData({
          left: false,
          voice: false
        })
        app.globalData.score += this.data.overall
        console.log(app.globalData.score)
        this.innerAudioContext.src = ""
        if (this.data.maskHidden) {
          wx.request({
            url: 'https://kouxunspeak.lenovoresearch2019.cn/user/updatenum',
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "token=" + app.globalData.token + "&increase=" + 1,
            success(res) {
              console.log(res)
            }
          })
          if (this.data.array_sort < 10) {
            this.innerAudioContext.stop()
            this.refreshText();
          } else if (this.data.array_sort == 10) {
            this.innerAudioContext.stop()
            wx.redirectTo({
              url: '../score/score',
            })

          }
        }
      } else {
        wx.showToast({
          title: '请先录音再切换句子',
          icon: 'none'
        })
      }
      this.setData({
        double: true
      })
    }
  },
  // 触摸结束事件
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval
  },

  //登陆发送js_code并获取token
  loginToken: function () {
    var that = this;
    console.log(this.data.userInfo)
    wx.request({
      url: 'https://kouxunspeak.lenovoresearch2019.cn/user/login',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: "jscode=" + app.globalData.jscode + "&iv=" + app.globalData.iv + "&encryptedData=" + app.globalData.encryptedData + "&wx_alias=" + this.data.userInfo.nickName + "&avatar=" + this.data.userInfo.avatarUrl,
      success(res) {
        console.log(res);
        if (res.data["errcode"] != 0) {

          console.log(res.data["errmsg"])
        }

        app.globalData.token = res.data.data["token"]
        console.log(app.globalData.token)

        that.sentencesGet()
      }
    })
  },

  //获取句子与语音
  sentencesGet: function () {
    var that = this;
    wx.request({
      url: 'https://kouxunspeak.lenovoresearch2019.cn/sentence/getten',
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "token": app.globalData.token
      },
      success(res) {
        that.setData({
          sentences: res.data.data
        })
        that.refreshText()
      }
    })
    app.globalData.score=0
  }
})