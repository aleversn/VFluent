class RevealHelper {
    static preProcessElements(elements, options) {

        let res = [];

        elements.forEach(el => {
            if (el.hashCode)
                el.hashCode = this.GuidWithoutDash();
            let result = {
                oriBg: getComputedStyle(el)["background-image"],
                oriBorder: getComputedStyle(el)["border-image"],
                oriBgRepeat: getComputedStyle(el)["background-repeat"],
                wave: 0,
                clickWave: {},
                revealPosition: {
                    x: 0,
                    y: 0
                },
                options: {
                    backgroundGradientSize: 150,
                    borderGradientSize: 80,
                    borderLightColor: "rgba(255, 255, 255, 0.25)",
                    backgroundLightColor: "rgba(255, 255, 255, 0.25)",
                    status: "enabled"   // enabled, disabled
                },
                el
            };

            result.options = Object.assign(result.options, options);
            res.push(result);
        });

        return res;
    }

    static getOffset(element) {
        return {
            top: element.el.getBoundingClientRect().top,
            left: element.el.getBoundingClientRect().left
        };
    }

    static drawEffectBasic(
        elObj,
        clickEffect = false,
        mode = 'background'
    ) {
        let borderLight;
        let backgroundLight;

        borderLight = `radial-gradient(circle ${this.valueTrigger(elObj.options.borderGradientSize)}px at ${elObj.revealPosition.x}px ${elObj.revealPosition.y}px, ${this.valueTrigger(elObj.options.borderLightColor)}, rgba(255,255,255,0)) 5% 5% 5% 5%`; //切成九块, 去掉中间块剩余8块, 为了使得显示均匀, 我们要保证相邻两块比例要一样, 因为每一块最终会被应用于border的每一块上拉伸, 比例相同能保证拉伸时相邻块能够衔接, 因此比率尽可能大(从而保证切边交点在圆内)又要满足8块比例一致则 100% / 4 = 25%. 
        if (clickEffect === false) {
            backgroundLight = `radial-gradient(circle ${this.valueTrigger(elObj.options.backgroundGradientSize)}px at ${elObj.revealPosition.x}px ${elObj.revealPosition.y}px, ${this.valueTrigger(elObj.options.backgroundLightColor)}, rgba(255,255,255,0))`;
        } else {
            backgroundLight = `radial-gradient(circle ${this.valueTrigger(elObj.options.backgroundGradientSize)}px at ${elObj.revealPosition.x}px ${elObj.revealPosition.y}px, ${this.valueTrigger(elObj.options.backgroundLightColor)}, rgba(255,255,255,0)), radial-gradient(circle ${elObj.wave}px at ${elObj.revealPosition.x}px ${elObj.revealPosition.y}px, rgba(255,255,255,0), ${this.valueTrigger(elObj.options.backgroundLightColor)}, rgba(255,255,255,0), rgba(255,255,255,0))`;
        }

        if (mode == 'background') {
            if (clickEffect == true) {
                elObj.wave = 120;
                elObj.clickWave = setInterval(() => {
                    try {
                        let cur = elObj.wave;
                        let step = cur / 60 + 1;
                        cur += step;
                        if (cur >= 1000)
                            clearInterval(elObj.clickWave);
                        else {
                            elObj.wave = cur;
                            backgroundLight = `radial-gradient(circle ${this.valueTrigger(elObj.options.backgroundGradientSize)}px at ${elObj.revealPosition.x}px ${elObj.revealPosition.y}px, ${this.valueTrigger(elObj.options.backgroundLightColor)}, rgba(255,255,255,0)), radial-gradient(circle ${elObj.wave}px at ${elObj.revealPosition.x}px ${elObj.revealPosition.y}px, rgba(255,255,255,0), ${this.valueTrigger(elObj.options.backgroundLightColor)}, rgba(255,255,255,0), rgba(255,255,255,0))`;
                            elObj.el.style.backgroundImage = backgroundLight;
                            elObj.el.style.backgroundRepeat = "no-repeat";
                        }
                    }
                    catch (e) { }
                }, 50);
            }
            else {
                clearInterval(elObj.clickWave);
                elObj.wave = 0;
                backgroundLight = `radial-gradient(circle ${this.valueTrigger(elObj.options.borderGradientSize)}px at ${elObj.revealPosition.x}px ${elObj.revealPosition.y}px, ${this.valueTrigger(elObj.options.backgroundLightColor)}, rgba(255,255,255,0))`;
                elObj.el.style.backgroundImage = backgroundLight;
                elObj.el.style.backgroundRepeat = "no-repeat";
            }
        }
        else if (mode == 'border') {
            elObj.el.style.borderImage = borderLight;
        }
    }

    static drawEffectBorder(
        elObj,
        clickEffect = false
    ) {
        this.drawEffectBasic(elObj, clickEffect, "border");
    }

    static drawEffectBackground(
        elObj,
        clickEffect = false
    ) {
        this.drawEffectBasic(elObj, clickEffect, "background");
    }

    static clearBackground(element) {
        if (!element)
            return;
        clearInterval(element.clickWave);
        element.wave = 0;
        element.el.style.backgroundImage = element.oriBg;
        element.el.style.backgroundRepeat = element.oriBgRepeat;
    }

    static clearBorder(element) {
        element.el.style.borderImage = element.oriBorder;
    }


    /**
     *
     * judge if the cursor is inside the element
     * @static
     * @param {*} element
     * @param {*} cursorX
     * @param {*} cursorY
     * @returns
     * @memberof RevealHelper
     */
    static isInsideElement(element, cursorX, cursorY) {
        const el_area = {
            left: element.el.getBoundingClientRect().left,
            right: element.el.getBoundingClientRect().right,
            top: element.el.getBoundingClientRect().top,
            bottom: element.el.getBoundingClientRect().bottom
        }

        return (cursorX >= el_area.left && cursorX <= el_area.right && cursorY >= el_area.top && cursorY <= el_area.bottom);
    }


    /**
     * calculate the distance to the boundary of an element, when inside the el, all values should less than 0
     *
     * @static
     * @param {*} element
     * @param {*} cursorX
     * @param {*} cursorY
     * @returns
     * @memberof RevealHelper
     */
    static distanceOfElement(element, cursorX, cursorY) {
        const el_area = {
            left: element.el.getBoundingClientRect().left,
            right: element.el.getBoundingClientRect().right,
            top: element.el.getBoundingClientRect().top,
            bottom: element.el.getBoundingClientRect().bottom
        }

        return {
            left: el_area.left - cursorX,
            right: cursorX - el_area.right,
            top: el_area.top - cursorY,
            bottom: cursorY - el_area.bottom
        }
    }

    static GuidWithoutDash() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    }

    static valueTrigger(val) {
        if (typeof (val) === 'function') return val();
        return val;
    }

    static getOffset(eObj) {
        return {
            top: eObj.el.getBoundingClientRect().top,
            left: eObj.el.getBoundingClientRect().left
        };
    }

    static GuidWithoutDash() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    }
}

export class RevealDirectX {
    constructor() {
        this.FvRevealElementList = [];
        this.applyCommonEffects();
        this.applyClickEffects();
    }

    apply(parent, options) {
        let _options = {
            key: RevealHelper.GuidWithoutDash(),
            selector: ".eff-reveal-border",
            backgroundGradientSize: 150,
            borderGradientSize: 80,
            borderLightColor: "rgba(255, 255, 255, 0.25)",
            backgroundLightColor: "rgba(255, 255, 255, 0.25)",
            status: "enabled"   // enabled, disabled
        };

        // update options
        options = Object.assign(_options, options);

        let children = this.getChildren(parent, options);
        this.FvRevealElementList.push({
            key: options.key,
            el: parent,
            options: options,
            children: this.getChildrenX(children, options),
        });

        return options.key;
    }

    refreshChildren(key) {
        let item = this.FvRevealElementList.find(x => x.key === key);
        let children = [].slice.call(this.getChildren(item.el, item.options), 0);
        item.children = [...item.children, ...this.getChildrenX(children.filter(x => !x.hashCode), item.options)];
    }

    getChildren(parent, options) {
        if (parent == null)
            parent = document;
        if (typeof (options.selector) === "string") return parent.querySelectorAll(options.selector);
        else if (options.selector.length > 0) return options.selector;
        return [options.selector];
    }

    getChildrenX(children, options) {
        return RevealHelper.preProcessElements(children, options);
    }

    applyCommonEffects() {

        let eventSelectorMove = e => {
            if (e.type.indexOf("mouse") < 0)
                e = e.targetTouches[0];
            for (let elObj of this.FvRevealElementList) {
                for (let child of elObj.children) {
                    if (RevealHelper.valueTrigger(child.status) === "disabled")
                        continue;
                    let x = e.pageX - RevealHelper.getOffset(child).left - window.scrollX;
                    let y = e.pageY - RevealHelper.getOffset(child).top - window.scrollY;
                    child.revealPosition.x = x;
                    child.revealPosition.y = y;

                    //set the thresold to improve performance -------------------------
                    let distance = RevealHelper.distanceOfElement(child, e.clientX, e.clientY)
                    if (distance.left > 300 || distance.top > 300 || distance.right > 300 || distance.bottom > 300) { }
                    else
                        RevealHelper.drawEffectBorder(child);

                    if (RevealHelper.isInsideElement(child, e.clientX, e.clientY)) {
                        if (child.wave == 0)
                            RevealHelper.drawEffectBackground(child);
                    }
                    else
                        RevealHelper.clearBackground(child);
                }
            }
        }


        window.addEventListener("mousemove", eventSelectorMove);
        window.addEventListener("touchmove", eventSelectorMove);
    }

    applyClickEffects() {

        let insideElement = event => {
            let x = event.target;
            let _self = false;
            while (x && x.tagName && x.tagName.toLowerCase() != "body") {
                if (x == this.$el) {
                    _self = true;
                    break;
                }
                x = x.parentNode;
            }
            return _self;
        }

        let downEvent = e => {
            for (let elObj of this.FvRevealElementList) {
                for (let child of elObj.children) {
                    if (!insideElement(child)) continue;
                    if (e.type.indexOf("mouse") < 0)
                        e = e.targetTouches[0];
                    let x = e.pageX - RevealHelper.getOffset(child).left - window.scrollX;
                    let y = e.pageY - RevealHelper.getOffset(child).top - window.scrollY;
                    child.revealPosition.x = x;
                    child.revealPosition.y = y;
                    RevealHelper.drawEffectBackground(child, true);
                }
            }
        };

        let upEvent = e => {
            for (let elObj of this.FvRevealElementList) {
                for (let child of elObj.children) {
                    RevealHelper.drawEffectBackground(child);
                }
            }
        };

        let leaveEvent = e => {
            for (let elObj of this.FvRevealElementList) {
                for (let child of elObj.children) {
                    RevealHelper.clearBackground(child);
                    RevealHelper.clearBorder(child);
                }
            }
        };

        window.addEventListener("mousedown", downEvent);
        window.addEventListener("touchstart", downEvent);
        window.addEventListener("mouseup", upEvent);
        window.addEventListener("mouseleave", leaveEvent);
        window.addEventListener("touchend", leaveEvent);
    }
}