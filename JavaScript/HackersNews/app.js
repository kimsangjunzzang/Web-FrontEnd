const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');

// MARK: API
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

// MARK: Func
function ContentLoad(){};

ajax.open('GET',NEWS_URL,false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement('ul');

window.addEventListener('hashchange',ContentLoad);

for ( let i =0; i<10; i++) {
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.href = `#${newsFeed[i].id}`;
  a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;

  li.appendChild(a);
  ul.appendChild(li);
}

function ContentLoad(){
  let id = location.hash.substring(1);
  ajax.open('GET',CONTENT_URL.replace('@id',id),false);
  ajax.send();

  const newsContnet = JSON.parse(ajax.response);
  const title = this.document.createElement('h1');

  title.innerHTML = newsContnet.title;
  content.appendChild(title); 
}

container.appendChild(ul);
container.appendChild(content);

