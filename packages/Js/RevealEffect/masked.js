class RevealHelper {
    static preProcessElements(elements, options, elementType = 'target') {
        let res = [];
        elements.forEach((el) => {
            if (!el.hashCode) el.hashCode = this.GuidWithoutDash();
            let result = {
                oriBg: getComputedStyle(el)['background-image'],
                oriBorder: getComputedStyle(el)['border-image'],
                oriBgRepeat: getComputedStyle(el)['background-repeat'],
                isBindingClickEvent: false,
                wave: 0,
                clickWave: {},
                revealPosition: {
                    x: 0,
                    y: 0,
                },
                options: {
                    backgroundGradientSize: 150,
                    borderGradientSize: 80,
                    borderLightColor: 'rgba(255, 255, 255, 0.25)',
                    backgroundLightColor: 'rgba(255, 255, 255, 0.25)',
                    elementType: elementType,
                    status: 'enabled', // enabled, disabled
                },
                el,
            };

            result.options = Object.assign(result.options, options);
            res.push(result);
        });

        return res;
    }

    static getOffset(element) {
        return {
            top: element.el.getBoundingClientRect().top,
            left: element.el.getBoundingClientRect().left,
        };
    }

    static drawEffectBasic(elObj, clickEffect = false, mode = 'background') {
        let borderLight;
        let backgroundLight;

        borderLight = `radial-gradient(circle ${this.valueTrigger(elObj.options.borderGradientSize)}px at ${elObj.revealPosition.x}px ${elObj.revealPosition.y}px, ${this.valueTrigger(
            elObj.options.borderLightColor
        )}, rgba(255,255,255,0))`;

        if (clickEffect === false) {
            backgroundLight = `radial-gradient(circle ${this.valueTrigger(elObj.options.backgroundGradientSize)}px at ${elObj.revealPosition.x}px ${elObj.revealPosition.y}px, ${this.valueTrigger(
                elObj.options.backgroundLightColor
            )}, rgba(255,255,255,0))`;
        } else {
            backgroundLight = `radial-gradient(circle ${this.valueTrigger(elObj.options.backgroundGradientSize)}px at ${elObj.revealPosition.x}px ${elObj.revealPosition.y}px, ${this.valueTrigger(
                elObj.options.backgroundLightColor
            )}, rgba(255,255,255,0)), radial-gradient(circle ${elObj.wave}px at ${elObj.revealPosition.x}px ${elObj.revealPosition.y}px, rgba(255,255,255,0), ${this.valueTrigger(
                elObj.options.backgroundLightColor
            )}, rgba(255,255,255,0), rgba(255,255,255,0))`;
        }

        if (mode == 'background') {
            if (clickEffect == true) {
                elObj.wave = 120;
                elObj.clickWave = setInterval(() => {
                    try {
                        let cur = elObj.wave;
                        let step = cur / 60 + 1;
                        cur += step;
                        if (cur >= 1000) clearInterval(elObj.clickWave);
                        else {
                            elObj.wave = cur;
                            backgroundLight = `radial-gradient(circle ${this.valueTrigger(elObj.options.backgroundGradientSize)}px at ${elObj.revealPosition.x}px ${
                                elObj.revealPosition.y
                            }px, ${this.valueTrigger(elObj.options.backgroundLightColor)}, rgba(255,255,255,0)), radial-gradient(circle ${elObj.wave}px at ${elObj.revealPosition.x}px ${
                                elObj.revealPosition.y
                            }px, rgba(255,255,255,0), ${this.valueTrigger(elObj.options.backgroundLightColor)}, rgba(255,255,255,0), rgba(255,255,255,0))`;
                            elObj.el.style.backgroundImage = backgroundLight;
                            elObj.el.style.backgroundRepeat = 'no-repeat';
                        }
                    } catch (e) {}
                }, 50);
            } else {
                clearInterval(elObj.clickWave);
                elObj.wave = 0;
                backgroundLight = `radial-gradient(circle ${this.valueTrigger(elObj.options.backgroundGradientSize)}px at ${elObj.revealPosition.x}px ${elObj.revealPosition.y}px, ${this.valueTrigger(
                    elObj.options.backgroundLightColor
                )}, rgba(255,255,255,0))`;
                elObj.el.style.backgroundImage = backgroundLight;
                elObj.el.style.backgroundRepeat = 'no-repeat';
            }
        } else if (mode == 'border') {
            elObj.el.style.backgroundImage = borderLight;
            elObj.el.style.backgroundRepeat = 'no-repeat';
        }
    }

    static drawEffectBorder(elObj, clickEffect = false) {
        this.drawEffectBasic(elObj, clickEffect, 'border');
    }

    static drawEffectBackground(elObj, clickEffect = false) {
        this.drawEffectBasic(elObj, clickEffect, 'background');
    }

    static clearBackground(element) {
        if (!element) return;
        clearInterval(element.clickWave);
        element.wave = 0;
        element.el.style.backgroundImage = element.oriBg;
        element.el.style.backgroundRepeat = element.oriBgRepeat;
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
            bottom: element.el.getBoundingClientRect().bottom,
        };

        return cursorX >= el_area.left && cursorX <= el_area.right && cursorY >= el_area.top && cursorY <= el_area.bottom;
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
            bottom: element.el.getBoundingClientRect().bottom,
        };

        return {
            left: el_area.left - cursorX,
            right: cursorX - el_area.right,
            top: el_area.top - cursorY,
            bottom: cursorY - el_area.bottom,
        };
    }

    static GuidWithoutDash() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    }

    static valueTrigger(val) {
        if (typeof val === 'function') return val();
        return val;
    }

    static getOffset(eObj) {
        return {
            top: eObj.el.getBoundingClientRect().top,
            left: eObj.el.getBoundingClientRect().left,
        };
    }

    static typeObj(obj) {
        let type = Object.prototype.toString.call(obj);
        return type.substring(8, type.length - 1);
    }

    static GuidWithoutDash() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    }
}

export class RevealMasked {
    constructor() {
        // 旗下代表以什么元素作为eventListener的承载元素, 全局为window, 字典内包含其他组件父节点.
        // 也可以绑定在父节点下.
        this.FvRevealElementList = {
            window: {},
        };
        this.applyCommonEffects();
        this.timer = setInterval(() => {
            for (let key in this.FvRevealElementList['window']) {
                this.refreshChildren(key);
            }
            for (let key in this.FvRevealElementList) {
                if (key != 'window') {
                    this.refreshChildren(key);
                }
            }
        }, 1000);
    }

    apply(parent, options) {
        let _options = {
            key: RevealHelper.GuidWithoutDash(),
            selector: '.eff-reveal-border',
            backgroundGradientSize: 150,
            borderGradientSize: 80,
            borderLightColor: 'rgba(255, 255, 255, 0.25)',
            backgroundLightColor: 'rgba(255, 255, 255, 0.25)',
            eventTriggerMode: 'window', // window, parent. to choose which element to trigger the reveal event.
            elementType: 'target', // target, masked
            status: 'enabled', // enabled, disabled
        };

        // update options
        options = Object.assign(_options, options);

        let targetChildren = this.getTargetChildren(parent, options);
        let maskedChildren = this.getMaskedChildren(parent, options);

        if (options.eventTriggerMode === 'window') {
            this.FvRevealElementList['window'][options.key] = {
                key: options.key,
                el: parent,
                options: options,
                targetChildren: this.getChildrenX(targetChildren, options),
                maskedChildren: this.getChildrenX(maskedChildren, options, 'masked'),
            };
        } else {
            this.FvRevealElementList[options.key] = {
                key: options.key,
                el: parent,
                options: options,
                targetChildren: this.getChildrenX(targetChildren, options),
                maskedChildren: this.getChildrenX(maskedChildren, options, 'masked'),
            };
            this.applyCommonEffects(options.key);
        }

        return options.key;
    }

    refreshChildren(key) {
        let item = this.FvRevealElementList[key];
        if (!item) item = this.FvRevealElementList['window'][key];
        let targetChildren = [].slice.call(this.getTargetChildren(parent, item.options), 0);
        let maskedChildren = [].slice.call(this.getMaskedChildren(parent, item.options), 0);
        item.targetChildren = [
            ...item.targetChildren,
            ...this.getChildrenX(
                targetChildren.filter((x) => !x.hashCode),
                item.options
            ),
        ];
        item.maskedChildren = [
            ...item.maskedChildren,
            ...this.getChildrenX(
                maskedChildren.filter((x) => !x.hashCode),
                item.options,
                'masked'
            ),
        ];
    }

    /**
     * Get all background masked children of an element
     *
     * @param {*} parent
     * @param {*} options
     * @returns
     * @memberof RevealMasked
     */
    getMaskedChildren(parent, options) {
        if (parent == null) parent = document;
        if (!options.maskedSelector) return [];
        if (typeof options.maskedSelector === 'string') return parent.querySelectorAll(options.maskedSelector);
        else if (Array.isArray(options.maskedSelector)) return options.maskedSelector;
        else if (RevealHelper.typeObj(options.maskedSelector) === 'NodeList') return options.maskedSelector;
        return [options.maskedSelector];
    }

    /**
     * Get all target children of an element
     *
     * @param {*} parent
     * @param {*} options
     * @returns
     * @memberof RevealMasked
     */
    getTargetChildren(parent, options) {
        if (parent == null) parent = document;
        if (!options.selector) return [];
        if (typeof options.selector === 'string') return parent.querySelectorAll(options.selector);
        else if (Array.isArray(options.selector)) return options.selector;
        else if (RevealHelper.typeObj(options.selector) === 'NodeList') return options.selector;
        return [options.selector];
    }

    /**
     * Process the children of an childrenList
     *
     * @param {*} children
     * @param {*} options
     * @returns
     * @memberof RevealMasked
     */
    getChildrenX(children, options, elementType = 'target') {
        let childrenX = RevealHelper.preProcessElements(children, options, elementType);
        if (elementType === 'target') {
            for (let childX of childrenX) {
                this.applyClickEffects(childX);
            }
        }
        return childrenX;
    }

    applyCommonEffects(key = 'window') {
        let target = undefined;
        if (window !== undefined) {
            target = window;
        }
        if (key != 'window') target = this.FvRevealElementList[key].el;
        if (target === undefined) {
            return;
        }

        let forList = key === 'window' ? this.FvRevealElementList['window'] : { key: this.FvRevealElementList[key] };

        let eventSelectorMove = (e) => {
            if (e.type.indexOf('mouse') < 0) e = e.targetTouches[0];
            if (!forList) return;
            for (let parentKey in forList) {
                let elObj = forList[parentKey];
                for (let child of elObj.targetChildren) {
                    if (RevealHelper.valueTrigger(child.options.status) === 'disabled') continue;
                    let x = e.pageX - RevealHelper.getOffset(child).left - window.scrollX;
                    let y = e.pageY - RevealHelper.getOffset(child).top - window.scrollY;
                    child.revealPosition.x = x;
                    child.revealPosition.y = y;

                    if (RevealHelper.isInsideElement(child, e.clientX, e.clientY)) {
                        if (child.wave == 0) RevealHelper.drawEffectBackground(child);
                    } else RevealHelper.clearBackground(child);
                }
                for (let child of elObj.maskedChildren) {
                    if (RevealHelper.valueTrigger(child.options.status) === 'disabled') continue;
                    let x = e.pageX - RevealHelper.getOffset(child).left - window.scrollX;
                    let y = e.pageY - RevealHelper.getOffset(child).top - window.scrollY;
                    child.revealPosition.x = x;
                    child.revealPosition.y = y;

                    //set the thresold to improve performance -------------------------
                    let distance = RevealHelper.distanceOfElement(child, e.clientX, e.clientY);
                    if (distance.left > 300 || distance.top > 300 || distance.right > 300 || distance.bottom > 300) {
                    } else RevealHelper.drawEffectBorder(child);
                }
            }
        };

        let leaveEvent = (e) => {
            if (!forList) return;
            for (let parentKey in forList) {
                let elObj = forList[parentKey];
                for (let child of elObj.targetChildren) {
                    RevealHelper.clearBackground(child);
                }
                for (let child of elObj.maskedChildren) {
                    RevealHelper.clearBackground(child);
                }
            }
        };

        target.addEventListener('mousemove', eventSelectorMove);
        target.addEventListener('touchmove', eventSelectorMove);
        target.addEventListener('mouseleave', leaveEvent);
        target.addEventListener('touchend', leaveEvent);
    }

    applyClickEffects(elementX) {
        let insideElement = (event) => {
            let x = event.target;
            let _self = false;
            while (x && x.tagName && x.tagName.toLowerCase() != 'body') {
                if (x == elementX.el) {
                    _self = true;
                    break;
                }
                x = x.parentNode;
            }
            return _self;
        };

        let downEvent = (e) => {
            if (!insideElement(e)) return;
            if (RevealHelper.valueTrigger(elementX.options.status) === 'disabled') return;
            if (e.type.indexOf('mouse') < 0) e = e.targetTouches[0];
            let x = e.pageX - RevealHelper.getOffset(elementX).left - window.scrollX;
            let y = e.pageY - RevealHelper.getOffset(elementX).top - window.scrollY;
            elementX.revealPosition.x = x;
            elementX.revealPosition.y = y;
            RevealHelper.drawEffectBackground(elementX, true);
        };

        let upEvent = (e) => {
            RevealHelper.drawEffectBackground(elementX);
        };

        if (!elementX.isBindingClickEvent) {
            elementX.el.addEventListener('mousedown', downEvent);
            elementX.el.addEventListener('touchstart', downEvent);
            elementX.el.addEventListener('mouseup', upEvent);
            elementX.isBindingClickEvent = true;
        }
    }

    destroy(key) {
        let exists = [];
        if (this.FvRevealElementList['window'][key]) exists.push('window');
        if (this.FvRevealElementList[key]) exists.push('parent');
        delete this.FvRevealElementList['window'][key];
        delete this.FvRevealElementList[key];
        return {
            exists: exists,
            key: key,
        };
    }
}
