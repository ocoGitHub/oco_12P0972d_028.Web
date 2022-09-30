//const { joinSpans } = require("fullcalendar");

var setting = {
  interval: 3000,
  /**
    * @method getConfig 取得目前的 組態
    * @returns 
    */
  getConfig: function () {
    return setting.configSetting.task;
   //return setting.configSetting.develop;
    //return setting.configSetting.release;
   // return setting.configSetting.master;
  },


  /**
   *@property 系統名稱 
   */
  systemName: '行政院農業委員會農業試驗所',

  /**
   * @property firstPage login 之後進入的綱頁
   */
  firstPage: 'index.html',

  /**
   * @property loginPage 登入的頁面 
   */
  loginPage: 'staffLogin.html',

  /**
   * @property registerPage 註冊用戶的頁面
   */
  registerPage: 'register.html',

  /**
   * @property inputRequireLabelClassName 標示必須輸入的 Class Name
   */
  inputRequireLabelClassName: 'inputRequire',

  /**
   * @property inputRequireMMark 設定為必須輸入的標記
  */
  inputRequireMMark: '<span style="color:red">&nbsp;*</span>',

  /**
   * @property fieldAdminPage 管理田區的頁面 
   */

  fieldAdminPage: 'zk1_TianDistrict.html',
  /**
   * @property nothingFieldId 無關緊要的 田區ID
   */
  nothingFieldId: 'F00',

  /**
   * @method toFirstPage 跳轉到首頁
   */
  toFirstPage: function () {
    window.location.href = setting.firstPage;
  },

  /**
   * @method toLoginPage 跳轉到登入的頁面
   */
  toLoginPage: function () {
    window.location.href = setting.loginPage;
  },

  /**
   * @class configSetting 組態
   */
  configSetting: {
    task: 0,
    develop: 1,
    release: 2,
    master: 3,
  },



  /**
   * @class webApi 關於 Web Api 的設定
   */
  webApi: {
    /**
     * @method getUrl 取得 Web Api 的 URL
     * @returns 
     */
    getUrl: function () {
      var rtnV = '';
      var config = setting.getConfig();
      switch (config) {
        case setting.configSetting.task:
          //rtnV = 'https://127.0.0.1/oco_12P0972d_028_Api/api/';
          //rtnV = 'http://localhost:5177/api/';
          rtnV = 'https://localhost:7177/api/';

          break;
        case setting.configSetting.develop:
          rtnV = 'https://127.0.0.1/oco_12P0972d_028_Api/api/';
          break;
        case setting.configSetting.release:
          rtnV = '';
          break;
        case setting.configSetting.master:
        default:
          rtnV = 'https://ocoservice.oco.com.tw:4028/api/'
          break;
      }
      return rtnV;
    }
  },

  webSignalR: {
    getUrl: function () {
      var rtnV = '';
      var config = setting.getConfig();
      // window.alert('config:' + config)
      switch (config) {
        case setting.configSetting.task:
          rtnV = 'https://ocoservice.oco.com.tw:7028/IotHub';
          // rtnV='https://172.21.208.1:7028/IotHub';
          break;
        case setting.configSetting.develop:
          rtnV = 'https://ocoservice.oco.com.tw:7028/IotHub';
          break;
        case setting.configSetting.release:
          rtnV = '';
          break;
        case setting.configSetting.master:
        default:
          rtnV = 'https://ocoservice.oco.com.tw:7028/IotHub';
          break;
      }
      // window.alert(rtnV);
      return rtnV;
    }
  },

};

/**
 * @class setting_Staff
 */
var setting_Staff = {
  /**
   * @property key 存放人員資料到 storage 的Key
   */
  key: 'staff',

  /**
   * @method getStorage 取得Storage
   * @returns 
   */
  getStorage: function () {
    return sessionStorage;
  },

  /**
   * @class permissionCode 權限代碼
   */
  permissionCode: {
    /**
     * @property systemAdministration 系統管理
     */
    systemAdministration: 1,
    /**
     * @property fieledAdministration 田區管理
     */
    fieledAdministration: 2,
    /**
     * @property systemAdministrationName 系統管理 名稱
     */
    systemAdministrationName: '系統管理',
    /**
    * @property fieledAdministrationName 田區管理 名稱
    */
    fieledAdministrationName: '田區管理'
  },

  /**
   * @class tagValueUsage 測點值用途
   */
  tagValueUsage: {


    /**
     *@property nothing 無關
     */
    nothing: 0,

    /**
     * @property waterIntake 進水
     */
    waterIntake: 1,
    /**
     * @property irrigation 灌溉
     */
    irrigation: 2,
    /**
     * @property drain 排水
     */
    drain: 3,

    //[Description("模式一：水位低限")]
    /**
     * @property waterGateWaterLevelLowBound 模式一：水位低限
     */
    waterGateWaterLevelLowBound: 41,

    /**
    * @property waterGateEarthMoistureLowBound 模式一：溼度低限
    */
    waterGateEarthMoistureLowBound: 42,

    /**
   * @property waterGateStartTimeHour 模式二：開始時間-時
   */
    waterGateStartTimeHour: 43,

    /**
   * @property waterGateStartTimeMinute  模式二：開始時間-分
   */
    waterGateStartTimeMinute: 44,

    /**
   * @property waterGateEndTimeHour 模式二：結束時間-時
   */
    waterGateEndTimeHour: 45,

    /**
   * @property waterGateEndTimeMinute 模式二：結束時間-分
   */
    waterGateEndTimeMinute: 46,

    waterIntakeName: 'waterIntake',

    irrigationName: 'irrigation',

    drainName: 'drain',
  },


  /**
   * @class usingState 使用者狀態
   */
  usingState: {
    /**
     * @property  registered 註冊
     */
    registered: 0,
    /**
     * @property activated 啟用
     */
    activated: 1,

    /**
     * @property disabled 停用
     */
    disabled: 2


  },

  /**
   * @class 測點用途代碼
   */
  tagWayCode: {
    /**
     *@property  Nothing 無關用途
     */
    Nothing: 0,
    /**
     * @property MoistureMeter 溼度計
     */
    MoistureMeter: 1,

    /**
     * @property DefinedMoistureMeter 自定義溼度計
     */
    DefinedMoistureMeter:11,
    /**
     * @property WaterFlowMeter 水流計
     */
    WaterFlowMeter: 2,
    /**
     * @property WaterLevelGauge 水位計
     */
    WaterLevelGauge: 3,
    /**
     * @property DefinedWaterLevelGauge 自定義水位計
     */
     DefinedWaterLevelGauge: 31,
    
    /**
     * @proprty ElectricWaterGate 公共電動進水擋水閘門, 田區進水閘門
     */
    ElectricWaterGate: 4,
    /**
      * @proprty ElectricBlockWaterGate  田區擋水閘門
      */
    ElectricBlockWaterGate: 41,

    MoistureMeterName: 'moistureMeterName',

    WaterFlowMeterName: 'waterFlowMeterName',
    WaterLevelGaugeName: 'waterLevelGauge',
    ElectricWaterGateName: 'electricWaterGate',
    ElectricBlockWaterGateName: 'electricBlockWaterGate',
    DefinedMoistureMeterName:'definedMoistureMeter',
    DefinedWaterLevelGaugeName:'definedWaterLevelGauge',
  },
  /**
   * @method saveStaffJson 將用戶資料(JSON)存入 Storage
   * @param {*} staffJson 
   */
  saveStaffJson: function (staffJson) {

    var storage = setting_Staff.getStorage();
    storage.setItem(setting_Staff.key, staffJson);
  },

  /**
   * @method saveStaff 用戶資料(物件)存入 Storage(轉作JSON 再存)
   * @param {*} staffObj 
   */
  saveStaff: function (staffObj) {
    var jSon = JSON.stringify(staffObj);
    setting_Staff.saveStaffJson(jSon)
  },

  /**
   * @method getStaffJson  取得 Staff 物件的 Json
   */
  getStaffJson: function () {
    var storage = setting_Staff.getStorage();
    var json = storage.getItem(setting_Staff.key);
    return json;
  },
  /**
   * @method getStaff 從Storage 取得 Staff 物件資料
   * @returns 
   */
  getStaff: function () {

    var json = setting_Staff.getStaffJson()
    return JSON.parse(json);
  },

  /**
   * @method clear 清除 Storage
   */
  clear() {
    var storage = setting_Staff.getStorage();
    storage.clear();
  },

  /**
   * @class staff 登入後所得到的人員資料
   */
  staff: {
    Name: '',
    Token: '',
    PermissionCode: 0,
    PermissionText: '',
    Email: '',
    LineId: '',
    StaffId: '',
    /**
     * @property FieldsAdmList 管理的田區集合
     */
    FieldsAdmList: [
      {
        FieldId: '',
        FieldDescription: '',
        FieldName: ''
      }
    ],
    /**
     * @property TagList 依管理田區所得可處理的測點集合
     */
    TagList: [
      {
        // 各測點屬性: 
        // 請參照 Web Api 的 Oco.D028.WebApi.MainApi.Poco.StaffPoco.StaffLoginTagDetail 類別
      }
    ]
  },

  /**
   * @method getPrecisionFloat 將數字指定至小數後n位, 在n+1位四拾五入
   * @param {number} number  原始小數
   * @param {int32} precision 小數點後位數
   */
  getPrecisionFloat: function (number, precision) {
    var index = Math.pow(10, precision);
    var rtnV = Math.round((number + Number.EPSILON) * index) / index;
    rtnV = rtnV.toFixed(precision)
    return rtnV;
  },

  /**
   * @class waterGateControlMode 水閘門控制模式
   */
  waterGateControlMode: {
    manual: 0,
    scenario: 1,
    timing: 2,
    /**
     * @method getText 取
     * @param {*} mode 
     * @returns 
     */
    getText: function (mode) {
      var rtnV = '';
      if (mode == this.manual) {
        rtnV = "手動控制";
      }
      else if (mode == this.scenario) {
        rtnV = "情境控制";
      }
      else /*if(mode==this.timing)*/ {
        rtnV = "定時控制";
      }
      return rtnV;
    }
  },
  waterGateControl: {

    /**
     * @method setWaterGateWaterLevelLowBound 設定模式一水位低限
     * @param {*} tag 
     * @param {*} boundValue 
     */
    setWaterGateWaterLevelLowBound: function (tag, boundValue, signalR) {
      var json = JSON.stringify([
        {
          TagName: tag.TagName,
          Address: tag.ModbusAddress,
          DataType: tag.DataType,
          Value: boundValue.toString(),
          PLC: tag.Plc,
          // ModbusAddress:tag.ModbusAddress,
          Description: tag.Description,
        }
      ]
      );
      this.invoke_SetModbusValue(json, signalR)
    },
    /**
     * @method setWaterGateEarthMoistureLowBound 設定模式一溼度低限
     * @param {*} tag 
     * @param {*} boundValue 
     */
    setWaterGateEarthMoistureLowBound: function (tag, boundValue, signalR) {
      var json = JSON.stringify([
        {
          TagName: tag.TagName,
          Address: tag.ModbusAddress,
          DataType: tag.DataType,
          Value: boundValue.toString(),
          PLC: tag.Plc,
          // ModbusAddress:tag.ModbusAddress,
          Description: tag.Description,
        }
      ]
      );
      this.invoke_SetModbusValue(json, signalR)
    },
    setWaterGateStartTime: function (hTag, mTag, hour, minute, signalR) {
      var json = JSON.stringify([
        {
          TagName: hTag.TagName,
          Address: hTag.ModbusAddress,
          DataType: hTag.DataType,
          Value: hour.toString(),
          PLC: hTag.Plc,
          // ModbusAddress:tag.ModbusAddress,
          Description: hTag.Description,
        },
        {
          TagName: mTag.TagName,
          Address: mTag.ModbusAddress,
          DataType: mTag.DataType,
          Value: minute.toString(),
          PLC: mTag.Plc,
          // ModbusAddress:tag.ModbusAddress,
          Description: mTag.Description,
        },
      ]
      );
      this.invoke_SetModbusValue(json, signalR)
    },

    setWaterGateEndTime: function (hTag, mTag, hour, minute, signalR) {
      var json = JSON.stringify([
        {
          TagName: hTag.TagName,
          Address: hTag.ModbusAddress,
          DataType: hTag.DataType,
          Value: hour.toString(),
          PLC: hTag.Plc,
          // ModbusAddress:tag.ModbusAddress,
          Description: hTag.Description,
        },
        {
          TagName: mTag.TagName,
          Address: mTag.ModbusAddress,
          DataType: mTag.DataType,
          Value: minute.toString(),
          PLC: mTag.Plc,
          // ModbusAddress:tag.ModbusAddress,
          Description: mTag.Description,
        },
      ]
      );
      this.invoke_SetModbusValue(json, signalR)
    },


    /**
     * @method setWaterGateControlModeToManualMode 水閘門切換到手動控制模式
     * 
     */
    setWaterGateControlModeToManualMode: function (tag, signalR) {
      this._setWaterGateControlMode(tag, setting_Staff.waterGateControlMode.manual, signalR);
    },

    /**
     * @method setWaterGateControlModeToTimingMode 水閘門切換到定時控制模式
     * 
     */
    setWaterGateControlModeToTimingMode: function (tag, signalR) {
      this._setWaterGateControlMode(tag, setting_Staff.waterGateControlMode.timing, signalR);
    },

    /**
     * @method setWaterGateControlModeToScenarioMode 水閘門切換到情境控制模式
     * 
     */
    setWaterGateControlModeToScenarioMode: function (tag, signalR) {
      this._setWaterGateControlMode(tag, setting_Staff.waterGateControlMode.scenario, signalR);
    },
    stopWatergateOpenClose: function (tag, signalR) {
      this._operateWaterGateOpenClose(tag, signalR);
    },
    closeWatergate: function (tag, signalR) {
      this._operateWaterGateOpenClose(tag, signalR);
    },
    openWatergate: function (tag, signalR) {
      this._operateWaterGateOpenClose(tag, signalR);
    },

    /**
      * @method _setWaterGateControlMode 控制水間門開關操作
      * 
      */
    _operateWaterGateOpenClose: function (tag, signalR) {
      // window.alert("tagName:" + tagName + " / mode:" + mode )
      // window.alert(tag.PLC);
      var json = JSON.stringify([
        {
          TagName: tag.TagName,
          Address: tag.ModbusAddress,
          DataType: tag.DataType,
          Value: "True",//;action.toString(),
          PLC: tag.Plc,
          // ModbusAddress:tag.ModbusAddress,
          Description: tag.Description,
        }
      ]
      );
      this.invoke_SetModbusValue(json, signalR)
      //console.log("_operateWaterGateOpenClose:" + json);
      //呼叫 Signal R
    },


    /**
     * @method _setWaterGateControlMode 切換水閘門控制模式
     * 
     */
    _setWaterGateControlMode: function (tag, mode, signalR) {
      // window.alert("tagName:" + tagName + " / mode:" + mode )
      //  window.alert(tag.PLC);
      var json = JSON.stringify([
        {
          TagName: tag.TagName,
          Address: tag.ModbusAddress,
          DataType: tag.DataType,
          Value: mode.toString(),
          PLC: tag.Plc,
          // ModbusAddress:tag.ModbusAddress,
          Description: tag.Description,
        }
      ]
      );
      this.invoke_SetModbusValue(json, signalR)
      //window.alert(json)
      //呼叫 Signal R
    },

    invoke_SetModbusValue: function (json, signalR) {
     // json=json.replace('--','@@');
      if (signalR.sendMode) {
        signalR.connection.invoke("SetModbusValue", json);
      }
      console.log("SendMode:" + signalR.sendMode + ", invoke_SetModbusValue:" + json);
    }
  },

  /**
   * @class waterGateState 水閘門狀態
   */
  waterGateState: {
    completeClose: 0,
    halfOpen: 1,
    completeOpen: 2,
    getText: function (state) {
      var rtnV = '';
      if (state == this.completeClose) {
        rtnV = '全關';
      }
      else if (state == this.halfOpen) {
        rtnV = '半開';
      }
      else if (state == this.completeOpen) {
        rtnV = '全開';
      }
      return rtnV;
    }


  },
};

/**
 * @method setting_DeviceTypes 設備類型 
 */
var setting_DeviceTypes = {
  deviceType: {
    tagValueUsag: 100,
    tagWay: 200
  },
  codeNamePairs: [
    {
      code: 1,     // 配合API調整
      text: "進水量",
      sn: 1,
      type: () => setting_DeviceTypes.deviceType.tagValueUsag,
    },
    {
      code: 2,  // 配合API調整
      text: "灌溉量",
      sn: 2,
      type: () => setting_DeviceTypes.deviceType.tagValueUsag
    },
    {
      code: 3,  // 配合API調整
      text: '排水量',
      sn: 3,
      type: () => setting_DeviceTypes.deviceType.tagValueUsag
    },
    {
      code: 1,    // 配合API調整
      text: '土壤溼度計',
      sn: 4,
      type: () => setting_DeviceTypes.deviceType.tagWay
    },
    {
      code: 2,      // 配合API調整
      text: '即時流量',
      sn: 5,
      type: () => setting_DeviceTypes.deviceType.tagWay
    },
    {
      code: 3,  // 配合API 高整
      text: '水位計',
      sn: 6,
      type: () => setting_DeviceTypes.deviceType.tagWay
    }
  ],


  /**
   * @method getDeviceByCode 按照代碼取得 Device 資料
   * @param {*} code 
   * @returns 
   */
  getDeviceByCode: function (code) {
    var t = Enumerable.From(setting_DeviceTypes.codeNamePairs).
      Where(m => m.code + m.type() == code).
      ToArray();
    if (t.length == 0) { return null; }
    else {
      return t[0];
    }
  },

  /**
   * @method getHtmlSelectOptionHtml 取得 HTML Select 的Option 內容 
   */
  getSelectOptionHtml: function () {
    var html = '';
    try {
      var pairs = Enumerable.From(setting_DeviceTypes.codeNamePairs).
        OrderBy(m => m.sn).
        ToArray();
      var length = pairs.length;
      for (var i = 0; i < length; i++) {
        var pair = pairs[i];
        html +=
          `<option value="` +
          (pair.code + pair.type())
          + `">` +
          pair.text
          +
          `</option>`
      }
    }
    catch (ex) {
      // window.alert(ex);
    }

    return html;
  }


};

var setting_TimeDuration = {
  durations: [
    {    // 與API 配合調整
      code: 1,
      text: '一個月'
    },
    {    // 與API 配合調整
      code: 2,
      text: '半個年'
    },
    {    // 與API 配合調整
      code: 3,
      text: '一年'
    },
  ],

};

var setting_functions = {

  /**
   * 
   * @param {*} date 
   * @returns 
   */
  getDateString: function (date) {
    // window.alert(date.toString());
    var toDay = date;
    var year = toDay.getFullYear();
    var yearText = year.toString();
    var month = toDay.getMonth() + 1;
    var monthText = month < 10 ? '0' + month : month.toString();
    var date = toDay.getDate();
    var dateText = date < 10 ? '0' + date : date.toString();
    return yearText + "-" + monthText + "-" + dateText;
  }

};

var setting_Alarm = {
  alarmState: {
    alarm: 1,
    normal: 2,
  }
};

var setting_DateTime = {
  getHourSelectOptionHtml: function () {
    var html = '';
    for (var i = 0; i < 24; i++) {
      html += '<option value="' + i + '">' + i + '</option>'
    }
    return html;
  },
  getMinuteSelectOptionHtml: function () {
    var html = '';
    for (var i = 0; i < 60; i++) {
      html += '<option value="' + i + '">' + i + '</option>'
    }
    return html;
  },


};

var setting_Style = {
  /**
   * @property positiveTailWindClassNames 具正向意味(如: 開, 正數 )的 Tail Wind 類別名稱 集合
   */
  positiveTailWindClassNames: [
    "bg-green-100", "text-green-700", "dark:text-green-600"
  ],
  /**
   * @property negtiveTailWindClassNames 具負向意味(如: 關, 負數 )的 Tail Wind 類別名稱 集合
   */
  negtiveTailWindClassNames: [
    "bg-red-100", "text-red-700", "dark:text-red-600"
  ],

  /**
   * @property middleTailWindClassNames 具中性意味(如: 暫停, 0 )的 Tail Wind 類別名稱 集合
   */
  middleTailWindClassNames: [
    "bg-blue-100", "text-blue-700", "dark:text-blue-600"
  ],
  removePositiveTailWindClassNames: function (jq) {
    var classNames = setting_Style.positiveTailWindClassNames;
    for (var i = 0; i < classNames.length; i++) {
      if (jq.hasClass(classNames[i])) {
        jq.removeClass(classNames[i]);
      }
    }
  },
  removeNegtiveTailWindClassNames: function (jq) {
    var classNames = setting_Style.negtiveTailWindClassNames;
    for (var i = 0; i < classNames.length; i++) {
      if (jq.hasClass(classNames[i])) {
        jq.removeClass(classNames[i]);
      }
    }
  },
  removeMiddleTailWindClassNames: function (jq) {
    var classNames = setting_Style.middleTailWindClassNames;
    for (var i = 0; i < classNames.length; i++) {
      if (jq.hasClass(classNames[i])) {
        jq.removeClass(classNames[i]);
      }
    }
  },
  addPositiveTailWindClassNames: function (jq) {
    var classNames = setting_Style.positiveTailWindClassNames;
    for (var i = 0; i < classNames.length; i++) {
      jq.addClass(classNames[i])
    }
  },
  addNegtiveTailWindClassNames: function (jq) {
    var classNames = setting_Style.negtiveTailWindClassNames;
    for (var i = 0; i < classNames.length; i++) {
      jq.addClass(classNames[i])
    }
  },
  addMiddleTailWindClassNames: function (jq) {
    var classNames = setting_Style.middleTailWindClassNames;
    for (var i = 0; i < classNames.length; i++) {
      jq.addClass(classNames[i])
    }
  },

  /**
   * @property changeTailWindClassNamesByValue 依值套用 TailWind的Class//
   * @param {*} id 
   * @param {*} value 
   */
  changeTailWindClassNamesByValue: function (id, value) {
    //console.log("#" + id);
    if(value > -0.005 && value < 0.005){value=0;}
    try {

     
      var jq = $("#" + id);

      setting_Style.removePositiveTailWindClassNames(jq);

      setting_Style.removeNegtiveTailWindClassNames(jq);
      setting_Style.removeMiddleTailWindClassNames(jq);

      if (value > 0) {
        setting_Style.addPositiveTailWindClassNames(jq);
      }
      else if (value < 0) {
        setting_Style.addNegtiveTailWindClassNames(jq);
      }
      else if (value == 0) {
        setting_Style.addMiddleTailWindClassNames(jq);
      }
    }
    catch (ex) {

          console.log("Error:" +   ex);
    }
  },

}