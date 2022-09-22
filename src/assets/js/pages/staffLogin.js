document.write('<script src="assets/libs/jquery/jquery.min.js"></script>')
document.write('<script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>');
document.write('<script src="assets/libs/vue/vue.global.js"></script>');
document.write('<script src="assets/js/setting.js"></script>');
document.write('<script src="assets/js/webApi.js"></script>');
//document.write('<script src="assets/js/linq_2_2_0_2.js"></script>');
document.write('<script src="assets/js/pages/staffLogin.Vue3.js"></script>');
//window.alert('staffLogin.js');
document.write('<script src="assets/js/systemInfo.js"></script>');
var staffLogin={
    startUp:function(){
            staffLoginVue3.startUp();
            
            // 清除 Storage
            setting_Staff.clear();
           // window.alert(setting_Staff.getStaffJson()); 
           staffLogin.setRegisterLinkHref();
    },

    setRegisterLinkHref:function(){
          var registerNewStaffId="registerNewStaff" ;
          document.getElementById(registerNewStaffId).href=setting.registerPage;
    }

};

var staffLogin_Login={
   
   
    apiResourceName:'Staff/StaffLogin',
    
    execute:function(requestParameter){
      //staffLogin_Login.setParameters(parameter);
      webApi.send(
        webApi.methods.post, 
        staffLogin_Login.apiResourceName,
        requestParameter,
        staffLogin_Login.beforeSendCallback,
        staffLogin_Login.okCallback,
        staffLogin_Login.failedCallback,
        staffLogin_Login.completeCallback,
        );
    },

    okCallback:function(result, resultText, status){
       // window.alert(JSON.stringify(result) + "///" + resultText + "///" + JSON.stringify(status));
        var realOk=webApi.isApiResultOK(result.ReturnCode);
        if(realOk){
             // 轉頁
            //var json=JSON.stringify(result.Detail);
           // window.alert(json);
            setting_Staff.saveStaff(result.Detail);
            // json=JSON.stringify(setting_Staff.getStaff());
            //window.alert(json);
            setting.toFirstPage();
        }
        else{
               // 顯示確定鈕 
               bootstrap05Modal.setBtnSubmitVisiblity(true);
               // 設定 按確鈕時的 call back
               bootstrap05Modal.submitCallback=bootstrap05Modal.hideModal;
               // 設定提示文字
               bootstrap05Modal.setModalResultContext(result.ReturnMessage);
               bootstrap05Modal.autoHideModal();
        }
    },

    failedCallback:function(err){
        //window.alert(JSON.stringify(err));
        // 顯示確定鈕 
        bootstrap05Modal.setBtnSubmitVisiblity(true);
        // 設定 按確鈕時的 call back
        bootstrap05Modal.submitCallback=bootstrap05Modal.hideModal;
        // 設定提示文字
        bootstrap05Modal.setModalResultContext(err.statusText+"(" +err.status + ")");
        bootstrap05Modal.autoHideModal();
    },

    beforeSendCallback:function(){
        bootstrap05Modal.displayModal("登入",'用戶登入',false,false,null,null);
        bootstrap05Modal.setWaittingStateContextDisplay();
    },
    completeCallback:function(){
        
    }

};

