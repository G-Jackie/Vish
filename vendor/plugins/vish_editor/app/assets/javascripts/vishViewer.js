(function(a, b) {
  function cy(a) {
    return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
  }
  function cu(a) {
    if(!cj[a]) {
      var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
      d.remove();
      if(e === "none" || e === "") {
        ck || (ck = c.createElement("iframe"), ck.frameBorder = ck.width = ck.height = 0), b.appendChild(ck);
        if(!cl || !ck.createElement) {
          cl = (ck.contentWindow || ck.contentDocument).document, cl.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), cl.close()
        }
        d = cl.createElement(a), cl.body.appendChild(d), e = f.css(d, "display"), b.removeChild(ck)
      }
      cj[a] = e
    }
    return cj[a]
  }
  function ct(a, b) {
    var c = {};
    f.each(cp.concat.apply([], cp.slice(0, b)), function() {
      c[this] = a
    });
    return c
  }
  function cs() {
    cq = b
  }
  function cr() {
    setTimeout(cs, 0);
    return cq = f.now()
  }
  function ci() {
    try {
      return new a.ActiveXObject("Microsoft.XMLHTTP")
    }catch(b) {
    }
  }
  function ch() {
    try {
      return new a.XMLHttpRequest
    }catch(b) {
    }
  }
  function cb(a, c) {
    a.dataFilter && (c = a.dataFilter(c, a.dataType));
    var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
    for(g = 1;g < i;g++) {
      if(g === 1) {
        for(h in a.converters) {
          typeof h == "string" && (e[h.toLowerCase()] = a.converters[h])
        }
      }
      l = k, k = d[g];
      if(k === "*") {
        k = l
      }else {
        if(l !== "*" && l !== k) {
          m = l + " " + k, n = e[m] || e["* " + k];
          if(!n) {
            p = b;
            for(o in e) {
              j = o.split(" ");
              if(j[0] === l || j[0] === "*") {
                p = e[j[1] + " " + k];
                if(p) {
                  o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                  break
                }
              }
            }
          }
          !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
        }
      }
    }
    return c
  }
  function ca(a, c, d) {
    var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
    for(i in g) {
      i in d && (c[g[i]] = d[i])
    }
    while(f[0] === "*") {
      f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"))
    }
    if(h) {
      for(i in e) {
        if(e[i] && e[i].test(h)) {
          f.unshift(i);
          break
        }
      }
    }
    if(f[0] in d) {
      j = f[0]
    }else {
      for(i in d) {
        if(!f[0] || a.converters[i + " " + f[0]]) {
          j = i;
          break
        }
        k || (k = i)
      }
      j = j || k
    }
    if(j) {
      j !== f[0] && f.unshift(j);
      return d[j]
    }
  }
  function b_(a, b, c, d) {
    if(f.isArray(b)) {
      f.each(b, function(b, e) {
        c || bD.test(a) ? d(a, e) : b_(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
      })
    }else {
      if(!c && f.type(b) === "object") {
        for(var e in b) {
          b_(a + "[" + e + "]", b[e], c, d)
        }
      }else {
        d(a, b)
      }
    }
  }
  function b$(a, c) {
    var d, e, g = f.ajaxSettings.flatOptions || {};
    for(d in c) {
      c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d])
    }
    e && f.extend(!0, a, e)
  }
  function bZ(a, c, d, e, f, g) {
    f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
    var h = a[f], i = 0, j = h ? h.length : 0, k = a === bS, l;
    for(;i < j && (k || !l);i++) {
      l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bZ(a, c, d, e, l, g)))
    }
    (k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g));
    return l
  }
  function bY(a) {
    return function(b, c) {
      typeof b != "string" && (c = b, b = "*");
      if(f.isFunction(c)) {
        var d = b.toLowerCase().split(bO), e = 0, g = d.length, h, i, j;
        for(;e < g;e++) {
          h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
        }
      }
    }
  }
  function bB(a, b, c) {
    var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? 1 : 0, g = 4;
    if(d > 0) {
      if(c !== "border") {
        for(;e < g;e += 2) {
          c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0
        }
      }
      return d + "px"
    }
    d = by(a, b);
    if(d < 0 || d == null) {
      d = a.style[b]
    }
    if(bt.test(d)) {
      return d
    }
    d = parseFloat(d) || 0;
    if(c) {
      for(;e < g;e += 2) {
        d += parseFloat(f.css(a, "padding" + bx[e])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + bx[e])) || 0)
      }
    }
    return d + "px"
  }
  function bo(a) {
    var b = c.createElement("div");
    bh.appendChild(b), b.innerHTML = a.outerHTML;
    return b.firstChild
  }
  function bn(a) {
    var b = (a.nodeName || "").toLowerCase();
    b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
  }
  function bm(a) {
    if(a.type === "checkbox" || a.type === "radio") {
      a.defaultChecked = a.checked
    }
  }
  function bl(a) {
    return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
  }
  function bk(a, b) {
    var c;
    b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && 
    (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"))
  }
  function bj(a, b) {
    if(b.nodeType === 1 && !!f.hasData(a)) {
      var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
      if(i) {
        delete h.handle, h.events = {};
        for(c in i) {
          for(d = 0, e = i[c].length;d < e;d++) {
            f.event.add(b, c, i[c][d])
          }
        }
      }
      h.data && (h.data = f.extend({}, h.data))
    }
  }
  function bi(a, b) {
    return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
  }
  function U(a) {
    var b = V.split("|"), c = a.createDocumentFragment();
    if(c.createElement) {
      while(b.length) {
        c.createElement(b.pop())
      }
    }
    return c
  }
  function T(a, b, c) {
    b = b || 0;
    if(f.isFunction(b)) {
      return f.grep(a, function(a, d) {
        var e = !!b.call(a, d, a);
        return e === c
      })
    }
    if(b.nodeType) {
      return f.grep(a, function(a, d) {
        return a === b === c
      })
    }
    if(typeof b == "string") {
      var d = f.grep(a, function(a) {
        return a.nodeType === 1
      });
      if(O.test(b)) {
        return f.filter(b, d, !c)
      }
      b = f.filter(b, d)
    }
    return f.grep(a, function(a, d) {
      return f.inArray(a, b) >= 0 === c
    })
  }
  function S(a) {
    return!a || !a.parentNode || a.parentNode.nodeType === 11
  }
  function K() {
    return!0
  }
  function J() {
    return!1
  }
  function n(a, b, c) {
    var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
    h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function() {
      !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
    }, 0)
  }
  function m(a) {
    for(var b in a) {
      if(b === "data" && f.isEmptyObject(a[b])) {
        continue
      }
      if(b !== "toJSON") {
        return!1
      }
    }
    return!0
  }
  function l(a, c, d) {
    if(d === b && a.nodeType === 1) {
      var e = "data-" + c.replace(k, "-$1").toLowerCase();
      d = a.getAttribute(e);
      if(typeof d == "string") {
        try {
          d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? +d : j.test(d) ? f.parseJSON(d) : d
        }catch(g) {
        }
        f.data(a, c, d)
      }else {
        d = b
      }
    }
    return d
  }
  function h(a) {
    var b = g[a] = {}, c, d;
    a = a.split(/\s+/);
    for(c = 0, d = a.length;c < d;c++) {
      b[a[c]] = !0
    }
    return b
  }
  var c = a.document, d = a.navigator, e = a.location, f = function() {
    function J() {
      if(!e.isReady) {
        try {
          c.documentElement.doScroll("left")
        }catch(a) {
          setTimeout(J, 1);
          return
        }
        e.ready()
      }
    }
    var e = function(a, b) {
      return new e.fn.init(a, b, h)
    }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function(a, b) {
      return(b + "").toUpperCase()
    }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty, E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf, I = {};
    e.fn = e.prototype = {constructor:e, init:function(a, d, f) {
      var g, h, j, k;
      if(!a) {
        return this
      }
      if(a.nodeType) {
        this.context = this[0] = a, this.length = 1;
        return this
      }
      if(a === "body" && !d && c.body) {
        this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
        return this
      }
      if(typeof a == "string") {
        a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
        if(g && (g[1] || !d)) {
          if(g[1]) {
            d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
            return e.merge(this, a)
          }
          h = c.getElementById(g[2]);
          if(h && h.parentNode) {
            if(h.id !== g[2]) {
              return f.find(a)
            }
            this.length = 1, this[0] = h
          }
          this.context = c, this.selector = a;
          return this
        }
        return!d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
      }
      if(e.isFunction(a)) {
        return f.ready(a)
      }
      a.selector !== b && (this.selector = a.selector, this.context = a.context);
      return e.makeArray(a, this)
    }, selector:"", jquery:"1.7.2", length:0, size:function() {
      return this.length
    }, toArray:function() {
      return F.call(this, 0)
    }, get:function(a) {
      return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
    }, pushStack:function(a, b, c) {
      var d = this.constructor();
      e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
      return d
    }, each:function(a, b) {
      return e.each(this, a, b)
    }, ready:function(a) {
      e.bindReady(), A.add(a);
      return this
    }, eq:function(a) {
      a = +a;
      return a === -1 ? this.slice(a) : this.slice(a, a + 1)
    }, first:function() {
      return this.eq(0)
    }, last:function() {
      return this.eq(-1)
    }, slice:function() {
      return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
    }, map:function(a) {
      return this.pushStack(e.map(this, function(b, c) {
        return a.call(b, c, b)
      }))
    }, end:function() {
      return this.prevObject || this.constructor(null)
    }, push:E, sort:[].sort, splice:[].splice}, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function() {
      var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
      typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
      for(;j < k;j++) {
        if((a = arguments[j]) != null) {
          for(c in a) {
            d = i[c], f = a[c];
            if(i === f) {
              continue
            }
            l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
          }
        }
      }
      return i
    }, e.extend({noConflict:function(b) {
      a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
      return e
    }, isReady:!1, readyWait:1, holdReady:function(a) {
      a ? e.readyWait++ : e.ready(!0)
    }, ready:function(a) {
      if(a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
        if(!c.body) {
          return setTimeout(e.ready, 1)
        }
        e.isReady = !0;
        if(a !== !0 && --e.readyWait > 0) {
          return
        }
        A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
      }
    }, bindReady:function() {
      if(!A) {
        A = e.Callbacks("once memory");
        if(c.readyState === "complete") {
          return setTimeout(e.ready, 1)
        }
        if(c.addEventListener) {
          c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1)
        }else {
          if(c.attachEvent) {
            c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
            var b = !1;
            try {
              b = a.frameElement == null
            }catch(d) {
            }
            c.documentElement.doScroll && b && J()
          }
        }
      }
    }, isFunction:function(a) {
      return e.type(a) === "function"
    }, isArray:Array.isArray || function(a) {
      return e.type(a) === "array"
    }, isWindow:function(a) {
      return a != null && a == a.window
    }, isNumeric:function(a) {
      return!isNaN(parseFloat(a)) && isFinite(a)
    }, type:function(a) {
      return a == null ? String(a) : I[C.call(a)] || "object"
    }, isPlainObject:function(a) {
      if(!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) {
        return!1
      }
      try {
        if(a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) {
          return!1
        }
      }catch(c) {
        return!1
      }
      var d;
      for(d in a) {
      }
      return d === b || D.call(a, d)
    }, isEmptyObject:function(a) {
      for(var b in a) {
        return!1
      }
      return!0
    }, error:function(a) {
      throw new Error(a);
    }, parseJSON:function(b) {
      if(typeof b != "string" || !b) {
        return null
      }
      b = e.trim(b);
      if(a.JSON && a.JSON.parse) {
        return a.JSON.parse(b)
      }
      if(n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) {
        return(new Function("return " + b))()
      }
      e.error("Invalid JSON: " + b)
    }, parseXML:function(c) {
      if(typeof c != "string" || !c) {
        return null
      }
      var d, f;
      try {
        a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
      }catch(g) {
        d = b
      }
      (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
      return d
    }, noop:function() {
    }, globalEval:function(b) {
      b && j.test(b) && (a.execScript || function(b) {
        a.eval.call(a, b)
      })(b)
    }, camelCase:function(a) {
      return a.replace(w, "ms-").replace(v, x)
    }, nodeName:function(a, b) {
      return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
    }, each:function(a, c, d) {
      var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
      if(d) {
        if(i) {
          for(f in a) {
            if(c.apply(a[f], d) === !1) {
              break
            }
          }
        }else {
          for(;g < h;) {
            if(c.apply(a[g++], d) === !1) {
              break
            }
          }
        }
      }else {
        if(i) {
          for(f in a) {
            if(c.call(a[f], f, a[f]) === !1) {
              break
            }
          }
        }else {
          for(;g < h;) {
            if(c.call(a[g], g, a[g++]) === !1) {
              break
            }
          }
        }
      }
      return a
    }, trim:G ? function(a) {
      return a == null ? "" : G.call(a)
    } : function(a) {
      return a == null ? "" : (a + "").replace(k, "").replace(l, "")
    }, makeArray:function(a, b) {
      var c = b || [];
      if(a != null) {
        var d = e.type(a);
        a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
      }
      return c
    }, inArray:function(a, b, c) {
      var d;
      if(b) {
        if(H) {
          return H.call(b, a, c)
        }
        d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
        for(;c < d;c++) {
          if(c in b && b[c] === a) {
            return c
          }
        }
      }
      return-1
    }, merge:function(a, c) {
      var d = a.length, e = 0;
      if(typeof c.length == "number") {
        for(var f = c.length;e < f;e++) {
          a[d++] = c[e]
        }
      }else {
        while(c[e] !== b) {
          a[d++] = c[e++]
        }
      }
      a.length = d;
      return a
    }, grep:function(a, b, c) {
      var d = [], e;
      c = !!c;
      for(var f = 0, g = a.length;f < g;f++) {
        e = !!b(a[f], f), c !== e && d.push(a[f])
      }
      return d
    }, map:function(a, c, d) {
      var f, g, h = [], i = 0, j = a.length, k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
      if(k) {
        for(;i < j;i++) {
          f = c(a[i], i, d), f != null && (h[h.length] = f)
        }
      }else {
        for(g in a) {
          f = c(a[g], g, d), f != null && (h[h.length] = f)
        }
      }
      return h.concat.apply([], h)
    }, guid:1, proxy:function(a, c) {
      if(typeof c == "string") {
        var d = a[c];
        c = a, a = d
      }
      if(!e.isFunction(a)) {
        return b
      }
      var f = F.call(arguments, 2), g = function() {
        return a.apply(c, f.concat(F.call(arguments)))
      };
      g.guid = a.guid = a.guid || g.guid || e.guid++;
      return g
    }, access:function(a, c, d, f, g, h, i) {
      var j, k = d == null, l = 0, m = a.length;
      if(d && typeof d == "object") {
        for(l in d) {
          e.access(a, c, l, d[l], 1, h, f)
        }
        g = 1
      }else {
        if(f !== b) {
          j = i === b && e.isFunction(f), k && (j ? (j = c, c = function(a, b, c) {
            return j.call(e(a), c)
          }) : (c.call(a, f), c = null));
          if(c) {
            for(;l < m;l++) {
              c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i)
            }
          }
          g = 1
        }
      }
      return g ? a : k ? c.call(a) : m ? c(a[0], d) : h
    }, now:function() {
      return(new Date).getTime()
    }, uaMatch:function(a) {
      a = a.toLowerCase();
      var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
      return{browser:b[1] || "", version:b[2] || "0"}
    }, sub:function() {
      function a(b, c) {
        return new a.fn.init(b, c)
      }
      e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function(d, f) {
        f && f instanceof e && !(f instanceof a) && (f = a(f));
        return e.fn.init.call(this, d, f, b)
      }, a.fn.init.prototype = a.fn;
      var b = a(c);
      return a
    }, browser:{}}), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
      I["[object " + b + "]"] = b.toLowerCase()
    }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test("\u00a0") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function() {
      c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
    } : c.attachEvent && (B = function() {
      c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
    });
    return e
  }(), g = {};
  f.Callbacks = function(a) {
    a = a ? g[a] || h(a) : {};
    var c = [], d = [], e, i, j, k, l, m, n = function(b) {
      var d, e, g, h, i;
      for(d = 0, e = b.length;d < e;d++) {
        g = b[d], h = f.type(g), h === "array" ? n(g) : h === "function" && (!a.unique || !p.has(g)) && c.push(g)
      }
    }, o = function(b, f) {
      f = f || [], e = !a.memory || [b, f], i = !0, j = !0, m = k || 0, k = 0, l = c.length;
      for(;c && m < l;m++) {
        if(c[m].apply(b, f) === !1 && a.stopOnFalse) {
          e = !0;
          break
        }
      }
      j = !1, c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(), p.fireWith(e[0], e[1])))
    }, p = {add:function() {
      if(c) {
        var a = c.length;
        n(arguments), j ? l = c.length : e && e !== !0 && (k = a, o(e[0], e[1]))
      }
      return this
    }, remove:function() {
      if(c) {
        var b = arguments, d = 0, e = b.length;
        for(;d < e;d++) {
          for(var f = 0;f < c.length;f++) {
            if(b[d] === c[f]) {
              j && f <= l && (l--, f <= m && m--), c.splice(f--, 1);
              if(a.unique) {
                break
              }
            }
          }
        }
      }
      return this
    }, has:function(a) {
      if(c) {
        var b = 0, d = c.length;
        for(;b < d;b++) {
          if(a === c[b]) {
            return!0
          }
        }
      }
      return!1
    }, empty:function() {
      c = [];
      return this
    }, disable:function() {
      c = d = e = b;
      return this
    }, disabled:function() {
      return!c
    }, lock:function() {
      d = b, (!e || e === !0) && p.disable();
      return this
    }, locked:function() {
      return!d
    }, fireWith:function(b, c) {
      d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c));
      return this
    }, fire:function() {
      p.fireWith(this, arguments);
      return this
    }, fired:function() {
      return!!i
    }};
    return p
  };
  var i = [].slice;
  f.extend({Deferred:function(a) {
    var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"), e = "pending", g = {resolve:b, reject:c, notify:d}, h = {done:b.add, fail:c.add, progress:d.add, state:function() {
      return e
    }, isResolved:b.fired, isRejected:c.fired, then:function(a, b, c) {
      i.done(a).fail(b).progress(c);
      return this
    }, always:function() {
      i.done.apply(i, arguments).fail.apply(i, arguments);
      return this
    }, pipe:function(a, b, c) {
      return f.Deferred(function(d) {
        f.each({done:[a, "resolve"], fail:[b, "reject"], progress:[c, "notify"]}, function(a, b) {
          var c = b[0], e = b[1], g;
          f.isFunction(c) ? i[a](function() {
            g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
          }) : i[a](d[e])
        })
      }).promise()
    }, promise:function(a) {
      if(a == null) {
        a = h
      }else {
        for(var b in h) {
          a[b] = h[b]
        }
      }
      return a
    }}, i = h.promise({}), j;
    for(j in g) {
      i[j] = g[j].fire, i[j + "With"] = g[j].fireWith
    }
    i.done(function() {
      e = "resolved"
    }, c.disable, d.lock).fail(function() {
      e = "rejected"
    }, b.disable, d.lock), a && a.call(i, i);
    return i
  }, when:function(a) {
    function m(a) {
      return function(b) {
        e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
      }
    }
    function l(a) {
      return function(c) {
        b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
      }
    }
    var b = i.call(arguments, 0), c = 0, d = b.length, e = Array(d), g = d, h = d, j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
    if(d > 1) {
      for(;c < d;c++) {
        b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g
      }
      g || j.resolveWith(j, b)
    }else {
      j !== a && j.resolveWith(j, d ? [a] : [])
    }
    return k
  }}), f.support = function() {
    var b, d, e, g, h, i, j, k, l, m, n, o, p = c.createElement("div"), q = c.documentElement;
    p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = p.getElementsByTagName("*"), e = p.getElementsByTagName("a")[0];
    if(!d || !d.length || !e) {
      return{}
    }
    g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = p.getElementsByTagName("input")[0], b = {leadingWhitespace:p.firstChild.nodeType === 3, tbody:!p.getElementsByTagName("tbody").length, htmlSerialize:!!p.getElementsByTagName("link").length, style:/top/.test(e.getAttribute("style")), hrefNormalized:e.getAttribute("href") === "/a", opacity:/^0.55/.test(e.style.opacity), cssFloat:!!e.style.cssFloat, checkOn:i.value === "on", optSelected:h.selected, getSetAttribute:p.className !== 
    "t", enctype:!!c.createElement("form").enctype, html5Clone:c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", submitBubbles:!0, changeBubbles:!0, focusinBubbles:!1, deleteExpando:!0, noCloneEvent:!0, inlineBlockNeedsLayout:!1, shrinkWrapBlocks:!1, reliableMarginRight:!0, pixelMargin:!0}, f.boxModel = b.boxModel = c.compatMode === "CSS1Compat", i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
    try {
      delete p.test
    }catch(r) {
      b.deleteExpando = !1
    }
    !p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function() {
      b.noCloneEvent = !1
    }), p.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), p.appendChild(i), j = c.createDocumentFragment(), j.appendChild(p.lastChild), b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, j.removeChild(i), j.appendChild(p);
    if(p.attachEvent) {
      for(n in{submit:1, change:1, focusin:1}) {
        m = "on" + n, o = m in p, o || (p.setAttribute(m, "return;"), o = typeof p[m] == "function"), b[n + "Bubbles"] = o
      }
    }
    j.removeChild(p), j = g = h = p = i = null, f(function() {
      var d, e, g, h, i, j, l, m, n, q, r, s, t, u = c.getElementsByTagName("body")[0];
      !u || (m = 1, t = "padding:0;margin:0;border:", r = "position:absolute;top:0;left:0;width:1px;height:1px;", s = t + "0;visibility:hidden;", n = "style='" + r + t + "5px solid #000;", q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div>" + "<table " + n + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", d = c.createElement("div"), d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px", u.insertBefore(d, 
      u.firstChild), p = c.createElement("div"), d.appendChild(p), p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>", k = p.getElementsByTagName("td"), o = k[0].offsetHeight === 0, k[0].style.display = "", k[1].style.display = "none", b.reliableHiddenOffsets = o && k[0].offsetHeight === 0, a.getComputedStyle && (p.innerHTML = "", l = c.createElement("div"), l.style.width = "0", l.style.marginRight = "0", p.style.width = "2px", p.appendChild(l), b.reliableMarginRight = 
      (parseInt((a.getComputedStyle(l, null) || {marginRight:0}).marginRight, 10) || 0) === 0), typeof p.style.zoom != "undefined" && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, b.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = p.offsetWidth !== 3), p.style.cssText = 
      r + s, p.innerHTML = q, e = p.firstChild, g = e.firstChild, i = e.nextSibling.firstChild.firstChild, j = {doesNotAddBorder:g.offsetTop !== 5, doesAddBorderForTableAndCells:i.offsetTop === 5}, g.style.position = "fixed", g.style.top = "20px", j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15, g.style.position = g.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5, j.doesNotIncludeMarginInBodyOffset = 
      u.offsetTop !== m, a.getComputedStyle && (p.style.marginTop = "1%", b.pixelMargin = (a.getComputedStyle(p, null) || {marginTop:0}).marginTop !== "1%"), typeof d.style.zoom != "undefined" && (d.style.zoom = 1), u.removeChild(d), l = p = d = null, f.extend(b, j))
    });
    return b
  }();
  var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
  f.extend({cache:{}, uuid:0, expando:"jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""), noData:{embed:!0, object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet:!0}, hasData:function(a) {
    a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
    return!!a && !m(a)
  }, data:function(a, c, d, e) {
    if(!!f.acceptData(a)) {
      var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a, n = l ? a[j] : a[j] && j, o = c === "events";
      if((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) {
        return
      }
      n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
      if(typeof c == "object" || typeof c == "function") {
        e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c)
      }
      g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
      if(o && !h[c]) {
        return g.events
      }
      k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
      return i
    }
  }, removeData:function(a, b, c) {
    if(!!f.acceptData(a)) {
      var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
      if(!j[k]) {
        return
      }
      if(b) {
        d = c ? j[k] : j[k].data;
        if(d) {
          f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
          for(e = 0, g = b.length;e < g;e++) {
            delete d[b[e]]
          }
          if(!(c ? m : f.isEmptyObject)(d)) {
            return
          }
        }
      }
      if(!c) {
        delete j[k].data;
        if(!m(j[k])) {
          return
        }
      }
      f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
    }
  }, _data:function(a, b, c) {
    return f.data(a, b, c, !0)
  }, acceptData:function(a) {
    if(a.nodeName) {
      var b = f.noData[a.nodeName.toLowerCase()];
      if(b) {
        return b !== !0 && a.getAttribute("classid") === b
      }
    }
    return!0
  }}), f.fn.extend({data:function(a, c) {
    var d, e, g, h, i, j = this[0], k = 0, m = null;
    if(a === b) {
      if(this.length) {
        m = f.data(j);
        if(j.nodeType === 1 && !f._data(j, "parsedAttrs")) {
          g = j.attributes;
          for(i = g.length;k < i;k++) {
            h = g[k].name, h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)), l(j, h, m[h]))
          }
          f._data(j, "parsedAttrs", !0)
        }
      }
      return m
    }
    if(typeof a == "object") {
      return this.each(function() {
        f.data(this, a)
      })
    }
    d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!";
    return f.access(this, function(c) {
      if(c === b) {
        m = this.triggerHandler("getData" + e, [d[0]]), m === b && j && (m = f.data(j, a), m = l(j, a, m));
        return m === b && d[1] ? this.data(d[0]) : m
      }
      d[1] = c, this.each(function() {
        var b = f(this);
        b.triggerHandler("setData" + e, d), f.data(this, a, c), b.triggerHandler("changeData" + e, d)
      })
    }, null, c, arguments.length > 1, null, !1)
  }, removeData:function(a) {
    return this.each(function() {
      f.removeData(this, a)
    })
  }}), f.extend({_mark:function(a, b) {
    a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
  }, _unmark:function(a, b, c) {
    a !== !0 && (c = b, b = a, a = !1);
    if(b) {
      c = c || "fx";
      var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
      e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
    }
  }, queue:function(a, b, c) {
    var d;
    if(a) {
      b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
      return d || []
    }
  }, dequeue:function(a, b) {
    b = b || "fx";
    var c = f.queue(a, b), d = c.shift(), e = {};
    d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function() {
      f.dequeue(a, b)
    }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
  }}), f.fn.extend({queue:function(a, c) {
    var d = 2;
    typeof a != "string" && (c = a, a = "fx", d--);
    if(arguments.length < d) {
      return f.queue(this[0], a)
    }
    return c === b ? this : this.each(function() {
      var b = f.queue(this, a, c);
      a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
    })
  }, dequeue:function(a) {
    return this.each(function() {
      f.dequeue(this, a)
    })
  }, delay:function(a, b) {
    a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
    return this.queue(b, function(b, c) {
      var d = setTimeout(b, a);
      c.stop = function() {
        clearTimeout(d)
      }
    })
  }, clearQueue:function(a) {
    return this.queue(a || "fx", [])
  }, promise:function(a, c) {
    function m() {
      --h || d.resolveWith(e, [e])
    }
    typeof a != "string" && (c = a, a = b), a = a || "fx";
    var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
    while(g--) {
      if(l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) {
        h++, l.add(m)
      }
    }
    m();
    return d.promise(c)
  }});
  var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i, s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i, u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, v = f.support.getSetAttribute, w, x, y;
  f.fn.extend({attr:function(a, b) {
    return f.access(this, f.attr, a, b, arguments.length > 1)
  }, removeAttr:function(a) {
    return this.each(function() {
      f.removeAttr(this, a)
    })
  }, prop:function(a, b) {
    return f.access(this, f.prop, a, b, arguments.length > 1)
  }, removeProp:function(a) {
    a = f.propFix[a] || a;
    return this.each(function() {
      try {
        this[a] = b, delete this[a]
      }catch(c) {
      }
    })
  }, addClass:function(a) {
    var b, c, d, e, g, h, i;
    if(f.isFunction(a)) {
      return this.each(function(b) {
        f(this).addClass(a.call(this, b, this.className))
      })
    }
    if(a && typeof a == "string") {
      b = a.split(p);
      for(c = 0, d = this.length;c < d;c++) {
        e = this[c];
        if(e.nodeType === 1) {
          if(!e.className && b.length === 1) {
            e.className = a
          }else {
            g = " " + e.className + " ";
            for(h = 0, i = b.length;h < i;h++) {
              ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ")
            }
            e.className = f.trim(g)
          }
        }
      }
    }
    return this
  }, removeClass:function(a) {
    var c, d, e, g, h, i, j;
    if(f.isFunction(a)) {
      return this.each(function(b) {
        f(this).removeClass(a.call(this, b, this.className))
      })
    }
    if(a && typeof a == "string" || a === b) {
      c = (a || "").split(p);
      for(d = 0, e = this.length;d < e;d++) {
        g = this[d];
        if(g.nodeType === 1 && g.className) {
          if(a) {
            h = (" " + g.className + " ").replace(o, " ");
            for(i = 0, j = c.length;i < j;i++) {
              h = h.replace(" " + c[i] + " ", " ")
            }
            g.className = f.trim(h)
          }else {
            g.className = ""
          }
        }
      }
    }
    return this
  }, toggleClass:function(a, b) {
    var c = typeof a, d = typeof b == "boolean";
    if(f.isFunction(a)) {
      return this.each(function(c) {
        f(this).toggleClass(a.call(this, c, this.className, b), b)
      })
    }
    return this.each(function() {
      if(c === "string") {
        var e, g = 0, h = f(this), i = b, j = a.split(p);
        while(e = j[g++]) {
          i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
        }
      }else {
        if(c === "undefined" || c === "boolean") {
          this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
        }
      }
    })
  }, hasClass:function(a) {
    var b = " " + a + " ", c = 0, d = this.length;
    for(;c < d;c++) {
      if(this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) {
        return!0
      }
    }
    return!1
  }, val:function(a) {
    var c, d, e, g = this[0];
    if(!!arguments.length) {
      e = f.isFunction(a);
      return this.each(function(d) {
        var g = f(this), h;
        if(this.nodeType === 1) {
          e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function(a) {
            return a == null ? "" : a + ""
          })), c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
          if(!c || !("set" in c) || c.set(this, h, "value") === b) {
            this.value = h
          }
        }
      })
    }
    if(g) {
      c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()];
      if(c && "get" in c && (d = c.get(g, "value")) !== b) {
        return d
      }
      d = g.value;
      return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
    }
  }}), f.extend({valHooks:{option:{get:function(a) {
    var b = a.attributes.value;
    return!b || b.specified ? a.value : a.text
  }}, select:{get:function(a) {
    var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
    if(g < 0) {
      return null
    }
    c = j ? g : 0, d = j ? g + 1 : i.length;
    for(;c < d;c++) {
      e = i[c];
      if(e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
        b = f(e).val();
        if(j) {
          return b
        }
        h.push(b)
      }
    }
    if(j && !h.length && i.length) {
      return f(i[g]).val()
    }
    return h
  }, set:function(a, b) {
    var c = f.makeArray(b);
    f(a).find("option").each(function() {
      this.selected = f.inArray(f(this).val(), c) >= 0
    }), c.length || (a.selectedIndex = -1);
    return c
  }}}, attrFn:{val:!0, css:!0, html:!0, text:!0, data:!0, width:!0, height:!0, offset:!0}, attr:function(a, c, d, e) {
    var g, h, i, j = a.nodeType;
    if(!!a && j !== 3 && j !== 8 && j !== 2) {
      if(e && c in f.attrFn) {
        return f(a)[c](d)
      }
      if(typeof a.getAttribute == "undefined") {
        return f.prop(a, c, d)
      }
      i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
      if(d !== b) {
        if(d === null) {
          f.removeAttr(a, c);
          return
        }
        if(h && "set" in h && i && (g = h.set(a, d, c)) !== b) {
          return g
        }
        a.setAttribute(c, "" + d);
        return d
      }
      if(h && "get" in h && i && (g = h.get(a, c)) !== null) {
        return g
      }
      g = a.getAttribute(c);
      return g === null ? b : g
    }
  }, removeAttr:function(a, b) {
    var c, d, e, g, h, i = 0;
    if(b && a.nodeType === 1) {
      d = b.toLowerCase().split(p), g = d.length;
      for(;i < g;i++) {
        e = d[i], e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e : c), h && c in a && (a[c] = !1))
      }
    }
  }, attrHooks:{type:{set:function(a, b) {
    if(r.test(a.nodeName) && a.parentNode) {
      f.error("type property can't be changed")
    }else {
      if(!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
        var c = a.value;
        a.setAttribute("type", b), c && (a.value = c);
        return b
      }
    }
  }}, value:{get:function(a, b) {
    if(w && f.nodeName(a, "button")) {
      return w.get(a, b)
    }
    return b in a ? a.value : null
  }, set:function(a, b, c) {
    if(w && f.nodeName(a, "button")) {
      return w.set(a, b, c)
    }
    a.value = b
  }}}, propFix:{tabindex:"tabIndex", readonly:"readOnly", "for":"htmlFor", "class":"className", maxlength:"maxLength", cellspacing:"cellSpacing", cellpadding:"cellPadding", rowspan:"rowSpan", colspan:"colSpan", usemap:"useMap", frameborder:"frameBorder", contenteditable:"contentEditable"}, prop:function(a, c, d) {
    var e, g, h, i = a.nodeType;
    if(!!a && i !== 3 && i !== 8 && i !== 2) {
      h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
      return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
    }
  }, propHooks:{tabIndex:{get:function(a) {
    var c = a.getAttributeNode("tabindex");
    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
  }}}}), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {get:function(a, c) {
    var d, e = f.prop(a, c);
    return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
  }, set:function(a, b, c) {
    var d;
    b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
    return c
  }}, v || (y = {name:!0, id:!0, coords:!0}, w = f.valHooks.button = {get:function(a, c) {
    var d;
    d = a.getAttributeNode(c);
    return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
  }, set:function(a, b, d) {
    var e = a.getAttributeNode(d);
    e || (e = c.createAttribute(d), a.setAttributeNode(e));
    return e.nodeValue = b + ""
  }}, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function(a, b) {
    f.attrHooks[b] = f.extend(f.attrHooks[b], {set:function(a, c) {
      if(c === "") {
        a.setAttribute(b, "auto");
        return c
      }
    }})
  }), f.attrHooks.contenteditable = {get:w.get, set:function(a, b, c) {
    b === "" && (b = "false"), w.set(a, b, c)
  }}), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function(a, c) {
    f.attrHooks[c] = f.extend(f.attrHooks[c], {get:function(a) {
      var d = a.getAttribute(c, 2);
      return d === null ? b : d
    }})
  }), f.support.style || (f.attrHooks.style = {get:function(a) {
    return a.style.cssText.toLowerCase() || b
  }, set:function(a, b) {
    return a.style.cssText = "" + b
  }}), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {get:function(a) {
    var b = a.parentNode;
    b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
    return null
  }})), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function() {
    f.valHooks[this] = {get:function(a) {
      return a.getAttribute("value") === null ? "on" : a.value
    }}
  }), f.each(["radio", "checkbox"], function() {
    f.valHooks[this] = f.extend(f.valHooks[this], {set:function(a, b) {
      if(f.isArray(b)) {
        return a.checked = f.inArray(f(a).val(), b) >= 0
      }
    }})
  });
  var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /(?:^|\s)hover(\.\S+)?\b/, C = /^key/, D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/, F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function(a) {
    var b = F.exec(a);
    b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
    return b
  }, H = function(a, b) {
    var c = a.attributes || {};
    return(!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
  }, I = function(a) {
    return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
  };
  f.event = {add:function(a, c, d, e, g) {
    var h, i, j, k, l, m, n, o, p, q, r, s;
    if(!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
      d.handler && (p = d, d = p.handler, g = p.selector), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function(a) {
        return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
      }, i.elem = a), c = f.trim(I(c)).split(" ");
      for(k = 0;k < c.length;k++) {
        l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({type:m, origType:l[1], data:e, handler:d, guid:d.guid, selector:g, quick:g && G(g), namespace:n.join(".")}, p), r = j[m];
        if(!r) {
          r = j[m] = [], r.delegateCount = 0;
          if(!s.setup || s.setup.call(a, e, n, i) === !1) {
            a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
          }
        }
        s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
      }
      a = null
    }
  }, global:{}, remove:function(a, b, c, d, e) {
    var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
    if(!!g && !!(o = g.events)) {
      b = f.trim(I(b || "")).split(" ");
      for(h = 0;h < b.length;h++) {
        i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
        if(!j) {
          for(j in o) {
            f.event.remove(a, j + b[h], c, d, !0)
          }
          continue
        }
        p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
        for(n = 0;n < r.length;n++) {
          s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s))
        }
        r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
      }
      f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
    }
  }, customEvent:{getData:!0, setData:!0, changeData:!0}, trigger:function(c, d, e, g) {
    if(!e || e.nodeType !== 3 && e.nodeType !== 8) {
      var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
      if(E.test(h + f.event.triggered)) {
        return
      }
      h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
      if((!e || f.event.customEvent[h]) && !f.event.global[h]) {
        return
      }
      c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
      if(!e) {
        j = f.cache;
        for(l in j) {
          j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0)
        }
        return
      }
      c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
      if(p.trigger && p.trigger.apply(e, d) === !1) {
        return
      }
      r = [[e, p.bindType || h]];
      if(!g && !p.noBubble && !f.isWindow(e)) {
        s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
        for(;m;m = m.parentNode) {
          r.push([m, s]), n = m
        }
        n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
      }
      for(l = 0;l < r.length && !c.isPropagationStopped();l++) {
        m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault()
      }
      c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
      return c.result
    }
  }, dispatch:function(c) {
    c = f.event.fix(c || a.event);
    var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0), h = !c.exclusive && !c.namespace, i = f.event.special[c.type] || {}, j = [], k, l, m, n, o, p, q, r, s, t, u;
    g[0] = c, c.delegateTarget = this;
    if(!i.preDispatch || i.preDispatch.call(this, c) !== !1) {
      if(e && (!c.button || c.type !== "click")) {
        n = f(this), n.context = this.ownerDocument || this;
        for(m = c.target;m != this;m = m.parentNode || this) {
          if(m.disabled !== !0) {
            p = {}, r = [], n[0] = m;
            for(k = 0;k < e;k++) {
              s = d[k], t = s.selector, p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)), p[t] && r.push(s)
            }
            r.length && j.push({elem:m, matches:r})
          }
        }
      }
      d.length > e && j.push({elem:this, matches:d.slice(e)});
      for(k = 0;k < j.length && !c.isPropagationStopped();k++) {
        q = j[k], c.currentTarget = q.elem;
        for(l = 0;l < q.matches.length && !c.isImmediatePropagationStopped();l++) {
          s = q.matches[l];
          if(h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace)) {
            c.data = s.data, c.handleObj = s, o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g), o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()))
          }
        }
      }
      i.postDispatch && i.postDispatch.call(this, c);
      return c.result
    }
  }, props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks:{}, keyHooks:{props:"char charCode key keyCode".split(" "), filter:function(a, b) {
    a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
    return a
  }}, mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter:function(a, d) {
    var e, f, g, h = d.button, i = d.fromElement;
    a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
    return a
  }}, fix:function(a) {
    if(a[f.expando]) {
      return a
    }
    var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
    a = f.Event(g);
    for(d = i.length;d;) {
      e = i[--d], a[e] = g[e]
    }
    a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
    return h.filter ? h.filter(a, g) : a
  }, special:{ready:{setup:f.bindReady}, load:{noBubble:!0}, focus:{delegateType:"focusin"}, blur:{delegateType:"focusout"}, beforeunload:{setup:function(a, b, c) {
    f.isWindow(this) && (this.onbeforeunload = c)
  }, teardown:function(a, b) {
    this.onbeforeunload === b && (this.onbeforeunload = null)
  }}}, simulate:function(a, b, c, d) {
    var e = f.extend(new f.Event, c, {type:a, isSimulated:!0, originalEvent:{}});
    d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
  }}, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function(a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1)
  } : function(a, b, c) {
    a.detachEvent && a.detachEvent("on" + b, c)
  }, f.Event = function(a, b) {
    if(!(this instanceof f.Event)) {
      return new f.Event(a, b)
    }
    a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
  }, f.Event.prototype = {preventDefault:function() {
    this.isDefaultPrevented = K;
    var a = this.originalEvent;
    !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
  }, stopPropagation:function() {
    this.isPropagationStopped = K;
    var a = this.originalEvent;
    !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
  }, stopImmediatePropagation:function() {
    this.isImmediatePropagationStopped = K, this.stopPropagation()
  }, isDefaultPrevented:J, isPropagationStopped:J, isImmediatePropagationStopped:J}, f.each({mouseenter:"mouseover", mouseleave:"mouseout"}, function(a, b) {
    f.event.special[a] = {delegateType:b, bindType:b, handle:function(a) {
      var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
      if(!d || d !== c && !f.contains(c, d)) {
        a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b
      }
      return h
    }}
  }), f.support.submitBubbles || (f.event.special.submit = {setup:function() {
    if(f.nodeName(this, "form")) {
      return!1
    }
    f.event.add(this, "click._submit keypress._submit", function(a) {
      var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
      d && !d._submit_attached && (f.event.add(d, "submit._submit", function(a) {
        a._submit_bubble = !0
      }), d._submit_attached = !0)
    })
  }, postDispatch:function(a) {
    a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0))
  }, teardown:function() {
    if(f.nodeName(this, "form")) {
      return!1
    }
    f.event.remove(this, "._submit")
  }}), f.support.changeBubbles || (f.event.special.change = {setup:function() {
    if(z.test(this.nodeName)) {
      if(this.type === "checkbox" || this.type === "radio") {
        f.event.add(this, "propertychange._change", function(a) {
          a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
        }), f.event.add(this, "click._change", function(a) {
          this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
        })
      }
      return!1
    }
    f.event.add(this, "beforeactivate._change", function(a) {
      var b = a.target;
      z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function(a) {
        this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
      }), b._change_attached = !0)
    })
  }, handle:function(a) {
    var b = a.target;
    if(this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") {
      return a.handleObj.handler.apply(this, arguments)
    }
  }, teardown:function() {
    f.event.remove(this, "._change");
    return z.test(this.nodeName)
  }}), f.support.focusinBubbles || f.each({focus:"focusin", blur:"focusout"}, function(a, b) {
    var d = 0, e = function(a) {
      f.event.simulate(b, a.target, f.event.fix(a), !0)
    };
    f.event.special[b] = {setup:function() {
      d++ === 0 && c.addEventListener(a, e, !0)
    }, teardown:function() {
      --d === 0 && c.removeEventListener(a, e, !0)
    }}
  }), f.fn.extend({on:function(a, c, d, e, g) {
    var h, i;
    if(typeof a == "object") {
      typeof c != "string" && (d = d || c, c = b);
      for(i in a) {
        this.on(i, c, d, a[i], g)
      }
      return this
    }
    d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
    if(e === !1) {
      e = J
    }else {
      if(!e) {
        return this
      }
    }
    g === 1 && (h = e, e = function(a) {
      f().off(a);
      return h.apply(this, arguments)
    }, e.guid = h.guid || (h.guid = f.guid++));
    return this.each(function() {
      f.event.add(this, a, e, d, c)
    })
  }, one:function(a, b, c, d) {
    return this.on(a, b, c, d, 1)
  }, off:function(a, c, d) {
    if(a && a.preventDefault && a.handleObj) {
      var e = a.handleObj;
      f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler);
      return this
    }
    if(typeof a == "object") {
      for(var g in a) {
        this.off(g, c, a[g])
      }
      return this
    }
    if(c === !1 || typeof c == "function") {
      d = c, c = b
    }
    d === !1 && (d = J);
    return this.each(function() {
      f.event.remove(this, a, d, c)
    })
  }, bind:function(a, b, c) {
    return this.on(a, null, b, c)
  }, unbind:function(a, b) {
    return this.off(a, null, b)
  }, live:function(a, b, c) {
    f(this.context).on(a, this.selector, b, c);
    return this
  }, die:function(a, b) {
    f(this.context).off(a, this.selector || "**", b);
    return this
  }, delegate:function(a, b, c, d) {
    return this.on(b, a, c, d)
  }, undelegate:function(a, b, c) {
    return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
  }, trigger:function(a, b) {
    return this.each(function() {
      f.event.trigger(a, b, this)
    })
  }, triggerHandler:function(a, b) {
    if(this[0]) {
      return f.event.trigger(a, b, this[0], !0)
    }
  }, toggle:function(a) {
    var b = arguments, c = a.guid || f.guid++, d = 0, e = function(c) {
      var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
      f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
      return b[e].apply(this, arguments) || !1
    };
    e.guid = c;
    while(d < b.length) {
      b[d++].guid = c
    }
    return this.click(e)
  }, hover:function(a, b) {
    return this.mouseenter(a).mouseleave(b || a)
  }}), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
    f.fn[b] = function(a, c) {
      c == null && (c = a, a = null);
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
    }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
  }), function() {
    function x(a, b, c, e, f, g) {
      for(var h = 0, i = e.length;h < i;h++) {
        var j = e[h];
        if(j) {
          var k = !1;
          j = j[a];
          while(j) {
            if(j[d] === c) {
              k = e[j.sizset];
              break
            }
            if(j.nodeType === 1) {
              g || (j[d] = c, j.sizset = h);
              if(typeof b != "string") {
                if(j === b) {
                  k = !0;
                  break
                }
              }else {
                if(m.filter(b, [j]).length > 0) {
                  k = j;
                  break
                }
              }
            }
            j = j[a]
          }
          e[h] = k
        }
      }
    }
    function w(a, b, c, e, f, g) {
      for(var h = 0, i = e.length;h < i;h++) {
        var j = e[h];
        if(j) {
          var k = !1;
          j = j[a];
          while(j) {
            if(j[d] === c) {
              k = e[j.sizset];
              break
            }
            j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
            if(j.nodeName.toLowerCase() === b) {
              k = j;
              break
            }
            j = j[a]
          }
          e[h] = k
        }
      }
    }
    var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1, i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
    [0, 0].sort(function() {
      i = !1;
      return 0
    });
    var m = function(b, d, e, f) {
      e = e || [], d = d || c;
      var h = d;
      if(d.nodeType !== 1 && d.nodeType !== 9) {
        return[]
      }
      if(!b || typeof b != "string") {
        return e
      }
      var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
      do {
        a.exec(""), i = a.exec(x);
        if(i) {
          x = i[3], w.push(i[1]);
          if(i[2]) {
            l = i[3];
            break
          }
        }
      }while(i);
      if(w.length > 1 && p.exec(b)) {
        if(w.length === 2 && o.relative[w[0]]) {
          j = y(w[0] + w[1], d, f)
        }else {
          j = o.relative[w[0]] ? [d] : m(w.shift(), d);
          while(w.length) {
            b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
          }
        }
      }else {
        !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
        if(d) {
          n = f ? {expr:w.pop(), set:s(f)} : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
          while(w.length) {
            q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
          }
        }else {
          k = w = []
        }
      }
      k || (k = j), k || m.error(q || b);
      if(g.call(k) === "[object Array]") {
        if(!u) {
          e.push.apply(e, k)
        }else {
          if(d && d.nodeType === 1) {
            for(t = 0;k[t] != null;t++) {
              k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t])
            }
          }else {
            for(t = 0;k[t] != null;t++) {
              k[t] && k[t].nodeType === 1 && e.push(j[t])
            }
          }
        }
      }else {
        s(k, e)
      }
      l && (m(l, h, e, f), m.uniqueSort(e));
      return e
    };
    m.uniqueSort = function(a) {
      if(u) {
        h = i, a.sort(u);
        if(h) {
          for(var b = 1;b < a.length;b++) {
            a[b] === a[b - 1] && a.splice(b--, 1)
          }
        }
      }
      return a
    }, m.matches = function(a, b) {
      return m(a, null, null, b)
    }, m.matchesSelector = function(a, b) {
      return m(b, null, null, [a]).length > 0
    }, m.find = function(a, b, c) {
      var d, e, f, g, h, i;
      if(!a) {
        return[]
      }
      for(e = 0, f = o.order.length;e < f;e++) {
        h = o.order[e];
        if(g = o.leftMatch[h].exec(a)) {
          i = g[1], g.splice(1, 1);
          if(i.substr(i.length - 1) !== "\\") {
            g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
            if(d != null) {
              a = a.replace(o.match[h], "");
              break
            }
          }
        }
      }
      d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
      return{set:d, expr:a}
    }, m.filter = function(a, c, d, e) {
      var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
      while(a && c.length) {
        for(h in o.filter) {
          if((f = o.leftMatch[h].exec(a)) != null && f[2]) {
            k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
            if(l.substr(l.length - 1) === "\\") {
              continue
            }
            s === r && (r = []);
            if(o.preFilter[h]) {
              f = o.preFilter[h](f, s, d, r, e, t);
              if(!f) {
                g = i = !0
              }else {
                if(f === !0) {
                  continue
                }
              }
            }
            if(f) {
              for(n = 0;(j = s[n]) != null;n++) {
                j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0))
              }
            }
            if(i !== b) {
              d || (s = r), a = a.replace(o.match[h], "");
              if(!g) {
                return[]
              }
              break
            }
          }
        }
        if(a === q) {
          if(g == null) {
            m.error(a)
          }else {
            break
          }
        }
        q = a
      }
      return s
    }, m.error = function(a) {
      throw new Error("Syntax error, unrecognized expression: " + a);
    };
    var n = m.getText = function(a) {
      var b, c, d = a.nodeType, e = "";
      if(d) {
        if(d === 1 || d === 9 || d === 11) {
          if(typeof a.textContent == "string") {
            return a.textContent
          }
          if(typeof a.innerText == "string") {
            return a.innerText.replace(k, "")
          }
          for(a = a.firstChild;a;a = a.nextSibling) {
            e += n(a)
          }
        }else {
          if(d === 3 || d === 4) {
            return a.nodeValue
          }
        }
      }else {
        for(b = 0;c = a[b];b++) {
          c.nodeType !== 8 && (e += n(c))
        }
      }
      return e
    }, o = m.selectors = {order:["ID", "NAME", "TAG"], match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/, ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/, TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/, CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/, POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/, 
    PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/}, leftMatch:{}, attrMap:{"class":"className", "for":"htmlFor"}, attrHandle:{href:function(a) {
      return a.getAttribute("href")
    }, type:function(a) {
      return a.getAttribute("type")
    }}, relative:{"+":function(a, b) {
      var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
      d && (b = b.toLowerCase());
      for(var f = 0, g = a.length, h;f < g;f++) {
        if(h = a[f]) {
          while((h = h.previousSibling) && h.nodeType !== 1) {
          }
          a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
        }
      }
      e && m.filter(b, a, !0)
    }, ">":function(a, b) {
      var c, d = typeof b == "string", e = 0, f = a.length;
      if(d && !l.test(b)) {
        b = b.toLowerCase();
        for(;e < f;e++) {
          c = a[e];
          if(c) {
            var g = c.parentNode;
            a[e] = g.nodeName.toLowerCase() === b ? g : !1
          }
        }
      }else {
        for(;e < f;e++) {
          c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b)
        }
        d && m.filter(b, a, !0)
      }
    }, "":function(a, b, c) {
      var d, f = e++, g = x;
      typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
    }, "~":function(a, b, c) {
      var d, f = e++, g = x;
      typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
    }}, find:{ID:function(a, b, c) {
      if(typeof b.getElementById != "undefined" && !c) {
        var d = b.getElementById(a[1]);
        return d && d.parentNode ? [d] : []
      }
    }, NAME:function(a, b) {
      if(typeof b.getElementsByName != "undefined") {
        var c = [], d = b.getElementsByName(a[1]);
        for(var e = 0, f = d.length;e < f;e++) {
          d[e].getAttribute("name") === a[1] && c.push(d[e])
        }
        return c.length === 0 ? null : c
      }
    }, TAG:function(a, b) {
      if(typeof b.getElementsByTagName != "undefined") {
        return b.getElementsByTagName(a[1])
      }
    }}, preFilter:{CLASS:function(a, b, c, d, e, f) {
      a = " " + a[1].replace(j, "") + " ";
      if(f) {
        return a
      }
      for(var g = 0, h;(h = b[g]) != null;g++) {
        h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1))
      }
      return!1
    }, ID:function(a) {
      return a[1].replace(j, "")
    }, TAG:function(a, b) {
      return a[1].replace(j, "").toLowerCase()
    }, CHILD:function(a) {
      if(a[1] === "nth") {
        a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
        a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
      }else {
        a[2] && m.error(a[0])
      }
      a[0] = e++;
      return a
    }, ATTR:function(a, b, c, d, e, f) {
      var g = a[1] = a[1].replace(j, "");
      !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
      return a
    }, PSEUDO:function(b, c, d, e, f) {
      if(b[1] === "not") {
        if((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) {
          b[3] = m(b[3], null, null, c)
        }else {
          var g = m.filter(b[3], c, d, !0 ^ f);
          d || e.push.apply(e, g);
          return!1
        }
      }else {
        if(o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) {
          return!0
        }
      }
      return b
    }, POS:function(a) {
      a.unshift(!0);
      return a
    }}, filters:{enabled:function(a) {
      return a.disabled === !1 && a.type !== "hidden"
    }, disabled:function(a) {
      return a.disabled === !0
    }, checked:function(a) {
      return a.checked === !0
    }, selected:function(a) {
      a.parentNode && a.parentNode.selectedIndex;
      return a.selected === !0
    }, parent:function(a) {
      return!!a.firstChild
    }, empty:function(a) {
      return!a.firstChild
    }, has:function(a, b, c) {
      return!!m(c[3], a).length
    }, header:function(a) {
      return/h\d/i.test(a.nodeName)
    }, text:function(a) {
      var b = a.getAttribute("type"), c = a.type;
      return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
    }, radio:function(a) {
      return a.nodeName.toLowerCase() === "input" && "radio" === a.type
    }, checkbox:function(a) {
      return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
    }, file:function(a) {
      return a.nodeName.toLowerCase() === "input" && "file" === a.type
    }, password:function(a) {
      return a.nodeName.toLowerCase() === "input" && "password" === a.type
    }, submit:function(a) {
      var b = a.nodeName.toLowerCase();
      return(b === "input" || b === "button") && "submit" === a.type
    }, image:function(a) {
      return a.nodeName.toLowerCase() === "input" && "image" === a.type
    }, reset:function(a) {
      var b = a.nodeName.toLowerCase();
      return(b === "input" || b === "button") && "reset" === a.type
    }, button:function(a) {
      var b = a.nodeName.toLowerCase();
      return b === "input" && "button" === a.type || b === "button"
    }, input:function(a) {
      return/input|select|textarea|button/i.test(a.nodeName)
    }, focus:function(a) {
      return a === a.ownerDocument.activeElement
    }}, setFilters:{first:function(a, b) {
      return b === 0
    }, last:function(a, b, c, d) {
      return b === d.length - 1
    }, even:function(a, b) {
      return b % 2 === 0
    }, odd:function(a, b) {
      return b % 2 === 1
    }, lt:function(a, b, c) {
      return b < c[3] - 0
    }, gt:function(a, b, c) {
      return b > c[3] - 0
    }, nth:function(a, b, c) {
      return c[3] - 0 === b
    }, eq:function(a, b, c) {
      return c[3] - 0 === b
    }}, filter:{PSEUDO:function(a, b, c, d) {
      var e = b[1], f = o.filters[e];
      if(f) {
        return f(a, c, b, d)
      }
      if(e === "contains") {
        return(a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0
      }
      if(e === "not") {
        var g = b[3];
        for(var h = 0, i = g.length;h < i;h++) {
          if(g[h] === a) {
            return!1
          }
        }
        return!0
      }
      m.error(e)
    }, CHILD:function(a, b) {
      var c, e, f, g, h, i, j, k = b[1], l = a;
      switch(k) {
        case "only":
        ;
        case "first":
          while(l = l.previousSibling) {
            if(l.nodeType === 1) {
              return!1
            }
          }
          if(k === "first") {
            return!0
          }
          l = a;
        case "last":
          while(l = l.nextSibling) {
            if(l.nodeType === 1) {
              return!1
            }
          }
          return!0;
        case "nth":
          c = b[2], e = b[3];
          if(c === 1 && e === 0) {
            return!0
          }
          f = b[0], g = a.parentNode;
          if(g && (g[d] !== f || !a.nodeIndex)) {
            i = 0;
            for(l = g.firstChild;l;l = l.nextSibling) {
              l.nodeType === 1 && (l.nodeIndex = ++i)
            }
            g[d] = f
          }
          j = a.nodeIndex - e;
          return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
      }
    }, ID:function(a, b) {
      return a.nodeType === 1 && a.getAttribute("id") === b
    }, TAG:function(a, b) {
      return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
    }, CLASS:function(a, b) {
      return(" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
    }, ATTR:function(a, b) {
      var c = b[1], d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4];
      return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
    }, POS:function(a, b, c, d) {
      var e = b[2], f = o.setFilters[e];
      if(f) {
        return f(a, c, b, d)
      }
    }}}, p = o.match.POS, q = function(a, b) {
      return"\\" + (b - 0 + 1)
    };
    for(var r in o.match) {
      o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q))
    }
    o.match.globalPOS = p;
    var s = function(a, b) {
      a = Array.prototype.slice.call(a, 0);
      if(b) {
        b.push.apply(b, a);
        return b
      }
      return a
    };
    try {
      Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
    }catch(t) {
      s = function(a, b) {
        var c = 0, d = b || [];
        if(g.call(a) === "[object Array]") {
          Array.prototype.push.apply(d, a)
        }else {
          if(typeof a.length == "number") {
            for(var e = a.length;c < e;c++) {
              d.push(a[c])
            }
          }else {
            for(;a[c];c++) {
              d.push(a[c])
            }
          }
        }
        return d
      }
    }
    var u, v;
    c.documentElement.compareDocumentPosition ? u = function(a, b) {
      if(a === b) {
        h = !0;
        return 0
      }
      if(!a.compareDocumentPosition || !b.compareDocumentPosition) {
        return a.compareDocumentPosition ? -1 : 1
      }
      return a.compareDocumentPosition(b) & 4 ? -1 : 1
    } : (u = function(a, b) {
      if(a === b) {
        h = !0;
        return 0
      }
      if(a.sourceIndex && b.sourceIndex) {
        return a.sourceIndex - b.sourceIndex
      }
      var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
      if(g === i) {
        return v(a, b)
      }
      if(!g) {
        return-1
      }
      if(!i) {
        return 1
      }
      while(j) {
        e.unshift(j), j = j.parentNode
      }
      j = i;
      while(j) {
        f.unshift(j), j = j.parentNode
      }
      c = e.length, d = f.length;
      for(var k = 0;k < c && k < d;k++) {
        if(e[k] !== f[k]) {
          return v(e[k], f[k])
        }
      }
      return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
    }, v = function(a, b, c) {
      if(a === b) {
        return c
      }
      var d = a.nextSibling;
      while(d) {
        if(d === b) {
          return-1
        }
        d = d.nextSibling
      }
      return 1
    }), function() {
      var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement;
      a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function(a, c, d) {
        if(typeof c.getElementById != "undefined" && !d) {
          var e = c.getElementById(a[1]);
          return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
        }
      }, o.filter.ID = function(a, b) {
        var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
        return a.nodeType === 1 && c && c.nodeValue === b
      }), e.removeChild(a), e = a = null
    }(), function() {
      var a = c.createElement("div");
      a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function(a, b) {
        var c = b.getElementsByTagName(a[1]);
        if(a[1] === "*") {
          var d = [];
          for(var e = 0;c[e];e++) {
            c[e].nodeType === 1 && d.push(c[e])
          }
          c = d
        }
        return c
      }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function(a) {
        return a.getAttribute("href", 2)
      }), a = null
    }(), c.querySelectorAll && function() {
      var a = m, b = c.createElement("div"), d = "__sizzle__";
      b.innerHTML = "<p class='TEST'></p>";
      if(!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
        m = function(b, e, f, g) {
          e = e || c;
          if(!g && !m.isXML(e)) {
            var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
            if(h && (e.nodeType === 1 || e.nodeType === 9)) {
              if(h[1]) {
                return s(e.getElementsByTagName(b), f)
              }
              if(h[2] && o.find.CLASS && e.getElementsByClassName) {
                return s(e.getElementsByClassName(h[2]), f)
              }
            }
            if(e.nodeType === 9) {
              if(b === "body" && e.body) {
                return s([e.body], f)
              }
              if(h && h[3]) {
                var i = e.getElementById(h[3]);
                if(!i || !i.parentNode) {
                  return s([], f)
                }
                if(i.id === h[3]) {
                  return s([i], f)
                }
              }
              try {
                return s(e.querySelectorAll(b), f)
              }catch(j) {
              }
            }else {
              if(e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode, q = /^\s*[+~]/.test(b);
                l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                try {
                  if(!q || p) {
                    return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                  }
                }catch(r) {
                }finally {
                  l || k.removeAttribute("id")
                }
              }
            }
          }
          return a(b, e, f, g)
        };
        for(var e in a) {
          m[e] = a[e]
        }
        b = null
      }
    }(), function() {
      var a = c.documentElement, b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
      if(b) {
        var d = !b.call(c.createElement("div"), "div"), e = !1;
        try {
          b.call(c.documentElement, "[test!='']:sizzle")
        }catch(f) {
          e = !0
        }
        m.matchesSelector = function(a, c) {
          c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
          if(!m.isXML(a)) {
            try {
              if(e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                var f = b.call(a, c);
                if(f || !d || a.document && a.document.nodeType !== 11) {
                  return f
                }
              }
            }catch(g) {
            }
          }
          return m(c, null, null, [a]).length > 0
        }
      }
    }(), function() {
      var a = c.createElement("div");
      a.innerHTML = "<div class='test e'></div><div class='test'></div>";
      if(!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
        a.lastChild.className = "e";
        if(a.getElementsByClassName("e").length === 1) {
          return
        }
        o.order.splice(1, 0, "CLASS"), o.find.CLASS = function(a, b, c) {
          if(typeof b.getElementsByClassName != "undefined" && !c) {
            return b.getElementsByClassName(a[1])
          }
        }, a = null
      }
    }(), c.documentElement.contains ? m.contains = function(a, b) {
      return a !== b && (a.contains ? a.contains(b) : !0)
    } : c.documentElement.compareDocumentPosition ? m.contains = function(a, b) {
      return!!(a.compareDocumentPosition(b) & 16)
    } : m.contains = function() {
      return!1
    }, m.isXML = function(a) {
      var b = (a ? a.ownerDocument || a : 0).documentElement;
      return b ? b.nodeName !== "HTML" : !1
    };
    var y = function(a, b, c) {
      var d, e = [], f = "", g = b.nodeType ? [b] : b;
      while(d = o.match.PSEUDO.exec(a)) {
        f += d[0], a = a.replace(o.match.PSEUDO, "")
      }
      a = o.relative[a] ? a + "*" : a;
      for(var h = 0, i = g.length;h < i;h++) {
        m(a, g[h], e, c)
      }
      return m.filter(f, e)
    };
    m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
  }();
  var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice, Q = f.expr.match.globalPOS, R = {children:!0, contents:!0, next:!0, prev:!0};
  f.fn.extend({find:function(a) {
    var b = this, c, d;
    if(typeof a != "string") {
      return f(a).filter(function() {
        for(c = 0, d = b.length;c < d;c++) {
          if(f.contains(b[c], this)) {
            return!0
          }
        }
      })
    }
    var e = this.pushStack("", "find", a), g, h, i;
    for(c = 0, d = this.length;c < d;c++) {
      g = e.length, f.find(a, this[c], e);
      if(c > 0) {
        for(h = g;h < e.length;h++) {
          for(i = 0;i < g;i++) {
            if(e[i] === e[h]) {
              e.splice(h--, 1);
              break
            }
          }
        }
      }
    }
    return e
  }, has:function(a) {
    var b = f(a);
    return this.filter(function() {
      for(var a = 0, c = b.length;a < c;a++) {
        if(f.contains(this, b[a])) {
          return!0
        }
      }
    })
  }, not:function(a) {
    return this.pushStack(T(this, a, !1), "not", a)
  }, filter:function(a) {
    return this.pushStack(T(this, a, !0), "filter", a)
  }, is:function(a) {
    return!!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
  }, closest:function(a, b) {
    var c = [], d, e, g = this[0];
    if(f.isArray(a)) {
      var h = 1;
      while(g && g.ownerDocument && g !== b) {
        for(d = 0;d < a.length;d++) {
          f(g).is(a[d]) && c.push({selector:a[d], elem:g, level:h})
        }
        g = g.parentNode, h++
      }
      return c
    }
    var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
    for(d = 0, e = this.length;d < e;d++) {
      g = this[d];
      while(g) {
        if(i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
          c.push(g);
          break
        }
        g = g.parentNode;
        if(!g || !g.ownerDocument || g === b || g.nodeType === 11) {
          break
        }
      }
    }
    c = c.length > 1 ? f.unique(c) : c;
    return this.pushStack(c, "closest", a)
  }, index:function(a) {
    if(!a) {
      return this[0] && this[0].parentNode ? this.prevAll().length : -1
    }
    if(typeof a == "string") {
      return f.inArray(this[0], f(a))
    }
    return f.inArray(a.jquery ? a[0] : a, this)
  }, add:function(a, b) {
    var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a), d = f.merge(this.get(), c);
    return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
  }, andSelf:function() {
    return this.add(this.prevObject)
  }}), f.each({parent:function(a) {
    var b = a.parentNode;
    return b && b.nodeType !== 11 ? b : null
  }, parents:function(a) {
    return f.dir(a, "parentNode")
  }, parentsUntil:function(a, b, c) {
    return f.dir(a, "parentNode", c)
  }, next:function(a) {
    return f.nth(a, 2, "nextSibling")
  }, prev:function(a) {
    return f.nth(a, 2, "previousSibling")
  }, nextAll:function(a) {
    return f.dir(a, "nextSibling")
  }, prevAll:function(a) {
    return f.dir(a, "previousSibling")
  }, nextUntil:function(a, b, c) {
    return f.dir(a, "nextSibling", c)
  }, prevUntil:function(a, b, c) {
    return f.dir(a, "previousSibling", c)
  }, siblings:function(a) {
    return f.sibling((a.parentNode || {}).firstChild, a)
  }, children:function(a) {
    return f.sibling(a.firstChild)
  }, contents:function(a) {
    return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
  }}, function(a, b) {
    f.fn[a] = function(c, d) {
      var e = f.map(this, b, c);
      L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
      return this.pushStack(e, a, P.call(arguments).join(","))
    }
  }), f.extend({filter:function(a, b, c) {
    c && (a = ":not(" + a + ")");
    return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
  }, dir:function(a, c, d) {
    var e = [], g = a[c];
    while(g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) {
      g.nodeType === 1 && e.push(g), g = g[c]
    }
    return e
  }, nth:function(a, b, c, d) {
    b = b || 1;
    var e = 0;
    for(;a;a = a[c]) {
      if(a.nodeType === 1 && ++e === b) {
        break
      }
    }
    return a
  }, sibling:function(a, b) {
    var c = [];
    for(;a;a = a.nextSibling) {
      a.nodeType === 1 && a !== b && c.push(a)
    }
    return c
  }});
  var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/, Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Z = /<([\w:]+)/, $ = /<tbody/i, _ = /<|&#?\w+;/, ba = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i, bc = new RegExp("<(?:" + V + ")[\\s/>]", "i"), bd = /checked\s*(?:[^=]|=\s*.checked.)/i, 
  be = /\/(java|ecma)script/i, bf = /^\s*<!(?:\[CDATA\[|\-\-)/, bg = {option:[1, "<select multiple='multiple'>", "</select>"], legend:[1, "<fieldset>", "</fieldset>"], thead:[1, "<table>", "</table>"], tr:[2, "<table><tbody>", "</tbody></table>"], td:[3, "<table><tbody><tr>", "</tr></tbody></table>"], col:[2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area:[1, "<map>", "</map>"], _default:[0, "", ""]}, bh = U(c);
  bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({text:function(a) {
    return f.access(this, function(a) {
      return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
    }, null, a, arguments.length)
  }, wrapAll:function(a) {
    if(f.isFunction(a)) {
      return this.each(function(b) {
        f(this).wrapAll(a.call(this, b))
      })
    }
    if(this[0]) {
      var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
      this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
        var a = this;
        while(a.firstChild && a.firstChild.nodeType === 1) {
          a = a.firstChild
        }
        return a
      }).append(this)
    }
    return this
  }, wrapInner:function(a) {
    if(f.isFunction(a)) {
      return this.each(function(b) {
        f(this).wrapInner(a.call(this, b))
      })
    }
    return this.each(function() {
      var b = f(this), c = b.contents();
      c.length ? c.wrapAll(a) : b.append(a)
    })
  }, wrap:function(a) {
    var b = f.isFunction(a);
    return this.each(function(c) {
      f(this).wrapAll(b ? a.call(this, c) : a)
    })
  }, unwrap:function() {
    return this.parent().each(function() {
      f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
    }).end()
  }, append:function() {
    return this.domManip(arguments, !0, function(a) {
      this.nodeType === 1 && this.appendChild(a)
    })
  }, prepend:function() {
    return this.domManip(arguments, !0, function(a) {
      this.nodeType === 1 && this.insertBefore(a, this.firstChild)
    })
  }, before:function() {
    if(this[0] && this[0].parentNode) {
      return this.domManip(arguments, !1, function(a) {
        this.parentNode.insertBefore(a, this)
      })
    }
    if(arguments.length) {
      var a = f.clean(arguments);
      a.push.apply(a, this.toArray());
      return this.pushStack(a, "before", arguments)
    }
  }, after:function() {
    if(this[0] && this[0].parentNode) {
      return this.domManip(arguments, !1, function(a) {
        this.parentNode.insertBefore(a, this.nextSibling)
      })
    }
    if(arguments.length) {
      var a = this.pushStack(this, "after", arguments);
      a.push.apply(a, f.clean(arguments));
      return a
    }
  }, remove:function(a, b) {
    for(var c = 0, d;(d = this[c]) != null;c++) {
      if(!a || f.filter(a, [d]).length) {
        !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d)
      }
    }
    return this
  }, empty:function() {
    for(var a = 0, b;(b = this[a]) != null;a++) {
      b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
      while(b.firstChild) {
        b.removeChild(b.firstChild)
      }
    }
    return this
  }, clone:function(a, b) {
    a = a == null ? !1 : a, b = b == null ? a : b;
    return this.map(function() {
      return f.clone(this, a, b)
    })
  }, html:function(a) {
    return f.access(this, function(a) {
      var c = this[0] || {}, d = 0, e = this.length;
      if(a === b) {
        return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null
      }
      if(typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
        a = a.replace(Y, "<$1></$2>");
        try {
          for(;d < e;d++) {
            c = this[d] || {}, c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a)
          }
          c = 0
        }catch(g) {
        }
      }
      c && this.empty().append(a)
    }, null, a, arguments.length)
  }, replaceWith:function(a) {
    if(this[0] && this[0].parentNode) {
      if(f.isFunction(a)) {
        return this.each(function(b) {
          var c = f(this), d = c.html();
          c.replaceWith(a.call(this, b, d))
        })
      }
      typeof a != "string" && (a = f(a).detach());
      return this.each(function() {
        var b = this.nextSibling, c = this.parentNode;
        f(this).remove(), b ? f(b).before(a) : f(c).append(a)
      })
    }
    return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
  }, detach:function(a) {
    return this.remove(a, !0)
  }, domManip:function(a, c, d) {
    var e, g, h, i, j = a[0], k = [];
    if(!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) {
      return this.each(function() {
        f(this).domManip(a, c, d, !0)
      })
    }
    if(f.isFunction(j)) {
      return this.each(function(e) {
        var g = f(this);
        a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
      })
    }
    if(this[0]) {
      i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {fragment:i} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
      if(g) {
        c = c && f.nodeName(g, "tr");
        for(var l = 0, m = this.length, n = m - 1;l < m;l++) {
          d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
        }
      }
      k.length && f.each(k, function(a, b) {
        b.src ? f.ajax({type:"GET", global:!1, url:b.src, async:!1, dataType:"script"}) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
      })
    }
    return this
  }}), f.buildFragment = function(a, b, d) {
    var e, g, h, i, j = a[0];
    b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
    return{fragment:e, cacheable:g}
  }, f.fragments = {}, f.each({appendTo:"append", prependTo:"prepend", insertBefore:"before", insertAfter:"after", replaceAll:"replaceWith"}, function(a, b) {
    f.fn[a] = function(c) {
      var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
      if(g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
        e[b](this[0]);
        return this
      }
      for(var h = 0, i = e.length;h < i;h++) {
        var j = (h > 0 ? this.clone(!0) : this).get();
        f(e[h])[b](j), d = d.concat(j)
      }
      return this.pushStack(d, a, e.selector)
    }
  }), f.extend({clone:function(a, b, c) {
    var d, e, g, h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);
    if((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
      bk(a, h), d = bl(a), e = bl(h);
      for(g = 0;d[g];++g) {
        e[g] && bk(d[g], e[g])
      }
    }
    if(b) {
      bj(a, h);
      if(c) {
        d = bl(a), e = bl(h);
        for(g = 0;d[g];++g) {
          bj(d[g], e[g])
        }
      }
    }
    d = e = null;
    return h
  }, clean:function(a, b, d, e) {
    var g, h, i, j = [];
    b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
    for(var k = 0, l;(l = a[k]) != null;k++) {
      typeof l == "number" && (l += "");
      if(!l) {
        continue
      }
      if(typeof l == "string") {
        if(!_.test(l)) {
          l = b.createTextNode(l)
        }else {
          l = l.replace(Y, "<$1></$2>");
          var m = (Z.exec(l) || ["", ""])[1].toLowerCase(), n = bg[m] || bg._default, o = n[0], p = b.createElement("div"), q = bh.childNodes, r;
          b === c ? bh.appendChild(p) : U(b).appendChild(p), p.innerHTML = n[1] + l + n[2];
          while(o--) {
            p = p.lastChild
          }
          if(!f.support.tbody) {
            var s = $.test(l), t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes : n[1] === "<table>" && !s ? p.childNodes : [];
            for(i = t.length - 1;i >= 0;--i) {
              f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i])
            }
          }
          !f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild), l = p.childNodes, p && (p.parentNode.removeChild(p), q.length > 0 && (r = q[q.length - 1], r && r.parentNode && r.parentNode.removeChild(r)))
        }
      }
      var u;
      if(!f.support.appendChecked) {
        if(l[0] && typeof(u = l.length) == "number") {
          for(i = 0;i < u;i++) {
            bn(l[i])
          }
        }else {
          bn(l)
        }
      }
      l.nodeType ? j.push(l) : j = f.merge(j, l)
    }
    if(d) {
      g = function(a) {
        return!a.type || be.test(a.type)
      };
      for(k = 0;j[k];k++) {
        h = j[k];
        if(e && f.nodeName(h, "script") && (!h.type || be.test(h.type))) {
          e.push(h.parentNode ? h.parentNode.removeChild(h) : h)
        }else {
          if(h.nodeType === 1) {
            var v = f.grep(h.getElementsByTagName("script"), g);
            j.splice.apply(j, [k + 1, 0].concat(v))
          }
          d.appendChild(h)
        }
      }
    }
    return j
  }, cleanData:function(a) {
    var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
    for(var h = 0, i;(i = a[h]) != null;h++) {
      if(i.nodeName && f.noData[i.nodeName.toLowerCase()]) {
        continue
      }
      c = i[f.expando];
      if(c) {
        b = d[c];
        if(b && b.events) {
          for(var j in b.events) {
            e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle)
          }
          b.handle && (b.handle.elem = null)
        }
        g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
      }
    }
  }});
  var bp = /alpha\([^)]*\)/i, bq = /opacity=([^)]*)/, br = /([A-Z]|^ms)/g, bs = /^[\-+]?(?:\d*\.)?\d+$/i, bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i, bu = /^([\-+])=([\-+.\de]+)/, bv = /^margin/, bw = {position:"absolute", visibility:"hidden", display:"block"}, bx = ["Top", "Right", "Bottom", "Left"], by, bz, bA;
  f.fn.css = function(a, c) {
    return f.access(this, function(a, c, d) {
      return d !== b ? f.style(a, c, d) : f.css(a, c)
    }, a, c, arguments.length > 1)
  }, f.extend({cssHooks:{opacity:{get:function(a, b) {
    if(b) {
      var c = by(a, "opacity");
      return c === "" ? "1" : c
    }
    return a.style.opacity
  }}}, cssNumber:{fillOpacity:!0, fontWeight:!0, lineHeight:!0, opacity:!0, orphans:!0, widows:!0, zIndex:!0, zoom:!0}, cssProps:{"float":f.support.cssFloat ? "cssFloat" : "styleFloat"}, style:function(a, c, d, e) {
    if(!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
      var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
      c = f.cssProps[i] || i;
      if(d === b) {
        if(k && "get" in k && (g = k.get(a, !1, e)) !== b) {
          return g
        }
        return j[c]
      }
      h = typeof d, h === "string" && (g = bu.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
      if(d == null || h === "number" && isNaN(d)) {
        return
      }
      h === "number" && !f.cssNumber[i] && (d += "px");
      if(!k || !("set" in k) || (d = k.set(a, d)) !== b) {
        try {
          j[c] = d
        }catch(l) {
        }
      }
    }
  }, css:function(a, c, d) {
    var e, g;
    c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
    if(g && "get" in g && (e = g.get(a, !0, d)) !== b) {
      return e
    }
    if(by) {
      return by(a, c)
    }
  }, swap:function(a, b, c) {
    var d = {}, e, f;
    for(f in b) {
      d[f] = a.style[f], a.style[f] = b[f]
    }
    e = c.call(a);
    for(f in b) {
      a.style[f] = d[f]
    }
    return e
  }}), f.curCSS = f.css, c.defaultView && c.defaultView.getComputedStyle && (bz = function(a, b) {
    var c, d, e, g, h = a.style;
    b = b.replace(br, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), !f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width, h.width = c, c = e.width, h.width = g);
    return c
  }), c.documentElement.currentStyle && (bA = function(a, b) {
    var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
    f == null && g && (e = g[b]) && (f = e), bt.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
    return f === "" ? "auto" : f
  }), by = bz || bA, f.each(["height", "width"], function(a, b) {
    f.cssHooks[b] = {get:function(a, c, d) {
      if(c) {
        return a.offsetWidth !== 0 ? bB(a, b, d) : f.swap(a, bw, function() {
          return bB(a, b, d)
        })
      }
    }, set:function(a, b) {
      return bs.test(b) ? b + "px" : b
    }}
  }), f.support.opacity || (f.cssHooks.opacity = {get:function(a, b) {
    return bq.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
  }, set:function(a, b) {
    var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", g = d && d.filter || c.filter || "";
    c.zoom = 1;
    if(b >= 1 && f.trim(g.replace(bp, "")) === "") {
      c.removeAttribute("filter");
      if(d && !d.filter) {
        return
      }
    }
    c.filter = bp.test(g) ? g.replace(bp, e) : g + " " + e
  }}), f(function() {
    f.support.reliableMarginRight || (f.cssHooks.marginRight = {get:function(a, b) {
      return f.swap(a, {display:"inline-block"}, function() {
        return b ? by(a, "margin-right") : a.style.marginRight
      })
    }})
  }), f.expr && f.expr.filters && (f.expr.filters.hidden = function(a) {
    var b = a.offsetWidth, c = a.offsetHeight;
    return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
  }, f.expr.filters.visible = function(a) {
    return!f.expr.filters.hidden(a)
  }), f.each({margin:"", padding:"", border:"Width"}, function(a, b) {
    f.cssHooks[a + b] = {expand:function(c) {
      var d, e = typeof c == "string" ? c.split(" ") : [c], f = {};
      for(d = 0;d < 4;d++) {
        f[a + bx[d] + b] = e[d] || e[d - 2] || e[0]
      }
      return f
    }}
  });
  var bC = /%20/g, bD = /\[\]$/, bE = /\r?\n/g, bF = /#.*$/, bG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, bH = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, bI = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bJ = /^(?:GET|HEAD)$/, bK = /^\/\//, bL = /\?/, bM = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bN = /^(?:select|textarea)/i, bO = /\s+/, bP = /([?&])_=[^&]*/, bQ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, 
  bR = f.fn.load, bS = {}, bT = {}, bU, bV, bW = ["*/"] + ["*"];
  try {
    bU = e.href
  }catch(bX) {
    bU = c.createElement("a"), bU.href = "", bU = bU.href
  }
  bV = bQ.exec(bU.toLowerCase()) || [], f.fn.extend({load:function(a, c, d) {
    if(typeof a != "string" && bR) {
      return bR.apply(this, arguments)
    }
    if(!this.length) {
      return this
    }
    var e = a.indexOf(" ");
    if(e >= 0) {
      var g = a.slice(e, a.length);
      a = a.slice(0, e)
    }
    var h = "GET";
    c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
    var i = this;
    f.ajax({url:a, type:h, dataType:"html", data:c, complete:function(a, b, c) {
      c = a.responseText, a.isResolved() && (a.done(function(a) {
        c = a
      }), i.html(g ? f("<div>").append(c.replace(bM, "")).find(g) : c)), d && i.each(d, [c, b, a])
    }});
    return this
  }, serialize:function() {
    return f.param(this.serializeArray())
  }, serializeArray:function() {
    return this.map(function() {
      return this.elements ? f.makeArray(this.elements) : this
    }).filter(function() {
      return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type))
    }).map(function(a, b) {
      var c = f(this).val();
      return c == null ? null : f.isArray(c) ? f.map(c, function(a, c) {
        return{name:b.name, value:a.replace(bE, "\r\n")}
      }) : {name:b.name, value:c.replace(bE, "\r\n")}
    }).get()
  }}), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
    f.fn[b] = function(a) {
      return this.on(b, a)
    }
  }), f.each(["get", "post"], function(a, c) {
    f[c] = function(a, d, e, g) {
      f.isFunction(d) && (g = g || e, e = d, d = b);
      return f.ajax({type:c, url:a, data:d, success:e, dataType:g})
    }
  }), f.extend({getScript:function(a, c) {
    return f.get(a, b, c, "script")
  }, getJSON:function(a, b, c) {
    return f.get(a, b, c, "json")
  }, ajaxSetup:function(a, b) {
    b ? b$(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b$(a, b);
    return a
  }, ajaxSettings:{url:bU, isLocal:bI.test(bV[1]), global:!0, type:"GET", contentType:"application/x-www-form-urlencoded; charset=UTF-8", processData:!0, async:!0, accepts:{xml:"application/xml, text/xml", html:"text/html", text:"text/plain", json:"application/json, text/javascript", "*":bW}, contents:{xml:/xml/, html:/html/, json:/json/}, responseFields:{xml:"responseXML", text:"responseText"}, converters:{"* text":a.String, "text html":!0, "text json":f.parseJSON, "text xml":f.parseXML}, flatOptions:{context:!0, 
  url:!0}}, ajaxPrefilter:bY(bS), ajaxTransport:bY(bT), ajax:function(a, c) {
    function w(a, c, l, m) {
      if(s !== 2) {
        s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
        var o, r, u, w = c, x = l ? ca(d, v, l) : b, y, z;
        if(a >= 200 && a < 300 || a === 304) {
          if(d.ifModified) {
            if(y = v.getResponseHeader("Last-Modified")) {
              f.lastModified[k] = y
            }
            if(z = v.getResponseHeader("Etag")) {
              f.etag[k] = z
            }
          }
          if(a === 304) {
            w = "notmodified", o = !0
          }else {
            try {
              r = cb(d, x), w = "success", o = !0
            }catch(A) {
              w = "parsererror", u = A
            }
          }
        }else {
          u = w;
          if(!w || a) {
            w = "error", a < 0 && (a = 0)
          }
        }
        v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
      }
    }
    typeof a == "object" && (c = a, a = b), c = c || {};
    var d = f.ajaxSetup({}, c), e = d.context || d, g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(), i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u, v = {readyState:0, setRequestHeader:function(a, b) {
      if(!s) {
        var c = a.toLowerCase();
        a = m[c] = m[c] || a, l[a] = b
      }
      return this
    }, getAllResponseHeaders:function() {
      return s === 2 ? n : null
    }, getResponseHeader:function(a) {
      var c;
      if(s === 2) {
        if(!o) {
          o = {};
          while(c = bG.exec(n)) {
            o[c[1].toLowerCase()] = c[2]
          }
        }
        c = o[a.toLowerCase()]
      }
      return c === b ? null : c
    }, overrideMimeType:function(a) {
      s || (d.mimeType = a);
      return this
    }, abort:function(a) {
      a = a || "abort", p && p.abort(a), w(0, a);
      return this
    }};
    h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function(a) {
      if(a) {
        var b;
        if(s < 2) {
          for(b in a) {
            j[b] = [j[b], a[b]]
          }
        }else {
          b = a[v.status], v.then(b, b)
        }
      }
      return this
    }, d.url = ((a || d.url) + "").replace(bF, "").replace(bK, bV[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO), d.crossDomain == null && (r = bQ.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bV[3] || (bV[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), bZ(bS, d, c, v);
    if(s === 2) {
      return!1
    }
    t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bJ.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
    if(!d.hasContent) {
      d.data && (d.url += (bL.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
      if(d.cache === !1) {
        var x = f.now(), y = d.url.replace(bP, "$1_=" + x);
        d.url = y + (y === d.url ? (bL.test(d.url) ? "&" : "?") + "_=" + x : "")
      }
    }
    (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bW + "; q=0.01" : "") : d.accepts["*"]);
    for(u in d.headers) {
      v.setRequestHeader(u, d.headers[u])
    }
    if(d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
      v.abort();
      return!1
    }
    for(u in{success:1, error:1, complete:1}) {
      v[u](d[u])
    }
    p = bZ(bT, d, c, v);
    if(!p) {
      w(-1, "No Transport")
    }else {
      v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function() {
        v.abort("timeout")
      }, d.timeout));
      try {
        s = 1, p.send(l, w)
      }catch(z) {
        if(s < 2) {
          w(-1, z)
        }else {
          throw z;
        }
      }
    }
    return v
  }, param:function(a, c) {
    var d = [], e = function(a, b) {
      b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
    };
    c === b && (c = f.ajaxSettings.traditional);
    if(f.isArray(a) || a.jquery && !f.isPlainObject(a)) {
      f.each(a, function() {
        e(this.name, this.value)
      })
    }else {
      for(var g in a) {
        b_(g, a[g], c, e)
      }
    }
    return d.join("&").replace(bC, "+")
  }}), f.extend({active:0, lastModified:{}, etag:{}});
  var cc = f.now(), cd = /(\=)\?(&|$)|\?\?/i;
  f.ajaxSetup({jsonp:"callback", jsonpCallback:function() {
    return f.expando + "_" + cc++
  }}), f.ajaxPrefilter("json jsonp", function(b, c, d) {
    var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
    if(b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {
      var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2";
      b.jsonp !== !1 && (j = j.replace(cd, l), b.url === j && (e && (k = k.replace(cd, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function(a) {
        g = [a]
      }, d.always(function() {
        a[h] = i, g && f.isFunction(i) && a[h](g[0])
      }), b.converters["script json"] = function() {
        g || f.error(h + " was not called");
        return g[0]
      }, b.dataTypes[0] = "json";
      return"script"
    }
  }), f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents:{script:/javascript|ecmascript/}, converters:{"text script":function(a) {
    f.globalEval(a);
    return a
  }}}), f.ajaxPrefilter("script", function(a) {
    a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
  }), f.ajaxTransport("script", function(a) {
    if(a.crossDomain) {
      var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
      return{send:function(f, g) {
        d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function(a, c) {
          if(c || !d.readyState || /loaded|complete/.test(d.readyState)) {
            d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
          }
        }, e.insertBefore(d, e.firstChild)
      }, abort:function() {
        d && d.onload(0, 1)
      }}
    }
  });
  var ce = a.ActiveXObject ? function() {
    for(var a in cg) {
      cg[a](0, 1)
    }
  } : !1, cf = 0, cg;
  f.ajaxSettings.xhr = a.ActiveXObject ? function() {
    return!this.isLocal && ch() || ci()
  } : ch, function(a) {
    f.extend(f.support, {ajax:!!a, cors:!!a && "withCredentials" in a})
  }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function(c) {
    if(!c.crossDomain || f.support.cors) {
      var d;
      return{send:function(e, g) {
        var h = c.xhr(), i, j;
        c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
        if(c.xhrFields) {
          for(j in c.xhrFields) {
            h[j] = c.xhrFields[j]
          }
        }
        c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
        try {
          for(j in e) {
            h.setRequestHeader(j, e[j])
          }
        }catch(k) {
        }
        h.send(c.hasContent && c.data || null), d = function(a, e) {
          var j, k, l, m, n;
          try {
            if(d && (e || h.readyState === 4)) {
              d = b, i && (h.onreadystatechange = f.noop, ce && delete cg[i]);
              if(e) {
                h.readyState !== 4 && h.abort()
              }else {
                j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n);
                try {
                  m.text = h.responseText
                }catch(a) {
                }
                try {
                  k = h.statusText
                }catch(o) {
                  k = ""
                }
                !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
              }
            }
          }catch(p) {
            e || g(-1, p)
          }
          m && g(j, k, m, l)
        }, !c.async || h.readyState === 4 ? d() : (i = ++cf, ce && (cg || (cg = {}, f(a).unload(ce)), cg[i] = d), h.onreadystatechange = d)
      }, abort:function() {
        d && d(0, 1)
      }}
    }
  });
  var cj = {}, ck, cl, cm = /^(?:toggle|show|hide)$/, cn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, co, cp = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]], cq;
  f.fn.extend({show:function(a, b, c) {
    var d, e;
    if(a || a === 0) {
      return this.animate(ct("show", 3), a, b, c)
    }
    for(var g = 0, h = this.length;g < h;g++) {
      d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), (e === "" && f.css(d, "display") === "none" || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", cu(d.nodeName)))
    }
    for(g = 0;g < h;g++) {
      d = this[g];
      if(d.style) {
        e = d.style.display;
        if(e === "" || e === "none") {
          d.style.display = f._data(d, "olddisplay") || ""
        }
      }
    }
    return this
  }, hide:function(a, b, c) {
    if(a || a === 0) {
      return this.animate(ct("hide", 3), a, b, c)
    }
    var d, e, g = 0, h = this.length;
    for(;g < h;g++) {
      d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e))
    }
    for(g = 0;g < h;g++) {
      this[g].style && (this[g].style.display = "none")
    }
    return this
  }, _toggle:f.fn.toggle, toggle:function(a, b, c) {
    var d = typeof a == "boolean";
    f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function() {
      var b = d ? a : f(this).is(":hidden");
      f(this)[b ? "show" : "hide"]()
    }) : this.animate(ct("toggle", 3), a, b, c);
    return this
  }, fadeTo:function(a, b, c, d) {
    return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity:b}, a, c, d)
  }, animate:function(a, b, c, d) {
    function g() {
      e.queue === !1 && f._mark(this);
      var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m, n, o, p, q;
      b.animatedProperties = {};
      for(i in a) {
        g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]);
        if((k = f.cssHooks[g]) && "expand" in k) {
          l = k.expand(a[g]), delete a[g];
          for(i in l) {
            i in a || (a[i] = l[i])
          }
        }
      }
      for(g in a) {
        h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
        if(h === "hide" && d || h === "show" && !d) {
          return b.complete.call(this)
        }
        c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cu(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
      }
      b.overflow != null && (this.style.overflow = "hidden");
      for(i in a) {
        j = new f.fx(this, b, i), h = a[i], cm.test(h) ? (q = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), q ? (f._data(this, "toggle" + i, q === "show" ? "hide" : "show"), j[q]()) : j[h]()) : (m = cn.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (f.cssNumber[i] ? "" : "px"), p !== "px" && (f.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, f.style(this, i, n + p)), m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, 
        h, ""))
      }
      return!0
    }
    var e = f.speed(b, c, d);
    if(f.isEmptyObject(a)) {
      return this.each(e.complete, [!1])
    }
    a = f.extend({}, a);
    return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
  }, stop:function(a, c, d) {
    typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
    return this.each(function() {
      function h(a, b, c) {
        var e = b[c];
        f.removeData(a, c, !0), e.stop(d)
      }
      var b, c = !1, e = f.timers, g = f._data(this);
      d || f._unmark(!0, this);
      if(a == null) {
        for(b in g) {
          g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b)
        }
      }else {
        g[b = a + ".run"] && g[b].stop && h(this, g, b)
      }
      for(b = e.length;b--;) {
        e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1))
      }
      (!d || !c) && f.dequeue(this, a)
    })
  }}), f.each({slideDown:ct("show", 1), slideUp:ct("hide", 1), slideToggle:ct("toggle", 1), fadeIn:{opacity:"show"}, fadeOut:{opacity:"hide"}, fadeToggle:{opacity:"toggle"}}, function(a, b) {
    f.fn[a] = function(a, c, d) {
      return this.animate(b, a, c, d)
    }
  }), f.extend({speed:function(a, b, c) {
    var d = a && typeof a == "object" ? f.extend({}, a) : {complete:c || !c && b || f.isFunction(a) && a, duration:a, easing:c && b || b && !f.isFunction(b) && b};
    d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
    if(d.queue == null || d.queue === !0) {
      d.queue = "fx"
    }
    d.old = d.complete, d.complete = function(a) {
      f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
    };
    return d
  }, easing:{linear:function(a) {
    return a
  }, swing:function(a) {
    return-Math.cos(a * Math.PI) / 2 + 0.5
  }}, timers:[], fx:function(a, b, c) {
    this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
  }}), f.fx.prototype = {update:function() {
    this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
  }, cur:function() {
    if(this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
      return this.elem[this.prop]
    }
    var a, b = f.css(this.elem, this.prop);
    return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
  }, custom:function(a, c, d) {
    function h(a) {
      return e.step(a)
    }
    var e = this, g = f.fx;
    this.startTime = cq || cr(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function() {
      f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end))
    }, h() && f.timers.push(h) && !co && (co = setInterval(g.tick, g.interval))
  }, show:function() {
    var a = f._data(this.elem, "fxshow" + this.prop);
    this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
  }, hide:function() {
    this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
  }, step:function(a) {
    var b, c, d, e = cq || cr(), g = !0, h = this.elem, i = this.options;
    if(a || e >= i.duration + this.startTime) {
      this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
      for(b in i.animatedProperties) {
        i.animatedProperties[b] !== !0 && (g = !1)
      }
      if(g) {
        i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function(a, b) {
          h.style["overflow" + b] = i.overflow[a]
        }), i.hide && f(h).hide();
        if(i.hide || i.show) {
          for(b in i.animatedProperties) {
            f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0)
          }
        }
        d = i.complete, d && (i.complete = !1, d.call(h))
      }
      return!1
    }
    i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
    return!0
  }}, f.extend(f.fx, {tick:function() {
    var a, b = f.timers, c = 0;
    for(;c < b.length;c++) {
      a = b[c], !a() && b[c] === a && b.splice(c--, 1)
    }
    b.length || f.fx.stop()
  }, interval:13, stop:function() {
    clearInterval(co), co = null
  }, speeds:{slow:600, fast:200, _default:400}, step:{opacity:function(a) {
    f.style(a.elem, "opacity", a.now)
  }, _default:function(a) {
    a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
  }}}), f.each(cp.concat.apply([], cp), function(a, b) {
    b.indexOf("margin") && (f.fx.step[b] = function(a) {
      f.style(a.elem, b, Math.max(0, a.now) + a.unit)
    })
  }), f.expr && f.expr.filters && (f.expr.filters.animated = function(a) {
    return f.grep(f.timers, function(b) {
      return a === b.elem
    }).length
  });
  var cv, cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
  "getBoundingClientRect" in c.documentElement ? cv = function(a, b, c, d) {
    try {
      d = a.getBoundingClientRect()
    }catch(e) {
    }
    if(!d || !f.contains(c, a)) {
      return d ? {top:d.top, left:d.left} : {top:0, left:0}
    }
    var g = b.body, h = cy(b), i = c.clientTop || g.clientTop || 0, j = c.clientLeft || g.clientLeft || 0, k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop, l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft, m = d.top + k - i, n = d.left + l - j;
    return{top:m, left:n}
  } : cv = function(a, b, c) {
    var d, e = a.offsetParent, g = a, h = b.body, i = b.defaultView, j = i ? i.getComputedStyle(a, null) : a.currentStyle, k = a.offsetTop, l = a.offsetLeft;
    while((a = a.parentNode) && a !== h && a !== c) {
      if(f.support.fixedPosition && j.position === "fixed") {
        break
      }
      d = i ? i.getComputedStyle(a, null) : a.currentStyle, k -= a.scrollTop, l -= a.scrollLeft, a === e && (k += a.offsetTop, l += a.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), g = e, e = a.offsetParent), f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 
      0), j = d
    }
    if(j.position === "relative" || j.position === "static") {
      k += h.offsetTop, l += h.offsetLeft
    }
    f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop, h.scrollTop), l += Math.max(c.scrollLeft, h.scrollLeft));
    return{top:k, left:l}
  }, f.fn.offset = function(a) {
    if(arguments.length) {
      return a === b ? this : this.each(function(b) {
        f.offset.setOffset(this, a, b)
      })
    }
    var c = this[0], d = c && c.ownerDocument;
    if(!d) {
      return null
    }
    if(c === d.body) {
      return f.offset.bodyOffset(c)
    }
    return cv(c, d, d.documentElement)
  }, f.offset = {bodyOffset:function(a) {
    var b = a.offsetTop, c = a.offsetLeft;
    f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
    return{top:b, left:c}
  }, setOffset:function(a, b, c) {
    var d = f.css(a, "position");
    d === "static" && (a.style.position = "relative");
    var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"), j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n;
    j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
  }}, f.fn.extend({position:function() {
    if(!this[0]) {
      return null
    }
    var a = this[0], b = this.offsetParent(), c = this.offset(), d = cx.test(b[0].nodeName) ? {top:0, left:0} : b.offset();
    c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
    return{top:c.top - d.top, left:c.left - d.left}
  }, offsetParent:function() {
    return this.map(function() {
      var a = this.offsetParent || c.body;
      while(a && !cx.test(a.nodeName) && f.css(a, "position") === "static") {
        a = a.offsetParent
      }
      return a
    })
  }}), f.each({scrollLeft:"pageXOffset", scrollTop:"pageYOffset"}, function(a, c) {
    var d = /Y/.test(c);
    f.fn[a] = function(e) {
      return f.access(this, function(a, e, g) {
        var h = cy(a);
        if(g === b) {
          return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e]
        }
        h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g
      }, a, e, arguments.length, null)
    }
  }), f.each({Height:"height", Width:"width"}, function(a, c) {
    var d = "client" + a, e = "scroll" + a, g = "offset" + a;
    f.fn["inner" + a] = function() {
      var a = this[0];
      return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null
    }, f.fn["outer" + a] = function(a) {
      var b = this[0];
      return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null
    }, f.fn[c] = function(a) {
      return f.access(this, function(a, c, h) {
        var i, j, k, l;
        if(f.isWindow(a)) {
          i = a.document, j = i.documentElement[d];
          return f.support.boxModel && j || i.body && i.body[d] || j
        }
        if(a.nodeType === 9) {
          i = a.documentElement;
          if(i[d] >= i[e]) {
            return i[d]
          }
          return Math.max(a.body[e], i[e], a.body[g], i[g])
        }
        if(h === b) {
          k = f.css(a, c), l = parseFloat(k);
          return f.isNumeric(l) ? l : k
        }
        f(a).css(c, h)
      }, c, a, arguments.length, null)
    }
  }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
    return f
  })
})(window);
(function(a, h, y) {
  var w = "function", v = "password", j = "maxLength", n = "type", b = "", c = true, u = "placeholder", i = false, t = "watermark", g = t, f = "watermarkClass", q = "watermarkFocus", l = "watermarkSubmit", o = "watermarkMaxLength", e = "watermarkPassword", d = "watermarkText", k = /\r/g, s = "input:data(" + g + "),textarea:data(" + g + ")", m = "input:text,input:password,input[type=search],input:not([type]),textarea", p = ["Page_ClientValidate"], r = i, x = u in document.createElement("input");
  a.watermark = a.watermark || {version:"3.1.3", runOnce:c, options:{className:t, useNative:c, hideBeforeUnload:c}, hide:function(b) {
    a(b).filter(s).each(function() {
      a.watermark._hide(a(this))
    })
  }, _hide:function(a, r) {
    var p = a[0], q = (p.value || b).replace(k, b), l = a.data(d) || b, m = a.data(o) || 0, i = a.data(f);
    if(l.length && q == l) {
      p.value = b;
      if(a.data(e)) {
        if((a.attr(n) || b) === "text") {
          var g = a.data(e) || [], c = a.parent() || [];
          if(g.length && c.length) {
            c[0].removeChild(a[0]);
            c[0].appendChild(g[0]);
            a = g
          }
        }
      }
      if(m) {
        a.attr(j, m);
        a.removeData(o)
      }
      if(r) {
        a.attr("autocomplete", "off");
        h.setTimeout(function() {
          a.select()
        }, 1)
      }
    }
    i && a.removeClass(i)
  }, show:function(b) {
    a(b).filter(s).each(function() {
      a.watermark._show(a(this))
    })
  }, _show:function(g) {
    var p = g[0], u = (p.value || b).replace(k, b), h = g.data(d) || b, s = g.attr(n) || b, t = g.data(f);
    if((u.length == 0 || u == h) && !g.data(q)) {
      r = c;
      if(g.data(e)) {
        if(s === v) {
          var m = g.data(e) || [], l = g.parent() || [];
          if(m.length && l.length) {
            l[0].removeChild(g[0]);
            l[0].appendChild(m[0]);
            g = m;
            g.attr(j, h.length);
            p = g[0]
          }
        }
      }
      if(s === "text" || s === "search") {
        var i = g.attr(j) || 0;
        if(i > 0 && h.length > i) {
          g.data(o, i);
          g.attr(j, h.length)
        }
      }
      t && g.addClass(t);
      p.value = h
    }else {
      a.watermark._hide(g)
    }
  }, hideAll:function() {
    if(r) {
      a.watermark.hide(m);
      r = i
    }
  }, showAll:function() {
    a.watermark.show(m)
  }};
  a.fn.watermark = a.fn.watermark || function(p, o) {
    var t = "string";
    if(!this.length) {
      return this
    }
    var s = i, r = typeof p === t;
    if(r) {
      p = p.replace(k, b)
    }
    if(typeof o === "object") {
      s = typeof o.className === t;
      o = a.extend({}, a.watermark.options, o)
    }else {
      if(typeof o === t) {
        s = c;
        o = a.extend({}, a.watermark.options, {className:o})
      }else {
        o = a.watermark.options
      }
    }
    if(typeof o.useNative !== w) {
      o.useNative = o.useNative ? function() {
        return c
      } : function() {
        return i
      }
    }
    return this.each(function() {
      var B = "dragleave", A = "dragenter", z = this, i = a(z);
      if(!i.is(m)) {
        return
      }
      if(i.data(g)) {
        if(r || s) {
          a.watermark._hide(i);
          r && i.data(d, p);
          s && i.data(f, o.className)
        }
      }else {
        if(x && o.useNative.call(z, i) && (i.attr("tagName") || b) !== "TEXTAREA") {
          r && i.attr(u, p);
          return
        }
        i.data(d, r ? p : b);
        i.data(f, o.className);
        i.data(g, 1);
        if((i.attr(n) || b) === v) {
          var C = i.wrap("<span>").parent(), t = a(C.html().replace(/type=["']?password["']?/i, 'type="text"'));
          t.data(d, i.data(d));
          t.data(f, i.data(f));
          t.data(g, 1);
          t.attr(j, p.length);
          t.focus(function() {
            a.watermark._hide(t, c)
          }).bind(A, function() {
            a.watermark._hide(t)
          }).bind("dragend", function() {
            h.setTimeout(function() {
              t.blur()
            }, 1)
          });
          i.blur(function() {
            a.watermark._show(i)
          }).bind(B, function() {
            a.watermark._show(i)
          });
          t.data(e, i);
          i.data(e, t)
        }else {
          i.focus(function() {
            i.data(q, 1);
            a.watermark._hide(i, c)
          }).blur(function() {
            i.data(q, 0);
            a.watermark._show(i)
          }).bind(A, function() {
            a.watermark._hide(i)
          }).bind(B, function() {
            a.watermark._show(i)
          }).bind("dragend", function() {
            h.setTimeout(function() {
              a.watermark._show(i)
            }, 1)
          }).bind("drop", function(e) {
            var c = i[0], a = e.originalEvent.dataTransfer.getData("Text");
            if((c.value || b).replace(k, b).replace(a, b) === i.data(d)) {
              c.value = a
            }
            i.focus()
          })
        }
        if(z.form) {
          var w = z.form, y = a(w);
          if(!y.data(l)) {
            y.submit(a.watermark.hideAll);
            if(w.submit) {
              y.data(l, w.submit);
              w.submit = function(c, b) {
                return function() {
                  var d = b.data(l);
                  a.watermark.hideAll();
                  if(d.apply) {
                    d.apply(c, Array.prototype.slice.call(arguments))
                  }else {
                    d()
                  }
                }
              }(w, y)
            }else {
              y.data(l, 1);
              w.submit = function(b) {
                return function() {
                  a.watermark.hideAll();
                  delete b.submit;
                  b.submit()
                }
              }(w)
            }
          }
        }
      }
      a.watermark._show(i)
    })
  };
  if(a.watermark.runOnce) {
    a.watermark.runOnce = i;
    a.extend(a.expr[":"], {data:function(c, d, b) {
      return!!a.data(c, b[3])
    }});
    (function(c) {
      a.fn.val = function() {
        var e = this;
        if(!e.length) {
          return arguments.length ? e : y
        }
        if(!arguments.length) {
          if(e.data(g)) {
            var f = (e[0].value || b).replace(k, b);
            return f === (e.data(d) || b) ? b : f
          }else {
            return c.apply(e, arguments)
          }
        }else {
          c.apply(e, arguments);
          a.watermark.show(e);
          return e
        }
      }
    })(a.fn.val);
    p.length && a(function() {
      for(var b, c, d = p.length - 1;d >= 0;d--) {
        b = p[d];
        c = h[b];
        if(typeof c === w) {
          h[b] = function(b) {
            return function() {
              a.watermark.hideAll();
              return b.apply(null, Array.prototype.slice.call(arguments))
            }
          }(c)
        }
      }
    });
    a(h).bind("beforeunload", function() {
      a.watermark.options.hideBeforeUnload && a.watermark.hideAll()
    })
  }
})(jQuery, window);
window.Chart = function(context, options) {
  var chart = this;
  var animationOptions = {linear:function(t) {
    return t
  }, easeInQuad:function(t) {
    return t * t
  }, easeOutQuad:function(t) {
    return-1 * t * (t - 2)
  }, easeInOutQuad:function(t) {
    if((t /= 1 / 2) < 1) {
      return 1 / 2 * t * t
    }
    return-1 / 2 * (--t * (t - 2) - 1)
  }, easeInCubic:function(t) {
    return t * t * t
  }, easeOutCubic:function(t) {
    return 1 * ((t = t / 1 - 1) * t * t + 1)
  }, easeInOutCubic:function(t) {
    if((t /= 1 / 2) < 1) {
      return 1 / 2 * t * t * t
    }
    return 1 / 2 * ((t -= 2) * t * t + 2)
  }, easeInQuart:function(t) {
    return t * t * t * t
  }, easeOutQuart:function(t) {
    return-1 * ((t = t / 1 - 1) * t * t * t - 1)
  }, easeInOutQuart:function(t) {
    if((t /= 1 / 2) < 1) {
      return 1 / 2 * t * t * t * t
    }
    return-1 / 2 * ((t -= 2) * t * t * t - 2)
  }, easeInQuint:function(t) {
    return 1 * (t /= 1) * t * t * t * t
  }, easeOutQuint:function(t) {
    return 1 * ((t = t / 1 - 1) * t * t * t * t + 1)
  }, easeInOutQuint:function(t) {
    if((t /= 1 / 2) < 1) {
      return 1 / 2 * t * t * t * t * t
    }
    return 1 / 2 * ((t -= 2) * t * t * t * t + 2)
  }, easeInSine:function(t) {
    return-1 * Math.cos(t / 1 * (Math.PI / 2)) + 1
  }, easeOutSine:function(t) {
    return 1 * Math.sin(t / 1 * (Math.PI / 2))
  }, easeInOutSine:function(t) {
    return-1 / 2 * (Math.cos(Math.PI * t / 1) - 1)
  }, easeInExpo:function(t) {
    return t == 0 ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1))
  }, easeOutExpo:function(t) {
    return t == 1 ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1)
  }, easeInOutExpo:function(t) {
    if(t == 0) {
      return 0
    }
    if(t == 1) {
      return 1
    }
    if((t /= 1 / 2) < 1) {
      return 1 / 2 * Math.pow(2, 10 * (t - 1))
    }
    return 1 / 2 * (-Math.pow(2, -10 * --t) + 2)
  }, easeInCirc:function(t) {
    if(t >= 1) {
      return t
    }
    return-1 * (Math.sqrt(1 - (t /= 1) * t) - 1)
  }, easeOutCirc:function(t) {
    return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t)
  }, easeInOutCirc:function(t) {
    if((t /= 1 / 2) < 1) {
      return-1 / 2 * (Math.sqrt(1 - t * t) - 1)
    }
    return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1)
  }, easeInElastic:function(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if(t == 0) {
      return 0
    }
    if((t /= 1) == 1) {
      return 1
    }
    if(!p) {
      p = 1 * 0.3
    }
    if(a < Math.abs(1)) {
      a = 1;
      var s = p / 4
    }else {
      var s = p / (2 * Math.PI) * Math.asin(1 / a)
    }
    return-(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * 2 * Math.PI / p))
  }, easeOutElastic:function(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if(t == 0) {
      return 0
    }
    if((t /= 1) == 1) {
      return 1
    }
    if(!p) {
      p = 1 * 0.3
    }
    if(a < Math.abs(1)) {
      a = 1;
      var s = p / 4
    }else {
      var s = p / (2 * Math.PI) * Math.asin(1 / a)
    }
    return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * 2 * Math.PI / p) + 1
  }, easeInOutElastic:function(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if(t == 0) {
      return 0
    }
    if((t /= 1 / 2) == 2) {
      return 1
    }
    if(!p) {
      p = 1 * 0.3 * 1.5
    }
    if(a < Math.abs(1)) {
      a = 1;
      var s = p / 4
    }else {
      var s = p / (2 * Math.PI) * Math.asin(1 / a)
    }
    if(t < 1) {
      return-0.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * 2 * Math.PI / p)
    }
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * 2 * Math.PI / p) * 0.5 + 1
  }, easeInBack:function(t) {
    var s = 1.70158;
    return 1 * (t /= 1) * t * ((s + 1) * t - s)
  }, easeOutBack:function(t) {
    var s = 1.70158;
    return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1)
  }, easeInOutBack:function(t) {
    var s = 1.70158;
    if((t /= 1 / 2) < 1) {
      return 1 / 2 * t * t * (((s *= 1.525) + 1) * t - s)
    }
    return 1 / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2)
  }, easeInBounce:function(t) {
    return 1 - animationOptions.easeOutBounce(1 - t)
  }, easeOutBounce:function(t) {
    if((t /= 1) < 1 / 2.75) {
      return 1 * 7.5625 * t * t
    }else {
      if(t < 2 / 2.75) {
        return 1 * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
      }else {
        if(t < 2.5 / 2.75) {
          return 1 * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
        }else {
          return 1 * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375)
        }
      }
    }
  }, easeInOutBounce:function(t) {
    if(t < 1 / 2) {
      return animationOptions.easeInBounce(t * 2) * 0.5
    }
    return animationOptions.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5
  }};
  this.tooltips = [], defaults = {tooltips:{background:"rgba(0,0,0,0.6)", fontFamily:"'Arial'", fontStyle:"normal", fontColor:"white", fontSize:"12px", labelTemplate:"<%=label%>: <%=value%>", padding:{top:10, right:10, bottom:10, left:10}, offset:{left:0, top:0}, border:{width:0, color:"#000"}, showHighlight:true, highlight:{stroke:{width:1, color:"rgba(230,230,230,0.25)"}, fill:"rgba(255,255,255,0.25)"}}}, options = options ? mergeChartConfig(defaults, options) : defaults;
  function registerTooltip(ctx, areaObj, data, type) {
    chart.tooltips.push(new Tooltip(ctx, areaObj, data, type))
  }
  var Tooltip = function(ctx, areaObj, data, type) {
    this.ctx = ctx;
    this.areaObj = areaObj;
    this.data = data;
    this.savedState = null;
    this.highlightState = null;
    this.x = null;
    this.y = null;
    this.inRange = function(x, y) {
      if(this.areaObj.type) {
        switch(this.areaObj.type) {
          case "rect":
            return x >= this.areaObj.x && x <= this.areaObj.x + this.areaObj.width && y >= this.areaObj.y && y <= this.areaObj.y + this.areaObj.height;
            break;
          case "circle":
            return Math.pow(x - this.areaObj.x, 2) + Math.pow(y - this.areaObj.y, 2) < Math.pow(this.areaObj.r, 2);
            break;
          case "shape":
            var poly = this.areaObj.points;
            for(var c = false, i = -1, l = poly.length, j = l - 1;++i < l;j = i) {
              (poly[i].y <= y && y < poly[j].y || poly[j].y <= y && y < poly[i].y) && x < (poly[j].x - poly[i].x) * (y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x && (c = !c)
            }
            return c;
            break
        }
      }
    };
    this.render = function(x, y) {
      if(this.savedState == null) {
        this.ctx.putImageData(chart.savedState, 0, 0);
        this.savedState = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      }
      this.ctx.putImageData(this.savedState, 0, 0);
      if(options.tooltips.showHighlight) {
        if(this.highlightState == null) {
          this.ctx.strokeStyle = options.tooltips.highlight.stroke.color;
          this.ctx.lineWidth = options.tooltips.highlight.stroke.width;
          this.ctx.fillStyle = options.tooltips.highlight.fill;
          switch(this.areaObj.type) {
            case "rect":
              this.ctx.strokeRect(this.areaObj.x, this.areaObj.y, this.areaObj.width, this.areaObj.height);
              this.ctx.fillStyle = options.tooltips.highlight.fill;
              this.ctx.fillRect(this.areaObj.x, this.areaObj.y, this.areaObj.width, this.areaObj.height);
              break;
            case "circle":
              this.ctx.beginPath();
              this.ctx.arc(this.areaObj.x, this.areaObj.y, this.areaObj.r, 0, 2 * Math.PI, false);
              this.ctx.stroke();
              this.ctx.fill();
              break;
            case "shape":
              this.ctx.beginPath();
              this.ctx.moveTo(this.areaObj.points[0].x, this.areaObj.points[0].y);
              for(var p in this.areaObj.points) {
                this.ctx.lineTo(this.areaObj.points[p].x, this.areaObj.points[p].y)
              }
              this.ctx.stroke();
              this.ctx.fill();
              break
          }
          this.highlightState = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        }else {
          this.ctx.putImageData(this.highlightState, 0, 0)
        }
      }
      var posX = x + options.tooltips.offset.left, posY = y + options.tooltips.offset.top, tpl = tmpl(options.tooltips.labelTemplate, this.data), rectWidth = options.tooltips.padding.left + this.ctx.measureText(tpl).width + options.tooltips.padding.right;
      if(posX + rectWidth > ctx.canvas.width) {
        posX -= posX - rectWidth < 0 ? posX : rectWidth
      }
      if(posY + 24 > ctx.canvas.height) {
        posY -= 24
      }
      this.ctx.fillStyle = options.tooltips.background;
      this.ctx.fillRect(posX, posY, rectWidth, 24);
      if(options.tooltips.border.width > 0) {
        this.ctx.fillStyle = options.tooltips.order.color;
        this.ctx.lineWidth = options.tooltips.border.width;
        this.ctx.strokeRect(posX, posY, rectWidth, 24)
      }
      this.ctx.font = options.tooltips.fontStyle + " " + options.tooltips.fontSize + " " + options.tooltips.fontFamily;
      this.ctx.fillStyle = options.tooltips.fontColor;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(tpl, posX + rectWidth / 2, posY + 12);
      this.x = x;
      this.y = y
    }
  };
  var width = context.canvas.width, height = context.canvas.height;
  this.savedState = null;
  function getPosition(e) {
    var xPosition = 0;
    var yPosition = 0;
    while(e) {
      xPosition += e.offsetLeft + e.clientLeft;
      yPosition += e.offsetTop + e.clientTop;
      e = e.offsetParent
    }
    if(window.pageXOffset > 0 || window.pageYOffset > 0) {
      xPosition -= window.pageXOffset;
      yPosition -= window.pageYOffset
    }else {
      if(document.body.scrollLeft > 0 || document.body.scrollTop > 0) {
        xPosition -= document.body.scrollLeft;
        yPosition -= document.body.scrollTop
      }
    }
    return{x:xPosition, y:yPosition}
  }
  function tooltipEventHandler(e) {
    if(chart.tooltips.length > 0) {
      chart.savedState = chart.savedState == null ? context.getImageData(0, 0, context.canvas.width, context.canvas.height) : chart.savedState;
      var rendered = 0;
      for(var i in chart.tooltips) {
        var position = getPosition(context.canvas), mx = e.clientX - position.x, my = e.clientY - position.y;
        if(chart.tooltips[i].inRange(mx, my)) {
          chart.tooltips[i].render(mx, my);
          rendered++
        }
      }
      if(rendered == 0) {
        context.putImageData(chart.savedState, 0, 0)
      }
    }
  }
  if(window.Touch) {
    context.canvas.ontouchstart = function(e) {
      e.clientX = e.targetTouches[0].clientX;
      e.clientY = e.targetTouches[0].clientY;
      tooltipEventHandler(e)
    };
    context.canvas.ontouchmove = function(e) {
      e.clientX = e.targetTouches[0].clientX;
      e.clientY = e.targetTouches[0].clientY;
      tooltipEventHandler(e)
    }
  }else {
    context.canvas.onmousemove = function(e) {
      tooltipEventHandler(e)
    }
  }
  context.canvas.onmouseout = function(e) {
    if(chart.savedState != null) {
      context.putImageData(chart.savedState, 0, 0)
    }
  };
  if(window.devicePixelRatio) {
    context.canvas.style.width = width + "px";
    context.canvas.style.height = height + "px";
    context.canvas.height = height * window.devicePixelRatio;
    context.canvas.width = width * window.devicePixelRatio;
    context.scale(window.devicePixelRatio, window.devicePixelRatio)
  }
  this.PolarArea = function(data, options) {
    chart.PolarArea.defaults = {scaleOverlay:true, scaleOverride:false, scaleSteps:null, scaleStepWidth:null, scaleStartValue:null, scaleShowLine:true, scaleLineColor:"rgba(0,0,0,.1)", scaleLineWidth:1, scaleShowLabels:true, scaleLabel:"<%=value%>", scaleFontFamily:"'Arial'", scaleFontSize:12, scaleFontStyle:"normal", scaleFontColor:"#666", scaleShowLabelBackdrop:true, scaleBackdropColor:"rgba(255,255,255,0.75)", scaleBackdropPaddingY:2, scaleBackdropPaddingX:2, segmentShowStroke:true, segmentStrokeColor:"#fff", 
    segmentStrokeWidth:2, animation:true, animationSteps:100, animationEasing:"easeOutBounce", animateRotate:true, animateScale:false, onAnimationComplete:null, showTooltips:true};
    var config = options ? mergeChartConfig(chart.PolarArea.defaults, options) : chart.PolarArea.defaults;
    return new PolarArea(data, config, context)
  };
  this.Radar = function(data, options) {
    chart.Radar.defaults = {scaleOverlay:false, scaleOverride:false, scaleSteps:null, scaleStepWidth:null, scaleStartValue:null, scaleShowLine:true, scaleLineColor:"rgba(0,0,0,.1)", scaleLineWidth:1, scaleShowLabels:false, scaleLabel:"<%=value%>", scaleFontFamily:"'Arial'", scaleFontSize:12, scaleFontStyle:"normal", scaleFontColor:"#666", scaleShowLabelBackdrop:true, scaleBackdropColor:"rgba(255,255,255,0.75)", scaleBackdropPaddingY:2, scaleBackdropPaddingX:2, angleShowLineOut:true, angleLineColor:"rgba(0,0,0,.1)", 
    angleLineWidth:1, pointLabelFontFamily:"'Arial'", pointLabelFontStyle:"normal", pointLabelFontSize:12, pointLabelFontColor:"#666", pointDot:true, pointDotRadius:3, pointDotStrokeWidth:1, datasetStroke:true, datasetStrokeWidth:2, datasetFill:true, animation:true, animationSteps:60, animationEasing:"easeOutQuart", onAnimationComplete:null, showTooltips:true};
    var config = options ? mergeChartConfig(chart.Radar.defaults, options) : chart.Radar.defaults;
    return new Radar(data, config, context)
  };
  this.Pie = function(data, options) {
    chart.Pie.defaults = {segmentShowStroke:true, segmentStrokeColor:"#fff", segmentStrokeWidth:2, animation:true, animationSteps:100, animationEasing:"easeOutBounce", animateRotate:true, animateScale:false, onAnimationComplete:null, labelFontFamily:"'Arial'", labelFontStyle:"normal", labelFontSize:12, labelFontColor:"#666", labelAlign:"right", showTooltips:true};
    var config = options ? mergeChartConfig(chart.Pie.defaults, options) : chart.Pie.defaults;
    return new Pie(data, config, context)
  };
  this.Doughnut = function(data, options) {
    chart.Doughnut.defaults = {segmentShowStroke:true, segmentStrokeColor:"#fff", segmentStrokeWidth:2, percentageInnerCutout:50, animation:true, animationSteps:100, animationEasing:"easeOutBounce", animateRotate:true, animateScale:false, onAnimationComplete:null, showTooltips:true};
    var config = options ? mergeChartConfig(chart.Doughnut.defaults, options) : chart.Doughnut.defaults;
    return new Doughnut(data, config, context)
  };
  this.Line = function(data, options) {
    chart.Line.defaults = {scaleOverlay:false, scaleOverride:false, scaleSteps:null, scaleStepWidth:null, scaleStartValue:null, scaleLineColor:"rgba(0,0,0,.1)", scaleLineWidth:1, scaleShowLabels:true, scaleLabel:"<%=value%>", scaleFontFamily:"'Arial'", scaleFontSize:12, scaleFontStyle:"normal", scaleFontColor:"#666", scaleShowGridLines:true, scaleGridLineColor:"rgba(0,0,0,.05)", scaleGridLineWidth:1, bezierCurve:true, pointDot:true, pointDotRadius:4, pointDotStrokeWidth:2, datasetStroke:true, datasetStrokeWidth:2, 
    datasetFill:true, animation:true, animationSteps:60, animationEasing:"easeOutQuart", onAnimationComplete:null, showTooltips:true};
    var config = options ? mergeChartConfig(chart.Line.defaults, options) : chart.Line.defaults;
    return new Line(data, config, context)
  };
  this.Bar = function(data, options) {
    chart.Bar.defaults = {scaleOverlay:false, scaleOverride:false, scaleSteps:null, scaleStepWidth:null, scaleStartValue:null, scaleLineColor:"rgba(0,0,0,.1)", scaleLineWidth:1, scaleShowLabels:true, scaleLabel:"<%=value%>", scaleFontFamily:"'Arial'", scaleFontSize:12, scaleFontStyle:"normal", scaleFontColor:"#666", scaleShowGridLines:true, scaleGridLineColor:"rgba(0,0,0,.05)", scaleGridLineWidth:1, barShowStroke:true, barStrokeWidth:2, barValueSpacing:5, barDatasetSpacing:1, animation:true, animationSteps:60, 
    animationEasing:"easeOutQuart", onAnimationComplete:null, showTooltips:true};
    var config = options ? mergeChartConfig(chart.Bar.defaults, options) : chart.Bar.defaults;
    return new Bar(data, config, context)
  };
  var clear = function(c) {
    c.clearRect(0, 0, width, height)
  };
  var PolarArea = function(data, config, ctx) {
    var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString;
    calculateDrawingSizes();
    valueBounds = getValueBounds();
    labelTemplateString = config.scaleShowLabels ? config.scaleLabel : null;
    if(!config.scaleOverride) {
      calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString)
    }else {
      calculatedScale = {steps:config.scaleSteps, stepValue:config.scaleStepWidth, graphMin:config.scaleStartValue, labels:[]};
      populateLabels(labelTemplateString, calculatedScale.labels, calculatedScale.steps, config.scaleStartValue, config.scaleStepWidth)
    }
    scaleHop = maxSize / calculatedScale.steps;
    animationLoop(config, drawScale, drawAllSegments, ctx);
    function calculateDrawingSizes() {
      maxSize = Min([width, height]) / 2;
      maxSize -= Max([config.scaleFontSize * 0.5, config.scaleLineWidth * 0.5]);
      labelHeight = config.scaleFontSize * 2;
      if(config.scaleShowLabelBackdrop) {
        labelHeight += 2 * config.scaleBackdropPaddingY;
        maxSize -= config.scaleBackdropPaddingY * 1.5
      }
      scaleHeight = maxSize;
      labelHeight = Default(labelHeight, 5)
    }
    function drawScale() {
      for(var i = 0;i < calculatedScale.steps;i++) {
        if(config.scaleShowLine) {
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, scaleHop * (i + 1), 0, Math.PI * 2, true);
          ctx.strokeStyle = config.scaleLineColor;
          ctx.lineWidth = config.scaleLineWidth;
          ctx.stroke()
        }
        if(config.scaleShowLabels) {
          ctx.textAlign = "center";
          ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
          var label = calculatedScale.labels[i];
          if(config.scaleShowLabelBackdrop) {
            var textWidth = ctx.measureText(label).width;
            ctx.fillStyle = config.scaleBackdropColor;
            ctx.beginPath();
            ctx.rect(Math.round(width / 2 - textWidth / 2 - config.scaleBackdropPaddingX), Math.round(height / 2 - scaleHop * (i + 1) - config.scaleFontSize * 0.5 - config.scaleBackdropPaddingY), Math.round(textWidth + config.scaleBackdropPaddingX * 2), Math.round(config.scaleFontSize + config.scaleBackdropPaddingY * 2));
            ctx.fill()
          }
          ctx.textBaseline = "middle";
          ctx.fillStyle = config.scaleFontColor;
          ctx.fillText(label, width / 2, height / 2 - scaleHop * (i + 1))
        }
      }
    }
    function drawAllSegments(animationDecimal) {
      var startAngle = -Math.PI / 2, angleStep = Math.PI * 2 / data.length, scaleAnimation = 1, rotateAnimation = 1;
      if(config.animation) {
        if(config.animateScale) {
          scaleAnimation = animationDecimal
        }
        if(config.animateRotate) {
          rotateAnimation = animationDecimal
        }
      }
      for(var i = 0;i < data.length;i++) {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, scaleAnimation * calculateOffset(data[i].value, calculatedScale, scaleHop), startAngle, startAngle + rotateAnimation * angleStep, false);
        ctx.lineTo(width / 2, height / 2);
        ctx.closePath();
        ctx.fillStyle = data[i].color;
        ctx.fill();
        if(animationDecimal >= 1 && config.showTooltips) {
          var points = [{x:width / 2, y:height / 2}], pAmount = 50, radius = calculateOffset(data[i].value, calculatedScale, scaleHop);
          points.push({x:width / 2 + radius * Math.cos(startAngle), y:height / 2 + radius * Math.sin(startAngle)});
          for(var p = 0;p <= pAmount;p++) {
            points.push({x:width / 2 + radius * Math.cos(startAngle + p / pAmount * rotateAnimation * angleStep), y:height / 2 + radius * Math.sin(startAngle + p / pAmount * rotateAnimation * angleStep)})
          }
          registerTooltip(ctx, {type:"shape", points:points}, {label:data[i].label, value:data[i].value}, "PolarArea")
        }
        if(config.segmentShowStroke) {
          ctx.strokeStyle = config.segmentStrokeColor;
          ctx.lineWidth = config.segmentStrokeWidth;
          ctx.stroke()
        }
        startAngle += rotateAnimation * angleStep
      }
    }
    function getValueBounds() {
      var upperValue = Number.MIN_VALUE;
      var lowerValue = Number.MAX_VALUE;
      for(var i = 0;i < data.length;i++) {
        if(data[i].value > upperValue) {
          upperValue = data[i].value
        }
        if(data[i].value < lowerValue) {
          lowerValue = data[i].value
        }
      }
      var maxSteps = Math.floor(scaleHeight / (labelHeight * 0.66));
      var minSteps = Math.floor(scaleHeight / labelHeight * 0.5);
      return{maxValue:upperValue, minValue:lowerValue, maxSteps:maxSteps, minSteps:minSteps}
    }
  };
  var Radar = function(data, config, ctx) {
    var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString;
    if(!data.labels) {
      data.labels = []
    }
    calculateDrawingSizes();
    var valueBounds = getValueBounds();
    labelTemplateString = config.scaleShowLabels ? config.scaleLabel : null;
    if(!config.scaleOverride) {
      calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString)
    }else {
      calculatedScale = {steps:config.scaleSteps, stepValue:config.scaleStepWidth, graphMin:config.scaleStartValue, labels:[]};
      populateLabels(labelTemplateString, calculatedScale.labels, calculatedScale.steps, config.scaleStartValue, config.scaleStepWidth)
    }
    scaleHop = maxSize / calculatedScale.steps;
    animationLoop(config, drawScale, drawAllDataPoints, ctx);
    function drawAllDataPoints(animationDecimal) {
      var rotationDegree = 2 * Math.PI / data.datasets[0].data.length;
      ctx.save();
      ctx.translate(width / 2, height / 2);
      for(var i = 0;i < data.datasets.length;i++) {
        var offset = calculateOffset(data.datasets[i].data[0], calculatedScale, scaleHop);
        ctx.beginPath();
        ctx.moveTo(0, animationDecimal * -1 * offset);
        if(animationDecimal >= 1 && config.showTooltips) {
          var curX = width / 2 + offset * Math.cos(0 - Math.PI / 2), curY = height / 2 + offset * Math.sin(0 - Math.PI / 2), pointRadius = config.pointDot ? config.pointDotRadius + config.pointDotStrokeWidth : 10, ttData = data.labels[0].trim() != "" ? data.labels[0] + ": " + data.datasets[i].data[0] : data.datasets[i].data[0];
          registerTooltip(ctx, {type:"circle", x:curX, y:curY, r:pointRadius}, {label:data.labels[0], value:data.datasets[i].data[0]}, "Radar")
        }
        for(var j = 1;j < data.datasets[i].data.length;j++) {
          offset = calculateOffset(data.datasets[i].data[j], calculatedScale, scaleHop);
          ctx.rotate(rotationDegree);
          ctx.lineTo(0, animationDecimal * -1 * offset);
          if(animationDecimal >= 1 && config.showTooltips) {
            var curX = width / 2 + offset * Math.cos(j * rotationDegree - Math.PI / 2), curY = height / 2 + offset * Math.sin(j * rotationDegree - Math.PI / 2), pointRadius = config.pointDot ? config.pointDotRadius + config.pointDotStrokeWidth : 10, ttData = data.labels[j].trim() != "" ? data.labels[j] + ": " + data.datasets[i].data[j] : data.datasets[i].data[j];
            registerTooltip(ctx, {type:"circle", x:curX, y:curY, r:pointRadius}, {label:data.labels[j], value:data.datasets[i].data[j]}, "Radar")
          }
        }
        ctx.closePath();
        ctx.fillStyle = data.datasets[i].fillColor;
        ctx.strokeStyle = data.datasets[i].strokeColor;
        ctx.lineWidth = config.datasetStrokeWidth;
        ctx.fill();
        ctx.stroke();
        if(config.pointDot) {
          ctx.fillStyle = data.datasets[i].pointColor;
          ctx.strokeStyle = data.datasets[i].pointStrokeColor;
          ctx.lineWidth = config.pointDotStrokeWidth;
          for(var k = 0;k < data.datasets[i].data.length;k++) {
            ctx.rotate(rotationDegree);
            ctx.beginPath();
            ctx.arc(0, animationDecimal * -1 * calculateOffset(data.datasets[i].data[k], calculatedScale, scaleHop), config.pointDotRadius, 2 * Math.PI, false);
            ctx.fill();
            ctx.stroke()
          }
        }
        ctx.rotate(rotationDegree)
      }
      ctx.restore()
    }
    function drawScale() {
      var rotationDegree = 2 * Math.PI / data.datasets[0].data.length;
      ctx.save();
      ctx.translate(width / 2, height / 2);
      if(config.angleShowLineOut) {
        ctx.strokeStyle = config.angleLineColor;
        ctx.lineWidth = config.angleLineWidth;
        for(var h = 0;h < data.datasets[0].data.length;h++) {
          ctx.rotate(rotationDegree);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -maxSize);
          ctx.stroke()
        }
      }
      for(var i = 0;i < calculatedScale.steps;i++) {
        ctx.beginPath();
        if(config.scaleShowLine) {
          ctx.strokeStyle = config.scaleLineColor;
          ctx.lineWidth = config.scaleLineWidth;
          ctx.moveTo(0, -scaleHop * (i + 1));
          for(var j = 0;j < data.datasets[0].data.length;j++) {
            ctx.rotate(rotationDegree);
            ctx.lineTo(0, -scaleHop * (i + 1))
          }
          ctx.closePath();
          ctx.stroke()
        }
        if(config.scaleShowLabels) {
          ctx.textAlign = "center";
          ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
          ctx.textBaseline = "middle";
          if(config.scaleShowLabelBackdrop) {
            var textWidth = ctx.measureText(calculatedScale.labels[i]).width;
            ctx.fillStyle = config.scaleBackdropColor;
            ctx.beginPath();
            ctx.rect(Math.round(-textWidth / 2 - config.scaleBackdropPaddingX), Math.round(-scaleHop * (i + 1) - config.scaleFontSize * 0.5 - config.scaleBackdropPaddingY), Math.round(textWidth + config.scaleBackdropPaddingX * 2), Math.round(config.scaleFontSize + config.scaleBackdropPaddingY * 2));
            ctx.fill()
          }
          ctx.fillStyle = config.scaleFontColor;
          ctx.fillText(calculatedScale.labels[i], 0, -scaleHop * (i + 1))
        }
      }
      for(var k = 0;k < data.labels.length;k++) {
        ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize + "px " + config.pointLabelFontFamily;
        ctx.fillStyle = config.pointLabelFontColor;
        var opposite = Math.sin(rotationDegree * k) * (maxSize + config.pointLabelFontSize);
        var adjacent = Math.cos(rotationDegree * k) * (maxSize + config.pointLabelFontSize);
        if(rotationDegree * k == Math.PI || rotationDegree * k == 0) {
          ctx.textAlign = "center"
        }else {
          if(rotationDegree * k > Math.PI) {
            ctx.textAlign = "right"
          }else {
            ctx.textAlign = "left"
          }
        }
        ctx.textBaseline = "middle";
        ctx.fillText(data.labels[k], opposite, -adjacent)
      }
      ctx.restore()
    }
    function calculateDrawingSizes() {
      maxSize = Min([width, height]) / 2;
      labelHeight = config.scaleFontSize * 2;
      var labelLength = 0;
      for(var i = 0;i < data.labels.length;i++) {
        ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize + "px " + config.pointLabelFontFamily;
        var textMeasurement = ctx.measureText(data.labels[i]).width;
        if(textMeasurement > labelLength) {
          labelLength = textMeasurement
        }
      }
      maxSize -= Max([labelLength, config.pointLabelFontSize / 2 * 1.5]);
      maxSize -= config.pointLabelFontSize;
      maxSize = CapValue(maxSize, null, 0);
      scaleHeight = maxSize;
      labelHeight = Default(labelHeight, 5)
    }
    function getValueBounds() {
      var upperValue = Number.MIN_VALUE;
      var lowerValue = Number.MAX_VALUE;
      for(var i = 0;i < data.datasets.length;i++) {
        for(var j = 0;j < data.datasets[i].data.length;j++) {
          if(data.datasets[i].data[j] > upperValue) {
            upperValue = data.datasets[i].data[j]
          }
          if(data.datasets[i].data[j] < lowerValue) {
            lowerValue = data.datasets[i].data[j]
          }
        }
      }
      var maxSteps = Math.floor(scaleHeight / (labelHeight * 0.66));
      var minSteps = Math.floor(scaleHeight / labelHeight * 0.5);
      return{maxValue:upperValue, minValue:lowerValue, maxSteps:maxSteps, minSteps:minSteps}
    }
  };
  var Pie = function(data, config, ctx) {
    var segmentTotal = 0;
    var pieRadius = Min([height / 2, width / 2]) - 5;
    for(var i = 0;i < data.length;i++) {
      segmentTotal += data[i].value
    }
    ctx.fillStyle = "black";
    ctx.textBaseline = "base";
    animationLoop(config, null, drawPieSegments, ctx);
    function drawPieSegments(animationDecimal) {
      var cumulativeAngle = -Math.PI / 2, scaleAnimation = 1, rotateAnimation = 1;
      if(config.animation) {
        if(config.animateScale) {
          scaleAnimation = animationDecimal
        }
        if(config.animateRotate) {
          rotateAnimation = animationDecimal
        }
      }
      for(var i = 0;i < data.length;i++) {
        var segmentAngle = rotateAnimation * data[i].value / segmentTotal * Math.PI * 2;
        segmentAngle = Math.min(Math.PI * 1.999999, segmentAngle);
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, scaleAnimation * pieRadius, cumulativeAngle, cumulativeAngle + segmentAngle);
        ctx.lineTo(width / 2, height / 2);
        ctx.closePath();
        ctx.fillStyle = data[i].color;
        ctx.fill();
        if(data[i].label && scaleAnimation * pieRadius * 2 * segmentAngle / (2 * Math.PI) > config.labelFontSize) {
          function getPieLabelX(align, r) {
            switch(align) {
              case "left":
                return-r + 20;
                break;
              case "center":
                return-r / 2;
                break
            }
            return-10
          }
          function reversePieLabelAlign(align) {
            switch(align) {
              case "left":
                return"right";
                break;
              case "right":
                return"left";
                break;
              case "center":
                return align;
                break
            }
          }
          var fontSize = data[i].labelFontSize || config.labelFontSize + "px";
          if(fontSize.match(/^[0-9]+$/g) != null) {
            fontSize = fontSize + "px"
          }
          ctx.font = config.labelFontStyle + " " + fontSize + " " + config.labelFontFamily;
          ctx.fillStyle = getFadeColor(animationDecimal, data[i].labelColor || "black", data[i].color);
          ctx.textBaseline = "middle";
          var textRotation = -(cumulativeAngle + segmentAngle) + segmentAngle / 2, tX = width / 2 + scaleAnimation * pieRadius * Math.cos(textRotation), tY = height / 2 - scaleAnimation * pieRadius * Math.sin(textRotation);
          ctx.textAlign = data[i].labelAlign || config.labelAlign;
          textX = getPieLabelX(ctx.textAlign, scaleAnimation * pieRadius);
          if(textRotation < -Math.PI / 2) {
            textRotation -= Math.PI;
            ctx.textAlign = reversePieLabelAlign(ctx.textAlign);
            textX = -textX
          }
          ctx.translate(tX, tY);
          ctx.rotate(-textRotation);
          ctx.fillText(data[i].label, textX, 0);
          ctx.rotate(textRotation);
          ctx.translate(-tX, -tY)
        }
        if(animationDecimal >= 1 && config.showTooltips) {
          var points = [{x:width / 2, y:height / 2}], pAmount = 50;
          points.push({x:width / 2 + pieRadius * Math.cos(cumulativeAngle), y:height / 2 + pieRadius * Math.sin(cumulativeAngle)});
          for(var p = 0;p <= pAmount;p++) {
            points.push({x:width / 2 + pieRadius * Math.cos(cumulativeAngle + p / pAmount * segmentAngle), y:height / 2 + pieRadius * Math.sin(cumulativeAngle + p / pAmount * segmentAngle)})
          }
          registerTooltip(ctx, {type:"shape", points:points}, {label:data[i].label, value:data[i].value}, "Pie")
        }
        if(config.segmentShowStroke) {
          ctx.lineWidth = config.segmentStrokeWidth;
          ctx.strokeStyle = config.segmentStrokeColor;
          ctx.stroke()
        }
        cumulativeAngle += segmentAngle
      }
    }
  };
  var Doughnut = function(data, config, ctx) {
    var segmentTotal = 0;
    var doughnutRadius = Min([height / 2, width / 2]) - 5;
    var cutoutRadius = doughnutRadius * (config.percentageInnerCutout / 100);
    for(var i = 0;i < data.length;i++) {
      segmentTotal += data[i].value
    }
    animationLoop(config, null, drawPieSegments, ctx);
    function drawPieSegments(animationDecimal) {
      var cumulativeAngle = -Math.PI / 2, scaleAnimation = 1, rotateAnimation = 1;
      if(config.animation) {
        if(config.animateScale) {
          scaleAnimation = animationDecimal
        }
        if(config.animateRotate) {
          rotateAnimation = animationDecimal
        }
      }
      for(var i = 0;i < data.length;i++) {
        var segmentAngle = rotateAnimation * data[i].value / segmentTotal * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, scaleAnimation * doughnutRadius, cumulativeAngle, cumulativeAngle + segmentAngle, false);
        ctx.arc(width / 2, height / 2, scaleAnimation * cutoutRadius, cumulativeAngle + segmentAngle, cumulativeAngle, true);
        ctx.closePath();
        ctx.fillStyle = data[i].color;
        ctx.fill();
        if(animationDecimal >= 1 && config.showTooltips) {
          var points = [], pAmount = 50;
          points.push({x:width / 2 + doughnutRadius * Math.cos(cumulativeAngle), y:height / 2 + doughnutRadius * Math.sin(cumulativeAngle)});
          for(var p = 0;p <= pAmount;p++) {
            points.push({x:width / 2 + doughnutRadius * Math.cos(cumulativeAngle + p / pAmount * segmentAngle), y:height / 2 + doughnutRadius * Math.sin(cumulativeAngle + p / pAmount * segmentAngle)})
          }
          points.push({x:width / 2 + cutoutRadius * Math.cos(cumulativeAngle + segmentAngle), y:height / 2 + cutoutRadius * Math.sin(cumulativeAngle + segmentAngle)});
          for(var p = pAmount;p >= 0;p--) {
            points.push({x:width / 2 + cutoutRadius * Math.cos(cumulativeAngle + p / pAmount * segmentAngle), y:height / 2 + cutoutRadius * Math.sin(cumulativeAngle + p / pAmount * segmentAngle)})
          }
          registerTooltip(ctx, {type:"shape", points:points}, {label:data[i].label, value:data[i].value}, "Doughnut")
        }
        if(config.segmentShowStroke) {
          ctx.lineWidth = config.segmentStrokeWidth;
          ctx.strokeStyle = config.segmentStrokeColor;
          ctx.stroke()
        }
        cumulativeAngle += segmentAngle
      }
    }
  };
  var Line = function(data, config, ctx) {
    var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop, widestXLabel, xAxisLength, yAxisPosX, xAxisPosY, rotateLabels = 0;
    calculateDrawingSizes();
    valueBounds = getValueBounds();
    labelTemplateString = config.scaleShowLabels ? config.scaleLabel : "";
    if(!config.scaleOverride) {
      calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString)
    }else {
      calculatedScale = {steps:config.scaleSteps, stepValue:config.scaleStepWidth, graphMin:config.scaleStartValue, labels:[]};
      populateLabels(labelTemplateString, calculatedScale.labels, calculatedScale.steps, config.scaleStartValue, config.scaleStepWidth)
    }
    scaleHop = Math.floor(scaleHeight / calculatedScale.steps);
    calculateXAxisSize();
    animationLoop(config, drawScale, drawLines, ctx);
    function drawLines(animPc) {
      for(var i = 0;i < data.datasets.length;i++) {
        ctx.strokeStyle = data.datasets[i].strokeColor;
        ctx.lineWidth = config.datasetStrokeWidth;
        ctx.beginPath();
        ctx.moveTo(yAxisPosX, xAxisPosY - animPc * calculateOffset(data.datasets[i].data[0], calculatedScale, scaleHop));
        for(var j = 1;j < data.datasets[i].data.length;j++) {
          if(config.bezierCurve) {
            ctx.bezierCurveTo(xPos(j - 0.5), yPos(i, j - 1), xPos(j - 0.5), yPos(i, j), xPos(j), yPos(i, j))
          }else {
            ctx.lineTo(xPos(j), yPos(i, j))
          }
        }
        var pointRadius = config.pointDot ? config.pointDotRadius + config.pointDotStrokeWidth : 10;
        for(var j = 0;j < data.datasets[i].data.length;j++) {
          if(animPc >= 1 && config.showTooltips) {
            registerTooltip(ctx, {type:"circle", x:xPos(j), y:yPos(i, j), r:pointRadius}, {label:data.labels[j], value:data.datasets[i].data[j]}, "Line")
          }
        }
        ctx.stroke();
        if(config.datasetFill) {
          ctx.lineTo(yAxisPosX + valueHop * (data.datasets[i].data.length - 1), xAxisPosY);
          ctx.lineTo(yAxisPosX, xAxisPosY);
          ctx.closePath();
          ctx.fillStyle = data.datasets[i].fillColor;
          ctx.fill()
        }else {
          ctx.closePath()
        }
        if(config.pointDot) {
          ctx.fillStyle = data.datasets[i].pointColor;
          ctx.strokeStyle = data.datasets[i].pointStrokeColor;
          ctx.lineWidth = config.pointDotStrokeWidth;
          for(var k = 0;k < data.datasets[i].data.length;k++) {
            ctx.beginPath();
            ctx.arc(yAxisPosX + valueHop * k, xAxisPosY - animPc * calculateOffset(data.datasets[i].data[k], calculatedScale, scaleHop), config.pointDotRadius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.stroke()
          }
        }
      }
      function yPos(dataSet, iteration) {
        return xAxisPosY - animPc * calculateOffset(data.datasets[dataSet].data[iteration], calculatedScale, scaleHop)
      }
      function xPos(iteration) {
        return yAxisPosX + valueHop * iteration
      }
    }
    function drawScale() {
      ctx.lineWidth = config.scaleLineWidth;
      ctx.strokeStyle = config.scaleLineColor;
      ctx.beginPath();
      ctx.moveTo(width - widestXLabel / 2 + 5, xAxisPosY);
      ctx.lineTo(width - widestXLabel / 2 - xAxisLength - 5, xAxisPosY);
      ctx.stroke();
      if(rotateLabels > 0) {
        ctx.save();
        ctx.textAlign = "right"
      }else {
        ctx.textAlign = "center"
      }
      ctx.fillStyle = config.scaleFontColor;
      for(var i = 0;i < data.labels.length;i++) {
        ctx.save();
        if(rotateLabels > 0) {
          ctx.translate(yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize);
          ctx.rotate(-(rotateLabels * (Math.PI / 180)));
          ctx.fillText(data.labels[i], 0, 0);
          ctx.restore()
        }else {
          ctx.fillText(data.labels[i], yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize + 3)
        }
        ctx.beginPath();
        ctx.moveTo(yAxisPosX + i * valueHop, xAxisPosY + 3);
        if(config.scaleShowGridLines && i > 0) {
          ctx.lineWidth = config.scaleGridLineWidth;
          ctx.strokeStyle = config.scaleGridLineColor;
          ctx.lineTo(yAxisPosX + i * valueHop, 5)
        }else {
          ctx.lineTo(yAxisPosX + i * valueHop, xAxisPosY + 3)
        }
        ctx.stroke()
      }
      ctx.lineWidth = config.scaleLineWidth;
      ctx.strokeStyle = config.scaleLineColor;
      ctx.beginPath();
      ctx.moveTo(yAxisPosX, xAxisPosY + 5);
      ctx.lineTo(yAxisPosX, 5);
      ctx.stroke();
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for(var j = 0;j < calculatedScale.steps;j++) {
        ctx.beginPath();
        ctx.moveTo(yAxisPosX - 3, xAxisPosY - (j + 1) * scaleHop);
        if(config.scaleShowGridLines) {
          ctx.lineWidth = config.scaleGridLineWidth;
          ctx.strokeStyle = config.scaleGridLineColor;
          ctx.lineTo(yAxisPosX + xAxisLength + 5, xAxisPosY - (j + 1) * scaleHop)
        }else {
          ctx.lineTo(yAxisPosX - 0.5, xAxisPosY - (j + 1) * scaleHop)
        }
        ctx.stroke();
        if(config.scaleShowLabels) {
          ctx.fillText(calculatedScale.labels[j], yAxisPosX - 8, xAxisPosY - (j + 1) * scaleHop)
        }
      }
    }
    function calculateXAxisSize() {
      var longestText = 1;
      if(config.scaleShowLabels) {
        ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
        for(var i = 0;i < calculatedScale.labels.length;i++) {
          var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
          longestText = measuredText > longestText ? measuredText : longestText
        }
        longestText += 10
      }
      xAxisLength = width - longestText - widestXLabel;
      valueHop = Math.floor(xAxisLength / (data.labels.length - 1));
      yAxisPosX = width - widestXLabel / 2 - xAxisLength;
      xAxisPosY = scaleHeight + config.scaleFontSize / 2
    }
    function calculateDrawingSizes() {
      maxSize = height;
      ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
      widestXLabel = 1;
      for(var i = 0;i < data.labels.length;i++) {
        var textLength = ctx.measureText(data.labels[i]).width;
        widestXLabel = textLength > widestXLabel ? textLength : widestXLabel
      }
      if(width / data.labels.length < widestXLabel) {
        rotateLabels = 45;
        if(width / data.labels.length < Math.cos(rotateLabels) * widestXLabel) {
          rotateLabels = 90;
          maxSize -= widestXLabel
        }else {
          maxSize -= Math.sin(rotateLabels) * widestXLabel
        }
      }else {
        maxSize -= config.scaleFontSize
      }
      maxSize -= 5;
      labelHeight = config.scaleFontSize;
      maxSize -= labelHeight;
      scaleHeight = maxSize
    }
    function getValueBounds() {
      var upperValue = Number.MIN_VALUE;
      var lowerValue = Number.MAX_VALUE;
      for(var i = 0;i < data.datasets.length;i++) {
        for(var j = 0;j < data.datasets[i].data.length;j++) {
          if(data.datasets[i].data[j] > upperValue) {
            upperValue = data.datasets[i].data[j]
          }
          if(data.datasets[i].data[j] < lowerValue) {
            lowerValue = data.datasets[i].data[j]
          }
        }
      }
      var maxSteps = Math.floor(scaleHeight / (labelHeight * 0.66));
      var minSteps = Math.floor(scaleHeight / labelHeight * 0.5);
      return{maxValue:upperValue, minValue:lowerValue, maxSteps:maxSteps, minSteps:minSteps}
    }
  };
  var Bar = function(data, config, ctx) {
    var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop, widestXLabel, xAxisLength, yAxisPosX, xAxisPosY, barWidth, rotateLabels = 0;
    calculateDrawingSizes();
    valueBounds = getValueBounds();
    labelTemplateString = config.scaleShowLabels ? config.scaleLabel : "";
    if(!config.scaleOverride) {
      calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString)
    }else {
      calculatedScale = {steps:config.scaleSteps, stepValue:config.scaleStepWidth, graphMin:config.scaleStartValue, labels:[]};
      populateLabels(labelTemplateString, calculatedScale.labels, calculatedScale.steps, config.scaleStartValue, config.scaleStepWidth)
    }
    scaleHop = Math.floor(scaleHeight / calculatedScale.steps);
    calculateXAxisSize();
    animationLoop(config, drawScale, drawBars, ctx);
    function drawBars(animPc) {
      ctx.lineWidth = config.barStrokeWidth;
      for(var i = 0;i < data.datasets.length;i++) {
        ctx.fillStyle = data.datasets[i].fillColor;
        ctx.strokeStyle = data.datasets[i].strokeColor;
        for(var j = 0;j < data.datasets[i].data.length;j++) {
          var barOffset = yAxisPosX + config.barValueSpacing + valueHop * j + barWidth * i + config.barDatasetSpacing * i + config.barStrokeWidth * i;
          ctx.beginPath();
          ctx.moveTo(barOffset, xAxisPosY);
          ctx.lineTo(barOffset, xAxisPosY - animPc * calculateOffset(data.datasets[i].data[j], calculatedScale, scaleHop) + config.barStrokeWidth / 2);
          ctx.lineTo(barOffset + barWidth, xAxisPosY - animPc * calculateOffset(data.datasets[i].data[j], calculatedScale, scaleHop) + config.barStrokeWidth / 2);
          ctx.lineTo(barOffset + barWidth, xAxisPosY);
          if(config.barShowStroke) {
            ctx.stroke()
          }
          ctx.closePath();
          ctx.fill();
          if(animPc >= 1 && config.showTooltips) {
            var x = barOffset, height = calculateOffset(data.datasets[i].data[j], calculatedScale, scaleHop), y = xAxisPosY - height, width = barWidth;
            registerTooltip(ctx, {type:"rect", x:x, y:y, width:width, height:height}, {label:data.labels[j], value:data.datasets[i].data[j]}, "Bar")
          }
        }
      }
    }
    function drawScale() {
      ctx.lineWidth = config.scaleLineWidth;
      ctx.strokeStyle = config.scaleLineColor;
      ctx.beginPath();
      ctx.moveTo(width - widestXLabel / 2 + 5, xAxisPosY);
      ctx.lineTo(width - widestXLabel / 2 - xAxisLength - 5, xAxisPosY);
      ctx.stroke();
      if(rotateLabels > 0) {
        ctx.save();
        ctx.textAlign = "right"
      }else {
        ctx.textAlign = "center"
      }
      ctx.fillStyle = config.scaleFontColor;
      for(var i = 0;i < data.labels.length;i++) {
        ctx.save();
        if(rotateLabels > 0) {
          ctx.translate(yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize);
          ctx.rotate(-(rotateLabels * (Math.PI / 180)));
          ctx.fillText(data.labels[i], 0, 0);
          ctx.restore()
        }else {
          ctx.fillText(data.labels[i], yAxisPosX + i * valueHop + valueHop / 2, xAxisPosY + config.scaleFontSize + 3)
        }
        ctx.beginPath();
        ctx.moveTo(yAxisPosX + (i + 1) * valueHop, xAxisPosY + 3);
        ctx.lineWidth = config.scaleGridLineWidth;
        ctx.strokeStyle = config.scaleGridLineColor;
        ctx.lineTo(yAxisPosX + (i + 1) * valueHop, 5);
        ctx.stroke()
      }
      ctx.lineWidth = config.scaleLineWidth;
      ctx.strokeStyle = config.scaleLineColor;
      ctx.beginPath();
      ctx.moveTo(yAxisPosX, xAxisPosY + 5);
      ctx.lineTo(yAxisPosX, 5);
      ctx.stroke();
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for(var j = 0;j < calculatedScale.steps;j++) {
        ctx.beginPath();
        ctx.moveTo(yAxisPosX - 3, xAxisPosY - (j + 1) * scaleHop);
        if(config.scaleShowGridLines) {
          ctx.lineWidth = config.scaleGridLineWidth;
          ctx.strokeStyle = config.scaleGridLineColor;
          ctx.lineTo(yAxisPosX + xAxisLength + 5, xAxisPosY - (j + 1) * scaleHop)
        }else {
          ctx.lineTo(yAxisPosX - 0.5, xAxisPosY - (j + 1) * scaleHop)
        }
        ctx.stroke();
        if(config.scaleShowLabels) {
          ctx.fillText(calculatedScale.labels[j], yAxisPosX - 8, xAxisPosY - (j + 1) * scaleHop)
        }
      }
    }
    function calculateXAxisSize() {
      var longestText = 1;
      if(config.scaleShowLabels) {
        ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
        for(var i = 0;i < calculatedScale.labels.length;i++) {
          var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
          longestText = measuredText > longestText ? measuredText : longestText
        }
        longestText += 10
      }
      xAxisLength = width - longestText - widestXLabel;
      valueHop = Math.floor(xAxisLength / data.labels.length);
      barWidth = (valueHop - config.scaleGridLineWidth * 2 - config.barValueSpacing * 2 - (config.barDatasetSpacing * data.datasets.length - 1) - (config.barStrokeWidth / 2 * data.datasets.length - 1)) / data.datasets.length;
      yAxisPosX = width - widestXLabel / 2 - xAxisLength;
      xAxisPosY = scaleHeight + config.scaleFontSize / 2
    }
    function calculateDrawingSizes() {
      maxSize = height;
      ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
      widestXLabel = 1;
      for(var i = 0;i < data.labels.length;i++) {
        var textLength = ctx.measureText(data.labels[i]).width;
        widestXLabel = textLength > widestXLabel ? textLength : widestXLabel
      }
      if(width / data.labels.length < widestXLabel) {
        rotateLabels = 45;
        if(width / data.labels.length < Math.cos(rotateLabels) * widestXLabel) {
          rotateLabels = 90;
          maxSize -= widestXLabel
        }else {
          maxSize -= Math.sin(rotateLabels) * widestXLabel
        }
      }else {
        maxSize -= config.scaleFontSize
      }
      maxSize -= 5;
      labelHeight = config.scaleFontSize;
      maxSize -= labelHeight;
      scaleHeight = maxSize
    }
    function getValueBounds() {
      var upperValue = Number.MIN_VALUE;
      var lowerValue = Number.MAX_VALUE;
      for(var i = 0;i < data.datasets.length;i++) {
        for(var j = 0;j < data.datasets[i].data.length;j++) {
          if(data.datasets[i].data[j] > upperValue) {
            upperValue = data.datasets[i].data[j]
          }
          if(data.datasets[i].data[j] < lowerValue) {
            lowerValue = data.datasets[i].data[j]
          }
        }
      }
      var maxSteps = Math.floor(scaleHeight / (labelHeight * 0.66));
      var minSteps = Math.floor(scaleHeight / labelHeight * 0.5);
      return{maxValue:upperValue, minValue:lowerValue, maxSteps:maxSteps, minSteps:minSteps}
    }
  };
  function calculateOffset(val, calculatedScale, scaleHop) {
    var outerValue = calculatedScale.steps * calculatedScale.stepValue;
    var adjustedValue = val - calculatedScale.graphMin;
    var scalingFactor = CapValue(adjustedValue / outerValue, 1, 0);
    return scaleHop * calculatedScale.steps * scalingFactor
  }
  function animationLoop(config, drawScale, drawData, ctx) {
    var animFrameAmount = config.animation ? 1 / CapValue(config.animationSteps, Number.MAX_VALUE, 1) : 1, easingFunction = animationOptions[config.animationEasing], percentAnimComplete = config.animation ? 0 : 1;
    if(typeof drawScale !== "function") {
      drawScale = function() {
      }
    }
    requestAnimFrame(animLoop);
    function animateFrame() {
      var easeAdjustedAnimationPercent = config.animation ? CapValue(easingFunction(percentAnimComplete), null, 0) : 1;
      clear(ctx);
      if(config.scaleOverlay) {
        drawData(easeAdjustedAnimationPercent);
        drawScale()
      }else {
        drawScale();
        drawData(easeAdjustedAnimationPercent)
      }
    }
    function animLoop() {
      percentAnimComplete += animFrameAmount;
      animateFrame();
      if(percentAnimComplete <= 1) {
        requestAnimFrame(animLoop)
      }else {
        if(typeof config.onAnimationComplete == "function") {
          config.onAnimationComplete()
        }
      }
    }
  }
  var requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1E3 / 60)
    }
  }();
  function calculateScale(drawingHeight, maxSteps, minSteps, maxValue, minValue, labelTemplateString) {
    var graphMin, graphMax, graphRange, stepValue, numberOfSteps, valueRange, rangeOrderOfMagnitude, decimalNum;
    valueRange = maxValue - minValue;
    rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);
    graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
    graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
    graphRange = graphMax - graphMin;
    stepValue = Math.pow(10, rangeOrderOfMagnitude);
    numberOfSteps = Math.round(graphRange / stepValue);
    while(numberOfSteps < minSteps || numberOfSteps > maxSteps) {
      if(numberOfSteps < minSteps) {
        stepValue /= 2;
        numberOfSteps = Math.round(graphRange / stepValue)
      }else {
        stepValue *= 2;
        numberOfSteps = Math.round(graphRange / stepValue)
      }
    }
    var labels = [];
    populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue);
    return{steps:numberOfSteps, stepValue:stepValue, graphMin:graphMin, labels:labels};
    function calculateOrderOfMagnitude(val) {
      return Math.floor(Math.log(val) / Math.LN10)
    }
  }
  function populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue) {
    if(labelTemplateString) {
      for(var i = 1;i < numberOfSteps + 1;i++) {
        labels.push(tmpl(labelTemplateString, {value:(graphMin + stepValue * i).toFixed(getDecimalPlaces(stepValue))}))
      }
    }
  }
  function populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue) {
    if(labelTemplateString) {
      for(var i = 1;i < numberOfSteps + 1;i++) {
        labels.push(tmpl(labelTemplateString, {value:(graphMin + stepValue * i).toFixed(getDecimalPlaces(stepValue))}))
      }
    }
  }
  function Max(array) {
    return Math.max.apply(Math, array)
  }
  function Min(array) {
    return Math.min.apply(Math, array)
  }
  function Default(userDeclared, valueIfFalse) {
    if(!userDeclared) {
      return valueIfFalse
    }else {
      return userDeclared
    }
  }
  function isNumber(n) {
    return!isNaN(parseFloat(n)) && isFinite(n)
  }
  function CapValue(valueToCap, maxValue, minValue) {
    if(isNumber(maxValue)) {
      if(valueToCap > maxValue) {
        return maxValue
      }
    }
    if(isNumber(minValue)) {
      if(valueToCap < minValue) {
        return minValue
      }
    }
    return valueToCap
  }
  function getDecimalPlaces(num) {
    var numberOfDecimalPlaces;
    if(num % 1 != 0) {
      return num.toString().split(".")[1].length
    }else {
      return 0
    }
  }
  function mergeChartConfig(defaults, userDefined) {
    var returnObj = {};
    for(var attrname in defaults) {
      returnObj[attrname] = defaults[attrname]
    }
    for(var attrname in userDefined) {
      if(typeof userDefined[attrname] === "object" && defaults[attrname]) {
        returnObj[attrname] = mergeChartConfig(defaults[attrname], userDefined[attrname])
      }else {
        returnObj[attrname] = userDefined[attrname]
      }
    }
    return returnObj
  }
  var cache = {};
  function tmpl(str, data) {
    var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
    return data ? fn(data) : fn
  }
  function getFadeColor(percent, primColor, secColor) {
    var pseudoEl = document.createElement("div"), rgbPrim, rgbSec;
    pseudoEl.style.color = primColor;
    document.body.appendChild(pseudoEl);
    rgbPrim = window.getComputedStyle(pseudoEl).color;
    pseudoEl.style.color = secColor;
    rgbSec = window.getComputedStyle(pseudoEl).color;
    var regex = /rgb *\( *([0-9]{1,3}) *, *([0-9]{1,3}) *, *([0-9]{1,3}) *\)/, valuesP = regex.exec(rgbPrim), valuesS = regex.exec(rgbSec), rP = Math.round(parseFloat(valuesP[1])), gP = Math.round(parseFloat(valuesP[2])), bP = Math.round(parseFloat(valuesP[3])), rS = Math.round(parseFloat(valuesS[1])), gS = Math.round(parseFloat(valuesS[2])), bS = Math.round(parseFloat(valuesS[3])), rCur = parseInt((rP - rS) * percent + rS), gCur = parseInt((gP - gS) * percent + gS), bCur = parseInt((bP - bS) * percent + 
    bS);
    pseudoEl.parentNode.removeChild(pseudoEl);
    return"rgb(" + rCur + "," + gCur + "," + bCur + ")"
  }
};
var VISH = VISH || {};
VISH.VERSION = "0.5";
VISH.AUTHORS = "GING";
VISH.URL = "http://github.com/ging/vish_editor";
VISH.Constant = VISH.Constant || {};
VISH.Constant.Edit = "Editor";
VISH.Constant.Viewer = "Viewer";
VISH.Constant.AnyMode = "Both";
VISH.Constant.NOSERVER = "noserver";
VISH.Constant.VISH = "vish";
VISH.Constant.STANDALONE = "node";
VISH.Constant.UA_IE = "Microsoft Internet Explorer";
VISH.Constant.UA_NETSCAPE = "Netscape";
VISH.Constant.IE = "Internet Explorer";
VISH.Constant.FIREFOX = "Mozilla Firefox";
VISH.Constant.CHROME = "Google Chrome";
VISH.Constant.SAFARI = "Safari";
VISH.Constant.ANDROID_BROWSER = "Android Browser";
VISH.Constant.EXTRA_SMALL = "extra-small";
VISH.Constant.SMALL = "small";
VISH.Constant.MEDIUM = "medium";
VISH.Constant.LARGE = "large";
VISH.Constant.THUMBNAIL = "thumbnail";
VISH.Constant.NONE = "none";
VISH.Constant.UNKNOWN = "Unknown";
VISH.Constant.AGE_RANGE = "4 - 20";
VISH.Constant.PRESENTATION = "presentation";
VISH.Constant.STANDARD = "standard";
VISH.Constant.FLASHCARD = "flashcard";
VISH.Constant.QUIZ_SIMPLE = "quiz_simple";
VISH.Constant.GAME = "game";
VISH.Constant.VTOUR = "VirtualTour";
VISH.Constant.TEXT = "text";
VISH.Constant.IMAGE = "image";
VISH.Constant.VIDEO = "video";
VISH.Constant.OBJECT = "object";
VISH.Constant.SNAPSHOT = "snapshot";
VISH.Constant.APPLET = "applet";
VISH.Constant.QUIZ = "quiz";
VISH.Constant.QZ_TYPE = {};
VISH.Constant.QZ_TYPE.OPEN = "open";
VISH.Constant.QZ_TYPE.MCHOICE = "multiplechoice";
VISH.Constant.QZ_TYPE.TF = "truefalse";
VISH.Constant.QZ_MODE = {};
VISH.Constant.QZ_MODE.SELFA = "selfA";
VISH.Constant.QZ_MODE.RT = "realTime";
VISH.Constant.TextDefault = 12;
VISH.Constant.TextBase = 12;
VISH.Constant.Video = {};
VISH.Constant.Video.HTML5 = "HTML5";
VISH.Constant.Video.Youtube = "Youtube";
VISH.Constant.Clipboard = {};
VISH.Constant.Clipboard.Slide = "slide";
VISH.Constant.Clipboard.LocalStorageStack = "VishEditorClipboardStack";
VISH.Constant.Themes = {};
VISH.Constant.Themes.Default = "theme1";
VISH.Constant.Event = {};
VISH.Constant.Event.onMessage = "onMessage";
VISH.Constant.Event.onGoToSlide = "onGoToSlide";
VISH.Constant.Event.onPlayVideo = "onPlayVideo";
VISH.Constant.Event.onPauseVideo = "onPauseVideo";
VISH.Constant.Event.onSeekVideo = "onSeekVideo";
VISH.Constant.Event.onFlashcardPointClicked = "onFlashcardPointClicked";
VISH.Constant.Event.onFlashcardSlideClosed = "onFlashcardSlideClosed";
VISH.Constant.Event.onSetSlave = "onSetSlave";
VISH.Constant.Event.onPreventDefault = "onPreventDefault";
VISH.Constant.Event.allowExitWithoutConfirmation = "allowExitWithoutConfirmation";
VISH.Constant.Event.onSelectedSlides = "onSelectedSlides";
VISH.Constant.Storage = {};
VISH.Constant.Storage.Device = "Device";
VISH.Constant.VTour = {};
VISH.Constant.VTour.DEFAULT_MAP = "roadmap";
VISH.Constant.VTour.ROADMAP = "roadmap";
VISH.Constant.INTRO = 13;
VISH.Configuration = function(V, $, undefined) {
  var configuration;
  var init = function(myConfiguration) {
    configuration = myConfiguration;
    _initPaths()
  };
  var _initPaths = function() {
    V.ImagesPath = configuration["ImagesPath"];
    V.StylesheetsPath = configuration["StylesheetsPath"];
    V.UploadImagePath = configuration["uploadImagePath"];
    V.UploadObjectPath = configuration["uploadObjectPath"];
    V.UploadPresentationPath = configuration["uploadPresentationPath"]
  };
  var applyConfiguration = function() {
    if(configuration["presentationSettings"]) {
      if(!configuration["presentationTags"]) {
        $(".tagBoxUpload").css("display", "none");
        $(".tagBoxIntro").css("display", "none")
      }
      if(!configuration["presentationThumbnails"]) {
        $("#thumbnails_in_excursion_details").css("display", "none")
      }
    }
    if(!configuration["VishLives"]) {
      $(".addLive").css("display", "none")
    }
    if(!configuration["VishRepo"]) {
      $("#tab_pic_repo").css("display", "none");
      $("#tab_object_repo").css("display", "none");
      $("#tab_video_repo").css("display", "none")
    }
    if(!configuration["Upload"]) {
      $("#tab_pic_upload").css("display", "none");
      $("#tab_object_upload").css("display", "none")
    }
    if(!configuration["Youtube"]) {
      $("#tab_video_youtube").css("display", "none")
    }
    if(!configuration["Vimeo"]) {
      $("#tab_video_vimeo").css("display", "none")
    }
    if(!configuration["Flickr"]) {
      $("#tab_pic_flikr").css("display", "none")
    }
  };
  var getConfiguration = function() {
    return configuration
  };
  return{init:init, applyConfiguration:applyConfiguration, getConfiguration:getConfiguration}
}(VISH, jQuery);
var VISH = VISH || {};
VISH.Constant = VISH.Constant || {};
VISH.Constant.QZ_TYPE = VISH.Constant.QZ_TYPE || {};
VISH.Constant.QZ_TYPE.OPEN = "open";
VISH.Constant.QZ_TYPE.MCHOICE = "multiplechoice";
VISH.Constant.QZ_TYPE.TF = "truefalse";
VISH.QuizCharts = function(V, $, undefined) {
  var choicesLetters = ["a)", "b)", "c)", "d)", "e)", "f)", "g)", "h)", "i)", "j)", "k)", "l)", "m)", "n)", "o)", "p)", "q)", "r)", "s)"];
  var pieBackgroundColor = ["#F38630", "#E0E4CC", "#69D2E7", "#FFF82A", "#FF0FB4", "#2A31FF", "#FF6075", "#00D043"];
  var pieLetterColor = ["#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000"];
  var choices = {};
  var init = function() {
  };
  var drawQuizChart = function(canvas, quizType, nAnswers, results, options) {
    var answersList = _getAnswers(results);
    switch(quizType) {
      case V.Constant.QZ_TYPE.OPEN:
        break;
      case V.Constant.QZ_TYPE.MCHOICE:
        _drawMcChoiceQuizChart(canvas, nAnswers, answersList, options);
        break;
      case V.Constant.QZ_TYPE.TF:
        _drawTFQuizChart(canvas, nAnswers, answersList, options);
        break;
      default:
        return null;
        break
    }
  };
  var _drawMcChoiceQuizChart = function(canvas, nAnswers, answersList, options) {
    var pieFragments = [];
    var data = [];
    for(var i = 0;i < nAnswers;i++) {
      pieFragments[i] = {};
      pieFragments[i].value = 0;
      pieFragments[i].label = choicesLetters[i];
      pieFragments[i].color = pieBackgroundColor[i];
      pieFragments[i].labelColor = pieLetterColor[i];
      pieFragments[i].labelFontSize = "16"
    }
    var alL = answersList.length;
    for(var j = 0;j < alL;j++) {
      var answers = answersList[j];
      var aL = answers.length;
      for(var k = 0;k < aL;k++) {
        var answer = answers[k];
        var index = answer.no - 1;
        if(answer.answer === "true") {
          pieFragments[index].value++
        }
      }
    }
    for(var i = 0;i < nAnswers;i++) {
      data.push(pieFragments[i])
    }
    var ctx = $(canvas).get(0).getContext("2d");
    var animation = false;
    if(options && options.first === true) {
      animation = true
    }
    var options = {showTooltips:false, animation:animation};
    var myNewChart = (new Chart(ctx)).Pie(data, options)
  };
  var _drawTFQuizChart = function(canvas, nAnswers, answersList, options) {
    var labels = [];
    var dataTrue = [];
    var dataFalse = [];
    var maxValue = 0;
    var scaleSteps = 10;
    for(var i = 0;i < nAnswers;i++) {
      labels[i] = "V       " + choicesLetters[i] + "       F";
      dataTrue[i] = 0;
      dataFalse[i] = 0
    }
    var alL = answersList.length;
    for(var j = 0;j < alL;j++) {
      var answers = answersList[j];
      var aL = answers.length;
      for(var k = 0;k < aL;k++) {
        var answer = answers[k];
        var index = answer.no - 1;
        if(answer.answer === "true") {
          dataTrue[index]++
        }else {
          dataFalse[index]++
        }
      }
    }
    for(var l = 0;l < nAnswers;l++) {
      if(dataTrue[l] > maxValue) {
        maxValue = dataTrue[l]
      }
      if(dataFalse[l] > maxValue) {
        maxValue = dataFalse[l]
      }
    }
    if(maxValue < 10) {
      scaleSteps = Math.max(1, maxValue)
    }
    var ctx = $(canvas).get(0).getContext("2d");
    var data = {labels:labels, datasets:[{fillColor:"#E2FFE3", strokeColor:"rgba(220,220,220,1)", data:dataTrue}, {fillColor:"#FFE2E2", strokeColor:"rgba(220,220,220,1)", data:dataFalse}]};
    var animation = false;
    if(options && options.first === true) {
      animation = true
    }
    var options = {animation:animation, scaleOverride:true, scaleStepWidth:Math.max(1, Math.ceil(maxValue / 10)), scaleSteps:scaleSteps, showTooltips:false};
    var myNewChart = (new Chart(ctx)).Bar(data, options)
  };
  var _getAnswers = function(results) {
    var answers = [];
    var rL = results.length;
    for(var i = 0;i < rL;i++) {
      answers.push(JSON.parse(results[i].answer))
    }
    return answers
  };
  var getQuizParams = function(quiz) {
    var params = {};
    try {
      params.quizType = quiz["slides"][0]["elements"][0]["quiztype"];
      params.nAnswers = quiz["slides"][0]["elements"][0]["choices"].length
    }catch(e) {
    }
    return params
  };
  return{init:init, drawQuizChart:drawQuizChart, getQuizParams:getQuizParams}
}(VISH, jQuery);
var VISH = VISH || {};
VISH.Constant = VISH.Constant || {};
VISH.Constant.Event = {};
VISH.Constant.Event.onMessage = "onMessage";
VISH.Constant.Event.onGoToSlide = "onGoToSlide";
VISH.Constant.Event.onPlayVideo = "onPlayVideo";
VISH.Constant.Event.onPauseVideo = "onPauseVideo";
VISH.Constant.Event.onSeekVideo = "onSeekVideo";
VISH.Constant.Event.onFlashcardPointClicked = "onFlashcardPointClicked";
VISH.Constant.Event.onFlashcardSlideClosed = "onFlashcardSlideClosed";
VISH.Constant.Event.onSetSlave = "onSetSlave";
VISH.Constant.Event.onPreventDefault = "onPreventDefault";
VISH.Constant.Event.allowExitWithoutConfirmation = "allowExitWithoutConfirmation";
VISH.Constant.Event.onSelectedSlides = "onSelectedSlides";
VISH.Constant.Event.onIframeMessengerHello = "onIframeMessengerHello";
VISH.IframeAPI = function(V, undefined) {
  var helloAttempts;
  var maxHelloAttempts = 15;
  var helloTimeout;
  var options;
  var listeners;
  var init = function(initOptions) {
    options = initOptions;
    if(window.addEventListener) {
      window.addEventListener("message", _onWrapperedVEMessage, false)
    }else {
      if(el.attachEvent) {
        window.attachEvent("message", _onWrapperedVEMessage)
      }
    }
    listeners = new Array;
    _startHelloExchange()
  };
  var _startHelloExchange = function() {
    registerCallback(VISH.Constant.Event.onIframeMessengerHello, function(origin) {
      if(helloTimeout) {
        clearTimeout(helloTimeout)
      }
      _applyOptions(origin);
      if(options && typeof options.callback === "function") {
        options.callback(origin)
      }
    });
    helloAttempts = 0;
    helloTimeout = setInterval(function() {
      _sayHello()
    }, 1E3);
    _sayHello()
  };
  var _sayHello = function() {
    var helloMessage = _createMessage(VISH.Constant.Event.onIframeMessengerHello);
    sendMessage(helloMessage, "*");
    helloAttempts++;
    if(helloAttempts >= maxHelloAttempts && helloTimeout) {
      clearTimeout(helloTimeout)
    }
  };
  var _sendPreventDefaults = function(preventDefaults, destination) {
    var params = {};
    params.preventDefaults = preventDefaults;
    var VEMessage = _createMessage(VISH.Constant.Event.onPreventDefault, params, null, destination);
    sendMessage(VEMessage, destination)
  };
  var _applyOptions = function(destination) {
    if(options) {
      if(options.preventDefault === true) {
        _sendPreventDefaults(true, destination)
      }
    }
  };
  var registerCallback = function(listenedEvent, callback) {
    if(callback) {
      listeners[listenedEvent] = callback
    }
  };
  var unRegisterCallback = function(listenedEvent) {
    if(listenedEvent in listeners) {
      listeners[listenedEvent] = null
    }
  };
  function message(VEevent, params, origin, destination) {
    this.vishEditor = true;
    this.VEevent = VEevent;
    if(params) {
      this.params = params
    }
    if(origin) {
      this.origin = origin
    }else {
      this.origin = "?"
    }
    if(destination) {
      this.destination = destination
    }else {
      this.destination = "*"
    }
  }
  var _createMessage = function(VEevent, params, origin, destination) {
    var VEMessage = new message(VEevent, params, origin, destination);
    return JSON.stringify(VEMessage)
  };
  var _validateVEMessage = function(VEMessage) {
    if(typeof VEMessage !== "string") {
      return false
    }
    try {
      var VEMessageObject = JSON.parse(VEMessage);
      if(typeof VEMessageObject !== "object") {
        return false
      }
      if(VEMessageObject.vishEditor !== true) {
        return false
      }
      if(!VEMessageObject.VEevent) {
        return false
      }
    }catch(e) {
      return false
    }
    return true
  };
  var sendMessage = function(VEMessage, destination) {
    if(typeof destination === "string") {
      if(destination === "*") {
        _broadcastMessage(VEMessage)
      }else {
        var iframe = document.getElementById(destination);
        if(iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(VEMessage, "*")
        }
      }
    }else {
      if(_isArray(destination) && typeof destination[0] == "string") {
        for(var i = 0;i < destination.length;i++) {
          var iframe = document.getElementById(destination[i]);
          if(iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(VEMessage, "*")
          }
        }
      }else {
        _broadcastMessage(VEMessage)
      }
    }
  };
  var _broadcastMessage = function(VEMessage) {
    var allVEIframes = document.querySelectorAll(".vishEditorIframe");
    for(var i = 0;i < allVEIframes.length;i++) {
      allVEIframes[i].contentWindow.postMessage(VEMessage, "*")
    }
  };
  var _onWrapperedVEMessage = function(wrapperedVEMessage) {
    if(wrapperedVEMessage) {
      if(_validateVEMessage(wrapperedVEMessage.data)) {
        _processVEMessage(wrapperedVEMessage.data)
      }
    }
  };
  var _processVEMessage = function(VEMessage) {
    var VEMessageObject = JSON.parse(VEMessage);
    if(listeners[VISH.Constant.Event.onMessage]) {
      listeners[VISH.Constant.Event.onMessage](VEMessage, VEMessageObject.origin)
    }
    var callback = listeners[VEMessageObject.VEevent];
    if(!callback) {
      return
    }
    switch(VEMessageObject.VEevent) {
      case VISH.Constant.Event.onGoToSlide:
        if(VEMessageObject.params) {
          callback(VEMessageObject.params.slideNumber, VEMessageObject.origin)
        }
        break;
      case VISH.Constant.Event.onPlayVideo:
        if(VEMessageObject.params) {
          callback(VEMessageObject.params.videoId, VEMessageObject.params.currentTime, VEMessageObject.params.slideNumber, VEMessageObject.origin)
        }
        break;
      case VISH.Constant.Event.onPauseVideo:
        if(VEMessageObject.params) {
          callback(VEMessageObject.params.videoId, VEMessageObject.params.currentTime, VEMessageObject.params.slideNumber, VEMessageObject.origin)
        }
        break;
      case VISH.Constant.Event.onSeekVideo:
        if(VEMessageObject.params) {
          callback(VEMessageObject.params.videoId, VEMessageObject.params.currentTime, VEMessageObject.params.slideNumber, VEMessageObject.origin)
        }
        break;
      case VISH.Constant.Event.onFlashcardPointClicked:
        if(VEMessageObject.params) {
          callback(VEMessageObject.params.slideNumber, VEMessageObject.origin)
        }
        break;
      case VISH.Constant.Event.onFlashcardSlideClosed:
        if(VEMessageObject.params) {
          callback(VEMessageObject.params.slideNumber, VEMessageObject.origin)
        }
        break;
      case VISH.Constant.Event.onIframeMessengerHello:
        callback(VEMessageObject.origin);
        break;
      default:
        _print("VISH.Messenger.Proceesor Error: Unrecognized event: " + VEMessageObject.VEevent);
        break
    }
  };
  var goToSlide = function(slideNumber, destination) {
    var params = {};
    params.slideNumber = slideNumber;
    var VEMessage = _createMessage(VISH.Constant.Event.onGoToSlide, params, null, destination);
    sendMessage(VEMessage, destination)
  };
  var playVideo = function(videoId, currentTime, videoSlideNumber, destination) {
    var params = {};
    params.videoId = videoId;
    params.currentTime = currentTime;
    params.slideNumber = videoSlideNumber;
    var VEMessage = _createMessage(VISH.Constant.Event.onPlayVideo, params, null, destination);
    sendMessage(VEMessage, destination)
  };
  var pauseVideo = function(videoId, currentTime, videoSlideNumber, destination) {
    var params = {};
    params.videoId = videoId;
    params.currentTime = currentTime;
    params.slideNumber = videoSlideNumber;
    var VEMessage = _createMessage(VISH.Constant.Event.onPauseVideo, params, null, destination);
    sendMessage(VEMessage, destination)
  };
  var seekVideo = function(videoId, currentTime, videoSlideNumber, destination) {
    var params = {};
    params.videoId = videoId;
    params.currentTime = currentTime;
    params.slideNumber = videoSlideNumber;
    var VEMessage = _createMessage(VISH.Constant.Event.onSeekVideo, params, null, destination);
    sendMessage(VEMessage, destination)
  };
  var openSlideInFlashcard = function(flashcardSlideNumber, slideNumber, destination) {
    var params = {};
    params.flashcardSlideNumber = flashcardSlideNumber;
    params.slideNumber = slideNumber;
    var VEMessage = _createMessage(VISH.Constant.Event.onFlashcardPointClicked, params, null, destination);
    sendMessage(VEMessage, destination)
  };
  var closeSlideInFlashcard = function(flashcardSlideNumber, slideNumber, destination) {
    var params = {};
    params.flashcardSlideNumber = flashcardSlideNumber;
    params.slideNumber = slideNumber;
    var VEMessage = _createMessage(VISH.Constant.Event.onFlashcardSlideClosed, params, null, destination);
    sendMessage(VEMessage, destination)
  };
  var setSlave = function(slave, destination) {
    var params = {};
    params.slave = slave;
    var VEMessage = _createMessage(VISH.Constant.Event.onSetSlave, params, null, destination);
    sendMessage(VEMessage, destination)
  };
  var setMaster = function(master) {
    var params = {};
    var allVEIframes = document.querySelectorAll(".vishEditorIframe");
    for(var i = 0;i < allVEIframes.length;i++) {
      if(allVEIframes[i].id !== master) {
        params.slave = true
      }else {
        params.slave = false
      }
      var destination = allVEIframes[i].id;
      var VEMessage = _createMessage(VISH.Constant.Event.onSetSlave, params, null, destination);
      sendMessage(VEMessage, destination)
    }
  };
  var allowExitWithoutConfirmation = function(destination) {
    var params = {};
    var VEMessage = _createMessage(VISH.Constant.Event.allowExitWithoutConfirmation, params, null, destination);
    sendMessage(VEMessage, destination)
  };
  var _print = function(objectToPrint) {
    if(console && console.log) {
      console.log(objectToPrint)
    }
  };
  var _isArray = function(object) {
    if(typeof object !== "undefined") {
      return object.constructor === Array
    }
    return false
  };
  return{init:init, registerCallback:registerCallback, unRegisterCallback:unRegisterCallback, sendMessage:sendMessage, setSlave:setSlave, setMaster:setMaster, allowExitWithoutConfirmation:allowExitWithoutConfirmation, goToSlide:goToSlide, playVideo:playVideo, pauseVideo:pauseVideo, seekVideo:seekVideo, openSlideInFlashcard:openSlideInFlashcard, closeSlideInFlashcard:closeSlideInFlashcard}
}(VISH);
(function(e, t) {
  function i(t, n) {
    var r, i, o, u = t.nodeName.toLowerCase();
    return"area" === u ? (r = t.parentNode, i = r.name, !t.href || !i || r.nodeName.toLowerCase() !== "map" ? !1 : (o = e("img[usemap=#" + i + "]")[0], !!o && s(o))) : (/input|select|textarea|button|object/.test(u) ? !t.disabled : "a" === u ? t.href || n : n) && s(t)
  }
  function s(t) {
    return e.expr.filters.visible(t) && !e(t).parents().andSelf().filter(function() {
      return e.css(this, "visibility") === "hidden"
    }).length
  }
  var n = 0, r = /^ui-id-\d+$/;
  e.ui = e.ui || {};
  if(e.ui.version) {
    return
  }
  e.extend(e.ui, {version:"1.9.2", keyCode:{BACKSPACE:8, COMMA:188, DELETE:46, DOWN:40, END:35, ENTER:13, ESCAPE:27, HOME:36, LEFT:37, NUMPAD_ADD:107, NUMPAD_DECIMAL:110, NUMPAD_DIVIDE:111, NUMPAD_ENTER:108, NUMPAD_MULTIPLY:106, NUMPAD_SUBTRACT:109, PAGE_DOWN:34, PAGE_UP:33, PERIOD:190, RIGHT:39, SPACE:32, TAB:9, UP:38}}), e.fn.extend({_focus:e.fn.focus, focus:function(t, n) {
    return typeof t == "number" ? this.each(function() {
      var r = this;
      setTimeout(function() {
        e(r).focus(), n && n.call(r)
      }, t)
    }) : this._focus.apply(this, arguments)
  }, scrollParent:function() {
    var t;
    return e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function() {
      return/(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
    }).eq(0) : t = this.parents().filter(function() {
      return/(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
    }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
  }, zIndex:function(n) {
    if(n !== t) {
      return this.css("zIndex", n)
    }
    if(this.length) {
      var r = e(this[0]), i, s;
      while(r.length && r[0] !== document) {
        i = r.css("position");
        if(i === "absolute" || i === "relative" || i === "fixed") {
          s = parseInt(r.css("zIndex"), 10);
          if(!isNaN(s) && s !== 0) {
            return s
          }
        }
        r = r.parent()
      }
    }
    return 0
  }, uniqueId:function() {
    return this.each(function() {
      this.id || (this.id = "ui-id-" + ++n)
    })
  }, removeUniqueId:function() {
    return this.each(function() {
      r.test(this.id) && e(this).removeAttr("id")
    })
  }}), e.extend(e.expr[":"], {data:e.expr.createPseudo ? e.expr.createPseudo(function(t) {
    return function(n) {
      return!!e.data(n, t)
    }
  }) : function(t, n, r) {
    return!!e.data(t, r[3])
  }, focusable:function(t) {
    return i(t, !isNaN(e.attr(t, "tabindex")))
  }, tabbable:function(t) {
    var n = e.attr(t, "tabindex"), r = isNaN(n);
    return(r || n >= 0) && i(t, !r)
  }}), e(function() {
    var t = document.body, n = t.appendChild(n = document.createElement("div"));
    n.offsetHeight, e.extend(n.style, {minHeight:"100px", height:"auto", padding:0, borderWidth:0}), e.support.minHeight = n.offsetHeight === 100, e.support.selectstart = "onselectstart" in n, t.removeChild(n).style.display = "none"
  }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(n, r) {
    function u(t, n, r, s) {
      return e.each(i, function() {
        n -= parseFloat(e.css(t, "padding" + this)) || 0, r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
      }), n
    }
    var i = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], s = r.toLowerCase(), o = {innerWidth:e.fn.innerWidth, innerHeight:e.fn.innerHeight, outerWidth:e.fn.outerWidth, outerHeight:e.fn.outerHeight};
    e.fn["inner" + r] = function(n) {
      return n === t ? o["inner" + r].call(this) : this.each(function() {
        e(this).css(s, u(this, n) + "px")
      })
    }, e.fn["outer" + r] = function(t, n) {
      return typeof t != "number" ? o["outer" + r].call(this, t) : this.each(function() {
        e(this).css(s, u(this, t, !0, n) + "px")
      })
    }
  }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
    return function(n) {
      return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
    }
  }(e.fn.removeData)), function() {
    var t = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
    e.ui.ie = t.length ? !0 : !1, e.ui.ie6 = parseFloat(t[1], 10) === 6
  }(), e.fn.extend({disableSelection:function() {
    return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
      e.preventDefault()
    })
  }, enableSelection:function() {
    return this.unbind(".ui-disableSelection")
  }}), e.extend(e.ui, {plugin:{add:function(t, n, r) {
    var i, s = e.ui[t].prototype;
    for(i in r) {
      s.plugins[i] = s.plugins[i] || [], s.plugins[i].push([n, r[i]])
    }
  }, call:function(e, t, n) {
    var r, i = e.plugins[t];
    if(!i || !e.element[0].parentNode || e.element[0].parentNode.nodeType === 11) {
      return
    }
    for(r = 0;r < i.length;r++) {
      e.options[i[r][0]] && i[r][1].apply(e.element, n)
    }
  }}, contains:e.contains, hasScroll:function(t, n) {
    if(e(t).css("overflow") === "hidden") {
      return!1
    }
    var r = n && n === "left" ? "scrollLeft" : "scrollTop", i = !1;
    return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
  }, isOverAxis:function(e, t, n) {
    return e > t && e < t + n
  }, isOver:function(t, n, r, i, s, o) {
    return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
  }})
})(jQuery);
(function(e, t) {
  var n = 0, r = Array.prototype.slice, i = e.cleanData;
  e.cleanData = function(t) {
    for(var n = 0, r;(r = t[n]) != null;n++) {
      try {
        e(r).triggerHandler("remove")
      }catch(s) {
      }
    }
    i(t)
  }, e.widget = function(t, n, r) {
    var i, s, o, u, a = t.split(".")[0];
    t = t.split(".")[1], i = a + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][i.toLowerCase()] = function(t) {
      return!!e.data(t, i)
    }, e[a] = e[a] || {}, s = e[a][t], o = e[a][t] = function(e, t) {
      if(!this._createWidget) {
        return new o(e, t)
      }
      arguments.length && this._createWidget(e, t)
    }, e.extend(o, s, {version:r.version, _proto:e.extend({}, r), _childConstructors:[]}), u = new n, u.options = e.widget.extend({}, u.options), e.each(r, function(t, i) {
      e.isFunction(i) && (r[t] = function() {
        var e = function() {
          return n.prototype[t].apply(this, arguments)
        }, r = function(e) {
          return n.prototype[t].apply(this, e)
        };
        return function() {
          var t = this._super, n = this._superApply, s;
          return this._super = e, this._superApply = r, s = i.apply(this, arguments), this._super = t, this._superApply = n, s
        }
      }())
    }), o.prototype = e.widget.extend(u, {widgetEventPrefix:s ? u.widgetEventPrefix : t}, r, {constructor:o, namespace:a, widgetName:t, widgetBaseClass:i, widgetFullName:i}), s ? (e.each(s._childConstructors, function(t, n) {
      var r = n.prototype;
      e.widget(r.namespace + "." + r.widgetName, o, n._proto)
    }), delete s._childConstructors) : n._childConstructors.push(o), e.widget.bridge(t, o)
  }, e.widget.extend = function(n) {
    var i = r.call(arguments, 1), s = 0, o = i.length, u, a;
    for(;s < o;s++) {
      for(u in i[s]) {
        a = i[s][u], i[s].hasOwnProperty(u) && a !== t && (e.isPlainObject(a) ? n[u] = e.isPlainObject(n[u]) ? e.widget.extend({}, n[u], a) : e.widget.extend({}, a) : n[u] = a)
      }
    }
    return n
  }, e.widget.bridge = function(n, i) {
    var s = i.prototype.widgetFullName || n;
    e.fn[n] = function(o) {
      var u = typeof o == "string", a = r.call(arguments, 1), f = this;
      return o = !u && a.length ? e.widget.extend.apply(null, [o].concat(a)) : o, u ? this.each(function() {
        var r, i = e.data(this, s);
        if(!i) {
          return e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + o + "'")
        }
        if(!e.isFunction(i[o]) || o.charAt(0) === "_") {
          return e.error("no such method '" + o + "' for " + n + " widget instance")
        }
        r = i[o].apply(i, a);
        if(r !== i && r !== t) {
          return f = r && r.jquery ? f.pushStack(r.get()) : r, !1
        }
      }) : this.each(function() {
        var t = e.data(this, s);
        t ? t.option(o || {})._init() : e.data(this, s, new i(o, this))
      }), f
    }
  }, e.Widget = function() {
  }, e.Widget._childConstructors = [], e.Widget.prototype = {widgetName:"widget", widgetEventPrefix:"", defaultElement:"<div>", options:{disabled:!1, create:null}, _createWidget:function(t, r) {
    r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), r !== this && (e.data(r, this.widgetName, this), e.data(r, this.widgetFullName, this), this._on(!0, this.element, {remove:function(e) {
      e.target === r && this.destroy()
    }}), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
  }, _getCreateOptions:e.noop, _getCreateEventData:e.noop, _create:e.noop, _init:e.noop, destroy:function() {
    this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
  }, _destroy:e.noop, widget:function() {
    return this.element
  }, option:function(n, r) {
    var i = n, s, o, u;
    if(arguments.length === 0) {
      return e.widget.extend({}, this.options)
    }
    if(typeof n == "string") {
      i = {}, s = n.split("."), n = s.shift();
      if(s.length) {
        o = i[n] = e.widget.extend({}, this.options[n]);
        for(u = 0;u < s.length - 1;u++) {
          o[s[u]] = o[s[u]] || {}, o = o[s[u]]
        }
        n = s.pop();
        if(r === t) {
          return o[n] === t ? null : o[n]
        }
        o[n] = r
      }else {
        if(r === t) {
          return this.options[n] === t ? null : this.options[n]
        }
        i[n] = r
      }
    }
    return this._setOptions(i), this
  }, _setOptions:function(e) {
    var t;
    for(t in e) {
      this._setOption(t, e[t])
    }
    return this
  }, _setOption:function(e, t) {
    return this.options[e] = t, e === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
  }, enable:function() {
    return this._setOption("disabled", !1)
  }, disable:function() {
    return this._setOption("disabled", !0)
  }, _on:function(t, n, r) {
    var i, s = this;
    typeof t != "boolean" && (r = n, n = t, t = !1), r ? (n = i = e(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, i = this.widget()), e.each(r, function(r, o) {
      function u() {
        if(!t && (s.options.disabled === !0 || e(this).hasClass("ui-state-disabled"))) {
          return
        }
        return(typeof o == "string" ? s[o] : o).apply(s, arguments)
      }
      typeof o != "string" && (u.guid = o.guid = o.guid || u.guid || e.guid++);
      var a = r.match(/^(\w+)\s*(.*)$/), f = a[1] + s.eventNamespace, l = a[2];
      l ? i.delegate(l, f, u) : n.bind(f, u)
    })
  }, _off:function(e, t) {
    t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
  }, _delay:function(e, t) {
    function n() {
      return(typeof e == "string" ? r[e] : e).apply(r, arguments)
    }
    var r = this;
    return setTimeout(n, t || 0)
  }, _hoverable:function(t) {
    this.hoverable = this.hoverable.add(t), this._on(t, {mouseenter:function(t) {
      e(t.currentTarget).addClass("ui-state-hover")
    }, mouseleave:function(t) {
      e(t.currentTarget).removeClass("ui-state-hover")
    }})
  }, _focusable:function(t) {
    this.focusable = this.focusable.add(t), this._on(t, {focusin:function(t) {
      e(t.currentTarget).addClass("ui-state-focus")
    }, focusout:function(t) {
      e(t.currentTarget).removeClass("ui-state-focus")
    }})
  }, _trigger:function(t, n, r) {
    var i, s, o = this.options[t];
    r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
    if(s) {
      for(i in s) {
        i in n || (n[i] = s[i])
      }
    }
    return this.element.trigger(n, r), !(e.isFunction(o) && o.apply(this.element[0], [n].concat(r)) === !1 || n.isDefaultPrevented())
  }}, e.each({show:"fadeIn", hide:"fadeOut"}, function(t, n) {
    e.Widget.prototype["_" + t] = function(r, i, s) {
      typeof i == "string" && (i = {effect:i});
      var o, u = i ? i === !0 || typeof i == "number" ? n : i.effect || n : t;
      i = i || {}, typeof i == "number" && (i = {duration:i}), o = !e.isEmptyObject(i), i.complete = s, i.delay && r.delay(i.delay), o && e.effects && (e.effects.effect[u] || e.uiBackCompat !== !1 && e.effects[u]) ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function(n) {
        e(this)[t](), s && s.call(r[0]), n()
      })
    }
  }), e.uiBackCompat !== !1 && (e.Widget.prototype._getCreateOptions = function() {
    return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
  })
})(jQuery);
(function(e, t) {
  var n = !1;
  e(document).mouseup(function(e) {
    n = !1
  }), e.widget("ui.mouse", {version:"1.9.2", options:{cancel:"input,textarea,button,select,option", distance:1, delay:0}, _mouseInit:function() {
    var t = this;
    this.element.bind("mousedown." + this.widgetName, function(e) {
      return t._mouseDown(e)
    }).bind("click." + this.widgetName, function(n) {
      if(!0 === e.data(n.target, t.widgetName + ".preventClickEvent")) {
        return e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1
      }
    }), this.started = !1
  }, _mouseDestroy:function() {
    this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
  }, _mouseDown:function(t) {
    if(n) {
      return
    }
    this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
    var r = this, i = t.which === 1, s = typeof this.options.cancel == "string" && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
    if(!i || s || !this._mouseCapture(t)) {
      return!0
    }
    this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
      r.mouseDelayMet = !0
    }, this.options.delay));
    if(this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
      this._mouseStarted = this._mouseStart(t) !== !1;
      if(!this._mouseStarted) {
        return t.preventDefault(), !0
      }
    }
    return!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
      return r._mouseMove(e)
    }, this._mouseUpDelegate = function(e) {
      return r._mouseUp(e)
    }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), n = !0, !0
  }, _mouseMove:function(t) {
    return!e.ui.ie || document.documentMode >= 9 || !!t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
  }, _mouseUp:function(t) {
    return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
  }, _mouseDistanceMet:function(e) {
    return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
  }, _mouseDelayMet:function(e) {
    return this.mouseDelayMet
  }, _mouseStart:function(e) {
  }, _mouseDrag:function(e) {
  }, _mouseStop:function(e) {
  }, _mouseCapture:function(e) {
    return!0
  }})
})(jQuery);
(function(e, t) {
  function h(e, t, n) {
    return[parseInt(e[0], 10) * (l.test(e[0]) ? t / 100 : 1), parseInt(e[1], 10) * (l.test(e[1]) ? n / 100 : 1)]
  }
  function p(t, n) {
    return parseInt(e.css(t, n), 10) || 0
  }
  e.ui = e.ui || {};
  var n, r = Math.max, i = Math.abs, s = Math.round, o = /left|center|right/, u = /top|center|bottom/, a = /[\+\-]\d+%?/, f = /^\w+/, l = /%$/, c = e.fn.position;
  e.position = {scrollbarWidth:function() {
    if(n !== t) {
      return n
    }
    var r, i, s = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), o = s.children()[0];
    return e("body").append(s), r = o.offsetWidth, s.css("overflow", "scroll"), i = o.offsetWidth, r === i && (i = s[0].clientWidth), s.remove(), n = r - i
  }, getScrollInfo:function(t) {
    var n = t.isWindow ? "" : t.element.css("overflow-x"), r = t.isWindow ? "" : t.element.css("overflow-y"), i = n === "scroll" || n === "auto" && t.width < t.element[0].scrollWidth, s = r === "scroll" || r === "auto" && t.height < t.element[0].scrollHeight;
    return{width:i ? e.position.scrollbarWidth() : 0, height:s ? e.position.scrollbarWidth() : 0}
  }, getWithinInfo:function(t) {
    var n = e(t || window), r = e.isWindow(n[0]);
    return{element:n, isWindow:r, offset:n.offset() || {left:0, top:0}, scrollLeft:n.scrollLeft(), scrollTop:n.scrollTop(), width:r ? n.width() : n.outerWidth(), height:r ? n.height() : n.outerHeight()}
  }}, e.fn.position = function(t) {
    if(!t || !t.of) {
      return c.apply(this, arguments)
    }
    t = e.extend({}, t);
    var n, l, d, v, m, g = e(t.of), y = e.position.getWithinInfo(t.within), b = e.position.getScrollInfo(y), w = g[0], E = (t.collision || "flip").split(" "), S = {};
    return w.nodeType === 9 ? (l = g.width(), d = g.height(), v = {top:0, left:0}) : e.isWindow(w) ? (l = g.width(), d = g.height(), v = {top:g.scrollTop(), left:g.scrollLeft()}) : w.preventDefault ? (t.at = "left top", l = d = 0, v = {top:w.pageY, left:w.pageX}) : (l = g.outerWidth(), d = g.outerHeight(), v = g.offset()), m = e.extend({}, v), e.each(["my", "at"], function() {
      var e = (t[this] || "").split(" "), n, r;
      e.length === 1 && (e = o.test(e[0]) ? e.concat(["center"]) : u.test(e[0]) ? ["center"].concat(e) : ["center", "center"]), e[0] = o.test(e[0]) ? e[0] : "center", e[1] = u.test(e[1]) ? e[1] : "center", n = a.exec(e[0]), r = a.exec(e[1]), S[this] = [n ? n[0] : 0, r ? r[0] : 0], t[this] = [f.exec(e[0])[0], f.exec(e[1])[0]]
    }), E.length === 1 && (E[1] = E[0]), t.at[0] === "right" ? m.left += l : t.at[0] === "center" && (m.left += l / 2), t.at[1] === "bottom" ? m.top += d : t.at[1] === "center" && (m.top += d / 2), n = h(S.at, l, d), m.left += n[0], m.top += n[1], this.each(function() {
      var o, u, a = e(this), f = a.outerWidth(), c = a.outerHeight(), w = p(this, "marginLeft"), x = p(this, "marginTop"), T = f + w + p(this, "marginRight") + b.width, N = c + x + p(this, "marginBottom") + b.height, C = e.extend({}, m), k = h(S.my, a.outerWidth(), a.outerHeight());
      t.my[0] === "right" ? C.left -= f : t.my[0] === "center" && (C.left -= f / 2), t.my[1] === "bottom" ? C.top -= c : t.my[1] === "center" && (C.top -= c / 2), C.left += k[0], C.top += k[1], e.support.offsetFractions || (C.left = s(C.left), C.top = s(C.top)), o = {marginLeft:w, marginTop:x}, e.each(["left", "top"], function(r, i) {
        e.ui.position[E[r]] && e.ui.position[E[r]][i](C, {targetWidth:l, targetHeight:d, elemWidth:f, elemHeight:c, collisionPosition:o, collisionWidth:T, collisionHeight:N, offset:[n[0] + k[0], n[1] + k[1]], my:t.my, at:t.at, within:y, elem:a})
      }), e.fn.bgiframe && a.bgiframe(), t.using && (u = function(e) {
        var n = v.left - C.left, s = n + l - f, o = v.top - C.top, u = o + d - c, h = {target:{element:g, left:v.left, top:v.top, width:l, height:d}, element:{element:a, left:C.left, top:C.top, width:f, height:c}, horizontal:s < 0 ? "left" : n > 0 ? "right" : "center", vertical:u < 0 ? "top" : o > 0 ? "bottom" : "middle"};
        l < f && i(n + s) < l && (h.horizontal = "center"), d < c && i(o + u) < d && (h.vertical = "middle"), r(i(n), i(s)) > r(i(o), i(u)) ? h.important = "horizontal" : h.important = "vertical", t.using.call(this, e, h)
      }), a.offset(e.extend(C, {using:u}))
    })
  }, e.ui.position = {fit:{left:function(e, t) {
    var n = t.within, i = n.isWindow ? n.scrollLeft : n.offset.left, s = n.width, o = e.left - t.collisionPosition.marginLeft, u = i - o, a = o + t.collisionWidth - s - i, f;
    t.collisionWidth > s ? u > 0 && a <= 0 ? (f = e.left + u + t.collisionWidth - s - i, e.left += u - f) : a > 0 && u <= 0 ? e.left = i : u > a ? e.left = i + s - t.collisionWidth : e.left = i : u > 0 ? e.left += u : a > 0 ? e.left -= a : e.left = r(e.left - o, e.left)
  }, top:function(e, t) {
    var n = t.within, i = n.isWindow ? n.scrollTop : n.offset.top, s = t.within.height, o = e.top - t.collisionPosition.marginTop, u = i - o, a = o + t.collisionHeight - s - i, f;
    t.collisionHeight > s ? u > 0 && a <= 0 ? (f = e.top + u + t.collisionHeight - s - i, e.top += u - f) : a > 0 && u <= 0 ? e.top = i : u > a ? e.top = i + s - t.collisionHeight : e.top = i : u > 0 ? e.top += u : a > 0 ? e.top -= a : e.top = r(e.top - o, e.top)
  }}, flip:{left:function(e, t) {
    var n = t.within, r = n.offset.left + n.scrollLeft, s = n.width, o = n.isWindow ? n.scrollLeft : n.offset.left, u = e.left - t.collisionPosition.marginLeft, a = u - o, f = u + t.collisionWidth - s - o, l = t.my[0] === "left" ? -t.elemWidth : t.my[0] === "right" ? t.elemWidth : 0, c = t.at[0] === "left" ? t.targetWidth : t.at[0] === "right" ? -t.targetWidth : 0, h = -2 * t.offset[0], p, d;
    if(a < 0) {
      p = e.left + l + c + h + t.collisionWidth - s - r;
      if(p < 0 || p < i(a)) {
        e.left += l + c + h
      }
    }else {
      if(f > 0) {
        d = e.left - t.collisionPosition.marginLeft + l + c + h - o;
        if(d > 0 || i(d) < f) {
          e.left += l + c + h
        }
      }
    }
  }, top:function(e, t) {
    var n = t.within, r = n.offset.top + n.scrollTop, s = n.height, o = n.isWindow ? n.scrollTop : n.offset.top, u = e.top - t.collisionPosition.marginTop, a = u - o, f = u + t.collisionHeight - s - o, l = t.my[1] === "top", c = l ? -t.elemHeight : t.my[1] === "bottom" ? t.elemHeight : 0, h = t.at[1] === "top" ? t.targetHeight : t.at[1] === "bottom" ? -t.targetHeight : 0, p = -2 * t.offset[1], d, v;
    a < 0 ? (v = e.top + c + h + p + t.collisionHeight - s - r, e.top + c + h + p > a && (v < 0 || v < i(a)) && (e.top += c + h + p)) : f > 0 && (d = e.top - t.collisionPosition.marginTop + c + h + p - o, e.top + c + h + p > f && (d > 0 || i(d) < f) && (e.top += c + h + p))
  }}, flipfit:{left:function() {
    e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
  }, top:function() {
    e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
  }}}, function() {
    var t, n, r, i, s, o = document.getElementsByTagName("body")[0], u = document.createElement("div");
    t = document.createElement(o ? "div" : "body"), r = {visibility:"hidden", width:0, height:0, border:0, margin:0, background:"none"}, o && e.extend(r, {position:"absolute", left:"-1000px", top:"-1000px"});
    for(s in r) {
      t.style[s] = r[s]
    }
    t.appendChild(u), n = o || document.documentElement, n.insertBefore(t, n.firstChild), u.style.cssText = "position: absolute; left: 10.7432222px;", i = e(u).offset().left, e.support.offsetFractions = i > 10 && i < 11, t.innerHTML = "", n.removeChild(t)
  }(), e.uiBackCompat !== !1 && function(e) {
    var n = e.fn.position;
    e.fn.position = function(r) {
      if(!r || !r.offset) {
        return n.call(this, r)
      }
      var i = r.offset.split(" "), s = r.at.split(" ");
      return i.length === 1 && (i[1] = i[0]), /^\d/.test(i[0]) && (i[0] = "+" + i[0]), /^\d/.test(i[1]) && (i[1] = "+" + i[1]), s.length === 1 && (/left|center|right/.test(s[0]) ? s[1] = "center" : (s[1] = s[0], s[0] = "center")), n.call(this, e.extend(r, {at:s[0] + i[0] + " " + s[1] + i[1], offset:t}))
    }
  }(jQuery)
})(jQuery);
(function(e, t) {
  e.widget("ui.draggable", e.ui.mouse, {version:"1.9.2", widgetEventPrefix:"drag", options:{addClasses:!0, appendTo:"parent", axis:!1, connectToSortable:!1, containment:!1, cursor:"auto", cursorAt:!1, grid:!1, handle:!1, helper:"original", iframeFix:!1, opacity:!1, refreshPositions:!1, revert:!1, revertDuration:500, scope:"default", scroll:!0, scrollSensitivity:20, scrollSpeed:20, snap:!1, snapMode:"both", snapTolerance:20, stack:!1, zIndex:!1}, _create:function() {
    this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
  }, _destroy:function() {
    this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
  }, _mouseCapture:function(t) {
    var n = this.options;
    return this.helper || n.disabled || e(t.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(n.iframeFix === !0 ? "iframe" : n.iframeFix).each(function() {
      e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth + "px", height:this.offsetHeight + "px", position:"absolute", opacity:"0.001", zIndex:1E3}).css(e(this).offset()).appendTo("body")
    }), !0) : !1)
  }, _mouseStart:function(t) {
    var n = this.options;
    return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {top:this.offset.top - this.margins.top, left:this.offset.left - this.margins.left}, e.extend(this.offset, {click:{left:t.pageX - this.offset.left, 
    top:t.pageY - this.offset.top}, parent:this._getParentOffset(), relative:this._getRelativeOffset()}), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt), n.containment && this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, 
    !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
  }, _mouseDrag:function(t, n) {
    this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute");
    if(!n) {
      var r = this._uiHash();
      if(this._trigger("drag", t, r) === !1) {
        return this._mouseUp({}), !1
      }
      this.position = r.position
    }
    if(!this.options.axis || this.options.axis != "y") {
      this.helper[0].style.left = this.position.left + "px"
    }
    if(!this.options.axis || this.options.axis != "x") {
      this.helper[0].style.top = this.position.top + "px"
    }
    return e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
  }, _mouseStop:function(t) {
    var n = !1;
    e.ui.ddmanager && !this.options.dropBehaviour && (n = e.ui.ddmanager.drop(this, t)), this.dropped && (n = this.dropped, this.dropped = !1);
    var r = this.element[0], i = !1;
    while(r && (r = r.parentNode)) {
      r == document && (i = !0)
    }
    if(!i && this.options.helper === "original") {
      return!1
    }
    if(this.options.revert == "invalid" && !n || this.options.revert == "valid" && n || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, n)) {
      var s = this;
      e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
        s._trigger("stop", t) !== !1 && s._clear()
      })
    }else {
      this._trigger("stop", t) !== !1 && this._clear()
    }
    return!1
  }, _mouseUp:function(t) {
    return e("div.ui-draggable-iframeFix").each(function() {
      this.parentNode.removeChild(this)
    }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
  }, cancel:function() {
    return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
  }, _getHandle:function(t) {
    var n = !this.options.handle || !e(this.options.handle, this.element).length ? !0 : !1;
    return e(this.options.handle, this.element).find("*").andSelf().each(function() {
      this == t.target && (n = !0)
    }), n
  }, _createHelper:function(t) {
    var n = this.options, r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t])) : n.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
    return r.parents("body").length || r.appendTo(n.appendTo == "parent" ? this.element[0].parentNode : n.appendTo), r[0] != this.element[0] && !/(fixed|absolute)/.test(r.css("position")) && r.css("position", "absolute"), r
  }, _adjustOffsetFromHelper:function(t) {
    typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {left:+t[0], top:+t[1] || 0}), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
  }, _getParentOffset:function() {
    this.offsetParent = this.helper.offsetParent();
    var t = this.offsetParent.offset();
    this.cssPosition == "absolute" && this.scrollParent[0] != document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
    if(this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.ui.ie) {
      t = {top:0, left:0}
    }
    return{top:t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left:t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
  }, _getRelativeOffset:function() {
    if(this.cssPosition == "relative") {
      var e = this.element.position();
      return{top:e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left:e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
    }
    return{top:0, left:0}
  }, _cacheMargins:function() {
    this.margins = {left:parseInt(this.element.css("marginLeft"), 10) || 0, top:parseInt(this.element.css("marginTop"), 10) || 0, right:parseInt(this.element.css("marginRight"), 10) || 0, bottom:parseInt(this.element.css("marginBottom"), 10) || 0}
  }, _cacheHelperProportions:function() {
    this.helperProportions = {width:this.helper.outerWidth(), height:this.helper.outerHeight()}
  }, _setContainment:function() {
    var t = this.options;
    t.containment == "parent" && (t.containment = this.helper[0].parentNode);
    if(t.containment == "document" || t.containment == "window") {
      this.containment = [t.containment == "document" ? 0 : e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t.containment == "document" ? 0 : e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (t.containment == "document" ? 0 : e(window).scrollLeft()) + e(t.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (t.containment == "document" ? 0 : e(window).scrollTop()) + (e(t.containment == "document" ? 
      document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
    }
    if(!/^(document|window|parent)$/.test(t.containment) && t.containment.constructor != Array) {
      var n = e(t.containment), r = n[0];
      if(!r) {
        return
      }
      var i = n.offset(), s = e(r).css("overflow") != "hidden";
      this.containment = [(parseInt(e(r).css("borderLeftWidth"), 10) || 0) + (parseInt(e(r).css("paddingLeft"), 10) || 0), (parseInt(e(r).css("borderTopWidth"), 10) || 0) + (parseInt(e(r).css("paddingTop"), 10) || 0), (s ? Math.max(r.scrollWidth, r.offsetWidth) : r.offsetWidth) - (parseInt(e(r).css("borderLeftWidth"), 10) || 0) - (parseInt(e(r).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (s ? Math.max(r.scrollHeight, r.offsetHeight) : r.offsetHeight) - 
      (parseInt(e(r).css("borderTopWidth"), 10) || 0) - (parseInt(e(r).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = n
    }else {
      t.containment.constructor == Array && (this.containment = t.containment)
    }
  }, _convertPositionTo:function(t, n) {
    n || (n = this.position);
    var r = t == "absolute" ? 1 : -1, i = this.options, s = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, o = /(html|body)/i.test(s[0].tagName);
    return{top:n.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * r, left:n.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * r}
  }, _generatePosition:function(t) {
    var n = this.options, r = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, i = /(html|body)/i.test(r[0].tagName), s = t.pageX, o = t.pageY;
    if(this.originalPosition) {
      var u;
      if(this.containment) {
        if(this.relative_container) {
          var a = this.relative_container.offset();
          u = [this.containment[0] + a.left, this.containment[1] + a.top, this.containment[2] + a.left, this.containment[3] + a.top]
        }else {
          u = this.containment
        }
        t.pageX - this.offset.click.left < u[0] && (s = u[0] + this.offset.click.left), t.pageY - this.offset.click.top < u[1] && (o = u[1] + this.offset.click.top), t.pageX - this.offset.click.left > u[2] && (s = u[2] + this.offset.click.left), t.pageY - this.offset.click.top > u[3] && (o = u[3] + this.offset.click.top)
      }
      if(n.grid) {
        var f = n.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1] : this.originalPageY;
        o = u ? f - this.offset.click.top < u[1] || f - this.offset.click.top > u[3] ? f - this.offset.click.top < u[1] ? f + n.grid[1] : f - n.grid[1] : f : f;
        var l = n.grid[0] ? this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0] : this.originalPageX;
        s = u ? l - this.offset.click.left < u[0] || l - this.offset.click.left > u[2] ? l - this.offset.click.left < u[0] ? l + n.grid[0] : l - n.grid[0] : l : l
      }
    }
    return{top:o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()), left:s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())}
  }, _clear:function() {
    this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
  }, _trigger:function(t, n, r) {
    return r = r || this._uiHash(), e.ui.plugin.call(this, t, [n, r]), t == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, n, r)
  }, plugins:{}, _uiHash:function(e) {
    return{helper:this.helper, position:this.position, originalPosition:this.originalPosition, offset:this.positionAbs}
  }}), e.ui.plugin.add("draggable", "connectToSortable", {start:function(t, n) {
    var r = e(this).data("draggable"), i = r.options, s = e.extend({}, n, {item:r.element});
    r.sortables = [], e(i.connectToSortable).each(function() {
      var n = e.data(this, "sortable");
      n && !n.options.disabled && (r.sortables.push({instance:n, shouldRevert:n.options.revert}), n.refreshPositions(), n._trigger("activate", t, s))
    })
  }, stop:function(t, n) {
    var r = e(this).data("draggable"), i = e.extend({}, n, {item:r.element});
    e.each(r.sortables, function() {
      this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, r.options.helper == "original" && this.instance.currentItem.css({top:"auto", left:"auto"})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, i))
    })
  }, drag:function(t, n) {
    var r = e(this).data("draggable"), i = this, s = function(t) {
      var n = this.offset.click.top, r = this.offset.click.left, i = this.positionAbs.top, s = this.positionAbs.left, o = t.height, u = t.width, a = t.top, f = t.left;
      return e.ui.isOver(i + n, s + r, a, f, o, u)
    };
    e.each(r.sortables, function(s) {
      var o = !1, u = this;
      this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (o = !0, e.each(r.sortables, function() {
        return this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this != u && this.instance._intersectsWith(this.instance.containerCache) && e.ui.contains(u.instance.element[0], this.instance.element[0]) && (o = !1), o
      })), o ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
        return n.helper[0]
      }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, 
      this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", 
      t), r.dropped = !1)
    })
  }}), e.ui.plugin.add("draggable", "cursor", {start:function(t, n) {
    var r = e("body"), i = e(this).data("draggable").options;
    r.css("cursor") && (i._cursor = r.css("cursor")), r.css("cursor", i.cursor)
  }, stop:function(t, n) {
    var r = e(this).data("draggable").options;
    r._cursor && e("body").css("cursor", r._cursor)
  }}), e.ui.plugin.add("draggable", "opacity", {start:function(t, n) {
    var r = e(n.helper), i = e(this).data("draggable").options;
    r.css("opacity") && (i._opacity = r.css("opacity")), r.css("opacity", i.opacity)
  }, stop:function(t, n) {
    var r = e(this).data("draggable").options;
    r._opacity && e(n.helper).css("opacity", r._opacity)
  }}), e.ui.plugin.add("draggable", "scroll", {start:function(t, n) {
    var r = e(this).data("draggable");
    r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML" && (r.overflowOffset = r.scrollParent.offset())
  }, drag:function(t, n) {
    var r = e(this).data("draggable"), i = r.options, s = !1;
    if(r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML") {
      if(!i.axis || i.axis != "x") {
        r.overflowOffset.top + r.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - r.overflowOffset.top < i.scrollSensitivity && (r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop - i.scrollSpeed)
      }
      if(!i.axis || i.axis != "y") {
        r.overflowOffset.left + r.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - r.overflowOffset.left < i.scrollSensitivity && (r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft - i.scrollSpeed)
      }
    }else {
      if(!i.axis || i.axis != "x") {
        t.pageY - e(document).scrollTop() < i.scrollSensitivity ? s = e(document).scrollTop(e(document).scrollTop() - i.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < i.scrollSensitivity && (s = e(document).scrollTop(e(document).scrollTop() + i.scrollSpeed))
      }
      if(!i.axis || i.axis != "y") {
        t.pageX - e(document).scrollLeft() < i.scrollSensitivity ? s = e(document).scrollLeft(e(document).scrollLeft() - i.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < i.scrollSensitivity && (s = e(document).scrollLeft(e(document).scrollLeft() + i.scrollSpeed))
      }
    }
    s !== !1 && e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(r, t)
  }}), e.ui.plugin.add("draggable", "snap", {start:function(t, n) {
    var r = e(this).data("draggable"), i = r.options;
    r.snapElements = [], e(i.snap.constructor != String ? i.snap.items || ":data(draggable)" : i.snap).each(function() {
      var t = e(this), n = t.offset();
      this != r.element[0] && r.snapElements.push({item:this, width:t.outerWidth(), height:t.outerHeight(), top:n.top, left:n.left})
    })
  }, drag:function(t, n) {
    var r = e(this).data("draggable"), i = r.options, s = i.snapTolerance, o = n.offset.left, u = o + r.helperProportions.width, a = n.offset.top, f = a + r.helperProportions.height;
    for(var l = r.snapElements.length - 1;l >= 0;l--) {
      var c = r.snapElements[l].left, h = c + r.snapElements[l].width, p = r.snapElements[l].top, d = p + r.snapElements[l].height;
      if(!(c - s < o && o < h + s && p - s < a && a < d + s || c - s < o && o < h + s && p - s < f && f < d + s || c - s < u && u < h + s && p - s < a && a < d + s || c - s < u && u < h + s && p - s < f && f < d + s)) {
        r.snapElements[l].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, e.extend(r._uiHash(), {snapItem:r.snapElements[l].item})), r.snapElements[l].snapping = !1;
        continue
      }
      if(i.snapMode != "inner") {
        var v = Math.abs(p - f) <= s, m = Math.abs(d - a) <= s, g = Math.abs(c - u) <= s, y = Math.abs(h - o) <= s;
        v && (n.position.top = r._convertPositionTo("relative", {top:p - r.helperProportions.height, left:0}).top - r.margins.top), m && (n.position.top = r._convertPositionTo("relative", {top:d, left:0}).top - r.margins.top), g && (n.position.left = r._convertPositionTo("relative", {top:0, left:c - r.helperProportions.width}).left - r.margins.left), y && (n.position.left = r._convertPositionTo("relative", {top:0, left:h}).left - r.margins.left)
      }
      var b = v || m || g || y;
      if(i.snapMode != "outer") {
        var v = Math.abs(p - a) <= s, m = Math.abs(d - f) <= s, g = Math.abs(c - o) <= s, y = Math.abs(h - u) <= s;
        v && (n.position.top = r._convertPositionTo("relative", {top:p, left:0}).top - r.margins.top), m && (n.position.top = r._convertPositionTo("relative", {top:d - r.helperProportions.height, left:0}).top - r.margins.top), g && (n.position.left = r._convertPositionTo("relative", {top:0, left:c}).left - r.margins.left), y && (n.position.left = r._convertPositionTo("relative", {top:0, left:h - r.helperProportions.width}).left - r.margins.left)
      }
      !r.snapElements[l].snapping && (v || m || g || y || b) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, e.extend(r._uiHash(), {snapItem:r.snapElements[l].item})), r.snapElements[l].snapping = v || m || g || y || b
    }
  }}), e.ui.plugin.add("draggable", "stack", {start:function(t, n) {
    var r = e(this).data("draggable").options, i = e.makeArray(e(r.stack)).sort(function(t, n) {
      return(parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0)
    });
    if(!i.length) {
      return
    }
    var s = parseInt(i[0].style.zIndex) || 0;
    e(i).each(function(e) {
      this.style.zIndex = s + e
    }), this[0].style.zIndex = s + i.length
  }}), e.ui.plugin.add("draggable", "zIndex", {start:function(t, n) {
    var r = e(n.helper), i = e(this).data("draggable").options;
    r.css("zIndex") && (i._zIndex = r.css("zIndex")), r.css("zIndex", i.zIndex)
  }, stop:function(t, n) {
    var r = e(this).data("draggable").options;
    r._zIndex && e(n.helper).css("zIndex", r._zIndex)
  }})
})(jQuery);
(function(e, t) {
  e.widget("ui.droppable", {version:"1.9.2", widgetEventPrefix:"drop", options:{accept:"*", activeClass:!1, addClasses:!0, greedy:!1, hoverClass:!1, scope:"default", tolerance:"intersect"}, _create:function() {
    var t = this.options, n = t.accept;
    this.isover = 0, this.isout = 1, this.accept = e.isFunction(n) ? n : function(e) {
      return e.is(n)
    }, this.proportions = {width:this.element[0].offsetWidth, height:this.element[0].offsetHeight}, e.ui.ddmanager.droppables[t.scope] = e.ui.ddmanager.droppables[t.scope] || [], e.ui.ddmanager.droppables[t.scope].push(this), t.addClasses && this.element.addClass("ui-droppable")
  }, _destroy:function() {
    var t = e.ui.ddmanager.droppables[this.options.scope];
    for(var n = 0;n < t.length;n++) {
      t[n] == this && t.splice(n, 1)
    }
    this.element.removeClass("ui-droppable ui-droppable-disabled")
  }, _setOption:function(t, n) {
    t == "accept" && (this.accept = e.isFunction(n) ? n : function(e) {
      return e.is(n)
    }), e.Widget.prototype._setOption.apply(this, arguments)
  }, _activate:function(t) {
    var n = e.ui.ddmanager.current;
    this.options.activeClass && this.element.addClass(this.options.activeClass), n && this._trigger("activate", t, this.ui(n))
  }, _deactivate:function(t) {
    var n = e.ui.ddmanager.current;
    this.options.activeClass && this.element.removeClass(this.options.activeClass), n && this._trigger("deactivate", t, this.ui(n))
  }, _over:function(t) {
    var n = e.ui.ddmanager.current;
    if(!n || (n.currentItem || n.element)[0] == this.element[0]) {
      return
    }
    this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(n)))
  }, _out:function(t) {
    var n = e.ui.ddmanager.current;
    if(!n || (n.currentItem || n.element)[0] == this.element[0]) {
      return
    }
    this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(n)))
  }, _drop:function(t, n) {
    var r = n || e.ui.ddmanager.current;
    if(!r || (r.currentItem || r.element)[0] == this.element[0]) {
      return!1
    }
    var i = !1;
    return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
      var t = e.data(this, "droppable");
      if(t.options.greedy && !t.options.disabled && t.options.scope == r.options.scope && t.accept.call(t.element[0], r.currentItem || r.element) && e.ui.intersect(r, e.extend(t, {offset:t.element.offset()}), t.options.tolerance)) {
        return i = !0, !1
      }
    }), i ? !1 : this.accept.call(this.element[0], r.currentItem || r.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(r)), this.element) : !1
  }, ui:function(e) {
    return{draggable:e.currentItem || e.element, helper:e.helper, position:e.position, offset:e.positionAbs}
  }}), e.ui.intersect = function(t, n, r) {
    if(!n.offset) {
      return!1
    }
    var i = (t.positionAbs || t.position.absolute).left, s = i + t.helperProportions.width, o = (t.positionAbs || t.position.absolute).top, u = o + t.helperProportions.height, a = n.offset.left, f = a + n.proportions.width, l = n.offset.top, c = l + n.proportions.height;
    switch(r) {
      case "fit":
        return a <= i && s <= f && l <= o && u <= c;
      case "intersect":
        return a < i + t.helperProportions.width / 2 && s - t.helperProportions.width / 2 < f && l < o + t.helperProportions.height / 2 && u - t.helperProportions.height / 2 < c;
      case "pointer":
        var h = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left, p = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top, d = e.ui.isOver(p, h, l, a, n.proportions.height, n.proportions.width);
        return d;
      case "touch":
        return(o >= l && o <= c || u >= l && u <= c || o < l && u > c) && (i >= a && i <= f || s >= a && s <= f || i < a && s > f);
      default:
        return!1
    }
  }, e.ui.ddmanager = {current:null, droppables:{"default":[]}, prepareOffsets:function(t, n) {
    var r = e.ui.ddmanager.droppables[t.options.scope] || [], i = n ? n.type : null, s = (t.currentItem || t.element).find(":data(droppable)").andSelf();
    e:for(var o = 0;o < r.length;o++) {
      if(r[o].options.disabled || t && !r[o].accept.call(r[o].element[0], t.currentItem || t.element)) {
        continue
      }
      for(var u = 0;u < s.length;u++) {
        if(s[u] == r[o].element[0]) {
          r[o].proportions.height = 0;
          continue e
        }
      }
      r[o].visible = r[o].element.css("display") != "none";
      if(!r[o].visible) {
        continue
      }
      i == "mousedown" && r[o]._activate.call(r[o], n), r[o].offset = r[o].element.offset(), r[o].proportions = {width:r[o].element[0].offsetWidth, height:r[o].element[0].offsetHeight}
    }
  }, drop:function(t, n) {
    var r = !1;
    return e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function() {
      if(!this.options) {
        return
      }
      !this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance) && (r = this._drop.call(this, n) || r), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, n))
    }), r
  }, dragStart:function(t, n) {
    t.element.parentsUntil("body").bind("scroll.droppable", function() {
      t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, n)
    })
  }, drag:function(t, n) {
    t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, n), e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function() {
      if(this.options.disabled || this.greedyChild || !this.visible) {
        return
      }
      var r = e.ui.intersect(t, this, this.options.tolerance), i = !r && this.isover == 1 ? "isout" : r && this.isover == 0 ? "isover" : null;
      if(!i) {
        return
      }
      var s;
      if(this.options.greedy) {
        var o = this.options.scope, u = this.element.parents(":data(droppable)").filter(function() {
          return e.data(this, "droppable").options.scope === o
        });
        u.length && (s = e.data(u[0], "droppable"), s.greedyChild = i == "isover" ? 1 : 0)
      }
      s && i == "isover" && (s.isover = 0, s.isout = 1, s._out.call(s, n)), this[i] = 1, this[i == "isout" ? "isover" : "isout"] = 0, this[i == "isover" ? "_over" : "_out"].call(this, n), s && i == "isout" && (s.isout = 0, s.isover = 1, s._over.call(s, n))
    })
  }, dragStop:function(t, n) {
    t.element.parentsUntil("body").unbind("scroll.droppable"), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, n)
  }}
})(jQuery);
(function(e, t) {
  e.widget("ui.sortable", e.ui.mouse, {version:"1.9.2", widgetEventPrefix:"sort", ready:!1, options:{appendTo:"parent", axis:!1, connectWith:!1, containment:!1, cursor:"auto", cursorAt:!1, dropOnEmpty:!0, forcePlaceholderSize:!1, forceHelperSize:!1, grid:!1, handle:!1, helper:"original", items:"> *", opacity:!1, placeholder:!1, revert:!1, scroll:!0, scrollSensitivity:20, scrollSpeed:20, scope:"default", tolerance:"intersect", zIndex:1E3}, _create:function() {
    var e = this.options;
    this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? e.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
  }, _destroy:function() {
    this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
    for(var e = this.items.length - 1;e >= 0;e--) {
      this.items[e].item.removeData(this.widgetName + "-item")
    }
    return this
  }, _setOption:function(t, n) {
    t === "disabled" ? (this.options[t] = n, this.widget().toggleClass("ui-sortable-disabled", !!n)) : e.Widget.prototype._setOption.apply(this, arguments)
  }, _mouseCapture:function(t, n) {
    var r = this;
    if(this.reverting) {
      return!1
    }
    if(this.options.disabled || this.options.type == "static") {
      return!1
    }
    this._refreshItems(t);
    var i = null, s = e(t.target).parents().each(function() {
      if(e.data(this, r.widgetName + "-item") == r) {
        return i = e(this), !1
      }
    });
    e.data(t.target, r.widgetName + "-item") == r && (i = e(t.target));
    if(!i) {
      return!1
    }
    if(this.options.handle && !n) {
      var o = !1;
      e(this.options.handle, i).find("*").andSelf().each(function() {
        this == t.target && (o = !0)
      });
      if(!o) {
        return!1
      }
    }
    return this.currentItem = i, this._removeCurrentsFromItems(), !0
  }, _mouseStart:function(t, n, r) {
    var i = this.options;
    this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {top:this.offset.top - this.margins.top, left:this.offset.left - this.margins.left}, e.extend(this.offset, {click:{left:t.pageX - this.offset.left, top:t.pageY - this.offset.top}, parent:this._getParentOffset(), relative:this._getRelativeOffset()}), 
    this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this.domPosition = {prev:this.currentItem.prev()[0], parent:this.currentItem.parent()[0]}, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), i.containment && this._setContainment(), i.cursor && (e("body").css("cursor") && 
    (this._storedCursor = e("body").css("cursor")), e("body").css("cursor", i.cursor)), i.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", i.opacity)), i.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", i.zIndex)), this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", 
    t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions();
    if(!r) {
      for(var s = this.containers.length - 1;s >= 0;s--) {
        this.containers[s]._trigger("activate", t, this._uiHash(this))
      }
    }
    return e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
  }, _mouseDrag:function(t) {
    this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
    if(this.options.scroll) {
      var n = this.options, r = !1;
      this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < n.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + n.scrollSpeed : t.pageY - this.overflowOffset.top < n.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - n.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < n.scrollSensitivity ? 
      this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + n.scrollSpeed : t.pageX - this.overflowOffset.left < n.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - n.scrollSpeed)) : (t.pageY - e(document).scrollTop() < n.scrollSensitivity ? r = e(document).scrollTop(e(document).scrollTop() - n.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < n.scrollSensitivity && (r = e(document).scrollTop(e(document).scrollTop() + 
      n.scrollSpeed)), t.pageX - e(document).scrollLeft() < n.scrollSensitivity ? r = e(document).scrollLeft(e(document).scrollLeft() - n.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < n.scrollSensitivity && (r = e(document).scrollLeft(e(document).scrollLeft() + n.scrollSpeed))), r !== !1 && e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)
    }
    this.positionAbs = this._convertPositionTo("absolute");
    if(!this.options.axis || this.options.axis != "y") {
      this.helper[0].style.left = this.position.left + "px"
    }
    if(!this.options.axis || this.options.axis != "x") {
      this.helper[0].style.top = this.position.top + "px"
    }
    for(var i = this.items.length - 1;i >= 0;i--) {
      var s = this.items[i], o = s.item[0], u = this._intersectsWithPointer(s);
      if(!u) {
        continue
      }
      if(s.instance !== this.currentContainer) {
        continue
      }
      if(o != this.currentItem[0] && this.placeholder[u == 1 ? "next" : "prev"]()[0] != o && !e.contains(this.placeholder[0], o) && (this.options.type == "semi-dynamic" ? !e.contains(this.element[0], o) : !0)) {
        this.direction = u == 1 ? "down" : "up";
        if(this.options.tolerance != "pointer" && !this._intersectsWithSides(s)) {
          break
        }
        this._rearrange(t, s), this._trigger("change", t, this._uiHash());
        break
      }
    }
    return this._contactContainers(t), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
  }, _mouseStop:function(t, n) {
    if(!t) {
      return
    }
    e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t);
    if(this.options.revert) {
      var r = this, i = this.placeholder.offset();
      this.reverting = !0, e(this.helper).animate({left:i.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft), top:i.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)}, parseInt(this.options.revert, 10) || 500, function() {
        r._clear(t)
      })
    }else {
      this._clear(t, n)
    }
    return!1
  }, cancel:function() {
    if(this.dragging) {
      this._mouseUp({target:null}), this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
      for(var t = this.containers.length - 1;t >= 0;t--) {
        this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0)
      }
    }
    return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, {helper:null, dragging:!1, reverting:!1, _noFinalSort:null}), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem)), this
  }, serialize:function(t) {
    var n = this._getItemsAsjQuery(t && t.connected), r = [];
    return t = t || {}, e(n).each(function() {
      var n = (e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[-=_](.+)/);
      n && r.push((t.key || n[1] + "[]") + "=" + (t.key && t.expression ? n[1] : n[2]))
    }), !r.length && t.key && r.push(t.key + "="), r.join("&")
  }, toArray:function(t) {
    var n = this._getItemsAsjQuery(t && t.connected), r = [];
    return t = t || {}, n.each(function() {
      r.push(e(t.item || this).attr(t.attribute || "id") || "")
    }), r
  }, _intersectsWith:function(e) {
    var t = this.positionAbs.left, n = t + this.helperProportions.width, r = this.positionAbs.top, i = r + this.helperProportions.height, s = e.left, o = s + e.width, u = e.top, a = u + e.height, f = this.offset.click.top, l = this.offset.click.left, c = r + f > u && r + f < a && t + l > s && t + l < o;
    return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > e[this.floating ? "width" : "height"] ? c : s < t + this.helperProportions.width / 2 && n - this.helperProportions.width / 2 < o && u < r + this.helperProportions.height / 2 && i - this.helperProportions.height / 2 < a
  }, _intersectsWithPointer:function(t) {
    var n = this.options.axis === "x" || e.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height), r = this.options.axis === "y" || e.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width), i = n && r, s = this._getDragVerticalDirection(), o = this._getDragHorizontalDirection();
    return i ? this.floating ? o && o == "right" || s == "down" ? 2 : 1 : s && (s == "down" ? 2 : 1) : !1
  }, _intersectsWithSides:function(t) {
    var n = e.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height), r = e.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width), i = this._getDragVerticalDirection(), s = this._getDragHorizontalDirection();
    return this.floating && s ? s == "right" && r || s == "left" && !r : i && (i == "down" && n || i == "up" && !n)
  }, _getDragVerticalDirection:function() {
    var e = this.positionAbs.top - this.lastPositionAbs.top;
    return e != 0 && (e > 0 ? "down" : "up")
  }, _getDragHorizontalDirection:function() {
    var e = this.positionAbs.left - this.lastPositionAbs.left;
    return e != 0 && (e > 0 ? "right" : "left")
  }, refresh:function(e) {
    return this._refreshItems(e), this.refreshPositions(), this
  }, _connectWith:function() {
    var e = this.options;
    return e.connectWith.constructor == String ? [e.connectWith] : e.connectWith
  }, _getItemsAsjQuery:function(t) {
    var n = [], r = [], i = this._connectWith();
    if(i && t) {
      for(var s = i.length - 1;s >= 0;s--) {
        var o = e(i[s]);
        for(var u = o.length - 1;u >= 0;u--) {
          var a = e.data(o[u], this.widgetName);
          a && a != this && !a.options.disabled && r.push([e.isFunction(a.options.items) ? a.options.items.call(a.element) : e(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a])
        }
      }
    }
    r.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {options:this.options, item:this.currentItem}) : e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
    for(var s = r.length - 1;s >= 0;s--) {
      r[s][0].each(function() {
        n.push(this)
      })
    }
    return e(n)
  }, _removeCurrentsFromItems:function() {
    var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
    this.items = e.grep(this.items, function(e) {
      for(var n = 0;n < t.length;n++) {
        if(t[n] == e.item[0]) {
          return!1
        }
      }
      return!0
    })
  }, _refreshItems:function(t) {
    this.items = [], this.containers = [this];
    var n = this.items, r = [[e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {item:this.currentItem}) : e(this.options.items, this.element), this]], i = this._connectWith();
    if(i && this.ready) {
      for(var s = i.length - 1;s >= 0;s--) {
        var o = e(i[s]);
        for(var u = o.length - 1;u >= 0;u--) {
          var a = e.data(o[u], this.widgetName);
          a && a != this && !a.options.disabled && (r.push([e.isFunction(a.options.items) ? a.options.items.call(a.element[0], t, {item:this.currentItem}) : e(a.options.items, a.element), a]), this.containers.push(a))
        }
      }
    }
    for(var s = r.length - 1;s >= 0;s--) {
      var f = r[s][1], l = r[s][0];
      for(var u = 0, c = l.length;u < c;u++) {
        var h = e(l[u]);
        h.data(this.widgetName + "-item", f), n.push({item:h, instance:f, width:0, height:0, left:0, top:0})
      }
    }
  }, refreshPositions:function(t) {
    this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
    for(var n = this.items.length - 1;n >= 0;n--) {
      var r = this.items[n];
      if(r.instance != this.currentContainer && this.currentContainer && r.item[0] != this.currentItem[0]) {
        continue
      }
      var i = this.options.toleranceElement ? e(this.options.toleranceElement, r.item) : r.item;
      t || (r.width = i.outerWidth(), r.height = i.outerHeight());
      var s = i.offset();
      r.left = s.left, r.top = s.top
    }
    if(this.options.custom && this.options.custom.refreshContainers) {
      this.options.custom.refreshContainers.call(this)
    }else {
      for(var n = this.containers.length - 1;n >= 0;n--) {
        var s = this.containers[n].element.offset();
        this.containers[n].containerCache.left = s.left, this.containers[n].containerCache.top = s.top, this.containers[n].containerCache.width = this.containers[n].element.outerWidth(), this.containers[n].containerCache.height = this.containers[n].element.outerHeight()
      }
    }
    return this
  }, _createPlaceholder:function(t) {
    t = t || this;
    var n = t.options;
    if(!n.placeholder || n.placeholder.constructor == String) {
      var r = n.placeholder;
      n.placeholder = {element:function() {
        var n = e(document.createElement(t.currentItem[0].nodeName)).addClass(r || t.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
        return r || (n.style.visibility = "hidden"), n
      }, update:function(e, i) {
        if(r && !n.forcePlaceholderSize) {
          return
        }
        i.height() || i.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), i.width() || i.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10))
      }}
    }
    t.placeholder = e(n.placeholder.element.call(t.element, t.currentItem)), t.currentItem.after(t.placeholder), n.placeholder.update(t, t.placeholder)
  }, _contactContainers:function(t) {
    var n = null, r = null;
    for(var i = this.containers.length - 1;i >= 0;i--) {
      if(e.contains(this.currentItem[0], this.containers[i].element[0])) {
        continue
      }
      if(this._intersectsWith(this.containers[i].containerCache)) {
        if(n && e.contains(this.containers[i].element[0], n.element[0])) {
          continue
        }
        n = this.containers[i], r = i
      }else {
        this.containers[i].containerCache.over && (this.containers[i]._trigger("out", t, this._uiHash(this)), this.containers[i].containerCache.over = 0)
      }
    }
    if(!n) {
      return
    }
    if(this.containers.length === 1) {
      this.containers[r]._trigger("over", t, this._uiHash(this)), this.containers[r].containerCache.over = 1
    }else {
      var s = 1E4, o = null, u = this.containers[r].floating ? "left" : "top", a = this.containers[r].floating ? "width" : "height", f = this.positionAbs[u] + this.offset.click[u];
      for(var l = this.items.length - 1;l >= 0;l--) {
        if(!e.contains(this.containers[r].element[0], this.items[l].item[0])) {
          continue
        }
        if(this.items[l].item[0] == this.currentItem[0]) {
          continue
        }
        var c = this.items[l].item.offset()[u], h = !1;
        Math.abs(c - f) > Math.abs(c + this.items[l][a] - f) && (h = !0, c += this.items[l][a]), Math.abs(c - f) < s && (s = Math.abs(c - f), o = this.items[l], this.direction = h ? "up" : "down")
      }
      if(!o && !this.options.dropOnEmpty) {
        return
      }
      this.currentContainer = this.containers[r], o ? this._rearrange(t, o, null, !0) : this._rearrange(t, null, this.containers[r].element, !0), this._trigger("change", t, this._uiHash()), this.containers[r]._trigger("change", t, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[r]._trigger("over", t, this._uiHash(this)), this.containers[r].containerCache.over = 1
    }
  }, _createHelper:function(t) {
    var n = this.options, r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t, this.currentItem])) : n.helper == "clone" ? this.currentItem.clone() : this.currentItem;
    return r.parents("body").length || e(n.appendTo != "parent" ? n.appendTo : this.currentItem[0].parentNode)[0].appendChild(r[0]), r[0] == this.currentItem[0] && (this._storedCSS = {width:this.currentItem[0].style.width, height:this.currentItem[0].style.height, position:this.currentItem.css("position"), top:this.currentItem.css("top"), left:this.currentItem.css("left")}), (r[0].style.width == "" || n.forceHelperSize) && r.width(this.currentItem.width()), (r[0].style.height == "" || n.forceHelperSize) && 
    r.height(this.currentItem.height()), r
  }, _adjustOffsetFromHelper:function(t) {
    typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {left:+t[0], top:+t[1] || 0}), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
  }, _getParentOffset:function() {
    this.offsetParent = this.helper.offsetParent();
    var t = this.offsetParent.offset();
    this.cssPosition == "absolute" && this.scrollParent[0] != document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
    if(this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.ui.ie) {
      t = {top:0, left:0}
    }
    return{top:t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left:t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
  }, _getRelativeOffset:function() {
    if(this.cssPosition == "relative") {
      var e = this.currentItem.position();
      return{top:e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left:e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
    }
    return{top:0, left:0}
  }, _cacheMargins:function() {
    this.margins = {left:parseInt(this.currentItem.css("marginLeft"), 10) || 0, top:parseInt(this.currentItem.css("marginTop"), 10) || 0}
  }, _cacheHelperProportions:function() {
    this.helperProportions = {width:this.helper.outerWidth(), height:this.helper.outerHeight()}
  }, _setContainment:function() {
    var t = this.options;
    t.containment == "parent" && (t.containment = this.helper[0].parentNode);
    if(t.containment == "document" || t.containment == "window") {
      this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, e(t.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (e(t.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
    }
    if(!/^(document|window|parent)$/.test(t.containment)) {
      var n = e(t.containment)[0], r = e(t.containment).offset(), i = e(n).css("overflow") != "hidden";
      this.containment = [r.left + (parseInt(e(n).css("borderLeftWidth"), 10) || 0) + (parseInt(e(n).css("paddingLeft"), 10) || 0) - this.margins.left, r.top + (parseInt(e(n).css("borderTopWidth"), 10) || 0) + (parseInt(e(n).css("paddingTop"), 10) || 0) - this.margins.top, r.left + (i ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(e(n).css("borderLeftWidth"), 10) || 0) - (parseInt(e(n).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, r.top + 
      (i ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(e(n).css("borderTopWidth"), 10) || 0) - (parseInt(e(n).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
    }
  }, _convertPositionTo:function(t, n) {
    n || (n = this.position);
    var r = t == "absolute" ? 1 : -1, i = this.options, s = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, o = /(html|body)/i.test(s[0].tagName);
    return{top:n.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * r, left:n.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * r}
  }, _generatePosition:function(t) {
    var n = this.options, r = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, i = /(html|body)/i.test(r[0].tagName);
    this.cssPosition == "relative" && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
    var s = t.pageX, o = t.pageY;
    if(this.originalPosition) {
      this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (s = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (s = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top));
      if(n.grid) {
        var u = this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1];
        o = this.containment ? u - this.offset.click.top < this.containment[1] || u - this.offset.click.top > this.containment[3] ? u - this.offset.click.top < this.containment[1] ? u + n.grid[1] : u - n.grid[1] : u : u;
        var a = this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0];
        s = this.containment ? a - this.offset.click.left < this.containment[0] || a - this.offset.click.left > this.containment[2] ? a - this.offset.click.left < this.containment[0] ? a + n.grid[0] : a - n.grid[0] : a : a
      }
    }
    return{top:o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()), left:s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())}
  }, _rearrange:function(e, t, n, r) {
    n ? n[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? t.item[0] : t.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
    var i = this.counter;
    this._delay(function() {
      i == this.counter && this.refreshPositions(!r)
    })
  }, _clear:function(t, n) {
    this.reverting = !1;
    var r = [];
    !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null;
    if(this.helper[0] == this.currentItem[0]) {
      for(var i in this._storedCSS) {
        if(this._storedCSS[i] == "auto" || this._storedCSS[i] == "static") {
          this._storedCSS[i] = ""
        }
      }
      this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
    }else {
      this.currentItem.show()
    }
    this.fromOutside && !n && r.push(function(e) {
      this._trigger("receive", e, this._uiHash(this.fromOutside))
    }), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !n && r.push(function(e) {
      this._trigger("update", e, this._uiHash())
    }), this !== this.currentContainer && (n || (r.push(function(e) {
      this._trigger("remove", e, this._uiHash())
    }), r.push(function(e) {
      return function(t) {
        e._trigger("receive", t, this._uiHash(this))
      }
    }.call(this, this.currentContainer)), r.push(function(e) {
      return function(t) {
        e._trigger("update", t, this._uiHash(this))
      }
    }.call(this, this.currentContainer))));
    for(var i = this.containers.length - 1;i >= 0;i--) {
      n || r.push(function(e) {
        return function(t) {
          e._trigger("deactivate", t, this._uiHash(this))
        }
      }.call(this, this.containers[i])), this.containers[i].containerCache.over && (r.push(function(e) {
        return function(t) {
          e._trigger("out", t, this._uiHash(this))
        }
      }.call(this, this.containers[i])), this.containers[i].containerCache.over = 0)
    }
    this._storedCursor && e("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex), this.dragging = !1;
    if(this.cancelHelperRemoval) {
      if(!n) {
        this._trigger("beforeStop", t, this._uiHash());
        for(var i = 0;i < r.length;i++) {
          r[i].call(this, t)
        }
        this._trigger("stop", t, this._uiHash())
      }
      return this.fromOutside = !1, !1
    }
    n || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null;
    if(!n) {
      for(var i = 0;i < r.length;i++) {
        r[i].call(this, t)
      }
      this._trigger("stop", t, this._uiHash())
    }
    return this.fromOutside = !1, !0
  }, _trigger:function() {
    e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
  }, _uiHash:function(t) {
    var n = t || this;
    return{helper:n.helper, placeholder:n.placeholder || e([]), position:n.position, originalPosition:n.originalPosition, offset:n.positionAbs, item:n.currentItem, sender:t ? t.element : null}
  }})
})(jQuery);
(function(e, t) {
  var n = 0;
  e.widget("ui.autocomplete", {version:"1.9.2", defaultElement:"<input>", options:{appendTo:"body", autoFocus:!1, delay:300, minLength:1, position:{my:"left top", at:"left bottom", collision:"none"}, source:null, change:null, close:null, focus:null, open:null, response:null, search:null, select:null}, pending:0, _create:function() {
    var t, n, r;
    this.isMultiLine = this._isMultiLine(), this.valueMethod = this.element[this.element.is("input,textarea") ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {keydown:function(i) {
      if(this.element.prop("readOnly")) {
        t = !0, r = !0, n = !0;
        return
      }
      t = !1, r = !1, n = !1;
      var s = e.ui.keyCode;
      switch(i.keyCode) {
        case s.PAGE_UP:
          t = !0, this._move("previousPage", i);
          break;
        case s.PAGE_DOWN:
          t = !0, this._move("nextPage", i);
          break;
        case s.UP:
          t = !0, this._keyEvent("previous", i);
          break;
        case s.DOWN:
          t = !0, this._keyEvent("next", i);
          break;
        case s.ENTER:
        ;
        case s.NUMPAD_ENTER:
          this.menu.active && (t = !0, i.preventDefault(), this.menu.select(i));
          break;
        case s.TAB:
          this.menu.active && this.menu.select(i);
          break;
        case s.ESCAPE:
          this.menu.element.is(":visible") && (this._value(this.term), this.close(i), i.preventDefault());
          break;
        default:
          n = !0, this._searchTimeout(i)
      }
    }, keypress:function(r) {
      if(t) {
        t = !1, r.preventDefault();
        return
      }
      if(n) {
        return
      }
      var i = e.ui.keyCode;
      switch(r.keyCode) {
        case i.PAGE_UP:
          this._move("previousPage", r);
          break;
        case i.PAGE_DOWN:
          this._move("nextPage", r);
          break;
        case i.UP:
          this._keyEvent("previous", r);
          break;
        case i.DOWN:
          this._keyEvent("next", r)
      }
    }, input:function(e) {
      if(r) {
        r = !1, e.preventDefault();
        return
      }
      this._searchTimeout(e)
    }, focus:function() {
      this.selectedItem = null, this.previous = this._value()
    }, blur:function(e) {
      if(this.cancelBlur) {
        delete this.cancelBlur;
        return
      }
      clearTimeout(this.searching), this.close(e), this._change(e)
    }}), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete").appendTo(this.document.find(this.options.appendTo || "body")[0]).menu({input:e(), role:null}).zIndex(this.element.zIndex() + 1).hide().data("menu"), this._on(this.menu.element, {mousedown:function(t) {
      t.preventDefault(), this.cancelBlur = !0, this._delay(function() {
        delete this.cancelBlur
      });
      var n = this.menu.element[0];
      e(t.target).closest(".ui-menu-item").length || this._delay(function() {
        var t = this;
        this.document.one("mousedown", function(r) {
          r.target !== t.element[0] && r.target !== n && !e.contains(n, r.target) && t.close()
        })
      })
    }, menufocus:function(t, n) {
      if(this.isNewMenu) {
        this.isNewMenu = !1;
        if(t.originalEvent && /^mouse/.test(t.originalEvent.type)) {
          this.menu.blur(), this.document.one("mousemove", function() {
            e(t.target).trigger(t.originalEvent)
          });
          return
        }
      }
      var r = n.item.data("ui-autocomplete-item") || n.item.data("item.autocomplete");
      !1 !== this._trigger("focus", t, {item:r}) ? t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(r.value) : this.liveRegion.text(r.value)
    }, menuselect:function(e, t) {
      var n = t.item.data("ui-autocomplete-item") || t.item.data("item.autocomplete"), r = this.previous;
      this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = r, this._delay(function() {
        this.previous = r, this.selectedItem = n
      })), !1 !== this._trigger("select", e, {item:n}) && this._value(n.value), this.term = this._value(), this.close(e), this.selectedItem = n
    }}), this.liveRegion = e("<span>", {role:"status", "aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertAfter(this.element), e.fn.bgiframe && this.menu.element.bgiframe(), this._on(this.window, {beforeunload:function() {
      this.element.removeAttr("autocomplete")
    }})
  }, _destroy:function() {
    clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
  }, _setOption:function(e, t) {
    this._super(e, t), e === "source" && this._initSource(), e === "appendTo" && this.menu.element.appendTo(this.document.find(t || "body")[0]), e === "disabled" && t && this.xhr && this.xhr.abort()
  }, _isMultiLine:function() {
    return this.element.is("textarea") ? !0 : this.element.is("input") ? !1 : this.element.prop("isContentEditable")
  }, _initSource:function() {
    var t, n, r = this;
    e.isArray(this.options.source) ? (t = this.options.source, this.source = function(n, r) {
      r(e.ui.autocomplete.filter(t, n.term))
    }) : typeof this.options.source == "string" ? (n = this.options.source, this.source = function(t, i) {
      r.xhr && r.xhr.abort(), r.xhr = e.ajax({url:n, data:t, dataType:"json", success:function(e) {
        i(e)
      }, error:function() {
        i([])
      }})
    }) : this.source = this.options.source
  }, _searchTimeout:function(e) {
    clearTimeout(this.searching), this.searching = this._delay(function() {
      this.term !== this._value() && (this.selectedItem = null, this.search(null, e))
    }, this.options.delay)
  }, search:function(e, t) {
    e = e != null ? e : this._value(), this.term = this._value();
    if(e.length < this.options.minLength) {
      return this.close(t)
    }
    if(this._trigger("search", t) === !1) {
      return
    }
    return this._search(e)
  }, _search:function(e) {
    this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({term:e}, this._response())
  }, _response:function() {
    var e = this, t = ++n;
    return function(r) {
      t === n && e.__response(r), e.pending--, e.pending || e.element.removeClass("ui-autocomplete-loading")
    }
  }, __response:function(e) {
    e && (e = this._normalize(e)), this._trigger("response", null, {content:e}), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close()
  }, close:function(e) {
    this.cancelSearch = !0, this._close(e)
  }, _close:function(e) {
    this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e))
  }, _change:function(e) {
    this.previous !== this._value() && this._trigger("change", e, {item:this.selectedItem})
  }, _normalize:function(t) {
    return t.length && t[0].label && t[0].value ? t : e.map(t, function(t) {
      return typeof t == "string" ? {label:t, value:t} : e.extend({label:t.label || t.value, value:t.value || t.label}, t)
    })
  }, _suggest:function(t) {
    var n = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
    this._renderMenu(n, t), this.menu.refresh(), n.show(), this._resizeMenu(), n.position(e.extend({of:this.element}, this.options.position)), this.options.autoFocus && this.menu.next()
  }, _resizeMenu:function() {
    var e = this.menu.element;
    e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
  }, _renderMenu:function(t, n) {
    var r = this;
    e.each(n, function(e, n) {
      r._renderItemData(t, n)
    })
  }, _renderItemData:function(e, t) {
    return this._renderItem(e, t).data("ui-autocomplete-item", t)
  }, _renderItem:function(t, n) {
    return e("<li>").append(e("<a>").text(n.label)).appendTo(t)
  }, _move:function(e, t) {
    if(!this.menu.element.is(":visible")) {
      this.search(null, t);
      return
    }
    if(this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e)) {
      this._value(this.term), this.menu.blur();
      return
    }
    this.menu[e](t)
  }, widget:function() {
    return this.menu.element
  }, _value:function() {
    return this.valueMethod.apply(this.element, arguments)
  }, _keyEvent:function(e, t) {
    if(!this.isMultiLine || this.menu.element.is(":visible")) {
      this._move(e, t), t.preventDefault()
    }
  }}), e.extend(e.ui.autocomplete, {escapeRegex:function(e) {
    return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
  }, filter:function(t, n) {
    var r = new RegExp(e.ui.autocomplete.escapeRegex(n), "i");
    return e.grep(t, function(e) {
      return r.test(e.label || e.value || e)
    })
  }}), e.widget("ui.autocomplete", e.ui.autocomplete, {options:{messages:{noResults:"No search results.", results:function(e) {
    return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
  }}}, __response:function(e) {
    var t;
    this._superApply(arguments);
    if(this.options.disabled || this.cancelSearch) {
      return
    }
    e && e.length ? t = this.options.messages.results(e.length) : t = this.options.messages.noResults, this.liveRegion.text(t)
  }})
})(jQuery);
(function(e, t) {
  var n = !1;
  e.widget("ui.menu", {version:"1.9.2", defaultElement:"<ul>", delay:300, options:{icons:{submenu:"ui-icon-carat-1-e"}, menus:"ul", position:{my:"left top", at:"right top"}, role:"menu", blur:null, focus:null, select:null}, _create:function() {
    this.activeMenu = this.element, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({role:this.options.role, tabIndex:0}).bind("click" + this.eventNamespace, e.proxy(function(e) {
      this.options.disabled && e.preventDefault()
    }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({"mousedown .ui-menu-item > a":function(e) {
      e.preventDefault()
    }, "click .ui-state-disabled > a":function(e) {
      e.preventDefault()
    }, "click .ui-menu-item:has(a)":function(t) {
      var r = e(t.target).closest(".ui-menu-item");
      !n && r.not(".ui-state-disabled").length && (n = !0, this.select(t), r.has(".ui-menu").length ? this.expand(t) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && this.active.parents(".ui-menu").length === 1 && clearTimeout(this.timer)))
    }, "mouseenter .ui-menu-item":function(t) {
      var n = e(t.currentTarget);
      n.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(t, n)
    }, mouseleave:"collapseAll", "mouseleave .ui-menu":"collapseAll", focus:function(e, t) {
      var n = this.active || this.element.children(".ui-menu-item").eq(0);
      t || this.focus(e, n)
    }, blur:function(t) {
      this._delay(function() {
        e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
      })
    }, keydown:"_keydown"}), this.refresh(), this._on(this.document, {click:function(t) {
      e(t.target).closest(".ui-menu").length || this.collapseAll(t), n = !1
    }})
  }, _destroy:function() {
    this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
      var t = e(this);
      t.data("ui-menu-submenu-carat") && t.remove()
    }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
  }, _keydown:function(t) {
    function a(e) {
      return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
    }
    var n, r, i, s, o, u = !0;
    switch(t.keyCode) {
      case e.ui.keyCode.PAGE_UP:
        this.previousPage(t);
        break;
      case e.ui.keyCode.PAGE_DOWN:
        this.nextPage(t);
        break;
      case e.ui.keyCode.HOME:
        this._move("first", "first", t);
        break;
      case e.ui.keyCode.END:
        this._move("last", "last", t);
        break;
      case e.ui.keyCode.UP:
        this.previous(t);
        break;
      case e.ui.keyCode.DOWN:
        this.next(t);
        break;
      case e.ui.keyCode.LEFT:
        this.collapse(t);
        break;
      case e.ui.keyCode.RIGHT:
        this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
        break;
      case e.ui.keyCode.ENTER:
      ;
      case e.ui.keyCode.SPACE:
        this._activate(t);
        break;
      case e.ui.keyCode.ESCAPE:
        this.collapse(t);
        break;
      default:
        u = !1, r = this.previousFilter || "", i = String.fromCharCode(t.keyCode), s = !1, clearTimeout(this.filterTimer), i === r ? s = !0 : i = r + i, o = new RegExp("^" + a(i), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function() {
          return o.test(e(this).children("a").text())
        }), n = s && n.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : n, n.length || (i = String.fromCharCode(t.keyCode), o = new RegExp("^" + a(i), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function() {
          return o.test(e(this).children("a").text())
        })), n.length ? (this.focus(t, n), n.length > 1 ? (this.previousFilter = i, this.filterTimer = this._delay(function() {
          delete this.previousFilter
        }, 1E3)) : delete this.previousFilter) : delete this.previousFilter
    }
    u && t.preventDefault()
  }, _activate:function(e) {
    this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(e) : this.select(e))
  }, refresh:function() {
    var t, n = this.options.icons.submenu, r = this.element.find(this.options.menus);
    r.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role, "aria-hidden":"true", "aria-expanded":"false"}).each(function() {
      var t = e(this), r = t.prev("a"), i = e("<span>").addClass("ui-menu-icon ui-icon " + n).data("ui-menu-submenu-carat", !0);
      r.attr("aria-haspopup", "true").prepend(i), t.attr("aria-labelledby", r.attr("id"))
    }), t = r.add(this.element), t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1, role:this._itemRole()}), t.children(":not(.ui-menu-item)").each(function() {
      var t = e(this);
      /[^\-\u2014\u2013\s]/.test(t.text()) || t.addClass("ui-widget-content ui-menu-divider")
    }), t.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !e.contains(this.element[0], this.active[0]) && this.blur()
  }, _itemRole:function() {
    return{menu:"menuitem", listbox:"option"}[this.options.role]
  }, focus:function(e, t) {
    var n, r;
    this.blur(e, e && e.type === "focus"), this._scrollIntoView(t), this.active = t.first(), r = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", r.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), e && e.type === "keydown" ? this._close() : this.timer = this._delay(function() {
      this._close()
    }, this.delay), n = t.children(".ui-menu"), n.length && /^mouse/.test(e.type) && this._startOpening(n), this.activeMenu = t.parent(), this._trigger("focus", e, {item:t})
  }, _scrollIntoView:function(t) {
    var n, r, i, s, o, u;
    this._hasScroll() && (n = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, r = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - n - r, s = this.activeMenu.scrollTop(), o = this.activeMenu.height(), u = t.height(), i < 0 ? this.activeMenu.scrollTop(s + i) : i + u > o && this.activeMenu.scrollTop(s + i - o + u))
  }, blur:function(e, t) {
    t || clearTimeout(this.timer);
    if(!this.active) {
      return
    }
    this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", e, {item:this.active})
  }, _startOpening:function(e) {
    clearTimeout(this.timer);
    if(e.attr("aria-hidden") !== "true") {
      return
    }
    this.timer = this._delay(function() {
      this._close(), this._open(e)
    }, this.delay)
  }, _open:function(t) {
    var n = e.extend({of:this.active}, this.options.position);
    clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(n)
  }, collapseAll:function(t, n) {
    clearTimeout(this.timer), this.timer = this._delay(function() {
      var r = n ? this.element : e(t && t.target).closest(this.element.find(".ui-menu"));
      r.length || (r = this.element), this._close(r), this.blur(t), this.activeMenu = r
    }, this.delay)
  }, _close:function(e) {
    e || (e = this.active ? this.active.parent() : this.element), e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
  }, collapse:function(e) {
    var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
    t && t.length && (this._close(), this.focus(e, t))
  }, expand:function(e) {
    var t = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
    t && t.length && (this._open(t.parent()), this._delay(function() {
      this.focus(e, t)
    }))
  }, next:function(e) {
    this._move("next", "first", e)
  }, previous:function(e) {
    this._move("prev", "last", e)
  }, isFirstItem:function() {
    return this.active && !this.active.prevAll(".ui-menu-item").length
  }, isLastItem:function() {
    return this.active && !this.active.nextAll(".ui-menu-item").length
  }, _move:function(e, t, n) {
    var r;
    this.active && (e === "first" || e === "last" ? r = this.active[e === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : r = this.active[e + "All"](".ui-menu-item").eq(0));
    if(!r || !r.length || !this.active) {
      r = this.activeMenu.children(".ui-menu-item")[t]()
    }
    this.focus(n, r)
  }, nextPage:function(t) {
    var n, r, i;
    if(!this.active) {
      this.next(t);
      return
    }
    if(this.isLastItem()) {
      return
    }
    this._hasScroll() ? (r = this.active.offset().top, i = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
      return n = e(this), n.offset().top - r - i < 0
    }), this.focus(t, n)) : this.focus(t, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())
  }, previousPage:function(t) {
    var n, r, i;
    if(!this.active) {
      this.next(t);
      return
    }
    if(this.isFirstItem()) {
      return
    }
    this._hasScroll() ? (r = this.active.offset().top, i = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
      return n = e(this), n.offset().top - r + i > 0
    }), this.focus(t, n)) : this.focus(t, this.activeMenu.children(".ui-menu-item").first())
  }, _hasScroll:function() {
    return this.element.outerHeight() < this.element.prop("scrollHeight")
  }, select:function(t) {
    this.active = this.active || e(t.target).closest(".ui-menu-item");
    var n = {item:this.active};
    this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, n)
  }})
})(jQuery);
(function(e, t) {
  var n = 5;
  e.widget("ui.slider", e.ui.mouse, {version:"1.9.2", widgetEventPrefix:"slide", options:{animate:!1, distance:0, max:100, min:0, orientation:"horizontal", range:!1, step:1, value:0, values:null}, _create:function() {
    var t, r, i = this.options, s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), o = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>", u = [];
    this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all" + (i.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = e([]), i.range && (i.range === !0 && (i.values || (i.values = [this._valueMin(), this._valueMin()]), i.values.length && i.values.length !== 2 && (i.values = [i.values[0], 
    i.values[0]])), this.range = e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (i.range === "min" || i.range === "max" ? " ui-slider-range-" + i.range : ""))), r = i.values && i.values.length || 1;
    for(t = s.length;t < r;t++) {
      u.push(o)
    }
    this.handles = s.add(e(u.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(e) {
      e.preventDefault()
    }).mouseenter(function() {
      i.disabled || e(this).addClass("ui-state-hover")
    }).mouseleave(function() {
      e(this).removeClass("ui-state-hover")
    }).focus(function() {
      i.disabled ? e(this).blur() : (e(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), e(this).addClass("ui-state-focus"))
    }).blur(function() {
      e(this).removeClass("ui-state-focus")
    }), this.handles.each(function(t) {
      e(this).data("ui-slider-handle-index", t)
    }), this._on(this.handles, {keydown:function(t) {
      var r, i, s, o, u = e(t.target).data("ui-slider-handle-index");
      switch(t.keyCode) {
        case e.ui.keyCode.HOME:
        ;
        case e.ui.keyCode.END:
        ;
        case e.ui.keyCode.PAGE_UP:
        ;
        case e.ui.keyCode.PAGE_DOWN:
        ;
        case e.ui.keyCode.UP:
        ;
        case e.ui.keyCode.RIGHT:
        ;
        case e.ui.keyCode.DOWN:
        ;
        case e.ui.keyCode.LEFT:
          t.preventDefault();
          if(!this._keySliding) {
            this._keySliding = !0, e(t.target).addClass("ui-state-active"), r = this._start(t, u);
            if(r === !1) {
              return
            }
          }
      }
      o = this.options.step, this.options.values && this.options.values.length ? i = s = this.values(u) : i = s = this.value();
      switch(t.keyCode) {
        case e.ui.keyCode.HOME:
          s = this._valueMin();
          break;
        case e.ui.keyCode.END:
          s = this._valueMax();
          break;
        case e.ui.keyCode.PAGE_UP:
          s = this._trimAlignValue(i + (this._valueMax() - this._valueMin()) / n);
          break;
        case e.ui.keyCode.PAGE_DOWN:
          s = this._trimAlignValue(i - (this._valueMax() - this._valueMin()) / n);
          break;
        case e.ui.keyCode.UP:
        ;
        case e.ui.keyCode.RIGHT:
          if(i === this._valueMax()) {
            return
          }
          s = this._trimAlignValue(i + o);
          break;
        case e.ui.keyCode.DOWN:
        ;
        case e.ui.keyCode.LEFT:
          if(i === this._valueMin()) {
            return
          }
          s = this._trimAlignValue(i - o)
      }
      this._slide(t, u, s)
    }, keyup:function(t) {
      var n = e(t.target).data("ui-slider-handle-index");
      this._keySliding && (this._keySliding = !1, this._stop(t, n), this._change(t, n), e(t.target).removeClass("ui-state-active"))
    }}), this._refreshValue(), this._animateOff = !1
  }, _destroy:function() {
    this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
  }, _mouseCapture:function(t) {
    var n, r, i, s, o, u, a, f, l = this, c = this.options;
    return c.disabled ? !1 : (this.elementSize = {width:this.element.outerWidth(), height:this.element.outerHeight()}, this.elementOffset = this.element.offset(), n = {x:t.pageX, y:t.pageY}, r = this._normValueFromMouse(n), i = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
      var n = Math.abs(r - l.values(t));
      i > n && (i = n, s = e(this), o = t)
    }), c.range === !0 && this.values(1) === c.min && (o += 1, s = e(this.handles[o])), u = this._start(t, o), u === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, s.addClass("ui-state-active").focus(), a = s.offset(), f = !e(t.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = f ? {left:0, top:0} : {left:t.pageX - a.left - s.width() / 2, top:t.pageY - a.top - s.height() / 2 - (parseInt(s.css("borderTopWidth"), 10) || 0) - (parseInt(s.css("borderBottomWidth"), 10) || 
    0) + (parseInt(s.css("marginTop"), 10) || 0)}, this.handles.hasClass("ui-state-hover") || this._slide(t, o, r), this._animateOff = !0, !0))
  }, _mouseStart:function() {
    return!0
  }, _mouseDrag:function(e) {
    var t = {x:e.pageX, y:e.pageY}, n = this._normValueFromMouse(t);
    return this._slide(e, this._handleIndex, n), !1
  }, _mouseStop:function(e) {
    return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
  }, _detectOrientation:function() {
    this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
  }, _normValueFromMouse:function(e) {
    var t, n, r, i, s;
    return this.orientation === "horizontal" ? (t = this.elementSize.width, n = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, n = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), r = n / t, r > 1 && (r = 1), r < 0 && (r = 0), this.orientation === "vertical" && (r = 1 - r), i = this._valueMax() - this._valueMin(), s = this._valueMin() + r * i, this._trimAlignValue(s)
  }, _start:function(e, t) {
    var n = {handle:this.handles[t], value:this.value()};
    return this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("start", e, n)
  }, _slide:function(e, t, n) {
    var r, i, s;
    this.options.values && this.options.values.length ? (r = this.values(t ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (t === 0 && n > r || t === 1 && n < r) && (n = r), n !== this.values(t) && (i = this.values(), i[t] = n, s = this._trigger("slide", e, {handle:this.handles[t], value:n, values:i}), r = this.values(t ? 0 : 1), s !== !1 && this.values(t, n, !0))) : n !== this.value() && (s = this._trigger("slide", e, {handle:this.handles[t], value:n}), s !== !1 && this.value(n))
  }, _stop:function(e, t) {
    var n = {handle:this.handles[t], value:this.value()};
    this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("stop", e, n)
  }, _change:function(e, t) {
    if(!this._keySliding && !this._mouseSliding) {
      var n = {handle:this.handles[t], value:this.value()};
      this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("change", e, n)
    }
  }, value:function(e) {
    if(arguments.length) {
      this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0);
      return
    }
    return this._value()
  }, values:function(t, n) {
    var r, i, s;
    if(arguments.length > 1) {
      this.options.values[t] = this._trimAlignValue(n), this._refreshValue(), this._change(null, t);
      return
    }
    if(!arguments.length) {
      return this._values()
    }
    if(!e.isArray(arguments[0])) {
      return this.options.values && this.options.values.length ? this._values(t) : this.value()
    }
    r = this.options.values, i = arguments[0];
    for(s = 0;s < r.length;s += 1) {
      r[s] = this._trimAlignValue(i[s]), this._change(null, s)
    }
    this._refreshValue()
  }, _setOption:function(t, n) {
    var r, i = 0;
    e.isArray(this.options.values) && (i = this.options.values.length), e.Widget.prototype._setOption.apply(this, arguments);
    switch(t) {
      case "disabled":
        n ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.prop("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.prop("disabled", !1), this.element.removeClass("ui-disabled"));
        break;
      case "orientation":
        this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
        break;
      case "value":
        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
        break;
      case "values":
        this._animateOff = !0, this._refreshValue();
        for(r = 0;r < i;r += 1) {
          this._change(null, r)
        }
        this._animateOff = !1;
        break;
      case "min":
      ;
      case "max":
        this._animateOff = !0, this._refreshValue(), this._animateOff = !1
    }
  }, _value:function() {
    var e = this.options.value;
    return e = this._trimAlignValue(e), e
  }, _values:function(e) {
    var t, n, r;
    if(arguments.length) {
      return t = this.options.values[e], t = this._trimAlignValue(t), t
    }
    n = this.options.values.slice();
    for(r = 0;r < n.length;r += 1) {
      n[r] = this._trimAlignValue(n[r])
    }
    return n
  }, _trimAlignValue:function(e) {
    if(e <= this._valueMin()) {
      return this._valueMin()
    }
    if(e >= this._valueMax()) {
      return this._valueMax()
    }
    var t = this.options.step > 0 ? this.options.step : 1, n = (e - this._valueMin()) % t, r = e - n;
    return Math.abs(n) * 2 >= t && (r += n > 0 ? t : -t), parseFloat(r.toFixed(5))
  }, _valueMin:function() {
    return this.options.min
  }, _valueMax:function() {
    return this.options.max
  }, _refreshValue:function() {
    var t, n, r, i, s, o = this.options.range, u = this.options, a = this, f = this._animateOff ? !1 : u.animate, l = {};
    this.options.values && this.options.values.length ? this.handles.each(function(r) {
      n = (a.values(r) - a._valueMin()) / (a._valueMax() - a._valueMin()) * 100, l[a.orientation === "horizontal" ? "left" : "bottom"] = n + "%", e(this).stop(1, 1)[f ? "animate" : "css"](l, u.animate), a.options.range === !0 && (a.orientation === "horizontal" ? (r === 0 && a.range.stop(1, 1)[f ? "animate" : "css"]({left:n + "%"}, u.animate), r === 1 && a.range[f ? "animate" : "css"]({width:n - t + "%"}, {queue:!1, duration:u.animate})) : (r === 0 && a.range.stop(1, 1)[f ? "animate" : "css"]({bottom:n + 
      "%"}, u.animate), r === 1 && a.range[f ? "animate" : "css"]({height:n - t + "%"}, {queue:!1, duration:u.animate}))), t = n
    }) : (r = this.value(), i = this._valueMin(), s = this._valueMax(), n = s !== i ? (r - i) / (s - i) * 100 : 0, l[this.orientation === "horizontal" ? "left" : "bottom"] = n + "%", this.handle.stop(1, 1)[f ? "animate" : "css"](l, u.animate), o === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[f ? "animate" : "css"]({width:n + "%"}, u.animate), o === "max" && this.orientation === "horizontal" && this.range[f ? "animate" : "css"]({width:100 - n + "%"}, {queue:!1, duration:u.animate}), 
    o === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[f ? "animate" : "css"]({height:n + "%"}, u.animate), o === "max" && this.orientation === "vertical" && this.range[f ? "animate" : "css"]({height:100 - n + "%"}, {queue:!1, duration:u.animate}))
  }})
})(jQuery);
(function($) {
  var tmp, loading, overlay, wrap, outer, content, close, title, nav_left, nav_right, selectedIndex = 0, selectedOpts = {}, selectedArray = [], currentIndex = 0, currentOpts = {}, currentArray = [], ajaxLoader = null, imgPreloader = new Image, imgRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, swfRegExp = /[^\.]\.(swf)\s*$/i, loadingTimer, loadingFrame = 1, titleHeight = 0, titleStr = "", start_pos, final_pos, busy = false, fx = $.extend($("<div/>")[0], {prop:0}), isIE6 = $.browser.msie && $.browser.version < 
  7 && !window.XMLHttpRequest, _abort = function() {
    loading.hide();
    imgPreloader.onerror = imgPreloader.onload = null;
    if(ajaxLoader) {
      ajaxLoader.abort()
    }
    tmp.empty()
  }, _error = function() {
    if(false === selectedOpts.onError(selectedArray, selectedIndex, selectedOpts)) {
      loading.hide();
      busy = false;
      return
    }
    selectedOpts.titleShow = false;
    selectedOpts.width = "auto";
    selectedOpts.height = "auto";
    tmp.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
    _process_inline()
  }, _start = function() {
    var obj = selectedArray[selectedIndex], href, type, title, str, emb, ret;
    _abort();
    selectedOpts = $.extend({}, $.fn.fancybox.defaults, typeof $(obj).data("fancybox") == "undefined" ? selectedOpts : $(obj).data("fancybox"));
    ret = selectedOpts.onStart(selectedArray, selectedIndex, selectedOpts);
    if(ret === false) {
      busy = false;
      return
    }else {
      if(typeof ret == "object") {
        selectedOpts = $.extend(selectedOpts, ret)
      }
    }
    title = selectedOpts.title || (obj.nodeName ? $(obj).attr("title") : obj.title) || "";
    if(obj.nodeName && !selectedOpts.orig) {
      selectedOpts.orig = $(obj).children("img:first").length ? $(obj).children("img:first") : $(obj)
    }
    if(title === "" && selectedOpts.orig && selectedOpts.titleFromAlt) {
      title = selectedOpts.orig.attr("alt")
    }
    href = selectedOpts.href || (obj.nodeName ? $(obj).attr("href") : obj.href) || null;
    if(/^(?:javascript)/i.test(href) || href == "#") {
      href = null
    }
    if(selectedOpts.type) {
      type = selectedOpts.type;
      if(!href) {
        href = selectedOpts.content
      }
    }else {
      if(selectedOpts.content) {
        type = "html"
      }else {
        if(href) {
          if(href.match(imgRegExp)) {
            type = "image"
          }else {
            if(href.match(swfRegExp)) {
              type = "swf"
            }else {
              if($(obj).hasClass("iframe")) {
                type = "iframe"
              }else {
                if(href.indexOf("#") === 0) {
                  type = "inline"
                }else {
                  type = "ajax"
                }
              }
            }
          }
        }
      }
    }
    if(!type) {
      _error();
      return
    }
    if(type == "inline") {
      obj = href.substr(href.indexOf("#"));
      type = $(obj).length > 0 ? "inline" : "ajax"
    }
    selectedOpts.type = type;
    selectedOpts.href = href;
    selectedOpts.title = title;
    if(selectedOpts.autoDimensions) {
      if(selectedOpts.type == "html" || selectedOpts.type == "inline" || selectedOpts.type == "ajax") {
        selectedOpts.width = "auto";
        selectedOpts.height = "auto"
      }else {
        selectedOpts.autoDimensions = false
      }
    }
    if(selectedOpts.modal) {
      selectedOpts.overlayShow = true;
      selectedOpts.hideOnOverlayClick = false;
      selectedOpts.hideOnContentClick = false;
      selectedOpts.enableEscapeButton = false;
      selectedOpts.showCloseButton = false
    }
    selectedOpts.padding = parseInt(selectedOpts.padding, 10);
    selectedOpts.margin = parseInt(selectedOpts.margin, 10);
    tmp.css("padding", selectedOpts.padding + selectedOpts.margin);
    $(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change", function() {
      $(this).replaceWith(content.children())
    });
    switch(type) {
      case "html":
        tmp.html(selectedOpts.content);
        _process_inline();
        break;
      case "inline":
        if($(obj).parent().is("#fancybox-content") === true) {
          busy = false;
          return
        }
        $('<div class="fancybox-inline-tmp" />').hide().insertBefore($(obj)).bind("fancybox-cleanup", function() {
          $(this).replaceWith(content.children())
        }).bind("fancybox-cancel", function() {
          $(this).replaceWith(tmp.children())
        });
        $(obj).appendTo(tmp);
        _process_inline();
        break;
      case "image":
        busy = false;
        $.fancybox.showActivity();
        imgPreloader = new Image;
        imgPreloader.onerror = function() {
          _error()
        };
        imgPreloader.onload = function() {
          busy = true;
          imgPreloader.onerror = imgPreloader.onload = null;
          _process_image()
        };
        imgPreloader.src = href;
        break;
      case "swf":
        selectedOpts.scrolling = "no";
        str = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"><param name="movie" value="' + href + '"></param>';
        emb = "";
        $.each(selectedOpts.swf, function(name, val) {
          str += '<param name="' + name + '" value="' + val + '"></param>';
          emb += " " + name + '="' + val + '"'
        });
        str += '<embed src="' + href + '" type="application/x-shockwave-flash" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"' + emb + "></embed></object>";
        tmp.html(str);
        _process_inline();
        break;
      case "ajax":
        busy = false;
        $.fancybox.showActivity();
        selectedOpts.ajax.win = selectedOpts.ajax.success;
        ajaxLoader = $.ajax($.extend({}, selectedOpts.ajax, {url:href, data:selectedOpts.ajax.data || {}, error:function(XMLHttpRequest, textStatus, errorThrown) {
          if(XMLHttpRequest.status > 0) {
            _error()
          }
        }, success:function(data, textStatus, XMLHttpRequest) {
          var o = typeof XMLHttpRequest == "object" ? XMLHttpRequest : ajaxLoader;
          if(o.status == 200) {
            if(typeof selectedOpts.ajax.win == "function") {
              ret = selectedOpts.ajax.win(href, data, textStatus, XMLHttpRequest);
              if(ret === false) {
                loading.hide();
                return
              }else {
                if(typeof ret == "string" || typeof ret == "object") {
                  data = ret
                }
              }
            }
            tmp.html(data);
            _process_inline()
          }
        }}));
        break;
      case "iframe":
        _show();
        break
    }
  }, _process_inline = function() {
    var w = selectedOpts.width, h = selectedOpts.height;
    if(w.toString().indexOf("%") > -1) {
      w = parseInt(($(window).width() - selectedOpts.margin * 2) * parseFloat(w) / 100, 10) + "px"
    }else {
      w = w == "auto" ? "auto" : w + "px"
    }
    if(h.toString().indexOf("%") > -1) {
      h = parseInt(($(window).height() - selectedOpts.margin * 2) * parseFloat(h) / 100, 10) + "px"
    }else {
      h = h == "auto" ? "auto" : h + "px"
    }
    tmp.wrapInner('<div style="width:' + w + ";height:" + h + ";overflow: " + (selectedOpts.scrolling == "auto" ? "auto" : selectedOpts.scrolling == "yes" ? "scroll" : "hidden") + ';position:relative;"></div>');
    selectedOpts.width = tmp.width();
    selectedOpts.height = tmp.height();
    _show()
  }, _process_image = function() {
    selectedOpts.width = imgPreloader.width;
    selectedOpts.height = imgPreloader.height;
    $("<img />").attr({"id":"fancybox-img", "src":imgPreloader.src, "alt":selectedOpts.title}).appendTo(tmp);
    _show()
  }, _show = function() {
    $(".joyride-close-tip").click();
    var pos, equal;
    loading.hide();
    if(wrap.is(":visible") && false === currentOpts.onCleanup(currentArray, currentIndex, currentOpts)) {
      $.event.trigger("fancybox-cancel");
      busy = false;
      return
    }
    busy = true;
    $(content.add(overlay)).unbind();
    $(window).unbind("resize.fb scroll.fb");
    $(document).unbind("keydown.fb");
    if(wrap.is(":visible") && currentOpts.titlePosition !== "outside") {
      wrap.css("height", wrap.height())
    }
    currentArray = selectedArray;
    currentIndex = selectedIndex;
    currentOpts = selectedOpts;
    if(currentOpts.overlayShow) {
      overlay.css({"background-color":currentOpts.overlayColor, "opacity":currentOpts.overlayOpacity, "cursor":currentOpts.hideOnOverlayClick ? "pointer" : "auto", "height":$(document).height()});
      if(!overlay.is(":visible")) {
        if(isIE6) {
          $("select:not(#fancybox-tmp select)").filter(function() {
            return this.style.visibility !== "hidden"
          }).css({"visibility":"hidden"}).one("fancybox-cleanup", function() {
            this.style.visibility = "inherit"
          })
        }
        overlay.show()
      }
    }else {
      overlay.hide()
    }
    final_pos = _get_zoom_to();
    _process_title();
    if(wrap.is(":visible")) {
      $(close.add(nav_left).add(nav_right)).hide();
      pos = wrap.position(), start_pos = {top:pos.top, left:pos.left, width:wrap.width(), height:wrap.height()};
      equal = start_pos.width == final_pos.width && start_pos.height == final_pos.height;
      content.fadeTo(currentOpts.changeFade, 0.3, function() {
        var finish_resizing = function() {
          content.html(tmp.contents()).fadeTo(currentOpts.changeFade, 1, _finish)
        };
        $.event.trigger("fancybox-change");
        content.empty().removeAttr("filter").css({"border-width":currentOpts.padding, "width":final_pos.width - currentOpts.padding * 2, "height":selectedOpts.autoDimensions ? "auto" : final_pos.height - titleHeight - currentOpts.padding * 2});
        if(equal) {
          finish_resizing()
        }else {
          fx.prop = 0;
          $(fx).animate({prop:1}, {duration:currentOpts.changeSpeed, easing:currentOpts.easingChange, step:_draw, complete:finish_resizing})
        }
      });
      return
    }
    wrap.removeAttr("style");
    content.css("border-width", currentOpts.padding);
    if(currentOpts.transitionIn == "elastic") {
      start_pos = _get_zoom_from();
      content.html(tmp.contents());
      wrap.show();
      if(currentOpts.opacity) {
        final_pos.opacity = 0
      }
      fx.prop = 0;
      $(fx).animate({prop:1}, {duration:currentOpts.speedIn, easing:currentOpts.easingIn, step:_draw, complete:_finish});
      return
    }
    if(currentOpts.titlePosition == "inside" && titleHeight > 0) {
      title.show()
    }
    content.css({"width":final_pos.width - currentOpts.padding * 2, "height":selectedOpts.autoDimensions ? "auto" : final_pos.height - titleHeight - currentOpts.padding * 2}).html(tmp.contents());
    wrap.css(final_pos).fadeIn(currentOpts.transitionIn == "none" ? 0 : currentOpts.speedIn, _finish)
  }, _format_title = function(title) {
    if(title && title.length) {
      if(currentOpts.titlePosition == "float") {
        return'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + title + '</td><td id="fancybox-title-float-right"></td></tr></table>'
      }
      return'<div id="fancybox-title-' + currentOpts.titlePosition + '">' + title + "</div>"
    }
    return false
  }, _process_title = function() {
    titleStr = currentOpts.title || "";
    titleHeight = 0;
    title.empty().removeAttr("style").removeClass();
    if(currentOpts.titleShow === false) {
      title.hide();
      return
    }
    titleStr = $.isFunction(currentOpts.titleFormat) ? currentOpts.titleFormat(titleStr, currentArray, currentIndex, currentOpts) : _format_title(titleStr);
    if(!titleStr || titleStr === "") {
      title.hide();
      return
    }
    title.addClass("fancybox-title-" + currentOpts.titlePosition).html(titleStr).appendTo("body").show();
    switch(currentOpts.titlePosition) {
      case "inside":
        title.css({"width":final_pos.width - currentOpts.padding * 2, "marginLeft":currentOpts.padding, "marginRight":currentOpts.padding});
        titleHeight = title.outerHeight(true);
        title.appendTo(outer);
        final_pos.height += titleHeight;
        break;
      case "over":
        title.css({"marginLeft":currentOpts.padding, "width":final_pos.width - currentOpts.padding * 2, "bottom":currentOpts.padding}).appendTo(outer);
        break;
      case "float":
        title.css("left", parseInt((title.width() - final_pos.width - 40) / 2, 10) * -1).appendTo(wrap);
        break;
      default:
        title.css({"width":final_pos.width - currentOpts.padding * 2, "paddingLeft":currentOpts.padding, "paddingRight":currentOpts.padding}).appendTo(wrap);
        break
    }
    title.hide()
  }, _set_navigation = function() {
    if(currentOpts.enableEscapeButton || currentOpts.enableKeyboardNav) {
      $(document).bind("keydown.fb", function(e) {
        if(e.keyCode == 27 && currentOpts.enableEscapeButton) {
          e.preventDefault();
          $.fancybox.close()
        }else {
          if((e.keyCode == 37 || e.keyCode == 39) && currentOpts.enableKeyboardNav && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA" && e.target.tagName !== "SELECT") {
            e.preventDefault();
            $.fancybox[e.keyCode == 37 ? "prev" : "next"]()
          }
        }
      })
    }
    if(!currentOpts.showNavArrows) {
      nav_left.hide();
      nav_right.hide();
      return
    }
    if(currentOpts.cyclic && currentArray.length > 1 || currentIndex !== 0) {
      nav_left.show()
    }
    if(currentOpts.cyclic && currentArray.length > 1 || currentIndex != currentArray.length - 1) {
      nav_right.show()
    }
  }, _finish = function() {
    if(!$.support.opacity) {
      content.get(0).style.removeAttribute("filter");
      wrap.get(0).style.removeAttribute("filter")
    }
    if(selectedOpts.autoDimensions) {
      content.css("height", "auto")
    }
    wrap.css("height", "auto");
    if(titleStr && titleStr.length) {
      title.show()
    }
    if(currentOpts.showCloseButton) {
      close.show()
    }
    _set_navigation();
    if(currentOpts.hideOnContentClick) {
      content.bind("click", $.fancybox.close)
    }
    if(currentOpts.hideOnOverlayClick) {
      overlay.bind("click", $.fancybox.close)
    }
    $(window).bind("resize.fb", $.fancybox.resize);
    if(currentOpts.centerOnScroll) {
      $(window).bind("scroll.fb", $.fancybox.center)
    }
    if(currentOpts.type == "iframe") {
      $('<iframe id="fancybox-frame" name="fancybox-frame' + (new Date).getTime() + '" frameborder="0" hspace="0" ' + ($.browser.msie ? 'allowtransparency="true""' : "") + ' scrolling="' + selectedOpts.scrolling + '" src="' + currentOpts.href + '"></iframe>').appendTo(content)
    }
    wrap.show();
    busy = false;
    $.fancybox.center();
    currentOpts.onComplete(currentArray, currentIndex, currentOpts);
    _preload_images()
  }, _preload_images = function() {
    var href, objNext;
    if(currentArray.length - 1 > currentIndex) {
      href = currentArray[currentIndex + 1].href;
      if(typeof href !== "undefined" && href.match(imgRegExp)) {
        objNext = new Image;
        objNext.src = href
      }
    }
    if(currentIndex > 0) {
      href = currentArray[currentIndex - 1].href;
      if(typeof href !== "undefined" && href.match(imgRegExp)) {
        objNext = new Image;
        objNext.src = href
      }
    }
  }, _draw = function(pos) {
    var dim = {width:parseInt(start_pos.width + (final_pos.width - start_pos.width) * pos, 10), height:parseInt(start_pos.height + (final_pos.height - start_pos.height) * pos, 10), top:parseInt(start_pos.top + (final_pos.top - start_pos.top) * pos, 10), left:parseInt(start_pos.left + (final_pos.left - start_pos.left) * pos, 10)};
    if(typeof final_pos.opacity !== "undefined") {
      dim.opacity = pos < 0.5 ? 0.5 : pos
    }
    wrap.css(dim);
    content.css({"width":dim.width - currentOpts.padding * 2, "height":dim.height - titleHeight * pos - currentOpts.padding * 2})
  }, _get_viewport = function() {
    return[$(window).width() - currentOpts.margin * 2, $(window).height() - currentOpts.margin * 2, $(document).scrollLeft() + currentOpts.margin, $(document).scrollTop() + currentOpts.margin]
  }, _get_zoom_to = function() {
    var view = _get_viewport(), to = {}, resize = currentOpts.autoScale, double_padding = currentOpts.padding * 2, ratio;
    if(currentOpts.width.toString().indexOf("%") > -1) {
      to.width = parseInt(view[0] * parseFloat(currentOpts.width) / 100, 10)
    }else {
      to.width = currentOpts.width + double_padding
    }
    if(currentOpts.height.toString().indexOf("%") > -1) {
      to.height = parseInt(view[1] * parseFloat(currentOpts.height) / 100, 10)
    }else {
      to.height = currentOpts.height + double_padding
    }
    if(resize && (to.width > view[0] || to.height > view[1])) {
      if(selectedOpts.type == "image" || selectedOpts.type == "swf") {
        ratio = currentOpts.width / currentOpts.height;
        if(to.width > view[0]) {
          to.width = view[0];
          to.height = parseInt((to.width - double_padding) / ratio + double_padding, 10)
        }
        if(to.height > view[1]) {
          to.height = view[1];
          to.width = parseInt((to.height - double_padding) * ratio + double_padding, 10)
        }
      }else {
        to.width = Math.min(to.width, view[0]);
        to.height = Math.min(to.height, view[1])
      }
    }
    to.top = parseInt(Math.max(view[3] - 20, view[3] + (view[1] - to.height - 40) * 0.5), 10);
    to.left = parseInt(Math.max(view[2] - 20, view[2] + (view[0] - to.width - 40) * 0.5), 10);
    return to
  }, _get_obj_pos = function(obj) {
    var pos = obj.offset();
    pos.top += parseInt(obj.css("paddingTop"), 10) || 0;
    pos.left += parseInt(obj.css("paddingLeft"), 10) || 0;
    pos.top += parseInt(obj.css("border-top-width"), 10) || 0;
    pos.left += parseInt(obj.css("border-left-width"), 10) || 0;
    pos.width = obj.width();
    pos.height = obj.height();
    return pos
  }, _get_zoom_from = function() {
    var orig = selectedOpts.orig ? $(selectedOpts.orig) : false, from = {}, pos, view;
    if(orig && orig.length) {
      pos = _get_obj_pos(orig);
      from = {width:pos.width + currentOpts.padding * 2, height:pos.height + currentOpts.padding * 2, top:pos.top - currentOpts.padding - 20, left:pos.left - currentOpts.padding - 20}
    }else {
      view = _get_viewport();
      from = {width:currentOpts.padding * 2, height:currentOpts.padding * 2, top:parseInt(view[3] + view[1] * 0.5, 10), left:parseInt(view[2] + view[0] * 0.5, 10)}
    }
    return from
  }, _animate_loading = function() {
    if(!loading.is(":visible")) {
      clearInterval(loadingTimer);
      return
    }
    $("div", loading).css("top", loadingFrame * -40 + "px");
    loadingFrame = (loadingFrame + 1) % 12
  };
  $.fn.fancybox = function(options) {
    if(!$(this).length) {
      return this
    }
    $(this).data("fancybox", $.extend({}, options, $.metadata ? $(this).metadata() : {})).unbind("click.fb").bind("click.fb", function(e) {
      e.preventDefault();
      if(busy) {
        return
      }
      busy = true;
      $(this).blur();
      selectedArray = [];
      selectedIndex = 0;
      var rel = $(this).attr("rel") || "";
      if(!rel || rel == "" || rel === "nofollow") {
        selectedArray.push(this)
      }else {
        selectedArray = $("a[rel=" + rel + "], area[rel=" + rel + "]");
        selectedIndex = selectedArray.index(this)
      }
      _start();
      return
    });
    return this
  };
  $.fancybox = function(obj) {
    var opts;
    if(busy) {
      return
    }
    busy = true;
    opts = typeof arguments[1] !== "undefined" ? arguments[1] : {};
    selectedArray = [];
    selectedIndex = parseInt(opts.index, 10) || 0;
    if($.isArray(obj)) {
      for(var i = 0, j = obj.length;i < j;i++) {
        if(typeof obj[i] == "object") {
          $(obj[i]).data("fancybox", $.extend({}, opts, obj[i]))
        }else {
          obj[i] = $({}).data("fancybox", $.extend({content:obj[i]}, opts))
        }
      }
      selectedArray = jQuery.merge(selectedArray, obj)
    }else {
      if(typeof obj == "object") {
        $(obj).data("fancybox", $.extend({}, opts, obj))
      }else {
        obj = $({}).data("fancybox", $.extend({content:obj}, opts))
      }
      selectedArray.push(obj)
    }
    if(selectedIndex > selectedArray.length || selectedIndex < 0) {
      selectedIndex = 0
    }
    _start()
  };
  $.fancybox.showActivity = function() {
    clearInterval(loadingTimer);
    loading.show();
    loadingTimer = setInterval(_animate_loading, 66)
  };
  $.fancybox.hideActivity = function() {
    loading.hide()
  };
  $.fancybox.next = function() {
    return $.fancybox.pos(currentIndex + 1)
  };
  $.fancybox.prev = function() {
    return $.fancybox.pos(currentIndex - 1)
  };
  $.fancybox.pos = function(pos) {
    if(busy) {
      return
    }
    pos = parseInt(pos);
    selectedArray = currentArray;
    if(pos > -1 && pos < currentArray.length) {
      selectedIndex = pos;
      _start()
    }else {
      if(currentOpts.cyclic && currentArray.length > 1) {
        selectedIndex = pos >= currentArray.length ? 0 : currentArray.length - 1;
        _start()
      }
    }
    return
  };
  $.fancybox.cancel = function() {
    if(busy) {
      return
    }
    busy = true;
    $.event.trigger("fancybox-cancel");
    _abort();
    selectedOpts.onCancel(selectedArray, selectedIndex, selectedOpts);
    busy = false
  };
  $.fancybox.close = function() {
    $(".joyride-close-tip").click();
    if(busy || wrap.is(":hidden")) {
      return
    }
    busy = true;
    if(currentOpts && false === currentOpts.onCleanup(currentArray, currentIndex, currentOpts)) {
      busy = false;
      return
    }
    _abort();
    $(close.add(nav_left).add(nav_right)).hide();
    $(content.add(overlay)).unbind();
    $(window).unbind("resize.fb scroll.fb");
    $(document).unbind("keydown.fb");
    content.find("iframe").attr("src", isIE6 && /^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank");
    if(currentOpts.titlePosition !== "inside") {
      title.empty()
    }
    wrap.stop();
    function _cleanup() {
      overlay.fadeOut("fast");
      title.empty().hide();
      wrap.hide();
      $.event.trigger("fancybox-cleanup");
      content.empty();
      currentOpts.onClosed(currentArray, currentIndex, currentOpts);
      currentArray = selectedOpts = [];
      currentIndex = selectedIndex = 0;
      currentOpts = selectedOpts = {};
      busy = false
    }
    if(currentOpts.transitionOut == "elastic") {
      start_pos = _get_zoom_from();
      var pos = wrap.position();
      final_pos = {top:pos.top, left:pos.left, width:wrap.width(), height:wrap.height()};
      if(currentOpts.opacity) {
        final_pos.opacity = 1
      }
      title.empty().hide();
      fx.prop = 1;
      $(fx).animate({prop:0}, {duration:currentOpts.speedOut, easing:currentOpts.easingOut, step:_draw, complete:_cleanup})
    }else {
      wrap.fadeOut(currentOpts.transitionOut == "none" ? 0 : currentOpts.speedOut, _cleanup)
    }
  };
  $.fancybox.resize = function() {
    if(overlay.is(":visible")) {
      overlay.css("height", $(document).height())
    }
    $.fancybox.center(true)
  };
  $.fancybox.center = function() {
    var view, align;
    if(busy) {
      return
    }
    align = arguments[0] === true ? 1 : 0;
    view = _get_viewport();
    if(!align && (wrap.width() > view[0] || wrap.height() > view[1])) {
      return
    }
    wrap.stop().animate({"top":parseInt(Math.max(view[3] - 20, view[3] + (view[1] - content.height() - 40) * 0.5 - currentOpts.padding)), "left":parseInt(Math.max(view[2] - 20, view[2] + (view[0] - content.width() - 40) * 0.5 - currentOpts.padding))}, typeof arguments[0] == "number" ? arguments[0] : 200)
  };
  $.fancybox.init = function() {
    if($("#fancybox-wrap").length) {
      return
    }
    $("body").append(tmp = $('<div id="fancybox-tmp"></div>'), loading = $('<div id="fancybox-loading"><div></div></div>'), overlay = $('<div id="fancybox-overlay"></div>'), wrap = $('<div id="fancybox-wrap"></div>'));
    outer = $('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(wrap);
    outer.append(content = $('<div id="fancybox-content"></div>'), close = $('<a id="fancybox-close"></a>'), title = $('<div id="fancybox-title"></div>'), nav_left = $('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), nav_right = $('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));
    close.click($.fancybox.close);
    loading.click($.fancybox.cancel);
    nav_left.click(function(e) {
      e.preventDefault();
      $.fancybox.prev()
    });
    nav_right.click(function(e) {
      e.preventDefault();
      $.fancybox.next()
    });
    if($.fn.mousewheel) {
      wrap.bind("mousewheel.fb", function(e, delta) {
        if(busy) {
          e.preventDefault()
        }else {
          if($(e.target).get(0).clientHeight == 0 || $(e.target).get(0).scrollHeight === $(e.target).get(0).clientHeight) {
            e.preventDefault();
            $.fancybox[delta > 0 ? "prev" : "next"]()
          }
        }
      })
    }
    if(!$.support.opacity) {
      wrap.addClass("fancybox-ie")
    }
    if(isIE6) {
      loading.addClass("fancybox-ie6");
      wrap.addClass("fancybox-ie6");
      $('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank") + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(outer)
    }
  };
  $.fn.fancybox.defaults = {padding:10, margin:40, opacity:false, modal:false, cyclic:false, scrolling:"auto", width:560, height:340, autoScale:true, autoDimensions:true, centerOnScroll:false, ajax:{}, swf:{wmode:"transparent"}, hideOnOverlayClick:true, hideOnContentClick:false, overlayShow:true, overlayOpacity:0.7, overlayColor:"#777", titleShow:true, titlePosition:"float", titleFormat:null, titleFromAlt:false, transitionIn:"fade", transitionOut:"fade", speedIn:300, speedOut:300, changeSpeed:300, 
  changeFade:"fast", easingIn:"swing", easingOut:"swing", showCloseButton:true, showNavArrows:true, enableEscapeButton:true, enableKeyboardNav:true, onStart:function() {
  }, onCancel:function() {
  }, onComplete:function() {
  }, onCleanup:function() {
  }, onClosed:function() {
  }, onError:function() {
  }};
  $(document).ready(function() {
    $.fancybox.init()
  })
})(jQuery);
(function(r) {
  r.fn.qrcode = function(h) {
    var s;
    function u(a) {
      this.mode = s;
      this.data = a
    }
    function o(a, c) {
      this.typeNumber = a;
      this.errorCorrectLevel = c;
      this.modules = null;
      this.moduleCount = 0;
      this.dataCache = null;
      this.dataList = []
    }
    function q(a, c) {
      if(void 0 == a.length) {
        throw Error(a.length + "/" + c);
      }
      for(var d = 0;d < a.length && 0 == a[d];) {
        d++
      }
      this.num = Array(a.length - d + c);
      for(var b = 0;b < a.length - d;b++) {
        this.num[b] = a[b + d]
      }
    }
    function p(a, c) {
      this.totalCount = a;
      this.dataCount = c
    }
    function t() {
      this.buffer = [];
      this.length = 0
    }
    u.prototype = {getLength:function() {
      return this.data.length
    }, write:function(a) {
      for(var c = 0;c < this.data.length;c++) {
        a.put(this.data.charCodeAt(c), 8)
      }
    }};
    o.prototype = {addData:function(a) {
      this.dataList.push(new u(a));
      this.dataCache = null
    }, isDark:function(a, c) {
      if(0 > a || this.moduleCount <= a || 0 > c || this.moduleCount <= c) {
        throw Error(a + "," + c);
      }
      return this.modules[a][c]
    }, getModuleCount:function() {
      return this.moduleCount
    }, make:function() {
      if(1 > this.typeNumber) {
        for(var a = 1, a = 1;40 > a;a++) {
          for(var c = p.getRSBlocks(a, this.errorCorrectLevel), d = new t, b = 0, e = 0;e < c.length;e++) {
            b += c[e].dataCount
          }
          for(e = 0;e < this.dataList.length;e++) {
            c = this.dataList[e], d.put(c.mode, 4), d.put(c.getLength(), j.getLengthInBits(c.mode, a)), c.write(d)
          }
          if(d.getLengthInBits() <= 8 * b) {
            break
          }
        }
        this.typeNumber = a
      }
      this.makeImpl(!1, this.getBestMaskPattern())
    }, makeImpl:function(a, c) {
      this.moduleCount = 4 * this.typeNumber + 17;
      this.modules = Array(this.moduleCount);
      for(var d = 0;d < this.moduleCount;d++) {
        this.modules[d] = Array(this.moduleCount);
        for(var b = 0;b < this.moduleCount;b++) {
          this.modules[d][b] = null
        }
      }
      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(a, c);
      7 <= this.typeNumber && this.setupTypeNumber(a);
      null == this.dataCache && (this.dataCache = o.createData(this.typeNumber, this.errorCorrectLevel, this.dataList));
      this.mapData(this.dataCache, c)
    }, setupPositionProbePattern:function(a, c) {
      for(var d = -1;7 >= d;d++) {
        if(!(-1 >= a + d || this.moduleCount <= a + d)) {
          for(var b = -1;7 >= b;b++) {
            -1 >= c + b || this.moduleCount <= c + b || (this.modules[a + d][c + b] = 0 <= d && 6 >= d && (0 == b || 6 == b) || 0 <= b && 6 >= b && (0 == d || 6 == d) || 2 <= d && 4 >= d && 2 <= b && 4 >= b ? !0 : !1)
          }
        }
      }
    }, getBestMaskPattern:function() {
      for(var a = 0, c = 0, d = 0;8 > d;d++) {
        this.makeImpl(!0, d);
        var b = j.getLostPoint(this);
        if(0 == d || a > b) {
          a = b, c = d
        }
      }
      return c
    }, createMovieClip:function(a, c, d) {
      a = a.createEmptyMovieClip(c, d);
      this.make();
      for(c = 0;c < this.modules.length;c++) {
        for(var d = 1 * c, b = 0;b < this.modules[c].length;b++) {
          var e = 1 * b;
          this.modules[c][b] && (a.beginFill(0, 100), a.moveTo(e, d), a.lineTo(e + 1, d), a.lineTo(e + 1, d + 1), a.lineTo(e, d + 1), a.endFill())
        }
      }
      return a
    }, setupTimingPattern:function() {
      for(var a = 8;a < this.moduleCount - 8;a++) {
        null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2)
      }
      for(a = 8;a < this.moduleCount - 8;a++) {
        null == this.modules[6][a] && (this.modules[6][a] = 0 == a % 2)
      }
    }, setupPositionAdjustPattern:function() {
      for(var a = j.getPatternPosition(this.typeNumber), c = 0;c < a.length;c++) {
        for(var d = 0;d < a.length;d++) {
          var b = a[c], e = a[d];
          if(null == this.modules[b][e]) {
            for(var f = -2;2 >= f;f++) {
              for(var i = -2;2 >= i;i++) {
                this.modules[b + f][e + i] = -2 == f || 2 == f || -2 == i || 2 == i || 0 == f && 0 == i ? !0 : !1
              }
            }
          }
        }
      }
    }, setupTypeNumber:function(a) {
      for(var c = j.getBCHTypeNumber(this.typeNumber), d = 0;18 > d;d++) {
        var b = !a && 1 == (c >> d & 1);
        this.modules[Math.floor(d / 3)][d % 3 + this.moduleCount - 8 - 3] = b
      }
      for(d = 0;18 > d;d++) {
        b = !a && 1 == (c >> d & 1), this.modules[d % 3 + this.moduleCount - 8 - 3][Math.floor(d / 3)] = b
      }
    }, setupTypeInfo:function(a, c) {
      for(var d = j.getBCHTypeInfo(this.errorCorrectLevel << 3 | c), b = 0;15 > b;b++) {
        var e = !a && 1 == (d >> b & 1);
        6 > b ? this.modules[b][8] = e : 8 > b ? this.modules[b + 1][8] = e : this.modules[this.moduleCount - 15 + b][8] = e
      }
      for(b = 0;15 > b;b++) {
        e = !a && 1 == (d >> b & 1), 8 > b ? this.modules[8][this.moduleCount - b - 1] = e : 9 > b ? this.modules[8][15 - b - 1 + 1] = e : this.modules[8][15 - b - 1] = e
      }
      this.modules[this.moduleCount - 8][8] = !a
    }, mapData:function(a, c) {
      for(var d = -1, b = this.moduleCount - 1, e = 7, f = 0, i = this.moduleCount - 1;0 < i;i -= 2) {
        for(6 == i && i--;;) {
          for(var g = 0;2 > g;g++) {
            if(null == this.modules[b][i - g]) {
              var n = !1;
              f < a.length && (n = 1 == (a[f] >>> e & 1));
              j.getMask(c, b, i - g) && (n = !n);
              this.modules[b][i - g] = n;
              e--;
               -1 == e && (f++, e = 7)
            }
          }
          b += d;
          if(0 > b || this.moduleCount <= b) {
            b -= d;
            d = -d;
            break
          }
        }
      }
    }};
    o.PAD0 = 236;
    o.PAD1 = 17;
    o.createData = function(a, c, d) {
      for(var c = p.getRSBlocks(a, c), b = new t, e = 0;e < d.length;e++) {
        var f = d[e];
        b.put(f.mode, 4);
        b.put(f.getLength(), j.getLengthInBits(f.mode, a));
        f.write(b)
      }
      for(e = a = 0;e < c.length;e++) {
        a += c[e].dataCount
      }
      if(b.getLengthInBits() > 8 * a) {
        throw Error("code length overflow. (" + b.getLengthInBits() + ">" + 8 * a + ")");
      }
      for(b.getLengthInBits() + 4 <= 8 * a && b.put(0, 4);0 != b.getLengthInBits() % 8;) {
        b.putBit(!1)
      }
      for(;!(b.getLengthInBits() >= 8 * a);) {
        b.put(o.PAD0, 8);
        if(b.getLengthInBits() >= 8 * a) {
          break
        }
        b.put(o.PAD1, 8)
      }
      return o.createBytes(b, c)
    };
    o.createBytes = function(a, c) {
      for(var d = 0, b = 0, e = 0, f = Array(c.length), i = Array(c.length), g = 0;g < c.length;g++) {
        var n = c[g].dataCount, h = c[g].totalCount - n, b = Math.max(b, n), e = Math.max(e, h);
        f[g] = Array(n);
        for(var k = 0;k < f[g].length;k++) {
          f[g][k] = 255 & a.buffer[k + d]
        }
        d += n;
        k = j.getErrorCorrectPolynomial(h);
        n = (new q(f[g], k.getLength() - 1)).mod(k);
        i[g] = Array(k.getLength() - 1);
        for(k = 0;k < i[g].length;k++) {
          h = k + n.getLength() - i[g].length, i[g][k] = 0 <= h ? n.get(h) : 0
        }
      }
      for(k = g = 0;k < c.length;k++) {
        g += c[k].totalCount
      }
      d = Array(g);
      for(k = n = 0;k < b;k++) {
        for(g = 0;g < c.length;g++) {
          k < f[g].length && (d[n++] = f[g][k])
        }
      }
      for(k = 0;k < e;k++) {
        for(g = 0;g < c.length;g++) {
          k < i[g].length && (d[n++] = i[g][k])
        }
      }
      return d
    };
    s = 4;
    for(var j = {PATTERN_POSITION_TABLE:[[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], 
    [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15:1335, G18:7973, G15_MASK:21522, getBCHTypeInfo:function(a) {
      for(var c = a << 10;0 <= j.getBCHDigit(c) - j.getBCHDigit(j.G15);) {
        c ^= j.G15 << j.getBCHDigit(c) - j.getBCHDigit(j.G15)
      }
      return(a << 10 | c) ^ j.G15_MASK
    }, getBCHTypeNumber:function(a) {
      for(var c = a << 12;0 <= j.getBCHDigit(c) - j.getBCHDigit(j.G18);) {
        c ^= j.G18 << j.getBCHDigit(c) - j.getBCHDigit(j.G18)
      }
      return a << 12 | c
    }, getBCHDigit:function(a) {
      for(var c = 0;0 != a;) {
        c++, a >>>= 1
      }
      return c
    }, getPatternPosition:function(a) {
      return j.PATTERN_POSITION_TABLE[a - 1]
    }, getMask:function(a, c, d) {
      switch(a) {
        case 0:
          return 0 == (c + d) % 2;
        case 1:
          return 0 == c % 2;
        case 2:
          return 0 == d % 3;
        case 3:
          return 0 == (c + d) % 3;
        case 4:
          return 0 == (Math.floor(c / 2) + Math.floor(d / 3)) % 2;
        case 5:
          return 0 == c * d % 2 + c * d % 3;
        case 6:
          return 0 == (c * d % 2 + c * d % 3) % 2;
        case 7:
          return 0 == (c * d % 3 + (c + d) % 2) % 2;
        default:
          throw Error("bad maskPattern:" + a);
      }
    }, getErrorCorrectPolynomial:function(a) {
      for(var c = new q([1], 0), d = 0;d < a;d++) {
        c = c.multiply(new q([1, l.gexp(d)], 0))
      }
      return c
    }, getLengthInBits:function(a, c) {
      if(1 <= c && 10 > c) {
        switch(a) {
          case 1:
            return 10;
          case 2:
            return 9;
          case s:
            return 8;
          case 8:
            return 8;
          default:
            throw Error("mode:" + a);
        }
      }else {
        if(27 > c) {
          switch(a) {
            case 1:
              return 12;
            case 2:
              return 11;
            case s:
              return 16;
            case 8:
              return 10;
            default:
              throw Error("mode:" + a);
          }
        }else {
          if(41 > c) {
            switch(a) {
              case 1:
                return 14;
              case 2:
                return 13;
              case s:
                return 16;
              case 8:
                return 12;
              default:
                throw Error("mode:" + a);
            }
          }else {
            throw Error("type:" + c);
          }
        }
      }
    }, getLostPoint:function(a) {
      for(var c = a.getModuleCount(), d = 0, b = 0;b < c;b++) {
        for(var e = 0;e < c;e++) {
          for(var f = 0, i = a.isDark(b, e), g = -1;1 >= g;g++) {
            if(!(0 > b + g || c <= b + g)) {
              for(var h = -1;1 >= h;h++) {
                0 > e + h || c <= e + h || 0 == g && 0 == h || i == a.isDark(b + g, e + h) && f++
              }
            }
          }
          5 < f && (d += 3 + f - 5)
        }
      }
      for(b = 0;b < c - 1;b++) {
        for(e = 0;e < c - 1;e++) {
          if(f = 0, a.isDark(b, e) && f++, a.isDark(b + 1, e) && f++, a.isDark(b, e + 1) && f++, a.isDark(b + 1, e + 1) && f++, 0 == f || 4 == f) {
            d += 3
          }
        }
      }
      for(b = 0;b < c;b++) {
        for(e = 0;e < c - 6;e++) {
          a.isDark(b, e) && !a.isDark(b, e + 1) && a.isDark(b, e + 2) && a.isDark(b, e + 3) && a.isDark(b, e + 4) && !a.isDark(b, e + 5) && a.isDark(b, e + 6) && (d += 40)
        }
      }
      for(e = 0;e < c;e++) {
        for(b = 0;b < c - 6;b++) {
          a.isDark(b, e) && !a.isDark(b + 1, e) && a.isDark(b + 2, e) && a.isDark(b + 3, e) && a.isDark(b + 4, e) && !a.isDark(b + 5, e) && a.isDark(b + 6, e) && (d += 40)
        }
      }
      for(e = f = 0;e < c;e++) {
        for(b = 0;b < c;b++) {
          a.isDark(b, e) && f++
        }
      }
      a = Math.abs(100 * f / c / c - 50) / 5;
      return d + 10 * a
    }}, l = {glog:function(a) {
      if(1 > a) {
        throw Error("glog(" + a + ")");
      }
      return l.LOG_TABLE[a]
    }, gexp:function(a) {
      for(;0 > a;) {
        a += 255
      }
      for(;256 <= a;) {
        a -= 255
      }
      return l.EXP_TABLE[a]
    }, EXP_TABLE:Array(256), LOG_TABLE:Array(256)}, m = 0;8 > m;m++) {
      l.EXP_TABLE[m] = 1 << m
    }
    for(m = 8;256 > m;m++) {
      l.EXP_TABLE[m] = l.EXP_TABLE[m - 4] ^ l.EXP_TABLE[m - 5] ^ l.EXP_TABLE[m - 6] ^ l.EXP_TABLE[m - 8]
    }
    for(m = 0;255 > m;m++) {
      l.LOG_TABLE[l.EXP_TABLE[m]] = m
    }
    q.prototype = {get:function(a) {
      return this.num[a]
    }, getLength:function() {
      return this.num.length
    }, multiply:function(a) {
      for(var c = Array(this.getLength() + a.getLength() - 1), d = 0;d < this.getLength();d++) {
        for(var b = 0;b < a.getLength();b++) {
          c[d + b] ^= l.gexp(l.glog(this.get(d)) + l.glog(a.get(b)))
        }
      }
      return new q(c, 0)
    }, mod:function(a) {
      if(0 > this.getLength() - a.getLength()) {
        return this
      }
      for(var c = l.glog(this.get(0)) - l.glog(a.get(0)), d = Array(this.getLength()), b = 0;b < this.getLength();b++) {
        d[b] = this.get(b)
      }
      for(b = 0;b < a.getLength();b++) {
        d[b] ^= l.gexp(l.glog(a.get(b)) + c)
      }
      return(new q(d, 0)).mod(a)
    }};
    p.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 
    14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], 
    [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 
    70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 
    74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 
    117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 
    145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], 
    [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
    p.getRSBlocks = function(a, c) {
      var d = p.getRsBlockTable(a, c);
      if(void 0 == d) {
        throw Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + c);
      }
      for(var b = d.length / 3, e = [], f = 0;f < b;f++) {
        for(var h = d[3 * f + 0], g = d[3 * f + 1], j = d[3 * f + 2], l = 0;l < h;l++) {
          e.push(new p(g, j))
        }
      }
      return e
    };
    p.getRsBlockTable = function(a, c) {
      switch(c) {
        case 1:
          return p.RS_BLOCK_TABLE[4 * (a - 1) + 0];
        case 0:
          return p.RS_BLOCK_TABLE[4 * (a - 1) + 1];
        case 3:
          return p.RS_BLOCK_TABLE[4 * (a - 1) + 2];
        case 2:
          return p.RS_BLOCK_TABLE[4 * (a - 1) + 3]
      }
    };
    t.prototype = {get:function(a) {
      return 1 == (this.buffer[Math.floor(a / 8)] >>> 7 - a % 8 & 1)
    }, put:function(a, c) {
      for(var d = 0;d < c;d++) {
        this.putBit(1 == (a >>> c - d - 1 & 1))
      }
    }, getLengthInBits:function() {
      return this.length
    }, putBit:function(a) {
      var c = Math.floor(this.length / 8);
      this.buffer.length <= c && this.buffer.push(0);
      a && (this.buffer[c] |= 128 >>> this.length % 8);
      this.length++
    }};
    "string" === typeof h && (h = {text:h});
    h = r.extend({}, {render:"canvas", width:256, height:256, typeNumber:-1, correctLevel:2, background:"#ffffff", foreground:"#000000"}, h);
    return this.each(function() {
      var a;
      if("canvas" == h.render) {
        a = new o(h.typeNumber, h.correctLevel);
        a.addData(h.text);
        a.make();
        var c = document.createElement("canvas");
        c.width = h.width;
        c.height = h.height;
        for(var d = c.getContext("2d"), b = h.width / a.getModuleCount(), e = h.height / a.getModuleCount(), f = 0;f < a.getModuleCount();f++) {
          for(var i = 0;i < a.getModuleCount();i++) {
            d.fillStyle = a.isDark(f, i) ? h.foreground : h.background;
            var g = Math.ceil((i + 1) * b) - Math.floor(i * b), j = Math.ceil((f + 1) * b) - Math.floor(f * b);
            d.fillRect(Math.round(i * b), Math.round(f * e), g, j)
          }
        }
      }else {
        a = new o(h.typeNumber, h.correctLevel);
        a.addData(h.text);
        a.make();
        c = r("<table></table>").css("width", h.width + "px").css("height", h.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", h.background);
        d = h.width / a.getModuleCount();
        b = h.height / a.getModuleCount();
        for(e = 0;e < a.getModuleCount();e++) {
          f = r("<tr></tr>").css("height", b + "px").appendTo(c);
          for(i = 0;i < a.getModuleCount();i++) {
            r("<td></td>").css("width", d + "px").css("background-color", a.isDark(e, i) ? h.foreground : h.background).appendTo(f)
          }
        }
      }
      a = c;
      jQuery(a).appendTo(this)
    })
  }
})(jQuery);
if(!window["YT"]) {
  var YT = {}
}
if(!YT.Player) {
  (function() {
    var s = "http:" + "//s.ytimg.com/yts/jsbin/www-widgetapi-vfl3iLqI8.js";
    var a = document.createElement("script");
    a.src = s;
    a.async = true;
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b);
    YT.embed_template = '<iframe width="425" height="344" src="" frameborder="0" allowfullscreen></iframe>'
  })()
}
;VISH.User = function(V, $, undefined) {
  var user;
  var init = function(options) {
    user = new Object;
    if(options["username"]) {
      user.username = options["username"]
    }
    if(options["userId"]) {
      user.id = options["userId"]
    }
    if(options["token"]) {
      user.token = options["token"]
    }
  };
  var isLogged = function() {
    if(user && typeof user.token == "string" && user.id) {
      return true
    }else {
      return false
    }
  };
  var getUser = function() {
    if(user) {
      return user
    }else {
      return null
    }
  };
  var getName = function() {
    if(user && user.username) {
      return user.username
    }else {
      return null
    }
  };
  var getId = function() {
    if(user && user.id) {
      return user.id
    }else {
      return null
    }
  };
  var getToken = function() {
    if(user && user.token) {
      return user.token
    }else {
      return null
    }
  };
  return{init:init, isLogged:isLogged, getUser:getUser, getName:getName, getId:getId, getToken:getToken}
}(VISH, jQuery);
VISH.Object = function(V, $, undefined) {
  var init = function() {
  };
  function objectInfo(wrapper, source, sourceType) {
    this.wrapper = wrapper;
    this.source = source;
    this.type = sourceType
  }
  var getObjectInfo = function(object) {
    var wrapper = null;
    var element = $(object)[0];
    if(typeof element != "undefined") {
      var wrapper = element.tagName
    }
    var source = _getSourceFromObject(object, wrapper);
    var type = _getTypeFromSource(source);
    return new objectInfo(wrapper, source, type)
  };
  var _getSourceFromObject = function(object, wrapper) {
    switch(wrapper) {
      case null:
        return object;
      case "EMBED":
        return $(object).attr("src");
      case "OBJECT":
        if(typeof $(object).attr("src") != "undefined") {
          return $(object).attr("src")
        }
        if(typeof $(object).attr("data") != "undefined") {
          return $(object).attr("data")
        }
        return"source not founded";
      case "IFRAME":
        return $(object).attr("src");
      default:
        V.Debugging.log("Unrecognized object wrapper: " + wrapper);
        return null;
        break
    }
  };
  var _getTypeFromSource = function(source) {
    var http_urls_pattern = /(http(s)?:\/\/)([aA-zZ0-9%=_&+?])+([./-][aA-zZ0-9%=_&+?]+)*[/]?/g;
    var www_urls_pattern = /(www[.])([aA-zZ0-9%=_&+?])+([./-][aA-zZ0-9%=_&+?]+)*[/]?/g;
    var youtube_video_pattern = /(http(s)?:\/\/)?(((youtu.be\/)([aA-zZ0-9-]+))|((www.youtube.com\/((watch\?v=)|(embed\/)|(v\/)))([aA-z0-9-Z&=.])+))/g;
    var html5VideoFormats = ["mp4", "webm", "ogg"];
    var imageFormats = ["jpg", "jpeg", "png", "gif", "bmp"];
    if(typeof source != "string") {
      return null
    }
    if(source.match(youtube_video_pattern) != null) {
      return"youtube"
    }
    source = source.split("?")[0];
    var extension = getExtensionFromSrc(source);
    if(imageFormats.indexOf(extension) != "-1") {
      return"image"
    }
    if(extension == "swf") {
      return"swf"
    }
    if(extension == "pdf") {
      return"pdf"
    }
    if(html5VideoFormats.indexOf(extension) != "-1") {
      return"HTML5"
    }
    if(source.match(http_urls_pattern) != null || source.match(www_urls_pattern) != null) {
      return"web"
    }
    return extension
  };
  var getExtensionFromSrc = function(source) {
    return source.split(".").pop().toLowerCase()
  };
  return{init:init, getExtensionFromSrc:getExtensionFromSrc, getObjectInfo:getObjectInfo}
}(VISH, jQuery);
VISH.Renderer = function(V, $, undefined) {
  var SLIDE_CONTAINER = null;
  var init = function() {
    SLIDE_CONTAINER = $(".slides");
    V.Renderer.Filter.init()
  };
  var renderSlide = function(slide, extra_classes, extra_buttons) {
    var article;
    if(!extra_classes) {
      var extra_classes = ""
    }
    if(!extra_buttons) {
      var extra_buttons = ""
    }
    switch(slide.type) {
      case undefined:
      ;
      case V.Constant.STANDARD:
      ;
      case V.Constant.QUIZ_SIMPLE:
        article = _renderStandardSlide(slide, extra_classes, extra_buttons);
        break;
      case V.Constant.FLASHCARD:
        article = _renderFlashcardSlide(slide, extra_classes, extra_buttons);
        break;
      case V.Constant.VTOUR:
        article = _renderVirtualTourSlide(slide, extra_classes, extra_buttons);
        break;
      default:
        article = null;
        break
    }
    if(article) {
      SLIDE_CONTAINER.append($(article));
      _afterDrawSlide(slide)
    }
  };
  var _renderStandardSlide = function(slide, extra_classes, extra_buttons) {
    var content = "";
    var classes = "";
    for(el in slide.elements) {
      if(!V.Renderer.Filter.allowElement(slide.elements[el])) {
        content += V.Renderer.Filter.renderContentFiltered(slide.elements[el], slide.template)
      }else {
        if(slide.elements[el].type === V.Constant.TEXT) {
          content += _renderText(slide.elements[el], slide.template)
        }else {
          if(slide.elements[el].type === V.Constant.IMAGE) {
            content += _renderImage(slide.elements[el], slide.template)
          }else {
            if(slide.elements[el].type === V.Constant.VIDEO) {
              content += renderVideo(slide.elements[el], slide.template)
            }else {
              if(slide.elements[el].type === V.Constant.OBJECT) {
                content += _renderObject(slide.elements[el], slide.template);
                classes += "object "
              }else {
                if(slide.elements[el].type === V.Constant.SNAPSHOT) {
                  content += _renderSnapshot(slide.elements[el], slide.template);
                  classes += "snapshot "
                }else {
                  if(slide.elements[el].type === V.Constant.APPLET) {
                    content += _renderApplet(slide.elements[el], slide.template);
                    classes += "applet "
                  }else {
                    if(slide.elements[el].type === V.Constant.QUIZ) {
                      content += V.Quiz.render(slide.elements[el], slide.template);
                      classes += V.Constant.QUIZ
                    }else {
                      content += _renderEmpty(slide.elements[el], slide.template)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return"<article class='" + extra_classes + " " + classes + "' id='" + slide.id + "'>" + extra_buttons + content + "</article>"
  };
  var _renderFlashcardSlide = function(slide, extra_classes, extra_buttons) {
    var all_slides = "";
    for(index in slide.slides) {
      var subslide = slide.slides[index];
      all_slides += _renderStandardSlide(subslide, "subslide", "<div class='close_subslide' id='close" + subslide.id + "'></div>")
    }
    var div_for_slides_hidden = "<div class='subslides' >" + all_slides + "</div>";
    return $("<article class='" + extra_classes + " flashcard_slide' type='flashcard' avatar='" + slide.background + "' id='" + slide.id + "'>" + extra_buttons + div_for_slides_hidden + "</article>")
  };
  var _renderVirtualTourSlide = function(slide, extra_classes, extra_buttons) {
    var all_slides = "";
    for(index in slide.slides) {
      var subslide = slide.slides[index];
      all_slides += _renderStandardSlide(subslide, "subslide", "<div class='close_subslide' id='close" + subslide.id + "'></div>")
    }
    var div_for_slides_hidden = "<div class='subslides' >" + all_slides + "</div>";
    return $("<article class='" + extra_classes + " virtualTour_slide' type='" + V.Constant.VTOUR + "' id='" + slide.id + "'>" + extra_buttons + div_for_slides_hidden + "</article>")
  };
  var _afterDrawSlide = function(slide) {
    switch(slide.type) {
      case undefined:
      ;
      case V.Constant.STANDARD:
        break;
      case V.Constant.FLASHCARD:
        $("#" + slide.id).css("background-image", slide.background);
        for(index in slide.pois) {
          var poi = slide.pois[index];
          V.Flashcard.addArrow(slide.id, poi, true)
        }
        break;
      case V.Constant.VTOUR:
        V.VirtualTour.drawMap(slide);
        break;
      default:
        break
    }
  };
  var _renderText = function(element, template) {
    return"<div id='" + element["id"] + "' class='VEtextArea " + template + "_" + element["areaid"] + " " + template + "_text" + "'>" + element["body"] + "</div>"
  };
  var _renderEmpty = function(element, template) {
    return"<div id='" + element["id"] + "' class='" + template + "_" + element["areaid"] + " " + template + "_text" + "'></div>"
  };
  var _renderImage = function(element, template) {
    var div = $("<div id='" + element["id"] + "' class='" + template + "_" + element["areaid"] + "'></div>");
    var img = $("<img class='" + template + "_image' src='" + element["body"] + "' style='" + element["style"] + "' />");
    if(element["hyperlink"]) {
      var a = $("<a href='" + element["hyperlink"] + "' target='blank_'></a>");
      $(a).append(img);
      $(div).append(a)
    }else {
      $(div).append(img)
    }
    return V.Utils.getOuterHTML(div)
  };
  var renderVideo = function(element, template) {
    var rendered = "<div id='" + element["id"] + "' class='" + template + "_" + element["areaid"] + "'>";
    var style = element["style"] ? "style='" + element["style"] + "'" : "";
    var controls = element["controls"] ? "controls='" + element["controls"] + "' " : "controls='controls' ";
    var autoplay = element["autoplay"] ? "autoplayonslideenter='" + element["autoplay"] + "' " : "";
    var poster = element["poster"] ? "poster='" + element["poster"] + "' " : "";
    var loop = element["loop"] ? "loop='loop' " : "";
    var sources = element["sources"];
    var videoId = V.Utils.getId();
    if(typeof sources == "string") {
      sources = JSON.parse(sources)
    }
    rendered = rendered + "<video id='" + videoId + "' class='" + template + "_video' preload='metadata' " + style + controls + autoplay + poster + loop + ">";
    $.each(sources, function(index, source) {
      var type = source.type ? "type='" + source.type + "' " : "";
      rendered = rendered + "<source src='" + source.src + "' " + type + ">"
    });
    if(sources.length > 0) {
      rendered = rendered + "<p>Your browser does not support HTML5 video.</p>"
    }
    rendered = rendered + "</video>";
    return rendered
  };
  var _renderObject = function(element, template) {
    var objectInfo = V.Object.getObjectInfo(element.body);
    switch(objectInfo.type) {
      case "youtube":
        return _renderYoutubeVideo(element, template, objectInfo.source);
        break;
      default:
        var style = element["style"] ? element["style"] : "";
        var body = element["body"];
        var zoomInStyle = element["zoomInStyle"] ? element["zoomInStyle"] : "";
        return"<div id='" + element["id"] + "' class='objectelement " + template + "_" + element["areaid"] + "' objectStyle='" + style + "' zoomInStyle='" + zoomInStyle + "' objectWrapper='" + body + "'>" + "" + "</div>";
        break
    }
  };
  var _renderYoutubeVideo = function(element, template, source) {
    var ytContainerId = V.Utils.getId();
    var style = element["style"] ? element["style"] : "";
    var body = element["body"];
    var zoomInStyle = element["zoomInStyle"] ? element["zoomInStyle"] : "";
    return"<div id='" + element["id"] + "' class='objectelement youtubeelement " + template + "_" + element["areaid"] + "' objectStyle='" + style + "' zoomInStyle='" + zoomInStyle + "' source='" + source + "' ytContainerId='" + ytContainerId + "'>" + "</div>"
  };
  var _renderSnapshot = function(element, template) {
    var style = element["style"] ? element["style"] : "";
    var body = element["body"];
    var scrollTop = element["scrollTop"] ? element["scrollTop"] : 0;
    var scrollLeft = element["scrollLeft"] ? element["scrollLeft"] : 0;
    return"<div id='" + element["id"] + "' class='snapshotelement " + template + "_" + element["areaid"] + "' template='" + template + "' objectStyle='" + style + "' scrollTop='" + scrollTop + "' scrollTopOrigin='" + scrollTop + "' scrollLeft='" + scrollLeft + "' scrollLeftOrigin='" + scrollLeft + "' objectWrapper='" + body + "'>" + "" + "</div>"
  };
  var _renderApplet = function(element, template) {
    return"<div id='" + element["id"] + "' class='appletelement " + template + "_" + element["areaid"] + "' code='" + element["code"] + "' width='" + element["width"] + "' height='" + element["height"] + "' archive='" + element["archive"] + "' params='" + element["params"] + "' ></div>"
  };
  var _renderFlashcard = function(element, template) {
    return"<div id='" + element["id"] + "' class='template_flashcard'><canvas id='" + element["canvasid"] + "'>Your browser does not support canvas</canvas></div>"
  };
  return{init:init, renderVideo:renderVideo, renderSlide:renderSlide}
}(VISH, jQuery);
VISH.Renderer.Filter = function(V, $, undefined) {
  var init = function() {
  };
  var allowElement = function(element) {
    var device = V.Status.getDevice();
    if(device.desktop) {
      switch(element.type) {
        case "applet":
          return false;
        default:
          return true
      }
    }else {
      if(device.mobile || device.tablet) {
        switch(element.type) {
          case "object":
            var objectInfo = V.Object.getObjectInfo(element.body);
            if(objectInfo.type == "swf") {
              return false
            }else {
              if(objectInfo.type == "youtube") {
                return true
              }
            }
            break;
          case "video":
            return true;
            break;
          case "snapshot":
            return true;
            break;
          case "applet":
            return false;
          default:
            return true
        }
      }
    }
    return true
  };
  var renderContentFiltered = function(element, template) {
    return"<div id='" + element["id"] + "' class='contentfiltered " + template + "_" + element["areaid"] + "'><img class='" + template + "_image' src='" + V.ImagesPath + "adverts/advert_new_grey.png'/></div>"
  };
  return{init:init, allowElement:allowElement, renderContentFiltered:renderContentFiltered}
}(VISH, jQuery);
VISH.Debugging = function(V, $, undefined) {
  var developping = false;
  var settings;
  var presentationOptions;
  var init = function(options) {
    if(options) {
      if(typeof options["developping"] == "boolean") {
        developping = options["developping"];
        if(developping) {
          presentationOptions = options;
          if(options["developmentSettings"]) {
            settings = options["developmentSettings"]
          }
        }
      }else {
        developping = false;
        settings = null
      }
    }else {
      developping = false;
      settings = null
    }
  };
  var log = function(text) {
    if(window.console && window.console.log && developping) {
      console.log(text)
    }
  };
  var shuffleJson = function(json) {
    return _shuffle(json)
  };
  var _shuffle = function(o) {
    for(var j, x, i = o.length;i;j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {
    }
    return o
  };
  var enableDevelopingMode = function() {
    developping = true
  };
  var disableDevelopingMode = function() {
    developping = false
  };
  var isDevelopping = function() {
    return developping
  };
  var getActionSave = function() {
    if(settings) {
      return settings.actionSave
    }else {
      return"view"
    }
  };
  var getActionInit = function() {
    if(settings) {
      return settings.actionInit
    }else {
      return"nothing"
    }
  };
  var getPresentationSamples = function() {
    if(settings && settings.samples) {
      return settings.samples
    }else {
      log("VISH.Debugging Error: Please specify development settings");
      return null
    }
  };
  var initVishViewer = function() {
    var mypresentation = null;
    if(V.Editing) {
      if(!presentationOptions) {
        log("VISH.Debugging Error: Specify presentationOptions");
        return
      }
      mypresentation = V.Editor.getSavedPresentation();
      if(mypresentation === null) {
        mypresentation = V.Editor.savePresentation()
      }
    }else {
      log("You are already in Vish Viewer");
      return
    }
    $("article").remove();
    $("#menubar").hide();
    $("#menubar_helpsection").hide();
    $("#menubar_helpsection2").hide();
    $("#joyride_help_button").hide();
    $("#preview_circle").hide();
    V.Editor.Tools.cleanZoneTools();
    V.Editor.Tools.disableToolbar();
    $("#menubar-viewer").show();
    V.SlideManager.init(presentationOptions, mypresentation)
  };
  var initVishEditor = function() {
    var mypresentation = null;
    if(V.Editing) {
      log("You are already in Vish Editor");
      return
    }else {
      if(!presentationOptions) {
        log("VISH.Debugging Error: Specify presentationOptions");
        return
      }
      mypresentation = V.Editor.getSavedPresentation()
    }
    $("article").remove();
    $("#menubar").show();
    $("#menubar_helpsection").show();
    $("#menubar_helpsection2").show();
    $("#joyride_help_button").show();
    $("#preview_circle").show();
    V.Editor.Tools.enableToolbar();
    $("#menubar-viewer").hide();
    V.Editor.init(presentationOptions, mypresentation)
  };
  return{init:init, log:log, shuffleJson:shuffleJson, enableDevelopingMode:enableDevelopingMode, disableDevelopingMode:disableDevelopingMode, isDevelopping:isDevelopping, getActionSave:getActionSave, getActionInit:getActionInit, getPresentationSamples:getPresentationSamples, initVishViewer:initVishViewer, initVishEditor:initVishEditor}
}(VISH, jQuery);
VISH.Presentation = function(V, undefined) {
  var mySlides = null;
  var init = function(slides) {
    mySlides = slides;
    V.Renderer.init();
    for(var i = 0;i < slides.length;i++) {
      V.Renderer.renderSlide(slides[i])
    }
    _finishRenderer()
  };
  var _finishRenderer = function() {
    V.VideoPlayer.HTML5.setVideoEvents();
    V.SlideManager.addEnterLeaveEvents();
    var evt = document.createEvent("Event");
    evt.initEvent("OURDOMContentLoaded", false, true);
    document.dispatchEvent(evt)
  };
  return{init:init}
}(VISH);
VISH.Text = function(V, $, undefined) {
  var init = function() {
    _adaptPs($("article > div.VEtextArea > p"));
    _adaptPs($("article > div.quizzContainer > div > p"));
    _adaptPs($("article > div.quizzContainer").find("td > p"));
    $("article > div.VEtextArea > table").each(function(index, table) {
      _adaptSpans($(table).find("caption").find("span"));
      $(table).find("td").each(function(index, td) {
        _adaptSpans($(td).find("span"));
        _adaptFonts($(td).find("font"))
      });
      var tableOrgStyle = $(table).attr("style");
      if(tableOrgStyle) {
        var tableStyle = "";
        var tableWidth = V.Utils.getWidthFromStyle(tableOrgStyle);
        if(tableWidth) {
          var percentWidth = tableWidth * 100 / 800;
          tableStyle += "width:" + percentWidth + "%;"
        }
        var tableHeight = V.Utils.getHeightFromStyle(tableOrgStyle);
        if(tableHeight) {
          var percentHeight = tableHeight * 100 / 600;
          tableStyle += "height:" + percentHeight + "%;"
        }
        if(tableStyle !== "") {
          $(table).attr("style", tableStyle)
        }
      }
    })
  };
  var _adaptPs = function(selector) {
    $(selector).each(function(index, p) {
      if($(p).children().length === 0) {
        _setStyleInEm(p);
        return
      }
      _adaptSpans($(p).find("span"));
      _adaptFonts($(p).find("font"))
    })
  };
  var _adaptSpans = function(spans) {
    var oldStyle = null;
    var newStyle = null;
    var lastFontSizeCandidate = null;
    var lastFontSize = null;
    $(spans).each(function(index, span) {
      oldStyle = $(span).attr("style");
      lastFontSizeCandidate = parseInt(V.Utils.getFontSizeFromStyle(oldStyle));
      if(typeof lastFontSizeCandidate === "number" && !isNaN(lastFontSizeCandidate)) {
        lastFontSize = lastFontSizeCandidate
      }
      if($(span).find("span").length !== 0) {
        newStyle = V.Utils.removeFontSizeInStyle(oldStyle);
        if(newStyle === null || newStyle === "; ") {
          $(span).removeAttr("style")
        }else {
          $(span).attr("style", newStyle)
        }
      }else {
        var fontSize;
        if(typeof lastFontSizeCandidate === "number" && !isNaN(lastFontSizeCandidate)) {
          fontSize = lastFontSizeCandidate
        }else {
          if(lastFontSize !== null) {
            fontSize = lastFontSize
          }else {
            fontSize = V.Constant.TextDefault
          }
        }
        var em = fontSize / V.Constant.TextBase + "em";
        newStyle = V.Utils.addFontSizeToStyle(oldStyle, em);
        $(span).attr("style", newStyle)
      }
    })
  };
  var _adaptFonts = function(fonts) {
    $(fonts).each(function(index, font) {
      var fSize = $(font).attr("size");
      if(!fSize) {
        return
      }
      var fontSize = parseInt(fSize);
      if(isNaN(fontSize)) {
        return
      }
      $(font).hide();
      var pxfontSize = _font_to_px(fontSize);
      var em = pxfontSize / V.Constant.TextBase + "em";
      var span = $("<span style='font-size:" + em + "'></span>");
      $(span).html($(font).html());
      $(font).parent().prepend(span);
      $(font).remove()
    })
  };
  var _setStyleInEm = function(el) {
    var oldStyle = $(el).attr("style");
    var fontSize;
    if(typeof oldStyle !== "string") {
      oldStyle = ""
    }else {
      fontSize = V.Utils.getFontSizeFromStyle(oldStyle)
    }
    if(typeof fontSize !== "number" || isNaN(fontSize)) {
      fontSize = V.Constant.TextDefault
    }
    var em = fontSize / V.Constant.TextBase + "em";
    var newStyle = V.Utils.addFontSizeToStyle(oldStyle, em);
    $(el).attr("style", newStyle)
  };
  var aftersetupSize = function(increase) {
    increase = increase * _correctionFactor(increase);
    var reference_font_size = V.Constant.TextBase;
    var texts = $("article, #fancybox-content");
    $(texts).css("font-size", reference_font_size * increase + "px")
  };
  var _correctionFactor = function(factor) {
    if(factor < 0.25) {
      return 0.5
    }else {
      if(_isInRange(factor, 0.25, 0.3)) {
        return 0.55
      }else {
        if(_isInRange(factor, 0.3, 0.35)) {
          return 0.65
        }else {
          if(_isInRange(factor, 0.35, 0.4)) {
            return 0.7
          }else {
            if(_isInRange(factor, 0.4, 0.5)) {
              return 0.8
            }else {
              if(_isInRange(factor, 0.5, 0.6)) {
                return 0.85
              }else {
                if(_isInRange(factor, 0.6, 0.75)) {
                  return 0.9
                }else {
                  if(_isInRange(factor, 0.75, 0.95)) {
                    return 0.95
                  }else {
                    if(_isInRange(factor, 0.95, 1.5)) {
                      return 1
                    }else {
                      if(factor > 1.5) {
                        return 1
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return 1
  };
  var _isInRange = function(number, min, max) {
    return number > min && number <= max
  };
  var _font_to_px = function(fz) {
    switch(fz) {
      case 7:
        return 48;
        break;
      case 6:
        return 32;
        break;
      case 5:
        return 24;
        break;
      case 4:
        return 18;
        break;
      case 3:
        return 16;
        break;
      case 2:
        return 14;
        break;
      case 1:
        return 12;
        break;
      default:
        break
    }
  };
  return{init:init, aftersetupSize:aftersetupSize}
}(VISH, jQuery);
VISH.VideoPlayer = function(V, $, undefined) {
  var init = function() {
    V.VideoPlayer.CustomPlayer.init();
    V.VideoPlayer.HTML5.init();
    V.VideoPlayer.Youtube.init()
  };
  var getTypeVideoWithId = function(videoId) {
    return getTypeVideo(document.getElementById(videoId))
  };
  var getTypeVideo = function(video) {
    if(!video) {
      return V.Constant.UNKNOWN
    }else {
      if(video.tagName === "VIDEO") {
        return V.Constant.Video.HTML5
      }else {
        if(video.tagName === "OBJECT" || video.tagName === "IFRAME") {
          return V.Constant.Video.Youtube
        }
      }
    }
    return V.Constant.UNKNOWN
  };
  var playVideo = function(videoId, currentTime, triggeredByUser) {
    switch(getTypeVideoWithId(videoId)) {
      case V.Constant.Video.HTML5:
        V.VideoPlayer.HTML5.playVideo(videoId, currentTime, triggeredByUser);
        break;
      case V.Constant.Video.Youtube:
        V.VideoPlayer.Youtube.playVideo(videoId, currentTime, triggeredByUser);
        break;
      default:
        break
    }
  };
  var pauseVideo = function(videoId, currentTime, triggeredByUser) {
    switch(getTypeVideoWithId(videoId)) {
      case V.Constant.Video.HTML5:
        V.VideoPlayer.HTML5.pauseVideo(videoId, currentTime, triggeredByUser);
        break;
      case V.Constant.Video.Youtube:
        V.VideoPlayer.Youtube.pauseVideo(videoId, currentTime, triggeredByUser);
        break;
      default:
        break
    }
  };
  var seekVideo = function(videoId, seekTime, triggeredByUser) {
    switch(getTypeVideoWithId(videoId)) {
      case V.Constant.Video.HTML5:
        V.VideoPlayer.HTML5.seekVideo(videoId, seekTime, triggeredByUser);
        break;
      case V.Constant.Video.Youtube:
        V.VideoPlayer.Youtube.seekVideo(videoId, seekTime, triggeredByUser);
        break;
      default:
        break
    }
  };
  var getDuration = function(video) {
    switch(getTypeVideo(video)) {
      case V.Constant.Video.HTML5:
        return video.getDuration();
        break;
      case V.Constant.Video.Youtube:
        return youtubePlayers[video.id].getDuration();
        break;
      default:
        break
    }
  };
  var getCurrentTime = function(video) {
    switch(getTypeVideo(video)) {
      case V.Constant.Video.HTML5:
        return video.getCurrentTime();
        break;
      case V.Constant.Video.Youtube:
        return youtubePlayers[video.id].getCurrentTime();
        break;
      default:
        break
    }
  };
  return{init:init, getTypeVideoWithId:getTypeVideoWithId, getTypeVideo:getTypeVideo, playVideo:playVideo, pauseVideo:pauseVideo, seekVideo:seekVideo, getDuration:getDuration, getCurrentTime:getCurrentTime}
}(VISH, jQuery);
VISH.VideoPlayer.CustomPlayer = function(V, $, undefined) {
  var progressBarTimer;
  var init = function() {
  };
  var addCustomPlayerControls = function(videoId, loadEvents) {
    var video = document.getElementById(videoId);
    var customPlayerContainer = $("<div class='customPlayerContainer'>");
    $(video).parent().append(customPlayerContainer);
    $(video).remove();
    $(customPlayerContainer).append(video);
    $(customPlayerContainer).append($("<div class='customPlayerControls'><div class='customPlayerButton customPlayerPlay'></div></div>"));
    $(customPlayerContainer).append($("<div class='customPlayerProgressBar'><div class='progressBarElapsed'></div></div>"));
    var customPlayerControls = $(customPlayerContainer).find("div.customPlayerControls");
    $(customPlayerContainer).attr("style", $(video).attr("style"));
    $(video).attr("style", "width:100%; height:100%;");
    $(customPlayerControls).attr("style", "width: 100%; height:100%;");
    _adjustPlayerControls(customPlayerControls);
    $(video).attr("customPlayerStatus", "ready");
    if(loadEvents) {
      loadCustomPlayerControlEvents(video)
    }
  };
  var _adjustPlayerControls = function(customPlayerControls) {
    var width = $(customPlayerControls).width();
    var height = $(customPlayerControls).height();
    var min_width = 70;
    var originalBackgroundSize = 0.5;
    var icon_width = originalBackgroundSize * width;
    if(icon_width > height) {
      _applyBackgroundSize(customPlayerControls, height / width)
    }else {
      if(icon_width < min_width) {
        _applyBackgroundSize(customPlayerControls, Math.min(1, min_width / width))
      }else {
        _applyBackgroundSize(customPlayerControls, originalBackgroundSize)
      }
    }
  };
  var _applyBackgroundSize = function(customPlayerControls, bs) {
    $(customPlayerControls).find("div.customPlayerButton").css("background-size", bs * 100 + "%")
  };
  var loadCustomPlayerControlEvents = function(video) {
    var customPlayerContainer = $(video).parent();
    var customPlayerControls = $(customPlayerContainer).find("div.customPlayerControls");
    var progressBar = $(customPlayerContainer).parent().find("div.customPlayerProgressBar");
    $(customPlayerControls).bind("click", _onClickCustomPlayerControls);
    $(customPlayerContainer).bind("mouseenter", _onEnterCustomPlayer);
    $(customPlayerContainer).bind("mouseleave", _onLeaveCustomPlayer);
    $(progressBar).bind("click", _onClickProgressBar)
  };
  var _onClickCustomPlayerControls = function(event) {
    event.preventDefault();
    var video = $(this).parent().children()[0];
    onClickVideo(video)
  };
  var _onEnterCustomPlayer = function(event) {
    var video = $(event.target).parent().children()[0];
    if($(video).attr("customPlayerStatus") !== "ready") {
      var progressBar = $(video).parent().find("div.customPlayerProgressBar");
      $(progressBar).show()
    }
  };
  var _onLeaveCustomPlayer = function(event) {
    var progressBar = $(event.target).parent().find("div.customPlayerProgressBar");
    $(progressBar).hide()
  };
  var _startProgressBar = function(video) {
    var progressBar = $(video).parent().find("div.progressBarElapsed");
    var timer = progressBarTimer = setInterval(function() {
      try {
        var ratio = V.VideoPlayer.getCurrentTime(video) / V.VideoPlayer.getDuration(video) * 100;
        $(progressBar).width(ratio + "%");
        if(ratio === 100) {
          clearTimeout(timer)
        }
      }catch(e) {
        clearTimeout(timer)
      }
    }, 400)
  };
  var _onClickProgressBar = function(event) {
    if(V.Status.isSlaveMode()) {
      return
    }
    if($(event.target).hasClass("customPlayerProgressBar")) {
      var progressBar = event.target;
      var elapsed = $(progressBar).find("div.progressBarElapsed")[0]
    }else {
      if($(event.target).hasClass("progressBarElapsed")) {
        var elapsed = event.target;
        var progressBar = $(elapsed).parent()
      }else {
        return
      }
    }
    event.preventDefault();
    event.stopPropagation();
    var video = $(progressBar).parent().children()[0];
    var ratio = (event.pageX - $(progressBar).offset().left) / $(progressBar).outerWidth();
    var seekToPos = Math.round(V.VideoPlayer.getDuration(video) * ratio);
    V.VideoPlayer.seekVideo(video.id, seekToPos, true)
  };
  var onClickVideo = function(video) {
    if(V.Status.isSlaveMode()) {
      return
    }
    switch($(video).attr("customPlayerStatus")) {
      case "ready":
      ;
      case "pause":
        if(!V.Status.isPreventDefaultMode()) {
          onPlayVideo(video)
        }
        V.VideoPlayer.playVideo(video.id, null, true);
        break;
      case "playing":
        if(!V.Status.isPreventDefaultMode()) {
          onPauseVideo(video)
        }
        V.VideoPlayer.pauseVideo(video.id, null, true);
        break;
      default:
        break
    }
  };
  var onPlayVideo = function(video) {
    _startProgressBar(video);
    var customPlayerControlsButton = $(video).parent().find("div.customPlayerControls").find("div");
    var progressBar = $(video).parent().find("div.customPlayerProgressBar");
    $(customPlayerControlsButton).removeClass().addClass("customPlayerButton customPlayerPause");
    $(customPlayerControlsButton).hide();
    $(video).attr("customPlayerStatus", "playing");
    $(progressBar).show()
  };
  var onPauseVideo = function(video) {
    var customPlayerControlsButton = $(video).parent().find("div.customPlayerControls").find("div");
    $(customPlayerControlsButton).removeClass().addClass("customPlayerButton customPlayerPlay");
    $(customPlayerControlsButton).show();
    $(video).attr("customPlayerStatus", "pause")
  };
  var onEndVideo = function(video) {
    $(video).attr("customPlayerStatus", "pause");
    var customPlayerControlsButton = $(video).parent().find("div.customPlayerControls").find("div");
    $(customPlayerControlsButton).removeClass().addClass("customPlayerButton customPlayerReplay");
    $(customPlayerControlsButton).show()
  };
  return{init:init, addCustomPlayerControls:addCustomPlayerControls, loadCustomPlayerControlEvents:loadCustomPlayerControlEvents, onPlayVideo:onPlayVideo, onPauseVideo:onPauseVideo, onEndVideo:onEndVideo}
}(VISH, jQuery);
VISH.VideoPlayer.HTML5 = function(V, $, undefined) {
  var playTriggeredByUser = true;
  var pauseTriggeredByUser = true;
  var seekTriggeredByUser = true;
  var init = function() {
  };
  var setVideoEvents = function() {
    var videos = $("video");
    $.each(videos, function(index, video) {
      video.addEventListener("play", function() {
        var params = new Object;
        params.type = "HTML5";
        params.videoId = video.id;
        params.currentTime = video.currentTime;
        params.slideNumber = V.Slides.getCurrentSlideNumber();
        V.EventsNotifier.notifyEvent(V.Constant.Event.onPlayVideo, params, playTriggeredByUser);
        playTriggeredByUser = true
      }, false);
      video.addEventListener("pause", function() {
        var params = new Object;
        params.type = "HTML5";
        params.videoId = video.id;
        params.currentTime = video.currentTime;
        params.slideNumber = V.Slides.getCurrentSlideNumber();
        V.EventsNotifier.notifyEvent(V.Constant.Event.onPauseVideo, params, pauseTriggeredByUser);
        pauseTriggeredByUser = true
      }, false);
      video.addEventListener("ended", function() {
      }, false);
      video.addEventListener("error", function(err) {
      }, false);
      video.addEventListener("seeked", function(err) {
        var params = new Object;
        params.type = "HTML5";
        params.videoId = video.id;
        params.currentTime = video.currentTime;
        params.slideNumber = V.Slides.getCurrentSlideNumber();
        V.EventsNotifier.notifyEvent(V.Constant.Event.onSeekVideo, params, seekTriggeredByUser);
        seekTriggeredByUser = true
      }, false);
      $(video).focus(function(event) {
        this.blur()
      })
    })
  };
  var playVideos = function(element) {
    var currentVideos = $(element).find("video");
    $.each(currentVideos, function(index, video) {
      if($(video).attr("wasplayingonslideleave") == "true") {
        video.play()
      }else {
        if($(video).attr("wasplayingonslideleave") == "false") {
        }else {
          if(typeof $(video).attr("wasplayingonslideleave") == "undefined") {
            if($(video).attr("autoplayonslideenter") == "true") {
              video.play()
            }
          }
        }
      }
    })
  };
  var stopVideos = function(element) {
    var currentVideos = $(element).find("video");
    $.each(currentVideos, function(index, video) {
      var playing = !video.paused;
      $(video).attr("wasplayingonslideleave", playing);
      if(playing) {
        video.pause()
      }
    })
  };
  var playVideo = function(videoId, currentTime) {
    var video = $("#" + videoId)[0];
    if(typeof currentTime === "number" && video.currentTime !== currentTime) {
      seekTriggeredByUser = false;
      video.currentTime = currentTime
    }
    if(video.paused) {
      playTriggeredByUser = false;
      video.play()
    }
  };
  var pauseVideo = function(videoId, currentTime) {
    var video = $("#" + videoId)[0];
    if(typeof currentTime === "number" && video.currentTime !== currentTime) {
      seekTriggeredByUser = false;
      video.currentTime = currentTime
    }
    if(!video.paused) {
      pauseTriggeredByUser = false;
      video.pause()
    }
  };
  var seekVideo = function(videoId, currentTime) {
    var video = $("#" + videoId)[0];
    if(typeof currentTime === "number" && video.currentTime !== currentTime) {
      seekTriggeredByUser = false;
      video.currentTime = currentTime
    }
  };
  var showControls = function(showControls) {
    var videos = $("video");
    $.each(videos, function(index, video) {
      if(!showControls) {
        $(video).removeAttr("controls")
      }else {
        $(video).attr("controls", true)
      }
    })
  };
  return{init:init, setVideoEvents:setVideoEvents, playVideos:playVideos, stopVideos:stopVideos, playVideo:playVideo, pauseVideo:pauseVideo, seekVideo:seekVideo, showControls:showControls}
}(VISH, jQuery);
var youtubePlayers = {};
var YT = YT || {};
YT.PlayerState = YT.PlayerState || {};
YT.PlayerState.UNSTARTED = -1;
YT.PlayerState.ENDED = 0;
YT.PlayerState.PLAYING = 1;
YT.PlayerState.PAUSED = 2;
YT.PlayerState.BUFFERING = 3;
YT.PlayerState.CUED = 5;
function onYouTubeIframeAPIReady() {
}
VISH.VideoPlayer.Youtube = function(V, $, undefined) {
  var init = function() {
  };
  var _isYouTubeIframeAPIReady = function() {
    if(window["YT"]) {
      return true
    }else {
      return false
    }
  };
  var loadYoutubeObject = function(article, zone) {
    if(V.Status.isOnline() === false) {
      $(zone).html("<img src='" + V.ImagesPath + "adverts/advert_new_grey_video.png'/>");
      return
    }
    if(!_isYouTubeIframeAPIReady()) {
      return
    }
    var youtubeVideoId = getYoutubeIdFromURL($(zone).attr("source"));
    if(youtubeVideoId === null) {
      return
    }
    var iframeId = $(zone).attr("ytContainerId");
    $(zone).html("<div id='" + iframeId + "' style='" + $(zone).attr("objectStyle") + "'></div>");
    youtubePlayers[iframeId] = new YT.Player(iframeId, {height:"100%", width:"100%", videoId:youtubeVideoId, playerVars:{"autoplay":0, "controls":0, "enablejsapi":1, "showinfo":0, wmode:"transparent", "rel":0}, events:{"onReady":onPlayerReady, "onStateChange":onPlayerStateChange, "onError":onPlayerError}});
    $("#" + iframeId).attr("wmode", "transparent");
    V.VideoPlayer.CustomPlayer.addCustomPlayerControls(iframeId, false)
  };
  var onPlayerReady = function(event) {
    var iframe = event.target.getIframe();
    V.VideoPlayer.CustomPlayer.loadCustomPlayerControlEvents(iframe)
  };
  var onPlayerStateChange = function(event) {
    var newState = event.data;
    var iframe = event.target.getIframe();
    switch(newState) {
      case -1:
        break;
      case 0:
        V.VideoPlayer.CustomPlayer.onEndVideo(iframe);
        break;
      case 1:
        V.VideoPlayer.CustomPlayer.onPlayVideo(iframe);
        break;
      case 2:
        V.VideoPlayer.CustomPlayer.onPauseVideo(iframe);
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      default:
        break
    }
  };
  var onPlayerError = function(event) {
    V.Debugging.log("onPlayerError with error type " + event.data)
  };
  var playVideo = function(iframeId, currentTime, triggeredByUser) {
    var ytPlayer = youtubePlayers[iframeId];
    if(ytPlayer && ytPlayer.getPlayerState) {
      var params = new Object;
      params.videoId = iframeId;
      params.currentTime = ytPlayer.getCurrentTime();
      params.slideNumber = V.Slides.getCurrentSlideNumber();
      if(triggeredByUser && V.Status.isPreventDefaultMode()) {
        V.Messenger.notifyEventByMessage(V.Constant.Event.onPlayVideo, params);
        return
      }
      V.EventsNotifier.notifyEvent(V.Constant.Event.onPlayVideo, params, triggeredByUser);
      _seekVideo(ytPlayer, iframeId, currentTime, false);
      if(ytPlayer.getPlayerState() !== YT.PlayerState.PLAYING) {
        ytPlayer.playVideo()
      }
    }
  };
  var pauseVideo = function(iframeId, currentTime, triggeredByUser) {
    var ytPlayer = youtubePlayers[iframeId];
    if(ytPlayer && ytPlayer.getPlayerState) {
      var params = new Object;
      params.videoId = iframeId;
      params.currentTime = ytPlayer.getCurrentTime();
      params.slideNumber = V.Slides.getCurrentSlideNumber();
      if(triggeredByUser && V.Status.isPreventDefaultMode()) {
        V.Messenger.notifyEventByMessage(V.Constant.Event.onPauseVideo, params);
        return
      }
      V.EventsNotifier.notifyEvent(V.Constant.Event.onPauseVideo, params, triggeredByUser);
      if(ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
        ytPlayer.pauseVideo()
      }
      _seekVideo(ytPlayer, iframeId, currentTime, false)
    }
  };
  var seekVideo = function(iframeId, seekTime, triggeredByUser) {
    var ytPlayer = youtubePlayers[iframeId];
    if(ytPlayer && ytPlayer.getPlayerState) {
      _seekVideo(ytPlayer, iframeId, seekTime, triggeredByUser)
    }
  };
  var _seekVideo = function(ytPlayer, iframeId, seekTime, triggeredByUser) {
    var changeCurrentTime = typeof seekTime === "number" && ytPlayer.getCurrentTime() !== seekTime;
    if(changeCurrentTime) {
      var params = new Object;
      params.videoId = iframeId;
      params.currentTime = seekTime;
      params.slideNumber = V.Slides.getCurrentSlideNumber();
      if(triggeredByUser && V.Status.isPreventDefaultMode()) {
        V.Messenger.notifyEventByMessage(V.Constant.Event.onSeekVideo, params);
        return
      }
      V.EventsNotifier.notifyEvent(V.Constant.Event.onSeekVideo, params, triggeredByUser);
      ytPlayer.seekTo(seekTime)
    }
  };
  var getYoutubeIdFromURL = function(url) {
    var id = null;
    if(!url) {
      return id
    }
    var youtube_video_pattern_1 = /https?:\/\/?youtu.be\/([aA-zZ0-9-]+)/g;
    var youtube_video_pattern_2 = /(https?:\/\/)?(www.youtube.com\/watch\?v=|embed\/)([aA-zZ0-9-]+)[&=.]*/g;
    var youtube_video_pattern_3 = /(https?:\/\/)?(www.youtube.com\/v\/)([aA-zZ0-9-]+)/g;
    var youtube_video_pattern_4 = /(https?:\/\/)?(www.youtube.com\/embed\/)([aA-zZ0-9-]+)/g;
    if(url.match(youtube_video_pattern_1) != null) {
      var result = youtube_video_pattern_1.exec(url);
      if(result && result[1]) {
        id = result[1]
      }
      return id
    }
    if(url.match(youtube_video_pattern_2) != null) {
      var result = url.split("&")[0];
      var result = youtube_video_pattern_2.exec(url);
      if(result && result[3]) {
        id = result[3]
      }
      return id
    }
    if(url.match(youtube_video_pattern_3) != null) {
      var result = url.split("&")[0];
      var result = youtube_video_pattern_3.exec(url);
      if(result && result[3]) {
        id = result[3]
      }
      return id
    }
    if(url.match(youtube_video_pattern_4) != null) {
      var result = url.split("&")[0];
      var result = youtube_video_pattern_4.exec(url);
      if(result && result[3]) {
        id = result[3]
      }
      return id
    }
    return id
  };
  return{init:init, loadYoutubeObject:loadYoutubeObject, onPlayerReady:onPlayerReady, onPlayerStateChange:onPlayerStateChange, playVideo:playVideo, pauseVideo:pauseVideo, seekVideo:seekVideo, getYoutubeIdFromURL:getYoutubeIdFromURL}
}(VISH, jQuery);
VISH.ObjectPlayer = function(V, $, undefined) {
  var loadObject = function(slide) {
    $.each(slide.children(".objectelement"), function(index, value) {
      if($(value).hasClass("youtubeelement")) {
        V.VideoPlayer.Youtube.loadYoutubeObject(slide, value);
        return
      }
      if($(value).attr("objectWrapper").match("^<iframe") !== null && V.Status.isOnline() === false) {
        $(value).html("<img src='" + V.ImagesPath + "/adverts/advert_new_grey_iframe.png'/>");
        return
      }
      var object = $($(value).attr("objectWrapper"));
      $(object).attr("style", $(value).attr("zoomInStyle"));
      $(value).html("<div style='" + $(value).attr("objectStyle") + "'>" + V.Utils.getOuterHTML(object) + "</div>");
      adjustDimensionsAfterZoom($($(value).children()[0]).children()[0])
    })
  };
  var unloadObject = function(slide) {
    $.each($(slide).children(".objectelement"), function(index, value) {
      $(value).html("")
    })
  };
  var aftersetupSize = function() {
    if($(".current").hasClass("object")) {
      loadObject($(".current"))
    }
  };
  var adjustDimensionsAfterZoom = function(objectWithZoom) {
    var parent = $(objectWithZoom).parent();
    var parentHeight = $(parent).height();
    var parentWidth = $(parent).width();
    var zoom = V.Utils.getZoomFromStyle($(objectWithZoom).attr("style"));
    var percentHeight = parentHeight / zoom / parentHeight * 100;
    var percentWidth = parentWidth / zoom / parentWidth * 100;
    $(objectWithZoom).height(percentHeight + "%");
    $(objectWithZoom).width(percentWidth + "%")
  };
  return{loadObject:loadObject, unloadObject:unloadObject, aftersetupSize:aftersetupSize, adjustDimensionsAfterZoom:adjustDimensionsAfterZoom}
}(VISH, jQuery);
VISH.SnapshotPlayer = function(V, $, undefined) {
  var loadSnapshot = function(element) {
    $.each(element.children(".snapshotelement"), function(index, value) {
      var wrapper_class = "snapshot_wrapper" + "_viewer";
      var content_class = "snapshot_content" + "_viewer";
      var content = $(value).attr("objectWrapper");
      if(V.Status.isOnline() === false) {
        $(value).html("<img src='" + V.ImagesPath + "adverts/advert_new_grey_iframe.png'/>");
        return
      }
      var iframe = $(V.Utils.getOuterHTML($(content)));
      $(iframe).removeClass();
      $(iframe).addClass(content_class);
      var scrollTop = $(value).attr("scrollTop");
      var scrollLeft = $(value).attr("scrollLeft");
      $(value).html("<div class='" + wrapper_class + "' style='" + $(value).attr("objectStyle") + "'>" + V.Utils.getOuterHTML(iframe) + "</div>");
      if($(value).attr("zoom")) {
        $(value).find("." + content_class).attr("style", V.Utils.getZoomInStyle($(value).attr("zoom")))
      }
      $(value).find("." + wrapper_class).scrollTop(scrollTop);
      $(value).find("." + wrapper_class).scrollLeft(scrollLeft)
    })
  };
  var unloadSnapshot = function(element) {
    var element = $(".past, .next");
    $.each(element.children(".snapshotelement"), function(index, value) {
      $(value).html("")
    })
  };
  var aftersetupSize = function(increase) {
    $.each($(".snapshot_content_viewer"), function(index, iframe) {
      var area = $(iframe).parent().parent();
      var iframe_wrapper = $(iframe).parent();
      $(area).attr("zoom", increase);
      $(iframe).attr("style", V.Utils.getZoomInStyle(increase));
      var scrollLeft = $(area).attr("scrollLeftOrigin");
      var newScrollLeft = scrollLeft * increase;
      var scrollTop = $(area).attr("scrollTopOrigin");
      var newScrollTop = scrollTop * increase;
      $(area).attr("scrollLeft", newScrollLeft);
      $(area).attr("scrollTop", newScrollTop);
      $(iframe_wrapper).scrollLeft(newScrollLeft);
      $(iframe_wrapper).scrollTop(newScrollTop)
    })
  };
  return{loadSnapshot:loadSnapshot, unloadSnapshot:unloadSnapshot, aftersetupSize:aftersetupSize}
}(VISH, jQuery);
VISH.AppletPlayer = function() {
  var loadApplet = function(element) {
    $.each(element.children(".appletelement"), function(index, value) {
      var toAppend = "<applet code='" + $(value).attr("code") + "' width='" + $(value).attr("width") + "' height='" + $(value).attr("height") + "' archive='" + $(value).attr("archive") + "'>" + $(value).attr("params") + "</applet>";
      $(value).html(toAppend)
    })
  };
  var unloadApplet = function(element) {
    $(".appletelement applet").remove()
  };
  return{loadApplet:loadApplet, unloadApplet:unloadApplet}
}(VISH, jQuery);
VISH.SlideManager = function(V, $, undefined) {
  var initOptions;
  var mySlides = null;
  var slideStatus = {};
  var myDoc;
  var current_presentation;
  var presentationType = "presentation";
  var init = function(options, presentation) {
    V.Editing = false;
    V.Debugging.init(options);
    if(options) {
      initOptions = options
    }else {
      initOptions = {}
    }
    if(options && options["configuration"] && V.Configuration) {
      V.Configuration.init(options["configuration"])
    }
    if(V.Debugging.isDevelopping()) {
      if(options["configuration"]["mode"] === V.Constant.NOSERVER && !presentation && V.Debugging.getPresentationSamples() !== null) {
        presentation = V.Debugging.getPresentationSamples()
      }
    }
    V.Debugging.log("\n\nSlideManager.init with presentation:\n");
    V.Debugging.log(JSON.stringify(presentation));
    V.Utils.init();
    presentation = V.Utils.fixPresentation(presentation);
    current_presentation = presentation;
    setPresentationType(presentation.type);
    V.Status.init(function() {
      _initAferStatusLoaded(options, presentation)
    })
  };
  var _initAferStatusLoaded = function(options, presentation) {
    V.Flashcard.init();
    V.VirtualTour.init();
    V.Quiz.initBeforeRender(presentation);
    V.Renderer.init();
    V.Slides.init();
    V.Utils.loadDeviceCSS();
    V.User.init(options);
    V.Storage.init();
    V.Recommendations.init(options);
    V.Events.init();
    V.EventsNotifier.init();
    V.VideoPlayer.init();
    V.Themes.loadTheme(presentation.theme);
    mySlides = presentation.slides;
    V.Presentation.init(mySlides);
    V.Quiz.init();
    if(options.addons) {
      V.Addons.init(options.addons)
    }
    V.ViewerAdapter.init(options);
    if(!V.Status.getIsEmbed()) {
      window.focus()
    }
  };
  var toggleFullScreen = function() {
    if(V.Status.isSlaveMode()) {
      return
    }
    if(V.Status.getIsInIframe()) {
      var myDoc = parent.document
    }else {
      var myDoc = document
    }
    if(V.Status.getIsInIframe()) {
      var myElem = V.Status.getIframe()
    }else {
      var myElem = myDoc.getElementById("presentation_iframe")
    }
    if(myDoc.fullScreenElement && myDoc.fullScreenElement !== null || !myDoc.mozFullScreen && !myDoc.webkitIsFullScreen) {
      if(myDoc.documentElement.requestFullScreen) {
        myElem.requestFullScreen()
      }else {
        if(myDoc.documentElement.mozRequestFullScreen) {
          myElem.mozRequestFullScreen()
        }else {
          if(myDoc.documentElement.webkitRequestFullScreen) {
            myElem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
          }
        }
      }
    }else {
      if(myDoc.cancelFullScreen) {
        myDoc.cancelFullScreen()
      }else {
        if(myDoc.mozCancelFullScreen) {
          myDoc.mozCancelFullScreen()
        }else {
          if(myDoc.webkitCancelFullScreen) {
            myDoc.webkitCancelFullScreen()
          }
        }
      }
    }
  };
  var addEnterLeaveEvents = function() {
    $("article").live("slideenter", _onslideenter);
    $("article").live("slideleave", _onslideleave)
  };
  var getStatus = function(slideid) {
    if(!slideStatus[slideid]) {
      slideStatus[slideid] = {id:slideid, poiFrameNumber:0, drawingPoi:0}
    }
    return slideStatus[slideid]
  };
  var updateStatus = function(slideid, newStatus) {
    slideStatus[slideid] = newStatus
  };
  var getOptions = function() {
    return initOptions
  };
  var _onslideenter = function(e) {
    var slide = e.target;
    var cSlideNumber = V.Slides.getCurrentSlideNumber();
    V.ViewerAdapter.decideIfPageSwitcher();
    setTimeout(function() {
      if(cSlideNumber !== V.Slides.getCurrentSlideNumber()) {
        return
      }
      if($(slide).hasClass("object")) {
        V.ObjectPlayer.loadObject($(slide))
      }
      if($(e.target).hasClass("snapshot")) {
        V.SnapshotPlayer.loadSnapshot($(slide))
      }
    }, 500);
    V.VideoPlayer.HTML5.playVideos(e.target);
    if($(e.target).hasClass("flashcard_slide")) {
      V.Flashcard.startAnimation(e.target.id)
    }else {
      if($(e.target).hasClass("virtualTour_slide")) {
        V.VirtualTour.loadMap(e.target.id)
      }
    }
    if(_isRecommendationMoment()) {
      V.Recommendations.generateFancybox()
    }
  };
  var _onslideleave = function(e) {
    var slide = e.target;
    if($(slide).hasClass("object")) {
      V.ObjectPlayer.unloadObject($(slide))
    }
    if($(slide).hasClass("snapshot")) {
      V.SnapshotPlayer.unloadSnapshot($(slide))
    }
    V.VideoPlayer.HTML5.stopVideos(slide);
    if($(e.target).hasClass("flashcard_slide")) {
      V.Flashcard.stopAnimation(e.target.id)
    }
  };
  var _isRecommendationMoment = function() {
    var number_of_slides = V.Slides.getSlides().length;
    var slide_number = V.Slides.getCurrentSlideNumber();
    if(number_of_slides === 1 || slide_number === number_of_slides - 1) {
      return true
    }else {
      return false
    }
  };
  var updateSlideCounter = function() {
    var number_of_slides = V.Slides.getSlides().length;
    var slide_number = V.Slides.getCurrentSlideNumber();
    if(number_of_slides === 0) {
      slide_number = 0
    }
    $("#slide-counter").html(slide_number + "/" + number_of_slides)
  };
  var getCurrentPresentation = function() {
    return current_presentation
  };
  var getPresentationType = function() {
    return presentationType
  };
  var setPresentationType = function(type) {
    if(!type) {
      type = V.Constant.STANDARD
    }
    presentationType = type
  };
  return{init:init, getStatus:getStatus, updateStatus:updateStatus, addEnterLeaveEvents:addEnterLeaveEvents, toggleFullScreen:toggleFullScreen, getOptions:getOptions, updateSlideCounter:updateSlideCounter, getCurrentPresentation:getCurrentPresentation, getPresentationType:getPresentationType, setPresentationType:setPresentationType}
}(VISH, jQuery);
VISH.Utils = function(V, undefined) {
  var ids;
  var domIds;
  var init = function() {
    if(!domIds) {
      domIds = new Array;
      ids = []
    }
  };
  var getOptions = function() {
    if(V.Editing) {
      return V.Editor.getOptions()
    }else {
      return V.SlideManager.getOptions()
    }
  };
  var getId = function(full_id_prefix, justCheck, separator) {
    if(!justCheck) {
      if(typeof full_id_prefix !== "string") {
        full_id_prefix = "unicID"
      }
      if(typeof separator !== "string") {
        separator = ""
      }
      if(typeof domIds[full_id_prefix] === "undefined") {
        domIds[full_id_prefix] = 0
      }
      domIds[full_id_prefix] = domIds[full_id_prefix] + 1;
      var full_id = full_id_prefix + separator + domIds[full_id_prefix]
    }else {
      var full_id = full_id_prefix;
      full_id_prefix = full_id_prefix.replace(full_id_prefix[full_id_prefix.length - 1], "")
    }
    if($("#" + full_id).length === 0 && ids.indexOf(full_id) === -1) {
      ids.push(full_id);
      return full_id
    }else {
      return getId(full_id_prefix, false, separator)
    }
  };
  var fixPresentation = function(presentation) {
    if(typeof presentation.type == "undefined") {
      presentation.type = V.Constant.STANDARD
    }
    if(typeof presentation.VEVersion == "undefined") {
      presentation.VEVersion = "0.1"
    }
    presentation = _fixIds(presentation);
    return presentation
  };
  var _fixIds = function(presentation) {
    var slides = presentation.slides;
    var sL = slides.length;
    for(var i = 0;i < sL;i++) {
      var slide = slides[i];
      if(!slide.id.match(/^article[0-9]+/g)) {
        slide.id = getId("article")
      }else {
        slide.id = getId(slide.id, true)
      }
      if(typeof slide.type == "undefined") {
        slide.type = V.Constant.STANDARD
      }
      switch(slide.type) {
        case V.Constant.STANDARD:
          slide = _fixIdsStandardSlide(slide);
          break;
        case V.Constant.FLASHCARD:
          slide = _fixIdsFlashcardSlide(slide);
          break;
        case V.Constant.VTOUR:
          slide = _fixIdsVTourSlide(slide);
          break;
        default:
          return
      }
    }
    return presentation
  };
  var _fixIdsStandardSlide = function(slide) {
    var elements = slide.elements;
    var eL = elements.length;
    for(var j = 0;j < eL;j++) {
      if(elements[j].id.match(new RegExp("^" + slide.id, "g")) === null) {
        elements[j].id = getId(slide.id + "_zone")
      }else {
        elements[j].id = getId(elements[j].id, true)
      }
    }
    return slide
  };
  var _fixIdsFlashcardSlide = function(slide) {
    return slide
  };
  var _fixIdsVTourSlide = function(slide) {
    var slides = slide.slides;
    if(slides) {
      var sL = slides.length;
      for(var i = 0;i < sL;i++) {
        if(typeof slides[i].type == "undefined") {
          slides[i].type = V.Constant.STANDARD
        }
      }
    }
    return slide
  };
  var getOuterHTML = function(tag) {
    if(typeof $(tag)[0].outerHTML == "undefined") {
      return $(tag).clone().wrap("<div></div>").parent().html()
    }else {
      return $(tag)[0].outerHTML
    }
  };
  var loadDeviceCSS = function() {
    if(V.Status.getDevice().desktop) {
      loadCSS("device/desktop.css")
    }else {
      if(V.Status.getDevice().mobile) {
        loadCSS("device/mobile.css")
      }else {
        if(V.Status.getDevice().tablet) {
          loadCSS("device/tablet.css")
        }
      }
    }
    switch(V.Status.getDevice().browser.name) {
      case V.Constant.FIREFOX:
        loadCSS("browser/firefox.css");
        break;
      case V.Constant.IE:
        loadCSS("browser/ie.css");
        break;
      case V.Constant.CHROME:
        loadCSS("browser/chrome.css");
        break
    }
  };
  var sendParentToURL = function(the_url) {
    window.top.location = the_url
  };
  var addParamToUrl = function(url, paramName, paramValue) {
    if(typeof url !== "string" || typeof paramName !== "string" || typeof paramValue !== "string") {
      return url
    }
    var splitHash = url.split("#");
    url = splitHash[0];
    var param = paramName + "=" + paramValue;
    if(url.indexOf("?") > -1) {
      url += "&" + param
    }else {
      url += "?" + param
    }
    if(splitHash.length > 1) {
      url = url + "#" + splitHash[1]
    }
    return url
  };
  var getParamsFromUrl = function(url) {
    var params = {};
    if(typeof url !== "string") {
      return params
    }
    var split = url.split("?");
    if(split.length <= 1) {
      return params
    }else {
      var urlParams = split[1].split("#")[0].split("&");
      for(var i = 0;i < urlParams.length;i++) {
        var resultSplit = urlParams[i].split("=");
        if(resultSplit.length === 2) {
          params[resultSplit[0]] = resultSplit[1]
        }
      }
      return params
    }
  };
  var loadCSS = function(path) {
    $("head").append('<link rel="stylesheet" href="' + V.StylesheetsPath + path + '" type="text/css" />')
  };
  var checkMiniumRequirements = function() {
    var browserRequirements = true;
    var device = V.Status.getDevice();
    switch(device.browser.name) {
      case V.Constant.IE:
        if(V.Editing) {
          if(device.browser.version < 9) {
            browserRequirements = false
          }
        }else {
          if(device.browser.version < 8) {
            browserRequirements = false
          }
        }
        break;
      case V.Constant.FIREFOX:
        break;
      case V.Constant.CHROME:
        break;
      default:
        break
    }
    if(!browserRequirements) {
      $.fancybox($("#requirements_form_wrapper").html(), {"autoDimensions":false, "width":650, "height":400, "showCloseButton":false, "padding":0, "onClosed":function() {
      }});
      return false
    }
    return true
  };
  var getSrcFromCSS = function(css) {
    if(css.indexOf("url") === 0) {
      return css.substring(4, css.length - 1)
    }else {
      return css
    }
  };
  var getZoomInStyle = function(zoom) {
    var style = "";
    style = style + "-ms-transform: scale(" + zoom + "); ";
    style = style + "-ms-transform-origin: 0 0; ";
    style = style + "-moz-transform: scale(" + zoom + "); ";
    style = style + "-moz-transform-origin: 0 0; ";
    style = style + "-o-transform: scale(" + zoom + "); ";
    style = style + "-o-transform-origin: 0 0; ";
    style = style + "-webkit-transform: scale(" + zoom + "); ";
    style = style + "-webkit-transform-origin: 0 0; ";
    return style
  };
  var getZoomFromStyle = function(style) {
    var zoom = 1;
    if(!style) {
      return zoom
    }
    var moz_zoom_pattern = /-moz-transform: ?scale\(([0-9]+.[0-9]+)\)/g;
    var webkit_zoom_pattern = /-webkit-transform: ?scale\(([0-9]+.[0-9]+)\)/g;
    var opera_zoom_pattern = /-o-transform: ?scale\(([0-9]+.[0-9]+)\)/g;
    var ie_zoom_pattern = /-ms-transform: ?scale\(([0-9]+.[0-9]+)\)/g;
    $.each(style.split(";"), function(index, property) {
      if(property.match(moz_zoom_pattern) != null) {
        var result = moz_zoom_pattern.exec(property);
        if(result !== null && result[1]) {
          zoom = parseFloat(result[1]);
          return false
        }
      }else {
        if(property.match(webkit_zoom_pattern) != null) {
          var result = webkit_zoom_pattern.exec(property);
          if(result !== null && result[1]) {
            zoom = parseFloat(result[1]);
            return false
          }
        }else {
          if(property.match(opera_zoom_pattern) != null) {
            var result = opera_zoom_pattern.exec(property);
            if(result !== null && result[1]) {
              zoom = parseFloat(result[1]);
              return false
            }
          }else {
            if(property.match(ie_zoom_pattern) != null) {
              var result = ie_zoom_pattern.exec(property);
              if(result !== null && result[1]) {
                zoom = parseFloat(result[1]);
                return false
              }
            }
          }
        }
      }
    });
    return zoom
  };
  var getWidthFromStyle = function(style, area) {
    return getPixelDimensionsFromStyle(style, area)[0]
  };
  var getHeightFromStyle = function(style, area) {
    return getPixelDimensionsFromStyle(style, area)[1]
  };
  var getPixelDimensionsFromStyle = function(style, area) {
    var dimensions = [];
    var width = null;
    var height = null;
    $.each(style.split(";"), function(index, property) {
      var width_percent_pattern = /width:\s?([0-9]+(\.[0-9]+)?)%/g;
      var width_px_pattern = /width:\s?([0-9]+(\.?[0-9]+)?)px/g;
      var height_percent_pattern = /height:\s?([0-9]+(\.[0-9]+)?)%/g;
      var height_px_pattern = /height:\s?([0-9]+(\.?[0-9]+)?)px/g;
      if(property.indexOf("width") !== -1) {
        if(property.match(width_px_pattern)) {
          var result = width_px_pattern.exec(property);
          if(result[1]) {
            width = result[1]
          }
        }else {
          if(property.match(width_percent_pattern)) {
            var result = width_percent_pattern.exec(property);
            if(result[1]) {
              var percent = result[1];
              if(area) {
                width = $(area).width() * percent / 100
              }
            }
          }
        }
      }else {
        if(property.indexOf("height") !== -1) {
          if(property.match(height_px_pattern)) {
            var result = height_px_pattern.exec(property);
            if(result[1]) {
              height = result[1]
            }
          }else {
            if(property.match(height_percent_pattern)) {
              var result = height_percent_pattern.exec(property);
              if(result[1]) {
                var percent = result[1];
                if(area) {
                  height = $(area).height() * percent / 100
                }
              }
            }
          }
        }
      }
    });
    dimensions.push(width);
    dimensions.push(height);
    return dimensions
  };
  var getFontSizeFromStyle = function(style) {
    if(!style) {
      return
    }
    var ft = null;
    $.each(style.split(";"), function(index, property) {
      var font_style_pattern = /font-size:\s?([0-9]+)px/g;
      if(property.match(font_style_pattern) != null) {
        var result = font_style_pattern.exec(property);
        if(result !== null && result[1] !== null) {
          ft = parseFloat(result[1]);
          return false
        }
      }
    });
    return ft
  };
  var addFontSizeToStyle = function(style, fontSize) {
    if(typeof style !== "string") {
      return null
    }
    var filterStyle = "";
    $.each(style.split(";"), function(index, property) {
      if(property.indexOf("font-size") === -1 && property !== "") {
        filterStyle = filterStyle + property + "; "
      }
    });
    if(fontSize) {
      filterStyle = filterStyle + "font-size:" + fontSize + ";"
    }
    return filterStyle
  };
  var removeFontSizeInStyle = function(style) {
    if(typeof style !== "string") {
      return null
    }
    var filterStyle = "";
    $.each(style.split(";"), function(index, property) {
      if(property.indexOf("font-size") === -1 && property !== "") {
        filterStyle = filterStyle + property + "; "
      }
    });
    return filterStyle
  };
  return{init:init, getOptions:getOptions, getId:getId, getOuterHTML:getOuterHTML, getSrcFromCSS:getSrcFromCSS, loadDeviceCSS:loadDeviceCSS, loadCSS:loadCSS, checkMiniumRequirements:checkMiniumRequirements, addFontSizeToStyle:addFontSizeToStyle, removeFontSizeInStyle:removeFontSizeInStyle, getFontSizeFromStyle:getFontSizeFromStyle, getZoomFromStyle:getZoomFromStyle, getZoomInStyle:getZoomInStyle, getWidthFromStyle:getWidthFromStyle, getHeightFromStyle:getHeightFromStyle, getPixelDimensionsFromStyle:getPixelDimensionsFromStyle, 
  sendParentToURL:sendParentToURL, addParamToUrl:addParamToUrl, getParamsFromUrl:getParamsFromUrl, fixPresentation:fixPresentation}
}(VISH);
VISH.Utils.Loader = function(V, undefined) {
  var _loadGoogleLibraryCallback = undefined;
  var libVideos = {};
  var libImages = {};
  var getImage = function(imagePath) {
    if(libImages[imagePath]) {
      return libImages[imagePath]
    }else {
      V.Debugging.log("Error, Image with path " + imagePath + " was not preloaded");
      return null
    }
  };
  var getVideo = function(videoPath) {
    if(libVideos[videoPath]) {
      return libVideos[videoPath]
    }else {
      V.Debugging.log("Error, Video with path " + videoPath + " was not preloaded");
      return null
    }
  };
  var loadImage = function(src) {
    var deferred, img;
    deferred = $.Deferred();
    img = new Image;
    img.onload = function() {
      deferred.resolve()
    };
    img.src = src;
    libImages[src] = img;
    return deferred.promise()
  };
  var loadVideo = function(videoSrc, videoId) {
    var deferred, v;
    deferred = $.Deferred();
    v = document.createElement("video");
    v.setAttribute("id", "video" + videoId);
    v.setAttribute("style", "display:none");
    v.setAttribute("preload", "auto");
    v.setAttribute("src", videoSrc);
    document.body.appendChild(v);
    v.addEventListener("loadedmetadata", function() {
      deferred.resolve()
    }, false);
    libVideos[videoSrc] = v;
    return deferred.promise()
  };
  var loadImagesOnCarrousel = function(imagesArray, callback, carrouselDivId, titleArray) {
    var imagesLength = imagesArray.length;
    var imagesLoaded = 0;
    $.each(imagesArray, function(i, image) {
      $(image).load(function(response) {
        if(titleArray && titleArray[imagesArray.indexOf(image)]) {
          $("#" + carrouselDivId).append("<div><p>" + titleArray[imagesArray.indexOf(image)] + "</p>" + V.Utils.getOuterHTML(image) + "</div>")
        }else {
          $("#" + carrouselDivId).append("<div>" + V.Utils.getOuterHTML(image) + "</div>")
        }
        imagesLoaded = imagesLoaded + 1;
        if(imagesLoaded == imagesLength) {
          callback()
        }
      });
      $(image).error(function(response) {
        imagesLoaded = imagesLoaded + 1;
        if(imagesLoaded == imagesLength) {
          callback()
        }
      })
    })
  };
  var loadImagesOnCarrouselOrder = function(imagesArray, callback, carrouselDivId, titleArray) {
    var validImagesArray = imagesArray;
    var imagesLength = imagesArray.length;
    var imagesLoaded = 0;
    $.each(imagesArray, function(i, image) {
      $(image).load(function(response) {
        imagesLoaded = imagesLoaded + 1;
        if(imagesLoaded == imagesLength) {
          _insertElementsWithOrder(validImagesArray, carrouselDivId, titleArray);
          callback()
        }
      });
      $(image).error(function(response) {
        imagesLoaded = imagesLoaded + 1;
        validImagesArray.splice(validImagesArray.indexOf(image), 1);
        if(imagesLoaded == imagesLength) {
          _insertElementsWithOrder(validImagesArray, carrouselDivId, titleArray);
          callback()
        }
      })
    })
  };
  var _insertElementsWithOrder = function(imagesArray, carrouselDivId, titleArray) {
    $.each(imagesArray, function(i, image) {
      if(titleArray && titleArray[imagesArray.indexOf(image)]) {
        var slideNumber = titleArray[imagesArray.indexOf(image)];
        var slideId = V.Slides.getSlideWithNumber(slideNumber).id;
        var poiId = "poi" + slideNumber;
        $("#" + carrouselDivId).append("<div><div class='draggable_arrow_div' slide_id='" + slideId + "' id='" + poiId + "'><img src='" + V.ImagesPath + "flashcard/flashcard_button.png'  class='fc_draggable_arrow'/><p class='draggable_number'>" + slideNumber + "</p></div><p slidenumber='" + slideNumber + "' action='goToSlide'>" + slideNumber + "</p>" + V.Utils.getOuterHTML(image) + "</div>")
      }else {
        $("#" + carrouselDivId).append("<div>" + V.Utils.getOuterHTML(image) + "</div>")
      }
    })
  };
  var loadScript = function(scriptSrc, callback) {
    if(typeof scriptSrc !== "string" || typeof callback !== "function") {
      return
    }
    var head = document.getElementsByTagName("head")[0];
    if(head) {
      var script = document.createElement("script");
      script.setAttribute("src", scriptSrc);
      script.setAttribute("type", "text/javascript");
      var loadFunction = function() {
        if(this.readyState == "complete" || this.readyState == "loaded") {
          callback()
        }
      };
      script.onreadystatechange = loadFunction;
      script.onload = callback;
      head.appendChild(script)
    }
  };
  var loadGoogleLibrary = function(scriptSrc, callback) {
    if(typeof callback === "function") {
      _loadGoogleLibraryCallback = callback
    }else {
      return
    }
    var fullScriptSrc = scriptSrc + "&callback=VISH.Utils.Loader.onGoogleLibraryLoaded";
    loadScript(fullScriptSrc, function() {
    })
  };
  var onGoogleLibraryLoaded = function() {
    if(typeof _loadGoogleLibraryCallback === "function") {
      _loadGoogleLibraryCallback()
    }
    _loadGoogleLibraryCallback = undefined
  };
  return{getImage:getImage, getVideo:getVideo, loadImage:loadImage, loadVideo:loadVideo, loadImagesOnCarrousel:loadImagesOnCarrousel, loadImagesOnCarrouselOrder:loadImagesOnCarrouselOrder, loadScript:loadScript, loadGoogleLibrary:loadGoogleLibrary, onGoogleLibraryLoaded:onGoogleLibraryLoaded}
}(VISH);
VISH.Status = function(V, $, undefined) {
  var _device;
  var _isInIframe;
  var _isAnotherDomain;
  var _isOnline;
  var _isSlave;
  var _isPreventDefault;
  var init = function(callback) {
    _checkIframe();
    _checkDomain();
    V.Status.Device.init(function(returnedDevice) {
      _device = returnedDevice;
      _checkOnline();
      if(typeof callback === "function") {
        callback()
      }
    })
  };
  var _checkIframe = function() {
    _isInIframe = window.location != window.parent.location ? true : false;
    return _isInIframe
  };
  var _checkDomain = function() {
    _isAnotherDomain = false;
    if(_checkIframe()) {
      var parent = window.parent;
      while(parent != window.top) {
        if(typeof parent.location.href === "undefined") {
          _isAnotherDomain = true;
          break
        }else {
          parent = parent.parent
        }
      }
      if(typeof window.top.location.href === "undefined") {
        _isAnotherDomain = true
      }
    }
    return _isAnotherDomain
  };
  var _checkOnline = function() {
    $.ajax({async:true, cache:false, error:function(req, status, ex) {
      V.Debugging.log("Error: " + ex);
      _isOnline = false
    }, success:function(data, status, req) {
      _isOnline = true
    }, timeout:5E3, type:"GET", url:V.ImagesPath + "blank.gif"})
  };
  var getDevice = function() {
    return _device
  };
  var getIsEmbed = function() {
    return _isAnotherDomain
  };
  var getIsInIframe = function() {
    return _isInIframe
  };
  var getIframe = function() {
    if(_isInIframe) {
      return window.frameElement
    }else {
      return null
    }
  };
  var isOnline = function() {
    return _isOnline
  };
  var isSlaveMode = function() {
    if(typeof _isSlave !== "undefined") {
      return _isSlave
    }else {
      return false
    }
  };
  var setSlaveMode = function(slaveMode) {
    if(slaveMode !== _isSlave) {
      if(slaveMode === true) {
        V.Events.unbindViewerEventListeners();
        V.VideoPlayer.HTML5.showControls(false);
        _isSlave = true
      }else {
        V.Events.bindViewerEventListeners();
        V.VideoPlayer.HTML5.showControls(true);
        _isSlave = false
      }
    }
  };
  var isPreventDefaultMode = function() {
    if(typeof _isPreventDefault !== "undefined") {
      return _isPreventDefault
    }else {
      return false
    }
  };
  var setPreventDefaultMode = function(preventDefault) {
    if(preventDefault !== _isPreventDefault) {
      if(preventDefault === true) {
        _isPreventDefault = true
      }else {
        _isPreventDefault = false
      }
    }
  };
  return{init:init, getDevice:getDevice, getIsEmbed:getIsEmbed, getIsInIframe:getIsInIframe, getIframe:getIframe, isOnline:isOnline, isSlaveMode:isSlaveMode, setSlaveMode:setSlaveMode, isPreventDefaultMode:isPreventDefaultMode, setPreventDefaultMode:setPreventDefaultMode}
}(VISH, jQuery);
VISH.Status.Device = function(V, $, undefined) {
  var init = function(callback) {
    V.Status.Device.Browser.init();
    V.Status.Device.Features.init();
    _fillDevice(callback)
  };
  var _fillDevice = function(callback) {
    var storedDevice = V.Storage.get(V.Constant.Storage.Device);
    if(typeof storedDevice !== "undefined") {
      device = storedDevice;
      _loadViewportForDevice(device, function() {
        _fillScreen(device);
        if(typeof callback === "function") {
          callback(device)
        }
      });
      return
    }
    var device = {};
    device.browser = {};
    device.features = {};
    device.browser = V.Status.Device.Browser.fillBrowser();
    _fillUserAgentBeforeViewport(device);
    _loadViewportForDevice(device, function() {
      _fillUserAgentAfterViewport(device);
      _fillScreen(device);
      device.features = V.Status.Device.Features.fillFeatures();
      V.Storage.add(V.Constant.Storage.Device, device, false);
      if(device.android && device.browser.name === V.Constant.ANDROID_BROWSER) {
        if(device.hasTestingViewport === true) {
          _reloadOnAndroidTestingViewport(callback, device);
          return
        }
      }
      if(typeof callback === "function") {
        callback(device)
      }
    })
  };
  var _reloadOnAndroidTestingViewport = function(callback, device) {
    var attempts = 0;
    var maxAttempts = 3;
    var initialDevice = V.Storage.get(V.Constant.Storage.Device);
    if(typeof storedDevice !== "undefined") {
      location.reload(true);
      return
    }
    var waitTimer = setInterval(function() {
      var storedDevice = V.Storage.get(V.Constant.Storage.Device);
      if(typeof storedDevice !== "undefined") {
        clearInterval(waitTimer);
        location.reload(true)
      }else {
        attempts++;
        if(attempts >= maxAttempts) {
          clearInterval(waitTimer);
          callback(device)
        }
      }
    }, 1E3)
  };
  var _fillUserAgentBeforeViewport = function(device) {
    device.pixelRatio = window.devicePixelRatio || 1;
    device.iPhone = /iPhone/i.test(navigator.userAgent);
    device.iPhone4 = device.iPhone && device.pixelRatio == 2;
    device.iPad = /iPad/i.test(navigator.userAgent);
    device.iOS = device.iPhone || device.iPad;
    device.applePhone = device.iPhone || device.iPhone4;
    device.appleTablet = device.iPad;
    device.android = /android/i.test(navigator.userAgent)
  };
  var _loadViewportForDevice = function(device, callback) {
    if(device.iOS && device.browser.name === V.Constant.SAFARI) {
      _setViewportForIphone(callback)
    }else {
      if(device.android) {
        if(device.browser.name === V.Constant.CHROME) {
          _setViewportForChromeForAndroid(callback)
        }else {
          if(device.browser.name === V.Constant.ANDROID_BROWSER) {
            if(typeof device.desktop === "undefined") {
              device.hasTestingViewport = true;
              _setTestingViewportForAndroidBrowser(callback)
            }else {
              _setViewportForAndroidBrowser(callback)
            }
          }
        }
      }else {
        if(typeof callback === "function") {
          callback()
        }
      }
    }
  };
  var WAITING_TIME_FOR_VIEWPORT_LOAD = 1250;
  var _setViewport = function(viewportContent, callback) {
    var viewport = $("head>meta[name='viewport']");
    if(viewport.length === 0) {
      $("head").prepend('<meta name="viewport" content="' + viewportContent + '"/>')
    }else {
      $(viewport).attr("content", viewportContent)
    }
    setTimeout(function() {
      if(typeof callback === "function") {
        callback()
      }
    }, WAITING_TIME_FOR_VIEWPORT_LOAD)
  };
  var _setViewportForAndroidBrowser = function(callback) {
    _setViewport("user-scalable=yes", callback)
  };
  var _setTestingViewportForAndroidBrowser = function(callback) {
    _setViewport("width=device-width,height=device-height,user-scalable=yes", callback)
  };
  var _setViewportForChromeForAndroid = function(callback) {
    _setViewport("width=device-width,height=device-height,user-scalable=yes", callback)
  };
  var _setViewportForIphone = function(callback) {
    _setViewport("user-scalable=yes", callback)
  };
  var _fillUserAgentAfterViewport = function(device) {
    device.androidPhone = false;
    device.androidTablet = false;
    if(device.android) {
      if(/tablet/i.test(navigator.userAgent)) {
        device.androidTablet = true
      }else {
        var maxWidth = 960 * device.pixelRatio;
        var maxHeight = 720 * device.pixelRatio;
        var landscape = window.screen.availWidth > window.screen.availHeight;
        if(landscape) {
          if(window.screen.availWidth >= maxWidth && window.screen.availHeight >= maxHeight) {
            device.androidTablet = true
          }else {
            device.androidPhone = true
          }
        }else {
          if(window.screen.availWidth >= maxHeight && window.screen.availHeight >= maxWidth) {
            device.androidTablet = true
          }else {
            device.androidPhone = true
          }
        }
      }
    }
    device.mobile = device.applePhone || device.androidPhone;
    device.tablet = device.appleTablet || device.androidTablet;
    if(!device.mobile && !device.tablet) {
      device.desktop = true
    }else {
      device.desktop = false
    }
  };
  var _fillScreen = function(device) {
    device.viewport = {width:window.innerWidth, height:window.innerHeight};
    device.screen = {rWidth:window.screen.availWidth * device.pixelRatio, rHeight:window.screen.availHeight * device.pixelRatio, width:window.screen.availWidth, height:window.screen.availHeight}
  };
  return{init:init}
}(VISH, jQuery);
VISH.Status.Device.Browser = function(V, $, undefined) {
  var init = function() {
  };
  var fillBrowser = function() {
    var browser = {};
    var version;
    var android;
    version = _getInternetExplorerVersion();
    if(version != -1) {
      browser.name = V.Constant.IE;
      browser.version = version;
      return browser
    }
    version = _getFirefoxVersion();
    if(version != -1) {
      browser.name = V.Constant.FIREFOX;
      browser.version = version;
      return browser
    }
    version = _getGoogleChromeVersion();
    if(version != -1) {
      browser.name = V.Constant.CHROME;
      browser.version = version;
      return browser
    }
    android = /android/i.test(navigator.userAgent);
    version = _getSafariVersion();
    if(version != -1) {
      if(android) {
        browser.name = V.Constant.ANDROID_BROWSER
      }else {
        browser.name = V.Constant.SAFARI
      }
      browser.version = version;
      return browser
    }
    browser.name = V.Constant.UNKNOWN;
    browser.version = -1;
    if(android) {
      browser.name = V.Constant.ANDROID_BROWSER
    }
    return browser
  };
  var _getInternetExplorerVersion = function() {
    var rv = -1;
    if(navigator.appName === V.Constant.UA_IE) {
      var ua = navigator.userAgent;
      var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
      if(re.exec(ua) != null) {
        rv = parseFloat(RegExp.$1)
      }
    }
    return rv
  };
  var _getFirefoxVersion = function() {
    var rv = -1;
    if(navigator.appName === V.Constant.UA_NETSCAPE) {
      var ua = navigator.userAgent;
      var re = new RegExp(".* Firefox/([0-9.]+)");
      if(re.exec(ua) != null) {
        rv = parseFloat(RegExp.$1)
      }
    }
    return rv
  };
  var _getGoogleChromeVersion = function() {
    var rv = -1;
    if(navigator.appName === V.Constant.UA_NETSCAPE) {
      var ua = navigator.userAgent;
      var re = new RegExp(".* Chrome/([0-9.]+)");
      if(re.exec(ua) != null) {
        rv = parseFloat(RegExp.$1)
      }
    }
    return rv
  };
  var _getSafariVersion = function() {
    var rv = -1;
    if(navigator.appName === V.Constant.UA_NETSCAPE) {
      var ua = navigator.userAgent;
      if(ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1 && ua.indexOf("crmo") == -1) {
        var rv = -2;
        var re = new RegExp(".* Version/([0-9.]+)");
        if(re.exec(ua) != null) {
          rv = parseFloat(RegExp.$1)
        }
      }
    }
    return rv
  };
  return{init:init, fillBrowser:fillBrowser}
}(VISH, jQuery);
VISH.Status.Device.Features = function(V, $, undefined) {
  var init = function() {
  };
  var fillFeatures = function() {
    var features = {};
    var elem = document.getElementById("page-fullscreen");
    if(elem && (elem.requestFullScreen || elem.mozRequestFullScreen || elem.webkitRequestFullScreen)) {
      features.fullscreen = true
    }else {
      features.fullscreen = false
    }
    features.touchScreen = !!("ontouchstart" in window);
    features.localStorage = V.Storage.checkLocalStorageSupport();
    features.history = typeof history === "object" && typeof history.back === "function" && typeof history.go === "function";
    return features
  };
  return{init:init, fillFeatures:fillFeatures}
}(VISH, jQuery);
VISH.ViewerAdapter = function(V, $, undefined) {
  var render_full;
  var is_preview;
  var is_preview_insertMode;
  var close_button;
  var fs_button;
  var can_use_nativeFs;
  var embed;
  var display_recommendations;
  var showViewbar;
  var enter_fs_button;
  var enter_fs_url;
  var exit_fs_button;
  var exit_fs_url;
  var page_is_fullscreen;
  var initialized = false;
  var _lastWidth;
  var _lastHeight;
  var init = function(options) {
    if(initialized) {
      return
    }else {
      _lastWidth = -1;
      _lastHeight = -1;
      initialized = true
    }
    embed = V.Status.getIsEmbed();
    showViewbar = _defaultViewbar();
    if(options) {
      if(typeof render_full !== "boolean") {
        render_full = options["full"] === true && !V.Status.getIsInIframe() || options["forcefull"] === true
      }
      if(typeof options["preview"] === "boolean") {
        is_preview = options["preview"]
      }
      close_button = V.Status.getDevice().mobile && !V.Status.getIsInIframe() && options["comeBackUrl"];
      can_use_nativeFs = V.Status.getDevice().features.fullscreen;
      enter_fs_button = typeof options["fullscreen"] !== "undefined" && !can_use_nativeFs;
      if(enter_fs_button) {
        enter_fs_url = options["fullscreen"]
      }
      exit_fs_button = typeof options["exitFullscreen"] !== "undefined" && !can_use_nativeFs;
      if(exit_fs_button) {
        exit_fs_url = options["exitFullscreen"]
      }
      fs_button = can_use_nativeFs && V.Status.getIsInIframe() || enter_fs_button && exit_fs_button;
      fs_button = fs_button && !is_preview;
      fs_button = fs_button && !embed;
      page_is_fullscreen = render_full && !V.Status.getIsInIframe();
      if(typeof options["urlToGetRecommendations"] == "string") {
        display_recommendations = true
      }else {
        display_recommendations = false
      }
    }else {
      render_full = false;
      is_preview = false;
      close_button = false;
      enter_fs_button = false;
      exit_fs_button = false;
      fs_button = false;
      can_use_nativeFs = false;
      display_recommendations = false
    }
    is_preview_insertMode = false;
    if(is_preview) {
      var presentation = V.SlideManager.getCurrentPresentation();
      if(presentation.insertMode === true) {
        is_preview_insertMode = true
      }
    }
    if(V.Status.getDevice().mobile) {
      render_full = true;
      page_is_fullscreen = render_full && !V.Status.getIsInIframe();
      if(page_is_fullscreen) {
        fs_button = false;
        showViewbar = false
      }else {
        close_button = false
      }
    }
    if(V.Status.getDevice().desktop) {
      $("#back_arrow").html("");
      $("#forward_arrow").html("")
    }
    if(showViewbar) {
      V.SlideManager.updateSlideCounter();
      $("#viewbar").show()
    }else {
      $("#viewbar").hide()
    }
    if(is_preview) {
      $("div#viewerpreview").show()
    }
    if(is_preview_insertMode) {
      $("#selectSlidesBar").show();
      $("#viewbar").css("bottom", $("#selectSlidesBar").height() + "px");
      $("#viewbar").css("border-bottom", "none");
      V.SlidesSelector.init()
    }
    if(embed) {
      if(options && typeof options.watermarkURL == "string") {
        $("#embedWatermark").parent().attr("href", options.watermarkURL)
      }
      $("#embedWatermark").show()
    }
    if(close_button) {
      $("button#closeButton").show()
    }
    if(fs_button) {
      _enableFullScreen(page_is_fullscreen);
      $("#page-fullscreen").show()
    }else {
      $("#page-fullscreen").hide()
    }
    updateInterface();
    V.Text.init()
  };
  var decideIfPageSwitcher = function() {
    if(V.Slides.getCurrentSubSlide() !== null) {
      $("#forward_arrow").hide();
      $("#back_arrow").hide()
    }else {
      if(V.Slides.isCurrentFirstSlide()) {
        $("#back_arrow").hide()
      }else {
        $("#back_arrow").show()
      }
      $("#forward_arrow").show()
    }
    if(V.Slides.isCurrentFirstSlide()) {
      $("#page-switcher-start").addClass("disabledarrow")
    }else {
      $("#page-switcher-start").removeClass("disabledarrow")
    }
    $("#page-switcher-end").show()
  };
  var _decideIfViewBarShow = function(fullScreen) {
    if(showViewbar) {
      $("#viewbar").show()
    }else {
      $("#viewbar").hide()
    }
  };
  var _defaultViewbar = function() {
    var presentationType = V.SlideManager.getPresentationType();
    var slidesQuantity = V.Slides.getSlidesQuantity();
    if(presentationType === V.Constant.QUIZ_SIMPLE && slidesQuantity === 1) {
      return false
    }else {
      return true
    }
  };
  var updateInterface = function() {
    var cWidth = $(window).width();
    var cHeight = $(window).height();
    if(cWidth === _lastWidth && cHeight === _lastHeight) {
      return
    }
    _lastWidth = cWidth;
    _lastHeight = cHeight;
    _setupSize(render_full)
  };
  var _setupSize = function(fullscreen) {
    var reserved_px_for_menubar = 40;
    var margin_height = 40;
    var margin_width = 30;
    if(!showViewbar) {
      reserved_px_for_menubar = 0;
      margin_height = 0;
      margin_width = 0
    }else {
      if(is_preview_insertMode) {
        reserved_px_for_menubar = 120
      }
    }
    if(fullscreen) {
      _onFullscreenEvent(true)
    }else {
      _onFullscreenEvent(false)
    }
    var height = _lastHeight - reserved_px_for_menubar;
    var width = _lastWidth;
    var finalW = 800;
    var finalH = 600;
    var aspectRatio = width / height;
    var slidesRatio = 4 / 3;
    if(aspectRatio > slidesRatio) {
      finalH = height - margin_height;
      finalW = finalH * slidesRatio
    }else {
      finalW = width - margin_width;
      finalH = finalW / slidesRatio
    }
    $(".slides > article").css("height", finalH);
    $(".slides > article").css("width", finalW);
    $(".subslide").css("height", finalH);
    $(".subslide").css("width", finalW);
    var marginTop = finalH / 2 + reserved_px_for_menubar / 2;
    var marginLeft = finalW / 2;
    $(".slides > article").css("margin-top", "-" + marginTop + "px");
    $(".slides > article").css("margin-left", "-" + marginLeft + "px");
    $(".subslide").css("margin-top", "-" + finalH / 2 + "px");
    $(".subslide").css("margin-left", "-" + marginLeft + "px");
    var increase = finalH / 600;
    var increaseW = finalW / 800;
    $(".fc_poi img").css("width", 50 * increase + "px");
    $(".fc_poi img").css("height", 50 * increase + "px");
    decideIfPageSwitcher();
    V.Text.aftersetupSize(increase, increaseW);
    V.SnapshotPlayer.aftersetupSize(increase, increaseW);
    V.ObjectPlayer.aftersetupSize(increase, increaseW);
    V.VirtualTour.aftersetupSize(increase, increaseW);
    V.Quiz.aftersetupSize(increase, increaseW);
    _updateFancyboxAfterSetupSize()
  };
  var _updateFancyboxAfterSetupSize = function() {
    if($("#fancybox-content:empty").length === 0) {
      $("#fancybox-wrap").width($(".current").width() + 100);
      $("#fancybox-wrap").height($(".current").height() + 70);
      $("#fancybox-wrap").css("top", $(".current").offset().top + "px");
      $("#fancybox-wrap").css("left", $(".current").offset().left + "px");
      setTimeout(function() {
        $("#fancybox-content").width("100%");
        $("#fancybox-content").height("100%");
        $("#fancybox-content > div").width("100%");
        $("#fancybox-content > div").height("100%")
      }, 300)
    }
  };
  var _enableFullScreen = function(fullscreen) {
    if(can_use_nativeFs) {
      if(V.Status.getIsInIframe()) {
        var myDoc = parent.document
      }else {
        var myDoc = document
      }
      $(document).on("click", "#page-fullscreen", V.SlideManager.toggleFullScreen);
      $(myDoc).on("webkitfullscreenchange mozfullscreenchange fullscreenchange", function(event) {
        setTimeout(function() {
          page_is_fullscreen = !page_is_fullscreen;
          render_full = page_is_fullscreen;
          _setupSize(page_is_fullscreen)
        }, 400)
      })
    }else {
      if(fullscreen && exit_fs_button) {
        $("#page-fullscreen").css("background-image", 'url("' + V.ImagesPath + 'icons/fullscreen.png")');
        $("#page-fullscreen").css("background-position", "0px 0px");
        $(document).on("click", "#page-fullscreen", function() {
          if(exit_fs_url && !embed) {
            window.location = exit_fs_url
          }else {
            if(V.Status.getDevice().features.history) {
              history.back()
            }
          }
        })
      }else {
        if(!fullscreen && enter_fs_button) {
          $(document).on("click", "#page-fullscreen", function() {
            if(typeof window.parent.location.href !== "undefined") {
              V.Utils.sendParentToURL(enter_fs_url + "?orgUrl=" + window.parent.location.href)
            }else {
              V.Utils.sendParentToURL(enter_fs_url + "?embed=true")
            }
          })
        }
      }
    }
  };
  var _onFullscreenEvent = function(fullscreen) {
    if(typeof fullscreen === "undefined") {
      fullscreen = page_is_fullscreen
    }
    if(fullscreen) {
      _onEnterFullScreen()
    }else {
      _onLeaveFullScreen()
    }
  };
  var _onEnterFullScreen = function() {
    $("#page-fullscreen").css("background-image", 'url("' + V.ImagesPath + 'icons/fullscreenback.png")');
    $("#page-fullscreen").css("background-position", "0px 0px");
    $("#page-fullscreen").hover(function() {
      $("#page-fullscreen").css("background-position", "-30px -40px")
    }, function() {
      $("#page-fullscreen").css("background-position", "0px 0px")
    });
    _decideIfViewBarShow(true)
  };
  var _onLeaveFullScreen = function() {
    $("#page-fullscreen").css("background-image", 'url("' + V.ImagesPath + 'icons/fullscreen.png")');
    $("#page-fullscreen").css("background-position", "0px 0px");
    $("#page-fullscreen").hover(function() {
      $("#page-fullscreen").css("background-position", "-40px -40px")
    }, function() {
      $("#page-fullscreen").css("background-position", "0px 0px")
    });
    _decideIfViewBarShow(false)
  };
  var isFullScreen = function() {
    return page_is_fullscreen
  };
  var decideIfCloseButton = function() {
    if(close_button) {
      $("#closeButton").show()
    }
  };
  return{init:init, updateInterface:updateInterface, isFullScreen:isFullScreen, decideIfPageSwitcher:decideIfPageSwitcher, decideIfCloseButton:decideIfCloseButton}
}(VISH, jQuery);
VISH.Game = function(V, $, undefined) {
  var actions = {};
  var registerActions = function(presentation) {
    actions = presentation.game.actions
  };
  var raiseAction = function(action_name) {
    if(actions[action_name]) {
      V.Debugging.log("show slide " + actions[action_name].slide_id)
    }
  };
  return{raiseAction:raiseAction, registerActions:registerActions}
}(VISH, jQuery);
VISH.Flashcard = function(V, $, undefined) {
  var flashcards;
  var pois;
  var FPS = 25;
  var TOTAL_FRAMES = 20;
  var FRAME_WIDTH = 50;
  var init = function(presentation) {
    if(!flashcards) {
      flashcards = new Array;
      pois = new Array
    }
  };
  var startAnimation = function(slideId) {
    if(typeof flashcards !== "undefined" && typeof flashcards[slideId] !== "undefined" && typeof flashcards[slideId].timer == "undefined") {
      flashcards[slideId].timer = setInterval(function() {
        animateArrows(slideId)
      }, 1E3 / FPS)
    }
  };
  var stopAnimation = function(slideId) {
    if(typeof flashcards !== "undefined" && typeof flashcards[slideId] !== "undefined" && typeof flashcards[slideId].timer !== "undefined") {
      clearTimeout(flashcards[slideId].timer);
      flashcards[slideId].timer = undefined
    }
  };
  var addArrow = function(fcId, poi, sync) {
    var flashcard_div = $("#" + fcId);
    var div_to_add = "<div class='fc_poi' id='" + poi.id + "' style='position:absolute;left:" + poi.x + "%;top:" + poi.y + "%'></div>";
    flashcard_div.append(div_to_add);
    if(typeof flashcards[fcId] === "undefined") {
      flashcards[fcId] = new Object;
      flashcards[fcId].arrows = []
    }
    var arrow = new Object;
    arrow.id = poi.id;
    if(sync) {
      arrow.position = 0
    }else {
      var rand_pos = Math.floor(Math.random() * TOTAL_FRAMES + 1) * FRAME_WIDTH;
      arrow.position = rand_pos
    }
    arrow.slide_id = poi.slide_id;
    flashcards[fcId].arrows.push(arrow);
    pois[arrow.id] = arrow
  };
  var animateArrows = function(slideId) {
    if(!slideId || typeof flashcards[slideId] === "undefined") {
      return
    }
    $(flashcards[slideId].arrows).each(function(index, value) {
      var new_pos = (value.position + FRAME_WIDTH) % (TOTAL_FRAMES * FRAME_WIDTH);
      var arrow_dom_el = $("#" + value.id);
      $(arrow_dom_el).css("background-position", new_pos + "px" + " 0px");
      flashcards[slideId].arrows[index].position = new_pos
    })
  };
  var getPoiData = function(poiId) {
    if(typeof pois !== "undefined" && typeof pois[poiId] !== "undefined") {
      return pois[poiId]
    }
    return null
  };
  return{init:init, addArrow:addArrow, startAnimation:startAnimation, stopAnimation:stopAnimation, animateArrows:animateArrows, getPoiData:getPoiData}
}(VISH, jQuery);
VISH.VirtualTour = function(V, $, undefined) {
  var virtualTours;
  var gMlLoaded = false;
  var gMlLoading = false;
  var lastIncrease;
  var _loadQueue;
  var init = function(presentation) {
    virtualTours = new Array;
    _loadQueue = []
  };
  var drawMap = function(vt) {
    if(!gMlLoaded) {
      if(gMlLoading) {
        setTimeout(function() {
          drawMap(vt)
        }, 1E3);
        return
      }
      gMlLoading = true;
      V.Utils.Loader.loadGoogleLibrary("https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&libraries=places", function() {
        gMlLoaded = true;
        gMlLoading = false;
        drawMap(vt)
      });
      return
    }
    if(vt.type !== V.Constant.VTOUR) {
      return
    }
    if(typeof virtualTours[vt.id] != "undefined") {
      return
    }
    var canvas_id = V.Utils.getId(vt.id + "_canvas");
    var canvas = $("<div id='" + canvas_id + "' class='map_canvas' style='height:" + "100%" + "; width:" + "100%" + "'></div>");
    $("#" + vt.id).append(canvas);
    var latlng = new google.maps.LatLng(vt.center.lat, vt.center.lng);
    if(typeof virtualTours[vt.id] == "undefined") {
      virtualTours[vt.id] = new Object;
      virtualTours[vt.id].id = vt.id;
      virtualTours[vt.id].canvasId = canvas_id;
      virtualTours[vt.id].center = latlng;
      virtualTours[vt.id].zoom = parseInt(vt.zoom);
      virtualTours[vt.id].mapType = vt.mapType;
      virtualTours[vt.id].pois = new Array;
      virtualTours[vt.id].orgPois = vt.pois;
      virtualTours[vt.id].paths = []
    }
    var lqL = _loadQueue.length;
    for(var i = 0;i < lqL;i++) {
      if(_loadQueue[i] === vt.id) {
        loadMap(vt.id);
        _loadQueue.splice(_loadQueue.indexOf(vt.id), 1)
      }
    }
  };
  var loadMap = function(vtId) {
    var vt = virtualTours[vtId];
    if(typeof vt == "undefined") {
      _loadQueue.push(vtId);
      return
    }
    if(typeof vt.map != "undefined") {
      return
    }
    $("#" + vt.id).addClass("temp_shown");
    var canvasId = vt.canvasId;
    var myOptions = {zoom:vt.zoom, center:vt.center, mapTypeId:vt.mapType};
    var map = new google.maps.Map(document.getElementById(canvasId), myOptions);
    vt.map = map;
    $(vt.orgPois).each(function(index, poi) {
      vt.pois[poi.id] = poi;
      _addMarkerToCoordinates(vt, poi.lat, poi.lng, poi.id)
    });
    google.maps.event.addListenerOnce(map, "tilesloaded", function() {
      $("#" + vt.id).removeClass("temp_shown");
      google.maps.event.addListenerOnce(map, "tilesloaded", function() {
      })
    });
    google.maps.event.addDomListener(map, "idle", function() {
    });
    google.maps.event.addDomListener(window, "resize", function() {
    })
  };
  var _addMarkerToCoordinates = function(vt, lat, lng, poi_id) {
    return _addMarkerToPosition(vt, new google.maps.LatLng(lat, lng), poi_id)
  };
  var _addMarkerToPosition = function(vt, myLatlng, poi_id) {
    var marker = new google.maps.Marker({position:myLatlng, map:virtualTours[vt.id].map, draggable:false, poi_id:poi_id, title:"(" + myLatlng.lat().toFixed(3) + "," + myLatlng.lng().toFixed(3) + ")"});
    google.maps.event.addListener(marker, "click", function(event) {
      var poi = _getPoi(vt, marker.poi_id);
      V.Slides.openSubslide(poi.slide_id, true)
    });
    return marker
  };
  var _getPoi = function(vt, poiId) {
    if(typeof virtualTours[vt.id] !== "undefined" && typeof virtualTours[vt.id].pois[poiId] !== "undefined") {
      return virtualTours[vt.id].pois[poiId]
    }
  };
  var aftersetupSize = function(increase) {
  };
  var _getZoomForIncreaseDiff = function(zoom, increaseDiff) {
    var absIncreaseDiff = Math.floor(Math.abs(increaseDiff) / 0.3);
    if(increaseDiff > 0) {
      var newZoom = zoom + absIncreaseDiff
    }else {
      var newZoom = zoom - absIncreaseDiff
    }
    return Math.max(Math.min(newZoom, 20), 1)
  };
  var getVirtualTours = function() {
    return virtualTours
  };
  return{init:init, drawMap:drawMap, loadMap:loadMap, aftersetupSize:aftersetupSize, getVirtualTours:getVirtualTours}
}(VISH, jQuery);
VISH.Themes = function(V, $, undefined) {
  var loadTheme = function(theme) {
    if(!theme) {
      theme = V.Constant.Themes.Default
    }
    _unloadAllThemes();
    V.Utils.loadCSS("themes/" + theme + ".css")
  };
  var _unloadAllThemes = function() {
    var theme_pattern = "(^" + V.StylesheetsPath + "themes/)";
    $("head").find("link[type='text/css']").each(function(index, link) {
      var href = $(link).attr("href");
      if(href) {
        if(href.match(theme_pattern) !== null) {
          $(link).remove()
        }
      }
    })
  };
  return{loadTheme:loadTheme}
}(VISH, jQuery);
VISH.Messenger = function(V, undefined) {
  var init = function() {
    V.EventsNotifier.registerCallback(V.Constant.Event.onGoToSlide, function(params) {
      notifyEventByMessage(V.Constant.Event.onGoToSlide, params)
    });
    V.EventsNotifier.registerCallback(V.Constant.Event.onPlayVideo, function(params) {
      notifyEventByMessage(V.Constant.Event.onPlayVideo, params)
    });
    V.EventsNotifier.registerCallback(V.Constant.Event.onPauseVideo, function(params) {
      notifyEventByMessage(V.Constant.Event.onPauseVideo, params)
    });
    V.EventsNotifier.registerCallback(V.Constant.Event.onSeekVideo, function(params) {
      notifyEventByMessage(V.Constant.Event.onSeekVideo, params)
    });
    V.EventsNotifier.registerCallback(V.Constant.Event.onFlashcardPointClicked, function(params) {
      notifyEventByMessage(V.Constant.Event.onFlashcardPointClicked, params)
    });
    V.EventsNotifier.registerCallback(V.Constant.Event.onFlashcardSlideClosed, function(params) {
      notifyEventByMessage(V.Constant.Event.onFlashcardSlideClosed, params)
    })
  };
  var notifyEventByMessage = function(event, params) {
    if(params.triggeredByUser === false) {
      return
    }
    var VEMessage = V.Messenger.Helper.createMessage(event, params);
    V.EventsNotifier.notifyEvent(V.Constant.Event.onMessage, VEMessage, true)
  };
  return{init:init, notifyEventByMessage:notifyEventByMessage}
}(VISH);
VISH.Messenger.Helper = function(V, undefined) {
  function message(VEevent, params, origin, destination) {
    this.vishEditor = true;
    this.VEevent = VEevent;
    if(params) {
      this.params = params
    }
    if(origin) {
      this.origin = origin
    }else {
      this.origin = "?"
    }
    if(destination) {
      this.destination = destination
    }else {
      this.destination = "*"
    }
  }
  var createMessage = function(VEevent, params, origin, destination) {
    if(!origin) {
      if(V.Status.getIsInIframe()) {
        origin = V.Status.getIframe().id
      }
    }
    var VEMessage = new message(VEevent, params, origin, destination);
    return JSON.stringify(VEMessage)
  };
  var validateVEMessage = function(VEMessage, params) {
    if(typeof VEMessage !== "string") {
      return false
    }
    try {
      var VEMessageObject = JSON.parse(VEMessage);
      if(typeof VEMessageObject !== "object") {
        return false
      }
      if(VEMessageObject.vishEditor !== true) {
        return false
      }
      if(!VEMessageObject.VEevent) {
        return false
      }
      if(V.Status.getIsInIframe() && params && params.allowSelfMessages === false) {
        if(VEMessageObject.origin === V.Status.getIframe().id) {
          return false
        }
      }
    }catch(e) {
      return false
    }
    return true
  };
  var processVEMessage = function(VEMessage) {
    var VEMessageObject = JSON.parse(VEMessage);
    switch(VEMessageObject.VEevent) {
      case V.Constant.Event.onGoToSlide:
        if(VEMessageObject.params && VEMessageObject.params.slideNumber) {
          V.Slides.goToSlide(VEMessageObject.params.slideNumber, false)
        }
        break;
      case V.Constant.Event.onPlayVideo:
        if(VEMessageObject.params && VEMessageObject.params.videoId) {
          if(VEMessageObject.params.slideNumber && V.Slides.getCurrentSlideNumber() != VEMessageObject.params.slideNumber) {
            V.Slides.goToSlide(VEMessageObject.params.slideNumber, false)
          }
          V.VideoPlayer.playVideo(VEMessageObject.params.videoId, VEMessageObject.params.currentTime, false)
        }
        break;
      case V.Constant.Event.onPauseVideo:
        if(VEMessageObject.params && VEMessageObject.params.videoId) {
          if(VEMessageObject.params.slideNumber && V.Slides.getCurrentSlideNumber() != VEMessageObject.params.slideNumber) {
            V.Slides.goToSlide(VEMessageObject.params.slideNumber, false)
          }
          V.VideoPlayer.pauseVideo(VEMessageObject.params.videoId, VEMessageObject.params.currentTime, false)
        }
        break;
      case V.Constant.Event.onSeekVideo:
        if(VEMessageObject.params && VEMessageObject.params.videoId) {
          if(VEMessageObject.params.slideNumber && V.Slides.getCurrentSlideNumber() != VEMessageObject.params.slideNumber) {
            V.Slides.goToSlide(VEMessageObject.params.slideNumber, false)
          }
          V.VideoPlayer.seekVideo(VEMessageObject.params.videoId, VEMessageObject.params.currentTime, false)
        }
        break;
      case V.Constant.Event.onFlashcardPointClicked:
        if(VEMessageObject.params && VEMessageObject.params.slideNumber) {
          V.Slides.openSubslide(VEMessageObject.params.slideNumber, false)
        }
        break;
      case V.Constant.Event.onFlashcardSlideClosed:
        if(VEMessageObject.params && VEMessageObject.params.slideNumber) {
          V.Slides.closeSubslide(VEMessageObject.params.slideNumber, false)
        }
        break;
      case V.Constant.Event.onSetSlave:
        if(VEMessageObject.params && typeof VEMessageObject.params.slave != "undefined") {
          V.Status.setSlaveMode(VEMessageObject.params.slave)
        }
        break;
      case V.Constant.Event.onPreventDefault:
        if(VEMessageObject.params && typeof VEMessageObject.params.preventDefaults != "undefined") {
          V.Status.setPreventDefaultMode(VEMessageObject.params.preventDefaults)
        }
        break;
      case V.Constant.Event.allowExitWithoutConfirmation:
        V.Editor.allowExitWithoutConfirmation();
        break;
      case V.Constant.Event.onSelectedSlides:
        V.EventsNotifier.notifyEvent(V.Constant.Event.onSelectedSlides, VEMessageObject.params, true);
        break;
      default:
        V.Debugging.log("V.Messenger.Proceesor Error: Unrecognized event: " + VEMessageObject.VEevent);
        break
    }
  };
  return{createMessage:createMessage, processVEMessage:processVEMessage, validateVEMessage:validateVEMessage}
}(VISH, jQuery);
VISH.Addons = function(V, undefined) {
  var init = function(addons) {
    if(typeof addons === "object") {
      for(var i = 0;i < addons.length;i++) {
        var targeted = V.Editing && addons[i].target === V.Constant.Edit || !V.Editing && addons[i].target === V.Constant.Viewer || addons[i].target === V.Constant.AnyMode;
        if(targeted) {
          if(typeof V.Addons[addons[i].id] !== "undefined" && typeof V.Addons[addons[i].id].init === "function") {
            V.Addons[addons[i].id].init(addons[i].config)
          }
        }
      }
    }
  };
  return{init:init}
}(VISH, jQuery);
VISH.Addons.IframeMessenger = function(V, undefined) {
  var listenerInitialized = false;
  var init = function(config) {
    if(!config || !config.enable) {
      return
    }
    if(window.addEventListener) {
      window.addEventListener("message", _onWebAppMessage, false)
    }else {
      if(el.attachEvent) {
        window.attachEvent("message", _onWebAppMessage)
      }
    }
    V.Constant.Event.onIframeMessengerHello = "onIframeMessengerHello"
  };
  var _initListener = function() {
    V.EventsNotifier.registerCallback(V.Constant.Event.onMessage, _onVishEditorMessage);
    listenerInitialized = true
  };
  var _onVishEditorMessage = function(VEMessage) {
    _sendMessage(VEMessage)
  };
  var _onWebAppMessage = function(webAppMessage) {
    if(webAppMessage) {
      var VEMessage = webAppMessage.data;
      var processSelfMessages = V.Status.isPreventDefaultMode();
      if(V.Messenger.Helper.validateVEMessage(VEMessage, {allowSelfMessages:processSelfMessages})) {
        if(_isVEHelloMessage(VEMessage)) {
          if(!listenerInitialized) {
            _initListener();
            if(V.Status.getIsInIframe()) {
              var helloEcho = JSON.parse(VEMessage);
              helloEcho.origin = V.Status.getIframe().id;
              VEMessage = JSON.stringify(helloEcho)
            }
            _sendMessage(VEMessage)
          }
        }else {
          V.Messenger.Helper.processVEMessage(VEMessage)
        }
      }
    }
  };
  var _isVEHelloMessage = function(VEMessage) {
    var message = JSON.parse(VEMessage);
    return message.VEevent === V.Constant.Event.onIframeMessengerHello
  };
  var _validateWebAppMessage = function(webAppMessage) {
    if(!webAppMessage) {
      return false
    }
    return V.Messenger.Helper.validateVEMessage(webAppMessage.data)
  };
  var _sendMessage = function(VEMessage) {
    window.parent.postMessage(VEMessage, "*")
  };
  return{init:init}
}(VISH, jQuery);
VISH.Storage = function(V, $, undefined) {
  var _initialized;
  var _testing = false;
  var _isLocalStorageSupported;
  var init = function() {
    if(!_initialized) {
      _isLocalStorageSupported = checkLocalStorageSupport();
      _initialized = true;
      if(_testing) {
        clear();
        _isLocalStorageSupported = false
      }
    }
  };
  var add = function(key, value, persistent) {
    if(!_initialized) {
      init()
    }
    if(_isLocalStorageSupported) {
      persistent = !(persistent === false);
      var myObject = {};
      myObject.value = value;
      myObject.persistent = persistent;
      myObject.version = V.VERSION;
      myObject = JSON.stringify(myObject);
      localStorage.setItem(key, myObject);
      return true
    }else {
      return false
    }
  };
  var get = function(key) {
    if(!_initialized) {
      init()
    }
    if(_isLocalStorageSupported) {
      var myObject = localStorage.getItem(key);
      if(typeof myObject === "string") {
        myObject = JSON.parse(myObject);
        if(myObject && myObject.value) {
          if(!myObject.persistent && myObject.version) {
            var cVersion = parseFloat(V.VERSION);
            var valueVersion = parseFloat(myObject.version);
            if(cVersion > valueVersion) {
              return undefined
            }
          }
          return myObject.value
        }
      }
      return undefined
    }else {
      return undefined
    }
  };
  var addPresentation = function(presentation) {
    if(!_initialized) {
      init()
    }
    if(_isLocalStorageSupported) {
      var list = localStorage.getItem("presentation_list") ? JSON.parse(localStorage.getItem("presentation_list")) : new Array;
      if($.inArray(presentation.id, list) === -1) {
        list.push(presentation.id);
        localStorage.setItem("presentation_list", JSON.stringify(list))
      }
      localStorage.setItem("presentation_" + presentation.id, JSON.stringify(presentation));
      localStorage.setItem("presentation_" + presentation.id + "_url", window.location.href);
      if(presentation.avatar !== undefined) {
        _saveImage(presentation.avatar)
      }
    }else {
    }
  };
  var _saveImage = function(path) {
    if(!_initialized) {
      init()
    }
    if(localStorage.getItem(path) === null && !path.match(/^http/)) {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      var img = new Image;
      img.src = path;
      img.onload = function() {
        canvas.width = this.width;
        canvas.height = this.height;
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        var name = img.src.replace(/http:\/\/[^\/]+/i, "");
        localStorage.setItem(name, canvas.toDataURL())
      }
    }
  };
  var checkLocalStorageSupport = function() {
    return typeof Storage !== "undefined"
  };
  var clear = function() {
    localStorage.clear()
  };
  var setTestingMode = function(bolean) {
    _testing = bolean
  };
  return{init:init, add:add, get:get, addPresentation:addPresentation, checkLocalStorageSupport:checkLocalStorageSupport, clear:clear, setTestingMode:setTestingMode}
}(VISH, jQuery);
VISH.Slides = function(V, $, undefined) {
  var slideEls;
  var curSlideIndex;
  var SLIDE_CLASSES = ["far-past", "past", "current", "next", "far-next"];
  var curSubSlideId = null;
  var init = function() {
    _getcurSlideIndexFromHash();
    $(document).bind("OURDOMContentLoaded", handleDomLoaded)
  };
  var handleDomLoaded = function() {
    slideEls = document.querySelectorAll("section.slides > article");
    if(isSlideset(V.SlideManager.getPresentationType())) {
      setCurrentSlideIndex(0)
    }
    updateSlides(true);
    $("body").addClass("loaded")
  };
  var _getcurSlideIndexFromHash = function() {
    var slideNo = parseInt(location.hash.substr(1));
    if(slideNo) {
      setCurrentSlideIndex(slideNo - 1)
    }else {
      if(V.Editing) {
        setCurrentSlideIndex(-1)
      }else {
        setCurrentSlideIndex(0)
      }
    }
  };
  var getSlides = function() {
    return slideEls
  };
  var setSlides = function(newSlideEls) {
    slideEls = newSlideEls
  };
  var updateSlides = function(goingRight) {
    updateSlideEls();
    if(goingRight) {
      triggerLeaveEvent(curSlideIndex - 1)
    }else {
      triggerLeaveEvent(curSlideIndex + 1)
    }
    triggerEnterEvent(curSlideIndex);
    _updateHash()
  };
  var _updateHash = function() {
    location.replace("#" + (curSlideIndex + 1))
  };
  var updateSlideEls = function() {
    for(var i = 0;i < slideEls.length;i++) {
      switch(i) {
        case curSlideIndex - 2:
          updateSlideClass(i, "far-past");
          break;
        case curSlideIndex - 1:
          updateSlideClass(i, "past");
          break;
        case curSlideIndex:
          updateSlideClass(i, "current");
          break;
        case curSlideIndex + 1:
          updateSlideClass(i, "next");
          break;
        case curSlideIndex + 2:
          updateSlideClass(i, "far-next");
          break;
        default:
          updateSlideClass(i);
          break
      }
    }
  };
  var updateSlideClass = function(slideNo, className) {
    var el = _getSlide(slideNo);
    if(!el) {
      return
    }
    if(className) {
      $(el).addClass(className)
    }
    for(var i in SLIDE_CLASSES) {
      if(className != SLIDE_CLASSES[i]) {
        $(el).removeClass(SLIDE_CLASSES[i])
      }
    }
  };
  var setCurrentSlideIndex = function(newCurSlideIndex) {
    curSlideIndex = newCurSlideIndex
  };
  var getCurrentSlide = function() {
    return slideEls[curSlideIndex]
  };
  var getCurrentSubSlide = function() {
    if(curSubSlideId === null) {
      return null
    }else {
      return $("#" + curSubSlideId)
    }
  };
  var getCurrentSlideNumber = function() {
    return curSlideIndex + 1
  };
  var setCurrentSlideNumber = function(currentSlideNumber) {
    setCurrentSlideIndex(currentSlideNumber - 1)
  };
  var _getSlide = function(no) {
    return getSlideWithNumber(no + 1)
  };
  var getSlideWithNumber = function(slideNumber) {
    var no = slideNumber - 1;
    if(no < 0 || no >= slideEls.length) {
      return null
    }else {
      return slideEls[no]
    }
  };
  var getNumberOfSlide = function(slide) {
    if(slideEls) {
      var result = 0;
      $.each(slideEls, function(index, value) {
        if($(value).attr("id") == $(slide).attr("id")) {
          result = index;
          return
        }
      });
      return result
    }else {
      return 0
    }
  };
  var getSlidesQuantity = function() {
    return getSlides().length
  };
  var getSlideType = function(slideEl) {
    if(slideEl && slideEl.tagName === "ARTICLE") {
      switch($(slideEl).attr("type")) {
        case undefined:
        ;
        case V.Constant.STANDARD:
          return V.Constant.STANDARD;
          break;
        case V.Constant.FLASHCARD:
          return V.Constant.FLASHCARD;
          break;
        case V.Constant.QUIZ_SIMPLE:
          return V.Constant.QUIZ_SIMPLE;
          break;
        case V.Constant.GAME:
          return V.Constant.GAME;
          break;
        case V.Constant.VTOUR:
          return V.Constant.VTOUR;
          break;
        default:
          return V.Constant.UNKNOWN;
          break
      }
    }else {
      return null
    }
  };
  var isCurrentFirstSlide = function() {
    return curSlideIndex === 0
  };
  var isCurrentLastSlide = function() {
    return curSlideIndex === slideEls.length - 1
  };
  var triggerEnterEvent = function(no) {
    var el = _getSlide(no);
    if(!el) {
      return
    }
    _triggerEnterEventById(el.id)
  };
  var triggerLeaveEvent = function(no) {
    var el = _getSlide(no);
    if(!el) {
      return
    }
    _triggerLeaveEventById(el.id)
  };
  var _triggerEnterEventById = function(slide_id) {
    var el = $("#" + slide_id)[0];
    var onEnter = el.getAttribute("onslideenter");
    if(onEnter) {
      (new Function(onEnter)).call(el)
    }
    var evt = document.createEvent("Event");
    evt.initEvent("slideenter", true, true);
    el.dispatchEvent(evt)
  };
  var _triggerLeaveEventById = function(slide_id) {
    var el = $("#" + slide_id)[0];
    var onLeave = el.getAttribute("onslideleave");
    if(onLeave) {
      (new Function(onLeave)).call(el)
    }
    var evt = document.createEvent("Event");
    evt.initEvent("slideleave", true, true);
    el.dispatchEvent(evt)
  };
  var _prevSlide = function() {
    if(curSlideIndex > 0) {
      setCurrentSlideIndex(curSlideIndex - 1);
      updateSlides(false)
    }
  };
  var _nextSlide = function() {
    if(curSlideIndex < slideEls.length - 1) {
      setCurrentSlideIndex(curSlideIndex + 1);
      updateSlides(true)
    }
  };
  var forwardOneSlide = function(event) {
    if(isCurrentLastSlide() && V.Status.getDevice().desktop) {
      V.Recommendations.showFancybox()
    }else {
      goToSlide(curSlideIndex + 2)
    }
  };
  var backwardOneSlide = function() {
    goToSlide(curSlideIndex)
  };
  var goToSlide = function(no, triggeredByUser) {
    if(no === getCurrentSlideNumber()) {
      return
    }
    triggeredByUser = !(triggeredByUser === false);
    if(triggeredByUser && V.Status.isPreventDefaultMode() && V.Messenger) {
      var params = new Object;
      params.slideNumber = no;
      V.Messenger.notifyEventByMessage(V.Constant.Event.onGoToSlide, params);
      return
    }
    if(!V.Editing && $.fancybox) {
      $.fancybox.close()
    }
    if(no > slideEls.length || no <= 0) {
      return
    }else {
      if(no > curSlideIndex + 1) {
        while(curSlideIndex + 1 < no) {
          _nextSlide()
        }
      }else {
        if(no < curSlideIndex + 1) {
          while(curSlideIndex + 1 > no) {
            _prevSlide()
          }
        }
      }
    }
    if(V.Editing) {
      $(".selectable").css("border-style", "none");
      V.Editor.Tools.cleanZoneTools();
      V.Editor.Thumbnails.selectThumbnail(no)
    }else {
      V.SlideManager.updateSlideCounter()
    }
    var params = new Object;
    params.slideNumber = no;
    V.EventsNotifier.notifyEvent(V.Constant.Event.onGoToSlide, params, triggeredByUser)
  };
  var lastSlide = function() {
    goToSlide(slideEls.length)
  };
  var openSubslide = function(slide_id, triggeredByUser) {
    triggeredByUser = !(triggeredByUser === false);
    if(triggeredByUser && V.Status.isPreventDefaultMode() && V.Messenger) {
      var params = new Object;
      params.slideNumber = slide_id;
      V.Messenger.notifyEventByMessage(V.Constant.Event.onFlashcardPointClicked, params);
      return
    }
    _onOpenSubslide(slide_id);
    $("#" + slide_id).show();
    _triggerEnterEventById(slide_id);
    var params = new Object;
    params.slideNumber = slide_id;
    V.EventsNotifier.notifyEvent(V.Constant.Event.onFlashcardPointClicked, params, triggeredByUser)
  };
  var closeSubslide = function(slide_id, triggeredByUser) {
    triggeredByUser = !(triggeredByUser === false);
    if(triggeredByUser && V.Status.isPreventDefaultMode() && V.Messenger) {
      var params = new Object;
      params.slideNumber = slide_id;
      V.Messenger.notifyEventByMessage(V.Constant.Event.onFlashcardSlideClosed, params);
      return
    }
    _onCloseSubslide(slide_id);
    $("#" + slide_id).hide();
    _triggerLeaveEventById(slide_id);
    var params = new Object;
    params.slideNumber = slide_id;
    V.EventsNotifier.notifyEvent(V.Constant.Event.onFlashcardSlideClosed, params, triggeredByUser)
  };
  var _onOpenSubslide = function(subSlideId) {
    curSubSlideId = subSlideId;
    $("#closeButton").hide()
  };
  var _onCloseSubslide = function() {
    curSubSlideId = null;
    if(V.Status.getDevice().mobile) {
      setTimeout(function() {
        V.ViewerAdapter.decideIfCloseButton();
        V.ViewerAdapter.decideIfPageSwitcher()
      }, 800)
    }else {
      V.ViewerAdapter.decideIfPageSwitcher()
    }
  };
  var closeAllSlides = function() {
    $(".slides > article").hide()
  };
  var isSlideset = function(type) {
    switch(type) {
      case V.Constant.FLASHCARD:
      ;
      case V.Constant.VTOUR:
        return true;
      default:
        return false
    }
  };
  return{init:init, getSlides:getSlides, setSlides:setSlides, updateSlides:updateSlides, updateSlideEls:updateSlideEls, setCurrentSlideIndex:setCurrentSlideIndex, getCurrentSlide:getCurrentSlide, getCurrentSubSlide:getCurrentSubSlide, getCurrentSlideNumber:getCurrentSlideNumber, setCurrentSlideNumber:setCurrentSlideNumber, getSlideWithNumber:getSlideWithNumber, getNumberOfSlide:getNumberOfSlide, getSlidesQuantity:getSlidesQuantity, getSlideType:getSlideType, isCurrentFirstSlide:isCurrentFirstSlide, 
  isCurrentLastSlide:isCurrentLastSlide, forwardOneSlide:forwardOneSlide, backwardOneSlide:backwardOneSlide, goToSlide:goToSlide, lastSlide:lastSlide, openSubslide:openSubslide, closeSubslide:closeSubslide, closeAllSlides:closeAllSlides, isSlideset:isSlideset}
}(VISH, jQuery);
VISH.Events = function(V, $, undefined) {
  var eMobile;
  var bindedEventListeners = false;
  var mobile;
  var init = function() {
    mobile = !V.Status.getDevice().desktop;
    eMobile = V.Events.Mobile;
    if(!V.Editing) {
      eMobile.init();
      bindViewerEventListeners()
    }
  };
  var bindViewerEventListeners = function() {
    if(bindedEventListeners) {
      return
    }else {
      bindedEventListeners = true
    }
    $(document).bind("keydown", handleBodyKeyDown);
    $(document).on("click", "#page-switcher-start", function() {
      V.Slides.backwardOneSlide()
    });
    $(document).on("click", "#page-switcher-end", function() {
      V.Slides.forwardOneSlide()
    });
    $(document).on("click", "#closeButton", function(event) {
      event.stopPropagation();
      event.preventDefault();
      var comeBackUrl = V.SlideManager.getOptions()["comeBackUrl"];
      if(comeBackUrl) {
        window.top.location.href = V.SlideManager.getOptions()["comeBackUrl"]
      }else {
        if(V.Status.getIsEmbed() && V.Status.getDevice().features.history) {
          history.back()
        }
      }
    });
    $(document).on("click", "#back_arrow", function(event) {
      V.Slides.backwardOneSlide()
    });
    $(document).on("click", "#forward_arrow", function(event) {
      V.Slides.forwardOneSlide()
    });
    $(document).on("click", ".close_subslide", onFlashcardCloseSlideClicked);
    var presentation = V.SlideManager.getCurrentPresentation();
    for(index in presentation.slides) {
      var slide = presentation.slides[index];
      switch(slide.type) {
        case V.Constant.FLASHCARD:
          for(ind in slide.pois) {
            var poi = slide.pois[ind];
            $(document).on("click", "#" + poi.id, {poi_id:poi.id}, onFlashcardPoiClicked)
          }
          break;
        case V.Constant.VTOUR:
          break
      }
    }
    if(typeof applicationCache !== "undefined") {
      applicationCache.addEventListener("cached", function() {
        V.Storage.addPresentation(presentation)
      }, false);
      applicationCache.addEventListener("updateready", function() {
        V.Storage.addPresentation(presentation)
      }, false)
    }
    var multipleOnResize = undefined;
    window.onresize = function() {
      if(typeof multipleOnResize === "undefined") {
        multipleOnResize = false;
        setTimeout(function() {
          if(!multipleOnResize) {
            multipleOnResize = undefined;
            V.ViewerAdapter.updateInterface()
          }else {
            multipleOnResize = undefined;
            window.onresize()
          }
        }, 600)
      }else {
        multipleOnResize = true
      }
    };
    if(mobile) {
      eMobile.bindViewerMobileEventListeners()
    }
  };
  var unbindViewerEventListeners = function() {
    if(!bindedEventListeners) {
      return
    }else {
      bindedEventListeners = false
    }
    $(document).unbind("keydown", handleBodyKeyDown);
    $(document).off("click", "#page-switcher-start", V.Slides.backwardOneSlide);
    $(document).off("click", "#page-switcher-end", V.Slides.forwardOneSlide);
    $(document).off("click", "#back_arrow", V.Slides.backwardOneSlide);
    $(document).off("click", "#forward_arrow", V.Slides.forwardOneSlide);
    $(document).off("click", "#closeButton");
    $(document).off("click", ".close_subslide", onFlashcardCloseSlideClicked);
    var presentation = V.SlideManager.getCurrentPresentation();
    for(index in presentation.slides) {
      var slide = presentation.slides[index];
      switch(slide.type) {
        case V.Constant.FLASHCARD:
          for(ind in slide.pois) {
            var poi = slide.pois[ind];
            $(document).off("click", "#" + poi.id, {poi_id:poi.id}, onFlashcardPoiClicked)
          }
          break;
        case V.Constant.VTOUR:
          break
      }
    }
    if(typeof applicationCache !== "undefined") {
      applicationCache.removeEventListener("cached", function() {
        V.Storage.addPresentation(presentation)
      }, false);
      applicationCache.removeEventListener("updateready", function() {
        V.Storage.addPresentation(presentation)
      }, false)
    }
    if(mobile) {
      eMobile.unbindViewerMobileEventListeners()
    }
  };
  var handleBodyKeyDown = function(event) {
    switch(event.keyCode) {
      case 38:
      ;
      case 39:
        V.Slides.forwardOneSlide();
        event.preventDefault();
        break;
      case 37:
      ;
      case 40:
        V.Slides.backwardOneSlide();
        event.preventDefault();
        break
    }
  };
  var onFlashcardPoiClicked = function(event) {
    if(typeof event === "string") {
      var poiId = event
    }else {
      if(typeof event === "object") {
        var poiId = event.data.poi_id
      }else {
        return
      }
    }
    var poi = V.Flashcard.getPoiData(poiId);
    if(poi !== null) {
      V.Slides.openSubslide(poi.slide_id, true)
    }
  };
  var onFlashcardCloseSlideClicked = function(event) {
    var close_slide_id = event.target.id.substring(5);
    V.Slides.closeSubslide(close_slide_id, true)
  };
  return{init:init, bindViewerEventListeners:bindViewerEventListeners, unbindViewerEventListeners:unbindViewerEventListeners, onFlashcardPoiClicked:onFlashcardPoiClicked, onFlashcardCloseSlideClicked:onFlashcardCloseSlideClicked}
}(VISH, jQuery);
VISH.EventsNotifier = function(V, $, undefined) {
  var listeners;
  var init = function() {
    listeners = new Array
  };
  var registerCallback = function(listenedEvent, callback) {
    if(listenedEvent in listeners) {
      listeners[listenedEvent].push(callback)
    }else {
      listeners[listenedEvent] = [];
      listeners[listenedEvent].push(callback);
      if(listenedEvent == V.Constant.Event.onMessage) {
        V.Messenger.init()
      }
    }
  };
  var unRegisterCallback = function(listenedEvent, callback) {
    if(listenedEvent in listeners) {
      if(listeners[listenedEvent].indexOf(callback) !== -1) {
        listeners[listenedEvent].splice(listeners[listenedEvent].indexOf(callback), 1)
      }
    }
  };
  var notifyEvent = function(triggeredEvent, params, triggeredByUser) {
    if(!listeners) {
      return
    }
    params = params || {};
    params.triggeredByUser = !(triggeredByUser === false);
    var eventListeners = listeners[triggeredEvent];
    if(eventListeners) {
      for(var i = 0;i < eventListeners.length;i++) {
        eventListeners[i](params)
      }
    }
  };
  return{init:init, notifyEvent:notifyEvent, registerCallback:registerCallback, unRegisterCallback:unRegisterCallback}
}(VISH, jQuery);
VISH.Quiz = function(V, $, undefined) {
  var quizMode;
  var quizSessionId;
  var currentQuiz;
  var currentQuizSession;
  var currentPolling;
  var initBeforeRender = function(presentation) {
    if(presentation.type === V.Constant.QUIZ_SIMPLE) {
      quizMode = V.Constant.QZ_MODE.RT;
      if(V.Utils.getOptions().quizSessionId) {
        quizSessionId = V.Utils.getOptions().quizSessionId
      }
    }else {
      quizMode = V.Constant.QZ_MODE.SELFA
    }
  };
  var init = function() {
    $("#prompt2name").watermark("Quiz Session Name");
    V.Quiz.API.init();
    V.Quiz.MC.init();
    V.Quiz.TF.init();
    _loadEvents()
  };
  var _loadEvents = function() {
    $(document).on("click", ".quizAnswerButton", _onAnswerQuiz);
    $(document).on("click", ".quizStartButton", _onStartQuiz);
    $(document).on("click", ".quizStopButton", _onStopQuiz);
    $("a#addQuizSessionFancybox").fancybox({"autoDimensions":false, "scrolling":"no", "width":"0%", "height":"0%", "padding":0, "autoScale":true, "onStart":function(data) {
      loadTab("tab_quiz_session");
      $("#fancybox-close").height(0);
      $("#fancybox-close").css("padding", 0)
    }, "onComplete":function(data) {
      setTimeout(function() {
        $("#fancybox-close").height("22px");
        $("#fancybox-close").css("padding", "10px");
        $("#fancybox-close").css("padding-left", "4px");
        $("#fancybox-wrap").css("margin-top", "0px");
        $("#fancybox-wrap").width($(".current").width() + 100);
        $("#fancybox-wrap").height($(".current").height() + 70);
        $(".outer_box").css("width", "100%");
        $(".outer_box").height($(".current").height() + 70);
        $("#fancybox-wrap").css("top", $(".current").offset().top + "px");
        $("#fancybox-wrap").css("left", $(".current").offset().left + "px");
        $("#fancybox-content").width("100%");
        $("#fancybox-content").height("100%");
        $("#fancybox-content > div").width("100%");
        $("#fancybox-content > div").height("100%");
        $("#fancybox-wrap").show();
        if(currentQuizSession && currentQuizSession.url) {
          _loadQr(currentQuizSession.url)
        }
      }, 300)
    }, "onClosed":function() {
      _stopPolling();
      _cleanResults()
    }})
  };
  var _onAnswerQuiz = function(event) {
    var quiz = $("div.quizzContainer").has(event.target);
    var quizModule = _getQuizModule($(quiz).attr("type"));
    if(quizModule) {
      if(quizMode === V.Constant.QZ_MODE.SELFA) {
        quizModule.onAnswerQuiz(quiz)
      }else {
        var report = quizModule.getReport(quiz);
        _answerRTQuiz(quiz, quizModule, report)
      }
    }
  };
  var _answerRTQuiz = function(quiz, quizModule, report) {
    if(!quizSessionId) {
      return
    }
    if(report.empty === true) {
      _showAlert("prompt3_alert");
      return
    }
    quizModule.disableQuiz(quiz);
    _loadingAnswerButton(quiz);
    var answers = report.answers;
    V.Debugging.log(answers);
    V.Quiz.API.sendAnwers(answers, quizSessionId, function(data) {
      disableAnswerButton(quiz);
      _showAlert("prompt4_alert")
    }, function(error) {
      disableAnswerButton(quiz);
      _showAlert("prompt5_alert")
    })
  };
  var _onStartQuiz = function(event) {
    var startButton = $(event.target);
    var quiz = $("div.quizzContainer").has(startButton);
    switch($(startButton).attr("quizStatus")) {
      case "running":
        $("#fancybox-close").hide();
        $("a#addQuizSessionFancybox").trigger("click");
        break;
      case "loading":
        break;
      case "stop":
      ;
      default:
        _startNewQuizSession(quiz);
        break
    }
  };
  var _startNewQuizSession = function(quiz) {
    if(currentQuizSession) {
      _showAlert("prompt1_alert");
      return
    }
    _loadingLaunchButton(quiz);
    var quizJSON = _getQuizJSONFromQuiz(quiz);
    V.Quiz.API.startQuizSession(quiz, quizJSON, _onQuizSessionReceived, _onQuizSessionReceivedError)
  };
  var _onQuizSessionReceived = function(quiz, quizSession) {
    V.Debugging.log("_onQuizSessionReceived");
    V.Debugging.log(quizSession);
    currentQuiz = quiz;
    currentQuizSession = quizSession;
    _runningLaunchButton(quiz);
    $("a#addQuizSessionFancybox").trigger("click")
  };
  var _onQuizSessionReceivedError = function(quiz, error) {
    V.Debugging.log("_OnQuizSessionReceivedError");
    V.Debugging.log(error);
    _enableLaunchButton(quiz)
  };
  var _getQuizJSONFromQuiz = function(quiz) {
    var slide = $("article").has(quiz);
    return _getQuizJSONFromSlide(slide)
  };
  var _getQuizJSONFromSlide = function(slide) {
    var slideId = $(slide).attr("id");
    var presentation = V.SlideManager.getCurrentPresentation();
    if(slideId && presentation) {
      var slides = presentation.slides;
      var sL = slides.length;
      for(var i = 0;i < sL;i++) {
        if(slides[i].id == slideId) {
          var elements = slides[i].elements;
          var eL = elements.length;
          for(var j = 0;j < eL;j++) {
            if(elements[j].type == V.Constant.QUIZ) {
              return elements[j].quiz_simple_json
            }
          }
        }
      }
    }
  };
  var _onStopQuiz = function(event) {
    $.fancybox($("#prompt2_alert").html(), {"autoDimensions":false, "scrolling":"no", "width":$(".current").width(), "height":Math.min(200, $(".current").height()), "showCloseButton":false, "padding":5, "onCleanup":function() {
    }, "onClosed":function() {
    }})
  };
  var onCloseQuizSession = function(saving) {
    var name = undefined;
    switch(saving) {
      case "yes":
        $(".prompt2name").each(function(index, pn) {
          if($(pn).is(":visible")) {
            name = $(pn).val()
          }
        });
        $(".prompt_button_viewer2").addClass("quizStartButtonLoading");
        _closeQuizSession(name);
        break;
      case "no":
        $(".prompt_button_viewer1").addClass("quizStartButtonLoading");
        _closeQuizSession();
        break;
      case "cancel":
      ;
      default:
        $.fancybox.close();
        break
    }
  };
  var _closeQuizSession = function(name) {
    V.Quiz.API.closeQuizSession(currentQuizSession.id, name, function(data) {
      $.fancybox.close();
      $(".prompt_button_viewer1").removeClass("quizStartButtonLoading");
      $(".prompt_button_viewer2").removeClass("quizStartButtonLoading");
      _enableLaunchButton(currentQuiz);
      currentQuiz = null;
      currentQuizSession = null
    })
  };
  var render = function(slide, template) {
    var quizModule = _getQuizModule(slide.quiztype);
    if(quizModule) {
      return quizModule.render(slide, template)
    }
  };
  var renderButtons = function(selfA) {
    var quizButtons = $("<div class='quizButtons'></div>");
    if(quizMode === V.Constant.QZ_MODE.SELFA && (V.Configuration.getConfiguration().mode === V.Constant.VISH || V.Configuration.getConfiguration()["mode"] === V.Constant.NOSERVER) && V.User.isLogged() && !V.Utils.getOptions().preview) {
      var startButton = $("<input type='button' class='quizButton quizStartButton' value='Launch'/>");
      $(quizButtons).prepend(startButton)
    }
    if(selfA || quizMode === V.Constant.QZ_MODE.RT) {
      var answerButton = $("<input type='button' class='quizButton quizAnswerButton' value='Answer'/>");
      $(quizButtons).prepend(answerButton)
    }
    return quizButtons
  };
  var _enableAnswerButton = function(quiz) {
    var answerButton = $(quiz).find("input.quizAnswerButton");
    $(answerButton).removeAttr("disabled");
    $(answerButton).removeClass("quizStartButtonLoading");
    $(answerButton).removeAttr("quizStatus")
  };
  var _loadingAnswerButton = function(quiz) {
    var answerButton = $(quiz).find("input.quizAnswerButton");
    $(answerButton).attr("disabled", "disabled");
    $(answerButton).addClass("quizStartButtonLoading");
    $(answerButton).attr("quizStatus", "loading")
  };
  var disableAnswerButton = function(quiz) {
    var answerButton = $(quiz).find("input.quizAnswerButton");
    $(answerButton).attr("disabled", "disabled");
    $(answerButton).addClass("quizAnswerButtonDisabled");
    $(answerButton).removeClass("quizStartButtonLoading");
    $(answerButton).attr("quizStatus", "disabled")
  };
  var _enableLaunchButton = function(quiz) {
    var startButton = $(quiz).find("input.quizStartButton");
    $(startButton).removeAttr("disabled");
    $(startButton).removeClass("quizStartButtonLoading");
    $(startButton).removeAttr("quizStatus");
    $(startButton).attr("value", "Launch")
  };
  var _loadingLaunchButton = function(quiz) {
    var startButton = $(quiz).find("input.quizStartButton");
    $(startButton).attr("disabled", "disabled");
    $(startButton).addClass("quizStartButtonLoading");
    $(startButton).attr("quizStatus", "loading");
    $(startButton).attr("value", "Launch")
  };
  var _runningLaunchButton = function(quiz) {
    var startButton = $(quiz).find("input.quizStartButton");
    $(startButton).removeAttr("disabled");
    $(startButton).removeClass("quizStartButtonLoading");
    $(startButton).attr("quizStatus", "running");
    $(startButton).attr("value", "Options")
  };
  var loadTab = function(tab_id) {
    $(".fancy_viewer_tab_content").hide();
    $("#" + tab_id + "_content").show();
    $(".fancy_viewer_tab").removeClass("fancy_selected");
    $("#" + tab_id).addClass("fancy_selected");
    $(".help_in_fancybox_viewer").hide();
    $("#" + tab_id + "_help").show();
    switch(tab_id) {
      case "tab_quiz_session":
        _loadQuizSession();
        break;
      case "tab_quiz_stats":
        _loadStats();
        break;
      default:
        break
    }
  };
  var _loadQuizSession = function() {
    _cleanResults();
    if(!currentQuizSession) {
      return
    }
    if(V.Configuration.getConfiguration()["mode"] == V.Constant.NOSERVER) {
      currentQuizSession.url = "http://vishub.org/quiz_sessions/4567"
    }
    var myA = $("#tab_quiz_session_url_link");
    $(myA).attr("href", currentQuizSession.url);
    $(myA).html("<p id='tab_quiz_session_url'>" + currentQuizSession.url + "</p>");
    var sharingText = $(currentQuiz).find(".mc_question_wrapper_viewer").text().trim();
    var twitter = $("#tab_quiz_session_share_twitter");
    $(twitter).attr("href", "https://twitter.com/share?url=" + currentQuizSession.url + "&text=" + sharingText + "");
    var facebook = $("#tab_quiz_session_share_facebook");
    var facebookUrl = "http://www.facebook.com/sharer.php?s=100&p[url]=" + currentQuizSession.url + "&p[title]=" + sharingText;
    $(facebook).attr("href", facebookUrl);
    var gPlus = $("#tab_quiz_session_share_gPlus");
    $(gPlus).attr("href", "https://plus.google.com/share?url=" + currentQuizSession.url)
  };
  var _loadQr = function(url) {
    if(typeof url != "string") {
      return
    }
    var container = $(".quizQr");
    $(container).html("");
    var height = $(container).height();
    var width = height;
    var qrOptions = {render:"canvas", width:width, height:height, color:"#000", bgColor:"#fff", text:url.toString()};
    $(container).qrcode(qrOptions)
  };
  var _onClickQR = function() {
    var changeToFs = false;
    var changeFromFs = false;
    var elem = $(".quizQr")[0];
    if(V.Status.getIsInIframe() && isFullscreen(parent.document)) {
      return
    }
    if(isFullscreen(document)) {
      changeFromFS = cancelFullScreen(document)
    }else {
      changeToFS = requestFullScreen(elem)
    }
    if(changeToFs) {
      $(".quizQr").attr("disabledTitle", $(".quizQr").attr("title"));
      $(".quizQr").removeAttr("title")
    }else {
      if(changeFromFs) {
        $(".quizQr").attr("title", $(".quizQr").attr("disabledTitle"))
      }
    }
    if(changeToFs || changeFromFs) {
      _loadQr(currentQuizSession.url)
    }
  };
  var isFullscreen = function(myDoc) {
    return myDoc.fullScreen || myDoc.mozFullScreen || myDoc.webkitIsFullScreen
  };
  var cancelFullScreen = function(myDoc) {
    if(myDoc.cancelFullScreen) {
      myDoc.cancelFullScreen();
      return true
    }else {
      if(myDoc.mozCancelFullScreen) {
        myDoc.mozCancelFullScreen();
        return true
      }else {
        if(myDoc.webkitCancelFullScreen) {
          myDoc.webkitCancelFullScreen();
          return true
        }
      }
    }
    return false
  };
  var requestFullScreen = function(elem) {
    if(elem.requestFullscreen) {
      elem.requestFullscreen();
      return true
    }else {
      if(elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
        return true
      }else {
        if(elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
          return true
        }
      }
    }
    return false
  };
  var _loadStats = function() {
    _cleanResults();
    V.Quiz.API.getResults(currentQuizSession.id, function(results) {
      _drawResults(results, {"first":true});
      _startPolling()
    })
  };
  var _startPolling = function() {
    _stopPolling();
    currentPolling = setInterval(function() {
      if(!currentQuizSession) {
        _stopPolling();
        return
      }
      V.Quiz.API.getResults(currentQuizSession.id, function(results) {
        _drawResults(results, {"first":false})
      })
    }, 2E3)
  };
  var _stopPolling = function() {
    if(currentPolling) {
      clearInterval(currentPolling)
    }
  };
  var _drawResults = function(results, options) {
    var canvas = $("#quiz_chart");
    var desiredWidth = $("#fancybox-content").width();
    var desiredHeight = $("#fancybox-content").height() * 0.8;
    $(canvas).width(desiredWidth);
    $(canvas).height(desiredHeight);
    $(canvas).attr("width", desiredWidth);
    $(canvas).attr("height", desiredHeight);
    var quizModule = _getQuizModule($(currentQuiz).attr("type"));
    if(quizModule) {
      $("#quiz_chart").show();
      quizModule.drawResults(currentQuiz, results, options)
    }
  };
  var _cleanResults = function() {
    var canvas = $("#quiz_chart");
    var ctx = $(canvas).get(0).getContext("2d");
    ctx.clearRect(0, 0, $(canvas).width(), $(canvas).height());
    $(canvas).hide()
  };
  var _getQuizModule = function(quiz_type) {
    switch(quiz_type) {
      case V.Constant.QZ_TYPE.OPEN:
        break;
      case V.Constant.QZ_TYPE.MCHOICE:
        return V.Quiz.MC;
        break;
      case V.Constant.QZ_TYPE.TF:
        return V.Quiz.TF;
        break;
      default:
        return null;
        break
    }
  };
  var updateCheckbox = function(checkbox, check) {
    if(typeof check == "boolean") {
      check = check.toString()
    }
    var imagePathRoot = V.ImagesPath + "quiz/checkbox";
    switch(check) {
      case "true":
        $(checkbox).attr("check", "true");
        $(checkbox).attr("src", imagePathRoot + "_checked.png");
        break;
      case "false":
        $(checkbox).attr("check", "false");
        $(checkbox).attr("src", imagePathRoot + "_wrong.png");
        break;
      case "none":
      ;
      default:
        $(checkbox).attr("check", "none");
        $(checkbox).attr("src", imagePathRoot + ".png");
        break
    }
  };
  var _showAlert = function(alertId) {
    $.fancybox($("#" + alertId).html(), {"autoDimensions":false, "scrolling":"no", "width":$(".current").width(), "height":Math.min(200, $(".current").height()), "showCloseButton":false, "padding":5})
  };
  var aftersetupSize = function(increase) {
    setTimeout(function() {
      if(currentQuizSession && currentQuizSession.url) {
        _loadQr(currentQuizSession.url)
      }
    }, 500)
  };
  return{initBeforeRender:initBeforeRender, init:init, render:render, renderButtons:renderButtons, updateCheckbox:updateCheckbox, disableAnswerButton:disableAnswerButton, loadTab:loadTab, onCloseQuizSession:onCloseQuizSession, aftersetupSize:aftersetupSize}
}(VISH, jQuery);
VISH.Quiz.MC = function(V, $, undefined) {
  var choicesLetters = ["a)", "b)", "c)", "d)", "e)", "f)", "g)", "h)", "i)", "j)", "k)", "l)", "m)", "n)", "o)", "p)", "q)", "r)", "s)"];
  var choices = {};
  var init = function() {
    _loadEvents()
  };
  var _loadEvents = function() {
  };
  var render = function(slide, template) {
    var quizId = V.Utils.getId();
    var container = $("<div id='" + quizId + "' class='quizzContainer mcContainer' type='" + V.Constant.QZ_TYPE.MCHOICE + "'></div>");
    var multipleAnswer = false;
    var inputType = "radio";
    if(slide.extras && slide.extras.multipleAnswer === true) {
      multipleAnswer = true;
      inputType = "checkbox"
    }
    var questionWrapper = $("<div class='mc_question_wrapper, mc_question_wrapper_viewer'></div>");
    $(questionWrapper).html(slide.question.wysiwygValue);
    $(container).append(questionWrapper);
    var optionsWrapper = $("<table cellspacing='0' cellpadding='0' class='mc_options'></table>");
    choices[quizId] = [];
    for(var i = 0;i < slide.choices.length;i++) {
      var option = slide.choices[i];
      var optionWrapper = $("<tr class='mc_option' nChoice='" + (i + 1) + "'></tr>");
      var optionBox = $("<td><input class='mc_box' type='" + inputType + "' name='mc_option' value='" + i + "'/></td>");
      var optionIndex = $("<td><span class='mc_option_index mc_option_index_viewer'>" + choicesLetters[i] + "</span></td>");
      var optionText = $("<td><div class='mc_option_text mc_option_text_viewer'></div></td>");
      $(optionText).html(option.wysiwygValue);
      $(optionWrapper).append(optionBox);
      $(optionWrapper).append(optionIndex);
      $(optionWrapper).append(optionText);
      $(optionsWrapper).append(optionWrapper);
      choices[quizId].push(option)
    }
    $(container).append(optionsWrapper);
    var quizButtons = V.Quiz.renderButtons(slide.selfA);
    $(container).append(quizButtons);
    return V.Utils.getOuterHTML(container)
  };
  var onAnswerQuiz = function(quiz) {
    var answeredQuiz = false;
    var quizChoices = choices[$(quiz).attr("id")];
    $(quiz).find("input[name='mc_option']").each(function(index, radioBox) {
      var answerValue = parseInt($(radioBox).attr("value"));
      var choice = quizChoices[answerValue];
      if($(radioBox).is(":checked")) {
        var trAnswer = $("tr.mc_option").has(radioBox);
        if(choice.answer === true) {
          $(trAnswer).addClass("mc_correct_choice")
        }else {
          if(choice.answer === false) {
            $(trAnswer).addClass("mc_wrong_choice")
          }
        }
        answeredQuiz = true
      }
    });
    var trCorrectAnswers = [];
    for(var key in quizChoices) {
      if(quizChoices[key].answer === true) {
        var trCorrect = $(quiz).find("tr.mc_option")[key];
        trCorrectAnswers.push($(quiz).find("tr.mc_option")[key]);
        if(answeredQuiz) {
          $(trCorrect).addClass("mc_correct_choice")
        }
      }
    }
    if(!answeredQuiz) {
      $(trCorrectAnswers).each(function(index, trCorrect) {
        $(trCorrect).find("input[name='mc_option']").attr("checked", "checked")
      })
    }
    disableQuiz(quiz)
  };
  var getReport = function(quiz) {
    var report = {};
    report.answers = [];
    $(quiz).find("input[name='mc_option']").each(function(index, radioBox) {
      if($(radioBox).is(":checked")) {
        report.answers.push({no:(index + 1).toString(), answer:"true"})
      }
    });
    report.empty = report.answers.length === 0;
    return report
  };
  var disableQuiz = function(quiz) {
    $(quiz).find("input[name='mc_option']").attr("disabled", "disabled");
    V.Quiz.disableAnswerButton(quiz)
  };
  var getChoicesLetters = function() {
    return choicesLetters
  };
  var drawResults = function(quiz, results, options) {
    var canvas = $("#quiz_chart");
    var nAnswers = $(quiz).find("tr.mc_option[nChoice]").length;
    V.QuizCharts.drawQuizChart(canvas, V.Constant.QZ_TYPE.MCHOICE, nAnswers, results, options)
  };
  return{init:init, render:render, onAnswerQuiz:onAnswerQuiz, getChoicesLetters:getChoicesLetters, getReport:getReport, disableQuiz:disableQuiz, drawResults:drawResults}
}(VISH, jQuery);
VISH.Quiz.TF = function(V, $, undefined) {
  var choices = {};
  var init = function() {
    _loadEvents()
  };
  var _loadEvents = function() {
  };
  var render = function(slide, template) {
    var quizId = V.Utils.getId();
    var container = $("<div id='" + quizId + "' class='quizzContainer mcContainer' type='" + V.Constant.QZ_TYPE.TF + "'></div>");
    var questionWrapper = $("<div class='mc_question_wrapper, mc_question_wrapper_viewer'></div>");
    $(questionWrapper).html(slide.question.wysiwygValue);
    $(container).append(questionWrapper);
    var optionsWrapper = $("<table cellspacing='0' cellpadding='0' class='tf_options'></table>");
    choices[quizId] = [];
    var newTr = $("<tr class='mc_option tf_head'><td><img src='" + V.ImagesPath + "quiz/checkbox_checked.png' class='tfCheckbox_viewer'/></td><td><img src='" + V.ImagesPath + "quiz/checkbox_wrong.png' class='tfCheckbox_viewer'/></td><td></td><td></td></tr>");
    $(optionsWrapper).prepend(newTr);
    for(var i = 0;i < slide.choices.length;i++) {
      var option = slide.choices[i];
      var optionWrapper = $("<tr class='mc_option' nChoice='" + (i + 1) + "'></tr>");
      var optionBox1 = $("<td><input class='tf_radio' type='radio' name='tf_radio" + i + "' column='true' value='" + index + "'/></td>");
      var optionBox2 = $("<td><input class='tf_radio' type='radio' name='tf_radio" + i + "' column='false' value='" + index + "'/></td>");
      var optionIndex = $("<td><span class='mc_option_index mc_option_index_viewer'>" + V.Quiz.MC.getChoicesLetters()[i] + "</span></td>");
      var optionText = $("<td><div class='mc_option_text mc_option_text_viewer'></div></td>");
      $(optionText).html(option.wysiwygValue);
      $(optionWrapper).append(optionBox1);
      $(optionWrapper).append(optionBox2);
      $(optionWrapper).append(optionIndex);
      $(optionWrapper).append(optionText);
      $(optionsWrapper).append(optionWrapper);
      choices[quizId].push(option)
    }
    $(container).append(optionsWrapper);
    var quizButtons = V.Quiz.renderButtons(slide.selfA);
    $(container).append(quizButtons);
    return V.Utils.getOuterHTML(container)
  };
  var onAnswerQuiz = function(quiz) {
    var quizChoices = choices[$(quiz).attr("id")];
    $(quiz).find("tr.mc_option").not(".tf_head").each(function(index, tr) {
      var trueRadio = $(tr).find("input[type='radio'][column='true']")[0];
      var falseRadio = $(tr).find("input[type='radio'][column='false']")[0];
      var myAnswer;
      if($(trueRadio).is(":checked")) {
        myAnswer = true
      }else {
        if($(falseRadio).is(":checked")) {
          myAnswer = false
        }else {
          myAnswer = undefined
        }
      }
      var choice = quizChoices[index];
      var trChoice = $(quiz).find("tr.mc_option").not(".tf_head")[index];
      if(myAnswer === choice.answer) {
        $(trChoice).addClass("mc_correct_choice")
      }else {
        if(typeof myAnswer != "undefined") {
          $(trChoice).addClass("mc_wrong_choice")
        }else {
          if(choice.answer === true) {
            $(trueRadio).attr("checked", true)
          }else {
            if(choice.answer === false) {
              $(falseRadio).attr("checked", true)
            }
          }
        }
      }
    });
    disableQuiz(quiz)
  };
  var getReport = function(quiz) {
    var report = {};
    report.answers = [];
    report.empty = true;
    $(quiz).find("tr.mc_option").not(".tf_head").each(function(index, tr) {
      var trueRadio = $(tr).find("input[type='radio'][column='true']")[0];
      var falseRadio = $(tr).find("input[type='radio'][column='false']")[0];
      if($(trueRadio).is(":checked")) {
        report.answers.push({no:(index + 1).toString(), answer:"true"});
        report.empty = false
      }else {
        if($(falseRadio).is(":checked")) {
          report.answers.push({no:(index + 1).toString(), answer:"false"});
          report.empty = false
        }else {
          report.answers.push({no:(index + 1).toString(), answer:"none"})
        }
      }
    });
    return report
  };
  var disableQuiz = function(quiz) {
    $(quiz).find("input[type='radio']").attr("disabled", "disabled");
    V.Quiz.disableAnswerButton(quiz)
  };
  var drawResults = function(quiz, results, options) {
    var canvas = $("#quiz_chart");
    var nAnswers = $(quiz).find("tr.mc_option[nChoice]").length;
    V.QuizCharts.drawQuizChart(canvas, V.Constant.QZ_TYPE.TF, nAnswers, results, options)
  };
  return{init:init, render:render, onAnswerQuiz:onAnswerQuiz, getReport:getReport, disableQuiz:disableQuiz, drawResults:drawResults}
}(VISH, jQuery);
VISH.Quiz.API = function(V, $, undefined) {
  var init = function() {
  };
  var startQuizSession = function(quiz, quizJSON, successCallback, failCallback) {
    if(V.Configuration.getConfiguration().mode === V.Constant.VISH) {
      var send_type = "POST";
      var params = {"quiz":JSON.stringify(quizJSON), "authenticity_token":V.User.getToken()};
      $.ajax({type:send_type, url:"http://" + window.location.host + "/quiz_sessions", data:params, success:function(data) {
        if(typeof successCallback == "function") {
          successCallback(quiz, data)
        }
      }, error:function(error) {
        if(typeof failCallback == "function") {
          failCallback(error)
        }
      }})
    }else {
      if(V.Configuration.getConfiguration()["mode"] == V.Constant.NOSERVER) {
        var quizSessionId = Math.ceil(1E4 * (1 + Math.random())).toString();
        var url = "http://" + window.location.host + "/quiz_sessions/" + quizSessionId;
        var quiz_session = {id:quizSessionId, url:url};
        if(typeof successCallback == "function") {
          setTimeout(function() {
            successCallback(quiz, quiz_session)
          }, 1E3)
        }
      }
    }
  };
  var sendAnwers = function(answers, quizSessionId, successCallback, failCallback) {
    if(V.Configuration.getConfiguration().mode === V.Constant.VISH) {
      var send_type = "PUT";
      var params = {"id":quizSessionId, "answers":JSON.stringify(answers), "authenticity_token":V.User.getToken()};
      $.ajax({type:send_type, url:"http://" + window.location.host + "/quiz_sessions/" + quizSessionId, data:params, success:function(data) {
        if(typeof successCallback == "function") {
          successCallback(data)
        }
      }, error:function(error) {
        if(typeof failCallback == "function") {
          failCallback(error)
        }
      }});
      return null
    }else {
      if(typeof successCallback == "function") {
        setTimeout(function() {
          successCallback()
        }, 1E3)
      }
    }
  };
  var getResults = function(quizSessionId, successCallback, failCallback) {
    if(V.Configuration.getConfiguration()["mode"] == "vish") {
      var send_type = "GET";
      var params = {"id":quizSessionId, "authenticity_token":V.User.getToken()};
      $.ajax({type:send_type, url:"http://" + window.location.host + "/quiz_sessions/" + quizSessionId + "/results.json", data:params, success:function(data) {
        if(typeof successCallback == "function") {
          successCallback(data)
        }
      }, error:function(error) {
        if(typeof failCallback == "function") {
          failCallback(error)
        }
      }})
    }else {
      if(V.Configuration.getConfiguration()["mode"] == "noserver") {
        var data = [{"answer":'[{"no":"1","answer":"true"},{"no":"2","answer":"false"},{"no":"3","answer":"true"},{"no":"4","answer":"true"}]', "created_at":"2013-05-13T13:10:23Z", "id":30, "quiz_session_id":19}, {"answer":'[{"no":"1","answer":"true"},{"no":"2","answer":"false"},{"no":"3","answer":"false"},{"no":"4","answer":"true"}]', "created_at":"2013-05-13T13:10:37Z", "id":31, "quiz_session_id":19}, {"answer":'[{"no":"1","answer":"true"},{"no":"2","answer":"true"},{"no":"3","answer":"false"},{"no":"4","answer":"false"}]', 
        "created_at":"2013-05-13T13:10:52Z", "id":32, "quiz_session_id":19}, {"answer":'[{"no":"1","answer":"true"},{"no":"2","answer":"false"},{"no":"3","answer":"true"},{"no":"4","answer":"true"}]', "created_at":"2013-05-13T13:11:09Z", "id":33, "quiz_session_id":19}, {"answer":'[{"no":"1","answer":"true"},{"no":"2","answer":"false"},{"no":"3","answer":"true"},{"no":"4","answer":"true"}]', "created_at":"2013-05-13T13:11:41Z", "id":34, "quiz_session_id":19}];
        if(typeof successCallback == "function") {
          setTimeout(function() {
            successCallback(data)
          }, 1E3)
        }
      }
    }
  };
  var closeQuizSession = function(quizSessionId, name, successCallback, failCallback) {
    if(V.Configuration.getConfiguration()["mode"] == "vish") {
      var send_type = "GET";
      var params = {"id":quizSessionId, "authenticity_token":V.User.getToken()};
      if(typeof name == "string") {
        params["name"] = name
      }
      $.ajax({type:send_type, url:"http://" + window.location.host + "/quiz_sessions/" + quizSessionId + "/close", data:params, success:function(data) {
        if(typeof successCallback == "function") {
          successCallback(data)
        }
      }, error:function(error) {
        if(typeof failCallback == "function") {
          failCallback(error)
        }
      }})
    }else {
      if(V.Configuration.getConfiguration()["mode"] == "noserver") {
        var data = {"processed":"true"};
        if(typeof successCallback == "function") {
          setTimeout(function() {
            successCallback(data)
          }, 1E3)
        }
      }
    }
  };
  return{init:init, startQuizSession:startQuizSession, closeQuizSession:closeQuizSession, sendAnwers:sendAnwers, getResults:getResults}
}(VISH, jQuery);
VISH.Events.Mobile = function(V, $, undefined) {
  var PM_TOUCH_SENSITIVITY = 20;
  var PM_TOUCH_DESVIATION = 60;
  var MINIMUM_ZOOM_TO_ENABLE_SCROLL = 1.2;
  var PM_TOUCH_SENSITIVITY_FOR_PAGER_FALLBACK = 15;
  var LONG_TOUCH_DURATION = 1E3;
  var bindedEventListeners = false;
  var init = function() {
    var device = V.Status.getDevice();
    var isIphoneAndSafari = device.iPhone && device.browser.name === V.Constant.SAFARI;
    if(isIphoneAndSafari) {
      _simpleClick = _simpleClickForIphoneAndSafari
    }
    if(device.tablet) {
      _longClick = _longClickForTablets
    }
    if(!isIphoneAndSafari && !device.tablet) {
      _checkClickTouches = function() {
        return false
      }
    }
  };
  var bindViewerMobileEventListeners = function() {
    if(bindedEventListeners) {
      return
    }else {
      bindedEventListeners = true
    }
    $(document).bind("touchstart", handleTouchStart);
    window.addEventListener("load", function() {
      _hideAddressBar()
    });
    $(window).on("orientationchange", function() {
      _hideAddressBar();
      $(window).trigger("resize")
    });
    document.body.addEventListener("touchmove", handleTouchMove, true);
    document.body.addEventListener("touchend", handleTouchEnd, true);
    document.body.addEventListener("touchcancel", handleTouchCancel, true)
  };
  var unbindViewerMobileEventListeners = function() {
    if(!bindedEventListeners) {
      return
    }else {
      bindedEventListeners = false
    }
    $(document).unbind("touchstart", handleTouchStart);
    window.removeEventListener("load", function() {
      _hideAddressBar()
    });
    $(window).off("orientationchange", function() {
      _hideAddressBar();
      window.onresize()
    });
    document.body.removeEventListener("touchmove", handleTouchMove, true);
    document.body.removeEventListener("touchend", handleTouchEnd, true)
  };
  var touchStartX = 0;
  var touchStartY = 0;
  var touchCX = 0;
  var touchCY = 0;
  var touchesLength = 0;
  var touchStartTime = 0;
  var handleTouchStart = function(event) {
    _resetTouchVars();
    var touches = _getTouches(event);
    touchesLength = touches.length;
    if(touchesLength === 1) {
      touchStartX = touches[0].pageX;
      touchStartY = touches[0].pageY
    }
    touchStartTime = (new Date).getTime()
  };
  var _resetTouchVars = function() {
    touchStartX = -1;
    touchStartY = -1;
    touchCX = -1;
    touchCY = -1;
    touchesLength = -1;
    touchStart = -1
  };
  var handleTouchMove = function(event) {
    var touches = _getTouches(event);
    if(touches.length === 1) {
      touchCX = touches[0].pageX;
      touchCY = touches[0].pageY;
      var zoom = document.documentElement.clientWidth / window.innerWidth;
      if(zoom <= MINIMUM_ZOOM_TO_ENABLE_SCROLL) {
        event.preventDefault();
        return
      }
    }
  };
  var handleTouchEnd = function(event) {
    if(touchesLength === 1) {
      if(_checkClickTouches(event)) {
        return
      }
      if(_checkAdvanceSlidesTouches(event)) {
        return
      }
      if(_checkOtherTouches(event)) {
        return
      }
    }
    _resetTouchVars()
  };
  var handleTouchCancel = function() {
    _resetTouchVars()
  };
  var _hideAddressBar = function() {
  };
  var _checkClickTouches = function(event) {
    var click = touchCX == -1 && touchCY == -1;
    if(click) {
      var duration = (new Date).getTime() - touchStartTime;
      if(duration < LONG_TOUCH_DURATION) {
        _simpleClick(event)
      }else {
        _longClick(event)
      }
    }
    return click
  };
  var _simpleClick = function(event) {
    return true
  };
  var _simpleClickForIphoneAndSafari = function(event) {
    if($(event.target).hasClass("fc_poi")) {
      event.preventDefault();
      var poiId = event.target.id;
      V.Events.onFlashcardPoiClicked(poiId)
    }else {
      if($(event.target).hasClass("close_subslide")) {
        event.preventDefault();
        V.Events.onFlashcardCloseSlideClicked(event)
      }
    }
    return true
  };
  var _longClick = function(event) {
    return true
  };
  var _longClickForTablets = function(event) {
    if(_checkPaginatorClick(event.target.id)) {
      event.preventDefault();
      event.stopPropagation();
      _applyPaginatorClick(event.target.id)
    }
  };
  var _checkAdvanceSlidesTouches = function(event) {
    var touchDX = touchCX - touchStartX;
    var touchDY = touchCY - touchStartY;
    var absTouchDX = Math.abs(touchDX);
    var absTouchDY = Math.abs(touchDY);
    var move_slide = absTouchDX > PM_TOUCH_SENSITIVITY && absTouchDY < PM_TOUCH_DESVIATION;
    move_slide = move_slide && touchCX !== -1;
    if(move_slide) {
      event.preventDefault();
      var zoom = document.documentElement.clientWidth / window.innerWidth;
      if(zoom > MINIMUM_ZOOM_TO_ENABLE_SCROLL) {
        return
      }
      var subslide = V.Slides.getCurrentSubSlide();
      if(subslide !== null) {
        V.Slides.closeSubslide($(subslide).attr("id"))
      }
      if(touchDX > 0) {
        V.Slides.backwardOneSlide()
      }else {
        V.Slides.forwardOneSlide()
      }
    }
    return move_slide
  };
  var _checkOtherTouches = function(event) {
    return false
  };
  var _checkOtherTouchesForTablets = function(event) {
    var id = event.target.id;
    if(_checkPaginatorClick(id)) {
      if((absTouchDX + absTouchDY) / 2 < PM_TOUCH_SENSITIVITY_FOR_PAGER_FALLBACK) {
        event.preventDefault();
        _applyPaginatorClick(id);
        return true
      }
    }
  };
  var _checkPaginatorClick = function(targetId) {
    return targetId === "page-switcher-end" || targetId === "page-switcher-start"
  };
  var _applyPaginatorClick = function(targetId) {
    if(targetId === "page-switcher-end") {
      $("#page-switcher-end").trigger("click")
    }else {
      if(targetId === "page-switcher-start") {
        $("#page-switcher-start").trigger("click")
      }
    }
  };
  var _getTouches = function(event) {
    if(event.touches) {
      return event.touches
    }else {
      if(event.originalEvent.touches) {
        return event.originalEvent.touches
      }else {
        return null
      }
    }
  };
  return{init:init, bindViewerMobileEventListeners:bindViewerMobileEventListeners, unbindViewerMobileEventListeners:unbindViewerMobileEventListeners}
}(VISH, jQuery);
VISH.Recommendations = function(V, $, undefined) {
  var url_to_get_recommendations;
  var user_id;
  var presentation_id;
  var generated;
  var init = function(options) {
    user_id = V.User.getId();
    presentation_id = V.SlideManager.getCurrentPresentation().id;
    if(options && options["urlToGetRecommendations"]) {
      url_to_get_recommendations = options["urlToGetRecommendations"]
    }
    generated = false;
    $("#fancyRec").fancybox({"type":"inline", "autoDimensions":false, "scrolling":"no", "autoScale":false, "width":"100%", "height":"100%", "padding":0, "overlayOpacity":0, "onComplete":function(data) {
      $("#fancybox-outer").css("background", "rgba(0,0,0,.7)");
      $("#fancybox-wrap").css("margin-top", "0px")
    }, "onClosed":function(data) {
      $("#fancybox-outer").css("background", "white");
      $("#fancybox-wrap").css("margin-top", "-14px")
    }})
  };
  var generateFancybox = function() {
    if(!generated) {
      if(url_to_get_recommendations !== undefined) {
        var params_to_send = {user_id:user_id, excursion_id:presentation_id, quantity:9};
        $.ajax({type:"GET", url:url_to_get_recommendations, data:params_to_send, success:function(data) {
          _fillFancyboxWithData(data)
        }})
      }else {
        _fillFancyboxWithData(VISH.Samples.API.recommendationList)
      }
      generated = true
    }
  };
  var _fillFancyboxWithData = function(data) {
    if(!data || data.length === 0) {
      return
    }
    var ex;
    var result = "";
    for(var i = data.length - 1;i >= 0;i--) {
      ex = data[i];
      if(V.Status.getIsEmbed()) {
        result += '<a href="' + ex.url + '.full">'
      }
      result += '<div class="rec-excursion" id="recom-' + ex.id + '" number="' + ex.id + '">' + '<ul class="rec-thumbnail">' + '<li class="rec-img-excursion">' + '<img src="' + ex.image + '">' + '<div class="rec-number_pages">' + ex.number_of_slides + "</div>" + "</li>" + '<li class="rec-info-excursion">' + '<div class="rec-title-excursion">' + ex.title + "</div>" + '<div class="rec-by">by <span class="rec-name">' + ex.author + "</span></div>" + '<span class="rec-visits">' + ex.views + '</span> <span class="rec-views">views</span>' + 
      '<div class="rec-likes">' + ex.favourites + '<img class="rec-menu_icon" src="http://vishub.org/assets/icons/star-on10.png"></div>' + "</li>" + "</ul>" + "</div>";
      if(V.Status.getIsEmbed()) {
        result += "</a>"
      }
    }
    $("#fancy_recommendations .rec-grid").html(result);
    if(!V.Status.getIsEmbed()) {
      for(var i = data.length - 1;i >= 0;i--) {
        $("#recom-" + data[i].id).click(function(my_event) {
          V.Utils.sendParentToURL(data[$(my_event.toElement).closest(".rec-excursion").attr("number")].url)
        })
      }
    }
  };
  var showFancybox = function() {
    if(V.Utils.getOptions() && V.Utils.getOptions().preview) {
      return
    }
    $("#fancyRec").trigger("click")
  };
  return{init:init, generateFancybox:generateFancybox, showFancybox:showFancybox}
}(VISH, jQuery);

