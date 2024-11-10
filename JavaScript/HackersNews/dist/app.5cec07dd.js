// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/core/router.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Router = /** @class */function () {
  function Router() {
    window.addEventListener('hashchange', this.route.bind(this));
    this.isStart = false;
    this.defaultRoute = null;
    this.routeTable = [];
  }
  Router.prototype.setDefaultPage = function (page, params) {
    if (params === void 0) {
      params = null;
    }
    this.defaultRoute = {
      path: '',
      page: page,
      params: params
    };
  };
  Router.prototype.addRoutePath = function (path, page, params) {
    if (params === void 0) {
      params = null;
    }
    this.routeTable.push({
      path: path,
      page: page,
      params: params
    });
    if (!this.isStart) {
      this.isStart = true;
      // Execute next tick
      setTimeout(this.route.bind(this), 0);
    }
  };
  Router.prototype.route = function () {
    var routePath = location.hash;
    if (routePath === '' && this.defaultRoute) {
      this.defaultRoute.page.render();
      return;
    }
    for (var _i = 0, _a = this.routeTable; _i < _a.length; _i++) {
      var routeInfo = _a[_i];
      if (routePath.indexOf(routeInfo.path) >= 0) {
        if (routeInfo.params) {
          var parseParams = routePath.match(routeInfo.params);
          if (parseParams) {
            routeInfo.page.render.apply(null, [parseParams[1]]);
          }
        } else {
          routeInfo.page.render();
        }
        return;
      }
    }
  };
  return Router;
}();
exports.default = Router;
},{}],"src/core/view.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var View = /** @class */function () {
  function View(containerId, template) {
    var conatinerElement = document.getElementById(containerId);
    if (!conatinerElement) {
      throw '최상위 컨테이너가 없어 UI를 진행하지 못합니다.';
    }
    this.container = conatinerElement;
    this.template = template;
    this.renderTemplate = template;
    this.htmlList = [];
  }
  View.prototype.updateView = function () {
    this.container.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;
  };
  View.prototype.addHtml = function (htmlString) {
    this.htmlList.push(htmlString);
  };
  View.prototype.getHtml = function () {
    var snapshot = this.htmlList.join('');
    this.clearHtmlList();
    return snapshot;
  };
  View.prototype.setTemplateData = function (key, value) {
    this.renderTemplate = this.renderTemplate.replace("{{__".concat(key, "__}}"), value);
  };
  View.prototype.clearHtmlList = function () {
    this.htmlList = [];
  };
  return View;
}();
exports.default = View;
},{}],"src/config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTENT_URL = exports.NEWS_URL = void 0;
exports.NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
exports.CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
},{}],"src/core/api.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsDetailApi = exports.NewsFeedApi = void 0;
var config_1 = require("../config");
var Api = /** @class */function () {
  function Api(url) {
    this.url = url;
  }
  Api.prototype.request = function () {
    return __awaiter(this, void 0, Promise, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, fetch(this.url)];
          case 1:
            response = _a.sent();
            return [4 /*yield*/, response.json()];
          case 2:
            return [2 /*return*/, _a.sent()];
        }
      });
    });
  };
  return Api;
}();
exports.default = Api;
var NewsFeedApi = /** @class */function (_super) {
  __extends(NewsFeedApi, _super);
  function NewsFeedApi() {
    return _super.call(this, config_1.NEWS_URL) || this;
  }
  NewsFeedApi.prototype.getData = function () {
    return __awaiter(this, void 0, Promise, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, this.request()];
      });
    });
  };
  return NewsFeedApi;
}(Api);
exports.NewsFeedApi = NewsFeedApi;
var NewsDetailApi = /** @class */function (_super) {
  __extends(NewsDetailApi, _super);
  function NewsDetailApi(id) {
    return _super.call(this, config_1.CONTENT_URL.replace('@id', id)) || this;
  }
  NewsDetailApi.prototype.getData = function () {
    return __awaiter(this, void 0, Promise, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, this.request()];
      });
    });
  };
  return NewsDetailApi;
}(Api);
exports.NewsDetailApi = NewsDetailApi;
},{"../config":"src/config.ts"}],"src/page/news-detail-view.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var view_1 = __importDefault(require("../core/view"));
var api_1 = require("../core/api");
var template = "\n<div class=\"bg-gray-600 min-h-screen pb-8\">\n  <div class=\"bg-white text-xl\">\n    <div class=\"mx-auto px-4\">\n      <div class=\"flex justify-between items-center py-6\">\n        <div class=\"flex justify-start\">\n          <h1 class=\"font-extrabold\">Hacker News</h1>\n        </div>\n        <div class=\"items-center justify-end\">\n          <a href=\"#/page/{{__currentPage__}}\" class=\"text-gray-500\">\n            <i class=\"fa fa-times\"></i>\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"h-full border rounded-xl bg-white m-6 p-4 \">\n    <h2>{{__title__}}</h2>\n    <div class=\"text-gray-400 h-20\">\n      {{__content__}}\n    </div>\n    {{__comments__}}\n  </div>\n</div>\n";
var NewsDetailView = /** @class */function (_super) {
  __extends(NewsDetailView, _super);
  function NewsDetailView(containerId, store) {
    var _this = _super.call(this, containerId, template) || this;
    _this.render = function (id) {
      return __awaiter(_this, void 0, Promise, function () {
        var api, _a, title, content, comments;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              api = new api_1.NewsDetailApi(id);
              return [4 /*yield*/, api.getData()];
            case 1:
              _a = _b.sent(), title = _a.title, content = _a.content, comments = _a.comments;
              this.store.makeRead(Number(id));
              this.setTemplateData('currentPage', this.store.currentPage.toString());
              this.setTemplateData('title', title);
              this.setTemplateData('content', content);
              this.setTemplateData('comments', this.makeComment(comments));
              this.updateView();
              return [2 /*return*/];
          }
        });
      });
    };
    _this.store = store;
    return _this;
  }
  NewsDetailView.prototype.makeComment = function (comments) {
    for (var i = 0; i < comments.length; i++) {
      var comment = comments[i];
      this.addHtml("\n        <div style=\"padding-left: ".concat(comment.level * 40, "px;\" class=\"mt-4\">\n          <div class=\"text-gray-400\">\n            <i class=\"fa fa-sort-up mr-2\"></i>\n            <strong>").concat(comment.user, "</strong> ").concat(comment.time_ago, "\n          </div>\n          <p class=\"text-gray-700\">").concat(comment.content, "</p>\n        </div>      \n      "));
      if (comment.comments.length > 0) {
        this.addHtml(this.makeComment(comment.comments));
      }
    }
    return this.getHtml();
  };
  return NewsDetailView;
}(view_1.default);
exports.default = NewsDetailView;
},{"../core/view":"src/core/view.ts","../core/api":"src/core/api.ts"}],"src/page/news-feed-view.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var view_1 = __importDefault(require("../core/view"));
var api_1 = require("../core/api");
var template = "\n<div class=\"bg-gray-600 min-h-screen\">\n  <div class=\"bg-white text-xl\">\n    <div class=\"mx-auto px-4\">\n      <div class=\"flex justify-between items-center py-6\">\n        <div class=\"flex justify-start\">\n          <h1 class=\"font-extrabold\">Hacker News</h1>\n        </div>\n        <div class=\"items-center justify-end\">\n          <a href=\"#/page/{{__prev_page__}}\" class=\"text-gray-500\">\n            Previous\n          </a>\n          <a href=\"#/page/{{__next_page__}}\" class=\"text-gray-500 ml-4\">\n            Next\n          </a>\n        </div>\n      </div> \n    </div>\n  </div>\n  <div class=\"p-4 text-2xl text-gray-700\">\n    {{__news_feed__}}        \n  </div>\n</div>\n";
var NewsFeedView = /** @class */function (_super) {
  __extends(NewsFeedView, _super);
  function NewsFeedView(containerId, store) {
    var _this = _super.call(this, containerId, template) || this;
    _this.render = function () {
      var args_1 = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
      }
      return __awaiter(_this, __spreadArray([], args_1, true), Promise, function (page) {
        var _a, _b, i, _c, id, title, comments_count, user, points, time_ago, read;
        if (page === void 0) {
          page = '1';
        }
        return __generator(this, function (_d) {
          switch (_d.label) {
            case 0:
              this.store.currentPage = Number(page);
              if (!!this.store.hasFeeds) return [3 /*break*/, 2];
              _b = (_a = this.store).setFeeds;
              return [4 /*yield*/, this.api.getData()];
            case 1:
              _b.apply(_a, [_d.sent()]);
              _d.label = 2;
            case 2:
              for (i = (this.store.currentPage - 1) * 10; i < this.store.currentPage * 10; i++) {
                _c = this.store.getFeed(i), id = _c.id, title = _c.title, comments_count = _c.comments_count, user = _c.user, points = _c.points, time_ago = _c.time_ago, read = _c.read;
                this.addHtml("\n        <div class=\"p-6 ".concat(read ? 'bg-red-500' : 'bg-white', " mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100\">\n          <div class=\"flex\">\n            <div class=\"flex-auto\">\n              <a href=\"#/show/").concat(id, "\">").concat(title, "</a>  \n            </div>\n            <div class=\"text-center text-sm\">\n              <div class=\"w-10 text-white bg-green-300 rounded-lg px-0 py-2\">").concat(comments_count, "</div>\n            </div>\n          </div>\n          <div class=\"flex mt-3\">\n            <div class=\"grid grid-cols-3 text-sm text-gray-500\">\n              <div><i class=\"fas fa-user mr-1\"></i>").concat(user, "</div>\n              <div><i class=\"fas fa-heart mr-1\"></i>").concat(points, "</div>\n              <div><i class=\"far fa-clock mr-1\"></i>").concat(time_ago, "</div>\n            </div>  \n          </div>\n        </div>    \n      "));
              }
              this.setTemplateData('news_feed', this.getHtml());
              this.setTemplateData('prev_page', String(this.store.prevPage));
              this.setTemplateData('next_page', String(this.store.nextPage));
              this.updateView();
              return [2 /*return*/];
          }
        });
      });
    };
    _this.store = store;
    _this.api = new api_1.NewsFeedApi();
    return _this;
  }
  return NewsFeedView;
}(view_1.default);
exports.default = NewsFeedView;
},{"../core/view":"src/core/view.ts","../core/api":"src/core/api.ts"}],"src/page/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsFeedView = exports.NewsDetailView = void 0;
var news_detail_view_1 = require("./news-detail-view");
Object.defineProperty(exports, "NewsDetailView", {
  enumerable: true,
  get: function get() {
    return __importDefault(news_detail_view_1).default;
  }
});
var news_feed_view_1 = require("./news-feed-view");
Object.defineProperty(exports, "NewsFeedView", {
  enumerable: true,
  get: function get() {
    return __importDefault(news_feed_view_1).default;
  }
});
},{"./news-detail-view":"src/page/news-detail-view.ts","./news-feed-view":"src/page/news-feed-view.ts"}],"src/store.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = void 0;
var Store = /** @class */function () {
  function Store() {
    var _this = this;
    this.setFeeds = function (feeds) {
      _this.feeds = feeds.map(function (feed) {
        return __assign(__assign({}, feed), {
          read: false
        });
      });
    };
    this.feeds = [];
    this._currentPage = 1;
  }
  Object.defineProperty(Store.prototype, "currentPage", {
    get: function get() {
      return this._currentPage;
    },
    set: function set(page) {
      this._currentPage = page;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Store.prototype, "nextPage", {
    get: function get() {
      return this._currentPage + 1;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Store.prototype, "prevPage", {
    get: function get() {
      return this._currentPage > 1 ? this._currentPage - 1 : 1;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Store.prototype, "numberOfFeed", {
    get: function get() {
      return this.feeds.length;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Store.prototype, "hasFeeds", {
    get: function get() {
      return this.feeds.length > 0;
    },
    enumerable: false,
    configurable: true
  });
  Store.prototype.getFeed = function (position) {
    return this.feeds[position];
  };
  Store.prototype.getAllFeeds = function () {
    return this.feeds;
  };
  Store.prototype.makeRead = function (id) {
    var feed = this.feeds.find(function (feed) {
      return feed.id === id;
    });
    if (feed) {
      feed.read = true;
    }
  };
  return Store;
}();
exports.Store = Store;
},{}],"src/app.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var router_1 = __importDefault(require("./core/router"));
var page_1 = require("./page");
var store_1 = require("./store");
var store = new store_1.Store();
var router = new router_1.default();
var newsFeedView = new page_1.NewsFeedView('root', store);
var newsDetailView = new page_1.NewsDetailView('root', store);
router.setDefaultPage(newsFeedView);
router.addRoutePath('/page/', newsFeedView, /page\/(\d+)/);
router.addRoutePath('/show/', newsDetailView, /show\/(\d+)/);
},{"./core/router":"src/core/router.ts","./page":"src/page/index.ts","./store":"src/store.ts"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56044" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.ts"], null)
//# sourceMappingURL=/app.5cec07dd.js.map