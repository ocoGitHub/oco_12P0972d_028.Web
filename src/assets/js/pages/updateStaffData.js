document.write('<script src="assets/libs/jquery/jquery.min.js"></script>')

//document.write('<script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>');

document.write('<script src="assets/libs/vue/vue.global.js"></script>');
document.write('<script src="assets/js/setting.js"></script>');
document.write('<script src="assets/js/webApi.js"></script>');
document.write('<script src="assets/js/getTagData.js"></script>');
//document.write('<script src="assets/js/dataTableNoAjax.js"></script>');
//document.write('<script src="assets/js/webSignalR.js"></script>');
document.write('<script src="assets/js/pages/updateStaffData.Vue3.js"></script>');

var updateStaffData = {
    staff: null,
    startUp: function (staff) {
        updateStaffData.staff = staff;
        updateStaffData.setMustInputLabelText();
        updateStaffDataVue3.startUp(staff, updateStaffData_Update.execute);
    },
    setMustInputLabelText: function () {
        var doms = document.getElementsByClassName(setting.inputRequireLabelClassName);
        var length = doms.length;

        for (var i = 0; i < length; i++) {
            var dom = doms[i];
            var text = dom.innerText;
            text = text + setting.inputRequireMMark;
            dom.innerHTML = text;

        }


    }


};

var updateStaffData_Update = {
    waitingAreaId: 'updateStaffData_WaitingArea',
    okAreaId: 'updateStaffData_OKArea',
    errAreaId: 'updateStaffData_ErrArea',
    errTextAreaId: 'upsateStaffData_ErrTextArea',
    appAreaId: 'app',
    hideAllAreas: function () {
        updateStaffData_Update.hideWaitingArea();
        updateStaffData_Update.hideErrArea();
        updateStaffData_Update.hideOkArea();
        updateStaffData_Update.hideAppArea();
    },

    displayAppArea: function () {
        updateStaffData_Update.hideAllAreas();
        document.getElementById(updateStaffData_Update.appAreaId).style.display = '';
    },
    hideAppArea: function () {
        try{
        document.getElementById(updateStaffData_Update.appAreaId).style.display = 'none';
        }
        catch(ex){
            console.log(ex);
        }
    },

    hideWaitingArea: function () {
        document.getElementById(updateStaffData_Update.waitingAreaId).style.display = 'none';
    },
    displayWaitingArea: function () {
        updateStaffData_Update.hideAllAreas();
        document.getElementById(updateStaffData_Update.waitingAreaId).style.display = '';

    },


    hideErrArea: function () {
        document.getElementById(this.errAreaId).style.display = 'none';

    },
    displayErrArea(errText) {
        updateStaffData_Update.hideAllAreas();
        document.getElementById(this.errAreaId).style.display = '';
        document.getElementById(this.errTextAreaId).innerText = errText
    },

    hideOkArea: function () {
        document.getElementById(this.okAreaId).style.display = 'none';
    },
    displayOkArea: function () {
        updateStaffData_Update.hideAllAreas();
        document.getElementById(this.okAreaId).style.display = '';

    },

    apiResourceName: 'Staff/UpdateStaffDataByStaff',
    execute: function (requestParameter) {
        //staffLogin_Login.setParameters(parameter);
        webApi.send(
            webApi.methods.post,
            updateStaffData_Update.apiResourceName,
            requestParameter,
            updateStaffData_Update.beforeSendCallback,
            updateStaffData_Update.okCallback,
            updateStaffData_Update.failedCallback,
            updateStaffData_Update.completeCallback,
        );
    },
    beforeSendCallback: function () {
        updateStaffData_Update.displayWaitingArea();
    },
    okCallback: function (result, resultText, status) {
        var realOk = webApi.isApiResultOK(result.ReturnCode);
        if (realOk) {
            updateStaffData_Update.displayOkArea();
            setTimeout(
                function () {
                    setting.toLoginPage();
                }
                ,
                setting.interval
            )
        }
        else {
            updateStaffData_Update.displayErrArea(result.ReturnMessage + "(" + result.ReturnCode + ")");
            setTimeout(
                function () {
                    updateStaffData_Update.displayAppArea();
                }
                ,
                setting.interval
            )
        }
       
    },
    failedCallback: function (err) {
        updateStaffData_Update.displayErrArea(err.statusText + "(" + err.status + ")");
        setTimeout(
            function () {
                updateStaffData_Update.displayAppArea();
            }
            ,
            setting.interval
        )
    },
    completeCallback: function () {

    }
};