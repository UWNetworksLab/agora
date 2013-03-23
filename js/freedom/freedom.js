/**
 * @license tbd - something open.
 * see: https://github.com/UWNetworksLab/freedom
 */
(function(global) {
  var freedom_src = arguments.callee.toString();
  "use strict";
  var context,
      setup;

  if (typeof global['freedom'] !== 'undefined') {
    return;
  }
var g = !0, k = null, l = !1;
function p(a, b) {
  for(var c in a) {
    if(a.hasOwnProperty(c) && b(a[c], c)) {
      break
    }
  }
}
function q(a, b, c, d) {
  b && p(b, function(b, f) {
    if(c || !Object.prototype.hasOwnProperty.call(a, f)) {
      d && "string" !== typeof b ? (a[f] || (a[f] = {}), q(a[f], b, c, d)) : a[f] = b
    }
  });
  return a
}
function r(a) {
  var b = {}, c = [];
  a.on = function(a, e) {
    "function" === typeof a ? c.push([a, e]) : b[a] ? b[a].push(e) : b[a] = [e]
  };
  a.once = function(d, e) {
    var f;
    f = "function" === typeof d ? function(a) {
      for(var b = 0;b < c.length;b++) {
        if(c[b][1] === f) {
          condiitonalListeners = c.splice(b, 1);
          break
        }
      }
      e(a)
    } : function(a) {
      b[d] = b[d].splice(b[d].indexOf(this), 1);
      e(a)
    };
    a.on(d, f)
  };
  a.emit = function(a, e) {
    for(var f = 0;f < c.length;f++) {
      if(c[f][0](a, e)) {
        c[f][1](e)
      }
    }
    if(b[a]) {
      for(var m = b[a].slice(0), f = 0;f < m.length && m[f](e) !== l;f++) {
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
t.f = function() {
  this.e = {};
  this.s = {};
  r(this)
};
t.f.get = function() {
  t.f.A || (t.f.A = new t.f);
  return window.R = t.f.A
};
t.f.prototype.h = function(a, b) {
  if(this.e[a.id]) {
    var c = this.s[a.id], d = b.i;
    if("control" == d) {
      if("debug" != b.l ? console.log(a.id + " -C " + b.l) : console.log(a.id + " -D " + b.g), "dep" == b.l) {
        if(c = b.I, a.a.dependencies.hasOwnProperty(c)) {
          var e = s(a.a.dependencies[c]);
          this.e[e] || (d = new u, d.v(a.c), d.v({a:e}), this.e[e] = d);
          this.s[a.id][c] = this.e[e].k("default");
          this.s[e] = {"default":a.k(c)}
        }else {
          console.warn("Dependency requested that was undeclared in app manifest")
        }
      }else {
        if("create" == b.l) {
          if(a.postMessage({i:"control", g:{id:a.id, a:a.a}}), c = a.id, this.e[c]) {
            if(this.e[c].a.permissions) {
              for(e = 0;e < this.e[c].a.permissions.length;e++) {
                if(d = this.e[c].a.permissions[e], 0 === d.indexOf("core.")) {
                  var f = this.s[c], m = d, h = this.e[c].k(d);
                  f[m] = new v(d, h)
                }
              }
            }
          }else {
            console.warn("Registration requested for unknown App " + c)
          }
        }else {
          "ready" == b.l && a.emit("ready")
        }
      }
    }else {
      if(c[d]) {
        console.log(a.id + " -> " + d + " " + b.g.action + " " + b.g.type), c[d] == a.k(d) ? c[d].h(b.g) : c[d].postMessage(b.g)
      }else {
        console.warn("Message dropped from unregistered flow " + a.id + " -> " + d);
        d = [];
        for(e in c) {
          c.hasOwnProperty(e) && d.push(e)
        }
        console.warn("Available flows:" + d)
      }
    }
  }else {
    console.warn("Message dropped from unregistered app " + a.id)
  }
};
t.f.prototype.t = function(a) {
  this.e[a.id] || (this.e[a.id] = a, this.s[a.id] = {"default":a.j["default"]});
  this.emit("register", a)
};
t = t || {};
function w() {
  this.b = {};
  this.G = {}
}
w.prototype.get = function(a) {
  return!this.b[a] ? l : {name:a, definition:this.b[a]}
};
w.prototype.set = function(a, b) {
  this.b[a] = b
};
w.prototype.t = function(a, b) {
  this.G[a] = b
};
function v(a, b) {
  this.B = k;
  this.name = a;
  this.d = b
}
v.prototype.postMessage = function(a) {
  if(!this.B) {
    var b = t.b.get(this.name);
    this.B = new x(this.d, b.definition);
    this.B.provideAsynchronous(t.b.G[this.name].bind({}, this.d))
  }
  this.d.emit("message", a)
};
t.b = new w;
t = t || {};
t.m = t.m || {};
function u() {
  this.id;
  this.c = {a:"manifest.json", source:"freedom.js"};
  this.j = {};
  this.a = {};
  this.p = k;
  this.state = l;
  r(this)
}
u.prototype.v = function(a) {
  q(this.c, a, g)
};
u.prototype.w = function(a) {
  a = this.k(a);
  a = new y(a);
  this.c.q || (this.c.q = a);
  return a
};
u.prototype.k = function(a) {
  if(!this.a || !this.id) {
    var b = this.id = s(this.c.a), c = new XMLHttpRequest;
    c.addEventListener("readystatechange", function() {
      if(4 == c.readyState && c.responseText) {
        var a = {};
        try {
          a = JSON.parse(c.responseText)
        }catch(b) {
          return errback(b)
        }
        a && a.app && a.app.script ? (this.a = a, t.f.get().t(this), this.emit("manifest"), this.start()) : console.warn(a.name + " does not specify a valid application.")
      }else {
        4 == c.readyState && console.warn(c.status)
      }
    }.bind(this), l);
    c.open("GET", b, g);
    c.send()
  }
  a || (a = "default");
  this.j[a] || (this.j[a] = new t.r(this, a));
  return this.j[a]
};
u.prototype.start = function() {
  this.p && (this.p.terminate(), this.p = k, this.state = l);
  this.p = new Worker(URL.createObjectURL(new Blob([this.c.src], {type:"text/javascript"})));
  this.p.addEventListener("message", function(a) {
    t.f.get().h(this, a.data)
  }.bind(this), g);
  this.once("ready", function() {
    this.state = g
  }.bind(this))
};
u.prototype.postMessage = function(a) {
  if(this.state || this.p && "control" == a.i) {
    this.p.postMessage(a)
  }else {
    this.once("ready", function(a) {
      this.postMessage(a)
    }.bind(this, a))
  }
};
t = t || {};
t.m = t.m || {};
function z() {
  this.id;
  this.c = {};
  this.j = {};
  this.a = {};
  r(this)
}
z.prototype.v = function(a) {
  q(this.c, a, g)
};
z.prototype.k = function(a) {
  (!this.a || !this.id) && this.start();
  a || (a = "default");
  this.j[a] || (this.j[a] = new t.r(this, a));
  return this.j[a]
};
z.prototype.w = function(a) {
  a = new y(this.k(a));
  this.c.q || (this.c.q = a);
  return a
};
z.prototype.start = function() {
  this.c.global.addEventListener("message", function(a) {
    if(a.data && a.data.i) {
      var b = this.j[a.data.i];
      b ? b.h(a.data.g) : a.data && "control" == a.data.i && this.emit("message", a)
    }
  }.bind(this), g);
  this.once("message", function(a) {
    this.id = a.data.g.id;
    if((this.a = a.data.g.a) && this.a.permissions) {
      a = this.c.q;
      for(var b = 0;b < this.a.permissions.length;b++) {
        var c = t.b.get(this.a.permissions[b]);
        c && (a[c.name] = function(a, b) {
          return new y(this.k(a), b)
        }.bind(this, c.name, c.definition))
      }
    }
    if(this.a && this.a.dependencies) {
      var d = this.c.q;
      p(this.a.dependencies, function(a, b) {
        var c = function(a) {
          var b = this.w(a);
          this.postMessage({i:"control", l:"dep", I:a});
          return b
        }.bind(this, b);
        d[b] ? c() : d[b] = c
      }.bind(this))
    }
    if(this.a && this.a.provides) {
      a = this.c.q;
      for(b = 0;b < this.a.provides.length;b++) {
        (c = t.b.get(this.a.provides[b])) && (a[c.name] = function(a) {
          return new y(this.k(), a, g)
        }.bind(this, c.definition))
      }
    }
    this.postMessage({i:"control", l:"ready"});
    importScripts(this.id.substr(0, this.id.lastIndexOf("/")) + "/" + this.a.app.script)
  }.bind(this));
  this.postMessage({i:"control", l:"create"})
};
z.prototype.postMessage = function(a) {
  this.c.global.postMessage(a)
};
z.prototype.debug = function(a) {
  this.postMessage({i:"control", l:"debug", g:a.toString()})
};
t = t || {};
t.r = function(a, b) {
  this.m = a;
  this.L = b;
  r(this)
};
t.r.prototype.h = function(a) {
  this.emit("message", a.type ? a : a.data)
};
t.r.prototype.postMessage = function(a) {
  this.m.postMessage({i:this.L, g:a})
};
t.r.prototype.w = function() {
  var a = this, b = {};
  r(b);
  b.on("message", function(b) {
    a.emit("message", b)
  });
  return b
};
t = t || {};
function y(a, b, c) {
  return b ? c ? new x(a, b) : new A(a, b) : new C(a)
}
function C(a) {
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
}
function D(a) {
  function b(a) {
    c = a;
    d = g;
    h = f || 0;
    f = 0;
    m = j.length;
    for(e = g;j && h < m;h++) {
      j[h].apply(a[0], a[1])
    }
    e = l;
    j && (n && n.length ? b(n.shift()) : n || (j = []))
  }
  var c, d, e, f, m, h, n = a && [], j = [], B = {add:function() {
    if(j) {
      var a = j.length;
      (function J(a) {
        for(var b = 0;b < a.length;b++) {
          "function" === typeof a[b] ? B.M(a[b]) || j.push(a[b]) : a[b] && (a[b].length && "string" !== typeof a[b]) && J(a[b])
        }
      })(arguments);
      e ? m = j.length : c && (f = a, b(c))
    }
    return this
  }, remove:function() {
    if(j) {
      for(var a = 0;a < arguments.length;a++) {
        for(var b;-1 < (b = j.indexOf(arguments[a], b));) {
          j.splice(b, 1), e && (b <= m && m--, b <= h && h--)
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
    j = n = c = void 0;
    return this
  }, disabled:function() {
    return!j
  }, N:function() {
    n = void 0;
    return this
  }, S:function() {
    return!n
  }, C:function(a, c) {
    c = c || [];
    c = [a, c.slice ? c.slice() : c];
    if(j && (!d || n)) {
      e ? n.push(c) : b(c)
    }
    return this
  }, O:function() {
    B.C(this, arguments);
    return this
  }, P:function() {
    return!!d
  }};
  return B
}
function E(a) {
  for(var b = [["resolve", "done", D(), "resolved"], ["reject", "fail", D(), "rejected"], ["notify", "progress", D(g)]], c = "pending", d = {state:function() {
    return c
  }, always:function() {
    e.J(arguments).K(arguments);
    return this
  }, then:function() {
    var a = arguments;
    return E(function(c) {
      for(var f = 0;f < b.length;f++) {
        var m = b[f][0], h = "function" === typeof a[f] ? a[f] : k;
        e[b[f][1]](function() {
          var a = h && h.apply(this, arguments);
          if(a && "function" == typeof a.promise) {
            a.promise().J(c.W).K(c.V).U(c.T)
          }else {
            c[m + "With"](this === d ? c.promise() : this, h ? [a] : arguments)
          }
        })
      }
      a = k
    }).promise()
  }, promise:function(a) {
    return a != k ? q(a, d) : d
  }}, e = {}, f = 0;f < b.length;f++) {
    var m = b[f][3], h = b[f][2];
    d[b[f][1]] = h.add;
    m && h.add(function() {
      c = m
    }, b[f ^ 1][2].disable, b[2][2].N);
    var n = b[f][0];
    e[n] = function(a) {
      e[a + "With"](this === e ? d : this, Array.prototype.slice.call(arguments, 1));
      return this
    }.bind(this, n);
    e[n + "With"] = h.C
  }
  d.promise(e);
  a && a.call(e, e);
  return e
}
function x(a, b) {
  var c = k, d = g, e = {};
  p(b, function(a, b) {
    "event" == a.type && (e[b] = a)
  });
  e !== {} && (this.emit = function(b, c) {
    e[b] && a.postMessage({action:"event", type:b, value:F(e[b].value, c)})
  });
  this.provideSynchronous = function(a) {
    c = new a
  };
  this.provideAsynchronous = function(a) {
    c = new a;
    d = l
  };
  a.on("message", function(b) {
    if(b && "method" == b.action) {
      if(d) {
        var e = c[b.type].apply(c, b.value);
        a.postMessage({action:"method", id:b.id, type:b.type, value:e})
      }else {
        e = b.value, Array.isArray(e) || (e = [e]), c[b.type].apply(c, e.concat(function(c) {
          a.postMessage({action:"method", type:b.type, id:b.id, value:c})
        }))
      }
    }
  })
}
function A(a, b) {
  var c = {}, d = k, e = k, f = Math.random();
  p(b, function(b, h) {
    switch(b.type) {
      case "method":
        this[h] = function() {
          a.postMessage({action:"method", type:h, id:f, value:F(b.value, arguments)});
          var d = E();
          c[f] = d;
          f++;
          return d.promise()
        };
        break;
      case "event":
        d || (r(this), e = this.emit, delete this.emit, d = {}), d[h] = b
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
        if("event" == a.action && (b = d[a.type])) {
          b = F(b.value, a.value), e(a.type, b)
        }
      }
    }
  })
}
function F(a, b) {
  switch(a) {
    case "string":
      return"" + b;
    case "number":
      return 0 + b;
    case "bool":
      return 0 | b;
    case "object":
      return JSON.parse(JSON.stringify(b));
    case "blob":
      return b instanceof Blob ? b : new Blob([]);
    case "buffer":
      return b instanceof ArrayBuffer ? b : new ArrayBuffer(0)
  }
  if(Array.isArray(a)) {
    var c = [];
    if(2 == a.length && "array" == a[0]) {
      for(var d = 0;d < b.length;d++) {
        c.push(F(a[1], b[d]))
      }
    }else {
      for(d = 0;d < a.length;d++) {
        b[d] ? c.push(F(a[d], b[d])) : c.push(void 0)
      }
    }
    return c
  }
  if("object" === typeof a) {
    return c = {}, p(a, function(a, d) {
      b[d] && (c[d] = F(a, b[d]))
    }), c
  }
}
function G(a) {
  this.d = a;
  r(this)
}
G.prototype.get = function(a, b) {
  try {
    b(localStorage[this.d.m.id + a])
  }catch(c) {
    b(k)
  }
};
G.prototype.set = function(a, b, c) {
  localStorage[this.d.m.id + a] = b;
  c()
};
t.b.t("core.storage", G);
function H(a) {
  this.D = 10;
  this.d = a;
  this.o = {};
  this.n = {};
  this.X = {};
  r(this)
}
H.prototype.z = function(a) {
  this.d.postMessage({action:"event", type:"onStateChange", value:{id:a, state:this.n[a].readyState}})
};
H.prototype.h = function(a, b) {
  var c = new Blob([b.data]);
  console.log("message " + a + " had length " + b.data.length + " and turned into blob length " + c.size);
  this.d.postMessage({action:"event", type:"onMessage", value:{header:a, data:c}})
};
H.prototype.F = function(a, b) {
  b && b.H && this.d.postMessage({action:"event", type:"onSignal", value:{id:a, message:JSON.stringify(b)}})
};
H.prototype.create = function(a) {
  var b = this.D++, c, d = new webkitRTCPeerConnection(k, {optional:[{RtpDataChannels:g}]});
  this.o[b] = d;
  try {
    c = d.createDataChannel("sendDataChannel", {reliable:l}), this.n[b] = c, c.onopen = this.z.bind(this, b), c.onclose = this.z.bind(this, b), c.onmessage = this.h.bind(this, b), d.onicecandidate = this.F.bind(this, b), d.createOffer(function(c) {
      d.setLocalDescription(c);
      a({id:b, offer:JSON.stringify(c)})
    })
  }catch(e) {
    console.warn(e.message), console.warn("Failed to create data channel. You need Chrome M25or later with --enable-data-channels flag"), delete this.o[b]
  }
};
H.prototype.accept = function(a, b, c) {
  b = JSON.parse(b);
  if("icecandidate" == b.type) {
    b = new RTCIceCandidate(b.H), this.o[a] && "closed" !== this.n[a].readyState && (this.o[a].addIceCandidate(b), console.log("Successfully accepted ICE candidate")), c()
  }else {
    if("offer" == b.type) {
      b = new RTCSessionDescription(b);
      var d = this.D++, e = new webkitRTCPeerConnection(k, {optional:[{RtpDataChannels:g}]});
      this.o[d] = e;
      e.onicecandidate = this.F.bind(this, d);
      e.ondatachannel = function(a) {
        a = a.channel;
        this.n[d] = a;
        a.onopen = this.z.bind(this, d);
        a.onclose = this.z.bind(this, d);
        a.onmessage = this.h.bind(this, d)
      }.bind(this);
      e.setRemoteDescription(b, function() {
        console.log("Successfully set remote description")
      }, function() {
        console.log("Failed set remote description")
      });
      e.createAnswer(function(a) {
        e.setLocalDescription(a);
        c({id:d, offer:JSON.stringify(a)})
      })
    }else {
      "answer" == b.type ? (b = new RTCSessionDescription(b), console.log("connection status is " + this.n[a].readyState), this.o[a].setRemoteDescription(b, function() {
        console.log("Successfully set remote description")
      }, function(a) {
        console.warn(a)
      }), c()) : "bye" == b.type && (this.close(a), c())
    }
  }
};
H.prototype.send = function(a, b) {
  var c = a.data, d = new FileReader;
  d.onload = function(c, d) {
    console.log("Will Send " + a.data.size + " which converted to " + d.target.result.length);
    this.n[c.Q].send(d.target.result);
    b()
  }.bind(this, a);
  d.onerror = function() {
    console.log("Binary translation error!");
    b()
  };
  d.readAsBinaryString(c)
};
H.prototype.close = function(a, b) {
  this.n[a].close();
  this.o[a].close();
  b()
};
t.b.t("core.transport", H);
function I(a) {
  this.u = this.host = k;
  this.d = a;
  r(this)
}
I.prototype.open = function(a, b) {
  this.host = document.createElement("div");
  document.body.appendChild(this.host);
  var c = this.host;
  this.host.webkitCreateShadowRoot && (c = this.host.webkitCreateShadowRoot());
  var d = document.createElement("iframe");
  d.setAttribute("sandbox", "allow-scripts allow-forms");
  a.file ? d.src = a.file : a.code && (d.src = "data:text/html;charset=utf-8," + a.code);
  d.style.width = "0";
  d.style.height = "0";
  c.appendChild(d);
  this.u = d;
  addEventListener("message", this.h.bind(this), g);
  b({})
};
I.prototype.postMessage = function(a) {
  this.u.contentWindow.postMessage(a, "*")
};
I.prototype.close = function() {
  this.host && (this.host.parentNode.removeChild(this.host), this.host = k);
  this.u && (removeEventListener("message", this.h.bind(this), g), this.u = k)
};
I.prototype.h = function(a) {
  a.source == this.u.contentWindow && this.d.postMessage({action:"event", type:"message", value:a.data})
};
t.b.t("core.view", I);
setup = function() {
  var a, b = {global:global, src:"(" + freedom_src + ")(this);"};
  if("undefined" === typeof window) {
    a = new z
  }else {
    if(a = new u, "undefined" !== typeof document) {
      var c = document.getElementsByTagName("script");
      if(c) {
        var d;
        for(d = c.length - 1;-1 < d;d -= 1) {
          var e;
          if(e = c[d]) {
            var f = c[d];
            e = f.getAttribute("data-manifest");
            f = f.src;
            e ? (b.source = f, b.a = e, e = g) : e = void 0
          }
          if(e) {
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
t.b.set("core.view", {open:{type:"method", value:[{file:"string", code:"string"}]}, show:{type:"method", value:[]}, close:{type:"method", value:[]}, postMessage:{type:"method", value:["object"]}, message:{type:"event", value:"object"}, onClose:{type:"event", value:[]}});
t.b.set("core.storage", {set:{type:"method", value:["string", "string"]}, get:{type:"method", value:["string"]}, change:{type:"event", value:["string"]}});
t.b.set("identity", {name:{type:"property", value:"string"}, get:{type:"method", value:[]}, send:{type:"method", value:["string", "string"]}, buddylist:{type:"event", value:["array", "string"]}, message:{type:"event", value:"object"}});
t.b.set("storage", {clear:{type:"method", value:[]}, set:{type:"method", value:["string", "string"]}, remove:{type:"method", value:["string"]}, get:{type:"method", value:["string"]}});
t.b.set("core.transport", {create:{type:"method", value:[]}, accept:{type:"method", value:["number", "object"]}, send:{type:"method", value:[{header:"object", data:"blob"}]}, close:{type:"method", value:["number"]}, onStateChange:{type:"event", value:"object"}, onMessage:{type:"event", value:{header:"object", data:"blob"}}, onSignal:{type:"event", value:"object"}});

  // Create default context.
  global['freedom'] = setup();
})(this);

