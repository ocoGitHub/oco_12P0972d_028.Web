//const { VueElement } = require("vue/dist/vue.global");
/**
 * @class staffLoginVue3_Option vue3 option
 */
var staffLoginVue3_Option={
   /**
    *@property staffEmail Staff 的email  
   */ 
   staffEmail:'adm@oco.com',
   /**
    * @property password staff 的 Password
    */
   password:'1111'
};

var staffLoginVue3={
    startUp:function(){
        var app=Vue.createApp(staffLoginVue3);
        staffLoginVue3.option =app.mount('#app');
        staffLoginVue3.optionData= staffLoginVue3.option.$data;
    },
    option:{}, 
    optionData:{},
    data(){
        return staffLoginVue3_Option;
     },
     methods:{
         submit(){
          
          var optionData=staffLoginVue3.optionData;
          // email
          var email=optionData.staffEmail;
          // 密碼
          var password=optionData.password;
 
          // 送出到 Api
          staffLogin_Login.execute({
            StaffEmail:email,
            Password:password}
            );
         }

     }
};

