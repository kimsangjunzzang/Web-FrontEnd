const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');

// MARK: API
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

// MARK: Func
function ContentLoad(){};
function getData(url){};

const ul = document.createElement('ul');
const newsFeed = getData(NEWS_URL);

window.addEventListener('hashchange',ContentLoad);

for ( let i =0; i<10; i++) {
  const div = document.createElement('div');

  div.innerHTML = `
   <li>
    <a href="#${newsFeed[i].id}">
      ${newsFeed[i].title} (${newsFeed[i].comments_count})
    </a>
  </li>
  `;
  ul.appendChild(div.firstElementChild);
}

container.appendChild(ul);
container.appendChild(content);

function getData(url) {
  ajax.open('GET',url,false);
  ajax.send();
  return JSON.parse(ajax.response);
}

function ContentLoad(){
  let id = location.hash.substring(1);
  const newsContnet = getData(CONTENT_URL.replace('@id',id));
  const title = this.document.createElement('h1');

  title.innerHTML = newsContnet.title;
  content.appendChild(title); 
}