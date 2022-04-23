let _username = "";

function signUp() {
  const username = document.querySelector("#username");
  const picture = document.querySelector("#picture");
  const body = {
    username: username.value,
    avatar: picture.value
  };
  axios.post("http://localhost:5000/sign-up", body).then(() => {
    _username = username;
    loadTweets();
  }).catch(err => {
    if (err.response) {
      alert(err.response.data);
    }
    username.value = '';
    picture.value = '';
  });
}

function loadTweets() {
  axios.get(`http://localhost:5000/tweets`).then(res => {
    const tweets = res.data.reverse();
    let tweetsHtml = '';

    for (let i in tweets) {
      if(parseInt(i) < 10){
        tweetsHtml += Tweet(tweets[i]);
      }else{
        continue;
      }
    }

    document.querySelector(".tweets-page .tweets").innerHTML = tweetsHtml;
    document.querySelector(".pagina-inicial").classList.add("hidden");
    document.querySelector(".tweets-page").classList.remove("hidden");
  });
}

function postTweet() {
  const tweet = document.querySelector("#tweet").value;

  axios.post("http://localhost:5000/tweets", {
    tweet
  }, {
    headers: {
      'User': _username
    }
  }).then((response) => {
    if (response.status === 201) {
      document.querySelector("#tweet").value = "";
      loadTweets();
    }
  }).catch(err => {
    console.error(err);
    if (err.response) {
      alert(err.response.data);
    }
  })
}

function Tweet({ avatar, username, tweet }) {
  return `
    <div class="tweet" onclick="loadUserTweets('${username}')">
      <div class="avatar">
        <img src="${avatar}" />
      </div>
      <div class="content">
        <div class="user">
          @${username}
        </div>
        <div class="body">
          ${escapeHtml(tweet)}
        </div>
      </div>
    </div>
  `
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
