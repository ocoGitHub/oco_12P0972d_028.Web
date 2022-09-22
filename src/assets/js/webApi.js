var webApi={
   
   isApiResultOK:function(codeText){
      var code=parseInt(codeText);
      if(code==0){
         return true;
      }
      else{
         return false;
      }
   },
  
   methods:{
      post:'POST',
      get:'GET',
      delete:'DELETE',
      put:'PUT'  
   }, 
   apiUrl:'',
    
   getTargetUrl:function(resourceName){
      return webApi.apiUrl+resourceName;
   },

   /**
    * 
    * @param {*} method 方法
    * @param {*} apiResource  API Resource Name 
    * @param {*} parameters Request 參數
    * @param {*} beforeSendCallback  call back Function before Send
    * @param {*} okCallback call back Function When OK
    * @param {*} failedCallback call back Function When Failed
    * @param {*} completeCallback call back Function When Complete
    */
   send:function(method,apiResource,parameters,beforeSendCallback,okCallback,failedCallback,completeCallback){
      webApi.apiUrl=setting.webApi.getUrl();
      var targetUrl=webApi.getTargetUrl(apiResource);
     
      var sendObj=null;
      switch(method){
        case webApi.methods.post:
            sendObj={
               url: targetUrl,
              
               /*這些不要
                datatype:'json',
                contentType: 'application/json; charset=utf-8',
                req:data,
                cache:false,
                async: true,
               */
              
               traditional: true,
               type: 'POST',
               data: parameters,
               beforeSend: function () {
                  if (beforeSendCallback != null) {
                     beforeSendCallback();
                  }
               },
               success: function (result, resultText, status) {
                
                  if (okCallback != null) {
                     okCallback(result, resultText, status);
                  }
               },
               error: function (err) {
                 
                  if (failedCallback != null) {
                   failedCallback(err);
                  }
               },
               complete: function () {
                  if(completeCallback!=null){
                     completeCallback();
                  } 
               
                  
              }
            };
            break;
        case webApi.methods.get:
         sendObj={
            url: targetUrl,
           
            /*這些不要
             datatype:'json',
             contentType: 'application/json; charset=utf-8',
             req:data,
             cache:false,
             async: true,
            */
           
            traditional: true,
            type: 'get',
            data: parameters,
            beforeSend: function () {
               if (beforeSendCallback != null) {
                  beforeSendCallback();
               }
            },
            success: function (result, resultText, status) {
             
               if (okCallback != null) {
                  okCallback(result, resultText, status);
               }
            },
            error: function (err) {
              
               if (failedCallback != null) {
                failedCallback(err);
               }
            },
            complete: function () {
               if(completeCallback!=null){
                  completeCallback();
               } 
            
               
           }
         };
            break;
        case webApi.methods.delete:
            break;
        case webApi.methods.put:
        default:
            break;    
      }
      if(sendObj!=null){
         $.ajax(sendObj);
      }
   },
};
