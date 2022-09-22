
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

    // 錯誤的 Model
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
    * @method setControlModeToTiming 將閘門的控制模式設為定時控制
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
     * @method setControlModeToManual 將閘門的控制模式設為手動控制
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
     * @method setControlModeToScenario 將閘門的控制模式設為情境控制
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
    * @method openWatergate 打開水閘門
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
    * @method closeWatergate 關閉水閘門
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
    * @method stopWatergateOpenClose 停止 水閘門 開/關操作
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
         * @method connectToSignalR 連接 SignalR
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
     * @method setWaterGateInformation 設定電水閘門資訊
     * @param {*} rtnData 
     * @param {*} mainGate 
     */
    setWaterGateInformation: function (rtnData, mainGate) {
        var gates = Enumerable.From(rtnData).
            Where(m => m.TagWay == setting_Staff.tagWayCode.ElectricWaterGate || m.TagWay == setting_Staff.tagWayCode.ElectricBlockWaterGate).
            OrderBy(m => m.FieldId).ThenBy(m => m.TagName).
            ToArray();
        // 各閘門  

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
            if (ele != null) { //目前狀態

                var tags = Enumerable.From(index.realTimeTagDataFromSignalR).Where(
                    m => m.TagName == gates[i].TagName//.replace("--","@@") // 這個 replace 可以拿掉
                    ).ToArray();
                if (tags.length == 0) { continue; }
                //window.alert(tags[0].TagName);
                if (c == 2) {
                    //ele.innerText = gates[i].RealValueText;// setting_Staff.getPrecisionFloat(flows[i].RealValue,2).toString();
                    var text = setting_Staff.waterGateControlMode.getText(tags[0].Value);  
                    setting_Style.changeTailWindClassNamesByValue(id,tags[0].Value-1)
                    ele.innerText = text;
                }
                else /*if(c==2)*/ {  //
                    // ele.innerText = gates[i].RealValue;// setting_Staff.getPrecisionFloat(flows[i].RealValue,2).toString();
                    var text = setting_Staff.waterGateState.getText(tags[0].Value);  // 0: 全關, 1: 半開 2: 全開 
                    ele.innerText = text;
                    setting_Style.changeTailWindClassNamesByValue(id,tags[0].Value-1)
                }
            }
        }

        // 主水閘門

        var length = mainGate.length;
        for (var i = 0; i < length; i++) {
            var id = mainGate[i].TagName + "_" + setting_Staff.tagWayCode.ElectricWaterGateName;
            var c = mainGate[i].TagName.split('--')[1];

            var ele = document.getElementById(id);
            if (ele != null) {
                var tags = Enumerable.From(index.realTimeTagDataFromSignalR).Where(
                    m => m.TagName == mainGate[i].TagName//.replace("--","@@") // 這個 replace 可以拿掉
                    ).ToArray();
                if (tags.length == 0) { continue; }
                if (c == 2) {//控制模式

                    var text = setting_Staff.waterGateControlMode.getText(tags[0].Value);
                    ele.innerText = text;
                }
                else /*if(c==2)*/ {  //目前狀態

                    var text = setting_Staff.waterGateState.getText(tags[0].Value);
                    ele.innerText = text;
                }
            }
        }

    },


    /**
     * @method setWaterLevelInformation 設定水位資訊
     */
    setWaterLevelInformation: function (rtnData) {
        var levels = Enumerable.From(rtnData).
            Where(m => m.TagWay == setting_Staff.tagWayCode.WaterLevelGauge).
            OrderBy(m => m.FieldId).ThenBy(m => m.TagName).
            ToArray();
        for (var i = 0; i < levels.length; i++) {
            var id = levels[i].TagName + "_" + setting_Staff.tagWayCode.WaterLevelGaugeName;
            var ele = document.getElementById(id);
            if (ele != null) {
                var tags = Enumerable.From(index.realTimeTagDataFromSignalR).Where(
                    m => m.TagName == levels[i].TagName//.replace("--","@@") // 這個 replace 可以拿掉
                    ).ToArray();
                if (tags.length == 0) { continue; }
                ele.innerText = tags[0].ValueString;// setting_Staff.getPrecisionFloat(flows[i].RealValue,2).toString();
                setting_Style.changeTailWindClassNamesByValue(id,tags[0].Value)
                // window.alert(tags[0].ValueString);
            }
        }
    },

    /**
     * @method  setWaterFlowInformation 設定即時流量資訊
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
                    m => m.TagName == flows[i].TagName//.replace("--","@@") // 這個 replace 可以拿掉
                ).ToArray();
                if (tags.length == 0) { continue; }
                ele.innerText = tags[0].ValueString;// setting_Staff.getPrecisionFloat(flows[i].RealValue,2).toString();
               // try{
                  setting_Style.changeTailWindClassNamesByValue(id,tags[0].Value)
               // }
               // catch(ex){
                   // window.alert(id);
                //}
            }
        }
    },

    /**
     * @method setEarthMoistureInformation 設定土壤資訊
     */
    setEarthMoistureInformation: function (rtnData) {
        var moistures = Enumerable.From(rtnData).
            Where(m => m.TagWay == setting_Staff.tagWayCode.MoistureMeter).
            OrderBy(m => m.FieldId).ThenBy(m => m.TagName).
            ToArray();
        for (var i = 0; i < moistures.length; i++) {
            var id = moistures[i].TagName + "_" + setting_Staff.tagWayCode.MoistureMeterName;
            var ele = document.getElementById(id);
            if (ele != null) {
                var tags = Enumerable.From(index.realTimeTagDataFromSignalR).Where(
                    m => m.TagName == moistures[i].TagName//.replace("--","@@") // 這個 replace 可以拿掉
                ).ToArray();
                if (tags.length == 0) { continue; }
                ele.innerText = tags[0].ValueString;// setting_Staff.getPrecisionFloat(flows[i].RealValue,2).toString();
                setting_Style.changeTailWindClassNamesByValue(id,tags[0].Value);
            }
        }
    },

    /**
     * @method setFieldInformation 設定田區相關資訊各值(進水量(1),灌溉量(2),排水量(3))ValueUsage=1,2,3(或!=0)
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
        //#region 進水
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

        //#region 灌溉
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

        //#region 排水
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


    getTagDataOk: function (rtnData, mainGate, alarmHistories) {

        // 設定 進水量,灌溉量,排水量
        index.setFieldInformation(rtnData)
        // 設定即時流量及累計流量
        index.setWaterFlowInformation(rtnData);
        // 設定土壤資訊
        index.setEarthMoistureInformation(rtnData);

        index.setWaterLevelInformation(rtnData);

        index.setWaterGateInformation(rtnData, mainGate);

        //設定警報歷史資料(在 Horizontal.html)
        horizontal.displayAlarmHistory(alarmHistories)
        // console.log("AlarmHistory:" + JSON.stringify(alarmHistories)); 
    },
    getTagDataFailed: function (errObj) {
        index.getDataErrObj = errObj;
    },
    startUp: function (staff) {
        // 人員資料
        index.staff = staff;
        // 初始化田區資訊管理 
        index.initialFieldInformation();

        // 初始化 即時流量資訊清單      
        index.initialRealtimeWaterFlowInformation();

        // 初始化土壤資訊設備清單
        index.initialEarthInformationEquipmentList();

        //初始化水位資訊設備清單
        index.initialWaterLevelEquipmentList();
        //#region   先不顯示

        // 初始化電動水閘門資訊 
        index.initialElecticWaterGateInformation();




        //#endregion

        var alarmLevel = 0;
        var id = index.staff.StaffId;

        if (index.staff.PermissionCode == setting_Staff.permissionCode.systemAdministration) {
            // 管理權限
            alarmLevel = 0;
        }
        else {
            alarmLevel = 1;// 將 ID 視為 StaffId
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
     * @method  initialFieldInformation  初始化田區相關資訊
     */
    initialFieldInformation: function () {
        // 人員資料
        var staff = index.staff;
        // 田區資訊存放區的ID
        var fieldInformationContainerId = 'fieldInformationContainer';
        // 田區資計存放區
        var containrDom = document.getElementById(fieldInformationContainerId);
        // 登入人員所管理的 田區
        var fieldList = Enumerable.From(staff.FieldsAdmList).Where(m => m.FieldId != setting.nothingFieldId).ToArray();
        // 登入人員所管理的 數量
        var length = fieldList.length;
        if (length == 0) {
            containrDom.innerHTML = '没有田區資料'
        }
        else {
            // 田區資訊的 HTML
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
               <a href="`+ setting.fieldAdminPage + `?id=` + fieldInfo.FieldId + `"><i title="田區控制"
                       class="ti ti-settings text-lg text-gray-500 dark:text-gray-400"></i></a>
            `+
                    fieldInfo.FieldName
                    + `
           </td>
           
           <td title="進水量"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                <span id="`+ idWaterIntake + `" class='rounded'  >[進水量]
               </span>
          </td>
          
           <td title="灌溉量"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
               <span id="`+ idIrrigation + `"
                      class="rounded">[灌溉量]
               </span>
          </td>
          
           <td title="排水量"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
               <span id="`+ idDrain + `"
                  class="rounded">[排水量]
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
     * @method initialElecticWaterGateInformmation 初始化電動水閘門
     */
    initialElecticWaterGateInformation: function () {
        // 登入人員資料
        var staff = index.staff;
        // 登入人員依其管理的田區所能處理的 Tag
        var tagArray = staff.TagList;
        // 公共電動(進擋水)閘門及田區進水閘門用途代碼
        var electricWaterGateCode = setting_Staff.tagWayCode.ElectricWaterGate;
        // 田區擋水閘門用途代碼
        var electricBlockWaterGateCode = setting_Staff.tagWayCode.ElectricBlockWaterGate;
        // 存放電動水閘間資料的區域ID
        var electricWaterGateContainerId = 'electricWaterGateContainer';
        // 存放電動水閘間資料的區域
        var electricWaterGateContainer = document.getElementById(electricWaterGateContainerId)
        // 與電動水閘門相關的測點
        var tags = Enumerable.From(tagArray).Where(
            (x) => x.TagWay == electricWaterGateCode
        ).OrderBy(x => x.FieldId).ThenBy(x => x.TagName).ToArray();
        // console.log("FieldId:"+tags[0].FieldId);
        // 相關的測點數量
        var tagLength = tags.length;
        if (tagLength == 0) {
            electricWaterGateContainer.innerHTML = '没有電動水閘門資料'
        }
        else {

            // 公共電動進擋水或各田區進水閘門
            var htmlContext = ``;
            for (var i = 0; i < tagLength; i += 5) {

                var tag = tags[i];
                var tagNames = tag.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.ElectricWaterGateName;// 目前狀態,
                var id2 = tagNames[0] + "--2_" + setting_Staff.tagWayCode.ElectricWaterGateName;// 控制模式
                var html = `
           <tr 
           class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
           <td class="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
               <span 
                   class="mr-2 h-5 inline-block">`+ tag.Description + `</span>
           </td>
           <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400"> <!--控制模式-->
               <span id="`+ id2 + `"
                   class="rounded">[控制模式]</span>
           </td>
           <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400"> <!--目前狀態-->
               <span id="`+ id1 + `"
               class="rounded">[狀態]</span>
           </td>
           <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
               <a href="#" onclick="index.setControlModeToScenario('`+ tagNames[0] + `--2')"><i title="情境控制"
                       class="ti ti-chart-candle text-lg text-gray-500 dark:text-gray-400"></i></a>
               <a href="#"  onclick="index.setControlModeToTiming('`+ tagNames[0] + `--2')"><i title="定時控制"
                       class="ti ti-alarm text-lg text-gray-500 dark:text-gray-400"></i></a>
               <a href="#"  onclick="index.setControlModeToManual('`+ tagNames[0] + `--2')"><i title="手動控制"
                       class="ti ti-hand-stop text-lg text-gray-500 dark:text-gray-400"></i></a><br/>
               <a href="#" onclick="index.openWatergate('`+ tagNames[0] + `--3')"><i title="開啟閘門"
                       class="ti ti-arrow-big-top text-lg text-red-500 dark:text-red-400"></i></a>
               <a href="#"  onclick="index.closeWatergate('`+ tagNames[0] + `--4')"><i title="關閉閘門"
                       class="ti ti-arrow-big-down text-lg text-red-500 dark:text-red-400"></i></a>
               <a href="#" onclick="index.stopWatergateOpenClose('`+ tagNames[0] + `--5')"><i title="停止閘門"
                       class="ti ti-player-stop text-lg text-red-500 dark:text-red-400"></i></a>
           </td>
       </tr> 
           
           `;
                // htmlContext += html;

                //#region   田區擋水閘門
                var blockGates = Enumerable.From(tagArray).Where(
                    (x) => x.TagWay == electricBlockWaterGateCode && x.FieldId == tag.FieldId
                ).OrderBy(x => x.FieldId).ThenBy(x => x.TagName).ToArray();
                var blockLength = blockGates.length;

                if (blockLength > 0) {

                    var html0 = ``;
                    console.log("blockLength:" + blockLength)
                    for (var j = 0; j < blockLength; j += 4) {
                        var blockNames = blockGates[j].TagName.split('--');
                        var id1 = blockNames[0] + "--1_" + setting_Staff.tagWayCode.ElectricBlockWaterGateName;// 目前狀態,
                        html0 += `
                        <tr 
                        class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                        <td class="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                        <span>`+ blockGates[j].Description + `</span>
                        </td>
                        <td>
                        </td>
                        <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400"> <!--目前狀態-->
               <span id="`+ id1 + `"
                   class="rounded">[狀態]</span>
           </td>
                        </td>
                        <td class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                       
                        <a href="#" onclick="index.openWatergate('`+ blockNames[0] + `--3')"><i title="開啟閘門"
                                class="ti ti-arrow-big-top text-lg text-red-500 dark:text-red-400"></i></a>
                        <a href="#"  onclick="index.closeWatergate('`+ blockNames[0] + `--4')"><i title="關閉閘門"
                                class="ti ti-arrow-big-down text-lg text-red-500 dark:text-red-400"></i></a>
                        <a href="#" onclick="index.stopWatergateOpenClose('`+ blockNames[0] + `--5')"><i title="停止閘門"
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
     * @method initialRealtimeWaterFlowInformation 初始化即時流量資訊清單
     */
    initialRealtimeWaterFlowInformation: function () {
        // 登入人員資料
        var staff = index.staff;
        // 登入人員依其管理的田區所能處理的測點 
        var tagArray = staff.TagList;
        // 水流量用途的代碼
        var waterFlowMeterCode = setting_Staff.tagWayCode.WaterFlowMeter;
        // 存放水流量資料區域的 ID
        var waterFlowContainerId = 'waterFlowInformation';
        // 存放水流量資料區域的 ID
        var waterFlowContainer = document.getElementById(waterFlowContainerId)
        // 與水流量資訊相關的Tag 集合 
        var tags = Enumerable.From(tagArray).Where(
            (x) => x.TagWay == waterFlowMeterCode
        ).OrderBy(x => x.FieldId).ThenBy(x => x.TagName).ToArray();
        // 測點數量
        var tagLength = tags.length;
        if (tagLength == 0) {
            waterFlowContainer.innerHTML = "没有流量資訊設備資料";
        }
        else {
            // HTML 內容
            var htmlContext = ``;
            for (var i = 0; i < tagLength; i += 2) {
                var tag = tags[i];
                var tagNames = tag.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.WaterFlowMeterName;// 目前,
                var id2 = tagNames[0] + "--2_" + setting_Staff.tagWayCode.WaterFlowMeterName;// 累計
                var html = `
            <tr
            class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
            <td
                class="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center ">
                <span
                class="rounded">
                `+ tag.Description + `</span>
            </td>
           

            <td title="瞬時流量"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
               <span id="`+ id1 + `"
               class="rounded">[瞬時流量]
                </span>
           </td>
           <td title="累計流量"   class="ti  p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
             <span id="`+ id2 + `"
             class="rounded">[累計流量]
              </span>
           </td>
        </tr>`;
                htmlContext += html;
            }
            waterFlowContainer.innerHTML = htmlContext;
        }
    },

    /**
     * @method initialEarthInformationEquipmentList 初始化土壤資訊(溼度)設備清單
     */
    initialEarthInformationEquipmentList: function () {
        // 登入人員資料  
        var staff = index.staff;
        // 登入人員依其管理的田區所能處理的測點
        var tagArray = staff.TagList;
        // 溼度途的代碼
        var moistureMeterCode = setting_Staff.tagWayCode.MoistureMeter;
        // 存放溼度資料地區的 ID
        var moistureMeterContainerId = 'moistureMeterContainer';
        // 存放溼度資料地區
        var moistureMeterContainer = document.getElementById(moistureMeterContainerId)
        // 溼資訊 的Tag 集合 
        var tags = Enumerable.From(tagArray).Where(
            (x) => x.TagWay == moistureMeterCode
        ).OrderBy(x => x.FieldId).ThenBy(x => x.TagName).ToArray();
        //溼度資訊相關測點的數量
        var tagLength = tags.length;
        if (tagLength == 0) {
            moistureMeterContainer.innerHTML = "没有土壤資訊設備資料"
        }
        else {
            var htmlContext = ``;
            for (var i = 0; i < tagLength; i += 2) {
                var tag = tags[i];
                var tagNames = tag.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.MoistureMeterName;// 即時,
                var id2 = tagNames[0] + "--2_??" + setting_Staff.tagWayCode.MoistureMeterName;// 最高
                var html = `
           <tr
           class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
           <td
               class="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
               <span
               class="rounded">
               `+ tag.Description + `</span>
           </td>
           <td 
               class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right" id='`+ id2 + `'>
              
           </td>
           <td
               class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
               <span id='`+ id1 + `'
               class="rounded">+6.8</span>
           </td>
       </tr>`;
                htmlContext += html;
            }
            moistureMeterContainer.innerHTML = htmlContext;
        }
    },

    /**
     * @method initialWaterLevelEquipmentList 初始化水位資訊設備清單
     */
    initialWaterLevelEquipmentList: function () {
        // 登入人員資料
        var staff = index.staff;
        // 登入人員依其管理的田區, 所能處理的測點
        var tagArray = staff.TagList;
        // 水位計用途的代碼
        var waterLevelGaugeCode = setting_Staff.tagWayCode.WaterLevelGauge;
        // 存放水位資訊地方的ID
        var waterLevelContainerId = 'waterLevelContainer';
        // 存放水位資訊的地方
        var waterLevelContainer = document.getElementById(waterLevelContainerId)
        // 水位資訊 的Tag 集合 
        var tags = Enumerable.From(tagArray).Where(
            (x) => x.TagWay == waterLevelGaugeCode
        ).OrderBy(x => x.FieldId).ThenBy(x => x.TagName).ToArray();
        // 水位資訊 Tag 的數量 
        var tagLength = tags.length;
        if (tagLength == 0) {
            waterLevelContainer.innerHTML = "没有水位資訊設備資料";
        }
        else {
            // 水位資訊的內容
            var htmlContext = ``;
            for (var i = 0; i < tagLength; i += 2) {
                var tag = tags[i];
                var tagNames = tag.TagName.split('--');
                var id1 = tagNames[0] + "--1_" + setting_Staff.tagWayCode.WaterLevelGaugeName;// 目前,
                var id2 = tagNames[0] + "--2_??" + setting_Staff.tagWayCode.WaterLevelGaugeName;// 最高
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
                                                    class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400" id='`+ id2 + `'>
                                                  
                        </td>
                        <td
                                                    class="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                                                    <span
                                                    class="rounded"" id='`+ id1 + `'>+6.8</span>
                        </td>
            </tr>
          `;
                htmlContext += html;
            }
            waterLevelContainer.innerHTML = htmlContext;
        }
    },


}