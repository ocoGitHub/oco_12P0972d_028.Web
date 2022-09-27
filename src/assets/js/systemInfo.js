var systemInfo = {
    taskInfo: [
        {
            deployTime: '2022/09/15 12:00:00',
            version: 'DEV.01.00.00.001?',
            webApiUrl: '',
            signalRurl: ''

        }
        /**
          {
             deployTime:'2022/09/14 14:00:00',
             version:'DEB.01.00.00.001',
             webApiUrl:'',
             signalRurl:''
   
        }*/
    ],


    developInfo: [
        {
            deployTime: '2022/09/27 10:00:00',
            version: 'DEV.01.00.00.003X',
            webApiUrl: '',
            signalRUrl: ''
        },
        {
            deployTime: '2022/09/27 01:00:00',
            version: 'DEV.01.00.00.003',
            webApiUrl: '',
            signalRUrl: ''
        },
        {
            deployTime: '2022/09/21 17:00:00',
            version: 'DEV.01.00.00.002',
            webApiUrl: '',
            signalRUrl: ''
        },
        {
            deployTime: '2022/09/15 12:00:00',
            version: 'DEV.01.00.00.001X',
            webApiUrl: '',
            signalRUrl: ''
        },
        {
            deployTime: '2022/09/14 14:00:00',
            version: 'DEV.01.00.00.001',
            webApiUrl: '',
            signalRUrl: ''
        }
    ],
    masterInfo: [
        {
            deployTime: '2022/09/27 10:30:00',
            version: 'MAS.01.00.00.003X',
            webApiUrl: '',
            signalRUrl: ''
        },
        {
            deployTime: '2022/09/27 01:30:00',
            version: 'MAS.01.00.00.003',
            webApiUrl: '',
            signalRUrl: ''
        },
        {
            deployTime: '2022/09/21 17:00:00',
            version: 'MAS.01.00.00.002',
            webApiUrl: '',
            signalRUrl: ''
        },
        {
            deployTime: '2022/09/15 12:00:00',
            version: 'MAS.01.00.00.001X',
            webApiUrl: '',
            signalRUrl: ''
        },
        {
            deployTime: '2022/09/14 14:00:00',
            version: 'MAS.01.00.00.001',
            webApiUrl: '',
            signalRUrl: ''
        }
    ],
    getSystemInfo: function () {
        var config = setting.getConfig();
        var rtnV = null;
        if (config == setting.configSetting.task) {
            rtnV = systemInfo.taskInfo[0];
        }
        else if (config == setting.configSetting.develop) {
            rtnV = systemInfo.developInfo[0];
        }
        else if (config == setting.configSetting.release) {
            rtnV = null;
        }
        else if (config == setting.configSetting.master) {
            rtnV = systemInfo.masterInfo[0];
        }
        if (rtnV != null) {
            rtnV.webApiUrl = setting.webApi.getUrl();
            rtnV.signalRUrl = setting.webSignalR.getUrl();
        }
        return rtnV;
    },





};