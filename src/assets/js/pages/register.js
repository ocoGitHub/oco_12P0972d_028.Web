document.write('<script src="assets/libs/jquery/jquery.min.js"></script>')
document.write('<script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>');
document.write('<script src="assets/libs/vue/vue.global.js"></script>');
document.write('<script src="assets/js/setting.js"></script>');
document.write('<script src="assets/js/webApi.js"></script>');
//document.write('<script src="assets/js/linq_2_2_0_2.js"></script>');
document.write('<script src="assets/js/pages/register.Vue3.js"></script>');
var register={
   registerApiResourceName:'Staff/RegisterStaff', 
    startUp:function(){
        register.setMustInputLabelText();
        registerVue3.startUp();
       
    },
    setMustInputLabelText:function(){
       var doms= document.getElementsByClassName(setting.inputRequireLabelClassName);
       var length=doms.length;
      
       for(var i=0;i<length;i++){
        var dom=doms[i];
           var text=dom.innerText;
           text=text+setting.inputRequireMMark;
           dom.innerHTML=text;

       }
    },
    execute:function(reqParameter){
       
        webApi.send(
            webApi.methods.post, 
            register.registerApiResourceName,
            reqParameter,
            register.beforeSendCallback,
            register.okCallback,
            register.failedCallback,
            register.completeCallback,
            );
    },
    beforeSendCallback:function(){
        bootstrap05Modal.displayModal("註冊新用戶",'註冊新用戶',false,false,null,null);
        bootstrap05Modal.setWaittingStateContextDisplay();
    }, 
    okCallback:function(result, resultText, status){
        var realOk=webApi.isApiResultOK(result.ReturnCode);
        if(realOk){
            bootstrap05Modal.setModalResultContext('註冊成功，待管理員核准後即可使用');
           
            bootstrap05Modal.autoHideModal();
            bootstrap05Modal.setBtnSubmitVisiblity(true);
        }
        else{
               // 顯示確定鈕 
               bootstrap05Modal.setBtnSubmitVisiblity(true);
               // 設定 按確鈕時的 call back
               bootstrap05Modal.submitCallback=bootstrap05Modal.hideModal;
               // 設定提示文字
               bootstrap05Modal.setModalResultContext(result.ReturnMessage);
               bootstrap05Modal.autoHideModal();
               bootstrap05Modal.setBtnSubmitVisiblity(true);
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
    completeCallback:function(){
       // window.alert('completeCallback');
    }
}