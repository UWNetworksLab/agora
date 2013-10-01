var g = !0, m = null, n = !1;
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
      for(var l = b[a].slice(0), f = 0;f < l.length && l[f](e) !== n;f++) {
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
function u() {
  this.b = {};
  this.e = {};
  this.w = {};
  r(this)
}
var v;
function w() {
  v || (v = new u);
  return window.W = v
}
u.prototype.h = function(a, b) {
  if(this.e[a.id]) {
    var c = this.w[a.id], d = b.i;
    if("control" == d) {
      if(this.b.debug && "debug" != b.n ? console.log(a.id + " -C " + b.n) : this.b.debug && console.log(a.id + " -D " + b.g), "dep" == b.n) {
        if(c = b.L, a.a.dependencies.hasOwnProperty(c)) {
          var e = s(a.a.dependencies[c]);
          this.e[e] || (d = new x, d.v(this.b), d.v({a:e}), this.e[e] = d);
          this.w[a.id][c] = this.e[e].l("default");
          this.w[e] = {"default":a.l(c)}
        }else {
          console.warn("Dependency requested that was undeclared in app manifest")
        }
      }else {
        if("create" == b.n) {
          if(a.postMessage({i:"control", g:{id:a.id, a:a.a, b:{debug:this.b.debug}}}), c = a.id, this.e[c]) {
            if(this.e[c].a.permissions) {
              for(e = 0;e < this.e[c].a.permissions.length;e++) {
                if(d = this.e[c].a.permissions[e], 0 === d.indexOf("core.")) {
                  var f = this.w[c], l = d, h = this.e[c].l(d);
                  f[l] = new y(d, h)
                }
              }
            }
          }else {
            console.warn("Registration requested for unknown App " + c)
          }
        }else {
          "ready" == b.n && (a.state = g, a.emit("ready"))
        }
      }
    }else {
      if(c[d]) {
        this.b.debug && console.log(a.id + " -> " + d + " " + b.g.action + " " + b.g.type), c[d] == a.l(d) ? c[d].h(b.g) : c[d].postMessage(b.g)
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
u.prototype.t = function(a) {
  this.e[a.id] || (this.e[a.id] = a, this.w[a.id] = {"default":a.j["default"]});
  this.emit("register", a)
};
t = t || {};
function z() {
  this.c = {};
  this.J = {}
}
z.prototype.get = function(a) {
  return!this.c[a] ? n : {name:a, definition:this.c[a]}
};
z.prototype.set = function(a, b) {
  this.c[a] = b
};
z.prototype.t = function(a, b) {
  this.J[a] = b
};
function y(a, b) {
  this.C = m;
  this.name = a;
  this.d = b
}
y.prototype.postMessage = function(a) {
  if(!this.C) {
    var b = t.c.get(this.name);
    this.C = new A(this.d, b.definition);
    this.C.provideAsynchronous(t.c.J[this.name].bind({}, this.d))
  }
  this.d.emit("message", a)
};
t.c = new z;
t = t || {};
t.o = t.o || {};
function x() {
  this.id;
  this.b = {a:"manifest.json", source:"freedom.js"};
  this.j = {};
  this.a = {};
  this.r = m;
  this.state = n;
  r(this)
}
x.prototype.v = function(a) {
  q(w().b, a);
  q(this.b, a, g)
};
x.prototype.A = function(a) {
  a = this.l(a);
  a = new B(a);
  this.b.s || (this.b.s = a);
  return a
};
x.prototype.l = function(a) {
  if(!this.a || !this.id) {
    var b = this.id = s(this.b.a), c = new XMLHttpRequest;
    c.addEventListener("readystatechange", function() {
      if(4 == c.readyState && c.responseText) {
        var a = {};
        try {
          a = JSON.parse(c.responseText)
        }catch(b) {
          return errback(b)
        }
        a && a.app && a.app.script ? (this.a = a, w().t(this), this.emit("manifest"), this.start()) : console.warn(a.name + " does not specify a valid application.")
      }else {
        4 == c.readyState && console.warn(c.status)
      }
    }.bind(this), n);
    c.open("GET", b, g);
    c.send()
  }
  a || (a = "default");
  this.j[a] || (this.j[a] = new t.u(this, a));
  return this.j[a]
};
x.prototype.start = function() {
  this.r && (this.r.terminate(), this.r = m, this.state = n);
  this.r = new Worker(URL.createObjectURL(new Blob([this.b.src], {type:"text/javascript"})));
  this.r.addEventListener("message", function(a) {
    w().h(this, a.data)
  }.bind(this), g)
};
x.prototype.postMessage = function(a) {
  if(this.state || this.r && "control" == a.i) {
    this.r.postMessage(a)
  }else {
    this.once("ready", function(a) {
      this.postMessage(a)
    }.bind(this, a))
  }
};
t = t || {};
t.o = t.o || {};
function C() {
  this.id;
  this.b = {};
  this.j = {};
  this.a = {};
  r(this)
}
C.prototype.v = function(a) {
  q(this.b, a, g)
};
C.prototype.l = function(a) {
  (!this.a || !this.id) && this.start();
  a || (a = "default");
  this.j[a] || (this.j[a] = new t.u(this, a));
  return this.j[a]
};
C.prototype.A = function(a) {
  a = new B(this.l(a));
  this.b.s || (this.b.s = a);
  return a
};
C.prototype.start = function() {
  this.b.global.addEventListener("message", function(a) {
    if(a.data && a.data.i) {
      var b = this.j[a.data.i];
      b ? b.h(a.data.g) : a.data && "control" == a.data.i && this.emit("message", a)
    }
  }.bind(this), g);
  this.once("message", function(a) {
    this.id = a.data.g.id;
    this.a = a.data.g.a;
    this.v(a.data.g.b);
    if(this.a && this.a.permissions) {
      a = this.b.s;
      for(var b = 0;b < this.a.permissions.length;b++) {
        var c = t.c.get(this.a.permissions[b]);
        c && (a[c.name] = function(a, b) {
          return new B(this.l(a), b)
        }.bind(this, c.name, c.definition))
      }
    }
    if(this.a && this.a.dependencies) {
      var d = this.b.s;
      p(this.a.dependencies, function(a, b) {
        var c = function(a) {
          var b = this.A(a);
          this.postMessage({i:"control", n:"dep", L:a});
          return b
        }.bind(this, b);
        d[b] ? c() : d[b] = c
      }.bind(this))
    }
    if(this.a && this.a.provides) {
      a = this.b.s;
      for(b = 0;b < this.a.provides.length;b++) {
        (c = t.c.get(this.a.provides[b])) && (a[c.name] = function(a) {
          return new B(this.l(), a, g)
        }.bind(this, c.definition))
      }
    }
    this.postMessage({i:"control", n:"ready"});
    importScripts(this.id.substr(0, this.id.lastIndexOf("/")) + "/" + this.a.app.script)
  }.bind(this));
  this.postMessage({i:"control", n:"create"})
};
C.prototype.postMessage = function(a) {
  this.b.global.postMessage(a)
};
C.prototype.debug = function(a) {
  this.b.debug && this.postMessage({i:"control", n:"debug", g:a.toString()})
};
t = t || {};
t.u = function(a, b) {
  this.o = a;
  this.O = b;
  r(this)
};
t.u.prototype.h = function(a) {
  this.emit("message", a.type ? a : a.data)
};
t.u.prototype.postMessage = function(a) {
  this.o.postMessage({i:this.O, g:a})
};
t.u.prototype.A = function() {
  var a = this, b = {};
  r(b);
  b.on("message", function(b) {
    a.emit("message", b)
  });
  return b
};
t = t || {};
function B(a, b, c) {
  return b ? c ? new A(a, b) : new D(a, b) : new E(a)
}
function E(a) {
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
    a && ("event" == a.action ? b(a.type, a.data) : "set" == a.action && (c[a.key] = a.value))
  })
}
function G(a) {
  function b(a) {
    c = a;
    d = g;
    h = f || 0;
    f = 0;
    l = k.length;
    for(e = g;k && h < l;h++) {
      k[h].apply(a[0], a[1])
    }
    e = n;
    k && (j && j.length ? b(j.shift()) : j || (k = []))
  }
  var c, d, e, f, l, h, j = a && [], k = [], F = {add:function() {
    if(k) {
      var a = k.length;
      (function N(a) {
        for(var b = 0;b < a.length;b++) {
          "function" === typeof a[b] ? F.P(a[b]) || k.push(a[b]) : a[b] && (a[b].length && "string" !== typeof a[b]) && N(a[b])
        }
      })(arguments);
      e ? l = k.length : c && (f = a, b(c))
    }
    return this
  }, remove:function() {
    if(k) {
      for(var a = 0;a < arguments.length;a++) {
        for(var b;-1 < (b = k.indexOf(arguments[a], b));) {
          k.splice(b, 1), e && (b <= l && l--, b <= h && h--)
        }
      }
    }
    return this
  }, P:function(a) {
    return a ? -1 < k.indexOf(a) : !(!k || !k.length)
  }, empty:function() {
    k = [];
    return this
  }, disable:function() {
    k = j = c = void 0;
    return this
  }, disabled:function() {
    return!k
  }, Q:function() {
    j = void 0;
    return this
  }, X:function() {
    return!j
  }, F:function(a, c) {
    c = c || [];
    c = [a, c.slice ? c.slice() : c];
    if(k && (!d || j)) {
      e ? j.push(c) : b(c)
    }
    return this
  }, T:function() {
    F.F(this, arguments);
    return this
  }, U:function() {
    return!!d
  }};
  return F
}
function H(a) {
  for(var b = [["resolve", "done", G(), "resolved"], ["reject", "fail", G(), "rejected"], ["notify", "progress", G(g)]], c = "pending", d = {state:function() {
    return c
  }, always:function() {
    e.M(arguments).N(arguments);
    return this
  }, then:function() {
    var a = arguments;
    return H(function(c) {
      for(var f = 0;f < b.length;f++) {
        var l = b[f][0], h = "function" === typeof a[f] ? a[f] : m;
        e[b[f][1]](function() {
          var a = h && h.apply(this, arguments);
          if(a && "function" == typeof a.promise) {
            a.promise().M(c.aa).N(c.$).Z(c.Y)
          }else {
            c[l + "With"](this === d ? c.promise() : this, h ? [a] : arguments)
          }
        })
      }
      a = m
    }).promise()
  }, promise:function(a) {
    return a != m ? q(a, d) : d
  }}, e = {}, f = 0;f < b.length;f++) {
    var l = b[f][3], h = b[f][2];
    d[b[f][1]] = h.add;
    l && h.add(function() {
      c = l
    }, b[f ^ 1][2].disable, b[2][2].Q);
    var j = b[f][0];
    e[j] = function(a) {
      e[a + "With"](this === e ? d : this, Array.prototype.slice.call(arguments, 1));
      return this
    }.bind(this, j);
    e[j + "With"] = h.F
  }
  d.promise(e);
  a && a.call(e, e);
  return e
}
function A(a, b) {
  var c = m, d = {}, e = g, f = {};
  p(b, function(a, b) {
    "event" == a.type && (f[b] = a)
  });
  this.provideSynchronous = function(a) {
    c = a
  };
  this.provideAsynchronous = function(a) {
    c = a;
    e = n
  };
  a.on("message", function(b) {
    if(b) {
      if(d[b.f]) {
        if("method" == b.action) {
          var h = d[b.f];
          if(e) {
            h = h[b.type].apply(h, b.value), a.postMessage({action:"method", f:b.f, m:b.m, type:b.type, value:h})
          }else {
            var j = b.value;
            Array.isArray(j) || (j = [j]);
            h[b.type].apply(h, j.concat(function(c) {
              a.postMessage({action:"method", type:b.type, f:b.f, m:b.m, value:c})
            }))
          }
        }
      }else {
        if("construct" == b.action) {
          var j = h = b.f, k = new c;
          k.dispatchEvent = function(b, c, d) {
            f[c] && a.postMessage({action:"event", f:b, type:c, value:I(f[c].value, d)})
          }.bind({}, j);
          d[h] = k
        }
      }
    }
  })
}
function D(a, b) {
  var c = {}, d = m, e = m, f = Math.random(), l = 0;
  p(b, function(b, j) {
    switch(b.type) {
      case "method":
        this[j] = function() {
          a.postMessage({action:"method", type:j, m:l, f:f, value:I(b.value, arguments)});
          var d = H();
          c[l] = d;
          l++;
          return d.promise()
        };
        break;
      case "event":
        d || (r(this), e = this.emit, delete this.emit, d = {}), d[j] = b
    }
  }.bind(this));
  a.on("message", function(a) {
    if(a && a.f == f) {
      if("method" == a.action) {
        if(c[a.m]) {
          var b = c[a.m];
          delete c[a.m];
          b.resolve(a.value)
        }else {
          console.log("Dropped response message with id " + a.m)
        }
      }else {
        if("event" == a.action && (b = d[a.type])) {
          b = I(b.value, a.value), e(a.type, b)
        }
      }
    }
  });
  a.postMessage({action:"construct", type:"construct", f:f})
}
function I(a, b) {
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
      return b instanceof ArrayBuffer ? b : new ArrayBuffer(0);
    case "data":
      return{R:0 + b.R}
  }
  if(Array.isArray(a)) {
    var c = [];
    if(2 == a.length && "array" == a[0]) {
      for(var d = 0;d < b.length;d++) {
        c.push(I(a[1], b[d]))
      }
    }else {
      for(d = 0;d < a.length;d++) {
        b[d] ? c.push(I(a[d], b[d])) : c.push(void 0)
      }
    }
    return c
  }
  if("object" === typeof a) {
    return c = {}, p(a, function(a, d) {
      b[d] && (c[d] = I(a, b[d]))
    }), c
  }
}
function J(a) {
  this.d = a;
  this.k = this.G = m;
  r(this)
}
J.prototype.open = function(a, b, c) {
  this.k && c(n);
  this.G = w();
  this.D = function(a) {
    this.G.postMessage({action:"method", type:"send", value:a})
  };
  var d = d || webkitRTCPeerConnection || mozRTCPeerConnection;
  this.k = new d(m, {optional:[{RtpDataChannels:g}]});
  this.k.addEventListener("icecandidate", function(a) {
    a && a.candidate && this.D(JSON.stringify(a.candidate))
  }.bind(this), g);
  this.k.S(function(a) {
    this.k.ca(a);
    this.D(JSON.stringify(a))
  }.bind(this));
  c()
};
J.prototype.postMessage = function(a, b) {
  if(!this.k) {
    return b(n)
  }
  this.k.send(a.text);
  b()
};
J.prototype.close = function(a) {
  this.k && this.k.close();
  a()
};
t.c.t("core.peerconnection", J);
function K(a) {
  this.d = a;
  r(this)
}
K.prototype.get = function(a, b) {
  try {
    b(localStorage[this.d.o.id + a])
  }catch(c) {
    b(m)
  }
};
K.prototype.set = function(a, b, c) {
  localStorage[this.d.o.id + a] = b;
  c()
};
t.c.t("core.storage", K);
function L(a) {
  this.H = 10;
  this.d = a;
  this.q = {};
  this.p = {};
  this.ba = {};
  r(this)
}
L.prototype.B = function(a) {
  this.d.postMessage({action:"event", type:"onStateChange", value:{id:a, state:this.p[a].readyState}})
};
L.prototype.h = function(a, b) {
  var c = new Blob([b.data]);
  console.log("message " + a + " had length " + b.data.length + " and turned into blob length " + c.size);
  this.d.postMessage({action:"event", type:"onMessage", value:{header:a, data:c}})
};
L.prototype.I = function(a, b) {
  b && b.K && this.d.postMessage({action:"event", type:"onSignal", value:{id:a, message:JSON.stringify(b)}})
};
L.prototype.create = function(a) {
  var b = this.H++, c, d = new webkitRTCPeerConnection(m, {optional:[{RtpDataChannels:g}]});
  this.q[b] = d;
  try {
    c = d.createDataChannel("sendDataChannel", {reliable:n}), this.p[b] = c, c.onopen = this.B.bind(this, b), c.onclose = this.B.bind(this, b), c.onmessage = this.h.bind(this, b), d.onicecandidate = this.I.bind(this, b), d.createOffer(function(c) {
      d.setLocalDescription(c);
      a({id:b, offer:JSON.stringify(c)})
    })
  }catch(e) {
    console.warn(e.message), console.warn("Failed to create data channel. You need Chrome M25or later with --enable-data-channels flag"), delete this.q[b]
  }
};
L.prototype.accept = function(a, b, c) {
  b = JSON.parse(b);
  if("icecandidate" == b.type) {
    b = new RTCIceCandidate(b.K), this.q[a] && "closed" !== this.p[a].readyState && (this.q[a].addIceCandidate(b), console.log("Successfully accepted ICE candidate")), c()
  }else {
    if("offer" == b.type) {
      b = new RTCSessionDescription(b);
      var d = this.H++, e = new webkitRTCPeerConnection(m, {optional:[{RtpDataChannels:g}]});
      this.q[d] = e;
      e.onicecandidate = this.I.bind(this, d);
      e.ondatachannel = function(a) {
        a = a.channel;
        this.p[d] = a;
        a.onopen = this.B.bind(this, d);
        a.onclose = this.B.bind(this, d);
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
      "answer" == b.type ? (b = new RTCSessionDescription(b), console.log("connection status is " + this.p[a].readyState), this.q[a].setRemoteDescription(b, function() {
        console.log("Successfully set remote description")
      }, function(a) {
        console.warn(a)
      }), c()) : "bye" == b.type && (this.close(a), c())
    }
  }
};
L.prototype.send = function(a, b) {
  var c = a.data, d = new FileReader;
  d.onload = function(c, d) {
    console.log("Will Send " + a.data.size + " which converted to " + d.target.result.length);
    this.p[c.V].send(d.target.result);
    b()
  }.bind(this, a);
  d.onerror = function() {
    console.log("Binary translation error!");
    b()
  };
  d.readAsBinaryString(c)
};
L.prototype.close = function(a, b) {
  this.p[a].close();
  this.q[a].close();
  b()
};
t.c.t("core.transport", L);
function M(a) {
  this.z = this.host = m;
  this.d = a;
  r(this)
}
M.prototype.open = function(a, b) {
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
  this.z = d;
  addEventListener("message", this.h.bind(this), g);
  b({})
};
M.prototype.postMessage = function(a) {
  this.z.contentWindow.postMessage(a, "*")
};
M.prototype.close = function() {
  this.host && (this.host.parentNode.removeChild(this.host), this.host = m);
  this.z && (removeEventListener("message", this.h.bind(this), g), this.z = m)
};
M.prototype.h = function(a) {
  a.source == this.z.contentWindow && this.dispatchEvent("message", a.data)
};
t.c.t("core.view", M);
setup = function() {
  var a, b = {global:global, debug:g, src:"(" + freedom_src + ")(this);"};
  if("undefined" === typeof window) {
    a = new C
  }else {
    if(a = new x, "undefined" !== typeof document) {
      var c = document.getElementsByTagName("script");
      if(c) {
        var d;
        for(d = c.length - 1;-1 < d;d -= 1) {
          var e;
          if(e = c[d]) {
            e = c[d];
            var f = e.getAttribute("data-manifest"), l = e.src;
            if(f) {
              b.source = l;
              b.a = f;
              if(e.innerText.trim().length) {
                try {
                  q(b, JSON.parse(e.innerText), g)
                }catch(h) {
                  global.console.warn("Failed to parse configuration: " + h)
                }
              }
              e = g
            }else {
              e = void 0
            }
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
  return a.A()
};
t.c.set("core", {getReference:{type:"method", value:["String"]}});
t.c.set("core.view", {open:{type:"method", value:[{file:"string", code:"string"}]}, show:{type:"method", value:[]}, close:{type:"method", value:[]}, postMessage:{type:"method", value:["object"]}, message:{type:"event", value:"object"}, onClose:{type:"event", value:[]}});
t.c.set("core.storage", {set:{type:"method", value:["string", "string"]}, get:{type:"method", value:["string"]}, change:{type:"event", value:["string"]}});
t.c.set("core.peerconnection", {open:{type:"method", value:["proxy", "string"]}, postMessage:{type:"method", value:[{text:"string", binary:"blob"}]}, message:{type:"event", value:{text:"object", binary:"blob"}}, close:{type:"method", value:[]}, onClose:{type:"event", value:[]}});
t.c.set("identity", {name:{type:"property", value:"string"}, get:{type:"method", value:[]}, send:{type:"method", value:["string", "string"]}, buddylist:{type:"event", value:["array", "string"]}, message:{type:"event", value:"object"}});
t.c.set("storage", {clear:{type:"method", value:[]}, set:{type:"method", value:["string", "string"]}, remove:{type:"method", value:["string"]}, get:{type:"method", value:["string"]}});
t.c.set("core.transport", {create:{type:"method", value:[]}, accept:{type:"method", value:["number", "object"]}, send:{type:"method", value:[{header:"object", data:"blob"}]}, close:{type:"method", value:["number"]}, onStateChange:{type:"event", value:"object"}, onMessage:{type:"event", value:{header:"object", data:"blob"}}, onSignal:{type:"event", value:"object"}});
t.c.set("transport", {open:{type:"method", value:["proxy", "string"]}, send:{type:"method", value:["data"]}, message:{type:"event", value:["data"]}, close:{type:"method", value:[]}, onClose:{type:"event", value:[]}});
