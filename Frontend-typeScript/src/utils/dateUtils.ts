import { Projection } from "src/classes/projection";

export function getFormattedDate(date: Date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let output = "";

    if (day < 10) {
        output += '0' + day;
    } else {
        output += day;
    }

    output += '.';

    if (month < 10) {
        output += '0' + month;
    } else {
        output += month;
    }

    output += '.';

    output += year;

    return output;
}
export function getFormattedTime(date: Date) {
    let hour = date.getHours();
    let minutes = date.getMinutes();

    let output = "";

    if (hour < 10) {
        output += '0' + hour;
    } else {
        output += hour;
    }

    output += ':';

    if (minutes < 10) {
        output += '0' + minutes;
    } else {
        output += minutes;
    }


    return output;
}

export function getDateFromProjection(projection: Projection) {
    let projectionDate = projection['date']?.split('.') ?? ['00', '00', '0000'];
    let projectionTime = projection['time']?.split(':') ?? ['00', '00'];

    return new Date(Number.parseInt(projectionDate[2]), Number.parseInt(projectionDate[1]) - 1, Number.parseInt(projectionDate[0]), Number.parseInt(projectionTime[0]), Number.parseInt(projectionTime[1]));
}

export function getStringForMinFunctionInDateTimeLocal(date: Date): string {

    //date:'yyyy-MM-ddTHH:mm'
    let strDate = date.getFullYear().toString();
    strDate += "-";
    if (date.getMonth() + 1 < 10) {
        strDate += "0";
    }
    strDate += (date.getMonth() + 1).toString();
    strDate += "-";
    
    if (date.getDate() < 10) {
        strDate += "0";
    }
    strDate += date.getDate().toString();
    strDate += "T00:00";
    // strDate += date.getHours().toString();
    console.log(strDate);
    return strDate;

}