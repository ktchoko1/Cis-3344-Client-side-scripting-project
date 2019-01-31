function MakeReuseFw(givenId) {
    var reuseFwObj = {};
    var id = givenId;
    reuseFwObj.linkTo = function (snippetFileName) {

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
            httpReq.open("GET", snippetFileName);
            httpReq.onreadystatechange = handleResponse;
            httpReq.send(null);
        }

        // another private function
        function handleResponse() {
            if (httpReq.readyState === 4 && httpReq.status === 200) {
                var response = httpReq.responseText;
                document.getElementById(id).innerHTML = response;
            }
        }
        sendRequest();
    };
    return reuseFwObj;
} 