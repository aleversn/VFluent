export class RevealHelper
{
    static getOffset(element)
    {
        return {
            top: element.el.getBoundingClientRect().top,
            left: element.el.getBoundingClientRect().left
        };
    }

    static drawEffectBasic(
        element,
        x,
        y,
        backgroundLightColor,
        gradientSize,
        clickEffect = false
    )
    {
        let backgroundLight;

        if (clickEffect === false)
        {
            backgroundLight = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundLightColor}, rgba(255,255,255,0))`;
        } else
        {
            backgroundLight = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundLightColor}, rgba(255,255,255,0)), radial-gradient(circle ${element.wave}px at ${x}px ${y}px, rgba(255,255,255,0), ${backgroundLightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`;
        }

        if (clickEffect == true)
        {
            element.wave = 120;
            element.clickWave = setInterval(() =>
            {
                try
                {
                    let cur = element.wave;
                    let step = cur / 200 + 1;
                    cur += step;
                    if (cur >= 1000)
                        clearInterval(element.clickWave);
                    else
                    {
                        element.wave = cur;
                        backgroundLight = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundLightColor}, rgba(255,255,255,0)), radial-gradient(circle ${element.wave}px at ${x}px ${y}px, rgba(255,255,255,0), ${backgroundLightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`;
                        element.el.style.backgroundImage = backgroundLight;
                    }
                }
                catch (e) { }
            }, 50);
        }
        else
        {
            clearInterval(element.clickWave);
            element.wave = 0;
            backgroundLight = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundLightColor}, rgba(255,255,255,0))`;
            element.el.style.backgroundImage = backgroundLight;
        }
    }

    static preProcessElements(elements)
    {
        const res = [];

        elements.forEach(el =>
        {
            if (el.hashCode == undefined)
                el.hashCode = this.GuidWithoutDash();
            res.push({
                oriBg: getComputedStyle(el)["background-image"],
                oriBorder: getComputedStyle(el)["border-image"],
                wave: 0,
                clickWave: {},
                borderLightColor: "",
                backgroundLightColor: "",
                borderGradientSize: 80,
                backgroundGradientSize: 150,
                el: el
            });
        });

        return res;
    }

    static isInsideElement(element, cursorX, cursorY)
    {
        const el_area = {
            left: element.el.getBoundingClientRect().left,
            right: element.el.getBoundingClientRect().right,
            top: element.el.getBoundingClientRect().top,
            bottom: element.el.getBoundingClientRect().bottom
        }

        return (cursorX >= el_area.left && cursorX <= el_area.right && cursorY >= el_area.top && cursorY <= el_area.bottom);
    }

    static GuidWithoutDash()
    {
        function S4()
        {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    }
}

export class RevealEffectsMasked
{
    constructor(carrier_selector, options)
    {
        this.options = {
            selector: ".eff-reveal-border",
            backgroundGradientSize: 150,
            borderGradientSize: 80,
            borderLightColor: "rgba(255,255,255,0.25)",
            backgroundLightColor: "rgba(255,255,255,0.25)",
            childrenSelector: '.eff-reveal'
        };

        // update options
        this.options = Object.assign(this.options, options);

        this.childrenRefresh(carrier_selector);
        RevealEffectsMasked.clearUselessElements();
        this.applyCommonEffects(carrier_selector);

        this.timer = setInterval(() =>
        {
            this.childrenRefresh(carrier_selector);
        }, 300);
    }

    childrenRefresh(carrier_selector)
    {
        if (window.FvRevealElements2 == undefined)
            window.FvRevealElements2 = {};

        const els = this.getSelector(carrier_selector);
        for (let item of els)
        {
            let children = this.getSelector(this.options.selector, item);
            if (window.FvRevealElements2[item.el.hashCode] == undefined)
                window.FvRevealElements2[item.el.hashCode] = [];
            for (let c of children)
            {
                let finder = window.FvRevealElements2[item.el.hashCode].find(it => it.el === c.el);
                if (finder === undefined)
                {
                    c.borderLightColor = this.options.borderLightColor;
                    c.backgroundLightColor = this.options.backgroundLightColor;
                    c.borderGradientSize = this.options.borderGradientSize;
                    c.backgroundGradientSize = this.options.backgroundGradientSize;
                    this.applyClickEffects(c, item);
                    window.FvRevealElements2[item.el.hashCode].push(c);
                }
            }
        }
    }

    applyCommonEffects(carrier_selector)
    {

        const els = this.getSelector(carrier_selector);
        if (window.FvRevealCarriers2 == undefined)
            window.FvRevealCarriers2 = [];

        for (let item of els)
        {
            if (window.FvRevealCarriers2.find(it => it.el === item.el) !== undefined)
                continue;
            //element background effect --------------------
            let containerSelectorMove = e =>
            {
                if(e.type.indexOf("mouse") < 0)
                    e = e.targetTouches[0];
                for (let c of window.FvRevealElements2[item.el.hashCode])
                {
                    if (!item.el.contains(c.el))
                        continue;
                    let x = e.pageX - RevealHelper.getOffset(c).left - window.scrollX;
                    let y = e.pageY - RevealHelper.getOffset(c).top - window.scrollY;

                    let child = undefined;
                    if (c.child !== undefined)
                        child = c.child;
                    else
                    {
                        child = this.getSelector(this.options.childrenSelector, c);
                        child = child[0];
                        c.child = child;
                    }

                    //set the thresold to improve performance -------------------------
                    if (Math.abs(x) > 600 || Math.abs(y) > 1000) { }
                    else
                        RevealHelper.drawEffectBasic(c, x, y, c.borderLightColor, c.borderGradientSize);

                    if (RevealHelper.isInsideElement(child, e.clientX, e.clientY))
                    {
                        if (child.wave == 0)
                            RevealHelper.drawEffectBasic(child, x, y, c.backgroundLightColor, c.backgroundGradientSize);
                    }
                    else
                        RevealEffectsMasked.clearBackground(child);
                }
            }
            item.el.addEventListener("mousemove", containerSelectorMove);
            item.el.addEventListener("touchmove", containerSelectorMove);
            window.FvRevealCarriers2.push(item);
        }
    }

    getSelector (selector, parent=null) {
        if(parent == null)
            parent = document;
        else
            parent = parent.el;
        if(typeof(selector) === "string")   return RevealHelper.preProcessElements(parent.querySelectorAll(selector));
        else if(selector.length > 0) return RevealHelper.preProcessElements(selector);
        else if(selector.length === 0) return [];
        return RevealHelper.preProcessElements([selector]);
    }

    applyClickEffects(element, parent)
    {
        let c = element;

        let child = undefined;
        if (c.child !== undefined)
            child = c.child;
        else
        {
            child = this.getSelector(this.options.childrenSelector, c);
            if(child.length > 0) {
                child = child[0];
                c.child = child;
            }
            else
                child = undefined;
        }

        let downEvent = e => {
            if(!child)
                return 0;
            if(e.type.indexOf("mouse") < 0)
                e = e.targetTouches[0];
            let x = e.pageX - RevealHelper.getOffset(child).left - window.scrollX;
            let y = e.pageY - RevealHelper.getOffset(child).top - window.scrollY;
            RevealHelper.drawEffectBasic(child, x, y, this.options.backgroundLightColor, this.options.backgroundGradientSize, true);
        };

        let upEvent = e => {
            if(!child)
                return 0;
            let x = e.pageX - RevealHelper.getOffset(child).left - window.scrollX;
            let y = e.pageY - RevealHelper.getOffset(child).top - window.scrollY;
            RevealHelper.drawEffectBasic(child, x, y, this.options.backgroundLightColor, this.options.backgroundGradientSize);
        };

        let leaveEvent = e => {
            RevealEffectsMasked.clearBackground(c);
            if(!child)
                return 0;
            if(e.type.indexOf("mouse") < 0)
                e = e.targetTouches[0];
            RevealEffectsMasked.clearBackground(child);
            RevealEffectsMasked.clearBorder(child);
        };

        c.el.addEventListener("mousedown", downEvent);
        c.el.addEventListener("touchstart", downEvent);
        c.el.addEventListener("mouseup", upEvent);

        parent.el.addEventListener("mouseleave", leaveEvent);
        parent.el.addEventListener("touchend", leaveEvent);
    }

    static clearUselessElements()
    {
        for (let key in window.FvRevealElements2)
        {
            for (let i = window.FvRevealElements2[key].length - 1; i >= 0; i--)
            {
                if (!document.body.contains(window.FvRevealElements2[key][i].el))
                    window.FvRevealElements2[key].splice(i, 1);
            }
        }
    }

    static clearBackground(element)
    {
        if(!element)
            return 0;
        clearInterval(element.clickWave);
        element.wave = 0;
        element.el.style.backgroundImage = element.oriBg;
    }

    static clearBorder(element)
    {
        element.el.style.borderImage = element.oriBorder;
    }
}