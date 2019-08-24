const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var sentence = [
  {
    "sentenceid": "1",
    "content": "If you prefer simple words,you can substitute think with consider",
    "url": "xxxxx"
  },
  {
    "sentenceid": "2",
    "content": "Whatever is worth doing is worth doing well",
    "url": "xxxxx"
  },
  {
    "sentenceid": "3",
    "content": "Happiness is a way station between too much and too little",
    "url": "xxxxx"
  },
  {
    "sentenceid": "4",
    "content": "If you prefer simple words,you can substitute think with consider",
    "url": "xxxxx"
  },
  {
    "sentenceid": "5",
    "content": "Whatever is worth doing is worth doing well",
    "url": "xxxxx"
  },
  {
    "sentenceid": "6",
    "content": "Whatever is worth doing is worth doing well",
    "url": "xxxxx"
  },
  {
    "sentenceid": "7",
    "content": "If you prefer simple words,you can substitute think with consider",
    "url": "xxxxx"
  },
  {
    "sentenceid": "8",
    "content": "Whatever is worth doing is worth doing well",
    "url": "xxxxx"
  },
  {
    "sentenceid": "9",
    "content": "Happiness is a way station between too much and too little",
    "url": "xxxxx"
  }, 
  {
    "sentenceid": "10",
    "content": "If you prefer simple words,you can substitute think with consider",
    "url": "xxxxx"
  }
]
var score_data = [
  { "nickName": "my齐天大圣", "avatarUrl": "", "score": "100" },
  { "nickName": "李四", "score": "90" },
  { "nickName": "王五", "score": "80" },
  { "nickName": "张三", "score": "70" },
  { "nickName": "张三", "score": "60" },
  { "nickName": "张三", "score": "50" },
  { "nickName": "张三", "score": "40" },
  { "nickName": "张三", "score": "30" },
  { "nickName": "张三", "score": "20" },
  { "nickName": "张三", "score": "10" }
]

module.exports = {
  formatTime: formatTime,
  sentence:sentence
}
