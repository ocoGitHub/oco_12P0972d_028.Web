var updatePasswordVue3_Option={
    
    RequestParameter:{
    
     
    /**
     *@property staffEmail Staff 的email  
    */ 
     originalPassword:'',
    /**
     * @property password staff 的 Password
     */
     tragetPassword:'',

     confirmTargetPassword:'',
    }
 };

 var updatePasswordVue3={
    staff:null,
    callbacktoUpdate:null,
    startUp:function(staff,callbackToupdate){
        var app=Vue.createApp(updatePasswordVue3);
        updatePasswordVue3.option =app.mount('#app');
        updatePasswordVue3.optionData= updatePasswordVue3.option.$data;
        updatePasswordVue3.callbacktoUpdate=callbackToupdate;
        updatePasswordVue3.staff=staff;
    },
    option:{}, 
    optionData:{},
    data(){
        return updatePasswordVue3_Option;
     },
     methods:{
         submit(){
          
          var parameter=updatePasswordVue3.optionData.RequestParameter;
          // email
          var OriginalPassword=parameter.originalPassword;
          // 密碼
          var TargetPassword=parameter.tragetPassword;

          var ConfirmTargetPassword=parameter.confirmTargetPassword;
          var StaffId=updatePasswordVue3.staff.StaffId;
          updatePasswordVue3.callbacktoUpdate(
           {
            OriginalPassword:OriginalPassword,
            TargetPassword:TargetPassword,
            ConfirmTargetPassword:ConfirmTargetPassword,
            StaffId:StaffId            
           });

 
         } ,
         clear(){
            var parameter=updatePasswordVue3.optionData.RequestParameter;
            parameter.originalPassword='';
            parameter.tragetPassword='';

            parameter.confirmTargetPassword='';
         }  

     }
};
