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
    gateStateFlashValue:0,
    gateMustflash:true,
    setGateStateFlash:function(stateTags){
        zk1_TianDistric.gateStateFlashValue++;
         if(zk1_TianDistric.gateStateFlashValue==2){zk1_TianDistric.gateStateFlashValue=0;}
         var length=stateTags.length;
         for(var i=0;i<length;i++){
            var tag=stateTags[i];
            var tagName=tag.TagName;
            var dom=document.getElementById(tagName);
            if(dom==null){continue;}
            var jq = $("#" + tagName);
            var tagRs=Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).Where(m=>m.TagName==tagName).ToArray();
            if(tagRs.length==0){continue;}
           
            var tagValue=tagRs[0].Value;
            console.log(tagName, tagValue, new Date());
            jq.removeClass("text-red-500");
            jq.removeClass("text-blue-500");
            if(tagValue==zk1_TianDistric.gateMustflash){
                if( zk1_TianDistric.gateStateFlashValue==0){
                    jq.addClass("text-blue-500");
                }
                else{
                    jq.addClass("text-red-500");
                }
            }

            else{
                jq.addClass("text-red-500");
            }

         }
    },
    /**
     * @property waterGateWaterLevel_LowBoundSetId ?????? ?????????~????????????????????????
     */
    waterGateWaterLevel_LowBoundSetId: 'waterGateWaterLevel_LowBoundSet',

    /**
     * @property waterGateWaterLevel_LowBoundSetId ?????? ?????????~????????????????????????
     */
    waterGateEarthMoisture_LowBoundSetId: 'waterGateEarthMoisture_LowBoundSet',

    /**
     * @property gatetStartTime_HourSelectId ?????????????????????????????? ??????????????? Select
     * 
     */
    gatetStartTime_HourSelectId: 'gatetStartTime_HourSelect',


    /**
    * @property gateStartTime_MinuteSelectId ?????????????????????????????? ??????????????? Select
    * 
    */
    gateStartTime_MinuteSelectId: 'gateStartTime_MinuteSelect',

    /**
        * @property gateEndTime_HourSelectId ?????????????????????????????? ??????????????? Select
        * 
        */
    gateEndTime_HourSelectId: 'gateEndTime_HourSelect',

    /**
        * @property gateEndTime_HourSelectId ?????????????????????????????? ??????????????? Select
        * 
        */
    gateEndTime_MinuteSelectId: 'gateEndTime_MinuteSelect',
    /**
     * @method setMode1WaterLevelLowBound ???????????????????????? 
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
            else {   // ????????????, ????????????
                textElement.value = textElement.value + " ???????????????";
                textElement.focus();
            }
        }
        else {

        }
    },

    /**
    * @method setMode1EarthMoistureLowBound ?????????????????? 
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
            else {   // ????????????, ????????????
                textElement.value = textElement.value + " ???????????????";
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
        else {   // ???????????????

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
     * @method setControlModeToTiming ??????????????????????????????????????????
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
     * @method setControlModeToManual ??????????????????????????????????????????
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
     * @method setControlModeToScenario ??????????????????????????????????????????
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
     * @method openWatergate ???????????????
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
    * @method closeWatergate ???????????????
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
    * @method stopWatergateOpenClose ?????? ????????? ???/?????????
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
     * @method connectToSignalR ?????? SignalR
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
    getTagDataOk: function (rtnData, mainGate, alarmHistories, defindTagwayRelation) {

        var tagLists = Enumerable.From(rtnData).Where(m => m.FieldId == zk1_TianDistric.fieldId).ToArray();
        // ????????????
        zk1_TianDistric.setFieldInformation(tagLists);
        // ??????????????????
        zk1_TianDistric.setRealTimeWaterFlowInformation(tagLists);
        // ????????????????????????(??????)
        zk1_TianDistric.setEarthMoistureInformationEquipmentList(tagLists, defindTagwayRelation);
        // ????????????????????????
        zk1_TianDistric.setWaterLevelInformationEquipmentList(tagLists, defindTagwayRelation);
        // ???????????????
        tagLists = Enumerable.From(rtnData).Where(m => m.FieldId == zk1_TianDistric.fieldId).ToArray();
        zk1_TianDistric.setElectricWaterGate(tagLists, mainGate);

        //????????????????????????(??? Horizontal.html)
        horizontal.displayAlarmHistory(alarmHistories)

           //????????????????????????
        var waterGateStateTagList = Enumerable.From(rtnData).
         Where(m => m.TagWay == setting_Staff.tagWayCode.ElectricWaterGateState).
           ToArray();
       //??????/????????????     
       zk1_TianDistric.setGateStateFlash(waterGateStateTagList);


    },
    /** 
     * @method isFieldIdExist ??????????????? ID ?????????
    */
    isFieldIdExist: function (fieldId) {
        var staff = zk1_TianDistric.staff;
        //  window.alert(JSON.stringify(staff));
        // ???????????? ??????
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
     * @method hasFiledHasElectricWaterGate ?????????????????????????????????
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
     * @methodd ?????? ????????????
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
     * @method  getFieldIdFromQueryString ???Query String ?????? ??????ID
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
     * @method initialSubtitle ?????????????????? 
     */
    initialSubtitle: function () {
        var subTitleId = 'subTitle';
        document.getElementById(subTitleId).innerText = zk1_TianDistric.fieldName + "??????";
    },


    /**
     * @method setFieldInformation ??????????????????????????? ??? ????????? ????????????, ?????????????????????
     * @param {*} informations 
     */
    setFieldInformation: function (informations) {
        var data = Enumerable.From(informations).Where(m => m.ValueUsage !== setting_Staff.tagValueUsage.nothing).ToArray();
        var length = data.length;
        for (var i = 0; i < length; i++) {
            var tag = data[i];
            var id = "";
            // ?????????
            if (tag.ValueUsage == setting_Staff.tagValueUsage.waterIntake) {
                id = tag.FieldId + "_" + setting_Staff.tagValueUsage.waterIntakeName
            }
            // ?????????
            else if (tag.ValueUsage == setting_Staff.tagValueUsage.irrigation) {
                id = tag.FieldId + "_" + setting_Staff.tagValueUsage.irrigationName
            }
            // ?????????
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
     * @method initialInformationTitle ???????????????????????????
     */
    initialFieldInformation: function () {
        var staff = zk1_TianDistric.staff;
        var fieldList = staff.FieldsAdmList;
        //#region ????????????
        // ?????????????????????Id
        var fieldInformationTitleId = 'fieldInformationTitle';
        document.getElementById(fieldInformationTitleId).innerText = zk1_TianDistric.fieldName + "????????????";
        //window.alert(zk1_TianDistric.fieldName);
        //#endregion

        //#region ??????????????????
        //?????????????????????????????? ID
        var fieldInformationsId = 'fieldInformations';
        // ????????????????????? html
        var contextHtml = '';
        // ????????????????????????
        var fields = Enumerable.From(fieldList).Where(m => m.FieldId == zk1_TianDistric.fieldId).ToArray();
        //  window.alert(fields.length);
        // ???????????? 
        var fieldLength = fields.length;

        for (var i = 0; i < fieldLength; i++) {
            var field = fields[i];
            //window.alert(field.FieldName)
            // ????????? id
            var intakeId = field.FieldId + "_" + setting_Staff.tagValueUsage.waterIntakeName;
            // ????????? id
            var irrId = field.FieldId + "_" + setting_Staff.tagValueUsage.irrigationName;
            // ????????? Id
            var drainId = field.FieldId + "_" + setting_Staff.tagValueUsage.drainName;
            var html = `
            <tr
            class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
            <td id="fieldName"
                class="ti ti-table p-3 text-sm font-medium whitespace-nowrap dark:text-white">`
                + field.FieldName +
                `</td>
            <!--?????????-->
           
            <td title="?????????"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                <span id="`+ intakeId + `"
                class="rounded">[?????????]
               </span>
            </td>
            
            <!--?????????-->
            <td title="?????????"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
               <span id="`+ irrId + `"
               class="rounded" >[?????????]
               </span>
            </td>
           
            <!--?????????-->
            <td title="?????????"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
               <span id="`+ drainId + `"
               class="rounded">[?????????]
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
        // ???????????????????????????-???   ?????????  ID
        var gateStartTime_HourId = 'gateStartTime_Hour';
        // ???????????????????????????-???   ?????????  ID
        var gateStartTime_MinuteId = 'gateStartTime_Minute';
        // ???????????????????????????-???   ?????????  ID
        var gateEndTime_HourId = 'gateEndTime_Hour';
        // ???????????????????????????-???   ?????????  ID
        var gateEndTime_MinuteId = 'gateEndTime_Minute';
        // ?????? ????????????????????? ????????? Id
        var waterGateWaterLevel_LowBoundId = 'waterGateWaterLevel_LowBound';
        // ?????? ?????????????????? ????????? Id
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
                        m => m.TagName == tag.TagName//.replace('--','@@') // replace ????????????
                    ).ToArray();
                if (realTimeData.length == 0) { continue; }
                if (tag.TagName.split('--')[1] == 1) {// ??????
                    text = setting_Staff.waterGateState.getText(realTimeData[0].Value);
                }
                else if (tag.TagName.split('--')[1] == 2) { // ????????????
                    text = setting_Staff.waterGateControlMode.getText(realTimeData[0].Value);

                }
                ele.innerText = text;
                setting_Style.changeTailWindClassNamesByValue(id, realTimeData[0].Value - 1);
            }
        }

        // ???????????????????????????, ????????? ?????????????????????????????????
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
                    if (tag.TagName.split('--')[1] == 1) {// ??????
                        text = setting_Staff.waterGateState.getText(realTimeData[0].Value);
                    }
                    else if (tag.TagName.split('--')[1] == 2) { // ????????????
                        text = setting_Staff.waterGateControlMode.getText(realTimeData[0].Value);

                    }
                    ele.innerText = text;
                    setting_Style.changeTailWindClassNamesByValue(id, realTimeData[0].Value - 1);
                }
            }
            //#region ??????????????????
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
            //#region ?????? ????????????
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

            //#region  ?????? ????????????
            // ???
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
            // ???
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

            //#region ?????? ????????????
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
            // ???
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
     * @method initialElectricWaterGate ????????????????????????
     */
    initialElectricWaterGate: function () {
        // ???????????????????????????Id
        var electricWategateNoteId = 'electricWategateNote';
        // ???????????????????????????
        var electricWategateNote = document.getElementById(electricWategateNoteId);

        // ????????????????????????Id
        var electricWaterGateEquipmentAreaId = 'electricWaterGateEquipmentArea';
        // ????????????????????????
        var electricWaterGateEquipmentArea = document.getElementById(electricWaterGateEquipmentAreaId);
        //#region ??????????????????????????????, ???????????????
        var hasGate = zk1_TianDistric.hasFiledHasElectricWaterGate();
        // window.alert(hasGate);
        // ???????????????????????????-???   ???Select ID
        var gateStartTime_HourSelectId = 'gatetStartTime_HourSelect';
        // ???????????????????????????-???   ???Select ID
        var gateStartTime_MinuteSelectId = 'gateStartTime_MinuteSelect';
        // ???????????????????????????-???   ???Select ID
        var gateEndTime_HourSelectId = 'gateEndTime_HourSelect';
        // ???????????????????????????-???   ???Select ID
        var gateEndTime_MinuteSelectId = 'gateEndTime_MinuteSelect';



        //#region  ?????? ?????????: ????????????(?????????) ;  ?????????: ????????????(?????????) ?????????????????? 
        var hourSelectOptionHtlm = setting_DateTime.getHourSelectOptionHtml();
        var minuteSelectOptionHtml = setting_DateTime.getMinuteSelectOptionHtml();
        // ????????????-[???] ??????
        document.getElementById(gateStartTime_HourSelectId).innerHTML = hourSelectOptionHtlm;
        // ????????????-[???] ??????
        document.getElementById(gateStartTime_MinuteSelectId).innerHTML = minuteSelectOptionHtml;

        var minuteSelectOptionHtml = setting_DateTime.getMinuteSelectOptionHtml();
        // ????????????-[???] ??????
        document.getElementById(gateEndTime_HourSelectId).innerHTML = hourSelectOptionHtlm;
        // ????????????-[???] ??????
        document.getElementById(gateEndTime_MinuteSelectId).innerHTML = minuteSelectOptionHtml;
        //#endregion



        if (!hasGate) {
            // ????????????????????????, ????????????????????????
            electricWategateNote.style.display = 'none';
            electricWaterGateEquipmentArea.innerHTML = '??????????????????????????????';
        }
        else {
            // ?????????????????????, ????????????????????????
            electricWategateNote.style.display = '';

            var staff = zk1_TianDistric.staff;
            //#rgion ???????????????
            // ???????????????????????????
            var gates = Enumerable.From(staff.TagList).
                Where(m => (m.FieldId == zk1_TianDistric.fieldId || m.FieldId == setting.nothingFieldId)).
                Where(m => m.TagWay == setting_Staff.tagWayCode.ElectricWaterGate).
                OrderBy(m => m.FieldId).ThenBy(m => m.TagName).ToArray();
            // ???????????????????????????
            var gateLength = gates.length;
            var contextHtml = '';
            for (var i = 0; i < gateLength; i += 5) {
                var tagGate = gates[i];
                var tagNames = tagGate.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.ElectricWaterGateName;  // ????????????
                var id2 = tagNames[0] + "--2_" + setting_Staff.tagWayCode.ElectricWaterGateName; // ????????????
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
                    class="rounded">????????????</span>
                </td>
                <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                    <span  id="`+ id1 + `"
                    class="rounded">??????</span>
                </td>
                <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                    <a  href="#" onclick="zk1_TianDistric.setControlModeToScenario('`+ tagNames[0] + `--2')"><i title="????????????"
                            class="ti ti-chart-candle text-lg text-gray-500 dark:text-gray-400"></i></a>
                    <a  href="#"  onclick="zk1_TianDistric.setControlModeToTiming('`+ tagNames[0] + `--2')"><i title="????????????"
                            class="ti ti-alarm text-lg text-gray-500 dark:text-gray-400"></i></a>
                    <a  href="#"  onclick="zk1_TianDistric.setControlModeToManual('`+ tagNames[0] + `--2')"><i title="????????????"
                            class="ti ti-hand-stop text-lg text-gray-500 dark:text-gray-400"></i></a><br/>
                    <a  href="#" onclick="zk1_TianDistric.openWatergate('`+ tagNames[0] + `--3')"><i title="????????????"
                            class="ti ti-arrow-big-top text-lg text-red-500 dark:text-red-400" id="ST_`+tagNames[0]+`--3"></i></a>
                    <a  href="#"  onclick="zk1_TianDistric.closeWatergate('`+ tagNames[0] + `--4')"><i title="????????????"
                            class="ti ti-arrow-big-down text-lg text-red-500 dark:text-red-400" id="ST_`+ tagNames[0] +`--4"></i></a>
                    <a  href="#"  onclick="zk1_TianDistric.stopWatergateOpenClose('`+ tagNames[0] + `--5')"><i title="????????????"
                            class="ti ti-player-stop text-lg text-red-500 dark:text-red-400"></i></a>
                </td>
            </tr>
                `;

                //#region   ?????????
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
                            var id1 = blockTagNames[0] + "--1_" + setting_Staff.tagWayCode.ElectricBlockWaterGateName;  // ????????????
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
                        class="rounded">[??????]</span>
                       </td>
                        <td  class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          
                          <a  href="#" onclick="zk1_TianDistric.openWatergate('`+ blockTagNames[0] + `--3')"><i title="????????????"
                          class="ti ti-arrow-big-top text-lg text-red-500 dark:text-red-400" id="ST_`+ blockTagNames[0] +`--3"></i></a>
                  <a  href="#"  onclick="zk1_TianDistric.closeWatergate('`+ blockTagNames[0] + `--4')"><i title="????????????"
                          class="ti ti-arrow-big-down text-lg text-red-500 dark:text-red-400" id="ST_`+  blockTagNames[0] +`--4"></i></a>
                  <a  href="#"  onclick="zk1_TianDistric.stopWatergateOpenClose('`+ blockTagNames[0] + `--5')"><i title="????????????"
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
     * @method setRealTimeWaterFlowInformation ???????????????????????????
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
                        m => m.TagName == tag.TagName//.replace("--", "@@")   // Replace ????????????
                    ).ToArray();
                if (realTimeData.length == 0) { continue; }
                //window.alert(realTimeData[0].TagName);
                ele.innerText = realTimeData[0].ValueString;
                setting_Style.changeTailWindClassNamesByValue(id, realTimeData[0].Value);
            }
        }

    },
    /**
     * @method initialRealTimeWaterFlowInformation ??????????????????????????? 
     */
    initialRealTimeWaterFlowInformation: function () {
        // ????????????
        var staff = zk1_TianDistric.staff;
        // ???????????????????????? Id
        var realTimeWaterFlowInformationAreaId = 'realTimeWaterFlowInformationArea';
        // ????????????????????????
        var realTimeWaterFlowInformationArea = document.getElementById(realTimeWaterFlowInformationAreaId);
        // ????????????Tag??????
        var tagList = Enumerable.From(staff.TagList).
            Where(m => m.FieldId == zk1_TianDistric.fieldId).
            Where(m => m.TagWay == setting_Staff.tagWayCode.WaterFlowMeter).OrderBy(m => m.FieldId).ThenBy(m => m.TagName).ToArray();
        // ???????????????
        var tagLength = tagList.length;
        if (tagLength == 0) {
            realTimeWaterFlowInformationArea.innerHTML = "?????????????????????????????????"
        }
        else {
            // Html
            var contextHtml = '';
            for (var i = 0; i < tagLength; i += 2) {
                var tag = tagList[i];
                var tagNames = tag.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.WaterFlowMeterName;// ????????????,id
                var id2 = tagNames[0] + "--2_" + setting_Staff.tagWayCode.WaterFlowMeterName;// ????????????id

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
                           [????????????]
                       </span>
               </td>
                <td
                       class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                        <span id="`+ id2 + `" class="rounded">
                        [????????????]
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
     * @method setEarthMoistureInformationEquipmentList ?????????????????????????????? 
     * @param {*} informations 
     */
    setEarthMoistureInformationEquipmentList: function (informations, defindTagwayRelation) {
        var tagList = Enumerable.From(informations).
            Where(m => m.TagWay == setting_Staff.tagWayCode.MoistureMeter).
            OrderBy(m => m.FieldId).
            ThenBy(m => m.TagName).
            ToArray();
        var tagLegth = tagList.length;

        var fieldId = zk1_TianDistric.fieldId;

        // ?????????????????????
        var definedMoistureMeterCode = setting_Staff.tagWayCode.DefinedMoistureMeter;

        var defineTags = Enumerable.From(zk1_TianDistric.staff.DefinedTagWayTagListUnitList).
            Where(x => x.TagWayCode == definedMoistureMeterCode).
            OrderBy(x => x.TagName).ToArray();

        var defineLength = defineTags.length;


        for (var i = 0; i < tagLegth; i++) {
            var tag = tagList[i];
            var id = tag.TagName + "_" + setting_Staff.tagWayCode.MoistureMeterName;

            var ele = document.getElementById(id);
            if (ele != null) {
                var realTimeData = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).
                    Where(
                        m => m.TagName == tag.TagName
                    ).ToArray();
                if (realTimeData.length == 0) { continue; }
                // window.alert(realTimeData[0].TagName)
                ele.innerText = realTimeData[0].ValueString;
                setting_Style.changeTailWindClassNamesByValue(id, realTimeData[0].Value);
            }



        }

        for (var i = 0; i < defineLength; i++) {
            var id = defineTags[i].TagName + "_" + setting_Staff.tagWayCode.DefinedMoistureMeterName;
            var rowId = id + "_row";
            var ele = document.getElementById(id);
            if (ele != null) {
                var tags = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).Where(
                    m => m.TagName == defineTags[i].TagName
                ).ToArray();
                if (tags.length == 0) { continue; }
                ele.innerText = tags[0].ValueString;
                setting_Style.changeTailWindClassNamesByValue(id, tags[0].Value);
            }
            var hasDefine = Enumerable.From(defindTagwayRelation).Where(
                m => m.TagName == defineTags[i].TagName && m.FieldId == fieldId
            )
                .ToArray().length > 0;
            if (hasDefine) {
                document.getElementById(rowId).style.display = '';
            }
            else {
                document.getElementById(rowId).style.display = 'none';
            }

        }
    },


    /**
     * @method initialEarthMoistureInformationEquipmentList ?????????????????????????????????
     */
    initialEarthMoistureInformationEquipmentList: function () {
        //??????????????????Id  
        var earthMoistureEquipmentAreaId = 'earthMoistureEquipmentArea';
        //??????????????????
        var earthMoistureEquipmentArea = document.getElementById(earthMoistureEquipmentAreaId);
        // ?????????????????????
        var definedMoistureMeterCode = setting_Staff.tagWayCode.DefinedMoistureMeter;

        // ???????????????????????????Id
        var earthMoisturelimitAreaId = 'earthMoisturelimitArea'
        //???????????????????????????
        var earthMoisturelimitArea = document.getElementById(earthMoisturelimitAreaId);
        // ????????????
        var staff = zk1_TianDistric.staff;
        // ????????????Tag??????
        var tagList = Enumerable.From(staff.TagList).
            Where(m => m.FieldId == zk1_TianDistric.fieldId).
            Where(m => m.TagWay == setting_Staff.tagWayCode.MoistureMeter).
            OrderBy(m => m.FieldId).
            ThenBy(m => m.TagName).ToArray();
        // ???????????????
        var tagLength = tagList.length;

        var defineTags = Enumerable.From(staff.DefinedTagWayTagListUnitList).
            Where(x => x.TagWayCode == definedMoistureMeterCode).
            OrderBy(x => x.TagName).ToArray();

        var defineLength = defineTags.length;
        /*
        if (tagLength + defineLength == 0) {

            earthMoisturelimitArea.style.display = 'none';
            earthMoistureEquipmentArea.innerHTML = '?????????????????????????????????'
        }
        else*/ {
            var contextHtml = '';
            for (var i = 0; i < tagLength; i += 2) {
                var tag = tagList[i];
                var tagNames = tag.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.MoistureMeterName;   // ????????????
                var id2 = tagNames[0] + "--2_??" + setting_Staff.tagWayCode.MoistureMeterName;   // ????????????             
                var html = `
                <tr  class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                   <td class="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                      <span class="relative inline-block self-center mr-2">`+ tag.Description + `</span>
                   </td>
                   <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400" id="`+ id2 + `">
                
                   </td>
                   <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                      <span class="rounded" id='` + id1 + `'>+4.5</span>
                   </td>
                </tr>
             `;
                contextHtml += html;
            }
            for (var i = 0; i < defineLength; i++) {
                var tag = defineTags[i];
                var tagName = tag.TagName;
                var id = tagName + "_" + setting_Staff.tagWayCode.DefinedMoistureMeterName;   // ????????????
                var rowId = id + "_row"
                var html = `
                <tr  style='display:none' id='`+ rowId + `' class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                   <td class="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                      <span class="relative inline-block self-center mr-2">`+ tag.TagDescription + `</span>
                   </td>
                   <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400" >
                
                   </td>
                   <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                      <span class="rounded" id='` + id + `'>[??????]</span>
                   </td>
                </tr>
             `;
                contextHtml += html;
            }

            earthMoistureEquipmentArea.innerHTML = contextHtml;
        }
    },

    /**
     * @method setWaterLevelInformationEquipmentList ?????????????????????, ?????????
     * @param {*} informations 
     */
    setWaterLevelInformationEquipmentList: function (informations, defindTagwayRelation) {
        var tagList = Enumerable.From(informations).
            Where(m => m.TagWay == setting_Staff.tagWayCode.WaterLevelGauge).
            OrderBy(m => m.FieldId).
            ThenBy(m => m.TagName).
            ToArray();
        var tagLegth = tagList.length;
        var fieldId = zk1_TianDistric.fieldId;
        // ???????????????
        var definedWaterLevelGaugeCode = setting_Staff.tagWayCode.DefinedWaterLevelGauge;
        var defineTags = Enumerable.From(zk1_TianDistric.staff.DefinedTagWayTagListUnitList).
            Where(x => x.TagWayCode == definedWaterLevelGaugeCode).
            OrderBy(x => x.TagName).ToArray();

        var defineLength = defineTags.length;

        for (var i = 0; i < tagLegth; i++) {
            var tag = tagList[i];
            var id = tag.TagName + "_" + setting_Staff.tagWayCode.WaterLevelGaugeName;
            var ele = document.getElementById(id);
            if (ele != null) {
                var realTimeData = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).
                    Where(
                        m => m.TagName == tag.TagName//.replace('--', '@@') //replace ????????????
                    ).ToArray();
                if (realTimeData.length == 0) { continue; }
                //  window.alert(realTimeData[0].TagName);
                ele.innerText = realTimeData[0].ValueString;
                setting_Style.changeTailWindClassNamesByValue(id, realTimeData[0].Value);
            }
        }

        for (var i = 0; i < defineLength; i++) {
            var id = defineTags[i].TagName + "_" + setting_Staff.tagWayCode.DefinedWaterLevelGaugeName;
            var rowId = id + "_row";
            var ele = document.getElementById(id);
            if (ele != null) {
                var tags = Enumerable.From(zk1_TianDistric.realTimeTagDataFromSignalR).Where(
                    m => m.TagName == defineTags[i].TagName
                ).ToArray();
                if (tags.length == 0) { continue; }
                ele.innerText = tags[0].ValueString;
                setting_Style.changeTailWindClassNamesByValue(id, tags[0].Value);
            }
            var hasDefine = Enumerable.From(defindTagwayRelation).Where(
                m => m.TagName == defineTags[i].TagName && m.FieldId == fieldId
            ).ToArray().length > 0;
            if (hasDefine) {
                document.getElementById(rowId).style.display = '';
            }
            else {
                document.getElementById(rowId).style.display = 'none';
            }

        }
    },

    /**
     * @method initialWaterLevelInformationEquipmentList ?????????????????????????????????
     */
    initialWaterLevelInformationEquipmentList: function () {
        // ?????????????????????Id
        var waterLevelLimitAreaId = 'waterLevelLimitArea';
        // ?????????????????????
        var waterLevelLimitArea = document.getElementById(waterLevelLimitAreaId);
        // ?????????????????? Id
        var waterLevelEquipmentAreaId = 'waterLevelEquipmentArea';
        // ????????????????????????
        var defineWaterLevelGaugeCode = setting_Staff.tagWayCode.DefinedWaterLevelGauge;
        // ??????????????????
        var waterLevelEquipmentArea = document.getElementById(waterLevelEquipmentAreaId);
        // ????????????
        var staff = zk1_TianDistric.staff;
        // ????????????Tag??????
        var tagList = Enumerable.From(staff.TagList).
            Where(m => m.FieldId == zk1_TianDistric.fieldId).
            Where(m => m.TagWay == setting_Staff.tagWayCode.WaterLevelGauge).
            OrderBy(m => m.FieldId).
            ThenBy(m => m.TagName).
            ToArray();
        // ???????????????
        var tagLength = tagList.length;
        var defineTags = Enumerable.From(staff.DefinedTagWayTagListUnitList).
            Where(x => x.TagWayCode == defineWaterLevelGaugeCode).
            OrderBy(x => x.TagName).ToArray();
        var defineTagLength = defineTags.length;
      /*  if (tagLength == 0) {
            waterLevelLimitArea.style.display = 'none';
            waterLevelEquipmentArea.innerHTML = '?????????????????????????????????';
        }
        else*/ {
            var contextHtml = '';
            for (var i = 0; i < tagLength; i += 2) {
                var tag = tagList[i];
                var tagNames = tag.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.WaterLevelGaugeName;  // ????????????
                var id2 = tagNames[0] + "--2_??" + setting_Staff.tagWayCode.WaterLevelGaugeName;  // ????????????
                var html =
                    `<tr class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                   <td class="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                      <span class="relative inline-block self-center mr-2">
                        `+ tag.Description + `</span>
                   </td>
                   <td  id="`+ id2 + `" class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                   
                   </td>
                   <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                    <span  id="`+ id1 + `" class="rounded">[??????]</span>
                   </td>
                </tr>
                `;
                contextHtml += html;
            }
            for (var i = 0; i < defineTagLength; i++) { // ???????????????
                var tag = defineTags[i];
                var tagName = tag.TagName;
                var id = tagName + "_" + setting_Staff.tagWayCode.DefinedWaterLevelGaugeName;
                var rowId = id + "_row"
                var html = `
                <tr style='display:none' id='`+ rowId + `' class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                      <td class="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                          <span class="relative inline-block self-center mr-2">`+ tag.TagDescription + `</span>
                      </td>
                      <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400" >
                      </td>
                      <td  class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                         <span class="rounded"" id='`+ id + `'>[??????]</span>
                      </td>
                </tr>
              `;
                contextHtml += html;
            }
            waterLevelEquipmentArea.innerHTML = contextHtml;
        }
    },

    startUp: function (staff) {
        // ???Query ????????? ??????ID
        zk1_TianDistric.fieldId = zk1_TianDistric.getFieldIdFromQueryString();

        // ????????????
        zk1_TianDistric.staff = staff;
        // ??????ID ????????????????????????
        var b = zk1_TianDistric.isFieldIdExist(zk1_TianDistric.fieldId);
        if (!b) {
            // ??????????????????????????? ???????????????,
            // ?????????????????? 
            setting.toLoginPage();
        }
        else {
            zk1_TianDistric.fieldName = zk1_TianDistric.getFieldName();
        }
        // ??????????????????
        zk1_TianDistric.initialSubtitle();
        // ????????????????????? 
        zk1_TianDistric.initialFieldInformation();
        // ??????????????????????????????????????????
        zk1_TianDistric.initialElectricWaterGate();
        // ?????????????????????????????????
        zk1_TianDistric.initialRealTimeWaterFlowInformation();
        // ?????????????????????????????????
        zk1_TianDistric.initialEarthMoistureInformationEquipmentList();
        // ?????????????????????????????????
        zk1_TianDistric.initialWaterLevelInformationEquipmentList();

        //
        alarmHistoryQuery.startUp();

        tagValueHistoryQuery.startUp();


        monthlyTrend.startUp();
        dailyTrend.startUp();

        // ??????????????????
        var alarmLevel = 0;
        var id = zk1_TianDistric.fieldId;

        if (zk1_TianDistric.staff.PermissionCode == setting_Staff.permissionCode.systemAdministration) {
            // ????????????
            alarmLevel = 0;
        }
        else {
            alarmLevel = 2;// ??? ID ?????? field
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
            reqParameter,// ??????Request ??????
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
            reqParameter,// ??????Request ??????
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
    tagValueHistoryErrId:'tagValueHistoryErr',
    tagValueHistoryErrTextId: 'tagValueHistoryErrText',
    tagValueHistoryWaitingId:'tagValueHistoryWaiting',

    startUp: function () {
        tagValueHistoryQuery.initialDeviceTypeSelector();
        tagValueHistoryQuery.initialDeviceNameSelector();
        //window.alert((new Date()).getDate());
        var myDate = new Date();
        myDate.setMonth(myDate.getMonth() - 1);
        // ?????????????????????, ????????????
        var text = setting_functions.getDateString(myDate);
        document.getElementById(tagValueHistoryQuery.tagValueHistoryStartDateId).value = text;

    },

    /**
     * @method initialDeviceTypeSelector ????????? ??????????????????????????????????????????
     */
    initialDeviceTypeSelector: function () {
        var optionHtml = setting_DeviceTypes.getSelectOptionHtml();
        document.getElementById(tagValueHistoryQuery.deviceTypeSelectId).innerHTML = optionHtml;
    },

    /**
    *@method initialDeviceName ???????????????????????????????????????????????? 
    */
    initialDeviceNameSelector: function () {
        // ????????????????????? 
        var value = document.getElementById(tagValueHistoryQuery.deviceTypeSelectId).value;
        var device = setting_DeviceTypes.getDeviceByCode(value);
        if (device == null) { return; }
        else {
            var deviceCode = device.code;
            var tags = zk1_TianDistric.staff.TagList;
            var devices = null;
            if (device.type() == setting_DeviceTypes.deviceType.tagValueUsag) {// ?????????, ?????????, ????????????
                devices = Enumerable.From(tags).
                    Where(m => m.ValueUsage == deviceCode).
                    Where(m => m.FieldId == zk1_TianDistric.fieldId).
                    ToArray();
            }
            else /*if(deviceType==setting_DeviceTypes.deviceType.tagWay)*/ {  // ?????????, ?????????, ????????? ???,.....
                devices = Enumerable.From(tags).
                    Where(m => m.TagWay == deviceCode).
                    Where(m => m.FieldId == zk1_TianDistric.fieldId).ToArray();
                // ???????????????
                if (deviceCode == setting_Staff.tagWayCode.MoistureMeter) {  // ??????
                    // ????????????????????????
                    var tempDevice = Enumerable.From(tags).
                        Where(m => m.TagWay == setting_Staff.tagWayCode.DefinedMoistureMeter).
                        ToArray();
                        devices=devices.concat(tempDevice);
                }
                else if (deviceCode == setting_Staff.tagWayCode.WaterLevelGauge) {  // ??????
                    var tempDevice = Enumerable.From(tags).
                        Where(m => m.TagWay == setting_Staff.tagWayCode.DefinedWaterLevelGauge).
                        ToArray();
                        devices=devices.concat(tempDevice);
                }
            }
            var length = devices.length;
            var html = ``;
            for (var i = 0; i < length; i++) {
                var device = devices[i]
                if (value == setting_DeviceTypes.deviceType.tagWay + setting_Staff.tagWayCode.MoistureMeter || // ??????
                    value == setting_DeviceTypes.deviceType.tagWay + setting_Staff.tagWayCode.WaterLevelGauge) { //??????
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
            FieldId:zk1_TianDistric.fieldId,
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
            requestParameters,// ??????Request ??????
            tagValueHistoryQuery.beforeSendCallback,
            tagValueHistoryQuery.okCallback,
            tagValueHistoryQuery.failedCallback,
            tagValueHistoryQuery.completeCallback,
        );
    },
    beforeSendCallback: function () {
        tagValueHistoryQuery.displayWaiting();
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
           // document.getElementById(tagValueHistoryQuery.tagValueHistoryDisplayId).style.display = '';
            //document.getElementById(tagValueHistoryQuery.tagValueHistoryErrTextId).style.display = 'none';
            tagValueHistoryQuery.displayOk();
        }
        else {
            var message = result.ReturnMessage + "(" + result.ReturnCode + ")";
            //document.getElementById(tagValueHistoryQuery.tagValueHistoryDisplayId).style.display = 'none';
            //document.getElementById(tagValueHistoryQuery.tagValueHistoryErrTextId).style.display = '';
            //document.getElementById(tagValueHistoryQuery.tagValueHistoryErrTextId).innerHTML = message

            tagValueHistoryQuery.displayErr(message);
        }
    },
    failedCallback: function (err) {
        var message = err.statusText + "(" + err.status + ")";
      //  document.getElementById(tagValueHistoryQuery.tagValueHistoryDisplayId).style.display = 'none';
        //document.getElementById(tagValueHistoryQuery.tagValueHistoryErrTextId).style.display = '';
        //document.getElementById(tagValueHistoryQuery.tagValueHistoryErrTextId).innerHTML = message
        tagValueHistoryQuery.displayErr(message);
    },
    completeCallback: function () {

    },

    hideAllAreas:function(){
        tagValueHistoryQuery.hideMainDisplayer();
        tagValueHistoryQuery.hideWaiting();
        tagValueHistoryQuery.hideErr();
    },

    hideMainDisplayer:function(){
        document.getElementById(tagValueHistoryQuery.tagValueHistoryDisplayId).style.display='none';
    },

    hideWaiting:function(){
        document.getElementById(tagValueHistoryQuery.tagValueHistoryWaitingId).style.display='none';
    },
    displayWaiting:function(){
        tagValueHistoryQuery.hideAllAreas();
        document.getElementById(tagValueHistoryQuery.tagValueHistoryWaitingId).style.display='';
    },

    hideErr:function(){
        document.getElementById(tagValueHistoryQuery.tagValueHistoryErrId).style.display='none';
    },
    displayErr:function(text){
        tagValueHistoryQuery.hideAllAreas();
        document.getElementById(tagValueHistoryQuery.tagValueHistoryErrId).style.display='';
        document.getElementById(tagValueHistoryQuery.tagValueHistoryErrTextId).innerText=text;
    },
    
    displayOk:function(){
        tagValueHistoryQuery.hideAllAreas();
        document.getElementById(tagValueHistoryQuery.tagValueHistoryDisplayId).style.display='';
    }

    //#endregion

};


/**
 * @class alarmHistoryQuery ??????????????????
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

        // ???????????????(????????????)
        var text = setting_functions.getDateString(myDate);
        document.getElementById(alarmHistoryQuery.alarmHistoryStartDateId).value = text;

    },
    /**
     * @method toQuery????????????
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
     * @method initialDeviceTypeSelector ????????? ???????????????????????????????????????
     */
    initialDeviceTypeSelector: function () {
        var optionHtml = setting_DeviceTypes.getSelectOptionHtml();
        document.getElementById(alarmHistoryQuery.deviceTypeSelectId).innerHTML = optionHtml;

    },

    /**
     *@method initialDeviceName ???????????????????????????????????????????????? 
     */
    initialDeviceNameSelector: function () {
        // ????????????????????? 
        var value = document.getElementById(alarmHistoryQuery.deviceTypeSelectId).value;
        var device = setting_DeviceTypes.getDeviceByCode(value);
        if (device == null) { return; }
        else {
            var deviceCode = device.code;
            var tags = zk1_TianDistric.staff.TagList;
            var devices = null;
            if (device.type() == setting_DeviceTypes.deviceType.tagValueUsag) {// ?????????, ?????????, ????????????
                devices = Enumerable.From(tags).
                    Where(m => m.ValueUsage == deviceCode).
                    Where(m => m.FieldId == zk1_TianDistric.fieldId).
                    ToArray();
            }
            else /*if(deviceType==setting_DeviceTypes.deviceType.tagWay)*/ {  // ?????????, ?????????, ????????? ???,.....
                devices = Enumerable.From(tags).
                    Where(m => m.TagWay == deviceCode).
                    Where(m => m.FieldId == zk1_TianDistric.fieldId).ToArray();
            }
            var length = devices.length;
            var html = ``;
            for (var i = 0; i < length; i++) {
                var device = devices[i]
                if (value == setting_DeviceTypes.deviceType.tagWay + setting_Staff.tagWayCode.MoistureMeter || // ??????
                    value == setting_DeviceTypes.deviceType.tagWay + setting_Staff.tagWayCode.WaterLevelGauge) { //??????
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
            requestParameters,// ??????Request ??????
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

                { data: 'AlarmTime' },  // ????????????
                { data: 'DeviceTypeName' },//????????????
                { data: 'DeviceName' },//????????????
                { data: 'AlarmMinText', className: "text-right" },//???????????????
                { data: 'AlarmMaxText', className: "text-right" },//???????????????
                { data: 'ValueText', className: "text-right" },//????????????
                { data: 'TagDescription' }, //??????
                { data: 'AlarmStatusTextStyle' }// ????????????
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


