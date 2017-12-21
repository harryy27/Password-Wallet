
var core = {
  /**
   *
   * @return Object
   */
  "getOptions": function(){
    console.log('getOptions', localStorage);
    return localStorage;
  },
  
}

window.onload = function(){

  chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    var ret = (core[request.action] || function(){}).apply(this, request.args);
    sendResponse(ret);
  });
}
