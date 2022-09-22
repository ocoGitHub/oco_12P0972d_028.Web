document.write('<script src="assets/libs/jquery/jquery.min.js"></script>')

//document.write('<script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>');

document.write('<script src="assets/libs/vue/vue.global.js"></script>');
document.write('<script src="assets/js/setting.js"></script>');
document.write('<script src="assets/js/webApi.js"></script>');
document.write('<script src="assets/js/getTagData.js"></script>');
//document.write('<script src="assets/js/dataTableNoAjax.js"></script>');
//document.write('<script src="assets/js/webSignalR.js"></script>');
document.write('<script src="assets/js/pages/updatePassword.Vue3.js"></script>');
var updatePassword = {
  staff: null,

  startUp: function (staff) {
    updatePasswordVue3.startUp(staff, updatePassword_update.execute);
    updatePassword.staff = staff;
    updatePassword.setMustInputLabelText();

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



};

var updatePassword_update = {

  waitingAreaId: 'upsatePassword_WaitingArea',
  oKAreaId: 'upsatePassword_OKArea',
  errAreaId: 'upsatePassword_ErrArea',
  errTextAreaId: 'upsatePassword_ErrTextArea',
  appId: 'app',

  apiResourceName: 'Staff/UpdatePassword',

  hideAllAreas: function () {
    var obj = updatePassword_update;
    document.getElementById(obj.waitingAreaId).style.display = 'none';
    document.getElementById(obj.oKAreaId).style.display = 'none';
    document.getElementById(obj.errAreaId).style.display = 'none';
    document.getElementById(obj.appId).style.display = 'none';
  },

  displayWaitingArea: function () {
    updatePassword_update.hideAllAreas();
    document.getElementById(updatePassword_update.waitingAreaId).style.display = '';
  },

  displayOkArea: function () {
    updatePassword_update.hideAllAreas();
    document.getElementById(updatePassword_update.oKAreaId).style.display = '';
    updatePassword_update.displayAppArea();
  },
  displayErrArea: function (text) {
    updatePassword_update.hideAllAreas();
    document.getElementById(updatePassword_update.errAreaId).style.display = '';
    document.getElementById(updatePassword_update.errTextAreaId).innerText = text;
    updatePassword_update.displayAppArea();
  },

  displayAppArea: function () {

    setTimeout(
      function () {
        updatePassword_update.hideAllAreas();
        document.getElementById(updatePassword_update.appId).style.display = '';
      },
      setting.interval
    );

  },


  execute: function (requestParameter) {
    //staffLogin_Login.setParameters(parameter);
    webApi.send(
      webApi.methods.post,
      updatePassword_update.apiResourceName,
      requestParameter,
      updatePassword_update.beforeSendCallback,
      updatePassword_update.okCallback,
      updatePassword_update.failedCallback,
      updatePassword_update.completeCallback,
    );
  },

  beforeSendCallback: function () {
    updatePassword_update.displayWaitingArea();
  },
  okCallback: function (result, resultText, status) {
    var realOk = webApi.isApiResultOK(result.ReturnCode);
    if (realOk) {
      updatePassword_update.displayOkArea();
    }
    else {
      updatePassword_update.displayErrArea(result.ReturnMessage + "(" + result.ReturnCode + ")");
    }
  },
  failedCallback: function (err) {
    updatePassword_update.displayErrArea(err.statusText + "(" + err.status + ")");
  },
  completeCallback: function () {

  }

};