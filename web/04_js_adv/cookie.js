var Cookie = {};

Cookie.setCookie = function (cname, cvalue, exdays) {
    if (!exdays) {
        exdays = 365;
    }
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log("cookie stored");
};

Cookie.setCookieObj = function (cname, cObj, exdays) {
    var jsonString = JSON.stringify(cObj);
    Cookie.setCookie(cname, jsonString, exdays);
};

Cookie.getCookie = function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    console.log("cookie read");
    return "";
};

Cookie.getCookieObj = function (cname) {
    var jsonString = Cookie.getCookie(cname);
    if (!jsonString) {
        return null;
    }
    jsonString = "(" + jsonString + ")";
    var obj = eval(jsonString);
    return obj;
};
