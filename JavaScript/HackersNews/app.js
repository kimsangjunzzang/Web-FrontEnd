const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");

// MARK: API
const NEWS_URL = "https://api.hnpwa.com//v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

const ul = document.createElement("ul");

function getData(url) {
  ajax.open("GET", url, false);
  ajax.send();
  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];

  newsList.push("<ul>");

  for (let i = 0; i < 10; i++) {
    newsList.push(`
   <li>
    <a href="#${newsFeed[i].id}">
      ${newsFeed[i].title} (${newsFeed[i].comments_count})
    </a>
  </li>
  `);
  }

  newsList.push("</ul>");
  container.innerHTML = newsList.join("");
}

function newsDetail() {
  let id = location.hash.substring(1);

  const newsContnet = getData(CONTENT_URL.replace("@id", id));
  const title = this.document.createElement("h1");

  container.innerHTML = `
  <h1>${newsContnet.title}</h1>
  <div>
    <a href = "a">목록으로</a>
  </div>
  `;

  title.innerHTML = newsContnet.title;
  content.appendChild(title);
}

function router() {
  const routePath = location.hash;

  if (routePath === "") {
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener("hashchange", router);

router();
