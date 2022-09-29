var definedManagementVue3_Option = {
    requestPramameter: {
        StaffToken: '',
        DefinedTag: {

        },
        //TagNames: [],
        //Fields: [],
        TagWayRelations:[],
    }

};
var definedManagementVue3 = {
    staff: null,
    callBackToSubmit: null,
    startUp: function (staff, callBackToSubmit, defineData) {
        definedManagementVue3.staff = staff;
        var param = definedManagementVue3_Option.requestPramameter;

        //#region 設定 Vue3 model 
        var vueData = defineData.DefineTagWayRelationList;
        param.StaffToken = staff.Token;
        for (var i = 0; i < vueData.length; i++) {
            param.DefinedTag[vueData[i].TagName] = vueData[i].FieldId;
        }

        //#endregion

        var app = Vue.createApp(definedManagementVue3);
        var appSelector=definedManagement.getVue3AppSelector()
        definedManagementVue3.option = app.mount(appSelector);
        definedManagementVue3.optionData = definedManagementVue3.option.$data;

        definedManagementVue3.staff = staff;
        definedManagementVue3.callBackToSubmit = callBackToSubmit;
    },
    option: {},
    optionData: {},
    data() {
        return definedManagementVue3_Option;
    },
    methods: {
        submit() {
            var param = definedManagementVue3_Option.requestPramameter;
            var relations = param.DefinedTag;
            var keys = Object.keys(relations);
            param.TagWayRelations=[];
            for (var i = 0; i < keys.length; i++) {
                if(relations[keys[i]]!=''){
                    param.TagWayRelations.push(
                        {
                            TagName:keys[i],
                            FiledId:relations[keys[i]],
                        }
                    )
                }
             }
             param.TagWayRelationsText=JSON.stringify(param.TagWayRelations);
            definedManagementVue3.callBackToSubmit(
                definedManagementVue3_Option
            );
        },
        reset() {
            location.reload();
        },

    }
};