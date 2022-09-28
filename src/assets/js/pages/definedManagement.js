document.write('<script src="assets/libs/jquery/jquery.min.js"></script>')

//document.write('<script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>');

document.write('<script src="assets/libs/vue/vue.global.js"></script>');
document.write('<script src="assets/js/setting.js"></script>');
document.write('<script src="assets/js/webApi.js"></script>');
document.write('<script src="assets/js/getTagData.js"></script>');
//document.write('<script src="assets/js/dataTableNoAjax.js"></script>');
//document.write('<script src="assets/js/webSignalR.js"></script>');


var definedManagement={
      staff:null,
      startUp:function(staff){
        definedManagement.staff;
        definedManagement_Get.execute();
      },
      uiAreaId:"app",
      renderUI:function(initialData){
        var htmlText='';   
        var defineItem=Enumerable.From(initialData.DefineTagWayRelationList).OrderBy(m=>m.TagWayCode).ThenBy(m=>m.TagName).ToArray();
        var fieldLst=Enumerable.From(initialData.FieldIdList).OrderBy(m=>m).ToArray();
        for(var i=0;i<defineItem.length;i++){
            var fieldsText='';
           
            for(var j=0;j<fieldLst.length;j++){
                var id=defineItem[i].TagName+ "_" +fieldLst[j];
                var model="model["+i+"]["+j+ "]"
                fieldsText+=`
                <input v-model='`+model+`'  type='checkBox' id='`+ id+`'/>&nbsp;<label for='`+id+`'>`+ fieldLst[j]  +`</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp
                `
            }
            htmlText +=`
               <tr class="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                    <td class="p-3  text-gray-900 whitespace-nowrap dark:text-white  items-center">
                    `
                    +  defineItem[i].TagDescription + 
                      
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
        document.getElementById(definedManagement.uiAreaId).innerHTML=htmlText;

      }

};

var definedManagement_Get={
   
    
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
    beforeSendCallback:function(){

    },
    okCallback:function(result, resultText, status){
        var realOk = webApi.isApiResultOK(result.ReturnCode);
        if (realOk) {
            definedManagement.renderUI(result.Detail);
           
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
    failedCallback:function(err){

    },
    completeCallback:function(){

    }

}

