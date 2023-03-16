function addTask() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const deadline = document.getElementById("deadline").value;
    const priority = document.getElementById("priority").value;
    const finished = document.getElementById("finished").checked;
  
    const addTime = new Date().toISOString().slice(0, 19).replace("T", " ");
  
    const task = {
      title,
      content,
      addTime,
      deadline,
      priority,
      finished
    };
  
    const sessionKey = getCookie("sessionKey");
    const userId = getCookie("userId");
  
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "add.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = xhr.responseText;
        if (response === "OK") {
          alert("Task added!");
        }
      }
    };
    xhr.send(JSON.stringify({ sessionKey, userId, task }));
  }
  
  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return "";
  }
  