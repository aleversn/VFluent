export class SDate {
    constructor() {
        this.date = new Date();
    }
    static Parse(DateString) {
        let reg = /\d+/g;
        let timeArray = [];
        let x;
        while((x = reg.exec(DateString))!= null)
        {
            timeArray.push(x[0]);
        }
        if(timeArray.length <= 3)
            return this.StringToDate(DateString);
        return this.StringToDateTime(DateString);
    }
    static get Now() {
        return new Date();
    }
    static DateToString(Date) {
        return `${Date.getFullYear()}/${Date.getMonth() + 1}/${Date.getDate()} ${Date.getHours()}:${Date.getMinutes()}:${Date.getSeconds()}`;
    }
    static StringToDate(DateStr) {
        let reg = /\d+/g;
        let timeArray = [];
        let d = new Date(); //先设置日期再设置月份, 否则当天超过要设定月份天数时设定的月份会顺延//
        let x;
        try
        {
            while((x = reg.exec(DateStr))!= null)
            {
                timeArray.push(x[0]);
            }
            if(timeArray.length<=0)
                return new Date();
            if(timeArray[0].length == 4)
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
    static StringToDateTime (DateStr) {
        let reg = /\d+/g;
        let timeArray = [];
        let d = this.StringToDate(DateStr);
        let x;
        try
        {
            while((x = reg.exec(DateStr))!= null)
            {
                timeArray.push(x[0]);
            }
            if(timeArray.length<=0)
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
    static DisTime(startDate, endDate) {
        return endDate.getTime() - startDate.getTime();
    }
    static DisDay(startDate, endDate) {
        return Math.floor(SDate.DisTime(startDate, endDate) / (24 * 3600 * 1000));
    }
    static DisHour(startDate, endDate) {
        let t = SDate.DisTime(startDate, endDate) / (3600 * 1000);
        return Math.floor(t);
    }
    static DisMinute(startDate, endDate) {
        let t = SDate.DisTime(startDate, endDate) / (60 * 1000);
        return Math.floor(t);
    }
    static DisSecond(startDate, endDate) {
        return Math.round(SDate.DisTime(startDate, endDate) / 1000);
    }
    static Compare(current,compare) {
        if(current.getTime() - compare.getTime() > 0)
            return 1;
        else if(current.getTime() == compare.getTime())
            return 0;
        return -1;
    }
}