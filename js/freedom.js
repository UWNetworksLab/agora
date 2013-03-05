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
function q(a, b, c, e) {
  b && p(b, function(b, g) {
    if(c || !Object.prototype.hasOwnProperty.call(a, g)) {
      e && "string" !== typeof b ? (a[g] || (a[g] = {}), q(a[g], b, c, e)) : a[g] = b
    }
  });
  return a
}
function r(a) {
  var b = {}, c = [];
  a.on = function(a, f) {
    "function" === typeof a ? c.push([a, f]) : b[a] ? b[a].push(f) : b[a] = [f]
  };
  a.once = function(e, f) {
    var g;
    g = "function" === typeof e ? function(a) {
      for(var b = 0;b < c.length;b++) {
        if(c[b][1] === g) {
          condiitonalListeners = c.splice(b, 1);
          break
        }
      }
      f(a)
    } : function(a) {
      b[e] = b[e].splice(b[e].indexOf(this), 1);
      f(a)
    };
    a.on(e, g)
  };
  a.emit = function(a, f) {
    for(var g = 0;g < c.length;g++) {
      if(c[g][0](a, f)) {
        c[g][1](f)
      }
    }
    if(b[a]) {
      for(var k = b[a].slice(0), g = 0;g < k.length && k[g](f) !== n;g++) {
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
t.h = function() {
  this.g = {};
  this.t = {};
  r(this)
};
t.h.get = function() {
  t.h.A || (t.h.A = new t.h);
  return window.T = t.h.A
};
t.h.prototype.r = function(a, b) {
  if(this.g[a.id]) {
    var c = this.t[a.id], e = b.j;
    if("control" == e) {
      if("debug" != b.m ? console.log(a.id + " -C " + b.m) : console.log(a.id + " -D " + b.i), "dep" == b.m) {
        if(c = b.I, a.a.dependencies.hasOwnProperty(c)) {
          e = s(a.a.dependencies[c]);
          if(!this.g[e]) {
            var f = new t.b.n;
            f.v(a.e);
            f.v({a:e});
            this.g[e] = f
          }
          this.t[a.id][c] = this.g[e].l("default");
          this.t[e] = {"default":a.l(c)}
        }else {
          console.warn("Dependency requested that was undeclared in app manifest")
        }
      }else {
        if("create" == b.m) {
          if(a.postMessage({j:"control", i:{id:a.id, a:a.a}}), c = a.id, this.g[c]) {
            if(this.g[c].a.permissions) {
              for(e = 0;e < this.g[c].a.permissions.length;e++) {
                if(f = this.g[c].a.permissions[e], 0 === f.indexOf("core.")) {
                  var g = this.t[c], k = f, h = this.g[c].l(f);
                  g[k] = new u(f, h)
                }
              }
            }
          }else {
            console.warn("Registration requested for unknown App " + c)
          }
        }else {
          "ready" == b.m && a.emit("ready")
        }
      }
    }else {
      c[e] ? (console.log(a.id + " -> " + e + " " + b.i.action + " " + b.i.type), c[e] == a.l(e) ? c[e].r(b.i) : c[e].postMessage(b.i)) : console.warn("Message dropped from unregistered flow " + a.id + " -> " + e)
    }
  }else {
    console.warn("Message dropped from unregistered app " + a.id)
  }
};
t.h.prototype.u = function(a) {
  this.g[a.id] || (this.g[a.id] = a, this.t[a.id] = {"default":a.k["default"]});
  this.emit("register", a)
};
t = t || {};
function v() {
  this.d = {};
  this.F = {}
}
v.prototype.get = function(a) {
  return!this.d[a] ? n : {name:a, definition:this.d[a]}
};
v.prototype.set = function(a, b) {
  this.d[a] = b
};
v.prototype.u = function(a, b) {
  this.F[a] = b
};
function u(a, b) {
  this.B = m;
  this.name = a;
  this.f = b
}
u.prototype.postMessage = function(a) {
  if(!this.B) {
    var b = t.d.get(this.name);
    this.B = new t.c.G(this.f, b.definition);
    this.B.provideAsynchronous(t.d.F[this.name].bind({}, this.f))
  }
  this.f.emit("message", a)
};
t.d = new v;
t = t || {};
t.b = t.b || {};
t.b.n = function() {
  this.id;
  this.e = {a:"manifest.json", source:"freedom.js"};
  this.k = {};
  this.a = {};
  this.p = m;
  this.state = n;
  r(this)
};
t.b.n.prototype.v = function(a) {
  q(this.e, a, d)
};
t.b.n.prototype.w = function(a) {
  a = this.l(a);
  a = new t.c(a);
  this.e.q || (this.e.q = a);
  return a
};
t.b.n.prototype.l = function(a) {
  if(!this.a || !this.id) {
    var b = this.id = s(this.e.a), c = new XMLHttpRequest;
    c.addEventListener("readystatechange", function() {
      if(4 == c.readyState && c.responseText) {
        var a = {};
        try {
          a = JSON.parse(c.responseText)
        }catch(b) {
          return errback(b)
        }
        a && a.app && a.app.script ? (this.a = a, t.h.get().u(this), this.emit("manifest"), this.start()) : console.warn(a.name + " does not specify a valid application.")
      }else {
        4 == c.readyState && console.warn(c.status)
      }
    }.bind(this), n);
    c.open("GET", b, d);
    c.send()
  }
  a || (a = "default");
  this.k[a] || (this.k[a] = new t.s(this, a));
  return this.k[a]
};
t.b.n.prototype.start = function() {
  this.p && (this.p.terminate(), this.p = m, this.state = n);
  this.p = new Worker(this.e.source);
  this.p.addEventListener("message", function(a) {
    t.h.get().r(this, a.data)
  }.bind(this), d);
  this.once("ready", function() {
    this.state = d
  }.bind(this))
};
t.b.n.prototype.postMessage = function(a) {
  if(this.state || this.p && "control" == a.j) {
    this.p.postMessage(a)
  }else {
    this.once("ready", function(a) {
      this.postMessage(a)
    }.bind(this, a))
  }
};
t = t || {};
t.b = t.b || {};
t.b.o = function() {
  this.id;
  this.e = {};
  this.k = {};
  this.a = {};
  r(this)
};
t.b.o.prototype.v = function(a) {
  q(this.e, a, d)
};
t.b.o.prototype.l = function(a) {
  (!this.a || !this.id) && this.start();
  a || (a = "default");
  this.k[a] || (this.k[a] = new t.s(this, a));
  return this.k[a]
};
t.b.o.prototype.w = function(a) {
  a = new t.c(this.l(a));
  this.e.q || (this.e.q = a);
  return a
};
t.b.o.prototype.start = function() {
  this.e.global.addEventListener("message", function(a) {
    if(a.data && a.data.j) {
      var b = this.k[a.data.j];
      b ? b.r(a.data.i) : a.data && "control" == a.data.j && this.emit("message", a)
    }
  }.bind(this), d);
  this.once("message", function(a) {
    this.id = a.data.i.id;
    if((this.a = a.data.i.a) && this.a.permissions) {
      a = this.e.q;
      for(var b = 0;b < this.a.permissions.length;b++) {
        var c = t.d.get(this.a.permissions[b]);
        c && (a[c.name] = function(a, b) {
          return new t.c(this.l(a), b)
        }.bind(this, c.name, c.definition))
      }
    }
    if(this.a && this.a.dependencies) {
      var e = this.e.q;
      p(this.a.dependencies, function(a, b) {
        var c = function(a) {
          var b = this.w(a);
          this.postMessage({j:"control", m:"dep", I:a});
          return b
        }.bind(this, b);
        e[b] ? c() : e[b] = c
      }.bind(this))
    }
    if(this.a && this.a.provides) {
      a = this.e.q;
      for(b = 0;b < this.a.provides.length;b++) {
        (c = t.d.get(this.a.provides[b])) && (a[c.name] = function(a) {
          return new t.c(this.l(), a, d)
        }.bind(this, c.definition))
      }
    }
    this.postMessage({j:"control", m:"ready"});
    importScripts(this.id.substr(0, this.id.lastIndexOf("/")) + "/" + this.a.app.script)
  }.bind(this));
  this.postMessage({j:"control", m:"create"})
};
t.b.o.prototype.postMessage = function(a) {
  this.e.global.postMessage(a)
};
t.b.o.prototype.debug = function(a) {
  this.postMessage({j:"control", m:"debug", i:a})
};
t = t || {};
t.s = function(a, b) {
  this.b = a;
  this.L = b;
  r(this)
};
t.s.prototype.r = function(a) {
  this.emit("message", a.type ? a : a.data)
};
t.s.prototype.postMessage = function(a) {
  this.b.postMessage({j:this.L, i:a})
};
t.s.prototype.w = function() {
  var a = this, b = {};
  r(b);
  b.on("message", function(b) {
    a.emit("message", b)
  });
  return b
};
t = t || {};
t.c = function(a, b, c) {
  return b ? c ? new t.c.G(a, b) : new t.c.Q(a, b) : new t.c.O(a)
};
t.c.O = function(a) {
  r(this);
  var b = this.emit, c = {};
  this.emit = function(c, f) {
    a.postMessage({action:"event", type:c, data:f});
    b(c, f)
  };
  this.get = function(a) {
    if(c.hasOwnProperty(a)) {
      return c[a]
    }
  };
  this.set = function(b, f) {
    if(c.hasOwnProperty(b) || void 0 === c[b]) {
      c[b] = f, a.postMessage({action:"set", key:b, value:f})
    }
  };
  a.on("message", function(a) {
    "event" == a.action ? b(a.type, a.data) : "set" == a.action && (c[a.key] = a.value)
  })
};
t.c.z = function(a) {
  function b(a) {
    c = a;
    e = d;
    h = g || 0;
    g = 0;
    k = j.length;
    for(f = d;j && h < k;h++) {
      j[h].apply(a[0], a[1])
    }
    f = n;
    j && (l && l.length ? b(l.shift()) : l || (j = []))
  }
  var c, e, f, g, k, h, l = a && [], j = [], w = {add:function() {
    if(j) {
      var a = j.length;
      (function B(a) {
        for(var b = 0;b < a.length;b++) {
          "function" === typeof a[b] ? w.M(a[b]) || j.push(a[b]) : a[b] && (a[b].length && "string" !== typeof a[b]) && B(a[b])
        }
      })(arguments);
      f ? k = j.length : c && (g = a, b(c))
    }
    return this
  }, remove:function() {
    if(j) {
      for(var a = 0;a < arguments.length;a++) {
        for(var b;-1 < (b = j.indexOf(arguments[a], b));) {
          j.splice(b, 1), f && (b <= k && k--, b <= h && h--)
        }
      }
    }
    return this
  }, M:function(a) {
    return a ? -1 < j.indexOf(a) : !(!j || !j.length)
  }, empty:function() {
    j = [];
    return this
  }, disable:function() {
    j = l = c = void 0;
    return this
  }, disabled:function() {
    return!j
  }, N:function() {
    l = void 0;
    return this
  }, U:function() {
    return!l
  }, D:function(a, c) {
    c = c || [];
    c = [a, c.slice ? c.slice() : c];
    if(j && (!e || l)) {
      f ? l.push(c) : b(c)
    }
    return this
  }, R:function() {
    w.D(this, arguments);
    return this
  }, S:function() {
    return!!e
  }};
  return w
};
t.c.C = function(a) {
  for(var b = [["resolve", "done", t.c.z(), "resolved"], ["reject", "fail", t.c.z(), "rejected"], ["notify", "progress", t.c.z(d)]], c = "pending", e = {state:function() {
    return c
  }, always:function() {
    f.J(arguments).K(arguments);
    return this
  }, then:function() {
    var a = arguments;
    return t.c.C(function(c) {
      for(var g = 0;g < b.length;g++) {
        var k = b[g][0], h = "function" === typeof a[g] ? a[g] : m;
        f[b[g][1]](function() {
          var a = h && h.apply(this, arguments);
          if(a && "function" == typeof a.promise) {
            a.promise().J(c.Z).K(c.Y).X(c.W)
          }else {
            c[k + "With"](this === e ? c.promise() : this, h ? [a] : arguments)
          }
        })
      }
      a = m
    }).promise()
  }, promise:function(a) {
    return a != m ? q(a, e) : e
  }}, f = {}, g = 0;g < b.length;g++) {
    var k = b[g][3], h = b[g][2];
    e[b[g][1]] = h.add;
    k && h.add(function() {
      c = k
    }, b[g ^ 1][2].disable, b[2][2].N);
    var l = b[g][0];
    f[l] = function(a) {
      f[a + "With"](this === f ? e : this, Array.prototype.slice.call(arguments, 1));
      return this
    }.bind(this, l);
    f[l + "With"] = h.D
  }
  e.promise(f);
  a && a.call(f, f);
  return f
};
t.c.G = function(a, b) {
  var c = m, e = d, f = {};
  p(b, function(a, b) {
    "event" == a.type && (f[b] = a)
  });
  f !== {} && (this.emit = function(b, c) {
    f[b] && a.postMessage({action:"event", type:b, value:x(f[b].value, c)})
  });
  this.provideSynchronous = function(a) {
    c = new a
  };
  this.provideAsynchronous = function(a) {
    c = new a;
    e = n
  };
  a.on("message", function(b) {
    if(b && "method" == b.action) {
      if(e) {
        var f = c[b.type].apply(c, b.value);
        a.postMessage({action:"method", id:b.id, type:b.type, value:f})
      }else {
        f = b.value, Array.isArray(f) || (f = [f]), c[b.type].apply(c, f.concat(function(c) {
          a.postMessage({action:"method", type:b.type, id:b.id, value:c})
        }))
      }
    }
  })
};
t.c.Q = function(a, b) {
  var c = {}, e = m, f = m, g = Math.random();
  p(b, function(b, h) {
    switch(b.type) {
      case "method":
        this[h] = function() {
          a.postMessage({action:"method", type:h, id:g, value:x(b.value, arguments)});
          var f = t.c.C();
          c[g] = f;
          g++;
          return f.promise()
        };
        break;
      case "event":
        e || (r(this), f = this.emit, delete this.emit, e = {}), e[h] = b
    }
  }.bind(this));
  a.on("message", function(a) {
    if(a) {
      if("method" == a.action) {
        if(c[a.id]) {
          var b = c[a.id];
          delete c[a.id];
          b.resolve(a.value)
        }else {
          console.log("Dropped response message with id " + a.id)
        }
      }else {
        if("event" == a.action && (b = e[a.type])) {
          b = x(b.value, a.value), f(a.type, b)
        }
      }
    }
  })
};
function x(a, b) {
  switch(a) {
    case "string":
      return"" + b;
    case "number":
      return 0 + b;
    case "bool":
      return 0 | b;
    case "object":
      return JSON.parse(JSON.stringify(b))
  }
  if(Array.isArray(a)) {
    var c = [];
    if(2 == a.length && "array" == a[0]) {
      for(var e = 0;e < b.length;e++) {
        c.push(x(a[1], b[e]))
      }
    }else {
      for(e = 0;e < a.length;e++) {
        b[e] ? c.push(x(a[e], b[e])) : c.push(void 0)
      }
    }
    return c
  }
  if("object" === typeof a) {
    return c = {}, p(a, function(a, e) {
      b[e] && (c[e] = x(a, b[e]))
    }), c
  }
}
function y(a) {
  this.f = a;
  r(this)
}
y.prototype.get = function(a, b) {
  try {
    b(localStorage[this.f.b.id + a])
  }catch(c) {
    b(m)
  }
};
y.prototype.set = function(a, b, c) {
  localStorage[this.f.b.id + a] = b;
  c()
};
t.d.u("core.storage", y);
function z(a) {
  this.V = 10;
  this.f = a;
  this.$ = {};
  this.P = {};
  r(this)
}
z.prototype.r = function(a, b) {
  console.log(a + " message: " + b.data);
  this.f.postMessage({action:"event", type:"onStateChange", value:{id:a, message:b.data}})
};
z.prototype.send = function(a, b, c) {
  this.P[a].send(b);
  c()
};
z.prototype.get = function(a, b) {
  try {
    b(localTransport[this.f.b.id + a])
  }catch(c) {
    b(m)
  }
};
z.prototype.set = function(a, b, c) {
  localTransport[this.f.b.id + a] = b;
  c()
};
t.d.u("transport", z);
function A(a) {
  this.H = this.host = m;
  this.f = a;
  r(this)
}
A.prototype.postMessage = function(a) {
  this.H.contentWindow.postMessage(a, "*")
};
A.prototype.r = function(a) {
  a.source == this.H.contentWindow && this.f.postMessage({action:"event", type:"message", value:a.data})
};
t.d.u("core.view", A);
setup = function() {
  var a, b = {global:global};
  if("undefined" === typeof window) {
    a = new t.b.o
  }else {
    if(a = new t.b.n, "undefined" !== typeof document) {
      var c = document.getElementsByTagName("script");
      if(c) {
        var e;
        for(e = c.length - 1;-1 < e;e -= 1) {
          var f;
          if(f = c[e]) {
            var g = c[e];
            f = g.getAttribute("data-manifest");
            g = g.src;
            f ? (b.source = g, b.a = f, f = d) : f = void 0
          }
          if(f) {
            break
          }
        }
      }
    }
  }
  a.v(b);
  "undefined" === typeof global.console && (global.console = {log:a.debug.bind(a)});
  return a.w()
};
t.d.set("core.view", {show:{type:"method", value:[{file:"string", code:"string"}]}, close:{type:"method", value:[]}, postMessage:{type:"method", value:["object"]}, message:{type:"event", value:"object"}, onClose:{type:"event", value:[]}});
t.d.set("core.storage", {set:{type:"method", value:["string", "string"]}, get:{type:"method", value:["string"]}, change:{type:"event", value:["string"]}});
t.d.set("identity", {name:{type:"property", value:"string"}, get:{type:"method", value:[]}, send:{type:"method", value:["string", "string"]}, buddylist:{type:"event", value:["array", "string"]}, message:{type:"event", value:["string"]}});
t.d.set("storage", {clear:{type:"method", value:[]}, set:{type:"method", value:["string", "string"]}, remove:{type:"method", value:["string"]}, get:{type:"method", value:["string"]}});
t.d.set("transport", {create:{type:"method", value:[]}, accept:{type:"method", value:["number", "object"]}, send:{type:"method", value:["number", "object"]}, close:{type:"method", value:["number"]}, onStateChange:{type:"event", value:["string"]}, onMessage:{type:"event", value:["object"]}});

  // Create default context.
  global['freedom'] = setup();
})(this);

