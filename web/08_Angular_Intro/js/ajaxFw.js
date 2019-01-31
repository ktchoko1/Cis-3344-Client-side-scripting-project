function ajaxCall(url, successFn, errorFn) {
    
    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();  //For Firefox, Safari, Opera
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP");   //For IE 5+
    } else {
        alert('ajax not supported');
    }

    function sendRequest() {
        console.log("ajax calling "+url);
        httpReq.open("GET", url);
        httpReq.onreadystatechange = handleResponse;
        httpReq.send(null);
    } // sendRequest

    function handleResponse() {
        if (httpReq.readyState === 4) {
            if (httpReq.status === 200) {
                console.log("Ajax success: response text is "+httpReq.responseText);
                var json = "(" + httpReq.responseText + ")";
                var object = eval(json);
                console.log(object);
                successFn(object);
            } else {
                console.log("Ajax error: "+httpReq.statusText);
                console.log(httpReq);
                errorFn("Could not read " + url + ". Status is "+httpReq.statusText);
            }
        }
    } // handleResponse
    sendRequest();
}