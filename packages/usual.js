import { RevealEffects } from './Js/revealDirect';
import { RevealEffectsMasked } from './Js/revealMasked';

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
        let dis = SDate.DisHour(startDate, endDate);
        if(dis > 24)
            return Math.floor(dis / 24);
        else
            return startDate.getDate() == endDate.getDate() ? 0 : 1;
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
    static IsSameDate(current, compare)
    {
        if(current.getFullYear() !== compare.getFullYear() || current.getMonth() !== compare.getMonth() || current.getDate() !== compare.getDate())
            return false;
        return true;
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
    static xhr(params = {}) //{ url: '', data: [{ name: '', value: '' }], success: function (responseText) {}, error: function (responseText) {}, progress: function (loaded, currentLoaded) {} } //
    {
        if(params.url == undefined)
        {
            this.barWarning(0,'expected url');
            return 0;
        }
        if(params.data == undefined)
        {
            this.barWarning(0,'expected data');
            return 0;
        }
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        for (let i = 0; i < params.data.length; i++) {
            formData.append(params.data[i].name == undefined ? `obj: ${i}` : params.data[i].name, params.data[i].value);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                if(params.success != null)
                    params.success(xhr.responseText);
            }
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
                if(params.error != null)
                    params.error(xhr.responseText);
            }
        }

        let loaded = 0;
        xhr.upload.addEventListener("progress", function (e) {
            loaded += e.loaded;
            if(params.progress != null)
                params.progress(loaded, e.loaded);
        });
        xhr.open("post", params.url);
        xhr.send(formData);
    }
    static Guid()
    {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
         }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }    
    static GuidWithoutDash()
    {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
         }
        return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
    }
}

export { RevealEffects }
export { RevealEffectsMasked }