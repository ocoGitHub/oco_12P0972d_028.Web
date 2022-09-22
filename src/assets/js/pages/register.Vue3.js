var registerVue3_Option={
    RequestParameter:{
        StaffId:'', 
        StaffName:'',
        Email:'', 
        LineId :'',
        Password:'',
        ConfirmPassword: '',
        PhoneNumber:''
    } 
    
};
var registerVue3={
    startUp:function(){
        var app=Vue.createApp(registerVue3);

        registerVue3.option =app.mount('#app');
        registerVue3.optionData= registerVue3.option.$data;
    },
    option:{}, 
    optionData:{},
    data(){
        return registerVue3_Option;
     },
     methods:{
        clear(){
            var option=registerVue3.optionData.RequestParameter;
            var ary= Object.keys(option)
            var length=ary.length;
            for(var i=0;i<length;i++){
                option[ary[i]]='';
            }
        },
        submit(){
            var req=registerVue3.optionData.RequestParameter;
            register.execute(req);
        }, 
        toLogin(){
             var target=setting.loginPage;
             window.location.href=target;
          
         }

     }
};
