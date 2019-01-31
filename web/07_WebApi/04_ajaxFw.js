function ajaxCall(url, successFn, errorFn) {

    // variable/property that's private to fn ajaxCall
    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();  //For Firefox, Safari, Opera
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP");         //For IE 5+
    } else {
        alert('ajax not supported');
    }

    // private function
    function sendRequest() {
        //alert ('sending request');
        httpReq.open("GET", url);
        httpReq.onreadystatechange = handleResponse;
        httpReq.send(null);
    }

    // another private function
    function handleResponse() {
        //alert('handling response');
        if (httpReq.readyState === 4) {
            if (httpReq.status === 200) {

                var response = httpReq.responseText;
                //alert ("response text is " + response);

                // wrap the json in parentheses to avoid tripping over javascript ambiguity...
                response = "(" + response + ")";
                var jsonObj = eval(response);
                successFn(jsonObj); // we are passing BACK jsonObj to the HTML page
            } else {
                errorFn(httpReq);  // we are passing BACK the whole httpReq object to the 
                                   // HTML page, they can extract error codes etc from there.
            }
        }
    } // handleResponse
    
    sendRequest();
} // ajaxCall