"use strict";
(self.webpackChunk_roots_bud_sage_sage = self.webpackChunk_roots_bud_sage_sage || []).push([[143], {
    "./scripts/app.js": (t, e, i) => {
        var s = i("../node_modules/@roots/sage/lib/client/dom-ready.js")
          , o = i("../node_modules/vanilla-lazyload/dist/lazyload.min.js")
          , n = i.n(o)
          , r = i("../node_modules/@studio-freight/lenis/dist/lenis.modern.mjs")
          , l = i("../node_modules/@unseenco/taxi/src/taxi.js")
          , h = i("../node_modules/throttle-debounce/esm/index.js")
          , a = i("../node_modules/gsap/index.js")
          , c = i("../node_modules/gsap/CustomEase.js")
          , d = i("../node_modules/gsap/ScrollTrigger.js")
          , u = {
            currentScroll: 0,
            currentTermIndex: 0,
            homeCover: null,
            isHomePrevious: !1,
            loaderComplete: !1,
            pageScroll: [],
            detect: {
                uA: navigator.userAgent.toLowerCase(),
                get iPadIOS13() {
                    return "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1
                },
                get isMobile() {
                    return /mobi|android|tablet|ipad|iphone/.test(this.uA) && window.innerWidth <= 1024 || this.iPadIOS13
                },
                get isMobileAndroid() {
                    return /android.*mobile/.test(this.uA)
                },
                get isFirefox() {
                    return this.uA.indexOf("firefox") > -1
                },
                get isAndroid() {
                    return this.isMobileAndroid || !this.isMobileAndroid && /android/i.test(this.uA)
                },
                get safari() {
                    return this.uA.match(/version\/[\d.]+.*safari/)
                },
                get isSafari() {
                    return this.safari && !this.isAndroid
                }
            },
            remToPixel: t => t * parseFloat(getComputedStyle(document.documentElement).fontSize),
            round: (t, e) => {
                const i = e ? Math.pow(10, e) : 100;
                return Math.round(t * i) / i
            }
        };
        class p {
            constructor(t, e) {
                this.$el = t,
                this.destroyLast = e,
                this.bindMethods(),
                this.getElems(),
                this.init(),
                this.events()
            }
            onEnterCompleted() {}
            bindMethods() {}
            appear() {}
            getElems() {}
            init() {}
            events() {}
            destroy() {}
            resize() {}
            scroll() {}
            scrollEnd() {}
            update() {}
        }
        var g = i("../node_modules/splitting/dist/splitting.js")
          , m = i.n(g);
        class $ extends p {
            init() {
                u.detect.isMobile || (this.splittedLink = new (m())({
                    by: "chars",
                    target: this.$el
                })[0].chars,
                this.createAnimation())
            }
            events() {
                u.detect.isMobile || this.$el.addEventListener("mouseenter", this.onLinkEnter.bind(this))
            }
            createAnimation() {
                this.animation = a.p8.timeline({
                    defaults: {
                        duration: .2,
                        ease: "none"
                    },
                    paused: !0
                }),
                this.animation.to(this.splittedLink, {
                    alpha: 0,
                    stagger: .025
                }).to(this.splittedLink, {
                    alpha: 1,
                    stagger: .025
                }, "<0.25")
            }
            onLinkEnter() {
                this.animation.play(0)
            }
        }
        class v {
            constructor(t) {
                let {el: e} = t;
                this.$el = e,
                this.canToggle = !0,
                this.canUpdate = !1,
                this.isFirst = !0,
                this.isOpen = !1,
                this.currentLettersTranslate = 0,
                this.targetLettersTranslate = 0,
                this.bindMethods(),
                this.getElems(),
                this.init(),
                this.events(),
                new $(this.$close)
            }
            bindMethods() {
                this.close = this.close.bind(this),
                this.onKey = this.onKey.bind(this),
                this.open = this.open.bind(this)
            }
            init() {
                this.lettersTop = this.$letters[0].getBoundingClientRect().top,
                this.translateValue = u.w.h - this.$items[0].getBoundingClientRect().top,
                a.p8.set([this.$el, this.$letters], {
                    autoAlpha: 0
                })
            }
            getElems() {
                this.$close = this.$el.querySelector(".contact__close"),
                this.$items = this.$el.querySelectorAll(".contact__item"),
                this.$letters = this.$el.querySelectorAll(".contact__letter"),
                this.$overlay = this.$el.querySelector(".contact__overlay")
            }
            events() {
                document.body.addEventListener("keydown", this.onKey),
                this.$close.addEventListener("click", this.close),
                this.$overlay.addEventListener("click", this.close);
                for (let t = 0; t < this.$items.length; t++)
                    this.$items[t].addEventListener("mouseenter", this.onItemEnter.bind(this, t)),
                    this.$items[t].addEventListener("mouseleave", this.onItemLeave.bind(this))
            }
            close() {
                return new Promise((t => {
                    this.isOpen && this.canToggle && (this.canToggle = !1,
                    this.canUpdate = !1,
                    this.isOpen = !1,
                    this.hide().then(( () => {
                        t()
                    }
                    )),
                    u.smoothScroll && u.smoothScroll.start(),
                    setTimeout(( () => {
                        this.canToggle = !0
                    }
                    ), 200))
                }
                ))
            }
            hide() {
                return new Promise((t => {
                    this.hideAnimation = a.p8.timeline({
                        onComplete: () => {
                            t()
                        }
                    }),
                    this.showAnimation && this.showAnimation.pause(),
                    this.hideAnimation.to(this.$el, {
                        autoAlpha: 0,
                        duration: .25,
                        ease: "none"
                    })
                }
                ))
            }
            hideLetters(t) {
                t !== this.currentId || this.isHover || (a.p8.to(this.$letters, {
                    autoAlpha: 0,
                    duration: .2,
                    ease: "none"
                }),
                this.isFirst = !0)
            }
            onItemEnter(t) {
                if (!this.canUpdate)
                    return;
                const e = a.p8.timeline()
                  , i = this.$items[t].getBoundingClientRect().top - this.lettersTop;
                this.isHover = !0,
                this.isFirst ? e.set(this.$letters, {
                    y: i
                }).to(this.$letters, {
                    autoAlpha: 1,
                    duration: .4,
                    ease: "none"
                }) : e.to(this.$letters, {
                    delay: .1,
                    duration: .8,
                    ease: "expo.out",
                    stagger: .075,
                    y: i
                }),
                this.isFirst = !1
            }
            onItemLeave() {
                this.isHover = !1,
                this.currentId = 10 * Math.random(),
                this.itemEnterAnimation && this.itemEnterAnimation.kill(),
                setTimeout(this.hideLetters.bind(this, this.currentId), 1e3)
            }
            onKey(t) {
                "Escape" === t.key && this.close()
            }
            open() {
                !this.isOpen && this.canToggle && (this.canToggle = !1,
                this.isOpen = !0,
                this.show(),
                u.smoothScroll && u.smoothScroll.stop(),
                setTimeout(( () => {
                    this.canToggle = !0
                }
                ), 700),
                setTimeout(( () => {
                    this.canUpdate = !0
                }
                ), 1e3))
            }
            resize() {
                this.lettersTop = this.$letters[0].getBoundingClientRect().top,
                this.translateValue = u.w.h - this.$items[0].getBoundingClientRect().top
            }
            show() {
                for (let t = 0; t < this.$items.length; t++)
                    a.p8.set(this.$items[t], {
                        y: () => this.translateValue
                    }),
                    u.w.w > 1023 && (t % 2 == 0 ? a.p8.set(this.$items[t], {
                        rotate: "5deg"
                    }) : a.p8.set(this.$items[t], {
                        rotate: "-10deg"
                    }));
                this.showAnimation = a.p8.timeline(),
                this.hideAnimation && this.hideAnimation.pause(),
                this.showAnimation.to(this.$el, {
                    autoAlpha: 1,
                    duration: .4,
                    ease: "none"
                }).to(this.$items, {
                    duration: 1,
                    ease: "expo.out",
                    rotate: 0,
                    stagger: .1,
                    y: 0
                }, "<0.2")
            }
        }
        class y {
            constructor() {
                this.menuOpen = !1,
                this.bindMethods(),
                this.getElems(),
                this.addEvents(),
                this.onPageChange({
                    href: window.location.href
                })
            }
            bindMethods() {
                this.toggle = this.toggle.bind(this)
            }
            getElems() {
                this.$toggler = document.body.querySelector(".toggler")
            }
            addEvents() {
                this.$toggler && this.$toggler.addEventListener("click", this.toggle)
            }
            toggle() {
                this.menuOpen ? this.close() : this.open()
            }
            open() {
                return new Promise((t => {
                    this.menuOpen = !0,
                    t()
                }
                ))
            }
            close() {
                return new Promise((t => {
                    this.menuOpen = !1,
                    t()
                }
                ))
            }
            resize() {}
            scroll() {}
            onPageChange() {}
        }
        var w = i("../node_modules/lottie-web/build/player/lottie.js")
          , T = i.n(w);
        class k {
            constructor() {
                this.getElems(),
                this.init()
            }
            getElems() {
                this.$content = document.body.querySelector(".loader__content"),
                this.$el = document.body.querySelector(".loader"),
                this.$gif = this.$el.querySelector(".loader__gif"),
                this.$logotype = this.$el.querySelector(".loader__logotype"),
                this.$video = document.body.querySelector(".home-cover__video")
            }
            init() {
                const t = [];
                this.createLottieAnimation(),
                this.createLoaderAnimation(),
                u.smoothScroll && u.smoothScroll.stop(),
                u.homeCover && t.push(u.homeCover.load()),
                u.detect.isSafari || u.detect.isMobile ? (this.$gif.querySelector("img").src = this.$gif.querySelector("img").dataset.src,
                a.p8.set(this.$gif, {
                    autoAlpha: 1
                }),
                setTimeout(( () => {
                    Promise.all(t).then(( () => {
                        this.loaderAnimation.play(),
                        a.p8.to(this.$gif, {
                            autoAlpha: 0,
                            duration: .6
                        })
                    }
                    ))
                }
                ), 2400)) : (setTimeout(this.logotypeAnimation.play(), 1e3),
                a.p8.set(this.$gif, {
                    autoAlpha: 0
                }),
                Promise.all(t).then(( () => {
                    this.logotypeAnimation.addEventListener("enterFrame", ( () => {
                        this.logotypeAnimation.currentFrame / this.logotypeAnimation.totalFrames > .8 && (this.loaderAnimation.play(),
                        this.logotypeAnimation.addEventListener("loopComplete", ( () => {
                            this.logotypeAnimation.pause()
                        }
                        )))
                    }
                    ))
                }
                )))
            }
            createLoaderAnimation() {
                this.loaderAnimation = a.p8.timeline({
                    defaults: {
                        duration: 1.2,
                        ease: "expo.inOut"
                    },
                    onComplete: () => {
                        const t = document.body.querySelector(".tarteaucitronAlertBigBottom");
                        a.p8.set(this.$el, {
                            autoAlpha: 0
                        }),
                        t && a.p8.fromTo(t, {
                            alpha: 0
                        }, {
                            alpha: 1,
                            duration: .2,
                            ease: "expo.inOut"
                        }),
                        u.smoothScroll && u.smoothScroll.start(),
                        window.dispatchEvent(new CustomEvent("loadercomplete")),
                        u.loaderComplete = !0
                    }
                    ,
                    paused: !0
                }),
                this.loaderAnimation.to(this.$el, {
                    yPercent: -33
                }).fromTo(this.$content, {
                    position: "fixed",
                    top: 0,
                    y: "100vh",
                    zIndex: 41
                }, {
                    clearProps: !0,
                    y: 0
                }, "<").call(( () => {
                    u.blocks.forEach((t => {
                        t.instances.forEach((t => {
                            t.class.beforeAppear && t.class.beforeAppear()
                        }
                        ))
                    }
                    ))
                }
                ), null, "-=0.6"),
                this.$video && this.loaderAnimation.fromTo(this.$video, {
                    yPercent: "-50"
                }, {
                    yPercent: "0"
                }, 0)
            }
            createLottieAnimation() {
                this.logotypeAnimation = T().loadAnimation({
                    autoplay: !1,
                    container: this.$logotype,
                    loop: !0,
                    path: "/logotype.json",
                    renderer: "svg"
                })
            }
        }
        class f {
            constructor(t) {
                let {el: e, parent: i, single: s=!1, x: o=!1} = t;
                this.$el = e,
                this.$parent = i,
                this.single = s,
                this.x = o,
                this.bindMethods(),
                this.getElems(),
                this.init(),
                this.events(),
                this.canMove = !1,
                this.cursorRect = this.$el.getBoundingClientRect(),
                this.cursorHeight = this.cursorRect.height,
                this.cursorWidth = this.cursorRect.width,
                this.parentRect = this.$parent.getBoundingClientRect(),
                this.parentTop = this.parentRect.top + window.scrollY
            }
            init() {}
            bindMethods() {
                this.onMouseEnter = this.onMouseEnter.bind(this),
                this.onMouseLeave = this.onMouseLeave.bind(this),
                this.onMouseMove = this.onMouseMove.bind(this)
            }
            getElems() {}
            events() {
                u.detect.isMobile || (this.$parent.addEventListener("mouseenter", this.onMouseEnter),
                this.$parent.addEventListener("mouseleave", this.onMouseLeave),
                this.$parent.addEventListener("mousemove", this.onMouseMove))
            }
            onMouseEnter(t) {
                this.canMove = !0,
                this.currentCursorTranslateY = t.clientY - this.cursorHeight / 2,
                this.targetCursorTranslateY = this.currentCursorTranslateY,
                this.x && (this.currentCursorTranslateX = t.clientX - this.cursorWidth / 2,
                this.targetCursorTranslateX = this.currentCursorTranslateX)
            }
            onMouseLeave() {
                this.canMove = !1
            }
            onMouseMove(t) {
                this.canMove && (this.targetCursorTranslateY = t.clientY - this.cursorHeight / 2,
                this.x && (this.targetCursorTranslateX = t.clientX - this.cursorWidth / 2))
            }
            resize() {
                this.cursorRect = this.$el.getBoundingClientRect(),
                this.cursorHeight = this.cursorRect.height,
                this.cursorWidth = this.cursorRect.width,
                this.parentRect = this.$parent.getBoundingClientRect(),
                this.parentTop = this.parentRect.top + window.scrollY
            }
            update() {
                u.detect.isMobile || (this.currentCursorTranslateY += .15 * (this.targetCursorTranslateY - this.currentCursorTranslateY),
                this.x && (this.currentCursorTranslateX += .15 * (this.targetCursorTranslateX - this.currentCursorTranslateX)),
                this.x ? this.single ? this.$el.style.transform = `translate(${this.currentCursorTranslateX}px, ${this.currentCursorTranslateY + window.scrollY / 2}px)` : this.$el.style.transform = `translate(${this.currentCursorTranslateX}px, ${this.currentCursorTranslateY + window.scrollY}px)` : this.$el.style.transform = `translateY(${this.currentCursorTranslateY + window.scrollY - this.parentTop}px)`)
            }
        }
        class b {
            constructor(t) {
                let {el: e, parent: i, scrollTrigger: s=!1} = t;
                this.$el = e,
                this.$parent = i,
                this.scrollTrigger = s,
                this.hasContact = this.$el.dataset.contact,
                this.getElems(),
                this.events(),
                this.logotypeTextLetters = [],
                this.logotypeTextRect = this.$el.getBoundingClientRect(),
                this.logotypeTextWidth = this.logotypeTextRect.width,
                this.logotypeTextTextRect = this.$logotypeTextText.getBoundingClientRect(),
                this.logotypeTextTextWidth = this.logotypeTextTextRect.width,
                this.parentRect = this.$parent.getBoundingClientRect(),
                this.parentLeft = this.parentRect.left;
                for (let t = 0; t < this.$logotypeTextLetters.length; t++) {
                    const e = this.$logotypeTextLetters[t].getBoundingClientRect()
                      , i = {
                        dom: this.$logotypeTextLetters[t],
                        left: e.left - this.parentLeft,
                        width: e.width
                    };
                    this.logotypeTextLetters.push(i)
                }
                this.setDefaultPosition(),
                this.scrollTrigger ? (this.show(),
                this.attachScrollTrigger()) : this.logotypeTextTextWidth > this.logotypeTextLetters[1].left - this.logotypeTextLetters[0].left - this.logotypeTextLetters[0].width && (this.$logotypeTextText.style.flexDirection = "column")
            }
            getElems() {
                this.$logotypeTextLetters = this.$el.querySelectorAll(".logotype-text__letter"),
                this.$logotypeTextText = this.$el.querySelector(".logotype-text__text")
            }
            events() {
                this.hasContact && this.$el.addEventListener("click", u.contact.open),
                window.addEventListener("filteredworks", ( () => {
                    this.scrollTrigger && this.scrollTrigger.refresh()
                }
                ))
            }
            destroy() {
                window.removeEventListener("filteredworks", ( () => {
                    this.scrollTrigger && this.scrollTrigger.refresh()
                }
                ))
            }
            attachScrollTrigger() {
                this.scrollTrigger = u.scrollTrigger.create({
                    animation: this.showAnimation,
                    start: u.w.w < 1024 ? "top 75%" : "top 50%",
                    trigger: this.$parent
                })
            }
            hide() {
                this.hideAnimation = a.p8.timeline(),
                this.showAnimation && this.showAnimation.pause(),
                this.hideAnimation.to(this.$el, {
                    autoAlpha: 0,
                    duration: .4,
                    ease: "power2.out"
                })
            }
            resize() {
                a.p8.set(this.$logotypeTextLetters, {
                    x: 0
                }),
                this.logotypeTextLetters = [],
                this.logotypeTextRect = this.$el.getBoundingClientRect(),
                this.logotypeTextWidth = this.logotypeTextRect.width,
                this.logotypeTextTextRect = this.$logotypeTextText.getBoundingClientRect(),
                this.logotypeTextTextWidth = this.logotypeTextTextRect.width,
                this.parentRect = this.$parent.getBoundingClientRect(),
                this.parentLeft = this.parentRect.left;
                for (let t = 0; t < this.$logotypeTextLetters.length; t++) {
                    const e = this.$logotypeTextLetters[t].getBoundingClientRect()
                      , i = {
                        dom: this.$logotypeTextLetters[t],
                        left: e.left - this.parentLeft,
                        width: e.width
                    };
                    this.logotypeTextLetters.push(i)
                }
                !this.scrollTrigger && this.logotypeTextTextWidth > this.logotypeTextLetters[1].left - this.logotypeTextLetters[0].left - this.logotypeTextLetters[0].width ? this.$logotypeTextText.style.flexDirection = "column" : this.$logotypeTextText.setAttribute("style", ""),
                this.setDefaultPosition(),
                this.showAnimation && this.showAnimation.pause() && this.showAnimation.invalidate() && this.showAnimation.kill()
            }
            setDefaultPosition() {
                a.p8.set([this.$el, this.$logotypeTextText], {
                    autoAlpha: 0
                }),
                a.p8.set(this.logotypeTextLetters[0].dom, {
                    x: this.logotypeTextWidth / 2 - this.logotypeTextLetters[0].width - this.logotypeTextLetters[0].left
                }),
                a.p8.set(this.logotypeTextLetters[1].dom, {
                    x: -(this.logotypeTextWidth / 2 - this.logotypeTextLetters[1].width - this.logotypeTextLetters[0].left)
                })
            }
            show() {
                const t = u.w.w < 768 ? "-0.2rem" : u.w.w < 1440 ? "-0.5rem" : "-0.8rem"
                  , e = u.w.w < 768 ? "-0.4rem" : u.w.w < 1440 ? "-1rem" : "-1.6rem";
                this.showAnimation = a.p8.timeline({
                    defaults: {
                        duration: 2,
                        ease: "expo.out"
                    }
                }),
                this.hideAnimation && this.hideAnimation.pause(),
                this.showAnimation.set([this.$el, this.$logotypeTextText], {
                    autoAlpha: 0
                }).set(this.logotypeTextLetters[0].dom, {
                    x: () => this.logotypeTextWidth / 2 - this.logotypeTextLetters[0].width - this.logotypeTextLetters[0].left
                }).set(this.logotypeTextLetters[1].dom, {
                    x: () => -(this.logotypeTextWidth / 2 - this.logotypeTextLetters[1].width - this.logotypeTextLetters[0].left)
                }).to(this.$el, {
                    autoAlpha: 1,
                    duration: .25,
                    ease: "linear"
                }).to(this.$logotypeTextLetters, {
                    x: 0
                }, "-=0.125").to(this.$logotypeTextText, {
                    autoAlpha: 1,
                    duration: .25,
                    ease: "linear"
                }, "-=1.8").fromTo(this.$logotypeTextText, {
                    letterSpacing: this.scrollTrigger ? e : "-0.15rem"
                }, {
                    letterSpacing: this.scrollTrigger ? t : "0"
                }, "<")
            }
        }
        class x extends f {
            init() {
                this.canUpdate = !0,
                this.createScrollTrigger(),
                u.detect.isMobile ? (this.$el.classList.add("pointer-events-auto"),
                this.$el.classList.remove("pointer-events-none"),
                a.p8.set(this.$el, {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                })) : (this.circleWidth = this.$cursorCircle.getBoundingClientRect().width,
                a.p8.set([this.$el, this.$cursorText], {
                    autoAlpha: 0
                }),
                a.p8.set(this.$cursorCircle, {
                    scale: 0,
                    y: 15
                }),
                a.p8.set(this.$cursorLetters[0], {
                    x: this.circleWidth / 2 + 7
                }),
                a.p8.set(this.$cursorLetters[1], {
                    x: -(this.circleWidth / 2 + 7)
                }))
            }
            getElems() {
                this.$cursorCircle = this.$el.querySelector(".cover-cursor__circle"),
                this.$cursorLetters = this.$el.querySelectorAll(".cover-cursor__letter"),
                this.$cursorText = this.$el.querySelector(".cover-cursor__text")
            }
            createScrollTrigger() {
                u.scrollTrigger.create({
                    onEnterBack: () => {
                        this.canUpdate = !0
                    }
                    ,
                    onLeave: () => {
                        this.canUpdate = !1
                    }
                    ,
                    start: "top top",
                    trigger: this.$parent
                })
            }
            hideCursor() {
                a.p8.to(this.$el, {
                    autoAlpha: 0,
                    duration: .25,
                    ease: "none"
                })
            }
            onMouseEnter(t) {
                super.onMouseEnter(t),
                this.showCursor()
            }
            onMouseLeave() {
                super.onMouseLeave(),
                this.hideCursor()
            }
            resize() {
                super.resize(),
                u.detect.isMobile ? a.p8.set(this.$el, {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                }) : this.circleWidth = this.$cursorCircle.getBoundingClientRect().width
            }
            showCursor() {
                a.p8.timeline({
                    defaults: {
                        duration: .8,
                        ease: "expo.out"
                    }
                }).set([this.$el, this.$cursorText], {
                    autoAlpha: 0
                }).set(this.$cursorCircle, {
                    scale: 0,
                    y: 15
                }).set(this.$cursorLetters[0], {
                    x: this.circleWidth / 2 + 7
                }).set(this.$cursorLetters[1], {
                    x: -(this.circleWidth / 2 + 7)
                }).to(this.$el, {
                    autoAlpha: 1,
                    duration: .25,
                    ease: "linear"
                }).to(this.$cursorLetters, {
                    x: 0
                }, "-=0.125").to(this.$cursorCircle, {
                    scale: 1,
                    y: 0
                }, "-=0.7").to(this.$cursorText, {
                    autoAlpha: 1,
                    ease: "linear"
                }, "<")
            }
        }
        class S {
            constructor(t) {
                this.$el = t,
                this.bindMethods(),
                this.getElems(),
                this.events(),
                this.canClick = !this.$cover,
                this.isFullscreen = !1,
                this.isPaused = !0,
                !this.canClick && this.$timeline.classList.add("pointer-events-none"),
                this.createTimelineAnimation()
            }
            bindMethods() {
                this.onFullscreenClick = this.onFullscreenClick.bind(this),
                this.onKey = this.onKey.bind(this),
                this.onSoundClick = this.onSoundClick.bind(this),
                this.onTimelineClick = this.onTimelineClick.bind(this),
                this.onVideoClick = this.onVideoClick.bind(this),
                this.onVideoEnded = this.onVideoEnded.bind(this)
            }
            getElems() {
                this.$player = this.$el.querySelector(".player"),
                this.$close = this.$player.querySelector(".player__close"),
                this.$cover = this.$player.querySelector(".player__cover"),
                this.$cursor = this.$player.querySelector(".cover-cursor"),
                this.$elements = this.$player.querySelector(".player__elements"),
                this.$fullscreenButton = this.$player.querySelector(".player__fullscreen"),
                this.$header = this.$player.querySelector(".player__header"),
                this.$loading = this.$player.querySelector(".player__loading"),
                this.$playButton = this.$player.querySelector(".player__button"),
                this.$playButtonTexts = this.$playButton.querySelectorAll("div"),
                this.$soundButton = this.$player.querySelector(".player__sound"),
                this.$soundButtonTexts = this.$soundButton.querySelectorAll("div"),
                this.$timeline = this.$player.querySelector(".player__timeline"),
                this.$timelineCurrent = this.$timeline.querySelector(".player__timeline-current"),
                this.$timerCurrent = this.$player.querySelector(".player__timer-current"),
                this.$timerTotal = this.$player.querySelector(".player__timer-total"),
                this.$video = this.$player.querySelector(".player__video")
            }
            events() {
                document.body.addEventListener("keydown", this.onKey),
                this.$fullscreenButton && this.$fullscreenButton.addEventListener("click", this.onFullscreenClick),
                this.$playButton && this.$playButton.addEventListener("click", this.onVideoClick),
                this.$soundButton && this.$soundButton.addEventListener("click", this.onSoundClick),
                this.$timeline && this.$timeline.addEventListener("click", this.onTimelineClick),
                this.$cover && (u.detect.isMobile ? this.$cursor.addEventListener("click", this.onVideoClick) : this.$cover.addEventListener("click", this.onVideoClick)),
                this.$video && (this.$video.addEventListener("click", this.onVideoClick),
                this.$video.addEventListener("ended", this.onVideoEnded),
                this.$video.addEventListener("fullscreenchange", ( () => {
                    document.fullscreenElement || (this.isFullscreen = !1)
                }
                )),
                this.$video.addEventListener("pause", ( () => {
                    a.p8.set(this.$playButtonTexts[0], {
                        autoAlpha: 0,
                        pointerEvents: "none"
                    }),
                    a.p8.set(this.$playButtonTexts[1], {
                        autoAlpha: 1,
                        pointerEvents: "all"
                    })
                }
                )),
                this.$video.addEventListener("play", ( () => {
                    a.p8.set(this.$playButtonTexts[0], {
                        autoAlpha: 1,
                        pointerEvents: "all"
                    }),
                    a.p8.set(this.$playButtonTexts[1], {
                        autoAlpha: 0,
                        pointerEvents: "none"
                    })
                }
                )),
                this.$video.addEventListener("playing", ( () => {
                    this.isWaiting && (this.isWaiting = !1,
                    a.p8.to(this.$loading, {
                        autoAlpha: 0,
                        duration: .4,
                        ease: "power2.out"
                    }))
                }
                )),
                this.$video.addEventListener("seeked", ( () => {
                    a.p8.to(this.$loading, {
                        autoAlpha: 0,
                        duration: .4,
                        ease: "power2.out"
                    })
                }
                )),
                this.$video.addEventListener("seeking", ( () => {
                    a.p8.to(this.$loading, {
                        autoAlpha: 1,
                        duration: .4,
                        ease: "power2.out"
                    })
                }
                )),
                this.$video.addEventListener("timeupdate", ( () => {
                    const t = Math.trunc(this.$video.currentTime)
                      , e = Math.floor(t / 60)
                      , i = t - 60 * e;
                    this.$timerCurrent.textContent = `${e}:${i < 10 ? "0" + i : i}`
                }
                )),
                this.$video.addEventListener("waiting", ( () => {
                    this.isWaiting = !0,
                    a.p8.to(this.$loading, {
                        autoAlpha: 1,
                        duration: .4,
                        ease: "power2.out"
                    })
                }
                )))
            }
            createTimelineAnimation() {
                this.timelineAnimation = a.p8.timeline({
                    paused: !0
                }),
                this.timelineAnimation.fromTo(this.$timelineCurrent, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: "linear"
                })
            }
            load(t) {
                return new Promise((e => {
                    this.$video.src = t,
                    this.$video.load(),
                    this.$video.onloadeddata = () => {
                        const t = Math.trunc(this.$video.duration)
                          , i = Math.floor(t / 60)
                          , s = t - 60 * i;
                        this.$timerTotal.textContent = `${i}:${s < 10 ? "0" + s : s}`,
                        e()
                    }
                }
                ))
            }
            onFullscreenClick() {
                this.isFullscreen = !0,
                this.$video.requestFullscreen()
            }
            onKey(t) {
                "Space" === t.code && this.toggle(),
                this.$cover && "Escape" === t.code && (this.pause(),
                this.canClick = !1,
                this.$timeline.classList.add("pointer-events-none"),
                a.p8.to([this.$cover, this.$cursor], {
                    alpha: 1,
                    duration: .4,
                    ease: "power2.out"
                }))
            }
            onSoundClick() {
                this.$video.muted ? (this.$video.muted = !1,
                a.p8.set(this.$soundButtonTexts[0], {
                    autoAlpha: 1,
                    pointerEvents: "all"
                }),
                a.p8.set(this.$soundButtonTexts[1], {
                    autoAlpha: 0,
                    pointerEvents: "none"
                })) : (this.$video.muted = !0,
                a.p8.set(this.$soundButtonTexts[0], {
                    autoAlpha: 0,
                    pointerEvents: "none"
                }),
                a.p8.set(this.$soundButtonTexts[1], {
                    autoAlpha: 1,
                    pointerEvents: "all"
                }))
            }
            onTimelineClick(t) {
                if (!this.canClick)
                    return;
                const e = this.$timeline.getBoundingClientRect()
                  , i = u.round(a.p8.utils.clamp(0, 1, a.p8.utils.mapRange(e.left, e.right, 0, 1, t.clientX)));
                this.$video.currentTime = this.$video.duration * i,
                this.isPaused && a.p8.to(this.timelineAnimation, {
                    progress: i,
                    duration: .9,
                    ease: "expo.out"
                })
            }
            onVideoClick() {
                this.isFullscreen || this.toggle()
            }
            onVideoEnded() {
                this.isFullscreen && document.exitFullscreen()
            }
            pause() {
                this.isPaused = !0,
                this.$video.pause()
            }
            play() {
                this.isPaused = !1,
                this.$video.play()
            }
            resize() {
                this.timelineAnimation.kill(),
                this.createTimelineAnimation(),
                this.timelineAnimation.progress(this.$video.currentTime / this.$video.duration)
            }
            toggle() {
                this.isPaused ? (this.play(),
                this.$cover && (this.canClick = !0,
                this.$timeline.classList.remove("pointer-events-none"),
                a.p8.to([this.$cover, this.$cursor], {
                    alpha: 0,
                    duration: .4,
                    ease: "power2.out"
                }))) : this.pause()
            }
            update() {
                this.$video && !this.isPaused && this.timelineAnimation.progress(this.$video.currentTime / this.$video.duration)
            }
        }
        class L extends S {
            constructor(t) {
                let {el: e} = t;
                super(e),
                this.callbacks = [],
                this.canToggle = !0,
                this.hideUIDelay = 1e3,
                this.isOpen = !1,
                a.p8.set(this.$el, {
                    autoAlpha: 0
                })
            }
            bindMethods() {
                super.bindMethods(),
                this.onMove = this.onMove.bind(this),
                this.onDebouncedMove = (0,
                h.D)(100, this.onLastMove.bind(this))
            }
            getElems() {
                super.getElems()
            }
            events() {
                super.events(),
                this.$close && this.$close.addEventListener("click", ( () => this.close())),
                !u.detect.isMobile && this.$el.addEventListener("mousemove", this.onDebouncedMove),
                !u.detect.isMobile && this.$el.addEventListener("mousemove", this.onMove),
                !u.detect.isMobile && this.$video && (this.$video.addEventListener("pause", ( () => this.showUI())),
                this.$video.addEventListener("play", ( () => {
                    this.showUI(),
                    this.onLastMove()
                }
                ))),
                window.matchMedia("(orientation: portrait)").addEventListener("change", (t => {
                    if (!this.isOpen)
                        return;
                    const e = this.$video.requestFullscreen || this.$video.msRequestFullscreen || this.$video.mozRequestFullScreen || this.$video.webkitRequestFullscreen
                      , i = t.matches;
                    this.pause(),
                    i ? (this.$video.setAttribute("playsinline", "playsinline"),
                    this.$video.webkitExitFullScreen()) : (this.$video.removeAttribute("playsinline"),
                    e && e.call(this.$video)),
                    this.play()
                }
                ))
            }
            close() {
                return new Promise((t => {
                    this.isOpen && this.canToggle && (this.canToggle = !1,
                    this.isOpen = !1,
                    this.pause(),
                    this.hide().then(( () => {
                        t()
                    }
                    )),
                    u.smoothScroll && u.smoothScroll.start(),
                    setTimeout(( () => {
                        this.canToggle = !0
                    }
                    ), 200))
                }
                ))
            }
            hide() {
                return new Promise((t => {
                    a.p8.to(this.$el, {
                        autoAlpha: 0,
                        duration: .25,
                        ease: "power2.out",
                        onComplete: () => {
                            t()
                        }
                    })
                }
                ))
            }
            hideUI(t) {
                t !== this.currentId || this.isMoving || this.$video.paused || !this.isOpen || (this.$elements && this.$elements.classList.add("opacity-0"),
                this.$header && this.$header.classList.add("opacity-0"))
            }
            onKey(t) {
                super.onKey(t),
                "Escape" === t.key && this.close()
            }
            onLastMove() {
                this.isMoving = !1,
                this.currentId = 10 * Math.random(),
                this.currentST = setTimeout(this.hideUI.bind(this, this.currentId), this.hideUIDelay)
            }
            onMove() {
                this.isMoving || (this.isMoving = !0,
                this.showUI())
            }
            onVideoClick() {
                super.onVideoClick(),
                this.isMoving || u.detect.isMobile || (clearTimeout(this.currentST),
                this.onLastMove())
            }
            onVideoEnded() {
                super.onVideoEnded(),
                setTimeout(( () => {
                    this.isOpen && this.close()
                }
                ), 500)
            }
            open() {
                this.canToggle && (this.canToggle = !1,
                !u.detect.isMobile && clearTimeout(this.currentST),
                u.smoothScroll && u.smoothScroll.stop(),
                this.load(this.$video.dataset.src).then(( () => {
                    this.canToggle = !0,
                    this.isOpen = !0,
                    this.play(),
                    this.show()
                }
                )))
            }
            show() {
                a.p8.to(this.$el, {
                    autoAlpha: 1,
                    duration: .4,
                    ease: "power2.out"
                })
            }
            showUI() {
                this.$elements && this.$elements.classList.remove("opacity-0"),
                this.$header && this.$header.classList.remove("opacity-0")
            }
        }
        var A = [{
            name: "animated-title",
            Class: class extends p {
                init() {
                    this.isInstant = this.$el.dataset.instant,
                    this.splittedTitle = new (m())({
                        target: this.$el
                    })[0].chars,
                    a.p8.set(this.splittedTitle, {
                        autoAlpha: 0
                    }),
                    this.createAnimation()
                }
                appear() {
                    this.isInstant ? u.loaderComplete && this.beforeAppear() : this.attachScrollTrigger()
                }
                attachScrollTrigger() {
                    u.scrollTrigger.create({
                        animation: this.animation,
                        start: "top 75%",
                        trigger: this.$el
                    })
                }
                beforeAppear() {
                    this.isInstant && this.animation.play()
                }
                createAnimation() {
                    this.animation = a.p8.timeline({
                        defaults: {
                            duration: .2,
                            ease: "none"
                        },
                        paused: !0
                    }),
                    this.animation.to(this.splittedTitle, {
                        autoAlpha: 1,
                        stagger: .025
                    })
                }
            }
        }, {
            name: "card-work",
            Class: class extends p {
                init() {
                    this.canUpdate = !0,
                    this.cursor = new f({
                        el: this.$cursor,
                        parent: this.$el,
                        x: !1
                    }),
                    this.logotypeText = new b({
                        el: this.$cursor,
                        parent: this.$el,
                        scrollTrigger: !1
                    }),
                    this.createScrollTrigger(),
                    a.p8.set(this.$videoWrapper, {
                        autoAlpha: 0
                    })
                }
                getElems() {
                    this.$cover = this.$el.querySelector(".card-work__cover"),
                    this.$cursor = this.$el.querySelector(".card-cursor"),
                    this.video = this.$el.querySelector("video"),
                    this.$videoWrapper = this.$el.querySelector(".card-work__video")
                }
                events() {
                    u.detect.isMobile || (this.$el.addEventListener("mouseenter", this.onCardEnter.bind(this)),
                    this.$el.addEventListener("mouseleave", this.onCardLeave.bind(this)),
                    window.addEventListener("filteredworks", ( () => {
                        this.$el.classList.contains("filtered") && this.resize()
                    }
                    )))
                }
                destroy() {
                    window.removeEventListener("filteredworks", ( () => {
                        this.$el.classList.contains("filtered") && this.resize()
                    }
                    ))
                }
                createScrollTrigger() {
                    u.scrollTrigger.create({
                        onEnterBack: () => {
                            this.canUpdate = !0
                        }
                        ,
                        onLeave: () => {
                            this.canUpdate = !1
                        }
                        ,
                        start: "top top",
                        trigger: this.$el
                    })
                }
                onCardEnter() {
                    this.enterAnimation = a.p8.timeline({
                        default: {
                            duration: .6,
                            ease: "power3.out"
                        },
                        onStart: () => {
                            this.video.currentTime = 0,
                            this.video.play()
                        }
                    }),
                    this.logotypeText.show(),
                    this.video.src = this.video.dataset.src,
                    this.video.load(),
                    this.video.addEventListener("loadeddata", ( () => {
                        this.leaveAnimation && this.leaveAnimation.pause(),
                        this.enterAnimation.to(this.$videoWrapper, {
                            autoAlpha: 1
                        }).to(this.$cover, {
                            autoAlpha: 0
                        }, "<")
                    }
                    ))
                }
                onCardLeave() {
                    this.leaveAnimation = a.p8.timeline({
                        defaults: {
                            duration: .4,
                            ease: "power2.out"
                        },
                        onComplete: () => {
                            this.video.pause(),
                            this.video.src = "",
                            this.video.load()
                        }
                    }),
                    this.enterAnimation && this.enterAnimation.pause(),
                    this.leaveAnimation.to(this.$videoWrapper, {
                        autoAlpha: 0
                    }).to(this.$cover, {
                        autoAlpha: 1
                    }, "<"),
                    this.logotypeText.hide()
                }
                resize() {
                    this.cursor && this.cursor.resize(),
                    this.logotypeText && this.logotypeText.resize()
                }
                update() {
                    this.canUpdate && this.cursor && this.cursor.update()
                }
            }
        }, {
            name: "content",
            Class: class extends p {
                init() {
                    if (!u.detect.isMobile) {
                        if (this.isFirst = this.$el.dataset.first,
                        this.splittedText = new (m())({
                            by: "chars",
                            target: this.$text
                        }),
                        this.isFirst) {
                            const t = this.splittedText[0].chars.findIndex((t => "." === t.dataset.char));
                            this.firstSplittedText = this.splittedText[0].chars.slice(0, t + 1),
                            this.secondSplittedText = this.splittedText[0].chars.slice(t + 1)
                        }
                        a.p8.set(this.splittedText[0].chars, {
                            autoAlpha: 0
                        })
                    }
                }
                getElems() {
                    this.$text = this.$el.querySelector(".content__text")
                }
                appear() {
                    u.detect.isMobile || (this.isFirst ? (u.loaderComplete && this.beforeAppear(),
                    this.createAnimation(this.secondSplittedText),
                    this.attachScrollTrigger()) : (this.createAnimation(this.splittedText[0].chars),
                    this.attachScrollTrigger()))
                }
                attachScrollTrigger() {
                    const t = this.$text.getBoundingClientRect()
                      , e = t.height + t.top;
                    this.scrollTrigger = u.scrollTrigger.create({
                        animation: this.animation,
                        end: this.isFirst ? `+=${e} 50%` : "bottom 50%",
                        scrub: !0,
                        start: this.isFirst ? "top top" : "top 90%",
                        trigger: this.isFirst ? this.$el : this.$text
                    })
                }
                beforeAppear() {
                    u.detect.isMobile || this.isFirst && a.p8.to(this.firstSplittedText, {
                        autoAlpha: 1,
                        duration: .4,
                        ease: "expo.inOut",
                        stagger: .025
                    })
                }
                createAnimation(t) {
                    this.animation = a.p8.to(t, {
                        autoAlpha: 1,
                        ease: "none",
                        stagger: .1
                    })
                }
                disableScrollTriggers() {
                    var t;
                    null === (t = this.scrollTrigger) || void 0 === t || t.disable(!1)
                }
            }
        }, {
            name: "footer",
            Class: class extends p {
                appear() {
                    this.logotypeText = new b({
                        el: this.$logotypeText,
                        parent: this.$el,
                        scrollTrigger: !0
                    })
                }
                getElems() {
                    this.$logotypeText = this.$el.querySelector(".logotype-text")
                }
            }
        }, {
            name: "header",
            Class: class extends p {
                init() {
                    this.activeIndex = -1,
                    this.isAnimating = !1,
                    this.isOpen = !1,
                    this.isSubMenuOpen = !1,
                    this.translateValue = u.w.h - this.$links[0].getBoundingClientRect().top,
                    this.createContactLinks(),
                    this.updateLinks(),
                    u.w.w < 1024 && (this.onPageChange({
                        location: window.location
                    }),
                    a.p8.set([this.$navigations, this.$overlay], {
                        autoAlpha: 0
                    }))
                }
                bindMethods() {
                    this.toggleMenu = this.toggleMenu.bind(this)
                }
                getElems() {
                    this.$contactLinks = this.$el.querySelectorAll("[data-contact]"),
                    this.$links = this.$el.querySelectorAll(".header__link"),
                    this.$menu = this.$el.querySelector(".header__menu"),
                    this.$navigations = this.$el.querySelectorAll(".header__navigation"),
                    this.$overlay = this.$el.querySelector(".header__overlay")
                }
                events() {
                    if (u.w.w < 1024) {
                        for (let t = 0; t < this.contactLinks.length; t++)
                            this.contactLinks[t].item.addEventListener("click", this.toggleSubMenu.bind(this, t));
                        this.$menu.addEventListener("click", this.toggleMenu),
                        this.$overlay.addEventListener("click", this.toggleMenu)
                    } else
                        this.contactLinks.forEach((t => {
                            t.dom.addEventListener("click", u.contact.open)
                        }
                        ))
                }
                closeMenu() {
                    const t = a.p8.timeline({
                        onComplete: () => {
                            this.contactLinks && this.contactLinks.forEach((t => {
                                t.isOpen = !1
                            }
                            )),
                            this.isAnimating = !1
                        }
                    });
                    this.isAnimating = !0,
                    this.isOpen = !1,
                    u.smoothScroll && u.smoothScroll.start(),
                    this.$menu.textContent = "Menu.",
                    t.set(this.$el, {
                        pointerEvents: "none"
                    }).to([this.$navigations, this.$overlay], {
                        autoAlpha: 0,
                        duration: .2,
                        ease: "none"
                    })
                }
                closeSubMenu(t) {
                    return new Promise((e => {
                        this.closingSubMenuAnimation = a.p8.timeline({
                            onComplete: () => {
                                this.contactLinks[t].isAnimating = !1
                            }
                        }),
                        this.contactLinks[t].isAnimating = !0,
                        this.contactLinks[t].isOpen = !1,
                        this.closingSubMenuAnimation.to(this.contactLinks[t].item, {
                            backgroundColor: "var(--color-grey)",
                            color: "white",
                            duration: .4,
                            ease: "power2.out"
                        }).to(this.contactLinks[t].dom, {
                            duration: .4,
                            ease: "power2.out",
                            height: this.contactLinks[t].itemHeight
                        }, .2);
                        for (let e = 0; e < this.contactLinks[t].subItems.length; e++)
                            this.closingSubMenuAnimation.to(this.contactLinks[t].subItems[e].dom, {
                                autoAlpha: 0,
                                duration: .2,
                                ease: "none"
                            }, .1 * -e + .2).set(this.contactLinks[t].subItems[e].dom, {
                                autoAlpha: 0,
                                y: this.contactLinks[t].subItems[e].translateValue
                            });
                        setTimeout(( () => {
                            e()
                        }
                        ), 400)
                    }
                    ))
                }
                createContactLinks() {
                    this.contactLinks = [];
                    for (let t = 0; t < this.$contactLinks.length; t++) {
                        const e = this.$contactLinks[t].getBoundingClientRect().height
                          , i = this.$contactLinks[t].querySelector(".header__item")
                          , s = i.getBoundingClientRect()
                          , o = s.height
                          , n = s.top
                          , r = this.$contactLinks[t].querySelectorAll(".header__sub-item")
                          , l = {
                            dom: this.$contactLinks[t],
                            height: e,
                            isAnimating: !1,
                            isOpen: !1,
                            item: i,
                            itemHeight: o,
                            itemTop: n,
                            subItems: []
                        };
                        r.forEach((t => {
                            const e = t.getBoundingClientRect().top
                              , i = {
                                dom: t,
                                subItemTop: e,
                                translateValue: -(e - l.itemTop)
                            };
                            l.subItems.push(i)
                        }
                        )),
                        this.contactLinks.push(l)
                    }
                }
                onPageChange() {
                    if (!(u.w.w > 1023)) {
                        this.activeIndex > -1 && this.$links[this.activeIndex].classList.remove("active"),
                        this.activeIndex = -1;
                        for (let t = 0; t < this.$links.length; t++)
                            this.$links[t].dataset.href && -1 === this.$links[t].dataset.href.indexOf("#") && this.$links[t].href === location.href && (this.activeIndex = t);
                        this.activeIndex > -1 && this.$links[this.activeIndex].classList.add("active")
                    }
                }
                openMenu() {
                    const t = a.p8.timeline({
                        onComplete: () => {
                            this.isAnimating = !1
                        }
                    });
                    this.isAnimating = !0,
                    this.isOpen = !0,
                    u.smoothScroll && u.smoothScroll.stop(),
                    this.$menu.textContent = "Close.",
                    this.contactLinks && this.contactLinks.forEach((t => {
                        a.p8.set(t.dom, {
                            height: t.itemHeight
                        }),
                        a.p8.set(t.item, {
                            backgroundColor: "#0e0e0e",
                            color: "white"
                        }),
                        t.subItems.forEach((t => {
                            a.p8.set(t.dom, {
                                autoAlpha: 0,
                                y: t.translateValue
                            })
                        }
                        ))
                    }
                    )),
                    t.set(this.$el, {
                        pointerEvents: "all"
                    }).set(this.$links, {
                        y: this.translateValue
                    }).to(this.$navigations, {
                        autoAlpha: 1,
                        duration: .4,
                        ease: "none"
                    }).to(this.$overlay, {
                        autoAlpha: .85,
                        duration: .4,
                        ease: "none"
                    }, "<").to(this.$links, {
                        duration: .6,
                        ease: "expo.out",
                        stagger: .1,
                        y: 0
                    }, "<0.2")
                }
                openSubMenu(t) {
                    this.openingSubMenuAnimation = a.p8.timeline({
                        onComplete: () => {
                            this.contactLinks[t].isAnimating = !1
                        }
                    }),
                    this.contactLinks[t].isAnimating = !0,
                    this.contactLinks[t].isOpen = !0,
                    this.openingSubMenuAnimation.to(this.contactLinks[t].dom, {
                        duration: .6,
                        ease: "expo.out",
                        height: this.contactLinks[t].height
                    }).fromTo(this.contactLinks[t].item, {
                        backgroundColor: "#0e0e0e",
                        color: "white"
                    }, {
                        backgroundColor: "white",
                        color: "black",
                        duration: .4,
                        ease: "power2.out"
                    }, "<");
                    for (let e = 0; e < this.contactLinks[t].subItems.length; e++)
                        this.openingSubMenuAnimation.to(this.contactLinks[t].subItems[e].dom, {
                            autoAlpha: 1,
                            duration: .6,
                            ease: "expo.out",
                            y: 0
                        }, .1 * -e + .2)
                }
                resize() {
                    this.translateValue = u.w.h - this.$links[0].getBoundingClientRect().top,
                    this.createContactLinks()
                }
                toggleMenu() {
                    this.isAnimating || (this.isOpen ? this.closeMenu() : this.openMenu())
                }
                toggleSubMenu(t) {
                    if (this.contactLinks.find((t => {
                        let {isAnimating: e} = t;
                        return !0 === e
                    }
                    )))
                        return;
                    const e = this.contactLinks.indexOf(this.contactLinks.find((t => {
                        let {isOpen: e} = t;
                        return !0 === e
                    }
                    )));
                    -1 === e || e === t ? this.contactLinks[t].isOpen ? this.closeSubMenu(t) : this.openSubMenu(t) : this.closeSubMenu(e).then(( () => {
                        this.contactLinks[t].isOpen ? this.closeSubMenu(t) : this.openSubMenu(t)
                    }
                    ))
                }
                updateLinks() {
                    for (let t = 0; t < this.$links.length; t++)
                        if (this.$links[t].dataset.href) {
                            const e = this.$links[t].dataset.href.indexOf("#");
                            -1 !== e && this.updateLink(t, e)
                        }
                }
                updateLink(t, e) {
                    const i = window.location
                      , s = new URL(this.$links[t].dataset.href,window.origin);
                    if (i.pathname === s.pathname) {
                        const o = s.hash.substring(e)
                          , n = document.body.querySelector("#" + o);
                        n && (i.href !== s.href && (this.$links[t].href = s.pathname),
                        this.$links[t].addEventListener("click", ( () => {
                            const t = n.getBoundingClientRect().top;
                            u.w.w < 1024 && this.isOpen && this.closeMenu(),
                            u.smoothScroll && u.smoothScroll.scrollTo(t + window.scrollY, {
                                duration: 1.2,
                                easing: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
                            })
                        }
                        )))
                    }
                }
            }
        }, {
            name: "home",
            Class: class extends p {
                appear() {
                    if (u.isHomePrevious) {
                        const t = window.location.pathname + window.location.search;
                        this.scrollValue = u.pageScroll[t],
                        u.smoothScroll.resize(),
                        this.scrollValue && u.smoothScroll && u.smoothScroll.scrollTo(this.scrollValue, {
                            duration: 1.2,
                            easing: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
                            force: !0
                        })
                    } else if ("#works" === window.location.hash) {
                        const t = document.querySelector("#works");
                        if (t) {
                            const e = t.getBoundingClientRect().top;
                            u.smoothScroll.resize(),
                            u.smoothScroll && u.smoothScroll.scrollTo(e, {
                                duration: 1.2,
                                easing: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
                                force: !0
                            })
                        }
                    }
                }
                destroy() {
                    this.setScrollValue()
                }
                setScrollValue() {
                    u.pageScroll[window.location.pathname + window.location.search] = u.detect.isMobile ? window.scrollY : u.smoothScroll.animate.value
                }
            }
        }, {
            name: "home-cover",
            Class: class extends p {
                init() {
                    u.homeCover = this,
                    this.cursor = new x({
                        el: this.$cursor,
                        parent: this.$el,
                        x: !0
                    }),
                    u.popup = new L({
                        el: this.$popup
                    }),
                    u.loaderComplete && this.load()
                }
                appear() {
                    u.detect.isMobile || (this.createAnimation(),
                    this.attachScrollTrigger())
                }
                bindMethods() {
                    this.onClick = this.onClick.bind(this)
                }
                getElems() {
                    this.$popup = document.querySelector(".popup"),
                    this.$cursor = this.$el.querySelector(".cover-cursor"),
                    this.video = this.$el.querySelector("video")
                }
                events() {
                    u.detect.isMobile ? this.$cursor.addEventListener("click", this.onClick) : this.$el.addEventListener("click", this.onClick)
                }
                destroy() {
                    u.homeCover = null
                }
                attachScrollTrigger() {
                    this.scrollTrigger = u.scrollTrigger.create({
                        animation: this.animation,
                        end: `+=${this.$el.offsetHeight}`,
                        scrub: !0,
                        start: "top top",
                        trigger: this.$el
                    })
                }
                createAnimation() {
                    this.animation = a.p8.fromTo(this.video, {
                        yPercent: "0"
                    }, {
                        ease: "none",
                        yPercent: "50"
                    })
                }
                disableScrollTriggers() {
                    var t;
                    null === (t = this.scrollTrigger) || void 0 === t || t.disable(!1)
                }
                load() {
                    return new Promise((t => {
                        this.video.src = this.video.dataset.src,
                        this.video.load(),
                        this.video.play(),
                        this.video.addEventListener("loadedmetadata", t, {
                            once: !0
                        })
                    }
                    ))
                }
                onClick() {
                    u.popup.open()
                }
                resize() {
                    this.cursor && this.cursor.resize()
                }
                update() {
                    this.cursor && this.cursor.canUpdate && this.cursor.update(),
                    u.popup && u.popup.update()
                }
            }
        }, {
            name: "link",
            Class: $
        }, {
            name: "list-images",
            Class: class extends p {
                init() {
                    this.images = [],
                    this.scrollTriggers = []
                }
                getElems() {
                    this.$fullWidthImages = this.$el.querySelectorAll(".list-images__full-width-image"),
                    this.$twoImages = this.$el.querySelectorAll(".list-images__two-images")
                }
                appear() {
                    this.$fullWidthImages.forEach((t => {
                        const e = {
                            animation: a.p8.fromTo(t, {
                                autoAlpha: 0
                            }, {
                                autoAlpha: 1,
                                ease: "none"
                            }),
                            dom: t
                        };
                        this.images.push(e)
                    }
                    )),
                    u.w.w < 768 ? this.$twoImages.forEach((t => {
                        Array.from(t.children).forEach((t => {
                            const e = {
                                animation: a.p8.fromTo(t, {
                                    autoAlpha: 0
                                }, {
                                    autoAlpha: 1,
                                    ease: "none"
                                }),
                                dom: t
                            };
                            this.images.push(e)
                        }
                        ))
                    }
                    )) : this.$twoImages.forEach((t => {
                        const e = t.children
                          , i = {
                            animation: a.p8.fromTo(e, {
                                autoAlpha: 0
                            }, {
                                autoAlpha: 1,
                                ease: "none",
                                stagger: "0.15"
                            }),
                            dom: t
                        };
                        this.images.push(i)
                    }
                    )),
                    this.images.forEach((t => {
                        this.attachScrollTrigger(t)
                    }
                    ))
                }
                attachScrollTrigger(t) {
                    const e = u.scrollTrigger.create({
                        animation: t.animation,
                        end: "50% 50%",
                        scrub: !0,
                        start: "top 90%",
                        trigger: t.dom
                    });
                    this.scrollTriggers.push(e)
                }
                disableScrollTriggers() {
                    this.scrollTriggers.forEach((t => {
                        null == t || t.disable(!1)
                    }
                    ))
                }
            }
        }, {
            name: "list-works",
            Class: class extends p {
                init() {
                    this.cards = [],
                    this.currentCategory = null,
                    this.highlightedCard = this.$highlightedCard,
                    this.isFirstLoad = !0,
                    this.navigationRect = this.$navigation.getBoundingClientRect(),
                    this.navigationHeight = this.navigationRect.height,
                    this.navigationWidth = this.navigationRect.width,
                    this.newCards = this.$cards;
                    for (let t = 0; t < this.$cards.length; t++) {
                        const e = this.$cards[t].querySelector(".card-work")
                          , i = {
                            dom: this.$cards[t],
                            id: e.dataset.id,
                            maxWidth: this.$cards[t].dataset.maxWidth,
                            work: e,
                            workCategory: this.$cards[t].dataset.category.split(",")
                        };
                        this.cards.push(i)
                    }
                }
                appear() {
                    this.rect = this.$el.getBoundingClientRect(),
                    this.top = this.rect.top + window.scrollY,
                    this.onTermClick(u.currentTermIndex)
                }
                getElems() {
                    this.$cards = this.$el.querySelectorAll(".list-works__card"),
                    this.$grid = this.$el.querySelector(".list-works__grid"),
                    this.$highlightedCard = this.$el.querySelector(".list-works__highlighted"),
                    this.$navigation = this.$el.querySelector(".list-works__navigation"),
                    this.$terms = this.$el.querySelectorAll(".list-works__term")
                }
                events() {
                    this.$terms.forEach(( (t, e) => {
                        t.addEventListener("click", this.onTermClick.bind(this, e))
                    }
                    ))
                }
                createCards() {
                    var t;
                    this.newCards = [],
                    this.highlightedWork && (this.$grid.appendChild(this.highlightedCard),
                    this.highlightedCard.appendChild(this.highlightedWork.work),
                    null === (t = this.highlightedCard.querySelector(".card-work")) || void 0 === t || t.classList.add("filtered"),
                    this.highlightedCard.querySelector("img").setAttribute("data-sizes", "(max-width: 1023px) 100vw, 96vw"),
                    this.highlightedCard.querySelector("img").setAttribute("sizes", "(max-width: 1023px) 100vw, 96vw"),
                    this.newCards.push(this.highlightedCard));
                    for (let t = 0; t < this.filteredWorks.length; t++) {
                        var e;
                        this.$grid.appendChild(this.cards[t].dom),
                        this.cards[t].dom.appendChild(this.filteredWorks[t].work),
                        null === (e = this.cards[t].dom.querySelector(".card-work")) || void 0 === e || e.classList.add("filtered"),
                        this.cards[t].dom.querySelector("img").setAttribute("data-sizes", `(max-width: 1023px) 100vw, ${this.cards[t].maxWidth}`),
                        this.cards[t].dom.querySelector("img").setAttribute("sizes", `(max-width: 1023px) 100vw, ${this.cards[t].maxWidth}`),
                        this.newCards.push(this.cards[t].dom)
                    }
                    window.dispatchEvent(new CustomEvent("filteredworks")),
                    this.showAnimation = a.p8.timeline(),
                    this.hideAnimation && this.hideAnimation.pause(),
                    this.isFirstLoad ? (this.isFirstLoad = !1,
                    this.createScrollTrigger()) : (this.scrollTrigger && this.scrollTrigger.kill(),
                    this.showAnimation.to(this.newCards, {
                        autoAlpha: 1,
                        duration: 1,
                        ease: "none",
                        stagger: .15
                    }))
                }
                createScrollTrigger() {
                    const t = a.p8.timeline();
                    t.to(this.newCards, {
                        autoAlpha: 1,
                        ease: "none",
                        stagger: .15
                    }),
                    this.scrollTrigger = u.scrollTrigger.create({
                        animation: t,
                        end: "bottom 75%",
                        scrub: !0,
                        start: "top 75%",
                        trigger: this.$el
                    })
                }
                disableScrollTriggers() {
                    var t;
                    null === (t = this.scrollTrigger) || void 0 === t || t.disable(!1)
                }
                filterWorks() {
                    return new Promise((t => {
                        this.filteredWorks = [],
                        this.highlightedWork = null,
                        this.cards.forEach((t => {
                            t.id === this.highlightedId ? this.highlightedWork = t : t.workCategory.includes(this.currentCategory) && this.filteredWorks.push(t)
                        }
                        )),
                        t()
                    }
                    ))
                }
                onTermClick(t) {
                    const e = this.$terms[t].dataset.category;
                    this.currentCategory !== e && (this.currentCategory = e,
                    u.currentTermIndex = t,
                    this.highlightedId = this.$terms[t].dataset.highlighted,
                    this.$terms.forEach((t => {
                        t.classList.remove("active")
                    }
                    )),
                    this.$terms[t].classList.add("active"),
                    this.removeCards().then(( () => {
                        this.filterWorks().then(( () => {
                            this.createCards()
                        }
                        ))
                    }
                    )))
                }
                removeCards() {
                    return new Promise((t => {
                        this.hideAnimation = a.p8.timeline(),
                        this.showAnimation && this.showAnimation.pause(),
                        this.hideAnimation.to(this.newCards, {
                            autoAlpha: 0,
                            duration: .4,
                            ease: "power2.out",
                            onComplete: () => {
                                var e;
                                null === (e = this.highlightedCard.querySelector(".card-work")) || void 0 === e || e.classList.remove("filtered"),
                                this.highlightedCard.innerHTML = "",
                                this.highlightedCard.remove(),
                                this.cards.forEach((t => {
                                    var e;
                                    null === (e = t.dom.querySelector(".card-work")) || void 0 === e || e.classList.remove("filtered"),
                                    t.dom.innerHTML = "",
                                    t.dom.remove()
                                }
                                )),
                                !this.isFirstLoad && window.scrollY > this.top && u.smoothScroll.scrollTo(this.top, {
                                    force: !0,
                                    immediate: !0
                                }),
                                t()
                            }
                        }),
                        this.isFirstLoad || window.scrollY > this.top || u.smoothScroll.scrollTo(this.top, {
                            duration: .4,
                            easing: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
                        })
                    }
                    ))
                }
                resize() {
                    this.navigationRect = this.$navigation.getBoundingClientRect(),
                    this.navigationHeight = this.navigationRect.height,
                    this.navigationWidth = this.navigationRect.width,
                    this.rect = this.$el.getBoundingClientRect(),
                    this.top = this.rect.top + window.scrollY
                }
            }
        }, {
            name: "single-work",
            Class: class extends p {
                init() {
                    var t;
                    this.canFullscreen = !0,
                    this.factorDuration = 1.2,
                    this.scaleValue = u.w.w / (null === (t = this.$background) || void 0 === t ? void 0 : t.getBoundingClientRect().width),
                    this.scrollTriggers = [],
                    this.cursor = new x({
                        el: this.$cursor,
                        parent: this.$cover,
                        single: !0,
                        x: !0
                    }),
                    this.$player && (this.player = new S(this.$el)),
                    this.player && this.$video && this.player.load(this.$video.dataset.src)
                }
                bindMethods() {
                    this.onOrientationChange = this.onOrientationChange.bind(this)
                }
                appear() {
                    this.$iframes.forEach((t => this.createIframeScrollTrigger(t))),
                    !u.detect.isMobile && this.createPlayerAnimation(),
                    !u.detect.isMobile && this.attachPlayerScrollTrigger(),
                    !u.w.w < 375 && this.createScaleAnimation(),
                    !u.w.w < 375 && this.attachScaleScrollTrigger(),
                    this.createVideoScrollTrigger()
                }
                getElems() {
                    this.$background = this.$el.querySelector(".single-work__background"),
                    this.$button = this.$el.querySelector(".single-work__button"),
                    this.$close = this.$el.querySelector(".single-work__close"),
                    this.$player = this.$el.querySelector(".player"),
                    this.$cover = this.$player.querySelector(".player__cover"),
                    this.$cursor = this.$el.querySelector(".cover-cursor"),
                    this.$iframes = this.$el.querySelectorAll("iframe"),
                    this.$video = this.$player.querySelector(".player__video")
                }
                events() {
                    var t;
                    null === (t = this.$button) || void 0 === t || t.addEventListener("click", this.onButtonClick.bind(this)),
                    this.mql = window.matchMedia("(orientation: portrait)"),
                    this.mql.addEventListener("change", this.onOrientationChange)
                }
                onOrientationChange(t) {
                    if (!this.canFullscreen)
                        return;
                    const e = this.$video.requestFullscreen || this.$video.msRequestFullscreen || this.$video.mozRequestFullScreen || this.$video.webkitRequestFullscreen
                      , i = t.matches;
                    this.$video.pause(),
                    i ? (this.$video.setAttribute("playsinline", "playsinline"),
                    this.$video.webkitExitFullScreen(),
                    this.resize()) : (this.$video.removeAttribute("playsinline"),
                    e && e.call(this.$video)),
                    this.$video.play()
                }
                destroy() {
                    this.mql.removeEventListener("change", this.onOrientationChange)
                }
                attachPlayerScrollTrigger() {
                    const t = u.scrollTrigger.create({
                        animation: this.playerAnimation,
                        end: `+=${this.$player.offsetHeight}`,
                        scrub: !0,
                        start: "top top",
                        trigger: this.$player
                    });
                    this.scrollTriggers.push(t)
                }
                attachScaleScrollTrigger() {
                    const t = u.scrollTrigger.create({
                        animation: this.scaleAnimation,
                        end: "top 50%",
                        scrub: !0,
                        start: "top bottom",
                        trigger: this.$background
                    });
                    this.scrollTriggers.push(t)
                }
                createIframeScrollTrigger(t) {
                    const e = u.scrollTrigger.create({
                        end: "bottom top",
                        onLeave: () => {
                            t.contentWindow.postMessage('{"method":"pause"}', "*")
                        }
                        ,
                        onLeaveBack: () => {
                            t.contentWindow.postMessage('{"method":"pause"}', "*")
                        }
                        ,
                        start: "top bottom",
                        trigger: t
                    });
                    this.scrollTriggers.push(e)
                }
                createPlayerAnimation() {
                    this.playerAnimation = a.p8.fromTo(this.$player, {
                        yPercent: "0"
                    }, {
                        ease: "none",
                        yPercent: "50"
                    })
                }
                createScaleAnimation() {
                    this.scaleAnimation = a.p8.to(this.$background, {
                        ease: "none",
                        scaleX: () => this.scaleValue
                    })
                }
                createVideoScrollTrigger() {
                    const t = u.scrollTrigger.create({
                        end: "bottom top",
                        onEnter: () => {
                            this.canFullscreen = !0
                        }
                        ,
                        onEnterBack: () => {
                            this.canFullscreen = !0
                        }
                        ,
                        onLeave: () => {
                            this.canFullscreen = !1,
                            this.player.pause()
                        }
                        ,
                        onLeaveBack: () => {
                            this.canFullscreen = !1,
                            this.player.pause()
                        }
                        ,
                        start: "top bottom",
                        trigger: this.$video
                    });
                    this.scrollTriggers.push(t)
                }
                disableScrollTriggers() {
                    this.scrollTriggers.forEach((t => {
                        t.disable(!1)
                    }
                    ))
                }
                fixElements() {
                    a.p8.set(this.$close, {
                        position: "absolute",
                        top: this.$close.getBoundingClientRect().top + window.scrollY
                    })
                }
                onButtonClick() {
                    var t;
                    const e = null === (t = this.$button) || void 0 === t ? void 0 : t.getBoundingClientRect()
                      , i = e.height + e.top + window.scrollY
                      , s = (e.height + e.top) / u.w.h
                      , o = Math.max(this.factorDuration * s, .6);
                    u.smoothScroll.scrollTo(i, {
                        duration: o,
                        easing: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
                    })
                }
                update() {
                    this.cursor && this.cursor.canUpdate && this.cursor.update(),
                    this.player && this.player.update()
                }
            }
        }, {
            name: "team",
            Class: class extends p {
                init() {
                    this.$fullWidthImages.forEach((t => {
                        const e = t.getBoundingClientRect()
                          , i = t.querySelector(".team__clipped-image")
                          , s = i.getBoundingClientRect();
                        i.style.height = e.height / s.height * 100 + "%",
                        i.style.width = e.width / s.width * 100 + "%"
                    }
                    ))
                }
                getElems() {
                    this.$fullWidthImages = this.$el.querySelectorAll(".team__logotype-image")
                }
            }
        }];
        class C extends l.Th {
            onEnter() {
                this.blockList = A,
                this.blocks = [],
                this.blockList && this.blockList.length && this.initBlocks(),
                u.detect.isMobile && (this.screensElements = document.body.querySelectorAll(".h-screen"),
                this.screensElements.length && a.ZP.set(this.screensElements, {
                    height: u.w.h
                }))
            }
            initBlocks() {
                for (let t = 0; t < this.blockList.length; t++) {
                    const e = this.content.querySelectorAll("." + this.blockList[t].name)
                      , i = {
                        name: this.blockList[t].name,
                        instances: []
                    };
                    for (let s = 0; s < e.length; s++) {
                        const o = {
                            el: e[s],
                            class: new this.blockList[t].Class(e[s])
                        };
                        i.instances.push(o)
                    }
                    this.blocks.push(i)
                }
                u.blocks = this.blocks
            }
            onEnterCompleted() {
                for (let t = 0; t < this.blocks.length; t++)
                    for (let e = 0; e < this.blocks[t].instances.length; e++)
                        this.blocks[t].instances[e].class.onEnterCompleted();
                u.loaderComplete ? this.appear() : window.addEventListener("loadercomplete", this.appear.bind(this), {
                    once: !0
                })
            }
            appear() {
                for (let t = 0; t < this.blocks.length; t++)
                    for (let e = 0; e < this.blocks[t].instances.length; e++)
                        this.blocks[t].instances[e].class.appear()
            }
            onLeave() {
                for (let t = 0; t < this.blocks.length; t++)
                    for (let e = 0; e < this.blocks[t].instances.length; e++)
                        this.blocks[t].instances[e].class.destroyLast || this.blocks[t].instances[e].class.destroy()
            }
            onLeaveCompleted() {
                for (let t = 0; t < this.blocks.length; t++)
                    for (let e = 0; e < this.blocks[t].instances.length; e++)
                        this.blocks[t].instances[e].class.destroyLast && this.blocks[t].instances[e].class.destroy();
                u.blocks = null
            }
            resize() {
                u.detect.isMobile && this.screensElements && this.screensElements.length && a.ZP.set(this.screensElements, {
                    height: u.w.h
                });
                for (let t = 0; t < this.blocks.length; t++)
                    for (let e = 0; e < this.blocks[t].instances.length; e++)
                        this.blocks[t].instances[e].class.resize()
            }
            scroll(t) {
                for (let e = 0; e < this.blocks.length; e++)
                    for (let i = 0; i < this.blocks[e].instances.length; i++)
                        this.blocks[e].instances[i].class.scroll(t)
            }
            loop() {
                for (let t = 0; t < this.blocks.length; t++)
                    for (let e = 0; e < this.blocks[t].instances.length; e++)
                        this.blocks[t].instances[e].class.update()
            }
        }
        class E extends l.uT {
            onLeave(t) {
                var e, i;
                let {from: s, done: o} = t;
                const n = [];
                this.from = s,
                this.$fromOverlay = s.querySelector(".transition__overlay"),
                u.isHomePrevious = "singlework" === s.dataset.template,
                u.smoothScroll && u.smoothScroll.stop(),
                (null === (e = u.contact) || void 0 === e ? void 0 : e.isOpen) && n.push(u.contact.close()),
                (null === (i = u.popup) || void 0 === i ? void 0 : i.isOpen) && n.push(u.popup.close()),
                u.blocks.forEach((t => {
                    t.instances.forEach((t => {
                        t.class.disableScrollTriggers && t.class.disableScrollTriggers(),
                        t.class.fixElements && t.class.fixElements()
                    }
                    ))
                }
                )),
                Promise.all(n).then(( () => {
                    u.detect.isMobile ? a.ZP.to(this.$fromOverlay, {
                        autoAlpha: 1,
                        duration: .35,
                        ease: "jackdope.ease",
                        onComplete: () => {
                            this.from.remove(),
                            u.smoothScroll && u.smoothScroll.scrollTo(0, {
                                immediate: !0,
                                force: !0
                            }),
                            o()
                        }
                    }) : o()
                }
                ))
            }
            onEnter(t) {
                let {to: e, done: i} = t;
                if (u.detect.isMobile)
                    this.$toOverlay = e.querySelector(".transition__overlay"),
                    a.ZP.fromTo(this.$toOverlay, {
                        autoAlpha: 1
                    }, {
                        autoAlpha: 0,
                        duration: .35,
                        ease: "jackdope.ease",
                        onComplete: () => {
                            u.smoothScroll && u.smoothScroll.start(),
                            i()
                        }
                    });
                else {
                    const t = a.ZP.timeline({
                        defaults: {
                            duration: 1.2,
                            ease: "expo.inOut"
                        },
                        onComplete: () => {
                            this.from.remove(),
                            u.smoothScroll && u.smoothScroll.start(),
                            u.smoothScroll && u.smoothScroll.scrollTo(0, {
                                immediate: !0,
                                force: !0
                            }),
                            i()
                        }
                    });
                    "home" !== e.dataset.template && "singlework" !== e.dataset.template || t.fromTo("home" === e.dataset.template ? e.querySelector(".home-cover video") : e.querySelector(".player"), {
                        yPercent: -30
                    }, {
                        yPercent: 0
                    }, 0),
                    t.to(this.$fromOverlay, {
                        autoAlpha: .85
                    }, "<").fromTo(this.from, {
                        position: "fixed",
                        top: -window.scrollY,
                        y: 0
                    }, {
                        y: "-33vh"
                    }, "<").fromTo(e, {
                        position: "fixed",
                        top: 0,
                        y: "100vh"
                    }, {
                        clearProps: !0,
                        y: 0
                    }, "<").call(( () => {
                        u.blocks.forEach((t => {
                            t.instances.forEach((t => {
                                t.class.beforeAppear && t.class.beforeAppear()
                            }
                            ))
                        }
                        ))
                    }
                    ), null, "-=0.6")
                }
            }
        }
        class M {
            constructor() {
                this.initSmoothScroll = this.initSmoothScroll.bind(this),
                this.scroll = this.scroll.bind(this),
                this.resize = this.resize.bind(this),
                this.update = this.update.bind(this),
                this.resizeDebounced = (0,
                h.D)(100, this.resize),
                this.resizeThrottled = (0,
                h.P)(100, this.resize),
                this.scrollDebounced = (0,
                h.D)(100, this.scroll),
                this.scrollThrottled = (0,
                h.P)(30, this.scroll),
                u.w = {
                    w: window.innerWidth,
                    h: window.innerHeight
                },
                document.body.style.setProperty("--initial-vh", `${u.w.h}px`),
                a.p8.registerPlugin(d.i),
                u.scrollTrigger = d.i,
                a.p8.registerPlugin(c.t),
                c.t.create("jackdope.ease", ".25, .46, .45, .9"),
                this.start()
            }
            start() {
                history.scrollRestoration && (history.scrollRestoration = "manual"),
                u.contact = new v({
                    el: document.querySelector(".contact[data-popup]")
                }),
                this.initTaxi(),
                this.initSmoothScroll(),
                this.menu = new y,
                this.lazyLoad = new (n()),
                this.loader = new k,
                this.events(),
                this.updateLinks(),
                this.addConsoleBrand(),
                requestAnimationFrame(this.update)
            }
            initTaxi() {
                this.taxi = new l.QY({
                    links: "a:not([target]):not([href^=\\#]):not([data-taxi-ignore]):not(.ab-item)",
                    reloadJsFilter: t => void 0 !== t.dataset.taxiReload,
                    removeOldContent: !1,
                    transitions: {
                        default: E
                    },
                    renderers: {
                        default: C
                    }
                }),
                this.currentRenderer = this.taxi.currentCacheEntry.renderer
            }
            initSmoothScroll() {
                u.smoothScroll && u.smoothScroll.destroy(),
                u.smoothScroll = new r.Z({
                    easing: t => 1 - Math.pow(1 - t, 5),
                    wheelEventsTarget: document.body
                }),
                window.lenis = u.smoothScroll,
                u.smoothScroll.on("scroll", (t => {
                    this.scroll(t)
                }
                ))
            }
            reloadTartaucitronServices() {
                if (!window.tarteaucitron)
                    return;
                const t = document.body.querySelectorAll(".tarteaucitronAllow");
                for (let e = 0; e < t.length; e++)
                    window.tarteaucitron.addClickEventToElement(t[e], (function() {
                        window.tarteaucitron.userInterface.respond(this, !0)
                    }
                    ))
            }
            resize() {
                window.innerWidth !== u.w.w && this.resizeX(),
                u.w = {
                    w: window.innerWidth,
                    h: window.innerHeight
                },
                this.currentRenderer.resize(),
                u.contact.resize()
            }
            resizeX() {
                setTimeout(( () => {
                    document.body.style.setProperty("--initial-vh", `${u.w.h}px`)
                }
                ), 0)
            }
            scroll(t) {
                u.currentScroll = window.scrollY,
                this.currentRenderer.scroll(t)
            }
            update(t) {
                requestAnimationFrame(this.update),
                u.smoothScroll && u.smoothScroll.raf(t),
                this.currentRenderer.loop()
            }
            events() {
                window.addEventListener("resize", this.resizeDebounced),
                window.addEventListener("orientationchange", this.resize),
                window.addEventListener("wheel", this.scrollThrottled),
                window.addEventListener("wheel", this.scrollDebounced),
                this.taxi.on("NAVIGATE_IN", (t => {
                    let {to: e} = t;
                    this.currentRenderer = e.renderer
                }
                )),
                this.taxi.on("NAVIGATE_OUT", (t => {
                    let {location: e} = t;
                    this.menu.onPageChange(e, !0)
                }
                )),
                this.taxi.on("NAVIGATE_END", (t => {
                    let {to: e} = t;
                    this.updateTracking(e),
                    this.reloadTartaucitronServices(),
                    this.updateLinks(),
                    this.lazyLoad.update()
                }
                ))
            }
            updateTracking(t) {
                void 0 !== window.gtag && window.gtag("event", "page_view", {
                    page_path: window.location.pathname,
                    page_title: t.page.title,
                    page_location: window.location.href
                })
            }
            updateLinks() {
                this.links = document.body.querySelectorAll("a"),
                this.siteUrl || (this.siteUrl = "http://site.localhost/");
                for (let t = 0; t < this.links.length; t++) {
                    const e = this.links[t];
                    e.href.indexOf(this.siteUrl) > -1 && (e.href = `${window.location.origin}/${e.href.split(this.siteUrl)[1]}`)
                }
            }
            addConsoleBrand() {
                console.log("\n %c ✦ JackandDope ✦ ", "background: #00F; color: #fffaf5; padding: 5px 0; margin-right: 5px;", "https://jackdope.studio/ \n\n")
            }
        }
        class _ {
            constructor() {
                this.grid = document.querySelector(".debug-grid"),
                this.grid && this.addEvents()
            }
            addEvents() {
                document.addEventListener("keydown", (t => {
                    "g" !== t.key && "G" !== t.key || this.grid.classList.toggle("opacity-0")
                }
                ))
            }
        }
        const q = async t => {
            t && console.error(t),
            new M,
            new _
        }
        ;
        (0,
        s.Z)(q)
    }
    ,
    "./styles/app.css": () => {}
}, t => {
    var e = e => t(t.s = e);
    t.O(0, [259, 353], ( () => (e("./scripts/app.js"),
    e("./styles/app.css")))),
    t.O()
}
]);
