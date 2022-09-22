//const { makeMap } = require("@vue/shared");

document.write('<script src="assets/libs/jquery/jquery.min.js"></script>')
//document.write('<script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>');
document.write('<script src="assets/libs/vue/vue.global.js"></script>');
document.write('<script src="assets/js/setting.js"></script>');
document.write('<script src="assets/js/webApi.js"></script>');
document.write('<script src="assets/js/getTagData.js"></script>');
document.write('<script src="assets/js/dataTableNoAjax.js"></script>');

function permissionSelectChange() {
  zk1_UserManagement.setStaffPermission.permissionSelectorChange();
};
function setPermission() {
  zk1_UserManagement.setStaffPermission.setPermission();
};
function closeSetPermision() {
  zk1_UserManagement.setStaffPermission.closeSetPermissionArea();
};

var zk1_UserManagement = {

  getTagDataOk: function (rtnData, mainGate, alarmHistories) {


    //設定警報歷史資料(在 Horizontal.html)
    horizontal.displayAlarmHistory(alarmHistories)

  },
  getTagDataFailed: function (errObj) {
    zk1_TianDistric.getDataErrObj = errObj;
  },

  /**
   * @property managedStaffList 被管制的 人員資料(含人員所管理的田區資料) 
   */
  managedStaffList: null,
  /**
   *@property allFieldList 所有田區
   * */
  allFieldList: null,
  staff: null,

  getStaffById: function (staffId) {
    var staffList = zk1_UserManagement.managedStaffList.StaffList;
    var staffs = Enumerable.From(staffList).Where(m => m.StaffId == staffId).ToArray();
    if (staffs.length == 0) { return null; }
    else {
      return staffs[0];
    }
  },
  startUp: function (staff) {
    zk1_UserManagement.staff = staff;
    zk1_UserManagement.getStaff.displayWaitingArea();
    zk1_UserManagement_GetStaff.execute();


    var alarmLevel = 0;
    var id = zk1_UserManagement.staff.StaffId;

    if (zk1_UserManagement.staff.PermissionCode == setting_Staff.permissionCode.systemAdministration) {
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

  },

  /**
   * @property setStaffPermission 設定使用者權限
   */
  setStaffPermission: {
    startUp: function () {
      zk1_UserManagement.setStaffPermission.initialFieldCheckBox();
    },
    setPemissionAreaId: "setPemissionArea",
    setPermissionFieldsId: 'setPermissionFields',
    setPermissionPermissionsId: 'setPermissionPermissions',
    setPermissionFieldCheckBoxName: 'fieldsCheckBox',
    setPermissionFieldCheckBoxIdPrefix: "chek_",
    setPermissionFieldsSystemAdmNoteId: 'setPermissionFieldsSystemAdmNote',
    setPemissionStaffIdId: 'setPemissionStaffId',
    setPemissionStaffNameId: 'setPemissionStaffName',
    setPermissionWaitingAlarmAreaId: 'setPermission_Watting',
    setPermissionOkAlarmAreaId: 'setPermission_OK',
    setPermissionErrAlarmAreaId: 'setPermission_Err',
    setPermissionErrTextAreaId: 'setPermission_ErrText',
    hideAlarms: function () {
      document.getElementById(this.setPermissionWaitingAlarmAreaId).style.display = 'none';
      document.getElementById(this.setPermissionOkAlarmAreaId).style.display = 'none';
      document.getElementById(this.setPermissionErrAlarmAreaId).style.display = 'none';
    },
    displayWaitingAlarm: function () {
      this.hideAlarms();
      document.getElementById(this.setPermissionWaitingAlarmAreaId).style.display = '';
    },
    displaOkAlarm: function () {
      this.hideAlarms();
      document.getElementById(this.setPermissionOkAlarmAreaId).style.display = '';
    },
    displaErrAlarm: function (errText) {
      this.hideAlarms();
      document.getElementById(this.setPermissionErrAlarmAreaId).style.display = '';
      document.getElementById(this.setPermissionErrTextAreaId).innerText = errText;
    },

    closeSetPermissionArea: function () {
      document.getElementById(this.setPemissionAreaId).style.display = 'none';
    },
    displaySetPermissionArea: function () {
      document.getElementById(this.setPemissionAreaId).style.display = '';
    },

    /**
     * @method  initialFieldCheckBox 初始化 田區的Check Box 列表
     */
    initialFieldCheckBox: function () {
      var id = this.setPermissionFieldsId;
      var ele = document.getElementById(id);
      var allfields = zk1_UserManagement.allFieldList;
      var length = allfields.length;
      var html = '';
      for (var i = 0; i < length; i++) {
        var id = this.setPermissionFieldCheckBoxIdPrefix + allfields[i].FieldId;
        html += `
              <span>
              <input id="`+ id + `"type="checkbox" name='fieldsCheckBox' value="` + allfields[i].FieldId + `">&nbsp;
              <label for="`+ id + `">` + allfields[i].FieldId + `</lable>&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              `;
      }
      ele.innerHTML = html;
    },

    setPermission: function () {
      var staffId = document.getElementById(this.setPemissionStaffIdId).innerText;
      var permission = document.getElementById(this.setPermissionPermissionsId).value;
      var fieldIds = Enumerable.From(document.getElementsByName(this.setPermissionFieldCheckBoxName)).
        Where(m => m.checked).Select(m => m.value).ToArray();
      this.displayWaitingAlarm();
      // 將 人員資料 Table暫時隱藏 
      document.getElementById(zk1_UserManagement.getStaff.okAreaId).style.display = 'none';
      zk1_UserManagement_setStaffPermission.execute({
        StaffToken: zk1_UserManagement.staff.Token,
        TargetStaffId: staffId,
        TargetStaffFieldIdList: fieldIds,
        TargetStaffPermission: permission
      });
    },

    /**
     * @class preWork 設定權限的前置動作
     */
    preWork: function (staffId) {

      // 被設定的人員
      var targetStaff = Enumerable.From(zk1_UserManagement.managedStaffList.StaffList).
        Where(m => m.StaffId == staffId).ToArray()[0];
      // 管理田區的集合
      var manageFields = targetStaff.ManageFieldList;
      //#region 管理田區預設值
      var checkBoxs = document.getElementsByName(this.setPermissionFieldCheckBoxName);
      for (var i = 0; i < checkBoxs.length; i++) {
        checkBoxs[i].checked = false;
      }
      for (var i = 0; i < manageFields.length; i++) {
        var id = this.setPermissionFieldCheckBoxIdPrefix + manageFields[i].FieldId;
        document.getElementById(id).checked = true;
      }
      //#endregion

      //#region 權限 預設值
      var permission = targetStaff.Permission
      var permissionSelector = document.getElementById(this.setPermissionPermissionsId);
      permissionSelector.value = permission;
      this.permissionSelectorChange();
      //#endregion

      //#region 設定Staff Id, Staff Name 顯示
      var staffIdEle = document.getElementById(this.setPemissionStaffIdId);
      var staffNameEle = document.getElementById(this.setPemissionStaffNameId);
      staffIdEle.innerText = targetStaff.StaffId;
      staffNameEle.innerText = targetStaff.StaffName;
      //#endregion

      // 顯示設定區
      zk1_UserManagement.setStaffPermission.displaySetPermissionArea();

    },
    permissionSelectorChange: function () {
      var permissionSelector = document.getElementById(this.setPermissionPermissionsId);
      var value = permissionSelector.value;
      // window.alert(value);
      var checkBoxEle = document.getElementById(this.setPermissionFieldsId);
      var noteEle = document.getElementById(this.setPermissionFieldsSystemAdmNoteId);
      if (value == setting_Staff.permissionCode.systemAdministration) {
        // 選定系統管理員,不必再選田區 
        checkBoxEle.style.display = 'none';
        noteEle.style.display = '';
      }
      else {
        checkBoxEle.style.display = '';
        noteEle.style.display = 'none';
      }
    }
  },

  /**
   *@class setStaffState 使用者狀態-- 停用或啟用
   * */
  setStaffState: {
    waitAreaId: 'setStaff_Watting',
    okAreaId: 'setStaff_OK',
    failedAreaId: 'setStaff_Failed',
    failedTextId: 'setStaff_ErrArea',
    hideAreas: function () {
      var parent = zk1_UserManagement.setStaffState;
      document.getElementById(parent.waitAreaId).style.display = 'none';
      document.getElementById(parent.failedAreaId).style.display = 'none';
      document.getElementById(parent.okAreaId).style.display = 'none';
    },
    displayWaitArea: function () {
      zk1_UserManagement.setStaffState.hideAreas();
      zk1_UserManagement.getStaff.hideAreas();
      document.getElementById(zk1_UserManagement.setStaffState.waitAreaId).style.display = '';

    },
    displayOkArea: function () {
      zk1_UserManagement.setStaffState.hideAreas();
      zk1_UserManagement.getStaff.hideAreas();
      document.getElementById(zk1_UserManagement.setStaffState.okAreaId).style.display = '';
    },
    displayFaildArea: function () {
      zk1_UserManagement.setStaffState.hideAreas();
      zk1_UserManagement.getStaff.hideAreas();
      document.getElementById(zk1_UserManagement.setStaffState.failedAreaId).style.display = '';
    },
    displayErrText: function (text) {

      document.getElementById(zk1_UserManagement.setStaffState.failedTextId).innerText = text;
    },
    setUsingState: function (staffId) {
      //window.alert(staffId)
      var staff = Enumerable.From(dataTableNoAjax.data).
        Where(m => m.StaffId == staffId).ToArray()[0];

      var targetStatus = 0;
      if (staff.UsingState == setting_Staff.usingState.activated) {
        targetStatus = setting_Staff.usingState.disabled;
      }
      else /*if(staff.UsingState==setting_Staff.usingState.disabled || staff.UsingState==setting_Staff.usingState.registered) */ {
        targetStatus = setting_Staff.usingState.activated
      }
      //window.alert(staffId +"/" + targetStatus );
      zk1_UserManagement.setStaffState.displayWaitArea();
      zk1_UserManagement_setUsingState.execute(
        {
          StaffToken: zk1_UserManagement.staff.Token,
          TargetStaffId: staffId,
          TargetState: targetStatus,
        }

      );
    },
  },

  /**
   * @class getStaff 取得用戶資料
   * 
   */
  getStaff: {
    waitingAreaId: 'downloadStaff_WaitingArea',
    failedAreaId: 'downloadStaff_FailedArea',
    okAreaId: 'downloadStaff_OKArea',
    errTextAreaId: 'downloadStaff_ErrArea',
    staffListAreaId: 'staffList',
    // 編輯Id 的前置字串
    optionEditIdPrefix: 'optionEdit_',
    // 帳戶啟用/停用Id 的前置字串
    optionStateIdPrefix: 'optionState_',
    // 顯示Staff 狀態
    setStateIdPrefix: 'setStatus_',

    setPermissionPrefix: 'setPermission_',

    setFieldPrefix: 'setField_',
    hideAreas: function () {
      var parent = zk1_UserManagement.getStaff;
      document.getElementById(parent.waitingAreaId).style.display = 'none';
      document.getElementById(parent.failedAreaId).style.display = 'none';
      document.getElementById(parent.okAreaId).style.display = 'none';
    },
    displayWaitingArea: function () {
      zk1_UserManagement.setStaffState.hideAreas();
      zk1_UserManagement.getStaff.hideAreas();
      document.getElementById(zk1_UserManagement.getStaff.waitingAreaId).style.display = '';
    },
    displayFailedArea: function () {
      zk1_UserManagement.setStaffState.hideAreas();
      zk1_UserManagement.getStaff.hideAreas();
      document.getElementById(zk1_UserManagement.getStaff.failedAreaId).style.display = '';
    },


    /**
     * @method displayOkArea 顯示 Staff List 資料列表
     * @param {*} firstDrawStaffList  是否第一次繪出列表
     */
    displayOkArea: function (firstDrawStaffList) {
      zk1_UserManagement.setStaffState.hideAreas();
      zk1_UserManagement.getStaff.hideAreas();
      document.getElementById(zk1_UserManagement.getStaff.okAreaId).style.display = '';
      if (firstDrawStaffList) {
        zk1_UserManagement.getStaff.showManagedStaff();
      }

    },
    displayErrText: function (text) {
      zk1_UserManagement.getStaff.displayFailedArea()
      document.getElementById(zk1_UserManagement.getStaff.errTextAreaId).innerText = text;
    },



    showManagedStaff: function () {

      dataTableNoAjax.data = zk1_UserManagement.managedStaffList.StaffList;
      var length = dataTableNoAjax.data.length;
      for (var i = 0; i < length; i++) {
        var idEdit = zk1_UserManagement.getStaff.optionEditIdPrefix + dataTableNoAjax.data[i].StaffId;
        var idUpdataState = zk1_UserManagement.getStaff.optionStateIdPrefix + dataTableNoAjax.data[i].StaffId;
        dataTableNoAjax.data[i].UsingStateTextStyle = '';

        // 操作按鈕
        dataTableNoAjax.data[i].Option = `
                <button class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline  font-bold  text-white rounded"
                onclick='zk1_UserManagement_resetStaffPassword.execute("`+ dataTableNoAjax.data[i].StaffId + `")' style='background:orange' >重設密碼</button>
                ` +


          `<!--權限-->    
                <button class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-blue-500 font-bold  text-white rounded"
                onclick='zk1_UserManagement.setStaffPermission.preWork("`+ dataTableNoAjax.data[i].StaffId + `")' id="` + idEdit + `" style='background:blue' >權限</button>
                `;
        //#region 啟用/停用帳戶
        if (dataTableNoAjax.data[i].UsingState == setting_Staff.usingState.registered ||
          dataTableNoAjax.data[i].UsingState == setting_Staff.usingState.disabled) {
          dataTableNoAjax.data[i].Option += `
                       <button class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded"
                       onclick='zk1_UserManagement.setStaffState.setUsingState("`+ dataTableNoAjax.data[i].StaffId + `")' 
                       id="`+ idUpdataState + `" style='background:green'>啟用帳戶</button>
                        `;

        }
        else if (dataTableNoAjax.data[i].UsingState = setting_Staff.usingState.activated) {
          dataTableNoAjax.data[i].Option += `
                    <button class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold  text-white rounded" 
                        onclick='zk1_UserManagement.setStaffState.setUsingState("`+ dataTableNoAjax.data[i].StaffId + `")' 
                        id="`+ idUpdataState + `"  style='background:red'>停用帳戶</button>
                          `;

        }
        //#endregion 啟用/停用帳戶
        var idStatusText = zk1_UserManagement.getStaff.setStateIdPrefix + dataTableNoAjax.data[i].StaffId;

        // 狀態
        dataTableNoAjax.data[i].UsingStateTextStyle = '';
        if (dataTableNoAjax.data[i].UsingState == setting_Staff.usingState.activated) {
          dataTableNoAjax.data[i].UsingStateTextStyle = `<span style='color:green' id='` + idStatusText + `'>` +
            dataTableNoAjax.data[i].UsingStateText + `</span>`;
        }
        else if (dataTableNoAjax.data[i].UsingState == setting_Staff.usingState.registered) {
          dataTableNoAjax.data[i].UsingStateTextStyle = `<span style='color:gray' id='` + idStatusText + `'>` +
            dataTableNoAjax.data[i].UsingStateText + `</span>`;
        }
        else /*if(dataTableNoAjax.data[i].UsingState=setting_Staff.usingState.disabled)*/ {
          dataTableNoAjax.data[i].UsingStateTextStyle = `<span style='color:red' id='` + idStatusText + `'>` +
            dataTableNoAjax.data[i].UsingStateText + `</span>`;
        }
        // 權限
        dataTableNoAjax.data[i].PermissionTextStyle = '';
        var idPermissionText = zk1_UserManagement.getStaff.setPermissionPrefix + dataTableNoAjax.data[i].StaffId;
        dataTableNoAjax.data[i].PermissionTextStyle =
          `<span id="` + idPermissionText + `">` +
          dataTableNoAjax.data[i].PermissionText;
        +`</span>`;

        // 管理田區
        dataTableNoAjax.data[i].ManageFieldNamesStyle = '';
        var idFieldText = zk1_UserManagement.getStaff.setFieldPrefix + dataTableNoAjax.data[i].StaffId;
        dataTableNoAjax.data[i].ManageFieldNamesStyle =
          `<span id="` + idFieldText + `">` +
          dataTableNoAjax.data[i].ManageFieldNames;
        +`</span>`;
      }

      dataTableNoAjax.columns = [

        { data: 'StaffId' }, { data: 'StaffName' },
        { data: 'UsingStateTextStyle' }, { data: 'UsingState', "visible": false },
        { data: 'PermissionTextStyle' }, { data: 'Permission.', "visible": false },

        { data: 'Email' }, { data: 'LineId' }, { data: 'PhoneNumber' },
        { data: 'ManageFieldNamesStyle' },
        { data: 'Option', "orderable": false }
      ];



      dataTableNoAjax.buttons.buttons = dataTableNoAjax_defaultButtons;
      $('#staffList').DataTable(dataTableNoAjax);

    }


  },

};

var zk1_UserManagement_setStaffPermission = {
  apiResourceName: 'Staff/SetStaffPermission',
  execute: function (requestParameters) {
    //window.alert(JSON.stringify(requestParameters));
    webApi.send(
      webApi.methods.post,
      zk1_UserManagement_setStaffPermission.apiResourceName,
      requestParameters,// 没有Request 參數
      zk1_UserManagement_setStaffPermission.beforeSendCallback,
      zk1_UserManagement_setStaffPermission.okCallback,
      zk1_UserManagement_setStaffPermission.failedCallback,
      zk1_UserManagement_setStaffPermission.completeCallback,
    );
  },
  beforeSendCallback: function () {

  },
  okCallback: function (result, resultText, status) {
    // 設定 Permission
    // 設定 PermisionText
    var realOk = webApi.isApiResultOK(result.ReturnCode);
    if (realOk) {
      var rtnData = result.Detail;// 回傳資料
      var rtnStaffId = rtnData.StaffId;
      var rtnStaffPermisson = rtnData.Permission;
      var rtnStaffPermissonText = rtnData.PermissionText;
      var rtnManageFields = rtnData.ManageFields;
      var rtnManageFieldNames = rtnData.ManageFieldNames;
      var staff = zk1_UserManagement.getStaffById(rtnStaffId);
      staff.Permission = rtnStaffPermisson;
      staff.PermissionText = rtnStaffPermissonText;
      staff.ManageFieldList = rtnManageFields;
      staff.ManageFieldNames = rtnManageFieldNames;
      // 更新畫面 
      // 權限;
      var id = zk1_UserManagement.getStaff.setPermissionPrefix + rtnStaffId;
      document.getElementById(id).innerHTML = staff.PermissionText;
      id = zk1_UserManagement.getStaff.setFieldPrefix + rtnStaffId;
      document.getElementById(id).innerHTML = staff.ManageFieldNames;

      zk1_UserManagement.setStaffPermission.displaOkAlarm();
      setTimeout(
        function () {
          zk1_UserManagement.setStaffPermission.hideAlarms()
        }, setting.interval);
      document.getElementById(zk1_UserManagement.getStaff.okAreaId).style.display = '';
    }
    else {
      zk1_UserManagement.setStaffPermission.displaErrAlarm(result.ReturnMessage + "(" + result.ReturnCode + ")");

      setTimeout(
        function () {
          zk1_UserManagement.setStaffPermission.hideAlarms();
        }, setting.interval);
      document.getElementById(zk1_UserManagement.getStaff.okAreaId).style.display = '';
    }
  },
  failedCallback: function (err) {
    zk1_UserManagement.setStaffPermission.displaErrAlarm(err.statusText + "(" + err.status + ")");

    setTimeout(
      function () {
        zk1_UserManagement.setStaffPermission.hideAlarms()
      }, setting.interval);
    document.getElementById(zk1_UserManagement.getStaff.okAreaId).style.display = '';
  },
  completeCallback: function () {

  }

};


/**
 * @class  zk1_UserManagement_setUsingState 設定 使用狀態
 */
var zk1_UserManagement_setUsingState = {
  apiResourceName: 'Staff/SetStaffUsingState',

  execute: function (requestParameters) {
    // window.alert(requestParameters.StaffToken);
    //window.alert(requestParameters.TargetStaffId);
    //window.alert(requestParameters.TargetState);
    webApi.send(
      webApi.methods.post,
      zk1_UserManagement_setUsingState.apiResourceName,
      requestParameters,// 没有Request 參數
      zk1_UserManagement_setUsingState.beforeSendCallback,
      zk1_UserManagement_setUsingState.okCallback,
      zk1_UserManagement_setUsingState.failedCallback,
      zk1_UserManagement_setUsingState.completeCallback,
    );
  },
  beforeSendCallback: function () {

  },
  okCallback: function (result, resultText, status) {
    // zk1_UserManagement.setStaffState.displayOkArea();
    var realOk = webApi.isApiResultOK(result.ReturnCode);
    if (realOk) {
      zk1_UserManagement.setStaffState.displayOkArea();
      var rtnData = result.Detail;
      //返回資料格式例子: {"UsingState":1,"StaffId":"11111111","UsingStateText":"啟用"}
      var staffId = rtnData.StaffId;
      var usingState = rtnData.UsingState;
      var usingStateText = rtnData.UsingStateText;
      //#region 更新資料  
      var staffs = Enumerable.From(zk1_UserManagement.managedStaffList.StaffList).
        Where(m => m.StaffId == staffId).ToArray();
      if (staffs.length > 0) {
        // 更新原始資料
        var staff = staffs[0];
        staff.UsingState = usingState;
        staff.UsingStateText = usingStateText;
        // 更新畫面上資料
        //01 更新按鈕
        var id = zk1_UserManagement.getStaff.optionStateIdPrefix + staffId;
        var element = document.getElementById(id);
        // window.alert(element.style.background);
        if (usingState == setting_Staff.usingState.activated) {
          // 已經啟用
          element.style.background = 'red';
          element.innerText = '停用帳戶';
          //window.alert("dddd");
        }
        else if (usingState == setting_Staff.usingState.disabled) {
          // 已經停用
          element.style.background = 'green';
          element.innerText = '啟用帳戶';

        }
        //02 更新狀態欄
        {
          var id = zk1_UserManagement.getStaff.setStateIdPrefix + staffId;
          var element = document.getElementById(id);
          if (usingState == setting_Staff.usingState.activated) {
            // 已經啟用
            element.style.color = 'green';
            element.innerText = staff.UsingStateText;
            //window.alert("dddd");
          }
          else if (usingState == setting_Staff.usingState.disabled) {
            // 已經停用
            element.style.color = 'red';
            element.innerText = staff.UsingStateText;

          }

        }
      }
      //#endregion
      setTimeout(
        function () {
          zk1_UserManagement.getStaff.displayOkArea();
        }, setting.interval);

    }
    else {
      zk1_UserManagement.setStaffState.displayFaildArea();
      zk1_UserManagement.setStaffState.displayErrText(result.ReturnMessage + "(" + result.ReturnCode + ")");
      setTimeout(
        function () {
          zk1_UserManagement.getStaff.displayOkArea();
        }, setting.interval);

    }
  },
  failedCallback: function (err) {
    zk1_UserManagement.setStaffState.displayFaildArea();
    zk1_UserManagement.setStaffState.displayErrText(err.statusText + "(" + err.status + ")");
    setTimeout(
      function () {
        zk1_UserManagement.getStaff.displayOkArea();
      }, setting.interval);
  },
  completeCallback: function () {

  }
};

/**
 * @class zk1_UserManagement_GetStaff 取得所有 Staff資料(含 管理的田區))
 */
var zk1_UserManagement_GetStaff = {
  apiResourceName: 'Staff/GetStaffDetailList',
  execute: function () {
    //staffLogin_Login.setParameters(parameter);
    webApi.send(
      webApi.methods.get,
      zk1_UserManagement_GetStaff.apiResourceName,
      {},// 没有Request 參數
      zk1_UserManagement_GetStaff.beforeSendCallback,
      zk1_UserManagement_GetStaff.okCallback,
      zk1_UserManagement_GetStaff.failedCallback,
      zk1_UserManagement_GetStaff.completeCallback,
    );
  },
  okCallback: function (result, resultText, status) {
    // window.alert(JSON.stringify(result) + "///" + resultText + "///" + JSON.stringify(status));
    var realOk = webApi.isApiResultOK(result.ReturnCode);
    if (realOk) {

      zk1_UserManagement.managedStaffList = result.Detail;
      zk1_UserManagement.allFieldList = Enumerable.From(result.Detail.StaffList).
        Where(m => m.StaffId == zk1_UserManagement.staff.StaffId).ToArray()[0].AllFieldList;
      // window.alert(JSON.stringify( zk1_UserManagement.allFieldList));                                           
      zk1_UserManagement.getStaff.displayOkArea(true);
      zk1_UserManagement.setStaffPermission.startUp();
    }
    else {
      zk1_UserManagement.getStaff.displayErrText(result.ReturnMessage + "(" + result.ReturnCode + ")");
    }
  },
  beforeSendCallback: function () {

  },
  failedCallback: function (err) {
    zk1_UserManagement.getStaff.displayErrText(err.statusText + "(" + err.status + ")");
  },
  completeCallback: function () {

  }

};

var zk1_UserManagement_resetStaffPassword = {
  apiResourceName: 'Staff/ResetStaffPassword',

  waitAreaId: 'resetStaffpassword_WaitingArea',
  okAreaId: 'resetStaffpassword_OKArea',
  errAreaId: 'resetStaffpassword_ErrArea',
  errAreaTextId: 'resetStaffpassword_ErrTextArea',
  staffListAreaId: zk1_UserManagement.getStaff.okAreaId,
  hideAllAreas: function () {
    document.getElementById(zk1_UserManagement_resetStaffPassword.waitAreaId).style.display = 'none';
    document.getElementById(zk1_UserManagement_resetStaffPassword.okAreaId).style.display = 'none';
    document.getElementById(zk1_UserManagement_resetStaffPassword.errAreaId).style.display = 'none';
    document.getElementById(zk1_UserManagement_resetStaffPassword.staffListAreaId).style.display = 'none';
  },
  displayWaitingArea: function () {
    zk1_UserManagement_resetStaffPassword.hideAllAreas();
    document.getElementById(zk1_UserManagement_resetStaffPassword.waitAreaId).style.display = '';
  },

  displayOkArea: function () {
    zk1_UserManagement_resetStaffPassword.hideAllAreas();
    document.getElementById(zk1_UserManagement_resetStaffPassword.okAreaId).style.display = '';
    zk1_UserManagement_resetStaffPassword.displayStaffList();
  },

  displayErrArea:function(text){
     zk1_UserManagement_resetStaffPassword.hideAllAreas();
     document.getElementById(zk1_UserManagement_resetStaffPassword.errAreaId).style.display = '';
     document.getElementById(zk1_UserManagement_resetStaffPassword.errAreaTextId).innerText = text;
     zk1_UserManagement_resetStaffPassword.displayStaffList();
  },
  
  displayStaffList:function(){
     setTimeout(
        function(){
          zk1_UserManagement_resetStaffPassword.hideAllAreas();
          document.getElementById(zk1_UserManagement_resetStaffPassword.staffListAreaId).style.display = '';
        },
        setting.interval
     );

  },



  execute: function (staffId) {

    var reqParameter = {
      StaffId: staffId,
      StaffToken: zk1_UserManagement.staff.Token,
    };
    console.log("staff:" + JSON.stringify(reqParameter))

    //staffLogin_Login.setParameters(parameter);
    webApi.send(
      webApi.methods.post,
      zk1_UserManagement_resetStaffPassword.apiResourceName,
      reqParameter,
      zk1_UserManagement_resetStaffPassword.beforeSendCallback,
      zk1_UserManagement_resetStaffPassword.okCallback,
      zk1_UserManagement_resetStaffPassword.failedCallback,
      zk1_UserManagement_resetStaffPassword.completeCallback,
    )
  },
  beforeSendCallback: function () {
    zk1_UserManagement_resetStaffPassword.displayWaitingArea();

  },
  okCallback: function (result, resultText, status) {
    var realOk = webApi.isApiResultOK(result.ReturnCode);
    if (realOk) {
      zk1_UserManagement_resetStaffPassword.displayOkArea();
    }
    else {
      zk1_UserManagement_resetStaffPassword.displayErrArea(result.ReturnMessage + "(" + result.ReturnCode + ")");
    }
  },
  failedCallback: function (err) {
    zk1_UserManagement_resetStaffPassword.displayErrArea(err.statusText + "(" + err.status + ")");
  },
  completeCallback: function () { }

}





