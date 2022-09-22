//const { elementClosest } = require("fullcalendar");
var getTagData = {
    /**
     * @method startUp 啟動
     */
    startUp: function () {

    },

    /**
     * @property getInterval 取得資料的間隔 
     */
    getInterval: 1000,


    /**
     * @method getData
     * @remark alarmLevel:   0:adm, 1:staffId,2:FieldId
     */
    getData: function (okCallBack, failedCallBack, alarmLevel, id) {
        getTagData_ToGet.execute(okCallBack, failedCallBack, alarmLevel, id);

    },



};

var getTagData_ToGet = {
    apiResourceName: 'Tag/GetTagList',
    /**
     * @property okCallBack 交易成功後, 回呼的函式
     */
    okCallBack: null,

    /**
     * @property failedCallBack 交易失敗後, 回呼的函式
     */
    failedCallBack: null,
    alarmLevel:0,
    id:'',
    execute: function (okCallBack, failedCallBack, alarmLevel, id) {
        if (alarmLevel == undefined || alarmLevel == null) { alarmLevel = 0; }
        this.okCallBack = okCallBack;
        this.failedCallBack = failedCallBack;
        this.alarmLevel = alarmLevel;
        this.id = id;
        //staffLogin_Login.setParameters(parameter);

        var param = {
            SystemAdmin: false,
            IsReqIdForStaff: false,
            ReqId: id
        };


        if (alarmLevel == 0) {
            param.SystemAdmin = true;
        }
        else if (alarmLevel == 1) {
            param.IsReqIdForStaff = true;
        }
        else if (alarmLevel == 2) {
            param.IsReqIdForStaff = false;
        }
      // window.alert(JSON.stringify(param));
        webApi.send(
            webApi.methods.get,
            this.apiResourceName,
            param,  // 不須 Request 參數 
            this.beforeSendCallback,
            this.okCallback,
            this.failedCallback,
            this.completeCallback,
        );
    },
    beforeSendCallback: function () {

    },
    okCallback: function (result, resultText, status) {
        try {
            var realOk = webApi.isApiResultOK(result.ReturnCode);
            if (realOk) {
                if (getTagData_ToGet.okCallBack != null) {
                    //測點資料及、水閘門資料及警報歷史資料   

                    getTagData_ToGet.okCallBack(result.Detail.TagList,
                        result.Detail.MainWaterGateTagList,
                        result.Detail.AlarmHistoryList,
                       
                    );
                }

            }
            else {
                if (getTagData_ToGet.failedCallBack != null) {
                    getTagData_ToGet.failedCallBack({
                        statusText: result.ReturnMessage,
                        statusCode: result.ReturnCode
                    });
                }
            }
        }
        catch (ex) {

        }

        setTimeout(
            function () {
                getTagData_ToGet.execute(getTagData_ToGet.okCallBack, getTagData_ToGet.failedCallBack,
                    getTagData_ToGet.alarmLevel, getTagData_ToGet.id)
            }, getTagData.getInterval);
    },
    failedCallback: function (err) {
        try {
            if (getTagData_ToGet.failedCallBack != null) {
                getTagData_ToGet.failedCallBack({
                    statusText: err.statusText,
                    statusCode: err.status
                });
            }
        }
        catch (ex) {

        }

        setTimeout(
            function () {
                getTagData_ToGet.execute(getTagData_ToGet.okCallBack, getTagData_ToGet.failedCallBack,
                    getTagData_ToGet.alarmLevel, getTagData_ToGet.id    
                    )
            }, getTagData.getInterval);
    },
    completeCallback: function () {

    }
};