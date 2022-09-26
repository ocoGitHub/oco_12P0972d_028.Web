var updateStaffDataVue3_Option = {

    RequestParameter: {
        StaffId: '1',
        Email: '2',
        StaffName: '3',
        PhoneNumber: '4',
        LineId: '5'
    }
};

var updateStaffDataVue3 = {
    staff: null,
    callBackToUpdate: null,
    startUp: function (staff, callBackToUpdate) {
        var param = updateStaffDataVue3_Option.RequestParameter;
        param.StaffId = staff.StaffId;
        param.Email = staff.Email;
        param.StaffName = staff.Name;
        param.PhoneNumber = staff.PhoneNumber;
        param.LineId = staff.LineId;

        var app = Vue.createApp(updateStaffDataVue3);
        updateStaffDataVue3.option = app.mount('#app');
        updateStaffDataVue3.optionData = updateStaffDataVue3.option.$data;

        updateStaffDataVue3.staff = staff;
        this.callBackToUpdate = callBackToUpdate;
    },
    option: {},
    optionData: {},
    data() {
        return updateStaffDataVue3_Option;
    },
    methods: {
        updateStaffDataSubmit() {
            updateStaffDataVue3.callBackToUpdate(
                updateStaffDataVue3_Option.RequestParameter
            );
        },
        reset(){
            location.reload();
        },

    }
};
