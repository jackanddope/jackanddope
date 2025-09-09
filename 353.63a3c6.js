/*! For license information please see 353.63a3c6.js.LICENSE.txt */
(self.webpackChunk_roots_bud_sage_sage = self.webpackChunk_roots_bud_sage_sage || []).push([[353], {
    "../node_modules/@unseenco/taxi/src/taxi.js": (t, e, r) => {
        "use strict";
        function i() {
            if (!(this instanceof i))
                return new i;
            this.size = 0,
            this.uid = 0,
            this.selectors = [],
            this.selectorObjects = {},
            this.indexes = Object.create(this.indexes),
            this.activeIndexes = []
        }
        r.d(e, {
            QY: () => D,
            Th: () => M,
            uT: () => w
        });
        var n = window.document.documentElement
          , s = n.matches || n.webkitMatchesSelector || n.mozMatchesSelector || n.oMatchesSelector || n.msMatchesSelector;
        i.prototype.matchesSelector = function(t, e) {
            return s.call(t, e)
        }
        ,
        i.prototype.querySelectorAll = function(t, e) {
            return e.querySelectorAll(t)
        }
        ,
        i.prototype.indexes = [];
        var a = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
        i.prototype.indexes.push({
            name: "ID",
            selector: function(t) {
                var e;
                if (e = t.match(a))
                    return e[0].slice(1)
            },
            element: function(t) {
                if (t.id)
                    return [t.id]
            }
        });
        var o = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
        i.prototype.indexes.push({
            name: "CLASS",
            selector: function(t) {
                var e;
                if (e = t.match(o))
                    return e[0].slice(1)
            },
            element: function(t) {
                var e = t.className;
                if (e) {
                    if ("string" == typeof e)
                        return e.split(/\s/);
                    if ("object" == typeof e && "baseVal"in e)
                        return e.baseVal.split(/\s/)
                }
            }
        });
        var h, l = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
        i.prototype.indexes.push({
            name: "TAG",
            selector: function(t) {
                var e;
                if (e = t.match(l))
                    return e[0].toUpperCase()
            },
            element: function(t) {
                return [t.nodeName.toUpperCase()]
            }
        }),
        i.prototype.indexes.default = {
            name: "UNIVERSAL",
            selector: function() {
                return !0
            },
            element: function() {
                return [!0]
            }
        },
        h = "function" == typeof window.Map ? window.Map : function() {
            function t() {
                this.map = {}
            }
            return t.prototype.get = function(t) {
                return this.map[t + " "]
            }
            ,
            t.prototype.set = function(t, e) {
                this.map[t + " "] = e
            }
            ,
            t
        }();
        var p = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
        function c(t, e) {
            var r, i, n, s, a, o, h = (t = t.slice(0).concat(t.default)).length, l = e, c = [];
            do {
                if (p.exec(""),
                (n = p.exec(l)) && (l = n[3],
                n[2] || !l))
                    for (r = 0; r < h; r++)
                        if (a = (o = t[r]).selector(n[1])) {
                            for (i = c.length,
                            s = !1; i--; )
                                if (c[i].index === o && c[i].key === a) {
                                    s = !0;
                                    break
                                }
                            s || c.push({
                                index: o,
                                key: a
                            });
                            break
                        }
            } while (n);
            return c
        }
        function f(t, e) {
            var r, i, n;
            for (r = 0,
            i = t.length; r < i; r++)
                if (n = t[r],
                e.isPrototypeOf(n))
                    return n
        }
        function u(t, e) {
            return t.id - e.id
        }
        i.prototype.logDefaultIndexUsed = function() {}
        ,
        i.prototype.add = function(t, e) {
            var r, i, n, s, a, o, l, p, u = this.activeIndexes, d = this.selectors, m = this.selectorObjects;
            if ("string" == typeof t) {
                for (m[(r = {
                    id: this.uid++,
                    selector: t,
                    data: e
                }).id] = r,
                l = c(this.indexes, t),
                i = 0; i < l.length; i++)
                    s = (p = l[i]).key,
                    (a = f(u, n = p.index)) || ((a = Object.create(n)).map = new h,
                    u.push(a)),
                    n === this.indexes.default && this.logDefaultIndexUsed(r),
                    (o = a.map.get(s)) || (o = [],
                    a.map.set(s, o)),
                    o.push(r);
                this.size++,
                d.push(t)
            }
        }
        ,
        i.prototype.remove = function(t, e) {
            if ("string" == typeof t) {
                var r, i, n, s, a, o, h, l, p = this.activeIndexes, f = this.selectors = [], u = this.selectorObjects, d = {}, m = 1 === arguments.length;
                for (r = c(this.indexes, t),
                n = 0; n < r.length; n++)
                    for (i = r[n],
                    s = p.length; s--; )
                        if (o = p[s],
                        i.index.isPrototypeOf(o)) {
                            if (h = o.map.get(i.key))
                                for (a = h.length; a--; )
                                    (l = h[a]).selector !== t || !m && l.data !== e || (h.splice(a, 1),
                                    d[l.id] = !0);
                            break
                        }
                for (n in d)
                    delete u[n],
                    this.size--;
                for (n in u)
                    f.push(u[n].selector)
            }
        }
        ,
        i.prototype.queryAll = function(t) {
            if (!this.selectors.length)
                return [];
            var e, r, i, n, s, a, o, h, l = {}, p = [], c = this.querySelectorAll(this.selectors.join(", "), t);
            for (e = 0,
            i = c.length; e < i; e++)
                for (s = c[e],
                r = 0,
                n = (a = this.matches(s)).length; r < n; r++)
                    l[(h = a[r]).id] ? o = l[h.id] : (o = {
                        id: h.id,
                        selector: h.selector,
                        data: h.data,
                        elements: []
                    },
                    l[h.id] = o,
                    p.push(o)),
                    o.elements.push(s);
            return p.sort(u)
        }
        ,
        i.prototype.matches = function(t) {
            if (!t)
                return [];
            var e, r, i, n, s, a, o, h, l, p, c, f = this.activeIndexes, d = {}, m = [];
            for (e = 0,
            n = f.length; e < n; e++)
                if (h = (o = f[e]).element(t))
                    for (r = 0,
                    s = h.length; r < s; r++)
                        if (l = o.map.get(h[r]))
                            for (i = 0,
                            a = l.length; i < a; i++)
                                !d[c = (p = l[i]).id] && this.matchesSelector(t, p.selector) && (d[c] = !0,
                                m.push(p));
            return m.sort(u)
        }
        ;
        const d = {}
          , m = {}
          , g = ["mouseenter", "mouseleave", "pointerenter", "pointerleave", "blur", "focus"];
        function y(t) {
            void 0 === m[t] && (m[t] = [])
        }
        function v(t) {
            return "string" == typeof t ? document.querySelectorAll(t) : t
        }
        function _(t) {
            let e = function(t, e) {
                const r = [];
                let i = e;
                do {
                    if (1 !== i.nodeType)
                        break;
                    const e = t.matches(i);
                    e.length && r.push({
                        delegatedTarget: i,
                        stack: e
                    })
                } while (i = i.parentElement);
                return r
            }(d[t.type], t.target);
            if (e.length)
                for (let r = 0; r < e.length; r++)
                    for (let i = 0; i < e[r].stack.length; i++)
                        -1 !== g.indexOf(t.type) ? (b(t, e[r].delegatedTarget),
                        t.target === e[r].delegatedTarget && e[r].stack[i].data(t)) : (b(t, e[r].delegatedTarget),
                        e[r].stack[i].data(t))
        }
        function b(t, e) {
            Object.defineProperty(t, "currentTarget", {
                configurable: !0,
                enumerable: !0,
                get: () => e
            })
        }
        function x(t) {
            return JSON.parse(JSON.stringify(t))
        }
        var E = new class {
            bindAll(t, e) {
                e || (e = Object.getOwnPropertyNames(Object.getPrototypeOf(t)));
                for (let r = 0; r < e.length; r++)
                    t[e[r]] = t[e[r]].bind(t)
            }
            on(t, e, r, i) {
                const n = t.split(" ");
                for (let t = 0; t < n.length; t++)
                    if ("function" != typeof e || void 0 !== r)
                        if (e.nodeType && 1 === e.nodeType || e === window || e === document)
                            e.addEventListener(n[t], r, i);
                        else {
                            e = v(e);
                            for (let s = 0; s < e.length; s++)
                                e[s].addEventListener(n[t], r, i)
                        }
                    else
                        y(n[t]),
                        m[n[t]].push(e)
            }
            delegate(t, e, r) {
                const n = t.split(" ");
                for (let t = 0; t < n.length; t++) {
                    let s = d[n[t]];
                    void 0 === s && (s = new i,
                    d[n[t]] = s,
                    -1 !== g.indexOf(n[t]) ? document.addEventListener(n[t], _, !0) : document.addEventListener(n[t], _)),
                    s.add(e, r)
                }
            }
            off(t, e, r, i) {
                const n = t.split(" ");
                for (let t = 0; t < n.length; t++) {
                    if (void 0 === e) {
                        m[n[t]] = [];
                        continue
                    }
                    if ("function" == typeof e) {
                        y(n[t]);
                        for (let r = 0; r < m[n[t]].length; r++)
                            m[n[t]][r] === e && m[n[t]].splice(r, 1);
                        continue
                    }
                    const s = d[n[t]];
                    if (void 0 === s || (s.remove(e, r),
                    0 !== s.size))
                        if (void 0 === e.removeEventListener) {
                            e = v(e);
                            for (let s = 0; s < e.length; s++)
                                e[s].removeEventListener(n[t], r, i)
                        } else
                            e.removeEventListener(n[t], r, i);
                    else
                        delete d[n[t]],
                        -1 !== g.indexOf(n[t]) ? document.removeEventListener(n[t], _, !0) : document.removeEventListener(n[t], _)
                }
            }
            emit(t, ...e) {
                !function(t, e) {
                    if (m[t])
                        for (let r = 0; r < m[t].length; r++)
                            m[t][r](...e)
                }(t, e)
            }
            debugDelegated() {
                return x(d)
            }
            debugBus() {
                return x(m)
            }
        }
        ;
        const S = new DOMParser;
        function P(t) {
            const e = new URL(t,window.location.origin);
            let r = null;
            return e.hash.length && (r = t.replace(e.hash, "")),
            {
                hasHash: e.hash.length > 0,
                pathname: e.pathname,
                host: e.host,
                raw: t,
                href: r || e.href
            }
        }
        function C(t) {
            "HEAD" === t.parentNode.tagName ? document.head.appendChild(T(t)) : document.body.appendChild(T(t))
        }
        function T(t) {
            const e = document.createElement("SCRIPT");
            for (let r = 0; r < t.attributes.length; r++) {
                const i = t.attributes[r];
                e.setAttribute(i.nodeName, i.nodeValue)
            }
            return t.innerHTML && (e.innerHTML = t.innerHTML),
            e
        }
        class w {
            constructor({wrapper: t}) {
                this.wrapper = t
            }
            leave(t) {
                return new Promise((e => {
                    this.onLeave({
                        ...t,
                        done: e
                    })
                }
                ))
            }
            enter(t) {
                return new Promise((e => {
                    this.onEnter({
                        ...t,
                        done: e
                    })
                }
                ))
            }
            onLeave({from: t, trigger: e, done: r}) {
                r()
            }
            onEnter({to: t, trigger: e, done: r}) {
                r()
            }
        }
        class M {
            constructor({content: t, page: e, title: r, wrapper: i}) {
                this._contentString = t.outerHTML,
                this._DOM = null,
                this.page = e,
                this.title = r,
                this.wrapper = i,
                this.content = this.wrapper.lastElementChild
            }
            onEnter() {}
            onEnterCompleted() {}
            onLeave() {}
            onLeaveCompleted() {}
            initialLoad() {
                this.onEnter(),
                this.onEnterCompleted()
            }
            update() {
                document.title = this.title,
                this.wrapper.appendChild(this._DOM.firstElementChild),
                this.content = this.wrapper.lastElementChild,
                this._DOM = null
            }
            createDom() {
                this._DOM || (this._DOM = document.createElement("div"),
                this._DOM.innerHTML = this._contentString)
            }
            remove() {
                this.wrapper.firstElementChild.remove()
            }
            enter(t, e) {
                return new Promise((r => {
                    this.onEnter(),
                    t.enter({
                        trigger: e,
                        to: this.content
                    }).then(( () => {
                        this.onEnterCompleted(),
                        r()
                    }
                    ))
                }
                ))
            }
            leave(t, e, r) {
                return new Promise((i => {
                    this.onLeave(),
                    t.leave({
                        trigger: e,
                        from: this.content
                    }).then(( () => {
                        r && this.remove(),
                        this.onLeaveCompleted(),
                        i()
                    }
                    ))
                }
                ))
            }
        }
        class A {
            data = new Map;
            regexCache = new Map;
            add(t, e, r) {
                this.data.has(t) || (this.data.set(t, new Map),
                this.regexCache.set(t, new RegExp(`^${t}$`))),
                this.data.get(t).set(e, r),
                this.regexCache.set(e, new RegExp(`^${e}$`))
            }
            findMatch(t, e) {
                for (const [r,i] of this.data)
                    if (t.pathname.match(this.regexCache.get(r))) {
                        for (const [t,r] of i)
                            if (e.pathname.match(this.regexCache.get(t)))
                                return r;
                        break
                    }
                return null
            }
        }
        const k = "A transition is currently in progress";
        class D {
            isTransitioning = !1;
            currentCacheEntry = null;
            cache = new Map;
            constructor(t={}) {
                const {links: e="a:not([target]):not([href^=\\#]):not([data-taxi-ignore])", removeOldContent: r=!0, allowInterruption: i=!1, bypassCache: n=!1, renderers: s={
                    default: M
                }, transitions: a={
                    default: w
                }, reloadJsFilter: o=(t => void 0 !== t.dataset.taxiReload)} = t;
                this.renderers = s,
                this.transitions = a,
                this.defaultRenderer = this.renderers.default || M,
                this.defaultTransition = this.transitions.default || w,
                this.wrapper = document.querySelector("[data-taxi]"),
                this.reloadJsFilter = o,
                this.removeOldContent = r,
                this.allowInterruption = i,
                this.bypassCache = n,
                this.cache = new Map,
                this.isPopping = !1,
                this.attachEvents(e),
                this.currentLocation = P(window.location.href),
                this.cache.set(this.currentLocation.href, this.createCacheEntry(document.cloneNode(!0))),
                this.currentCacheEntry = this.cache.get(this.currentLocation.href),
                this.currentCacheEntry.renderer.initialLoad()
            }
            setDefaultRenderer(t) {
                this.defaultRenderer = this.renderers[t]
            }
            setDefaultTransition(t) {
                this.defaultTransition = this.transitions[t]
            }
            addRoute(t, e, r) {
                this.router || (this.router = new A),
                this.router.add(t, e, r)
            }
            preload(t, e=!1) {
                return t = P(t).href,
                this.cache.has(t) ? Promise.resolve() : this.fetch(t, !1).then((async r => {
                    this.cache.set(t, this.createCacheEntry(r)),
                    e && this.cache.get(t).renderer.createDom()
                }
                ))
            }
            updateCache(t) {
                const e = P(t || window.location.href).href;
                this.cache.has(e) && this.cache.delete(e),
                this.cache.set(e, this.createCacheEntry(document.cloneNode(!0)))
            }
            clearCache(t) {
                const e = P(t || window.location.href).href;
                this.cache.has(e) && this.cache.delete(e)
            }
            navigateTo(t, e=!1, r=!1) {
                return new Promise(( (i, n) => {
                    if (!this.allowInterruption && this.isTransitioning)
                        return void n(new Error(k));
                    this.isTransitioning = !0,
                    this.isPopping = !0,
                    this.targetLocation = P(t),
                    this.popTarget = window.location.href;
                    const s = new (this.chooseTransition(e))({
                        wrapper: this.wrapper
                    });
                    let a;
                    if (this.bypassCache || !this.cache.has(this.targetLocation.href) || this.cache.get(this.targetLocation.href).skipCache) {
                        const t = this.fetch(this.targetLocation.raw).then((t => {
                            this.cache.set(this.targetLocation.href, this.createCacheEntry(t)),
                            this.cache.get(this.targetLocation.href).renderer.createDom()
                        }
                        ));
                        a = this.beforeFetch(this.targetLocation, s, r).then((async () => t.then((async t => await this.afterFetch(this.targetLocation, s, this.cache.get(this.targetLocation.href), r)))))
                    } else
                        this.cache.get(this.targetLocation.href).renderer.createDom(),
                        a = this.beforeFetch(this.targetLocation, s, r).then((async () => await this.afterFetch(this.targetLocation, s, this.cache.get(this.targetLocation.href), r)));
                    a.then(( () => {
                        i()
                    }
                    ))
                }
                ))
            }
            on(t, e) {
                E.on(t, e)
            }
            off(t, e) {
                E.off(t, e)
            }
            beforeFetch(t, e, r) {
                return E.emit("NAVIGATE_OUT", {
                    from: this.currentCacheEntry,
                    trigger: r
                }),
                new Promise((i => {
                    this.currentCacheEntry.renderer.leave(e, r, this.removeOldContent).then(( () => {
                        "popstate" !== r && window.history.pushState({}, "", t.raw),
                        i()
                    }
                    ))
                }
                ))
            }
            afterFetch(t, e, r, i) {
                return this.currentLocation = t,
                this.popTarget = this.currentLocation.href,
                new Promise((t => {
                    r.renderer.update(),
                    E.emit("NAVIGATE_IN", {
                        from: this.currentCacheEntry,
                        to: r,
                        trigger: i
                    }),
                    this.reloadJsFilter && this.loadScripts(r.scripts),
                    r.renderer.enter(e, i).then(( () => {
                        E.emit("NAVIGATE_END", {
                            from: this.currentCacheEntry,
                            to: r,
                            trigger: i
                        }),
                        this.currentCacheEntry = r,
                        this.isTransitioning = !1,
                        this.isPopping = !1,
                        t()
                    }
                    ))
                }
                ))
            }
            loadScripts(t) {
                const e = [...t]
                  , r = Array.from(document.querySelectorAll("script")).filter(this.reloadJsFilter);
                for (let t = 0; t < r.length; t++)
                    for (let n = 0; n < e.length; n++)
                        if (r[t].outerHTML === e[n].outerHTML) {
                            (i = r[t]).parentNode.replaceChild(T(i), i),
                            e.splice(n, 1);
                            break
                        }
                var i;
                for (const t of e)
                    C(t)
            }
            attachEvents(t) {
                E.delegate("click", t, this.onClick),
                E.on("popstate", window, this.onPopstate)
            }
            onClick = t => {
                if (!t.metaKey && !t.ctrlKey) {
                    const e = P(t.currentTarget.href);
                    if (this.currentLocation = P(window.location.href),
                    this.currentLocation.host !== e.host)
                        return;
                    if (this.currentLocation.href !== e.href || this.currentLocation.hasHash && !e.hasHash)
                        return t.preventDefault(),
                        void this.navigateTo(e.raw, t.currentTarget.dataset.transition || !1, t.currentTarget).catch((t => console.warn(t)));
                    this.currentLocation.hasHash || e.hasHash || t.preventDefault()
                }
            }
            ;
            onPopstate = () => !(window.location.pathname === this.currentLocation.pathname && !this.isPopping) && (this.allowInterruption || !this.isTransitioning && !this.isPopping ? (this.isPopping || (this.popTarget = window.location.href),
            this.isPopping = !0,
            void this.navigateTo(window.location.href, !1, "popstate")) : (window.history.pushState({}, "", this.popTarget),
            console.warn(k),
            !1));
            fetch(t, e=!0) {
                return new Promise(( (r, i) => {
                    fetch(t, {
                        mode: "same-origin",
                        method: "GET",
                        headers: {
                            "X-Requested-With": "Taxi"
                        },
                        credentials: "same-origin"
                    }).then((r => (r.ok || (i("Taxi encountered a non 2xx HTTP status code"),
                    e && (window.location.href = t)),
                    r.text()))).then((t => {
                        var e;
                        r("string" == typeof (e = t) ? S.parseFromString(e, "text/html") : e)
                    }
                    )).catch((r => {
                        i(r),
                        e && (window.location.href = t)
                    }
                    ))
                }
                ))
            }
            chooseTransition(t) {
                if (t)
                    return this.transitions[t];
                const e = this.router?.findMatch(this.currentLocation, this.targetLocation);
                return e ? this.transitions[e] : this.defaultTransition
            }
            createCacheEntry(t) {
                const e = t.querySelector("[data-taxi-view]")
                  , r = e.dataset.taxiView.length ? this.renderers[e.dataset.taxiView] : this.defaultRenderer;
                return r || console.warn(`The Renderer "${e.dataset.taxiView}" was set in the data-taxi-view of the requested page, but not registered in Taxi.`),
                {
                    page: t,
                    content: e,
                    skipCache: e.hasAttribute("data-taxi-nocache"),
                    scripts: this.reloadJsFilter ? Array.from(t.querySelectorAll("script")).filter(this.reloadJsFilter) : [],
                    title: t.title,
                    renderer: new r({
                        wrapper: this.wrapper,
                        title: t.title,
                        content: e,
                        page: t
                    })
                }
            }
        }
    }
    ,
    "../node_modules/gsap/CustomEase.js": (t, e, r) => {
        "use strict";
        r.d(e, {
            t: () => E
        });
        var i = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
          , n = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi
          , s = Math.PI / 180
          , a = (Math.PI,
        Math.sin)
          , o = Math.cos
          , h = Math.abs
          , l = Math.sqrt
          , p = (Math.atan2,
        function(t) {
            return "number" == typeof t
        }
        )
          , c = 1e5
          , f = function(t) {
            return Math.round(t * c) / c || 0
        };
        function u(t, e, r, i, n, p, c, f, u) {
            if (t !== f || e !== u) {
                r = h(r),
                i = h(i);
                var d = n % 360 * s
                  , m = o(d)
                  , g = a(d)
                  , y = Math.PI
                  , v = 2 * y
                  , _ = (t - f) / 2
                  , b = (e - u) / 2
                  , x = m * _ + g * b
                  , E = -g * _ + m * b
                  , S = x * x
                  , P = E * E
                  , C = S / (r * r) + P / (i * i);
                C > 1 && (r = l(C) * r,
                i = l(C) * i);
                var T = r * r
                  , w = i * i
                  , M = (T * w - T * P - w * S) / (T * P + w * S);
                M < 0 && (M = 0);
                var A = (p === c ? -1 : 1) * l(M)
                  , k = A * (r * E / i)
                  , D = A * (-i * x / r)
                  , F = (t + f) / 2 + (m * k - g * D)
                  , I = (e + u) / 2 + (g * k + m * D)
                  , R = (x - k) / r
                  , L = (E - D) / i
                  , B = (-x - k) / r
                  , V = (-E - D) / i
                  , O = R * R + L * L
                  , z = (L < 0 ? -1 : 1) * Math.acos(R / l(O))
                  , N = (R * V - L * B < 0 ? -1 : 1) * Math.acos((R * B + L * V) / l(O * (B * B + V * V)));
                isNaN(N) && (N = y),
                !c && N > 0 ? N -= v : c && N < 0 && (N += v),
                z %= v,
                N %= v;
                var G, H = Math.ceil(h(N) / (v / 4)), q = [], j = N / H, W = 4 / 3 * a(j / 2) / (1 + o(j / 2)), Y = m * r, X = g * r, $ = g * -i, U = m * i;
                for (G = 0; G < H; G++)
                    x = o(n = z + G * j),
                    E = a(n),
                    R = o(n += j),
                    L = a(n),
                    q.push(x - W * E, E + W * x, R + W * L, L - W * R, R, L);
                for (G = 0; G < q.length; G += 2)
                    x = q[G],
                    E = q[G + 1],
                    q[G] = x * Y + E * $ + F,
                    q[G + 1] = x * X + E * U + I;
                return q[G - 2] = f,
                q[G - 1] = u,
                q
            }
        }
        var d, m, g = function() {
            return d || "undefined" != typeof window && (d = window.gsap) && d.registerPlugin && d
        }, y = function() {
            (d = g()) ? (d.registerEase("_CE", E.create),
            m = 1) : console.warn("Please gsap.registerPlugin(CustomEase)")
        }, v = function(t) {
            return ~~(1e3 * t + (t < 0 ? -.5 : .5)) / 1e3
        }, _ = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi, b = /[cLlsSaAhHvVtTqQ]/g, x = function t(e, r, i, n, s, a, o, h, l, p, c) {
            var f, u = (e + i) / 2, d = (r + n) / 2, m = (i + s) / 2, g = (n + a) / 2, y = (s + o) / 2, v = (a + h) / 2, _ = (u + m) / 2, b = (d + g) / 2, x = (m + y) / 2, E = (g + v) / 2, S = (_ + x) / 2, P = (b + E) / 2, C = o - e, T = h - r, w = Math.abs((i - o) * T - (n - h) * C), M = Math.abs((s - o) * T - (a - h) * C);
            return p || (p = [{
                x: e,
                y: r
            }, {
                x: o,
                y: h
            }],
            c = 1),
            p.splice(c || p.length - 1, 0, {
                x: S,
                y: P
            }),
            (w + M) * (w + M) > l * (C * C + T * T) && (f = p.length,
            t(e, r, u, d, _, b, S, P, l, p, c),
            t(S, P, x, E, y, v, o, h, l, p, c + 1 + (p.length - f))),
            p
        }, E = function() {
            function t(t, e, r) {
                m || y(),
                this.id = t,
                this.setData(e, r)
            }
            var e = t.prototype;
            return e.setData = function(t, e) {
                e = e || {};
                var r, s, a, o, l, p, c, f, m, g = (t = t || "0,0,1,1").match(_), y = 1, v = [], E = [], S = e.precision || 1, P = S <= 1;
                if (this.data = t,
                (b.test(t) || ~t.indexOf("M") && t.indexOf("C") < 0) && (g = function(t) {
                    var e, r, s, a, o, l, p, c, f, d, m, g, y, v, _, b = (t + "").replace(n, (function(t) {
                        var e = +t;
                        return e < 1e-4 && e > -1e-4 ? 0 : e
                    }
                    )).match(i) || [], x = [], E = 0, S = 0, P = 2 / 3, C = b.length, T = 0, w = "ERROR: malformed path: " + t, M = function(t, e, r, i) {
                        d = (r - t) / 3,
                        m = (i - e) / 3,
                        p.push(t + d, e + m, r - d, i - m, r, i)
                    };
                    if (!t || !isNaN(b[0]) || isNaN(b[1]))
                        return console.log(w),
                        x;
                    for (e = 0; e < C; e++)
                        if (y = o,
                        isNaN(b[e]) ? l = (o = b[e].toUpperCase()) !== b[e] : e--,
                        s = +b[e + 1],
                        a = +b[e + 2],
                        l && (s += E,
                        a += S),
                        e || (c = s,
                        f = a),
                        "M" === o)
                            p && (p.length < 8 ? x.length -= 1 : T += p.length),
                            E = c = s,
                            S = f = a,
                            p = [s, a],
                            x.push(p),
                            e += 2,
                            o = "L";
                        else if ("C" === o)
                            p || (p = [0, 0]),
                            l || (E = S = 0),
                            p.push(s, a, E + 1 * b[e + 3], S + 1 * b[e + 4], E += 1 * b[e + 5], S += 1 * b[e + 6]),
                            e += 6;
                        else if ("S" === o)
                            d = E,
                            m = S,
                            "C" !== y && "S" !== y || (d += E - p[p.length - 4],
                            m += S - p[p.length - 3]),
                            l || (E = S = 0),
                            p.push(d, m, s, a, E += 1 * b[e + 3], S += 1 * b[e + 4]),
                            e += 4;
                        else if ("Q" === o)
                            d = E + (s - E) * P,
                            m = S + (a - S) * P,
                            l || (E = S = 0),
                            E += 1 * b[e + 3],
                            S += 1 * b[e + 4],
                            p.push(d, m, E + (s - E) * P, S + (a - S) * P, E, S),
                            e += 4;
                        else if ("T" === o)
                            d = E - p[p.length - 4],
                            m = S - p[p.length - 3],
                            p.push(E + d, S + m, s + (E + 1.5 * d - s) * P, a + (S + 1.5 * m - a) * P, E = s, S = a),
                            e += 2;
                        else if ("H" === o)
                            M(E, S, E = s, S),
                            e += 1;
                        else if ("V" === o)
                            M(E, S, E, S = s + (l ? S - E : 0)),
                            e += 1;
                        else if ("L" === o || "Z" === o)
                            "Z" === o && (s = c,
                            a = f,
                            p.closed = !0),
                            ("L" === o || h(E - s) > .5 || h(S - a) > .5) && (M(E, S, s, a),
                            "L" === o && (e += 2)),
                            E = s,
                            S = a;
                        else if ("A" === o) {
                            if (v = b[e + 4],
                            _ = b[e + 5],
                            d = b[e + 6],
                            m = b[e + 7],
                            r = 7,
                            v.length > 1 && (v.length < 3 ? (m = d,
                            d = _,
                            r--) : (m = _,
                            d = v.substr(2),
                            r -= 2),
                            _ = v.charAt(1),
                            v = v.charAt(0)),
                            g = u(E, S, +b[e + 1], +b[e + 2], +b[e + 3], +v, +_, (l ? E : 0) + 1 * d, (l ? S : 0) + 1 * m),
                            e += r,
                            g)
                                for (r = 0; r < g.length; r++)
                                    p.push(g[r]);
                            E = p[p.length - 2],
                            S = p[p.length - 1]
                        } else
                            console.log(w);
                    return (e = p.length) < 6 ? (x.pop(),
                    e = 0) : p[0] === p[e - 2] && p[1] === p[e - 1] && (p.closed = !0),
                    x.totalPoints = T + e,
                    x
                }(t)[0]),
                4 === (r = g.length))
                    g.unshift(0, 0),
                    g.push(1, 1),
                    r = 8;
                else if ((r - 2) % 6)
                    throw "Invalid CustomEase";
                for (0 == +g[0] && 1 == +g[r - 2] || function(t, e, r) {
                    r || 0 === r || (r = Math.max(+t[t.length - 1], +t[1]));
                    var i, n = -1 * +t[0], s = -r, a = t.length, o = 1 / (+t[a - 2] + n), h = -e || (Math.abs(+t[a - 1] - +t[1]) < .01 * (+t[a - 2] - +t[0]) ? function(t) {
                        var e, r = t.length, i = 1e20;
                        for (e = 1; e < r; e += 6)
                            +t[e] < i && (i = +t[e]);
                        return i
                    }(t) + s : +t[a - 1] + s);
                    for (h = h ? 1 / h : -o,
                    i = 0; i < a; i += 2)
                        t[i] = (+t[i] + n) * o,
                        t[i + 1] = (+t[i + 1] + s) * h
                }(g, e.height, e.originY),
                this.segment = g,
                o = 2; o < r; o += 6)
                    s = {
                        x: +g[o - 2],
                        y: +g[o - 1]
                    },
                    a = {
                        x: +g[o + 4],
                        y: +g[o + 5]
                    },
                    v.push(s, a),
                    x(s.x, s.y, +g[o], +g[o + 1], +g[o + 2], +g[o + 3], a.x, a.y, 1 / (2e5 * S), v, v.length - 1);
                for (r = v.length,
                o = 0; o < r; o++)
                    c = v[o],
                    f = v[o - 1] || c,
                    (c.x > f.x || f.y !== c.y && f.x === c.x || c === f) && c.x <= 1 ? (f.cx = c.x - f.x,
                    f.cy = c.y - f.y,
                    f.n = c,
                    f.nx = c.x,
                    P && o > 1 && Math.abs(f.cy / f.cx - v[o - 2].cy / v[o - 2].cx) > 2 && (P = 0),
                    f.cx < y && (f.cx ? y = f.cx : (f.cx = .001,
                    o === r - 1 && (f.x -= .001,
                    y = Math.min(y, .001),
                    P = 0)))) : (v.splice(o--, 1),
                    r--);
                if (l = 1 / (r = 1 / y + 1 | 0),
                p = 0,
                c = v[0],
                P) {
                    for (o = 0; o < r; o++)
                        m = o * l,
                        c.nx < m && (c = v[++p]),
                        s = c.y + (m - c.x) / c.cx * c.cy,
                        E[o] = {
                            x: m,
                            cx: l,
                            y: s,
                            cy: 0,
                            nx: 9
                        },
                        o && (E[o - 1].cy = s - E[o - 1].y);
                    E[r - 1].cy = v[v.length - 1].y - s
                } else {
                    for (o = 0; o < r; o++)
                        c.nx < o * l && (c = v[++p]),
                        E[o] = c;
                    p < v.length - 1 && (E[o - 1] = v[v.length - 2])
                }
                return this.ease = function(t) {
                    var e = E[t * r | 0] || E[r - 1];
                    return e.nx < t && (e = e.n),
                    e.y + (t - e.x) / e.cx * e.cy
                }
                ,
                this.ease.custom = this,
                this.id && d && d.registerEase(this.id, this.ease),
                this
            }
            ,
            e.getSVGData = function(e) {
                return t.getSVGData(this, e)
            }
            ,
            t.create = function(e, r, i) {
                return new t(e,r,i).ease
            }
            ,
            t.register = function(t) {
                d = t,
                y()
            }
            ,
            t.get = function(t) {
                return d.parseEase(t)
            }
            ,
            t.getSVGData = function(e, r) {
                var i, n, s, a, o, h, l, c, u, m, g = (r = r || {}).width || 100, y = r.height || 100, _ = r.x || 0, b = (r.y || 0) + y, x = d.utils.toArray(r.path)[0];
                if (r.invert && (y = -y,
                b = 0),
                "string" == typeof e && (e = d.parseEase(e)),
                e.custom && (e = e.custom),
                e instanceof t)
                    i = function(t) {
                        p(t[0]) && (t = [t]);
                        var e, r, i, n, s = "", a = t.length;
                        for (r = 0; r < a; r++) {
                            for (n = t[r],
                            s += "M" + f(n[0]) + "," + f(n[1]) + " C",
                            e = n.length,
                            i = 2; i < e; i++)
                                s += f(n[i++]) + "," + f(n[i++]) + " " + f(n[i++]) + "," + f(n[i++]) + " " + f(n[i++]) + "," + f(n[i]) + " ";
                            n.closed && (s += "z")
                        }
                        return s
                    }(function(t, e, r, i, n, s, a) {
                        for (var o, h, l, p, c, f = t.length; --f > -1; )
                            for (h = (o = t[f]).length,
                            l = 0; l < h; l += 2)
                                p = o[l],
                                c = o[l + 1],
                                o[l] = p * e + 0 * c + s,
                                o[l + 1] = 0 * p + c * n + a;
                        return t._dirty = 1,
                        t
                    }([e.segment], g, 0, 0, -y, _, b));
                else {
                    for (i = [_, b],
                    a = 1 / (l = Math.max(5, 200 * (r.precision || 1))),
                    c = 5 / (l += 2),
                    u = v(_ + a * g),
                    n = ((m = v(b + e(a) * -y)) - b) / (u - _),
                    s = 2; s < l; s++)
                        o = v(_ + s * a * g),
                        h = v(b + e(s * a) * -y),
                        (Math.abs((h - m) / (o - u) - n) > c || s === l - 1) && (i.push(u, m),
                        n = (h - m) / (o - u)),
                        u = o,
                        m = h;
                    i = "M" + i.join(",")
                }
                return x && x.setAttribute("d", i),
                i
            }
            ,
            t
        }();
        g() && d.registerPlugin(E),
        E.version = "3.11.4"
    }
    ,
    "../node_modules/gsap/ScrollTrigger.js": (t, e, r) => {
        "use strict";
        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var i = e[r];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(t, i.key, i)
            }
        }
        r.d(e, {
            i: () => He
        });
        var n, s, a, o, h, l, p, c, f, u, d, m, g, y = function() {
            return n || "undefined" != typeof window && (n = window.gsap) && n.registerPlugin && n
        }, v = 1, _ = [], b = [], x = [], E = Date.now, S = function(t, e) {
            return e
        }, P = function(t, e) {
            return ~x.indexOf(t) && x[x.indexOf(t) + 1][e]
        }, C = function(t) {
            return !!~u.indexOf(t)
        }, T = function(t, e, r, i, n) {
            return t.addEventListener(e, r, {
                passive: !i,
                capture: !!n
            })
        }, w = function(t, e, r, i) {
            return t.removeEventListener(e, r, !!i)
        }, M = function() {
            return d && d.isPressed || b.cache++
        }, A = function(t, e) {
            var r = function r(i) {
                if (i || 0 === i) {
                    v && (a.history.scrollRestoration = "manual");
                    var n = d && d.isPressed;
                    i = r.v = Math.round(i) || (d && d.iOS ? 1 : 0),
                    t(i),
                    r.cacheID = b.cache,
                    n && S("ss", i)
                } else
                    (e || b.cache !== r.cacheID || S("ref")) && (r.cacheID = b.cache,
                    r.v = t());
                return r.v + r.offset
            };
            return r.offset = 0,
            t && r
        }, k = {
            s: "scrollLeft",
            p: "left",
            p2: "Left",
            os: "right",
            os2: "Right",
            d: "width",
            d2: "Width",
            a: "x",
            sc: A((function(t) {
                return arguments.length ? a.scrollTo(t, D.sc()) : a.pageXOffset || o.scrollLeft || h.scrollLeft || l.scrollLeft || 0
            }
            ))
        }, D = {
            s: "scrollTop",
            p: "top",
            p2: "Top",
            os: "bottom",
            os2: "Bottom",
            d: "height",
            d2: "Height",
            a: "y",
            op: k,
            sc: A((function(t) {
                return arguments.length ? a.scrollTo(k.sc(), t) : a.pageYOffset || o.scrollTop || h.scrollTop || l.scrollTop || 0
            }
            ))
        }, F = function(t) {
            return n.utils.toArray(t)[0] || ("string" == typeof t && !1 !== n.config().nullTargetWarn ? console.warn("Element not found:", t) : null)
        }, I = function(t, e) {
            var r = e.s
              , i = e.sc;
            C(t) && (t = o.scrollingElement || h);
            var s = b.indexOf(t)
              , a = i === D.sc ? 1 : 2;
            !~s && (s = b.push(t) - 1),
            b[s + a] || t.addEventListener("scroll", M);
            var l = b[s + a]
              , p = l || (b[s + a] = A(P(t, r), !0) || (C(t) ? i : A((function(e) {
                return arguments.length ? t[r] = e : t[r]
            }
            ))));
            return p.target = t,
            l || (p.smooth = "smooth" === n.getProperty(t, "scrollBehavior")),
            p
        }, R = function(t, e, r) {
            var i = t
              , n = t
              , s = E()
              , a = s
              , o = e || 50
              , h = Math.max(500, 3 * o)
              , l = function(t, e) {
                var h = E();
                e || h - s > o ? (n = i,
                i = t,
                a = s,
                s = h) : r ? i += t : i = n + (t - n) / (h - a) * (s - a)
            };
            return {
                update: l,
                reset: function() {
                    n = i = r ? 0 : i,
                    a = s = 0
                },
                getVelocity: function(t) {
                    var e = a
                      , o = n
                      , p = E();
                    return (t || 0 === t) && t !== i && l(t),
                    s === a || p - a > h ? 0 : (i + (r ? o : -o)) / ((r ? p : s) - e) * 1e3
                }
            }
        }, L = function(t, e) {
            return e && !t._gsapAllow && t.preventDefault(),
            t.changedTouches ? t.changedTouches[0] : t
        }, B = function(t) {
            var e = Math.max.apply(Math, t)
              , r = Math.min.apply(Math, t);
            return Math.abs(e) >= Math.abs(r) ? e : r
        }, V = function() {
            var t, e, r, i;
            (f = n.core.globals().ScrollTrigger) && f.core && (t = f.core,
            e = t.bridge || {},
            r = t._scrollers,
            i = t._proxies,
            r.push.apply(r, b),
            i.push.apply(i, x),
            b = r,
            x = i,
            S = function(t, r) {
                return e[t](r)
            }
            )
        }, O = function(t) {
            return (n = t || y()) && "undefined" != typeof document && document.body && (a = window,
            o = document,
            h = o.documentElement,
            l = o.body,
            u = [a, o, h, l],
            n.utils.clamp,
            g = n.core.context || function() {}
            ,
            c = "onpointerenter"in l ? "pointer" : "mouse",
            p = z.isTouch = a.matchMedia && a.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart"in a || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0,
            m = z.eventTypes = ("ontouchstart"in h ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown"in h ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","),
            setTimeout((function() {
                return v = 0
            }
            ), 500),
            V(),
            s = 1),
            s
        };
        k.op = D,
        b.cache = 0;
        var z = function() {
            function t(t) {
                this.init(t)
            }
            var e, r;
            return t.prototype.init = function(t) {
                s || O(n) || console.warn("Please gsap.registerPlugin(Observer)"),
                f || V();
                var e = t.tolerance
                  , r = t.dragMinimum
                  , i = t.type
                  , u = t.target
                  , y = t.lineHeight
                  , v = t.debounce
                  , b = t.preventDefault
                  , x = t.onStop
                  , S = t.onStopDelay
                  , P = t.ignore
                  , A = t.wheelSpeed
                  , z = t.event
                  , N = t.onDragStart
                  , G = t.onDragEnd
                  , H = t.onDrag
                  , q = t.onPress
                  , j = t.onRelease
                  , W = t.onRight
                  , Y = t.onLeft
                  , X = t.onUp
                  , $ = t.onDown
                  , U = t.onChangeX
                  , J = t.onChangeY
                  , Z = t.onChange
                  , K = t.onToggleX
                  , Q = t.onToggleY
                  , tt = t.onHover
                  , et = t.onHoverEnd
                  , rt = t.onMove
                  , it = t.ignoreCheck
                  , nt = t.isNormalizer
                  , st = t.onGestureStart
                  , at = t.onGestureEnd
                  , ot = t.onWheel
                  , ht = t.onEnable
                  , lt = t.onDisable
                  , pt = t.onClick
                  , ct = t.scrollSpeed
                  , ft = t.capture
                  , ut = t.allowClicks
                  , dt = t.lockAxis
                  , mt = t.onLockAxis;
                this.target = u = F(u) || h,
                this.vars = t,
                P && (P = n.utils.toArray(P)),
                e = e || 1e-9,
                r = r || 0,
                A = A || 1,
                ct = ct || 1,
                i = i || "wheel,touch,pointer",
                v = !1 !== v,
                y || (y = parseFloat(a.getComputedStyle(l).lineHeight) || 22);
                var gt, yt, vt, _t, bt, xt, Et, St = this, Pt = 0, Ct = 0, Tt = I(u, k), wt = I(u, D), Mt = Tt(), At = wt(), kt = ~i.indexOf("touch") && !~i.indexOf("pointer") && "pointerdown" === m[0], Dt = C(u), Ft = u.ownerDocument || o, It = [0, 0, 0], Rt = [0, 0, 0], Lt = 0, Bt = function() {
                    return Lt = E()
                }, Vt = function(t, e) {
                    return (St.event = t) && P && ~P.indexOf(t.target) || e && kt && "touch" !== t.pointerType || it && it(t, e)
                }, Ot = function() {
                    var t = St.deltaX = B(It)
                      , r = St.deltaY = B(Rt)
                      , i = Math.abs(t) >= e
                      , n = Math.abs(r) >= e;
                    Z && (i || n) && Z(St, t, r, It, Rt),
                    i && (W && St.deltaX > 0 && W(St),
                    Y && St.deltaX < 0 && Y(St),
                    U && U(St),
                    K && St.deltaX < 0 != Pt < 0 && K(St),
                    Pt = St.deltaX,
                    It[0] = It[1] = It[2] = 0),
                    n && ($ && St.deltaY > 0 && $(St),
                    X && St.deltaY < 0 && X(St),
                    J && J(St),
                    Q && St.deltaY < 0 != Ct < 0 && Q(St),
                    Ct = St.deltaY,
                    Rt[0] = Rt[1] = Rt[2] = 0),
                    (_t || vt) && (rt && rt(St),
                    vt && (H(St),
                    vt = !1),
                    _t = !1),
                    xt && !(xt = !1) && mt && mt(St),
                    bt && (ot(St),
                    bt = !1),
                    gt = 0
                }, zt = function(t, e, r) {
                    It[r] += t,
                    Rt[r] += e,
                    St._vx.update(t),
                    St._vy.update(e),
                    v ? gt || (gt = requestAnimationFrame(Ot)) : Ot()
                }, Nt = function(t, e) {
                    dt && !Et && (St.axis = Et = Math.abs(t) > Math.abs(e) ? "x" : "y",
                    xt = !0),
                    "y" !== Et && (It[2] += t,
                    St._vx.update(t, !0)),
                    "x" !== Et && (Rt[2] += e,
                    St._vy.update(e, !0)),
                    v ? gt || (gt = requestAnimationFrame(Ot)) : Ot()
                }, Gt = function(t) {
                    if (!Vt(t, 1)) {
                        var e = (t = L(t, b)).clientX
                          , i = t.clientY
                          , n = e - St.x
                          , s = i - St.y
                          , a = St.isDragging;
                        St.x = e,
                        St.y = i,
                        (a || Math.abs(St.startX - e) >= r || Math.abs(St.startY - i) >= r) && (H && (vt = !0),
                        a || (St.isDragging = !0),
                        Nt(n, s),
                        a || N && N(St))
                    }
                }, Ht = St.onPress = function(t) {
                    Vt(t, 1) || (St.axis = Et = null,
                    yt.pause(),
                    St.isPressed = !0,
                    t = L(t),
                    Pt = Ct = 0,
                    St.startX = St.x = t.clientX,
                    St.startY = St.y = t.clientY,
                    St._vx.reset(),
                    St._vy.reset(),
                    T(nt ? u : Ft, m[1], Gt, b, !0),
                    St.deltaX = St.deltaY = 0,
                    q && q(St))
                }
                , qt = function(t) {
                    if (!Vt(t, 1)) {
                        w(nt ? u : Ft, m[1], Gt, !0);
                        var e = !isNaN(St.y - St.startY)
                          , r = St.isDragging && (Math.abs(St.x - St.startX) > 3 || Math.abs(St.y - St.startY) > 3)
                          , i = L(t);
                        !r && e && (St._vx.reset(),
                        St._vy.reset(),
                        b && ut && n.delayedCall(.08, (function() {
                            if (E() - Lt > 300 && !t.defaultPrevented)
                                if (t.target.click)
                                    t.target.click();
                                else if (Ft.createEvent) {
                                    var e = Ft.createEvent("MouseEvents");
                                    e.initMouseEvent("click", !0, !0, a, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null),
                                    t.target.dispatchEvent(e)
                                }
                        }
                        ))),
                        St.isDragging = St.isGesturing = St.isPressed = !1,
                        x && !nt && yt.restart(!0),
                        G && r && G(St),
                        j && j(St, r)
                    }
                }, jt = function(t) {
                    return t.touches && t.touches.length > 1 && (St.isGesturing = !0) && st(t, St.isDragging)
                }, Wt = function() {
                    return (St.isGesturing = !1) || at(St)
                }, Yt = function(t) {
                    if (!Vt(t)) {
                        var e = Tt()
                          , r = wt();
                        zt((e - Mt) * ct, (r - At) * ct, 1),
                        Mt = e,
                        At = r,
                        x && yt.restart(!0)
                    }
                }, Xt = function(t) {
                    if (!Vt(t)) {
                        t = L(t, b),
                        ot && (bt = !0);
                        var e = (1 === t.deltaMode ? y : 2 === t.deltaMode ? a.innerHeight : 1) * A;
                        zt(t.deltaX * e, t.deltaY * e, 0),
                        x && !nt && yt.restart(!0)
                    }
                }, $t = function(t) {
                    if (!Vt(t)) {
                        var e = t.clientX
                          , r = t.clientY
                          , i = e - St.x
                          , n = r - St.y;
                        St.x = e,
                        St.y = r,
                        _t = !0,
                        (i || n) && Nt(i, n)
                    }
                }, Ut = function(t) {
                    St.event = t,
                    tt(St)
                }, Jt = function(t) {
                    St.event = t,
                    et(St)
                }, Zt = function(t) {
                    return Vt(t) || L(t, b) && pt(St)
                };
                yt = St._dc = n.delayedCall(S || .25, (function() {
                    St._vx.reset(),
                    St._vy.reset(),
                    yt.pause(),
                    x && x(St)
                }
                )).pause(),
                St.deltaX = St.deltaY = 0,
                St._vx = R(0, 50, !0),
                St._vy = R(0, 50, !0),
                St.scrollX = Tt,
                St.scrollY = wt,
                St.isDragging = St.isGesturing = St.isPressed = !1,
                g(this),
                St.enable = function(t) {
                    return St.isEnabled || (T(Dt ? Ft : u, "scroll", M),
                    i.indexOf("scroll") >= 0 && T(Dt ? Ft : u, "scroll", Yt, b, ft),
                    i.indexOf("wheel") >= 0 && T(u, "wheel", Xt, b, ft),
                    (i.indexOf("touch") >= 0 && p || i.indexOf("pointer") >= 0) && (T(u, m[0], Ht, b, ft),
                    T(Ft, m[2], qt),
                    T(Ft, m[3], qt),
                    ut && T(u, "click", Bt, !1, !0),
                    pt && T(u, "click", Zt),
                    st && T(Ft, "gesturestart", jt),
                    at && T(Ft, "gestureend", Wt),
                    tt && T(u, c + "enter", Ut),
                    et && T(u, c + "leave", Jt),
                    rt && T(u, c + "move", $t)),
                    St.isEnabled = !0,
                    t && t.type && Ht(t),
                    ht && ht(St)),
                    St
                }
                ,
                St.disable = function() {
                    St.isEnabled && (_.filter((function(t) {
                        return t !== St && C(t.target)
                    }
                    )).length || w(Dt ? Ft : u, "scroll", M),
                    St.isPressed && (St._vx.reset(),
                    St._vy.reset(),
                    w(nt ? u : Ft, m[1], Gt, !0)),
                    w(Dt ? Ft : u, "scroll", Yt, ft),
                    w(u, "wheel", Xt, ft),
                    w(u, m[0], Ht, ft),
                    w(Ft, m[2], qt),
                    w(Ft, m[3], qt),
                    w(u, "click", Bt, !0),
                    w(u, "click", Zt),
                    w(Ft, "gesturestart", jt),
                    w(Ft, "gestureend", Wt),
                    w(u, c + "enter", Ut),
                    w(u, c + "leave", Jt),
                    w(u, c + "move", $t),
                    St.isEnabled = St.isPressed = St.isDragging = !1,
                    lt && lt(St))
                }
                ,
                St.kill = St.revert = function() {
                    St.disable();
                    var t = _.indexOf(St);
                    t >= 0 && _.splice(t, 1),
                    d === St && (d = 0)
                }
                ,
                _.push(St),
                nt && C(u) && (d = St),
                St.enable(z)
            }
            ,
            e = t,
            (r = [{
                key: "velocityX",
                get: function() {
                    return this._vx.getVelocity()
                }
            }, {
                key: "velocityY",
                get: function() {
                    return this._vy.getVelocity()
                }
            }]) && i(e.prototype, r),
            t
        }();
        z.version = "3.11.4",
        z.create = function(t) {
            return new z(t)
        }
        ,
        z.register = O,
        z.getAll = function() {
            return _.slice()
        }
        ,
        z.getById = function(t) {
            return _.filter((function(e) {
                return e.vars.id === t
            }
            ))[0]
        }
        ,
        y() && n.registerPlugin(z);
        var N, G, H, q, j, W, Y, X, $, U, J, Z, K, Q, tt, et, rt, it, nt, st, at, ot, ht, lt, pt, ct, ft, ut, dt, mt, gt, yt, vt, _t, bt = 1, xt = Date.now, Et = xt(), St = 0, Pt = 0, Ct = function() {
            return Q = 1
        }, Tt = function() {
            return Q = 0
        }, wt = function(t) {
            return t
        }, Mt = function(t) {
            return Math.round(1e5 * t) / 1e5 || 0
        }, At = function() {
            return "undefined" != typeof window
        }, kt = function() {
            return N || At() && (N = window.gsap) && N.registerPlugin && N
        }, Dt = function(t) {
            return !!~Y.indexOf(t)
        }, Ft = function(t) {
            return P(t, "getBoundingClientRect") || (Dt(t) ? function() {
                return Ve.width = H.innerWidth,
                Ve.height = H.innerHeight,
                Ve
            }
            : function() {
                return Kt(t)
            }
            )
        }, It = function(t, e) {
            var r = e.s
              , i = e.d2
              , n = e.d
              , s = e.a;
            return (r = "scroll" + i) && (s = P(t, r)) ? s() - Ft(t)()[n] : Dt(t) ? (j[r] || W[r]) - (H["inner" + i] || j["client" + i] || W["client" + i]) : t[r] - t["offset" + i]
        }, Rt = function(t, e) {
            for (var r = 0; r < nt.length; r += 3)
                (!e || ~e.indexOf(nt[r + 1])) && t(nt[r], nt[r + 1], nt[r + 2])
        }, Lt = function(t) {
            return "string" == typeof t
        }, Bt = function(t) {
            return "function" == typeof t
        }, Vt = function(t) {
            return "number" == typeof t
        }, Ot = function(t) {
            return "object" == typeof t
        }, zt = function(t, e, r) {
            return t && t.progress(e ? 0 : 1) && r && t.pause()
        }, Nt = function(t, e) {
            if (t.enabled) {
                var r = e(t);
                r && r.totalTime && (t.callbackAnimation = r)
            }
        }, Gt = Math.abs, Ht = "right", qt = "bottom", jt = "width", Wt = "height", Yt = "padding", Xt = "margin", $t = "Width", Ut = "px", Jt = function(t) {
            return H.getComputedStyle(t)
        }, Zt = function(t, e) {
            for (var r in e)
                r in t || (t[r] = e[r]);
            return t
        }, Kt = function(t, e) {
            var r = e && "matrix(1, 0, 0, 1, 0, 0)" !== Jt(t)[tt] && N.to(t, {
                x: 0,
                y: 0,
                xPercent: 0,
                yPercent: 0,
                rotation: 0,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                skewX: 0,
                skewY: 0
            }).progress(1)
              , i = t.getBoundingClientRect();
            return r && r.progress(0).kill(),
            i
        }, Qt = function(t, e) {
            var r = e.d2;
            return t["offset" + r] || t["client" + r] || 0
        }, te = function(t) {
            var e, r = [], i = t.labels, n = t.duration();
            for (e in i)
                r.push(i[e] / n);
            return r
        }, ee = function(t) {
            var e = N.utils.snap(t)
              , r = Array.isArray(t) && t.slice(0).sort((function(t, e) {
                return t - e
            }
            ));
            return r ? function(t, i, n) {
                var s;
                if (void 0 === n && (n = .001),
                !i)
                    return e(t);
                if (i > 0) {
                    for (t -= n,
                    s = 0; s < r.length; s++)
                        if (r[s] >= t)
                            return r[s];
                    return r[s - 1]
                }
                for (s = r.length,
                t += n; s--; )
                    if (r[s] <= t)
                        return r[s];
                return r[0]
            }
            : function(r, i, n) {
                void 0 === n && (n = .001);
                var s = e(r);
                return !i || Math.abs(s - r) < n || s - r < 0 == i < 0 ? s : e(i < 0 ? r - t : r + t)
            }
        }, re = function(t, e, r, i) {
            return r.split(",").forEach((function(r) {
                return t(e, r, i)
            }
            ))
        }, ie = function(t, e, r, i, n) {
            return t.addEventListener(e, r, {
                passive: !i,
                capture: !!n
            })
        }, ne = function(t, e, r, i) {
            return t.removeEventListener(e, r, !!i)
        }, se = function(t, e, r) {
            return r && r.wheelHandler && t(e, "wheel", r)
        }, ae = {
            startColor: "green",
            endColor: "red",
            indent: 0,
            fontSize: "16px",
            fontWeight: "normal"
        }, oe = {
            toggleActions: "play",
            anticipatePin: 0
        }, he = {
            top: 0,
            left: 0,
            center: .5,
            bottom: 1,
            right: 1
        }, le = function(t, e) {
            if (Lt(t)) {
                var r = t.indexOf("=")
                  , i = ~r ? +(t.charAt(r - 1) + 1) * parseFloat(t.substr(r + 1)) : 0;
                ~r && (t.indexOf("%") > r && (i *= e / 100),
                t = t.substr(0, r - 1)),
                t = i + (t in he ? he[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0)
            }
            return t
        }, pe = function(t, e, r, i, n, s, a, o) {
            var h = n.startColor
              , l = n.endColor
              , p = n.fontSize
              , c = n.indent
              , f = n.fontWeight
              , u = q.createElement("div")
              , d = Dt(r) || "fixed" === P(r, "pinType")
              , m = -1 !== t.indexOf("scroller")
              , g = d ? W : r
              , y = -1 !== t.indexOf("start")
              , v = y ? h : l
              , _ = "border-color:" + v + ";font-size:" + p + ";color:" + v + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
            return _ += "position:" + ((m || o) && d ? "fixed;" : "absolute;"),
            (m || o || !d) && (_ += (i === D ? Ht : qt) + ":" + (s + parseFloat(c)) + "px;"),
            a && (_ += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"),
            u._isStart = y,
            u.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")),
            u.style.cssText = _,
            u.innerText = e || 0 === e ? t + "-" + e : t,
            g.children[0] ? g.insertBefore(u, g.children[0]) : g.appendChild(u),
            u._offset = u["offset" + i.op.d2],
            ce(u, 0, i, y),
            u
        }, ce = function(t, e, r, i) {
            var n = {
                display: "block"
            }
              , s = r[i ? "os2" : "p2"]
              , a = r[i ? "p2" : "os2"];
            t._isFlipped = i,
            n[r.a + "Percent"] = i ? -100 : 0,
            n[r.a] = i ? "1px" : 0,
            n["border" + s + $t] = 1,
            n["border" + a + $t] = 0,
            n[r.p] = e + "px",
            N.set(t, n)
        }, fe = [], ue = {}, de = function() {
            return xt() - St > 34 && (gt || (gt = requestAnimationFrame(ke)))
        }, me = function() {
            (!ht || !ht.isPressed || ht.startX > W.clientWidth) && (b.cache++,
            ht ? gt || (gt = requestAnimationFrame(ke)) : ke(),
            St || xe("scrollStart"),
            St = xt())
        }, ge = function() {
            ct = H.innerWidth,
            pt = H.innerHeight
        }, ye = function() {
            b.cache++,
            !K && !ot && !q.fullscreenElement && !q.webkitFullscreenElement && (!lt || ct !== H.innerWidth || Math.abs(H.innerHeight - pt) > .25 * H.innerHeight) && X.restart(!0)
        }, ve = {}, _e = [], be = function t() {
            return ne(He, "scrollEnd", t) || we(!0)
        }, xe = function(t) {
            return ve[t] && ve[t].map((function(t) {
                return t()
            }
            )) || _e
        }, Ee = [], Se = function(t) {
            for (var e = 0; e < Ee.length; e += 5)
                (!t || Ee[e + 4] && Ee[e + 4].query === t) && (Ee[e].style.cssText = Ee[e + 1],
                Ee[e].getBBox && Ee[e].setAttribute("transform", Ee[e + 2] || ""),
                Ee[e + 3].uncache = 1)
        }, Pe = function(t, e) {
            var r;
            for (et = 0; et < fe.length; et++)
                !(r = fe[et]) || e && r._ctx !== e || (t ? r.kill(1) : r.revert(!0, !0));
            e && Se(e),
            e || xe("revert")
        }, Ce = function(t, e) {
            b.cache++,
            (e || !yt) && b.forEach((function(t) {
                return Bt(t) && t.cacheID++ && (t.rec = 0)
            }
            )),
            Lt(t) && (H.history.scrollRestoration = dt = t)
        }, Te = 0, we = function(t, e) {
            if (!St || t) {
                yt = He.isRefreshing = !0,
                b.forEach((function(t) {
                    return Bt(t) && t.cacheID++ && (t.rec = t())
                }
                ));
                var r = xe("refreshInit");
                st && He.sort(),
                e || Pe(),
                b.forEach((function(t) {
                    Bt(t) && (t.smooth && (t.target.style.scrollBehavior = "auto"),
                    t(0))
                }
                )),
                fe.slice(0).forEach((function(t) {
                    return t.refresh()
                }
                )),
                fe.forEach((function(t, e) {
                    if (t._subPinOffset && t.pin) {
                        var r = t.vars.horizontal ? "offsetWidth" : "offsetHeight"
                          , i = t.pin[r];
                        t.revert(!0, 1),
                        t.adjustPinSpacing(t.pin[r] - i),
                        t.revert(!1, 1)
                    }
                }
                )),
                fe.forEach((function(t) {
                    return "max" === t.vars.end && t.setPositions(t.start, Math.max(t.start + 1, It(t.scroller, t._dir)))
                }
                )),
                r.forEach((function(t) {
                    return t && t.render && t.render(-1)
                }
                )),
                b.forEach((function(t) {
                    Bt(t) && (t.smooth && requestAnimationFrame((function() {
                        return t.target.style.scrollBehavior = "smooth"
                    }
                    )),
                    t.rec && t(t.rec))
                }
                )),
                Ce(dt, 1),
                X.pause(),
                Te++,
                ke(2),
                fe.forEach((function(t) {
                    return Bt(t.vars.onRefresh) && t.vars.onRefresh(t)
                }
                )),
                yt = He.isRefreshing = !1,
                xe("refresh")
            } else
                ie(He, "scrollEnd", be)
        }, Me = 0, Ae = 1, ke = function(t) {
            if (!yt || 2 === t) {
                He.isUpdating = !0,
                _t && _t.update(0);
                var e = fe.length
                  , r = xt()
                  , i = r - Et >= 50
                  , n = e && fe[0].scroll();
                if (Ae = Me > n ? -1 : 1,
                Me = n,
                i && (St && !Q && r - St > 200 && (St = 0,
                xe("scrollEnd")),
                J = Et,
                Et = r),
                Ae < 0) {
                    for (et = e; et-- > 0; )
                        fe[et] && fe[et].update(0, i);
                    Ae = 1
                } else
                    for (et = 0; et < e; et++)
                        fe[et] && fe[et].update(0, i);
                He.isUpdating = !1
            }
            gt = 0
        }, De = ["left", "top", qt, Ht, "marginBottom", "marginRight", "marginTop", "marginLeft", "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], Fe = De.concat([jt, Wt, "boxSizing", "maxWidth", "maxHeight", "position", Xt, Yt, "paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]), Ie = function(t, e, r, i) {
            if (!t._gsap.swappedIn) {
                for (var n, s = De.length, a = e.style, o = t.style; s--; )
                    a[n = De[s]] = r[n];
                a.position = "absolute" === r.position ? "absolute" : "relative",
                "inline" === r.display && (a.display = "inline-block"),
                o.bottom = o.right = "auto",
                a.flexBasis = r.flexBasis || "auto",
                a.overflow = "visible",
                a.boxSizing = "border-box",
                a.width = Qt(t, k) + Ut,
                a.height = Qt(t, D) + Ut,
                a.padding = o.margin = o.top = o.left = "0",
                Le(i),
                o.width = o.maxWidth = r.width,
                o.height = o.maxHeight = r.height,
                o.padding = r.padding,
                t.parentNode !== e && (t.parentNode.insertBefore(e, t),
                e.appendChild(t)),
                t._gsap.swappedIn = !0
            }
        }, Re = /([A-Z])/g, Le = function(t) {
            if (t) {
                var e, r, i = t.t.style, n = t.length, s = 0;
                for ((t.t._gsap || N.core.getCache(t.t)).uncache = 1; s < n; s += 2)
                    r = t[s + 1],
                    e = t[s],
                    r ? i[e] = r : i[e] && i.removeProperty(e.replace(Re, "-$1").toLowerCase())
            }
        }, Be = function(t) {
            for (var e = Fe.length, r = t.style, i = [], n = 0; n < e; n++)
                i.push(Fe[n], r[Fe[n]]);
            return i.t = t,
            i
        }, Ve = {
            left: 0,
            top: 0
        }, Oe = function(t, e, r, i, n, s, a, o, h, l, p, c, f) {
            Bt(t) && (t = t(o)),
            Lt(t) && "max" === t.substr(0, 3) && (t = c + ("=" === t.charAt(4) ? le("0" + t.substr(3), r) : 0));
            var u, d, m, g = f ? f.time() : 0;
            if (f && f.seek(0),
            Vt(t))
                a && ce(a, r, i, !0);
            else {
                Bt(e) && (e = e(o));
                var y, v, _, b, x = (t || "0").split(" ");
                m = F(e) || W,
                (y = Kt(m) || {}) && (y.left || y.top) || "none" !== Jt(m).display || (b = m.style.display,
                m.style.display = "block",
                y = Kt(m),
                b ? m.style.display = b : m.style.removeProperty("display")),
                v = le(x[0], y[i.d]),
                _ = le(x[1] || "0", r),
                t = y[i.p] - h[i.p] - l + v + n - _,
                a && ce(a, _, i, r - _ < 20 || a._isStart && _ > 20),
                r -= r - _
            }
            if (s) {
                var E = t + r
                  , S = s._isStart;
                u = "scroll" + i.d2,
                ce(s, E, i, S && E > 20 || !S && (p ? Math.max(W[u], j[u]) : s.parentNode[u]) <= E + 1),
                p && (h = Kt(a),
                p && (s.style[i.op.p] = h[i.op.p] - i.op.m - s._offset + Ut))
            }
            return f && m && (u = Kt(m),
            f.seek(c),
            d = Kt(m),
            f._caScrollDist = u[i.p] - d[i.p],
            t = t / f._caScrollDist * c),
            f && f.seek(g),
            f ? t : Math.round(t)
        }, ze = /(webkit|moz|length|cssText|inset)/i, Ne = function(t, e, r, i) {
            if (t.parentNode !== e) {
                var n, s, a = t.style;
                if (e === W) {
                    for (n in t._stOrig = a.cssText,
                    s = Jt(t))
                        +n || ze.test(n) || !s[n] || "string" != typeof a[n] || "0" === n || (a[n] = s[n]);
                    a.top = r,
                    a.left = i
                } else
                    a.cssText = t._stOrig;
                N.core.getCache(t).uncache = 1,
                e.appendChild(t)
            }
        }, Ge = function(t, e) {
            var r, i, n = I(t, e), s = "_scroll" + e.p2, a = function e(a, o, h, l, p) {
                var c = e.tween
                  , f = o.onComplete
                  , u = {};
                return h = h || n(),
                p = l && p || 0,
                l = l || a - h,
                c && c.kill(),
                r = Math.round(h),
                o[s] = a,
                o.modifiers = u,
                u[s] = function(t) {
                    return (t = Math.round(n())) !== r && t !== i && Math.abs(t - r) > 3 && Math.abs(t - i) > 3 ? (c.kill(),
                    e.tween = 0) : t = h + l * c.ratio + p * c.ratio * c.ratio,
                    i = r,
                    r = Math.round(t)
                }
                ,
                o.onUpdate = function() {
                    b.cache++,
                    ke()
                }
                ,
                o.onComplete = function() {
                    e.tween = 0,
                    f && f.call(c)
                }
                ,
                c = e.tween = N.to(t, o)
            };
            return t[s] = n,
            n.wheelHandler = function() {
                return a.tween && a.tween.kill() && (a.tween = 0)
            }
            ,
            ie(t, "wheel", n.wheelHandler),
            a
        }, He = function() {
            function t(e, r) {
                G || t.register(N) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
                this.init(e, r)
            }
            return t.prototype.init = function(e, r) {
                if (this.progress = this.start = 0,
                this.vars && this.kill(!0, !0),
                Pt) {
                    var i, n, s, a, o, h, l, p, c, f, u, d, m, g, y, v, _, E, S, C, T, w, M, A, R, L, B, V, O, z, G, Y, X, Z, tt, rt, it, nt, ot, ht, lt, pt, ct = e = Zt(Lt(e) || Vt(e) || e.nodeType ? {
                        trigger: e
                    } : e, oe), ft = ct.onUpdate, dt = ct.toggleClass, gt = ct.id, Et = ct.onToggle, Ct = ct.onRefresh, Tt = ct.scrub, At = ct.trigger, kt = ct.pin, Rt = ct.pinSpacing, Ht = ct.invalidateOnRefresh, qt = ct.anticipatePin, jt = ct.onScrubComplete, Wt = ct.onSnapComplete, re = ct.once, se = ct.snap, he = ct.pinReparent, ce = ct.pinSpacer, de = ct.containerAnimation, ge = ct.fastScrollEnd, ve = ct.preventOverlaps, _e = e.horizontal || e.containerAnimation && !1 !== e.horizontal ? k : D, xe = !Tt && 0 !== Tt, Ee = F(e.scroller || H), Se = N.core.getCache(Ee), Pe = Dt(Ee), Ce = "fixed" === ("pinType"in e ? e.pinType : P(Ee, "pinType") || Pe && "fixed"), Me = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack], ke = xe && e.toggleActions.split(" "), De = "markers"in e ? e.markers : oe.markers, Fe = Pe ? 0 : parseFloat(Jt(Ee)["border" + _e.p2 + $t]) || 0, Re = this, ze = e.onRefreshInit && function() {
                        return e.onRefreshInit(Re)
                    }
                    , He = function(t, e, r) {
                        var i = r.d
                          , n = r.d2
                          , s = r.a;
                        return (s = P(t, "getBoundingClientRect")) ? function() {
                            return s()[i]
                        }
                        : function() {
                            return (e ? H["inner" + n] : t["client" + n]) || 0
                        }
                    }(Ee, Pe, _e), qe = function(t, e) {
                        return !e || ~x.indexOf(t) ? Ft(t) : function() {
                            return Ve
                        }
                    }(Ee, Pe), je = 0, We = 0, Ye = I(Ee, _e);
                    if (ut(Re),
                    Re._dir = _e,
                    qt *= 45,
                    Re.scroller = Ee,
                    Re.scroll = de ? de.time.bind(de) : Ye,
                    a = Ye(),
                    Re.vars = e,
                    r = r || e.animation,
                    "refreshPriority"in e && (st = 1,
                    -9999 === e.refreshPriority && (_t = Re)),
                    Se.tweenScroll = Se.tweenScroll || {
                        top: Ge(Ee, D),
                        left: Ge(Ee, k)
                    },
                    Re.tweenTo = i = Se.tweenScroll[_e.p],
                    Re.scrubDuration = function(t) {
                        (Y = Vt(t) && t) ? G ? G.duration(t) : G = N.to(r, {
                            ease: "expo",
                            totalProgress: "+=0.001",
                            duration: Y,
                            paused: !0,
                            onComplete: function() {
                                return jt && jt(Re)
                            }
                        }) : (G && G.progress(1).kill(),
                        G = 0)
                    }
                    ,
                    r && (r.vars.lazy = !1,
                    r._initted || !1 !== r.vars.immediateRender && !1 !== e.immediateRender && r.duration() && r.render(0, !0, !0),
                    Re.animation = r.pause(),
                    r.scrollTrigger = Re,
                    Re.scrubDuration(Tt),
                    O = 0,
                    gt || (gt = r.vars.id)),
                    fe.push(Re),
                    se && (Ot(se) && !se.push || (se = {
                        snapTo: se
                    }),
                    "scrollBehavior"in W.style && N.set(Pe ? [W, j] : Ee, {
                        scrollBehavior: "auto"
                    }),
                    b.forEach((function(t) {
                        return Bt(t) && t.target === (Pe ? q.scrollingElement || j : Ee) && (t.smooth = !1)
                    }
                    )),
                    s = Bt(se.snapTo) ? se.snapTo : "labels" === se.snapTo ? function(t) {
                        return function(e) {
                            return N.utils.snap(te(t), e)
                        }
                    }(r) : "labelsDirectional" === se.snapTo ? (ht = r,
                    function(t, e) {
                        return ee(te(ht))(t, e.direction)
                    }
                    ) : !1 !== se.directional ? function(t, e) {
                        return ee(se.snapTo)(t, xt() - We < 500 ? 0 : e.direction)
                    }
                    : N.utils.snap(se.snapTo),
                    X = se.duration || {
                        min: .1,
                        max: 2
                    },
                    X = Ot(X) ? U(X.min, X.max) : U(X, X),
                    Z = N.delayedCall(se.delay || Y / 2 || .1, (function() {
                        var t = Ye()
                          , e = xt() - We < 500
                          , n = i.tween;
                        if (!(e || Math.abs(Re.getVelocity()) < 10) || n || Q || je === t)
                            Re.isActive && je !== t && Z.restart(!0);
                        else {
                            var a = (t - h) / m
                              , o = r && !xe ? r.totalProgress() : a
                              , p = e ? 0 : (o - z) / (xt() - J) * 1e3 || 0
                              , c = N.utils.clamp(-a, 1 - a, Gt(p / 2) * p / .185)
                              , f = a + (!1 === se.inertia ? 0 : c)
                              , u = U(0, 1, s(f, Re))
                              , d = Math.round(h + u * m)
                              , g = se
                              , y = g.onStart
                              , v = g.onInterrupt
                              , _ = g.onComplete;
                            if (t <= l && t >= h && d !== t) {
                                if (n && !n._initted && n.data <= Gt(d - t))
                                    return;
                                !1 === se.inertia && (c = u - a),
                                i(d, {
                                    duration: X(Gt(.185 * Math.max(Gt(f - o), Gt(u - o)) / p / .05 || 0)),
                                    ease: se.ease || "power3",
                                    data: Gt(d - t),
                                    onInterrupt: function() {
                                        return Z.restart(!0) && v && v(Re)
                                    },
                                    onComplete: function() {
                                        Re.update(),
                                        je = Ye(),
                                        O = z = r && !xe ? r.totalProgress() : Re.progress,
                                        Wt && Wt(Re),
                                        _ && _(Re)
                                    }
                                }, t, c * m, d - t - c * m),
                                y && y(Re, i.tween)
                            }
                        }
                    }
                    )).pause()),
                    gt && (ue[gt] = Re),
                    (ot = (At = Re.trigger = F(At || kt)) && At._gsap && At._gsap.stRevert) && (ot = ot(Re)),
                    kt = !0 === kt ? At : F(kt),
                    Lt(dt) && (dt = {
                        targets: At,
                        className: dt
                    }),
                    kt && (!1 === Rt || Rt === Xt || (Rt = !(!Rt && kt.parentNode && kt.parentNode.style && "flex" === Jt(kt.parentNode).display) && Yt),
                    Re.pin = kt,
                    (n = N.core.getCache(kt)).spacer ? g = n.pinState : (ce && ((ce = F(ce)) && !ce.nodeType && (ce = ce.current || ce.nativeElement),
                    n.spacerIsNative = !!ce,
                    ce && (n.spacerState = Be(ce))),
                    n.spacer = _ = ce || q.createElement("div"),
                    _.classList.add("pin-spacer"),
                    gt && _.classList.add("pin-spacer-" + gt),
                    n.pinState = g = Be(kt)),
                    !1 !== e.force3D && N.set(kt, {
                        force3D: !0
                    }),
                    Re.spacer = _ = n.spacer,
                    V = Jt(kt),
                    M = V[Rt + _e.os2],
                    S = N.getProperty(kt),
                    C = N.quickSetter(kt, _e.a, Ut),
                    Ie(kt, _, V),
                    v = Be(kt)),
                    De) {
                        d = Ot(De) ? Zt(De, ae) : ae,
                        f = pe("scroller-start", gt, Ee, _e, d, 0),
                        u = pe("scroller-end", gt, Ee, _e, d, 0, f),
                        E = f["offset" + _e.op.d2];
                        var Xe = F(P(Ee, "content") || Ee);
                        p = this.markerStart = pe("start", gt, Xe, _e, d, E, 0, de),
                        c = this.markerEnd = pe("end", gt, Xe, _e, d, E, 0, de),
                        de && (nt = N.quickSetter([p, c], _e.a, Ut)),
                        Ce || x.length && !0 === P(Ee, "fixedMarkers") || (pt = Jt(lt = Pe ? W : Ee).position,
                        lt.style.position = "absolute" === pt || "fixed" === pt ? pt : "relative",
                        N.set([f, u], {
                            force3D: !0
                        }),
                        R = N.quickSetter(f, _e.a, Ut),
                        B = N.quickSetter(u, _e.a, Ut))
                    }
                    if (de) {
                        var $e = de.vars.onUpdate
                          , Ue = de.vars.onUpdateParams;
                        de.eventCallback("onUpdate", (function() {
                            Re.update(0, 0, 1),
                            $e && $e.apply(Ue || [])
                        }
                        ))
                    }
                    Re.previous = function() {
                        return fe[fe.indexOf(Re) - 1]
                    }
                    ,
                    Re.next = function() {
                        return fe[fe.indexOf(Re) + 1]
                    }
                    ,
                    Re.revert = function(t, e) {
                        if (!e)
                            return Re.kill(!0);
                        var i = !1 !== t || !Re.enabled
                          , n = K;
                        i !== Re.isReverted && (i && (rt = Math.max(Ye(), Re.scroll.rec || 0),
                        tt = Re.progress,
                        it = r && r.progress()),
                        p && [p, c, f, u].forEach((function(t) {
                            return t.style.display = i ? "none" : "block"
                        }
                        )),
                        i && (K = 1,
                        Re.update(i)),
                        !kt || he && Re.isActive || (i ? function(t, e, r) {
                            Le(r);
                            var i = t._gsap;
                            if (i.spacerIsNative)
                                Le(i.spacerState);
                            else if (t._gsap.swappedIn) {
                                var n = e.parentNode;
                                n && (n.insertBefore(t, e),
                                n.removeChild(e))
                            }
                            t._gsap.swappedIn = !1
                        }(kt, _, g) : Ie(kt, _, Jt(kt), A)),
                        i || Re.update(i),
                        K = n,
                        Re.isReverted = i)
                    }
                    ,
                    Re.refresh = function(n, s) {
                        if (!K && Re.enabled || s)
                            if (kt && n && St)
                                ie(t, "scrollEnd", be);
                            else {
                                !yt && ze && ze(Re),
                                K = 1,
                                We = xt(),
                                i.tween && (i.tween.kill(),
                                i.tween = 0),
                                G && G.pause(),
                                Ht && r && r.revert({
                                    kill: !1
                                }).invalidate(),
                                Re.isReverted || Re.revert(!0, !0),
                                Re._subPinOffset = !1;
                                for (var d, b, x, E, P, C, M, R, B, V, O, z = He(), H = qe(), Y = de ? de.duration() : It(Ee, _e), X = 0, $ = 0, U = e.end, J = e.endTrigger || At, Q = e.start || (0 !== e.start && At ? kt ? "0 0" : "0 100%" : 0), et = Re.pinnedContainer = e.pinnedContainer && F(e.pinnedContainer), nt = At && Math.max(0, fe.indexOf(Re)) || 0, st = nt; st--; )
                                    (C = fe[st]).end || C.refresh(0, 1) || (K = 1),
                                    !(M = C.pin) || M !== At && M !== kt || C.isReverted || (V || (V = []),
                                    V.unshift(C),
                                    C.revert(!0, !0)),
                                    C !== fe[st] && (nt--,
                                    st--);
                                for (Bt(Q) && (Q = Q(Re)),
                                h = Oe(Q, At, z, _e, Ye(), p, f, Re, H, Fe, Ce, Y, de) || (kt ? -.001 : 0),
                                Bt(U) && (U = U(Re)),
                                Lt(U) && !U.indexOf("+=") && (~U.indexOf(" ") ? U = (Lt(Q) ? Q.split(" ")[0] : "") + U : (X = le(U.substr(2), z),
                                U = Lt(Q) ? Q : h + X,
                                J = At)),
                                l = Math.max(h, Oe(U || (J ? "100% 0" : Y), J, z, _e, Ye() + X, c, u, Re, H, Fe, Ce, Y, de)) || -.001,
                                m = l - h || (h -= .01) && .001,
                                X = 0,
                                st = nt; st--; )
                                    (M = (C = fe[st]).pin) && C.start - C._pinPush <= h && !de && C.end > 0 && (d = C.end - C.start,
                                    (M === At && C.start - C._pinPush < h || M === et) && !Vt(Q) && (X += d * (1 - C.progress)),
                                    M === kt && ($ += d));
                                if (h += X,
                                l += X,
                                Re._pinPush = $,
                                p && X && ((d = {})[_e.a] = "+=" + X,
                                et && (d[_e.p] = "-=" + Ye()),
                                N.set([p, c], d)),
                                kt)
                                    d = Jt(kt),
                                    E = _e === D,
                                    x = Ye(),
                                    T = parseFloat(S(_e.a)) + $,
                                    !Y && l > 1 && ((O = {
                                        style: O = (Pe ? q.scrollingElement || j : Ee).style,
                                        value: O["overflow" + _e.a.toUpperCase()]
                                    })["overflow" + _e.a.toUpperCase()] = "scroll"),
                                    Ie(kt, _, d),
                                    v = Be(kt),
                                    b = Kt(kt, !0),
                                    R = Ce && I(Ee, E ? k : D)(),
                                    Rt && ((A = [Rt + _e.os2, m + $ + Ut]).t = _,
                                    (st = Rt === Yt ? Qt(kt, _e) + m + $ : 0) && A.push(_e.d, st + Ut),
                                    Le(A),
                                    et && fe.forEach((function(t) {
                                        t.pin === et && !1 !== t.vars.pinSpacing && (t._subPinOffset = !0)
                                    }
                                    )),
                                    Ce && Ye(rt)),
                                    Ce && ((P = {
                                        top: b.top + (E ? x - h : R) + Ut,
                                        left: b.left + (E ? R : x - h) + Ut,
                                        boxSizing: "border-box",
                                        position: "fixed"
                                    }).width = P.maxWidth = Math.ceil(b.width) + Ut,
                                    P.height = P.maxHeight = Math.ceil(b.height) + Ut,
                                    P.margin = P.marginTop = P.marginRight = P.marginBottom = P.marginLeft = "0",
                                    P.padding = d.padding,
                                    P.paddingTop = d.paddingTop,
                                    P.paddingRight = d.paddingRight,
                                    P.paddingBottom = d.paddingBottom,
                                    P.paddingLeft = d.paddingLeft,
                                    y = function(t, e, r) {
                                        for (var i, n = [], s = t.length, a = r ? 8 : 0; a < s; a += 2)
                                            i = t[a],
                                            n.push(i, i in e ? e[i] : t[a + 1]);
                                        return n.t = t.t,
                                        n
                                    }(g, P, he),
                                    yt && Ye(0)),
                                    r ? (B = r._initted,
                                    at(1),
                                    r.render(r.duration(), !0, !0),
                                    w = S(_e.a) - T + m + $,
                                    L = Math.abs(m - w) > 1,
                                    Ce && L && y.splice(y.length - 2, 2),
                                    r.render(0, !0, !0),
                                    B || r.invalidate(!0),
                                    r.parent || r.totalTime(r.totalTime()),
                                    at(0)) : w = m,
                                    O && (O.value ? O.style["overflow" + _e.a.toUpperCase()] = O.value : O.style.removeProperty("overflow-" + _e.a));
                                else if (At && Ye() && !de)
                                    for (b = At.parentNode; b && b !== W; )
                                        b._pinOffset && (h -= b._pinOffset,
                                        l -= b._pinOffset),
                                        b = b.parentNode;
                                V && V.forEach((function(t) {
                                    return t.revert(!1, !0)
                                }
                                )),
                                Re.start = h,
                                Re.end = l,
                                a = o = yt ? rt : Ye(),
                                de || yt || (a < rt && Ye(rt),
                                Re.scroll.rec = 0),
                                Re.revert(!1, !0),
                                Z && (je = -1,
                                Re.isActive && Ye(h + m * tt),
                                Z.restart(!0)),
                                K = 0,
                                r && xe && (r._initted || it) && r.progress() !== it && r.progress(it, !0).render(r.time(), !0, !0),
                                (tt !== Re.progress || de) && (r && !xe && r.totalProgress(tt, !0),
                                Re.progress = (a - h) / m === tt ? 0 : tt),
                                kt && Rt && (_._pinOffset = Math.round(Re.progress * w)),
                                Ct && !yt && Ct(Re)
                            }
                    }
                    ,
                    Re.getVelocity = function() {
                        return (Ye() - o) / (xt() - J) * 1e3 || 0
                    }
                    ,
                    Re.endAnimation = function() {
                        zt(Re.callbackAnimation),
                        r && (G ? G.progress(1) : r.paused() ? xe || zt(r, Re.direction < 0, 1) : zt(r, r.reversed()))
                    }
                    ,
                    Re.labelToScroll = function(t) {
                        return r && r.labels && (h || Re.refresh() || h) + r.labels[t] / r.duration() * m || 0
                    }
                    ,
                    Re.getTrailing = function(t) {
                        var e = fe.indexOf(Re)
                          , r = Re.direction > 0 ? fe.slice(0, e).reverse() : fe.slice(e + 1);
                        return (Lt(t) ? r.filter((function(e) {
                            return e.vars.preventOverlaps === t
                        }
                        )) : r).filter((function(t) {
                            return Re.direction > 0 ? t.end <= h : t.start >= l
                        }
                        ))
                    }
                    ,
                    Re.update = function(t, e, n) {
                        if (!de || n || t) {
                            var s, p, c, u, d, g, b, x = yt ? rt : Re.scroll(), E = t ? 0 : (x - h) / m, S = E < 0 ? 0 : E > 1 ? 1 : E || 0, P = Re.progress;
                            if (e && (o = a,
                            a = de ? Ye() : x,
                            se && (z = O,
                            O = r && !xe ? r.totalProgress() : S)),
                            qt && !S && kt && !K && !bt && St && h < x + (x - o) / (xt() - J) * qt && (S = 1e-4),
                            S !== P && Re.enabled) {
                                if (u = (d = (s = Re.isActive = !!S && S < 1) != (!!P && P < 1)) || !!S != !!P,
                                Re.direction = S > P ? 1 : -1,
                                Re.progress = S,
                                u && !K && (p = S && !P ? 0 : 1 === S ? 1 : 1 === P ? 2 : 3,
                                xe && (c = !d && "none" !== ke[p + 1] && ke[p + 1] || ke[p],
                                b = r && ("complete" === c || "reset" === c || c in r))),
                                ve && (d || b) && (b || Tt || !r) && (Bt(ve) ? ve(Re) : Re.getTrailing(ve).forEach((function(t) {
                                    return t.endAnimation()
                                }
                                ))),
                                xe || (!G || K || bt ? r && r.totalProgress(S, !!K) : (G._dp._time - G._start !== G._time && G.render(G._dp._time - G._start),
                                G.resetTo ? G.resetTo("totalProgress", S, r._tTime / r._tDur) : (G.vars.totalProgress = S,
                                G.invalidate().restart()))),
                                kt)
                                    if (t && Rt && (_.style[Rt + _e.os2] = M),
                                    Ce) {
                                        if (u) {
                                            if (g = !t && S > P && l + 1 > x && x + 1 >= It(Ee, _e),
                                            he)
                                                if (t || !s && !g)
                                                    Ne(kt, _);
                                                else {
                                                    var A = Kt(kt, !0)
                                                      , k = x - h;
                                                    Ne(kt, W, A.top + (_e === D ? k : 0) + Ut, A.left + (_e === D ? 0 : k) + Ut)
                                                }
                                            Le(s || g ? y : v),
                                            L && S < 1 && s || C(T + (1 !== S || g ? 0 : w))
                                        }
                                    } else
                                        C(Mt(T + w * S));
                                se && !i.tween && !K && !bt && Z.restart(!0),
                                dt && (d || re && S && (S < 1 || !mt)) && $(dt.targets).forEach((function(t) {
                                    return t.classList[s || re ? "add" : "remove"](dt.className)
                                }
                                )),
                                ft && !xe && !t && ft(Re),
                                u && !K ? (xe && (b && ("complete" === c ? r.pause().totalProgress(1) : "reset" === c ? r.restart(!0).pause() : "restart" === c ? r.restart(!0) : r[c]()),
                                ft && ft(Re)),
                                !d && mt || (Et && d && Nt(Re, Et),
                                Me[p] && Nt(Re, Me[p]),
                                re && (1 === S ? Re.kill(!1, 1) : Me[p] = 0),
                                d || Me[p = 1 === S ? 1 : 3] && Nt(Re, Me[p])),
                                ge && !s && Math.abs(Re.getVelocity()) > (Vt(ge) ? ge : 2500) && (zt(Re.callbackAnimation),
                                G ? G.progress(1) : zt(r, "reverse" === c ? 1 : !S, 1))) : xe && ft && !K && ft(Re)
                            }
                            if (B) {
                                var F = de ? x / de.duration() * (de._caScrollDist || 0) : x;
                                R(F + (f._isFlipped ? 1 : 0)),
                                B(F)
                            }
                            nt && nt(-x / de.duration() * (de._caScrollDist || 0))
                        }
                    }
                    ,
                    Re.enable = function(e, r) {
                        Re.enabled || (Re.enabled = !0,
                        ie(Ee, "resize", ye),
                        ie(Pe ? q : Ee, "scroll", me),
                        ze && ie(t, "refreshInit", ze),
                        !1 !== e && (Re.progress = tt = 0,
                        a = o = je = Ye()),
                        !1 !== r && Re.refresh())
                    }
                    ,
                    Re.getTween = function(t) {
                        return t && i ? i.tween : G
                    }
                    ,
                    Re.setPositions = function(t, e) {
                        kt && (T += t - h,
                        w += e - t - m,
                        Rt === Yt && Re.adjustPinSpacing(e - t - m)),
                        Re.start = h = t,
                        Re.end = l = e,
                        m = e - t,
                        Re.update()
                    }
                    ,
                    Re.adjustPinSpacing = function(t) {
                        if (A) {
                            var e = A.indexOf(_e.d) + 1;
                            A[e] = parseFloat(A[e]) + t + Ut,
                            A[1] = parseFloat(A[1]) + t + Ut,
                            Le(A)
                        }
                    }
                    ,
                    Re.disable = function(e, r) {
                        if (Re.enabled && (!1 !== e && Re.revert(!0, !0),
                        Re.enabled = Re.isActive = !1,
                        r || G && G.pause(),
                        rt = 0,
                        n && (n.uncache = 1),
                        ze && ne(t, "refreshInit", ze),
                        Z && (Z.pause(),
                        i.tween && i.tween.kill() && (i.tween = 0)),
                        !Pe)) {
                            for (var s = fe.length; s--; )
                                if (fe[s].scroller === Ee && fe[s] !== Re)
                                    return;
                            ne(Ee, "resize", ye),
                            ne(Ee, "scroll", me)
                        }
                    }
                    ,
                    Re.kill = function(t, i) {
                        Re.disable(t, i),
                        G && !i && G.kill(),
                        gt && delete ue[gt];
                        var s = fe.indexOf(Re);
                        s >= 0 && fe.splice(s, 1),
                        s === et && Ae > 0 && et--,
                        s = 0,
                        fe.forEach((function(t) {
                            return t.scroller === Re.scroller && (s = 1)
                        }
                        )),
                        s || yt || (Re.scroll.rec = 0),
                        r && (r.scrollTrigger = null,
                        t && r.revert({
                            kill: !1
                        }),
                        i || r.kill()),
                        p && [p, c, f, u].forEach((function(t) {
                            return t.parentNode && t.parentNode.removeChild(t)
                        }
                        )),
                        _t === Re && (_t = 0),
                        kt && (n && (n.uncache = 1),
                        s = 0,
                        fe.forEach((function(t) {
                            return t.pin === kt && s++
                        }
                        )),
                        s || (n.spacer = 0)),
                        e.onKill && e.onKill(Re)
                    }
                    ,
                    Re.enable(!1, !1),
                    ot && ot(Re),
                    r && r.add && !m ? N.delayedCall(.01, (function() {
                        return h || l || Re.refresh()
                    }
                    )) && (m = .01) && (h = l = 0) : Re.refresh(),
                    kt && function() {
                        if (vt !== Te) {
                            var t = vt = Te;
                            requestAnimationFrame((function() {
                                return t === Te && we(!0)
                            }
                            ))
                        }
                    }()
                } else
                    this.update = this.refresh = this.kill = wt
            }
            ,
            t.register = function(e) {
                return G || (N = e || kt(),
                At() && window.document && t.enable(),
                G = Pt),
                G
            }
            ,
            t.defaults = function(t) {
                if (t)
                    for (var e in t)
                        oe[e] = t[e];
                return oe
            }
            ,
            t.disable = function(t, e) {
                Pt = 0,
                fe.forEach((function(r) {
                    return r[e ? "kill" : "disable"](t)
                }
                )),
                ne(H, "wheel", me),
                ne(q, "scroll", me),
                clearInterval(Z),
                ne(q, "touchcancel", wt),
                ne(W, "touchstart", wt),
                re(ne, q, "pointerdown,touchstart,mousedown", Ct),
                re(ne, q, "pointerup,touchend,mouseup", Tt),
                X.kill(),
                Rt(ne);
                for (var r = 0; r < b.length; r += 3)
                    se(ne, b[r], b[r + 1]),
                    se(ne, b[r], b[r + 2])
            }
            ,
            t.enable = function() {
                if (H = window,
                q = document,
                j = q.documentElement,
                W = q.body,
                N && ($ = N.utils.toArray,
                U = N.utils.clamp,
                ut = N.core.context || wt,
                at = N.core.suppressOverwrites || wt,
                dt = H.history.scrollRestoration || "auto",
                N.core.globals("ScrollTrigger", t),
                W)) {
                    Pt = 1,
                    z.register(N),
                    t.isTouch = z.isTouch,
                    ft = z.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),
                    ie(H, "wheel", me),
                    Y = [H, q, j, W],
                    N.matchMedia ? (t.matchMedia = function(t) {
                        var e, r = N.matchMedia();
                        for (e in t)
                            r.add(e, t[e]);
                        return r
                    }
                    ,
                    N.addEventListener("matchMediaInit", (function() {
                        return Pe()
                    }
                    )),
                    N.addEventListener("matchMediaRevert", (function() {
                        return Se()
                    }
                    )),
                    N.addEventListener("matchMedia", (function() {
                        we(0, 1),
                        xe("matchMedia")
                    }
                    )),
                    N.matchMedia("(orientation: portrait)", (function() {
                        return ge(),
                        ge
                    }
                    ))) : console.warn("Requires GSAP 3.11.0 or later"),
                    ge(),
                    ie(q, "scroll", me);
                    var e, r, i = W.style, n = i.borderTopStyle, s = N.core.Animation.prototype;
                    for (s.revert || Object.defineProperty(s, "revert", {
                        value: function() {
                            return this.time(-.01, !0)
                        }
                    }),
                    i.borderTopStyle = "solid",
                    e = Kt(W),
                    D.m = Math.round(e.top + D.sc()) || 0,
                    k.m = Math.round(e.left + k.sc()) || 0,
                    n ? i.borderTopStyle = n : i.removeProperty("border-top-style"),
                    Z = setInterval(de, 250),
                    N.delayedCall(.5, (function() {
                        return bt = 0
                    }
                    )),
                    ie(q, "touchcancel", wt),
                    ie(W, "touchstart", wt),
                    re(ie, q, "pointerdown,touchstart,mousedown", Ct),
                    re(ie, q, "pointerup,touchend,mouseup", Tt),
                    tt = N.utils.checkPrefix("transform"),
                    Fe.push(tt),
                    G = xt(),
                    X = N.delayedCall(.2, we).pause(),
                    nt = [q, "visibilitychange", function() {
                        var t = H.innerWidth
                          , e = H.innerHeight;
                        q.hidden ? (rt = t,
                        it = e) : rt === t && it === e || ye()
                    }
                    , q, "DOMContentLoaded", we, H, "load", we, H, "resize", ye],
                    Rt(ie),
                    fe.forEach((function(t) {
                        return t.enable(0, 1)
                    }
                    )),
                    r = 0; r < b.length; r += 3)
                        se(ne, b[r], b[r + 1]),
                        se(ne, b[r], b[r + 2])
                }
            }
            ,
            t.config = function(e) {
                "limitCallbacks"in e && (mt = !!e.limitCallbacks);
                var r = e.syncInterval;
                r && clearInterval(Z) || (Z = r) && setInterval(de, r),
                "ignoreMobileResize"in e && (lt = 1 === t.isTouch && e.ignoreMobileResize),
                "autoRefreshEvents"in e && (Rt(ne) || Rt(ie, e.autoRefreshEvents || "none"),
                ot = -1 === (e.autoRefreshEvents + "").indexOf("resize"))
            }
            ,
            t.scrollerProxy = function(t, e) {
                var r = F(t)
                  , i = b.indexOf(r)
                  , n = Dt(r);
                ~i && b.splice(i, n ? 6 : 2),
                e && (n ? x.unshift(H, e, W, e, j, e) : x.unshift(r, e))
            }
            ,
            t.clearMatchMedia = function(t) {
                fe.forEach((function(e) {
                    return e._ctx && e._ctx.query === t && e._ctx.kill(!0, !0)
                }
                ))
            }
            ,
            t.isInViewport = function(t, e, r) {
                var i = (Lt(t) ? F(t) : t).getBoundingClientRect()
                  , n = i[r ? jt : Wt] * e || 0;
                return r ? i.right - n > 0 && i.left + n < H.innerWidth : i.bottom - n > 0 && i.top + n < H.innerHeight
            }
            ,
            t.positionInViewport = function(t, e, r) {
                Lt(t) && (t = F(t));
                var i = t.getBoundingClientRect()
                  , n = i[r ? jt : Wt]
                  , s = null == e ? n / 2 : e in he ? he[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0;
                return r ? (i.left + s) / H.innerWidth : (i.top + s) / H.innerHeight
            }
            ,
            t.killAll = function(t) {
                if (fe.slice(0).forEach((function(t) {
                    return "ScrollSmoother" !== t.vars.id && t.kill()
                }
                )),
                !0 !== t) {
                    var e = ve.killAll || [];
                    ve = {},
                    e.forEach((function(t) {
                        return t()
                    }
                    ))
                }
            }
            ,
            t
        }();
        He.version = "3.11.4",
        He.saveStyles = function(t) {
            return t ? $(t).forEach((function(t) {
                if (t && t.style) {
                    var e = Ee.indexOf(t);
                    e >= 0 && Ee.splice(e, 5),
                    Ee.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), N.core.getCache(t), ut())
                }
            }
            )) : Ee
        }
        ,
        He.revert = function(t, e) {
            return Pe(!t, e)
        }
        ,
        He.create = function(t, e) {
            return new He(t,e)
        }
        ,
        He.refresh = function(t) {
            return t ? ye() : (G || He.register()) && we(!0)
        }
        ,
        He.update = function(t) {
            return ++b.cache && ke(!0 === t ? 2 : 0)
        }
        ,
        He.clearScrollMemory = Ce,
        He.maxScroll = function(t, e) {
            return It(t, e ? k : D)
        }
        ,
        He.getScrollFunc = function(t, e) {
            return I(F(t), e ? k : D)
        }
        ,
        He.getById = function(t) {
            return ue[t]
        }
        ,
        He.getAll = function() {
            return fe.filter((function(t) {
                return "ScrollSmoother" !== t.vars.id
            }
            ))
        }
        ,
        He.isScrolling = function() {
            return !!St
        }
        ,
        He.snapDirectional = ee,
        He.addEventListener = function(t, e) {
            var r = ve[t] || (ve[t] = []);
            ~r.indexOf(e) || r.push(e)
        }
        ,
        He.removeEventListener = function(t, e) {
            var r = ve[t]
              , i = r && r.indexOf(e);
            i >= 0 && r.splice(i, 1)
        }
        ,
        He.batch = function(t, e) {
            var r, i = [], n = {}, s = e.interval || .016, a = e.batchMax || 1e9, o = function(t, e) {
                var r = []
                  , i = []
                  , n = N.delayedCall(s, (function() {
                    e(r, i),
                    r = [],
                    i = []
                }
                )).pause();
                return function(t) {
                    r.length || n.restart(!0),
                    r.push(t.trigger),
                    i.push(t),
                    a <= r.length && n.progress(1)
                }
            };
            for (r in e)
                n[r] = "on" === r.substr(0, 2) && Bt(e[r]) && "onRefreshInit" !== r ? o(0, e[r]) : e[r];
            return Bt(a) && (a = a(),
            ie(He, "refresh", (function() {
                return a = e.batchMax()
            }
            ))),
            $(t).forEach((function(t) {
                var e = {};
                for (r in n)
                    e[r] = n[r];
                e.trigger = t,
                i.push(He.create(e))
            }
            )),
            i
        }
        ;
        var qe, je = function(t, e, r, i) {
            return e > i ? t(i) : e < 0 && t(0),
            r > i ? (i - e) / (r - e) : r < 0 ? e / (e - r) : 1
        }, We = function t(e, r) {
            !0 === r ? e.style.removeProperty("touch-action") : e.style.touchAction = !0 === r ? "auto" : r ? "pan-" + r + (z.isTouch ? " pinch-zoom" : "") : "none",
            e === j && t(W, r)
        }, Ye = {
            auto: 1,
            scroll: 1
        }, Xe = function(t) {
            var e, r = t.event, i = t.target, n = t.axis, s = (r.changedTouches ? r.changedTouches[0] : r).target, a = s._gsap || N.core.getCache(s), o = xt();
            if (!a._isScrollT || o - a._isScrollT > 2e3) {
                for (; s && s !== W && (s.scrollHeight <= s.clientHeight && s.scrollWidth <= s.clientWidth || !Ye[(e = Jt(s)).overflowY] && !Ye[e.overflowX]); )
                    s = s.parentNode;
                a._isScroll = s && s !== i && !Dt(s) && (Ye[(e = Jt(s)).overflowY] || Ye[e.overflowX]),
                a._isScrollT = o
            }
            (a._isScroll || "x" === n) && (r.stopPropagation(),
            r._gsapAllow = !0)
        }, $e = function(t, e, r, i) {
            return z.create({
                target: t,
                capture: !0,
                debounce: !1,
                lockAxis: !0,
                type: e,
                onWheel: i = i && Xe,
                onPress: i,
                onDrag: i,
                onScroll: i,
                onEnable: function() {
                    return r && ie(q, z.eventTypes[0], Je, !1, !0)
                },
                onDisable: function() {
                    return ne(q, z.eventTypes[0], Je, !0)
                }
            })
        }, Ue = /(input|label|select|textarea)/i, Je = function(t) {
            var e = Ue.test(t.target.tagName);
            (e || qe) && (t._gsapAllow = !0,
            qe = e)
        };
        He.sort = function(t) {
            return fe.sort(t || function(t, e) {
                return -1e6 * (t.vars.refreshPriority || 0) + t.start - (e.start + -1e6 * (e.vars.refreshPriority || 0))
            }
            )
        }
        ,
        He.observe = function(t) {
            return new z(t)
        }
        ,
        He.normalizeScroll = function(t) {
            if (void 0 === t)
                return ht;
            if (!0 === t && ht)
                return ht.enable();
            if (!1 === t)
                return ht && ht.kill();
            var e = t instanceof z ? t : function(t) {
                Ot(t) || (t = {}),
                t.preventDefault = t.isNormalizer = t.allowClicks = !0,
                t.type || (t.type = "wheel,touch"),
                t.debounce = !!t.debounce,
                t.id = t.id || "normalizer";
                var e, r, i, n, s, a, o, h, l = t, p = l.normalizeScrollX, c = l.momentum, f = l.allowNestedScroll, u = F(t.target) || j, d = N.core.globals().ScrollSmoother, m = d && d.get(), g = ft && (t.content && F(t.content) || m && !1 !== t.content && !m.smooth() && m.content()), y = I(u, D), v = I(u, k), _ = 1, x = (z.isTouch && H.visualViewport ? H.visualViewport.scale * H.visualViewport.width : H.outerWidth) / H.innerWidth, E = 0, S = Bt(c) ? function() {
                    return c(e)
                }
                : function() {
                    return c || 2.8
                }
                , P = $e(u, t.type, !0, f), C = function() {
                    return n = !1
                }, T = wt, w = wt, M = function() {
                    r = It(u, D),
                    w = U(ft ? 1 : 0, r),
                    p && (T = U(0, It(u, k))),
                    i = Te
                }, A = function() {
                    g._gsap.y = Mt(parseFloat(g._gsap.y) + y.offset) + "px",
                    g.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(g._gsap.y) + ", 0, 1)",
                    y.offset = y.cacheID = 0
                }, R = function() {
                    M(),
                    s.isActive() && s.vars.scrollY > r && (y() > r ? s.progress(1) && y(r) : s.resetTo("scrollY", r))
                };
                return g && N.set(g, {
                    y: "+=0"
                }),
                t.ignoreCheck = function(t) {
                    return ft && "touchmove" === t.type && function() {
                        if (n) {
                            requestAnimationFrame(C);
                            var t = Mt(e.deltaY / 2)
                              , r = w(y.v - t);
                            if (g && r !== y.v + y.offset) {
                                y.offset = r - y.v;
                                var i = Mt((parseFloat(g && g._gsap.y) || 0) - y.offset);
                                g.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + i + ", 0, 1)",
                                g._gsap.y = i + "px",
                                y.cacheID = b.cache,
                                ke()
                            }
                            return !0
                        }
                        y.offset && A(),
                        n = !0
                    }() || _ > 1.05 && "touchstart" !== t.type || e.isGesturing || t.touches && t.touches.length > 1
                }
                ,
                t.onPress = function() {
                    var t = _;
                    _ = Mt((H.visualViewport && H.visualViewport.scale || 1) / x),
                    s.pause(),
                    t !== _ && We(u, _ > 1.01 || !p && "x"),
                    a = v(),
                    o = y(),
                    M(),
                    i = Te
                }
                ,
                t.onRelease = t.onGestureStart = function(t, e) {
                    if (y.offset && A(),
                    e) {
                        b.cache++;
                        var i, n, a = S();
                        p && (n = (i = v()) + .05 * a * -t.velocityX / .227,
                        a *= je(v, i, n, It(u, k)),
                        s.vars.scrollX = T(n)),
                        n = (i = y()) + .05 * a * -t.velocityY / .227,
                        a *= je(y, i, n, It(u, D)),
                        s.vars.scrollY = w(n),
                        s.invalidate().duration(a).play(.01),
                        (ft && s.vars.scrollY >= r || i >= r - 1) && N.to({}, {
                            onUpdate: R,
                            duration: a
                        })
                    } else
                        h.restart(!0)
                }
                ,
                t.onWheel = function() {
                    s._ts && s.pause(),
                    xt() - E > 1e3 && (i = 0,
                    E = xt())
                }
                ,
                t.onChange = function(t, e, r, n, s) {
                    if (Te !== i && M(),
                    e && p && v(T(n[2] === e ? a + (t.startX - t.x) : v() + e - n[1])),
                    r) {
                        y.offset && A();
                        var h = s[2] === r
                          , l = h ? o + t.startY - t.y : y() + r - s[1]
                          , c = w(l);
                        h && l !== c && (o += c - l),
                        y(c)
                    }
                    (r || e) && ke()
                }
                ,
                t.onEnable = function() {
                    We(u, !p && "x"),
                    He.addEventListener("refresh", R),
                    ie(H, "resize", R),
                    y.smooth && (y.target.style.scrollBehavior = "auto",
                    y.smooth = v.smooth = !1),
                    P.enable()
                }
                ,
                t.onDisable = function() {
                    We(u, !0),
                    ne(H, "resize", R),
                    He.removeEventListener("refresh", R),
                    P.kill()
                }
                ,
                t.lockAxis = !1 !== t.lockAxis,
                (e = new z(t)).iOS = ft,
                ft && !y() && y(1),
                ft && N.ticker.add(wt),
                h = e._dc,
                s = N.to(e, {
                    ease: "power4",
                    paused: !0,
                    scrollX: p ? "+=0.1" : "+=0",
                    scrollY: "+=0.1",
                    onComplete: h.vars.onComplete
                }),
                e
            }(t);
            return ht && ht.target === e.target && ht.kill(),
            Dt(e.target) && (ht = e),
            e
        }
        ,
        He.core = {
            _getVelocityProp: R,
            _inputObserver: $e,
            _scrollers: b,
            _proxies: x,
            bridge: {
                ss: function() {
                    St || xe("scrollStart"),
                    St = xt()
                },
                ref: function() {
                    return K
                }
            }
        },
        kt() && N.registerPlugin(He)
    }
    ,
    "../node_modules/gsap/index.js": (t, e, r) => {
        "use strict";
        function i(t) {
            if (void 0 === t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }
        function n(t, e) {
            t.prototype = Object.create(e.prototype),
            t.prototype.constructor = t,
            t.__proto__ = e
        }
        r.d(e, {
            ZP: () => ji,
            p8: () => ji
        });
        var s, a, o, h, l, p, c, f, u, d, m, g, y, v, _, b = {
            autoSleep: 120,
            force3D: "auto",
            nullTargetWarn: 1,
            units: {
                lineHeight: ""
            }
        }, x = {
            duration: .5,
            overwrite: !1,
            delay: 0
        }, E = 1e8, S = 1e-8, P = 2 * Math.PI, C = P / 4, T = 0, w = Math.sqrt, M = Math.cos, A = Math.sin, k = function(t) {
            return "string" == typeof t
        }, D = function(t) {
            return "function" == typeof t
        }, F = function(t) {
            return "number" == typeof t
        }, I = function(t) {
            return void 0 === t
        }, R = function(t) {
            return "object" == typeof t
        }, L = function(t) {
            return !1 !== t
        }, B = function() {
            return "undefined" != typeof window
        }, V = function(t) {
            return D(t) || k(t)
        }, O = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function() {}
        , z = Array.isArray, N = /(?:-?\.?\d|\.)+/gi, G = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, H = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, q = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, j = /[+-]=-?[.\d]+/, W = /[^,'"\[\]\s]+/gi, Y = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, X = {}, $ = {}, U = function(t) {
            return ($ = Pt(t, X)) && Sr
        }, J = function(t, e) {
            return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()")
        }, Z = function(t, e) {
            return !e && console.warn(t)
        }, K = function(t, e) {
            return t && (X[t] = e) && $ && ($[t] = e) || X
        }, Q = function() {
            return 0
        }, tt = {
            suppressEvents: !0,
            isStart: !0,
            kill: !1
        }, et = {
            suppressEvents: !0,
            kill: !1
        }, rt = {
            suppressEvents: !0
        }, it = {}, nt = [], st = {}, at = {}, ot = {}, ht = 30, lt = [], pt = "", ct = function(t) {
            var e, r, i = t[0];
            if (R(i) || D(i) || (t = [t]),
            !(e = (i._gsap || {}).harness)) {
                for (r = lt.length; r-- && !lt[r].targetTest(i); )
                    ;
                e = lt[r]
            }
            for (r = t.length; r--; )
                t[r] && (t[r]._gsap || (t[r]._gsap = new Oe(t[r],e))) || t.splice(r, 1);
            return t
        }, ft = function(t) {
            return t._gsap || ct(re(t))[0]._gsap
        }, ut = function(t, e, r) {
            return (r = t[e]) && D(r) ? t[e]() : I(r) && t.getAttribute && t.getAttribute(e) || r
        }, dt = function(t, e) {
            return (t = t.split(",")).forEach(e) || t
        }, mt = function(t) {
            return Math.round(1e5 * t) / 1e5 || 0
        }, gt = function(t) {
            return Math.round(1e7 * t) / 1e7 || 0
        }, yt = function(t, e) {
            var r = e.charAt(0)
              , i = parseFloat(e.substr(2));
            return t = parseFloat(t),
            "+" === r ? t + i : "-" === r ? t - i : "*" === r ? t * i : t / i
        }, vt = function(t, e) {
            for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r; )
                ;
            return i < r
        }, _t = function() {
            var t, e, r = nt.length, i = nt.slice(0);
            for (st = {},
            nt.length = 0,
            t = 0; t < r; t++)
                (e = i[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
        }, bt = function(t, e, r, i) {
            nt.length && !a && _t(),
            t.render(e, r, i || a && e < 0 && (t._initted || t._startAt)),
            nt.length && !a && _t()
        }, xt = function(t) {
            var e = parseFloat(t);
            return (e || 0 === e) && (t + "").match(W).length < 2 ? e : k(t) ? t.trim() : t
        }, Et = function(t) {
            return t
        }, St = function(t, e) {
            for (var r in e)
                r in t || (t[r] = e[r]);
            return t
        }, Pt = function(t, e) {
            for (var r in e)
                t[r] = e[r];
            return t
        }, Ct = function t(e, r) {
            for (var i in r)
                "__proto__" !== i && "constructor" !== i && "prototype" !== i && (e[i] = R(r[i]) ? t(e[i] || (e[i] = {}), r[i]) : r[i]);
            return e
        }, Tt = function(t, e) {
            var r, i = {};
            for (r in t)
                r in e || (i[r] = t[r]);
            return i
        }, wt = function(t) {
            var e, r = t.parent || h, i = t.keyframes ? (e = z(t.keyframes),
            function(t, r) {
                for (var i in r)
                    i in t || "duration" === i && e || "ease" === i || (t[i] = r[i])
            }
            ) : St;
            if (L(t.inherit))
                for (; r; )
                    i(t, r.vars.defaults),
                    r = r.parent || r._dp;
            return t
        }, Mt = function(t, e, r, i, n) {
            void 0 === r && (r = "_first"),
            void 0 === i && (i = "_last");
            var s, a = t[i];
            if (n)
                for (s = e[n]; a && a[n] > s; )
                    a = a._prev;
            return a ? (e._next = a._next,
            a._next = e) : (e._next = t[r],
            t[r] = e),
            e._next ? e._next._prev = e : t[i] = e,
            e._prev = a,
            e.parent = e._dp = t,
            e
        }, At = function(t, e, r, i) {
            void 0 === r && (r = "_first"),
            void 0 === i && (i = "_last");
            var n = e._prev
              , s = e._next;
            n ? n._next = s : t[r] === e && (t[r] = s),
            s ? s._prev = n : t[i] === e && (t[i] = n),
            e._next = e._prev = e.parent = null
        }, kt = function(t, e) {
            t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t),
            t._act = 0
        }, Dt = function(t, e) {
            if (t && (!e || e._end > t._dur || e._start < 0))
                for (var r = t; r; )
                    r._dirty = 1,
                    r = r.parent;
            return t
        }, Ft = function(t) {
            for (var e = t.parent; e && e.parent; )
                e._dirty = 1,
                e.totalDuration(),
                e = e.parent;
            return t
        }, It = function(t, e, r, i) {
            return t._startAt && (a ? t._startAt.revert(et) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, i))
        }, Rt = function t(e) {
            return !e || e._ts && t(e.parent)
        }, Lt = function(t) {
            return t._repeat ? Bt(t._tTime, t = t.duration() + t._rDelay) * t : 0
        }, Bt = function(t, e) {
            var r = Math.floor(t /= e);
            return t && r === t ? r - 1 : r
        }, Vt = function(t, e) {
            return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
        }, Ot = function(t) {
            return t._end = gt(t._start + (t._tDur / Math.abs(t._ts || t._rts || S) || 0))
        }, zt = function(t, e) {
            var r = t._dp;
            return r && r.smoothChildTiming && t._ts && (t._start = gt(r._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)),
            Ot(t),
            r._dirty || Dt(r, t)),
            t
        }, Nt = function(t, e) {
            var r;
            if ((e._time || e._initted && !e._dur) && (r = Vt(t.rawTime(), e),
            (!e._dur || Kt(0, e.totalDuration(), r) - e._tTime > S) && e.render(r, !0)),
            Dt(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
                if (t._dur < t.duration())
                    for (r = t; r._dp; )
                        r.rawTime() >= 0 && r.totalTime(r._tTime),
                        r = r._dp;
                t._zTime = -1e-8
            }
        }, Gt = function(t, e, r, i) {
            return e.parent && kt(e),
            e._start = gt((F(r) ? r : r || t !== h ? Ut(t, r, e) : t._time) + e._delay),
            e._end = gt(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)),
            Mt(t, e, "_first", "_last", t._sort ? "_start" : 0),
            Wt(e) || (t._recent = e),
            i || Nt(t, e),
            t._ts < 0 && zt(t, t._tTime),
            t
        }, Ht = function(t, e) {
            return (X.ScrollTrigger || J("scrollTrigger", e)) && X.ScrollTrigger.create(e, t)
        }, qt = function(t, e, r, i, n) {
            return Ye(t, e, n),
            t._initted ? !r && t._pt && !a && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && u !== Ce.frame ? (nt.push(t),
            t._lazy = [n, i],
            1) : void 0 : 1
        }, jt = function t(e) {
            var r = e.parent;
            return r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || t(r))
        }, Wt = function(t) {
            var e = t.data;
            return "isFromStart" === e || "isStart" === e
        }, Yt = function(t, e, r, i) {
            var n = t._repeat
              , s = gt(e) || 0
              , a = t._tTime / t._tDur;
            return a && !i && (t._time *= s / t._dur),
            t._dur = s,
            t._tDur = n ? n < 0 ? 1e10 : gt(s * (n + 1) + t._rDelay * n) : s,
            a > 0 && !i && zt(t, t._tTime = t._tDur * a),
            t.parent && Ot(t),
            r || Dt(t.parent, t),
            t
        }, Xt = function(t) {
            return t instanceof Ne ? Dt(t) : Yt(t, t._dur)
        }, $t = {
            _start: 0,
            endTime: Q,
            totalDuration: Q
        }, Ut = function t(e, r, i) {
            var n, s, a, o = e.labels, h = e._recent || $t, l = e.duration() >= E ? h.endTime(!1) : e._dur;
            return k(r) && (isNaN(r) || r in o) ? (s = r.charAt(0),
            a = "%" === r.substr(-1),
            n = r.indexOf("="),
            "<" === s || ">" === s ? (n >= 0 && (r = r.replace(/=/, "")),
            ("<" === s ? h._start : h.endTime(h._repeat >= 0)) + (parseFloat(r.substr(1)) || 0) * (a ? (n < 0 ? h : i).totalDuration() / 100 : 1)) : n < 0 ? (r in o || (o[r] = l),
            o[r]) : (s = parseFloat(r.charAt(n - 1) + r.substr(n + 1)),
            a && i && (s = s / 100 * (z(i) ? i[0] : i).totalDuration()),
            n > 1 ? t(e, r.substr(0, n - 1), i) + s : l + s)) : null == r ? l : +r
        }, Jt = function(t, e, r) {
            var i, n, s = F(e[1]), a = (s ? 2 : 1) + (t < 2 ? 0 : 1), o = e[a];
            if (s && (o.duration = e[1]),
            o.parent = r,
            t) {
                for (i = o,
                n = r; n && !("immediateRender"in i); )
                    i = n.vars.defaults || {},
                    n = L(n.vars.inherit) && n.parent;
                o.immediateRender = L(i.immediateRender),
                t < 2 ? o.runBackwards = 1 : o.startAt = e[a - 1]
            }
            return new Ze(e[0],o,e[a + 1])
        }, Zt = function(t, e) {
            return t || 0 === t ? e(t) : e
        }, Kt = function(t, e, r) {
            return r < t ? t : r > e ? e : r
        }, Qt = function(t, e) {
            return k(t) && (e = Y.exec(t)) ? e[1] : ""
        }, te = [].slice, ee = function(t, e) {
            return t && R(t) && "length"in t && (!e && !t.length || t.length - 1 in t && R(t[0])) && !t.nodeType && t !== l
        }, re = function(t, e, r) {
            return o && !e && o.selector ? o.selector(t) : !k(t) || r || !p && Te() ? z(t) ? function(t, e, r) {
                return void 0 === r && (r = []),
                t.forEach((function(t) {
                    var i;
                    return k(t) && !e || ee(t, 1) ? (i = r).push.apply(i, re(t)) : r.push(t)
                }
                )) || r
            }(t, r) : ee(t) ? te.call(t, 0) : t ? [t] : [] : te.call((e || c).querySelectorAll(t), 0)
        }, ie = function(t) {
            return t = re(t)[0] || Z("Invalid scope") || {},
            function(e) {
                var r = t.current || t.nativeElement || t;
                return re(e, r.querySelectorAll ? r : r === t ? Z("Invalid scope") || c.createElement("div") : t)
            }
        }, ne = function(t) {
            return t.sort((function() {
                return .5 - Math.random()
            }
            ))
        }, se = function(t) {
            if (D(t))
                return t;
            var e = R(t) ? t : {
                each: t
            }
              , r = Ie(e.ease)
              , i = e.from || 0
              , n = parseFloat(e.base) || 0
              , s = {}
              , a = i > 0 && i < 1
              , o = isNaN(i) || a
              , h = e.axis
              , l = i
              , p = i;
            return k(i) ? l = p = {
                center: .5,
                edges: .5,
                end: 1
            }[i] || 0 : !a && o && (l = i[0],
            p = i[1]),
            function(t, a, c) {
                var f, u, d, m, g, y, v, _, b, x = (c || e).length, S = s[x];
                if (!S) {
                    if (!(b = "auto" === e.grid ? 0 : (e.grid || [1, E])[1])) {
                        for (v = -E; v < (v = c[b++].getBoundingClientRect().left) && b < x; )
                            ;
                        b--
                    }
                    for (S = s[x] = [],
                    f = o ? Math.min(b, x) * l - .5 : i % b,
                    u = b === E ? 0 : o ? x * p / b - .5 : i / b | 0,
                    v = 0,
                    _ = E,
                    y = 0; y < x; y++)
                        d = y % b - f,
                        m = u - (y / b | 0),
                        S[y] = g = h ? Math.abs("y" === h ? m : d) : w(d * d + m * m),
                        g > v && (v = g),
                        g < _ && (_ = g);
                    "random" === i && ne(S),
                    S.max = v - _,
                    S.min = _,
                    S.v = x = (parseFloat(e.amount) || parseFloat(e.each) * (b > x ? x - 1 : h ? "y" === h ? x / b : b : Math.max(b, x / b)) || 0) * ("edges" === i ? -1 : 1),
                    S.b = x < 0 ? n - x : n,
                    S.u = Qt(e.amount || e.each) || 0,
                    r = r && x < 0 ? De(r) : r
                }
                return x = (S[t] - S.min) / S.max || 0,
                gt(S.b + (r ? r(x) : x) * S.v) + S.u
            }
        }, ae = function(t) {
            var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
            return function(r) {
                var i = gt(Math.round(parseFloat(r) / t) * t * e);
                return (i - i % 1) / e + (F(r) ? 0 : Qt(r))
            }
        }, oe = function(t, e) {
            var r, i, n = z(t);
            return !n && R(t) && (r = n = t.radius || E,
            t.values ? (t = re(t.values),
            (i = !F(t[0])) && (r *= r)) : t = ae(t.increment)),
            Zt(e, n ? D(t) ? function(e) {
                return i = t(e),
                Math.abs(i - e) <= r ? i : e
            }
            : function(e) {
                for (var n, s, a = parseFloat(i ? e.x : e), o = parseFloat(i ? e.y : 0), h = E, l = 0, p = t.length; p--; )
                    (n = i ? (n = t[p].x - a) * n + (s = t[p].y - o) * s : Math.abs(t[p] - a)) < h && (h = n,
                    l = p);
                return l = !r || h <= r ? t[l] : e,
                i || l === e || F(e) ? l : l + Qt(e)
            }
            : ae(t))
        }, he = function(t, e, r, i) {
            return Zt(z(t) ? !e : !0 === r ? !!(r = 0) : !i, (function() {
                return z(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + .99 * r)) / r) * r * i) / i
            }
            ))
        }, le = function(t, e, r) {
            return Zt(r, (function(r) {
                return t[~~e(r)]
            }
            ))
        }, pe = function(t) {
            for (var e, r, i, n, s = 0, a = ""; ~(e = t.indexOf("random(", s)); )
                i = t.indexOf(")", e),
                n = "[" === t.charAt(e + 7),
                r = t.substr(e + 7, i - e - 7).match(n ? W : N),
                a += t.substr(s, e - s) + he(n ? r : +r[0], n ? 0 : +r[1], +r[2] || 1e-5),
                s = i + 1;
            return a + t.substr(s, t.length - s)
        }, ce = function(t, e, r, i, n) {
            var s = e - t
              , a = i - r;
            return Zt(n, (function(e) {
                return r + ((e - t) / s * a || 0)
            }
            ))
        }, fe = function(t, e, r) {
            var i, n, s, a = t.labels, o = E;
            for (i in a)
                (n = a[i] - e) < 0 == !!r && n && o > (n = Math.abs(n)) && (s = i,
                o = n);
            return s
        }, ue = function(t, e, r) {
            var i, n, s, a = t.vars, h = a[e], l = o, p = t._ctx;
            if (h)
                return i = a[e + "Params"],
                n = a.callbackScope || t,
                r && nt.length && _t(),
                p && (o = p),
                s = i ? h.apply(n, i) : h.call(n),
                o = l,
                s
        }, de = function(t) {
            return kt(t),
            t.scrollTrigger && t.scrollTrigger.kill(!!a),
            t.progress() < 1 && ue(t, "onInterrupt"),
            t
        }, me = function(t) {
            var e = (t = !t.name && t.default || t).name
              , r = D(t)
              , i = e && !r && t.init ? function() {
                this._props = []
            }
            : t
              , n = {
                init: Q,
                render: ar,
                add: je,
                kill: hr,
                modifier: or,
                rawVars: 0
            }
              , s = {
                targetTest: 0,
                get: 0,
                getSetter: rr,
                aliases: {},
                register: 0
            };
            if (Te(),
            t !== i) {
                if (at[e])
                    return;
                St(i, St(Tt(t, n), s)),
                Pt(i.prototype, Pt(n, Tt(t, s))),
                at[i.prop = e] = i,
                t.targetTest && (lt.push(i),
                it[e] = 1),
                e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
            }
            K(e, i),
            t.register && t.register(Sr, i, cr)
        }, ge = 255, ye = {
            aqua: [0, ge, ge],
            lime: [0, ge, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, ge],
            navy: [0, 0, 128],
            white: [ge, ge, ge],
            olive: [128, 128, 0],
            yellow: [ge, ge, 0],
            orange: [ge, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [ge, 0, 0],
            pink: [ge, 192, 203],
            cyan: [0, ge, ge],
            transparent: [ge, ge, ge, 0]
        }, ve = function(t, e, r) {
            return (6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1 ? e + (r - e) * t * 6 : t < .5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * ge + .5 | 0
        }, _e = function(t, e, r) {
            var i, n, s, a, o, h, l, p, c, f, u = t ? F(t) ? [t >> 16, t >> 8 & ge, t & ge] : 0 : ye.black;
            if (!u) {
                if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)),
                ye[t])
                    u = ye[t];
                else if ("#" === t.charAt(0)) {
                    if (t.length < 6 && (i = t.charAt(1),
                    n = t.charAt(2),
                    s = t.charAt(3),
                    t = "#" + i + i + n + n + s + s + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")),
                    9 === t.length)
                        return [(u = parseInt(t.substr(1, 6), 16)) >> 16, u >> 8 & ge, u & ge, parseInt(t.substr(7), 16) / 255];
                    u = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & ge, t & ge]
                } else if ("hsl" === t.substr(0, 3))
                    if (u = f = t.match(N),
                    e) {
                        if (~t.indexOf("="))
                            return u = t.match(G),
                            r && u.length < 4 && (u[3] = 1),
                            u
                    } else
                        a = +u[0] % 360 / 360,
                        o = +u[1] / 100,
                        i = 2 * (h = +u[2] / 100) - (n = h <= .5 ? h * (o + 1) : h + o - h * o),
                        u.length > 3 && (u[3] *= 1),
                        u[0] = ve(a + 1 / 3, i, n),
                        u[1] = ve(a, i, n),
                        u[2] = ve(a - 1 / 3, i, n);
                else
                    u = t.match(N) || ye.transparent;
                u = u.map(Number)
            }
            return e && !f && (i = u[0] / ge,
            n = u[1] / ge,
            s = u[2] / ge,
            h = ((l = Math.max(i, n, s)) + (p = Math.min(i, n, s))) / 2,
            l === p ? a = o = 0 : (c = l - p,
            o = h > .5 ? c / (2 - l - p) : c / (l + p),
            a = l === i ? (n - s) / c + (n < s ? 6 : 0) : l === n ? (s - i) / c + 2 : (i - n) / c + 4,
            a *= 60),
            u[0] = ~~(a + .5),
            u[1] = ~~(100 * o + .5),
            u[2] = ~~(100 * h + .5)),
            r && u.length < 4 && (u[3] = 1),
            u
        }, be = function(t) {
            var e = []
              , r = []
              , i = -1;
            return t.split(Ee).forEach((function(t) {
                var n = t.match(H) || [];
                e.push.apply(e, n),
                r.push(i += n.length + 1)
            }
            )),
            e.c = r,
            e
        }, xe = function(t, e, r) {
            var i, n, s, a, o = "", h = (t + o).match(Ee), l = e ? "hsla(" : "rgba(", p = 0;
            if (!h)
                return t;
            if (h = h.map((function(t) {
                return (t = _e(t, e, 1)) && l + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")"
            }
            )),
            r && (s = be(t),
            (i = r.c).join(o) !== s.c.join(o)))
                for (a = (n = t.replace(Ee, "1").split(H)).length - 1; p < a; p++)
                    o += n[p] + (~i.indexOf(p) ? h.shift() || l + "0,0,0,0)" : (s.length ? s : h.length ? h : r).shift());
            if (!n)
                for (a = (n = t.split(Ee)).length - 1; p < a; p++)
                    o += n[p] + h[p];
            return o + n[a]
        }, Ee = function() {
            var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
            for (t in ye)
                e += "|" + t + "\\b";
            return new RegExp(e + ")","gi")
        }(), Se = /hsl[a]?\(/, Pe = function(t) {
            var e, r = t.join(" ");
            if (Ee.lastIndex = 0,
            Ee.test(r))
                return e = Se.test(r),
                t[1] = xe(t[1], e),
                t[0] = xe(t[0], e, be(t[1])),
                !0
        }, Ce = function() {
            var t, e, r, i, n, s, a = Date.now, o = 500, h = 33, u = a(), d = u, g = 1e3 / 240, y = g, v = [], _ = function r(l) {
                var p, c, f, m, _ = a() - d, b = !0 === l;
                if (_ > o && (u += _ - h),
                ((p = (f = (d += _) - u) - y) > 0 || b) && (m = ++i.frame,
                n = f - 1e3 * i.time,
                i.time = f /= 1e3,
                y += p + (p >= g ? 4 : g - p),
                c = 1),
                b || (t = e(r)),
                c)
                    for (s = 0; s < v.length; s++)
                        v[s](f, n, m, l)
            };
            return i = {
                time: 0,
                frame: 0,
                tick: function() {
                    _(!0)
                },
                deltaRatio: function(t) {
                    return n / (1e3 / (t || 60))
                },
                wake: function() {
                    f && (!p && B() && (l = p = window,
                    c = l.document || {},
                    X.gsap = Sr,
                    (l.gsapVersions || (l.gsapVersions = [])).push(Sr.version),
                    U($ || l.GreenSockGlobals || !l.gsap && l || {}),
                    r = l.requestAnimationFrame),
                    t && i.sleep(),
                    e = r || function(t) {
                        return setTimeout(t, y - 1e3 * i.time + 1 | 0)
                    }
                    ,
                    m = 1,
                    _(2))
                },
                sleep: function() {
                    (r ? l.cancelAnimationFrame : clearTimeout)(t),
                    m = 0,
                    e = Q
                },
                lagSmoothing: function(t, e) {
                    o = t || 1 / 0,
                    h = Math.min(e || 33, o)
                },
                fps: function(t) {
                    g = 1e3 / (t || 240),
                    y = 1e3 * i.time + g
                },
                add: function(t, e, r) {
                    var n = e ? function(e, r, s, a) {
                        t(e, r, s, a),
                        i.remove(n)
                    }
                    : t;
                    return i.remove(t),
                    v[r ? "unshift" : "push"](n),
                    Te(),
                    n
                },
                remove: function(t, e) {
                    ~(e = v.indexOf(t)) && v.splice(e, 1) && s >= e && s--
                },
                _listeners: v
            }
        }(), Te = function() {
            return !m && Ce.wake()
        }, we = {}, Me = /^[\d.\-M][\d.\-,\s]/, Ae = /["']/g, ke = function(t) {
            for (var e, r, i, n = {}, s = t.substr(1, t.length - 3).split(":"), a = s[0], o = 1, h = s.length; o < h; o++)
                r = s[o],
                e = o !== h - 1 ? r.lastIndexOf(",") : r.length,
                i = r.substr(0, e),
                n[a] = isNaN(i) ? i.replace(Ae, "").trim() : +i,
                a = r.substr(e + 1).trim();
            return n
        }, De = function(t) {
            return function(e) {
                return 1 - t(1 - e)
            }
        }, Fe = function t(e, r) {
            for (var i, n = e._first; n; )
                n instanceof Ne ? t(n, r) : !n.vars.yoyoEase || n._yoyo && n._repeat || n._yoyo === r || (n.timeline ? t(n.timeline, r) : (i = n._ease,
                n._ease = n._yEase,
                n._yEase = i,
                n._yoyo = r)),
                n = n._next
        }, Ie = function(t, e) {
            return t && (D(t) ? t : we[t] || function(t) {
                var e, r, i, n, s = (t + "").split("("), a = we[s[0]];
                return a && s.length > 1 && a.config ? a.config.apply(null, ~t.indexOf("{") ? [ke(s[1])] : (e = t,
                r = e.indexOf("(") + 1,
                i = e.indexOf(")"),
                n = e.indexOf("(", r),
                e.substring(r, ~n && n < i ? e.indexOf(")", i + 1) : i)).split(",").map(xt)) : we._CE && Me.test(t) ? we._CE("", t) : a
            }(t)) || e
        }, Re = function(t, e, r, i) {
            void 0 === r && (r = function(t) {
                return 1 - e(1 - t)
            }
            ),
            void 0 === i && (i = function(t) {
                return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
            }
            );
            var n, s = {
                easeIn: e,
                easeOut: r,
                easeInOut: i
            };
            return dt(t, (function(t) {
                for (var e in we[t] = X[t] = s,
                we[n = t.toLowerCase()] = r,
                s)
                    we[n + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = we[t + "." + e] = s[e]
            }
            )),
            s
        }, Le = function(t) {
            return function(e) {
                return e < .5 ? (1 - t(1 - 2 * e)) / 2 : .5 + t(2 * (e - .5)) / 2
            }
        }, Be = function t(e, r, i) {
            var n = r >= 1 ? r : 1
              , s = (i || (e ? .3 : .45)) / (r < 1 ? r : 1)
              , a = s / P * (Math.asin(1 / n) || 0)
              , o = function(t) {
                return 1 === t ? 1 : n * Math.pow(2, -10 * t) * A((t - a) * s) + 1
            }
              , h = "out" === e ? o : "in" === e ? function(t) {
                return 1 - o(1 - t)
            }
            : Le(o);
            return s = P / s,
            h.config = function(r, i) {
                return t(e, r, i)
            }
            ,
            h
        }, Ve = function t(e, r) {
            void 0 === r && (r = 1.70158);
            var i = function(t) {
                return t ? --t * t * ((r + 1) * t + r) + 1 : 0
            }
              , n = "out" === e ? i : "in" === e ? function(t) {
                return 1 - i(1 - t)
            }
            : Le(i);
            return n.config = function(r) {
                return t(e, r)
            }
            ,
            n
        };
        dt("Linear,Quad,Cubic,Quart,Quint,Strong", (function(t, e) {
            var r = e < 5 ? e + 1 : e;
            Re(t + ",Power" + (r - 1), e ? function(t) {
                return Math.pow(t, r)
            }
            : function(t) {
                return t
            }
            , (function(t) {
                return 1 - Math.pow(1 - t, r)
            }
            ), (function(t) {
                return t < .5 ? Math.pow(2 * t, r) / 2 : 1 - Math.pow(2 * (1 - t), r) / 2
            }
            ))
        }
        )),
        we.Linear.easeNone = we.none = we.Linear.easeIn,
        Re("Elastic", Be("in"), Be("out"), Be()),
        g = 7.5625,
        v = 1 / (y = 2.75),
        Re("Bounce", (function(t) {
            return 1 - _(1 - t)
        }
        ), _ = function(t) {
            return t < v ? g * t * t : t < .7272727272727273 ? g * Math.pow(t - 1.5 / y, 2) + .75 : t < .9090909090909092 ? g * (t -= 2.25 / y) * t + .9375 : g * Math.pow(t - 2.625 / y, 2) + .984375
        }
        ),
        Re("Expo", (function(t) {
            return t ? Math.pow(2, 10 * (t - 1)) : 0
        }
        )),
        Re("Circ", (function(t) {
            return -(w(1 - t * t) - 1)
        }
        )),
        Re("Sine", (function(t) {
            return 1 === t ? 1 : 1 - M(t * C)
        }
        )),
        Re("Back", Ve("in"), Ve("out"), Ve()),
        we.SteppedEase = we.steps = X.SteppedEase = {
            config: function(t, e) {
                void 0 === t && (t = 1);
                var r = 1 / t
                  , i = t + (e ? 0 : 1)
                  , n = e ? 1 : 0;
                return function(t) {
                    return ((i * Kt(0, .99999999, t) | 0) + n) * r
                }
            }
        },
        x.ease = we["quad.out"],
        dt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function(t) {
            return pt += t + "," + t + "Params,"
        }
        ));
        var Oe = function(t, e) {
            this.id = T++,
            t._gsap = this,
            this.target = t,
            this.harness = e,
            this.get = e ? e.get : ut,
            this.set = e ? e.getSetter : rr
        }
          , ze = function() {
            function t(t) {
                this.vars = t,
                this._delay = +t.delay || 0,
                (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0,
                this._yoyo = !!t.yoyo || !!t.yoyoEase),
                this._ts = 1,
                Yt(this, +t.duration, 1, 1),
                this.data = t.data,
                o && (this._ctx = o,
                o.data.push(this)),
                m || Ce.wake()
            }
            var e = t.prototype;
            return e.delay = function(t) {
                return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay),
                this._delay = t,
                this) : this._delay
            }
            ,
            e.duration = function(t) {
                return arguments.length ? this.totalDuration(this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur
            }
            ,
            e.totalDuration = function(t) {
                return arguments.length ? (this._dirty = 0,
                Yt(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
            }
            ,
            e.totalTime = function(t, e) {
                if (Te(),
                !arguments.length)
                    return this._tTime;
                var r = this._dp;
                if (r && r.smoothChildTiming && this._ts) {
                    for (zt(this, t),
                    !r._dp || r.parent || Nt(r, this); r && r.parent; )
                        r.parent._time !== r._start + (r._ts >= 0 ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0),
                        r = r.parent;
                    !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && t < this._tDur || this._ts < 0 && t > 0 || !this._tDur && !t) && Gt(this._dp, this, this._start - this._delay)
                }
                return (this._tTime !== t || !this._dur && !e || this._initted && Math.abs(this._zTime) === S || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t),
                bt(this, t, e)),
                this
            }
            ,
            e.time = function(t, e) {
                return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + Lt(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e) : this._time
            }
            ,
            e.totalProgress = function(t, e) {
                return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
            }
            ,
            e.progress = function(t, e) {
                return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + Lt(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
            }
            ,
            e.iteration = function(t, e) {
                var r = this.duration() + this._rDelay;
                return arguments.length ? this.totalTime(this._time + (t - 1) * r, e) : this._repeat ? Bt(this._tTime, r) + 1 : 1
            }
            ,
            e.timeScale = function(t) {
                if (!arguments.length)
                    return -1e-8 === this._rts ? 0 : this._rts;
                if (this._rts === t)
                    return this;
                var e = this.parent && this._ts ? Vt(this.parent._time, this) : this._tTime;
                return this._rts = +t || 0,
                this._ts = this._ps || -1e-8 === t ? 0 : this._rts,
                this.totalTime(Kt(-this._delay, this._tDur, e), !0),
                Ot(this),
                Ft(this)
            }
            ,
            e.paused = function(t) {
                return arguments.length ? (this._ps !== t && (this._ps = t,
                t ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()),
                this._ts = this._act = 0) : (Te(),
                this._ts = this._rts,
                this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== S && (this._tTime -= S)))),
                this) : this._ps
            }
            ,
            e.startTime = function(t) {
                if (arguments.length) {
                    this._start = t;
                    var e = this.parent || this._dp;
                    return e && (e._sort || !this.parent) && Gt(e, this, t - this._delay),
                    this
                }
                return this._start
            }
            ,
            e.endTime = function(t) {
                return this._start + (L(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
            }
            ,
            e.rawTime = function(t) {
                var e = this.parent || this._dp;
                return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Vt(e.rawTime(t), this) : this._tTime : this._tTime
            }
            ,
            e.revert = function(t) {
                void 0 === t && (t = rt);
                var e = a;
                return a = t,
                (this._initted || this._startAt) && (this.timeline && this.timeline.revert(t),
                this.totalTime(-.01, t.suppressEvents)),
                "nested" !== this.data && !1 !== t.kill && this.kill(),
                a = e,
                this
            }
            ,
            e.globalTime = function(t) {
                for (var e = this, r = arguments.length ? t : e.rawTime(); e; )
                    r = e._start + r / (e._ts || 1),
                    e = e._dp;
                return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 : this._sat.globalTime(t) : r
            }
            ,
            e.repeat = function(t) {
                return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t,
                Xt(this)) : -2 === this._repeat ? 1 / 0 : this._repeat
            }
            ,
            e.repeatDelay = function(t) {
                if (arguments.length) {
                    var e = this._time;
                    return this._rDelay = t,
                    Xt(this),
                    e ? this.time(e) : this
                }
                return this._rDelay
            }
            ,
            e.yoyo = function(t) {
                return arguments.length ? (this._yoyo = t,
                this) : this._yoyo
            }
            ,
            e.seek = function(t, e) {
                return this.totalTime(Ut(this, t), L(e))
            }
            ,
            e.restart = function(t, e) {
                return this.play().totalTime(t ? -this._delay : 0, L(e))
            }
            ,
            e.play = function(t, e) {
                return null != t && this.seek(t, e),
                this.reversed(!1).paused(!1)
            }
            ,
            e.reverse = function(t, e) {
                return null != t && this.seek(t || this.totalDuration(), e),
                this.reversed(!0).paused(!1)
            }
            ,
            e.pause = function(t, e) {
                return null != t && this.seek(t, e),
                this.paused(!0)
            }
            ,
            e.resume = function() {
                return this.paused(!1)
            }
            ,
            e.reversed = function(t) {
                return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -1e-8 : 0)),
                this) : this._rts < 0
            }
            ,
            e.invalidate = function() {
                return this._initted = this._act = 0,
                this._zTime = -1e-8,
                this
            }
            ,
            e.isActive = function() {
                var t, e = this.parent || this._dp, r = this._start;
                return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= r && t < this.endTime(!0) - S))
            }
            ,
            e.eventCallback = function(t, e, r) {
                var i = this.vars;
                return arguments.length > 1 ? (e ? (i[t] = e,
                r && (i[t + "Params"] = r),
                "onUpdate" === t && (this._onUpdate = e)) : delete i[t],
                this) : i[t]
            }
            ,
            e.then = function(t) {
                var e = this;
                return new Promise((function(r) {
                    var i = D(t) ? t : Et
                      , n = function() {
                        var t = e.then;
                        e.then = null,
                        D(i) && (i = i(e)) && (i.then || i === e) && (e.then = t),
                        r(i),
                        e.then = t
                    };
                    e._initted && 1 === e.totalProgress() && e._ts >= 0 || !e._tTime && e._ts < 0 ? n() : e._prom = n
                }
                ))
            }
            ,
            e.kill = function() {
                de(this)
            }
            ,
            t
        }();
        St(ze.prototype, {
            _time: 0,
            _start: 0,
            _end: 0,
            _tTime: 0,
            _tDur: 0,
            _dirty: 0,
            _repeat: 0,
            _yoyo: !1,
            parent: null,
            _initted: !1,
            _rDelay: 0,
            _ts: 1,
            _dp: 0,
            ratio: 0,
            _zTime: -1e-8,
            _prom: 0,
            _ps: !1,
            _rts: 1
        });
        var Ne = function(t) {
            function e(e, r) {
                var n;
                return void 0 === e && (e = {}),
                (n = t.call(this, e) || this).labels = {},
                n.smoothChildTiming = !!e.smoothChildTiming,
                n.autoRemoveChildren = !!e.autoRemoveChildren,
                n._sort = L(e.sortChildren),
                h && Gt(e.parent || h, i(n), r),
                e.reversed && n.reverse(),
                e.paused && n.paused(!0),
                e.scrollTrigger && Ht(i(n), e.scrollTrigger),
                n
            }
            n(e, t);
            var r = e.prototype;
            return r.to = function(t, e, r) {
                return Jt(0, arguments, this),
                this
            }
            ,
            r.from = function(t, e, r) {
                return Jt(1, arguments, this),
                this
            }
            ,
            r.fromTo = function(t, e, r, i) {
                return Jt(2, arguments, this),
                this
            }
            ,
            r.set = function(t, e, r) {
                return e.duration = 0,
                e.parent = this,
                wt(e).repeatDelay || (e.repeat = 0),
                e.immediateRender = !!e.immediateRender,
                new Ze(t,e,Ut(this, r),1),
                this
            }
            ,
            r.call = function(t, e, r) {
                return Gt(this, Ze.delayedCall(0, t, e), r)
            }
            ,
            r.staggerTo = function(t, e, r, i, n, s, a) {
                return r.duration = e,
                r.stagger = r.stagger || i,
                r.onComplete = s,
                r.onCompleteParams = a,
                r.parent = this,
                new Ze(t,r,Ut(this, n)),
                this
            }
            ,
            r.staggerFrom = function(t, e, r, i, n, s, a) {
                return r.runBackwards = 1,
                wt(r).immediateRender = L(r.immediateRender),
                this.staggerTo(t, e, r, i, n, s, a)
            }
            ,
            r.staggerFromTo = function(t, e, r, i, n, s, a, o) {
                return i.startAt = r,
                wt(i).immediateRender = L(i.immediateRender),
                this.staggerTo(t, e, i, n, s, a, o)
            }
            ,
            r.render = function(t, e, r) {
                var i, n, s, o, l, p, c, f, u, d, m, g, y = this._time, v = this._dirty ? this.totalDuration() : this._tDur, _ = this._dur, b = t <= 0 ? 0 : gt(t), x = this._zTime < 0 != t < 0 && (this._initted || !_);
                if (this !== h && b > v && t >= 0 && (b = v),
                b !== this._tTime || r || x) {
                    if (y !== this._time && _ && (b += this._time - y,
                    t += this._time - y),
                    i = b,
                    u = this._start,
                    p = !(f = this._ts),
                    x && (_ || (y = this._zTime),
                    (t || !e) && (this._zTime = t)),
                    this._repeat) {
                        if (m = this._yoyo,
                        l = _ + this._rDelay,
                        this._repeat < -1 && t < 0)
                            return this.totalTime(100 * l + t, e, r);
                        if (i = gt(b % l),
                        b === v ? (o = this._repeat,
                        i = _) : ((o = ~~(b / l)) && o === b / l && (i = _,
                        o--),
                        i > _ && (i = _)),
                        d = Bt(this._tTime, l),
                        !y && this._tTime && d !== o && (d = o),
                        m && 1 & o && (i = _ - i,
                        g = 1),
                        o !== d && !this._lock) {
                            var E = m && 1 & d
                              , P = E === (m && 1 & o);
                            if (o < d && (E = !E),
                            y = E ? 0 : _,
                            this._lock = 1,
                            this.render(y || (g ? 0 : gt(o * l)), e, !_)._lock = 0,
                            this._tTime = b,
                            !e && this.parent && ue(this, "onRepeat"),
                            this.vars.repeatRefresh && !g && (this.invalidate()._lock = 1),
                            y && y !== this._time || p !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
                                return this;
                            if (_ = this._dur,
                            v = this._tDur,
                            P && (this._lock = 2,
                            y = E ? _ : -1e-4,
                            this.render(y, !0),
                            this.vars.repeatRefresh && !g && this.invalidate()),
                            this._lock = 0,
                            !this._ts && !p)
                                return this;
                            Fe(this, g)
                        }
                    }
                    if (this._hasPause && !this._forcing && this._lock < 2 && (c = function(t, e, r) {
                        var i;
                        if (r > e)
                            for (i = t._first; i && i._start <= r; ) {
                                if ("isPause" === i.data && i._start > e)
                                    return i;
                                i = i._next
                            }
                        else
                            for (i = t._last; i && i._start >= r; ) {
                                if ("isPause" === i.data && i._start < e)
                                    return i;
                                i = i._prev
                            }
                    }(this, gt(y), gt(i)),
                    c && (b -= i - (i = c._start))),
                    this._tTime = b,
                    this._time = i,
                    this._act = !f,
                    this._initted || (this._onUpdate = this.vars.onUpdate,
                    this._initted = 1,
                    this._zTime = t,
                    y = 0),
                    !y && i && !e && (ue(this, "onStart"),
                    this._tTime !== b))
                        return this;
                    if (i >= y && t >= 0)
                        for (n = this._first; n; ) {
                            if (s = n._next,
                            (n._act || i >= n._start) && n._ts && c !== n) {
                                if (n.parent !== this)
                                    return this.render(t, e, r);
                                if (n.render(n._ts > 0 ? (i - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (i - n._start) * n._ts, e, r),
                                i !== this._time || !this._ts && !p) {
                                    c = 0,
                                    s && (b += this._zTime = -1e-8);
                                    break
                                }
                            }
                            n = s
                        }
                    else {
                        n = this._last;
                        for (var C = t < 0 ? t : i; n; ) {
                            if (s = n._prev,
                            (n._act || C <= n._end) && n._ts && c !== n) {
                                if (n.parent !== this)
                                    return this.render(t, e, r);
                                if (n.render(n._ts > 0 ? (C - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (C - n._start) * n._ts, e, r || a && (n._initted || n._startAt)),
                                i !== this._time || !this._ts && !p) {
                                    c = 0,
                                    s && (b += this._zTime = C ? -1e-8 : S);
                                    break
                                }
                            }
                            n = s
                        }
                    }
                    if (c && !e && (this.pause(),
                    c.render(i >= y ? 0 : -1e-8)._zTime = i >= y ? 1 : -1,
                    this._ts))
                        return this._start = u,
                        Ot(this),
                        this.render(t, e, r);
                    this._onUpdate && !e && ue(this, "onUpdate", !0),
                    (b === v && this._tTime >= this.totalDuration() || !b && y) && (u !== this._start && Math.abs(f) === Math.abs(this._ts) || this._lock || ((t || !_) && (b === v && this._ts > 0 || !b && this._ts < 0) && kt(this, 1),
                    e || t < 0 && !y || !b && !y && v || (ue(this, b === v && t >= 0 ? "onComplete" : "onReverseComplete", !0),
                    this._prom && !(b < v && this.timeScale() > 0) && this._prom())))
                }
                return this
            }
            ,
            r.add = function(t, e) {
                var r = this;
                if (F(e) || (e = Ut(this, e, t)),
                !(t instanceof ze)) {
                    if (z(t))
                        return t.forEach((function(t) {
                            return r.add(t, e)
                        }
                        )),
                        this;
                    if (k(t))
                        return this.addLabel(t, e);
                    if (!D(t))
                        return this;
                    t = Ze.delayedCall(0, t)
                }
                return this !== t ? Gt(this, t, e) : this
            }
            ,
            r.getChildren = function(t, e, r, i) {
                void 0 === t && (t = !0),
                void 0 === e && (e = !0),
                void 0 === r && (r = !0),
                void 0 === i && (i = -E);
                for (var n = [], s = this._first; s; )
                    s._start >= i && (s instanceof Ze ? e && n.push(s) : (r && n.push(s),
                    t && n.push.apply(n, s.getChildren(!0, e, r)))),
                    s = s._next;
                return n
            }
            ,
            r.getById = function(t) {
                for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
                    if (e[r].vars.id === t)
                        return e[r]
            }
            ,
            r.remove = function(t) {
                return k(t) ? this.removeLabel(t) : D(t) ? this.killTweensOf(t) : (At(this, t),
                t === this._recent && (this._recent = this._last),
                Dt(this))
            }
            ,
            r.totalTime = function(e, r) {
                return arguments.length ? (this._forcing = 1,
                !this._dp && this._ts && (this._start = gt(Ce.time - (this._ts > 0 ? e / this._ts : (this.totalDuration() - e) / -this._ts))),
                t.prototype.totalTime.call(this, e, r),
                this._forcing = 0,
                this) : this._tTime
            }
            ,
            r.addLabel = function(t, e) {
                return this.labels[t] = Ut(this, e),
                this
            }
            ,
            r.removeLabel = function(t) {
                return delete this.labels[t],
                this
            }
            ,
            r.addPause = function(t, e, r) {
                var i = Ze.delayedCall(0, e || Q, r);
                return i.data = "isPause",
                this._hasPause = 1,
                Gt(this, i, Ut(this, t))
            }
            ,
            r.removePause = function(t) {
                var e = this._first;
                for (t = Ut(this, t); e; )
                    e._start === t && "isPause" === e.data && kt(e),
                    e = e._next
            }
            ,
            r.killTweensOf = function(t, e, r) {
                for (var i = this.getTweensOf(t, r), n = i.length; n--; )
                    Ge !== i[n] && i[n].kill(t, e);
                return this
            }
            ,
            r.getTweensOf = function(t, e) {
                for (var r, i = [], n = re(t), s = this._first, a = F(e); s; )
                    s instanceof Ze ? vt(s._targets, n) && (a ? (!Ge || s._initted && s._ts) && s.globalTime(0) <= e && s.globalTime(s.totalDuration()) > e : !e || s.isActive()) && i.push(s) : (r = s.getTweensOf(n, e)).length && i.push.apply(i, r),
                    s = s._next;
                return i
            }
            ,
            r.tweenTo = function(t, e) {
                e = e || {};
                var r, i = this, n = Ut(i, t), s = e, a = s.startAt, o = s.onStart, h = s.onStartParams, l = s.immediateRender, p = Ze.to(i, St({
                    ease: e.ease || "none",
                    lazy: !1,
                    immediateRender: !1,
                    time: n,
                    overwrite: "auto",
                    duration: e.duration || Math.abs((n - (a && "time"in a ? a.time : i._time)) / i.timeScale()) || S,
                    onStart: function() {
                        if (i.pause(),
                        !r) {
                            var t = e.duration || Math.abs((n - (a && "time"in a ? a.time : i._time)) / i.timeScale());
                            p._dur !== t && Yt(p, t, 0, 1).render(p._time, !0, !0),
                            r = 1
                        }
                        o && o.apply(p, h || [])
                    }
                }, e));
                return l ? p.render(0) : p
            }
            ,
            r.tweenFromTo = function(t, e, r) {
                return this.tweenTo(e, St({
                    startAt: {
                        time: Ut(this, t)
                    }
                }, r))
            }
            ,
            r.recent = function() {
                return this._recent
            }
            ,
            r.nextLabel = function(t) {
                return void 0 === t && (t = this._time),
                fe(this, Ut(this, t))
            }
            ,
            r.previousLabel = function(t) {
                return void 0 === t && (t = this._time),
                fe(this, Ut(this, t), 1)
            }
            ,
            r.currentLabel = function(t) {
                return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + S)
            }
            ,
            r.shiftChildren = function(t, e, r) {
                void 0 === r && (r = 0);
                for (var i, n = this._first, s = this.labels; n; )
                    n._start >= r && (n._start += t,
                    n._end += t),
                    n = n._next;
                if (e)
                    for (i in s)
                        s[i] >= r && (s[i] += t);
                return Dt(this)
            }
            ,
            r.invalidate = function(e) {
                var r = this._first;
                for (this._lock = 0; r; )
                    r.invalidate(e),
                    r = r._next;
                return t.prototype.invalidate.call(this, e)
            }
            ,
            r.clear = function(t) {
                void 0 === t && (t = !0);
                for (var e, r = this._first; r; )
                    e = r._next,
                    this.remove(r),
                    r = e;
                return this._dp && (this._time = this._tTime = this._pTime = 0),
                t && (this.labels = {}),
                Dt(this)
            }
            ,
            r.totalDuration = function(t) {
                var e, r, i, n = 0, s = this, a = s._last, o = E;
                if (arguments.length)
                    return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -t : t));
                if (s._dirty) {
                    for (i = s.parent; a; )
                        e = a._prev,
                        a._dirty && a.totalDuration(),
                        (r = a._start) > o && s._sort && a._ts && !s._lock ? (s._lock = 1,
                        Gt(s, a, r - a._delay, 1)._lock = 0) : o = r,
                        r < 0 && a._ts && (n -= r,
                        (!i && !s._dp || i && i.smoothChildTiming) && (s._start += r / s._ts,
                        s._time -= r,
                        s._tTime -= r),
                        s.shiftChildren(-r, !1, -Infinity),
                        o = 0),
                        a._end > n && a._ts && (n = a._end),
                        a = e;
                    Yt(s, s === h && s._time > n ? s._time : n, 1, 1),
                    s._dirty = 0
                }
                return s._tDur
            }
            ,
            e.updateRoot = function(t) {
                if (h._ts && (bt(h, Vt(t, h)),
                u = Ce.frame),
                Ce.frame >= ht) {
                    ht += b.autoSleep || 120;
                    var e = h._first;
                    if ((!e || !e._ts) && b.autoSleep && Ce._listeners.length < 2) {
                        for (; e && !e._ts; )
                            e = e._next;
                        e || Ce.sleep()
                    }
                }
            }
            ,
            e
        }(ze);
        St(Ne.prototype, {
            _lock: 0,
            _hasPause: 0,
            _forcing: 0
        });
        var Ge, He, qe = function(t, e, r, i, n, s, a) {
            var o, h, l, p, c, f, u, d, m = new cr(this._pt,t,e,0,1,sr,null,n), g = 0, y = 0;
            for (m.b = r,
            m.e = i,
            r += "",
            (u = ~(i += "").indexOf("random(")) && (i = pe(i)),
            s && (s(d = [r, i], t, e),
            r = d[0],
            i = d[1]),
            h = r.match(q) || []; o = q.exec(i); )
                p = o[0],
                c = i.substring(g, o.index),
                l ? l = (l + 1) % 5 : "rgba(" === c.substr(-5) && (l = 1),
                p !== h[y++] && (f = parseFloat(h[y - 1]) || 0,
                m._pt = {
                    _next: m._pt,
                    p: c || 1 === y ? c : ",",
                    s: f,
                    c: "=" === p.charAt(1) ? yt(f, p) - f : parseFloat(p) - f,
                    m: l && l < 4 ? Math.round : 0
                },
                g = q.lastIndex);
            return m.c = g < i.length ? i.substring(g, i.length) : "",
            m.fp = a,
            (j.test(i) || u) && (m.e = 0),
            this._pt = m,
            m
        }, je = function(t, e, r, i, n, s, a, o, h, l) {
            D(i) && (i = i(n || 0, t, s));
            var p, c = t[e], f = "get" !== r ? r : D(c) ? h ? t[e.indexOf("set") || !D(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](h) : t[e]() : c, u = D(c) ? h ? tr : Qe : Ke;
            if (k(i) && (~i.indexOf("random(") && (i = pe(i)),
            "=" === i.charAt(1) && ((p = yt(f, i) + (Qt(f) || 0)) || 0 === p) && (i = p)),
            !l || f !== i || He)
                return isNaN(f * i) || "" === i ? (!c && !(e in t) && J(e, i),
                qe.call(this, t, e, f, i, u, o || b.stringFilter, h)) : (p = new cr(this._pt,t,e,+f || 0,i - (f || 0),"boolean" == typeof c ? nr : ir,0,u),
                h && (p.fp = h),
                a && p.modifier(a, this, t),
                this._pt = p)
        }, We = function(t, e, r, i, n, s) {
            var a, o, h, l;
            if (at[t] && !1 !== (a = new at[t]).init(n, a.rawVars ? e[t] : function(t, e, r, i, n) {
                if (D(t) && (t = $e(t, n, e, r, i)),
                !R(t) || t.style && t.nodeType || z(t) || O(t))
                    return k(t) ? $e(t, n, e, r, i) : t;
                var s, a = {};
                for (s in t)
                    a[s] = $e(t[s], n, e, r, i);
                return a
            }(e[t], i, n, s, r), r, i, s) && (r._pt = o = new cr(r._pt,n,t,0,1,a.render,a,0,a.priority),
            r !== d))
                for (h = r._ptLookup[r._targets.indexOf(n)],
                l = a._props.length; l--; )
                    h[a._props[l]] = o;
            return a
        }, Ye = function t(e, r, i) {
            var n, o, l, p, c, f, u, d, m, g, y, v, _, b = e.vars, P = b.ease, C = b.startAt, T = b.immediateRender, w = b.lazy, M = b.onUpdate, A = b.onUpdateParams, k = b.callbackScope, D = b.runBackwards, F = b.yoyoEase, I = b.keyframes, R = b.autoRevert, B = e._dur, V = e._startAt, O = e._targets, z = e.parent, N = z && "nested" === z.data ? z.vars.targets : O, G = "auto" === e._overwrite && !s, H = e.timeline;
            if (H && (!I || !P) && (P = "none"),
            e._ease = Ie(P, x.ease),
            e._yEase = F ? De(Ie(!0 === F ? P : F, x.ease)) : 0,
            F && e._yoyo && !e._repeat && (F = e._yEase,
            e._yEase = e._ease,
            e._ease = F),
            e._from = !H && !!b.runBackwards,
            !H || I && !b.stagger) {
                if (v = (d = O[0] ? ft(O[0]).harness : 0) && b[d.prop],
                n = Tt(b, it),
                V && (V._zTime < 0 && V.progress(1),
                r < 0 && D && T && !R ? V.render(-1, !0) : V.revert(D && B ? et : tt),
                V._lazy = 0),
                C) {
                    if (kt(e._startAt = Ze.set(O, St({
                        data: "isStart",
                        overwrite: !1,
                        parent: z,
                        immediateRender: !0,
                        lazy: !V && L(w),
                        startAt: null,
                        delay: 0,
                        onUpdate: M,
                        onUpdateParams: A,
                        callbackScope: k,
                        stagger: 0
                    }, C))),
                    e._startAt._dp = 0,
                    e._startAt._sat = e,
                    r < 0 && (a || !T && !R) && e._startAt.revert(et),
                    T && B && r <= 0 && i <= 0)
                        return void (r && (e._zTime = r))
                } else if (D && B && !V)
                    if (r && (T = !1),
                    l = St({
                        overwrite: !1,
                        data: "isFromStart",
                        lazy: T && !V && L(w),
                        immediateRender: T,
                        stagger: 0,
                        parent: z
                    }, n),
                    v && (l[d.prop] = v),
                    kt(e._startAt = Ze.set(O, l)),
                    e._startAt._dp = 0,
                    e._startAt._sat = e,
                    r < 0 && (a ? e._startAt.revert(et) : e._startAt.render(-1, !0)),
                    e._zTime = r,
                    T) {
                        if (!r)
                            return
                    } else
                        t(e._startAt, S, S);
                for (e._pt = e._ptCache = 0,
                w = B && L(w) || w && !B,
                o = 0; o < O.length; o++) {
                    if (u = (c = O[o])._gsap || ct(O)[o]._gsap,
                    e._ptLookup[o] = g = {},
                    st[u.id] && nt.length && _t(),
                    y = N === O ? o : N.indexOf(c),
                    d && !1 !== (m = new d).init(c, v || n, e, y, N) && (e._pt = p = new cr(e._pt,c,m.name,0,1,m.render,m,0,m.priority),
                    m._props.forEach((function(t) {
                        g[t] = p
                    }
                    )),
                    m.priority && (f = 1)),
                    !d || v)
                        for (l in n)
                            at[l] && (m = We(l, n, e, y, c, N)) ? m.priority && (f = 1) : g[l] = p = je.call(e, c, l, "get", n[l], y, N, 0, b.stringFilter);
                    e._op && e._op[o] && e.kill(c, e._op[o]),
                    G && e._pt && (Ge = e,
                    h.killTweensOf(c, g, e.globalTime(r)),
                    _ = !e.parent,
                    Ge = 0),
                    e._pt && w && (st[u.id] = 1)
                }
                f && pr(e),
                e._onInit && e._onInit(e)
            }
            e._onUpdate = M,
            e._initted = (!e._op || e._pt) && !_,
            I && r <= 0 && H.render(E, !0, !0)
        }, Xe = function(t, e, r, i) {
            var n, s, a = e.ease || i || "power1.inOut";
            if (z(e))
                s = r[t] || (r[t] = []),
                e.forEach((function(t, r) {
                    return s.push({
                        t: r / (e.length - 1) * 100,
                        v: t,
                        e: a
                    })
                }
                ));
            else
                for (n in e)
                    s = r[n] || (r[n] = []),
                    "ease" === n || s.push({
                        t: parseFloat(t),
                        v: e[n],
                        e: a
                    })
        }, $e = function(t, e, r, i, n) {
            return D(t) ? t.call(e, r, i, n) : k(t) && ~t.indexOf("random(") ? pe(t) : t
        }, Ue = pt + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Je = {};
        dt(Ue + ",id,stagger,delay,duration,paused,scrollTrigger", (function(t) {
            return Je[t] = 1
        }
        ));
        var Ze = function(t) {
            function e(e, r, n, a) {
                var o;
                "number" == typeof r && (n.duration = r,
                r = n,
                n = null);
                var l, p, c, f, u, d, m, g, y = (o = t.call(this, a ? r : wt(r)) || this).vars, v = y.duration, _ = y.delay, x = y.immediateRender, E = y.stagger, S = y.overwrite, P = y.keyframes, C = y.defaults, T = y.scrollTrigger, w = y.yoyoEase, M = r.parent || h, A = (z(e) || O(e) ? F(e[0]) : "length"in r) ? [e] : re(e);
                if (o._targets = A.length ? ct(A) : Z("GSAP target " + e + " not found. https://greensock.com", !b.nullTargetWarn) || [],
                o._ptLookup = [],
                o._overwrite = S,
                P || E || V(v) || V(_)) {
                    if (r = o.vars,
                    (l = o.timeline = new Ne({
                        data: "nested",
                        defaults: C || {},
                        targets: M && "nested" === M.data ? M.vars.targets : A
                    })).kill(),
                    l.parent = l._dp = i(o),
                    l._start = 0,
                    E || V(v) || V(_)) {
                        if (f = A.length,
                        m = E && se(E),
                        R(E))
                            for (u in E)
                                ~Ue.indexOf(u) && (g || (g = {}),
                                g[u] = E[u]);
                        for (p = 0; p < f; p++)
                            (c = Tt(r, Je)).stagger = 0,
                            w && (c.yoyoEase = w),
                            g && Pt(c, g),
                            d = A[p],
                            c.duration = +$e(v, i(o), p, d, A),
                            c.delay = (+$e(_, i(o), p, d, A) || 0) - o._delay,
                            !E && 1 === f && c.delay && (o._delay = _ = c.delay,
                            o._start += _,
                            c.delay = 0),
                            l.to(d, c, m ? m(p, d, A) : 0),
                            l._ease = we.none;
                        l.duration() ? v = _ = 0 : o.timeline = 0
                    } else if (P) {
                        wt(St(l.vars.defaults, {
                            ease: "none"
                        })),
                        l._ease = Ie(P.ease || r.ease || "none");
                        var k, D, I, B = 0;
                        if (z(P))
                            P.forEach((function(t) {
                                return l.to(A, t, ">")
                            }
                            )),
                            l.duration();
                        else {
                            for (u in c = {},
                            P)
                                "ease" === u || "easeEach" === u || Xe(u, P[u], c, P.easeEach);
                            for (u in c)
                                for (k = c[u].sort((function(t, e) {
                                    return t.t - e.t
                                }
                                )),
                                B = 0,
                                p = 0; p < k.length; p++)
                                    (I = {
                                        ease: (D = k[p]).e,
                                        duration: (D.t - (p ? k[p - 1].t : 0)) / 100 * v
                                    })[u] = D.v,
                                    l.to(A, I, B),
                                    B += I.duration;
                            l.duration() < v && l.to({}, {
                                duration: v - l.duration()
                            })
                        }
                    }
                    v || o.duration(v = l.duration())
                } else
                    o.timeline = 0;
                return !0 !== S || s || (Ge = i(o),
                h.killTweensOf(A),
                Ge = 0),
                Gt(M, i(o), n),
                r.reversed && o.reverse(),
                r.paused && o.paused(!0),
                (x || !v && !P && o._start === gt(M._time) && L(x) && Rt(i(o)) && "nested" !== M.data) && (o._tTime = -1e-8,
                o.render(Math.max(0, -_) || 0)),
                T && Ht(i(o), T),
                o
            }
            n(e, t);
            var r = e.prototype;
            return r.render = function(t, e, r) {
                var i, n, s, o, h, l, p, c, f, u = this._time, d = this._tDur, m = this._dur, g = t < 0, y = t > d - S && !g ? d : t < S ? 0 : t;
                if (m) {
                    if (y !== this._tTime || !t || r || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== g) {
                        if (i = y,
                        c = this.timeline,
                        this._repeat) {
                            if (o = m + this._rDelay,
                            this._repeat < -1 && g)
                                return this.totalTime(100 * o + t, e, r);
                            if (i = gt(y % o),
                            y === d ? (s = this._repeat,
                            i = m) : ((s = ~~(y / o)) && s === y / o && (i = m,
                            s--),
                            i > m && (i = m)),
                            (l = this._yoyo && 1 & s) && (f = this._yEase,
                            i = m - i),
                            h = Bt(this._tTime, o),
                            i === u && !r && this._initted)
                                return this._tTime = y,
                                this;
                            s !== h && (c && this._yEase && Fe(c, l),
                            !this.vars.repeatRefresh || l || this._lock || (this._lock = r = 1,
                            this.render(gt(o * s), !0).invalidate()._lock = 0))
                        }
                        if (!this._initted) {
                            if (qt(this, g ? t : i, r, e, y))
                                return this._tTime = 0,
                                this;
                            if (u !== this._time)
                                return this;
                            if (m !== this._dur)
                                return this.render(t, e, r)
                        }
                        if (this._tTime = y,
                        this._time = i,
                        !this._act && this._ts && (this._act = 1,
                        this._lazy = 0),
                        this.ratio = p = (f || this._ease)(i / m),
                        this._from && (this.ratio = p = 1 - p),
                        i && !u && !e && (ue(this, "onStart"),
                        this._tTime !== y))
                            return this;
                        for (n = this._pt; n; )
                            n.r(p, n.d),
                            n = n._next;
                        c && c.render(t < 0 ? t : !i && l ? -1e-8 : c._dur * c._ease(i / this._dur), e, r) || this._startAt && (this._zTime = t),
                        this._onUpdate && !e && (g && It(this, t, 0, r),
                        ue(this, "onUpdate")),
                        this._repeat && s !== h && this.vars.onRepeat && !e && this.parent && ue(this, "onRepeat"),
                        y !== this._tDur && y || this._tTime !== y || (g && !this._onUpdate && It(this, t, 0, !0),
                        (t || !m) && (y === this._tDur && this._ts > 0 || !y && this._ts < 0) && kt(this, 1),
                        e || g && !u || !(y || u || l) || (ue(this, y === d ? "onComplete" : "onReverseComplete", !0),
                        this._prom && !(y < d && this.timeScale() > 0) && this._prom()))
                    }
                } else
                    !function(t, e, r, i) {
                        var n, s, o, h = t.ratio, l = e < 0 || !e && (!t._start && jt(t) && (t._initted || !Wt(t)) || (t._ts < 0 || t._dp._ts < 0) && !Wt(t)) ? 0 : 1, p = t._rDelay, c = 0;
                        if (p && t._repeat && (c = Kt(0, t._tDur, e),
                        s = Bt(c, p),
                        t._yoyo && 1 & s && (l = 1 - l),
                        s !== Bt(t._tTime, p) && (h = 1 - l,
                        t.vars.repeatRefresh && t._initted && t.invalidate())),
                        l !== h || a || i || t._zTime === S || !e && t._zTime) {
                            if (!t._initted && qt(t, e, i, r, c))
                                return;
                            for (o = t._zTime,
                            t._zTime = e || (r ? S : 0),
                            r || (r = e && !o),
                            t.ratio = l,
                            t._from && (l = 1 - l),
                            t._time = 0,
                            t._tTime = c,
                            n = t._pt; n; )
                                n.r(l, n.d),
                                n = n._next;
                            e < 0 && It(t, e, 0, !0),
                            t._onUpdate && !r && ue(t, "onUpdate"),
                            c && t._repeat && !r && t.parent && ue(t, "onRepeat"),
                            (e >= t._tDur || e < 0) && t.ratio === l && (l && kt(t, 1),
                            r || a || (ue(t, l ? "onComplete" : "onReverseComplete", !0),
                            t._prom && t._prom()))
                        } else
                            t._zTime || (t._zTime = e)
                    }(this, t, e, r);
                return this
            }
            ,
            r.targets = function() {
                return this._targets
            }
            ,
            r.invalidate = function(e) {
                return (!e || !this.vars.runBackwards) && (this._startAt = 0),
                this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0,
                this._ptLookup = [],
                this.timeline && this.timeline.invalidate(e),
                t.prototype.invalidate.call(this, e)
            }
            ,
            r.resetTo = function(t, e, r, i) {
                m || Ce.wake(),
                this._ts || this.play();
                var n = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
                return this._initted || Ye(this, n),
                function(t, e, r, i, n, s, a) {
                    var o, h, l, p, c = (t._pt && t._ptCache || (t._ptCache = {}))[e];
                    if (!c)
                        for (c = t._ptCache[e] = [],
                        l = t._ptLookup,
                        p = t._targets.length; p--; ) {
                            if ((o = l[p][e]) && o.d && o.d._pt)
                                for (o = o.d._pt; o && o.p !== e && o.fp !== e; )
                                    o = o._next;
                            if (!o)
                                return He = 1,
                                t.vars[e] = "+=0",
                                Ye(t, a),
                                He = 0,
                                1;
                            c.push(o)
                        }
                    for (p = c.length; p--; )
                        (o = (h = c[p])._pt || h).s = !i && 0 !== i || n ? o.s + (i || 0) + s * o.c : i,
                        o.c = r - o.s,
                        h.e && (h.e = mt(r) + Qt(h.e)),
                        h.b && (h.b = o.s + Qt(h.b))
                }(this, t, e, r, i, this._ease(n / this._dur), n) ? this.resetTo(t, e, r, i) : (zt(this, 0),
                this.parent || Mt(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0),
                this.render(0))
            }
            ,
            r.kill = function(t, e) {
                if (void 0 === e && (e = "all"),
                !(t || e && "all" !== e))
                    return this._lazy = this._pt = 0,
                    this.parent ? de(this) : this;
                if (this.timeline) {
                    var r = this.timeline.totalDuration();
                    return this.timeline.killTweensOf(t, e, Ge && !0 !== Ge.vars.overwrite)._first || de(this),
                    this.parent && r !== this.timeline.totalDuration() && Yt(this, this._dur * this.timeline._tDur / r, 0, 1),
                    this
                }
                var i, n, s, a, o, h, l, p = this._targets, c = t ? re(t) : p, f = this._ptLookup, u = this._pt;
                if ((!e || "all" === e) && function(t, e) {
                    for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r]; )
                        ;
                    return r < 0
                }(p, c))
                    return "all" === e && (this._pt = 0),
                    de(this);
                for (i = this._op = this._op || [],
                "all" !== e && (k(e) && (o = {},
                dt(e, (function(t) {
                    return o[t] = 1
                }
                )),
                e = o),
                e = function(t, e) {
                    var r, i, n, s, a = t[0] ? ft(t[0]).harness : 0, o = a && a.aliases;
                    if (!o)
                        return e;
                    for (i in r = Pt({}, e),
                    o)
                        if (i in r)
                            for (n = (s = o[i].split(",")).length; n--; )
                                r[s[n]] = r[i];
                    return r
                }(p, e)),
                l = p.length; l--; )
                    if (~c.indexOf(p[l]))
                        for (o in n = f[l],
                        "all" === e ? (i[l] = e,
                        a = n,
                        s = {}) : (s = i[l] = i[l] || {},
                        a = e),
                        a)
                            (h = n && n[o]) && ("kill"in h.d && !0 !== h.d.kill(o) || At(this, h, "_pt"),
                            delete n[o]),
                            "all" !== s && (s[o] = 1);
                return this._initted && !this._pt && u && de(this),
                this
            }
            ,
            e.to = function(t, r) {
                return new e(t,r,arguments[2])
            }
            ,
            e.from = function(t, e) {
                return Jt(1, arguments)
            }
            ,
            e.delayedCall = function(t, r, i, n) {
                return new e(r,0,{
                    immediateRender: !1,
                    lazy: !1,
                    overwrite: !1,
                    delay: t,
                    onComplete: r,
                    onReverseComplete: r,
                    onCompleteParams: i,
                    onReverseCompleteParams: i,
                    callbackScope: n
                })
            }
            ,
            e.fromTo = function(t, e, r) {
                return Jt(2, arguments)
            }
            ,
            e.set = function(t, r) {
                return r.duration = 0,
                r.repeatDelay || (r.repeat = 0),
                new e(t,r)
            }
            ,
            e.killTweensOf = function(t, e, r) {
                return h.killTweensOf(t, e, r)
            }
            ,
            e
        }(ze);
        St(Ze.prototype, {
            _targets: [],
            _lazy: 0,
            _startAt: 0,
            _op: 0,
            _onInit: 0
        }),
        dt("staggerTo,staggerFrom,staggerFromTo", (function(t) {
            Ze[t] = function() {
                var e = new Ne
                  , r = te.call(arguments, 0);
                return r.splice("staggerFromTo" === t ? 5 : 4, 0, 0),
                e[t].apply(e, r)
            }
        }
        ));
        var Ke = function(t, e, r) {
            return t[e] = r
        }
          , Qe = function(t, e, r) {
            return t[e](r)
        }
          , tr = function(t, e, r, i) {
            return t[e](i.fp, r)
        }
          , er = function(t, e, r) {
            return t.setAttribute(e, r)
        }
          , rr = function(t, e) {
            return D(t[e]) ? Qe : I(t[e]) && t.setAttribute ? er : Ke
        }
          , ir = function(t, e) {
            return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e)
        }
          , nr = function(t, e) {
            return e.set(e.t, e.p, !!(e.s + e.c * t), e)
        }
          , sr = function(t, e) {
            var r = e._pt
              , i = "";
            if (!t && e.b)
                i = e.b;
            else if (1 === t && e.e)
                i = e.e;
            else {
                for (; r; )
                    i = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round(1e4 * (r.s + r.c * t)) / 1e4) + i,
                    r = r._next;
                i += e.c
            }
            e.set(e.t, e.p, i, e)
        }
          , ar = function(t, e) {
            for (var r = e._pt; r; )
                r.r(t, r.d),
                r = r._next
        }
          , or = function(t, e, r, i) {
            for (var n, s = this._pt; s; )
                n = s._next,
                s.p === i && s.modifier(t, e, r),
                s = n
        }
          , hr = function(t) {
            for (var e, r, i = this._pt; i; )
                r = i._next,
                i.p === t && !i.op || i.op === t ? At(this, i, "_pt") : i.dep || (e = 1),
                i = r;
            return !e
        }
          , lr = function(t, e, r, i) {
            i.mSet(t, e, i.m.call(i.tween, r, i.mt), i)
        }
          , pr = function(t) {
            for (var e, r, i, n, s = t._pt; s; ) {
                for (e = s._next,
                r = i; r && r.pr > s.pr; )
                    r = r._next;
                (s._prev = r ? r._prev : n) ? s._prev._next = s : i = s,
                (s._next = r) ? r._prev = s : n = s,
                s = e
            }
            t._pt = i
        }
          , cr = function() {
            function t(t, e, r, i, n, s, a, o, h) {
                this.t = e,
                this.s = i,
                this.c = n,
                this.p = r,
                this.r = s || ir,
                this.d = a || this,
                this.set = o || Ke,
                this.pr = h || 0,
                this._next = t,
                t && (t._prev = this)
            }
            return t.prototype.modifier = function(t, e, r) {
                this.mSet = this.mSet || this.set,
                this.set = lr,
                this.m = t,
                this.mt = r,
                this.tween = e
            }
            ,
            t
        }();
        dt(pt + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function(t) {
            return it[t] = 1
        }
        )),
        X.TweenMax = X.TweenLite = Ze,
        X.TimelineLite = X.TimelineMax = Ne,
        h = new Ne({
            sortChildren: !1,
            defaults: x,
            autoRemoveChildren: !0,
            id: "root",
            smoothChildTiming: !0
        }),
        b.stringFilter = Pe;
        var fr = []
          , ur = {}
          , dr = []
          , mr = 0
          , gr = function(t) {
            return (ur[t] || dr).map((function(t) {
                return t()
            }
            ))
        }
          , yr = function() {
            var t = Date.now()
              , e = [];
            t - mr > 2 && (gr("matchMediaInit"),
            fr.forEach((function(t) {
                var r, i, n, s, a = t.queries, o = t.conditions;
                for (i in a)
                    (r = l.matchMedia(a[i]).matches) && (n = 1),
                    r !== o[i] && (o[i] = r,
                    s = 1);
                s && (t.revert(),
                n && e.push(t))
            }
            )),
            gr("matchMediaRevert"),
            e.forEach((function(t) {
                return t.onMatch(t)
            }
            )),
            mr = t,
            gr("matchMedia"))
        }
          , vr = function() {
            function t(t, e) {
                this.selector = e && ie(e),
                this.data = [],
                this._r = [],
                this.isReverted = !1,
                t && this.add(t)
            }
            var e = t.prototype;
            return e.add = function(t, e, r) {
                D(t) && (r = e,
                e = t,
                t = D);
                var i = this
                  , n = function() {
                    var t, n = o, s = i.selector;
                    return n && n !== i && n.data.push(i),
                    r && (i.selector = ie(r)),
                    o = i,
                    t = e.apply(i, arguments),
                    D(t) && i._r.push(t),
                    o = n,
                    i.selector = s,
                    i.isReverted = !1,
                    t
                };
                return i.last = n,
                t === D ? n(i) : t ? i[t] = n : n
            }
            ,
            e.ignore = function(t) {
                var e = o;
                o = null,
                t(this),
                o = e
            }
            ,
            e.getTweens = function() {
                var e = [];
                return this.data.forEach((function(r) {
                    return r instanceof t ? e.push.apply(e, r.getTweens()) : r instanceof Ze && !(r.parent && "nested" === r.parent.data) && e.push(r)
                }
                )),
                e
            }
            ,
            e.clear = function() {
                this._r.length = this.data.length = 0
            }
            ,
            e.kill = function(t, e) {
                var r = this;
                if (t) {
                    var i = this.getTweens();
                    this.data.forEach((function(t) {
                        "isFlip" === t.data && (t.revert(),
                        t.getChildren(!0, !0, !1).forEach((function(t) {
                            return i.splice(i.indexOf(t), 1)
                        }
                        )))
                    }
                    )),
                    i.map((function(t) {
                        return {
                            g: t.globalTime(0),
                            t
                        }
                    }
                    )).sort((function(t, e) {
                        return e.g - t.g || -1
                    }
                    )).forEach((function(e) {
                        return e.t.revert(t)
                    }
                    )),
                    this.data.forEach((function(e) {
                        return !(e instanceof ze) && e.revert && e.revert(t)
                    }
                    )),
                    this._r.forEach((function(e) {
                        return e(t, r)
                    }
                    )),
                    this.isReverted = !0
                } else
                    this.data.forEach((function(t) {
                        return t.kill && t.kill()
                    }
                    ));
                if (this.clear(),
                e) {
                    var n = fr.indexOf(this);
                    ~n && fr.splice(n, 1)
                }
            }
            ,
            e.revert = function(t) {
                this.kill(t || {})
            }
            ,
            t
        }()
          , _r = function() {
            function t(t) {
                this.contexts = [],
                this.scope = t
            }
            var e = t.prototype;
            return e.add = function(t, e, r) {
                R(t) || (t = {
                    matches: t
                });
                var i, n, s, a = new vr(0,r || this.scope), o = a.conditions = {};
                for (n in this.contexts.push(a),
                e = a.add("onMatch", e),
                a.queries = t,
                t)
                    "all" === n ? s = 1 : (i = l.matchMedia(t[n])) && (fr.indexOf(a) < 0 && fr.push(a),
                    (o[n] = i.matches) && (s = 1),
                    i.addListener ? i.addListener(yr) : i.addEventListener("change", yr));
                return s && e(a),
                this
            }
            ,
            e.revert = function(t) {
                this.kill(t || {})
            }
            ,
            e.kill = function(t) {
                this.contexts.forEach((function(e) {
                    return e.kill(t, !0)
                }
                ))
            }
            ,
            t
        }()
          , br = {
            registerPlugin: function() {
                for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
                    e[r] = arguments[r];
                e.forEach((function(t) {
                    return me(t)
                }
                ))
            },
            timeline: function(t) {
                return new Ne(t)
            },
            getTweensOf: function(t, e) {
                return h.getTweensOf(t, e)
            },
            getProperty: function(t, e, r, i) {
                k(t) && (t = re(t)[0]);
                var n = ft(t || {}).get
                  , s = r ? Et : xt;
                return "native" === r && (r = ""),
                t ? e ? s((at[e] && at[e].get || n)(t, e, r, i)) : function(e, r, i) {
                    return s((at[e] && at[e].get || n)(t, e, r, i))
                }
                : t
            },
            quickSetter: function(t, e, r) {
                if ((t = re(t)).length > 1) {
                    var i = t.map((function(t) {
                        return Sr.quickSetter(t, e, r)
                    }
                    ))
                      , n = i.length;
                    return function(t) {
                        for (var e = n; e--; )
                            i[e](t)
                    }
                }
                t = t[0] || {};
                var s = at[e]
                  , a = ft(t)
                  , o = a.harness && (a.harness.aliases || {})[e] || e
                  , h = s ? function(e) {
                    var i = new s;
                    d._pt = 0,
                    i.init(t, r ? e + r : e, d, 0, [t]),
                    i.render(1, i),
                    d._pt && ar(1, d)
                }
                : a.set(t, o);
                return s ? h : function(e) {
                    return h(t, o, r ? e + r : e, a, 1)
                }
            },
            quickTo: function(t, e, r) {
                var i, n = Sr.to(t, Pt(((i = {})[e] = "+=0.1",
                i.paused = !0,
                i), r || {})), s = function(t, r, i) {
                    return n.resetTo(e, t, r, i)
                };
                return s.tween = n,
                s
            },
            isTweening: function(t) {
                return h.getTweensOf(t, !0).length > 0
            },
            defaults: function(t) {
                return t && t.ease && (t.ease = Ie(t.ease, x.ease)),
                Ct(x, t || {})
            },
            config: function(t) {
                return Ct(b, t || {})
            },
            registerEffect: function(t) {
                var e = t.name
                  , r = t.effect
                  , i = t.plugins
                  , n = t.defaults
                  , s = t.extendTimeline;
                (i || "").split(",").forEach((function(t) {
                    return t && !at[t] && !X[t] && Z(e + " effect requires " + t + " plugin.")
                }
                )),
                ot[e] = function(t, e, i) {
                    return r(re(t), St(e || {}, n), i)
                }
                ,
                s && (Ne.prototype[e] = function(t, r, i) {
                    return this.add(ot[e](t, R(r) ? r : (i = r) && {}, this), i)
                }
                )
            },
            registerEase: function(t, e) {
                we[t] = Ie(e)
            },
            parseEase: function(t, e) {
                return arguments.length ? Ie(t, e) : we
            },
            getById: function(t) {
                return h.getById(t)
            },
            exportRoot: function(t, e) {
                void 0 === t && (t = {});
                var r, i, n = new Ne(t);
                for (n.smoothChildTiming = L(t.smoothChildTiming),
                h.remove(n),
                n._dp = 0,
                n._time = n._tTime = h._time,
                r = h._first; r; )
                    i = r._next,
                    !e && !r._dur && r instanceof Ze && r.vars.onComplete === r._targets[0] || Gt(n, r, r._start - r._delay),
                    r = i;
                return Gt(h, n, 0),
                n
            },
            context: function(t, e) {
                return t ? new vr(t,e) : o
            },
            matchMedia: function(t) {
                return new _r(t)
            },
            matchMediaRefresh: function() {
                return fr.forEach((function(t) {
                    var e, r, i = t.conditions;
                    for (r in i)
                        i[r] && (i[r] = !1,
                        e = 1);
                    e && t.revert()
                }
                )) || yr()
            },
            addEventListener: function(t, e) {
                var r = ur[t] || (ur[t] = []);
                ~r.indexOf(e) || r.push(e)
            },
            removeEventListener: function(t, e) {
                var r = ur[t]
                  , i = r && r.indexOf(e);
                i >= 0 && r.splice(i, 1)
            },
            utils: {
                wrap: function t(e, r, i) {
                    var n = r - e;
                    return z(e) ? le(e, t(0, e.length), r) : Zt(i, (function(t) {
                        return (n + (t - e) % n) % n + e
                    }
                    ))
                },
                wrapYoyo: function t(e, r, i) {
                    var n = r - e
                      , s = 2 * n;
                    return z(e) ? le(e, t(0, e.length - 1), r) : Zt(i, (function(t) {
                        return e + ((t = (s + (t - e) % s) % s || 0) > n ? s - t : t)
                    }
                    ))
                },
                distribute: se,
                random: he,
                snap: oe,
                normalize: function(t, e, r) {
                    return ce(t, e, 0, 1, r)
                },
                getUnit: Qt,
                clamp: function(t, e, r) {
                    return Zt(r, (function(r) {
                        return Kt(t, e, r)
                    }
                    ))
                },
                splitColor: _e,
                toArray: re,
                selector: ie,
                mapRange: ce,
                pipe: function() {
                    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
                        e[r] = arguments[r];
                    return function(t) {
                        return e.reduce((function(t, e) {
                            return e(t)
                        }
                        ), t)
                    }
                },
                unitize: function(t, e) {
                    return function(r) {
                        return t(parseFloat(r)) + (e || Qt(r))
                    }
                },
                interpolate: function t(e, r, i, n) {
                    var s = isNaN(e + r) ? 0 : function(t) {
                        return (1 - t) * e + t * r
                    }
                    ;
                    if (!s) {
                        var a, o, h, l, p, c = k(e), f = {};
                        if (!0 === i && (n = 1) && (i = null),
                        c)
                            e = {
                                p: e
                            },
                            r = {
                                p: r
                            };
                        else if (z(e) && !z(r)) {
                            for (h = [],
                            l = e.length,
                            p = l - 2,
                            o = 1; o < l; o++)
                                h.push(t(e[o - 1], e[o]));
                            l--,
                            s = function(t) {
                                t *= l;
                                var e = Math.min(p, ~~t);
                                return h[e](t - e)
                            }
                            ,
                            i = r
                        } else
                            n || (e = Pt(z(e) ? [] : {}, e));
                        if (!h) {
                            for (a in r)
                                je.call(f, e, a, "get", r[a]);
                            s = function(t) {
                                return ar(t, f) || (c ? e.p : e)
                            }
                        }
                    }
                    return Zt(i, s)
                },
                shuffle: ne
            },
            install: U,
            effects: ot,
            ticker: Ce,
            updateRoot: Ne.updateRoot,
            plugins: at,
            globalTimeline: h,
            core: {
                PropTween: cr,
                globals: K,
                Tween: Ze,
                Timeline: Ne,
                Animation: ze,
                getCache: ft,
                _removeLinkedListItem: At,
                reverting: function() {
                    return a
                },
                context: function(t) {
                    return t && o && (o.data.push(t),
                    t._ctx = o),
                    o
                },
                suppressOverwrites: function(t) {
                    return s = t
                }
            }
        };
        dt("to,from,fromTo,delayedCall,set,killTweensOf", (function(t) {
            return br[t] = Ze[t]
        }
        )),
        Ce.add(Ne.updateRoot),
        d = br.to({}, {
            duration: 0
        });
        var xr = function(t, e) {
            for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
                r = r._next;
            return r
        }
          , Er = function(t, e) {
            return {
                name: t,
                rawVars: 1,
                init: function(t, r, i) {
                    i._onInit = function(t) {
                        var i, n;
                        if (k(r) && (i = {},
                        dt(r, (function(t) {
                            return i[t] = 1
                        }
                        )),
                        r = i),
                        e) {
                            for (n in i = {},
                            r)
                                i[n] = e(r[n]);
                            r = i
                        }
                        !function(t, e) {
                            var r, i, n, s = t._targets;
                            for (r in e)
                                for (i = s.length; i--; )
                                    (n = t._ptLookup[i][r]) && (n = n.d) && (n._pt && (n = xr(n, r)),
                                    n && n.modifier && n.modifier(e[r], t, s[i], r))
                        }(t, r)
                    }
                }
            }
        }
          , Sr = br.registerPlugin({
            name: "attr",
            init: function(t, e, r, i, n) {
                var s, a, o;
                for (s in this.tween = r,
                e)
                    o = t.getAttribute(s) || "",
                    (a = this.add(t, "setAttribute", (o || 0) + "", e[s], i, n, 0, 0, s)).op = s,
                    a.b = o,
                    this._props.push(s)
            },
            render: function(t, e) {
                for (var r = e._pt; r; )
                    a ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d),
                    r = r._next
            }
        }, {
            name: "endArray",
            init: function(t, e) {
                for (var r = e.length; r--; )
                    this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1)
            }
        }, Er("roundProps", ae), Er("modifiers"), Er("snap", oe)) || br;
        Ze.version = Ne.version = Sr.version = "3.11.4",
        f = 1,
        B() && Te(),
        we.Power0,
        we.Power1,
        we.Power2,
        we.Power3,
        we.Power4,
        we.Linear,
        we.Quad,
        we.Cubic,
        we.Quart,
        we.Quint,
        we.Strong,
        we.Elastic,
        we.Back,
        we.SteppedEase,
        we.Bounce,
        we.Sine,
        we.Expo,
        we.Circ;
        var Pr, Cr, Tr, wr, Mr, Ar, kr, Dr, Fr = {}, Ir = 180 / Math.PI, Rr = Math.PI / 180, Lr = Math.atan2, Br = /([A-Z])/g, Vr = /(left|right|width|margin|padding|x)/i, Or = /[\s,\(]\S/, zr = {
            autoAlpha: "opacity,visibility",
            scale: "scaleX,scaleY",
            alpha: "opacity"
        }, Nr = function(t, e) {
            return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
        }, Gr = function(t, e) {
            return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
        }, Hr = function(t, e) {
            return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e)
        }, qr = function(t, e) {
            var r = e.s + e.c * t;
            e.set(e.t, e.p, ~~(r + (r < 0 ? -.5 : .5)) + e.u, e)
        }, jr = function(t, e) {
            return e.set(e.t, e.p, t ? e.e : e.b, e)
        }, Wr = function(t, e) {
            return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
        }, Yr = function(t, e, r) {
            return t.style[e] = r
        }, Xr = function(t, e, r) {
            return t.style.setProperty(e, r)
        }, $r = function(t, e, r) {
            return t._gsap[e] = r
        }, Ur = function(t, e, r) {
            return t._gsap.scaleX = t._gsap.scaleY = r
        }, Jr = function(t, e, r, i, n) {
            var s = t._gsap;
            s.scaleX = s.scaleY = r,
            s.renderTransform(n, s)
        }, Zr = function(t, e, r, i, n) {
            var s = t._gsap;
            s[e] = r,
            s.renderTransform(n, s)
        }, Kr = "transform", Qr = Kr + "Origin", ti = function(t, e) {
            var r = this
              , i = this.target
              , n = i.style;
            if (t in Fr) {
                if (this.tfm = this.tfm || {},
                "transform" !== t && (~(t = zr[t] || t).indexOf(",") ? t.split(",").forEach((function(t) {
                    return r.tfm[t] = vi(i, t)
                }
                )) : this.tfm[t] = i._gsap.x ? i._gsap[t] : vi(i, t)),
                this.props.indexOf(Kr) >= 0)
                    return;
                i._gsap.svg && (this.svgo = i.getAttribute("data-svg-origin"),
                this.props.push(Qr, e, "")),
                t = Kr
            }
            (n || e) && this.props.push(t, e, n[t])
        }, ei = function(t) {
            t.translate && (t.removeProperty("translate"),
            t.removeProperty("scale"),
            t.removeProperty("rotate"))
        }, ri = function() {
            var t, e, r = this.props, i = this.target, n = i.style, s = i._gsap;
            for (t = 0; t < r.length; t += 3)
                r[t + 1] ? i[r[t]] = r[t + 2] : r[t + 2] ? n[r[t]] = r[t + 2] : n.removeProperty(r[t].replace(Br, "-$1").toLowerCase());
            if (this.tfm) {
                for (e in this.tfm)
                    s[e] = this.tfm[e];
                s.svg && (s.renderTransform(),
                i.setAttribute("data-svg-origin", this.svgo || "")),
                !(t = kr()) || t.isStart || n[Kr] || (ei(n),
                s.uncache = 1)
            }
        }, ii = function(t, e) {
            var r = {
                target: t,
                props: [],
                revert: ri,
                save: ti
            };
            return e && e.split(",").forEach((function(t) {
                return r.save(t)
            }
            )),
            r
        }, ni = function(t, e) {
            var r = Cr.createElementNS ? Cr.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : Cr.createElement(t);
            return r.style ? r : Cr.createElement(t)
        }, si = function t(e, r, i) {
            var n = getComputedStyle(e);
            return n[r] || n.getPropertyValue(r.replace(Br, "-$1").toLowerCase()) || n.getPropertyValue(r) || !i && t(e, oi(r) || r, 1) || ""
        }, ai = "O,Moz,ms,Ms,Webkit".split(","), oi = function(t, e, r) {
            var i = (e || Mr).style
              , n = 5;
            if (t in i && !r)
                return t;
            for (t = t.charAt(0).toUpperCase() + t.substr(1); n-- && !(ai[n] + t in i); )
                ;
            return n < 0 ? null : (3 === n ? "ms" : n >= 0 ? ai[n] : "") + t
        }, hi = function() {
            "undefined" != typeof window && window.document && (Pr = window,
            Cr = Pr.document,
            Tr = Cr.documentElement,
            Mr = ni("div") || {
                style: {}
            },
            ni("div"),
            Kr = oi(Kr),
            Qr = Kr + "Origin",
            Mr.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0",
            Dr = !!oi("perspective"),
            kr = Sr.core.reverting,
            wr = 1)
        }, li = function t(e) {
            var r, i = ni("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = this.parentNode, s = this.nextSibling, a = this.style.cssText;
            if (Tr.appendChild(i),
            i.appendChild(this),
            this.style.display = "block",
            e)
                try {
                    r = this.getBBox(),
                    this._gsapBBox = this.getBBox,
                    this.getBBox = t
                } catch (t) {}
            else
                this._gsapBBox && (r = this._gsapBBox());
            return n && (s ? n.insertBefore(this, s) : n.appendChild(this)),
            Tr.removeChild(i),
            this.style.cssText = a,
            r
        }, pi = function(t, e) {
            for (var r = e.length; r--; )
                if (t.hasAttribute(e[r]))
                    return t.getAttribute(e[r])
        }, ci = function(t) {
            var e;
            try {
                e = t.getBBox()
            } catch (r) {
                e = li.call(t, !0)
            }
            return e && (e.width || e.height) || t.getBBox === li || (e = li.call(t, !0)),
            !e || e.width || e.x || e.y ? e : {
                x: +pi(t, ["x", "cx", "x1"]) || 0,
                y: +pi(t, ["y", "cy", "y1"]) || 0,
                width: 0,
                height: 0
            }
        }, fi = function(t) {
            return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !ci(t))
        }, ui = function(t, e) {
            if (e) {
                var r = t.style;
                e in Fr && e !== Qr && (e = Kr),
                r.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e),
                r.removeProperty(e.replace(Br, "-$1").toLowerCase())) : r.removeAttribute(e)
            }
        }, di = function(t, e, r, i, n, s) {
            var a = new cr(t._pt,e,r,0,1,s ? Wr : jr);
            return t._pt = a,
            a.b = i,
            a.e = n,
            t._props.push(r),
            a
        }, mi = {
            deg: 1,
            rad: 1,
            turn: 1
        }, gi = {
            grid: 1,
            flex: 1
        }, yi = function t(e, r, i, n) {
            var s, a, o, h, l = parseFloat(i) || 0, p = (i + "").trim().substr((l + "").length) || "px", c = Mr.style, f = Vr.test(r), u = "svg" === e.tagName.toLowerCase(), d = (u ? "client" : "offset") + (f ? "Width" : "Height"), m = 100, g = "px" === n, y = "%" === n;
            return n === p || !l || mi[n] || mi[p] ? l : ("px" !== p && !g && (l = t(e, r, i, "px")),
            h = e.getCTM && fi(e),
            !y && "%" !== p || !Fr[r] && !~r.indexOf("adius") ? (c[f ? "width" : "height"] = m + (g ? p : n),
            a = ~r.indexOf("adius") || "em" === n && e.appendChild && !u ? e : e.parentNode,
            h && (a = (e.ownerSVGElement || {}).parentNode),
            a && a !== Cr && a.appendChild || (a = Cr.body),
            (o = a._gsap) && y && o.width && f && o.time === Ce.time && !o.uncache ? mt(l / o.width * m) : ((y || "%" === p) && !gi[si(a, "display")] && (c.position = si(e, "position")),
            a === e && (c.position = "static"),
            a.appendChild(Mr),
            s = Mr[d],
            a.removeChild(Mr),
            c.position = "absolute",
            f && y && ((o = ft(a)).time = Ce.time,
            o.width = a[d]),
            mt(g ? s * l / m : s && l ? m / s * l : 0))) : (s = h ? e.getBBox()[f ? "width" : "height"] : e[d],
            mt(y ? l / s * m : l / 100 * s)))
        }, vi = function(t, e, r, i) {
            var n;
            return wr || hi(),
            e in zr && "transform" !== e && ~(e = zr[e]).indexOf(",") && (e = e.split(",")[0]),
            Fr[e] && "transform" !== e ? (n = Ai(t, i),
            n = "transformOrigin" !== e ? n[e] : n.svg ? n.origin : ki(si(t, Qr)) + " " + n.zOrigin + "px") : (!(n = t.style[e]) || "auto" === n || i || ~(n + "").indexOf("calc(")) && (n = Ei[e] && Ei[e](t, e, r) || si(t, e) || ut(t, e) || ("opacity" === e ? 1 : 0)),
            r && !~(n + "").trim().indexOf(" ") ? yi(t, e, n, r) + r : n
        }, _i = function(t, e, r, i) {
            if (!r || "none" === r) {
                var n = oi(e, t, 1)
                  , s = n && si(t, n, 1);
                s && s !== r ? (e = n,
                r = s) : "borderColor" === e && (r = si(t, "borderTopColor"))
            }
            var a, o, h, l, p, c, f, u, d, m, g, y = new cr(this._pt,t.style,e,0,1,sr), v = 0, _ = 0;
            if (y.b = r,
            y.e = i,
            r += "",
            "auto" == (i += "") && (t.style[e] = i,
            i = si(t, e) || i,
            t.style[e] = r),
            Pe(a = [r, i]),
            i = a[1],
            h = (r = a[0]).match(H) || [],
            (i.match(H) || []).length) {
                for (; o = H.exec(i); )
                    f = o[0],
                    d = i.substring(v, o.index),
                    p ? p = (p + 1) % 5 : "rgba(" !== d.substr(-5) && "hsla(" !== d.substr(-5) || (p = 1),
                    f !== (c = h[_++] || "") && (l = parseFloat(c) || 0,
                    g = c.substr((l + "").length),
                    "=" === f.charAt(1) && (f = yt(l, f) + g),
                    u = parseFloat(f),
                    m = f.substr((u + "").length),
                    v = H.lastIndex - m.length,
                    m || (m = m || b.units[e] || g,
                    v === i.length && (i += m,
                    y.e += m)),
                    g !== m && (l = yi(t, e, c, m) || 0),
                    y._pt = {
                        _next: y._pt,
                        p: d || 1 === _ ? d : ",",
                        s: l,
                        c: u - l,
                        m: p && p < 4 || "zIndex" === e ? Math.round : 0
                    });
                y.c = v < i.length ? i.substring(v, i.length) : ""
            } else
                y.r = "display" === e && "none" === i ? Wr : jr;
            return j.test(i) && (y.e = 0),
            this._pt = y,
            y
        }, bi = {
            top: "0%",
            bottom: "100%",
            left: "0%",
            right: "100%",
            center: "50%"
        }, xi = function(t, e) {
            if (e.tween && e.tween._time === e.tween._dur) {
                var r, i, n, s = e.t, a = s.style, o = e.u, h = s._gsap;
                if ("all" === o || !0 === o)
                    a.cssText = "",
                    i = 1;
                else
                    for (n = (o = o.split(",")).length; --n > -1; )
                        r = o[n],
                        Fr[r] && (i = 1,
                        r = "transformOrigin" === r ? Qr : Kr),
                        ui(s, r);
                i && (ui(s, Kr),
                h && (h.svg && s.removeAttribute("transform"),
                Ai(s, 1),
                h.uncache = 1,
                ei(a)))
            }
        }, Ei = {
            clearProps: function(t, e, r, i, n) {
                if ("isFromStart" !== n.data) {
                    var s = t._pt = new cr(t._pt,e,r,0,0,xi);
                    return s.u = i,
                    s.pr = -10,
                    s.tween = n,
                    t._props.push(r),
                    1
                }
            }
        }, Si = [1, 0, 0, 1, 0, 0], Pi = {}, Ci = function(t) {
            return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t
        }, Ti = function(t) {
            var e = si(t, Kr);
            return Ci(e) ? Si : e.substr(7).match(G).map(mt)
        }, wi = function(t, e) {
            var r, i, n, s, a = t._gsap || ft(t), o = t.style, h = Ti(t);
            return a.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (h = [(n = t.transform.baseVal.consolidate().matrix).a, n.b, n.c, n.d, n.e, n.f]).join(",") ? Si : h : (h !== Si || t.offsetParent || t === Tr || a.svg || (n = o.display,
            o.display = "block",
            (r = t.parentNode) && t.offsetParent || (s = 1,
            i = t.nextElementSibling,
            Tr.appendChild(t)),
            h = Ti(t),
            n ? o.display = n : ui(t, "display"),
            s && (i ? r.insertBefore(t, i) : r ? r.appendChild(t) : Tr.removeChild(t))),
            e && h.length > 6 ? [h[0], h[1], h[4], h[5], h[12], h[13]] : h)
        }, Mi = function(t, e, r, i, n, s) {
            var a, o, h, l = t._gsap, p = n || wi(t, !0), c = l.xOrigin || 0, f = l.yOrigin || 0, u = l.xOffset || 0, d = l.yOffset || 0, m = p[0], g = p[1], y = p[2], v = p[3], _ = p[4], b = p[5], x = e.split(" "), E = parseFloat(x[0]) || 0, S = parseFloat(x[1]) || 0;
            r ? p !== Si && (o = m * v - g * y) && (h = E * (-g / o) + S * (m / o) - (m * b - g * _) / o,
            E = E * (v / o) + S * (-y / o) + (y * b - v * _) / o,
            S = h) : (E = (a = ci(t)).x + (~x[0].indexOf("%") ? E / 100 * a.width : E),
            S = a.y + (~(x[1] || x[0]).indexOf("%") ? S / 100 * a.height : S)),
            i || !1 !== i && l.smooth ? (_ = E - c,
            b = S - f,
            l.xOffset = u + (_ * m + b * y) - _,
            l.yOffset = d + (_ * g + b * v) - b) : l.xOffset = l.yOffset = 0,
            l.xOrigin = E,
            l.yOrigin = S,
            l.smooth = !!i,
            l.origin = e,
            l.originIsAbsolute = !!r,
            t.style[Qr] = "0px 0px",
            s && (di(s, l, "xOrigin", c, E),
            di(s, l, "yOrigin", f, S),
            di(s, l, "xOffset", u, l.xOffset),
            di(s, l, "yOffset", d, l.yOffset)),
            t.setAttribute("data-svg-origin", E + " " + S)
        }, Ai = function(t, e) {
            var r = t._gsap || new Oe(t);
            if ("x"in r && !e && !r.uncache)
                return r;
            var i, n, s, a, o, h, l, p, c, f, u, d, m, g, y, v, _, x, E, S, P, C, T, w, M, A, k, D, F, I, R, L, B = t.style, V = r.scaleX < 0, O = "px", z = "deg", N = getComputedStyle(t), G = si(t, Qr) || "0";
            return i = n = s = h = l = p = c = f = u = 0,
            a = o = 1,
            r.svg = !(!t.getCTM || !fi(t)),
            N.translate && ("none" === N.translate && "none" === N.scale && "none" === N.rotate || (B[Kr] = ("none" !== N.translate ? "translate3d(" + (N.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + ("none" !== N.rotate ? "rotate(" + N.rotate + ") " : "") + ("none" !== N.scale ? "scale(" + N.scale.split(" ").join(",") + ") " : "") + ("none" !== N[Kr] ? N[Kr] : "")),
            B.scale = B.rotate = B.translate = "none"),
            g = wi(t, r.svg),
            r.svg && (r.uncache ? (M = t.getBBox(),
            G = r.xOrigin - M.x + "px " + (r.yOrigin - M.y) + "px",
            w = "") : w = !e && t.getAttribute("data-svg-origin"),
            Mi(t, w || G, !!w || r.originIsAbsolute, !1 !== r.smooth, g)),
            d = r.xOrigin || 0,
            m = r.yOrigin || 0,
            g !== Si && (x = g[0],
            E = g[1],
            S = g[2],
            P = g[3],
            i = C = g[4],
            n = T = g[5],
            6 === g.length ? (a = Math.sqrt(x * x + E * E),
            o = Math.sqrt(P * P + S * S),
            h = x || E ? Lr(E, x) * Ir : 0,
            (c = S || P ? Lr(S, P) * Ir + h : 0) && (o *= Math.abs(Math.cos(c * Rr))),
            r.svg && (i -= d - (d * x + m * S),
            n -= m - (d * E + m * P))) : (L = g[6],
            I = g[7],
            k = g[8],
            D = g[9],
            F = g[10],
            R = g[11],
            i = g[12],
            n = g[13],
            s = g[14],
            l = (y = Lr(L, F)) * Ir,
            y && (w = C * (v = Math.cos(-y)) + k * (_ = Math.sin(-y)),
            M = T * v + D * _,
            A = L * v + F * _,
            k = C * -_ + k * v,
            D = T * -_ + D * v,
            F = L * -_ + F * v,
            R = I * -_ + R * v,
            C = w,
            T = M,
            L = A),
            p = (y = Lr(-S, F)) * Ir,
            y && (v = Math.cos(-y),
            R = P * (_ = Math.sin(-y)) + R * v,
            x = w = x * v - k * _,
            E = M = E * v - D * _,
            S = A = S * v - F * _),
            h = (y = Lr(E, x)) * Ir,
            y && (w = x * (v = Math.cos(y)) + E * (_ = Math.sin(y)),
            M = C * v + T * _,
            E = E * v - x * _,
            T = T * v - C * _,
            x = w,
            C = M),
            l && Math.abs(l) + Math.abs(h) > 359.9 && (l = h = 0,
            p = 180 - p),
            a = mt(Math.sqrt(x * x + E * E + S * S)),
            o = mt(Math.sqrt(T * T + L * L)),
            y = Lr(C, T),
            c = Math.abs(y) > 2e-4 ? y * Ir : 0,
            u = R ? 1 / (R < 0 ? -R : R) : 0),
            r.svg && (w = t.getAttribute("transform"),
            r.forceCSS = t.setAttribute("transform", "") || !Ci(si(t, Kr)),
            w && t.setAttribute("transform", w))),
            Math.abs(c) > 90 && Math.abs(c) < 270 && (V ? (a *= -1,
            c += h <= 0 ? 180 : -180,
            h += h <= 0 ? 180 : -180) : (o *= -1,
            c += c <= 0 ? 180 : -180)),
            e = e || r.uncache,
            r.x = i - ((r.xPercent = i && (!e && r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + O,
            r.y = n - ((r.yPercent = n && (!e && r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-n) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + O,
            r.z = s + O,
            r.scaleX = mt(a),
            r.scaleY = mt(o),
            r.rotation = mt(h) + z,
            r.rotationX = mt(l) + z,
            r.rotationY = mt(p) + z,
            r.skewX = c + z,
            r.skewY = f + z,
            r.transformPerspective = u + O,
            (r.zOrigin = parseFloat(G.split(" ")[2]) || 0) && (B[Qr] = ki(G)),
            r.xOffset = r.yOffset = 0,
            r.force3D = b.force3D,
            r.renderTransform = r.svg ? Vi : Dr ? Bi : Fi,
            r.uncache = 0,
            r
        }, ki = function(t) {
            return (t = t.split(" "))[0] + " " + t[1]
        }, Di = function(t, e, r) {
            var i = Qt(e);
            return mt(parseFloat(e) + parseFloat(yi(t, "x", r + "px", i))) + i
        }, Fi = function(t, e) {
            e.z = "0px",
            e.rotationY = e.rotationX = "0deg",
            e.force3D = 0,
            Bi(t, e)
        }, Ii = "0deg", Ri = "0px", Li = ") ", Bi = function(t, e) {
            var r = e || this
              , i = r.xPercent
              , n = r.yPercent
              , s = r.x
              , a = r.y
              , o = r.z
              , h = r.rotation
              , l = r.rotationY
              , p = r.rotationX
              , c = r.skewX
              , f = r.skewY
              , u = r.scaleX
              , d = r.scaleY
              , m = r.transformPerspective
              , g = r.force3D
              , y = r.target
              , v = r.zOrigin
              , _ = ""
              , b = "auto" === g && t && 1 !== t || !0 === g;
            if (v && (p !== Ii || l !== Ii)) {
                var x, E = parseFloat(l) * Rr, S = Math.sin(E), P = Math.cos(E);
                E = parseFloat(p) * Rr,
                x = Math.cos(E),
                s = Di(y, s, S * x * -v),
                a = Di(y, a, -Math.sin(E) * -v),
                o = Di(y, o, P * x * -v + v)
            }
            m !== Ri && (_ += "perspective(" + m + Li),
            (i || n) && (_ += "translate(" + i + "%, " + n + "%) "),
            (b || s !== Ri || a !== Ri || o !== Ri) && (_ += o !== Ri || b ? "translate3d(" + s + ", " + a + ", " + o + ") " : "translate(" + s + ", " + a + Li),
            h !== Ii && (_ += "rotate(" + h + Li),
            l !== Ii && (_ += "rotateY(" + l + Li),
            p !== Ii && (_ += "rotateX(" + p + Li),
            c === Ii && f === Ii || (_ += "skew(" + c + ", " + f + Li),
            1 === u && 1 === d || (_ += "scale(" + u + ", " + d + Li),
            y.style[Kr] = _ || "translate(0, 0)"
        }, Vi = function(t, e) {
            var r, i, n, s, a, o = e || this, h = o.xPercent, l = o.yPercent, p = o.x, c = o.y, f = o.rotation, u = o.skewX, d = o.skewY, m = o.scaleX, g = o.scaleY, y = o.target, v = o.xOrigin, _ = o.yOrigin, b = o.xOffset, x = o.yOffset, E = o.forceCSS, S = parseFloat(p), P = parseFloat(c);
            f = parseFloat(f),
            u = parseFloat(u),
            (d = parseFloat(d)) && (u += d = parseFloat(d),
            f += d),
            f || u ? (f *= Rr,
            u *= Rr,
            r = Math.cos(f) * m,
            i = Math.sin(f) * m,
            n = Math.sin(f - u) * -g,
            s = Math.cos(f - u) * g,
            u && (d *= Rr,
            a = Math.tan(u - d),
            n *= a = Math.sqrt(1 + a * a),
            s *= a,
            d && (a = Math.tan(d),
            r *= a = Math.sqrt(1 + a * a),
            i *= a)),
            r = mt(r),
            i = mt(i),
            n = mt(n),
            s = mt(s)) : (r = m,
            s = g,
            i = n = 0),
            (S && !~(p + "").indexOf("px") || P && !~(c + "").indexOf("px")) && (S = yi(y, "x", p, "px"),
            P = yi(y, "y", c, "px")),
            (v || _ || b || x) && (S = mt(S + v - (v * r + _ * n) + b),
            P = mt(P + _ - (v * i + _ * s) + x)),
            (h || l) && (a = y.getBBox(),
            S = mt(S + h / 100 * a.width),
            P = mt(P + l / 100 * a.height)),
            a = "matrix(" + r + "," + i + "," + n + "," + s + "," + S + "," + P + ")",
            y.setAttribute("transform", a),
            E && (y.style[Kr] = a)
        }, Oi = function(t, e, r, i, n) {
            var s, a, o = 360, h = k(n), l = parseFloat(n) * (h && ~n.indexOf("rad") ? Ir : 1) - i, p = i + l + "deg";
            return h && ("short" === (s = n.split("_")[1]) && (l %= o) != l % 180 && (l += l < 0 ? o : -360),
            "cw" === s && l < 0 ? l = (l + 36e9) % o - ~~(l / o) * o : "ccw" === s && l > 0 && (l = (l - 36e9) % o - ~~(l / o) * o)),
            t._pt = a = new cr(t._pt,e,r,i,l,Gr),
            a.e = p,
            a.u = "deg",
            t._props.push(r),
            a
        }, zi = function(t, e) {
            for (var r in e)
                t[r] = e[r];
            return t
        }, Ni = function(t, e, r) {
            var i, n, s, a, o, h, l, p = zi({}, r._gsap), c = r.style;
            for (n in p.svg ? (s = r.getAttribute("transform"),
            r.setAttribute("transform", ""),
            c[Kr] = e,
            i = Ai(r, 1),
            ui(r, Kr),
            r.setAttribute("transform", s)) : (s = getComputedStyle(r)[Kr],
            c[Kr] = e,
            i = Ai(r, 1),
            c[Kr] = s),
            Fr)
                (s = p[n]) !== (a = i[n]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) < 0 && (o = Qt(s) !== (l = Qt(a)) ? yi(r, n, s, l) : parseFloat(s),
                h = parseFloat(a),
                t._pt = new cr(t._pt,i,n,o,h - o,Nr),
                t._pt.u = l || 0,
                t._props.push(n));
            zi(i, p)
        };
        dt("padding,margin,Width,Radius", (function(t, e) {
            var r = "Top"
              , i = "Right"
              , n = "Bottom"
              , s = "Left"
              , a = (e < 3 ? [r, i, n, s] : [r + s, r + i, n + i, n + s]).map((function(r) {
                return e < 2 ? t + r : "border" + r + t
            }
            ));
            Ei[e > 1 ? "border" + t : t] = function(t, e, r, i, n) {
                var s, o;
                if (arguments.length < 4)
                    return s = a.map((function(e) {
                        return vi(t, e, r)
                    }
                    )),
                    5 === (o = s.join(" ")).split(s[0]).length ? s[0] : o;
                s = (i + "").split(" "),
                o = {},
                a.forEach((function(t, e) {
                    return o[t] = s[e] = s[e] || s[(e - 1) / 2 | 0]
                }
                )),
                t.init(e, o, n)
            }
        }
        ));
        var Gi, Hi, qi = {
            name: "css",
            register: hi,
            targetTest: function(t) {
                return t.style && t.nodeType
            },
            init: function(t, e, r, i, n) {
                var s, a, o, h, l, p, c, f, u, d, m, g, y, v, _, x, E, S, P, C, T = this._props, w = t.style, M = r.vars.startAt;
                for (c in wr || hi(),
                this.styles = this.styles || ii(t),
                x = this.styles.props,
                this.tween = r,
                e)
                    if ("autoRound" !== c && (a = e[c],
                    !at[c] || !We(c, e, r, i, t, n)))
                        if (l = typeof a,
                        p = Ei[c],
                        "function" === l && (l = typeof (a = a.call(r, i, t, n))),
                        "string" === l && ~a.indexOf("random(") && (a = pe(a)),
                        p)
                            p(this, t, c, a, r) && (_ = 1);
                        else if ("--" === c.substr(0, 2))
                            s = (getComputedStyle(t).getPropertyValue(c) + "").trim(),
                            a += "",
                            Ee.lastIndex = 0,
                            Ee.test(s) || (f = Qt(s),
                            u = Qt(a)),
                            u ? f !== u && (s = yi(t, c, s, u) + u) : f && (a += f),
                            this.add(w, "setProperty", s, a, i, n, 0, 0, c),
                            T.push(c),
                            x.push(c, 0, w[c]);
                        else if ("undefined" !== l) {
                            if (M && c in M ? (s = "function" == typeof M[c] ? M[c].call(r, i, t, n) : M[c],
                            k(s) && ~s.indexOf("random(") && (s = pe(s)),
                            Qt(s + "") || (s += b.units[c] || Qt(vi(t, c)) || ""),
                            "=" === (s + "").charAt(1) && (s = vi(t, c))) : s = vi(t, c),
                            h = parseFloat(s),
                            (d = "string" === l && "=" === a.charAt(1) && a.substr(0, 2)) && (a = a.substr(2)),
                            o = parseFloat(a),
                            c in zr && ("autoAlpha" === c && (1 === h && "hidden" === vi(t, "visibility") && o && (h = 0),
                            x.push("visibility", 0, w.visibility),
                            di(this, w, "visibility", h ? "inherit" : "hidden", o ? "inherit" : "hidden", !o)),
                            "scale" !== c && "transform" !== c && ~(c = zr[c]).indexOf(",") && (c = c.split(",")[0])),
                            m = c in Fr)
                                if (this.styles.save(c),
                                g || ((y = t._gsap).renderTransform && !e.parseTransform || Ai(t, e.parseTransform),
                                v = !1 !== e.smoothOrigin && y.smooth,
                                (g = this._pt = new cr(this._pt,w,Kr,0,1,y.renderTransform,y,0,-1)).dep = 1),
                                "scale" === c)
                                    this._pt = new cr(this._pt,y,"scaleY",y.scaleY,(d ? yt(y.scaleY, d + o) : o) - y.scaleY || 0,Nr),
                                    this._pt.u = 0,
                                    T.push("scaleY", c),
                                    c += "X";
                                else {
                                    if ("transformOrigin" === c) {
                                        x.push(Qr, 0, w[Qr]),
                                        S = void 0,
                                        P = void 0,
                                        C = void 0,
                                        P = (S = (E = a).split(" "))[0],
                                        C = S[1] || "50%",
                                        "top" !== P && "bottom" !== P && "left" !== C && "right" !== C || (E = P,
                                        P = C,
                                        C = E),
                                        S[0] = bi[P] || P,
                                        S[1] = bi[C] || C,
                                        a = S.join(" "),
                                        y.svg ? Mi(t, a, 0, v, 0, this) : ((u = parseFloat(a.split(" ")[2]) || 0) !== y.zOrigin && di(this, y, "zOrigin", y.zOrigin, u),
                                        di(this, w, c, ki(s), ki(a)));
                                        continue
                                    }
                                    if ("svgOrigin" === c) {
                                        Mi(t, a, 1, v, 0, this);
                                        continue
                                    }
                                    if (c in Pi) {
                                        Oi(this, y, c, h, d ? yt(h, d + a) : a);
                                        continue
                                    }
                                    if ("smoothOrigin" === c) {
                                        di(this, y, "smooth", y.smooth, a);
                                        continue
                                    }
                                    if ("force3D" === c) {
                                        y[c] = a;
                                        continue
                                    }
                                    if ("transform" === c) {
                                        Ni(this, a, t);
                                        continue
                                    }
                                }
                            else
                                c in w || (c = oi(c) || c);
                            if (m || (o || 0 === o) && (h || 0 === h) && !Or.test(a) && c in w)
                                o || (o = 0),
                                (f = (s + "").substr((h + "").length)) !== (u = Qt(a) || (c in b.units ? b.units[c] : f)) && (h = yi(t, c, s, u)),
                                this._pt = new cr(this._pt,m ? y : w,c,h,(d ? yt(h, d + o) : o) - h,m || "px" !== u && "zIndex" !== c || !1 === e.autoRound ? Nr : qr),
                                this._pt.u = u || 0,
                                f !== u && "%" !== u && (this._pt.b = s,
                                this._pt.r = Hr);
                            else if (c in w)
                                _i.call(this, t, c, s, d ? d + a : a);
                            else if (c in t)
                                this.add(t, c, s || t[c], d ? d + a : a, i, n);
                            else if ("parseTransform" !== c) {
                                J(c, a);
                                continue
                            }
                            m || (c in w ? x.push(c, 0, w[c]) : x.push(c, 1, s || t[c])),
                            T.push(c)
                        }
                _ && pr(this)
            },
            render: function(t, e) {
                if (e.tween._time || !kr())
                    for (var r = e._pt; r; )
                        r.r(t, r.d),
                        r = r._next;
                else
                    e.styles.revert()
            },
            get: vi,
            aliases: zr,
            getSetter: function(t, e, r) {
                var i = zr[e];
                return i && i.indexOf(",") < 0 && (e = i),
                e in Fr && e !== Qr && (t._gsap.x || vi(t, "x")) ? r && Ar === r ? "scale" === e ? Ur : $r : (Ar = r || {}) && ("scale" === e ? Jr : Zr) : t.style && !I(t.style[e]) ? Yr : ~e.indexOf("-") ? Xr : rr(t, e)
            },
            core: {
                _removeProperty: ui,
                _getMatrix: wi
            }
        };
        Sr.utils.checkPrefix = oi,
        Sr.core.getStyleSaver = ii,
        Hi = dt("x,y,z,scale,scaleX,scaleY,xPercent,yPercent" + "," + (Gi = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", (function(t) {
            Fr[t] = 1
        }
        )),
        dt(Gi, (function(t) {
            b.units[t] = "deg",
            Pi[t] = 1
        }
        )),
        zr[Hi[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + Gi,
        dt("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", (function(t) {
            var e = t.split(":");
            zr[e[1]] = Hi[e[0]]
        }
        )),
        dt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function(t) {
            b.units[t] = "px"
        }
        )),
        Sr.registerPlugin(qi);
        var ji = Sr.registerPlugin(qi) || Sr;
        ji.core.Tween
    }
    ,
    "../node_modules/lottie-web/build/player/lottie.js": function(module, exports, __webpack_require__) {
        var factory;
        "undefined" != typeof navigator && (factory = function() {
            "use strict";
            var svgNS = "http://www.w3.org/2000/svg"
              , locationHref = ""
              , _useWebWorker = !1
              , initialDefaultFrame = -999999
              , setWebWorker = function(t) {
                _useWebWorker = !!t
            }
              , getWebWorker = function() {
                return _useWebWorker
            }
              , setLocationHref = function(t) {
                locationHref = t
            }
              , getLocationHref = function() {
                return locationHref
            };
            function createTag(t) {
                return document.createElement(t)
            }
            function extendPrototype(t, e) {
                var r, i, n = t.length;
                for (r = 0; r < n; r += 1)
                    for (var s in i = t[r].prototype)
                        Object.prototype.hasOwnProperty.call(i, s) && (e.prototype[s] = i[s])
            }
            function getDescriptor(t, e) {
                return Object.getOwnPropertyDescriptor(t, e)
            }
            function createProxyFunction(t) {
                function e() {}
                return e.prototype = t,
                e
            }
            var audioControllerFactory = function() {
                function t(t) {
                    this.audios = [],
                    this.audioFactory = t,
                    this._volume = 1,
                    this._isMuted = !1
                }
                return t.prototype = {
                    addAudio: function(t) {
                        this.audios.push(t)
                    },
                    pause: function() {
                        var t, e = this.audios.length;
                        for (t = 0; t < e; t += 1)
                            this.audios[t].pause()
                    },
                    resume: function() {
                        var t, e = this.audios.length;
                        for (t = 0; t < e; t += 1)
                            this.audios[t].resume()
                    },
                    setRate: function(t) {
                        var e, r = this.audios.length;
                        for (e = 0; e < r; e += 1)
                            this.audios[e].setRate(t)
                    },
                    createAudio: function(t) {
                        return this.audioFactory ? this.audioFactory(t) : window.Howl ? new window.Howl({
                            src: [t]
                        }) : {
                            isPlaying: !1,
                            play: function() {
                                this.isPlaying = !0
                            },
                            seek: function() {
                                this.isPlaying = !1
                            },
                            playing: function() {},
                            rate: function() {},
                            setVolume: function() {}
                        }
                    },
                    setAudioFactory: function(t) {
                        this.audioFactory = t
                    },
                    setVolume: function(t) {
                        this._volume = t,
                        this._updateVolume()
                    },
                    mute: function() {
                        this._isMuted = !0,
                        this._updateVolume()
                    },
                    unmute: function() {
                        this._isMuted = !1,
                        this._updateVolume()
                    },
                    getVolume: function() {
                        return this._volume
                    },
                    _updateVolume: function() {
                        var t, e = this.audios.length;
                        for (t = 0; t < e; t += 1)
                            this.audios[t].volume(this._volume * (this._isMuted ? 0 : 1))
                    }
                },
                function() {
                    return new t
                }
            }()
              , createTypedArray = function() {
                function t(t, e) {
                    var r, i = 0, n = [];
                    switch (t) {
                    case "int16":
                    case "uint8c":
                        r = 1;
                        break;
                    default:
                        r = 1.1
                    }
                    for (i = 0; i < e; i += 1)
                        n.push(r);
                    return n
                }
                return "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function(e, r) {
                    return "float32" === e ? new Float32Array(r) : "int16" === e ? new Int16Array(r) : "uint8c" === e ? new Uint8ClampedArray(r) : t(e, r)
                }
                : t
            }();
            function createSizedArray(t) {
                return Array.apply(null, {
                    length: t
                })
            }
            function _typeof$6(t) {
                return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                }
                : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }
                ,
                _typeof$6(t)
            }
            var subframeEnabled = !0
              , expressionsPlugin = null
              , expressionsInterfaces = null
              , idPrefix$1 = ""
              , isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
              , _shouldRoundValues = !1
              , bmPow = Math.pow
              , bmSqrt = Math.sqrt
              , bmFloor = Math.floor
              , bmMax = Math.max
              , bmMin = Math.min
              , BMMath = {};
            function ProjectInterface$1() {
                return {}
            }
            !function() {
                var t, e = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"], r = e.length;
                for (t = 0; t < r; t += 1)
                    BMMath[e[t]] = Math[e[t]]
            }(),
            BMMath.random = Math.random,
            BMMath.abs = function(t) {
                if ("object" === _typeof$6(t) && t.length) {
                    var e, r = createSizedArray(t.length), i = t.length;
                    for (e = 0; e < i; e += 1)
                        r[e] = Math.abs(t[e]);
                    return r
                }
                return Math.abs(t)
            }
            ;
            var defaultCurveSegments = 150
              , degToRads = Math.PI / 180
              , roundCorner = .5519;
            function roundValues(t) {
                _shouldRoundValues = !!t
            }
            function bmRnd(t) {
                return _shouldRoundValues ? Math.round(t) : t
            }
            function styleDiv(t) {
                t.style.position = "absolute",
                t.style.top = 0,
                t.style.left = 0,
                t.style.display = "block",
                t.style.transformOrigin = "0 0",
                t.style.webkitTransformOrigin = "0 0",
                t.style.backfaceVisibility = "visible",
                t.style.webkitBackfaceVisibility = "visible",
                t.style.transformStyle = "preserve-3d",
                t.style.webkitTransformStyle = "preserve-3d",
                t.style.mozTransformStyle = "preserve-3d"
            }
            function BMEnterFrameEvent(t, e, r, i) {
                this.type = t,
                this.currentTime = e,
                this.totalTime = r,
                this.direction = i < 0 ? -1 : 1
            }
            function BMCompleteEvent(t, e) {
                this.type = t,
                this.direction = e < 0 ? -1 : 1
            }
            function BMCompleteLoopEvent(t, e, r, i) {
                this.type = t,
                this.currentLoop = r,
                this.totalLoops = e,
                this.direction = i < 0 ? -1 : 1
            }
            function BMSegmentStartEvent(t, e, r) {
                this.type = t,
                this.firstFrame = e,
                this.totalFrames = r
            }
            function BMDestroyEvent(t, e) {
                this.type = t,
                this.target = e
            }
            function BMRenderFrameErrorEvent(t, e) {
                this.type = "renderFrameError",
                this.nativeError = t,
                this.currentTime = e
            }
            function BMConfigErrorEvent(t) {
                this.type = "configError",
                this.nativeError = t
            }
            function BMAnimationConfigErrorEvent(t, e) {
                this.type = t,
                this.nativeError = e
            }
            var createElementID = (_count = 0,
            function() {
                return idPrefix$1 + "__lottie_element_" + (_count += 1)
            }
            ), _count;
            function HSVtoRGB(t, e, r) {
                var i, n, s, a, o, h, l, p;
                switch (h = r * (1 - e),
                l = r * (1 - (o = 6 * t - (a = Math.floor(6 * t))) * e),
                p = r * (1 - (1 - o) * e),
                a % 6) {
                case 0:
                    i = r,
                    n = p,
                    s = h;
                    break;
                case 1:
                    i = l,
                    n = r,
                    s = h;
                    break;
                case 2:
                    i = h,
                    n = r,
                    s = p;
                    break;
                case 3:
                    i = h,
                    n = l,
                    s = r;
                    break;
                case 4:
                    i = p,
                    n = h,
                    s = r;
                    break;
                case 5:
                    i = r,
                    n = h,
                    s = l
                }
                return [i, n, s]
            }
            function RGBtoHSV(t, e, r) {
                var i, n = Math.max(t, e, r), s = Math.min(t, e, r), a = n - s, o = 0 === n ? 0 : a / n, h = n / 255;
                switch (n) {
                case s:
                    i = 0;
                    break;
                case t:
                    i = e - r + a * (e < r ? 6 : 0),
                    i /= 6 * a;
                    break;
                case e:
                    i = r - t + 2 * a,
                    i /= 6 * a;
                    break;
                case r:
                    i = t - e + 4 * a,
                    i /= 6 * a
                }
                return [i, o, h]
            }
            function addSaturationToRGB(t, e) {
                var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
                return r[1] += e,
                r[1] > 1 ? r[1] = 1 : r[1] <= 0 && (r[1] = 0),
                HSVtoRGB(r[0], r[1], r[2])
            }
            function addBrightnessToRGB(t, e) {
                var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
                return r[2] += e,
                r[2] > 1 ? r[2] = 1 : r[2] < 0 && (r[2] = 0),
                HSVtoRGB(r[0], r[1], r[2])
            }
            function addHueToRGB(t, e) {
                var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
                return r[0] += e / 360,
                r[0] > 1 ? r[0] -= 1 : r[0] < 0 && (r[0] += 1),
                HSVtoRGB(r[0], r[1], r[2])
            }
            var rgbToHex = function() {
                var t, e, r = [];
                for (t = 0; t < 256; t += 1)
                    e = t.toString(16),
                    r[t] = 1 === e.length ? "0" + e : e;
                return function(t, e, i) {
                    return t < 0 && (t = 0),
                    e < 0 && (e = 0),
                    i < 0 && (i = 0),
                    "#" + r[t] + r[e] + r[i]
                }
            }()
              , setSubframeEnabled = function(t) {
                subframeEnabled = !!t
            }
              , getSubframeEnabled = function() {
                return subframeEnabled
            }
              , setExpressionsPlugin = function(t) {
                expressionsPlugin = t
            }
              , getExpressionsPlugin = function() {
                return expressionsPlugin
            }
              , setExpressionInterfaces = function(t) {
                expressionsInterfaces = t
            }
              , getExpressionInterfaces = function() {
                return expressionsInterfaces
            }
              , setDefaultCurveSegments = function(t) {
                defaultCurveSegments = t
            }
              , getDefaultCurveSegments = function() {
                return defaultCurveSegments
            }
              , setIdPrefix = function(t) {
                idPrefix$1 = t
            }
              , getIdPrefix = function() {
                return idPrefix$1
            };
            function createNS(t) {
                return document.createElementNS(svgNS, t)
            }
            function _typeof$5(t) {
                return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                }
                : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }
                ,
                _typeof$5(t)
            }
            var dataManager = function() {
                var t, e, r = 1, i = [], n = {
                    onmessage: function() {},
                    postMessage: function(e) {
                        t({
                            data: e
                        })
                    }
                }, s = {
                    postMessage: function(t) {
                        n.onmessage({
                            data: t
                        })
                    }
                };
                function a() {
                    e || (e = function(e) {
                        if (window.Worker && window.Blob && getWebWorker()) {
                            var r = new Blob(["var _workerSelf = self; self.onmessage = ", e.toString()],{
                                type: "text/javascript"
                            })
                              , i = URL.createObjectURL(r);
                            return new Worker(i)
                        }
                        return t = e,
                        n
                    }((function(t) {
                        if (s.dataManager || (s.dataManager = function() {
                            function t(n, s) {
                                var a, o, h, l, p, c, f, u = n.length;
                                for (o = 0; o < u; o += 1)
                                    if ("ks"in (a = n[o]) && !a.completed) {
                                        if (a.completed = !0,
                                        a.hasMask) {
                                            var d = a.masksProperties;
                                            for (l = d.length,
                                            h = 0; h < l; h += 1)
                                                if (d[h].pt.k.i)
                                                    i(d[h].pt.k);
                                                else
                                                    for (c = d[h].pt.k.length,
                                                    p = 0; p < c; p += 1)
                                                        d[h].pt.k[p].s && i(d[h].pt.k[p].s[0]),
                                                        d[h].pt.k[p].e && i(d[h].pt.k[p].e[0])
                                        }
                                        0 === a.ty ? (a.layers = e(a.refId, s),
                                        t(a.layers, s)) : 4 === a.ty ? r(a.shapes) : 5 === a.ty && (0 === (f = a).t.a.length && f.t.p)
                                    }
                            }
                            function e(t, e) {
                                var r = function(t, e) {
                                    for (var r = 0, i = e.length; r < i; ) {
                                        if (e[r].id === t)
                                            return e[r];
                                        r += 1
                                    }
                                    return null
                                }(t, e);
                                return r ? r.layers.__used ? JSON.parse(JSON.stringify(r.layers)) : (r.layers.__used = !0,
                                r.layers) : null
                            }
                            function r(t) {
                                var e, n, s;
                                for (e = t.length - 1; e >= 0; e -= 1)
                                    if ("sh" === t[e].ty)
                                        if (t[e].ks.k.i)
                                            i(t[e].ks.k);
                                        else
                                            for (s = t[e].ks.k.length,
                                            n = 0; n < s; n += 1)
                                                t[e].ks.k[n].s && i(t[e].ks.k[n].s[0]),
                                                t[e].ks.k[n].e && i(t[e].ks.k[n].e[0]);
                                    else
                                        "gr" === t[e].ty && r(t[e].it)
                            }
                            function i(t) {
                                var e, r = t.i.length;
                                for (e = 0; e < r; e += 1)
                                    t.i[e][0] += t.v[e][0],
                                    t.i[e][1] += t.v[e][1],
                                    t.o[e][0] += t.v[e][0],
                                    t.o[e][1] += t.v[e][1]
                            }
                            function n(t, e) {
                                var r = e ? e.split(".") : [100, 100, 100];
                                return t[0] > r[0] || !(r[0] > t[0]) && (t[1] > r[1] || !(r[1] > t[1]) && (t[2] > r[2] || !(r[2] > t[2]) && null))
                            }
                            var s, a = function() {
                                var t = [4, 4, 14];
                                function e(t) {
                                    var e, r, i, n = t.length;
                                    for (e = 0; e < n; e += 1)
                                        5 === t[e].ty && (void 0,
                                        i = (r = t[e]).t.d,
                                        r.t.d = {
                                            k: [{
                                                s: i,
                                                t: 0
                                            }]
                                        })
                                }
                                return function(r) {
                                    if (n(t, r.v) && (e(r.layers),
                                    r.assets)) {
                                        var i, s = r.assets.length;
                                        for (i = 0; i < s; i += 1)
                                            r.assets[i].layers && e(r.assets[i].layers)
                                    }
                                }
                            }(), o = (s = [4, 7, 99],
                            function(t) {
                                if (t.chars && !n(s, t.v)) {
                                    var e, i = t.chars.length;
                                    for (e = 0; e < i; e += 1) {
                                        var a = t.chars[e];
                                        a.data && a.data.shapes && (r(a.data.shapes),
                                        a.data.ip = 0,
                                        a.data.op = 99999,
                                        a.data.st = 0,
                                        a.data.sr = 1,
                                        a.data.ks = {
                                            p: {
                                                k: [0, 0],
                                                a: 0
                                            },
                                            s: {
                                                k: [100, 100],
                                                a: 0
                                            },
                                            a: {
                                                k: [0, 0],
                                                a: 0
                                            },
                                            r: {
                                                k: 0,
                                                a: 0
                                            },
                                            o: {
                                                k: 100,
                                                a: 0
                                            }
                                        },
                                        t.chars[e].t || (a.data.shapes.push({
                                            ty: "no"
                                        }),
                                        a.data.shapes[0].it.push({
                                            p: {
                                                k: [0, 0],
                                                a: 0
                                            },
                                            s: {
                                                k: [100, 100],
                                                a: 0
                                            },
                                            a: {
                                                k: [0, 0],
                                                a: 0
                                            },
                                            r: {
                                                k: 0,
                                                a: 0
                                            },
                                            o: {
                                                k: 100,
                                                a: 0
                                            },
                                            sk: {
                                                k: 0,
                                                a: 0
                                            },
                                            sa: {
                                                k: 0,
                                                a: 0
                                            },
                                            ty: "tr"
                                        })))
                                    }
                                }
                            }
                            ), h = function() {
                                var t = [5, 7, 15];
                                function e(t) {
                                    var e, r, i = t.length;
                                    for (e = 0; e < i; e += 1)
                                        5 === t[e].ty && (r = void 0,
                                        "number" == typeof (r = t[e].t.p).a && (r.a = {
                                            a: 0,
                                            k: r.a
                                        }),
                                        "number" == typeof r.p && (r.p = {
                                            a: 0,
                                            k: r.p
                                        }),
                                        "number" == typeof r.r && (r.r = {
                                            a: 0,
                                            k: r.r
                                        }))
                                }
                                return function(r) {
                                    if (n(t, r.v) && (e(r.layers),
                                    r.assets)) {
                                        var i, s = r.assets.length;
                                        for (i = 0; i < s; i += 1)
                                            r.assets[i].layers && e(r.assets[i].layers)
                                    }
                                }
                            }(), l = function() {
                                var t = [4, 1, 9];
                                function e(t) {
                                    var r, i, n, s = t.length;
                                    for (r = 0; r < s; r += 1)
                                        if ("gr" === t[r].ty)
                                            e(t[r].it);
                                        else if ("fl" === t[r].ty || "st" === t[r].ty)
                                            if (t[r].c.k && t[r].c.k[0].i)
                                                for (n = t[r].c.k.length,
                                                i = 0; i < n; i += 1)
                                                    t[r].c.k[i].s && (t[r].c.k[i].s[0] /= 255,
                                                    t[r].c.k[i].s[1] /= 255,
                                                    t[r].c.k[i].s[2] /= 255,
                                                    t[r].c.k[i].s[3] /= 255),
                                                    t[r].c.k[i].e && (t[r].c.k[i].e[0] /= 255,
                                                    t[r].c.k[i].e[1] /= 255,
                                                    t[r].c.k[i].e[2] /= 255,
                                                    t[r].c.k[i].e[3] /= 255);
                                            else
                                                t[r].c.k[0] /= 255,
                                                t[r].c.k[1] /= 255,
                                                t[r].c.k[2] /= 255,
                                                t[r].c.k[3] /= 255
                                }
                                function r(t) {
                                    var r, i = t.length;
                                    for (r = 0; r < i; r += 1)
                                        4 === t[r].ty && e(t[r].shapes)
                                }
                                return function(e) {
                                    if (n(t, e.v) && (r(e.layers),
                                    e.assets)) {
                                        var i, s = e.assets.length;
                                        for (i = 0; i < s; i += 1)
                                            e.assets[i].layers && r(e.assets[i].layers)
                                    }
                                }
                            }(), p = function() {
                                var t = [4, 4, 18];
                                function e(t) {
                                    var r, i, n;
                                    for (r = t.length - 1; r >= 0; r -= 1)
                                        if ("sh" === t[r].ty)
                                            if (t[r].ks.k.i)
                                                t[r].ks.k.c = t[r].closed;
                                            else
                                                for (n = t[r].ks.k.length,
                                                i = 0; i < n; i += 1)
                                                    t[r].ks.k[i].s && (t[r].ks.k[i].s[0].c = t[r].closed),
                                                    t[r].ks.k[i].e && (t[r].ks.k[i].e[0].c = t[r].closed);
                                        else
                                            "gr" === t[r].ty && e(t[r].it)
                                }
                                function r(t) {
                                    var r, i, n, s, a, o, h = t.length;
                                    for (i = 0; i < h; i += 1) {
                                        if ((r = t[i]).hasMask) {
                                            var l = r.masksProperties;
                                            for (s = l.length,
                                            n = 0; n < s; n += 1)
                                                if (l[n].pt.k.i)
                                                    l[n].pt.k.c = l[n].cl;
                                                else
                                                    for (o = l[n].pt.k.length,
                                                    a = 0; a < o; a += 1)
                                                        l[n].pt.k[a].s && (l[n].pt.k[a].s[0].c = l[n].cl),
                                                        l[n].pt.k[a].e && (l[n].pt.k[a].e[0].c = l[n].cl)
                                        }
                                        4 === r.ty && e(r.shapes)
                                    }
                                }
                                return function(e) {
                                    if (n(t, e.v) && (r(e.layers),
                                    e.assets)) {
                                        var i, s = e.assets.length;
                                        for (i = 0; i < s; i += 1)
                                            e.assets[i].layers && r(e.assets[i].layers)
                                    }
                                }
                            }();
                            var c = {
                                completeData: function(r) {
                                    r.__complete || (l(r),
                                    a(r),
                                    o(r),
                                    h(r),
                                    p(r),
                                    t(r.layers, r.assets),
                                    function(r, i) {
                                        if (r) {
                                            var n = 0
                                              , s = r.length;
                                            for (n = 0; n < s; n += 1)
                                                1 === r[n].t && (r[n].data.layers = e(r[n].data.refId, i),
                                                t(r[n].data.layers, i))
                                        }
                                    }(r.chars, r.assets),
                                    r.__complete = !0)
                                }
                            };
                            return c.checkColors = l,
                            c.checkChars = o,
                            c.checkPathProperties = h,
                            c.checkShapes = p,
                            c.completeLayers = t,
                            c
                        }()),
                        s.assetLoader || (s.assetLoader = function() {
                            function t(t) {
                                var e = t.getResponseHeader("content-type");
                                return e && "json" === t.responseType && -1 !== e.indexOf("json") || t.response && "object" === _typeof$5(t.response) ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : null
                            }
                            return {
                                load: function(e, r, i, n) {
                                    var s, a = new XMLHttpRequest;
                                    try {
                                        a.responseType = "json"
                                    } catch (t) {}
                                    a.onreadystatechange = function() {
                                        if (4 === a.readyState)
                                            if (200 === a.status)
                                                s = t(a),
                                                i(s);
                                            else
                                                try {
                                                    s = t(a),
                                                    i(s)
                                                } catch (t) {
                                                    n && n(t)
                                                }
                                    }
                                    ;
                                    try {
                                        a.open(["G", "E", "T"].join(""), e, !0)
                                    } catch (t) {
                                        a.open(["G", "E", "T"].join(""), r + "/" + e, !0)
                                    }
                                    a.send()
                                }
                            }
                        }()),
                        "loadAnimation" === t.data.type)
                            s.assetLoader.load(t.data.path, t.data.fullPath, (function(e) {
                                s.dataManager.completeData(e),
                                s.postMessage({
                                    id: t.data.id,
                                    payload: e,
                                    status: "success"
                                })
                            }
                            ), (function() {
                                s.postMessage({
                                    id: t.data.id,
                                    status: "error"
                                })
                            }
                            ));
                        else if ("complete" === t.data.type) {
                            var e = t.data.animation;
                            s.dataManager.completeData(e),
                            s.postMessage({
                                id: t.data.id,
                                payload: e,
                                status: "success"
                            })
                        } else
                            "loadData" === t.data.type && s.assetLoader.load(t.data.path, t.data.fullPath, (function(e) {
                                s.postMessage({
                                    id: t.data.id,
                                    payload: e,
                                    status: "success"
                                })
                            }
                            ), (function() {
                                s.postMessage({
                                    id: t.data.id,
                                    status: "error"
                                })
                            }
                            ))
                    }
                    )),
                    e.onmessage = function(t) {
                        var e = t.data
                          , r = e.id
                          , n = i[r];
                        i[r] = null,
                        "success" === e.status ? n.onComplete(e.payload) : n.onError && n.onError()
                    }
                    )
                }
                function o(t, e) {
                    var n = "processId_" + (r += 1);
                    return i[n] = {
                        onComplete: t,
                        onError: e
                    },
                    n
                }
                return {
                    loadAnimation: function(t, r, i) {
                        a();
                        var n = o(r, i);
                        e.postMessage({
                            type: "loadAnimation",
                            path: t,
                            fullPath: window.location.origin + window.location.pathname,
                            id: n
                        })
                    },
                    loadData: function(t, r, i) {
                        a();
                        var n = o(r, i);
                        e.postMessage({
                            type: "loadData",
                            path: t,
                            fullPath: window.location.origin + window.location.pathname,
                            id: n
                        })
                    },
                    completeAnimation: function(t, r, i) {
                        a();
                        var n = o(r, i);
                        e.postMessage({
                            type: "complete",
                            animation: t,
                            id: n
                        })
                    }
                }
            }()
              , ImagePreloader = function() {
                var t = function() {
                    var t = createTag("canvas");
                    t.width = 1,
                    t.height = 1;
                    var e = t.getContext("2d");
                    return e.fillStyle = "rgba(0,0,0,0)",
                    e.fillRect(0, 0, 1, 1),
                    t
                }();
                function e() {
                    this.loadedAssets += 1,
                    this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages && this.imagesLoadedCb && this.imagesLoadedCb(null)
                }
                function r() {
                    this.loadedFootagesCount += 1,
                    this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages && this.imagesLoadedCb && this.imagesLoadedCb(null)
                }
                function i(t, e, r) {
                    var i = "";
                    if (t.e)
                        i = t.p;
                    else if (e) {
                        var n = t.p;
                        -1 !== n.indexOf("images/") && (n = n.split("/")[1]),
                        i = e + n
                    } else
                        i = r,
                        i += t.u ? t.u : "",
                        i += t.p;
                    return i
                }
                function n(t) {
                    var e = 0
                      , r = setInterval(function() {
                        (t.getBBox().width || e > 500) && (this._imageLoaded(),
                        clearInterval(r)),
                        e += 1
                    }
                    .bind(this), 50)
                }
                function s(t) {
                    var e = {
                        assetData: t
                    }
                      , r = i(t, this.assetsPath, this.path);
                    return dataManager.loadData(r, function(t) {
                        e.img = t,
                        this._footageLoaded()
                    }
                    .bind(this), function() {
                        e.img = {},
                        this._footageLoaded()
                    }
                    .bind(this)),
                    e
                }
                function a() {
                    this._imageLoaded = e.bind(this),
                    this._footageLoaded = r.bind(this),
                    this.testImageLoaded = n.bind(this),
                    this.createFootageData = s.bind(this),
                    this.assetsPath = "",
                    this.path = "",
                    this.totalImages = 0,
                    this.totalFootages = 0,
                    this.loadedAssets = 0,
                    this.loadedFootagesCount = 0,
                    this.imagesLoadedCb = null,
                    this.images = []
                }
                return a.prototype = {
                    loadAssets: function(t, e) {
                        var r;
                        this.imagesLoadedCb = e;
                        var i = t.length;
                        for (r = 0; r < i; r += 1)
                            t[r].layers || (t[r].t && "seq" !== t[r].t ? 3 === t[r].t && (this.totalFootages += 1,
                            this.images.push(this.createFootageData(t[r]))) : (this.totalImages += 1,
                            this.images.push(this._createImageData(t[r]))))
                    },
                    setAssetsPath: function(t) {
                        this.assetsPath = t || ""
                    },
                    setPath: function(t) {
                        this.path = t || ""
                    },
                    loadedImages: function() {
                        return this.totalImages === this.loadedAssets
                    },
                    loadedFootages: function() {
                        return this.totalFootages === this.loadedFootagesCount
                    },
                    destroy: function() {
                        this.imagesLoadedCb = null,
                        this.images.length = 0
                    },
                    getAsset: function(t) {
                        for (var e = 0, r = this.images.length; e < r; ) {
                            if (this.images[e].assetData === t)
                                return this.images[e].img;
                            e += 1
                        }
                        return null
                    },
                    createImgData: function(e) {
                        var r = i(e, this.assetsPath, this.path)
                          , n = createTag("img");
                        n.crossOrigin = "anonymous",
                        n.addEventListener("load", this._imageLoaded, !1),
                        n.addEventListener("error", function() {
                            s.img = t,
                            this._imageLoaded()
                        }
                        .bind(this), !1),
                        n.src = r;
                        var s = {
                            img: n,
                            assetData: e
                        };
                        return s
                    },
                    createImageData: function(e) {
                        var r = i(e, this.assetsPath, this.path)
                          , n = createNS("image");
                        isSafari ? this.testImageLoaded(n) : n.addEventListener("load", this._imageLoaded, !1),
                        n.addEventListener("error", function() {
                            s.img = t,
                            this._imageLoaded()
                        }
                        .bind(this), !1),
                        n.setAttributeNS("http://www.w3.org/1999/xlink", "href", r),
                        this._elementHelper.append ? this._elementHelper.append(n) : this._elementHelper.appendChild(n);
                        var s = {
                            img: n,
                            assetData: e
                        };
                        return s
                    },
                    imageLoaded: e,
                    footageLoaded: r,
                    setCacheType: function(t, e) {
                        "svg" === t ? (this._elementHelper = e,
                        this._createImageData = this.createImageData.bind(this)) : this._createImageData = this.createImgData.bind(this)
                    }
                },
                a
            }();
            function BaseEvent() {}
            BaseEvent.prototype = {
                triggerEvent: function(t, e) {
                    if (this._cbs[t])
                        for (var r = this._cbs[t], i = 0; i < r.length; i += 1)
                            r[i](e)
                },
                addEventListener: function(t, e) {
                    return this._cbs[t] || (this._cbs[t] = []),
                    this._cbs[t].push(e),
                    function() {
                        this.removeEventListener(t, e)
                    }
                    .bind(this)
                },
                removeEventListener: function(t, e) {
                    if (e) {
                        if (this._cbs[t]) {
                            for (var r = 0, i = this._cbs[t].length; r < i; )
                                this._cbs[t][r] === e && (this._cbs[t].splice(r, 1),
                                r -= 1,
                                i -= 1),
                                r += 1;
                            this._cbs[t].length || (this._cbs[t] = null)
                        }
                    } else
                        this._cbs[t] = null
                }
            };
            var markerParser = function() {
                function t(t) {
                    for (var e, r = t.split("\r\n"), i = {}, n = 0, s = 0; s < r.length; s += 1)
                        2 === (e = r[s].split(":")).length && (i[e[0]] = e[1].trim(),
                        n += 1);
                    if (0 === n)
                        throw new Error;
                    return i
                }
                return function(e) {
                    for (var r = [], i = 0; i < e.length; i += 1) {
                        var n = e[i]
                          , s = {
                            time: n.tm,
                            duration: n.dr
                        };
                        try {
                            s.payload = JSON.parse(e[i].cm)
                        } catch (r) {
                            try {
                                s.payload = t(e[i].cm)
                            } catch (t) {
                                s.payload = {
                                    name: e[i].cm
                                }
                            }
                        }
                        r.push(s)
                    }
                    return r
                }
            }()
              , ProjectInterface = function() {
                function t(t) {
                    this.compositions.push(t)
                }
                return function() {
                    function e(t) {
                        for (var e = 0, r = this.compositions.length; e < r; ) {
                            if (this.compositions[e].data && this.compositions[e].data.nm === t)
                                return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame),
                                this.compositions[e].compInterface;
                            e += 1
                        }
                        return null
                    }
                    return e.compositions = [],
                    e.currentFrame = 0,
                    e.registerComposition = t,
                    e
                }
            }()
              , renderers = {}
              , registerRenderer = function(t, e) {
                renderers[t] = e
            };
            function getRenderer(t) {
                return renderers[t]
            }
            function getRegisteredRenderer() {
                if (renderers.canvas)
                    return "canvas";
                for (var t in renderers)
                    if (renderers[t])
                        return t;
                return ""
            }
            function _typeof$4(t) {
                return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                }
                : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }
                ,
                _typeof$4(t)
            }
            var AnimationItem = function() {
                this._cbs = [],
                this.name = "",
                this.path = "",
                this.isLoaded = !1,
                this.currentFrame = 0,
                this.currentRawFrame = 0,
                this.firstFrame = 0,
                this.totalFrames = 0,
                this.frameRate = 0,
                this.frameMult = 0,
                this.playSpeed = 1,
                this.playDirection = 1,
                this.playCount = 0,
                this.animationData = {},
                this.assets = [],
                this.isPaused = !0,
                this.autoplay = !1,
                this.loop = !0,
                this.renderer = null,
                this.animationID = createElementID(),
                this.assetsPath = "",
                this.timeCompleted = 0,
                this.segmentPos = 0,
                this.isSubframeEnabled = getSubframeEnabled(),
                this.segments = [],
                this._idle = !0,
                this._completedLoop = !1,
                this.projectInterface = ProjectInterface(),
                this.imagePreloader = new ImagePreloader,
                this.audioController = audioControllerFactory(),
                this.markers = [],
                this.configAnimation = this.configAnimation.bind(this),
                this.onSetupError = this.onSetupError.bind(this),
                this.onSegmentComplete = this.onSegmentComplete.bind(this),
                this.drawnFrameEvent = new BMEnterFrameEvent("drawnFrame",0,0,0),
                this.expressionsPlugin = getExpressionsPlugin()
            };
            extendPrototype([BaseEvent], AnimationItem),
            AnimationItem.prototype.setParams = function(t) {
                (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
                var e = "svg";
                t.animType ? e = t.animType : t.renderer && (e = t.renderer);
                var r = getRenderer(e);
                this.renderer = new r(this,t.rendererSettings),
                this.imagePreloader.setCacheType(e, this.renderer.globalData.defs),
                this.renderer.setProjectInterface(this.projectInterface),
                this.animType = e,
                "" === t.loop || null === t.loop || void 0 === t.loop || !0 === t.loop ? this.loop = !0 : !1 === t.loop ? this.loop = !1 : this.loop = parseInt(t.loop, 10),
                this.autoplay = !("autoplay"in t) || t.autoplay,
                this.name = t.name ? t.name : "",
                this.autoloadSegments = !Object.prototype.hasOwnProperty.call(t, "autoloadSegments") || t.autoloadSegments,
                this.assetsPath = t.assetsPath,
                this.initialSegment = t.initialSegment,
                t.audioFactory && this.audioController.setAudioFactory(t.audioFactory),
                t.animationData ? this.setupAnimation(t.animationData) : t.path && (-1 !== t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1),
                this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1),
                this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")),
                dataManager.loadAnimation(t.path, this.configAnimation, this.onSetupError))
            }
            ,
            AnimationItem.prototype.onSetupError = function() {
                this.trigger("data_failed")
            }
            ,
            AnimationItem.prototype.setupAnimation = function(t) {
                dataManager.completeAnimation(t, this.configAnimation)
            }
            ,
            AnimationItem.prototype.setData = function(t, e) {
                e && "object" !== _typeof$4(e) && (e = JSON.parse(e));
                var r = {
                    wrapper: t,
                    animationData: e
                }
                  , i = t.attributes;
                r.path = i.getNamedItem("data-animation-path") ? i.getNamedItem("data-animation-path").value : i.getNamedItem("data-bm-path") ? i.getNamedItem("data-bm-path").value : i.getNamedItem("bm-path") ? i.getNamedItem("bm-path").value : "",
                r.animType = i.getNamedItem("data-anim-type") ? i.getNamedItem("data-anim-type").value : i.getNamedItem("data-bm-type") ? i.getNamedItem("data-bm-type").value : i.getNamedItem("bm-type") ? i.getNamedItem("bm-type").value : i.getNamedItem("data-bm-renderer") ? i.getNamedItem("data-bm-renderer").value : i.getNamedItem("bm-renderer") ? i.getNamedItem("bm-renderer").value : getRegisteredRenderer() || "canvas";
                var n = i.getNamedItem("data-anim-loop") ? i.getNamedItem("data-anim-loop").value : i.getNamedItem("data-bm-loop") ? i.getNamedItem("data-bm-loop").value : i.getNamedItem("bm-loop") ? i.getNamedItem("bm-loop").value : "";
                "false" === n ? r.loop = !1 : "true" === n ? r.loop = !0 : "" !== n && (r.loop = parseInt(n, 10));
                var s = i.getNamedItem("data-anim-autoplay") ? i.getNamedItem("data-anim-autoplay").value : i.getNamedItem("data-bm-autoplay") ? i.getNamedItem("data-bm-autoplay").value : !i.getNamedItem("bm-autoplay") || i.getNamedItem("bm-autoplay").value;
                r.autoplay = "false" !== s,
                r.name = i.getNamedItem("data-name") ? i.getNamedItem("data-name").value : i.getNamedItem("data-bm-name") ? i.getNamedItem("data-bm-name").value : i.getNamedItem("bm-name") ? i.getNamedItem("bm-name").value : "",
                "false" === (i.getNamedItem("data-anim-prerender") ? i.getNamedItem("data-anim-prerender").value : i.getNamedItem("data-bm-prerender") ? i.getNamedItem("data-bm-prerender").value : i.getNamedItem("bm-prerender") ? i.getNamedItem("bm-prerender").value : "") && (r.prerender = !1),
                r.path ? this.setParams(r) : this.trigger("destroy")
            }
            ,
            AnimationItem.prototype.includeLayers = function(t) {
                t.op > this.animationData.op && (this.animationData.op = t.op,
                this.totalFrames = Math.floor(t.op - this.animationData.ip));
                var e, r, i = this.animationData.layers, n = i.length, s = t.layers, a = s.length;
                for (r = 0; r < a; r += 1)
                    for (e = 0; e < n; ) {
                        if (i[e].id === s[r].id) {
                            i[e] = s[r];
                            break
                        }
                        e += 1
                    }
                if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars),
                this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)),
                t.assets)
                    for (n = t.assets.length,
                    e = 0; e < n; e += 1)
                        this.animationData.assets.push(t.assets[e]);
                this.animationData.__complete = !1,
                dataManager.completeAnimation(this.animationData, this.onSegmentComplete)
            }
            ,
            AnimationItem.prototype.onSegmentComplete = function(t) {
                this.animationData = t;
                var e = getExpressionsPlugin();
                e && e.initExpressions(this),
                this.loadNextSegment()
            }
            ,
            AnimationItem.prototype.loadNextSegment = function() {
                var t = this.animationData.segments;
                if (!t || 0 === t.length || !this.autoloadSegments)
                    return this.trigger("data_ready"),
                    void (this.timeCompleted = this.totalFrames);
                var e = t.shift();
                this.timeCompleted = e.time * this.frameRate;
                var r = this.path + this.fileName + "_" + this.segmentPos + ".json";
                this.segmentPos += 1,
                dataManager.loadData(r, this.includeLayers.bind(this), function() {
                    this.trigger("data_failed")
                }
                .bind(this))
            }
            ,
            AnimationItem.prototype.loadSegments = function() {
                this.animationData.segments || (this.timeCompleted = this.totalFrames),
                this.loadNextSegment()
            }
            ,
            AnimationItem.prototype.imagesLoaded = function() {
                this.trigger("loaded_images"),
                this.checkLoaded()
            }
            ,
            AnimationItem.prototype.preloadImages = function() {
                this.imagePreloader.setAssetsPath(this.assetsPath),
                this.imagePreloader.setPath(this.path),
                this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this))
            }
            ,
            AnimationItem.prototype.configAnimation = function(t) {
                if (this.renderer)
                    try {
                        this.animationData = t,
                        this.initialSegment ? (this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]),
                        this.firstFrame = Math.round(this.initialSegment[0])) : (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip),
                        this.firstFrame = Math.round(this.animationData.ip)),
                        this.renderer.configAnimation(t),
                        t.assets || (t.assets = []),
                        this.assets = this.animationData.assets,
                        this.frameRate = this.animationData.fr,
                        this.frameMult = this.animationData.fr / 1e3,
                        this.renderer.searchExtraCompositions(t.assets),
                        this.markers = markerParser(t.markers || []),
                        this.trigger("config_ready"),
                        this.preloadImages(),
                        this.loadSegments(),
                        this.updaFrameModifier(),
                        this.waitForFontsLoaded(),
                        this.isPaused && this.audioController.pause()
                    } catch (t) {
                        this.triggerConfigError(t)
                    }
            }
            ,
            AnimationItem.prototype.waitForFontsLoaded = function() {
                this.renderer && (this.renderer.globalData.fontManager.isLoaded ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20))
            }
            ,
            AnimationItem.prototype.checkLoaded = function() {
                if (!this.isLoaded && this.renderer.globalData.fontManager.isLoaded && (this.imagePreloader.loadedImages() || "canvas" !== this.renderer.rendererType) && this.imagePreloader.loadedFootages()) {
                    this.isLoaded = !0;
                    var t = getExpressionsPlugin();
                    t && t.initExpressions(this),
                    this.renderer.initItems(),
                    setTimeout(function() {
                        this.trigger("DOMLoaded")
                    }
                    .bind(this), 0),
                    this.gotoFrame(),
                    this.autoplay && this.play()
                }
            }
            ,
            AnimationItem.prototype.resize = function(t, e) {
                var r = "number" == typeof t ? t : void 0
                  , i = "number" == typeof e ? e : void 0;
                this.renderer.updateContainerSize(r, i)
            }
            ,
            AnimationItem.prototype.setSubframe = function(t) {
                this.isSubframeEnabled = !!t
            }
            ,
            AnimationItem.prototype.gotoFrame = function() {
                this.currentFrame = this.isSubframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame,
                this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted),
                this.trigger("enterFrame"),
                this.renderFrame(),
                this.trigger("drawnFrame")
            }
            ,
            AnimationItem.prototype.renderFrame = function() {
                if (!1 !== this.isLoaded && this.renderer)
                    try {
                        this.expressionsPlugin && this.expressionsPlugin.resetFrame(),
                        this.renderer.renderFrame(this.currentFrame + this.firstFrame)
                    } catch (t) {
                        this.triggerRenderFrameError(t)
                    }
            }
            ,
            AnimationItem.prototype.play = function(t) {
                t && this.name !== t || !0 === this.isPaused && (this.isPaused = !1,
                this.trigger("_play"),
                this.audioController.resume(),
                this._idle && (this._idle = !1,
                this.trigger("_active")))
            }
            ,
            AnimationItem.prototype.pause = function(t) {
                t && this.name !== t || !1 === this.isPaused && (this.isPaused = !0,
                this.trigger("_pause"),
                this._idle = !0,
                this.trigger("_idle"),
                this.audioController.pause())
            }
            ,
            AnimationItem.prototype.togglePause = function(t) {
                t && this.name !== t || (!0 === this.isPaused ? this.play() : this.pause())
            }
            ,
            AnimationItem.prototype.stop = function(t) {
                t && this.name !== t || (this.pause(),
                this.playCount = 0,
                this._completedLoop = !1,
                this.setCurrentRawFrameValue(0))
            }
            ,
            AnimationItem.prototype.getMarkerData = function(t) {
                for (var e, r = 0; r < this.markers.length; r += 1)
                    if ((e = this.markers[r]).payload && e.payload.name === t)
                        return e;
                return null
            }
            ,
            AnimationItem.prototype.goToAndStop = function(t, e, r) {
                if (!r || this.name === r) {
                    var i = Number(t);
                    if (isNaN(i)) {
                        var n = this.getMarkerData(t);
                        n && this.goToAndStop(n.time, !0)
                    } else
                        e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier);
                    this.pause()
                }
            }
            ,
            AnimationItem.prototype.goToAndPlay = function(t, e, r) {
                if (!r || this.name === r) {
                    var i = Number(t);
                    if (isNaN(i)) {
                        var n = this.getMarkerData(t);
                        n && (n.duration ? this.playSegments([n.time, n.time + n.duration], !0) : this.goToAndStop(n.time, !0))
                    } else
                        this.goToAndStop(i, e, r);
                    this.play()
                }
            }
            ,
            AnimationItem.prototype.advanceTime = function(t) {
                if (!0 !== this.isPaused && !1 !== this.isLoaded) {
                    var e = this.currentRawFrame + t * this.frameModifier
                      , r = !1;
                    e >= this.totalFrames - 1 && this.frameModifier > 0 ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1,
                    this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames),
                    this._completedLoop = !0,
                    this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (r = !0,
                    e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (r = !0,
                    e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames),
                    this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(e),
                    r && (this.setCurrentRawFrameValue(e),
                    this.pause(),
                    this.trigger("complete"))
                }
            }
            ,
            AnimationItem.prototype.adjustSegment = function(t, e) {
                this.playCount = 0,
                t[1] < t[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)),
                this.totalFrames = t[0] - t[1],
                this.timeCompleted = this.totalFrames,
                this.firstFrame = t[1],
                this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)),
                this.totalFrames = t[1] - t[0],
                this.timeCompleted = this.totalFrames,
                this.firstFrame = t[0],
                this.setCurrentRawFrameValue(.001 + e)),
                this.trigger("segmentStart")
            }
            ,
            AnimationItem.prototype.setSegment = function(t, e) {
                var r = -1;
                this.isPaused && (this.currentRawFrame + this.firstFrame < t ? r = t : this.currentRawFrame + this.firstFrame > e && (r = e - t)),
                this.firstFrame = t,
                this.totalFrames = e - t,
                this.timeCompleted = this.totalFrames,
                -1 !== r && this.goToAndStop(r, !0)
            }
            ,
            AnimationItem.prototype.playSegments = function(t, e) {
                if (e && (this.segments.length = 0),
                "object" === _typeof$4(t[0])) {
                    var r, i = t.length;
                    for (r = 0; r < i; r += 1)
                        this.segments.push(t[r])
                } else
                    this.segments.push(t);
                this.segments.length && e && this.adjustSegment(this.segments.shift(), 0),
                this.isPaused && this.play()
            }
            ,
            AnimationItem.prototype.resetSegments = function(t) {
                this.segments.length = 0,
                this.segments.push([this.animationData.ip, this.animationData.op]),
                t && this.checkSegments(0)
            }
            ,
            AnimationItem.prototype.checkSegments = function(t) {
                return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t),
                !0)
            }
            ,
            AnimationItem.prototype.destroy = function(t) {
                t && this.name !== t || !this.renderer || (this.renderer.destroy(),
                this.imagePreloader.destroy(),
                this.trigger("destroy"),
                this._cbs = null,
                this.onEnterFrame = null,
                this.onLoopComplete = null,
                this.onComplete = null,
                this.onSegmentStart = null,
                this.onDestroy = null,
                this.renderer = null,
                this.expressionsPlugin = null,
                this.imagePreloader = null,
                this.projectInterface = null)
            }
            ,
            AnimationItem.prototype.setCurrentRawFrameValue = function(t) {
                this.currentRawFrame = t,
                this.gotoFrame()
            }
            ,
            AnimationItem.prototype.setSpeed = function(t) {
                this.playSpeed = t,
                this.updaFrameModifier()
            }
            ,
            AnimationItem.prototype.setDirection = function(t) {
                this.playDirection = t < 0 ? -1 : 1,
                this.updaFrameModifier()
            }
            ,
            AnimationItem.prototype.setLoop = function(t) {
                this.loop = t
            }
            ,
            AnimationItem.prototype.setVolume = function(t, e) {
                e && this.name !== e || this.audioController.setVolume(t)
            }
            ,
            AnimationItem.prototype.getVolume = function() {
                return this.audioController.getVolume()
            }
            ,
            AnimationItem.prototype.mute = function(t) {
                t && this.name !== t || this.audioController.mute()
            }
            ,
            AnimationItem.prototype.unmute = function(t) {
                t && this.name !== t || this.audioController.unmute()
            }
            ,
            AnimationItem.prototype.updaFrameModifier = function() {
                this.frameModifier = this.frameMult * this.playSpeed * this.playDirection,
                this.audioController.setRate(this.playSpeed * this.playDirection)
            }
            ,
            AnimationItem.prototype.getPath = function() {
                return this.path
            }
            ,
            AnimationItem.prototype.getAssetsPath = function(t) {
                var e = "";
                if (t.e)
                    e = t.p;
                else if (this.assetsPath) {
                    var r = t.p;
                    -1 !== r.indexOf("images/") && (r = r.split("/")[1]),
                    e = this.assetsPath + r
                } else
                    e = this.path,
                    e += t.u ? t.u : "",
                    e += t.p;
                return e
            }
            ,
            AnimationItem.prototype.getAssetData = function(t) {
                for (var e = 0, r = this.assets.length; e < r; ) {
                    if (t === this.assets[e].id)
                        return this.assets[e];
                    e += 1
                }
                return null
            }
            ,
            AnimationItem.prototype.hide = function() {
                this.renderer.hide()
            }
            ,
            AnimationItem.prototype.show = function() {
                this.renderer.show()
            }
            ,
            AnimationItem.prototype.getDuration = function(t) {
                return t ? this.totalFrames : this.totalFrames / this.frameRate
            }
            ,
            AnimationItem.prototype.updateDocumentData = function(t, e, r) {
                try {
                    this.renderer.getElementByPath(t).updateDocumentData(e, r)
                } catch (t) {}
            }
            ,
            AnimationItem.prototype.trigger = function(t) {
                if (this._cbs && this._cbs[t])
                    switch (t) {
                    case "enterFrame":
                        this.triggerEvent(t, new BMEnterFrameEvent(t,this.currentFrame,this.totalFrames,this.frameModifier));
                        break;
                    case "drawnFrame":
                        this.drawnFrameEvent.currentTime = this.currentFrame,
                        this.drawnFrameEvent.totalTime = this.totalFrames,
                        this.drawnFrameEvent.direction = this.frameModifier,
                        this.triggerEvent(t, this.drawnFrameEvent);
                        break;
                    case "loopComplete":
                        this.triggerEvent(t, new BMCompleteLoopEvent(t,this.loop,this.playCount,this.frameMult));
                        break;
                    case "complete":
                        this.triggerEvent(t, new BMCompleteEvent(t,this.frameMult));
                        break;
                    case "segmentStart":
                        this.triggerEvent(t, new BMSegmentStartEvent(t,this.firstFrame,this.totalFrames));
                        break;
                    case "destroy":
                        this.triggerEvent(t, new BMDestroyEvent(t,this));
                        break;
                    default:
                        this.triggerEvent(t)
                    }
                "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t,this.currentFrame,this.totalFrames,this.frameMult)),
                "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t,this.loop,this.playCount,this.frameMult)),
                "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t,this.frameMult)),
                "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t,this.firstFrame,this.totalFrames)),
                "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t,this))
            }
            ,
            AnimationItem.prototype.triggerRenderFrameError = function(t) {
                var e = new BMRenderFrameErrorEvent(t,this.currentFrame);
                this.triggerEvent("error", e),
                this.onError && this.onError.call(this, e)
            }
            ,
            AnimationItem.prototype.triggerConfigError = function(t) {
                var e = new BMConfigErrorEvent(t,this.currentFrame);
                this.triggerEvent("error", e),
                this.onError && this.onError.call(this, e)
            }
            ;
            var animationManager = function() {
                var t = {}
                  , e = []
                  , r = 0
                  , i = 0
                  , n = 0
                  , s = !0
                  , a = !1;
                function o(t) {
                    for (var r = 0, n = t.target; r < i; )
                        e[r].animation === n && (e.splice(r, 1),
                        r -= 1,
                        i -= 1,
                        n.isPaused || p()),
                        r += 1
                }
                function h(t, r) {
                    if (!t)
                        return null;
                    for (var n = 0; n < i; ) {
                        if (e[n].elem === t && null !== e[n].elem)
                            return e[n].animation;
                        n += 1
                    }
                    var s = new AnimationItem;
                    return c(s, t),
                    s.setData(t, r),
                    s
                }
                function l() {
                    n += 1,
                    d()
                }
                function p() {
                    n -= 1
                }
                function c(t, r) {
                    t.addEventListener("destroy", o),
                    t.addEventListener("_active", l),
                    t.addEventListener("_idle", p),
                    e.push({
                        elem: r,
                        animation: t
                    }),
                    i += 1
                }
                function f(t) {
                    var o, h = t - r;
                    for (o = 0; o < i; o += 1)
                        e[o].animation.advanceTime(h);
                    r = t,
                    n && !a ? window.requestAnimationFrame(f) : s = !0
                }
                function u(t) {
                    r = t,
                    window.requestAnimationFrame(f)
                }
                function d() {
                    !a && n && s && (window.requestAnimationFrame(u),
                    s = !1)
                }
                return t.registerAnimation = h,
                t.loadAnimation = function(t) {
                    var e = new AnimationItem;
                    return c(e, null),
                    e.setParams(t),
                    e
                }
                ,
                t.setSpeed = function(t, r) {
                    var n;
                    for (n = 0; n < i; n += 1)
                        e[n].animation.setSpeed(t, r)
                }
                ,
                t.setDirection = function(t, r) {
                    var n;
                    for (n = 0; n < i; n += 1)
                        e[n].animation.setDirection(t, r)
                }
                ,
                t.play = function(t) {
                    var r;
                    for (r = 0; r < i; r += 1)
                        e[r].animation.play(t)
                }
                ,
                t.pause = function(t) {
                    var r;
                    for (r = 0; r < i; r += 1)
                        e[r].animation.pause(t)
                }
                ,
                t.stop = function(t) {
                    var r;
                    for (r = 0; r < i; r += 1)
                        e[r].animation.stop(t)
                }
                ,
                t.togglePause = function(t) {
                    var r;
                    for (r = 0; r < i; r += 1)
                        e[r].animation.togglePause(t)
                }
                ,
                t.searchAnimations = function(t, e, r) {
                    var i, n = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))), s = n.length;
                    for (i = 0; i < s; i += 1)
                        r && n[i].setAttribute("data-bm-type", r),
                        h(n[i], t);
                    if (e && 0 === s) {
                        r || (r = "svg");
                        var a = document.getElementsByTagName("body")[0];
                        a.innerText = "";
                        var o = createTag("div");
                        o.style.width = "100%",
                        o.style.height = "100%",
                        o.setAttribute("data-bm-type", r),
                        a.appendChild(o),
                        h(o, t)
                    }
                }
                ,
                t.resize = function() {
                    var t;
                    for (t = 0; t < i; t += 1)
                        e[t].animation.resize()
                }
                ,
                t.goToAndStop = function(t, r, n) {
                    var s;
                    for (s = 0; s < i; s += 1)
                        e[s].animation.goToAndStop(t, r, n)
                }
                ,
                t.destroy = function(t) {
                    var r;
                    for (r = i - 1; r >= 0; r -= 1)
                        e[r].animation.destroy(t)
                }
                ,
                t.freeze = function() {
                    a = !0
                }
                ,
                t.unfreeze = function() {
                    a = !1,
                    d()
                }
                ,
                t.setVolume = function(t, r) {
                    var n;
                    for (n = 0; n < i; n += 1)
                        e[n].animation.setVolume(t, r)
                }
                ,
                t.mute = function(t) {
                    var r;
                    for (r = 0; r < i; r += 1)
                        e[r].animation.mute(t)
                }
                ,
                t.unmute = function(t) {
                    var r;
                    for (r = 0; r < i; r += 1)
                        e[r].animation.unmute(t)
                }
                ,
                t.getRegisteredAnimations = function() {
                    var t, r = e.length, i = [];
                    for (t = 0; t < r; t += 1)
                        i.push(e[t].animation);
                    return i
                }
                ,
                t
            }()
              , BezierFactory = function() {
                var t = {
                    getBezierEasing: function(t, r, i, n, s) {
                        var a = s || ("bez_" + t + "_" + r + "_" + i + "_" + n).replace(/\./g, "p");
                        if (e[a])
                            return e[a];
                        var o = new l([t, r, i, n]);
                        return e[a] = o,
                        o
                    }
                }
                  , e = {}
                  , r = .1
                  , i = "function" == typeof Float32Array;
                function n(t, e) {
                    return 1 - 3 * e + 3 * t
                }
                function s(t, e) {
                    return 3 * e - 6 * t
                }
                function a(t) {
                    return 3 * t
                }
                function o(t, e, r) {
                    return ((n(e, r) * t + s(e, r)) * t + a(e)) * t
                }
                function h(t, e, r) {
                    return 3 * n(e, r) * t * t + 2 * s(e, r) * t + a(e)
                }
                function l(t) {
                    this._p = t,
                    this._mSampleValues = i ? new Float32Array(11) : new Array(11),
                    this._precomputed = !1,
                    this.get = this.get.bind(this)
                }
                return l.prototype = {
                    get: function(t) {
                        var e = this._p[0]
                          , r = this._p[1]
                          , i = this._p[2]
                          , n = this._p[3];
                        return this._precomputed || this._precompute(),
                        e === r && i === n ? t : 0 === t ? 0 : 1 === t ? 1 : o(this._getTForX(t), r, n)
                    },
                    _precompute: function() {
                        var t = this._p[0]
                          , e = this._p[1]
                          , r = this._p[2]
                          , i = this._p[3];
                        this._precomputed = !0,
                        t === e && r === i || this._calcSampleValues()
                    },
                    _calcSampleValues: function() {
                        for (var t = this._p[0], e = this._p[2], i = 0; i < 11; ++i)
                            this._mSampleValues[i] = o(i * r, t, e)
                    },
                    _getTForX: function(t) {
                        for (var e = this._p[0], i = this._p[2], n = this._mSampleValues, s = 0, a = 1; 10 !== a && n[a] <= t; ++a)
                            s += r;
                        var l = s + (t - n[--a]) / (n[a + 1] - n[a]) * r
                          , p = h(l, e, i);
                        return p >= .001 ? function(t, e, r, i) {
                            for (var n = 0; n < 4; ++n) {
                                var s = h(e, r, i);
                                if (0 === s)
                                    return e;
                                e -= (o(e, r, i) - t) / s
                            }
                            return e
                        }(t, l, e, i) : 0 === p ? l : function(t, e, r, i, n) {
                            var s, a, h = 0;
                            do {
                                (s = o(a = e + (r - e) / 2, i, n) - t) > 0 ? r = a : e = a
                            } while (Math.abs(s) > 1e-7 && ++h < 10);
                            return a
                        }(t, s, s + r, e, i)
                    }
                },
                t
            }()
              , pooling = {
                double: function(t) {
                    return t.concat(createSizedArray(t.length))
                }
            }
              , poolFactory = function(t, e, r) {
                var i = 0
                  , n = t
                  , s = createSizedArray(n);
                return {
                    newElement: function() {
                        return i ? s[i -= 1] : e()
                    },
                    release: function(t) {
                        i === n && (s = pooling.double(s),
                        n *= 2),
                        r && r(t),
                        s[i] = t,
                        i += 1
                    }
                }
            }
              , bezierLengthPool = poolFactory(8, (function() {
                return {
                    addedLength: 0,
                    percents: createTypedArray("float32", getDefaultCurveSegments()),
                    lengths: createTypedArray("float32", getDefaultCurveSegments())
                }
            }
            ))
              , segmentsLengthPool = poolFactory(8, (function() {
                return {
                    lengths: [],
                    totalLength: 0
                }
            }
            ), (function(t) {
                var e, r = t.lengths.length;
                for (e = 0; e < r; e += 1)
                    bezierLengthPool.release(t.lengths[e]);
                t.lengths.length = 0
            }
            ));
            function bezFunction() {
                var t = Math;
                function e(t, e, r, i, n, s) {
                    var a = t * i + e * n + r * s - n * i - s * t - r * e;
                    return a > -.001 && a < .001
                }
                var r = function(t, e, r, i) {
                    var n, s, a, o, h, l, p = getDefaultCurveSegments(), c = 0, f = [], u = [], d = bezierLengthPool.newElement();
                    for (a = r.length,
                    n = 0; n < p; n += 1) {
                        for (h = n / (p - 1),
                        l = 0,
                        s = 0; s < a; s += 1)
                            o = bmPow(1 - h, 3) * t[s] + 3 * bmPow(1 - h, 2) * h * r[s] + 3 * (1 - h) * bmPow(h, 2) * i[s] + bmPow(h, 3) * e[s],
                            f[s] = o,
                            null !== u[s] && (l += bmPow(f[s] - u[s], 2)),
                            u[s] = f[s];
                        l && (c += l = bmSqrt(l)),
                        d.percents[n] = h,
                        d.lengths[n] = c
                    }
                    return d.addedLength = c,
                    d
                };
                function i(t) {
                    this.segmentLength = 0,
                    this.points = new Array(t)
                }
                function n(t, e) {
                    this.partialLength = t,
                    this.point = e
                }
                var s, a = (s = {},
                function(t, r, a, o) {
                    var h = (t[0] + "_" + t[1] + "_" + r[0] + "_" + r[1] + "_" + a[0] + "_" + a[1] + "_" + o[0] + "_" + o[1]).replace(/\./g, "p");
                    if (!s[h]) {
                        var l, p, c, f, u, d, m, g = getDefaultCurveSegments(), y = 0, v = null;
                        2 === t.length && (t[0] !== r[0] || t[1] !== r[1]) && e(t[0], t[1], r[0], r[1], t[0] + a[0], t[1] + a[1]) && e(t[0], t[1], r[0], r[1], r[0] + o[0], r[1] + o[1]) && (g = 2);
                        var _ = new i(g);
                        for (c = a.length,
                        l = 0; l < g; l += 1) {
                            for (m = createSizedArray(c),
                            u = l / (g - 1),
                            d = 0,
                            p = 0; p < c; p += 1)
                                f = bmPow(1 - u, 3) * t[p] + 3 * bmPow(1 - u, 2) * u * (t[p] + a[p]) + 3 * (1 - u) * bmPow(u, 2) * (r[p] + o[p]) + bmPow(u, 3) * r[p],
                                m[p] = f,
                                null !== v && (d += bmPow(m[p] - v[p], 2));
                            y += d = bmSqrt(d),
                            _.points[l] = new n(d,m),
                            v = m
                        }
                        _.segmentLength = y,
                        s[h] = _
                    }
                    return s[h]
                }
                );
                function o(t, e) {
                    var r = e.percents
                      , i = e.lengths
                      , n = r.length
                      , s = bmFloor((n - 1) * t)
                      , a = t * e.addedLength
                      , o = 0;
                    if (s === n - 1 || 0 === s || a === i[s])
                        return r[s];
                    for (var h = i[s] > a ? -1 : 1, l = !0; l; )
                        if (i[s] <= a && i[s + 1] > a ? (o = (a - i[s]) / (i[s + 1] - i[s]),
                        l = !1) : s += h,
                        s < 0 || s >= n - 1) {
                            if (s === n - 1)
                                return r[s];
                            l = !1
                        }
                    return r[s] + (r[s + 1] - r[s]) * o
                }
                var h = createTypedArray("float32", 8);
                return {
                    getSegmentsLength: function(t) {
                        var e, i = segmentsLengthPool.newElement(), n = t.c, s = t.v, a = t.o, o = t.i, h = t._length, l = i.lengths, p = 0;
                        for (e = 0; e < h - 1; e += 1)
                            l[e] = r(s[e], s[e + 1], a[e], o[e + 1]),
                            p += l[e].addedLength;
                        return n && h && (l[e] = r(s[e], s[0], a[e], o[0]),
                        p += l[e].addedLength),
                        i.totalLength = p,
                        i
                    },
                    getNewSegment: function(e, r, i, n, s, a, l) {
                        s < 0 ? s = 0 : s > 1 && (s = 1);
                        var p, c = o(s, l), f = o(a = a > 1 ? 1 : a, l), u = e.length, d = 1 - c, m = 1 - f, g = d * d * d, y = c * d * d * 3, v = c * c * d * 3, _ = c * c * c, b = d * d * m, x = c * d * m + d * c * m + d * d * f, E = c * c * m + d * c * f + c * d * f, S = c * c * f, P = d * m * m, C = c * m * m + d * f * m + d * m * f, T = c * f * m + d * f * f + c * m * f, w = c * f * f, M = m * m * m, A = f * m * m + m * f * m + m * m * f, k = f * f * m + m * f * f + f * m * f, D = f * f * f;
                        for (p = 0; p < u; p += 1)
                            h[4 * p] = t.round(1e3 * (g * e[p] + y * i[p] + v * n[p] + _ * r[p])) / 1e3,
                            h[4 * p + 1] = t.round(1e3 * (b * e[p] + x * i[p] + E * n[p] + S * r[p])) / 1e3,
                            h[4 * p + 2] = t.round(1e3 * (P * e[p] + C * i[p] + T * n[p] + w * r[p])) / 1e3,
                            h[4 * p + 3] = t.round(1e3 * (M * e[p] + A * i[p] + k * n[p] + D * r[p])) / 1e3;
                        return h
                    },
                    getPointInSegment: function(e, r, i, n, s, a) {
                        var h = o(s, a)
                          , l = 1 - h;
                        return [t.round(1e3 * (l * l * l * e[0] + (h * l * l + l * h * l + l * l * h) * i[0] + (h * h * l + l * h * h + h * l * h) * n[0] + h * h * h * r[0])) / 1e3, t.round(1e3 * (l * l * l * e[1] + (h * l * l + l * h * l + l * l * h) * i[1] + (h * h * l + l * h * h + h * l * h) * n[1] + h * h * h * r[1])) / 1e3]
                    },
                    buildBezierData: a,
                    pointOnLine2D: e,
                    pointOnLine3D: function(r, i, n, s, a, o, h, l, p) {
                        if (0 === n && 0 === o && 0 === p)
                            return e(r, i, s, a, h, l);
                        var c, f = t.sqrt(t.pow(s - r, 2) + t.pow(a - i, 2) + t.pow(o - n, 2)), u = t.sqrt(t.pow(h - r, 2) + t.pow(l - i, 2) + t.pow(p - n, 2)), d = t.sqrt(t.pow(h - s, 2) + t.pow(l - a, 2) + t.pow(p - o, 2));
                        return (c = f > u ? f > d ? f - u - d : d - u - f : d > u ? d - u - f : u - f - d) > -1e-4 && c < 1e-4
                    }
                }
            }
            var bez = bezFunction()
              , initFrame = initialDefaultFrame
              , mathAbs = Math.abs;
            function interpolateValue(t, e) {
                var r, i = this.offsetTime;
                "multidimensional" === this.propType && (r = createTypedArray("float32", this.pv.length));
                for (var n, s, a, o, h, l, p, c, f, u = e.lastIndex, d = u, m = this.keyframes.length - 1, g = !0; g; ) {
                    if (n = this.keyframes[d],
                    s = this.keyframes[d + 1],
                    d === m - 1 && t >= s.t - i) {
                        n.h && (n = s),
                        u = 0;
                        break
                    }
                    if (s.t - i > t) {
                        u = d;
                        break
                    }
                    d < m - 1 ? d += 1 : (u = 0,
                    g = !1)
                }
                a = this.keyframesMetadata[d] || {};
                var y, v = s.t - i, _ = n.t - i;
                if (n.to) {
                    a.bezierData || (a.bezierData = bez.buildBezierData(n.s, s.s || n.e, n.to, n.ti));
                    var b = a.bezierData;
                    if (t >= v || t < _) {
                        var x = t >= v ? b.points.length - 1 : 0;
                        for (h = b.points[x].point.length,
                        o = 0; o < h; o += 1)
                            r[o] = b.points[x].point[o]
                    } else {
                        a.__fnct ? f = a.__fnct : (f = BezierFactory.getBezierEasing(n.o.x, n.o.y, n.i.x, n.i.y, n.n).get,
                        a.__fnct = f),
                        l = f((t - _) / (v - _));
                        var E, S = b.segmentLength * l, P = e.lastFrame < t && e._lastKeyframeIndex === d ? e._lastAddedLength : 0;
                        for (c = e.lastFrame < t && e._lastKeyframeIndex === d ? e._lastPoint : 0,
                        g = !0,
                        p = b.points.length; g; ) {
                            if (P += b.points[c].partialLength,
                            0 === S || 0 === l || c === b.points.length - 1) {
                                for (h = b.points[c].point.length,
                                o = 0; o < h; o += 1)
                                    r[o] = b.points[c].point[o];
                                break
                            }
                            if (S >= P && S < P + b.points[c + 1].partialLength) {
                                for (E = (S - P) / b.points[c + 1].partialLength,
                                h = b.points[c].point.length,
                                o = 0; o < h; o += 1)
                                    r[o] = b.points[c].point[o] + (b.points[c + 1].point[o] - b.points[c].point[o]) * E;
                                break
                            }
                            c < p - 1 ? c += 1 : g = !1
                        }
                        e._lastPoint = c,
                        e._lastAddedLength = P - b.points[c].partialLength,
                        e._lastKeyframeIndex = d
                    }
                } else {
                    var C, T, w, M, A;
                    if (m = n.s.length,
                    y = s.s || n.e,
                    this.sh && 1 !== n.h)
                        t >= v ? (r[0] = y[0],
                        r[1] = y[1],
                        r[2] = y[2]) : t <= _ ? (r[0] = n.s[0],
                        r[1] = n.s[1],
                        r[2] = n.s[2]) : quaternionToEuler(r, slerp(createQuaternion(n.s), createQuaternion(y), (t - _) / (v - _)));
                    else
                        for (d = 0; d < m; d += 1)
                            1 !== n.h && (t >= v ? l = 1 : t < _ ? l = 0 : (n.o.x.constructor === Array ? (a.__fnct || (a.__fnct = []),
                            a.__fnct[d] ? f = a.__fnct[d] : (C = void 0 === n.o.x[d] ? n.o.x[0] : n.o.x[d],
                            T = void 0 === n.o.y[d] ? n.o.y[0] : n.o.y[d],
                            w = void 0 === n.i.x[d] ? n.i.x[0] : n.i.x[d],
                            M = void 0 === n.i.y[d] ? n.i.y[0] : n.i.y[d],
                            f = BezierFactory.getBezierEasing(C, T, w, M).get,
                            a.__fnct[d] = f)) : a.__fnct ? f = a.__fnct : (C = n.o.x,
                            T = n.o.y,
                            w = n.i.x,
                            M = n.i.y,
                            f = BezierFactory.getBezierEasing(C, T, w, M).get,
                            n.keyframeMetadata = f),
                            l = f((t - _) / (v - _)))),
                            y = s.s || n.e,
                            A = 1 === n.h ? n.s[d] : n.s[d] + (y[d] - n.s[d]) * l,
                            "multidimensional" === this.propType ? r[d] = A : r = A
                }
                return e.lastIndex = u,
                r
            }
            function slerp(t, e, r) {
                var i, n, s, a, o, h = [], l = t[0], p = t[1], c = t[2], f = t[3], u = e[0], d = e[1], m = e[2], g = e[3];
                return (n = l * u + p * d + c * m + f * g) < 0 && (n = -n,
                u = -u,
                d = -d,
                m = -m,
                g = -g),
                1 - n > 1e-6 ? (i = Math.acos(n),
                s = Math.sin(i),
                a = Math.sin((1 - r) * i) / s,
                o = Math.sin(r * i) / s) : (a = 1 - r,
                o = r),
                h[0] = a * l + o * u,
                h[1] = a * p + o * d,
                h[2] = a * c + o * m,
                h[3] = a * f + o * g,
                h
            }
            function quaternionToEuler(t, e) {
                var r = e[0]
                  , i = e[1]
                  , n = e[2]
                  , s = e[3]
                  , a = Math.atan2(2 * i * s - 2 * r * n, 1 - 2 * i * i - 2 * n * n)
                  , o = Math.asin(2 * r * i + 2 * n * s)
                  , h = Math.atan2(2 * r * s - 2 * i * n, 1 - 2 * r * r - 2 * n * n);
                t[0] = a / degToRads,
                t[1] = o / degToRads,
                t[2] = h / degToRads
            }
            function createQuaternion(t) {
                var e = t[0] * degToRads
                  , r = t[1] * degToRads
                  , i = t[2] * degToRads
                  , n = Math.cos(e / 2)
                  , s = Math.cos(r / 2)
                  , a = Math.cos(i / 2)
                  , o = Math.sin(e / 2)
                  , h = Math.sin(r / 2)
                  , l = Math.sin(i / 2);
                return [o * h * a + n * s * l, o * s * a + n * h * l, n * h * a - o * s * l, n * s * a - o * h * l]
            }
            function getValueAtCurrentTime() {
                var t = this.comp.renderedFrame - this.offsetTime
                  , e = this.keyframes[0].t - this.offsetTime
                  , r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
                if (!(t === this._caching.lastFrame || this._caching.lastFrame !== initFrame && (this._caching.lastFrame >= r && t >= r || this._caching.lastFrame < e && t < e))) {
                    this._caching.lastFrame >= t && (this._caching._lastKeyframeIndex = -1,
                    this._caching.lastIndex = 0);
                    var i = this.interpolateValue(t, this._caching);
                    this.pv = i
                }
                return this._caching.lastFrame = t,
                this.pv
            }
            function setVValue(t) {
                var e;
                if ("unidimensional" === this.propType)
                    e = t * this.mult,
                    mathAbs(this.v - e) > 1e-5 && (this.v = e,
                    this._mdf = !0);
                else
                    for (var r = 0, i = this.v.length; r < i; )
                        e = t[r] * this.mult,
                        mathAbs(this.v[r] - e) > 1e-5 && (this.v[r] = e,
                        this._mdf = !0),
                        r += 1
            }
            function processEffectsSequence() {
                if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length)
                    if (this.lock)
                        this.setVValue(this.pv);
                    else {
                        var t;
                        this.lock = !0,
                        this._mdf = this._isFirstFrame;
                        var e = this.effectsSequence.length
                          , r = this.kf ? this.pv : this.data.k;
                        for (t = 0; t < e; t += 1)
                            r = this.effectsSequence[t](r);
                        this.setVValue(r),
                        this._isFirstFrame = !1,
                        this.lock = !1,
                        this.frameId = this.elem.globalData.frameId
                    }
            }
            function addEffect(t) {
                this.effectsSequence.push(t),
                this.container.addDynamicProperty(this)
            }
            function ValueProperty(t, e, r, i) {
                this.propType = "unidimensional",
                this.mult = r || 1,
                this.data = e,
                this.v = r ? e.k * r : e.k,
                this.pv = e.k,
                this._mdf = !1,
                this.elem = t,
                this.container = i,
                this.comp = t.comp,
                this.k = !1,
                this.kf = !1,
                this.vel = 0,
                this.effectsSequence = [],
                this._isFirstFrame = !0,
                this.getValue = processEffectsSequence,
                this.setVValue = setVValue,
                this.addEffect = addEffect
            }
            function MultiDimensionalProperty(t, e, r, i) {
                var n;
                this.propType = "multidimensional",
                this.mult = r || 1,
                this.data = e,
                this._mdf = !1,
                this.elem = t,
                this.container = i,
                this.comp = t.comp,
                this.k = !1,
                this.kf = !1,
                this.frameId = -1;
                var s = e.k.length;
                for (this.v = createTypedArray("float32", s),
                this.pv = createTypedArray("float32", s),
                this.vel = createTypedArray("float32", s),
                n = 0; n < s; n += 1)
                    this.v[n] = e.k[n] * this.mult,
                    this.pv[n] = e.k[n];
                this._isFirstFrame = !0,
                this.effectsSequence = [],
                this.getValue = processEffectsSequence,
                this.setVValue = setVValue,
                this.addEffect = addEffect
            }
            function KeyframedValueProperty(t, e, r, i) {
                this.propType = "unidimensional",
                this.keyframes = e.k,
                this.keyframesMetadata = [],
                this.offsetTime = t.data.st,
                this.frameId = -1,
                this._caching = {
                    lastFrame: initFrame,
                    lastIndex: 0,
                    value: 0,
                    _lastKeyframeIndex: -1
                },
                this.k = !0,
                this.kf = !0,
                this.data = e,
                this.mult = r || 1,
                this.elem = t,
                this.container = i,
                this.comp = t.comp,
                this.v = initFrame,
                this.pv = initFrame,
                this._isFirstFrame = !0,
                this.getValue = processEffectsSequence,
                this.setVValue = setVValue,
                this.interpolateValue = interpolateValue,
                this.effectsSequence = [getValueAtCurrentTime.bind(this)],
                this.addEffect = addEffect
            }
            function KeyframedMultidimensionalProperty(t, e, r, i) {
                var n;
                this.propType = "multidimensional";
                var s, a, o, h, l = e.k.length;
                for (n = 0; n < l - 1; n += 1)
                    e.k[n].to && e.k[n].s && e.k[n + 1] && e.k[n + 1].s && (s = e.k[n].s,
                    a = e.k[n + 1].s,
                    o = e.k[n].to,
                    h = e.k[n].ti,
                    (2 === s.length && (s[0] !== a[0] || s[1] !== a[1]) && bez.pointOnLine2D(s[0], s[1], a[0], a[1], s[0] + o[0], s[1] + o[1]) && bez.pointOnLine2D(s[0], s[1], a[0], a[1], a[0] + h[0], a[1] + h[1]) || 3 === s.length && (s[0] !== a[0] || s[1] !== a[1] || s[2] !== a[2]) && bez.pointOnLine3D(s[0], s[1], s[2], a[0], a[1], a[2], s[0] + o[0], s[1] + o[1], s[2] + o[2]) && bez.pointOnLine3D(s[0], s[1], s[2], a[0], a[1], a[2], a[0] + h[0], a[1] + h[1], a[2] + h[2])) && (e.k[n].to = null,
                    e.k[n].ti = null),
                    s[0] === a[0] && s[1] === a[1] && 0 === o[0] && 0 === o[1] && 0 === h[0] && 0 === h[1] && (2 === s.length || s[2] === a[2] && 0 === o[2] && 0 === h[2]) && (e.k[n].to = null,
                    e.k[n].ti = null));
                this.effectsSequence = [getValueAtCurrentTime.bind(this)],
                this.data = e,
                this.keyframes = e.k,
                this.keyframesMetadata = [],
                this.offsetTime = t.data.st,
                this.k = !0,
                this.kf = !0,
                this._isFirstFrame = !0,
                this.mult = r || 1,
                this.elem = t,
                this.container = i,
                this.comp = t.comp,
                this.getValue = processEffectsSequence,
                this.setVValue = setVValue,
                this.interpolateValue = interpolateValue,
                this.frameId = -1;
                var p = e.k[0].s.length;
                for (this.v = createTypedArray("float32", p),
                this.pv = createTypedArray("float32", p),
                n = 0; n < p; n += 1)
                    this.v[n] = initFrame,
                    this.pv[n] = initFrame;
                this._caching = {
                    lastFrame: initFrame,
                    lastIndex: 0,
                    value: createTypedArray("float32", p)
                },
                this.addEffect = addEffect
            }
            var PropertyFactory = {
                getProp: function(t, e, r, i, n) {
                    var s;
                    if (e.sid && (e = t.globalData.slotManager.getProp(e)),
                    e.k.length)
                        if ("number" == typeof e.k[0])
                            s = new MultiDimensionalProperty(t,e,i,n);
                        else
                            switch (r) {
                            case 0:
                                s = new KeyframedValueProperty(t,e,i,n);
                                break;
                            case 1:
                                s = new KeyframedMultidimensionalProperty(t,e,i,n)
                            }
                    else
                        s = new ValueProperty(t,e,i,n);
                    return s.effectsSequence.length && n.addDynamicProperty(s),
                    s
                }
            };
            function DynamicPropertyContainer() {}
            DynamicPropertyContainer.prototype = {
                addDynamicProperty: function(t) {
                    -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t),
                    this.container.addDynamicProperty(this),
                    this._isAnimated = !0)
                },
                iterateDynamicProperties: function() {
                    var t;
                    this._mdf = !1;
                    var e = this.dynamicProperties.length;
                    for (t = 0; t < e; t += 1)
                        this.dynamicProperties[t].getValue(),
                        this.dynamicProperties[t]._mdf && (this._mdf = !0)
                },
                initDynamicPropertyContainer: function(t) {
                    this.container = t,
                    this.dynamicProperties = [],
                    this._mdf = !1,
                    this._isAnimated = !1
                }
            };
            var pointPool = poolFactory(8, (function() {
                return createTypedArray("float32", 2)
            }
            ));
            function ShapePath() {
                this.c = !1,
                this._length = 0,
                this._maxLength = 8,
                this.v = createSizedArray(this._maxLength),
                this.o = createSizedArray(this._maxLength),
                this.i = createSizedArray(this._maxLength)
            }
            ShapePath.prototype.setPathData = function(t, e) {
                this.c = t,
                this.setLength(e);
                for (var r = 0; r < e; )
                    this.v[r] = pointPool.newElement(),
                    this.o[r] = pointPool.newElement(),
                    this.i[r] = pointPool.newElement(),
                    r += 1
            }
            ,
            ShapePath.prototype.setLength = function(t) {
                for (; this._maxLength < t; )
                    this.doubleArrayLength();
                this._length = t
            }
            ,
            ShapePath.prototype.doubleArrayLength = function() {
                this.v = this.v.concat(createSizedArray(this._maxLength)),
                this.i = this.i.concat(createSizedArray(this._maxLength)),
                this.o = this.o.concat(createSizedArray(this._maxLength)),
                this._maxLength *= 2
            }
            ,
            ShapePath.prototype.setXYAt = function(t, e, r, i, n) {
                var s;
                switch (this._length = Math.max(this._length, i + 1),
                this._length >= this._maxLength && this.doubleArrayLength(),
                r) {
                case "v":
                    s = this.v;
                    break;
                case "i":
                    s = this.i;
                    break;
                case "o":
                    s = this.o;
                    break;
                default:
                    s = []
                }
                (!s[i] || s[i] && !n) && (s[i] = pointPool.newElement()),
                s[i][0] = t,
                s[i][1] = e
            }
            ,
            ShapePath.prototype.setTripleAt = function(t, e, r, i, n, s, a, o) {
                this.setXYAt(t, e, "v", a, o),
                this.setXYAt(r, i, "o", a, o),
                this.setXYAt(n, s, "i", a, o)
            }
            ,
            ShapePath.prototype.reverse = function() {
                var t = new ShapePath;
                t.setPathData(this.c, this._length);
                var e = this.v
                  , r = this.o
                  , i = this.i
                  , n = 0;
                this.c && (t.setTripleAt(e[0][0], e[0][1], i[0][0], i[0][1], r[0][0], r[0][1], 0, !1),
                n = 1);
                var s, a = this._length - 1, o = this._length;
                for (s = n; s < o; s += 1)
                    t.setTripleAt(e[a][0], e[a][1], i[a][0], i[a][1], r[a][0], r[a][1], s, !1),
                    a -= 1;
                return t
            }
            ,
            ShapePath.prototype.length = function() {
                return this._length
            }
            ;
            var shapePool = (factory = poolFactory(4, (function() {
                return new ShapePath
            }
            ), (function(t) {
                var e, r = t._length;
                for (e = 0; e < r; e += 1)
                    pointPool.release(t.v[e]),
                    pointPool.release(t.i[e]),
                    pointPool.release(t.o[e]),
                    t.v[e] = null,
                    t.i[e] = null,
                    t.o[e] = null;
                t._length = 0,
                t.c = !1
            }
            )),
            factory.clone = function(t) {
                var e, r = factory.newElement(), i = void 0 === t._length ? t.v.length : t._length;
                for (r.setLength(i),
                r.c = t.c,
                e = 0; e < i; e += 1)
                    r.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
                return r
            }
            ,
            factory), factory;
            function ShapeCollection() {
                this._length = 0,
                this._maxLength = 4,
                this.shapes = createSizedArray(this._maxLength)
            }
            ShapeCollection.prototype.addShape = function(t) {
                this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)),
                this._maxLength *= 2),
                this.shapes[this._length] = t,
                this._length += 1
            }
            ,
            ShapeCollection.prototype.releaseShapes = function() {
                var t;
                for (t = 0; t < this._length; t += 1)
                    shapePool.release(this.shapes[t]);
                this._length = 0
            }
            ;
            var shapeCollectionPool = (ob = {
                newShapeCollection: function() {
                    return _length ? pool[_length -= 1] : new ShapeCollection
                },
                release: function(t) {
                    var e, r = t._length;
                    for (e = 0; e < r; e += 1)
                        shapePool.release(t.shapes[e]);
                    t._length = 0,
                    _length === _maxLength && (pool = pooling.double(pool),
                    _maxLength *= 2),
                    pool[_length] = t,
                    _length += 1
                }
            },
            _length = 0,
            _maxLength = 4,
            pool = createSizedArray(_maxLength),
            ob), ob, _length, _maxLength, pool, ShapePropertyFactory = function() {
                var t = -999999;
                function e(t, e, r) {
                    var i, n, s, a, o, h, l, p, c, f = r.lastIndex, u = this.keyframes;
                    if (t < u[0].t - this.offsetTime)
                        i = u[0].s[0],
                        s = !0,
                        f = 0;
                    else if (t >= u[u.length - 1].t - this.offsetTime)
                        i = u[u.length - 1].s ? u[u.length - 1].s[0] : u[u.length - 2].e[0],
                        s = !0;
                    else {
                        for (var d, m, g, y = f, v = u.length - 1, _ = !0; _ && (d = u[y],
                        !((m = u[y + 1]).t - this.offsetTime > t)); )
                            y < v - 1 ? y += 1 : _ = !1;
                        if (g = this.keyframesMetadata[y] || {},
                        f = y,
                        !(s = 1 === d.h)) {
                            if (t >= m.t - this.offsetTime)
                                p = 1;
                            else if (t < d.t - this.offsetTime)
                                p = 0;
                            else {
                                var b;
                                g.__fnct ? b = g.__fnct : (b = BezierFactory.getBezierEasing(d.o.x, d.o.y, d.i.x, d.i.y).get,
                                g.__fnct = b),
                                p = b((t - (d.t - this.offsetTime)) / (m.t - this.offsetTime - (d.t - this.offsetTime)))
                            }
                            n = m.s ? m.s[0] : d.e[0]
                        }
                        i = d.s[0]
                    }
                    for (h = e._length,
                    l = i.i[0].length,
                    r.lastIndex = f,
                    a = 0; a < h; a += 1)
                        for (o = 0; o < l; o += 1)
                            c = s ? i.i[a][o] : i.i[a][o] + (n.i[a][o] - i.i[a][o]) * p,
                            e.i[a][o] = c,
                            c = s ? i.o[a][o] : i.o[a][o] + (n.o[a][o] - i.o[a][o]) * p,
                            e.o[a][o] = c,
                            c = s ? i.v[a][o] : i.v[a][o] + (n.v[a][o] - i.v[a][o]) * p,
                            e.v[a][o] = c
                }
                function r() {
                    var e = this.comp.renderedFrame - this.offsetTime
                      , r = this.keyframes[0].t - this.offsetTime
                      , i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime
                      , n = this._caching.lastFrame;
                    return n !== t && (n < r && e < r || n > i && e > i) || (this._caching.lastIndex = n < e ? this._caching.lastIndex : 0,
                    this.interpolateShape(e, this.pv, this._caching)),
                    this._caching.lastFrame = e,
                    this.pv
                }
                function i() {
                    this.paths = this.localShapeCollection
                }
                function n(t) {
                    (function(t, e) {
                        if (t._length !== e._length || t.c !== e.c)
                            return !1;
                        var r, i = t._length;
                        for (r = 0; r < i; r += 1)
                            if (t.v[r][0] !== e.v[r][0] || t.v[r][1] !== e.v[r][1] || t.o[r][0] !== e.o[r][0] || t.o[r][1] !== e.o[r][1] || t.i[r][0] !== e.i[r][0] || t.i[r][1] !== e.i[r][1])
                                return !1;
                        return !0
                    }
                    )(this.v, t) || (this.v = shapePool.clone(t),
                    this.localShapeCollection.releaseShapes(),
                    this.localShapeCollection.addShape(this.v),
                    this._mdf = !0,
                    this.paths = this.localShapeCollection)
                }
                function s() {
                    if (this.elem.globalData.frameId !== this.frameId)
                        if (this.effectsSequence.length)
                            if (this.lock)
                                this.setVValue(this.pv);
                            else {
                                var t, e;
                                this.lock = !0,
                                this._mdf = !1,
                                t = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k;
                                var r = this.effectsSequence.length;
                                for (e = 0; e < r; e += 1)
                                    t = this.effectsSequence[e](t);
                                this.setVValue(t),
                                this.lock = !1,
                                this.frameId = this.elem.globalData.frameId
                            }
                        else
                            this._mdf = !1
                }
                function a(t, e, r) {
                    this.propType = "shape",
                    this.comp = t.comp,
                    this.container = t,
                    this.elem = t,
                    this.data = e,
                    this.k = !1,
                    this.kf = !1,
                    this._mdf = !1;
                    var n = 3 === r ? e.pt.k : e.ks.k;
                    this.v = shapePool.clone(n),
                    this.pv = shapePool.clone(this.v),
                    this.localShapeCollection = shapeCollectionPool.newShapeCollection(),
                    this.paths = this.localShapeCollection,
                    this.paths.addShape(this.v),
                    this.reset = i,
                    this.effectsSequence = []
                }
                function o(t) {
                    this.effectsSequence.push(t),
                    this.container.addDynamicProperty(this)
                }
                function h(e, n, s) {
                    this.propType = "shape",
                    this.comp = e.comp,
                    this.elem = e,
                    this.container = e,
                    this.offsetTime = e.data.st,
                    this.keyframes = 3 === s ? n.pt.k : n.ks.k,
                    this.keyframesMetadata = [],
                    this.k = !0,
                    this.kf = !0;
                    var a = this.keyframes[0].s[0].i.length;
                    this.v = shapePool.newElement(),
                    this.v.setPathData(this.keyframes[0].s[0].c, a),
                    this.pv = shapePool.clone(this.v),
                    this.localShapeCollection = shapeCollectionPool.newShapeCollection(),
                    this.paths = this.localShapeCollection,
                    this.paths.addShape(this.v),
                    this.lastFrame = t,
                    this.reset = i,
                    this._caching = {
                        lastFrame: t,
                        lastIndex: 0
                    },
                    this.effectsSequence = [r.bind(this)]
                }
                a.prototype.interpolateShape = e,
                a.prototype.getValue = s,
                a.prototype.setVValue = n,
                a.prototype.addEffect = o,
                h.prototype.getValue = s,
                h.prototype.interpolateShape = e,
                h.prototype.setVValue = n,
                h.prototype.addEffect = o;
                var l = function() {
                    var t = roundCorner;
                    function e(t, e) {
                        this.v = shapePool.newElement(),
                        this.v.setPathData(!0, 4),
                        this.localShapeCollection = shapeCollectionPool.newShapeCollection(),
                        this.paths = this.localShapeCollection,
                        this.localShapeCollection.addShape(this.v),
                        this.d = e.d,
                        this.elem = t,
                        this.comp = t.comp,
                        this.frameId = -1,
                        this.initDynamicPropertyContainer(t),
                        this.p = PropertyFactory.getProp(t, e.p, 1, 0, this),
                        this.s = PropertyFactory.getProp(t, e.s, 1, 0, this),
                        this.dynamicProperties.length ? this.k = !0 : (this.k = !1,
                        this.convertEllToPath())
                    }
                    return e.prototype = {
                        reset: i,
                        getValue: function() {
                            this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId,
                            this.iterateDynamicProperties(),
                            this._mdf && this.convertEllToPath())
                        },
                        convertEllToPath: function() {
                            var e = this.p.v[0]
                              , r = this.p.v[1]
                              , i = this.s.v[0] / 2
                              , n = this.s.v[1] / 2
                              , s = 3 !== this.d
                              , a = this.v;
                            a.v[0][0] = e,
                            a.v[0][1] = r - n,
                            a.v[1][0] = s ? e + i : e - i,
                            a.v[1][1] = r,
                            a.v[2][0] = e,
                            a.v[2][1] = r + n,
                            a.v[3][0] = s ? e - i : e + i,
                            a.v[3][1] = r,
                            a.i[0][0] = s ? e - i * t : e + i * t,
                            a.i[0][1] = r - n,
                            a.i[1][0] = s ? e + i : e - i,
                            a.i[1][1] = r - n * t,
                            a.i[2][0] = s ? e + i * t : e - i * t,
                            a.i[2][1] = r + n,
                            a.i[3][0] = s ? e - i : e + i,
                            a.i[3][1] = r + n * t,
                            a.o[0][0] = s ? e + i * t : e - i * t,
                            a.o[0][1] = r - n,
                            a.o[1][0] = s ? e + i : e - i,
                            a.o[1][1] = r + n * t,
                            a.o[2][0] = s ? e - i * t : e + i * t,
                            a.o[2][1] = r + n,
                            a.o[3][0] = s ? e - i : e + i,
                            a.o[3][1] = r - n * t
                        }
                    },
                    extendPrototype([DynamicPropertyContainer], e),
                    e
                }()
                  , p = function() {
                    function t(t, e) {
                        this.v = shapePool.newElement(),
                        this.v.setPathData(!0, 0),
                        this.elem = t,
                        this.comp = t.comp,
                        this.data = e,
                        this.frameId = -1,
                        this.d = e.d,
                        this.initDynamicPropertyContainer(t),
                        1 === e.sy ? (this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this),
                        this.is = PropertyFactory.getProp(t, e.is, 0, .01, this),
                        this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath,
                        this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this),
                        this.p = PropertyFactory.getProp(t, e.p, 1, 0, this),
                        this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this),
                        this.or = PropertyFactory.getProp(t, e.or, 0, 0, this),
                        this.os = PropertyFactory.getProp(t, e.os, 0, .01, this),
                        this.localShapeCollection = shapeCollectionPool.newShapeCollection(),
                        this.localShapeCollection.addShape(this.v),
                        this.paths = this.localShapeCollection,
                        this.dynamicProperties.length ? this.k = !0 : (this.k = !1,
                        this.convertToPath())
                    }
                    return t.prototype = {
                        reset: i,
                        getValue: function() {
                            this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId,
                            this.iterateDynamicProperties(),
                            this._mdf && this.convertToPath())
                        },
                        convertStarToPath: function() {
                            var t, e, r, i, n = 2 * Math.floor(this.pt.v), s = 2 * Math.PI / n, a = !0, o = this.or.v, h = this.ir.v, l = this.os.v, p = this.is.v, c = 2 * Math.PI * o / (2 * n), f = 2 * Math.PI * h / (2 * n), u = -Math.PI / 2;
                            u += this.r.v;
                            var d = 3 === this.data.d ? -1 : 1;
                            for (this.v._length = 0,
                            t = 0; t < n; t += 1) {
                                r = a ? l : p,
                                i = a ? c : f;
                                var m = (e = a ? o : h) * Math.cos(u)
                                  , g = e * Math.sin(u)
                                  , y = 0 === m && 0 === g ? 0 : g / Math.sqrt(m * m + g * g)
                                  , v = 0 === m && 0 === g ? 0 : -m / Math.sqrt(m * m + g * g);
                                m += +this.p.v[0],
                                g += +this.p.v[1],
                                this.v.setTripleAt(m, g, m - y * i * r * d, g - v * i * r * d, m + y * i * r * d, g + v * i * r * d, t, !0),
                                a = !a,
                                u += s * d
                            }
                        },
                        convertPolygonToPath: function() {
                            var t, e = Math.floor(this.pt.v), r = 2 * Math.PI / e, i = this.or.v, n = this.os.v, s = 2 * Math.PI * i / (4 * e), a = .5 * -Math.PI, o = 3 === this.data.d ? -1 : 1;
                            for (a += this.r.v,
                            this.v._length = 0,
                            t = 0; t < e; t += 1) {
                                var h = i * Math.cos(a)
                                  , l = i * Math.sin(a)
                                  , p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l)
                                  , c = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
                                h += +this.p.v[0],
                                l += +this.p.v[1],
                                this.v.setTripleAt(h, l, h - p * s * n * o, l - c * s * n * o, h + p * s * n * o, l + c * s * n * o, t, !0),
                                a += r * o
                            }
                            this.paths.length = 0,
                            this.paths[0] = this.v
                        }
                    },
                    extendPrototype([DynamicPropertyContainer], t),
                    t
                }()
                  , c = function() {
                    function t(t, e) {
                        this.v = shapePool.newElement(),
                        this.v.c = !0,
                        this.localShapeCollection = shapeCollectionPool.newShapeCollection(),
                        this.localShapeCollection.addShape(this.v),
                        this.paths = this.localShapeCollection,
                        this.elem = t,
                        this.comp = t.comp,
                        this.frameId = -1,
                        this.d = e.d,
                        this.initDynamicPropertyContainer(t),
                        this.p = PropertyFactory.getProp(t, e.p, 1, 0, this),
                        this.s = PropertyFactory.getProp(t, e.s, 1, 0, this),
                        this.r = PropertyFactory.getProp(t, e.r, 0, 0, this),
                        this.dynamicProperties.length ? this.k = !0 : (this.k = !1,
                        this.convertRectToPath())
                    }
                    return t.prototype = {
                        convertRectToPath: function() {
                            var t = this.p.v[0]
                              , e = this.p.v[1]
                              , r = this.s.v[0] / 2
                              , i = this.s.v[1] / 2
                              , n = bmMin(r, i, this.r.v)
                              , s = n * (1 - roundCorner);
                            this.v._length = 0,
                            2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + r, e - i + n, t + r, e - i + n, t + r, e - i + s, 0, !0),
                            this.v.setTripleAt(t + r, e + i - n, t + r, e + i - s, t + r, e + i - n, 1, !0),
                            0 !== n ? (this.v.setTripleAt(t + r - n, e + i, t + r - n, e + i, t + r - s, e + i, 2, !0),
                            this.v.setTripleAt(t - r + n, e + i, t - r + s, e + i, t - r + n, e + i, 3, !0),
                            this.v.setTripleAt(t - r, e + i - n, t - r, e + i - n, t - r, e + i - s, 4, !0),
                            this.v.setTripleAt(t - r, e - i + n, t - r, e - i + s, t - r, e - i + n, 5, !0),
                            this.v.setTripleAt(t - r + n, e - i, t - r + n, e - i, t - r + s, e - i, 6, !0),
                            this.v.setTripleAt(t + r - n, e - i, t + r - s, e - i, t + r - n, e - i, 7, !0)) : (this.v.setTripleAt(t - r, e + i, t - r + s, e + i, t - r, e + i, 2),
                            this.v.setTripleAt(t - r, e - i, t - r, e - i + s, t - r, e - i, 3))) : (this.v.setTripleAt(t + r, e - i + n, t + r, e - i + s, t + r, e - i + n, 0, !0),
                            0 !== n ? (this.v.setTripleAt(t + r - n, e - i, t + r - n, e - i, t + r - s, e - i, 1, !0),
                            this.v.setTripleAt(t - r + n, e - i, t - r + s, e - i, t - r + n, e - i, 2, !0),
                            this.v.setTripleAt(t - r, e - i + n, t - r, e - i + n, t - r, e - i + s, 3, !0),
                            this.v.setTripleAt(t - r, e + i - n, t - r, e + i - s, t - r, e + i - n, 4, !0),
                            this.v.setTripleAt(t - r + n, e + i, t - r + n, e + i, t - r + s, e + i, 5, !0),
                            this.v.setTripleAt(t + r - n, e + i, t + r - s, e + i, t + r - n, e + i, 6, !0),
                            this.v.setTripleAt(t + r, e + i - n, t + r, e + i - n, t + r, e + i - s, 7, !0)) : (this.v.setTripleAt(t - r, e - i, t - r + s, e - i, t - r, e - i, 1, !0),
                            this.v.setTripleAt(t - r, e + i, t - r, e + i - s, t - r, e + i, 2, !0),
                            this.v.setTripleAt(t + r, e + i, t + r - s, e + i, t + r, e + i, 3, !0)))
                        },
                        getValue: function() {
                            this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId,
                            this.iterateDynamicProperties(),
                            this._mdf && this.convertRectToPath())
                        },
                        reset: i
                    },
                    extendPrototype([DynamicPropertyContainer], t),
                    t
                }();
                return {
                    getShapeProp: function(t, e, r) {
                        var i;
                        return 3 === r || 4 === r ? i = (3 === r ? e.pt : e.ks).k.length ? new h(t,e,r) : new a(t,e,r) : 5 === r ? i = new c(t,e) : 6 === r ? i = new l(t,e) : 7 === r && (i = new p(t,e)),
                        i.k && t.addDynamicProperty(i),
                        i
                    },
                    getConstructorFunction: function() {
                        return a
                    },
                    getKeyframedConstructorFunction: function() {
                        return h
                    }
                }
            }(), Matrix = function() {
                var t = Math.cos
                  , e = Math.sin
                  , r = Math.tan
                  , i = Math.round;
                function n() {
                    return this.props[0] = 1,
                    this.props[1] = 0,
                    this.props[2] = 0,
                    this.props[3] = 0,
                    this.props[4] = 0,
                    this.props[5] = 1,
                    this.props[6] = 0,
                    this.props[7] = 0,
                    this.props[8] = 0,
                    this.props[9] = 0,
                    this.props[10] = 1,
                    this.props[11] = 0,
                    this.props[12] = 0,
                    this.props[13] = 0,
                    this.props[14] = 0,
                    this.props[15] = 1,
                    this
                }
                function s(r) {
                    if (0 === r)
                        return this;
                    var i = t(r)
                      , n = e(r);
                    return this._t(i, -n, 0, 0, n, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                }
                function a(r) {
                    if (0 === r)
                        return this;
                    var i = t(r)
                      , n = e(r);
                    return this._t(1, 0, 0, 0, 0, i, -n, 0, 0, n, i, 0, 0, 0, 0, 1)
                }
                function o(r) {
                    if (0 === r)
                        return this;
                    var i = t(r)
                      , n = e(r);
                    return this._t(i, 0, n, 0, 0, 1, 0, 0, -n, 0, i, 0, 0, 0, 0, 1)
                }
                function h(r) {
                    if (0 === r)
                        return this;
                    var i = t(r)
                      , n = e(r);
                    return this._t(i, -n, 0, 0, n, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                }
                function l(t, e) {
                    return this._t(1, e, t, 1, 0, 0)
                }
                function p(t, e) {
                    return this.shear(r(t), r(e))
                }
                function c(i, n) {
                    var s = t(n)
                      , a = e(n);
                    return this._t(s, a, 0, 0, -a, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, r(i), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(s, -a, 0, 0, a, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                }
                function f(t, e, r) {
                    return r || 0 === r || (r = 1),
                    1 === t && 1 === e && 1 === r ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1)
                }
                function u(t, e, r, i, n, s, a, o, h, l, p, c, f, u, d, m) {
                    return this.props[0] = t,
                    this.props[1] = e,
                    this.props[2] = r,
                    this.props[3] = i,
                    this.props[4] = n,
                    this.props[5] = s,
                    this.props[6] = a,
                    this.props[7] = o,
                    this.props[8] = h,
                    this.props[9] = l,
                    this.props[10] = p,
                    this.props[11] = c,
                    this.props[12] = f,
                    this.props[13] = u,
                    this.props[14] = d,
                    this.props[15] = m,
                    this
                }
                function d(t, e, r) {
                    return r = r || 0,
                    0 !== t || 0 !== e || 0 !== r ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, r, 1) : this
                }
                function m(t, e, r, i, n, s, a, o, h, l, p, c, f, u, d, m) {
                    var g = this.props;
                    if (1 === t && 0 === e && 0 === r && 0 === i && 0 === n && 1 === s && 0 === a && 0 === o && 0 === h && 0 === l && 1 === p && 0 === c)
                        return g[12] = g[12] * t + g[15] * f,
                        g[13] = g[13] * s + g[15] * u,
                        g[14] = g[14] * p + g[15] * d,
                        g[15] *= m,
                        this._identityCalculated = !1,
                        this;
                    var y = g[0]
                      , v = g[1]
                      , _ = g[2]
                      , b = g[3]
                      , x = g[4]
                      , E = g[5]
                      , S = g[6]
                      , P = g[7]
                      , C = g[8]
                      , T = g[9]
                      , w = g[10]
                      , M = g[11]
                      , A = g[12]
                      , k = g[13]
                      , D = g[14]
                      , F = g[15];
                    return g[0] = y * t + v * n + _ * h + b * f,
                    g[1] = y * e + v * s + _ * l + b * u,
                    g[2] = y * r + v * a + _ * p + b * d,
                    g[3] = y * i + v * o + _ * c + b * m,
                    g[4] = x * t + E * n + S * h + P * f,
                    g[5] = x * e + E * s + S * l + P * u,
                    g[6] = x * r + E * a + S * p + P * d,
                    g[7] = x * i + E * o + S * c + P * m,
                    g[8] = C * t + T * n + w * h + M * f,
                    g[9] = C * e + T * s + w * l + M * u,
                    g[10] = C * r + T * a + w * p + M * d,
                    g[11] = C * i + T * o + w * c + M * m,
                    g[12] = A * t + k * n + D * h + F * f,
                    g[13] = A * e + k * s + D * l + F * u,
                    g[14] = A * r + k * a + D * p + F * d,
                    g[15] = A * i + k * o + D * c + F * m,
                    this._identityCalculated = !1,
                    this
                }
                function g(t) {
                    var e = t.props;
                    return this.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15])
                }
                function y() {
                    return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]),
                    this._identityCalculated = !0),
                    this._identity
                }
                function v(t) {
                    for (var e = 0; e < 16; ) {
                        if (t.props[e] !== this.props[e])
                            return !1;
                        e += 1
                    }
                    return !0
                }
                function _(t) {
                    var e;
                    for (e = 0; e < 16; e += 1)
                        t.props[e] = this.props[e];
                    return t
                }
                function b(t) {
                    var e;
                    for (e = 0; e < 16; e += 1)
                        this.props[e] = t[e]
                }
                function x(t, e, r) {
                    return {
                        x: t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12],
                        y: t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13],
                        z: t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
                    }
                }
                function E(t, e, r) {
                    return t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12]
                }
                function S(t, e, r) {
                    return t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13]
                }
                function P(t, e, r) {
                    return t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
                }
                function C() {
                    var t = this.props[0] * this.props[5] - this.props[1] * this.props[4]
                      , e = this.props[5] / t
                      , r = -this.props[1] / t
                      , i = -this.props[4] / t
                      , n = this.props[0] / t
                      , s = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / t
                      , a = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / t
                      , o = new Matrix;
                    return o.props[0] = e,
                    o.props[1] = r,
                    o.props[4] = i,
                    o.props[5] = n,
                    o.props[12] = s,
                    o.props[13] = a,
                    o
                }
                function T(t) {
                    return this.getInverseMatrix().applyToPointArray(t[0], t[1], t[2] || 0)
                }
                function w(t) {
                    var e, r = t.length, i = [];
                    for (e = 0; e < r; e += 1)
                        i[e] = T(t[e]);
                    return i
                }
                function M(t, e, r) {
                    var i = createTypedArray("float32", 6);
                    if (this.isIdentity())
                        i[0] = t[0],
                        i[1] = t[1],
                        i[2] = e[0],
                        i[3] = e[1],
                        i[4] = r[0],
                        i[5] = r[1];
                    else {
                        var n = this.props[0]
                          , s = this.props[1]
                          , a = this.props[4]
                          , o = this.props[5]
                          , h = this.props[12]
                          , l = this.props[13];
                        i[0] = t[0] * n + t[1] * a + h,
                        i[1] = t[0] * s + t[1] * o + l,
                        i[2] = e[0] * n + e[1] * a + h,
                        i[3] = e[0] * s + e[1] * o + l,
                        i[4] = r[0] * n + r[1] * a + h,
                        i[5] = r[0] * s + r[1] * o + l
                    }
                    return i
                }
                function A(t, e, r) {
                    return this.isIdentity() ? [t, e, r] : [t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]]
                }
                function k(t, e) {
                    if (this.isIdentity())
                        return t + "," + e;
                    var r = this.props;
                    return Math.round(100 * (t * r[0] + e * r[4] + r[12])) / 100 + "," + Math.round(100 * (t * r[1] + e * r[5] + r[13])) / 100
                }
                function D() {
                    for (var t = 0, e = this.props, r = "matrix3d("; t < 16; )
                        r += i(1e4 * e[t]) / 1e4,
                        r += 15 === t ? ")" : ",",
                        t += 1;
                    return r
                }
                function F(t) {
                    return t < 1e-6 && t > 0 || t > -1e-6 && t < 0 ? i(1e4 * t) / 1e4 : t
                }
                function I() {
                    var t = this.props;
                    return "matrix(" + F(t[0]) + "," + F(t[1]) + "," + F(t[4]) + "," + F(t[5]) + "," + F(t[12]) + "," + F(t[13]) + ")"
                }
                return function() {
                    this.reset = n,
                    this.rotate = s,
                    this.rotateX = a,
                    this.rotateY = o,
                    this.rotateZ = h,
                    this.skew = p,
                    this.skewFromAxis = c,
                    this.shear = l,
                    this.scale = f,
                    this.setTransform = u,
                    this.translate = d,
                    this.transform = m,
                    this.multiply = g,
                    this.applyToPoint = x,
                    this.applyToX = E,
                    this.applyToY = S,
                    this.applyToZ = P,
                    this.applyToPointArray = A,
                    this.applyToTriplePoints = M,
                    this.applyToPointStringified = k,
                    this.toCSS = D,
                    this.to2dCSS = I,
                    this.clone = _,
                    this.cloneFromProps = b,
                    this.equals = v,
                    this.inversePoints = w,
                    this.inversePoint = T,
                    this.getInverseMatrix = C,
                    this._t = this.transform,
                    this.isIdentity = y,
                    this._identity = !0,
                    this._identityCalculated = !1,
                    this.props = createTypedArray("float32", 16),
                    this.reset()
                }
            }();
            function _typeof$3(t) {
                return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                }
                : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }
                ,
                _typeof$3(t)
            }
            var lottie = {}
              , standalone = "__[STANDALONE]__"
              , animationData = "__[ANIMATIONDATA]__"
              , renderer = "";
            function setLocation(t) {
                setLocationHref(t)
            }
            function searchAnimations() {
                !0 === standalone ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations()
            }
            function setSubframeRendering(t) {
                setSubframeEnabled(t)
            }
            function setPrefix(t) {
                setIdPrefix(t)
            }
            function loadAnimation(t) {
                return !0 === standalone && (t.animationData = JSON.parse(animationData)),
                animationManager.loadAnimation(t)
            }
            function setQuality(t) {
                if ("string" == typeof t)
                    switch (t) {
                    case "high":
                        setDefaultCurveSegments(200);
                        break;
                    default:
                    case "medium":
                        setDefaultCurveSegments(50);
                        break;
                    case "low":
                        setDefaultCurveSegments(10)
                    }
                else
                    !isNaN(t) && t > 1 && setDefaultCurveSegments(t);
                getDefaultCurveSegments() >= 50 ? roundValues(!1) : roundValues(!0)
            }
            function inBrowser() {
                return "undefined" != typeof navigator
            }
            function installPlugin(t, e) {
                "expressions" === t && setExpressionsPlugin(e)
            }
            function getFactory(t) {
                switch (t) {
                case "propertyFactory":
                    return PropertyFactory;
                case "shapePropertyFactory":
                    return ShapePropertyFactory;
                case "matrix":
                    return Matrix;
                default:
                    return null
                }
            }
            function checkReady() {
                "complete" === document.readyState && (clearInterval(readyStateCheckInterval),
                searchAnimations())
            }
            function getQueryVariable(t) {
                for (var e = queryString.split("&"), r = 0; r < e.length; r += 1) {
                    var i = e[r].split("=");
                    if (decodeURIComponent(i[0]) == t)
                        return decodeURIComponent(i[1])
                }
                return null
            }
            lottie.play = animationManager.play,
            lottie.pause = animationManager.pause,
            lottie.setLocationHref = setLocation,
            lottie.togglePause = animationManager.togglePause,
            lottie.setSpeed = animationManager.setSpeed,
            lottie.setDirection = animationManager.setDirection,
            lottie.stop = animationManager.stop,
            lottie.searchAnimations = searchAnimations,
            lottie.registerAnimation = animationManager.registerAnimation,
            lottie.loadAnimation = loadAnimation,
            lottie.setSubframeRendering = setSubframeRendering,
            lottie.resize = animationManager.resize,
            lottie.goToAndStop = animationManager.goToAndStop,
            lottie.destroy = animationManager.destroy,
            lottie.setQuality = setQuality,
            lottie.inBrowser = inBrowser,
            lottie.installPlugin = installPlugin,
            lottie.freeze = animationManager.freeze,
            lottie.unfreeze = animationManager.unfreeze,
            lottie.setVolume = animationManager.setVolume,
            lottie.mute = animationManager.mute,
            lottie.unmute = animationManager.unmute,
            lottie.getRegisteredAnimations = animationManager.getRegisteredAnimations,
            lottie.useWebWorker = setWebWorker,
            lottie.setIDPrefix = setPrefix,
            lottie.__getFactory = getFactory,
            lottie.version = "5.12.2";
            var queryString = "";
            if (standalone) {
                var scripts = document.getElementsByTagName("script")
                  , index = scripts.length - 1
                  , myScript = scripts[index] || {
                    src: ""
                };
                queryString = myScript.src ? myScript.src.replace(/^[^\?]+\??/, "") : "",
                renderer = getQueryVariable("renderer")
            }
            var readyStateCheckInterval = setInterval(checkReady, 100);
            try {
                "object" !== _typeof$3(exports) && __webpack_require__.amdO
            } catch (t) {}
            var ShapeModifiers = function() {
                var t = {}
                  , e = {};
                return t.registerModifier = function(t, r) {
                    e[t] || (e[t] = r)
                }
                ,
                t.getModifier = function(t, r, i) {
                    return new e[t](r,i)
                }
                ,
                t
            }();
            function ShapeModifier() {}
            function TrimModifier() {}
            function PuckerAndBloatModifier() {}
            ShapeModifier.prototype.initModifierProperties = function() {}
            ,
            ShapeModifier.prototype.addShapeToModifier = function() {}
            ,
            ShapeModifier.prototype.addShape = function(t) {
                if (!this.closed) {
                    t.sh.container.addDynamicProperty(t.sh);
                    var e = {
                        shape: t.sh,
                        data: t,
                        localShapeCollection: shapeCollectionPool.newShapeCollection()
                    };
                    this.shapes.push(e),
                    this.addShapeToModifier(e),
                    this._isAnimated && t.setAsAnimated()
                }
            }
            ,
            ShapeModifier.prototype.init = function(t, e) {
                this.shapes = [],
                this.elem = t,
                this.initDynamicPropertyContainer(t),
                this.initModifierProperties(t, e),
                this.frameId = initialDefaultFrame,
                this.closed = !1,
                this.k = !1,
                this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
            }
            ,
            ShapeModifier.prototype.processKeys = function() {
                this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId,
                this.iterateDynamicProperties())
            }
            ,
            extendPrototype([DynamicPropertyContainer], ShapeModifier),
            extendPrototype([ShapeModifier], TrimModifier),
            TrimModifier.prototype.initModifierProperties = function(t, e) {
                this.s = PropertyFactory.getProp(t, e.s, 0, .01, this),
                this.e = PropertyFactory.getProp(t, e.e, 0, .01, this),
                this.o = PropertyFactory.getProp(t, e.o, 0, 0, this),
                this.sValue = 0,
                this.eValue = 0,
                this.getValue = this.processKeys,
                this.m = e.m,
                this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length
            }
            ,
            TrimModifier.prototype.addShapeToModifier = function(t) {
                t.pathsData = []
            }
            ,
            TrimModifier.prototype.calculateShapeEdges = function(t, e, r, i, n) {
                var s = [];
                e <= 1 ? s.push({
                    s: t,
                    e
                }) : t >= 1 ? s.push({
                    s: t - 1,
                    e: e - 1
                }) : (s.push({
                    s: t,
                    e: 1
                }),
                s.push({
                    s: 0,
                    e: e - 1
                }));
                var a, o, h = [], l = s.length;
                for (a = 0; a < l; a += 1) {
                    var p, c;
                    (o = s[a]).e * n < i || o.s * n > i + r || (p = o.s * n <= i ? 0 : (o.s * n - i) / r,
                    c = o.e * n >= i + r ? 1 : (o.e * n - i) / r,
                    h.push([p, c]))
                }
                return h.length || h.push([0, 0]),
                h
            }
            ,
            TrimModifier.prototype.releasePathsData = function(t) {
                var e, r = t.length;
                for (e = 0; e < r; e += 1)
                    segmentsLengthPool.release(t[e]);
                return t.length = 0,
                t
            }
            ,
            TrimModifier.prototype.processShapes = function(t) {
                var e, r, i, n;
                if (this._mdf || t) {
                    var s = this.o.v % 360 / 360;
                    if (s < 0 && (s += 1),
                    (e = this.s.v > 1 ? 1 + s : this.s.v < 0 ? 0 + s : this.s.v + s) > (r = this.e.v > 1 ? 1 + s : this.e.v < 0 ? 0 + s : this.e.v + s)) {
                        var a = e;
                        e = r,
                        r = a
                    }
                    e = 1e-4 * Math.round(1e4 * e),
                    r = 1e-4 * Math.round(1e4 * r),
                    this.sValue = e,
                    this.eValue = r
                } else
                    e = this.sValue,
                    r = this.eValue;
                var o, h, l, p, c, f = this.shapes.length, u = 0;
                if (r === e)
                    for (n = 0; n < f; n += 1)
                        this.shapes[n].localShapeCollection.releaseShapes(),
                        this.shapes[n].shape._mdf = !0,
                        this.shapes[n].shape.paths = this.shapes[n].localShapeCollection,
                        this._mdf && (this.shapes[n].pathsData.length = 0);
                else if (1 === r && 0 === e || 0 === r && 1 === e) {
                    if (this._mdf)
                        for (n = 0; n < f; n += 1)
                            this.shapes[n].pathsData.length = 0,
                            this.shapes[n].shape._mdf = !0
                } else {
                    var d, m, g = [];
                    for (n = 0; n < f; n += 1)
                        if ((d = this.shapes[n]).shape._mdf || this._mdf || t || 2 === this.m) {
                            if (h = (i = d.shape.paths)._length,
                            c = 0,
                            !d.shape._mdf && d.pathsData.length)
                                c = d.totalShapeLength;
                            else {
                                for (l = this.releasePathsData(d.pathsData),
                                o = 0; o < h; o += 1)
                                    p = bez.getSegmentsLength(i.shapes[o]),
                                    l.push(p),
                                    c += p.totalLength;
                                d.totalShapeLength = c,
                                d.pathsData = l
                            }
                            u += c,
                            d.shape._mdf = !0
                        } else
                            d.shape.paths = d.localShapeCollection;
                    var y, v = e, _ = r, b = 0;
                    for (n = f - 1; n >= 0; n -= 1)
                        if ((d = this.shapes[n]).shape._mdf) {
                            for ((m = d.localShapeCollection).releaseShapes(),
                            2 === this.m && f > 1 ? (y = this.calculateShapeEdges(e, r, d.totalShapeLength, b, u),
                            b += d.totalShapeLength) : y = [[v, _]],
                            h = y.length,
                            o = 0; o < h; o += 1) {
                                v = y[o][0],
                                _ = y[o][1],
                                g.length = 0,
                                _ <= 1 ? g.push({
                                    s: d.totalShapeLength * v,
                                    e: d.totalShapeLength * _
                                }) : v >= 1 ? g.push({
                                    s: d.totalShapeLength * (v - 1),
                                    e: d.totalShapeLength * (_ - 1)
                                }) : (g.push({
                                    s: d.totalShapeLength * v,
                                    e: d.totalShapeLength
                                }),
                                g.push({
                                    s: 0,
                                    e: d.totalShapeLength * (_ - 1)
                                }));
                                var x = this.addShapes(d, g[0]);
                                if (g[0].s !== g[0].e) {
                                    if (g.length > 1)
                                        if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
                                            var E = x.pop();
                                            this.addPaths(x, m),
                                            x = this.addShapes(d, g[1], E)
                                        } else
                                            this.addPaths(x, m),
                                            x = this.addShapes(d, g[1]);
                                    this.addPaths(x, m)
                                }
                            }
                            d.shape.paths = m
                        }
                }
            }
            ,
            TrimModifier.prototype.addPaths = function(t, e) {
                var r, i = t.length;
                for (r = 0; r < i; r += 1)
                    e.addShape(t[r])
            }
            ,
            TrimModifier.prototype.addSegment = function(t, e, r, i, n, s, a) {
                n.setXYAt(e[0], e[1], "o", s),
                n.setXYAt(r[0], r[1], "i", s + 1),
                a && n.setXYAt(t[0], t[1], "v", s),
                n.setXYAt(i[0], i[1], "v", s + 1)
            }
            ,
            TrimModifier.prototype.addSegmentFromArray = function(t, e, r, i) {
                e.setXYAt(t[1], t[5], "o", r),
                e.setXYAt(t[2], t[6], "i", r + 1),
                i && e.setXYAt(t[0], t[4], "v", r),
                e.setXYAt(t[3], t[7], "v", r + 1)
            }
            ,
            TrimModifier.prototype.addShapes = function(t, e, r) {
                var i, n, s, a, o, h, l, p, c = t.pathsData, f = t.shape.paths.shapes, u = t.shape.paths._length, d = 0, m = [], g = !0;
                for (r ? (o = r._length,
                p = r._length) : (r = shapePool.newElement(),
                o = 0,
                p = 0),
                m.push(r),
                i = 0; i < u; i += 1) {
                    for (h = c[i].lengths,
                    r.c = f[i].c,
                    s = f[i].c ? h.length : h.length + 1,
                    n = 1; n < s; n += 1)
                        if (d + (a = h[n - 1]).addedLength < e.s)
                            d += a.addedLength,
                            r.c = !1;
                        else {
                            if (d > e.e) {
                                r.c = !1;
                                break
                            }
                            e.s <= d && e.e >= d + a.addedLength ? (this.addSegment(f[i].v[n - 1], f[i].o[n - 1], f[i].i[n], f[i].v[n], r, o, g),
                            g = !1) : (l = bez.getNewSegment(f[i].v[n - 1], f[i].v[n], f[i].o[n - 1], f[i].i[n], (e.s - d) / a.addedLength, (e.e - d) / a.addedLength, h[n - 1]),
                            this.addSegmentFromArray(l, r, o, g),
                            g = !1,
                            r.c = !1),
                            d += a.addedLength,
                            o += 1
                        }
                    if (f[i].c && h.length) {
                        if (a = h[n - 1],
                        d <= e.e) {
                            var y = h[n - 1].addedLength;
                            e.s <= d && e.e >= d + y ? (this.addSegment(f[i].v[n - 1], f[i].o[n - 1], f[i].i[0], f[i].v[0], r, o, g),
                            g = !1) : (l = bez.getNewSegment(f[i].v[n - 1], f[i].v[0], f[i].o[n - 1], f[i].i[0], (e.s - d) / y, (e.e - d) / y, h[n - 1]),
                            this.addSegmentFromArray(l, r, o, g),
                            g = !1,
                            r.c = !1)
                        } else
                            r.c = !1;
                        d += a.addedLength,
                        o += 1
                    }
                    if (r._length && (r.setXYAt(r.v[p][0], r.v[p][1], "i", p),
                    r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], "o", r._length - 1)),
                    d > e.e)
                        break;
                    i < u - 1 && (r = shapePool.newElement(),
                    g = !0,
                    m.push(r),
                    o = 0)
                }
                return m
            }
            ,
            extendPrototype([ShapeModifier], PuckerAndBloatModifier),
            PuckerAndBloatModifier.prototype.initModifierProperties = function(t, e) {
                this.getValue = this.processKeys,
                this.amount = PropertyFactory.getProp(t, e.a, 0, null, this),
                this._isAnimated = !!this.amount.effectsSequence.length
            }
            ,
            PuckerAndBloatModifier.prototype.processPath = function(t, e) {
                var r = e / 100
                  , i = [0, 0]
                  , n = t._length
                  , s = 0;
                for (s = 0; s < n; s += 1)
                    i[0] += t.v[s][0],
                    i[1] += t.v[s][1];
                i[0] /= n,
                i[1] /= n;
                var a, o, h, l, p, c, f = shapePool.newElement();
                for (f.c = t.c,
                s = 0; s < n; s += 1)
                    a = t.v[s][0] + (i[0] - t.v[s][0]) * r,
                    o = t.v[s][1] + (i[1] - t.v[s][1]) * r,
                    h = t.o[s][0] + (i[0] - t.o[s][0]) * -r,
                    l = t.o[s][1] + (i[1] - t.o[s][1]) * -r,
                    p = t.i[s][0] + (i[0] - t.i[s][0]) * -r,
                    c = t.i[s][1] + (i[1] - t.i[s][1]) * -r,
                    f.setTripleAt(a, o, h, l, p, c, s);
                return f
            }
            ,
            PuckerAndBloatModifier.prototype.processShapes = function(t) {
                var e, r, i, n, s, a, o = this.shapes.length, h = this.amount.v;
                if (0 !== h)
                    for (r = 0; r < o; r += 1) {
                        if (a = (s = this.shapes[r]).localShapeCollection,
                        s.shape._mdf || this._mdf || t)
                            for (a.releaseShapes(),
                            s.shape._mdf = !0,
                            e = s.shape.paths.shapes,
                            n = s.shape.paths._length,
                            i = 0; i < n; i += 1)
                                a.addShape(this.processPath(e[i], h));
                        s.shape.paths = s.localShapeCollection
                    }
                this.dynamicProperties.length || (this._mdf = !1)
            }
            ;
            var TransformPropertyFactory = function() {
                var t = [0, 0];
                function e(t, e, r) {
                    if (this.elem = t,
                    this.frameId = -1,
                    this.propType = "transform",
                    this.data = e,
                    this.v = new Matrix,
                    this.pre = new Matrix,
                    this.appliedTransformations = 0,
                    this.initDynamicPropertyContainer(r || t),
                    e.p && e.p.s ? (this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this),
                    this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this),
                    e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t, e.p || {
                        k: [0, 0, 0]
                    }, 1, 0, this),
                    e.rx) {
                        if (this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this),
                        this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this),
                        this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this),
                        e.or.k[0].ti) {
                            var i, n = e.or.k.length;
                            for (i = 0; i < n; i += 1)
                                e.or.k[i].to = null,
                                e.or.k[i].ti = null
                        }
                        this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this),
                        this.or.sh = !0
                    } else
                        this.r = PropertyFactory.getProp(t, e.r || {
                            k: 0
                        }, 0, degToRads, this);
                    e.sk && (this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this),
                    this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this)),
                    this.a = PropertyFactory.getProp(t, e.a || {
                        k: [0, 0, 0]
                    }, 1, 0, this),
                    this.s = PropertyFactory.getProp(t, e.s || {
                        k: [100, 100, 100]
                    }, 1, .01, this),
                    e.o ? this.o = PropertyFactory.getProp(t, e.o, 0, .01, t) : this.o = {
                        _mdf: !1,
                        v: 1
                    },
                    this._isDirty = !0,
                    this.dynamicProperties.length || this.getValue(!0)
                }
                return e.prototype = {
                    applyToMatrix: function(t) {
                        var e = this._mdf;
                        this.iterateDynamicProperties(),
                        this._mdf = this._mdf || e,
                        this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                        this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                        this.sk && t.skewFromAxis(-this.sk.v, this.sa.v),
                        this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),
                        this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                    },
                    getValue: function(e) {
                        if (this.elem.globalData.frameId !== this.frameId) {
                            if (this._isDirty && (this.precalculateMatrix(),
                            this._isDirty = !1),
                            this.iterateDynamicProperties(),
                            this._mdf || e) {
                                var r;
                                if (this.v.cloneFromProps(this.pre.props),
                                this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                                this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                                this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v),
                                this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),
                                this.autoOriented) {
                                    var i, n;
                                    if (r = this.elem.globalData.frameRate,
                                    this.p && this.p.keyframes && this.p.getValueAtTime)
                                        this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (i = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / r, 0),
                                        n = this.p.getValueAtTime(this.p.keyframes[0].t / r, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (i = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / r, 0),
                                        n = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .05) / r, 0)) : (i = this.p.pv,
                                        n = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / r, this.p.offsetTime));
                                    else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                                        i = [],
                                        n = [];
                                        var s = this.px
                                          , a = this.py;
                                        s._caching.lastFrame + s.offsetTime <= s.keyframes[0].t ? (i[0] = s.getValueAtTime((s.keyframes[0].t + .01) / r, 0),
                                        i[1] = a.getValueAtTime((a.keyframes[0].t + .01) / r, 0),
                                        n[0] = s.getValueAtTime(s.keyframes[0].t / r, 0),
                                        n[1] = a.getValueAtTime(a.keyframes[0].t / r, 0)) : s._caching.lastFrame + s.offsetTime >= s.keyframes[s.keyframes.length - 1].t ? (i[0] = s.getValueAtTime(s.keyframes[s.keyframes.length - 1].t / r, 0),
                                        i[1] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / r, 0),
                                        n[0] = s.getValueAtTime((s.keyframes[s.keyframes.length - 1].t - .01) / r, 0),
                                        n[1] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - .01) / r, 0)) : (i = [s.pv, a.pv],
                                        n[0] = s.getValueAtTime((s._caching.lastFrame + s.offsetTime - .01) / r, s.offsetTime),
                                        n[1] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - .01) / r, a.offsetTime))
                                    } else
                                        i = n = t;
                                    this.v.rotate(-Math.atan2(i[1] - n[1], i[0] - n[0]))
                                }
                                this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                            }
                            this.frameId = this.elem.globalData.frameId
                        }
                    },
                    precalculateMatrix: function() {
                        if (this.appliedTransformations = 0,
                        this.pre.reset(),
                        !this.a.effectsSequence.length && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                        this.appliedTransformations = 1,
                        !this.s.effectsSequence.length)) {
                            if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                            this.appliedTransformations = 2,
                            this.sk) {
                                if (this.sk.effectsSequence.length || this.sa.effectsSequence.length)
                                    return;
                                this.pre.skewFromAxis(-this.sk.v, this.sa.v),
                                this.appliedTransformations = 3
                            }
                            this.r ? this.r.effectsSequence.length || (this.pre.rotate(-this.r.v),
                            this.appliedTransformations = 4) : this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),
                            this.appliedTransformations = 4)
                        }
                    },
                    autoOrient: function() {}
                },
                extendPrototype([DynamicPropertyContainer], e),
                e.prototype.addDynamicProperty = function(t) {
                    this._addDynamicProperty(t),
                    this.elem.addDynamicProperty(t),
                    this._isDirty = !0
                }
                ,
                e.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty,
                {
                    getTransformProperty: function(t, r, i) {
                        return new e(t,r,i)
                    }
                }
            }();
            function RepeaterModifier() {}
            function RoundCornersModifier() {}
            function floatEqual(t, e) {
                return 1e5 * Math.abs(t - e) <= Math.min(Math.abs(t), Math.abs(e))
            }
            function floatZero(t) {
                return Math.abs(t) <= 1e-5
            }
            function lerp(t, e, r) {
                return t * (1 - r) + e * r
            }
            function lerpPoint(t, e, r) {
                return [lerp(t[0], e[0], r), lerp(t[1], e[1], r)]
            }
            function quadRoots(t, e, r) {
                if (0 === t)
                    return [];
                var i = e * e - 4 * t * r;
                if (i < 0)
                    return [];
                var n = -e / (2 * t);
                if (0 === i)
                    return [n];
                var s = Math.sqrt(i) / (2 * t);
                return [n - s, n + s]
            }
            function polynomialCoefficients(t, e, r, i) {
                return [3 * e - t - 3 * r + i, 3 * t - 6 * e + 3 * r, -3 * t + 3 * e, t]
            }
            function singlePoint(t) {
                return new PolynomialBezier(t,t,t,t,!1)
            }
            function PolynomialBezier(t, e, r, i, n) {
                n && pointEqual(t, e) && (e = lerpPoint(t, i, 1 / 3)),
                n && pointEqual(r, i) && (r = lerpPoint(t, i, 2 / 3));
                var s = polynomialCoefficients(t[0], e[0], r[0], i[0])
                  , a = polynomialCoefficients(t[1], e[1], r[1], i[1]);
                this.a = [s[0], a[0]],
                this.b = [s[1], a[1]],
                this.c = [s[2], a[2]],
                this.d = [s[3], a[3]],
                this.points = [t, e, r, i]
            }
            function extrema(t, e) {
                var r = t.points[0][e]
                  , i = t.points[t.points.length - 1][e];
                if (r > i) {
                    var n = i;
                    i = r,
                    r = n
                }
                for (var s = quadRoots(3 * t.a[e], 2 * t.b[e], t.c[e]), a = 0; a < s.length; a += 1)
                    if (s[a] > 0 && s[a] < 1) {
                        var o = t.point(s[a])[e];
                        o < r ? r = o : o > i && (i = o)
                    }
                return {
                    min: r,
                    max: i
                }
            }
            function intersectData(t, e, r) {
                var i = t.boundingBox();
                return {
                    cx: i.cx,
                    cy: i.cy,
                    width: i.width,
                    height: i.height,
                    bez: t,
                    t: (e + r) / 2,
                    t1: e,
                    t2: r
                }
            }
            function splitData(t) {
                var e = t.bez.split(.5);
                return [intersectData(e[0], t.t1, t.t), intersectData(e[1], t.t, t.t2)]
            }
            function boxIntersect(t, e) {
                return 2 * Math.abs(t.cx - e.cx) < t.width + e.width && 2 * Math.abs(t.cy - e.cy) < t.height + e.height
            }
            function intersectsImpl(t, e, r, i, n, s) {
                if (boxIntersect(t, e))
                    if (r >= s || t.width <= i && t.height <= i && e.width <= i && e.height <= i)
                        n.push([t.t, e.t]);
                    else {
                        var a = splitData(t)
                          , o = splitData(e);
                        intersectsImpl(a[0], o[0], r + 1, i, n, s),
                        intersectsImpl(a[0], o[1], r + 1, i, n, s),
                        intersectsImpl(a[1], o[0], r + 1, i, n, s),
                        intersectsImpl(a[1], o[1], r + 1, i, n, s)
                    }
            }
            function crossProduct(t, e) {
                return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]]
            }
            function lineIntersection(t, e, r, i) {
                var n = [t[0], t[1], 1]
                  , s = [e[0], e[1], 1]
                  , a = [r[0], r[1], 1]
                  , o = [i[0], i[1], 1]
                  , h = crossProduct(crossProduct(n, s), crossProduct(a, o));
                return floatZero(h[2]) ? null : [h[0] / h[2], h[1] / h[2]]
            }
            function polarOffset(t, e, r) {
                return [t[0] + Math.cos(e) * r, t[1] - Math.sin(e) * r]
            }
            function pointDistance(t, e) {
                return Math.hypot(t[0] - e[0], t[1] - e[1])
            }
            function pointEqual(t, e) {
                return floatEqual(t[0], e[0]) && floatEqual(t[1], e[1])
            }
            function ZigZagModifier() {}
            function setPoint(t, e, r, i, n, s, a) {
                var o = r - Math.PI / 2
                  , h = r + Math.PI / 2
                  , l = e[0] + Math.cos(r) * i * n
                  , p = e[1] - Math.sin(r) * i * n;
                t.setTripleAt(l, p, l + Math.cos(o) * s, p - Math.sin(o) * s, l + Math.cos(h) * a, p - Math.sin(h) * a, t.length())
            }
            function getPerpendicularVector(t, e) {
                var r = [e[0] - t[0], e[1] - t[1]]
                  , i = .5 * -Math.PI;
                return [Math.cos(i) * r[0] - Math.sin(i) * r[1], Math.sin(i) * r[0] + Math.cos(i) * r[1]]
            }
            function getProjectingAngle(t, e) {
                var r = 0 === e ? t.length() - 1 : e - 1
                  , i = (e + 1) % t.length()
                  , n = getPerpendicularVector(t.v[r], t.v[i]);
                return Math.atan2(0, 1) - Math.atan2(n[1], n[0])
            }
            function zigZagCorner(t, e, r, i, n, s, a) {
                var o = getProjectingAngle(e, r)
                  , h = e.v[r % e._length]
                  , l = e.v[0 === r ? e._length - 1 : r - 1]
                  , p = e.v[(r + 1) % e._length]
                  , c = 2 === s ? Math.sqrt(Math.pow(h[0] - l[0], 2) + Math.pow(h[1] - l[1], 2)) : 0
                  , f = 2 === s ? Math.sqrt(Math.pow(h[0] - p[0], 2) + Math.pow(h[1] - p[1], 2)) : 0;
                setPoint(t, e.v[r % e._length], o, a, i, f / (2 * (n + 1)), c / (2 * (n + 1)), s)
            }
            function zigZagSegment(t, e, r, i, n, s) {
                for (var a = 0; a < i; a += 1) {
                    var o = (a + 1) / (i + 1)
                      , h = 2 === n ? Math.sqrt(Math.pow(e.points[3][0] - e.points[0][0], 2) + Math.pow(e.points[3][1] - e.points[0][1], 2)) : 0
                      , l = e.normalAngle(o);
                    setPoint(t, e.point(o), l, s, r, h / (2 * (i + 1)), h / (2 * (i + 1)), n),
                    s = -s
                }
                return s
            }
            function linearOffset(t, e, r) {
                var i = Math.atan2(e[0] - t[0], e[1] - t[1]);
                return [polarOffset(t, i, r), polarOffset(e, i, r)]
            }
            function offsetSegment(t, e) {
                var r, i, n, s, a, o, h;
                r = (h = linearOffset(t.points[0], t.points[1], e))[0],
                i = h[1],
                n = (h = linearOffset(t.points[1], t.points[2], e))[0],
                s = h[1],
                a = (h = linearOffset(t.points[2], t.points[3], e))[0],
                o = h[1];
                var l = lineIntersection(r, i, n, s);
                null === l && (l = i);
                var p = lineIntersection(a, o, n, s);
                return null === p && (p = a),
                new PolynomialBezier(r,l,p,o)
            }
            function joinLines(t, e, r, i, n) {
                var s = e.points[3]
                  , a = r.points[0];
                if (3 === i)
                    return s;
                if (pointEqual(s, a))
                    return s;
                if (2 === i) {
                    var o = -e.tangentAngle(1)
                      , h = -r.tangentAngle(0) + Math.PI
                      , l = lineIntersection(s, polarOffset(s, o + Math.PI / 2, 100), a, polarOffset(a, o + Math.PI / 2, 100))
                      , p = l ? pointDistance(l, s) : pointDistance(s, a) / 2
                      , c = polarOffset(s, o, 2 * p * roundCorner);
                    return t.setXYAt(c[0], c[1], "o", t.length() - 1),
                    c = polarOffset(a, h, 2 * p * roundCorner),
                    t.setTripleAt(a[0], a[1], a[0], a[1], c[0], c[1], t.length()),
                    a
                }
                var f = lineIntersection(pointEqual(s, e.points[2]) ? e.points[0] : e.points[2], s, a, pointEqual(a, r.points[1]) ? r.points[3] : r.points[1]);
                return f && pointDistance(f, s) < n ? (t.setTripleAt(f[0], f[1], f[0], f[1], f[0], f[1], t.length()),
                f) : s
            }
            function getIntersection(t, e) {
                var r = t.intersections(e);
                return r.length && floatEqual(r[0][0], 1) && r.shift(),
                r.length ? r[0] : null
            }
            function pruneSegmentIntersection(t, e) {
                var r = t.slice()
                  , i = e.slice()
                  , n = getIntersection(t[t.length - 1], e[0]);
                return n && (r[t.length - 1] = t[t.length - 1].split(n[0])[0],
                i[0] = e[0].split(n[1])[1]),
                t.length > 1 && e.length > 1 && (n = getIntersection(t[0], e[e.length - 1])) ? [[t[0].split(n[0])[0]], [e[e.length - 1].split(n[1])[1]]] : [r, i]
            }
            function pruneIntersections(t) {
                for (var e, r = 1; r < t.length; r += 1)
                    e = pruneSegmentIntersection(t[r - 1], t[r]),
                    t[r - 1] = e[0],
                    t[r] = e[1];
                return t.length > 1 && (e = pruneSegmentIntersection(t[t.length - 1], t[0]),
                t[t.length - 1] = e[0],
                t[0] = e[1]),
                t
            }
            function offsetSegmentSplit(t, e) {
                var r, i, n, s, a = t.inflectionPoints();
                if (0 === a.length)
                    return [offsetSegment(t, e)];
                if (1 === a.length || floatEqual(a[1], 1))
                    return r = (n = t.split(a[0]))[0],
                    i = n[1],
                    [offsetSegment(r, e), offsetSegment(i, e)];
                r = (n = t.split(a[0]))[0];
                var o = (a[1] - a[0]) / (1 - a[0]);
                return s = (n = n[1].split(o))[0],
                i = n[1],
                [offsetSegment(r, e), offsetSegment(s, e), offsetSegment(i, e)]
            }
            function OffsetPathModifier() {}
            function getFontProperties(t) {
                for (var e = t.fStyle ? t.fStyle.split(" ") : [], r = "normal", i = "normal", n = e.length, s = 0; s < n; s += 1)
                    switch (e[s].toLowerCase()) {
                    case "italic":
                        i = "italic";
                        break;
                    case "bold":
                        r = "700";
                        break;
                    case "black":
                        r = "900";
                        break;
                    case "medium":
                        r = "500";
                        break;
                    case "regular":
                    case "normal":
                        r = "400";
                        break;
                    case "light":
                    case "thin":
                        r = "200"
                    }
                return {
                    style: i,
                    weight: t.fWeight || r
                }
            }
            extendPrototype([ShapeModifier], RepeaterModifier),
            RepeaterModifier.prototype.initModifierProperties = function(t, e) {
                this.getValue = this.processKeys,
                this.c = PropertyFactory.getProp(t, e.c, 0, null, this),
                this.o = PropertyFactory.getProp(t, e.o, 0, null, this),
                this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this),
                this.so = PropertyFactory.getProp(t, e.tr.so, 0, .01, this),
                this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, .01, this),
                this.data = e,
                this.dynamicProperties.length || this.getValue(!0),
                this._isAnimated = !!this.dynamicProperties.length,
                this.pMatrix = new Matrix,
                this.rMatrix = new Matrix,
                this.sMatrix = new Matrix,
                this.tMatrix = new Matrix,
                this.matrix = new Matrix
            }
            ,
            RepeaterModifier.prototype.applyTransforms = function(t, e, r, i, n, s) {
                var a = s ? -1 : 1
                  , o = i.s.v[0] + (1 - i.s.v[0]) * (1 - n)
                  , h = i.s.v[1] + (1 - i.s.v[1]) * (1 - n);
                t.translate(i.p.v[0] * a * n, i.p.v[1] * a * n, i.p.v[2]),
                e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]),
                e.rotate(-i.r.v * a * n),
                e.translate(i.a.v[0], i.a.v[1], i.a.v[2]),
                r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]),
                r.scale(s ? 1 / o : o, s ? 1 / h : h),
                r.translate(i.a.v[0], i.a.v[1], i.a.v[2])
            }
            ,
            RepeaterModifier.prototype.init = function(t, e, r, i) {
                for (this.elem = t,
                this.arr = e,
                this.pos = r,
                this.elemsData = i,
                this._currentCopies = 0,
                this._elements = [],
                this._groups = [],
                this.frameId = -1,
                this.initDynamicPropertyContainer(t),
                this.initModifierProperties(t, e[r]); r > 0; )
                    r -= 1,
                    this._elements.unshift(e[r]);
                this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
            }
            ,
            RepeaterModifier.prototype.resetElements = function(t) {
                var e, r = t.length;
                for (e = 0; e < r; e += 1)
                    t[e]._processed = !1,
                    "gr" === t[e].ty && this.resetElements(t[e].it)
            }
            ,
            RepeaterModifier.prototype.cloneElements = function(t) {
                var e = JSON.parse(JSON.stringify(t));
                return this.resetElements(e),
                e
            }
            ,
            RepeaterModifier.prototype.changeGroupRender = function(t, e) {
                var r, i = t.length;
                for (r = 0; r < i; r += 1)
                    t[r]._render = e,
                    "gr" === t[r].ty && this.changeGroupRender(t[r].it, e)
            }
            ,
            RepeaterModifier.prototype.processShapes = function(t) {
                var e, r, i, n, s, a = !1;
                if (this._mdf || t) {
                    var o, h = Math.ceil(this.c.v);
                    if (this._groups.length < h) {
                        for (; this._groups.length < h; ) {
                            var l = {
                                it: this.cloneElements(this._elements),
                                ty: "gr"
                            };
                            l.it.push({
                                a: {
                                    a: 0,
                                    ix: 1,
                                    k: [0, 0]
                                },
                                nm: "Transform",
                                o: {
                                    a: 0,
                                    ix: 7,
                                    k: 100
                                },
                                p: {
                                    a: 0,
                                    ix: 2,
                                    k: [0, 0]
                                },
                                r: {
                                    a: 1,
                                    ix: 6,
                                    k: [{
                                        s: 0,
                                        e: 0,
                                        t: 0
                                    }, {
                                        s: 0,
                                        e: 0,
                                        t: 1
                                    }]
                                },
                                s: {
                                    a: 0,
                                    ix: 3,
                                    k: [100, 100]
                                },
                                sa: {
                                    a: 0,
                                    ix: 5,
                                    k: 0
                                },
                                sk: {
                                    a: 0,
                                    ix: 4,
                                    k: 0
                                },
                                ty: "tr"
                            }),
                            this.arr.splice(0, 0, l),
                            this._groups.splice(0, 0, l),
                            this._currentCopies += 1
                        }
                        this.elem.reloadShapes(),
                        a = !0
                    }
                    for (s = 0,
                    i = 0; i <= this._groups.length - 1; i += 1) {
                        if (o = s < h,
                        this._groups[i]._render = o,
                        this.changeGroupRender(this._groups[i].it, o),
                        !o) {
                            var p = this.elemsData[i].it
                              , c = p[p.length - 1];
                            0 !== c.transform.op.v ? (c.transform.op._mdf = !0,
                            c.transform.op.v = 0) : c.transform.op._mdf = !1
                        }
                        s += 1
                    }
                    this._currentCopies = h;
                    var f = this.o.v
                      , u = f % 1
                      , d = f > 0 ? Math.floor(f) : Math.ceil(f)
                      , m = this.pMatrix.props
                      , g = this.rMatrix.props
                      , y = this.sMatrix.props;
                    this.pMatrix.reset(),
                    this.rMatrix.reset(),
                    this.sMatrix.reset(),
                    this.tMatrix.reset(),
                    this.matrix.reset();
                    var v, _, b = 0;
                    if (f > 0) {
                        for (; b < d; )
                            this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1),
                            b += 1;
                        u && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, u, !1),
                        b += u)
                    } else if (f < 0) {
                        for (; b > d; )
                            this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0),
                            b -= 1;
                        u && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -u, !0),
                        b -= u)
                    }
                    for (i = 1 === this.data.m ? 0 : this._currentCopies - 1,
                    n = 1 === this.data.m ? 1 : -1,
                    s = this._currentCopies; s; ) {
                        if (_ = (r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props).length,
                        e[e.length - 1].transform.mProps._mdf = !0,
                        e[e.length - 1].transform.op._mdf = !0,
                        e[e.length - 1].transform.op.v = 1 === this._currentCopies ? this.so.v : this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1)),
                        0 !== b) {
                            for ((0 !== i && 1 === n || i !== this._currentCopies - 1 && -1 === n) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1),
                            this.matrix.transform(g[0], g[1], g[2], g[3], g[4], g[5], g[6], g[7], g[8], g[9], g[10], g[11], g[12], g[13], g[14], g[15]),
                            this.matrix.transform(y[0], y[1], y[2], y[3], y[4], y[5], y[6], y[7], y[8], y[9], y[10], y[11], y[12], y[13], y[14], y[15]),
                            this.matrix.transform(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]),
                            v = 0; v < _; v += 1)
                                r[v] = this.matrix.props[v];
                            this.matrix.reset()
                        } else
                            for (this.matrix.reset(),
                            v = 0; v < _; v += 1)
                                r[v] = this.matrix.props[v];
                        b += 1,
                        s -= 1,
                        i += n
                    }
                } else
                    for (s = this._currentCopies,
                    i = 0,
                    n = 1; s; )
                        r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props,
                        e[e.length - 1].transform.mProps._mdf = !1,
                        e[e.length - 1].transform.op._mdf = !1,
                        s -= 1,
                        i += n;
                return a
            }
            ,
            RepeaterModifier.prototype.addShape = function() {}
            ,
            extendPrototype([ShapeModifier], RoundCornersModifier),
            RoundCornersModifier.prototype.initModifierProperties = function(t, e) {
                this.getValue = this.processKeys,
                this.rd = PropertyFactory.getProp(t, e.r, 0, null, this),
                this._isAnimated = !!this.rd.effectsSequence.length
            }
            ,
            RoundCornersModifier.prototype.processPath = function(t, e) {
                var r, i = shapePool.newElement();
                i.c = t.c;
                var n, s, a, o, h, l, p, c, f, u, d, m, g = t._length, y = 0;
                for (r = 0; r < g; r += 1)
                    n = t.v[r],
                    a = t.o[r],
                    s = t.i[r],
                    n[0] === a[0] && n[1] === a[1] && n[0] === s[0] && n[1] === s[1] ? 0 !== r && r !== g - 1 || t.c ? (o = 0 === r ? t.v[g - 1] : t.v[r - 1],
                    l = (h = Math.sqrt(Math.pow(n[0] - o[0], 2) + Math.pow(n[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0,
                    p = d = n[0] + (o[0] - n[0]) * l,
                    c = m = n[1] - (n[1] - o[1]) * l,
                    f = p - (p - n[0]) * roundCorner,
                    u = c - (c - n[1]) * roundCorner,
                    i.setTripleAt(p, c, f, u, d, m, y),
                    y += 1,
                    o = r === g - 1 ? t.v[0] : t.v[r + 1],
                    l = (h = Math.sqrt(Math.pow(n[0] - o[0], 2) + Math.pow(n[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0,
                    p = f = n[0] + (o[0] - n[0]) * l,
                    c = u = n[1] + (o[1] - n[1]) * l,
                    d = p - (p - n[0]) * roundCorner,
                    m = c - (c - n[1]) * roundCorner,
                    i.setTripleAt(p, c, f, u, d, m, y),
                    y += 1) : (i.setTripleAt(n[0], n[1], a[0], a[1], s[0], s[1], y),
                    y += 1) : (i.setTripleAt(t.v[r][0], t.v[r][1], t.o[r][0], t.o[r][1], t.i[r][0], t.i[r][1], y),
                    y += 1);
                return i
            }
            ,
            RoundCornersModifier.prototype.processShapes = function(t) {
                var e, r, i, n, s, a, o = this.shapes.length, h = this.rd.v;
                if (0 !== h)
                    for (r = 0; r < o; r += 1) {
                        if (a = (s = this.shapes[r]).localShapeCollection,
                        s.shape._mdf || this._mdf || t)
                            for (a.releaseShapes(),
                            s.shape._mdf = !0,
                            e = s.shape.paths.shapes,
                            n = s.shape.paths._length,
                            i = 0; i < n; i += 1)
                                a.addShape(this.processPath(e[i], h));
                        s.shape.paths = s.localShapeCollection
                    }
                this.dynamicProperties.length || (this._mdf = !1)
            }
            ,
            PolynomialBezier.prototype.point = function(t) {
                return [((this.a[0] * t + this.b[0]) * t + this.c[0]) * t + this.d[0], ((this.a[1] * t + this.b[1]) * t + this.c[1]) * t + this.d[1]]
            }
            ,
            PolynomialBezier.prototype.derivative = function(t) {
                return [(3 * t * this.a[0] + 2 * this.b[0]) * t + this.c[0], (3 * t * this.a[1] + 2 * this.b[1]) * t + this.c[1]]
            }
            ,
            PolynomialBezier.prototype.tangentAngle = function(t) {
                var e = this.derivative(t);
                return Math.atan2(e[1], e[0])
            }
            ,
            PolynomialBezier.prototype.normalAngle = function(t) {
                var e = this.derivative(t);
                return Math.atan2(e[0], e[1])
            }
            ,
            PolynomialBezier.prototype.inflectionPoints = function() {
                var t = this.a[1] * this.b[0] - this.a[0] * this.b[1];
                if (floatZero(t))
                    return [];
                var e = -.5 * (this.a[1] * this.c[0] - this.a[0] * this.c[1]) / t
                  , r = e * e - 1 / 3 * (this.b[1] * this.c[0] - this.b[0] * this.c[1]) / t;
                if (r < 0)
                    return [];
                var i = Math.sqrt(r);
                return floatZero(i) ? i > 0 && i < 1 ? [e] : [] : [e - i, e + i].filter((function(t) {
                    return t > 0 && t < 1
                }
                ))
            }
            ,
            PolynomialBezier.prototype.split = function(t) {
                if (t <= 0)
                    return [singlePoint(this.points[0]), this];
                if (t >= 1)
                    return [this, singlePoint(this.points[this.points.length - 1])];
                var e = lerpPoint(this.points[0], this.points[1], t)
                  , r = lerpPoint(this.points[1], this.points[2], t)
                  , i = lerpPoint(this.points[2], this.points[3], t)
                  , n = lerpPoint(e, r, t)
                  , s = lerpPoint(r, i, t)
                  , a = lerpPoint(n, s, t);
                return [new PolynomialBezier(this.points[0],e,n,a,!0), new PolynomialBezier(a,s,i,this.points[3],!0)]
            }
            ,
            PolynomialBezier.prototype.bounds = function() {
                return {
                    x: extrema(this, 0),
                    y: extrema(this, 1)
                }
            }
            ,
            PolynomialBezier.prototype.boundingBox = function() {
                var t = this.bounds();
                return {
                    left: t.x.min,
                    right: t.x.max,
                    top: t.y.min,
                    bottom: t.y.max,
                    width: t.x.max - t.x.min,
                    height: t.y.max - t.y.min,
                    cx: (t.x.max + t.x.min) / 2,
                    cy: (t.y.max + t.y.min) / 2
                }
            }
            ,
            PolynomialBezier.prototype.intersections = function(t, e, r) {
                void 0 === e && (e = 2),
                void 0 === r && (r = 7);
                var i = [];
                return intersectsImpl(intersectData(this, 0, 1), intersectData(t, 0, 1), 0, e, i, r),
                i
            }
            ,
            PolynomialBezier.shapeSegment = function(t, e) {
                var r = (e + 1) % t.length();
                return new PolynomialBezier(t.v[e],t.o[e],t.i[r],t.v[r],!0)
            }
            ,
            PolynomialBezier.shapeSegmentInverted = function(t, e) {
                var r = (e + 1) % t.length();
                return new PolynomialBezier(t.v[r],t.i[r],t.o[e],t.v[e],!0)
            }
            ,
            extendPrototype([ShapeModifier], ZigZagModifier),
            ZigZagModifier.prototype.initModifierProperties = function(t, e) {
                this.getValue = this.processKeys,
                this.amplitude = PropertyFactory.getProp(t, e.s, 0, null, this),
                this.frequency = PropertyFactory.getProp(t, e.r, 0, null, this),
                this.pointsType = PropertyFactory.getProp(t, e.pt, 0, null, this),
                this._isAnimated = 0 !== this.amplitude.effectsSequence.length || 0 !== this.frequency.effectsSequence.length || 0 !== this.pointsType.effectsSequence.length
            }
            ,
            ZigZagModifier.prototype.processPath = function(t, e, r, i) {
                var n = t._length
                  , s = shapePool.newElement();
                if (s.c = t.c,
                t.c || (n -= 1),
                0 === n)
                    return s;
                var a = -1
                  , o = PolynomialBezier.shapeSegment(t, 0);
                zigZagCorner(s, t, 0, e, r, i, a);
                for (var h = 0; h < n; h += 1)
                    a = zigZagSegment(s, o, e, r, i, -a),
                    o = h !== n - 1 || t.c ? PolynomialBezier.shapeSegment(t, (h + 1) % n) : null,
                    zigZagCorner(s, t, h + 1, e, r, i, a);
                return s
            }
            ,
            ZigZagModifier.prototype.processShapes = function(t) {
                var e, r, i, n, s, a, o = this.shapes.length, h = this.amplitude.v, l = Math.max(0, Math.round(this.frequency.v)), p = this.pointsType.v;
                if (0 !== h)
                    for (r = 0; r < o; r += 1) {
                        if (a = (s = this.shapes[r]).localShapeCollection,
                        s.shape._mdf || this._mdf || t)
                            for (a.releaseShapes(),
                            s.shape._mdf = !0,
                            e = s.shape.paths.shapes,
                            n = s.shape.paths._length,
                            i = 0; i < n; i += 1)
                                a.addShape(this.processPath(e[i], h, l, p));
                        s.shape.paths = s.localShapeCollection
                    }
                this.dynamicProperties.length || (this._mdf = !1)
            }
            ,
            extendPrototype([ShapeModifier], OffsetPathModifier),
            OffsetPathModifier.prototype.initModifierProperties = function(t, e) {
                this.getValue = this.processKeys,
                this.amount = PropertyFactory.getProp(t, e.a, 0, null, this),
                this.miterLimit = PropertyFactory.getProp(t, e.ml, 0, null, this),
                this.lineJoin = e.lj,
                this._isAnimated = 0 !== this.amount.effectsSequence.length
            }
            ,
            OffsetPathModifier.prototype.processPath = function(t, e, r, i) {
                var n = shapePool.newElement();
                n.c = t.c;
                var s, a, o, h = t.length();
                t.c || (h -= 1);
                var l = [];
                for (s = 0; s < h; s += 1)
                    o = PolynomialBezier.shapeSegment(t, s),
                    l.push(offsetSegmentSplit(o, e));
                if (!t.c)
                    for (s = h - 1; s >= 0; s -= 1)
                        o = PolynomialBezier.shapeSegmentInverted(t, s),
                        l.push(offsetSegmentSplit(o, e));
                l = pruneIntersections(l);
                var p = null
                  , c = null;
                for (s = 0; s < l.length; s += 1) {
                    var f = l[s];
                    for (c && (p = joinLines(n, c, f[0], r, i)),
                    c = f[f.length - 1],
                    a = 0; a < f.length; a += 1)
                        o = f[a],
                        p && pointEqual(o.points[0], p) ? n.setXYAt(o.points[1][0], o.points[1][1], "o", n.length() - 1) : n.setTripleAt(o.points[0][0], o.points[0][1], o.points[1][0], o.points[1][1], o.points[0][0], o.points[0][1], n.length()),
                        n.setTripleAt(o.points[3][0], o.points[3][1], o.points[3][0], o.points[3][1], o.points[2][0], o.points[2][1], n.length()),
                        p = o.points[3]
                }
                return l.length && joinLines(n, c, l[0][0], r, i),
                n
            }
            ,
            OffsetPathModifier.prototype.processShapes = function(t) {
                var e, r, i, n, s, a, o = this.shapes.length, h = this.amount.v, l = this.miterLimit.v, p = this.lineJoin;
                if (0 !== h)
                    for (r = 0; r < o; r += 1) {
                        if (a = (s = this.shapes[r]).localShapeCollection,
                        s.shape._mdf || this._mdf || t)
                            for (a.releaseShapes(),
                            s.shape._mdf = !0,
                            e = s.shape.paths.shapes,
                            n = s.shape.paths._length,
                            i = 0; i < n; i += 1)
                                a.addShape(this.processPath(e[i], h, p, l));
                        s.shape.paths = s.localShapeCollection
                    }
                this.dynamicProperties.length || (this._mdf = !1)
            }
            ;
            var FontManager = function() {
                var t = {
                    w: 0,
                    size: 0,
                    shapes: [],
                    data: {
                        shapes: []
                    }
                }
                  , e = [];
                e = e.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
                var r = 127988
                  , i = ["d83cdffb", "d83cdffc", "d83cdffd", "d83cdffe", "d83cdfff"];
                function n(t, e) {
                    var r = createTag("span");
                    r.setAttribute("aria-hidden", !0),
                    r.style.fontFamily = e;
                    var i = createTag("span");
                    i.innerText = "giItT1WQy@!-/#",
                    r.style.position = "absolute",
                    r.style.left = "-10000px",
                    r.style.top = "-10000px",
                    r.style.fontSize = "300px",
                    r.style.fontVariant = "normal",
                    r.style.fontStyle = "normal",
                    r.style.fontWeight = "normal",
                    r.style.letterSpacing = "0",
                    r.appendChild(i),
                    document.body.appendChild(r);
                    var n = i.offsetWidth;
                    return i.style.fontFamily = function(t) {
                        var e, r = t.split(","), i = r.length, n = [];
                        for (e = 0; e < i; e += 1)
                            "sans-serif" !== r[e] && "monospace" !== r[e] && n.push(r[e]);
                        return n.join(",")
                    }(t) + ", " + e,
                    {
                        node: i,
                        w: n,
                        parent: r
                    }
                }
                function s(t, e) {
                    var r, i = document.body && e ? "svg" : "canvas", n = getFontProperties(t);
                    if ("svg" === i) {
                        var s = createNS("text");
                        s.style.fontSize = "100px",
                        s.setAttribute("font-family", t.fFamily),
                        s.setAttribute("font-style", n.style),
                        s.setAttribute("font-weight", n.weight),
                        s.textContent = "1",
                        t.fClass ? (s.style.fontFamily = "inherit",
                        s.setAttribute("class", t.fClass)) : s.style.fontFamily = t.fFamily,
                        e.appendChild(s),
                        r = s
                    } else {
                        var a = new OffscreenCanvas(500,500).getContext("2d");
                        a.font = n.style + " " + n.weight + " 100px " + t.fFamily,
                        r = a
                    }
                    return {
                        measureText: function(t) {
                            return "svg" === i ? (r.textContent = t,
                            r.getComputedTextLength()) : r.measureText(t).width
                        }
                    }
                }
                function a(t) {
                    var e = 0
                      , r = t.charCodeAt(0);
                    if (r >= 55296 && r <= 56319) {
                        var i = t.charCodeAt(1);
                        i >= 56320 && i <= 57343 && (e = 1024 * (r - 55296) + i - 56320 + 65536)
                    }
                    return e
                }
                function o(t) {
                    var e = a(t);
                    return e >= 127462 && e <= 127487
                }
                var h = function() {
                    this.fonts = [],
                    this.chars = null,
                    this.typekitLoaded = 0,
                    this.isLoaded = !1,
                    this._warned = !1,
                    this.initTime = Date.now(),
                    this.setIsLoadedBinded = this.setIsLoaded.bind(this),
                    this.checkLoadedFontsBinded = this.checkLoadedFonts.bind(this)
                };
                h.isModifier = function(t, e) {
                    var r = t.toString(16) + e.toString(16);
                    return -1 !== i.indexOf(r)
                }
                ,
                h.isZeroWidthJoiner = function(t) {
                    return 8205 === t
                }
                ,
                h.isFlagEmoji = function(t) {
                    return o(t.substr(0, 2)) && o(t.substr(2, 2))
                }
                ,
                h.isRegionalCode = o,
                h.isCombinedCharacter = function(t) {
                    return -1 !== e.indexOf(t)
                }
                ,
                h.isRegionalFlag = function(t, e) {
                    var i = a(t.substr(e, 2));
                    if (i !== r)
                        return !1;
                    var n = 0;
                    for (e += 2; n < 5; ) {
                        if ((i = a(t.substr(e, 2))) < 917601 || i > 917626)
                            return !1;
                        n += 1,
                        e += 2
                    }
                    return 917631 === a(t.substr(e, 2))
                }
                ,
                h.isVariationSelector = function(t) {
                    return 65039 === t
                }
                ,
                h.BLACK_FLAG_CODE_POINT = r;
                var l = {
                    addChars: function(t) {
                        if (t) {
                            var e;
                            this.chars || (this.chars = []);
                            var r, i, n = t.length, s = this.chars.length;
                            for (e = 0; e < n; e += 1) {
                                for (r = 0,
                                i = !1; r < s; )
                                    this.chars[r].style === t[e].style && this.chars[r].fFamily === t[e].fFamily && this.chars[r].ch === t[e].ch && (i = !0),
                                    r += 1;
                                i || (this.chars.push(t[e]),
                                s += 1)
                            }
                        }
                    },
                    addFonts: function(t, e) {
                        if (t) {
                            if (this.chars)
                                return this.isLoaded = !0,
                                void (this.fonts = t.list);
                            if (!document.body)
                                return this.isLoaded = !0,
                                t.list.forEach((function(t) {
                                    t.helper = s(t),
                                    t.cache = {}
                                }
                                )),
                                void (this.fonts = t.list);
                            var r, i = t.list, a = i.length, o = a;
                            for (r = 0; r < a; r += 1) {
                                var h, l, p = !0;
                                if (i[r].loaded = !1,
                                i[r].monoCase = n(i[r].fFamily, "monospace"),
                                i[r].sansCase = n(i[r].fFamily, "sans-serif"),
                                i[r].fPath) {
                                    if ("p" === i[r].fOrigin || 3 === i[r].origin) {
                                        if ((h = document.querySelectorAll('style[f-forigin="p"][f-family="' + i[r].fFamily + '"], style[f-origin="3"][f-family="' + i[r].fFamily + '"]')).length > 0 && (p = !1),
                                        p) {
                                            var c = createTag("style");
                                            c.setAttribute("f-forigin", i[r].fOrigin),
                                            c.setAttribute("f-origin", i[r].origin),
                                            c.setAttribute("f-family", i[r].fFamily),
                                            c.type = "text/css",
                                            c.innerText = "@font-face {font-family: " + i[r].fFamily + "; font-style: normal; src: url('" + i[r].fPath + "');}",
                                            e.appendChild(c)
                                        }
                                    } else if ("g" === i[r].fOrigin || 1 === i[r].origin) {
                                        for (h = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'),
                                        l = 0; l < h.length; l += 1)
                                            -1 !== h[l].href.indexOf(i[r].fPath) && (p = !1);
                                        if (p) {
                                            var f = createTag("link");
                                            f.setAttribute("f-forigin", i[r].fOrigin),
                                            f.setAttribute("f-origin", i[r].origin),
                                            f.type = "text/css",
                                            f.rel = "stylesheet",
                                            f.href = i[r].fPath,
                                            document.body.appendChild(f)
                                        }
                                    } else if ("t" === i[r].fOrigin || 2 === i[r].origin) {
                                        for (h = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'),
                                        l = 0; l < h.length; l += 1)
                                            i[r].fPath === h[l].src && (p = !1);
                                        if (p) {
                                            var u = createTag("link");
                                            u.setAttribute("f-forigin", i[r].fOrigin),
                                            u.setAttribute("f-origin", i[r].origin),
                                            u.setAttribute("rel", "stylesheet"),
                                            u.setAttribute("href", i[r].fPath),
                                            e.appendChild(u)
                                        }
                                    }
                                } else
                                    i[r].loaded = !0,
                                    o -= 1;
                                i[r].helper = s(i[r], e),
                                i[r].cache = {},
                                this.fonts.push(i[r])
                            }
                            0 === o ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100)
                        } else
                            this.isLoaded = !0
                    },
                    getCharData: function(e, r, i) {
                        for (var n = 0, s = this.chars.length; n < s; ) {
                            if (this.chars[n].ch === e && this.chars[n].style === r && this.chars[n].fFamily === i)
                                return this.chars[n];
                            n += 1
                        }
                        return ("string" == typeof e && 13 !== e.charCodeAt(0) || !e) && console && console.warn && !this._warned && (this._warned = !0,
                        console.warn("Missing character from exported characters list: ", e, r, i)),
                        t
                    },
                    getFontByName: function(t) {
                        for (var e = 0, r = this.fonts.length; e < r; ) {
                            if (this.fonts[e].fName === t)
                                return this.fonts[e];
                            e += 1
                        }
                        return this.fonts[0]
                    },
                    measureText: function(t, e, r) {
                        var i = this.getFontByName(e)
                          , n = t;
                        if (!i.cache[n]) {
                            var s = i.helper;
                            if (" " === t) {
                                var a = s.measureText("|" + t + "|")
                                  , o = s.measureText("||");
                                i.cache[n] = (a - o) / 100
                            } else
                                i.cache[n] = s.measureText(t) / 100
                        }
                        return i.cache[n] * r
                    },
                    checkLoadedFonts: function() {
                        var t, e, r, i = this.fonts.length, n = i;
                        for (t = 0; t < i; t += 1)
                            this.fonts[t].loaded ? n -= 1 : "n" === this.fonts[t].fOrigin || 0 === this.fonts[t].origin ? this.fonts[t].loaded = !0 : (e = this.fonts[t].monoCase.node,
                            r = this.fonts[t].monoCase.w,
                            e.offsetWidth !== r ? (n -= 1,
                            this.fonts[t].loaded = !0) : (e = this.fonts[t].sansCase.node,
                            r = this.fonts[t].sansCase.w,
                            e.offsetWidth !== r && (n -= 1,
                            this.fonts[t].loaded = !0)),
                            this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent),
                            this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
                        0 !== n && Date.now() - this.initTime < 5e3 ? setTimeout(this.checkLoadedFontsBinded, 20) : setTimeout(this.setIsLoadedBinded, 10)
                    },
                    setIsLoaded: function() {
                        this.isLoaded = !0
                    }
                };
                return h.prototype = l,
                h
            }();
            function SlotManager(t) {
                this.animationData = t
            }
            function slotFactory(t) {
                return new SlotManager(t)
            }
            function RenderableElement() {}
            SlotManager.prototype.getProp = function(t) {
                return this.animationData.slots && this.animationData.slots[t.sid] ? Object.assign(t, this.animationData.slots[t.sid].p) : t
            }
            ,
            RenderableElement.prototype = {
                initRenderable: function() {
                    this.isInRange = !1,
                    this.hidden = !1,
                    this.isTransparent = !1,
                    this.renderableComponents = []
                },
                addRenderableComponent: function(t) {
                    -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t)
                },
                removeRenderableComponent: function(t) {
                    -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1)
                },
                prepareRenderableFrame: function(t) {
                    this.checkLayerLimits(t)
                },
                checkTransparency: function() {
                    this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0,
                    this.hide()) : this.isTransparent && (this.isTransparent = !1,
                    this.show())
                },
                checkLayerLimits: function(t) {
                    this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0,
                    this._mdf = !0,
                    this.isInRange = !0,
                    this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0,
                    this.isInRange = !1,
                    this.hide())
                },
                renderRenderable: function() {
                    var t, e = this.renderableComponents.length;
                    for (t = 0; t < e; t += 1)
                        this.renderableComponents[t].renderFrame(this._isFirstFrame)
                },
                sourceRectAtTime: function() {
                    return {
                        top: 0,
                        left: 0,
                        width: 100,
                        height: 100
                    }
                },
                getLayerSize: function() {
                    return 5 === this.data.ty ? {
                        w: this.data.textData.width,
                        h: this.data.textData.height
                    } : {
                        w: this.data.width,
                        h: this.data.height
                    }
                }
            };
            var getBlendMode = (blendModeEnums = {
                0: "source-over",
                1: "multiply",
                2: "screen",
                3: "overlay",
                4: "darken",
                5: "lighten",
                6: "color-dodge",
                7: "color-burn",
                8: "hard-light",
                9: "soft-light",
                10: "difference",
                11: "exclusion",
                12: "hue",
                13: "saturation",
                14: "color",
                15: "luminosity"
            },
            function(t) {
                return blendModeEnums[t] || ""
            }
            ), blendModeEnums;
            function SliderEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
            }
            function AngleEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
            }
            function ColorEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 1, 0, r)
            }
            function PointEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 1, 0, r)
            }
            function LayerIndexEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
            }
            function MaskIndexEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
            }
            function CheckboxEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
            }
            function NoValueEffect() {
                this.p = {}
            }
            function EffectsManager(t, e) {
                var r, i = t.ef || [];
                this.effectElements = [];
                var n, s = i.length;
                for (r = 0; r < s; r += 1)
                    n = new GroupEffect(i[r],e),
                    this.effectElements.push(n)
            }
            function GroupEffect(t, e) {
                this.init(t, e)
            }
            function BaseElement() {}
            function FrameElement() {}
            function FootageElement(t, e, r) {
                this.initFrame(),
                this.initRenderable(),
                this.assetData = e.getAssetData(t.refId),
                this.footageData = e.imageLoader.getAsset(this.assetData),
                this.initBaseData(t, e, r)
            }
            function AudioElement(t, e, r) {
                this.initFrame(),
                this.initRenderable(),
                this.assetData = e.getAssetData(t.refId),
                this.initBaseData(t, e, r),
                this._isPlaying = !1,
                this._canPlay = !1;
                var i = this.globalData.getAssetsPath(this.assetData);
                this.audio = this.globalData.audioController.createAudio(i),
                this._currentTime = 0,
                this.globalData.audioController.addAudio(this),
                this._volumeMultiplier = 1,
                this._volume = 1,
                this._previousVolume = null,
                this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
                    _placeholder: !0
                },
                this.lv = PropertyFactory.getProp(this, t.au && t.au.lv ? t.au.lv : {
                    k: [100]
                }, 1, .01, this)
            }
            function BaseRenderer() {}
            extendPrototype([DynamicPropertyContainer], GroupEffect),
            GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties,
            GroupEffect.prototype.init = function(t, e) {
                var r;
                this.data = t,
                this.effectElements = [],
                this.initDynamicPropertyContainer(e);
                var i, n = this.data.ef.length, s = this.data.ef;
                for (r = 0; r < n; r += 1) {
                    switch (i = null,
                    s[r].ty) {
                    case 0:
                        i = new SliderEffect(s[r],e,this);
                        break;
                    case 1:
                        i = new AngleEffect(s[r],e,this);
                        break;
                    case 2:
                        i = new ColorEffect(s[r],e,this);
                        break;
                    case 3:
                        i = new PointEffect(s[r],e,this);
                        break;
                    case 4:
                    case 7:
                        i = new CheckboxEffect(s[r],e,this);
                        break;
                    case 10:
                        i = new LayerIndexEffect(s[r],e,this);
                        break;
                    case 11:
                        i = new MaskIndexEffect(s[r],e,this);
                        break;
                    case 5:
                        i = new EffectsManager(s[r],e,this);
                        break;
                    default:
                        i = new NoValueEffect(s[r],e,this)
                    }
                    i && this.effectElements.push(i)
                }
            }
            ,
            BaseElement.prototype = {
                checkMasks: function() {
                    if (!this.data.hasMask)
                        return !1;
                    for (var t = 0, e = this.data.masksProperties.length; t < e; ) {
                        if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl)
                            return !0;
                        t += 1
                    }
                    return !1
                },
                initExpressions: function() {
                    var t = getExpressionInterfaces();
                    if (t) {
                        var e = t("layer")
                          , r = t("effects")
                          , i = t("shape")
                          , n = t("text")
                          , s = t("comp");
                        this.layerInterface = e(this),
                        this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
                        var a = r.createEffectsInterface(this, this.layerInterface);
                        this.layerInterface.registerEffectsInterface(a),
                        0 === this.data.ty || this.data.xt ? this.compInterface = s(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = i(this.shapesData, this.itemsData, this.layerInterface),
                        this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = n(this),
                        this.layerInterface.text = this.layerInterface.textInterface)
                    }
                },
                setBlendMode: function() {
                    var t = getBlendMode(this.data.bm);
                    (this.baseElement || this.layerElement).style["mix-blend-mode"] = t
                },
                initBaseData: function(t, e, r) {
                    this.globalData = e,
                    this.comp = r,
                    this.data = t,
                    this.layerId = createElementID(),
                    this.data.sr || (this.data.sr = 1),
                    this.effectsManager = new EffectsManager(this.data,this,this.dynamicProperties)
                },
                getType: function() {
                    return this.type
                },
                sourceRectAtTime: function() {}
            },
            FrameElement.prototype = {
                initFrame: function() {
                    this._isFirstFrame = !1,
                    this.dynamicProperties = [],
                    this._mdf = !1
                },
                prepareProperties: function(t, e) {
                    var r, i = this.dynamicProperties.length;
                    for (r = 0; r < i; r += 1)
                        (e || this._isParent && "transform" === this.dynamicProperties[r].propType) && (this.dynamicProperties[r].getValue(),
                        this.dynamicProperties[r]._mdf && (this.globalData._mdf = !0,
                        this._mdf = !0))
                },
                addDynamicProperty: function(t) {
                    -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t)
                }
            },
            FootageElement.prototype.prepareFrame = function() {}
            ,
            extendPrototype([RenderableElement, BaseElement, FrameElement], FootageElement),
            FootageElement.prototype.getBaseElement = function() {
                return null
            }
            ,
            FootageElement.prototype.renderFrame = function() {}
            ,
            FootageElement.prototype.destroy = function() {}
            ,
            FootageElement.prototype.initExpressions = function() {
                var t = getExpressionInterfaces();
                if (t) {
                    var e = t("footage");
                    this.layerInterface = e(this)
                }
            }
            ,
            FootageElement.prototype.getFootageData = function() {
                return this.footageData
            }
            ,
            AudioElement.prototype.prepareFrame = function(t) {
                if (this.prepareRenderableFrame(t, !0),
                this.prepareProperties(t, !0),
                this.tm._placeholder)
                    this._currentTime = t / this.data.sr;
                else {
                    var e = this.tm.v;
                    this._currentTime = e
                }
                this._volume = this.lv.v[0];
                var r = this._volume * this._volumeMultiplier;
                this._previousVolume !== r && (this._previousVolume = r,
                this.audio.volume(r))
            }
            ,
            extendPrototype([RenderableElement, BaseElement, FrameElement], AudioElement),
            AudioElement.prototype.renderFrame = function() {
                this.isInRange && this._canPlay && (this._isPlaying ? (!this.audio.playing() || Math.abs(this._currentTime / this.globalData.frameRate - this.audio.seek()) > .1) && this.audio.seek(this._currentTime / this.globalData.frameRate) : (this.audio.play(),
                this.audio.seek(this._currentTime / this.globalData.frameRate),
                this._isPlaying = !0))
            }
            ,
            AudioElement.prototype.show = function() {}
            ,
            AudioElement.prototype.hide = function() {
                this.audio.pause(),
                this._isPlaying = !1
            }
            ,
            AudioElement.prototype.pause = function() {
                this.audio.pause(),
                this._isPlaying = !1,
                this._canPlay = !1
            }
            ,
            AudioElement.prototype.resume = function() {
                this._canPlay = !0
            }
            ,
            AudioElement.prototype.setRate = function(t) {
                this.audio.rate(t)
            }
            ,
            AudioElement.prototype.volume = function(t) {
                this._volumeMultiplier = t,
                this._previousVolume = t * this._volume,
                this.audio.volume(this._previousVolume)
            }
            ,
            AudioElement.prototype.getBaseElement = function() {
                return null
            }
            ,
            AudioElement.prototype.destroy = function() {}
            ,
            AudioElement.prototype.sourceRectAtTime = function() {}
            ,
            AudioElement.prototype.initExpressions = function() {}
            ,
            BaseRenderer.prototype.checkLayers = function(t) {
                var e, r, i = this.layers.length;
                for (this.completeLayers = !0,
                e = i - 1; e >= 0; e -= 1)
                    this.elements[e] || (r = this.layers[e]).ip - r.st <= t - this.layers[e].st && r.op - r.st > t - this.layers[e].st && this.buildItem(e),
                    this.completeLayers = !!this.elements[e] && this.completeLayers;
                this.checkPendingElements()
            }
            ,
            BaseRenderer.prototype.createItem = function(t) {
                switch (t.ty) {
                case 2:
                    return this.createImage(t);
                case 0:
                    return this.createComp(t);
                case 1:
                    return this.createSolid(t);
                case 3:
                default:
                    return this.createNull(t);
                case 4:
                    return this.createShape(t);
                case 5:
                    return this.createText(t);
                case 6:
                    return this.createAudio(t);
                case 13:
                    return this.createCamera(t);
                case 15:
                    return this.createFootage(t)
                }
            }
            ,
            BaseRenderer.prototype.createCamera = function() {
                throw new Error("You're using a 3d camera. Try the html renderer.")
            }
            ,
            BaseRenderer.prototype.createAudio = function(t) {
                return new AudioElement(t,this.globalData,this)
            }
            ,
            BaseRenderer.prototype.createFootage = function(t) {
                return new FootageElement(t,this.globalData,this)
            }
            ,
            BaseRenderer.prototype.buildAllItems = function() {
                var t, e = this.layers.length;
                for (t = 0; t < e; t += 1)
                    this.buildItem(t);
                this.checkPendingElements()
            }
            ,
            BaseRenderer.prototype.includeLayers = function(t) {
                var e;
                this.completeLayers = !1;
                var r, i = t.length, n = this.layers.length;
                for (e = 0; e < i; e += 1)
                    for (r = 0; r < n; ) {
                        if (this.layers[r].id === t[e].id) {
                            this.layers[r] = t[e];
                            break
                        }
                        r += 1
                    }
            }
            ,
            BaseRenderer.prototype.setProjectInterface = function(t) {
                this.globalData.projectInterface = t
            }
            ,
            BaseRenderer.prototype.initItems = function() {
                this.globalData.progressiveLoad || this.buildAllItems()
            }
            ,
            BaseRenderer.prototype.buildElementParenting = function(t, e, r) {
                for (var i = this.elements, n = this.layers, s = 0, a = n.length; s < a; )
                    n[s].ind == e && (i[s] && !0 !== i[s] ? (r.push(i[s]),
                    i[s].setAsParent(),
                    void 0 !== n[s].parent ? this.buildElementParenting(t, n[s].parent, r) : t.setHierarchy(r)) : (this.buildItem(s),
                    this.addPendingElement(t))),
                    s += 1
            }
            ,
            BaseRenderer.prototype.addPendingElement = function(t) {
                this.pendingElements.push(t)
            }
            ,
            BaseRenderer.prototype.searchExtraCompositions = function(t) {
                var e, r = t.length;
                for (e = 0; e < r; e += 1)
                    if (t[e].xt) {
                        var i = this.createComp(t[e]);
                        i.initExpressions(),
                        this.globalData.projectInterface.registerComposition(i)
                    }
            }
            ,
            BaseRenderer.prototype.getElementById = function(t) {
                var e, r = this.elements.length;
                for (e = 0; e < r; e += 1)
                    if (this.elements[e].data.ind === t)
                        return this.elements[e];
                return null
            }
            ,
            BaseRenderer.prototype.getElementByPath = function(t) {
                var e, r = t.shift();
                if ("number" == typeof r)
                    e = this.elements[r];
                else {
                    var i, n = this.elements.length;
                    for (i = 0; i < n; i += 1)
                        if (this.elements[i].data.nm === r) {
                            e = this.elements[i];
                            break
                        }
                }
                return 0 === t.length ? e : e.getElementByPath(t)
            }
            ,
            BaseRenderer.prototype.setupGlobalData = function(t, e) {
                this.globalData.fontManager = new FontManager,
                this.globalData.slotManager = slotFactory(t),
                this.globalData.fontManager.addChars(t.chars),
                this.globalData.fontManager.addFonts(t.fonts, e),
                this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem),
                this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem),
                this.globalData.imageLoader = this.animationItem.imagePreloader,
                this.globalData.audioController = this.animationItem.audioController,
                this.globalData.frameId = 0,
                this.globalData.frameRate = t.fr,
                this.globalData.nm = t.nm,
                this.globalData.compSize = {
                    w: t.w,
                    h: t.h
                }
            }
            ;
            var effectTypes = {
                TRANSFORM_EFFECT: "transformEFfect"
            };
            function TransformElement() {}
            function MaskElement(t, e, r) {
                this.data = t,
                this.element = e,
                this.globalData = r,
                this.storedData = [],
                this.masksProperties = this.data.masksProperties || [],
                this.maskElement = null;
                var i, n, s = this.globalData.defs, a = this.masksProperties ? this.masksProperties.length : 0;
                this.viewData = createSizedArray(a),
                this.solidPath = "";
                var o, h, l, p, c, f, u = this.masksProperties, d = 0, m = [], g = createElementID(), y = "clipPath", v = "clip-path";
                for (i = 0; i < a; i += 1)
                    if (("a" !== u[i].mode && "n" !== u[i].mode || u[i].inv || 100 !== u[i].o.k || u[i].o.x) && (y = "mask",
                    v = "mask"),
                    "s" !== u[i].mode && "i" !== u[i].mode || 0 !== d ? l = null : ((l = createNS("rect")).setAttribute("fill", "#ffffff"),
                    l.setAttribute("width", this.element.comp.data.w || 0),
                    l.setAttribute("height", this.element.comp.data.h || 0),
                    m.push(l)),
                    n = createNS("path"),
                    "n" === u[i].mode)
                        this.viewData[i] = {
                            op: PropertyFactory.getProp(this.element, u[i].o, 0, .01, this.element),
                            prop: ShapePropertyFactory.getShapeProp(this.element, u[i], 3),
                            elem: n,
                            lastPath: ""
                        },
                        s.appendChild(n);
                    else {
                        var _;
                        if (d += 1,
                        n.setAttribute("fill", "s" === u[i].mode ? "#000000" : "#ffffff"),
                        n.setAttribute("clip-rule", "nonzero"),
                        0 !== u[i].x.k ? (y = "mask",
                        v = "mask",
                        f = PropertyFactory.getProp(this.element, u[i].x, 0, null, this.element),
                        _ = createElementID(),
                        (p = createNS("filter")).setAttribute("id", _),
                        (c = createNS("feMorphology")).setAttribute("operator", "erode"),
                        c.setAttribute("in", "SourceGraphic"),
                        c.setAttribute("radius", "0"),
                        p.appendChild(c),
                        s.appendChild(p),
                        n.setAttribute("stroke", "s" === u[i].mode ? "#000000" : "#ffffff")) : (c = null,
                        f = null),
                        this.storedData[i] = {
                            elem: n,
                            x: f,
                            expan: c,
                            lastPath: "",
                            lastOperator: "",
                            filterId: _,
                            lastRadius: 0
                        },
                        "i" === u[i].mode) {
                            h = m.length;
                            var b = createNS("g");
                            for (o = 0; o < h; o += 1)
                                b.appendChild(m[o]);
                            var x = createNS("mask");
                            x.setAttribute("mask-type", "alpha"),
                            x.setAttribute("id", g + "_" + d),
                            x.appendChild(n),
                            s.appendChild(x),
                            b.setAttribute("mask", "url(" + getLocationHref() + "#" + g + "_" + d + ")"),
                            m.length = 0,
                            m.push(b)
                        } else
                            m.push(n);
                        u[i].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()),
                        this.viewData[i] = {
                            elem: n,
                            lastPath: "",
                            op: PropertyFactory.getProp(this.element, u[i].o, 0, .01, this.element),
                            prop: ShapePropertyFactory.getShapeProp(this.element, u[i], 3),
                            invRect: l
                        },
                        this.viewData[i].prop.k || this.drawPath(u[i], this.viewData[i].prop.v, this.viewData[i])
                    }
                for (this.maskElement = createNS(y),
                a = m.length,
                i = 0; i < a; i += 1)
                    this.maskElement.appendChild(m[i]);
                d > 0 && (this.maskElement.setAttribute("id", g),
                this.element.maskedElement.setAttribute(v, "url(" + getLocationHref() + "#" + g + ")"),
                s.appendChild(this.maskElement)),
                this.viewData.length && this.element.addRenderableComponent(this)
            }
            TransformElement.prototype = {
                initTransform: function() {
                    var t = new Matrix;
                    this.finalTransform = {
                        mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {
                            o: 0
                        },
                        _matMdf: !1,
                        _localMatMdf: !1,
                        _opMdf: !1,
                        mat: t,
                        localMat: t,
                        localOpacity: 1
                    },
                    this.data.ao && (this.finalTransform.mProp.autoOriented = !0),
                    this.data.ty
                },
                renderTransform: function() {
                    if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame,
                    this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame,
                    this.hierarchy) {
                        var t, e = this.finalTransform.mat, r = 0, i = this.hierarchy.length;
                        if (!this.finalTransform._matMdf)
                            for (; r < i; ) {
                                if (this.hierarchy[r].finalTransform.mProp._mdf) {
                                    this.finalTransform._matMdf = !0;
                                    break
                                }
                                r += 1
                            }
                        if (this.finalTransform._matMdf)
                            for (t = this.finalTransform.mProp.v.props,
                            e.cloneFromProps(t),
                            r = 0; r < i; r += 1)
                                e.multiply(this.hierarchy[r].finalTransform.mProp.v)
                    }
                    this.finalTransform._matMdf && (this.finalTransform._localMatMdf = this.finalTransform._matMdf),
                    this.finalTransform._opMdf && (this.finalTransform.localOpacity = this.finalTransform.mProp.o.v)
                },
                renderLocalTransform: function() {
                    if (this.localTransforms) {
                        var t = 0
                          , e = this.localTransforms.length;
                        if (this.finalTransform._localMatMdf = this.finalTransform._matMdf,
                        !this.finalTransform._localMatMdf || !this.finalTransform._opMdf)
                            for (; t < e; )
                                this.localTransforms[t]._mdf && (this.finalTransform._localMatMdf = !0),
                                this.localTransforms[t]._opMdf && !this.finalTransform._opMdf && (this.finalTransform.localOpacity = this.finalTransform.mProp.o.v,
                                this.finalTransform._opMdf = !0),
                                t += 1;
                        if (this.finalTransform._localMatMdf) {
                            var r = this.finalTransform.localMat;
                            for (this.localTransforms[0].matrix.clone(r),
                            t = 1; t < e; t += 1) {
                                var i = this.localTransforms[t].matrix;
                                r.multiply(i)
                            }
                            r.multiply(this.finalTransform.mat)
                        }
                        if (this.finalTransform._opMdf) {
                            var n = this.finalTransform.localOpacity;
                            for (t = 0; t < e; t += 1)
                                n *= .01 * this.localTransforms[t].opacity;
                            this.finalTransform.localOpacity = n
                        }
                    }
                },
                searchEffectTransforms: function() {
                    if (this.renderableEffectsManager) {
                        var t = this.renderableEffectsManager.getEffects(effectTypes.TRANSFORM_EFFECT);
                        if (t.length) {
                            this.localTransforms = [],
                            this.finalTransform.localMat = new Matrix;
                            var e = 0
                              , r = t.length;
                            for (e = 0; e < r; e += 1)
                                this.localTransforms.push(t[e])
                        }
                    }
                },
                globalToLocal: function(t) {
                    var e = [];
                    e.push(this.finalTransform);
                    for (var r, i = !0, n = this.comp; i; )
                        n.finalTransform ? (n.data.hasMask && e.splice(0, 0, n.finalTransform),
                        n = n.comp) : i = !1;
                    var s, a = e.length;
                    for (r = 0; r < a; r += 1)
                        s = e[r].mat.applyToPointArray(0, 0, 0),
                        t = [t[0] - s[0], t[1] - s[1], 0];
                    return t
                },
                mHelper: new Matrix
            },
            MaskElement.prototype.getMaskProperty = function(t) {
                return this.viewData[t].prop
            }
            ,
            MaskElement.prototype.renderFrame = function(t) {
                var e, r = this.element.finalTransform.mat, i = this.masksProperties.length;
                for (e = 0; e < i; e += 1)
                    if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]),
                    (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v),
                    "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && this.viewData[e].invRect.setAttribute("transform", r.getInverseMatrix().to2dCSS()),
                    this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
                        var n = this.storedData[e].expan;
                        this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode",
                        this.storedData[e].elem.setAttribute("filter", "url(" + getLocationHref() + "#" + this.storedData[e].filterId + ")")),
                        n.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate",
                        this.storedData[e].elem.setAttribute("filter", null)),
                        this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v))
                    }
            }
            ,
            MaskElement.prototype.getMaskelement = function() {
                return this.maskElement
            }
            ,
            MaskElement.prototype.createLayerSolidPath = function() {
                var t = "M0,0 ";
                return t += " h" + this.globalData.compSize.w,
                t += " v" + this.globalData.compSize.h,
                (t += " h-" + this.globalData.compSize.w) + " v-" + this.globalData.compSize.h + " "
            }
            ,
            MaskElement.prototype.drawPath = function(t, e, r) {
                var i, n, s = " M" + e.v[0][0] + "," + e.v[0][1];
                for (n = e._length,
                i = 1; i < n; i += 1)
                    s += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[i][0] + "," + e.i[i][1] + " " + e.v[i][0] + "," + e.v[i][1];
                if (e.c && n > 1 && (s += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]),
                r.lastPath !== s) {
                    var a = "";
                    r.elem && (e.c && (a = t.inv ? this.solidPath + s : s),
                    r.elem.setAttribute("d", a)),
                    r.lastPath = s
                }
            }
            ,
            MaskElement.prototype.destroy = function() {
                this.element = null,
                this.globalData = null,
                this.maskElement = null,
                this.data = null,
                this.masksProperties = null
            }
            ;
            var filtersFactory = {
                createFilter: function(t, e) {
                    var r = createNS("filter");
                    return r.setAttribute("id", t),
                    !0 !== e && (r.setAttribute("filterUnits", "objectBoundingBox"),
                    r.setAttribute("x", "0%"),
                    r.setAttribute("y", "0%"),
                    r.setAttribute("width", "100%"),
                    r.setAttribute("height", "100%")),
                    r
                },
                createAlphaToLuminanceFilter: function() {
                    var t = createNS("feColorMatrix");
                    return t.setAttribute("type", "matrix"),
                    t.setAttribute("color-interpolation-filters", "sRGB"),
                    t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"),
                    t
                }
            }
              , featureSupport = function() {
                var t = {
                    maskType: !0,
                    svgLumaHidden: !0,
                    offscreenCanvas: "undefined" != typeof OffscreenCanvas
                };
                return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t.maskType = !1),
                /firefox/i.test(navigator.userAgent) && (t.svgLumaHidden = !1),
                t
            }()
              , registeredEffects$1 = {}
              , idPrefix = "filter_result_";
            function SVGEffects(t) {
                var e, r, i = "SourceGraphic", n = t.data.ef ? t.data.ef.length : 0, s = createElementID(), a = filtersFactory.createFilter(s, !0), o = 0;
                for (this.filters = [],
                e = 0; e < n; e += 1) {
                    r = null;
                    var h = t.data.ef[e].ty;
                    registeredEffects$1[h] && (r = new (0,
                    registeredEffects$1[h].effect)(a,t.effectsManager.effectElements[e],t,idPrefix + o,i),
                    i = idPrefix + o,
                    registeredEffects$1[h].countsAsEffect && (o += 1)),
                    r && this.filters.push(r)
                }
                o && (t.globalData.defs.appendChild(a),
                t.layerElement.setAttribute("filter", "url(" + getLocationHref() + "#" + s + ")")),
                this.filters.length && t.addRenderableComponent(this)
            }
            function registerEffect$1(t, e, r) {
                registeredEffects$1[t] = {
                    effect: e,
                    countsAsEffect: r
                }
            }
            function SVGBaseElement() {}
            function HierarchyElement() {}
            function RenderableDOMElement() {}
            function IImageElement(t, e, r) {
                this.assetData = e.getAssetData(t.refId),
                this.assetData && this.assetData.sid && (this.assetData = e.slotManager.getProp(this.assetData)),
                this.initElement(t, e, r),
                this.sourceRect = {
                    top: 0,
                    left: 0,
                    width: this.assetData.w,
                    height: this.assetData.h
                }
            }
            function ProcessedElement(t, e) {
                this.elem = t,
                this.pos = e
            }
            function IShapeElement() {}
            SVGEffects.prototype.renderFrame = function(t) {
                var e, r = this.filters.length;
                for (e = 0; e < r; e += 1)
                    this.filters[e].renderFrame(t)
            }
            ,
            SVGEffects.prototype.getEffects = function(t) {
                var e, r = this.filters.length, i = [];
                for (e = 0; e < r; e += 1)
                    this.filters[e].type === t && i.push(this.filters[e]);
                return i
            }
            ,
            SVGBaseElement.prototype = {
                initRendererElement: function() {
                    this.layerElement = createNS("g")
                },
                createContainerElements: function() {
                    this.matteElement = createNS("g"),
                    this.transformedElement = this.layerElement,
                    this.maskedElement = this.layerElement,
                    this._sizeChanged = !1;
                    var t = null;
                    if (this.data.td) {
                        this.matteMasks = {};
                        var e = createNS("g");
                        e.setAttribute("id", this.layerId),
                        e.appendChild(this.layerElement),
                        t = e,
                        this.globalData.defs.appendChild(e)
                    } else
                        this.data.tt ? (this.matteElement.appendChild(this.layerElement),
                        t = this.matteElement,
                        this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
                    if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln),
                    this.data.cl && this.layerElement.setAttribute("class", this.data.cl),
                    0 === this.data.ty && !this.data.hd) {
                        var r = createNS("clipPath")
                          , i = createNS("path");
                        i.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
                        var n = createElementID();
                        if (r.setAttribute("id", n),
                        r.appendChild(i),
                        this.globalData.defs.appendChild(r),
                        this.checkMasks()) {
                            var s = createNS("g");
                            s.setAttribute("clip-path", "url(" + getLocationHref() + "#" + n + ")"),
                            s.appendChild(this.layerElement),
                            this.transformedElement = s,
                            t ? t.appendChild(this.transformedElement) : this.baseElement = this.transformedElement
                        } else
                            this.layerElement.setAttribute("clip-path", "url(" + getLocationHref() + "#" + n + ")")
                    }
                    0 !== this.data.bm && this.setBlendMode()
                },
                renderElement: function() {
                    this.finalTransform._localMatMdf && this.transformedElement.setAttribute("transform", this.finalTransform.localMat.to2dCSS()),
                    this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.localOpacity)
                },
                destroyBaseElement: function() {
                    this.layerElement = null,
                    this.matteElement = null,
                    this.maskManager.destroy()
                },
                getBaseElement: function() {
                    return this.data.hd ? null : this.baseElement
                },
                createRenderableComponents: function() {
                    this.maskManager = new MaskElement(this.data,this,this.globalData),
                    this.renderableEffectsManager = new SVGEffects(this),
                    this.searchEffectTransforms()
                },
                getMatte: function(t) {
                    if (this.matteMasks || (this.matteMasks = {}),
                    !this.matteMasks[t]) {
                        var e, r, i, n, s = this.layerId + "_" + t;
                        if (1 === t || 3 === t) {
                            var a = createNS("mask");
                            a.setAttribute("id", s),
                            a.setAttribute("mask-type", 3 === t ? "luminance" : "alpha"),
                            (i = createNS("use")).setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + this.layerId),
                            a.appendChild(i),
                            this.globalData.defs.appendChild(a),
                            featureSupport.maskType || 1 !== t || (a.setAttribute("mask-type", "luminance"),
                            e = createElementID(),
                            r = filtersFactory.createFilter(e),
                            this.globalData.defs.appendChild(r),
                            r.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                            (n = createNS("g")).appendChild(i),
                            a.appendChild(n),
                            n.setAttribute("filter", "url(" + getLocationHref() + "#" + e + ")"))
                        } else if (2 === t) {
                            var o = createNS("mask");
                            o.setAttribute("id", s),
                            o.setAttribute("mask-type", "alpha");
                            var h = createNS("g");
                            o.appendChild(h),
                            e = createElementID(),
                            r = filtersFactory.createFilter(e);
                            var l = createNS("feComponentTransfer");
                            l.setAttribute("in", "SourceGraphic"),
                            r.appendChild(l);
                            var p = createNS("feFuncA");
                            p.setAttribute("type", "table"),
                            p.setAttribute("tableValues", "1.0 0.0"),
                            l.appendChild(p),
                            this.globalData.defs.appendChild(r);
                            var c = createNS("rect");
                            c.setAttribute("width", this.comp.data.w),
                            c.setAttribute("height", this.comp.data.h),
                            c.setAttribute("x", "0"),
                            c.setAttribute("y", "0"),
                            c.setAttribute("fill", "#ffffff"),
                            c.setAttribute("opacity", "0"),
                            h.setAttribute("filter", "url(" + getLocationHref() + "#" + e + ")"),
                            h.appendChild(c),
                            (i = createNS("use")).setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + this.layerId),
                            h.appendChild(i),
                            featureSupport.maskType || (o.setAttribute("mask-type", "luminance"),
                            r.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                            n = createNS("g"),
                            h.appendChild(c),
                            n.appendChild(this.layerElement),
                            h.appendChild(n)),
                            this.globalData.defs.appendChild(o)
                        }
                        this.matteMasks[t] = s
                    }
                    return this.matteMasks[t]
                },
                setMatte: function(t) {
                    this.matteElement && this.matteElement.setAttribute("mask", "url(" + getLocationHref() + "#" + t + ")")
                }
            },
            HierarchyElement.prototype = {
                initHierarchy: function() {
                    this.hierarchy = [],
                    this._isParent = !1,
                    this.checkParenting()
                },
                setHierarchy: function(t) {
                    this.hierarchy = t
                },
                setAsParent: function() {
                    this._isParent = !0
                },
                checkParenting: function() {
                    void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, [])
                }
            },
            extendPrototype([RenderableElement, createProxyFunction({
                initElement: function(t, e, r) {
                    this.initFrame(),
                    this.initBaseData(t, e, r),
                    this.initTransform(t, e, r),
                    this.initHierarchy(),
                    this.initRenderable(),
                    this.initRendererElement(),
                    this.createContainerElements(),
                    this.createRenderableComponents(),
                    this.createContent(),
                    this.hide()
                },
                hide: function() {
                    this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none",
                    this.hidden = !0)
                },
                show: function() {
                    this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"),
                    this.hidden = !1,
                    this._isFirstFrame = !0)
                },
                renderFrame: function() {
                    this.data.hd || this.hidden || (this.renderTransform(),
                    this.renderRenderable(),
                    this.renderLocalTransform(),
                    this.renderElement(),
                    this.renderInnerContent(),
                    this._isFirstFrame && (this._isFirstFrame = !1))
                },
                renderInnerContent: function() {},
                prepareFrame: function(t) {
                    this._mdf = !1,
                    this.prepareRenderableFrame(t),
                    this.prepareProperties(t, this.isInRange),
                    this.checkTransparency()
                },
                destroy: function() {
                    this.innerElem = null,
                    this.destroyBaseElement()
                }
            })], RenderableDOMElement),
            extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement),
            IImageElement.prototype.createContent = function() {
                var t = this.globalData.getAssetsPath(this.assetData);
                this.innerElem = createNS("image"),
                this.innerElem.setAttribute("width", this.assetData.w + "px"),
                this.innerElem.setAttribute("height", this.assetData.h + "px"),
                this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio),
                this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t),
                this.layerElement.appendChild(this.innerElem)
            }
            ,
            IImageElement.prototype.sourceRectAtTime = function() {
                return this.sourceRect
            }
            ,
            IShapeElement.prototype = {
                addShapeToModifiers: function(t) {
                    var e, r = this.shapeModifiers.length;
                    for (e = 0; e < r; e += 1)
                        this.shapeModifiers[e].addShape(t)
                },
                isShapeInAnimatedModifiers: function(t) {
                    for (var e = this.shapeModifiers.length; 0 < e; )
                        if (this.shapeModifiers[0].isAnimatedWithShape(t))
                            return !0;
                    return !1
                },
                renderModifiers: function() {
                    if (this.shapeModifiers.length) {
                        var t, e = this.shapes.length;
                        for (t = 0; t < e; t += 1)
                            this.shapes[t].sh.reset();
                        for (t = (e = this.shapeModifiers.length) - 1; t >= 0 && !this.shapeModifiers[t].processShapes(this._isFirstFrame); t -= 1)
                            ;
                    }
                },
                searchProcessedElement: function(t) {
                    for (var e = this.processedElements, r = 0, i = e.length; r < i; ) {
                        if (e[r].elem === t)
                            return e[r].pos;
                        r += 1
                    }
                    return 0
                },
                addProcessedElement: function(t, e) {
                    for (var r = this.processedElements, i = r.length; i; )
                        if (r[i -= 1].elem === t)
                            return void (r[i].pos = e);
                    r.push(new ProcessedElement(t,e))
                },
                prepareFrame: function(t) {
                    this.prepareRenderableFrame(t),
                    this.prepareProperties(t, this.isInRange)
                }
            };
            var lineCapEnum = {
                1: "butt",
                2: "round",
                3: "square"
            }
              , lineJoinEnum = {
                1: "miter",
                2: "round",
                3: "bevel"
            };
            function SVGShapeData(t, e, r) {
                this.caches = [],
                this.styles = [],
                this.transformers = t,
                this.lStr = "",
                this.sh = r,
                this.lvl = e,
                this._isAnimated = !!r.k;
                for (var i = 0, n = t.length; i < n; ) {
                    if (t[i].mProps.dynamicProperties.length) {
                        this._isAnimated = !0;
                        break
                    }
                    i += 1
                }
            }
            function SVGStyleData(t, e) {
                this.data = t,
                this.type = t.ty,
                this.d = "",
                this.lvl = e,
                this._mdf = !1,
                this.closed = !0 === t.hd,
                this.pElem = createNS("path"),
                this.msElem = null
            }
            function DashProperty(t, e, r, i) {
                var n;
                this.elem = t,
                this.frameId = -1,
                this.dataProps = createSizedArray(e.length),
                this.renderer = r,
                this.k = !1,
                this.dashStr = "",
                this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0),
                this.dashoffset = createTypedArray("float32", 1),
                this.initDynamicPropertyContainer(i);
                var s, a = e.length || 0;
                for (n = 0; n < a; n += 1)
                    s = PropertyFactory.getProp(t, e[n].v, 0, 0, this),
                    this.k = s.k || this.k,
                    this.dataProps[n] = {
                        n: e[n].n,
                        p: s
                    };
                this.k || this.getValue(!0),
                this._isAnimated = this.k
            }
            function SVGStrokeStyleData(t, e, r) {
                this.initDynamicPropertyContainer(t),
                this.getValue = this.iterateDynamicProperties,
                this.o = PropertyFactory.getProp(t, e.o, 0, .01, this),
                this.w = PropertyFactory.getProp(t, e.w, 0, null, this),
                this.d = new DashProperty(t,e.d || {},"svg",this),
                this.c = PropertyFactory.getProp(t, e.c, 1, 255, this),
                this.style = r,
                this._isAnimated = !!this._isAnimated
            }
            function SVGFillStyleData(t, e, r) {
                this.initDynamicPropertyContainer(t),
                this.getValue = this.iterateDynamicProperties,
                this.o = PropertyFactory.getProp(t, e.o, 0, .01, this),
                this.c = PropertyFactory.getProp(t, e.c, 1, 255, this),
                this.style = r
            }
            function SVGNoStyleData(t, e, r) {
                this.initDynamicPropertyContainer(t),
                this.getValue = this.iterateDynamicProperties,
                this.style = r
            }
            function GradientProperty(t, e, r) {
                this.data = e,
                this.c = createTypedArray("uint8c", 4 * e.p);
                var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
                this.o = createTypedArray("float32", i),
                this._cmdf = !1,
                this._omdf = !1,
                this._collapsable = this.checkCollapsable(),
                this._hasOpacity = i,
                this.initDynamicPropertyContainer(r),
                this.prop = PropertyFactory.getProp(t, e.k, 1, null, this),
                this.k = this.prop.k,
                this.getValue(!0)
            }
            function SVGGradientFillStyleData(t, e, r) {
                this.initDynamicPropertyContainer(t),
                this.getValue = this.iterateDynamicProperties,
                this.initGradientData(t, e, r)
            }
            function SVGGradientStrokeStyleData(t, e, r) {
                this.initDynamicPropertyContainer(t),
                this.getValue = this.iterateDynamicProperties,
                this.w = PropertyFactory.getProp(t, e.w, 0, null, this),
                this.d = new DashProperty(t,e.d || {},"svg",this),
                this.initGradientData(t, e, r),
                this._isAnimated = !!this._isAnimated
            }
            function ShapeGroupData() {
                this.it = [],
                this.prevViewData = [],
                this.gr = createNS("g")
            }
            function SVGTransformData(t, e, r) {
                this.transform = {
                    mProps: t,
                    op: e,
                    container: r
                },
                this.elements = [],
                this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length
            }
            SVGShapeData.prototype.setAsAnimated = function() {
                this._isAnimated = !0
            }
            ,
            SVGStyleData.prototype.reset = function() {
                this.d = "",
                this._mdf = !1
            }
            ,
            DashProperty.prototype.getValue = function(t) {
                if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId,
                this.iterateDynamicProperties(),
                this._mdf = this._mdf || t,
                this._mdf)) {
                    var e = 0
                      , r = this.dataProps.length;
                    for ("svg" === this.renderer && (this.dashStr = ""),
                    e = 0; e < r; e += 1)
                        "o" !== this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v
                }
            }
            ,
            extendPrototype([DynamicPropertyContainer], DashProperty),
            extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData),
            extendPrototype([DynamicPropertyContainer], SVGFillStyleData),
            extendPrototype([DynamicPropertyContainer], SVGNoStyleData),
            GradientProperty.prototype.comparePoints = function(t, e) {
                for (var r = 0, i = this.o.length / 2; r < i; ) {
                    if (Math.abs(t[4 * r] - t[4 * e + 2 * r]) > .01)
                        return !1;
                    r += 1
                }
                return !0
            }
            ,
            GradientProperty.prototype.checkCollapsable = function() {
                if (this.o.length / 2 != this.c.length / 4)
                    return !1;
                if (this.data.k.k[0].s)
                    for (var t = 0, e = this.data.k.k.length; t < e; ) {
                        if (!this.comparePoints(this.data.k.k[t].s, this.data.p))
                            return !1;
                        t += 1
                    }
                else if (!this.comparePoints(this.data.k.k, this.data.p))
                    return !1;
                return !0
            }
            ,
            GradientProperty.prototype.getValue = function(t) {
                if (this.prop.getValue(),
                this._mdf = !1,
                this._cmdf = !1,
                this._omdf = !1,
                this.prop._mdf || t) {
                    var e, r, i, n = 4 * this.data.p;
                    for (e = 0; e < n; e += 1)
                        r = e % 4 == 0 ? 100 : 255,
                        i = Math.round(this.prop.v[e] * r),
                        this.c[e] !== i && (this.c[e] = i,
                        this._cmdf = !t);
                    if (this.o.length)
                        for (n = this.prop.v.length,
                        e = 4 * this.data.p; e < n; e += 1)
                            r = e % 2 == 0 ? 100 : 1,
                            i = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e],
                            this.o[e - 4 * this.data.p] !== i && (this.o[e - 4 * this.data.p] = i,
                            this._omdf = !t);
                    this._mdf = !t
                }
            }
            ,
            extendPrototype([DynamicPropertyContainer], GradientProperty),
            SVGGradientFillStyleData.prototype.initGradientData = function(t, e, r) {
                this.o = PropertyFactory.getProp(t, e.o, 0, .01, this),
                this.s = PropertyFactory.getProp(t, e.s, 1, null, this),
                this.e = PropertyFactory.getProp(t, e.e, 1, null, this),
                this.h = PropertyFactory.getProp(t, e.h || {
                    k: 0
                }, 0, .01, this),
                this.a = PropertyFactory.getProp(t, e.a || {
                    k: 0
                }, 0, degToRads, this),
                this.g = new GradientProperty(t,e.g,this),
                this.style = r,
                this.stops = [],
                this.setGradientData(r.pElem, e),
                this.setGradientOpacity(e, r),
                this._isAnimated = !!this._isAnimated
            }
            ,
            SVGGradientFillStyleData.prototype.setGradientData = function(t, e) {
                var r = createElementID()
                  , i = createNS(1 === e.t ? "linearGradient" : "radialGradient");
                i.setAttribute("id", r),
                i.setAttribute("spreadMethod", "pad"),
                i.setAttribute("gradientUnits", "userSpaceOnUse");
                var n, s, a, o = [];
                for (a = 4 * e.g.p,
                s = 0; s < a; s += 4)
                    n = createNS("stop"),
                    i.appendChild(n),
                    o.push(n);
                t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(" + getLocationHref() + "#" + r + ")"),
                this.gf = i,
                this.cst = o
            }
            ,
            SVGGradientFillStyleData.prototype.setGradientOpacity = function(t, e) {
                if (this.g._hasOpacity && !this.g._collapsable) {
                    var r, i, n, s = createNS("mask"), a = createNS("path");
                    s.appendChild(a);
                    var o = createElementID()
                      , h = createElementID();
                    s.setAttribute("id", h);
                    var l = createNS(1 === t.t ? "linearGradient" : "radialGradient");
                    l.setAttribute("id", o),
                    l.setAttribute("spreadMethod", "pad"),
                    l.setAttribute("gradientUnits", "userSpaceOnUse"),
                    n = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
                    var p = this.stops;
                    for (i = 4 * t.g.p; i < n; i += 2)
                        (r = createNS("stop")).setAttribute("stop-color", "rgb(255,255,255)"),
                        l.appendChild(r),
                        p.push(r);
                    a.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(" + getLocationHref() + "#" + o + ")"),
                    "gs" === t.ty && (a.setAttribute("stroke-linecap", lineCapEnum[t.lc || 2]),
                    a.setAttribute("stroke-linejoin", lineJoinEnum[t.lj || 2]),
                    1 === t.lj && a.setAttribute("stroke-miterlimit", t.ml)),
                    this.of = l,
                    this.ms = s,
                    this.ost = p,
                    this.maskId = h,
                    e.msElem = a
                }
            }
            ,
            extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData),
            extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
            var buildShapeString = function(t, e, r, i) {
                if (0 === e)
                    return "";
                var n, s = t.o, a = t.i, o = t.v, h = " M" + i.applyToPointStringified(o[0][0], o[0][1]);
                for (n = 1; n < e; n += 1)
                    h += " C" + i.applyToPointStringified(s[n - 1][0], s[n - 1][1]) + " " + i.applyToPointStringified(a[n][0], a[n][1]) + " " + i.applyToPointStringified(o[n][0], o[n][1]);
                return r && e && (h += " C" + i.applyToPointStringified(s[n - 1][0], s[n - 1][1]) + " " + i.applyToPointStringified(a[0][0], a[0][1]) + " " + i.applyToPointStringified(o[0][0], o[0][1]),
                h += "z"),
                h
            }
              , SVGElementsRenderer = function() {
                var t = new Matrix
                  , e = new Matrix;
                function r(t, e, r) {
                    (r || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v),
                    (r || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS())
                }
                function i() {}
                function n(r, i, n) {
                    var s, a, o, h, l, p, c, f, u, d, m = i.styles.length, g = i.lvl;
                    for (p = 0; p < m; p += 1) {
                        if (h = i.sh._mdf || n,
                        i.styles[p].lvl < g) {
                            for (f = e.reset(),
                            u = g - i.styles[p].lvl,
                            d = i.transformers.length - 1; !h && u > 0; )
                                h = i.transformers[d].mProps._mdf || h,
                                u -= 1,
                                d -= 1;
                            if (h)
                                for (u = g - i.styles[p].lvl,
                                d = i.transformers.length - 1; u > 0; )
                                    f.multiply(i.transformers[d].mProps.v),
                                    u -= 1,
                                    d -= 1
                        } else
                            f = t;
                        if (a = (c = i.sh.paths)._length,
                        h) {
                            for (o = "",
                            s = 0; s < a; s += 1)
                                (l = c.shapes[s]) && l._length && (o += buildShapeString(l, l._length, l.c, f));
                            i.caches[p] = o
                        } else
                            o = i.caches[p];
                        i.styles[p].d += !0 === r.hd ? "" : o,
                        i.styles[p]._mdf = h || i.styles[p]._mdf
                    }
                }
                function s(t, e, r) {
                    var i = e.style;
                    (e.c._mdf || r) && i.pElem.setAttribute("fill", "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"),
                    (e.o._mdf || r) && i.pElem.setAttribute("fill-opacity", e.o.v)
                }
                function a(t, e, r) {
                    o(t, e, r),
                    h(0, e, r)
                }
                function o(t, e, r) {
                    var i, n, s, a, o, h = e.gf, l = e.g._hasOpacity, p = e.s.v, c = e.e.v;
                    if (e.o._mdf || r) {
                        var f = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
                        e.style.pElem.setAttribute(f, e.o.v)
                    }
                    if (e.s._mdf || r) {
                        var u = 1 === t.t ? "x1" : "cx"
                          , d = "x1" === u ? "y1" : "cy";
                        h.setAttribute(u, p[0]),
                        h.setAttribute(d, p[1]),
                        l && !e.g._collapsable && (e.of.setAttribute(u, p[0]),
                        e.of.setAttribute(d, p[1]))
                    }
                    if (e.g._cmdf || r) {
                        i = e.cst;
                        var m = e.g.c;
                        for (s = i.length,
                        n = 0; n < s; n += 1)
                            (a = i[n]).setAttribute("offset", m[4 * n] + "%"),
                            a.setAttribute("stop-color", "rgb(" + m[4 * n + 1] + "," + m[4 * n + 2] + "," + m[4 * n + 3] + ")")
                    }
                    if (l && (e.g._omdf || r)) {
                        var g = e.g.o;
                        for (s = (i = e.g._collapsable ? e.cst : e.ost).length,
                        n = 0; n < s; n += 1)
                            a = i[n],
                            e.g._collapsable || a.setAttribute("offset", g[2 * n] + "%"),
                            a.setAttribute("stop-opacity", g[2 * n + 1])
                    }
                    if (1 === t.t)
                        (e.e._mdf || r) && (h.setAttribute("x2", c[0]),
                        h.setAttribute("y2", c[1]),
                        l && !e.g._collapsable && (e.of.setAttribute("x2", c[0]),
                        e.of.setAttribute("y2", c[1])));
                    else if ((e.s._mdf || e.e._mdf || r) && (o = Math.sqrt(Math.pow(p[0] - c[0], 2) + Math.pow(p[1] - c[1], 2)),
                    h.setAttribute("r", o),
                    l && !e.g._collapsable && e.of.setAttribute("r", o)),
                    e.e._mdf || e.h._mdf || e.a._mdf || r) {
                        o || (o = Math.sqrt(Math.pow(p[0] - c[0], 2) + Math.pow(p[1] - c[1], 2)));
                        var y = Math.atan2(c[1] - p[1], c[0] - p[0])
                          , v = e.h.v;
                        v >= 1 ? v = .99 : v <= -1 && (v = -.99);
                        var _ = o * v
                          , b = Math.cos(y + e.a.v) * _ + p[0]
                          , x = Math.sin(y + e.a.v) * _ + p[1];
                        h.setAttribute("fx", b),
                        h.setAttribute("fy", x),
                        l && !e.g._collapsable && (e.of.setAttribute("fx", b),
                        e.of.setAttribute("fy", x))
                    }
                }
                function h(t, e, r) {
                    var i = e.style
                      , n = e.d;
                    n && (n._mdf || r) && n.dashStr && (i.pElem.setAttribute("stroke-dasharray", n.dashStr),
                    i.pElem.setAttribute("stroke-dashoffset", n.dashoffset[0])),
                    e.c && (e.c._mdf || r) && i.pElem.setAttribute("stroke", "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"),
                    (e.o._mdf || r) && i.pElem.setAttribute("stroke-opacity", e.o.v),
                    (e.w._mdf || r) && (i.pElem.setAttribute("stroke-width", e.w.v),
                    i.msElem && i.msElem.setAttribute("stroke-width", e.w.v))
                }
                return {
                    createRenderFunction: function(t) {
                        switch (t.ty) {
                        case "fl":
                            return s;
                        case "gf":
                            return o;
                        case "gs":
                            return a;
                        case "st":
                            return h;
                        case "sh":
                        case "el":
                        case "rc":
                        case "sr":
                            return n;
                        case "tr":
                            return r;
                        case "no":
                            return i;
                        default:
                            return null
                        }
                    }
                }
            }();
            function SVGShapeElement(t, e, r) {
                this.shapes = [],
                this.shapesData = t.shapes,
                this.stylesList = [],
                this.shapeModifiers = [],
                this.itemsData = [],
                this.processedElements = [],
                this.animatedContents = [],
                this.initElement(t, e, r),
                this.prevViewData = []
            }
            function LetterProps(t, e, r, i, n, s) {
                this.o = t,
                this.sw = e,
                this.sc = r,
                this.fc = i,
                this.m = n,
                this.p = s,
                this._mdf = {
                    o: !0,
                    sw: !!e,
                    sc: !!r,
                    fc: !!i,
                    m: !0,
                    p: !0
                }
            }
            function TextProperty(t, e) {
                this._frameId = initialDefaultFrame,
                this.pv = "",
                this.v = "",
                this.kf = !1,
                this._isFirstFrame = !0,
                this._mdf = !1,
                e.d && e.d.sid && (e.d = t.globalData.slotManager.getProp(e.d)),
                this.data = e,
                this.elem = t,
                this.comp = this.elem.comp,
                this.keysIndex = 0,
                this.canResize = !1,
                this.minimumFontSize = 1,
                this.effectsSequence = [],
                this.currentData = {
                    ascent: 0,
                    boxWidth: this.defaultBoxWidth,
                    f: "",
                    fStyle: "",
                    fWeight: "",
                    fc: "",
                    j: "",
                    justifyOffset: "",
                    l: [],
                    lh: 0,
                    lineWidths: [],
                    ls: "",
                    of: "",
                    s: "",
                    sc: "",
                    sw: 0,
                    t: 0,
                    tr: 0,
                    sz: 0,
                    ps: null,
                    fillColorAnim: !1,
                    strokeColorAnim: !1,
                    strokeWidthAnim: !1,
                    yOffset: 0,
                    finalSize: 0,
                    finalText: [],
                    finalLineHeight: 0,
                    __complete: !1
                },
                this.copyData(this.currentData, this.data.d.k[0].s),
                this.searchProperty() || this.completeTextData(this.currentData)
            }
            extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement),
            SVGShapeElement.prototype.initSecondaryElement = function() {}
            ,
            SVGShapeElement.prototype.identityMatrix = new Matrix,
            SVGShapeElement.prototype.buildExpressionInterface = function() {}
            ,
            SVGShapeElement.prototype.createContent = function() {
                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0),
                this.filterUniqueShapes()
            }
            ,
            SVGShapeElement.prototype.filterUniqueShapes = function() {
                var t, e, r, i, n = this.shapes.length, s = this.stylesList.length, a = [], o = !1;
                for (r = 0; r < s; r += 1) {
                    for (i = this.stylesList[r],
                    o = !1,
                    a.length = 0,
                    t = 0; t < n; t += 1)
                        -1 !== (e = this.shapes[t]).styles.indexOf(i) && (a.push(e),
                        o = e._isAnimated || o);
                    a.length > 1 && o && this.setShapesAsAnimated(a)
                }
            }
            ,
            SVGShapeElement.prototype.setShapesAsAnimated = function(t) {
                var e, r = t.length;
                for (e = 0; e < r; e += 1)
                    t[e].setAsAnimated()
            }
            ,
            SVGShapeElement.prototype.createStyleElement = function(t, e) {
                var r, i = new SVGStyleData(t,e), n = i.pElem;
                return "st" === t.ty ? r = new SVGStrokeStyleData(this,t,i) : "fl" === t.ty ? r = new SVGFillStyleData(this,t,i) : "gf" === t.ty || "gs" === t.ty ? (r = new ("gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this,t,i),
                this.globalData.defs.appendChild(r.gf),
                r.maskId && (this.globalData.defs.appendChild(r.ms),
                this.globalData.defs.appendChild(r.of),
                n.setAttribute("mask", "url(" + getLocationHref() + "#" + r.maskId + ")"))) : "no" === t.ty && (r = new SVGNoStyleData(this,t,i)),
                "st" !== t.ty && "gs" !== t.ty || (n.setAttribute("stroke-linecap", lineCapEnum[t.lc || 2]),
                n.setAttribute("stroke-linejoin", lineJoinEnum[t.lj || 2]),
                n.setAttribute("fill-opacity", "0"),
                1 === t.lj && n.setAttribute("stroke-miterlimit", t.ml)),
                2 === t.r && n.setAttribute("fill-rule", "evenodd"),
                t.ln && n.setAttribute("id", t.ln),
                t.cl && n.setAttribute("class", t.cl),
                t.bm && (n.style["mix-blend-mode"] = getBlendMode(t.bm)),
                this.stylesList.push(i),
                this.addToAnimatedContents(t, r),
                r
            }
            ,
            SVGShapeElement.prototype.createGroupElement = function(t) {
                var e = new ShapeGroupData;
                return t.ln && e.gr.setAttribute("id", t.ln),
                t.cl && e.gr.setAttribute("class", t.cl),
                t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)),
                e
            }
            ,
            SVGShapeElement.prototype.createTransformElement = function(t, e) {
                var r = TransformPropertyFactory.getTransformProperty(this, t, this)
                  , i = new SVGTransformData(r,r.o,e);
                return this.addToAnimatedContents(t, i),
                i
            }
            ,
            SVGShapeElement.prototype.createShapeElement = function(t, e, r) {
                var i = 4;
                "rc" === t.ty ? i = 5 : "el" === t.ty ? i = 6 : "sr" === t.ty && (i = 7);
                var n = new SVGShapeData(e,r,ShapePropertyFactory.getShapeProp(this, t, i, this));
                return this.shapes.push(n),
                this.addShapeToModifiers(n),
                this.addToAnimatedContents(t, n),
                n
            }
            ,
            SVGShapeElement.prototype.addToAnimatedContents = function(t, e) {
                for (var r = 0, i = this.animatedContents.length; r < i; ) {
                    if (this.animatedContents[r].element === e)
                        return;
                    r += 1
                }
                this.animatedContents.push({
                    fn: SVGElementsRenderer.createRenderFunction(t),
                    element: e,
                    data: t
                })
            }
            ,
            SVGShapeElement.prototype.setElementStyles = function(t) {
                var e, r = t.styles, i = this.stylesList.length;
                for (e = 0; e < i; e += 1)
                    this.stylesList[e].closed || r.push(this.stylesList[e])
            }
            ,
            SVGShapeElement.prototype.reloadShapes = function() {
                var t;
                this._isFirstFrame = !0;
                var e = this.itemsData.length;
                for (t = 0; t < e; t += 1)
                    this.prevViewData[t] = this.itemsData[t];
                for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0),
                this.filterUniqueShapes(),
                e = this.dynamicProperties.length,
                t = 0; t < e; t += 1)
                    this.dynamicProperties[t].getValue();
                this.renderModifiers()
            }
            ,
            SVGShapeElement.prototype.searchShapes = function(t, e, r, i, n, s, a) {
                var o, h, l, p, c, f, u = [].concat(s), d = t.length - 1, m = [], g = [];
                for (o = d; o >= 0; o -= 1) {
                    if ((f = this.searchProcessedElement(t[o])) ? e[o] = r[f - 1] : t[o]._render = a,
                    "fl" === t[o].ty || "st" === t[o].ty || "gf" === t[o].ty || "gs" === t[o].ty || "no" === t[o].ty)
                        f ? e[o].style.closed = !1 : e[o] = this.createStyleElement(t[o], n),
                        t[o]._render && e[o].style.pElem.parentNode !== i && i.appendChild(e[o].style.pElem),
                        m.push(e[o].style);
                    else if ("gr" === t[o].ty) {
                        if (f)
                            for (l = e[o].it.length,
                            h = 0; h < l; h += 1)
                                e[o].prevViewData[h] = e[o].it[h];
                        else
                            e[o] = this.createGroupElement(t[o]);
                        this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, n + 1, u, a),
                        t[o]._render && e[o].gr.parentNode !== i && i.appendChild(e[o].gr)
                    } else
                        "tr" === t[o].ty ? (f || (e[o] = this.createTransformElement(t[o], i)),
                        p = e[o].transform,
                        u.push(p)) : "sh" === t[o].ty || "rc" === t[o].ty || "el" === t[o].ty || "sr" === t[o].ty ? (f || (e[o] = this.createShapeElement(t[o], u, n)),
                        this.setElementStyles(e[o])) : "tm" === t[o].ty || "rd" === t[o].ty || "ms" === t[o].ty || "pb" === t[o].ty || "zz" === t[o].ty || "op" === t[o].ty ? (f ? (c = e[o]).closed = !1 : ((c = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]),
                        e[o] = c,
                        this.shapeModifiers.push(c)),
                        g.push(c)) : "rp" === t[o].ty && (f ? (c = e[o]).closed = !0 : (c = ShapeModifiers.getModifier(t[o].ty),
                        e[o] = c,
                        c.init(this, t, o, e),
                        this.shapeModifiers.push(c),
                        a = !1),
                        g.push(c));
                    this.addProcessedElement(t[o], o + 1)
                }
                for (d = m.length,
                o = 0; o < d; o += 1)
                    m[o].closed = !0;
                for (d = g.length,
                o = 0; o < d; o += 1)
                    g[o].closed = !0
            }
            ,
            SVGShapeElement.prototype.renderInnerContent = function() {
                var t;
                this.renderModifiers();
                var e = this.stylesList.length;
                for (t = 0; t < e; t += 1)
                    this.stylesList[t].reset();
                for (this.renderShape(),
                t = 0; t < e; t += 1)
                    (this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d),
                    this.stylesList[t].d = "M0 0" + this.stylesList[t].d),
                    this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"))
            }
            ,
            SVGShapeElement.prototype.renderShape = function() {
                var t, e, r = this.animatedContents.length;
                for (t = 0; t < r; t += 1)
                    e = this.animatedContents[t],
                    (this._isFirstFrame || e.element._isAnimated) && !0 !== e.data && e.fn(e.data, e.element, this._isFirstFrame)
            }
            ,
            SVGShapeElement.prototype.destroy = function() {
                this.destroyBaseElement(),
                this.shapesData = null,
                this.itemsData = null
            }
            ,
            LetterProps.prototype.update = function(t, e, r, i, n, s) {
                this._mdf.o = !1,
                this._mdf.sw = !1,
                this._mdf.sc = !1,
                this._mdf.fc = !1,
                this._mdf.m = !1,
                this._mdf.p = !1;
                var a = !1;
                return this.o !== t && (this.o = t,
                this._mdf.o = !0,
                a = !0),
                this.sw !== e && (this.sw = e,
                this._mdf.sw = !0,
                a = !0),
                this.sc !== r && (this.sc = r,
                this._mdf.sc = !0,
                a = !0),
                this.fc !== i && (this.fc = i,
                this._mdf.fc = !0,
                a = !0),
                this.m !== n && (this.m = n,
                this._mdf.m = !0,
                a = !0),
                !s.length || this.p[0] === s[0] && this.p[1] === s[1] && this.p[4] === s[4] && this.p[5] === s[5] && this.p[12] === s[12] && this.p[13] === s[13] || (this.p = s,
                this._mdf.p = !0,
                a = !0),
                a
            }
            ,
            TextProperty.prototype.defaultBoxWidth = [0, 0],
            TextProperty.prototype.copyData = function(t, e) {
                for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                return t
            }
            ,
            TextProperty.prototype.setCurrentData = function(t) {
                t.__complete || this.completeTextData(t),
                this.currentData = t,
                this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth,
                this._mdf = !0
            }
            ,
            TextProperty.prototype.searchProperty = function() {
                return this.searchKeyframes()
            }
            ,
            TextProperty.prototype.searchKeyframes = function() {
                return this.kf = this.data.d.k.length > 1,
                this.kf && this.addEffect(this.getKeyframeValue.bind(this)),
                this.kf
            }
            ,
            TextProperty.prototype.addEffect = function(t) {
                this.effectsSequence.push(t),
                this.elem.addDynamicProperty(this)
            }
            ,
            TextProperty.prototype.getValue = function(t) {
                if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
                    this.currentData.t = this.data.d.k[this.keysIndex].s.t;
                    var e = this.currentData
                      , r = this.keysIndex;
                    if (this.lock)
                        this.setCurrentData(this.currentData);
                    else {
                        var i;
                        this.lock = !0,
                        this._mdf = !1;
                        var n = this.effectsSequence.length
                          , s = t || this.data.d.k[this.keysIndex].s;
                        for (i = 0; i < n; i += 1)
                            s = r !== this.keysIndex ? this.effectsSequence[i](s, s.t) : this.effectsSequence[i](this.currentData, s.t);
                        e !== s && this.setCurrentData(s),
                        this.v = this.currentData,
                        this.pv = this.v,
                        this.lock = !1,
                        this.frameId = this.elem.globalData.frameId
                    }
                }
            }
            ,
            TextProperty.prototype.getKeyframeValue = function() {
                for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, r = 0, i = t.length; r <= i - 1 && !(r === i - 1 || t[r + 1].t > e); )
                    r += 1;
                return this.keysIndex !== r && (this.keysIndex = r),
                this.data.d.k[this.keysIndex].s
            }
            ,
            TextProperty.prototype.buildFinalText = function(t) {
                for (var e, r, i = [], n = 0, s = t.length, a = !1, o = !1, h = ""; n < s; )
                    a = o,
                    o = !1,
                    e = t.charCodeAt(n),
                    h = t.charAt(n),
                    FontManager.isCombinedCharacter(e) ? a = !0 : e >= 55296 && e <= 56319 ? FontManager.isRegionalFlag(t, n) ? h = t.substr(n, 14) : (r = t.charCodeAt(n + 1)) >= 56320 && r <= 57343 && (FontManager.isModifier(e, r) ? (h = t.substr(n, 2),
                    a = !0) : h = FontManager.isFlagEmoji(t.substr(n, 4)) ? t.substr(n, 4) : t.substr(n, 2)) : e > 56319 ? (r = t.charCodeAt(n + 1),
                    FontManager.isVariationSelector(e) && (a = !0)) : FontManager.isZeroWidthJoiner(e) && (a = !0,
                    o = !0),
                    a ? (i[i.length - 1] += h,
                    a = !1) : i.push(h),
                    n += h.length;
                return i
            }
            ,
            TextProperty.prototype.completeTextData = function(t) {
                t.__complete = !0;
                var e, r, i, n, s, a, o, h = this.elem.globalData.fontManager, l = this.data, p = [], c = 0, f = l.m.g, u = 0, d = 0, m = 0, g = [], y = 0, v = 0, _ = h.getFontByName(t.f), b = 0, x = getFontProperties(_);
                t.fWeight = x.weight,
                t.fStyle = x.style,
                t.finalSize = t.s,
                t.finalText = this.buildFinalText(t.t),
                r = t.finalText.length,
                t.finalLineHeight = t.lh;
                var E, S = t.tr / 1e3 * t.finalSize;
                if (t.sz)
                    for (var P, C, T = !0, w = t.sz[0], M = t.sz[1]; T; ) {
                        P = 0,
                        y = 0,
                        r = (C = this.buildFinalText(t.t)).length,
                        S = t.tr / 1e3 * t.finalSize;
                        var A = -1;
                        for (e = 0; e < r; e += 1)
                            E = C[e].charCodeAt(0),
                            i = !1,
                            " " === C[e] ? A = e : 13 !== E && 3 !== E || (y = 0,
                            i = !0,
                            P += t.finalLineHeight || 1.2 * t.finalSize),
                            h.chars ? (o = h.getCharData(C[e], _.fStyle, _.fFamily),
                            b = i ? 0 : o.w * t.finalSize / 100) : b = h.measureText(C[e], t.f, t.finalSize),
                            y + b > w && " " !== C[e] ? (-1 === A ? r += 1 : e = A,
                            P += t.finalLineHeight || 1.2 * t.finalSize,
                            C.splice(e, A === e ? 1 : 0, "\r"),
                            A = -1,
                            y = 0) : (y += b,
                            y += S);
                        P += _.ascent * t.finalSize / 100,
                        this.canResize && t.finalSize > this.minimumFontSize && M < P ? (t.finalSize -= 1,
                        t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = C,
                        r = t.finalText.length,
                        T = !1)
                    }
                y = -S,
                b = 0;
                var k, D = 0;
                for (e = 0; e < r; e += 1)
                    if (i = !1,
                    13 === (E = (k = t.finalText[e]).charCodeAt(0)) || 3 === E ? (D = 0,
                    g.push(y),
                    v = y > v ? y : v,
                    y = -2 * S,
                    n = "",
                    i = !0,
                    m += 1) : n = k,
                    h.chars ? (o = h.getCharData(k, _.fStyle, h.getFontByName(t.f).fFamily),
                    b = i ? 0 : o.w * t.finalSize / 100) : b = h.measureText(n, t.f, t.finalSize),
                    " " === k ? D += b + S : (y += b + S + D,
                    D = 0),
                    p.push({
                        l: b,
                        an: b,
                        add: u,
                        n: i,
                        anIndexes: [],
                        val: n,
                        line: m,
                        animatorJustifyOffset: 0
                    }),
                    2 == f) {
                        if (u += b,
                        "" === n || " " === n || e === r - 1) {
                            for ("" !== n && " " !== n || (u -= b); d <= e; )
                                p[d].an = u,
                                p[d].ind = c,
                                p[d].extra = b,
                                d += 1;
                            c += 1,
                            u = 0
                        }
                    } else if (3 == f) {
                        if (u += b,
                        "" === n || e === r - 1) {
                            for ("" === n && (u -= b); d <= e; )
                                p[d].an = u,
                                p[d].ind = c,
                                p[d].extra = b,
                                d += 1;
                            u = 0,
                            c += 1
                        }
                    } else
                        p[c].ind = c,
                        p[c].extra = 0,
                        c += 1;
                if (t.l = p,
                v = y > v ? y : v,
                g.push(y),
                t.sz)
                    t.boxWidth = t.sz[0],
                    t.justifyOffset = 0;
                else
                    switch (t.boxWidth = v,
                    t.j) {
                    case 1:
                        t.justifyOffset = -t.boxWidth;
                        break;
                    case 2:
                        t.justifyOffset = -t.boxWidth / 2;
                        break;
                    default:
                        t.justifyOffset = 0
                    }
                t.lineWidths = g;
                var F, I, R, L, B = l.a;
                a = B.length;
                var V = [];
                for (s = 0; s < a; s += 1) {
                    for ((F = B[s]).a.sc && (t.strokeColorAnim = !0),
                    F.a.sw && (t.strokeWidthAnim = !0),
                    (F.a.fc || F.a.fh || F.a.fs || F.a.fb) && (t.fillColorAnim = !0),
                    L = 0,
                    R = F.s.b,
                    e = 0; e < r; e += 1)
                        (I = p[e]).anIndexes[s] = L,
                        (1 == R && "" !== I.val || 2 == R && "" !== I.val && " " !== I.val || 3 == R && (I.n || " " == I.val || e == r - 1) || 4 == R && (I.n || e == r - 1)) && (1 === F.s.rn && V.push(L),
                        L += 1);
                    l.a[s].s.totalChars = L;
                    var O, z = -1;
                    if (1 === F.s.rn)
                        for (e = 0; e < r; e += 1)
                            z != (I = p[e]).anIndexes[s] && (z = I.anIndexes[s],
                            O = V.splice(Math.floor(Math.random() * V.length), 1)[0]),
                            I.anIndexes[s] = O
                }
                t.yOffset = t.finalLineHeight || 1.2 * t.finalSize,
                t.ls = t.ls || 0,
                t.ascent = _.ascent * t.finalSize / 100
            }
            ,
            TextProperty.prototype.updateDocumentData = function(t, e) {
                e = void 0 === e ? this.keysIndex : e;
                var r = this.copyData({}, this.data.d.k[e].s);
                r = this.copyData(r, t),
                this.data.d.k[e].s = r,
                this.recalculate(e),
                this.setCurrentData(r),
                this.elem.addDynamicProperty(this)
            }
            ,
            TextProperty.prototype.recalculate = function(t) {
                var e = this.data.d.k[t].s;
                e.__complete = !1,
                this.keysIndex = 0,
                this._isFirstFrame = !0,
                this.getValue(e)
            }
            ,
            TextProperty.prototype.canResizeFont = function(t) {
                this.canResize = t,
                this.recalculate(this.keysIndex),
                this.elem.addDynamicProperty(this)
            }
            ,
            TextProperty.prototype.setMinimumFontSize = function(t) {
                this.minimumFontSize = Math.floor(t) || 1,
                this.recalculate(this.keysIndex),
                this.elem.addDynamicProperty(this)
            }
            ;
            var TextSelectorProp = function() {
                var t = Math.max
                  , e = Math.min
                  , r = Math.floor;
                function i(t, e) {
                    this._currentTextLength = -1,
                    this.k = !1,
                    this.data = e,
                    this.elem = t,
                    this.comp = t.comp,
                    this.finalS = 0,
                    this.finalE = 0,
                    this.initDynamicPropertyContainer(t),
                    this.s = PropertyFactory.getProp(t, e.s || {
                        k: 0
                    }, 0, 0, this),
                    this.e = "e"in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : {
                        v: 100
                    },
                    this.o = PropertyFactory.getProp(t, e.o || {
                        k: 0
                    }, 0, 0, this),
                    this.xe = PropertyFactory.getProp(t, e.xe || {
                        k: 0
                    }, 0, 0, this),
                    this.ne = PropertyFactory.getProp(t, e.ne || {
                        k: 0
                    }, 0, 0, this),
                    this.sm = PropertyFactory.getProp(t, e.sm || {
                        k: 100
                    }, 0, 0, this),
                    this.a = PropertyFactory.getProp(t, e.a, 0, .01, this),
                    this.dynamicProperties.length || this.getValue()
                }
                return i.prototype = {
                    getMult: function(i) {
                        this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
                        var n = 0
                          , s = 0
                          , a = 1
                          , o = 1;
                        this.ne.v > 0 ? n = this.ne.v / 100 : s = -this.ne.v / 100,
                        this.xe.v > 0 ? a = 1 - this.xe.v / 100 : o = 1 + this.xe.v / 100;
                        var h = BezierFactory.getBezierEasing(n, s, a, o).get
                          , l = 0
                          , p = this.finalS
                          , c = this.finalE
                          , f = this.data.sh;
                        if (2 === f)
                            l = h(l = c === p ? i >= c ? 1 : 0 : t(0, e(.5 / (c - p) + (i - p) / (c - p), 1)));
                        else if (3 === f)
                            l = h(l = c === p ? i >= c ? 0 : 1 : 1 - t(0, e(.5 / (c - p) + (i - p) / (c - p), 1)));
                        else if (4 === f)
                            c === p ? l = 0 : (l = t(0, e(.5 / (c - p) + (i - p) / (c - p), 1))) < .5 ? l *= 2 : l = 1 - 2 * (l - .5),
                            l = h(l);
                        else if (5 === f) {
                            if (c === p)
                                l = 0;
                            else {
                                var u = c - p
                                  , d = -u / 2 + (i = e(t(0, i + .5 - p), c - p))
                                  , m = u / 2;
                                l = Math.sqrt(1 - d * d / (m * m))
                            }
                            l = h(l)
                        } else
                            6 === f ? (c === p ? l = 0 : (i = e(t(0, i + .5 - p), c - p),
                            l = (1 + Math.cos(Math.PI + 2 * Math.PI * i / (c - p))) / 2),
                            l = h(l)) : (i >= r(p) && (l = t(0, e(i - p < 0 ? e(c, 1) - (p - i) : c - i, 1))),
                            l = h(l));
                        if (100 !== this.sm.v) {
                            var g = .01 * this.sm.v;
                            0 === g && (g = 1e-8);
                            var y = .5 - .5 * g;
                            l < y ? l = 0 : (l = (l - y) / g) > 1 && (l = 1)
                        }
                        return l * this.a.v
                    },
                    getValue: function(t) {
                        this.iterateDynamicProperties(),
                        this._mdf = t || this._mdf,
                        this._currentTextLength = this.elem.textProperty.currentData.l.length || 0,
                        t && 2 === this.data.r && (this.e.v = this._currentTextLength);
                        var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars
                          , r = this.o.v / e
                          , i = this.s.v / e + r
                          , n = this.e.v / e + r;
                        if (i > n) {
                            var s = i;
                            i = n,
                            n = s
                        }
                        this.finalS = i,
                        this.finalE = n
                    }
                },
                extendPrototype([DynamicPropertyContainer], i),
                {
                    getTextSelectorProp: function(t, e, r) {
                        return new i(t,e,r)
                    }
                }
            }();
            function TextAnimatorDataProperty(t, e, r) {
                var i = {
                    propType: !1
                }
                  , n = PropertyFactory.getProp
                  , s = e.a;
                this.a = {
                    r: s.r ? n(t, s.r, 0, degToRads, r) : i,
                    rx: s.rx ? n(t, s.rx, 0, degToRads, r) : i,
                    ry: s.ry ? n(t, s.ry, 0, degToRads, r) : i,
                    sk: s.sk ? n(t, s.sk, 0, degToRads, r) : i,
                    sa: s.sa ? n(t, s.sa, 0, degToRads, r) : i,
                    s: s.s ? n(t, s.s, 1, .01, r) : i,
                    a: s.a ? n(t, s.a, 1, 0, r) : i,
                    o: s.o ? n(t, s.o, 0, .01, r) : i,
                    p: s.p ? n(t, s.p, 1, 0, r) : i,
                    sw: s.sw ? n(t, s.sw, 0, 0, r) : i,
                    sc: s.sc ? n(t, s.sc, 1, 0, r) : i,
                    fc: s.fc ? n(t, s.fc, 1, 0, r) : i,
                    fh: s.fh ? n(t, s.fh, 0, 0, r) : i,
                    fs: s.fs ? n(t, s.fs, 0, .01, r) : i,
                    fb: s.fb ? n(t, s.fb, 0, .01, r) : i,
                    t: s.t ? n(t, s.t, 0, 0, r) : i
                },
                this.s = TextSelectorProp.getTextSelectorProp(t, e.s, r),
                this.s.t = e.s.t
            }
            function TextAnimatorProperty(t, e, r) {
                this._isFirstFrame = !0,
                this._hasMaskedPath = !1,
                this._frameId = -1,
                this._textData = t,
                this._renderType = e,
                this._elem = r,
                this._animatorsData = createSizedArray(this._textData.a.length),
                this._pathData = {},
                this._moreOptions = {
                    alignment: {}
                },
                this.renderedLetters = [],
                this.lettersChangedFlag = !1,
                this.initDynamicPropertyContainer(r)
            }
            function ITextElement() {}
            TextAnimatorProperty.prototype.searchProperties = function() {
                var t, e, r = this._textData.a.length, i = PropertyFactory.getProp;
                for (t = 0; t < r; t += 1)
                    e = this._textData.a[t],
                    this._animatorsData[t] = new TextAnimatorDataProperty(this._elem,e,this);
                this._textData.p && "m"in this._textData.p ? (this._pathData = {
                    a: i(this._elem, this._textData.p.a, 0, 0, this),
                    f: i(this._elem, this._textData.p.f, 0, 0, this),
                    l: i(this._elem, this._textData.p.l, 0, 0, this),
                    r: i(this._elem, this._textData.p.r, 0, 0, this),
                    p: i(this._elem, this._textData.p.p, 0, 0, this),
                    m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
                },
                this._hasMaskedPath = !0) : this._hasMaskedPath = !1,
                this._moreOptions.alignment = i(this._elem, this._textData.m.a, 1, 0, this)
            }
            ,
            TextAnimatorProperty.prototype.getMeasures = function(t, e) {
                if (this.lettersChangedFlag = e,
                this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
                    this._isFirstFrame = !1;
                    var r, i, n, s, a, o, h, l, p, c, f, u, d, m, g, y, v, _, b, x = this._moreOptions.alignment.v, E = this._animatorsData, S = this._textData, P = this.mHelper, C = this._renderType, T = this.renderedLetters.length, w = t.l;
                    if (this._hasMaskedPath) {
                        if (b = this._pathData.m,
                        !this._pathData.n || this._pathData._mdf) {
                            var M, A = b.v;
                            for (this._pathData.r.v && (A = A.reverse()),
                            a = {
                                tLength: 0,
                                segments: []
                            },
                            s = A._length - 1,
                            y = 0,
                            n = 0; n < s; n += 1)
                                M = bez.buildBezierData(A.v[n], A.v[n + 1], [A.o[n][0] - A.v[n][0], A.o[n][1] - A.v[n][1]], [A.i[n + 1][0] - A.v[n + 1][0], A.i[n + 1][1] - A.v[n + 1][1]]),
                                a.tLength += M.segmentLength,
                                a.segments.push(M),
                                y += M.segmentLength;
                            n = s,
                            b.v.c && (M = bez.buildBezierData(A.v[n], A.v[0], [A.o[n][0] - A.v[n][0], A.o[n][1] - A.v[n][1]], [A.i[0][0] - A.v[0][0], A.i[0][1] - A.v[0][1]]),
                            a.tLength += M.segmentLength,
                            a.segments.push(M),
                            y += M.segmentLength),
                            this._pathData.pi = a
                        }
                        if (a = this._pathData.pi,
                        o = this._pathData.f.v,
                        f = 0,
                        c = 1,
                        l = 0,
                        p = !0,
                        m = a.segments,
                        o < 0 && b.v.c)
                            for (a.tLength < Math.abs(o) && (o = -Math.abs(o) % a.tLength),
                            c = (d = m[f = m.length - 1].points).length - 1; o < 0; )
                                o += d[c].partialLength,
                                (c -= 1) < 0 && (c = (d = m[f -= 1].points).length - 1);
                        u = (d = m[f].points)[c - 1],
                        g = (h = d[c]).partialLength
                    }
                    s = w.length,
                    r = 0,
                    i = 0;
                    var k, D, F, I, R, L = 1.2 * t.finalSize * .714, B = !0;
                    F = E.length;
                    var V, O, z, N, G, H, q, j, W, Y, X, $, U = -1, J = o, Z = f, K = c, Q = -1, tt = "", et = this.defaultPropsArray;
                    if (2 === t.j || 1 === t.j) {
                        var rt = 0
                          , it = 0
                          , nt = 2 === t.j ? -.5 : -1
                          , st = 0
                          , at = !0;
                        for (n = 0; n < s; n += 1)
                            if (w[n].n) {
                                for (rt && (rt += it); st < n; )
                                    w[st].animatorJustifyOffset = rt,
                                    st += 1;
                                rt = 0,
                                at = !0
                            } else {
                                for (D = 0; D < F; D += 1)
                                    (k = E[D].a).t.propType && (at && 2 === t.j && (it += k.t.v * nt),
                                    (R = E[D].s.getMult(w[n].anIndexes[D], S.a[D].s.totalChars)).length ? rt += k.t.v * R[0] * nt : rt += k.t.v * R * nt);
                                at = !1
                            }
                        for (rt && (rt += it); st < n; )
                            w[st].animatorJustifyOffset = rt,
                            st += 1
                    }
                    for (n = 0; n < s; n += 1) {
                        if (P.reset(),
                        N = 1,
                        w[n].n)
                            r = 0,
                            i += t.yOffset,
                            i += B ? 1 : 0,
                            o = J,
                            B = !1,
                            this._hasMaskedPath && (c = K,
                            u = (d = m[f = Z].points)[c - 1],
                            g = (h = d[c]).partialLength,
                            l = 0),
                            tt = "",
                            X = "",
                            W = "",
                            $ = "",
                            et = this.defaultPropsArray;
                        else {
                            if (this._hasMaskedPath) {
                                if (Q !== w[n].line) {
                                    switch (t.j) {
                                    case 1:
                                        o += y - t.lineWidths[w[n].line];
                                        break;
                                    case 2:
                                        o += (y - t.lineWidths[w[n].line]) / 2
                                    }
                                    Q = w[n].line
                                }
                                U !== w[n].ind && (w[U] && (o += w[U].extra),
                                o += w[n].an / 2,
                                U = w[n].ind),
                                o += x[0] * w[n].an * .005;
                                var ot = 0;
                                for (D = 0; D < F; D += 1)
                                    (k = E[D].a).p.propType && ((R = E[D].s.getMult(w[n].anIndexes[D], S.a[D].s.totalChars)).length ? ot += k.p.v[0] * R[0] : ot += k.p.v[0] * R),
                                    k.a.propType && ((R = E[D].s.getMult(w[n].anIndexes[D], S.a[D].s.totalChars)).length ? ot += k.a.v[0] * R[0] : ot += k.a.v[0] * R);
                                for (p = !0,
                                this._pathData.a.v && (o = .5 * w[0].an + (y - this._pathData.f.v - .5 * w[0].an - .5 * w[w.length - 1].an) * U / (s - 1),
                                o += this._pathData.f.v); p; )
                                    l + g >= o + ot || !d ? (v = (o + ot - l) / h.partialLength,
                                    O = u.point[0] + (h.point[0] - u.point[0]) * v,
                                    z = u.point[1] + (h.point[1] - u.point[1]) * v,
                                    P.translate(-x[0] * w[n].an * .005, -x[1] * L * .01),
                                    p = !1) : d && (l += h.partialLength,
                                    (c += 1) >= d.length && (c = 0,
                                    m[f += 1] ? d = m[f].points : b.v.c ? (c = 0,
                                    d = m[f = 0].points) : (l -= h.partialLength,
                                    d = null)),
                                    d && (u = h,
                                    g = (h = d[c]).partialLength));
                                V = w[n].an / 2 - w[n].add,
                                P.translate(-V, 0, 0)
                            } else
                                V = w[n].an / 2 - w[n].add,
                                P.translate(-V, 0, 0),
                                P.translate(-x[0] * w[n].an * .005, -x[1] * L * .01, 0);
                            for (D = 0; D < F; D += 1)
                                (k = E[D].a).t.propType && (R = E[D].s.getMult(w[n].anIndexes[D], S.a[D].s.totalChars),
                                0 === r && 0 === t.j || (this._hasMaskedPath ? R.length ? o += k.t.v * R[0] : o += k.t.v * R : R.length ? r += k.t.v * R[0] : r += k.t.v * R));
                            for (t.strokeWidthAnim && (H = t.sw || 0),
                            t.strokeColorAnim && (G = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]),
                            t.fillColorAnim && t.fc && (q = [t.fc[0], t.fc[1], t.fc[2]]),
                            D = 0; D < F; D += 1)
                                (k = E[D].a).a.propType && ((R = E[D].s.getMult(w[n].anIndexes[D], S.a[D].s.totalChars)).length ? P.translate(-k.a.v[0] * R[0], -k.a.v[1] * R[1], k.a.v[2] * R[2]) : P.translate(-k.a.v[0] * R, -k.a.v[1] * R, k.a.v[2] * R));
                            for (D = 0; D < F; D += 1)
                                (k = E[D].a).s.propType && ((R = E[D].s.getMult(w[n].anIndexes[D], S.a[D].s.totalChars)).length ? P.scale(1 + (k.s.v[0] - 1) * R[0], 1 + (k.s.v[1] - 1) * R[1], 1) : P.scale(1 + (k.s.v[0] - 1) * R, 1 + (k.s.v[1] - 1) * R, 1));
                            for (D = 0; D < F; D += 1) {
                                if (k = E[D].a,
                                R = E[D].s.getMult(w[n].anIndexes[D], S.a[D].s.totalChars),
                                k.sk.propType && (R.length ? P.skewFromAxis(-k.sk.v * R[0], k.sa.v * R[1]) : P.skewFromAxis(-k.sk.v * R, k.sa.v * R)),
                                k.r.propType && (R.length ? P.rotateZ(-k.r.v * R[2]) : P.rotateZ(-k.r.v * R)),
                                k.ry.propType && (R.length ? P.rotateY(k.ry.v * R[1]) : P.rotateY(k.ry.v * R)),
                                k.rx.propType && (R.length ? P.rotateX(k.rx.v * R[0]) : P.rotateX(k.rx.v * R)),
                                k.o.propType && (R.length ? N += (k.o.v * R[0] - N) * R[0] : N += (k.o.v * R - N) * R),
                                t.strokeWidthAnim && k.sw.propType && (R.length ? H += k.sw.v * R[0] : H += k.sw.v * R),
                                t.strokeColorAnim && k.sc.propType)
                                    for (j = 0; j < 3; j += 1)
                                        R.length ? G[j] += (k.sc.v[j] - G[j]) * R[0] : G[j] += (k.sc.v[j] - G[j]) * R;
                                if (t.fillColorAnim && t.fc) {
                                    if (k.fc.propType)
                                        for (j = 0; j < 3; j += 1)
                                            R.length ? q[j] += (k.fc.v[j] - q[j]) * R[0] : q[j] += (k.fc.v[j] - q[j]) * R;
                                    k.fh.propType && (q = R.length ? addHueToRGB(q, k.fh.v * R[0]) : addHueToRGB(q, k.fh.v * R)),
                                    k.fs.propType && (q = R.length ? addSaturationToRGB(q, k.fs.v * R[0]) : addSaturationToRGB(q, k.fs.v * R)),
                                    k.fb.propType && (q = R.length ? addBrightnessToRGB(q, k.fb.v * R[0]) : addBrightnessToRGB(q, k.fb.v * R))
                                }
                            }
                            for (D = 0; D < F; D += 1)
                                (k = E[D].a).p.propType && (R = E[D].s.getMult(w[n].anIndexes[D], S.a[D].s.totalChars),
                                this._hasMaskedPath ? R.length ? P.translate(0, k.p.v[1] * R[0], -k.p.v[2] * R[1]) : P.translate(0, k.p.v[1] * R, -k.p.v[2] * R) : R.length ? P.translate(k.p.v[0] * R[0], k.p.v[1] * R[1], -k.p.v[2] * R[2]) : P.translate(k.p.v[0] * R, k.p.v[1] * R, -k.p.v[2] * R));
                            if (t.strokeWidthAnim && (W = H < 0 ? 0 : H),
                            t.strokeColorAnim && (Y = "rgb(" + Math.round(255 * G[0]) + "," + Math.round(255 * G[1]) + "," + Math.round(255 * G[2]) + ")"),
                            t.fillColorAnim && t.fc && (X = "rgb(" + Math.round(255 * q[0]) + "," + Math.round(255 * q[1]) + "," + Math.round(255 * q[2]) + ")"),
                            this._hasMaskedPath) {
                                if (P.translate(0, -t.ls),
                                P.translate(0, x[1] * L * .01 + i, 0),
                                this._pathData.p.v) {
                                    _ = (h.point[1] - u.point[1]) / (h.point[0] - u.point[0]);
                                    var ht = 180 * Math.atan(_) / Math.PI;
                                    h.point[0] < u.point[0] && (ht += 180),
                                    P.rotate(-ht * Math.PI / 180)
                                }
                                P.translate(O, z, 0),
                                o -= x[0] * w[n].an * .005,
                                w[n + 1] && U !== w[n + 1].ind && (o += w[n].an / 2,
                                o += .001 * t.tr * t.finalSize)
                            } else {
                                switch (P.translate(r, i, 0),
                                t.ps && P.translate(t.ps[0], t.ps[1] + t.ascent, 0),
                                t.j) {
                                case 1:
                                    P.translate(w[n].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[w[n].line]), 0, 0);
                                    break;
                                case 2:
                                    P.translate(w[n].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[w[n].line]) / 2, 0, 0)
                                }
                                P.translate(0, -t.ls),
                                P.translate(V, 0, 0),
                                P.translate(x[0] * w[n].an * .005, x[1] * L * .01, 0),
                                r += w[n].l + .001 * t.tr * t.finalSize
                            }
                            "html" === C ? tt = P.toCSS() : "svg" === C ? tt = P.to2dCSS() : et = [P.props[0], P.props[1], P.props[2], P.props[3], P.props[4], P.props[5], P.props[6], P.props[7], P.props[8], P.props[9], P.props[10], P.props[11], P.props[12], P.props[13], P.props[14], P.props[15]],
                            $ = N
                        }
                        T <= n ? (I = new LetterProps($,W,Y,X,tt,et),
                        this.renderedLetters.push(I),
                        T += 1,
                        this.lettersChangedFlag = !0) : (I = this.renderedLetters[n],
                        this.lettersChangedFlag = I.update($, W, Y, X, tt, et) || this.lettersChangedFlag)
                    }
                }
            }
            ,
            TextAnimatorProperty.prototype.getValue = function() {
                this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId,
                this.iterateDynamicProperties())
            }
            ,
            TextAnimatorProperty.prototype.mHelper = new Matrix,
            TextAnimatorProperty.prototype.defaultPropsArray = [],
            extendPrototype([DynamicPropertyContainer], TextAnimatorProperty),
            ITextElement.prototype.initElement = function(t, e, r) {
                this.lettersChangedFlag = !0,
                this.initFrame(),
                this.initBaseData(t, e, r),
                this.textProperty = new TextProperty(this,t.t,this.dynamicProperties),
                this.textAnimator = new TextAnimatorProperty(t.t,this.renderType,this),
                this.initTransform(t, e, r),
                this.initHierarchy(),
                this.initRenderable(),
                this.initRendererElement(),
                this.createContainerElements(),
                this.createRenderableComponents(),
                this.createContent(),
                this.hide(),
                this.textAnimator.searchProperties(this.dynamicProperties)
            }
            ,
            ITextElement.prototype.prepareFrame = function(t) {
                this._mdf = !1,
                this.prepareRenderableFrame(t),
                this.prepareProperties(t, this.isInRange)
            }
            ,
            ITextElement.prototype.createPathShape = function(t, e) {
                var r, i, n = e.length, s = "";
                for (r = 0; r < n; r += 1)
                    "sh" === e[r].ty && (i = e[r].ks.k,
                    s += buildShapeString(i, i.i.length, !0, t));
                return s
            }
            ,
            ITextElement.prototype.updateDocumentData = function(t, e) {
                this.textProperty.updateDocumentData(t, e)
            }
            ,
            ITextElement.prototype.canResizeFont = function(t) {
                this.textProperty.canResizeFont(t)
            }
            ,
            ITextElement.prototype.setMinimumFontSize = function(t) {
                this.textProperty.setMinimumFontSize(t)
            }
            ,
            ITextElement.prototype.applyTextPropertiesToMatrix = function(t, e, r, i, n) {
                switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0),
                e.translate(0, -t.ls, 0),
                t.j) {
                case 1:
                    e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]), 0, 0);
                    break;
                case 2:
                    e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]) / 2, 0, 0)
                }
                e.translate(i, n, 0)
            }
            ,
            ITextElement.prototype.buildColor = function(t) {
                return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")"
            }
            ,
            ITextElement.prototype.emptyProp = new LetterProps,
            ITextElement.prototype.destroy = function() {}
            ,
            ITextElement.prototype.validateText = function() {
                (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(),
                this.textProperty._isFirstFrame = !1,
                this.textProperty._mdf = !1)
            }
            ;
            var emptyShapeData = {
                shapes: []
            };
            function SVGTextLottieElement(t, e, r) {
                this.textSpans = [],
                this.renderType = "svg",
                this.initElement(t, e, r)
            }
            function ISolidElement(t, e, r) {
                this.initElement(t, e, r)
            }
            function NullElement(t, e, r) {
                this.initFrame(),
                this.initBaseData(t, e, r),
                this.initFrame(),
                this.initTransform(t, e, r),
                this.initHierarchy()
            }
            function SVGRendererBase() {}
            function ICompElement() {}
            function SVGCompElement(t, e, r) {
                this.layers = t.layers,
                this.supports3d = !0,
                this.completeLayers = !1,
                this.pendingElements = [],
                this.elements = this.layers ? createSizedArray(this.layers.length) : [],
                this.initElement(t, e, r),
                this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
                    _placeholder: !0
                }
            }
            function SVGRenderer(t, e) {
                this.animationItem = t,
                this.layers = null,
                this.renderedFrame = -1,
                this.svgElement = createNS("svg");
                var r = "";
                if (e && e.title) {
                    var i = createNS("title")
                      , n = createElementID();
                    i.setAttribute("id", n),
                    i.textContent = e.title,
                    this.svgElement.appendChild(i),
                    r += n
                }
                if (e && e.description) {
                    var s = createNS("desc")
                      , a = createElementID();
                    s.setAttribute("id", a),
                    s.textContent = e.description,
                    this.svgElement.appendChild(s),
                    r += " " + a
                }
                r && this.svgElement.setAttribute("aria-labelledby", r);
                var o = createNS("defs");
                this.svgElement.appendChild(o);
                var h = createNS("g");
                this.svgElement.appendChild(h),
                this.layerElement = h,
                this.renderConfig = {
                    preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
                    imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                    contentVisibility: e && e.contentVisibility || "visible",
                    progressiveLoad: e && e.progressiveLoad || !1,
                    hideOnTransparent: !(e && !1 === e.hideOnTransparent),
                    viewBoxOnly: e && e.viewBoxOnly || !1,
                    viewBoxSize: e && e.viewBoxSize || !1,
                    className: e && e.className || "",
                    id: e && e.id || "",
                    focusable: e && e.focusable,
                    filterSize: {
                        width: e && e.filterSize && e.filterSize.width || "100%",
                        height: e && e.filterSize && e.filterSize.height || "100%",
                        x: e && e.filterSize && e.filterSize.x || "0%",
                        y: e && e.filterSize && e.filterSize.y || "0%"
                    },
                    width: e && e.width,
                    height: e && e.height,
                    runExpressions: !e || void 0 === e.runExpressions || e.runExpressions
                },
                this.globalData = {
                    _mdf: !1,
                    frameNum: -1,
                    defs: o,
                    renderConfig: this.renderConfig
                },
                this.elements = [],
                this.pendingElements = [],
                this.destroyed = !1,
                this.rendererType = "svg"
            }
            function ShapeTransformManager() {
                this.sequences = {},
                this.sequenceList = [],
                this.transform_key_count = 0
            }
            extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextLottieElement),
            SVGTextLottieElement.prototype.createContent = function() {
                this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"))
            }
            ,
            SVGTextLottieElement.prototype.buildTextContents = function(t) {
                for (var e = 0, r = t.length, i = [], n = ""; e < r; )
                    t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (i.push(n),
                    n = "") : n += t[e],
                    e += 1;
                return i.push(n),
                i
            }
            ,
            SVGTextLottieElement.prototype.buildShapeData = function(t, e) {
                if (t.shapes && t.shapes.length) {
                    var r = t.shapes[0];
                    if (r.it) {
                        var i = r.it[r.it.length - 1];
                        i.s && (i.s.k[0] = e,
                        i.s.k[1] = e)
                    }
                }
                return t
            }
            ,
            SVGTextLottieElement.prototype.buildNewText = function() {
                var t, e;
                this.addDynamicProperty(this);
                var r = this.textProperty.currentData;
                this.renderedLetters = createSizedArray(r ? r.l.length : 0),
                r.fc ? this.layerElement.setAttribute("fill", this.buildColor(r.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"),
                r.sc && (this.layerElement.setAttribute("stroke", this.buildColor(r.sc)),
                this.layerElement.setAttribute("stroke-width", r.sw)),
                this.layerElement.setAttribute("font-size", r.finalSize);
                var i = this.globalData.fontManager.getFontByName(r.f);
                if (i.fClass)
                    this.layerElement.setAttribute("class", i.fClass);
                else {
                    this.layerElement.setAttribute("font-family", i.fFamily);
                    var n = r.fWeight
                      , s = r.fStyle;
                    this.layerElement.setAttribute("font-style", s),
                    this.layerElement.setAttribute("font-weight", n)
                }
                this.layerElement.setAttribute("aria-label", r.t);
                var a, o = r.l || [], h = !!this.globalData.fontManager.chars;
                e = o.length;
                var l = this.mHelper
                  , p = this.data.singleShape
                  , c = 0
                  , f = 0
                  , u = !0
                  , d = .001 * r.tr * r.finalSize;
                if (!p || h || r.sz) {
                    var m, g = this.textSpans.length;
                    for (t = 0; t < e; t += 1) {
                        if (this.textSpans[t] || (this.textSpans[t] = {
                            span: null,
                            childSpan: null,
                            glyph: null
                        }),
                        !h || !p || 0 === t) {
                            if (a = g > t ? this.textSpans[t].span : createNS(h ? "g" : "text"),
                            g <= t) {
                                if (a.setAttribute("stroke-linecap", "butt"),
                                a.setAttribute("stroke-linejoin", "round"),
                                a.setAttribute("stroke-miterlimit", "4"),
                                this.textSpans[t].span = a,
                                h) {
                                    var y = createNS("g");
                                    a.appendChild(y),
                                    this.textSpans[t].childSpan = y
                                }
                                this.textSpans[t].span = a,
                                this.layerElement.appendChild(a)
                            }
                            a.style.display = "inherit"
                        }
                        if (l.reset(),
                        p && (o[t].n && (c = -d,
                        f += r.yOffset,
                        f += u ? 1 : 0,
                        u = !1),
                        this.applyTextPropertiesToMatrix(r, l, o[t].line, c, f),
                        c += o[t].l || 0,
                        c += d),
                        h) {
                            var v;
                            if (1 === (m = this.globalData.fontManager.getCharData(r.finalText[t], i.fStyle, this.globalData.fontManager.getFontByName(r.f).fFamily)).t)
                                v = new SVGCompElement(m.data,this.globalData,this);
                            else {
                                var _ = emptyShapeData;
                                m.data && m.data.shapes && (_ = this.buildShapeData(m.data, r.finalSize)),
                                v = new SVGShapeElement(_,this.globalData,this)
                            }
                            if (this.textSpans[t].glyph) {
                                var b = this.textSpans[t].glyph;
                                this.textSpans[t].childSpan.removeChild(b.layerElement),
                                b.destroy()
                            }
                            this.textSpans[t].glyph = v,
                            v._debug = !0,
                            v.prepareFrame(0),
                            v.renderFrame(),
                            this.textSpans[t].childSpan.appendChild(v.layerElement),
                            1 === m.t && this.textSpans[t].childSpan.setAttribute("transform", "scale(" + r.finalSize / 100 + "," + r.finalSize / 100 + ")")
                        } else
                            p && a.setAttribute("transform", "translate(" + l.props[12] + "," + l.props[13] + ")"),
                            a.textContent = o[t].val,
                            a.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve")
                    }
                    p && a && a.setAttribute("d", "")
                } else {
                    var x = this.textContainer
                      , E = "start";
                    switch (r.j) {
                    case 1:
                        E = "end";
                        break;
                    case 2:
                        E = "middle";
                        break;
                    default:
                        E = "start"
                    }
                    x.setAttribute("text-anchor", E),
                    x.setAttribute("letter-spacing", d);
                    var S = this.buildTextContents(r.finalText);
                    for (e = S.length,
                    f = r.ps ? r.ps[1] + r.ascent : 0,
                    t = 0; t < e; t += 1)
                        (a = this.textSpans[t].span || createNS("tspan")).textContent = S[t],
                        a.setAttribute("x", 0),
                        a.setAttribute("y", f),
                        a.style.display = "inherit",
                        x.appendChild(a),
                        this.textSpans[t] || (this.textSpans[t] = {
                            span: null,
                            glyph: null
                        }),
                        this.textSpans[t].span = a,
                        f += r.finalLineHeight;
                    this.layerElement.appendChild(x)
                }
                for (; t < this.textSpans.length; )
                    this.textSpans[t].span.style.display = "none",
                    t += 1;
                this._sizeChanged = !0
            }
            ,
            SVGTextLottieElement.prototype.sourceRectAtTime = function() {
                if (this.prepareFrame(this.comp.renderedFrame - this.data.st),
                this.renderInnerContent(),
                this._sizeChanged) {
                    this._sizeChanged = !1;
                    var t = this.layerElement.getBBox();
                    this.bbox = {
                        top: t.y,
                        left: t.x,
                        width: t.width,
                        height: t.height
                    }
                }
                return this.bbox
            }
            ,
            SVGTextLottieElement.prototype.getValue = function() {
                var t, e, r = this.textSpans.length;
                for (this.renderedFrame = this.comp.renderedFrame,
                t = 0; t < r; t += 1)
                    (e = this.textSpans[t].glyph) && (e.prepareFrame(this.comp.renderedFrame - this.data.st),
                    e._mdf && (this._mdf = !0))
            }
            ,
            SVGTextLottieElement.prototype.renderInnerContent = function() {
                if (this.validateText(),
                (!this.data.singleShape || this._mdf) && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag),
                this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
                    var t, e;
                    this._sizeChanged = !0;
                    var r, i, n, s = this.textAnimator.renderedLetters, a = this.textProperty.currentData.l;
                    for (e = a.length,
                    t = 0; t < e; t += 1)
                        a[t].n || (r = s[t],
                        i = this.textSpans[t].span,
                        (n = this.textSpans[t].glyph) && n.renderFrame(),
                        r._mdf.m && i.setAttribute("transform", r.m),
                        r._mdf.o && i.setAttribute("opacity", r.o),
                        r._mdf.sw && i.setAttribute("stroke-width", r.sw),
                        r._mdf.sc && i.setAttribute("stroke", r.sc),
                        r._mdf.fc && i.setAttribute("fill", r.fc))
                }
            }
            ,
            extendPrototype([IImageElement], ISolidElement),
            ISolidElement.prototype.createContent = function() {
                var t = createNS("rect");
                t.setAttribute("width", this.data.sw),
                t.setAttribute("height", this.data.sh),
                t.setAttribute("fill", this.data.sc),
                this.layerElement.appendChild(t)
            }
            ,
            NullElement.prototype.prepareFrame = function(t) {
                this.prepareProperties(t, !0)
            }
            ,
            NullElement.prototype.renderFrame = function() {}
            ,
            NullElement.prototype.getBaseElement = function() {
                return null
            }
            ,
            NullElement.prototype.destroy = function() {}
            ,
            NullElement.prototype.sourceRectAtTime = function() {}
            ,
            NullElement.prototype.hide = function() {}
            ,
            extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement),
            extendPrototype([BaseRenderer], SVGRendererBase),
            SVGRendererBase.prototype.createNull = function(t) {
                return new NullElement(t,this.globalData,this)
            }
            ,
            SVGRendererBase.prototype.createShape = function(t) {
                return new SVGShapeElement(t,this.globalData,this)
            }
            ,
            SVGRendererBase.prototype.createText = function(t) {
                return new SVGTextLottieElement(t,this.globalData,this)
            }
            ,
            SVGRendererBase.prototype.createImage = function(t) {
                return new IImageElement(t,this.globalData,this)
            }
            ,
            SVGRendererBase.prototype.createSolid = function(t) {
                return new ISolidElement(t,this.globalData,this)
            }
            ,
            SVGRendererBase.prototype.configAnimation = function(t) {
                this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
                this.svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink"),
                this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h),
                this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w),
                this.svgElement.setAttribute("height", t.h),
                this.svgElement.style.width = "100%",
                this.svgElement.style.height = "100%",
                this.svgElement.style.transform = "translate3d(0,0,0)",
                this.svgElement.style.contentVisibility = this.renderConfig.contentVisibility),
                this.renderConfig.width && this.svgElement.setAttribute("width", this.renderConfig.width),
                this.renderConfig.height && this.svgElement.setAttribute("height", this.renderConfig.height),
                this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className),
                this.renderConfig.id && this.svgElement.setAttribute("id", this.renderConfig.id),
                void 0 !== this.renderConfig.focusable && this.svgElement.setAttribute("focusable", this.renderConfig.focusable),
                this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio),
                this.animationItem.wrapper.appendChild(this.svgElement);
                var e = this.globalData.defs;
                this.setupGlobalData(t, e),
                this.globalData.progressiveLoad = this.renderConfig.progressiveLoad,
                this.data = t;
                var r = createNS("clipPath")
                  , i = createNS("rect");
                i.setAttribute("width", t.w),
                i.setAttribute("height", t.h),
                i.setAttribute("x", 0),
                i.setAttribute("y", 0);
                var n = createElementID();
                r.setAttribute("id", n),
                r.appendChild(i),
                this.layerElement.setAttribute("clip-path", "url(" + getLocationHref() + "#" + n + ")"),
                e.appendChild(r),
                this.layers = t.layers,
                this.elements = createSizedArray(t.layers.length)
            }
            ,
            SVGRendererBase.prototype.destroy = function() {
                var t;
                this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""),
                this.layerElement = null,
                this.globalData.defs = null;
                var e = this.layers ? this.layers.length : 0;
                for (t = 0; t < e; t += 1)
                    this.elements[t] && this.elements[t].destroy && this.elements[t].destroy();
                this.elements.length = 0,
                this.destroyed = !0,
                this.animationItem = null
            }
            ,
            SVGRendererBase.prototype.updateContainerSize = function() {}
            ,
            SVGRendererBase.prototype.findIndexByInd = function(t) {
                var e = 0
                  , r = this.layers.length;
                for (e = 0; e < r; e += 1)
                    if (this.layers[e].ind === t)
                        return e;
                return -1
            }
            ,
            SVGRendererBase.prototype.buildItem = function(t) {
                var e = this.elements;
                if (!e[t] && 99 !== this.layers[t].ty) {
                    e[t] = !0;
                    var r = this.createItem(this.layers[t]);
                    if (e[t] = r,
                    getExpressionsPlugin() && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(r),
                    r.initExpressions()),
                    this.appendElementInPos(r, t),
                    this.layers[t].tt) {
                        var i = "tp"in this.layers[t] ? this.findIndexByInd(this.layers[t].tp) : t - 1;
                        if (-1 === i)
                            return;
                        if (this.elements[i] && !0 !== this.elements[i]) {
                            var n = e[i].getMatte(this.layers[t].tt);
                            r.setMatte(n)
                        } else
                            this.buildItem(i),
                            this.addPendingElement(r)
                    }
                }
            }
            ,
            SVGRendererBase.prototype.checkPendingElements = function() {
                for (; this.pendingElements.length; ) {
                    var t = this.pendingElements.pop();
                    if (t.checkParenting(),
                    t.data.tt)
                        for (var e = 0, r = this.elements.length; e < r; ) {
                            if (this.elements[e] === t) {
                                var i = "tp"in t.data ? this.findIndexByInd(t.data.tp) : e - 1
                                  , n = this.elements[i].getMatte(this.layers[e].tt);
                                t.setMatte(n);
                                break
                            }
                            e += 1
                        }
                }
            }
            ,
            SVGRendererBase.prototype.renderFrame = function(t) {
                if (this.renderedFrame !== t && !this.destroyed) {
                    var e;
                    null === t ? t = this.renderedFrame : this.renderedFrame = t,
                    this.globalData.frameNum = t,
                    this.globalData.frameId += 1,
                    this.globalData.projectInterface.currentFrame = t,
                    this.globalData._mdf = !1;
                    var r = this.layers.length;
                    for (this.completeLayers || this.checkLayers(t),
                    e = r - 1; e >= 0; e -= 1)
                        (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
                    if (this.globalData._mdf)
                        for (e = 0; e < r; e += 1)
                            (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
                }
            }
            ,
            SVGRendererBase.prototype.appendElementInPos = function(t, e) {
                var r = t.getBaseElement();
                if (r) {
                    for (var i, n = 0; n < e; )
                        this.elements[n] && !0 !== this.elements[n] && this.elements[n].getBaseElement() && (i = this.elements[n].getBaseElement()),
                        n += 1;
                    i ? this.layerElement.insertBefore(r, i) : this.layerElement.appendChild(r)
                }
            }
            ,
            SVGRendererBase.prototype.hide = function() {
                this.layerElement.style.display = "none"
            }
            ,
            SVGRendererBase.prototype.show = function() {
                this.layerElement.style.display = "block"
            }
            ,
            extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement),
            ICompElement.prototype.initElement = function(t, e, r) {
                this.initFrame(),
                this.initBaseData(t, e, r),
                this.initTransform(t, e, r),
                this.initRenderable(),
                this.initHierarchy(),
                this.initRendererElement(),
                this.createContainerElements(),
                this.createRenderableComponents(),
                !this.data.xt && e.progressiveLoad || this.buildAllItems(),
                this.hide()
            }
            ,
            ICompElement.prototype.prepareFrame = function(t) {
                if (this._mdf = !1,
                this.prepareRenderableFrame(t),
                this.prepareProperties(t, this.isInRange),
                this.isInRange || this.data.xt) {
                    if (this.tm._placeholder)
                        this.renderedFrame = t / this.data.sr;
                    else {
                        var e = this.tm.v;
                        e === this.data.op && (e = this.data.op - 1),
                        this.renderedFrame = e
                    }
                    var r, i = this.elements.length;
                    for (this.completeLayers || this.checkLayers(this.renderedFrame),
                    r = i - 1; r >= 0; r -= 1)
                        (this.completeLayers || this.elements[r]) && (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st),
                        this.elements[r]._mdf && (this._mdf = !0))
                }
            }
            ,
            ICompElement.prototype.renderInnerContent = function() {
                var t, e = this.layers.length;
                for (t = 0; t < e; t += 1)
                    (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
            }
            ,
            ICompElement.prototype.setElements = function(t) {
                this.elements = t
            }
            ,
            ICompElement.prototype.getElements = function() {
                return this.elements
            }
            ,
            ICompElement.prototype.destroyElements = function() {
                var t, e = this.layers.length;
                for (t = 0; t < e; t += 1)
                    this.elements[t] && this.elements[t].destroy()
            }
            ,
            ICompElement.prototype.destroy = function() {
                this.destroyElements(),
                this.destroyBaseElement()
            }
            ,
            extendPrototype([SVGRendererBase, ICompElement, SVGBaseElement], SVGCompElement),
            SVGCompElement.prototype.createComp = function(t) {
                return new SVGCompElement(t,this.globalData,this)
            }
            ,
            extendPrototype([SVGRendererBase], SVGRenderer),
            SVGRenderer.prototype.createComp = function(t) {
                return new SVGCompElement(t,this.globalData,this)
            }
            ,
            ShapeTransformManager.prototype = {
                addTransformSequence: function(t) {
                    var e, r = t.length, i = "_";
                    for (e = 0; e < r; e += 1)
                        i += t[e].transform.key + "_";
                    var n = this.sequences[i];
                    return n || (n = {
                        transforms: [].concat(t),
                        finalTransform: new Matrix,
                        _mdf: !1
                    },
                    this.sequences[i] = n,
                    this.sequenceList.push(n)),
                    n
                },
                processSequence: function(t, e) {
                    for (var r = 0, i = t.transforms.length, n = e; r < i && !e; ) {
                        if (t.transforms[r].transform.mProps._mdf) {
                            n = !0;
                            break
                        }
                        r += 1
                    }
                    if (n)
                        for (t.finalTransform.reset(),
                        r = i - 1; r >= 0; r -= 1)
                            t.finalTransform.multiply(t.transforms[r].transform.mProps.v);
                    t._mdf = n
                },
                processSequences: function(t) {
                    var e, r = this.sequenceList.length;
                    for (e = 0; e < r; e += 1)
                        this.processSequence(this.sequenceList[e], t)
                },
                getNewKey: function() {
                    return this.transform_key_count += 1,
                    "_" + this.transform_key_count
                }
            };
            var lumaLoader = function() {
                var t = "__lottie_element_luma_buffer"
                  , e = null
                  , r = null
                  , i = null;
                function n() {
                    var n, s, a;
                    e || (n = createNS("svg"),
                    s = createNS("filter"),
                    a = createNS("feColorMatrix"),
                    s.setAttribute("id", t),
                    a.setAttribute("type", "matrix"),
                    a.setAttribute("color-interpolation-filters", "sRGB"),
                    a.setAttribute("values", "0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0"),
                    s.appendChild(a),
                    n.appendChild(s),
                    n.setAttribute("id", t + "_svg"),
                    featureSupport.svgLumaHidden && (n.style.display = "none"),
                    i = n,
                    document.body.appendChild(i),
                    e = createTag("canvas"),
                    (r = e.getContext("2d")).filter = "url(#" + t + ")",
                    r.fillStyle = "rgba(0,0,0,0)",
                    r.fillRect(0, 0, 1, 1))
                }
                return {
                    load: n,
                    get: function(i) {
                        return e || n(),
                        e.width = i.width,
                        e.height = i.height,
                        r.filter = "url(#" + t + ")",
                        e
                    }
                }
            };
            function createCanvas(t, e) {
                if (featureSupport.offscreenCanvas)
                    return new OffscreenCanvas(t,e);
                var r = createTag("canvas");
                return r.width = t,
                r.height = e,
                r
            }
            var assetLoader = {
                loadLumaCanvas: lumaLoader.load,
                getLumaCanvas: lumaLoader.get,
                createCanvas
            }
              , registeredEffects = {};
            function CVEffects(t) {
                var e, r, i = t.data.ef ? t.data.ef.length : 0;
                for (this.filters = [],
                e = 0; e < i; e += 1) {
                    r = null;
                    var n = t.data.ef[e].ty;
                    registeredEffects[n] && (r = new (0,
                    registeredEffects[n].effect)(t.effectsManager.effectElements[e],t)),
                    r && this.filters.push(r)
                }
                this.filters.length && t.addRenderableComponent(this)
            }
            function registerEffect(t, e) {
                registeredEffects[t] = {
                    effect: e
                }
            }
            function CVMaskElement(t, e) {
                var r;
                this.data = t,
                this.element = e,
                this.masksProperties = this.data.masksProperties || [],
                this.viewData = createSizedArray(this.masksProperties.length);
                var i = this.masksProperties.length
                  , n = !1;
                for (r = 0; r < i; r += 1)
                    "n" !== this.masksProperties[r].mode && (n = !0),
                    this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3);
                this.hasMasks = n,
                n && this.element.addRenderableComponent(this)
            }
            function CVBaseElement() {}
            CVEffects.prototype.renderFrame = function(t) {
                var e, r = this.filters.length;
                for (e = 0; e < r; e += 1)
                    this.filters[e].renderFrame(t)
            }
            ,
            CVEffects.prototype.getEffects = function(t) {
                var e, r = this.filters.length, i = [];
                for (e = 0; e < r; e += 1)
                    this.filters[e].type === t && i.push(this.filters[e]);
                return i
            }
            ,
            CVMaskElement.prototype.renderFrame = function() {
                if (this.hasMasks) {
                    var t, e, r, i, n = this.element.finalTransform.mat, s = this.element.canvasContext, a = this.masksProperties.length;
                    for (s.beginPath(),
                    t = 0; t < a; t += 1)
                        if ("n" !== this.masksProperties[t].mode) {
                            var o;
                            this.masksProperties[t].inv && (s.moveTo(0, 0),
                            s.lineTo(this.element.globalData.compSize.w, 0),
                            s.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h),
                            s.lineTo(0, this.element.globalData.compSize.h),
                            s.lineTo(0, 0)),
                            i = this.viewData[t].v,
                            e = n.applyToPointArray(i.v[0][0], i.v[0][1], 0),
                            s.moveTo(e[0], e[1]);
                            var h = i._length;
                            for (o = 1; o < h; o += 1)
                                r = n.applyToTriplePoints(i.o[o - 1], i.i[o], i.v[o]),
                                s.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
                            r = n.applyToTriplePoints(i.o[o - 1], i.i[0], i.v[0]),
                            s.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5])
                        }
                    this.element.globalData.renderer.save(!0),
                    s.clip()
                }
            }
            ,
            CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty,
            CVMaskElement.prototype.destroy = function() {
                this.element = null
            }
            ;
            var operationsMap = {
                1: "source-in",
                2: "source-out",
                3: "source-in",
                4: "source-out"
            };
            function CVShapeData(t, e, r, i) {
                this.styledShapes = [],
                this.tr = [0, 0, 0, 0, 0, 0];
                var n, s = 4;
                "rc" === e.ty ? s = 5 : "el" === e.ty ? s = 6 : "sr" === e.ty && (s = 7),
                this.sh = ShapePropertyFactory.getShapeProp(t, e, s, t);
                var a, o = r.length;
                for (n = 0; n < o; n += 1)
                    r[n].closed || (a = {
                        transforms: i.addTransformSequence(r[n].transforms),
                        trNodes: []
                    },
                    this.styledShapes.push(a),
                    r[n].elements.push(a))
            }
            function CVShapeElement(t, e, r) {
                this.shapes = [],
                this.shapesData = t.shapes,
                this.stylesList = [],
                this.itemsData = [],
                this.prevViewData = [],
                this.shapeModifiers = [],
                this.processedElements = [],
                this.transformsManager = new ShapeTransformManager,
                this.initElement(t, e, r)
            }
            function CVTextElement(t, e, r) {
                this.textSpans = [],
                this.yOffset = 0,
                this.fillColorAnim = !1,
                this.strokeColorAnim = !1,
                this.strokeWidthAnim = !1,
                this.stroke = !1,
                this.fill = !1,
                this.justifyOffset = 0,
                this.currentRender = null,
                this.renderType = "canvas",
                this.values = {
                    fill: "rgba(0,0,0,0)",
                    stroke: "rgba(0,0,0,0)",
                    sWidth: 0,
                    fValue: ""
                },
                this.initElement(t, e, r)
            }
            function CVImageElement(t, e, r) {
                this.assetData = e.getAssetData(t.refId),
                this.img = e.imageLoader.getAsset(this.assetData),
                this.initElement(t, e, r)
            }
            function CVSolidElement(t, e, r) {
                this.initElement(t, e, r)
            }
            function CanvasRendererBase() {}
            function CanvasContext() {
                this.opacity = -1,
                this.transform = createTypedArray("float32", 16),
                this.fillStyle = "",
                this.strokeStyle = "",
                this.lineWidth = "",
                this.lineCap = "",
                this.lineJoin = "",
                this.miterLimit = "",
                this.id = Math.random()
            }
            function CVContextData() {
                var t;
                for (this.stack = [],
                this.cArrPos = 0,
                this.cTr = new Matrix,
                t = 0; t < 15; t += 1) {
                    var e = new CanvasContext;
                    this.stack[t] = e
                }
                this._length = 15,
                this.nativeContext = null,
                this.transformMat = new Matrix,
                this.currentOpacity = 1,
                this.currentFillStyle = "",
                this.appliedFillStyle = "",
                this.currentStrokeStyle = "",
                this.appliedStrokeStyle = "",
                this.currentLineWidth = "",
                this.appliedLineWidth = "",
                this.currentLineCap = "",
                this.appliedLineCap = "",
                this.currentLineJoin = "",
                this.appliedLineJoin = "",
                this.appliedMiterLimit = "",
                this.currentMiterLimit = ""
            }
            function CVCompElement(t, e, r) {
                this.completeLayers = !1,
                this.layers = t.layers,
                this.pendingElements = [],
                this.elements = createSizedArray(this.layers.length),
                this.initElement(t, e, r),
                this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
                    _placeholder: !0
                }
            }
            function CanvasRenderer(t, e) {
                this.animationItem = t,
                this.renderConfig = {
                    clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
                    context: e && e.context || null,
                    progressiveLoad: e && e.progressiveLoad || !1,
                    preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
                    imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                    contentVisibility: e && e.contentVisibility || "visible",
                    className: e && e.className || "",
                    id: e && e.id || "",
                    runExpressions: !e || void 0 === e.runExpressions || e.runExpressions
                },
                this.renderConfig.dpr = e && e.dpr || 1,
                this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1),
                this.renderedFrame = -1,
                this.globalData = {
                    frameNum: -1,
                    _mdf: !1,
                    renderConfig: this.renderConfig,
                    currentGlobalAlpha: -1
                },
                this.contextData = new CVContextData,
                this.elements = [],
                this.pendingElements = [],
                this.transformMat = new Matrix,
                this.completeLayers = !1,
                this.rendererType = "canvas",
                this.renderConfig.clearCanvas && (this.ctxTransform = this.contextData.transform.bind(this.contextData),
                this.ctxOpacity = this.contextData.opacity.bind(this.contextData),
                this.ctxFillStyle = this.contextData.fillStyle.bind(this.contextData),
                this.ctxStrokeStyle = this.contextData.strokeStyle.bind(this.contextData),
                this.ctxLineWidth = this.contextData.lineWidth.bind(this.contextData),
                this.ctxLineCap = this.contextData.lineCap.bind(this.contextData),
                this.ctxLineJoin = this.contextData.lineJoin.bind(this.contextData),
                this.ctxMiterLimit = this.contextData.miterLimit.bind(this.contextData),
                this.ctxFill = this.contextData.fill.bind(this.contextData),
                this.ctxFillRect = this.contextData.fillRect.bind(this.contextData),
                this.ctxStroke = this.contextData.stroke.bind(this.contextData),
                this.save = this.contextData.save.bind(this.contextData))
            }
            function HBaseElement() {}
            function HSolidElement(t, e, r) {
                this.initElement(t, e, r)
            }
            function HShapeElement(t, e, r) {
                this.shapes = [],
                this.shapesData = t.shapes,
                this.stylesList = [],
                this.shapeModifiers = [],
                this.itemsData = [],
                this.processedElements = [],
                this.animatedContents = [],
                this.shapesContainer = createNS("g"),
                this.initElement(t, e, r),
                this.prevViewData = [],
                this.currentBBox = {
                    x: 999999,
                    y: -999999,
                    h: 0,
                    w: 0
                }
            }
            function HTextElement(t, e, r) {
                this.textSpans = [],
                this.textPaths = [],
                this.currentBBox = {
                    x: 999999,
                    y: -999999,
                    h: 0,
                    w: 0
                },
                this.renderType = "svg",
                this.isMasked = !1,
                this.initElement(t, e, r)
            }
            function HCameraElement(t, e, r) {
                this.initFrame(),
                this.initBaseData(t, e, r),
                this.initHierarchy();
                var i = PropertyFactory.getProp;
                if (this.pe = i(this, t.pe, 0, 0, this),
                t.ks.p.s ? (this.px = i(this, t.ks.p.x, 1, 0, this),
                this.py = i(this, t.ks.p.y, 1, 0, this),
                this.pz = i(this, t.ks.p.z, 1, 0, this)) : this.p = i(this, t.ks.p, 1, 0, this),
                t.ks.a && (this.a = i(this, t.ks.a, 1, 0, this)),
                t.ks.or.k.length && t.ks.or.k[0].to) {
                    var n, s = t.ks.or.k.length;
                    for (n = 0; n < s; n += 1)
                        t.ks.or.k[n].to = null,
                        t.ks.or.k[n].ti = null
                }
                this.or = i(this, t.ks.or, 1, degToRads, this),
                this.or.sh = !0,
                this.rx = i(this, t.ks.rx, 0, degToRads, this),
                this.ry = i(this, t.ks.ry, 0, degToRads, this),
                this.rz = i(this, t.ks.rz, 0, degToRads, this),
                this.mat = new Matrix,
                this._prevMat = new Matrix,
                this._isFirstFrame = !0,
                this.finalTransform = {
                    mProp: this
                }
            }
            function HImageElement(t, e, r) {
                this.assetData = e.getAssetData(t.refId),
                this.initElement(t, e, r)
            }
            function HybridRendererBase(t, e) {
                this.animationItem = t,
                this.layers = null,
                this.renderedFrame = -1,
                this.renderConfig = {
                    className: e && e.className || "",
                    imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                    hideOnTransparent: !(e && !1 === e.hideOnTransparent),
                    filterSize: {
                        width: e && e.filterSize && e.filterSize.width || "400%",
                        height: e && e.filterSize && e.filterSize.height || "400%",
                        x: e && e.filterSize && e.filterSize.x || "-100%",
                        y: e && e.filterSize && e.filterSize.y || "-100%"
                    }
                },
                this.globalData = {
                    _mdf: !1,
                    frameNum: -1,
                    renderConfig: this.renderConfig
                },
                this.pendingElements = [],
                this.elements = [],
                this.threeDElements = [],
                this.destroyed = !1,
                this.camera = null,
                this.supports3d = !0,
                this.rendererType = "html"
            }
            function HCompElement(t, e, r) {
                this.layers = t.layers,
                this.supports3d = !t.hasMask,
                this.completeLayers = !1,
                this.pendingElements = [],
                this.elements = this.layers ? createSizedArray(this.layers.length) : [],
                this.initElement(t, e, r),
                this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
                    _placeholder: !0
                }
            }
            function HybridRenderer(t, e) {
                this.animationItem = t,
                this.layers = null,
                this.renderedFrame = -1,
                this.renderConfig = {
                    className: e && e.className || "",
                    imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                    hideOnTransparent: !(e && !1 === e.hideOnTransparent),
                    filterSize: {
                        width: e && e.filterSize && e.filterSize.width || "400%",
                        height: e && e.filterSize && e.filterSize.height || "400%",
                        x: e && e.filterSize && e.filterSize.x || "-100%",
                        y: e && e.filterSize && e.filterSize.y || "-100%"
                    },
                    runExpressions: !e || void 0 === e.runExpressions || e.runExpressions
                },
                this.globalData = {
                    _mdf: !1,
                    frameNum: -1,
                    renderConfig: this.renderConfig
                },
                this.pendingElements = [],
                this.elements = [],
                this.threeDElements = [],
                this.destroyed = !1,
                this.camera = null,
                this.supports3d = !0,
                this.rendererType = "html"
            }
            CVBaseElement.prototype = {
                createElements: function() {},
                initRendererElement: function() {},
                createContainerElements: function() {
                    if (this.data.tt >= 1) {
                        this.buffers = [];
                        var t = this.globalData.canvasContext
                          , e = assetLoader.createCanvas(t.canvas.width, t.canvas.height);
                        this.buffers.push(e);
                        var r = assetLoader.createCanvas(t.canvas.width, t.canvas.height);
                        this.buffers.push(r),
                        this.data.tt >= 3 && !document._isProxy && assetLoader.loadLumaCanvas()
                    }
                    this.canvasContext = this.globalData.canvasContext,
                    this.transformCanvas = this.globalData.transformCanvas,
                    this.renderableEffectsManager = new CVEffects(this),
                    this.searchEffectTransforms()
                },
                createContent: function() {},
                setBlendMode: function() {
                    var t = this.globalData;
                    if (t.blendMode !== this.data.bm) {
                        t.blendMode = this.data.bm;
                        var e = getBlendMode(this.data.bm);
                        t.canvasContext.globalCompositeOperation = e
                    }
                },
                createRenderableComponents: function() {
                    this.maskManager = new CVMaskElement(this.data,this),
                    this.transformEffects = this.renderableEffectsManager.getEffects(effectTypes.TRANSFORM_EFFECT)
                },
                hideElement: function() {
                    this.hidden || this.isInRange && !this.isTransparent || (this.hidden = !0)
                },
                showElement: function() {
                    this.isInRange && !this.isTransparent && (this.hidden = !1,
                    this._isFirstFrame = !0,
                    this.maskManager._isFirstFrame = !0)
                },
                clearCanvas: function(t) {
                    t.clearRect(this.transformCanvas.tx, this.transformCanvas.ty, this.transformCanvas.w * this.transformCanvas.sx, this.transformCanvas.h * this.transformCanvas.sy)
                },
                prepareLayer: function() {
                    if (this.data.tt >= 1) {
                        var t = this.buffers[0].getContext("2d");
                        this.clearCanvas(t),
                        t.drawImage(this.canvasContext.canvas, 0, 0),
                        this.currentTransform = this.canvasContext.getTransform(),
                        this.canvasContext.setTransform(1, 0, 0, 1, 0, 0),
                        this.clearCanvas(this.canvasContext),
                        this.canvasContext.setTransform(this.currentTransform)
                    }
                },
                exitLayer: function() {
                    if (this.data.tt >= 1) {
                        var t = this.buffers[1]
                          , e = t.getContext("2d");
                        if (this.clearCanvas(e),
                        e.drawImage(this.canvasContext.canvas, 0, 0),
                        this.canvasContext.setTransform(1, 0, 0, 1, 0, 0),
                        this.clearCanvas(this.canvasContext),
                        this.canvasContext.setTransform(this.currentTransform),
                        this.comp.getElementById("tp"in this.data ? this.data.tp : this.data.ind - 1).renderFrame(!0),
                        this.canvasContext.setTransform(1, 0, 0, 1, 0, 0),
                        this.data.tt >= 3 && !document._isProxy) {
                            var r = assetLoader.getLumaCanvas(this.canvasContext.canvas);
                            r.getContext("2d").drawImage(this.canvasContext.canvas, 0, 0),
                            this.clearCanvas(this.canvasContext),
                            this.canvasContext.drawImage(r, 0, 0)
                        }
                        this.canvasContext.globalCompositeOperation = operationsMap[this.data.tt],
                        this.canvasContext.drawImage(t, 0, 0),
                        this.canvasContext.globalCompositeOperation = "destination-over",
                        this.canvasContext.drawImage(this.buffers[0], 0, 0),
                        this.canvasContext.setTransform(this.currentTransform),
                        this.canvasContext.globalCompositeOperation = "source-over"
                    }
                },
                renderFrame: function(t) {
                    if (!this.hidden && !this.data.hd && (1 !== this.data.td || t)) {
                        this.renderTransform(),
                        this.renderRenderable(),
                        this.renderLocalTransform(),
                        this.setBlendMode();
                        var e = 0 === this.data.ty;
                        this.prepareLayer(),
                        this.globalData.renderer.save(e),
                        this.globalData.renderer.ctxTransform(this.finalTransform.localMat.props),
                        this.globalData.renderer.ctxOpacity(this.finalTransform.localOpacity),
                        this.renderInnerContent(),
                        this.globalData.renderer.restore(e),
                        this.exitLayer(),
                        this.maskManager.hasMasks && this.globalData.renderer.restore(!0),
                        this._isFirstFrame && (this._isFirstFrame = !1)
                    }
                },
                destroy: function() {
                    this.canvasContext = null,
                    this.data = null,
                    this.globalData = null,
                    this.maskManager.destroy()
                },
                mHelper: new Matrix
            },
            CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement,
            CVBaseElement.prototype.show = CVBaseElement.prototype.showElement,
            CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated,
            extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement),
            CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement,
            CVShapeElement.prototype.transformHelper = {
                opacity: 1,
                _opMdf: !1
            },
            CVShapeElement.prototype.dashResetter = [],
            CVShapeElement.prototype.createContent = function() {
                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, [])
            }
            ,
            CVShapeElement.prototype.createStyleElement = function(t, e) {
                var r = {
                    data: t,
                    type: t.ty,
                    preTransforms: this.transformsManager.addTransformSequence(e),
                    transforms: [],
                    elements: [],
                    closed: !0 === t.hd
                }
                  , i = {};
                if ("fl" === t.ty || "st" === t.ty ? (i.c = PropertyFactory.getProp(this, t.c, 1, 255, this),
                i.c.k || (r.co = "rgb(" + bmFloor(i.c.v[0]) + "," + bmFloor(i.c.v[1]) + "," + bmFloor(i.c.v[2]) + ")")) : "gf" !== t.ty && "gs" !== t.ty || (i.s = PropertyFactory.getProp(this, t.s, 1, null, this),
                i.e = PropertyFactory.getProp(this, t.e, 1, null, this),
                i.h = PropertyFactory.getProp(this, t.h || {
                    k: 0
                }, 0, .01, this),
                i.a = PropertyFactory.getProp(this, t.a || {
                    k: 0
                }, 0, degToRads, this),
                i.g = new GradientProperty(this,t.g,this)),
                i.o = PropertyFactory.getProp(this, t.o, 0, .01, this),
                "st" === t.ty || "gs" === t.ty) {
                    if (r.lc = lineCapEnum[t.lc || 2],
                    r.lj = lineJoinEnum[t.lj || 2],
                    1 == t.lj && (r.ml = t.ml),
                    i.w = PropertyFactory.getProp(this, t.w, 0, null, this),
                    i.w.k || (r.wi = i.w.v),
                    t.d) {
                        var n = new DashProperty(this,t.d,"canvas",this);
                        i.d = n,
                        i.d.k || (r.da = i.d.dashArray,
                        r.do = i.d.dashoffset[0])
                    }
                } else
                    r.r = 2 === t.r ? "evenodd" : "nonzero";
                return this.stylesList.push(r),
                i.style = r,
                i
            }
            ,
            CVShapeElement.prototype.createGroupElement = function() {
                return {
                    it: [],
                    prevViewData: []
                }
            }
            ,
            CVShapeElement.prototype.createTransformElement = function(t) {
                return {
                    transform: {
                        opacity: 1,
                        _opMdf: !1,
                        key: this.transformsManager.getNewKey(),
                        op: PropertyFactory.getProp(this, t.o, 0, .01, this),
                        mProps: TransformPropertyFactory.getTransformProperty(this, t, this)
                    }
                }
            }
            ,
            CVShapeElement.prototype.createShapeElement = function(t) {
                var e = new CVShapeData(this,t,this.stylesList,this.transformsManager);
                return this.shapes.push(e),
                this.addShapeToModifiers(e),
                e
            }
            ,
            CVShapeElement.prototype.reloadShapes = function() {
                var t;
                this._isFirstFrame = !0;
                var e = this.itemsData.length;
                for (t = 0; t < e; t += 1)
                    this.prevViewData[t] = this.itemsData[t];
                for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []),
                e = this.dynamicProperties.length,
                t = 0; t < e; t += 1)
                    this.dynamicProperties[t].getValue();
                this.renderModifiers(),
                this.transformsManager.processSequences(this._isFirstFrame)
            }
            ,
            CVShapeElement.prototype.addTransformToStyleList = function(t) {
                var e, r = this.stylesList.length;
                for (e = 0; e < r; e += 1)
                    this.stylesList[e].closed || this.stylesList[e].transforms.push(t)
            }
            ,
            CVShapeElement.prototype.removeTransformFromStyleList = function() {
                var t, e = this.stylesList.length;
                for (t = 0; t < e; t += 1)
                    this.stylesList[t].closed || this.stylesList[t].transforms.pop()
            }
            ,
            CVShapeElement.prototype.closeStyles = function(t) {
                var e, r = t.length;
                for (e = 0; e < r; e += 1)
                    t[e].closed = !0
            }
            ,
            CVShapeElement.prototype.searchShapes = function(t, e, r, i, n) {
                var s, a, o, h, l, p, c = t.length - 1, f = [], u = [], d = [].concat(n);
                for (s = c; s >= 0; s -= 1) {
                    if ((h = this.searchProcessedElement(t[s])) ? e[s] = r[h - 1] : t[s]._shouldRender = i,
                    "fl" === t[s].ty || "st" === t[s].ty || "gf" === t[s].ty || "gs" === t[s].ty)
                        h ? e[s].style.closed = !1 : e[s] = this.createStyleElement(t[s], d),
                        f.push(e[s].style);
                    else if ("gr" === t[s].ty) {
                        if (h)
                            for (o = e[s].it.length,
                            a = 0; a < o; a += 1)
                                e[s].prevViewData[a] = e[s].it[a];
                        else
                            e[s] = this.createGroupElement(t[s]);
                        this.searchShapes(t[s].it, e[s].it, e[s].prevViewData, i, d)
                    } else
                        "tr" === t[s].ty ? (h || (p = this.createTransformElement(t[s]),
                        e[s] = p),
                        d.push(e[s]),
                        this.addTransformToStyleList(e[s])) : "sh" === t[s].ty || "rc" === t[s].ty || "el" === t[s].ty || "sr" === t[s].ty ? h || (e[s] = this.createShapeElement(t[s])) : "tm" === t[s].ty || "rd" === t[s].ty || "pb" === t[s].ty || "zz" === t[s].ty || "op" === t[s].ty ? (h ? (l = e[s]).closed = !1 : ((l = ShapeModifiers.getModifier(t[s].ty)).init(this, t[s]),
                        e[s] = l,
                        this.shapeModifiers.push(l)),
                        u.push(l)) : "rp" === t[s].ty && (h ? (l = e[s]).closed = !0 : (l = ShapeModifiers.getModifier(t[s].ty),
                        e[s] = l,
                        l.init(this, t, s, e),
                        this.shapeModifiers.push(l),
                        i = !1),
                        u.push(l));
                    this.addProcessedElement(t[s], s + 1)
                }
                for (this.removeTransformFromStyleList(),
                this.closeStyles(f),
                c = u.length,
                s = 0; s < c; s += 1)
                    u[s].closed = !0
            }
            ,
            CVShapeElement.prototype.renderInnerContent = function() {
                this.transformHelper.opacity = 1,
                this.transformHelper._opMdf = !1,
                this.renderModifiers(),
                this.transformsManager.processSequences(this._isFirstFrame),
                this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0)
            }
            ,
            CVShapeElement.prototype.renderShapeTransform = function(t, e) {
                (t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity,
                e.opacity *= e.op.v,
                e._opMdf = !0)
            }
            ,
            CVShapeElement.prototype.drawLayer = function() {
                var t, e, r, i, n, s, a, o, h, l = this.stylesList.length, p = this.globalData.renderer, c = this.globalData.canvasContext;
                for (t = 0; t < l; t += 1)
                    if (("st" !== (o = (h = this.stylesList[t]).type) && "gs" !== o || 0 !== h.wi) && h.data._shouldRender && 0 !== h.coOp && 0 !== this.globalData.currentGlobalAlpha) {
                        for (p.save(),
                        s = h.elements,
                        "st" === o || "gs" === o ? (p.ctxStrokeStyle("st" === o ? h.co : h.grd),
                        p.ctxLineWidth(h.wi),
                        p.ctxLineCap(h.lc),
                        p.ctxLineJoin(h.lj),
                        p.ctxMiterLimit(h.ml || 0)) : p.ctxFillStyle("fl" === o ? h.co : h.grd),
                        p.ctxOpacity(h.coOp),
                        "st" !== o && "gs" !== o && c.beginPath(),
                        p.ctxTransform(h.preTransforms.finalTransform.props),
                        r = s.length,
                        e = 0; e < r; e += 1) {
                            for ("st" !== o && "gs" !== o || (c.beginPath(),
                            h.da && (c.setLineDash(h.da),
                            c.lineDashOffset = h.do)),
                            n = (a = s[e].trNodes).length,
                            i = 0; i < n; i += 1)
                                "m" === a[i].t ? c.moveTo(a[i].p[0], a[i].p[1]) : "c" === a[i].t ? c.bezierCurveTo(a[i].pts[0], a[i].pts[1], a[i].pts[2], a[i].pts[3], a[i].pts[4], a[i].pts[5]) : c.closePath();
                            "st" !== o && "gs" !== o || (p.ctxStroke(),
                            h.da && c.setLineDash(this.dashResetter))
                        }
                        "st" !== o && "gs" !== o && this.globalData.renderer.ctxFill(h.r),
                        p.restore()
                    }
            }
            ,
            CVShapeElement.prototype.renderShape = function(t, e, r, i) {
                var n, s;
                for (s = t,
                n = e.length - 1; n >= 0; n -= 1)
                    "tr" === e[n].ty ? (s = r[n].transform,
                    this.renderShapeTransform(t, s)) : "sh" === e[n].ty || "el" === e[n].ty || "rc" === e[n].ty || "sr" === e[n].ty ? this.renderPath(e[n], r[n]) : "fl" === e[n].ty ? this.renderFill(e[n], r[n], s) : "st" === e[n].ty ? this.renderStroke(e[n], r[n], s) : "gf" === e[n].ty || "gs" === e[n].ty ? this.renderGradientFill(e[n], r[n], s) : "gr" === e[n].ty ? this.renderShape(s, e[n].it, r[n].it) : e[n].ty;
                i && this.drawLayer()
            }
            ,
            CVShapeElement.prototype.renderStyledShape = function(t, e) {
                if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
                    var r, i, n, s = t.trNodes, a = e.paths, o = a._length;
                    s.length = 0;
                    var h = t.transforms.finalTransform;
                    for (n = 0; n < o; n += 1) {
                        var l = a.shapes[n];
                        if (l && l.v) {
                            for (i = l._length,
                            r = 1; r < i; r += 1)
                                1 === r && s.push({
                                    t: "m",
                                    p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                                }),
                                s.push({
                                    t: "c",
                                    pts: h.applyToTriplePoints(l.o[r - 1], l.i[r], l.v[r])
                                });
                            1 === i && s.push({
                                t: "m",
                                p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                            }),
                            l.c && i && (s.push({
                                t: "c",
                                pts: h.applyToTriplePoints(l.o[r - 1], l.i[0], l.v[0])
                            }),
                            s.push({
                                t: "z"
                            }))
                        }
                    }
                    t.trNodes = s
                }
            }
            ,
            CVShapeElement.prototype.renderPath = function(t, e) {
                if (!0 !== t.hd && t._shouldRender) {
                    var r, i = e.styledShapes.length;
                    for (r = 0; r < i; r += 1)
                        this.renderStyledShape(e.styledShapes[r], e.sh)
                }
            }
            ,
            CVShapeElement.prototype.renderFill = function(t, e, r) {
                var i = e.style;
                (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"),
                (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity)
            }
            ,
            CVShapeElement.prototype.renderGradientFill = function(t, e, r) {
                var i, n = e.style;
                if (!n.grd || e.g._mdf || e.s._mdf || e.e._mdf || 1 !== t.t && (e.h._mdf || e.a._mdf)) {
                    var s, a = this.globalData.canvasContext, o = e.s.v, h = e.e.v;
                    if (1 === t.t)
                        i = a.createLinearGradient(o[0], o[1], h[0], h[1]);
                    else {
                        var l = Math.sqrt(Math.pow(o[0] - h[0], 2) + Math.pow(o[1] - h[1], 2))
                          , p = Math.atan2(h[1] - o[1], h[0] - o[0])
                          , c = e.h.v;
                        c >= 1 ? c = .99 : c <= -1 && (c = -.99);
                        var f = l * c
                          , u = Math.cos(p + e.a.v) * f + o[0]
                          , d = Math.sin(p + e.a.v) * f + o[1];
                        i = a.createRadialGradient(u, d, 0, o[0], o[1], l)
                    }
                    var m = t.g.p
                      , g = e.g.c
                      , y = 1;
                    for (s = 0; s < m; s += 1)
                        e.g._hasOpacity && e.g._collapsable && (y = e.g.o[2 * s + 1]),
                        i.addColorStop(g[4 * s] / 100, "rgba(" + g[4 * s + 1] + "," + g[4 * s + 2] + "," + g[4 * s + 3] + "," + y + ")");
                    n.grd = i
                }
                n.coOp = e.o.v * r.opacity
            }
            ,
            CVShapeElement.prototype.renderStroke = function(t, e, r) {
                var i = e.style
                  , n = e.d;
                n && (n._mdf || this._isFirstFrame) && (i.da = n.dashArray,
                i.do = n.dashoffset[0]),
                (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"),
                (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity),
                (e.w._mdf || this._isFirstFrame) && (i.wi = e.w.v)
            }
            ,
            CVShapeElement.prototype.destroy = function() {
                this.shapesData = null,
                this.globalData = null,
                this.canvasContext = null,
                this.stylesList.length = 0,
                this.itemsData.length = 0
            }
            ,
            extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement),
            CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"),
            CVTextElement.prototype.buildNewText = function() {
                var t = this.textProperty.currentData;
                this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
                var e = !1;
                t.fc ? (e = !0,
                this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)",
                this.fill = e;
                var r = !1;
                t.sc && (r = !0,
                this.values.stroke = this.buildColor(t.sc),
                this.values.sWidth = t.sw);
                var i, n, s, a, o, h, l, p, c, f, u, d, m = this.globalData.fontManager.getFontByName(t.f), g = t.l, y = this.mHelper;
                this.stroke = r,
                this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily,
                n = t.finalText.length;
                var v = this.data.singleShape
                  , _ = .001 * t.tr * t.finalSize
                  , b = 0
                  , x = 0
                  , E = !0
                  , S = 0;
                for (i = 0; i < n; i += 1) {
                    a = (s = this.globalData.fontManager.getCharData(t.finalText[i], m.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily)) && s.data || {},
                    y.reset(),
                    v && g[i].n && (b = -_,
                    x += t.yOffset,
                    x += E ? 1 : 0,
                    E = !1),
                    c = (l = a.shapes ? a.shapes[0].it : []).length,
                    y.scale(t.finalSize / 100, t.finalSize / 100),
                    v && this.applyTextPropertiesToMatrix(t, y, g[i].line, b, x),
                    u = createSizedArray(c - 1);
                    var P = 0;
                    for (p = 0; p < c; p += 1)
                        if ("sh" === l[p].ty) {
                            for (h = l[p].ks.k.i.length,
                            f = l[p].ks.k,
                            d = [],
                            o = 1; o < h; o += 1)
                                1 === o && d.push(y.applyToX(f.v[0][0], f.v[0][1], 0), y.applyToY(f.v[0][0], f.v[0][1], 0)),
                                d.push(y.applyToX(f.o[o - 1][0], f.o[o - 1][1], 0), y.applyToY(f.o[o - 1][0], f.o[o - 1][1], 0), y.applyToX(f.i[o][0], f.i[o][1], 0), y.applyToY(f.i[o][0], f.i[o][1], 0), y.applyToX(f.v[o][0], f.v[o][1], 0), y.applyToY(f.v[o][0], f.v[o][1], 0));
                            d.push(y.applyToX(f.o[o - 1][0], f.o[o - 1][1], 0), y.applyToY(f.o[o - 1][0], f.o[o - 1][1], 0), y.applyToX(f.i[0][0], f.i[0][1], 0), y.applyToY(f.i[0][0], f.i[0][1], 0), y.applyToX(f.v[0][0], f.v[0][1], 0), y.applyToY(f.v[0][0], f.v[0][1], 0)),
                            u[P] = d,
                            P += 1
                        }
                    v && (b += g[i].l,
                    b += _),
                    this.textSpans[S] ? this.textSpans[S].elem = u : this.textSpans[S] = {
                        elem: u
                    },
                    S += 1
                }
            }
            ,
            CVTextElement.prototype.renderInnerContent = function() {
                var t, e, r, i, n, s;
                this.validateText(),
                this.canvasContext.font = this.values.fValue,
                this.globalData.renderer.ctxLineCap("butt"),
                this.globalData.renderer.ctxLineJoin("miter"),
                this.globalData.renderer.ctxMiterLimit(4),
                this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
                var a, o = this.textAnimator.renderedLetters, h = this.textProperty.currentData.l;
                e = h.length;
                var l, p, c = null, f = null, u = null, d = this.globalData.renderer;
                for (t = 0; t < e; t += 1)
                    if (!h[t].n) {
                        if ((a = o[t]) && (d.save(),
                        d.ctxTransform(a.p),
                        d.ctxOpacity(a.o)),
                        this.fill) {
                            for (a && a.fc ? c !== a.fc && (d.ctxFillStyle(a.fc),
                            c = a.fc) : c !== this.values.fill && (c = this.values.fill,
                            d.ctxFillStyle(this.values.fill)),
                            i = (l = this.textSpans[t].elem).length,
                            this.globalData.canvasContext.beginPath(),
                            r = 0; r < i; r += 1)
                                for (s = (p = l[r]).length,
                                this.globalData.canvasContext.moveTo(p[0], p[1]),
                                n = 2; n < s; n += 6)
                                    this.globalData.canvasContext.bezierCurveTo(p[n], p[n + 1], p[n + 2], p[n + 3], p[n + 4], p[n + 5]);
                            this.globalData.canvasContext.closePath(),
                            d.ctxFill()
                        }
                        if (this.stroke) {
                            for (a && a.sw ? u !== a.sw && (u = a.sw,
                            d.ctxLineWidth(a.sw)) : u !== this.values.sWidth && (u = this.values.sWidth,
                            d.ctxLineWidth(this.values.sWidth)),
                            a && a.sc ? f !== a.sc && (f = a.sc,
                            d.ctxStrokeStyle(a.sc)) : f !== this.values.stroke && (f = this.values.stroke,
                            d.ctxStrokeStyle(this.values.stroke)),
                            i = (l = this.textSpans[t].elem).length,
                            this.globalData.canvasContext.beginPath(),
                            r = 0; r < i; r += 1)
                                for (s = (p = l[r]).length,
                                this.globalData.canvasContext.moveTo(p[0], p[1]),
                                n = 2; n < s; n += 6)
                                    this.globalData.canvasContext.bezierCurveTo(p[n], p[n + 1], p[n + 2], p[n + 3], p[n + 4], p[n + 5]);
                            this.globalData.canvasContext.closePath(),
                            d.ctxStroke()
                        }
                        a && this.globalData.renderer.restore()
                    }
            }
            ,
            extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement),
            CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement,
            CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame,
            CVImageElement.prototype.createContent = function() {
                if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
                    var t = createTag("canvas");
                    t.width = this.assetData.w,
                    t.height = this.assetData.h;
                    var e, r, i = t.getContext("2d"), n = this.img.width, s = this.img.height, a = n / s, o = this.assetData.w / this.assetData.h, h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
                    a > o && "xMidYMid slice" === h || a < o && "xMidYMid slice" !== h ? e = (r = s) * o : r = (e = n) / o,
                    i.drawImage(this.img, (n - e) / 2, (s - r) / 2, e, r, 0, 0, this.assetData.w, this.assetData.h),
                    this.img = t
                }
            }
            ,
            CVImageElement.prototype.renderInnerContent = function() {
                this.canvasContext.drawImage(this.img, 0, 0)
            }
            ,
            CVImageElement.prototype.destroy = function() {
                this.img = null
            }
            ,
            extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement),
            CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement,
            CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame,
            CVSolidElement.prototype.renderInnerContent = function() {
                this.globalData.renderer.ctxFillStyle(this.data.sc),
                this.globalData.renderer.ctxFillRect(0, 0, this.data.sw, this.data.sh)
            }
            ,
            extendPrototype([BaseRenderer], CanvasRendererBase),
            CanvasRendererBase.prototype.createShape = function(t) {
                return new CVShapeElement(t,this.globalData,this)
            }
            ,
            CanvasRendererBase.prototype.createText = function(t) {
                return new CVTextElement(t,this.globalData,this)
            }
            ,
            CanvasRendererBase.prototype.createImage = function(t) {
                return new CVImageElement(t,this.globalData,this)
            }
            ,
            CanvasRendererBase.prototype.createSolid = function(t) {
                return new CVSolidElement(t,this.globalData,this)
            }
            ,
            CanvasRendererBase.prototype.createNull = SVGRenderer.prototype.createNull,
            CanvasRendererBase.prototype.ctxTransform = function(t) {
                1 === t[0] && 0 === t[1] && 0 === t[4] && 1 === t[5] && 0 === t[12] && 0 === t[13] || this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13])
            }
            ,
            CanvasRendererBase.prototype.ctxOpacity = function(t) {
                this.canvasContext.globalAlpha *= t < 0 ? 0 : t
            }
            ,
            CanvasRendererBase.prototype.ctxFillStyle = function(t) {
                this.canvasContext.fillStyle = t
            }
            ,
            CanvasRendererBase.prototype.ctxStrokeStyle = function(t) {
                this.canvasContext.strokeStyle = t
            }
            ,
            CanvasRendererBase.prototype.ctxLineWidth = function(t) {
                this.canvasContext.lineWidth = t
            }
            ,
            CanvasRendererBase.prototype.ctxLineCap = function(t) {
                this.canvasContext.lineCap = t
            }
            ,
            CanvasRendererBase.prototype.ctxLineJoin = function(t) {
                this.canvasContext.lineJoin = t
            }
            ,
            CanvasRendererBase.prototype.ctxMiterLimit = function(t) {
                this.canvasContext.miterLimit = t
            }
            ,
            CanvasRendererBase.prototype.ctxFill = function(t) {
                this.canvasContext.fill(t)
            }
            ,
            CanvasRendererBase.prototype.ctxFillRect = function(t, e, r, i) {
                this.canvasContext.fillRect(t, e, r, i)
            }
            ,
            CanvasRendererBase.prototype.ctxStroke = function() {
                this.canvasContext.stroke()
            }
            ,
            CanvasRendererBase.prototype.reset = function() {
                this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore()
            }
            ,
            CanvasRendererBase.prototype.save = function() {
                this.canvasContext.save()
            }
            ,
            CanvasRendererBase.prototype.restore = function(t) {
                this.renderConfig.clearCanvas ? (t && (this.globalData.blendMode = "source-over"),
                this.contextData.restore(t)) : this.canvasContext.restore()
            }
            ,
            CanvasRendererBase.prototype.configAnimation = function(t) {
                if (this.animationItem.wrapper) {
                    this.animationItem.container = createTag("canvas");
                    var e = this.animationItem.container.style;
                    e.width = "100%",
                    e.height = "100%";
                    var r = "0px 0px 0px";
                    e.transformOrigin = r,
                    e.mozTransformOrigin = r,
                    e.webkitTransformOrigin = r,
                    e["-webkit-transform"] = r,
                    e.contentVisibility = this.renderConfig.contentVisibility,
                    this.animationItem.wrapper.appendChild(this.animationItem.container),
                    this.canvasContext = this.animationItem.container.getContext("2d"),
                    this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className),
                    this.renderConfig.id && this.animationItem.container.setAttribute("id", this.renderConfig.id)
                } else
                    this.canvasContext = this.renderConfig.context;
                this.contextData.setContext(this.canvasContext),
                this.data = t,
                this.layers = t.layers,
                this.transformCanvas = {
                    w: t.w,
                    h: t.h,
                    sx: 0,
                    sy: 0,
                    tx: 0,
                    ty: 0
                },
                this.setupGlobalData(t, document.body),
                this.globalData.canvasContext = this.canvasContext,
                this.globalData.renderer = this,
                this.globalData.isDashed = !1,
                this.globalData.progressiveLoad = this.renderConfig.progressiveLoad,
                this.globalData.transformCanvas = this.transformCanvas,
                this.elements = createSizedArray(t.layers.length),
                this.updateContainerSize()
            }
            ,
            CanvasRendererBase.prototype.updateContainerSize = function(t, e) {
                var r, i, n, s;
                if (this.reset(),
                t ? (r = t,
                i = e,
                this.canvasContext.canvas.width = r,
                this.canvasContext.canvas.height = i) : (this.animationItem.wrapper && this.animationItem.container ? (r = this.animationItem.wrapper.offsetWidth,
                i = this.animationItem.wrapper.offsetHeight) : (r = this.canvasContext.canvas.width,
                i = this.canvasContext.canvas.height),
                this.canvasContext.canvas.width = r * this.renderConfig.dpr,
                this.canvasContext.canvas.height = i * this.renderConfig.dpr),
                -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
                    var a = this.renderConfig.preserveAspectRatio.split(" ")
                      , o = a[1] || "meet"
                      , h = a[0] || "xMidYMid"
                      , l = h.substr(0, 4)
                      , p = h.substr(4);
                    n = r / i,
                    (s = this.transformCanvas.w / this.transformCanvas.h) > n && "meet" === o || s < n && "slice" === o ? (this.transformCanvas.sx = r / (this.transformCanvas.w / this.renderConfig.dpr),
                    this.transformCanvas.sy = r / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = i / (this.transformCanvas.h / this.renderConfig.dpr),
                    this.transformCanvas.sy = i / (this.transformCanvas.h / this.renderConfig.dpr)),
                    this.transformCanvas.tx = "xMid" === l && (s < n && "meet" === o || s > n && "slice" === o) ? (r - this.transformCanvas.w * (i / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === l && (s < n && "meet" === o || s > n && "slice" === o) ? (r - this.transformCanvas.w * (i / this.transformCanvas.h)) * this.renderConfig.dpr : 0,
                    this.transformCanvas.ty = "YMid" === p && (s > n && "meet" === o || s < n && "slice" === o) ? (i - this.transformCanvas.h * (r / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === p && (s > n && "meet" === o || s < n && "slice" === o) ? (i - this.transformCanvas.h * (r / this.transformCanvas.w)) * this.renderConfig.dpr : 0
                } else
                    "none" === this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = r / (this.transformCanvas.w / this.renderConfig.dpr),
                    this.transformCanvas.sy = i / (this.transformCanvas.h / this.renderConfig.dpr),
                    this.transformCanvas.tx = 0,
                    this.transformCanvas.ty = 0) : (this.transformCanvas.sx = this.renderConfig.dpr,
                    this.transformCanvas.sy = this.renderConfig.dpr,
                    this.transformCanvas.tx = 0,
                    this.transformCanvas.ty = 0);
                this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1],
                this.ctxTransform(this.transformCanvas.props),
                this.canvasContext.beginPath(),
                this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h),
                this.canvasContext.closePath(),
                this.canvasContext.clip(),
                this.renderFrame(this.renderedFrame, !0)
            }
            ,
            CanvasRendererBase.prototype.destroy = function() {
                var t;
                for (this.renderConfig.clearCanvas && this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""),
                t = (this.layers ? this.layers.length : 0) - 1; t >= 0; t -= 1)
                    this.elements[t] && this.elements[t].destroy && this.elements[t].destroy();
                this.elements.length = 0,
                this.globalData.canvasContext = null,
                this.animationItem.container = null,
                this.destroyed = !0
            }
            ,
            CanvasRendererBase.prototype.renderFrame = function(t, e) {
                if ((this.renderedFrame !== t || !0 !== this.renderConfig.clearCanvas || e) && !this.destroyed && -1 !== t) {
                    var r;
                    this.renderedFrame = t,
                    this.globalData.frameNum = t - this.animationItem._isFirstFrame,
                    this.globalData.frameId += 1,
                    this.globalData._mdf = !this.renderConfig.clearCanvas || e,
                    this.globalData.projectInterface.currentFrame = t;
                    var i = this.layers.length;
                    for (this.completeLayers || this.checkLayers(t),
                    r = i - 1; r >= 0; r -= 1)
                        (this.completeLayers || this.elements[r]) && this.elements[r].prepareFrame(t - this.layers[r].st);
                    if (this.globalData._mdf) {
                        for (!0 === this.renderConfig.clearCanvas ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(),
                        r = i - 1; r >= 0; r -= 1)
                            (this.completeLayers || this.elements[r]) && this.elements[r].renderFrame();
                        !0 !== this.renderConfig.clearCanvas && this.restore()
                    }
                }
            }
            ,
            CanvasRendererBase.prototype.buildItem = function(t) {
                var e = this.elements;
                if (!e[t] && 99 !== this.layers[t].ty) {
                    var r = this.createItem(this.layers[t], this, this.globalData);
                    e[t] = r,
                    r.initExpressions()
                }
            }
            ,
            CanvasRendererBase.prototype.checkPendingElements = function() {
                for (; this.pendingElements.length; )
                    this.pendingElements.pop().checkParenting()
            }
            ,
            CanvasRendererBase.prototype.hide = function() {
                this.animationItem.container.style.display = "none"
            }
            ,
            CanvasRendererBase.prototype.show = function() {
                this.animationItem.container.style.display = "block"
            }
            ,
            CVContextData.prototype.duplicate = function() {
                var t = 2 * this._length
                  , e = 0;
                for (e = this._length; e < t; e += 1)
                    this.stack[e] = new CanvasContext;
                this._length = t
            }
            ,
            CVContextData.prototype.reset = function() {
                this.cArrPos = 0,
                this.cTr.reset(),
                this.stack[this.cArrPos].opacity = 1
            }
            ,
            CVContextData.prototype.restore = function(t) {
                this.cArrPos -= 1;
                var e, r = this.stack[this.cArrPos], i = r.transform, n = this.cTr.props;
                for (e = 0; e < 16; e += 1)
                    n[e] = i[e];
                if (t) {
                    this.nativeContext.restore();
                    var s = this.stack[this.cArrPos + 1];
                    this.appliedFillStyle = s.fillStyle,
                    this.appliedStrokeStyle = s.strokeStyle,
                    this.appliedLineWidth = s.lineWidth,
                    this.appliedLineCap = s.lineCap,
                    this.appliedLineJoin = s.lineJoin,
                    this.appliedMiterLimit = s.miterLimit
                }
                this.nativeContext.setTransform(i[0], i[1], i[4], i[5], i[12], i[13]),
                (t || -1 !== r.opacity && this.currentOpacity !== r.opacity) && (this.nativeContext.globalAlpha = r.opacity,
                this.currentOpacity = r.opacity),
                this.currentFillStyle = r.fillStyle,
                this.currentStrokeStyle = r.strokeStyle,
                this.currentLineWidth = r.lineWidth,
                this.currentLineCap = r.lineCap,
                this.currentLineJoin = r.lineJoin,
                this.currentMiterLimit = r.miterLimit
            }
            ,
            CVContextData.prototype.save = function(t) {
                t && this.nativeContext.save();
                var e = this.cTr.props;
                this._length <= this.cArrPos && this.duplicate();
                var r, i = this.stack[this.cArrPos];
                for (r = 0; r < 16; r += 1)
                    i.transform[r] = e[r];
                this.cArrPos += 1;
                var n = this.stack[this.cArrPos];
                n.opacity = i.opacity,
                n.fillStyle = i.fillStyle,
                n.strokeStyle = i.strokeStyle,
                n.lineWidth = i.lineWidth,
                n.lineCap = i.lineCap,
                n.lineJoin = i.lineJoin,
                n.miterLimit = i.miterLimit
            }
            ,
            CVContextData.prototype.setOpacity = function(t) {
                this.stack[this.cArrPos].opacity = t
            }
            ,
            CVContextData.prototype.setContext = function(t) {
                this.nativeContext = t
            }
            ,
            CVContextData.prototype.fillStyle = function(t) {
                this.stack[this.cArrPos].fillStyle !== t && (this.currentFillStyle = t,
                this.stack[this.cArrPos].fillStyle = t)
            }
            ,
            CVContextData.prototype.strokeStyle = function(t) {
                this.stack[this.cArrPos].strokeStyle !== t && (this.currentStrokeStyle = t,
                this.stack[this.cArrPos].strokeStyle = t)
            }
            ,
            CVContextData.prototype.lineWidth = function(t) {
                this.stack[this.cArrPos].lineWidth !== t && (this.currentLineWidth = t,
                this.stack[this.cArrPos].lineWidth = t)
            }
            ,
            CVContextData.prototype.lineCap = function(t) {
                this.stack[this.cArrPos].lineCap !== t && (this.currentLineCap = t,
                this.stack[this.cArrPos].lineCap = t)
            }
            ,
            CVContextData.prototype.lineJoin = function(t) {
                this.stack[this.cArrPos].lineJoin !== t && (this.currentLineJoin = t,
                this.stack[this.cArrPos].lineJoin = t)
            }
            ,
            CVContextData.prototype.miterLimit = function(t) {
                this.stack[this.cArrPos].miterLimit !== t && (this.currentMiterLimit = t,
                this.stack[this.cArrPos].miterLimit = t)
            }
            ,
            CVContextData.prototype.transform = function(t) {
                this.transformMat.cloneFromProps(t);
                var e = this.cTr;
                this.transformMat.multiply(e),
                e.cloneFromProps(this.transformMat.props);
                var r = e.props;
                this.nativeContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13])
            }
            ,
            CVContextData.prototype.opacity = function(t) {
                var e = this.stack[this.cArrPos].opacity;
                e *= t < 0 ? 0 : t,
                this.stack[this.cArrPos].opacity !== e && (this.currentOpacity !== t && (this.nativeContext.globalAlpha = t,
                this.currentOpacity = t),
                this.stack[this.cArrPos].opacity = e)
            }
            ,
            CVContextData.prototype.fill = function(t) {
                this.appliedFillStyle !== this.currentFillStyle && (this.appliedFillStyle = this.currentFillStyle,
                this.nativeContext.fillStyle = this.appliedFillStyle),
                this.nativeContext.fill(t)
            }
            ,
            CVContextData.prototype.fillRect = function(t, e, r, i) {
                this.appliedFillStyle !== this.currentFillStyle && (this.appliedFillStyle = this.currentFillStyle,
                this.nativeContext.fillStyle = this.appliedFillStyle),
                this.nativeContext.fillRect(t, e, r, i)
            }
            ,
            CVContextData.prototype.stroke = function() {
                this.appliedStrokeStyle !== this.currentStrokeStyle && (this.appliedStrokeStyle = this.currentStrokeStyle,
                this.nativeContext.strokeStyle = this.appliedStrokeStyle),
                this.appliedLineWidth !== this.currentLineWidth && (this.appliedLineWidth = this.currentLineWidth,
                this.nativeContext.lineWidth = this.appliedLineWidth),
                this.appliedLineCap !== this.currentLineCap && (this.appliedLineCap = this.currentLineCap,
                this.nativeContext.lineCap = this.appliedLineCap),
                this.appliedLineJoin !== this.currentLineJoin && (this.appliedLineJoin = this.currentLineJoin,
                this.nativeContext.lineJoin = this.appliedLineJoin),
                this.appliedMiterLimit !== this.currentMiterLimit && (this.appliedMiterLimit = this.currentMiterLimit,
                this.nativeContext.miterLimit = this.appliedMiterLimit),
                this.nativeContext.stroke()
            }
            ,
            extendPrototype([CanvasRendererBase, ICompElement, CVBaseElement], CVCompElement),
            CVCompElement.prototype.renderInnerContent = function() {
                var t, e = this.canvasContext;
                for (e.beginPath(),
                e.moveTo(0, 0),
                e.lineTo(this.data.w, 0),
                e.lineTo(this.data.w, this.data.h),
                e.lineTo(0, this.data.h),
                e.lineTo(0, 0),
                e.clip(),
                t = this.layers.length - 1; t >= 0; t -= 1)
                    (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
            }
            ,
            CVCompElement.prototype.destroy = function() {
                var t;
                for (t = this.layers.length - 1; t >= 0; t -= 1)
                    this.elements[t] && this.elements[t].destroy();
                this.layers = null,
                this.elements = null
            }
            ,
            CVCompElement.prototype.createComp = function(t) {
                return new CVCompElement(t,this.globalData,this)
            }
            ,
            extendPrototype([CanvasRendererBase], CanvasRenderer),
            CanvasRenderer.prototype.createComp = function(t) {
                return new CVCompElement(t,this.globalData,this)
            }
            ,
            HBaseElement.prototype = {
                checkBlendMode: function() {},
                initRendererElement: function() {
                    this.baseElement = createTag(this.data.tg || "div"),
                    this.data.hasMask ? (this.svgElement = createNS("svg"),
                    this.layerElement = createNS("g"),
                    this.maskedElement = this.layerElement,
                    this.svgElement.appendChild(this.layerElement),
                    this.baseElement.appendChild(this.svgElement)) : this.layerElement = this.baseElement,
                    styleDiv(this.baseElement)
                },
                createContainerElements: function() {
                    this.renderableEffectsManager = new CVEffects(this),
                    this.transformedElement = this.baseElement,
                    this.maskedElement = this.layerElement,
                    this.data.ln && this.layerElement.setAttribute("id", this.data.ln),
                    this.data.cl && this.layerElement.setAttribute("class", this.data.cl),
                    0 !== this.data.bm && this.setBlendMode()
                },
                renderElement: function() {
                    var t = this.transformedElement ? this.transformedElement.style : {};
                    if (this.finalTransform._matMdf) {
                        var e = this.finalTransform.mat.toCSS();
                        t.transform = e,
                        t.webkitTransform = e
                    }
                    this.finalTransform._opMdf && (t.opacity = this.finalTransform.mProp.o.v)
                },
                renderFrame: function() {
                    this.data.hd || this.hidden || (this.renderTransform(),
                    this.renderRenderable(),
                    this.renderElement(),
                    this.renderInnerContent(),
                    this._isFirstFrame && (this._isFirstFrame = !1))
                },
                destroy: function() {
                    this.layerElement = null,
                    this.transformedElement = null,
                    this.matteElement && (this.matteElement = null),
                    this.maskManager && (this.maskManager.destroy(),
                    this.maskManager = null)
                },
                createRenderableComponents: function() {
                    this.maskManager = new MaskElement(this.data,this,this.globalData)
                },
                addEffects: function() {},
                setMatte: function() {}
            },
            HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement,
            HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy,
            HBaseElement.prototype.buildElementParenting = BaseRenderer.prototype.buildElementParenting,
            extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement),
            HSolidElement.prototype.createContent = function() {
                var t;
                this.data.hasMask ? ((t = createNS("rect")).setAttribute("width", this.data.sw),
                t.setAttribute("height", this.data.sh),
                t.setAttribute("fill", this.data.sc),
                this.svgElement.setAttribute("width", this.data.sw),
                this.svgElement.setAttribute("height", this.data.sh)) : ((t = createTag("div")).style.width = this.data.sw + "px",
                t.style.height = this.data.sh + "px",
                t.style.backgroundColor = this.data.sc),
                this.layerElement.appendChild(t)
            }
            ,
            extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement),
            HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent,
            HShapeElement.prototype.createContent = function() {
                var t;
                if (this.baseElement.style.fontSize = 0,
                this.data.hasMask)
                    this.layerElement.appendChild(this.shapesContainer),
                    t = this.svgElement;
                else {
                    t = createNS("svg");
                    var e = this.comp.data ? this.comp.data : this.globalData.compSize;
                    t.setAttribute("width", e.w),
                    t.setAttribute("height", e.h),
                    t.appendChild(this.shapesContainer),
                    this.layerElement.appendChild(t)
                }
                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0),
                this.filterUniqueShapes(),
                this.shapeCont = t
            }
            ,
            HShapeElement.prototype.getTransformedPoint = function(t, e) {
                var r, i = t.length;
                for (r = 0; r < i; r += 1)
                    e = t[r].mProps.v.applyToPointArray(e[0], e[1], 0);
                return e
            }
            ,
            HShapeElement.prototype.calculateShapeBoundingBox = function(t, e) {
                var r, i, n, s, a, o = t.sh.v, h = t.transformers, l = o._length;
                if (!(l <= 1)) {
                    for (r = 0; r < l - 1; r += 1)
                        i = this.getTransformedPoint(h, o.v[r]),
                        n = this.getTransformedPoint(h, o.o[r]),
                        s = this.getTransformedPoint(h, o.i[r + 1]),
                        a = this.getTransformedPoint(h, o.v[r + 1]),
                        this.checkBounds(i, n, s, a, e);
                    o.c && (i = this.getTransformedPoint(h, o.v[r]),
                    n = this.getTransformedPoint(h, o.o[r]),
                    s = this.getTransformedPoint(h, o.i[0]),
                    a = this.getTransformedPoint(h, o.v[0]),
                    this.checkBounds(i, n, s, a, e))
                }
            }
            ,
            HShapeElement.prototype.checkBounds = function(t, e, r, i, n) {
                this.getBoundsOfCurve(t, e, r, i);
                var s = this.shapeBoundingBox;
                n.x = bmMin(s.left, n.x),
                n.xMax = bmMax(s.right, n.xMax),
                n.y = bmMin(s.top, n.y),
                n.yMax = bmMax(s.bottom, n.yMax)
            }
            ,
            HShapeElement.prototype.shapeBoundingBox = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            HShapeElement.prototype.tempBoundingBox = {
                x: 0,
                xMax: 0,
                y: 0,
                yMax: 0,
                width: 0,
                height: 0
            },
            HShapeElement.prototype.getBoundsOfCurve = function(t, e, r, i) {
                for (var n, s, a, o, h, l, p, c = [[t[0], i[0]], [t[1], i[1]]], f = 0; f < 2; ++f)
                    s = 6 * t[f] - 12 * e[f] + 6 * r[f],
                    n = -3 * t[f] + 9 * e[f] - 9 * r[f] + 3 * i[f],
                    a = 3 * e[f] - 3 * t[f],
                    s |= 0,
                    a |= 0,
                    0 == (n |= 0) && 0 === s || (0 === n ? (o = -a / s) > 0 && o < 1 && c[f].push(this.calculateF(o, t, e, r, i, f)) : (h = s * s - 4 * a * n) >= 0 && ((l = (-s + bmSqrt(h)) / (2 * n)) > 0 && l < 1 && c[f].push(this.calculateF(l, t, e, r, i, f)),
                    (p = (-s - bmSqrt(h)) / (2 * n)) > 0 && p < 1 && c[f].push(this.calculateF(p, t, e, r, i, f))));
                this.shapeBoundingBox.left = bmMin.apply(null, c[0]),
                this.shapeBoundingBox.top = bmMin.apply(null, c[1]),
                this.shapeBoundingBox.right = bmMax.apply(null, c[0]),
                this.shapeBoundingBox.bottom = bmMax.apply(null, c[1])
            }
            ,
            HShapeElement.prototype.calculateF = function(t, e, r, i, n, s) {
                return bmPow(1 - t, 3) * e[s] + 3 * bmPow(1 - t, 2) * t * r[s] + 3 * (1 - t) * bmPow(t, 2) * i[s] + bmPow(t, 3) * n[s]
            }
            ,
            HShapeElement.prototype.calculateBoundingBox = function(t, e) {
                var r, i = t.length;
                for (r = 0; r < i; r += 1)
                    t[r] && t[r].sh ? this.calculateShapeBoundingBox(t[r], e) : t[r] && t[r].it ? this.calculateBoundingBox(t[r].it, e) : t[r] && t[r].style && t[r].w && this.expandStrokeBoundingBox(t[r].w, e)
            }
            ,
            HShapeElement.prototype.expandStrokeBoundingBox = function(t, e) {
                var r = 0;
                if (t.keyframes) {
                    for (var i = 0; i < t.keyframes.length; i += 1) {
                        var n = t.keyframes[i].s;
                        n > r && (r = n)
                    }
                    r *= t.mult
                } else
                    r = t.v * t.mult;
                e.x -= r,
                e.xMax += r,
                e.y -= r,
                e.yMax += r
            }
            ,
            HShapeElement.prototype.currentBoxContains = function(t) {
                return this.currentBBox.x <= t.x && this.currentBBox.y <= t.y && this.currentBBox.width + this.currentBBox.x >= t.x + t.width && this.currentBBox.height + this.currentBBox.y >= t.y + t.height
            }
            ,
            HShapeElement.prototype.renderInnerContent = function() {
                if (this._renderShapeFrame(),
                !this.hidden && (this._isFirstFrame || this._mdf)) {
                    var t = this.tempBoundingBox
                      , e = 999999;
                    if (t.x = e,
                    t.xMax = -e,
                    t.y = e,
                    t.yMax = -e,
                    this.calculateBoundingBox(this.itemsData, t),
                    t.width = t.xMax < t.x ? 0 : t.xMax - t.x,
                    t.height = t.yMax < t.y ? 0 : t.yMax - t.y,
                    this.currentBoxContains(t))
                        return;
                    var r = !1;
                    if (this.currentBBox.w !== t.width && (this.currentBBox.w = t.width,
                    this.shapeCont.setAttribute("width", t.width),
                    r = !0),
                    this.currentBBox.h !== t.height && (this.currentBBox.h = t.height,
                    this.shapeCont.setAttribute("height", t.height),
                    r = !0),
                    r || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) {
                        this.currentBBox.w = t.width,
                        this.currentBBox.h = t.height,
                        this.currentBBox.x = t.x,
                        this.currentBBox.y = t.y,
                        this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h);
                        var i = this.shapeCont.style
                          , n = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)";
                        i.transform = n,
                        i.webkitTransform = n
                    }
                }
            }
            ,
            extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement),
            HTextElement.prototype.createContent = function() {
                if (this.isMasked = this.checkMasks(),
                this.isMasked) {
                    this.renderType = "svg",
                    this.compW = this.comp.data.w,
                    this.compH = this.comp.data.h,
                    this.svgElement.setAttribute("width", this.compW),
                    this.svgElement.setAttribute("height", this.compH);
                    var t = createNS("g");
                    this.maskedElement.appendChild(t),
                    this.innerElem = t
                } else
                    this.renderType = "html",
                    this.innerElem = this.layerElement;
                this.checkParenting()
            }
            ,
            HTextElement.prototype.buildNewText = function() {
                var t = this.textProperty.currentData;
                this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
                var e = this.innerElem.style
                  , r = t.fc ? this.buildColor(t.fc) : "rgba(0,0,0,0)";
                e.fill = r,
                e.color = r,
                t.sc && (e.stroke = this.buildColor(t.sc),
                e.strokeWidth = t.sw + "px");
                var i, n, s = this.globalData.fontManager.getFontByName(t.f);
                if (!this.globalData.fontManager.chars)
                    if (e.fontSize = t.finalSize + "px",
                    e.lineHeight = t.finalSize + "px",
                    s.fClass)
                        this.innerElem.className = s.fClass;
                    else {
                        e.fontFamily = s.fFamily;
                        var a = t.fWeight
                          , o = t.fStyle;
                        e.fontStyle = o,
                        e.fontWeight = a
                    }
                var h, l, p, c = t.l;
                n = c.length;
                var f, u = this.mHelper, d = "", m = 0;
                for (i = 0; i < n; i += 1) {
                    if (this.globalData.fontManager.chars ? (this.textPaths[m] ? h = this.textPaths[m] : ((h = createNS("path")).setAttribute("stroke-linecap", lineCapEnum[1]),
                    h.setAttribute("stroke-linejoin", lineJoinEnum[2]),
                    h.setAttribute("stroke-miterlimit", "4")),
                    this.isMasked || (this.textSpans[m] ? p = (l = this.textSpans[m]).children[0] : ((l = createTag("div")).style.lineHeight = 0,
                    (p = createNS("svg")).appendChild(h),
                    styleDiv(l)))) : this.isMasked ? h = this.textPaths[m] ? this.textPaths[m] : createNS("text") : this.textSpans[m] ? (l = this.textSpans[m],
                    h = this.textPaths[m]) : (styleDiv(l = createTag("span")),
                    styleDiv(h = createTag("span")),
                    l.appendChild(h)),
                    this.globalData.fontManager.chars) {
                        var g, y = this.globalData.fontManager.getCharData(t.finalText[i], s.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
                        if (g = y ? y.data : null,
                        u.reset(),
                        g && g.shapes && g.shapes.length && (f = g.shapes[0].it,
                        u.scale(t.finalSize / 100, t.finalSize / 100),
                        d = this.createPathShape(u, f),
                        h.setAttribute("d", d)),
                        this.isMasked)
                            this.innerElem.appendChild(h);
                        else {
                            if (this.innerElem.appendChild(l),
                            g && g.shapes) {
                                document.body.appendChild(p);
                                var v = p.getBBox();
                                p.setAttribute("width", v.width + 2),
                                p.setAttribute("height", v.height + 2),
                                p.setAttribute("viewBox", v.x - 1 + " " + (v.y - 1) + " " + (v.width + 2) + " " + (v.height + 2));
                                var _ = p.style
                                  , b = "translate(" + (v.x - 1) + "px," + (v.y - 1) + "px)";
                                _.transform = b,
                                _.webkitTransform = b,
                                c[i].yOffset = v.y - 1
                            } else
                                p.setAttribute("width", 1),
                                p.setAttribute("height", 1);
                            l.appendChild(p)
                        }
                    } else if (h.textContent = c[i].val,
                    h.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"),
                    this.isMasked)
                        this.innerElem.appendChild(h);
                    else {
                        this.innerElem.appendChild(l);
                        var x = h.style
                          , E = "translate3d(0," + -t.finalSize / 1.2 + "px,0)";
                        x.transform = E,
                        x.webkitTransform = E
                    }
                    this.isMasked ? this.textSpans[m] = h : this.textSpans[m] = l,
                    this.textSpans[m].style.display = "block",
                    this.textPaths[m] = h,
                    m += 1
                }
                for (; m < this.textSpans.length; )
                    this.textSpans[m].style.display = "none",
                    m += 1
            }
            ,
            HTextElement.prototype.renderInnerContent = function() {
                var t;
                if (this.validateText(),
                this.data.singleShape) {
                    if (!this._isFirstFrame && !this.lettersChangedFlag)
                        return;
                    if (this.isMasked && this.finalTransform._matMdf) {
                        this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH),
                        t = this.svgElement.style;
                        var e = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)";
                        t.transform = e,
                        t.webkitTransform = e
                    }
                }
                if (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag),
                this.lettersChangedFlag || this.textAnimator.lettersChangedFlag) {
                    var r, i, n, s, a, o = 0, h = this.textAnimator.renderedLetters, l = this.textProperty.currentData.l;
                    for (i = l.length,
                    r = 0; r < i; r += 1)
                        l[r].n ? o += 1 : (s = this.textSpans[r],
                        a = this.textPaths[r],
                        n = h[o],
                        o += 1,
                        n._mdf.m && (this.isMasked ? s.setAttribute("transform", n.m) : (s.style.webkitTransform = n.m,
                        s.style.transform = n.m)),
                        s.style.opacity = n.o,
                        n.sw && n._mdf.sw && a.setAttribute("stroke-width", n.sw),
                        n.sc && n._mdf.sc && a.setAttribute("stroke", n.sc),
                        n.fc && n._mdf.fc && (a.setAttribute("fill", n.fc),
                        a.style.color = n.fc));
                    if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
                        var p = this.innerElem.getBBox();
                        if (this.currentBBox.w !== p.width && (this.currentBBox.w = p.width,
                        this.svgElement.setAttribute("width", p.width)),
                        this.currentBBox.h !== p.height && (this.currentBBox.h = p.height,
                        this.svgElement.setAttribute("height", p.height)),
                        this.currentBBox.w !== p.width + 2 || this.currentBBox.h !== p.height + 2 || this.currentBBox.x !== p.x - 1 || this.currentBBox.y !== p.y - 1) {
                            this.currentBBox.w = p.width + 2,
                            this.currentBBox.h = p.height + 2,
                            this.currentBBox.x = p.x - 1,
                            this.currentBBox.y = p.y - 1,
                            this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h),
                            t = this.svgElement.style;
                            var c = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)";
                            t.transform = c,
                            t.webkitTransform = c
                        }
                    }
                }
            }
            ,
            extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement),
            HCameraElement.prototype.setup = function() {
                var t, e, r, i, n = this.comp.threeDElements.length;
                for (t = 0; t < n; t += 1)
                    if ("3d" === (e = this.comp.threeDElements[t]).type) {
                        r = e.perspectiveElem.style,
                        i = e.container.style;
                        var s = this.pe.v + "px"
                          , a = "0px 0px 0px"
                          , o = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
                        r.perspective = s,
                        r.webkitPerspective = s,
                        i.transformOrigin = a,
                        i.mozTransformOrigin = a,
                        i.webkitTransformOrigin = a,
                        r.transform = o,
                        r.webkitTransform = o
                    }
            }
            ,
            HCameraElement.prototype.createElements = function() {}
            ,
            HCameraElement.prototype.hide = function() {}
            ,
            HCameraElement.prototype.renderFrame = function() {
                var t, e, r = this._isFirstFrame;
                if (this.hierarchy)
                    for (e = this.hierarchy.length,
                    t = 0; t < e; t += 1)
                        r = this.hierarchy[t].finalTransform.mProp._mdf || r;
                if (r || this.pe._mdf || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
                    if (this.mat.reset(),
                    this.hierarchy)
                        for (t = e = this.hierarchy.length - 1; t >= 0; t -= 1) {
                            var i = this.hierarchy[t].finalTransform.mProp;
                            this.mat.translate(-i.p.v[0], -i.p.v[1], i.p.v[2]),
                            this.mat.rotateX(-i.or.v[0]).rotateY(-i.or.v[1]).rotateZ(i.or.v[2]),
                            this.mat.rotateX(-i.rx.v).rotateY(-i.ry.v).rotateZ(i.rz.v),
                            this.mat.scale(1 / i.s.v[0], 1 / i.s.v[1], 1 / i.s.v[2]),
                            this.mat.translate(i.a.v[0], i.a.v[1], i.a.v[2])
                        }
                    if (this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v),
                    this.a) {
                        var n;
                        n = this.p ? [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]] : [this.px.v - this.a.v[0], this.py.v - this.a.v[1], this.pz.v - this.a.v[2]];
                        var s = Math.sqrt(Math.pow(n[0], 2) + Math.pow(n[1], 2) + Math.pow(n[2], 2))
                          , a = [n[0] / s, n[1] / s, n[2] / s]
                          , o = Math.sqrt(a[2] * a[2] + a[0] * a[0])
                          , h = Math.atan2(a[1], o)
                          , l = Math.atan2(a[0], -a[2]);
                        this.mat.rotateY(l).rotateX(-h)
                    }
                    this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v),
                    this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]),
                    this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0),
                    this.mat.translate(0, 0, this.pe.v);
                    var p = !this._prevMat.equals(this.mat);
                    if ((p || this.pe._mdf) && this.comp.threeDElements) {
                        var c, f, u;
                        for (e = this.comp.threeDElements.length,
                        t = 0; t < e; t += 1)
                            if ("3d" === (c = this.comp.threeDElements[t]).type) {
                                if (p) {
                                    var d = this.mat.toCSS();
                                    (u = c.container.style).transform = d,
                                    u.webkitTransform = d
                                }
                                this.pe._mdf && ((f = c.perspectiveElem.style).perspective = this.pe.v + "px",
                                f.webkitPerspective = this.pe.v + "px")
                            }
                        this.mat.clone(this._prevMat)
                    }
                }
                this._isFirstFrame = !1
            }
            ,
            HCameraElement.prototype.prepareFrame = function(t) {
                this.prepareProperties(t, !0)
            }
            ,
            HCameraElement.prototype.destroy = function() {}
            ,
            HCameraElement.prototype.getBaseElement = function() {
                return null
            }
            ,
            extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement),
            HImageElement.prototype.createContent = function() {
                var t = this.globalData.getAssetsPath(this.assetData)
                  , e = new Image;
                this.data.hasMask ? (this.imageElem = createNS("image"),
                this.imageElem.setAttribute("width", this.assetData.w + "px"),
                this.imageElem.setAttribute("height", this.assetData.h + "px"),
                this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t),
                this.layerElement.appendChild(this.imageElem),
                this.baseElement.setAttribute("width", this.assetData.w),
                this.baseElement.setAttribute("height", this.assetData.h)) : this.layerElement.appendChild(e),
                e.crossOrigin = "anonymous",
                e.src = t,
                this.data.ln && this.baseElement.setAttribute("id", this.data.ln)
            }
            ,
            extendPrototype([BaseRenderer], HybridRendererBase),
            HybridRendererBase.prototype.buildItem = SVGRenderer.prototype.buildItem,
            HybridRendererBase.prototype.checkPendingElements = function() {
                for (; this.pendingElements.length; )
                    this.pendingElements.pop().checkParenting()
            }
            ,
            HybridRendererBase.prototype.appendElementInPos = function(t, e) {
                var r = t.getBaseElement();
                if (r) {
                    var i = this.layers[e];
                    if (i.ddd && this.supports3d)
                        this.addTo3dContainer(r, e);
                    else if (this.threeDElements)
                        this.addTo3dContainer(r, e);
                    else {
                        for (var n, s, a = 0; a < e; )
                            this.elements[a] && !0 !== this.elements[a] && this.elements[a].getBaseElement && (s = this.elements[a],
                            n = (this.layers[a].ddd ? this.getThreeDContainerByPos(a) : s.getBaseElement()) || n),
                            a += 1;
                        n ? i.ddd && this.supports3d || this.layerElement.insertBefore(r, n) : i.ddd && this.supports3d || this.layerElement.appendChild(r)
                    }
                }
            }
            ,
            HybridRendererBase.prototype.createShape = function(t) {
                return this.supports3d ? new HShapeElement(t,this.globalData,this) : new SVGShapeElement(t,this.globalData,this)
            }
            ,
            HybridRendererBase.prototype.createText = function(t) {
                return this.supports3d ? new HTextElement(t,this.globalData,this) : new SVGTextLottieElement(t,this.globalData,this)
            }
            ,
            HybridRendererBase.prototype.createCamera = function(t) {
                return this.camera = new HCameraElement(t,this.globalData,this),
                this.camera
            }
            ,
            HybridRendererBase.prototype.createImage = function(t) {
                return this.supports3d ? new HImageElement(t,this.globalData,this) : new IImageElement(t,this.globalData,this)
            }
            ,
            HybridRendererBase.prototype.createSolid = function(t) {
                return this.supports3d ? new HSolidElement(t,this.globalData,this) : new ISolidElement(t,this.globalData,this)
            }
            ,
            HybridRendererBase.prototype.createNull = SVGRenderer.prototype.createNull,
            HybridRendererBase.prototype.getThreeDContainerByPos = function(t) {
                for (var e = 0, r = this.threeDElements.length; e < r; ) {
                    if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t)
                        return this.threeDElements[e].perspectiveElem;
                    e += 1
                }
                return null
            }
            ,
            HybridRendererBase.prototype.createThreeDContainer = function(t, e) {
                var r, i, n = createTag("div");
                styleDiv(n);
                var s = createTag("div");
                if (styleDiv(s),
                "3d" === e) {
                    (r = n.style).width = this.globalData.compSize.w + "px",
                    r.height = this.globalData.compSize.h + "px";
                    var a = "50% 50%";
                    r.webkitTransformOrigin = a,
                    r.mozTransformOrigin = a,
                    r.transformOrigin = a;
                    var o = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
                    (i = s.style).transform = o,
                    i.webkitTransform = o
                }
                n.appendChild(s);
                var h = {
                    container: s,
                    perspectiveElem: n,
                    startPos: t,
                    endPos: t,
                    type: e
                };
                return this.threeDElements.push(h),
                h
            }
            ,
            HybridRendererBase.prototype.build3dContainers = function() {
                var t, e, r = this.layers.length, i = "";
                for (t = 0; t < r; t += 1)
                    this.layers[t].ddd && 3 !== this.layers[t].ty ? ("3d" !== i && (i = "3d",
                    e = this.createThreeDContainer(t, "3d")),
                    e.endPos = Math.max(e.endPos, t)) : ("2d" !== i && (i = "2d",
                    e = this.createThreeDContainer(t, "2d")),
                    e.endPos = Math.max(e.endPos, t));
                for (t = (r = this.threeDElements.length) - 1; t >= 0; t -= 1)
                    this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem)
            }
            ,
            HybridRendererBase.prototype.addTo3dContainer = function(t, e) {
                for (var r = 0, i = this.threeDElements.length; r < i; ) {
                    if (e <= this.threeDElements[r].endPos) {
                        for (var n, s = this.threeDElements[r].startPos; s < e; )
                            this.elements[s] && this.elements[s].getBaseElement && (n = this.elements[s].getBaseElement()),
                            s += 1;
                        n ? this.threeDElements[r].container.insertBefore(t, n) : this.threeDElements[r].container.appendChild(t);
                        break
                    }
                    r += 1
                }
            }
            ,
            HybridRendererBase.prototype.configAnimation = function(t) {
                var e = createTag("div")
                  , r = this.animationItem.wrapper
                  , i = e.style;
                i.width = t.w + "px",
                i.height = t.h + "px",
                this.resizerElem = e,
                styleDiv(e),
                i.transformStyle = "flat",
                i.mozTransformStyle = "flat",
                i.webkitTransformStyle = "flat",
                this.renderConfig.className && e.setAttribute("class", this.renderConfig.className),
                r.appendChild(e),
                i.overflow = "hidden";
                var n = createNS("svg");
                n.setAttribute("width", "1"),
                n.setAttribute("height", "1"),
                styleDiv(n),
                this.resizerElem.appendChild(n);
                var s = createNS("defs");
                n.appendChild(s),
                this.data = t,
                this.setupGlobalData(t, n),
                this.globalData.defs = s,
                this.layers = t.layers,
                this.layerElement = this.resizerElem,
                this.build3dContainers(),
                this.updateContainerSize()
            }
            ,
            HybridRendererBase.prototype.destroy = function() {
                var t;
                this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""),
                this.animationItem.container = null,
                this.globalData.defs = null;
                var e = this.layers ? this.layers.length : 0;
                for (t = 0; t < e; t += 1)
                    this.elements[t] && this.elements[t].destroy && this.elements[t].destroy();
                this.elements.length = 0,
                this.destroyed = !0,
                this.animationItem = null
            }
            ,
            HybridRendererBase.prototype.updateContainerSize = function() {
                var t, e, r, i, n = this.animationItem.wrapper.offsetWidth, s = this.animationItem.wrapper.offsetHeight, a = n / s;
                this.globalData.compSize.w / this.globalData.compSize.h > a ? (t = n / this.globalData.compSize.w,
                e = n / this.globalData.compSize.w,
                r = 0,
                i = (s - this.globalData.compSize.h * (n / this.globalData.compSize.w)) / 2) : (t = s / this.globalData.compSize.h,
                e = s / this.globalData.compSize.h,
                r = (n - this.globalData.compSize.w * (s / this.globalData.compSize.h)) / 2,
                i = 0);
                var o = this.resizerElem.style;
                o.webkitTransform = "matrix3d(" + t + ",0,0,0,0," + e + ",0,0,0,0,1,0," + r + "," + i + ",0,1)",
                o.transform = o.webkitTransform
            }
            ,
            HybridRendererBase.prototype.renderFrame = SVGRenderer.prototype.renderFrame,
            HybridRendererBase.prototype.hide = function() {
                this.resizerElem.style.display = "none"
            }
            ,
            HybridRendererBase.prototype.show = function() {
                this.resizerElem.style.display = "block"
            }
            ,
            HybridRendererBase.prototype.initItems = function() {
                if (this.buildAllItems(),
                this.camera)
                    this.camera.setup();
                else {
                    var t, e = this.globalData.compSize.w, r = this.globalData.compSize.h, i = this.threeDElements.length;
                    for (t = 0; t < i; t += 1) {
                        var n = this.threeDElements[t].perspectiveElem.style;
                        n.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(r, 2)) + "px",
                        n.perspective = n.webkitPerspective
                    }
                }
            }
            ,
            HybridRendererBase.prototype.searchExtraCompositions = function(t) {
                var e, r = t.length, i = createTag("div");
                for (e = 0; e < r; e += 1)
                    if (t[e].xt) {
                        var n = this.createComp(t[e], i, this.globalData.comp, null);
                        n.initExpressions(),
                        this.globalData.projectInterface.registerComposition(n)
                    }
            }
            ,
            extendPrototype([HybridRendererBase, ICompElement, HBaseElement], HCompElement),
            HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements,
            HCompElement.prototype.createContainerElements = function() {
                this._createBaseContainerElements(),
                this.data.hasMask ? (this.svgElement.setAttribute("width", this.data.w),
                this.svgElement.setAttribute("height", this.data.h),
                this.transformedElement = this.baseElement) : this.transformedElement = this.layerElement
            }
            ,
            HCompElement.prototype.addTo3dContainer = function(t, e) {
                for (var r, i = 0; i < e; )
                    this.elements[i] && this.elements[i].getBaseElement && (r = this.elements[i].getBaseElement()),
                    i += 1;
                r ? this.layerElement.insertBefore(t, r) : this.layerElement.appendChild(t)
            }
            ,
            HCompElement.prototype.createComp = function(t) {
                return this.supports3d ? new HCompElement(t,this.globalData,this) : new SVGCompElement(t,this.globalData,this)
            }
            ,
            extendPrototype([HybridRendererBase], HybridRenderer),
            HybridRenderer.prototype.createComp = function(t) {
                return this.supports3d ? new HCompElement(t,this.globalData,this) : new SVGCompElement(t,this.globalData,this)
            }
            ;
            var CompExpressionInterface = function(t) {
                function e(e) {
                    for (var r = 0, i = t.layers.length; r < i; ) {
                        if (t.layers[r].nm === e || t.layers[r].ind === e)
                            return t.elements[r].layerInterface;
                        r += 1
                    }
                    return null
                }
                return Object.defineProperty(e, "_name", {
                    value: t.data.nm
                }),
                e.layer = e,
                e.pixelAspect = 1,
                e.height = t.data.h || t.globalData.compSize.h,
                e.width = t.data.w || t.globalData.compSize.w,
                e.pixelAspect = 1,
                e.frameDuration = 1 / t.globalData.frameRate,
                e.displayStartTime = 0,
                e.numLayers = t.layers.length,
                e
            };
            function _typeof$2(t) {
                return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                }
                : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }
                ,
                _typeof$2(t)
            }
            function seedRandom(t, e) {
                var r = this
                  , i = 256
                  , n = e.pow(i, 6)
                  , s = e.pow(2, 52)
                  , a = 2 * s
                  , o = 255;
                function h(t) {
                    var e, r = t.length, n = this, s = 0, a = n.i = n.j = 0, h = n.S = [];
                    for (r || (t = [r++]); s < i; )
                        h[s] = s++;
                    for (s = 0; s < i; s++)
                        h[s] = h[a = o & a + t[s % r] + (e = h[s])],
                        h[a] = e;
                    n.g = function(t) {
                        for (var e, r = 0, s = n.i, a = n.j, h = n.S; t--; )
                            e = h[s = o & s + 1],
                            r = r * i + h[o & (h[s] = h[a = o & a + e]) + (h[a] = e)];
                        return n.i = s,
                        n.j = a,
                        r
                    }
                }
                function l(t, e) {
                    return e.i = t.i,
                    e.j = t.j,
                    e.S = t.S.slice(),
                    e
                }
                function p(t, e) {
                    var r, i = [], n = _typeof$2(t);
                    if (e && "object" == n)
                        for (r in t)
                            try {
                                i.push(p(t[r], e - 1))
                            } catch (t) {}
                    return i.length ? i : "string" == n ? t : t + "\0"
                }
                function c(t, e) {
                    for (var r, i = t + "", n = 0; n < i.length; )
                        e[o & n] = o & (r ^= 19 * e[o & n]) + i.charCodeAt(n++);
                    return f(e)
                }
                function f(t) {
                    return String.fromCharCode.apply(0, t)
                }
                e.seedrandom = function(o, u, d) {
                    var m = []
                      , g = c(p((u = !0 === u ? {
                        entropy: !0
                    } : u || {}).entropy ? [o, f(t)] : null === o ? function() {
                        try {
                            var e = new Uint8Array(i);
                            return (r.crypto || r.msCrypto).getRandomValues(e),
                            f(e)
                        } catch (e) {
                            var n = r.navigator
                              , s = n && n.plugins;
                            return [+new Date, r, s, r.screen, f(t)]
                        }
                    }() : o, 3), m)
                      , y = new h(m)
                      , v = function() {
                        for (var t = y.g(6), e = n, r = 0; t < s; )
                            t = (t + r) * i,
                            e *= i,
                            r = y.g(1);
                        for (; t >= a; )
                            t /= 2,
                            e /= 2,
                            r >>>= 1;
                        return (t + r) / e
                    };
                    return v.int32 = function() {
                        return 0 | y.g(4)
                    }
                    ,
                    v.quick = function() {
                        return y.g(4) / 4294967296
                    }
                    ,
                    v.double = v,
                    c(f(y.S), t),
                    (u.pass || d || function(t, r, i, n) {
                        return n && (n.S && l(n, y),
                        t.state = function() {
                            return l(y, {})
                        }
                        ),
                        i ? (e.random = t,
                        r) : t
                    }
                    )(v, g, "global"in u ? u.global : this == e, u.state)
                }
                ,
                c(e.random(), t)
            }
            function initialize$2(t) {
                seedRandom([], t)
            }
            var propTypes = {
                SHAPE: "shape"
            };
            function _typeof$1(t) {
                return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                }
                : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }
                ,
                _typeof$1(t)
            }
            var ExpressionManager = function() {
                var ob = {}
                  , Math = BMMath
                  , window = null
                  , document = null
                  , XMLHttpRequest = null
                  , fetch = null
                  , frames = null
                  , _lottieGlobal = {};
                function resetFrame() {
                    _lottieGlobal = {}
                }
                function $bm_isInstanceOfArray(t) {
                    return t.constructor === Array || t.constructor === Float32Array
                }
                function isNumerable(t, e) {
                    return "number" === t || e instanceof Number || "boolean" === t || "string" === t
                }
                function $bm_neg(t) {
                    var e = _typeof$1(t);
                    if ("number" === e || t instanceof Number || "boolean" === e)
                        return -t;
                    if ($bm_isInstanceOfArray(t)) {
                        var r, i = t.length, n = [];
                        for (r = 0; r < i; r += 1)
                            n[r] = -t[r];
                        return n
                    }
                    return t.propType ? t.v : -t
                }
                initialize$2(BMMath);
                var easeInBez = BezierFactory.getBezierEasing(.333, 0, .833, .833, "easeIn").get
                  , easeOutBez = BezierFactory.getBezierEasing(.167, .167, .667, 1, "easeOut").get
                  , easeInOutBez = BezierFactory.getBezierEasing(.33, 0, .667, 1, "easeInOut").get;
                function sum(t, e) {
                    var r = _typeof$1(t)
                      , i = _typeof$1(e);
                    if (isNumerable(r, t) && isNumerable(i, e) || "string" === r || "string" === i)
                        return t + e;
                    if ($bm_isInstanceOfArray(t) && isNumerable(i, e))
                        return (t = t.slice(0))[0] += e,
                        t;
                    if (isNumerable(r, t) && $bm_isInstanceOfArray(e))
                        return (e = e.slice(0))[0] = t + e[0],
                        e;
                    if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                        for (var n = 0, s = t.length, a = e.length, o = []; n < s || n < a; )
                            ("number" == typeof t[n] || t[n]instanceof Number) && ("number" == typeof e[n] || e[n]instanceof Number) ? o[n] = t[n] + e[n] : o[n] = void 0 === e[n] ? t[n] : t[n] || e[n],
                            n += 1;
                        return o
                    }
                    return 0
                }
                var add = sum;
                function sub(t, e) {
                    var r = _typeof$1(t)
                      , i = _typeof$1(e);
                    if (isNumerable(r, t) && isNumerable(i, e))
                        return "string" === r && (t = parseInt(t, 10)),
                        "string" === i && (e = parseInt(e, 10)),
                        t - e;
                    if ($bm_isInstanceOfArray(t) && isNumerable(i, e))
                        return (t = t.slice(0))[0] -= e,
                        t;
                    if (isNumerable(r, t) && $bm_isInstanceOfArray(e))
                        return (e = e.slice(0))[0] = t - e[0],
                        e;
                    if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                        for (var n = 0, s = t.length, a = e.length, o = []; n < s || n < a; )
                            ("number" == typeof t[n] || t[n]instanceof Number) && ("number" == typeof e[n] || e[n]instanceof Number) ? o[n] = t[n] - e[n] : o[n] = void 0 === e[n] ? t[n] : t[n] || e[n],
                            n += 1;
                        return o
                    }
                    return 0
                }
                function mul(t, e) {
                    var r, i, n, s = _typeof$1(t), a = _typeof$1(e);
                    if (isNumerable(s, t) && isNumerable(a, e))
                        return t * e;
                    if ($bm_isInstanceOfArray(t) && isNumerable(a, e)) {
                        for (n = t.length,
                        r = createTypedArray("float32", n),
                        i = 0; i < n; i += 1)
                            r[i] = t[i] * e;
                        return r
                    }
                    if (isNumerable(s, t) && $bm_isInstanceOfArray(e)) {
                        for (n = e.length,
                        r = createTypedArray("float32", n),
                        i = 0; i < n; i += 1)
                            r[i] = t * e[i];
                        return r
                    }
                    return 0
                }
                function div(t, e) {
                    var r, i, n, s = _typeof$1(t), a = _typeof$1(e);
                    if (isNumerable(s, t) && isNumerable(a, e))
                        return t / e;
                    if ($bm_isInstanceOfArray(t) && isNumerable(a, e)) {
                        for (n = t.length,
                        r = createTypedArray("float32", n),
                        i = 0; i < n; i += 1)
                            r[i] = t[i] / e;
                        return r
                    }
                    if (isNumerable(s, t) && $bm_isInstanceOfArray(e)) {
                        for (n = e.length,
                        r = createTypedArray("float32", n),
                        i = 0; i < n; i += 1)
                            r[i] = t / e[i];
                        return r
                    }
                    return 0
                }
                function mod(t, e) {
                    return "string" == typeof t && (t = parseInt(t, 10)),
                    "string" == typeof e && (e = parseInt(e, 10)),
                    t % e
                }
                var $bm_sum = sum
                  , $bm_sub = sub
                  , $bm_mul = mul
                  , $bm_div = div
                  , $bm_mod = mod;
                function clamp(t, e, r) {
                    if (e > r) {
                        var i = r;
                        r = e,
                        e = i
                    }
                    return Math.min(Math.max(t, e), r)
                }
                function radiansToDegrees(t) {
                    return t / degToRads
                }
                var radians_to_degrees = radiansToDegrees;
                function degreesToRadians(t) {
                    return t * degToRads
                }
                var degrees_to_radians = radiansToDegrees
                  , helperLengthArray = [0, 0, 0, 0, 0, 0];
                function length(t, e) {
                    if ("number" == typeof t || t instanceof Number)
                        return e = e || 0,
                        Math.abs(t - e);
                    var r;
                    e || (e = helperLengthArray);
                    var i = Math.min(t.length, e.length)
                      , n = 0;
                    for (r = 0; r < i; r += 1)
                        n += Math.pow(e[r] - t[r], 2);
                    return Math.sqrt(n)
                }
                function normalize(t) {
                    return div(t, length(t))
                }
                function rgbToHsl(t) {
                    var e, r, i = t[0], n = t[1], s = t[2], a = Math.max(i, n, s), o = Math.min(i, n, s), h = (a + o) / 2;
                    if (a === o)
                        e = 0,
                        r = 0;
                    else {
                        var l = a - o;
                        switch (r = h > .5 ? l / (2 - a - o) : l / (a + o),
                        a) {
                        case i:
                            e = (n - s) / l + (n < s ? 6 : 0);
                            break;
                        case n:
                            e = (s - i) / l + 2;
                            break;
                        case s:
                            e = (i - n) / l + 4
                        }
                        e /= 6
                    }
                    return [e, r, h, t[3]]
                }
                function hue2rgb(t, e, r) {
                    return r < 0 && (r += 1),
                    r > 1 && (r -= 1),
                    r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t
                }
                function hslToRgb(t) {
                    var e, r, i, n = t[0], s = t[1], a = t[2];
                    if (0 === s)
                        e = a,
                        i = a,
                        r = a;
                    else {
                        var o = a < .5 ? a * (1 + s) : a + s - a * s
                          , h = 2 * a - o;
                        e = hue2rgb(h, o, n + 1 / 3),
                        r = hue2rgb(h, o, n),
                        i = hue2rgb(h, o, n - 1 / 3)
                    }
                    return [e, r, i, t[3]]
                }
                function linear(t, e, r, i, n) {
                    if (void 0 !== i && void 0 !== n || (i = e,
                    n = r,
                    e = 0,
                    r = 1),
                    r < e) {
                        var s = r;
                        r = e,
                        e = s
                    }
                    if (t <= e)
                        return i;
                    if (t >= r)
                        return n;
                    var a, o = r === e ? 0 : (t - e) / (r - e);
                    if (!i.length)
                        return i + (n - i) * o;
                    var h = i.length
                      , l = createTypedArray("float32", h);
                    for (a = 0; a < h; a += 1)
                        l[a] = i[a] + (n[a] - i[a]) * o;
                    return l
                }
                function random(t, e) {
                    if (void 0 === e && (void 0 === t ? (t = 0,
                    e = 1) : (e = t,
                    t = void 0)),
                    e.length) {
                        var r, i = e.length;
                        t || (t = createTypedArray("float32", i));
                        var n = createTypedArray("float32", i)
                          , s = BMMath.random();
                        for (r = 0; r < i; r += 1)
                            n[r] = t[r] + s * (e[r] - t[r]);
                        return n
                    }
                    return void 0 === t && (t = 0),
                    t + BMMath.random() * (e - t)
                }
                function createPath(t, e, r, i) {
                    var n, s = t.length, a = shapePool.newElement();
                    a.setPathData(!!i, s);
                    var o, h, l = [0, 0];
                    for (n = 0; n < s; n += 1)
                        o = e && e[n] ? e[n] : l,
                        h = r && r[n] ? r[n] : l,
                        a.setTripleAt(t[n][0], t[n][1], h[0] + t[n][0], h[1] + t[n][1], o[0] + t[n][0], o[1] + t[n][1], n, !0);
                    return a
                }
                function initiateExpression(elem, data, property) {
                    function noOp(t) {
                        return t
                    }
                    if (!elem.globalData.renderConfig.runExpressions)
                        return noOp;
                    var val = data.x, needsVelocity = /velocity(?![\w\d])/.test(val), _needsRandom = -1 !== val.indexOf("random"), elemType = elem.data.ty, transform, $bm_transform, content, effect, thisProperty = property;
                    thisProperty.valueAtTime = thisProperty.getValueAtTime,
                    Object.defineProperty(thisProperty, "value", {
                        get: function() {
                            return thisProperty.v
                        }
                    }),
                    elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate,
                    elem.comp.displayStartTime = 0;
                    var inPoint = elem.data.ip / elem.comp.globalData.frameRate, outPoint = elem.data.op / elem.comp.globalData.frameRate, width = elem.data.sw ? elem.data.sw : 0, height = elem.data.sh ? elem.data.sh : 0, name = elem.data.nm, loopIn, loop_in, loopOut, loop_out, smooth, toWorld, fromWorld, fromComp, toComp, fromCompToSurface, position, rotation, anchorPoint, scale, thisLayer, thisComp, mask, valueAtTime, velocityAtTime, scoped_bm_rt, expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0], numKeys = property.kf ? data.k.length : 0, active = !this.data || !0 !== this.data.hd, wiggle = function(t, e) {
                        var r, i, n = this.pv.length ? this.pv.length : 1, s = createTypedArray("float32", n), a = Math.floor(5 * time);
                        for (r = 0,
                        i = 0; r < a; ) {
                            for (i = 0; i < n; i += 1)
                                s[i] += -e + 2 * e * BMMath.random();
                            r += 1
                        }
                        var o = 5 * time
                          , h = o - Math.floor(o)
                          , l = createTypedArray("float32", n);
                        if (n > 1) {
                            for (i = 0; i < n; i += 1)
                                l[i] = this.pv[i] + s[i] + (-e + 2 * e * BMMath.random()) * h;
                            return l
                        }
                        return this.pv + s[0] + (-e + 2 * e * BMMath.random()) * h
                    }
                    .bind(this);
                    function loopInDuration(t, e) {
                        return loopIn(t, e, !0)
                    }
                    function loopOutDuration(t, e) {
                        return loopOut(t, e, !0)
                    }
                    thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty),
                    loop_in = loopIn),
                    thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty),
                    loop_out = loopOut),
                    thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty)),
                    this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)),
                    this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
                    var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface), time, velocity, value, text, textIndex, textTotal, selectorValue;
                    function lookAt(t, e) {
                        var r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]]
                          , i = Math.atan2(r[0], Math.sqrt(r[1] * r[1] + r[2] * r[2])) / degToRads;
                        return [-Math.atan2(r[1], r[2]) / degToRads, i, 0]
                    }
                    function easeOut(t, e, r, i, n) {
                        return applyEase(easeOutBez, t, e, r, i, n)
                    }
                    function easeIn(t, e, r, i, n) {
                        return applyEase(easeInBez, t, e, r, i, n)
                    }
                    function ease(t, e, r, i, n) {
                        return applyEase(easeInOutBez, t, e, r, i, n)
                    }
                    function applyEase(t, e, r, i, n, s) {
                        void 0 === n ? (n = r,
                        s = i) : e = (e - r) / (i - r),
                        e > 1 ? e = 1 : e < 0 && (e = 0);
                        var a = t(e);
                        if ($bm_isInstanceOfArray(n)) {
                            var o, h = n.length, l = createTypedArray("float32", h);
                            for (o = 0; o < h; o += 1)
                                l[o] = (s[o] - n[o]) * a + n[o];
                            return l
                        }
                        return (s - n) * a + n
                    }
                    function nearestKey(t) {
                        var e, r, i, n = data.k.length;
                        if (data.k.length && "number" != typeof data.k[0])
                            if (r = -1,
                            (t *= elem.comp.globalData.frameRate) < data.k[0].t)
                                r = 1,
                                i = data.k[0].t;
                            else {
                                for (e = 0; e < n - 1; e += 1) {
                                    if (t === data.k[e].t) {
                                        r = e + 1,
                                        i = data.k[e].t;
                                        break
                                    }
                                    if (t > data.k[e].t && t < data.k[e + 1].t) {
                                        t - data.k[e].t > data.k[e + 1].t - t ? (r = e + 2,
                                        i = data.k[e + 1].t) : (r = e + 1,
                                        i = data.k[e].t);
                                        break
                                    }
                                }
                                -1 === r && (r = e + 1,
                                i = data.k[e].t)
                            }
                        else
                            r = 0,
                            i = 0;
                        var s = {};
                        return s.index = r,
                        s.time = i / elem.comp.globalData.frameRate,
                        s
                    }
                    function key(t) {
                        var e, r, i;
                        if (!data.k.length || "number" == typeof data.k[0])
                            throw new Error("The property has no keyframe at index " + t);
                        t -= 1,
                        e = {
                            time: data.k[t].t / elem.comp.globalData.frameRate,
                            value: []
                        };
                        var n = Object.prototype.hasOwnProperty.call(data.k[t], "s") ? data.k[t].s : data.k[t - 1].e;
                        for (i = n.length,
                        r = 0; r < i; r += 1)
                            e[r] = n[r],
                            e.value[r] = n[r];
                        return e
                    }
                    function framesToTime(t, e) {
                        return e || (e = elem.comp.globalData.frameRate),
                        t / e
                    }
                    function timeToFrames(t, e) {
                        return t || 0 === t || (t = time),
                        e || (e = elem.comp.globalData.frameRate),
                        t * e
                    }
                    function seedRandom(t) {
                        BMMath.seedrandom(randSeed + t)
                    }
                    function sourceRectAtTime() {
                        return elem.sourceRectAtTime()
                    }
                    function substring(t, e) {
                        return "string" == typeof value ? void 0 === e ? value.substring(t) : value.substring(t, e) : ""
                    }
                    function substr(t, e) {
                        return "string" == typeof value ? void 0 === e ? value.substr(t) : value.substr(t, e) : ""
                    }
                    function posterizeTime(t) {
                        time = 0 === t ? 0 : Math.floor(time * t) / t,
                        value = valueAtTime(time)
                    }
                    var index = elem.data.ind, hasParent = !(!elem.hierarchy || !elem.hierarchy.length), parent, randSeed = Math.floor(1e6 * Math.random()), globalData = elem.globalData;
                    function executeExpression(t) {
                        return value = t,
                        this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType ? value : ("textSelector" === this.propType && (textIndex = this.textIndex,
                        textTotal = this.textTotal,
                        selectorValue = this.selectorValue),
                        thisLayer || (text = elem.layerInterface.text,
                        thisLayer = elem.layerInterface,
                        thisComp = elem.comp.compInterface,
                        toWorld = thisLayer.toWorld.bind(thisLayer),
                        fromWorld = thisLayer.fromWorld.bind(thisLayer),
                        fromComp = thisLayer.fromComp.bind(thisLayer),
                        toComp = thisLayer.toComp.bind(thisLayer),
                        mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null,
                        fromCompToSurface = fromComp),
                        transform || (transform = elem.layerInterface("ADBE Transform Group"),
                        $bm_transform = transform,
                        transform && (anchorPoint = transform.anchorPoint)),
                        4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")),
                        effect || (effect = thisLayer(4)),
                        (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) && !parent && (parent = elem.hierarchy[0].layerInterface),
                        time = this.comp.renderedFrame / this.comp.globalData.frameRate,
                        _needsRandom && seedRandom(randSeed + time),
                        needsVelocity && (velocity = velocityAtTime(time)),
                        expression_function(),
                        this.frameExpressionId = elem.globalData.frameId,
                        scoped_bm_rt = scoped_bm_rt.propType === propTypes.SHAPE ? scoped_bm_rt.v : scoped_bm_rt)
                    }
                    return executeExpression.__preventDeadCodeRemoval = [$bm_transform, anchorPoint, time, velocity, inPoint, outPoint, width, height, name, loop_in, loop_out, smooth, toComp, fromCompToSurface, toWorld, fromWorld, mask, position, rotation, scale, thisComp, numKeys, active, wiggle, loopInDuration, loopOutDuration, comp, lookAt, easeOut, easeIn, ease, nearestKey, key, text, textIndex, textTotal, selectorValue, framesToTime, timeToFrames, sourceRectAtTime, substring, substr, posterizeTime, index, globalData],
                    executeExpression
                }
                return ob.initiateExpression = initiateExpression,
                ob.__preventDeadCodeRemoval = [window, document, XMLHttpRequest, fetch, frames, $bm_neg, add, $bm_sum, $bm_sub, $bm_mul, $bm_div, $bm_mod, clamp, radians_to_degrees, degreesToRadians, degrees_to_radians, normalize, rgbToHsl, hslToRgb, linear, random, createPath, _lottieGlobal],
                ob.resetFrame = resetFrame,
                ob
            }()
              , Expressions = function() {
                var t = {
                    initExpressions: function(t) {
                        var e = 0
                          , r = [];
                        t.renderer.compInterface = CompExpressionInterface(t.renderer),
                        t.renderer.globalData.projectInterface.registerComposition(t.renderer),
                        t.renderer.globalData.pushExpression = function() {
                            e += 1
                        }
                        ,
                        t.renderer.globalData.popExpression = function() {
                            0 == (e -= 1) && function() {
                                var t, e = r.length;
                                for (t = 0; t < e; t += 1)
                                    r[t].release();
                                r.length = 0
                            }()
                        }
                        ,
                        t.renderer.globalData.registerExpressionProperty = function(t) {
                            -1 === r.indexOf(t) && r.push(t)
                        }
                    }
                };
                return t.resetFrame = ExpressionManager.resetFrame,
                t
            }()
              , MaskManagerInterface = function() {
                function t(t, e) {
                    this._mask = t,
                    this._data = e
                }
                return Object.defineProperty(t.prototype, "maskPath", {
                    get: function() {
                        return this._mask.prop.k && this._mask.prop.getValue(),
                        this._mask.prop
                    }
                }),
                Object.defineProperty(t.prototype, "maskOpacity", {
                    get: function() {
                        return this._mask.op.k && this._mask.op.getValue(),
                        100 * this._mask.op.v
                    }
                }),
                function(e) {
                    var r, i = createSizedArray(e.viewData.length), n = e.viewData.length;
                    for (r = 0; r < n; r += 1)
                        i[r] = new t(e.viewData[r],e.masksProperties[r]);
                    return function(t) {
                        for (r = 0; r < n; ) {
                            if (e.masksProperties[r].nm === t)
                                return i[r];
                            r += 1
                        }
                        return null
                    }
                }
            }()
              , ExpressionPropertyInterface = function() {
                var t = {
                    pv: 0,
                    v: 0,
                    mult: 1
                }
                  , e = {
                    pv: [0, 0, 0],
                    v: [0, 0, 0],
                    mult: 1
                };
                function r(t, e, r) {
                    Object.defineProperty(t, "velocity", {
                        get: function() {
                            return e.getVelocityAtTime(e.comp.currentFrame)
                        }
                    }),
                    t.numKeys = e.keyframes ? e.keyframes.length : 0,
                    t.key = function(i) {
                        if (!t.numKeys)
                            return 0;
                        var n;
                        n = "s"in e.keyframes[i - 1] ? e.keyframes[i - 1].s : "e"in e.keyframes[i - 2] ? e.keyframes[i - 2].e : e.keyframes[i - 2].s;
                        var s = "unidimensional" === r ? new Number(n) : Object.assign({}, n);
                        return s.time = e.keyframes[i - 1].t / e.elem.comp.globalData.frameRate,
                        s.value = "unidimensional" === r ? n[0] : n,
                        s
                    }
                    ,
                    t.valueAtTime = e.getValueAtTime,
                    t.speedAtTime = e.getSpeedAtTime,
                    t.velocityAtTime = e.getVelocityAtTime,
                    t.propertyGroup = e.propertyGroup
                }
                function i() {
                    return t
                }
                return function(n) {
                    return n ? "unidimensional" === n.propType ? function(e) {
                        e && "pv"in e || (e = t);
                        var i = 1 / e.mult
                          , n = e.pv * i
                          , s = new Number(n);
                        return s.value = n,
                        r(s, e, "unidimensional"),
                        function() {
                            return e.k && e.getValue(),
                            n = e.v * i,
                            s.value !== n && ((s = new Number(n)).value = n,
                            r(s, e, "unidimensional")),
                            s
                        }
                    }(n) : function(t) {
                        t && "pv"in t || (t = e);
                        var i = 1 / t.mult
                          , n = t.data && t.data.l || t.pv.length
                          , s = createTypedArray("float32", n)
                          , a = createTypedArray("float32", n);
                        return s.value = a,
                        r(s, t, "multidimensional"),
                        function() {
                            t.k && t.getValue();
                            for (var e = 0; e < n; e += 1)
                                a[e] = t.v[e] * i,
                                s[e] = a[e];
                            return s
                        }
                    }(n) : i
                }
            }()
              , TransformExpressionInterface = function(t) {
                function e(t) {
                    switch (t) {
                    case "scale":
                    case "Scale":
                    case "ADBE Scale":
                    case 6:
                        return e.scale;
                    case "rotation":
                    case "Rotation":
                    case "ADBE Rotation":
                    case "ADBE Rotate Z":
                    case 10:
                        return e.rotation;
                    case "ADBE Rotate X":
                        return e.xRotation;
                    case "ADBE Rotate Y":
                        return e.yRotation;
                    case "position":
                    case "Position":
                    case "ADBE Position":
                    case 2:
                        return e.position;
                    case "ADBE Position_0":
                        return e.xPosition;
                    case "ADBE Position_1":
                        return e.yPosition;
                    case "ADBE Position_2":
                        return e.zPosition;
                    case "anchorPoint":
                    case "AnchorPoint":
                    case "Anchor Point":
                    case "ADBE AnchorPoint":
                    case 1:
                        return e.anchorPoint;
                    case "opacity":
                    case "Opacity":
                    case 11:
                        return e.opacity;
                    default:
                        return null
                    }
                }
                var r, i, n, s;
                return Object.defineProperty(e, "rotation", {
                    get: ExpressionPropertyInterface(t.r || t.rz)
                }),
                Object.defineProperty(e, "zRotation", {
                    get: ExpressionPropertyInterface(t.rz || t.r)
                }),
                Object.defineProperty(e, "xRotation", {
                    get: ExpressionPropertyInterface(t.rx)
                }),
                Object.defineProperty(e, "yRotation", {
                    get: ExpressionPropertyInterface(t.ry)
                }),
                Object.defineProperty(e, "scale", {
                    get: ExpressionPropertyInterface(t.s)
                }),
                t.p ? s = ExpressionPropertyInterface(t.p) : (r = ExpressionPropertyInterface(t.px),
                i = ExpressionPropertyInterface(t.py),
                t.pz && (n = ExpressionPropertyInterface(t.pz))),
                Object.defineProperty(e, "position", {
                    get: function() {
                        return t.p ? s() : [r(), i(), n ? n() : 0]
                    }
                }),
                Object.defineProperty(e, "xPosition", {
                    get: ExpressionPropertyInterface(t.px)
                }),
                Object.defineProperty(e, "yPosition", {
                    get: ExpressionPropertyInterface(t.py)
                }),
                Object.defineProperty(e, "zPosition", {
                    get: ExpressionPropertyInterface(t.pz)
                }),
                Object.defineProperty(e, "anchorPoint", {
                    get: ExpressionPropertyInterface(t.a)
                }),
                Object.defineProperty(e, "opacity", {
                    get: ExpressionPropertyInterface(t.o)
                }),
                Object.defineProperty(e, "skew", {
                    get: ExpressionPropertyInterface(t.sk)
                }),
                Object.defineProperty(e, "skewAxis", {
                    get: ExpressionPropertyInterface(t.sa)
                }),
                Object.defineProperty(e, "orientation", {
                    get: ExpressionPropertyInterface(t.or)
                }),
                e
            }
              , LayerExpressionInterface = function() {
                function t(t) {
                    var e = new Matrix;
                    return void 0 !== t ? this._elem.finalTransform.mProp.getValueAtTime(t).clone(e) : this._elem.finalTransform.mProp.applyToMatrix(e),
                    e
                }
                function e(t, e) {
                    var r = this.getMatrix(e);
                    return r.props[12] = 0,
                    r.props[13] = 0,
                    r.props[14] = 0,
                    this.applyPoint(r, t)
                }
                function r(t, e) {
                    var r = this.getMatrix(e);
                    return this.applyPoint(r, t)
                }
                function i(t, e) {
                    var r = this.getMatrix(e);
                    return r.props[12] = 0,
                    r.props[13] = 0,
                    r.props[14] = 0,
                    this.invertPoint(r, t)
                }
                function n(t, e) {
                    var r = this.getMatrix(e);
                    return this.invertPoint(r, t)
                }
                function s(t, e) {
                    if (this._elem.hierarchy && this._elem.hierarchy.length) {
                        var r, i = this._elem.hierarchy.length;
                        for (r = 0; r < i; r += 1)
                            this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(t)
                    }
                    return t.applyToPointArray(e[0], e[1], e[2] || 0)
                }
                function a(t, e) {
                    if (this._elem.hierarchy && this._elem.hierarchy.length) {
                        var r, i = this._elem.hierarchy.length;
                        for (r = 0; r < i; r += 1)
                            this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(t)
                    }
                    return t.inversePoint(e)
                }
                function o(t) {
                    var e = new Matrix;
                    if (e.reset(),
                    this._elem.finalTransform.mProp.applyToMatrix(e),
                    this._elem.hierarchy && this._elem.hierarchy.length) {
                        var r, i = this._elem.hierarchy.length;
                        for (r = 0; r < i; r += 1)
                            this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e);
                        return e.inversePoint(t)
                    }
                    return e.inversePoint(t)
                }
                function h() {
                    return [1, 1, 1, 1]
                }
                return function(l) {
                    var p;
                    function c(t) {
                        switch (t) {
                        case "ADBE Root Vectors Group":
                        case "Contents":
                        case 2:
                            return c.shapeInterface;
                        case 1:
                        case 6:
                        case "Transform":
                        case "transform":
                        case "ADBE Transform Group":
                            return p;
                        case 4:
                        case "ADBE Effect Parade":
                        case "effects":
                        case "Effects":
                            return c.effect;
                        case "ADBE Text Properties":
                            return c.textInterface;
                        default:
                            return null
                        }
                    }
                    c.getMatrix = t,
                    c.invertPoint = a,
                    c.applyPoint = s,
                    c.toWorld = r,
                    c.toWorldVec = e,
                    c.fromWorld = n,
                    c.fromWorldVec = i,
                    c.toComp = r,
                    c.fromComp = o,
                    c.sampleImage = h,
                    c.sourceRectAtTime = l.sourceRectAtTime.bind(l),
                    c._elem = l;
                    var f = getDescriptor(p = TransformExpressionInterface(l.finalTransform.mProp), "anchorPoint");
                    return Object.defineProperties(c, {
                        hasParent: {
                            get: function() {
                                return l.hierarchy.length
                            }
                        },
                        parent: {
                            get: function() {
                                return l.hierarchy[0].layerInterface
                            }
                        },
                        rotation: getDescriptor(p, "rotation"),
                        scale: getDescriptor(p, "scale"),
                        position: getDescriptor(p, "position"),
                        opacity: getDescriptor(p, "opacity"),
                        anchorPoint: f,
                        anchor_point: f,
                        transform: {
                            get: function() {
                                return p
                            }
                        },
                        active: {
                            get: function() {
                                return l.isInRange
                            }
                        }
                    }),
                    c.startTime = l.data.st,
                    c.index = l.data.ind,
                    c.source = l.data.refId,
                    c.height = 0 === l.data.ty ? l.data.h : 100,
                    c.width = 0 === l.data.ty ? l.data.w : 100,
                    c.inPoint = l.data.ip / l.comp.globalData.frameRate,
                    c.outPoint = l.data.op / l.comp.globalData.frameRate,
                    c._name = l.data.nm,
                    c.registerMaskInterface = function(t) {
                        c.mask = new MaskManagerInterface(t,l)
                    }
                    ,
                    c.registerEffectsInterface = function(t) {
                        c.effect = t
                    }
                    ,
                    c
                }
            }()
              , propertyGroupFactory = function(t, e) {
                return function(r) {
                    return (r = void 0 === r ? 1 : r) <= 0 ? t : e(r - 1)
                }
            }
              , PropertyInterface = function(t, e) {
                var r = {
                    _name: t
                };
                return function(t) {
                    return (t = void 0 === t ? 1 : t) <= 0 ? r : e(t - 1)
                }
            }
              , EffectsExpressionInterface = function() {
                function t(r, i, n, s) {
                    function a(t) {
                        for (var e = r.ef, i = 0, n = e.length; i < n; ) {
                            if (t === e[i].nm || t === e[i].mn || t === e[i].ix)
                                return 5 === e[i].ty ? l[i] : l[i]();
                            i += 1
                        }
                        throw new Error
                    }
                    var o, h = propertyGroupFactory(a, n), l = [], p = r.ef.length;
                    for (o = 0; o < p; o += 1)
                        5 === r.ef[o].ty ? l.push(t(r.ef[o], i.effectElements[o], i.effectElements[o].propertyGroup, s)) : l.push(e(i.effectElements[o], r.ef[o].ty, s, h));
                    return "ADBE Color Control" === r.mn && Object.defineProperty(a, "color", {
                        get: function() {
                            return l[0]()
                        }
                    }),
                    Object.defineProperties(a, {
                        numProperties: {
                            get: function() {
                                return r.np
                            }
                        },
                        _name: {
                            value: r.nm
                        },
                        propertyGroup: {
                            value: h
                        }
                    }),
                    a.enabled = 0 !== r.en,
                    a.active = a.enabled,
                    a
                }
                function e(t, e, r, i) {
                    var n = ExpressionPropertyInterface(t.p);
                    return t.p.setGroupProperty && t.p.setGroupProperty(PropertyInterface("", i)),
                    function() {
                        return 10 === e ? r.comp.compInterface(t.p.v) : n()
                    }
                }
                return {
                    createEffectsInterface: function(e, r) {
                        if (e.effectsManager) {
                            var i, n = [], s = e.data.ef, a = e.effectsManager.effectElements.length;
                            for (i = 0; i < a; i += 1)
                                n.push(t(s[i], e.effectsManager.effectElements[i], r, e));
                            var o = e.data.ef || []
                              , h = function(t) {
                                for (i = 0,
                                a = o.length; i < a; ) {
                                    if (t === o[i].nm || t === o[i].mn || t === o[i].ix)
                                        return n[i];
                                    i += 1
                                }
                                return null
                            };
                            return Object.defineProperty(h, "numProperties", {
                                get: function() {
                                    return o.length
                                }
                            }),
                            h
                        }
                        return null
                    }
                }
            }()
              , ShapePathInterface = function(t, e, r) {
                var i = e.sh;
                function n(t) {
                    return "Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t ? n.path : null
                }
                var s = propertyGroupFactory(n, r);
                return i.setGroupProperty(PropertyInterface("Path", s)),
                Object.defineProperties(n, {
                    path: {
                        get: function() {
                            return i.k && i.getValue(),
                            i
                        }
                    },
                    shape: {
                        get: function() {
                            return i.k && i.getValue(),
                            i
                        }
                    },
                    _name: {
                        value: t.nm
                    },
                    ix: {
                        value: t.ix
                    },
                    propertyIndex: {
                        value: t.ix
                    },
                    mn: {
                        value: t.mn
                    },
                    propertyGroup: {
                        value: r
                    }
                }),
                n
            }
              , ShapeExpressionInterface = function() {
                function t(t, a, f) {
                    var u, d = [], m = t ? t.length : 0;
                    for (u = 0; u < m; u += 1)
                        "gr" === t[u].ty ? d.push(e(t[u], a[u], f)) : "fl" === t[u].ty ? d.push(r(t[u], a[u], f)) : "st" === t[u].ty ? d.push(n(t[u], a[u], f)) : "tm" === t[u].ty ? d.push(s(t[u], a[u], f)) : "tr" === t[u].ty || ("el" === t[u].ty ? d.push(o(t[u], a[u], f)) : "sr" === t[u].ty ? d.push(h(t[u], a[u], f)) : "sh" === t[u].ty ? d.push(ShapePathInterface(t[u], a[u], f)) : "rc" === t[u].ty ? d.push(l(t[u], a[u], f)) : "rd" === t[u].ty ? d.push(p(t[u], a[u], f)) : "rp" === t[u].ty ? d.push(c(t[u], a[u], f)) : "gf" === t[u].ty ? d.push(i(t[u], a[u], f)) : d.push((t[u],
                        a[u],
                        function() {
                            return null
                        }
                        )));
                    return d
                }
                function e(e, r, i) {
                    var n = function(t) {
                        switch (t) {
                        case "ADBE Vectors Group":
                        case "Contents":
                        case 2:
                            return n.content;
                        default:
                            return n.transform
                        }
                    };
                    n.propertyGroup = propertyGroupFactory(n, i);
                    var s = function(e, r, i) {
                        var n, s = function(t) {
                            for (var e = 0, r = n.length; e < r; ) {
                                if (n[e]._name === t || n[e].mn === t || n[e].propertyIndex === t || n[e].ix === t || n[e].ind === t)
                                    return n[e];
                                e += 1
                            }
                            return "number" == typeof t ? n[t - 1] : null
                        };
                        s.propertyGroup = propertyGroupFactory(s, i),
                        n = t(e.it, r.it, s.propertyGroup),
                        s.numProperties = n.length;
                        var o = a(e.it[e.it.length - 1], r.it[r.it.length - 1], s.propertyGroup);
                        return s.transform = o,
                        s.propertyIndex = e.cix,
                        s._name = e.nm,
                        s
                    }(e, r, n.propertyGroup)
                      , o = a(e.it[e.it.length - 1], r.it[r.it.length - 1], n.propertyGroup);
                    return n.content = s,
                    n.transform = o,
                    Object.defineProperty(n, "_name", {
                        get: function() {
                            return e.nm
                        }
                    }),
                    n.numProperties = e.np,
                    n.propertyIndex = e.ix,
                    n.nm = e.nm,
                    n.mn = e.mn,
                    n
                }
                function r(t, e, r) {
                    function i(t) {
                        return "Color" === t || "color" === t ? i.color : "Opacity" === t || "opacity" === t ? i.opacity : null
                    }
                    return Object.defineProperties(i, {
                        color: {
                            get: ExpressionPropertyInterface(e.c)
                        },
                        opacity: {
                            get: ExpressionPropertyInterface(e.o)
                        },
                        _name: {
                            value: t.nm
                        },
                        mn: {
                            value: t.mn
                        }
                    }),
                    e.c.setGroupProperty(PropertyInterface("Color", r)),
                    e.o.setGroupProperty(PropertyInterface("Opacity", r)),
                    i
                }
                function i(t, e, r) {
                    function i(t) {
                        return "Start Point" === t || "start point" === t ? i.startPoint : "End Point" === t || "end point" === t ? i.endPoint : "Opacity" === t || "opacity" === t ? i.opacity : null
                    }
                    return Object.defineProperties(i, {
                        startPoint: {
                            get: ExpressionPropertyInterface(e.s)
                        },
                        endPoint: {
                            get: ExpressionPropertyInterface(e.e)
                        },
                        opacity: {
                            get: ExpressionPropertyInterface(e.o)
                        },
                        type: {
                            get: function() {
                                return "a"
                            }
                        },
                        _name: {
                            value: t.nm
                        },
                        mn: {
                            value: t.mn
                        }
                    }),
                    e.s.setGroupProperty(PropertyInterface("Start Point", r)),
                    e.e.setGroupProperty(PropertyInterface("End Point", r)),
                    e.o.setGroupProperty(PropertyInterface("Opacity", r)),
                    i
                }
                function n(t, e, r) {
                    var i, n = propertyGroupFactory(l, r), s = propertyGroupFactory(h, n);
                    function a(r) {
                        Object.defineProperty(h, t.d[r].nm, {
                            get: ExpressionPropertyInterface(e.d.dataProps[r].p)
                        })
                    }
                    var o = t.d ? t.d.length : 0
                      , h = {};
                    for (i = 0; i < o; i += 1)
                        a(i),
                        e.d.dataProps[i].p.setGroupProperty(s);
                    function l(t) {
                        return "Color" === t || "color" === t ? l.color : "Opacity" === t || "opacity" === t ? l.opacity : "Stroke Width" === t || "stroke width" === t ? l.strokeWidth : null
                    }
                    return Object.defineProperties(l, {
                        color: {
                            get: ExpressionPropertyInterface(e.c)
                        },
                        opacity: {
                            get: ExpressionPropertyInterface(e.o)
                        },
                        strokeWidth: {
                            get: ExpressionPropertyInterface(e.w)
                        },
                        dash: {
                            get: function() {
                                return h
                            }
                        },
                        _name: {
                            value: t.nm
                        },
                        mn: {
                            value: t.mn
                        }
                    }),
                    e.c.setGroupProperty(PropertyInterface("Color", n)),
                    e.o.setGroupProperty(PropertyInterface("Opacity", n)),
                    e.w.setGroupProperty(PropertyInterface("Stroke Width", n)),
                    l
                }
                function s(t, e, r) {
                    function i(e) {
                        return e === t.e.ix || "End" === e || "end" === e ? i.end : e === t.s.ix ? i.start : e === t.o.ix ? i.offset : null
                    }
                    var n = propertyGroupFactory(i, r);
                    return i.propertyIndex = t.ix,
                    e.s.setGroupProperty(PropertyInterface("Start", n)),
                    e.e.setGroupProperty(PropertyInterface("End", n)),
                    e.o.setGroupProperty(PropertyInterface("Offset", n)),
                    i.propertyIndex = t.ix,
                    i.propertyGroup = r,
                    Object.defineProperties(i, {
                        start: {
                            get: ExpressionPropertyInterface(e.s)
                        },
                        end: {
                            get: ExpressionPropertyInterface(e.e)
                        },
                        offset: {
                            get: ExpressionPropertyInterface(e.o)
                        },
                        _name: {
                            value: t.nm
                        }
                    }),
                    i.mn = t.mn,
                    i
                }
                function a(t, e, r) {
                    function i(e) {
                        return t.a.ix === e || "Anchor Point" === e ? i.anchorPoint : t.o.ix === e || "Opacity" === e ? i.opacity : t.p.ix === e || "Position" === e ? i.position : t.r.ix === e || "Rotation" === e || "ADBE Vector Rotation" === e ? i.rotation : t.s.ix === e || "Scale" === e ? i.scale : t.sk && t.sk.ix === e || "Skew" === e ? i.skew : t.sa && t.sa.ix === e || "Skew Axis" === e ? i.skewAxis : null
                    }
                    var n = propertyGroupFactory(i, r);
                    return e.transform.mProps.o.setGroupProperty(PropertyInterface("Opacity", n)),
                    e.transform.mProps.p.setGroupProperty(PropertyInterface("Position", n)),
                    e.transform.mProps.a.setGroupProperty(PropertyInterface("Anchor Point", n)),
                    e.transform.mProps.s.setGroupProperty(PropertyInterface("Scale", n)),
                    e.transform.mProps.r.setGroupProperty(PropertyInterface("Rotation", n)),
                    e.transform.mProps.sk && (e.transform.mProps.sk.setGroupProperty(PropertyInterface("Skew", n)),
                    e.transform.mProps.sa.setGroupProperty(PropertyInterface("Skew Angle", n))),
                    e.transform.op.setGroupProperty(PropertyInterface("Opacity", n)),
                    Object.defineProperties(i, {
                        opacity: {
                            get: ExpressionPropertyInterface(e.transform.mProps.o)
                        },
                        position: {
                            get: ExpressionPropertyInterface(e.transform.mProps.p)
                        },
                        anchorPoint: {
                            get: ExpressionPropertyInterface(e.transform.mProps.a)
                        },
                        scale: {
                            get: ExpressionPropertyInterface(e.transform.mProps.s)
                        },
                        rotation: {
                            get: ExpressionPropertyInterface(e.transform.mProps.r)
                        },
                        skew: {
                            get: ExpressionPropertyInterface(e.transform.mProps.sk)
                        },
                        skewAxis: {
                            get: ExpressionPropertyInterface(e.transform.mProps.sa)
                        },
                        _name: {
                            value: t.nm
                        }
                    }),
                    i.ty = "tr",
                    i.mn = t.mn,
                    i.propertyGroup = r,
                    i
                }
                function o(t, e, r) {
                    function i(e) {
                        return t.p.ix === e ? i.position : t.s.ix === e ? i.size : null
                    }
                    var n = propertyGroupFactory(i, r);
                    i.propertyIndex = t.ix;
                    var s = "tm" === e.sh.ty ? e.sh.prop : e.sh;
                    return s.s.setGroupProperty(PropertyInterface("Size", n)),
                    s.p.setGroupProperty(PropertyInterface("Position", n)),
                    Object.defineProperties(i, {
                        size: {
                            get: ExpressionPropertyInterface(s.s)
                        },
                        position: {
                            get: ExpressionPropertyInterface(s.p)
                        },
                        _name: {
                            value: t.nm
                        }
                    }),
                    i.mn = t.mn,
                    i
                }
                function h(t, e, r) {
                    function i(e) {
                        return t.p.ix === e ? i.position : t.r.ix === e ? i.rotation : t.pt.ix === e ? i.points : t.or.ix === e || "ADBE Vector Star Outer Radius" === e ? i.outerRadius : t.os.ix === e ? i.outerRoundness : !t.ir || t.ir.ix !== e && "ADBE Vector Star Inner Radius" !== e ? t.is && t.is.ix === e ? i.innerRoundness : null : i.innerRadius
                    }
                    var n = propertyGroupFactory(i, r)
                      , s = "tm" === e.sh.ty ? e.sh.prop : e.sh;
                    return i.propertyIndex = t.ix,
                    s.or.setGroupProperty(PropertyInterface("Outer Radius", n)),
                    s.os.setGroupProperty(PropertyInterface("Outer Roundness", n)),
                    s.pt.setGroupProperty(PropertyInterface("Points", n)),
                    s.p.setGroupProperty(PropertyInterface("Position", n)),
                    s.r.setGroupProperty(PropertyInterface("Rotation", n)),
                    t.ir && (s.ir.setGroupProperty(PropertyInterface("Inner Radius", n)),
                    s.is.setGroupProperty(PropertyInterface("Inner Roundness", n))),
                    Object.defineProperties(i, {
                        position: {
                            get: ExpressionPropertyInterface(s.p)
                        },
                        rotation: {
                            get: ExpressionPropertyInterface(s.r)
                        },
                        points: {
                            get: ExpressionPropertyInterface(s.pt)
                        },
                        outerRadius: {
                            get: ExpressionPropertyInterface(s.or)
                        },
                        outerRoundness: {
                            get: ExpressionPropertyInterface(s.os)
                        },
                        innerRadius: {
                            get: ExpressionPropertyInterface(s.ir)
                        },
                        innerRoundness: {
                            get: ExpressionPropertyInterface(s.is)
                        },
                        _name: {
                            value: t.nm
                        }
                    }),
                    i.mn = t.mn,
                    i
                }
                function l(t, e, r) {
                    function i(e) {
                        return t.p.ix === e ? i.position : t.r.ix === e ? i.roundness : t.s.ix === e || "Size" === e || "ADBE Vector Rect Size" === e ? i.size : null
                    }
                    var n = propertyGroupFactory(i, r)
                      , s = "tm" === e.sh.ty ? e.sh.prop : e.sh;
                    return i.propertyIndex = t.ix,
                    s.p.setGroupProperty(PropertyInterface("Position", n)),
                    s.s.setGroupProperty(PropertyInterface("Size", n)),
                    s.r.setGroupProperty(PropertyInterface("Rotation", n)),
                    Object.defineProperties(i, {
                        position: {
                            get: ExpressionPropertyInterface(s.p)
                        },
                        roundness: {
                            get: ExpressionPropertyInterface(s.r)
                        },
                        size: {
                            get: ExpressionPropertyInterface(s.s)
                        },
                        _name: {
                            value: t.nm
                        }
                    }),
                    i.mn = t.mn,
                    i
                }
                function p(t, e, r) {
                    function i(e) {
                        return t.r.ix === e || "Round Corners 1" === e ? i.radius : null
                    }
                    var n = propertyGroupFactory(i, r)
                      , s = e;
                    return i.propertyIndex = t.ix,
                    s.rd.setGroupProperty(PropertyInterface("Radius", n)),
                    Object.defineProperties(i, {
                        radius: {
                            get: ExpressionPropertyInterface(s.rd)
                        },
                        _name: {
                            value: t.nm
                        }
                    }),
                    i.mn = t.mn,
                    i
                }
                function c(t, e, r) {
                    function i(e) {
                        return t.c.ix === e || "Copies" === e ? i.copies : t.o.ix === e || "Offset" === e ? i.offset : null
                    }
                    var n = propertyGroupFactory(i, r)
                      , s = e;
                    return i.propertyIndex = t.ix,
                    s.c.setGroupProperty(PropertyInterface("Copies", n)),
                    s.o.setGroupProperty(PropertyInterface("Offset", n)),
                    Object.defineProperties(i, {
                        copies: {
                            get: ExpressionPropertyInterface(s.c)
                        },
                        offset: {
                            get: ExpressionPropertyInterface(s.o)
                        },
                        _name: {
                            value: t.nm
                        }
                    }),
                    i.mn = t.mn,
                    i
                }
                return function(e, r, i) {
                    var n;
                    function s(t) {
                        if ("number" == typeof t)
                            return 0 === (t = void 0 === t ? 1 : t) ? i : n[t - 1];
                        for (var e = 0, r = n.length; e < r; ) {
                            if (n[e]._name === t)
                                return n[e];
                            e += 1
                        }
                        return null
                    }
                    return s.propertyGroup = propertyGroupFactory(s, (function() {
                        return i
                    }
                    )),
                    n = t(e, r, s.propertyGroup),
                    s.numProperties = n.length,
                    s._name = "Contents",
                    s
                }
            }()
              , TextExpressionInterface = function(t) {
                var e;
                function r(t) {
                    return "ADBE Text Document" === t ? r.sourceText : null
                }
                return Object.defineProperty(r, "sourceText", {
                    get: function() {
                        t.textProperty.getValue();
                        var r = t.textProperty.currentData.t;
                        return e && r === e.value || ((e = new String(r)).value = r || new String(r),
                        Object.defineProperty(e, "style", {
                            get: function() {
                                return {
                                    fillColor: t.textProperty.currentData.fc
                                }
                            }
                        })),
                        e
                    }
                }),
                r
            };
            function _typeof(t) {
                return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                }
                : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }
                ,
                _typeof(t)
            }
            var FootageInterface = (dataInterfaceFactory = function(t) {
                function e(t) {
                    return "Outline" === t ? e.outlineInterface() : null
                }
                return e._name = "Outline",
                e.outlineInterface = function(t) {
                    var e = ""
                      , r = t.getFootageData();
                    function i(t) {
                        if (r[t])
                            return e = t,
                            "object" === _typeof(r = r[t]) ? i : r;
                        var n = t.indexOf(e);
                        if (-1 !== n) {
                            var s = parseInt(t.substr(n + e.length), 10);
                            return "object" === _typeof(r = r[s]) ? i : r
                        }
                        return ""
                    }
                    return function() {
                        return e = "",
                        r = t.getFootageData(),
                        i
                    }
                }(t),
                e
            }
            ,
            function(t) {
                function e(t) {
                    return "Data" === t ? e.dataInterface : null
                }
                return e._name = "Data",
                e.dataInterface = dataInterfaceFactory(t),
                e
            }
            ), dataInterfaceFactory, interfaces = {
                layer: LayerExpressionInterface,
                effects: EffectsExpressionInterface,
                comp: CompExpressionInterface,
                shape: ShapeExpressionInterface,
                text: TextExpressionInterface,
                footage: FootageInterface
            };
            function getInterface(t) {
                return interfaces[t] || null
            }
            var expressionHelpers = {
                searchExpressions: function(t, e, r) {
                    e.x && (r.k = !0,
                    r.x = !0,
                    r.initiateExpression = ExpressionManager.initiateExpression,
                    r.effectsSequence.push(r.initiateExpression(t, e, r).bind(r)))
                },
                getSpeedAtTime: function(t) {
                    var e = this.getValueAtTime(t)
                      , r = this.getValueAtTime(t + -.01)
                      , i = 0;
                    if (e.length) {
                        var n;
                        for (n = 0; n < e.length; n += 1)
                            i += Math.pow(r[n] - e[n], 2);
                        i = 100 * Math.sqrt(i)
                    } else
                        i = 0;
                    return i
                },
                getVelocityAtTime: function(t) {
                    if (void 0 !== this.vel)
                        return this.vel;
                    var e, r, i = -.001, n = this.getValueAtTime(t), s = this.getValueAtTime(t + i);
                    if (n.length)
                        for (e = createTypedArray("float32", n.length),
                        r = 0; r < n.length; r += 1)
                            e[r] = (s[r] - n[r]) / i;
                    else
                        e = (s - n) / i;
                    return e
                },
                getValueAtTime: function(t) {
                    return t *= this.elem.globalData.frameRate,
                    (t -= this.offsetTime) !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0,
                    this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime),
                    this._cachingAtTime.lastFrame = t),
                    this._cachingAtTime.value
                },
                getStaticValueAtTime: function() {
                    return this.pv
                },
                setGroupProperty: function(t) {
                    this.propertyGroup = t
                }
            };
            function addPropertyDecorator() {
                function t(t, e, r) {
                    if (!this.k || !this.keyframes)
                        return this.pv;
                    t = t ? t.toLowerCase() : "";
                    var i, n, s, a, o, h = this.comp.renderedFrame, l = this.keyframes, p = l[l.length - 1].t;
                    if (h <= p)
                        return this.pv;
                    if (r ? n = p - (i = e ? Math.abs(p - this.elem.comp.globalData.frameRate * e) : Math.max(0, p - this.elem.data.ip)) : ((!e || e > l.length - 1) && (e = l.length - 1),
                    i = p - (n = l[l.length - 1 - e].t)),
                    "pingpong" === t) {
                        if (Math.floor((h - n) / i) % 2 != 0)
                            return this.getValueAtTime((i - (h - n) % i + n) / this.comp.globalData.frameRate, 0)
                    } else {
                        if ("offset" === t) {
                            var c = this.getValueAtTime(n / this.comp.globalData.frameRate, 0)
                              , f = this.getValueAtTime(p / this.comp.globalData.frameRate, 0)
                              , u = this.getValueAtTime(((h - n) % i + n) / this.comp.globalData.frameRate, 0)
                              , d = Math.floor((h - n) / i);
                            if (this.pv.length) {
                                for (a = (o = new Array(c.length)).length,
                                s = 0; s < a; s += 1)
                                    o[s] = (f[s] - c[s]) * d + u[s];
                                return o
                            }
                            return (f - c) * d + u
                        }
                        if ("continue" === t) {
                            var m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0)
                              , g = this.getValueAtTime((p - .001) / this.comp.globalData.frameRate, 0);
                            if (this.pv.length) {
                                for (a = (o = new Array(m.length)).length,
                                s = 0; s < a; s += 1)
                                    o[s] = m[s] + (m[s] - g[s]) * ((h - p) / this.comp.globalData.frameRate) / 5e-4;
                                return o
                            }
                            return m + (h - p) / .001 * (m - g)
                        }
                    }
                    return this.getValueAtTime(((h - n) % i + n) / this.comp.globalData.frameRate, 0)
                }
                function e(t, e, r) {
                    if (!this.k)
                        return this.pv;
                    t = t ? t.toLowerCase() : "";
                    var i, n, s, a, o, h = this.comp.renderedFrame, l = this.keyframes, p = l[0].t;
                    if (h >= p)
                        return this.pv;
                    if (r ? n = p + (i = e ? Math.abs(this.elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - p)) : ((!e || e > l.length - 1) && (e = l.length - 1),
                    i = (n = l[e].t) - p),
                    "pingpong" === t) {
                        if (Math.floor((p - h) / i) % 2 == 0)
                            return this.getValueAtTime(((p - h) % i + p) / this.comp.globalData.frameRate, 0)
                    } else {
                        if ("offset" === t) {
                            var c = this.getValueAtTime(p / this.comp.globalData.frameRate, 0)
                              , f = this.getValueAtTime(n / this.comp.globalData.frameRate, 0)
                              , u = this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0)
                              , d = Math.floor((p - h) / i) + 1;
                            if (this.pv.length) {
                                for (a = (o = new Array(c.length)).length,
                                s = 0; s < a; s += 1)
                                    o[s] = u[s] - (f[s] - c[s]) * d;
                                return o
                            }
                            return u - (f - c) * d
                        }
                        if ("continue" === t) {
                            var m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0)
                              , g = this.getValueAtTime((p + .001) / this.comp.globalData.frameRate, 0);
                            if (this.pv.length) {
                                for (a = (o = new Array(m.length)).length,
                                s = 0; s < a; s += 1)
                                    o[s] = m[s] + (m[s] - g[s]) * (p - h) / .001;
                                return o
                            }
                            return m + (m - g) * (p - h) / .001
                        }
                    }
                    return this.getValueAtTime((i - ((p - h) % i + p)) / this.comp.globalData.frameRate, 0)
                }
                function r(t, e) {
                    if (!this.k)
                        return this.pv;
                    if (t = .5 * (t || .4),
                    (e = Math.floor(e || 5)) <= 1)
                        return this.pv;
                    var r, i, n = this.comp.renderedFrame / this.comp.globalData.frameRate, s = n - t, a = e > 1 ? (n + t - s) / (e - 1) : 1, o = 0, h = 0;
                    for (r = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; o < e; ) {
                        if (i = this.getValueAtTime(s + o * a),
                        this.pv.length)
                            for (h = 0; h < this.pv.length; h += 1)
                                r[h] += i[h];
                        else
                            r += i;
                        o += 1
                    }
                    if (this.pv.length)
                        for (h = 0; h < this.pv.length; h += 1)
                            r[h] /= e;
                    else
                        r /= e;
                    return r
                }
                function i(t) {
                    this._transformCachingAtTime || (this._transformCachingAtTime = {
                        v: new Matrix
                    });
                    var e = this._transformCachingAtTime.v;
                    if (e.cloneFromProps(this.pre.props),
                    this.appliedTransformations < 1) {
                        var r = this.a.getValueAtTime(t);
                        e.translate(-r[0] * this.a.mult, -r[1] * this.a.mult, r[2] * this.a.mult)
                    }
                    if (this.appliedTransformations < 2) {
                        var i = this.s.getValueAtTime(t);
                        e.scale(i[0] * this.s.mult, i[1] * this.s.mult, i[2] * this.s.mult)
                    }
                    if (this.sk && this.appliedTransformations < 3) {
                        var n = this.sk.getValueAtTime(t)
                          , s = this.sa.getValueAtTime(t);
                        e.skewFromAxis(-n * this.sk.mult, s * this.sa.mult)
                    }
                    if (this.r && this.appliedTransformations < 4) {
                        var a = this.r.getValueAtTime(t);
                        e.rotate(-a * this.r.mult)
                    } else if (!this.r && this.appliedTransformations < 4) {
                        var o = this.rz.getValueAtTime(t)
                          , h = this.ry.getValueAtTime(t)
                          , l = this.rx.getValueAtTime(t)
                          , p = this.or.getValueAtTime(t);
                        e.rotateZ(-o * this.rz.mult).rotateY(h * this.ry.mult).rotateX(l * this.rx.mult).rotateZ(-p[2] * this.or.mult).rotateY(p[1] * this.or.mult).rotateX(p[0] * this.or.mult)
                    }
                    if (this.data.p && this.data.p.s) {
                        var c = this.px.getValueAtTime(t)
                          , f = this.py.getValueAtTime(t);
                        if (this.data.p.z) {
                            var u = this.pz.getValueAtTime(t);
                            e.translate(c * this.px.mult, f * this.py.mult, -u * this.pz.mult)
                        } else
                            e.translate(c * this.px.mult, f * this.py.mult, 0)
                    } else {
                        var d = this.p.getValueAtTime(t);
                        e.translate(d[0] * this.p.mult, d[1] * this.p.mult, -d[2] * this.p.mult)
                    }
                    return e
                }
                function n() {
                    return this.v.clone(new Matrix)
                }
                var s = TransformPropertyFactory.getTransformProperty;
                TransformPropertyFactory.getTransformProperty = function(t, e, r) {
                    var a = s(t, e, r);
                    return a.dynamicProperties.length ? a.getValueAtTime = i.bind(a) : a.getValueAtTime = n.bind(a),
                    a.setGroupProperty = expressionHelpers.setGroupProperty,
                    a
                }
                ;
                var a = PropertyFactory.getProp;
                PropertyFactory.getProp = function(i, n, s, o, h) {
                    var l = a(i, n, s, o, h);
                    l.kf ? l.getValueAtTime = expressionHelpers.getValueAtTime.bind(l) : l.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(l),
                    l.setGroupProperty = expressionHelpers.setGroupProperty,
                    l.loopOut = t,
                    l.loopIn = e,
                    l.smooth = r,
                    l.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(l),
                    l.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(l),
                    l.numKeys = 1 === n.a ? n.k.length : 0,
                    l.propertyIndex = n.ix;
                    var p = 0;
                    return 0 !== s && (p = createTypedArray("float32", 1 === n.a ? n.k[0].s.length : n.k.length)),
                    l._cachingAtTime = {
                        lastFrame: initialDefaultFrame,
                        lastIndex: 0,
                        value: p
                    },
                    expressionHelpers.searchExpressions(i, n, l),
                    l.k && h.addDynamicProperty(l),
                    l
                }
                ;
                var o = ShapePropertyFactory.getConstructorFunction()
                  , h = ShapePropertyFactory.getKeyframedConstructorFunction();
                function l() {}
                l.prototype = {
                    vertices: function(t, e) {
                        this.k && this.getValue();
                        var r, i = this.v;
                        void 0 !== e && (i = this.getValueAtTime(e, 0));
                        var n = i._length
                          , s = i[t]
                          , a = i.v
                          , o = createSizedArray(n);
                        for (r = 0; r < n; r += 1)
                            o[r] = "i" === t || "o" === t ? [s[r][0] - a[r][0], s[r][1] - a[r][1]] : [s[r][0], s[r][1]];
                        return o
                    },
                    points: function(t) {
                        return this.vertices("v", t)
                    },
                    inTangents: function(t) {
                        return this.vertices("i", t)
                    },
                    outTangents: function(t) {
                        return this.vertices("o", t)
                    },
                    isClosed: function() {
                        return this.v.c
                    },
                    pointOnPath: function(t, e) {
                        var r = this.v;
                        void 0 !== e && (r = this.getValueAtTime(e, 0)),
                        this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r));
                        for (var i, n = this._segmentsLength, s = n.lengths, a = n.totalLength * t, o = 0, h = s.length, l = 0; o < h; ) {
                            if (l + s[o].addedLength > a) {
                                var p = o
                                  , c = r.c && o === h - 1 ? 0 : o + 1
                                  , f = (a - l) / s[o].addedLength;
                                i = bez.getPointInSegment(r.v[p], r.v[c], r.o[p], r.i[c], f, s[o]);
                                break
                            }
                            l += s[o].addedLength,
                            o += 1
                        }
                        return i || (i = r.c ? [r.v[0][0], r.v[0][1]] : [r.v[r._length - 1][0], r.v[r._length - 1][1]]),
                        i
                    },
                    vectorOnPath: function(t, e, r) {
                        1 == t ? t = this.v.c : 0 == t && (t = .999);
                        var i = this.pointOnPath(t, e)
                          , n = this.pointOnPath(t + .001, e)
                          , s = n[0] - i[0]
                          , a = n[1] - i[1]
                          , o = Math.sqrt(Math.pow(s, 2) + Math.pow(a, 2));
                        return 0 === o ? [0, 0] : "tangent" === r ? [s / o, a / o] : [-a / o, s / o]
                    },
                    tangentOnPath: function(t, e) {
                        return this.vectorOnPath(t, e, "tangent")
                    },
                    normalOnPath: function(t, e) {
                        return this.vectorOnPath(t, e, "normal")
                    },
                    setGroupProperty: expressionHelpers.setGroupProperty,
                    getValueAtTime: expressionHelpers.getStaticValueAtTime
                },
                extendPrototype([l], o),
                extendPrototype([l], h),
                h.prototype.getValueAtTime = function(t) {
                    return this._cachingAtTime || (this._cachingAtTime = {
                        shapeValue: shapePool.clone(this.pv),
                        lastIndex: 0,
                        lastTime: initialDefaultFrame
                    }),
                    t *= this.elem.globalData.frameRate,
                    (t -= this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0,
                    this._cachingAtTime.lastTime = t,
                    this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)),
                    this._cachingAtTime.shapeValue
                }
                ,
                h.prototype.initiateExpression = ExpressionManager.initiateExpression;
                var p = ShapePropertyFactory.getShapeProp;
                ShapePropertyFactory.getShapeProp = function(t, e, r, i, n) {
                    var s = p(t, e, r, i, n);
                    return s.propertyIndex = e.ix,
                    s.lock = !1,
                    3 === r ? expressionHelpers.searchExpressions(t, e.pt, s) : 4 === r && expressionHelpers.searchExpressions(t, e.ks, s),
                    s.k && t.addDynamicProperty(s),
                    s
                }
            }
            function initialize$1() {
                addPropertyDecorator()
            }
            function addDecorator() {
                TextProperty.prototype.getExpressionValue = function(t, e) {
                    var r = this.calculateExpression(e);
                    if (t.t !== r) {
                        var i = {};
                        return this.copyData(i, t),
                        i.t = r.toString(),
                        i.__complete = !1,
                        i
                    }
                    return t
                }
                ,
                TextProperty.prototype.searchProperty = function() {
                    var t = this.searchKeyframes()
                      , e = this.searchExpressions();
                    return this.kf = t || e,
                    this.kf
                }
                ,
                TextProperty.prototype.searchExpressions = function() {
                    return this.data.d.x ? (this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this),
                    this.addEffect(this.getExpressionValue.bind(this)),
                    !0) : null
                }
            }
            function initialize() {
                addDecorator()
            }
            function SVGComposableEffect() {}
            SVGComposableEffect.prototype = {
                createMergeNode: function(t, e) {
                    var r, i, n = createNS("feMerge");
                    for (n.setAttribute("result", t),
                    i = 0; i < e.length; i += 1)
                        (r = createNS("feMergeNode")).setAttribute("in", e[i]),
                        n.appendChild(r),
                        n.appendChild(r);
                    return n
                }
            };
            var linearFilterValue = "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0";
            function SVGTintFilter(t, e, r, i, n) {
                this.filterManager = e;
                var s = createNS("feColorMatrix");
                s.setAttribute("type", "matrix"),
                s.setAttribute("color-interpolation-filters", "linearRGB"),
                s.setAttribute("values", linearFilterValue + " 1 0"),
                this.linearFilter = s,
                s.setAttribute("result", i + "_tint_1"),
                t.appendChild(s),
                (s = createNS("feColorMatrix")).setAttribute("type", "matrix"),
                s.setAttribute("color-interpolation-filters", "sRGB"),
                s.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),
                s.setAttribute("result", i + "_tint_2"),
                t.appendChild(s),
                this.matrixFilter = s;
                var a = this.createMergeNode(i, [n, i + "_tint_1", i + "_tint_2"]);
                t.appendChild(a)
            }
            function SVGFillFilter(t, e, r, i) {
                this.filterManager = e;
                var n = createNS("feColorMatrix");
                n.setAttribute("type", "matrix"),
                n.setAttribute("color-interpolation-filters", "sRGB"),
                n.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),
                n.setAttribute("result", i),
                t.appendChild(n),
                this.matrixFilter = n
            }
            function SVGStrokeEffect(t, e, r) {
                this.initialized = !1,
                this.filterManager = e,
                this.elem = r,
                this.paths = []
            }
            function SVGTritoneFilter(t, e, r, i) {
                this.filterManager = e;
                var n = createNS("feColorMatrix");
                n.setAttribute("type", "matrix"),
                n.setAttribute("color-interpolation-filters", "linearRGB"),
                n.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"),
                t.appendChild(n);
                var s = createNS("feComponentTransfer");
                s.setAttribute("color-interpolation-filters", "sRGB"),
                s.setAttribute("result", i),
                this.matrixFilter = s;
                var a = createNS("feFuncR");
                a.setAttribute("type", "table"),
                s.appendChild(a),
                this.feFuncR = a;
                var o = createNS("feFuncG");
                o.setAttribute("type", "table"),
                s.appendChild(o),
                this.feFuncG = o;
                var h = createNS("feFuncB");
                h.setAttribute("type", "table"),
                s.appendChild(h),
                this.feFuncB = h,
                t.appendChild(s)
            }
            function SVGProLevelsFilter(t, e, r, i) {
                this.filterManager = e;
                var n = this.filterManager.effectElements
                  , s = createNS("feComponentTransfer");
                (n[10].p.k || 0 !== n[10].p.v || n[11].p.k || 1 !== n[11].p.v || n[12].p.k || 1 !== n[12].p.v || n[13].p.k || 0 !== n[13].p.v || n[14].p.k || 1 !== n[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", s)),
                (n[17].p.k || 0 !== n[17].p.v || n[18].p.k || 1 !== n[18].p.v || n[19].p.k || 1 !== n[19].p.v || n[20].p.k || 0 !== n[20].p.v || n[21].p.k || 1 !== n[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", s)),
                (n[24].p.k || 0 !== n[24].p.v || n[25].p.k || 1 !== n[25].p.v || n[26].p.k || 1 !== n[26].p.v || n[27].p.k || 0 !== n[27].p.v || n[28].p.k || 1 !== n[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", s)),
                (n[31].p.k || 0 !== n[31].p.v || n[32].p.k || 1 !== n[32].p.v || n[33].p.k || 1 !== n[33].p.v || n[34].p.k || 0 !== n[34].p.v || n[35].p.k || 1 !== n[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", s)),
                (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (s.setAttribute("color-interpolation-filters", "sRGB"),
                t.appendChild(s)),
                (n[3].p.k || 0 !== n[3].p.v || n[4].p.k || 1 !== n[4].p.v || n[5].p.k || 1 !== n[5].p.v || n[6].p.k || 0 !== n[6].p.v || n[7].p.k || 1 !== n[7].p.v) && ((s = createNS("feComponentTransfer")).setAttribute("color-interpolation-filters", "sRGB"),
                s.setAttribute("result", i),
                t.appendChild(s),
                this.feFuncRComposed = this.createFeFunc("feFuncR", s),
                this.feFuncGComposed = this.createFeFunc("feFuncG", s),
                this.feFuncBComposed = this.createFeFunc("feFuncB", s))
            }
            function SVGDropShadowEffect(t, e, r, i, n) {
                var s = e.container.globalData.renderConfig.filterSize
                  , a = e.data.fs || s;
                t.setAttribute("x", a.x || s.x),
                t.setAttribute("y", a.y || s.y),
                t.setAttribute("width", a.width || s.width),
                t.setAttribute("height", a.height || s.height),
                this.filterManager = e;
                var o = createNS("feGaussianBlur");
                o.setAttribute("in", "SourceAlpha"),
                o.setAttribute("result", i + "_drop_shadow_1"),
                o.setAttribute("stdDeviation", "0"),
                this.feGaussianBlur = o,
                t.appendChild(o);
                var h = createNS("feOffset");
                h.setAttribute("dx", "25"),
                h.setAttribute("dy", "0"),
                h.setAttribute("in", i + "_drop_shadow_1"),
                h.setAttribute("result", i + "_drop_shadow_2"),
                this.feOffset = h,
                t.appendChild(h);
                var l = createNS("feFlood");
                l.setAttribute("flood-color", "#00ff00"),
                l.setAttribute("flood-opacity", "1"),
                l.setAttribute("result", i + "_drop_shadow_3"),
                this.feFlood = l,
                t.appendChild(l);
                var p = createNS("feComposite");
                p.setAttribute("in", i + "_drop_shadow_3"),
                p.setAttribute("in2", i + "_drop_shadow_2"),
                p.setAttribute("operator", "in"),
                p.setAttribute("result", i + "_drop_shadow_4"),
                t.appendChild(p);
                var c = this.createMergeNode(i, [i + "_drop_shadow_4", n]);
                t.appendChild(c)
            }
            extendPrototype([SVGComposableEffect], SVGTintFilter),
            SVGTintFilter.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e = this.filterManager.effectElements[0].p.v
                      , r = this.filterManager.effectElements[1].p.v
                      , i = this.filterManager.effectElements[2].p.v / 100;
                    this.linearFilter.setAttribute("values", linearFilterValue + " " + i + " 0"),
                    this.matrixFilter.setAttribute("values", r[0] - e[0] + " 0 0 0 " + e[0] + " " + (r[1] - e[1]) + " 0 0 0 " + e[1] + " " + (r[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 1 0")
                }
            }
            ,
            SVGFillFilter.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e = this.filterManager.effectElements[2].p.v
                      , r = this.filterManager.effectElements[6].p.v;
                    this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + r + " 0")
                }
            }
            ,
            SVGStrokeEffect.prototype.initialize = function() {
                var t, e, r, i, n = this.elem.layerElement.children || this.elem.layerElement.childNodes;
                for (1 === this.filterManager.effectElements[1].p.v ? (i = this.elem.maskManager.masksProperties.length,
                r = 0) : i = 1 + (r = this.filterManager.effectElements[0].p.v - 1),
                (e = createNS("g")).setAttribute("fill", "none"),
                e.setAttribute("stroke-linecap", "round"),
                e.setAttribute("stroke-dashoffset", 1); r < i; r += 1)
                    t = createNS("path"),
                    e.appendChild(t),
                    this.paths.push({
                        p: t,
                        m: r
                    });
                if (3 === this.filterManager.effectElements[10].p.v) {
                    var s = createNS("mask")
                      , a = createElementID();
                    s.setAttribute("id", a),
                    s.setAttribute("mask-type", "alpha"),
                    s.appendChild(e),
                    this.elem.globalData.defs.appendChild(s);
                    var o = createNS("g");
                    for (o.setAttribute("mask", "url(" + getLocationHref() + "#" + a + ")"); n[0]; )
                        o.appendChild(n[0]);
                    this.elem.layerElement.appendChild(o),
                    this.masker = s,
                    e.setAttribute("stroke", "#fff")
                } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
                    if (2 === this.filterManager.effectElements[10].p.v)
                        for (n = this.elem.layerElement.children || this.elem.layerElement.childNodes; n.length; )
                            this.elem.layerElement.removeChild(n[0]);
                    this.elem.layerElement.appendChild(e),
                    this.elem.layerElement.removeAttribute("mask"),
                    e.setAttribute("stroke", "#fff")
                }
                this.initialized = !0,
                this.pathMasker = e
            }
            ,
            SVGStrokeEffect.prototype.renderFrame = function(t) {
                var e;
                this.initialized || this.initialize();
                var r, i, n = this.paths.length;
                for (e = 0; e < n; e += 1)
                    if (-1 !== this.paths[e].m && (r = this.elem.maskManager.viewData[this.paths[e].m],
                    i = this.paths[e].p,
                    (t || this.filterManager._mdf || r.prop._mdf) && i.setAttribute("d", r.lastPath),
                    t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || r.prop._mdf)) {
                        var s;
                        if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
                            var a = .01 * Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v)
                              , o = .01 * Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v)
                              , h = i.getTotalLength();
                            s = "0 0 0 " + h * a + " ";
                            var l, p = h * (o - a), c = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * .01, f = Math.floor(p / c);
                            for (l = 0; l < f; l += 1)
                                s += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * .01 + " ";
                            s += "0 " + 10 * h + " 0 0"
                        } else
                            s = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * .01;
                        i.setAttribute("stroke-dasharray", s)
                    }
                if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v),
                (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v),
                (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
                    var u = this.filterManager.effectElements[3].p.v;
                    this.pathMasker.setAttribute("stroke", "rgb(" + bmFloor(255 * u[0]) + "," + bmFloor(255 * u[1]) + "," + bmFloor(255 * u[2]) + ")")
                }
            }
            ,
            SVGTritoneFilter.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e = this.filterManager.effectElements[0].p.v
                      , r = this.filterManager.effectElements[1].p.v
                      , i = this.filterManager.effectElements[2].p.v
                      , n = i[0] + " " + r[0] + " " + e[0]
                      , s = i[1] + " " + r[1] + " " + e[1]
                      , a = i[2] + " " + r[2] + " " + e[2];
                    this.feFuncR.setAttribute("tableValues", n),
                    this.feFuncG.setAttribute("tableValues", s),
                    this.feFuncB.setAttribute("tableValues", a)
                }
            }
            ,
            SVGProLevelsFilter.prototype.createFeFunc = function(t, e) {
                var r = createNS(t);
                return r.setAttribute("type", "table"),
                e.appendChild(r),
                r
            }
            ,
            SVGProLevelsFilter.prototype.getTableValue = function(t, e, r, i, n) {
                for (var s, a, o = 0, h = Math.min(t, e), l = Math.max(t, e), p = Array.call(null, {
                    length: 256
                }), c = 0, f = n - i, u = e - t; o <= 256; )
                    a = (s = o / 256) <= h ? u < 0 ? n : i : s >= l ? u < 0 ? i : n : i + f * Math.pow((s - t) / u, 1 / r),
                    p[c] = a,
                    c += 1,
                    o += 256 / 255;
                return p.join(" ")
            }
            ,
            SVGProLevelsFilter.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e, r = this.filterManager.effectElements;
                    this.feFuncRComposed && (t || r[3].p._mdf || r[4].p._mdf || r[5].p._mdf || r[6].p._mdf || r[7].p._mdf) && (e = this.getTableValue(r[3].p.v, r[4].p.v, r[5].p.v, r[6].p.v, r[7].p.v),
                    this.feFuncRComposed.setAttribute("tableValues", e),
                    this.feFuncGComposed.setAttribute("tableValues", e),
                    this.feFuncBComposed.setAttribute("tableValues", e)),
                    this.feFuncR && (t || r[10].p._mdf || r[11].p._mdf || r[12].p._mdf || r[13].p._mdf || r[14].p._mdf) && (e = this.getTableValue(r[10].p.v, r[11].p.v, r[12].p.v, r[13].p.v, r[14].p.v),
                    this.feFuncR.setAttribute("tableValues", e)),
                    this.feFuncG && (t || r[17].p._mdf || r[18].p._mdf || r[19].p._mdf || r[20].p._mdf || r[21].p._mdf) && (e = this.getTableValue(r[17].p.v, r[18].p.v, r[19].p.v, r[20].p.v, r[21].p.v),
                    this.feFuncG.setAttribute("tableValues", e)),
                    this.feFuncB && (t || r[24].p._mdf || r[25].p._mdf || r[26].p._mdf || r[27].p._mdf || r[28].p._mdf) && (e = this.getTableValue(r[24].p.v, r[25].p.v, r[26].p.v, r[27].p.v, r[28].p.v),
                    this.feFuncB.setAttribute("tableValues", e)),
                    this.feFuncA && (t || r[31].p._mdf || r[32].p._mdf || r[33].p._mdf || r[34].p._mdf || r[35].p._mdf) && (e = this.getTableValue(r[31].p.v, r[32].p.v, r[33].p.v, r[34].p.v, r[35].p.v),
                    this.feFuncA.setAttribute("tableValues", e))
                }
            }
            ,
            extendPrototype([SVGComposableEffect], SVGDropShadowEffect),
            SVGDropShadowEffect.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4),
                    t || this.filterManager.effectElements[0].p._mdf) {
                        var e = this.filterManager.effectElements[0].p.v;
                        this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])))
                    }
                    if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255),
                    t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
                        var r = this.filterManager.effectElements[3].p.v
                          , i = (this.filterManager.effectElements[2].p.v - 90) * degToRads
                          , n = r * Math.cos(i)
                          , s = r * Math.sin(i);
                        this.feOffset.setAttribute("dx", n),
                        this.feOffset.setAttribute("dy", s)
                    }
                }
            }
            ;
            var _svgMatteSymbols = [];
            function SVGMatte3Effect(t, e, r) {
                this.initialized = !1,
                this.filterManager = e,
                this.filterElem = t,
                this.elem = r,
                r.matteElement = createNS("g"),
                r.matteElement.appendChild(r.layerElement),
                r.matteElement.appendChild(r.transformedElement),
                r.baseElement = r.matteElement
            }
            function SVGGaussianBlurEffect(t, e, r, i) {
                t.setAttribute("x", "-100%"),
                t.setAttribute("y", "-100%"),
                t.setAttribute("width", "300%"),
                t.setAttribute("height", "300%"),
                this.filterManager = e;
                var n = createNS("feGaussianBlur");
                n.setAttribute("result", i),
                t.appendChild(n),
                this.feGaussianBlur = n
            }
            function TransformEffect() {}
            function SVGTransformEffect(t, e) {
                this.init(e)
            }
            function CVTransformEffect(t) {
                this.init(t)
            }
            return SVGMatte3Effect.prototype.findSymbol = function(t) {
                for (var e = 0, r = _svgMatteSymbols.length; e < r; ) {
                    if (_svgMatteSymbols[e] === t)
                        return _svgMatteSymbols[e];
                    e += 1
                }
                return null
            }
            ,
            SVGMatte3Effect.prototype.replaceInParent = function(t, e) {
                var r = t.layerElement.parentNode;
                if (r) {
                    for (var i, n = r.children, s = 0, a = n.length; s < a && n[s] !== t.layerElement; )
                        s += 1;
                    s <= a - 2 && (i = n[s + 1]);
                    var o = createNS("use");
                    o.setAttribute("href", "#" + e),
                    i ? r.insertBefore(o, i) : r.appendChild(o)
                }
            }
            ,
            SVGMatte3Effect.prototype.setElementAsMask = function(t, e) {
                if (!this.findSymbol(e)) {
                    var r = createElementID()
                      , i = createNS("mask");
                    i.setAttribute("id", e.layerId),
                    i.setAttribute("mask-type", "alpha"),
                    _svgMatteSymbols.push(e);
                    var n = t.globalData.defs;
                    n.appendChild(i);
                    var s = createNS("symbol");
                    s.setAttribute("id", r),
                    this.replaceInParent(e, r),
                    s.appendChild(e.layerElement),
                    n.appendChild(s);
                    var a = createNS("use");
                    a.setAttribute("href", "#" + r),
                    i.appendChild(a),
                    e.data.hd = !1,
                    e.show()
                }
                t.setMatte(e.layerId)
            }
            ,
            SVGMatte3Effect.prototype.initialize = function() {
                for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, r = 0, i = e.length; r < i; )
                    e[r] && e[r].data.ind === t && this.setElementAsMask(this.elem, e[r]),
                    r += 1;
                this.initialized = !0
            }
            ,
            SVGMatte3Effect.prototype.renderFrame = function() {
                this.initialized || this.initialize()
            }
            ,
            SVGGaussianBlurEffect.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e = .3 * this.filterManager.effectElements[0].p.v
                      , r = this.filterManager.effectElements[1].p.v
                      , i = 3 == r ? 0 : e
                      , n = 2 == r ? 0 : e;
                    this.feGaussianBlur.setAttribute("stdDeviation", i + " " + n);
                    var s = 1 == this.filterManager.effectElements[2].p.v ? "wrap" : "duplicate";
                    this.feGaussianBlur.setAttribute("edgeMode", s)
                }
            }
            ,
            TransformEffect.prototype.init = function(t) {
                this.effectsManager = t,
                this.type = effectTypes.TRANSFORM_EFFECT,
                this.matrix = new Matrix,
                this.opacity = -1,
                this._mdf = !1,
                this._opMdf = !1
            }
            ,
            TransformEffect.prototype.renderFrame = function(t) {
                if (this._opMdf = !1,
                this._mdf = !1,
                t || this.effectsManager._mdf) {
                    var e = this.effectsManager.effectElements
                      , r = e[0].p.v
                      , i = e[1].p.v
                      , n = 1 === e[2].p.v
                      , s = e[3].p.v
                      , a = n ? s : e[4].p.v
                      , o = e[5].p.v
                      , h = e[6].p.v
                      , l = e[7].p.v;
                    this.matrix.reset(),
                    this.matrix.translate(-r[0], -r[1], r[2]),
                    this.matrix.scale(.01 * a, .01 * s, 1),
                    this.matrix.rotate(-l * degToRads),
                    this.matrix.skewFromAxis(-o * degToRads, (h + 90) * degToRads),
                    this.matrix.translate(i[0], i[1], 0),
                    this._mdf = !0,
                    this.opacity !== e[8].p.v && (this.opacity = e[8].p.v,
                    this._opMdf = !0)
                }
            }
            ,
            extendPrototype([TransformEffect], SVGTransformEffect),
            extendPrototype([TransformEffect], CVTransformEffect),
            registerRenderer("canvas", CanvasRenderer),
            registerRenderer("html", HybridRenderer),
            registerRenderer("svg", SVGRenderer),
            ShapeModifiers.registerModifier("tm", TrimModifier),
            ShapeModifiers.registerModifier("pb", PuckerAndBloatModifier),
            ShapeModifiers.registerModifier("rp", RepeaterModifier),
            ShapeModifiers.registerModifier("rd", RoundCornersModifier),
            ShapeModifiers.registerModifier("zz", ZigZagModifier),
            ShapeModifiers.registerModifier("op", OffsetPathModifier),
            setExpressionsPlugin(Expressions),
            setExpressionInterfaces(getInterface),
            initialize$1(),
            initialize(),
            registerEffect$1(20, SVGTintFilter, !0),
            registerEffect$1(21, SVGFillFilter, !0),
            registerEffect$1(22, SVGStrokeEffect, !1),
            registerEffect$1(23, SVGTritoneFilter, !0),
            registerEffect$1(24, SVGProLevelsFilter, !0),
            registerEffect$1(25, SVGDropShadowEffect, !0),
            registerEffect$1(28, SVGMatte3Effect, !1),
            registerEffect$1(29, SVGGaussianBlurEffect, !0),
            registerEffect$1(35, SVGTransformEffect, !1),
            registerEffect(35, CVTransformEffect),
            lottie
        }
        ,
        module.exports = factory())
    },
    "../node_modules/splitting/dist/splitting.js": function(t) {
        t.exports = function() {
            "use strict";
            var t = document
              , e = t.createTextNode.bind(t);
            function r(t, e, r) {
                t.style.setProperty(e, r)
            }
            function i(t, e) {
                return t.appendChild(e)
            }
            function n(e, r, n, s) {
                var a = t.createElement("span");
                return r && (a.className = r),
                n && (!s && a.setAttribute("data-" + r, n),
                a.textContent = n),
                e && i(e, a) || a
            }
            function s(t, e) {
                return t.getAttribute("data-" + e)
            }
            function a(e, r) {
                return e && 0 != e.length ? e.nodeName ? [e] : [].slice.call(e[0].nodeName ? e : (r || t).querySelectorAll(e)) : []
            }
            function o(t) {
                for (var e = []; t--; )
                    e[t] = [];
                return e
            }
            function h(t, e) {
                t && t.some(e)
            }
            function l(t) {
                return function(e) {
                    return t[e]
                }
            }
            var p = {};
            function c(t, e, r) {
                var i = r.indexOf(t);
                if (-1 == i)
                    r.unshift(t),
                    h(p[t].depends, (function(e) {
                        c(e, t, r)
                    }
                    ));
                else {
                    var n = r.indexOf(e);
                    r.splice(i, 1),
                    r.splice(n, 0, t)
                }
                return r
            }
            function f(t, e, r, i) {
                return {
                    by: t,
                    depends: e,
                    key: r,
                    split: i
                }
            }
            function u(t) {
                return c(t, 0, []).map(l(p))
            }
            function d(t) {
                p[t.by] = t
            }
            function m(t, r, s, o, l) {
                t.normalize();
                var p = []
                  , c = document.createDocumentFragment();
                o && p.push(t.previousSibling);
                var f = [];
                return a(t.childNodes).some((function(t) {
                    if (!t.tagName || t.hasChildNodes()) {
                        if (t.childNodes && t.childNodes.length)
                            return f.push(t),
                            void p.push.apply(p, m(t, r, s, o, l));
                        var i = t.wholeText || ""
                          , a = i.trim();
                        a.length && (" " === i[0] && f.push(e(" ")),
                        h(a.split(s), (function(t, e) {
                            e && l && f.push(n(c, "whitespace", " ", l));
                            var i = n(c, r, t);
                            p.push(i),
                            f.push(i)
                        }
                        )),
                        " " === i[i.length - 1] && f.push(e(" ")))
                    } else
                        f.push(t)
                }
                )),
                h(f, (function(t) {
                    i(c, t)
                }
                )),
                t.innerHTML = "",
                i(t, c),
                p
            }
            var g = "words"
              , y = f(g, 0, "word", (function(t) {
                return m(t, "word", /\s+/, 0, 1)
            }
            ))
              , v = "chars"
              , _ = f(v, [g], "char", (function(t, e, r) {
                var i = [];
                return h(r.words, (function(t, r) {
                    i.push.apply(i, m(t, "char", "", e.whitespace && r))
                }
                )),
                i
            }
            ));
            function b(t) {
                var e = (t = t || {}).key;
                return a(t.target || "[data-splitting]").map((function(i) {
                    var n = i["🍌"];
                    if (!t.force && n)
                        return n;
                    n = i["🍌"] = {
                        el: i
                    };
                    var a = u(t.by || s(i, "splitting") || v)
                      , o = function(t, e) {
                        for (var r in e)
                            t[r] = e[r];
                        return t
                    }({}, t);
                    return h(a, (function(t) {
                        if (t.split) {
                            var s = t.by
                              , a = (e ? "-" + e : "") + t.key
                              , l = t.split(i, o, n);
                            a && function(t, e, i) {
                                var n = "--" + e
                                  , s = n + "-index";
                                h(i, (function(t, e) {
                                    Array.isArray(t) ? h(t, (function(t) {
                                        r(t, s, e)
                                    }
                                    )) : r(t, s, e)
                                }
                                )),
                                r(t, n + "-total", i.length)
                            }(i, a, l),
                            n[s] = l,
                            i.classList.add(s)
                        }
                    }
                    )),
                    i.classList.add("splitting"),
                    n
                }
                ))
            }
            function x(t, e, r) {
                var i = a(e.matching || t.children, t)
                  , n = {};
                return h(i, (function(t) {
                    var e = Math.round(t[r]);
                    (n[e] || (n[e] = [])).push(t)
                }
                )),
                Object.keys(n).map(Number).sort(E).map(l(n))
            }
            function E(t, e) {
                return t - e
            }
            b.html = function(t) {
                var e = (t = t || {}).target = n();
                return e.innerHTML = t.content,
                b(t),
                e.outerHTML
            }
            ,
            b.add = d;
            var S = f("lines", [g], "line", (function(t, e, r) {
                return x(t, {
                    matching: r.words
                }, "offsetTop")
            }
            ))
              , P = f("items", 0, "item", (function(t, e) {
                return a(e.matching || t.children, t)
            }
            ))
              , C = f("rows", 0, "row", (function(t, e) {
                return x(t, e, "offsetTop")
            }
            ))
              , T = f("cols", 0, "col", (function(t, e) {
                return x(t, e, "offsetLeft")
            }
            ))
              , w = f("grid", ["rows", "cols"])
              , M = "layout"
              , A = f(M, 0, 0, (function(t, e) {
                var o = e.rows = +(e.rows || s(t, "rows") || 1)
                  , h = e.columns = +(e.columns || s(t, "columns") || 1);
                if (e.image = e.image || s(t, "image") || t.currentSrc || t.src,
                e.image) {
                    var l = a("img", t)[0];
                    e.image = l && (l.currentSrc || l.src)
                }
                e.image && r(t, "background-image", "url(" + e.image + ")");
                for (var p = o * h, c = [], f = n(0, "cell-grid"); p--; ) {
                    var u = n(f, "cell");
                    n(u, "cell-inner"),
                    c.push(u)
                }
                return i(t, f),
                c
            }
            ))
              , k = f("cellRows", [M], "row", (function(t, e, r) {
                var i = e.rows
                  , n = o(i);
                return h(r.layout, (function(t, e, r) {
                    n[Math.floor(e / (r.length / i))].push(t)
                }
                )),
                n
            }
            ))
              , D = f("cellColumns", [M], "col", (function(t, e, r) {
                var i = e.columns
                  , n = o(i);
                return h(r.layout, (function(t, e) {
                    n[e % i].push(t)
                }
                )),
                n
            }
            ))
              , F = f("cells", ["cellRows", "cellColumns"], "cell", (function(t, e, r) {
                return r.layout
            }
            ));
            return d(y),
            d(_),
            d(S),
            d(P),
            d(C),
            d(T),
            d(w),
            d(A),
            d(k),
            d(D),
            d(F),
            b
        }()
    },
    "../node_modules/vanilla-lazyload/dist/lazyload.min.js": function(t) {
        t.exports = function() {
            "use strict";
            function t() {
                return t = Object.assign || function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var r = arguments[e];
                        for (var i in r)
                            Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i])
                    }
                    return t
                }
                ,
                t.apply(this, arguments)
            }
            var e = "undefined" != typeof window
              , r = e && !("onscroll"in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)
              , i = e && "IntersectionObserver"in window
              , n = e && "classList"in document.createElement("p")
              , s = e && window.devicePixelRatio > 1
              , a = {
                elements_selector: ".lazy",
                container: r || e ? document : null,
                threshold: 300,
                thresholds: null,
                data_src: "src",
                data_srcset: "srcset",
                data_sizes: "sizes",
                data_bg: "bg",
                data_bg_hidpi: "bg-hidpi",
                data_bg_multi: "bg-multi",
                data_bg_multi_hidpi: "bg-multi-hidpi",
                data_bg_set: "bg-set",
                data_poster: "poster",
                class_applied: "applied",
                class_loading: "loading",
                class_loaded: "loaded",
                class_error: "error",
                class_entered: "entered",
                class_exited: "exited",
                unobserve_completed: !0,
                unobserve_entered: !1,
                cancel_on_exit: !0,
                callback_enter: null,
                callback_exit: null,
                callback_applied: null,
                callback_loading: null,
                callback_loaded: null,
                callback_error: null,
                callback_finish: null,
                callback_cancel: null,
                use_native: !1,
                restore_on_error: !1
            }
              , o = function(e) {
                return t({}, a, e)
            }
              , h = function(t, e) {
                var r, i = "LazyLoad::Initialized", n = new t(e);
                try {
                    r = new CustomEvent(i,{
                        detail: {
                            instance: n
                        }
                    })
                } catch (t) {
                    (r = document.createEvent("CustomEvent")).initCustomEvent(i, !1, !1, {
                        instance: n
                    })
                }
                window.dispatchEvent(r)
            }
              , l = "src"
              , p = "srcset"
              , c = "sizes"
              , f = "poster"
              , u = "llOriginalAttrs"
              , d = "data"
              , m = "loading"
              , g = "loaded"
              , y = "applied"
              , v = "error"
              , _ = "native"
              , b = function(t, e) {
                return t.getAttribute("data-" + e)
            }
              , x = function(t) {
                return b(t, "ll-status")
            }
              , E = function(t, e) {
                return function(t, e, r) {
                    var i = "data-ll-status";
                    null !== r ? t.setAttribute(i, r) : t.removeAttribute(i)
                }(t, 0, e)
            }
              , S = function(t) {
                return E(t, null)
            }
              , P = function(t) {
                return null === x(t)
            }
              , C = function(t) {
                return x(t) === _
            }
              , T = [m, g, y, v]
              , w = function(t, e, r, i) {
                t && (void 0 === i ? void 0 === r ? t(e) : t(e, r) : t(e, r, i))
            }
              , M = function(t, e) {
                n ? t.classList.add(e) : t.className += (t.className ? " " : "") + e
            }
              , A = function(t, e) {
                n ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
            }
              , k = function(t) {
                return t.llTempImage
            }
              , D = function(t, e) {
                if (e) {
                    var r = e._observer;
                    r && r.unobserve(t)
                }
            }
              , F = function(t, e) {
                t && (t.loadingCount += e)
            }
              , I = function(t, e) {
                t && (t.toLoadCount = e)
            }
              , R = function(t) {
                for (var e, r = [], i = 0; e = t.children[i]; i += 1)
                    "SOURCE" === e.tagName && r.push(e);
                return r
            }
              , L = function(t, e) {
                var r = t.parentNode;
                r && "PICTURE" === r.tagName && R(r).forEach(e)
            }
              , B = function(t, e) {
                R(t).forEach(e)
            }
              , V = [l]
              , O = [l, f]
              , z = [l, p, c]
              , N = [d]
              , G = function(t) {
                return !!t[u]
            }
              , H = function(t) {
                return t[u]
            }
              , q = function(t) {
                return delete t[u]
            }
              , j = function(t, e) {
                if (!G(t)) {
                    var r = {};
                    e.forEach((function(e) {
                        r[e] = t.getAttribute(e)
                    }
                    )),
                    t[u] = r
                }
            }
              , W = function(t, e) {
                if (G(t)) {
                    var r = H(t);
                    e.forEach((function(e) {
                        !function(t, e, r) {
                            r ? t.setAttribute(e, r) : t.removeAttribute(e)
                        }(t, e, r[e])
                    }
                    ))
                }
            }
              , Y = function(t, e, r) {
                M(t, e.class_applied),
                E(t, y),
                r && (e.unobserve_completed && D(t, e),
                w(e.callback_applied, t, r))
            }
              , X = function(t, e, r) {
                M(t, e.class_loading),
                E(t, m),
                r && (F(r, 1),
                w(e.callback_loading, t, r))
            }
              , $ = function(t, e, r) {
                r && t.setAttribute(e, r)
            }
              , U = function(t, e) {
                $(t, c, b(t, e.data_sizes)),
                $(t, p, b(t, e.data_srcset)),
                $(t, l, b(t, e.data_src))
            }
              , J = {
                IMG: function(t, e) {
                    L(t, (function(t) {
                        j(t, z),
                        U(t, e)
                    }
                    )),
                    j(t, z),
                    U(t, e)
                },
                IFRAME: function(t, e) {
                    j(t, V),
                    $(t, l, b(t, e.data_src))
                },
                VIDEO: function(t, e) {
                    B(t, (function(t) {
                        j(t, V),
                        $(t, l, b(t, e.data_src))
                    }
                    )),
                    j(t, O),
                    $(t, f, b(t, e.data_poster)),
                    $(t, l, b(t, e.data_src)),
                    t.load()
                },
                OBJECT: function(t, e) {
                    j(t, N),
                    $(t, d, b(t, e.data_src))
                }
            }
              , Z = ["IMG", "IFRAME", "VIDEO", "OBJECT"]
              , K = function(t, e) {
                !e || function(t) {
                    return t.loadingCount > 0
                }(e) || function(t) {
                    return t.toLoadCount > 0
                }(e) || w(t.callback_finish, e)
            }
              , Q = function(t, e, r) {
                t.addEventListener(e, r),
                t.llEvLisnrs[e] = r
            }
              , tt = function(t, e, r) {
                t.removeEventListener(e, r)
            }
              , et = function(t) {
                return !!t.llEvLisnrs
            }
              , rt = function(t) {
                if (et(t)) {
                    var e = t.llEvLisnrs;
                    for (var r in e) {
                        var i = e[r];
                        tt(t, r, i)
                    }
                    delete t.llEvLisnrs
                }
            }
              , it = function(t, e, r) {
                !function(t) {
                    delete t.llTempImage
                }(t),
                F(r, -1),
                function(t) {
                    t && (t.toLoadCount -= 1)
                }(r),
                A(t, e.class_loading),
                e.unobserve_completed && D(t, r)
            }
              , nt = function(t, e, r) {
                var i = k(t) || t;
                et(i) || function(t, e, r) {
                    et(t) || (t.llEvLisnrs = {});
                    var i = "VIDEO" === t.tagName ? "loadeddata" : "load";
                    Q(t, i, e),
                    Q(t, "error", r)
                }(i, (function(n) {
                    !function(t, e, r, i) {
                        var n = C(e);
                        it(e, r, i),
                        M(e, r.class_loaded),
                        E(e, g),
                        w(r.callback_loaded, e, i),
                        n || K(r, i)
                    }(0, t, e, r),
                    rt(i)
                }
                ), (function(n) {
                    !function(t, e, r, i) {
                        var n = C(e);
                        it(e, r, i),
                        M(e, r.class_error),
                        E(e, v),
                        w(r.callback_error, e, i),
                        r.restore_on_error && W(e, z),
                        n || K(r, i)
                    }(0, t, e, r),
                    rt(i)
                }
                ))
            }
              , st = function(t, e, r) {
                !function(t) {
                    return Z.indexOf(t.tagName) > -1
                }(t) ? function(t, e, r) {
                    !function(t) {
                        t.llTempImage = document.createElement("IMG")
                    }(t),
                    nt(t, e, r),
                    function(t) {
                        G(t) || (t[u] = {
                            backgroundImage: t.style.backgroundImage
                        })
                    }(t),
                    function(t, e, r) {
                        var i = b(t, e.data_bg)
                          , n = b(t, e.data_bg_hidpi)
                          , a = s && n ? n : i;
                        a && (t.style.backgroundImage = 'url("'.concat(a, '")'),
                        k(t).setAttribute(l, a),
                        X(t, e, r))
                    }(t, e, r),
                    function(t, e, r) {
                        var i = b(t, e.data_bg_multi)
                          , n = b(t, e.data_bg_multi_hidpi)
                          , a = s && n ? n : i;
                        a && (t.style.backgroundImage = a,
                        Y(t, e, r))
                    }(t, e, r),
                    function(t, e, r) {
                        var i = b(t, e.data_bg_set);
                        if (i) {
                            var n = i.split("|")
                              , s = n.map((function(t) {
                                return "image-set(".concat(t, ")")
                            }
                            ));
                            t.style.backgroundImage = s.join(),
                            "" === t.style.backgroundImage && (s = n.map((function(t) {
                                return "-webkit-image-set(".concat(t, ")")
                            }
                            )),
                            t.style.backgroundImage = s.join()),
                            Y(t, e, r)
                        }
                    }(t, e, r)
                }(t, e, r) : function(t, e, r) {
                    nt(t, e, r),
                    function(t, e, r) {
                        var i = J[t.tagName];
                        i && (i(t, e),
                        X(t, e, r))
                    }(t, e, r)
                }(t, e, r)
            }
              , at = function(t) {
                t.removeAttribute(l),
                t.removeAttribute(p),
                t.removeAttribute(c)
            }
              , ot = function(t) {
                L(t, (function(t) {
                    W(t, z)
                }
                )),
                W(t, z)
            }
              , ht = {
                IMG: ot,
                IFRAME: function(t) {
                    W(t, V)
                },
                VIDEO: function(t) {
                    B(t, (function(t) {
                        W(t, V)
                    }
                    )),
                    W(t, O),
                    t.load()
                },
                OBJECT: function(t) {
                    W(t, N)
                }
            }
              , lt = ["IMG", "IFRAME", "VIDEO"]
              , pt = function(t) {
                return t.use_native && "loading"in HTMLImageElement.prototype
            }
              , ct = function(t) {
                return Array.prototype.slice.call(t)
            }
              , ft = function(t) {
                return t.container.querySelectorAll(t.elements_selector)
            }
              , ut = function(t) {
                return function(t) {
                    return x(t) === v
                }(t)
            }
              , dt = function(t, e) {
                return function(t) {
                    return ct(t).filter(P)
                }(t || ft(e))
            }
              , mt = function(t, r) {
                var n = o(t);
                this._settings = n,
                this.loadingCount = 0,
                function(t, e) {
                    i && !pt(t) && (e._observer = new IntersectionObserver((function(r) {
                        !function(t, e, r) {
                            t.forEach((function(t) {
                                return function(t) {
                                    return t.isIntersecting || t.intersectionRatio > 0
                                }(t) ? function(t, e, r, i) {
                                    var n = function(t) {
                                        return T.indexOf(x(t)) >= 0
                                    }(t);
                                    E(t, "entered"),
                                    M(t, r.class_entered),
                                    A(t, r.class_exited),
                                    function(t, e, r) {
                                        e.unobserve_entered && D(t, r)
                                    }(t, r, i),
                                    w(r.callback_enter, t, e, i),
                                    n || st(t, r, i)
                                }(t.target, t, e, r) : function(t, e, r, i) {
                                    P(t) || (M(t, r.class_exited),
                                    function(t, e, r, i) {
                                        r.cancel_on_exit && function(t) {
                                            return x(t) === m
                                        }(t) && "IMG" === t.tagName && (rt(t),
                                        function(t) {
                                            L(t, (function(t) {
                                                at(t)
                                            }
                                            )),
                                            at(t)
                                        }(t),
                                        ot(t),
                                        A(t, r.class_loading),
                                        F(i, -1),
                                        S(t),
                                        w(r.callback_cancel, t, e, i))
                                    }(t, e, r, i),
                                    w(r.callback_exit, t, e, i))
                                }(t.target, t, e, r)
                            }
                            ))
                        }(r, t, e)
                    }
                    ),function(t) {
                        return {
                            root: t.container === document ? null : t.container,
                            rootMargin: t.thresholds || t.threshold + "px"
                        }
                    }(t)))
                }(n, this),
                function(t, r) {
                    e && (r._onlineHandler = function() {
                        !function(t, e) {
                            var r;
                            (r = ft(t),
                            ct(r).filter(ut)).forEach((function(e) {
                                A(e, t.class_error),
                                S(e)
                            }
                            )),
                            e.update()
                        }(t, r)
                    }
                    ,
                    window.addEventListener("online", r._onlineHandler))
                }(n, this),
                this.update(r)
            };
            return mt.prototype = {
                update: function(t) {
                    var e, n, s = this._settings, a = dt(t, s);
                    I(this, a.length),
                    !r && i ? pt(s) ? function(t, e, r) {
                        t.forEach((function(t) {
                            -1 !== lt.indexOf(t.tagName) && function(t, e, r) {
                                t.setAttribute("loading", "lazy"),
                                nt(t, e, r),
                                function(t, e) {
                                    var r = J[t.tagName];
                                    r && r(t, e)
                                }(t, e),
                                E(t, _)
                            }(t, e, r)
                        }
                        )),
                        I(r, 0)
                    }(a, s, this) : (n = a,
                    function(t) {
                        t.disconnect()
                    }(e = this._observer),
                    function(t, e) {
                        e.forEach((function(e) {
                            t.observe(e)
                        }
                        ))
                    }(e, n)) : this.loadAll(a)
                },
                destroy: function() {
                    this._observer && this._observer.disconnect(),
                    e && window.removeEventListener("online", this._onlineHandler),
                    ft(this._settings).forEach((function(t) {
                        q(t)
                    }
                    )),
                    delete this._observer,
                    delete this._settings,
                    delete this._onlineHandler,
                    delete this.loadingCount,
                    delete this.toLoadCount
                },
                loadAll: function(t) {
                    var e = this
                      , r = this._settings;
                    dt(t, r).forEach((function(t) {
                        D(t, e),
                        st(t, r, e)
                    }
                    ))
                },
                restoreAll: function() {
                    var t = this._settings;
                    ft(t).forEach((function(e) {
                        !function(t, e) {
                            (function(t) {
                                var e = ht[t.tagName];
                                e ? e(t) : function(t) {
                                    if (G(t)) {
                                        var e = H(t);
                                        t.style.backgroundImage = e.backgroundImage
                                    }
                                }(t)
                            }
                            )(t),
                            function(t, e) {
                                P(t) || C(t) || (A(t, e.class_entered),
                                A(t, e.class_exited),
                                A(t, e.class_applied),
                                A(t, e.class_loading),
                                A(t, e.class_loaded),
                                A(t, e.class_error))
                            }(t, e),
                            S(t),
                            q(t)
                        }(e, t)
                    }
                    ))
                }
            },
            mt.load = function(t, e) {
                var r = o(e);
                st(t, r)
            }
            ,
            mt.resetStatus = function(t) {
                S(t)
            }
            ,
            e && function(t, e) {
                if (e)
                    if (e.length)
                        for (var r, i = 0; r = e[i]; i += 1)
                            h(t, r);
                    else
                        h(t, e)
            }(mt, window.lazyLoadOptions),
            mt
        }()
    },
    "../node_modules/@studio-freight/lenis/dist/lenis.modern.mjs": (t, e, r) => {
        "use strict";
        function i() {
            return i = Object.assign ? Object.assign.bind() : function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var r = arguments[e];
                    for (var i in r)
                        Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i])
                }
                return t
            }
            ,
            i.apply(this, arguments)
        }
        function n(t, e, r) {
            return Math.max(t, Math.min(e, r))
        }
        r.d(e, {
            Z: () => l
        });
        class s {
            advance(t) {
                var e;
                if (!this.isRunning)
                    return;
                let r = !1;
                if (this.lerp)
                    this.value = (i = this.value,
                    s = this.to,
                    (1 - (a = 1 - Math.exp(-60 * this.lerp * t))) * i + a * s),
                    Math.round(this.value) === this.to && (this.value = this.to,
                    r = !0);
                else {
                    this.currentTime += t;
                    const e = n(0, this.currentTime / this.duration, 1);
                    r = e >= 1;
                    const i = r ? 1 : this.easing(e);
                    this.value = this.from + (this.to - this.from) * i
                }
                var i, s, a;
                null == (e = this.onUpdate) || e.call(this, this.value, {
                    completed: r
                }),
                r && this.stop()
            }
            stop() {
                this.isRunning = !1
            }
            fromTo(t, e, {lerp: r=.1, duration: i=1, easing: n=(t => t), onUpdate: s}) {
                this.from = this.value = t,
                this.to = e,
                this.lerp = r,
                this.duration = i,
                this.easing = n,
                this.currentTime = 0,
                this.isRunning = !0,
                this.onUpdate = s
            }
        }
        class a {
            constructor({wrapper: t, content: e, autoResize: r=!0}={}) {
                if (this.resize = () => {
                    this.onWrapperResize(),
                    this.onContentResize()
                }
                ,
                this.onWrapperResize = () => {
                    this.wrapper === window ? (this.width = window.innerWidth,
                    this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth,
                    this.height = this.wrapper.clientHeight)
                }
                ,
                this.onContentResize = () => {
                    this.scrollHeight = this.content.scrollHeight,
                    this.scrollWidth = this.content.scrollWidth
                }
                ,
                this.wrapper = t,
                this.content = e,
                r) {
                    const t = function(t, e) {
                        let r;
                        return function() {
                            let e = arguments
                              , i = this;
                            clearTimeout(r),
                            r = setTimeout((function() {
                                t.apply(i, e)
                            }
                            ), 250)
                        }
                    }(this.resize);
                    this.wrapper !== window && (this.wrapperResizeObserver = new ResizeObserver(t),
                    this.wrapperResizeObserver.observe(this.wrapper)),
                    this.contentResizeObserver = new ResizeObserver(t),
                    this.contentResizeObserver.observe(this.content)
                }
                this.resize()
            }
            destroy() {
                var t, e;
                null == (t = this.wrapperResizeObserver) || t.disconnect(),
                null == (e = this.contentResizeObserver) || e.disconnect()
            }
            get limit() {
                return {
                    x: this.scrollWidth - this.width,
                    y: this.scrollHeight - this.height
                }
            }
        }
        class o {
            constructor() {
                this.events = {}
            }
            emit(t, ...e) {
                let r = this.events[t] || [];
                for (let t = 0, i = r.length; t < i; t++)
                    r[t](...e)
            }
            on(t, e) {
                var r;
                return (null == (r = this.events[t]) ? void 0 : r.push(e)) || (this.events[t] = [e]),
                () => {
                    var r;
                    this.events[t] = null == (r = this.events[t]) ? void 0 : r.filter((t => e !== t))
                }
            }
            off(t, e) {
                var r;
                this.events[t] = null == (r = this.events[t]) ? void 0 : r.filter((t => e !== t))
            }
            destroy() {
                this.events = {}
            }
        }
        class h {
            constructor(t, {wheelMultiplier: e=1, touchMultiplier: r=2, normalizeWheel: i=!1}) {
                this.onTouchStart = t => {
                    const {clientX: e, clientY: r} = t.targetTouches ? t.targetTouches[0] : t;
                    this.touchStart.x = e,
                    this.touchStart.y = r,
                    this.lastDelta = {
                        x: 0,
                        y: 0
                    }
                }
                ,
                this.onTouchMove = t => {
                    const {clientX: e, clientY: r} = t.targetTouches ? t.targetTouches[0] : t
                      , i = -(e - this.touchStart.x) * this.touchMultiplier
                      , n = -(r - this.touchStart.y) * this.touchMultiplier;
                    this.touchStart.x = e,
                    this.touchStart.y = r,
                    this.lastDelta = {
                        x: i,
                        y: n
                    },
                    this.emitter.emit("scroll", {
                        deltaX: i,
                        deltaY: n,
                        event: t
                    })
                }
                ,
                this.onTouchEnd = t => {
                    this.emitter.emit("scroll", {
                        deltaX: this.lastDelta.x,
                        deltaY: this.lastDelta.y,
                        event: t
                    })
                }
                ,
                this.onWheel = t => {
                    let {deltaX: e, deltaY: r} = t;
                    this.normalizeWheel && (e = n(-100, e, 100),
                    r = n(-100, r, 100)),
                    e *= this.wheelMultiplier,
                    r *= this.wheelMultiplier,
                    this.emitter.emit("scroll", {
                        deltaX: e,
                        deltaY: r,
                        event: t
                    })
                }
                ,
                this.element = t,
                this.wheelMultiplier = e,
                this.touchMultiplier = r,
                this.normalizeWheel = i,
                this.touchStart = {
                    x: null,
                    y: null
                },
                this.emitter = new o,
                this.element.addEventListener("wheel", this.onWheel, {
                    passive: !1
                }),
                this.element.addEventListener("touchstart", this.onTouchStart, {
                    passive: !1
                }),
                this.element.addEventListener("touchmove", this.onTouchMove, {
                    passive: !1
                }),
                this.element.addEventListener("touchend", this.onTouchEnd, {
                    passive: !1
                })
            }
            on(t, e) {
                return this.emitter.on(t, e)
            }
            destroy() {
                this.emitter.destroy(),
                this.element.removeEventListener("wheel", this.onWheel, {
                    passive: !1
                }),
                this.element.removeEventListener("touchstart", this.onTouchStart, {
                    passive: !1
                }),
                this.element.removeEventListener("touchmove", this.onTouchMove, {
                    passive: !1
                }),
                this.element.removeEventListener("touchend", this.onTouchEnd, {
                    passive: !1
                })
            }
        }
        class l {
            constructor({wrapper: t=window, content: e=document.documentElement, wheelEventsTarget: r=t, smoothWheel: n=!0, smoothTouch: l=!1, syncTouch: p=!1, syncTouchLerp: c=.1, __iosNoInertiaSyncTouchLerp: f=.4, touchInertiaMultiplier: u=35, duration: d, easing: m=(t => Math.min(1, 1.001 - Math.pow(2, -10 * t))), lerp: g=d && .1, infinite: y=!1, orientation: v="vertical", gestureOrientation: _="vertical", touchMultiplier: b=1, wheelMultiplier: x=1, normalizeWheel: E=!1, autoResize: S=!0}={}) {
                this.onVirtualScroll = ({deltaX: t, deltaY: e, event: r}) => {
                    if (r.ctrlKey)
                        return;
                    const n = r.type.includes("touch")
                      , s = r.type.includes("wheel");
                    if ("vertical" === this.options.gestureOrientation && 0 === e || "horizontal" === this.options.gestureOrientation && 0 === t || n && "vertical" === this.options.gestureOrientation && 0 === this.scroll && !this.options.infinite && e <= 0)
                        return;
                    let a = r.composedPath();
                    if (a = a.slice(0, a.indexOf(this.rootElement)),
                    a.find((t => {
                        var e;
                        return (null == t.hasAttribute ? void 0 : t.hasAttribute("data-lenis-prevent")) || n && (null == t.hasAttribute ? void 0 : t.hasAttribute("data-lenis-prevent-touch")) || s && (null == t.hasAttribute ? void 0 : t.hasAttribute("data-lenis-prevent-wheel")) || (null == (e = t.classList) ? void 0 : e.contains("lenis"))
                    }
                    )))
                        return;
                    if (this.isStopped || this.isLocked)
                        return void r.preventDefault();
                    if (this.isSmooth = (this.options.smoothTouch || this.options.syncTouch) && n || this.options.smoothWheel && s,
                    !this.isSmooth)
                        return this.isScrolling = !1,
                        void this.animate.stop();
                    r.preventDefault();
                    let o = e;
                    "both" === this.options.gestureOrientation ? o = Math.abs(e) > Math.abs(t) ? e : t : "horizontal" === this.options.gestureOrientation && (o = t);
                    const h = n && this.options.syncTouch
                      , l = n && "touchend" === r.type && Math.abs(o) > 1;
                    l && (o = this.velocity * this.options.touchInertiaMultiplier),
                    this.scrollTo(this.targetScroll + o, i({
                        programmatic: !1
                    }, h && {
                        lerp: l ? this.syncTouchLerp : this.options.__iosNoInertiaSyncTouchLerp
                    }))
                }
                ,
                this.onScroll = () => {
                    if (!this.isScrolling) {
                        const t = this.animatedScroll;
                        this.animatedScroll = this.targetScroll = this.actualScroll,
                        this.velocity = 0,
                        this.direction = Math.sign(this.animatedScroll - t),
                        this.emit()
                    }
                }
                ,
                window.lenisVersion = "1.0.22",
                t !== document.documentElement && t !== document.body || (t = window),
                this.options = {
                    wrapper: t,
                    content: e,
                    wheelEventsTarget: r,
                    smoothWheel: n,
                    smoothTouch: l,
                    syncTouch: p,
                    syncTouchLerp: c,
                    __iosNoInertiaSyncTouchLerp: f,
                    touchInertiaMultiplier: u,
                    duration: d,
                    easing: m,
                    lerp: g,
                    infinite: y,
                    gestureOrientation: _,
                    orientation: v,
                    touchMultiplier: b,
                    wheelMultiplier: x,
                    normalizeWheel: E,
                    autoResize: S
                },
                this.dimensions = new a({
                    wrapper: t,
                    content: e,
                    autoResize: S
                }),
                this.rootElement.classList.add("lenis"),
                this.velocity = 0,
                this.isStopped = !1,
                this.isSmooth = n || l,
                this.isScrolling = !1,
                this.targetScroll = this.animatedScroll = this.actualScroll,
                this.animate = new s,
                this.emitter = new o,
                this.options.wrapper.addEventListener("scroll", this.onScroll, {
                    passive: !1
                }),
                this.virtualScroll = new h(r,{
                    touchMultiplier: b,
                    wheelMultiplier: x,
                    normalizeWheel: E
                }),
                this.virtualScroll.on("scroll", this.onVirtualScroll)
            }
            destroy() {
                this.emitter.destroy(),
                this.options.wrapper.removeEventListener("scroll", this.onScroll, {
                    passive: !1
                }),
                this.virtualScroll.destroy(),
                this.dimensions.destroy(),
                this.rootElement.classList.remove("lenis"),
                this.rootElement.classList.remove("lenis-smooth"),
                this.rootElement.classList.remove("lenis-scrolling"),
                this.rootElement.classList.remove("lenis-stopped")
            }
            on(t, e) {
                return this.emitter.on(t, e)
            }
            off(t, e) {
                return this.emitter.off(t, e)
            }
            setScroll(t) {
                this.isHorizontal ? this.rootElement.scrollLeft = t : this.rootElement.scrollTop = t
            }
            resize() {
                this.dimensions.resize()
            }
            emit() {
                this.emitter.emit("scroll", this)
            }
            reset() {
                this.isLocked = !1,
                this.isScrolling = !1,
                this.velocity = 0,
                this.animate.stop()
            }
            start() {
                this.isStopped = !1,
                this.reset()
            }
            stop() {
                this.isStopped = !0,
                this.animate.stop(),
                this.reset()
            }
            raf(t) {
                const e = t - (this.time || t);
                this.time = t,
                this.animate.advance(.001 * e)
            }
            scrollTo(t, {offset: e=0, immediate: r=!1, lock: i=!1, duration: s=this.options.duration, easing: a=this.options.easing, lerp: o=!s && this.options.lerp, onComplete: h=null, force: l=!1, programmatic: p=!0}={}) {
                if (!this.isStopped || l) {
                    if (["top", "left", "start"].includes(t))
                        t = 0;
                    else if (["bottom", "right", "end"].includes(t))
                        t = this.limit;
                    else {
                        var c;
                        let r;
                        if ("string" == typeof t ? r = document.querySelector(t) : null != (c = t) && c.nodeType && (r = t),
                        r) {
                            if (this.options.wrapper !== window) {
                                const t = this.options.wrapper.getBoundingClientRect();
                                e -= this.isHorizontal ? t.left : t.top
                            }
                            const i = r.getBoundingClientRect();
                            t = (this.isHorizontal ? i.left : i.top) + this.animatedScroll
                        }
                    }
                    if ("number" == typeof t) {
                        if (t += e,
                        t = Math.round(t),
                        this.options.infinite ? p && (this.targetScroll = this.animatedScroll = this.scroll) : t = n(0, t, this.limit),
                        r)
                            return this.animatedScroll = this.targetScroll = t,
                            this.setScroll(this.scroll),
                            this.reset(),
                            this.emit(),
                            void (null == h || h());
                        if (!p) {
                            if (t === this.targetScroll)
                                return;
                            this.targetScroll = t
                        }
                        this.animate.fromTo(this.animatedScroll, t, {
                            duration: s,
                            easing: a,
                            lerp: o,
                            onUpdate: (t, {completed: e}) => {
                                i && (this.isLocked = !0),
                                this.isScrolling = !0,
                                this.velocity = t - this.animatedScroll,
                                this.direction = Math.sign(this.velocity),
                                this.animatedScroll = t,
                                this.setScroll(this.scroll),
                                p && (this.targetScroll = t),
                                e && (i && (this.isLocked = !1),
                                requestAnimationFrame(( () => {
                                    this.isScrolling = !1
                                }
                                )),
                                this.velocity = 0,
                                null == h || h()),
                                this.emit()
                            }
                        })
                    }
                }
            }
            get rootElement() {
                return this.options.wrapper === window ? this.options.content : this.options.wrapper
            }
            get limit() {
                return this.dimensions.limit[this.isHorizontal ? "x" : "y"]
            }
            get isHorizontal() {
                return "horizontal" === this.options.orientation
            }
            get actualScroll() {
                return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop
            }
            get scroll() {
                return this.options.infinite ? (this.animatedScroll % (t = this.limit) + t) % t : this.animatedScroll;
                var t
            }
            get progress() {
                return 0 === this.limit ? 1 : this.scroll / this.limit
            }
            get isSmooth() {
                return this.__isSmooth
            }
            set isSmooth(t) {
                this.__isSmooth !== t && (this.rootElement.classList.toggle("lenis-smooth", t),
                this.__isSmooth = t)
            }
            get isScrolling() {
                return this.__isScrolling
            }
            set isScrolling(t) {
                this.__isScrolling !== t && (this.rootElement.classList.toggle("lenis-scrolling", t),
                this.__isScrolling = t)
            }
            get isStopped() {
                return this.__isStopped
            }
            set isStopped(t) {
                this.__isStopped !== t && (this.rootElement.classList.toggle("lenis-stopped", t),
                this.__isStopped = t)
            }
        }
    }
    ,
    "../node_modules/throttle-debounce/esm/index.js": (t, e, r) => {
        "use strict";
        function i(t, e, r) {
            var i, n = r || {}, s = n.noTrailing, a = void 0 !== s && s, o = n.noLeading, h = void 0 !== o && o, l = n.debounceMode, p = void 0 === l ? void 0 : l, c = !1, f = 0;
            function u() {
                i && clearTimeout(i)
            }
            function d() {
                for (var r = arguments.length, n = new Array(r), s = 0; s < r; s++)
                    n[s] = arguments[s];
                var o = this
                  , l = Date.now() - f;
                function d() {
                    f = Date.now(),
                    e.apply(o, n)
                }
                function m() {
                    i = void 0
                }
                c || (h || !p || i || d(),
                u(),
                void 0 === p && l > t ? h ? (f = Date.now(),
                a || (i = setTimeout(p ? m : d, t))) : d() : !0 !== a && (i = setTimeout(p ? m : d, void 0 === p ? t - l : t)))
            }
            return d.cancel = function(t) {
                var e = (t || {}).upcomingOnly
                  , r = void 0 !== e && e;
                u(),
                c = !r
            }
            ,
            d
        }
        function n(t, e, r) {
            var n = (r || {}).atBegin;
            return i(t, e, {
                debounceMode: !1 !== (void 0 !== n && n)
            })
        }
        r.d(e, {
            D: () => n,
            P: () => i
        })
    }
}]);
