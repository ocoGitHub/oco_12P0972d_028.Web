document.write('<script src="assets/libs/jquery/jquery.min.js"></script>')

//document.write('<script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>');

document.write('<script src="assets/libs/vue/vue.global.js"></script>');
document.write('<script src="assets/js/setting.js"></script>');
document.write('<script src="assets/js/webApi.js"></script>');
document.write('<script src="assets/js/getTagData.js"></script>');
//document.write('<script src="assets/js/dataTableNoAjax.js"></script>');
//document.write('<script src="assets/js/webSignalR.js"></script>');

document.write('<script src="assets/js/pages/definedManagement.Vue3.js"></script>');

var definedManagement = {
    staff: null,
    startUp: function (staff) {
        definedManagement.staff = staff;
        definedManagement_Get.execute();
    },
    uiAreaId: "tBody",
    vue3AppId:'app',
    getVue3AppSelector:function(){
          return "#"+definedManagement.vue3AppId;
    },
    renderUI: function (initialData) {
        var htmlText = '';
        var defineItem = Enumerable.From(initialData.DefineTagWayRelationList).OrderBy(m => m.TagWayCode).ThenBy(m => m.TagName).ToArray();
        var fieldLst = Enumerable.From(initialData.FieldIdList).OrderBy(m => m).ToArray();
        for (var i = 0; i < defineItem.length; i++) {
           
            var tagName = defineItem[i].TagName;
            var tagDscription = defineItem[i].TagDescription;
            var fieldsText = `
            
            `;
            for (var j = -1; j < fieldLst.length; j++) {


                var fieldId = fieldLst[j];
                var value;
                var id;
                if(j==-1){
                     value='';
                     fieldId='不指定';
                     id=  tagName + "_" 
                }
                else{
                    fieldId = fieldLst[j];
                   id=  tagName + "_" + fieldId;
                    value = fieldId;
                }

                fieldsText += `
                <input v-model='requestPramameter.DefinedTag.`+ tagName + `' name='` + tagName + `' value='` + value + `' type='radio' id='` + id + `'/>&nbsp;<label for='` + id + `'>` + fieldId + `</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp
                `

            }
            htmlText += `
               <tr class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                    <td class="p-3  text-gray-900 whitespace-nowrap dark:text-white  items-center">
                    `
                + tagDscription +

                `
                    </td>
                    <td  class="p-3  text-gray-900 whitespace-nowrap dark:text-white  items-center">`
                +
                fieldsText
                +
                `
                    </td>
               </tr>
            `;
        }
        htmlText += `
        <tr class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
           <td class="p-3  text-gray-900 whitespace-nowrap dark:text-white  items-center">
           </td>
           <td  class="p-3 text-right text-gray-900 whitespace-nowrap dark:text-white  items-center">
                <button @click='submit()' class="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                &nbsp;確&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定&nbsp;
                </button>
                <button onclick='location.reload()' class="px-4 ml-1 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                    重新設定
                </button>
           </td>
        </tr>  
              
        `;
        document.getElementById(definedManagement.uiAreaId).innerHTML = htmlText;

    },

    /**
     * @method submitToUpdate 確定更新
     * @param {*} tagWayRelation 
     */
    submitToUpdate:function(tagWayRelation){
     // window.alert(JSON.stringify(tagWayRelation));
      definedManagement_Update.execute(tagWayRelation.requestPramameter);
    },

    hideMainDisplayArea:function(){
        document.getElementById(definedManagement.vue3AppId).style.display='none';
    },
    displayMainDisplayArea:function(){
        document.getElementById(definedManagement.vue3AppId).style.display='';
    }

    
 

};
var definedManagement_Update={
    apiResourceName: 'Tag/DefineTagManagementUpdate',
    execute: function (reqParameters) {  // 没有參數
        //staffLogin_Login.setParameters(parameter);
        console.log("definedManagement_Update:",JSON.stringify(reqParameters))
        webApi.send(
            webApi.methods.post,
            definedManagement_Update.apiResourceName,
            reqParameters,
            definedManagement_Update.beforeSendCallback,
            definedManagement_Update.okCallback,
            definedManagement_Update.failedCallback,
            definedManagement_Update.completeCallback,
        );
    },
    beforeSendCallback: function () {
        definedManagement_Update.displayWaitingArea();
    },
    okCallback: function (result, resultText, status) {
        var realOk = webApi.isApiResultOK(result.ReturnCode);
        if (realOk) {

            definedManagement_Update.displayOkArea();

        }
        else {
            definedManagement_Update.displayErrArea(result.ReturnMessage + "(" + result.ReturnCode + ")");
        }
    },
    failedCallback: function (err) {
        definedManagement_Update.displayErrArea(err.statusText + "(" + err.status + ")");
    },
    completeCallback: function () {

    },

    hideAllAreas:function(){
        definedManagement.hideMainDisplayArea();
        definedManagement_Update.hideWaitingArea();
        definedManagement_Update.hideOkArea();
        definedManagement_Update.hideErrArea();
    },
    hideWaitingArea:function(){
        document.getElementById(definedManagement_Update.waitingAreaId).style.display='none';
    },
    displayWaitingArea:function(){
        definedManagement_Update.hideAllAreas();
        document.getElementById(definedManagement_Update.waitingAreaId).style.display='';
    },

    hideOkArea:function(){
        document.getElementById(definedManagement_Update.okAreaId).style.display='none';
    },
    displayOkArea:function() {
        definedManagement_Update.hideAllAreas();
        document.getElementById(definedManagement_Update.okAreaId).style.display='';
        setTimeout(
           function(){
            definedManagement_Update.hideAllAreas();
            definedManagement.displayMainDisplayArea();
           }
           ,setting.interval
        );
    },


    hideErrArea:function(){
        document.getElementById(definedManagement_Update.errAreaId).style.display='none';
    },
    displayErrArea:function(errText){
        definedManagement_Update.hideAllAreas();
        document.getElementById(definedManagement_Update.errAreaId).style.display='';
        document.getElementById(definedManagement_Update.errTextAreaId).innerText=errText;
        setTimeout(
            function(){
             definedManagement_Update.hideAllAreas();
             definedManagement.displayMainDisplayArea();
            }
            ,setting.interval
         );
    },

    waitingAreaId:'update_WaitingArea',
    okAreaId:'update_OKArea',
    errAreaId:'update_ErrArea',
    errTextAreaId:'update_ErrTextArea',



};



var definedManagement_Get = {
    

    apiResourceName: 'Tag/DefineTagManagementGet',
    execute: function () {  // 没有參數
        //staffLogin_Login.setParameters(parameter);
        webApi.send(
            webApi.methods.get,
            definedManagement_Get.apiResourceName,
            {},
            definedManagement_Get.beforeSendCallback,
            definedManagement_Get.okCallback,
            definedManagement_Get.failedCallback,
            definedManagement_Get.completeCallback,
        );
    },
    beforeSendCallback: function () {

    },
    okCallback: function (result, resultText, status) {
        var realOk = webApi.isApiResultOK(result.ReturnCode);
        if (realOk) {

            definedManagement.renderUI(result.Detail);
            definedManagementVue3.startUp(definedManagement.staff, definedManagement.submitToUpdate, result.Detail);
            definedManagement_Get.hideAllAreas();
            definedManagement.displayMainDisplayArea();

        }
        else {
           
            definedManagement_Get.displayErrArea();
        }
    },
    failedCallback: function (err) {
        definedManagement_Get.displayErrArea();
    },
    completeCallback: function () {

    },

    hideAllAreas:function(){
        definedManagement_Get.hideWaitngArea();
        definedManagement_Get.hideErrArea();
        definedManagement.hideMainDisplayArea();
    },
    hideWaitngArea:function(){
        document.getElementById(definedManagement_Get.waitingAreaId).style.display='none';
    },
   
    hideErrArea:function(){
        document.getElementById(definedManagement_Get.errAreaId).style.display='none';
    },

    displayErrArea:function(){
        definedManagement_Get.hideAllAreas();
        document.getElementById(definedManagement_Get.errAreaId).style.display='';
    },
    waitingAreaId:'get_WaitingArea',
    errAreaId:'get_ErrArea',

}

