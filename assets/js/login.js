// 添加 Cookie 函数
function setCookie (cookieName, cookieValue, expireMinutes) {
  const dateDate = new Date()
  dateDate.setTime(dateDate.getTime() + expireMinutes * 60 * 1000)
  const expires = `expires=${dateDate.toUTCString()}`
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`
}
// 登录请求函数
function login (userId, userKey, callBack) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', `login.php?userId=${userId}&userKey=${userKey}`, true)
  xhr.send()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let result = xhr.responseText
      const regExp = /^[A-Za-z0-9]+$/
      if (!regExp.test(result)) {
        result = ''
      }
      callBack(result)
    }
  }
}
// 登录按钮点击事件
function buttonClick () {
  let tempUserId = document.getElementById('userId').value
  let tempKey = document.getElementById('key').value
  if (tempUserId === '' || tempKey === '') {
    return
  }
  let regExp = /^[0-9]+$/
  if (!regExp.test(tempUserId)) {
    tempUserId = ''
    document.getElementById('userId').value = 'Invalid Input'
    return
  }
  regExp = /^[A-Za-z0-9]+$/
  if (!regExp.test(tempKey)) {
    tempKey = ''
    document.getElementById('userId').value = 'Invalid Input'
    document.getElementById('key').value = ''
    return
  }
  document.getElementById('userId').value = 'Logging in...'
  login(tempUserId, tempKey, (result) => {
    const sessionKey = result
    // 判断 sessionKey 是不是十二位的字母和数字
    if (sessionKey.length !== 12) {
      document.getElementById('userId').value = 'Login Failed'
      document.getElementById('key').value = ''
      return
    }
    document.getElementById('userId').value = tempUserId
    document.getElementById('key').value = ''
    setCookie('sessionKey', sessionKey)
    setCookie('userId', tempUserId, 60)
    window.location.href = './'
  })
}
