function addTodo () {
  const title = document.getElementById('title').value
  const content = document.getElementById('content').value
  const deadline = document.getElementById('deadline').value
  const priority = document.getElementById('priority').value
  const finished = document.getElementById('finished').checked

  // 验证数据
  if (title === '') {
    alert('Title cannot be empty!')
    return
  }
  if (content === '') {
    alert('Content cannot be empty!')
    return
  }
  if (deadline === '') {
    alert('Deadline cannot be empty!')
    return
  }
  if (priority === '') {
    alert('Priority cannot be empty!')
    return
  }

  // 获取当前时间
  const addTime = new Date().toISOString().slice(0, 19).replace('T', ' ')

  // 把数据打包成对象
  const todoInfo = {
    title,
    content,
    addTime,
    deadline,
    priority,
    finished
  }

  // 获取 Cookie
  const sessionKey = getCookie('sessionKey')
  const userId = getCookie('userId')

  // 发送请求
  const xhr = new XMLHttpRequest()
  xhr.open(
    'GET',
    `add.php?sessionKey=${sessionKey}&userId=${userId}&todoInfo=${JSON.stringify(
      todoInfo
    )}`,
    true
  )
  xhr.send()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const result = xhr.responseText
      if (result === 'OK') {
        alert('Todo Added')
      }
    }
  }
}

// 获取 Cookie 函数
function getCookie (name) {
  const cookies = document.cookie.split('; ')
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=')
    if (cookieName === name) {
      return cookieValue
    }
  }
  return ''
}

// 每十分钟刷新一次 Session
setInterval(refreshSession, 10 * 60 * 1000)
function refreshSession () {
  const xhr = new XMLHttpRequest()
  xhr.open(
    'GET',
    `session_refresh.php?sessionKey=${sessionKey}&userId=${userId}`,
    true
  )
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      alert('Session Refreshed')
    }
  }
}
