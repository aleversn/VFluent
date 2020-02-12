export class SDate
{
    constructor()
    {
        this.date = new Date();
    }
    static Parse(DateString)
    {
        let reg = /\d+/g;
        let timeArray = [];
        let x;
        while ((x = reg.exec(DateString)) != null)
        {
            timeArray.push(x[0]);
        }
        if (timeArray.length <= 3)
            return this.StringToDate(DateString);
        return this.StringToDateTime(DateString);
    }
    static get Now()
    {
        return new Date();
    }
    static DateToString(Date)
    {
        return `${Date.getFullYear()}/${Date.getMonth() + 1}/${Date.getDate()} ${Date.getHours()}:${Date.getMinutes()}:${Date.getSeconds()}`;
    }
    static StringToDate(DateStr)
    {
        let reg = /\d+/g;
        let timeArray = [];
        let d = new Date(); //先设置日期再设置月份, 否则当天超过要设定月份天数时设定的月份会顺延//
        let x;
        try
        {
            while ((x = reg.exec(DateStr)) != null)
            {
                timeArray.push(x[0]);
            }
            if (timeArray.length <= 0)
                return new Date();
            if (timeArray[0].length == 4)
            {
                d.setDate(timeArray[2]);
                d.setMonth(timeArray[1] - 1);
                d.setFullYear(timeArray[0]);
            }
            else
            {
                d.setDate(timeArray[1]);
                d.setMonth(timeArray[0] - 1);
                d.setFullYear(timeArray[2]);
            }
            return d;
        }
        catch (e)
        {
            return d;
        }
    }
    static StringToDateTime(DateStr)
    {
        let reg = /\d+/g;
        let timeArray = [];
        let d = this.StringToDate(DateStr);
        let x;
        try
        {
            while ((x = reg.exec(DateStr)) != null)
            {
                timeArray.push(x[0]);
            }
            if (timeArray.length <= 0)
                return new Date();
            d.setHours(timeArray[3]);
            d.setMinutes(timeArray[4]);
            d.setSeconds(timeArray[5]);
            return d;
        }
        catch (e)
        {
            return d;
        }
    }
    static DisTime(startDate, endDate)
    {
        return endDate.getTime() - startDate.getTime();
    }
    static DisDay(startDate, endDate)
    {
        return Math.floor(SDate.DisTime(startDate, endDate) / (24 * 3600 * 1000));
    }
    static DisHour(startDate, endDate)
    {
        let t = SDate.DisTime(startDate, endDate) / (3600 * 1000);
        return Math.floor(t);
    }
    static DisMinute(startDate, endDate)
    {
        let t = SDate.DisTime(startDate, endDate) / (60 * 1000);
        return Math.floor(t);
    }
    static DisSecond(startDate, endDate)
    {
        return Math.round(SDate.DisTime(startDate, endDate) / 1000);
    }
    static Compare(current, compare)
    {
        if (current.getTime() - compare.getTime() > 0)
            return 1;
        else if (current.getTime() == compare.getTime())
            return 0;
        return -1;
    }
}

export class SUtility
{
    static ScrollToLoadInit(e, callback = null, offset = 0)
    {
        try
        {
            e.addEventListener("scroll", event =>
            {
                if (e.scrollTop + offset >= e.scrollHeight - e.clientHeight)
                    if (callback != null)
                        callback();
            });
        }
        catch (e) { }
    }
}

export class RevealHelper
{
    static getOffset(element) {
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
        borderLightColor,
        gradientSize,
        clickEffect = false,
        mode = 'background'
    ) {
        let borderLight;
        let backgroundLight;

        borderLight = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${borderLightColor}, rgba(255,255,255,0)) 25% 25% 25% 25%`; //切成九块, 去掉中间块剩余8块, 为了使得显示均匀, 我们要保证相邻两块比例要一样, 因为每一块最终会被应用于border的每一块上拉伸, 比例相同能保证拉伸时相邻块能够衔接, 因此比率尽可能大(从而保证切边交点在圆内)又要满足8块比例一致则 100% / 4 = 25%. 
        if (clickEffect === false) {
            backgroundLight = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundLightColor}, rgba(255,255,255,0))`;
        } else {
            backgroundLight = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundLightColor}, rgba(255,255,255,0)), radial-gradient(circle ${element.wave}px at ${x}px ${y}px, rgba(255,255,255,0), ${backgroundLightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`;
        }

        if(mode == 'background') {
            if(clickEffect == true) {
                element.wave = 120;
                element.clickWave = setInterval(() => {
                    try
                    {
                        let cur = element.wave;
                        let step = cur / 200 + 1;
                        cur += step;
                        if(cur >= 1000)
                            clearInterval(element.clickWave);
                        else
                        {
                            element.wave = cur;
                            backgroundLight = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundLightColor}, rgba(255,255,255,0)), radial-gradient(circle ${element.wave}px at ${x}px ${y}px, rgba(255,255,255,0), ${backgroundLightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`;
                            element.el.style.backgroundImage = backgroundLight;
                        }
                    }
                    catch (e) {}
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
        else if(mode == 'border') {
            element.el.style.borderImage = borderLight;
        }
    }

    static drawEffectBorder(
        element,
        x,
        y,
        backgroundLightColor,
        borderLightColor,
        gradientSize,
        clickEffect = false
    ) {
        this.drawEffectBasic(element, x, y, backgroundLightColor, borderLightColor, gradientSize, clickEffect, "border");
    }

    static drawEffectBackground(
        element,
        x,
        y,
        backgroundLightColor,
        borderLightColor,
        gradientSize,
        clickEffect = false
    ) {
        this.drawEffectBasic(element, x, y, backgroundLightColor, borderLightColor, gradientSize, clickEffect, "background");
    }
    
    static preProcessElements(elements) {
        const res = [];
    
        elements.forEach(el => {
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
    
    static isInsideElement(element, cursorX, cursorY) {
        const el_area = {
            left: element.el.getBoundingClientRect().left,
            right: element.el.getBoundingClientRect().right,
            top: element.el.getBoundingClientRect().top,
            bottom: element.el.getBoundingClientRect().bottom
        }

        return (cursorX >= el_area.left && cursorX <= el_area.right && cursorY >= el_area.top && cursorY <= el_area.bottom);
    }
}

export class RevealEffects
{
    constructor (selector, options) {
        this.options = {
            selector: ".eff-reveal-border",
            backgroundGradientSize: 150,
            borderGradientSize: 80,
            borderLightColor: "rgba(255,255,255,0.25)",
            backgroundLightColor: "rgba(255,255,255,0.25)"
        };

        // update options
        this.options = Object.assign(this.options, options);

        this.childrenRefresh(selector, this.options);
        this.applyCommonEffects(selector, options);

        this.timer = setInterval(() => {
            this.childrenRefresh(selector);
        }, 300);
    }

    childrenRefresh (selector) {
        if(window.FvRevealElements == undefined)
            window.FvRevealElements = [];
        
        const els =  RevealHelper.preProcessElements(document.querySelectorAll(selector));
        for(let item of els) {
            let children = RevealHelper.preProcessElements(item.el.querySelectorAll(this.options.selector));
            for(let c of children) {
                let finder = window.FvRevealElements.find(it => it.el === c.el);
                if(finder === undefined) {
                    c.borderLightColor = this.options.borderLightColor;
                    c.backgroundLightColor = this.options.backgroundLightColor;
                    c.borderGradientSize = this.options.borderGradientSize;
                    c.backgroundGradientSize = this.options.backgroundGradientSize;
                    this.applyClickEffects(c, item);
                    window.FvRevealElements.push(c);
                }
            }
        }
    }

    applyCommonEffects (selector) {

        const els =  RevealHelper.preProcessElements(document.querySelectorAll(selector));

        for(let item of els) {
            //element background effect --------------------
            let containerSelectorMove = e => {
                for(let c of window.FvRevealElements) {
                    let x = e.pageX - RevealHelper.getOffset(c).left - window.scrollX;
                    let y = e.pageY - RevealHelper.getOffset(c).top - window.scrollY;
                    
                    RevealHelper.drawEffectBorder(c, x, y, c.backgroundLightColor, c.borderLightColor, c.borderGradientSize);

                    if(RevealHelper.isInsideElement(c, e.x, e.y)) {
                        if(c.wave == 0)
                            RevealHelper.drawEffectBackground(c, x, y, c.backgroundLightColor, c.borderLightColor, c.backgroundGradientSize);
                    }
                    else
                        RevealEffects.clearBackground(c);
                }
            }
            item.el.addEventListener("mousemove", containerSelectorMove);
        }
    }

    applyClickEffects (element, parent) {
        let c = element;

        c.el.addEventListener("mousedown", e => {
            let x = e.pageX - RevealHelper.getOffset(c).left - window.scrollX;
            let y = e.pageY - RevealHelper.getOffset(c).top - window.scrollY;
            RevealHelper.drawEffectBackground(c, x, y, this.options.backgroundLightColor, this.options.borderLightColor, this.options.backgroundGradientSize, true);
        });

        c.el.addEventListener("mouseup", e => {
            let x = e.pageX - RevealHelper.getOffset(c).left - window.scrollX;
            let y = e.pageY - RevealHelper.getOffset(c).top - window.scrollY;
            RevealHelper.drawEffectBackground(c, x, y, this.options.backgroundLightColor, this.options.borderLightColor, this.options.backgroundGradientSize);
        });
        
        parent.el.addEventListener("mouseleave", (e) => {
            RevealEffects.clearBorder(c);
        });
    }

    static clearBackground(element) {
        clearInterval(element.clickWave);
        element.wave = 0;
        element.el.style.backgroundImage = element.oriBg;
    }
    
    static clearBorder(element) {
        element.el.style.borderImage = element.oriBorder;
	}
}