
document.write('<script src="assets/libs/jquery/jquery.min.js"></script>')
//document.write('<script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>');
document.write('<script src="assets/libs/vue/vue.global.js"></script>');
document.write('<script src="assets/js/setting.js"></script>');
document.write('<script src="assets/js/webApi.js"></script>');
//document.write('<script src="assets/js/linq.js"></script>');
//document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/linq.js/2.2.0.2/linq.min.js" integrity="sha512-YjfMqQiOsDn17vJOLyrgFesm/wE36jyZIrYbmY4ChlFo+dxaAanQdo4xYWOAGQIDHQ9G5sIHTV4i5V4nzn/sQg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>')
document.write('<script src="assets/js/getTagData.js"></script>')
document.write('<script src="assets/js/webSignalR.js"></script>');

var index = {
    staff: null,
    webSignalR: null,
    realTimeTagDataFromSignalR: null,
    setRealTimeTagDataFromSignalR: function (datas) {
        index.realTimeTagDataFromSignalR = JSON.parse(JSON.stringify(datas));
        //   console.log("index:" +JSON.stringify(datas) );
    },
    gateStateFlashValue:0,
    gateMustflash:true,
    setGateStateFlash:function(stateTags){
         index.gateStateFlashValue++;
         if(index.gateStateFlashValue==2){index.gateStateFlashValue=0;}
         var length=stateTags.length;
         for(var i=0;i<length;i++){
            var tag=stateTags[i];
            var tagName=tag.TagName;
            var dom=document.getElementById(tagName);
            if(dom==null){continue;}
            var jq = $("#" + tagName);
            var tagRs=Enumerable.From(index.realTimeTagDataFromSignalR).Where(m=>m.TagName==tagName).ToArray();
            if(tagRs.length==0){continue;}
           
            var tagValue=tagRs[0].Value;
            console.log(tagName, tagValue, new Date());
            jq.removeClass("text-red-500");
            jq.removeClass("text-blue-500");
            if(tagValue==index.gateMustflash){
                if( index.gateStateFlashValue==0){
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

    // ????????? Model
    getDataErrObj: {
        statusText: "",
        statusCode: ""
    },

    /**
    * @method getTagByTagName  get tag via tag Name
    * @param {*} tagName 
    * @returns 
    */
    getTagByTagName: function (tagName) {
        var tags = Enumerable.From(index.staff.TagList).Where(m => m.TagName == tagName).ToArray();
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
        var tag = index.getTagByTagName(tagName);
        if (tag != null) {

            setting_Staff.waterGateControl.setWaterGateControlModeToTimingMode(tag, index.webSignalR);
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
        var tag = index.getTagByTagName(tagName);
        if (tag != null) {
            setting_Staff.waterGateControl.setWaterGateControlModeToManualMode(tag, index.webSignalR)
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
        var tag = index.getTagByTagName(tagName);
        if (tag != null) {
            setting_Staff.waterGateControl.setWaterGateControlModeToScenarioMode(tag, index.webSignalR);
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
        var tag = index.getTagByTagName(tagName);
        //  console.log("openWatergate:" + JSON.stringify(tag))
        if (tag != null) {
            setting_Staff.waterGateControl.openWatergate(tag, index.webSignalR);
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
        var tag = index.getTagByTagName(tagName);
        if (tag != null) {
            setting_Staff.waterGateControl.closeWatergate(tag, index.webSignalR);
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
        var tag = index.getTagByTagName(tagName);
        if (tag != null) {
            setting_Staff.waterGateControl.stopWatergateOpenClose(tag, index.webSignalR);
        }
    },


    /**
         * @method connectToSignalR ?????? SignalR
         * @returns 
         */
    connectToSignalR: function () {
        try {

            webSignalR.connect(index.setRealTimeTagDataFromSignalR);
            return webSignalR;
        }
        catch (ex) {
            //window.alert("err:" + ex);
            return null;
        }
    },



    /**
     * @method setWaterGateInformation ????????????????????????
     * @param {*} rtnData 
     * @param {*} mainGate 
     */
    setWaterGateInformation: function (rtnData, mainGate) {
        var gates = Enumerable.From(rtnData).
            Where(m => m.TagWay == setting_Staff.tagWayCode.ElectricWaterGate || m.TagWay == setting_Staff.tagWayCode.ElectricBlockWaterGate).
            OrderBy(m => m.FieldId).ThenBy(m => m.TagName).
            ToArray();
        // ?????????  

        for (var i = 0; i < gates.length; i++) {
            var id = '';
            if (gates[i].TagWay == setting_Staff.tagWayCode.ElectricWaterGate) {
                id = gates[i].TagName + "_" + setting_Staff.tagWayCode.ElectricWaterGateName;
            }
            else {
                id = gates[i].TagName + "_" + setting_Staff.tagWayCode.ElectricBlockWaterGateName;
            }
            var c = gates[i].TagName.split('--')[1];

            var ele = document.getElementById(id);
            if (ele != null) { //????????????

                var tags = Enumerable.From(index.realTimeTagDataFromSignalR).Where(
                    m => m.TagName == gates[i].TagName//.replace("--","@@") // ?????? replace ????????????
                ).ToArray();
                if (tags.length == 0) { continue; }
                //window.alert(tags[0].TagName);
                if (c == 2) {
                    //ele.innerText = gates[i].RealValueText;// setting_Staff.getPrecisionFloat(flows[i].RealValue,2).toString();
                    var text = setting_Staff.waterGateControlMode.getText(tags[0].Value);
                    setting_Style.changeTailWindClassNamesByValue(id, tags[0].Value - 1)
                    ele.innerText = text;
                }
                else /*if(c==2)*/ {  //
                    // ele.innerText = gates[i].RealValue;// setting_Staff.getPrecisionFloat(flows[i].RealValue,2).toString();
                    var text = setting_Staff.waterGateState.getText(tags[0].Value);  // 0: ??????, 1: ?????? 2: ?????? 
                    ele.innerText = text;
                    setting_Style.changeTailWindClassNamesByValue(id, tags[0].Value - 1)
                }
            }
        }

        // ????????????

        var length = mainGate.length;
        for (var i = 0; i < length; i++) {
            var id = mainGate[i].TagName + "_" + setting_Staff.tagWayCode.ElectricWaterGateName;
            var c = mainGate[i].TagName.split('--')[1];

            var ele = document.getElementById(id);
            if (ele != null) {
                var tags = Enumerable.From(index.realTimeTagDataFromSignalR).Where(
                    m => m.TagName == mainGate[i].TagName//.replace("--","@@") // ?????? replace ????????????
                ).ToArray();
                if (tags.length == 0) { continue; }
                if (c == 2) {//????????????

                    var text = setting_Staff.waterGateControlMode.getText(tags[0].Value);
                    ele.innerText = text;
                }
                else /*if(c==2)*/ {  //????????????

                    var text = setting_Staff.waterGateState.getText(tags[0].Value);
                    ele.innerText = text;
                }
            }
        }

    },


    /**
     * @method setWaterLevelInformation ??????????????????
     */
    setWaterLevelInformation: function (rtnData, defineTagWayRelation) {

        //#region ??????????????????
        var levels = Enumerable.From(rtnData).
            Where(m => m.TagWay == setting_Staff.tagWayCode.WaterLevelGauge).
            OrderBy(m => m.FieldId).ThenBy(m => m.TagName).
            ToArray();
        for (var i = 0; i < levels.length; i++) {
            var id = levels[i].TagName + "_" + setting_Staff.tagWayCode.WaterLevelGaugeName;
            var ele = document.getElementById(id);
            if (ele != null) {
                var tags = Enumerable.From(index.realTimeTagDataFromSignalR).Where(
                    m => m.TagName == levels[i].TagName//.replace("--","@@") // ?????? replace ????????????
                ).ToArray();
                if (tags.length == 0) { continue; }
                ele.innerText = tags[0].ValueString;// setting_Staff.getPrecisionFloat(flows[i].RealValue,2).toString();
                setting_Style.changeTailWindClassNamesByValue(id, tags[0].Value)
                // window.alert(tags[0].ValueString);
            }
        }
        //#endregion

        //#region  ?????????????????????
        var definedLevel = Enumerable.From(rtnData).
            Where(m => m.TagWay == setting_Staff.tagWayCode.DefinedWaterLevelGauge).
            OrderBy(m => m.TagName).ToArray();
        for (var i = 0; i < definedLevel.length; i++) {
            var id = definedLevel[i].TagName + "_" + setting_Staff.tagWayCode.DefinedWaterLevelGaugeName;
            var rowId = id + "_row"
            var ele = document.getElementById(id);
            if (ele != null) {
                var tags = Enumerable.From(index.realTimeTagDataFromSignalR).Where(
                    m => m.TagName == definedLevel[i].TagName
                ).ToArray();
                if (tags.length == 0) { continue; }
                ele.innerText = tags[0].ValueString;// setting_Staff.getPrecisionFloat(flows[i].RealValue,2).toString();
                setting_Style.changeTailWindClassNamesByValue(id, tags[0].Value)

                //????????????
                //(1)????????? ???????????????, ???Display
                //(2)???????????????????????????, ???????????????????????????, ??? Hide 
                if (index.staff.PermissionCode == setting_Staff.permissionCode.systemAdministration) {
                    //  ????????? ????????????, ?????????:
                    document.getElementById(rowId).style.display = '';
                }
                else {
                    // ?????? ???????????????ID ??????
                    var fields = Enumerable.From(index.staff.FieldsAdmList).Select(m => m.FieldId).ToArray();
                    // ??????????????????
                    var defindTags = Enumerable.From(defineTagWayRelation).
                        Where(
                            m => m.TagWayCode == setting_Staff.tagWayCode.DefinedWaterLevelGauge
                                &&
                                m.TagName == definedLevel[i].TagName
                        ).
                        ToArray();

                    var display = 'none';
                    for (var j = 0; j < fields.length; j++) {
                        var define = Enumerable.From(defindTags).Where(m => m.FieldId == fields[j]).ToArray();
                        if (define.length > 0) {
                            display = '';
                            break;
                        }
                    }
                    document.getElementById(rowId).style.display = display;
                }
            }
        }
        //#endregion
    },

    /**
     * @method  setWaterFlowInformation ????????????????????????
     * @param {*} rtnData 
     */
    setWaterFlowInformation: function (rtnData) {
        var flows = Enumerable.From(rtnData).
            Where(m => m.TagWay == setting_Staff.tagWayCode.WaterFlowMeter).
            OrderBy(m => m.FieldId).ThenBy(m => m.TagName).
            ToArray();
        for (var i = 0; i < flows.length; i++) {
            var id = flows[i].TagName + "_" + setting_Staff.tagWayCode.WaterFlowMeterName;
            // id=id.replace('@@','--')
            var ele = document.getElementById(id);
            if (ele != null) {
                var tags = Enumerable.From(index.realTimeTagDataFromSignalR).Where(
                    m => m.TagName == flows[i].TagName//.replace("--","@@") // ?????? replace ????????????
                ).ToArray();
                if (tags.length == 0) { continue; }
                ele.innerText = tags[0].ValueString;// setting_Staff.getPrecisionFloat(flows[i].RealValue,2).toString();
                // try{
                setting_Style.changeTailWindClassNamesByValue(id, tags[0].Value)
                // }
                // catch(ex){
                // window.alert(id);
                //}
            }
        }
    },

    /**
     * @method setEarthMoistureInformation ??????????????????
     */
    setEarthMoistureInformation: function (rtnData, defineTagWayRelation) {
        //#region ???????????????
        var moistures = Enumerable.From(rtnData).
            Where(m => m.TagWay == setting_Staff.tagWayCode.MoistureMeter).
            OrderBy(m => m.FieldId).ThenBy(m => m.TagName).
            ToArray();
        for (var i = 0; i < moistures.length; i++) {
            var id = moistures[i].TagName + "_" + setting_Staff.tagWayCode.MoistureMeterName;
            var ele = document.getElementById(id);
            if (ele != null) {
                var tags = Enumerable.From(index.realTimeTagDataFromSignalR).Where(
                    m => m.TagName == moistures[i].TagName
                ).ToArray();
                if (tags.length == 0) { continue; }
                ele.innerText = tags[0].ValueString;// setting_Staff.getPrecisionFloat(flows[i].RealValue,2).toString();
                setting_Style.changeTailWindClassNamesByValue(id, tags[0].Value);
            }
        }
        //#endgion
        //# ???????????????
        var defineMoisture = Enumerable.From(rtnData).
            Where(m => m.TagWay == setting_Staff.tagWayCode.DefinedMoistureMeter).
            OrderBy(m => m.TagName).ToArray();
        for (var i = 0; i < defineMoisture.length; i++) {
            var id = defineMoisture[i].TagName + "_" + setting_Staff.tagWayCode.DefinedMoistureMeterName;
            var rowId = id + "_row";
            var ele = document.getElementById(id);
            if (ele != null) {
                var tags = Enumerable.From(index.realTimeTagDataFromSignalR).Where(
                    m => m.TagName == defineMoisture[i].TagName
                ).ToArray();
                if (tags.length == 0) { continue; }
                ele.innerText = tags[0].ValueString;
                setting_Style.changeTailWindClassNamesByValue(id, tags[0].Value);
                if (index.staff.PermissionCode == setting_Staff.permissionCode.systemAdministration) {
                    //  ????????? ????????????, ?????????:
                    document.getElementById(rowId).style.display = '';
                }
                else {


                    // ?????? ???????????????ID ??????
                    var fields = Enumerable.From(index.staff.FieldsAdmList).Select(m => m.FieldId).ToArray();
                    // ??????????????????
                    var defindTags = Enumerable.From(defineTagWayRelation).
                        Where(
                            m => m.TagWayCode == setting_Staff.tagWayCode.DefinedMoistureMeter
                                &&
                                m.TagName == defineMoisture[i].TagName
                        ).
                        ToArray();

                    var display = 'none';
                    for (var j = 0; j < fields.length; j++) {
                        var define = Enumerable.From(defindTags).Where(m => m.FieldId == fields[j]).ToArray();
                        if (define.length > 0) {
                            display = '';
                            break;
                        }
                    }
                    document.getElementById(rowId).style.display = display;


                }
            }
        }
        //#endregion
    },

    /**
     * @method setFieldInformation ??????????????????????????????(?????????(1),?????????(2),?????????(3))ValueUsage=1,2,3(???!=0)
     * @param {*} rtnData 
     */
    setFieldInformation: function (rtnData) {

        var waterIntake = Enumerable.From(rtnData).
            Where(m => m.ValueUsage == setting_Staff.tagValueUsage.waterIntake).
            OrderBy(m => m.FieldId).ThenBy(m => m.TagName).
            ToArray();

        var irrigation = Enumerable.From(rtnData).
            Where(m => m.ValueUsage == setting_Staff.tagValueUsage.irrigation).
            OrderBy(m => m.FieldId).ThenBy(m => m.TagName).
            ToArray();
        var drain = Enumerable.From(rtnData).
            Where(m => m.ValueUsage == setting_Staff.tagValueUsage.drain).
            OrderBy(m => m.FieldId).ThenBy(m => m.TagName).
            ToArray();
        //window.alert(JSON.stringify(waterIntake));
        //window.alert(JSON.stringify(irrigation));
        //window.alert(JSON.stringify(drain));
        //#region ??????
        for (var i = 0; i < waterIntake.length; i++) {
            var info = waterIntake[i];
            var id = info.FieldId + '_' + setting_Staff.tagValueUsage.waterIntakeName;
            var ele = document.getElementById(id);
            if (ele != null) {
                var tags = Enumerable.From(index.realTimeTagDataFromSignalR).Where(m => m.TagName == info.TagName).ToArray();
                // window.alert(tags[0].TagName);
                if (tags.length == 0) { continue; }
                ele.innerText = tags[0].ValueString;//setting_Staff.getPrecisionFloat(info.RealValue,2).toString();
                setting_Style.changeTailWindClassNamesByValue(id, tags[0].Value);
            }
        }
        //#endregion

        //#region ??????
        for (var i = 0; i < irrigation.length; i++) {
            var info = irrigation[i];
            var id = info.FieldId + '_' + setting_Staff.tagValueUsage.irrigationName;
            var ele = document.getElementById(id);
            if (ele != null) {
                var tags = Enumerable.From(index.realTimeTagDataFromSignalR).Where(m => m.TagName == info.TagName).ToArray();
                if (tags.length == 0) { continue; }
                ele.innerText = tags[0].ValueString;//setting_Staff.getPrecisionFloat(info.RealValue,2).toString();
                setting_Style.changeTailWindClassNamesByValue(id, tags[0].Value);
            }
        }

        //#region ??????
        for (var i = 0; i < drain.length; i++) {
            var info = drain[i];
            var id = info.FieldId + '_' + setting_Staff.tagValueUsage.drainName;
            var ele = document.getElementById(id);
            if (ele != null) {
                var tags = Enumerable.From(index.realTimeTagDataFromSignalR).Where(m => m.TagName == info.TagName).ToArray();
                if (tags.length == 0) { continue; }
                ele.innerText = tags[0].ValueString;//setting_Staff.getPrecisionFloat(info.RealValue,2).toString();
                // console.log("==="+tags[0].ValueString);
                setting_Style.changeTailWindClassNamesByValue(id, tags[0].Value);
            }
        }

    },


    /**
     * 
     * @param {*} rtnData ???????????? 
     * @param {*} mainGate ?????????
     * @param {*} alarmHistories ??????
     * @param {*} defindTagwayRelation ????????? 
     */
    getTagDataOk: function (rtnData, mainGate, alarmHistories, defindTagwayRelation) {

        // ?????? ?????????,?????????,?????????
        index.setFieldInformation(rtnData)
        // ?????????????????????????????????
        index.setWaterFlowInformation(rtnData);
        // ??????????????????
        index.setEarthMoistureInformation(rtnData, defindTagwayRelation);

        index.setWaterLevelInformation(rtnData, defindTagwayRelation);

        index.setWaterGateInformation(rtnData, mainGate);

        //????????????????????????(??? Horizontal.html)
        horizontal.displayAlarmHistory(alarmHistories)
        // console.log("AlarmHistory:" + JSON.stringify(alarmHistories)); 

        //????????????????????????
        var waterGateStateTagList = Enumerable.From(rtnData).
            Where(m => m.TagWay == setting_Staff.tagWayCode.ElectricWaterGateState).
            ToArray();
        //??????/????????????     
        index.setGateStateFlash(waterGateStateTagList);

    },
    getTagDataFailed: function (errObj) {
        index.getDataErrObj = errObj;
    },
    startUp: function (staff) {
        // ????????????
        index.staff = staff;
        // ??????????????????????????? 
        index.initialFieldInformation();

        // ????????? ????????????????????????      
        index.initialRealtimeWaterFlowInformation();

        // ?????????????????????????????????
        index.initialEarthInformationEquipmentList();

        //?????????????????????????????????
        index.initialWaterLevelEquipmentList();
        //#region   ????????????

        // ?????????????????????????????? 
        index.initialElecticWaterGateInformation();




        //#endregion

        var alarmLevel = 0;
        var id = index.staff.StaffId;

        if (index.staff.PermissionCode == setting_Staff.permissionCode.systemAdministration) {
            // ????????????
            alarmLevel = 0;
        }
        else {
            alarmLevel = 1;// ??? ID ?????? StaffId
        }

        getTagData.getData(
            this.getTagDataOk,
            this.getTagDataFailed,
            alarmLevel, id
        );



        // Connet to signalR Server 
        index.webSignalR = index.connectToSignalR();
    },

    /**
     * @method  initialFieldInformation  ???????????????????????????
     */
    initialFieldInformation: function () {
        // ????????????
        var staff = index.staff;
        // ????????????????????????ID
        var fieldInformationContainerId = 'fieldInformationContainer';
        // ?????????????????????
        var containrDom = document.getElementById(fieldInformationContainerId);
        // ???????????????????????? ??????
        var fieldList = Enumerable.From(staff.FieldsAdmList).Where(m => m.FieldId != setting.nothingFieldId).ToArray();
        // ???????????????????????? ??????
        var length = fieldList.length;
        if (length == 0) {
            containrDom.innerHTML = '??????????????????'
        }
        else {
            // ??????????????? HTML
            var containerHtml = ``;
            for (var i = 0; i < length; i++) {
                var fieldInfo = fieldList[i];
                //window.alert(JSON.stringify(fieldInfo));
                var idWaterIntake = fieldInfo.FieldId + '_' + setting_Staff.tagValueUsage.waterIntakeName;
                var idIrrigation = fieldInfo.FieldId + '_' + setting_Staff.tagValueUsage.irrigationName;
                var idDrain = fieldInfo.FieldId + '_' + setting_Staff.tagValueUsage.drainName;
                var html = `
           <tr
           class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
           <td
               class="ti p-3 text-sm font-medium whitespace-nowrap dark:text-white">
               <a href="`+ setting.fieldAdminPage + `?id=` + fieldInfo.FieldId + `"><i title="????????????"
                       class="ti ti-settings text-lg text-gray-500 dark:text-gray-400"></i></a>
            `+
                    fieldInfo.FieldName
                    + `
           </td>
           
           <td title="?????????"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                <span id="`+ idWaterIntake + `" class='rounded'  >[?????????]
               </span>
          </td>
          
           <td title="?????????"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
               <span id="`+ idIrrigation + `"
                      class="rounded">[?????????]
               </span>
          </td>
          
           <td title="?????????"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
               <span id="`+ idDrain + `"
                  class="rounded">[?????????]
               </span>
           </td>

         
       </tr>`  ;
                //  window.alert(html);
                containerHtml += html;
            }
            containrDom.innerHTML = containerHtml;
        }
    },

    /**
     * @method initialElecticWaterGateInformmation ????????????????????????
     */
    initialElecticWaterGateInformation: function () {
        // ??????????????????
        var staff = index.staff;
        // ???????????????????????????????????????????????? Tag
        var tagArray = staff.TagList;
        // ????????????(?????????)???????????????????????????????????????
        var electricWaterGateCode = setting_Staff.tagWayCode.ElectricWaterGate;
        // ??????????????????????????????
        var electricBlockWaterGateCode = setting_Staff.tagWayCode.ElectricBlockWaterGate;
        // ????????????????????????????????????ID
        var electricWaterGateContainerId = 'electricWaterGateContainer';
        // ????????????????????????????????????
        var electricWaterGateContainer = document.getElementById(electricWaterGateContainerId)
        // ?????????????????????????????????
        var tags = Enumerable.From(tagArray).Where(
            (x) => x.TagWay == electricWaterGateCode
        ).OrderBy(x => x.FieldId).ThenBy(x => x.TagName).ToArray();
        // console.log("FieldId:"+tags[0].FieldId);
        // ?????????????????????
        var tagLength = tags.length;
        if (tagLength == 0) {
            electricWaterGateContainer.innerHTML = '???????????????????????????'
        }
        else {

            // ?????????????????????????????????????????????
            var htmlContext = ``;
            for (var i = 0; i < tagLength; i += 5) {

                var tag = tags[i];
                var tagNames = tag.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.ElectricWaterGateName;// ????????????,
                var id2 = tagNames[0] + "--2_" + setting_Staff.tagWayCode.ElectricWaterGateName;// ????????????
                var html = `
           <tr 
           class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
           <td class="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
               <span 
                   class="mr-2 h-5 inline-block">`+ tag.Description + `</span>
           </td>
           <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400"> <!--????????????-->
               <span id="`+ id2 + `"
                   class="rounded">[????????????]</span>
           </td>
           <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400"> <!--????????????-->
               <span id="`+ id1 + `"
               class="rounded">[??????]</span>
           </td>
           <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
               <a href="#" onclick="index.setControlModeToScenario('`+ tagNames[0] + `--2')"><i title="????????????"
                       class="ti ti-chart-candle text-lg text-gray-500 dark:text-gray-400"></i></a>
               <a href="#"  onclick="index.setControlModeToTiming('`+ tagNames[0] + `--2')"><i title="????????????"
                       class="ti ti-alarm text-lg text-gray-500 dark:text-gray-400"></i></a>
               <a href="#"  onclick="index.setControlModeToManual('`+ tagNames[0] + `--2')"><i title="????????????"
                       class="ti ti-hand-stop text-lg text-gray-500 dark:text-gray-400"></i></a><br/>
               <a href="#" onclick="index.openWatergate('`+ tagNames[0] + `--3')"><i title="????????????"
                       class="ti ti-arrow-big-top text-lg text-red-500 dark:text-red-400" id="ST_`+ tagNames[0] + `--3"></i></a>
               <a href="#"  onclick="index.closeWatergate('`+ tagNames[0] + `--4')"><i title="????????????"
                       class="ti ti-arrow-big-down text-lg text-red-500 dark:text-red-400" id="ST_`+ tagNames[0] + `--4"></i></a>
               <a href="#" onclick="index.stopWatergateOpenClose('`+ tagNames[0] + `--5')"><i title="????????????"
                       class="ti ti-player-stop text-lg text-red-500 dark:text-red-400"></i></a>
           </td>
       </tr> 
           
           `;
                // htmlContext += html;

                //#region   ??????????????????
                var blockGates = Enumerable.From(tagArray).Where(
                    (x) => x.TagWay == electricBlockWaterGateCode && x.FieldId == tag.FieldId
                ).OrderBy(x => x.FieldId).ThenBy(x => x.TagName).ToArray();
                var blockLength = blockGates.length;

                if (blockLength > 0) {

                    var html0 = ``;
                    console.log("blockLength:" + blockLength)
                    for (var j = 0; j < blockLength; j += 4) {
                        var blockNames = blockGates[j].TagName.split('--');
                        var id1 = blockNames[0] + "--1_" + setting_Staff.tagWayCode.ElectricBlockWaterGateName;// ????????????,
                        html0 += `
                        <tr 
                        class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                        <td class="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                        <span>`+ blockGates[j].Description + `</span>
                        </td>
                        <td>
                        </td>
                        <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400"> <!--????????????-->
               <span id="`+ id1 + `"
                   class="rounded">[??????]</span>
           </td>
                        </td>
                        <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                       
                        <a href="#" onclick="index.openWatergate('`+ blockNames[0] + `--3')"><i title="????????????"
                                class="ti ti-arrow-big-top text-lg text-red-500 dark:text-red-400" id="ST_`+blockNames[0]+`--3"></i></a>
                        <a href="#"  onclick="index.closeWatergate('`+ blockNames[0] + `--4')"><i title="????????????"
                                class="ti ti-arrow-big-down text-lg text-red-500 dark:text-red-400" id="ST_`+blockNames[0]+`--4"></i></a>
                        <a href="#" onclick="index.stopWatergateOpenClose('`+ blockNames[0] + `--5')"><i title="????????????"
                                class="ti ti-player-stop text-lg text-red-500 dark:text-red-400"></i></a>
                    </td>



                        </tr>
                        
                        `;
                    }
                    html += html0;
                }
                //#endregion
                htmlContext += html;
            }
            electricWaterGateContainer.innerHTML = htmlContext;
        }
    },

    /**
     * @method initialRealtimeWaterFlowInformation ?????????????????????????????????
     */
    initialRealtimeWaterFlowInformation: function () {
        // ??????????????????
        var staff = index.staff;
        // ?????????????????????????????????????????????????????? 
        var tagArray = staff.TagList;
        // ????????????????????????
        var waterFlowMeterCode = setting_Staff.tagWayCode.WaterFlowMeter;
        // ?????????????????????????????? ID
        var waterFlowContainerId = 'waterFlowInformation';
        // ?????????????????????????????? ID
        var waterFlowContainer = document.getElementById(waterFlowContainerId)
        // ???????????????????????????Tag ?????? 
        var tags = Enumerable.From(tagArray).Where(
            (x) => x.TagWay == waterFlowMeterCode
        ).OrderBy(x => x.FieldId).ThenBy(x => x.TagName).ToArray();
        // ????????????
        var tagLength = tags.length;
        if (tagLength == 0) {
            waterFlowContainer.innerHTML = "??????????????????????????????";
        }
        else {
            // HTML ??????
            var htmlContext = ``;
            for (var i = 0; i < tagLength; i += 2) {
                var tag = tags[i];
                var tagNames = tag.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.WaterFlowMeterName;// ??????,
                var id2 = tagNames[0] + "--2_" + setting_Staff.tagWayCode.WaterFlowMeterName;// ??????
                var html = `
            <tr
            class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
            <td
                class="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center ">
                <span
                class="rounded">
                `+ tag.Description + `</span>
            </td>
           

            <td title="????????????"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
               <span id="`+ id1 + `"
               class="rounded">[????????????]
                </span>
           </td>
           <td title="????????????"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
             <span id="`+ id2 + `"
             class="rounded">[????????????]
              </span>
           </td>
        </tr>`;
                htmlContext += html;
            }
            waterFlowContainer.innerHTML = htmlContext;
        }
    },

    /**
     * @method initialEarthInformationEquipmentList ?????????????????????(??????)????????????
     */
    initialEarthInformationEquipmentList: function () {
        // ??????????????????  
        var staff = index.staff;
        // ??????????????????????????????????????????????????????
        var tagArray = staff.TagList;
        // ??????????????????
        var moistureMeterCode = setting_Staff.tagWayCode.MoistureMeter;
        var definedMoistureMeterCode = setting_Staff.tagWayCode.DefinedMoistureMeter;
        // ??????????????????????????? ID
        var moistureMeterContainerId = 'moistureMeterContainer';
        // ????????????????????????
        var moistureMeterContainer = document.getElementById(moistureMeterContainerId)
        // ???????????? ???Tag ?????? 
        var tags = Enumerable.From(tagArray).Where(
            (x) => x.TagWay == moistureMeterCode
        ).OrderBy(x => x.FieldId).ThenBy(x => x.TagName).ToArray();

        // ?????????????????????????????????
        var definedTags = Enumerable.From(staff.DefinedTagWayTagListUnitList).Where(
            (x) => x.TagWayCode == definedMoistureMeterCode
        ).OrderBy(x => x.FieldId).ThenBy(x => x.TagName).ToArray();
        //?????????????????????????????????
        var tagLength = tags.length;
        //???????????????????????? ??????
        var defineTagLength = definedTags.length;
       /* if (tagLength +defineTagLength == 0) {
            moistureMeterContainer.innerHTML = "??????????????????????????????"
        }
        else*/ {
            var htmlContext = ``;
            if (tagLength != 0) { // ??????????????????

                for (var i = 0; i < tagLength; i += 2) {
                    var tag = tags[i];
                    var tagNames = tag.TagName.split('--');
                    var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.MoistureMeterName;// ??????,
                    var id2 = tagNames[0] + "--2_??" + setting_Staff.tagWayCode.MoistureMeterName;// ??????
                    var html = `
                      <tr class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                         <td class="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                            <span  class="rounded"> `+ tag.Description + `</span>
                        </td>
                        <td  class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right" id='`+ id2 + `'>
                        </td>
                        <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                            <span id='`+ id1 + `' class="rounded">[??????]</span>
                        </td>
                    </tr>`;
                    htmlContext += html;
                }
            }
            if (defineTagLength != 0) { // ?????????????????????, ???????????????
                for (var i = 0; i < defineTagLength; i++) {
                    var tag = definedTags[i];
                    var tagName = tag.TagName;
                    var id = tagName + "_" + setting_Staff.tagWayCode.DefinedMoistureMeterName;
                    var rowId = id + "_row";
                    var html = `
                    <tr style='display:none' id='`+ rowId + `' class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                       <td class="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                          <span  class="rounded"> `+ tag.TagDescription + `</span>
                      </td>
                      <td  class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right" >
                      </td>
                      <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                          <span id='`+ id + `' class="rounded">[??????]</span>
                      </td>
                  </tr>`;
                    htmlContext += html;
                }
            }
            moistureMeterContainer.innerHTML = htmlContext;
        }
    },

    /**
     * @method initialWaterLevelEquipmentList ?????????????????????????????????
     */
    initialWaterLevelEquipmentList: function () {
        // ??????????????????
        var staff = index.staff;
        // ?????????????????????????????????, ?????????????????????
        var tagArray = staff.TagList;
        // ??????????????????????????????
        var waterLevelGaugeCode = setting_Staff.tagWayCode.WaterLevelGauge;
        // ????????????????????????
        var defineWaterLevelGaugeCode = setting_Staff.tagWayCode.DefinedWaterLevelGauge;
        // ???????????????????????????ID
        var waterLevelContainerId = 'waterLevelContainer';
        // ???????????????????????????
        var waterLevelContainer = document.getElementById(waterLevelContainerId)
        // ???????????? ???Tag ?????? 
        var tags = Enumerable.From(tagArray).Where(
            (x) => x.TagWay == waterLevelGaugeCode
        ).OrderBy(x => x.FieldId).ThenBy(x => x.TagName).ToArray();

        var defineTags = Enumerable.From(staff.DefinedTagWayTagListUnitList).
            Where(x => x.TagWayCode == defineWaterLevelGaugeCode).
            OrderBy(x => x.TagName).ToArray();
        // ???????????? Tag ????????? 
        var tagLength = tags.length;
        var defineTagLength = defineTags.length;
       /* if (tagLength+defineTagLngth== 0) {
            waterLevelContainer.innerHTML = "??????????????????????????????";
        }
        else*/ {
            // ?????????????????????
            var htmlContext = ``;
            for (var i = 0; i < tagLength; i += 2) {
                var tag = tags[i];
                var tagNames = tag.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.WaterLevelGaugeName;// ??????,
                var id2 = tagNames[0] + "--2_??" + setting_Staff.tagWayCode.WaterLevelGaugeName;// ??????
                var html = `
                  <tr class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                        <td class="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                            <span class="relative inline-block self-center mr-2">`+ tag.Description + `</span>
                        </td>
                        <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400" id='`+ id2 + `'>
                        </td>
                        <td  class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                           <span class="rounded"" id='`+ id1 + `'>[??????]</span>
                        </td>
                  </tr>
                `;
                htmlContext += html;
            }

            for (var i = 0; i < defineTagLength; i++) { // ???????????????
                var tag = defineTags[i];
                var tagName = tag.TagName;
                var id = tagName + "_" + setting_Staff.tagWayCode.DefinedWaterLevelGaugeName;
                var rowId = id + "_row"
                var html = `
                <tr style='display:none'  id='`+ rowId + `' class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
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
                htmlContext += html;
            }

            waterLevelContainer.innerHTML = htmlContext;
        }
    },


}