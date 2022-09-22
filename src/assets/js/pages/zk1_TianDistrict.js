//const { htmlPrefilter } = require("jquery");


document.write('<script src="assets/libs/jquery/jquery.min.js"></script>')
document.write('<script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>');
document.write('<script src="assets/libs/vue/vue.global.js"></script>');
document.write('<script src="assets/js/setting.js"></script>');
document.write('<script src="assets/js/webApi.js"></script>');
document.write('<script src="assets/js/getTagData.js"></script>');
document.write('<script src="assets/js/dataTableNoAjax.js"></script>');
document.write('<script src="assets/js/webSignalR.js"></script>');


var zk1_TianDistric = {
    staff: '',
    fieldId: '',
    fieldName: '',
    webSignalR: null,
    realTimeTagDataFromSignalR: null,
    setRealTimeTagDataFromSignalR: function (datas) {
        zk1_TianDistric.realTimeTagDataFromSignalR = JSON.parse(JSON.stringify(datas));
        // console.log("zk1_TianDistric:" + JSON.stringify(datas))
    },

    /**
     * @property waterGateWaterLevel_LowBoundSetId 設定 模式一~水位低限的文字盒
     */
    waterGateWaterLevel_LowBoundSetId: 'waterGateWaterLevel_LowBoundSet',

    /**
     * @property waterGateWaterLevel_LowBoundSetId 設定 模式一~溼度低限的文字盒
     */
    waterGateEarthMoisture_LowBoundSetId: 'waterGateEarthMoisture_LowBoundSet',

    /**
     * @property gatetStartTime_HourSelectId 設定模式二開始時間的 小時選單的 Select
     * 
     */
    gatetStartTime_HourSelectId: 'gatetStartTime_HourSelect',


    /**
    * @property gateStartTime_MinuteSelectId 設定模式二開始時間的 分鐘選單的 Select
    * 
    */
    gateStartTime_MinuteSelectId: 'gateStartTime_MinuteSelect',

    /**
        * @property gateEndTime_HourSelectId 設定模式二結束時間的 小時選單的 Select
        * 
        */
    gateEndTime_HourSelectId: 'gateEndTime_HourSelect',

    /**
        * @property gateEndTime_HourSelectId 設定模式二結束時間的 小時選單的 Select
        * 
        */
    gateEndTime_MinuteSelectId: 'gateEndTime_MinuteSelect',
    /**
     * @method setMode1WaterLevelLowBound 設定田區水位低限 
     * @param {*} fieldId 
     */
    setMode1WaterLevelLowBound: function () {
        var tags = Enumerable.From(zk1_TianDistric.staff.TagList).
            Where(m => m.FieldId == zk1_TianDistric.fieldId).
            Where(m => m.ValueUsage == setting_Staff.tagValueUsage.waterGateWaterLevelLowBound).
            ToArray();
        if (tags.length != 0) {
            var tag = tags[0];
            var textElement = document.getElementById(zk1_TianDistric.waterGateWaterLevel_LowBoundSetId);
            var targetValueText = textElement.value;
            var targetValue = parseFloat(targetValueText);
            if (targetValue.toString() != 'NaN') {
                textElement.value = targetValue.toString();
                setting_Staff.waterGateControl.setWaterGateWaterLevelLowBound(tag, targetValue, zk1_TianDistric.webSignalR);
            }
            else {   // 不是數字, 不能設定
                textElement.value = textElement.value + " 請設定數值";
                textElement.focus();
            }
        }
        else {

        }
    },

    /**
    * @method setMode1EarthMoistureLowBound 設定田區溼度 
    * @param {*} fieldId 
    */
    setMode1EarthMoistureLowBound: function () {
        var tags = Enumerable.From(zk1_TianDistric.staff.TagList).
            Where(m => m.FieldId == zk1_TianDistric.fieldId).
            Where(m => m.ValueUsage == setting_Staff.tagValueUsage.waterGateEarthMoistureLowBound).
            ToArray();
        if (tags.length != 0) {
            var tag = tags[0];
            var textElement = document.getElementById(zk1_TianDistric.waterGateEarthMoisture_LowBoundSetId);
            var targetValueText = textElement.value;
            var targetValue = parseFloat(targetValueText);
            if (targetValue.toString() != 'NaN') {
                textElement.value = targetValue.toString();
                setting_Staff.waterGateControl.setWaterGateWaterLevelLowBound(tag, targetValue, zk1_TianDistric.webSignalR);
            }
            else {   // 不是數字, 不能設定
                textElement.value = textElement.value + " 請設定數值";
                textElement.focus();
            }
        }
        else {

        }

    },

    setMode2StartTime: function () {
        var hTags = Enumerable.From(zk1_TianDistric.staff.TagList).
            Where(m => m.FieldId == zk1_TianDistric.fieldId).
            Where(m => m.ValueUsage == setting_Staff.tagValueUsage.waterGateStartTimeHour).
            ToArray();
        var mTags = Enumerable.From(zk1_TianDistric.staff.TagList).
            Where(m => m.FieldId == zk1_TianDistric.fieldId).
            Where(m => m.ValueUsage == setting_Staff.tagValueUsage.waterGateStartTimeMinute).
            ToArray();
        var hTag = null;
        var mTag = null;

        if (hTags.length != 0) {
            hTag = hTags[0];
        }
        if (mTags.length != 0) {
            mTag = mTags[0];
        }
        if (mTag != null && hTag != null) {
            var hour = parseInt(document.getElementById(zk1_TianDistric.gatetStartTime_HourSelectId).value);
            var minute = parseInt(document.getElementById(zk1_TianDistric.gateStartTime_MinuteSelectId).value);
            setting_Staff.waterGateControl.setWaterGateStartTime(hTag, mTag, hour, minute, zk1_TianDistric.webSignalR)
        }
        else {   // 找不到測點

        }

    },

    setMode2EndTime: function () {

        var hTags = Enumerable.From(zk1_TianDistric.staff.TagList).
            Where(m => m.FieldId == zk1_TianDistric.fieldId).
            Where(m => m.ValueUsage == setting_Staff.tagValueUsage.waterGateEndTimeHour).
            ToArray();
        var mTags = Enumerable.From(zk1_TianDistric.staff.TagList).
            Where(m => m.FieldId == zk1_TianDistric.fieldId).
            Where(m => m.ValueUsage == setting_Staff.tagValueUsage.waterGateEndTimeMinute).
            ToArray();
        var hTag = null;
        var mTag = null;
        if (hTags.length != 0) {
            hTag = hTags[0];
        }
        if (mTags.length != 0) {
            mTag = mTags[0];
        }
        if (mTag != null && hTag != null) {
            var hour = parseInt(document.getElementById(zk1_TianDistric.gateEndTime_HourSelectId).value);
            var minute = parseInt(document.getElementById(zk1_TianDistric.gateEndTime_MinuteSelectId).value);
            setting_Staff.waterGateControl.setWaterGateEndTime(hTag, mTag, hour, minute, zk1_TianDistric.webSignalR)
        }
        else {

        }

    },

    /**
     * @method getTagByTagName  get tag via tag Name
     * @param {*} tagName 
     * @returns 
     */
    getTagByTagName: function (tagName) {
        var tags = Enumerable.From(zk1_TianDistric.staff.TagList).Where(m => m.TagName == tagName).ToArray();
        if (tags.length > 0) {
            var tag = tags[0]
            // window.alert(tag.TagName);
            // window.alert(tag.ModbusAddress);
            // window.alert(tag.DataType);
            //   console.log('getTagByTagName:' + JSON.stringify(tag));
            return tag;
        }
        else {
            console.log('getTagByTagName: tag=null');
            return null;
        }

    },

    /**
     * @method setControlModeToTiming 將閘門的控制模式設為定時控制
     * @param {*} tagName 
     */
    setControlModeToTiming: function (tagName) {
        if (event != undefined) {
            event.preventDefault();
        }
        var tag = zk1_TianDistric.getTagByTagName(tagName);
        if (tag != null) {

            setting_Staff.waterGateControl.setWaterGateControlModeToTimingMode(tag, zk1_TianDistric.webSignalR);
        }
    },

    /**
     * @method setControlModeToManual 將閘門的控制模式設為手動控制
     * @param {*} tagName 
     */
    setControlModeToManual: function (tagName) {
        if (event != undefined) {
            event.preventDefault();
        }
        var tag = zk1_TianDistric.getTagByTagName(tagName);
        if (tag != null) {
            setting_Staff.waterGateControl.setWaterGateControlModeToManualMode(tag, zk1_TianDistric.webSignalR)
        }
    },
    /**
     * @method setControlModeToScenario 將閘門的控制模式設為情境控制
     * @param {*} tagName 
     */
    setControlModeToScenario: function (tagName) {
        if (event != undefined) {
            event.preventDefault();
        }
        var tag = zk1_TianDistric.getTagByTagName(tagName);
        if (tag != null) {
            setting_Staff.waterGateControl.setWaterGateControlModeToScenarioMode(tag, zk1_TianDistric.webSignalR);
        }
    },

    /**
     * @method openWatergate 打開水閘門
     * @param {*} tagName 
     */
    openWatergate: function (tagName) {
        if (event != undefined) {
            event.preventDefault();
        }
        var tag = zk1_TianDistric.getTagByTagName(tagName);
        //  console.log("openWatergate:" + JSON.stringify(tag))
        if (tag != null) {
            setting_Staff.waterGateControl.openWatergate(tag, zk1_TianDistric.webSignalR);
        }
    },

    /**
    * @method closeWatergate 關閉水閘門
    * @param {*} tagName 
    */
    closeWatergate: function (tagName) {
        if (event != undefined) {
            event.preventDefault();
        }
        var tag = zk1_TianDistric.getTagByTagName(tagName);
        if (tag != null) {
            setting_Staff.waterGateControl.closeWatergate(tag, zk1_TianDistric.webSignalR);
        }
    },

    /**
    * @method stopWatergateOpenClose 停止 水閘門 開/關操作
    * @param {*} tagName 
    */
    stopWatergateOpenClose: function (tagName) {
        if (event != undefined) {
            event.preventDefault();
        }
        var tag = zk1_TianDistric.getTagByTagName(tagName);
        if (tag != null) {
            setting_Staff.waterGateControl.stopWatergateOpenClose(tag, zk1_TianDistric.webSignalR);
        }
    },

    /**
     * @method connectToSignalR 連接 SignalR
     * @returns 
     */
    connectToSignalR: function () {


        try {
            webSignalR.connect(zk1_TianDistric.setRealTimeTagDataFromSignalR);
            return webSignalR;
        }
        catch (ex) {
            //window.alert("err:" + ex);
            return null;
        }
    },



    getDataErrObj: {
        statusText: "",
        statusCode: ""
    },
    getTagDataFailed: function (errObj) {
        zk1_TianDistric.getDataErrObj = errObj;
    },

    /**
     * @method getTagDataOk 
     * @param {*} rtnData 
     * @param {*} mainGate 
     * @param {*} alarmHistories 
     */
    getTagDataOk: function (rtnData, mainGate, alarmHistories) {

        var tagLists = Enumerable.From(rtnData).Where(m => m.FieldId == zk1_TianDistric.fieldId).ToArray();
        // 田區資訊
        zk1_TianDistric.setFieldInformation(tagLists);
        // 即時流量資訊
        zk1_TianDistric.setRealTimeWaterFlowInformation(tagLists);
        // 土壤資訊設備清單(溼度)
        zk1_TianDistric.setEarthMoistureInformationEquipmentList(tagLists);
        // 水位資訊設備清單
        zk1_TianDistric.setWaterLevelInformationEquipmentList(tagLists);
        // 電動水閘門
        tagLists = Enumerable.From(rtnData).Where(m => m.FieldId == zk1_TianDistric.fieldId).ToArray();
        zk1_TianDistric.setElectricWaterGate(tagLists, mainGate);

        //設定警報歷史資料(在 Horizontal.html)
        horizontal.displayAlarmHistory(alarmHistories)

    },
    /** 
     * @method isFieldIdExist 檢查田區的 ID 是否存
    */
    isFieldIdExist: function (fieldId) {
        var staff = zk1_TianDistric.staff;
        //  window.alert(JSON.stringify(staff));
        // 可管理的 田區
        var fields = staff.FieldsAdmList;
        try {
            fields = Enumerable.From(fields).
                Where(m => m.FieldId == fieldId).
                ToArray();
            if (fields.length == 0) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (ex) {
            return false;
        }
    },

    /**
     * @method hasFiledHasElectricWaterGate 目前的回區是否有水閘門
     */
    hasFiledHasElectricWaterGate: function () {
        var fieldId = zk1_TianDistric.fieldId;
        var staff = zk1_TianDistric.staff;

        var tags = Enumerable.From(staff.TagList).Where(m => m.FieldId == fieldId && m.TagWay == setting_Staff.tagWayCode.ElectricWaterGate).ToArray();


        if (tags.length > 0) {
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * @methodd 取得 田區名稱
     * @returns 
     */
    getFieldName: function () {
        var staff = zk1_TianDistric.staff;
        var fieldId = zk1_TianDistric.fieldId;
        var fields = staff.FieldsAdmList;
        var field = Enumerable.From(fields)
            .Where(m => m.FieldId == fieldId).ToArray();
        var fieldName = field[0].FieldName;
        return fieldName;

    },
    /**
     * @method  getFieldIdFromQueryString 由Query String 取得 田區ID
     * @returns 
     */
    getFieldIdFromQueryString: function () {
        var url = location.href;
        if (url.indexOf('?') != -1) {
            try {
                var ary1 = url.split('?');
                var ary2 = ary1[1].split('&');
                var fieldId = ary2[0].split('=')[1];
                if (fieldId == null || fieldId == undefined || fieldId == '') {
                    return '';
                }
                return fieldId;
            }
            catch (ex) {
                return '';
            }
        }
        else {
            return '';
        }
    },

    /**
     * @method initialSubtitle 初始化次標題 
     */
    initialSubtitle: function () {
        var subTitleId = 'subTitle';
        document.getElementById(subTitleId).innerText = zk1_TianDistric.fieldName + "管理";
    },


    /**
     * @method setFieldInformation 取得進水量、灌溉量 及 排水量 實際值後, 在預定位置顯示
     * @param {*} informations 
     */
    setFieldInformation: function (informations) {
        var data = Enumerable.From(informations).Where(m => m.ValueUsage !== setting_Staff.tagValueUsage.nothing).ToArray();
        var length = data.length;
        for (var i = 0; i < length; i++) {
            var tag = data[i];
            var id = "";
            // 進水量
            if (tag.ValueUsage == setting_Staff.tagValueUsage.waterIntake) {
                id = tag.FieldId + "_" + setting_Staff.tagValueUsage.waterIntakeName
            }
            // 灌溉量
            else if (tag.ValueUsage == setting_Staff.tagValueUsage.irrigation) {
                id = tag.FieldId + "_" + setting_Staff.tagValueUsage.irrigationName
            }
            // 排水量
            else if (tag.ValueUsage == setting_Staff.tagValueUsage.drain) {
                id = tag.FieldId + "_" + setting_Staff.tagValueUsage.drainName
            }
            if (id == "") { continue; }
            var ele = document.getElementById(id);
            if (ele != null) {
                var realTimeData = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).
                    Where(m => m.TagName == tag.TagName).ToArray();

                if (realTimeData.length >= 0) {
                    ele.innerText = realTimeData[0].ValueString;
                    setting_Style.changeTailWindClassNamesByValue(id, realTimeData[0].Value);
                    //window.alert(realTimeData[0].Value);
                }
            }
        }

    },
    /**
     * @method initialInformationTitle 初始化田區相關資訊
     */
    initialFieldInformation: function () {
        var staff = zk1_TianDistric.staff;
        var fieldList = staff.FieldsAdmList;
        //#region 標題設定
        // 放置標題區塊的Id
        var fieldInformationTitleId = 'fieldInformationTitle';
        document.getElementById(fieldInformationTitleId).innerText = zk1_TianDistric.fieldName + "相關資訊";
        //window.alert(zk1_TianDistric.fieldName);
        //#endregion

        //#region 明細項目設定
        //放置明細項目資料區的 ID
        var fieldInformationsId = 'fieldInformations';
        // 明細資料內容的 html
        var contextHtml = '';
        // 要顯示的資料集合
        var fields = Enumerable.From(fieldList).Where(m => m.FieldId == zk1_TianDistric.fieldId).ToArray();
        //  window.alert(fields.length);
        // 資料筆數 
        var fieldLength = fields.length;

        for (var i = 0; i < fieldLength; i++) {
            var field = fields[i];
            //window.alert(field.FieldName)
            // 進水量 id
            var intakeId = field.FieldId + "_" + setting_Staff.tagValueUsage.waterIntakeName;
            // 灌溉量 id
            var irrId = field.FieldId + "_" + setting_Staff.tagValueUsage.irrigationName;
            // 排水量 Id
            var drainId = field.FieldId + "_" + setting_Staff.tagValueUsage.drainName;
            var html = `
            <tr
            class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
            <td id="fieldName"
                class="ti ti-table p-3 text-sm font-medium whitespace-nowrap dark:text-white">`
                + field.FieldName +
                `</td>
            <!--進水量-->
           
            <td title="進水量"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                <span id="`+ intakeId + `"
                class="rounded">[進水量]
               </span>
            </td>
            
            <!--灌溉量-->
            <td title="灌溉量"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
               <span id="`+ irrId + `"
               class="rounded" >[灌溉量]
               </span>
            </td>
           
            <!--排水量-->
            <td title="灌溉量"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
               <span id="`+ drainId + `"
               class="rounded">[排水量]
               </span>
            </td>
        </tr>
            `;
            contextHtml += html;
        }
        document.getElementById(fieldInformationsId).innerHTML = contextHtml;

        //#endregion        
    },

    setElectricWaterGate: function (informations, mainGate) {
        // 顯示模式二開始時間-時   的區域  ID
        var gateStartTime_HourId = 'gateStartTime_Hour';
        // 顯示模式二開始時間-分   的區域  ID
        var gateStartTime_MinuteId = 'gateStartTime_Minute';
        // 顯示模式二結束時間-時   的區域  ID
        var gateEndTime_HourId = 'gateEndTime_Hour';
        // 顯示模式二結束時間-分   的區域  ID
        var gateEndTime_MinuteId = 'gateEndTime_Minute';
        // 顯示 模式一水位低限 的區域 Id
        var waterGateWaterLevel_LowBoundId = 'waterGateWaterLevel_LowBound';
        // 顯示 模式一溼低限 的區域 Id
        var waterGateEarthMoisture_LowBoundId = 'waterGateEarthMoisture_LowBound';


        var data = Enumerable.From(informations).
            Where(m => m.TagWay == setting_Staff.tagWayCode.ElectricWaterGate || m.TagWay == setting_Staff.tagWayCode.ElectricBlockWaterGate).
            ToArray();
        var length = data.length;
        for (var i = 0; i < length; i++) {
            var tag = data[i];
            var id = '';
            if (tag.TagWay == setting_Staff.tagWayCode.ElectricWaterGate) {
                id = tag.TagName + "_" + setting_Staff.tagWayCode.ElectricWaterGateName;
            }
            else {
                id = tag.TagName + "_" + setting_Staff.tagWayCode.ElectricBlockWaterGateName;
            }
            var ele = document.getElementById(id);
            if (ele != null) {
                var value = tag.RealValue;
                var text = "";
                var realTimeData = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).
                    Where(
                        m => m.TagName == tag.TagName//.replace('--','@@') // replace 可以拿掉
                        ).ToArray();
                if (realTimeData.length == 0) { continue; }
                if (tag.TagName.split('--')[1] == 1) {// 狀態
                    text = setting_Staff.waterGateState.getText(realTimeData[0].Value);
                }
                else if (tag.TagName.split('--')[1] == 2) { // 控制模式
                    text = setting_Staff.waterGateControlMode.getText(realTimeData[0].Value);

                }
                ele.innerText = text;
                setting_Style.changeTailWindClassNamesByValue(id, realTimeData[0].Value-1);
            }
        }

        // 如果田區有電動水門, 才設定 主動進水門及主動擋水門
        if (length > 0) {
            var gates = mainGate.length;
            for (var i = 0; i < gates; i++) {
                var tag = mainGate[i];
                var id = tag.TagName + "_" + setting_Staff.tagWayCode.ElectricWaterGateName;
                var ele = document.getElementById(id);
                if (ele != null) {
                    var realTimeData = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).
                        Where(
                            m => m.TagName == tag.TagName//.replace('--','@@')
                            ).ToArray();
                    if (realTimeData.length == 0) { continue; }
                    var value = tag.RealValue;
                    var text = "";
                    if (tag.TagName.split('--')[1] == 1) {// 狀態
                        text = setting_Staff.waterGateState.getText(realTimeData[0].Value);
                    }
                    else if (tag.TagName.split('--')[1] == 2) { // 控制模式
                        text = setting_Staff.waterGateControlMode.getText(realTimeData[0].Value);

                    }
                    ele.innerText = text;
                    setting_Style.changeTailWindClassNamesByValue(id, realTimeData[0].Value-1);
                }
            }
            //#region 設定水位低限
            var waterlowBound = setting_Staff.tagValueUsage.waterGateWaterLevelLowBound
            data = Enumerable.From(informations).
                Where(m => m.ValueUsage == waterlowBound).
                Where(m => m.FieldId == zk1_TianDistric.fieldId).
                ToArray();
            if (data.length != 0) {
                // var value = data[0].RealValueText;
                var tag = data[0];
                var realTimeData = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).
                    Where(m => m.TagName == tag.TagName).ToArray();
                //window.alert( "length:" +  realTimeData.length)
                if (realTimeData.length > 0) {
                    var value = realTimeData[0].ValueString;
                    document.getElementById(waterGateWaterLevel_LowBoundId).innerText = value;
                    setting_Style.changeTailWindClassNamesByValue(waterGateWaterLevel_LowBoundId, value);
                }
            }
            //#endregion
            //#region 設定 溼度低限
            var moistureLowBound = setting_Staff.tagValueUsage.waterGateEarthMoistureLowBound;
            data = Enumerable.From(informations).
                Where(m => m.ValueUsage == moistureLowBound).
                Where(m => m.FieldId == zk1_TianDistric.fieldId).
                ToArray();
            if (data.length != 0) {
                // var value = data[0].RealValueText;
                var tag = data[0];
                var realTimeData = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).
                    Where(m => m.TagName == tag.TagName).ToArray();
                // window.alert( "tagName:" +  realTimeData[0].TagName)
                if (realTimeData.length > 0) {
                    var value = realTimeData[0].ValueString;
                    document.getElementById(waterGateEarthMoisture_LowBoundId).innerText = value;
                    setting_Style.changeTailWindClassNamesByValue(waterGateEarthMoisture_LowBoundId, value);
                }
            }
            //#endregion

            //#region  設定 開始時間
            // 時
            var startHour = setting_Staff.tagValueUsage.waterGateStartTimeHour
            data = Enumerable.From(informations).
                Where(m => m.ValueUsage == startHour).
                Where(m => m.FieldId == zk1_TianDistric.fieldId).
                ToArray();
            if (data.length != 0) {
                var tag = data[0];
                var realTimeData = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).
                    Where(m => m.TagName == tag.TagName).ToArray();
                if (realTimeData.length > 0) {
                    var value = realTimeData[0].Value;
                    //window.alert(realTimeData[0].TagName);
                    document.getElementById(gateStartTime_HourId).innerText = parseInt(value);
                }
            }
            // 分
            var startMinute = setting_Staff.tagValueUsage.waterGateStartTimeMinute
            data = Enumerable.From(informations).
                Where(m => m.ValueUsage == startMinute).
                Where(m => m.FieldId == zk1_TianDistric.fieldId).
                ToArray();
            if (data.length != 0) {
                var tag = data[0];
                var realTimeData = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).
                    Where(m => m.TagName == tag.TagName).ToArray();
                if (realTimeData.length > 0) {
                    var value = realTimeData[0].Value;
                    // window.alert(realTimeData[0].TagName);
                    document.getElementById(gateStartTime_MinuteId).innerText = parseInt(value);
                }
            }
            //#endregion

            //#region 設定 結束時間
            var endHour = setting_Staff.tagValueUsage.waterGateEndTimeHour
            data = Enumerable.From(informations).
                Where(m => m.ValueUsage == endHour).
                Where(m => m.FieldId == zk1_TianDistric.fieldId).
                ToArray();
            if (data.length != 0) {
                var tag = data[0];
                var realTimeData = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).
                    Where(m => m.TagName == tag.TagName).ToArray();
                if (realTimeData.length > 0) {
                    var value = realTimeData[0].Value;
                    // window.alert(realTimeData[0].TagName);
                    document.getElementById(gateEndTime_HourId).innerText = parseInt(value);
                }
            }
            // 分
            var endMinute = setting_Staff.tagValueUsage.waterGateEndTimeMinute
            data = Enumerable.From(informations).
                Where(m => m.ValueUsage == endMinute).
                Where(m => m.FieldId == zk1_TianDistric.fieldId).
                ToArray();
            if (data.length != 0) {
                var tag = data[0];
                var realTimeData = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).
                    Where(m => m.TagName == tag.TagName).ToArray();
                if (realTimeData.length > 0) {
                    var value = realTimeData[0].Value;
                    // window.alert(realTimeData[0].TagName);
                    document.getElementById(gateEndTime_MinuteId).innerText = parseInt(value);
                }
            }
            //#endregion


        }
    },

    /**
     * @method initialElectricWaterGate 初始化電動水閘門
     */
    initialElectricWaterGate: function () {
        // 水閘門資料說明區域Id
        var electricWategateNoteId = 'electricWategateNote';
        // 水閘門資料說明區域
        var electricWategateNote = document.getElementById(electricWategateNoteId);

        // 電動水閘門設備區Id
        var electricWaterGateEquipmentAreaId = 'electricWaterGateEquipmentArea';
        // 電動水閘門設備區
        var electricWaterGateEquipmentArea = document.getElementById(electricWaterGateEquipmentAreaId);
        //#region 若這個田區没有水閘門, 這區不顯示
        var hasGate = zk1_TianDistric.hasFiledHasElectricWaterGate();
        // window.alert(hasGate);
        // 設定模式二開始時間-時   的Select ID
        var gateStartTime_HourSelectId = 'gatetStartTime_HourSelect';
        // 設定模式二開始時間-分   的Select ID
        var gateStartTime_MinuteSelectId = 'gateStartTime_MinuteSelect';
        // 設定模式二結束時間-時   的Select ID
        var gateEndTime_HourSelectId = 'gateEndTime_HourSelect';
        // 設定模式二結束時間-時   的Select ID
        var gateEndTime_MinuteSelectId = 'gateEndTime_MinuteSelect';



        //#region  設定 模式二: 開始時間(時：分) ;  模式二: 結束時間(時：分) 的時、分選單 
        var hourSelectOptionHtlm = setting_DateTime.getHourSelectOptionHtml();
        var minuteSelectOptionHtml = setting_DateTime.getMinuteSelectOptionHtml();
        // 開始時間-[時] 選單
        document.getElementById(gateStartTime_HourSelectId).innerHTML = hourSelectOptionHtlm;
        // 開始時間-[分] 選單
        document.getElementById(gateStartTime_MinuteSelectId).innerHTML = minuteSelectOptionHtml;

        var minuteSelectOptionHtml = setting_DateTime.getMinuteSelectOptionHtml();
        // 結束時間-[時] 選單
        document.getElementById(gateEndTime_HourSelectId).innerHTML = hourSelectOptionHtlm;
        // 結束時間-[分] 選單
        document.getElementById(gateEndTime_MinuteSelectId).innerHTML = minuteSelectOptionHtml;
        //#endregion



        if (!hasGate) {
            // 没有水閘門的區域, 隱藏這個網頁區塊
            electricWategateNote.style.display = 'none';
            electricWaterGateEquipmentArea.innerHTML = '本田區没有電動水閘門';
        }
        else {
            // 有水閘門的區域, 顯示這個網頁區塊
            electricWategateNote.style.display = '';

            var staff = zk1_TianDistric.staff;
            //#rgion 顯示水閘門
            // 可處理的水閘門集合
            var gates = Enumerable.From(staff.TagList).
                Where(m => (m.FieldId == zk1_TianDistric.fieldId || m.FieldId == setting.nothingFieldId)).
                Where(m => m.TagWay == setting_Staff.tagWayCode.ElectricWaterGate).
                OrderBy(m => m.FieldId).ThenBy(m => m.TagName).ToArray();
            // 可處理的水閘門數量
            var gateLength = gates.length;
            var contextHtml = '';
            for (var i = 0; i < gateLength; i += 5) {
                var tagGate = gates[i];
                var tagNames = tagGate.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.ElectricWaterGateName;  // 目前狀態
                var id2 = tagNames[0] + "--2_" + setting_Staff.tagWayCode.ElectricWaterGateName; // 控制模式
                var html = `
                <tr
                class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                <td class="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                    <span>`
                    + tagGate.Description +
                    `</span>
                </td>
                <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                    <span  id="`+ id2 + `"
                    class="rounded">控制模式</span>
                </td>
                <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                    <span  id="`+ id1 + `"
                    class="rounded">全開</span>
                </td>
                <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                    <a  href="#" onclick="zk1_TianDistric.setControlModeToScenario('`+ tagNames[0] + `--2')"><i title="情境控制"
                            class="ti ti-chart-candle text-lg text-gray-500 dark:text-gray-400"></i></a>
                    <a  href="#"  onclick="zk1_TianDistric.setControlModeToTiming('`+ tagNames[0] + `--2')"><i title="定時控制"
                            class="ti ti-alarm text-lg text-gray-500 dark:text-gray-400"></i></a>
                    <a  href="#"  onclick="zk1_TianDistric.setControlModeToManual('`+ tagNames[0] + `--2')"><i title="手動控制"
                            class="ti ti-hand-stop text-lg text-gray-500 dark:text-gray-400"></i></a><br/>
                    <a  href="#" onclick="zk1_TianDistric.openWatergate('`+ tagNames[0] + `--3')"><i title="開啟閘門"
                            class="ti ti-arrow-big-top text-lg text-red-500 dark:text-red-400"></i></a>
                    <a  href="#"  onclick="zk1_TianDistric.closeWatergate('`+ tagNames[0] + `--4')"><i title="關閉閘門"
                            class="ti ti-arrow-big-down text-lg text-red-500 dark:text-red-400"></i></a>
                    <a  href="#"  onclick="zk1_TianDistric.stopWatergateOpenClose('`+ tagNames[0] + `--5')"><i title="停止閘門"
                            class="ti ti-player-stop text-lg text-red-500 dark:text-red-400"></i></a>
                </td>
            </tr>
                `;

                //#region   擋水門
                if (tagGate.FieldId != setting.nothingFieldId) {
                    var blockTags = Enumerable.From(staff.TagList).
                        Where(m => (m.FieldId == zk1_TianDistric.fieldId)).
                        Where(m => m.TagWay == setting_Staff.tagWayCode.ElectricBlockWaterGate).
                        OrderBy(m => m.TagName).ToArray();
                    // window.alert(JSON.stringify(blockTags));
                    var blockTagLengh = blockTags.length;
                    if (blockTagLengh > 0) {
                        var html0 = ``;
                        for (var j = 0; j < blockTagLengh; j += 4) {
                            blockTagNames = blockTags[j].TagName.split('--');
                            var id1 = blockTagNames[0] + "--1_" + setting_Staff.tagWayCode.ElectricBlockWaterGateName;  // 目前狀態
                            html0 += `
                        <tr
                        class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                        <td class="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                            <span>`
                                + blockTags[j].Description +
                                `</span>
                        </td>
                        <td></td>
                        <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        <span  id="`+ id1 + `"
                        class="rounded">[狀態]</span>
                       </td>
                        <td  class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          
                          <a  href="#" onclick="zk1_TianDistric.openWatergate('`+ blockTagNames[0] + `--3')"><i title="開啟閘門"
                          class="ti ti-arrow-big-top text-lg text-red-500 dark:text-red-400"></i></a>
                  <a  href="#"  onclick="zk1_TianDistric.closeWatergate('`+ blockTagNames[0] + `--4')"><i title="關閉閘門"
                          class="ti ti-arrow-big-down text-lg text-red-500 dark:text-red-400"></i></a>
                  <a  href="#"  onclick="zk1_TianDistric.stopWatergateOpenClose('`+ blockTagNames[0] + `--5')"><i title="停止閘門"
                          class="ti ti-player-stop text-lg text-red-500 dark:text-red-400"></i></a>
                        </td>

                        </tr>
                        `
                                ;
                        }
                        html += html0;
                    }
                }
                //#endregion
                contextHtml += html;
            }
            electricWaterGateEquipmentArea.innerHTML = contextHtml;

            //#endregion
        }
        //#endregion


    },


    /**
     * @method setRealTimeWaterFlowInformation 取得流量資訊後顯示
     * @param {*} informations 
     */
    setRealTimeWaterFlowInformation: function (informations) {
        var data = Enumerable.From(informations).Where(m => m.TagWay == setting_Staff.tagWayCode.WaterFlowMeter).ToArray();
        var length = data.length;
        for (var i = 0; i < length; i++) {
            var tag = data[i];
            var id = tag.TagName + "_" + setting_Staff.tagWayCode.WaterFlowMeterName;
            var ele = document.getElementById(id);
            if (ele != null) {
                var realTimeData = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).
                    Where(
                        m => m.TagName == tag.TagName//.replace("--", "@@")   // Replace 可以拿掉
                    ).ToArray();
                if (realTimeData.length == 0) { continue; }
                //window.alert(realTimeData[0].TagName);
                ele.innerText = realTimeData[0].ValueString;
                setting_Style.changeTailWindClassNamesByValue(id, realTimeData[0].Value);
            }
        }

    },
    /**
     * @method initialRealTimeWaterFlowInformation 初始化即時流量清單 
     */
    initialRealTimeWaterFlowInformation: function () {
        // 用戶資料
        var staff = zk1_TianDistric.staff;
        // 即時流量清單區域 Id
        var realTimeWaterFlowInformationAreaId = 'realTimeWaterFlowInformationArea';
        // 即時流量清單區域
        var realTimeWaterFlowInformationArea = document.getElementById(realTimeWaterFlowInformationAreaId);
        // 能處理的Tag集合
        var tagList = Enumerable.From(staff.TagList).
            Where(m => m.FieldId == zk1_TianDistric.fieldId).
            Where(m => m.TagWay == setting_Staff.tagWayCode.WaterFlowMeter).OrderBy(m => m.FieldId).ThenBy(m => m.TagName).ToArray();
        // 測點的數量
        var tagLength = tagList.length;
        if (tagLength == 0) {
            realTimeWaterFlowInformationArea.innerHTML = "本田區没有即時流量設備"
        }
        else {
            // Html
            var contextHtml = '';
            for (var i = 0; i < tagLength; i += 2) {
                var tag = tagList[i];
                var tagNames = tag.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.WaterFlowMeterName;// 瞬時流量,id
                var id2 = tagNames[0] + "--2_" + setting_Staff.tagWayCode.WaterFlowMeterName;// 累計流量id

                var html = `
            <tr
              class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                 <td
                    class="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                      <span
                            class="relative inline-block self-center mr-2">
                             `+ tag.Description + `</span>
                </td>
                <td
                   class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                       <span id="`+ id1 + `" class="rounded">
                           [瞬時流量]
                       </span>
               </td>
                <td
                       class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                        <span id="`+ id2 + `" class="rounded">
                        [累計流量]
                        </span>
                 </td>
            </tr>
            `;
                contextHtml += html;
            }
            realTimeWaterFlowInformationArea.innerHTML = contextHtml;
        }
    },

    /**
     * @method setEarthMoistureInformationEquipmentList 取得溼度資料後顯示之 
     * @param {*} informations 
     */
    setEarthMoistureInformationEquipmentList: function (informations) {
        var tagList = Enumerable.From(informations).
            Where(m => m.TagWay == setting_Staff.tagWayCode.MoistureMeter).
            OrderBy(m => m.FieldId).
            ThenBy(m => m.TagName).
            ToArray();
        var tagLegth = tagList.length;
        for (var i = 0; i < tagLegth; i++) {
            var tag = tagList[i];
            var id = tag.TagName + "_" + setting_Staff.tagWayCode.MoistureMeterName;
            var ele = document.getElementById(id);
            if (ele != null) {
                var realTimeData = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).
                    Where(
                        m => m.TagName == tag.TagName//.replace('--', '@@') //// Replace 可以拿掉
                    ).ToArray();
                if (realTimeData.length == 0) { continue; }
                // window.alert(realTimeData[0].TagName)
                ele.innerText = realTimeData[0].ValueString;
                setting_Style.changeTailWindClassNamesByValue(id, realTimeData[0].Value);
            }
        }
    },


    /**
     * @method initialEarthMoistureInformationEquipmentList 初始化土壤資訊設備清單
     */
    initialEarthMoistureInformationEquipmentList: function () {
        //土壤設備區域Id  
        var earthMoistureEquipmentAreaId = 'earthMoistureEquipmentArea';
        //土壤設備區域
        var earthMoistureEquipmentArea = document.getElementById(earthMoistureEquipmentAreaId);


        // 溼度上下限設定區域Id
        var earthMoisturelimitAreaId = 'earthMoisturelimitArea'
        //溼度上下限設定區域
        var earthMoisturelimitArea = document.getElementById(earthMoisturelimitAreaId);
        // 用戶資料
        var staff = zk1_TianDistric.staff;
        // 能處理的Tag集合
        var tagList = Enumerable.From(staff.TagList).
            Where(m => m.FieldId == zk1_TianDistric.fieldId).
            Where(m => m.TagWay == setting_Staff.tagWayCode.MoistureMeter).
            OrderBy(m => m.FieldId).
            ThenBy(m => m.TagName).ToArray();
        // 測點的數量
        var tagLength = tagList.length;

        if (tagLength == 0) {

            earthMoisturelimitArea.style.display = 'none';
            earthMoistureEquipmentArea.innerHTML = '本田區没有土壤資訊設備'
        }
        else {
            var contextHtml = '';
            for (var i = 0; i < tagLength; i += 2) {
                var tag = tagList[i];
                var tagNames = tag.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.MoistureMeterName;   // 目前溼度
                var id2 = tagNames[0] + "--2_??" + setting_Staff.tagWayCode.MoistureMeterName;   // 最高溼度             
                var html = `
             <tr
                 class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
               <td
                 class="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                 <span
                     class="relative inline-block self-center mr-2">
                     `
                    + tag.Description +
                    `</span>
             </td>
             <td
                 class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400" id="`
                    +
                    id2
                    +
                    `">
                
             </td>
             <td
                 class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                 <span
                 class="rounded" id='`
                    +
                    id1
                    +
                    `'>+4.5</span>
             </td>
           </tr>
             `;
                contextHtml += html;
            }
            earthMoistureEquipmentArea.innerHTML = contextHtml;
        }
    },

    /**
     * @method setWaterLevelInformationEquipmentList 取得水位資訊後, 顯示之
     * @param {*} informations 
     */
    setWaterLevelInformationEquipmentList: function (informations) {
        var tagList = Enumerable.From(informations).
            Where(m => m.TagWay == setting_Staff.tagWayCode.WaterLevelGauge).
            OrderBy(m => m.FieldId).
            ThenBy(m => m.TagName).
            ToArray();
        var tagLegth = tagList.length;
        for (var i = 0; i < tagLegth; i++) {
            var tag = tagList[i];
            var id = tag.TagName + "_" + setting_Staff.tagWayCode.WaterLevelGaugeName;
            var ele = document.getElementById(id);
            if (ele != null) {
                var realTimeData = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).
                    Where(
                        m => m.TagName == tag.TagName//.replace('--', '@@') //replace 可以拿掉
                    ).ToArray();
                if (realTimeData.length == 0) { continue; }
                //  window.alert(realTimeData[0].TagName);
                ele.innerText = realTimeData[0].ValueString;
                setting_Style.changeTailWindClassNamesByValue(id, realTimeData[0].Value);
            }
        }
    },

    /**
     * @method initialWaterLevelInformationEquipmentList 初始化水位資訊設備清單
     */
    initialWaterLevelInformationEquipmentList: function () {
        // 水位上下限區域Id
        var waterLevelLimitAreaId = 'waterLevelLimitArea';
        // 水位上下限區域
        var waterLevelLimitArea = document.getElementById(waterLevelLimitAreaId);
        // 水位設備區域 Id
        var waterLevelEquipmentAreaId = 'waterLevelEquipmentArea';
        // 水位設備區域
        var waterLevelEquipmentArea = document.getElementById(waterLevelEquipmentAreaId);
        // 用戶資料
        var staff = zk1_TianDistric.staff;
        // 能處理的Tag集合
        var tagList = Enumerable.From(staff.TagList).
            Where(m => m.FieldId == zk1_TianDistric.fieldId).
            Where(m => m.TagWay == setting_Staff.tagWayCode.WaterLevelGauge).
            OrderBy(m => m.FieldId).
            ThenBy(m => m.TagName).
            ToArray();
        // 測點的數量
        var tagLength = tagList.length;
        if (tagLength == 0) {
            waterLevelLimitArea.style.display = 'none';
            waterLevelEquipmentArea.innerHTML = '本田區没有水位資訊設備';
        }
        else {
            var contextHtml = '';
            for (var i = 0; i < tagLength; i += 2) {
                var tag = tagList[i];
                var tagNames = tag.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.WaterLevelGaugeName;  // 目前水位
                var id2 = tagNames[0] + "--2_??" + setting_Staff.tagWayCode.WaterLevelGaugeName;  // 最高水位
                var html = `<tr
                class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                <td
                    class="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                    <span
                        class="relative inline-block self-center mr-2">
                    `+ tag.Description + `</span>
                </td>
                <td  id="`
                    +
                    id2
                    +
                    `"
                    class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                   
                </td>
                <td
                    class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                    <span  id="`+
                    id1
                    + `"
                       class="rounded">+4.5</span>
                </td>
            </tr>
                `;
                contextHtml += html;
            }
            waterLevelEquipmentArea.innerHTML = contextHtml;
        }
    },

    startUp: function (staff) {
        // 自Query 取得的 田區ID
        zk1_TianDistric.fieldId = zk1_TianDistric.getFieldIdFromQueryString();

        // 登入人員
        zk1_TianDistric.staff = staff;
        // 田區ID 是否受登入者管控
        var b = zk1_TianDistric.isFieldIdExist(zk1_TianDistric.fieldId);
        if (!b) {
            // 登必者没有管理這個 田區的權限,
            // 返回登入頁面 
            setting.toLoginPage();
        }
        else {
            zk1_TianDistric.fieldName = zk1_TianDistric.getFieldName();
        }
        // 初始化次標題
        zk1_TianDistric.initialSubtitle();
        // 初始化田區資訊 
        zk1_TianDistric.initialFieldInformation();
        // 初始化電動水閘門及水閘門設備
        zk1_TianDistric.initialElectricWaterGate();
        // 初始化即時流量資訊清單
        zk1_TianDistric.initialRealTimeWaterFlowInformation();
        // 初始化土壤資訊設備清單
        zk1_TianDistric.initialEarthMoistureInformationEquipmentList();
        // 初始化水位資訊設備清單
        zk1_TianDistric.initialWaterLevelInformationEquipmentList();

        //
        alarmHistoryQuery.startUp();

        tagValueHistoryQuery.startUp();


        monthlyTrend.startUp();
        dailyTrend.startUp();

        // 定時取得資料
        var alarmLevel = 0;
        var id = zk1_TianDistric.fieldId;

        if (zk1_TianDistric.staff.PermissionCode == setting_Staff.permissionCode.systemAdministration) {
            // 管理權限
            alarmLevel = 0;
        }
        else {
            alarmLevel = 2;// 將 ID 視為 field
        }
        getTagData.getData(
            this.getTagDataOk,
            this.getTagDataFailed,
            alarmLevel, id
        );

        // Connet to signalR Server 
        zk1_TianDistric.webSignalR = zk1_TianDistric.connectToSignalR();

    }

};



var dailyTrend = {
    chart: null,
    chartId: 'doughnut',
    chartErrId: 'doughnut_Err',
    startUp: function () {
        dailyTrend.chart = myChart_Doughnut;
        dailyTrend.getTrend();
    },
    getTrend: function () {
        var reqParameter = {
            FieldId: zk1_TianDistric.fieldId,
            //DeviceCode: [parseInt(document.getElementById(monthlyTrend.monthlyTrendDeviceTypeSelectorId).value)],
            DeviceCode: [101, 102, 103, 201, 202, 203],
        };
        dailyTrend.execute(reqParameter);
    },

    execute: function (reqParameter) {
        webApi.send(
            webApi.methods.get,
            dailyTrend.apiResourceName,
            reqParameter,// 没有Request 參數
            dailyTrend.beforeSendCallback,
            dailyTrend.okCallback,
            dailyTrend.failedCallback,
            dailyTrend.completeCallback,
        );
    },

    //#region Api
    apiResourceName: "Tag/GetDailyTrendData",
    beforeSendCallback: function () {

    },
    okCallback: function (result, resultText, status) {
        var realOk = webApi.isApiResultOK(result.ReturnCode);
        if (realOk) {
            var rtnData = Enumerable.From(result.Detail.Trends).OrderBy(m => m.DeviceCode).ToArray();
            var labels = Enumerable.From(rtnData).Select(m => m.Name).ToArray();
            var data = Enumerable.From(rtnData).Select(m => m.Value).ToArray();
            var backGroundColor = [];
            var hoverBackgroundColor = [];
            var borderColor = [];
            var chart = dailyTrend.chart;
            for (var i = 0; i < labels.length; i++) {
                backGroundColor[i] = chartjsExtends.colors[i].background;
                hoverBackgroundColor[i] = chartjsExtends.colors[i].background;
                borderColor[i] = chartjsExtends.colors[i].border;
            }
            chart.data.labels = labels;
            chart.data.datasets[0].data = data;
            chart.data.datasets[0].backgroundColor = backGroundColor;
            chart.data.datasets[0].hoverBackgroundColor = hoverBackgroundColor;
            chart.data.datasets[0].borderColor = borderColor
            chart.update();
            // document.getElementById(dailyTrend.chartId).style.display='';
            document.getElementById(dailyTrend.chartErrId).style.display = 'none';
        }
        else {
            var message = result.ReturnMessage + "(" + result.ReturnCode + ")";
            // document.getElementById(dailyTrend.chartId).style.display='none';
            document.getElementById(dailyTrend.chartErrId).style.display = '';
            document.getElementById(dailyTrend.chartErrId).innerHTML = message;
        }
    },
    failedCallback: function (err) {
        var message = err.statusText + "(" + err.status + ")";
        //document.getElementById(dailyTrend.chartId).style.display='none';
        document.getElementById(dailyTrend.chartErrId).style.display = '';
        document.getElementById(dailyTrend.chartErrId).innerHTML = message;
    },
    completeCallback: function () {

    }


    //#endregion




};
var monthlyTrend = {
    chart: null,
    monthlyTrendDeviceTypeSelectorId: 'monthlyTrendDeviceTypeSelector',
    chartId: 'lineChart',
    chartErrId: 'lineChart_Err',
    startUp: function () {
        monthlyTrend.chart = myChart_Line;
        monthlyTrend.getTrend()
        // monthlyTrend.initialDeviceTypeSelector();
    },
    initialDeviceTypeSelector: function () {
        // var optionHtml = setting_DeviceTypes.getSelectOptionHtml();
        //  document.getElementById(monthlyTrend.monthlyTrendDeviceTypeSelectorId).innerHTML = optionHtml;
        // document.getElementById(monthlyTrend.monthlyTrendDeviceTypeSelectorId).style.display='none';
        //monthlyTrend.getTrend();
    },
    getTrend: function () {
        var reqParameter = {
            FieldId: zk1_TianDistric.fieldId,
            //DeviceCode: [parseInt(document.getElementById(monthlyTrend.monthlyTrendDeviceTypeSelectorId).value)],
            DeviceCode: [101, 102, 103, 201, 202, 203],
        };
        monthlyTrend.execute(reqParameter);
    },


    execute: function (reqParameter) {
        webApi.send(
            webApi.methods.get,
            monthlyTrend.apiResourceName,
            reqParameter,// 没有Request 參數
            monthlyTrend.beforeSendCallback,
            monthlyTrend.okCallback,
            monthlyTrend.failedCallback,
            monthlyTrend.completeCallback,
        );
    },


    //#region call Api
    apiResourceName: "Tag/GetMonthlyTrendData",
    beforeSendCallback: function () {

    },
    okCallback: function (result, resultText, status) {
        var realOk = webApi.isApiResultOK(result.ReturnCode);
        if (realOk) {
            var rtnData = result.Detail.Trends;
            var chart = monthlyTrend.chart;
            var length = rtnData.length;
            chart.data.datasets = [];
            for (var i = 0; i < length; i++) {
                var json = JSON.stringify(myChart_Line_dataSetElementTemplate);
                var obj = JSON.parse(json);
                try {
                    obj.data = rtnData[i].Values;
                    obj.backgroundColor = chartjsExtends.colors[i].background;
                    obj.borderColor = chartjsExtends.colors[i].border;
                    obj.label = rtnData[i].Name;
                    chart.data.datasets.push(
                        obj
                    );
                    chart.update();
                }
                catch (ex) {

                }
            }
            //   document.getElementById(monthlyTrend.chartId).style.display='';
            document.getElementById(monthlyTrend.chartErrId).style.display = 'none';
        }
        else {
            var message = result.ReturnMessage + "(" + result.ReturnCode + ")";
            //   document.getElementById(monthlyTrend.chartId).style.display='none';
            document.getElementById(monthlyTrend.chartErrId).style.display = '';
            document.getElementById(monthlyTrend.chartErrId).innerHTML = message;
        }
    },
    failedCallback: function (err) {
        var message = err.statusText + "(" + err.status + ")";
        //   document.getElementById(monthlyTrend.chartId).style.display='none';
        document.getElementById(monthlyTrend.chartErrId).style.display = '';
        document.getElementById(monthlyTrend.chartErrId).innerHTML = message;
    },
    completeCallback: function () {

    }
    //#endregion

};



var tagValueHistoryQuery = {
    deviceTypeSelectId: 'tagValueHistoryQueryDeviceType',
    deviceSelectId: 'tagValueHistoryQueryDevice',
    tagValueHistoryStartDateId: 'tagValueHistoryStartDate',
    tagValueHistoryDurationId: 'tagValueHistoryDuration',
    datatableTagValueId: 'datatableTagValue',
    tagValueHistoryDisplayId: 'tagValueHistoryDisplay',
    tagValueHistoryErrTextId: 'tagValueHistoryErrText',
    startUp: function () {
        tagValueHistoryQuery.initialDeviceTypeSelector();
        tagValueHistoryQuery.initialDeviceNameSelector();
        //window.alert((new Date()).getDate());
        var myDate = new Date();
        myDate.setMonth(myDate.getMonth() - 1);
        // 起始時間預設值, 一個月前
        var text = setting_functions.getDateString(myDate);
        document.getElementById(tagValueHistoryQuery.tagValueHistoryStartDateId).value = text;

    },

    /**
     * @method initialDeviceTypeSelector 初始化 查詢測點值歷史的設備類型選項
     */
    initialDeviceTypeSelector: function () {
        var optionHtml = setting_DeviceTypes.getSelectOptionHtml();
        document.getElementById(tagValueHistoryQuery.deviceTypeSelectId).innerHTML = optionHtml;
    },

    /**
    *@method initialDeviceName 初始化查詢警報厯史的設備名稱選項 
    */
    initialDeviceNameSelector: function () {
        // 選到設備的的值 
        var value = document.getElementById(tagValueHistoryQuery.deviceTypeSelectId).value;
        var device = setting_DeviceTypes.getDeviceByCode(value);
        if (device == null) { return; }
        else {
            var deviceCode = device.code;
            var tags = zk1_TianDistric.staff.TagList;
            var devices = null;
            if (device.type() == setting_DeviceTypes.deviceType.tagValueUsag) {// 排水量, 灌溉量, 出水量等
                devices = Enumerable.From(tags).
                    Where(m => m.ValueUsage == deviceCode).
                    Where(m => m.FieldId == zk1_TianDistric.fieldId).
                    ToArray();
            }
            else /*if(deviceType==setting_DeviceTypes.deviceType.tagWay)*/ {  // 水位計, 溼度計, 水流計 等,.....
                devices = Enumerable.From(tags).
                    Where(m => m.TagWay == deviceCode).
                    Where(m => m.FieldId == zk1_TianDistric.fieldId).ToArray();
            }
            var length = devices.length;
            var html = ``;
            for (var i = 0; i < length; i++) {
                var device = devices[i]
                if (value == setting_DeviceTypes.deviceType.tagWay + setting_Staff.tagWayCode.MoistureMeter || // 溼度
                    value == setting_DeviceTypes.deviceType.tagWay + setting_Staff.tagWayCode.WaterLevelGauge) { //水位
                    if (device.TagName.includes('--2')) { continue; }

                }
                html += `<option value="` + device.TagName + `">[` + device.Description + `] ` + device.TagName + `</option>`
            }
            document.getElementById(tagValueHistoryQuery.deviceSelectId).innerHTML = html;
        }
    },
    toQuery: function () {
        var reqParameter = {
            DataDuration: 0,//int
            StartTime: '',
            TagName: '',
        };
        reqParameter.DataDuration = parseInt(document.getElementById(tagValueHistoryQuery.tagValueHistoryDurationId).value);
        reqParameter.StartTime = document.getElementById(tagValueHistoryQuery.tagValueHistoryStartDateId).value;
        reqParameter.TagName = document.getElementById(tagValueHistoryQuery.deviceSelectId).value
        tagValueHistoryQuery.execute(reqParameter);
    },
    //#region APi
    apiResourceName: 'Tag/GetTagValueHistoryList',
    execute: function (requestParameters) {
        //window.alert(JSON.stringify(requestParameters));
        webApi.send(
            webApi.methods.get,
            tagValueHistoryQuery.apiResourceName,
            requestParameters,// 没有Request 參數
            tagValueHistoryQuery.beforeSendCallback,
            tagValueHistoryQuery.okCallback,
            tagValueHistoryQuery.failedCallback,
            tagValueHistoryQuery.completeCallback,
        );
    },
    beforeSendCallback: function () {

    },
    okCallback: function (result, resultText, status) {
        var realOk = webApi.isApiResultOK(result.ReturnCode);
        if (realOk) {
            var rtnData = result.Detail.TagValueHistoryList;

            // dataTableNoAjax.data=zk1_UserManagement.managedStaffList.StaffList;   


            dataTableNoAjax.data = rtnData;
            dataTableNoAjax.columns = [

                { data: 'ValueTime' }, { data: 'DeviceTypeName' },
                { data: 'DeviceName' }, { data: 'ValueText', className: "text-right" }

            ];



            //  dataTableNoAjax.buttons.buttons=dataTableNoAjax_defaultButtons;
            $('#' + tagValueHistoryQuery.datatableTagValueId).DataTable(dataTableNoAjax);
            document.getElementById(tagValueHistoryQuery.tagValueHistoryDisplayId).style.display = '';
            document.getElementById(tagValueHistoryQuery.tagValueHistoryErrTextId).style.display = 'none';
        }
        else {
            var message = result.ReturnMessage + "(" + result.ReturnCode + ")";
            document.getElementById(tagValueHistoryQuery.tagValueHistoryDisplayId).style.display = 'none';
            document.getElementById(tagValueHistoryQuery.tagValueHistoryErrTextId).style.display = '';
            document.getElementById(tagValueHistoryQuery.tagValueHistoryErrTextId).innerHTML = message
        }
    },
    failedCallback: function (err) {
        var message = err.statusText + "(" + err.status + ")";
        document.getElementById(tagValueHistoryQuery.tagValueHistoryDisplayId).style.display = 'none';
        document.getElementById(tagValueHistoryQuery.tagValueHistoryErrTextId).style.display = '';
        document.getElementById(tagValueHistoryQuery.tagValueHistoryErrTextId).innerHTML = message
    },
    completeCallback: function () {

    }


    //#endregion

};


/**
 * @class alarmHistoryQuery 查詢歷史警報
 */
var alarmHistoryQuery = {
    deviceTypeSelectId: 'alarmHistoryQueryDeviceType',
    deviceSelectId: 'alarmHistoryQueryDevice',
    alarmHistoryStartDateId: 'alarmHistoryStartDate',
    alarmHistoryDurationId: 'alarmHistoryDuration',
    datatableAlarmHistoryId: 'datatableAlarmHistory',
    alarmHistoryDisplayId: 'alarmHistoryDisplay',
    alarmHistoryErrTextId: 'alarmHistoryErrText',

    startUp: function () {
        alarmHistoryQuery.initialDeviceTypeSelector();
        alarmHistoryQuery.initialDeviceNameSelector();
        var myDate = new Date();
        myDate.setMonth(myDate.getMonth() - 1);

        // 時間預設值(一個月前)
        var text = setting_functions.getDateString(myDate);
        document.getElementById(alarmHistoryQuery.alarmHistoryStartDateId).value = text;

    },
    /**
     * @method toQuery查詢資料
     */
    toQuery: function () {
        var reqParameter = {
            DataDuration: 0,//int
            StartTime: '',
            TagName: '',
        };
        reqParameter.DataDuration = parseInt(document.getElementById(alarmHistoryQuery.alarmHistoryDurationId).value);
        reqParameter.StartTime = document.getElementById(alarmHistoryQuery.alarmHistoryStartDateId).value;
        reqParameter.TagName = document.getElementById(alarmHistoryQuery.deviceSelectId).value
        alarmHistoryQuery.execute(reqParameter);
    },
    /**
     * @method initialDeviceTypeSelector 初始化 查詢警報歷史的設備類型選項
     */
    initialDeviceTypeSelector: function () {
        var optionHtml = setting_DeviceTypes.getSelectOptionHtml();
        document.getElementById(alarmHistoryQuery.deviceTypeSelectId).innerHTML = optionHtml;

    },

    /**
     *@method initialDeviceName 初始化查詢警報厯史的設備名稱選項 
     */
    initialDeviceNameSelector: function () {
        // 選到設備的的值 
        var value = document.getElementById(alarmHistoryQuery.deviceTypeSelectId).value;
        var device = setting_DeviceTypes.getDeviceByCode(value);
        if (device == null) { return; }
        else {
            var deviceCode = device.code;
            var tags = zk1_TianDistric.staff.TagList;
            var devices = null;
            if (device.type() == setting_DeviceTypes.deviceType.tagValueUsag) {// 排水量, 灌溉量, 出水量等
                devices = Enumerable.From(tags).
                    Where(m => m.ValueUsage == deviceCode).
                    Where(m => m.FieldId == zk1_TianDistric.fieldId).
                    ToArray();
            }
            else /*if(deviceType==setting_DeviceTypes.deviceType.tagWay)*/ {  // 水位計, 溼度計, 水流計 等,.....
                devices = Enumerable.From(tags).
                    Where(m => m.TagWay == deviceCode).
                    Where(m => m.FieldId == zk1_TianDistric.fieldId).ToArray();
            }
            var length = devices.length;
            var html = ``;
            for (var i = 0; i < length; i++) {
                var device = devices[i]
                if (value == setting_DeviceTypes.deviceType.tagWay + setting_Staff.tagWayCode.MoistureMeter || // 溼度
                    value == setting_DeviceTypes.deviceType.tagWay + setting_Staff.tagWayCode.WaterLevelGauge) { //水位
                    if (device.TagName.includes('--2')) { continue; }

                }
                html += `<option value="` + device.TagName + `">[` + device.Description + `] ` + device.TagName + `</option>`
            }
            document.getElementById(alarmHistoryQuery.deviceSelectId).innerHTML = html;
        }
    },

    //#region call Api
    apiResourceName: 'Alarm/GetAlarmHistoryList',
    execute: function (requestParameters) {
        //window.alert(JSON.stringify(requestParameters));
        webApi.send(
            webApi.methods.get,
            alarmHistoryQuery.apiResourceName,
            requestParameters,// 没有Request 參數
            alarmHistoryQuery.beforeSendCallback,
            alarmHistoryQuery.okCallback,
            alarmHistoryQuery.failedCallback,
            alarmHistoryQuery.completeCallback,
        );
    },
    beforeSendCallback: function () {

    },
    okCallback: function (result, resultText, status) {
        var realOk = webApi.isApiResultOK(result.ReturnCode);
        if (realOk) {
            var rtnData = result.Detail.AlarmHistoryList;
            dataTableNoAjax.data = rtnData;
            var length = rtnData.length;
            for (var i = 0; i < length; i++) {
                rtnData[i].AlarmStatusTextStyle = '';
                if (rtnData[i].AlarmStatus == setting_Alarm.alarmState.alarm) {
                    rtnData[i].AlarmStatusTextStyle = '<span class="text-red-500">' + rtnData[i].AlarmStatusText + '</span>';
                }
                else /*if(rtnData[i].AlarmState==setting_Alarm.alarmState.normal)*/ {
                    rtnData[i].AlarmStatusTextStyle = '<span class="text-blue-500">' + rtnData[i].AlarmStatusText + '</span>';
                }
            }

            dataTableNoAjax.columns = [

                { data: 'AlarmTime' },  // 警報時間
                { data: 'DeviceTypeName' },//設備類型
                { data: 'DeviceName' },//設備名稱
                { data: 'AlarmMinText', className: "text-right" },//警報最大值
                { data: 'AlarmMaxText', className: "text-right" },//警報最大值
                { data: 'ValueText', className: "text-right" },//監測數值
                { data: 'TagDescription' }, //說明
                { data: 'AlarmStatusTextStyle' }// 警報狀態
            ];

            //   dataTableNoAjax.buttons.buttons=dataTableNoAjax_defaultButtons;
            $('#' + alarmHistoryQuery.datatableAlarmHistoryId).DataTable(dataTableNoAjax);
            document.getElementById(alarmHistoryQuery.alarmHistoryDisplayId).style.display = '';
            document.getElementById(alarmHistoryQuery.alarmHistoryErrTextId).style.display = 'none';
        }
        else {
            var message = result.ReturnMessage + "(" + result.ReturnCode + ")";
            document.getElementById(alarmHistoryQuery.alarmHistoryDisplayId).style.display = 'none';
            document.getElementById(alarmHistoryQuery.alarmHistoryErrTextId).style.display = '';
            document.getElementById(alarmHistoryQuery.alarmHistoryErrTextId).innerHTML = message;
        }
    },
    failedCallback: function (err) {
        var message = err.statusText + "(" + err.status + ")";

        document.getElementById(alarmHistoryQuery.alarmHistoryDisplayId).style.display = 'none';
        document.getElementById(alarmHistoryQuery.alarmHistoryErrTextId).style.display = '';
        document.getElementById(alarmHistoryQuery.alarmHistoryErrTextId).innerHTML = message;
    },
    completeCallback: function () {

    }
    //#endregion




};


