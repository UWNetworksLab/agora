/**
 * @license tbd - something open.
 * see: https://github.com/UWNetworksLab/freedom
 */
(function(global) {
  "use strict";
  var cfg = {global: global},
      context,
      setup;

  if (typeof global['freedom'] !== 'undefined') {
    return;
  }
var d = !0, m = null, n = !1;
function p(a, b) {
  for(var c in a) {
    if(a.hasOwnProperty(c) && b(a[c], c)) {
      break
    }
  }
}
function q(a, b, c, g) {
  b && p(b, function(b, f) {
    if(c || !Object.prototype.hasOwnProperty.call(a, f)) {
      g && "string" !== typeof b ? (a[f] || (a[f] = {}), q(a[f], b, c, g)) : a[f] = b
    }
  });
  return a
}
function r(a) {
  var b = {}, c = [];
  a.on = function(a, e) {
    "function" === typeof a ? c.push([a, e]) : b[a] ? b[a].push(e) : b[a] = [e]
  };
  a.once = function(g, e) {
    var f;
    f = "function" === typeof g ? function(a) {
      for(var b = 0;b < c.length;b++) {
        if(c[b][1] === f) {
          condiitonalListeners = c.splice(b, 1);
          break
        }
      }
      e(a)
    } : function(a) {
      b[g] = b[g].splice(b[g].indexOf(this), 1);
      e(a)
    };
    a.on(g, f)
  };
  a.emit = function(a, e) {
    for(var f = 0;f < c.length;f++) {
      if(c[f][0](a, e)) {
        c[f][1](e)
      }
    }
    if(b[a]) {
      for(var j = b[a].slice(0), f = 0;f < j.length && j[f](e) !== n;f++) {
      }
    }
  }
}
function s(a) {
  if(0 !== a.indexOf("http")) {
    var b = location.protocol + "//" + location.host;
    if(0 === a.indexOf("/")) {
      return b + a
    }
    b += location.pathname;
    return b.substr(0, b.lastIndexOf("/")) + "/" + a
  }
  return a
}
var t = t || {};
t.g = function() {
  this.o = {};
  this.u = {};
  r(this)
};
t.g.get = function() {
  t.g.w || (t.g.w = new t.g);
  return window.N = t.g.w
};
t.g.prototype.t = function(a, b) {
  if(this.o[a.id]) {
    var c = this.u[a.id], g = b.f;
    if("control" == g) {
      if("debug" != b.k ? console.log(a.id + " -C " + b.k) : console.log(a.id + " -D " + b.e), "dep" == b.k) {
        if(c = b.B, a.a.dependencies.hasOwnProperty(c)) {
          g = s(a.a.dependencies[c]);
          if(!this.o[g]) {
            var e = new t.b.l;
            e.r(a.d);
            e.r({a:g});
            this.o[g] = e
          }
          this.u[a.id][c] = this.o[g].j("default");
          this.u[g] = {"default":a.j(c)}
        }else {
          console.warn("Dependency requested that was undeclared in app manifest")
        }
      }else {
        "create" == b.k ? a.postMessage({f:"control", e:{id:a.id, a:a.a}}) : "ready" == b.k && a.emit("ready")
      }
    }else {
      c[g] ? (console.log(a.id + " -> " + g + " " + b.e.action + " " + b.e.type), c[g] == a.j(g) ? c[g].t(b.e) : c[g].postMessage(b.e)) : console.warn("Message dropped from unregistered flow " + a.id + "." + g)
    }
  }else {
    console.warn("Message dropped from unregistered app " + a.id)
  }
};
t = t || {};
function v() {
  this.i = {}
}
v.prototype.get = function(a) {
  return!this.i[a] ? n : {name:a, definition:this.i[a]}
};
v.prototype.set = function(a, b) {
  this.i[a] = b
};
t.i = new v;
t = t || {};
t.b = t.b || {};
t.b.l = function() {
  this.id;
  this.d = {a:"manifest.json", source:"freedom.js"};
  this.h = {};
  this.a = {};
  this.n = m;
  this.state = n;
  r(this)
};
t.b.l.prototype.r = function(a) {
  q(this.d, a, d)
};
t.b.l.prototype.s = function(a) {
  a = this.j(a);
  a = new t.c(a);
  this.d.p || (this.d.p = a);
  return a
};
t.b.l.prototype.j = function(a) {
  if(!this.a || !this.id) {
    var b = this.id = s(this.d.a), c = new XMLHttpRequest;
    c.addEventListener("readystatechange", function() {
      if(4 == c.readyState && c.responseText) {
        var a = {};
        try {
          a = JSON.parse(c.responseText)
        }catch(b) {
          return errback(b)
        }
        a && a.app && a.app.script ? (this.a = a, a = t.g.get(), a.o[this.id] || (a.o[this.id] = this, a.u[this.id] = {"default":this.h["default"]}), a.emit("register", this), this.emit("manifest"), this.start()) : console.warn(a.name + " does not specify a valid application.")
      }else {
        4 == c.readyState && console.warn(c.status)
      }
    }.bind(this), n);
    c.open("GET", b, d);
    c.send()
  }
  a || (a = "default");
  this.h[a] || (this.h[a] = new t.q(this, a));
  return this.h[a]
};
t.b.l.prototype.start = function() {
  this.n && (this.n.terminate(), this.n = m, this.state = n);
  this.n = new Worker(this.d.source);
  this.n.addEventListener("message", function(a) {
    t.g.get().t(this, a.data)
  }.bind(this), d);
  this.once("ready", function() {
    this.state = d
  }.bind(this))
};
t.b.l.prototype.postMessage = function(a) {
  if(this.state || this.n && "control" == a.f) {
    this.n.postMessage(a)
  }else {
    this.once("ready", function(a) {
      this.postMessage(a)
    }.bind(this, a))
  }
};
t = t || {};
t.b = t.b || {};
t.b.m = function() {
  this.id;
  this.d = {};
  this.h = {};
  this.a = {};
  r(this)
};
t.b.m.prototype.r = function(a) {
  q(this.d, a, d)
};
t.b.m.prototype.j = function(a) {
  (!this.a || !this.id) && this.start();
  a || (a = "default");
  this.h[a] || (this.h[a] = new t.q(this, a));
  return this.h[a]
};
t.b.m.prototype.s = function(a) {
  a = new t.c(this.j(a));
  this.d.p || (this.d.p = a);
  return a
};
t.b.m.prototype.start = function() {
  this.d.global.addEventListener("message", function(a) {
    if(a.data && a.data.f) {
      var b = this.h[a.data.f];
      b ? b.t(a.data.e) : a.data && "control" == a.data.f && this.emit("message", a)
    }
  }.bind(this), d);
  this.once("message", function(a) {
    this.id = a.data.e.id;
    if((this.a = a.data.e.a) && this.a.permissions) {
      a = this.d.p;
      for(var b = 0;b < this.a.permissions.length;b++) {
        var c = t.i.get(this.a.permissions[b]);
        c && (a[c.name] = function(a, b) {
          return new t.c(this.j(a), b)
        }.bind(this, c.name, c.definition))
      }
    }
    if(this.a && this.a.dependencies) {
      var g = this.d.p;
      p(this.a.dependencies, function(a, b) {
        var c = function(a) {
          var b = this.s(a);
          this.postMessage({f:"control", k:"dep", B:a});
          return b
        }.bind(this, b);
        g[b] ? c() : g[b] = c
      }.bind(this))
    }
    if(this.a && this.a.provides) {
      a = this.d.p;
      for(b = 0;b < this.a.provides.length;b++) {
        (c = t.i.get(this.a.provides[b])) && (a[c.name] = function(a) {
          return new t.c(this.j(), a, d)
        }.bind(this, c.definition))
      }
    }
    this.postMessage({f:"control", k:"ready"});
    importScripts(this.id.substr(0, this.id.lastIndexOf("/")) + "/" + this.a.app.script)
  }.bind(this));
  this.postMessage({f:"control", k:"create"})
};
t.b.m.prototype.postMessage = function(a) {
  this.d.global.postMessage(a)
};
t.b.m.prototype.debug = function(a) {
  this.postMessage({f:"control", k:"debug", e:a})
};
t = t || {};
t.q = function(a, b) {
  this.b = a;
  this.F = b;
  r(this)
};
t.q.prototype.t = function(a) {
  this.emit("message", a.type ? a : a.data)
};
t.q.prototype.postMessage = function(a) {
  this.b.postMessage({f:this.F, e:a})
};
t.q.prototype.s = function() {
  var a = this, b = {};
  r(b);
  b.on("message", function(b) {
    a.emit("message", b)
  });
  return b
};
t = t || {};
t.c = function(a, b, c) {
  return b ? c ? new t.c.J(a) : new t.c.K(a, b) : new t.c.I(a)
};
t.c.I = function(a) {
  r(this);
  var b = this.emit, c = {};
  this.emit = function(c, e) {
    a.postMessage({action:"event", type:c, data:e});
    b(c, e)
  };
  this.get = function(a) {
    if(c.hasOwnProperty(a)) {
      return c[a]
    }
  };
  this.set = function(b, e) {
    if(c.hasOwnProperty(b) || void 0 === c[b]) {
      c[b] = e, a.postMessage({action:"set", key:b, value:e})
    }
  };
  a.on("message", function(a) {
    "event" == a.action ? b(a.type, a.data) : "set" == a.action && (c[a.key] = a.value)
  })
};
t.c.v = function(a) {
  function b(a) {
    c = a;
    g = d;
    l = f || 0;
    f = 0;
    j = k.length;
    for(e = d;k && l < j;l++) {
      k[l].apply(a[0], a[1])
    }
    e = n;
    k && (h && h.length ? b(h.shift()) : h || (k = []))
  }
  var c, g, e, f, j, l, h = a && [], k = [], u = {add:function() {
    if(k) {
      var a = k.length;
      (function w(a) {
        for(var b = 0;b < a.length;b++) {
          "function" === typeof a[b] ? u.G(a[b]) || k.push(a[b]) : a[b] && (a[b].length && "string" !== typeof a[b]) && w(a[b])
        }
      })(arguments);
      e ? j = k.length : c && (f = a, b(c))
    }
    return this
  }, remove:function() {
    if(k) {
      for(var a = 0;a < arguments.length;a++) {
        for(var b;-1 < (b = k.indexOf(arguments[a], b));) {
          k.splice(b, 1), e && (b <= j && j--, b <= l && l--)
        }
      }
    }
    return this
  }, G:function(a) {
    return a ? -1 < k.indexOf(a) : !(!k || !k.length)
  }, empty:function() {
    k = [];
    return this
  }, disable:function() {
    k = h = c = void 0;
    return this
  }, disabled:function() {
    return!k
  }, H:function() {
    h = void 0;
    return this
  }, O:function() {
    return!h
  }, A:function(a, c) {
    c = c || [];
    c = [a, c.slice ? c.slice() : c];
    if(k && (!g || h)) {
      e ? h.push(c) : b(c)
    }
    return this
  }, L:function() {
    u.A(this, arguments);
    return this
  }, M:function() {
    return!!g
  }};
  return u
};
t.c.z = function(a) {
  for(var b = [["resolve", "done", t.c.v(), "resolved"], ["reject", "fail", t.c.v(), "rejected"], ["notify", "progress", t.c.v(d)]], c = "pending", g = {state:function() {
    return c
  }, always:function() {
    e.C(arguments).D(arguments);
    return this
  }, then:function() {
    var a = arguments;
    return t.c.z(function(c) {
      for(var f = 0;f < b.length;f++) {
        var h = b[f][0], j = "function" === typeof a[f] ? a[f] : m;
        e[b[f][1]](function() {
          var a = j && j.apply(this, arguments);
          if(a && "function" == typeof a.promise) {
            a.promise().C(c.T).D(c.S).R(c.P)
          }else {
            c[h + "With"](this === g ? c.promise() : this, j ? [a] : arguments)
          }
        })
      }
      a = m
    }).promise()
  }, promise:function(a) {
    return a != m ? q(a, g) : g
  }}, e = {}, f = 0;f < b.length;f++) {
    var j = b[f][3], l = b[f][2];
    g[b[f][1]] = l.add;
    j && l.add(function() {
      c = j
    }, b[f ^ 1][2].disable, b[2][2].H);
    var h = b[f][0];
    e[h] = function(a) {
      e[a + "With"](this === e ? g : this, Array.prototype.slice.call(arguments, 1));
      return this
    }.bind(this, h);
    e[h + "With"] = l.A
  }
  g.promise(e);
  a && a.call(e, e);
  return e
};
t.c.J = function(a) {
  var b = m;
  this.provideSynchronous = function(a) {
    b = new a
  };
  a.on("message", function(c) {
    if(c && "method" == c.action) {
      var g = b[c.type].apply(b, c.value);
      a.postMessage({action:"method", type:c.type, value:g})
    }
  })
};
t.c.K = function(a, b) {
  var c = [];
  p(b, function(b, e) {
    switch(b.type) {
      case "method":
        this[e] = function() {
          for(var f = b.value, j = arguments, l = [], h = 0;h < f.length;h++) {
            switch(f[h]) {
              case "string":
                l[h] = "" + j[h];
                break;
              case "number":
                l[h] = 0 + j[h];
                break;
              case "bool":
                l[h] = 0 | j[h];
                break;
              case "callback":
                l[h] = "function" == typeof j[h] ? j[h] : function() {
                };
                break;
              default:
                l[h] = n
            }
          }
          a.postMessage({action:"method", type:e, value:l});
          f = t.c.z();
          c.push(f);
          return f.promise()
        }
    }
  }.bind(this));
  a.on("message", function(a) {
    a && "method" == a.action && c.pop().resolve(a.value)
  })
};
setup = function() {
  var a, b = {global:global};
  if("undefined" === typeof window) {
    a = new t.b.m
  }else {
    if(a = new t.b.l, "undefined" !== typeof document) {
      var c = document.getElementsByTagName("script");
      if(c) {
        var g;
        for(g = c.length - 1;-1 < g;g -= 1) {
          var e;
          if(e = c[g]) {
            var f = c[g];
            e = f.getAttribute("data-manifest");
            f = f.src;
            e ? (b.source = f, b.a = e, e = d) : e = void 0
          }
          if(e) {
            break
          }
        }
      }
    }
  }
  a.r(b);
  "undefined" === typeof global.console && (global.console = {log:a.debug.bind(a)});
  return a.s()
};
t.i.set("identity", {name:{type:"property", value:"string"}, get:{type:"method", value:[]}});
t.i.set("storage", {clear:{type:"method", value:["callback"]}, set:{type:"method", value:["string", "string", "callback"]}, remove:{type:"method", value:["string", "callback"]}, get:{type:"method", value:["string", "callback"]}, Q:{type:"method", value:["string", "callback"]}});

  // Create default context.
  global['freedom'] = setup();
})(this);

