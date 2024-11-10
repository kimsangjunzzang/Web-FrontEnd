import { NewsStore, NewsFeed } from './types';

export class Store implements NewsStore {
  private feeds: NewsFeed[];
  private _currentPage: number;

  constructor() {
    this.feeds = [];
    this._currentPage = 1;
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(page: number) {
    this._currentPage = page;
  }

  get nextPage(): number {
    return this._currentPage + 1;
  }

  get prevPage(): number {
    return this._currentPage > 1 ? this._currentPage - 1 : 1;
  }
  
  get numberOfFeed() {
    return this.feeds.length;
  }

  get hasFeeds() {
    return this.feeds.length > 0;
  }

  getFeed(position: number): NewsFeed {
    return this.feeds[position];
  }

  getAllFeeds(): NewsFeed[] {
    return this.feeds;
  }

  setFeeds = (feeds: NewsFeed[]) => {
    this.feeds = feeds.map(feed => ({
      ...feed, 
      read: false
    }));
  }

  makeRead(id: number) {
    const feed = this.feeds.find((feed: NewsFeed) => feed.id === id);

    if (feed) {
      feed.read = true;
    }
  }
}
