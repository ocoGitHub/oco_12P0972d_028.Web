//const { getUnequalProps } = require("fullcalendar");

document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.1/signalr.js"></script>');


/**
 * @class signalR for signal Operat
 */
var webSignalR = {
    connection: null,
    sendMode:true,
    callBackGetRealTimeData:null,
    getUrl: function () {
        // window.alert("getUrl");
        var r = setting.webSignalR.getUrl();
        //window.alert(r);
        return r;
    },
    test: function () {
        window.alert('Test')
    },

    connect: function (callBackGetRealTimeData) {
        //window.alert('connect');
        webSignalR.callBackGetRealTimeData=callBackGetRealTimeData;
        var url = webSignalR.getUrl();
        //window.alert(url);
        webSignalR.connection = new signalR.HubConnectionBuilder()
            .withUrl(url, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
            }).build();

         webSignalR.connection.on("UpdateRealTimeData", function (data) {
              var inst=JSON.parse(data);
              var bitData=inst.BitDatas;
              var floatData=inst.FloatDatas;
               
              // console.log("bitData:"+JSON.stringify(bitData))
              // console.log("floatData:"+JSON.stringify(floatData))
              var allData=floatData.concat(bitData);
            //  console.log("allData:"+JSON.stringify(allData))
              if(webSignalR.callBackGetRealTimeData!=null){
                webSignalR.callBackGetRealTimeData(allData);
              }
            });
        webSignalR.connection.on("UpdateAlarmData", function (data) {
            // app._data.alarmMsg = data;
        });

        webSignalR.connection.on("OnModbusValueSetDone", function (data) {
            // app._data.setModbusValueMsg = data;
        });

        async function start() {
            try {

               // window.alert("to signal R");
                await webSignalR.connection.start();
                // app._data.status = "SignalR Server 已連線";

                //connection.invoke("ProcessClientMessage", "test/////////////", "msg\\\\\\\\\\");
               // window.alert("singnalR OK");
            } catch (err) {
                console.log(err);
              //  window.alert(err);
                setTimeout(start, 5000);
            }
        }

        webSignalR.connection.onclose(async () => {
            await start();
            // app._data.status = "SignalR Server 已斷線";
            // app._data.realTimeDataMsg = "";
            // app._data.alarmMsg = "";
        });

        start();
    },
    closeConnect: function () {
        webSignalR.connection.close();
    }

};