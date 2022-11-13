const NodeHelper = require("node_helper");
const convert = require('xml-js');
const request = require('request');

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper: " + this.name);
    },


    socketNotificationReceived: function(notification, payload) {
        switch (notification) {
            case "GET_DATA":
                let self = this;
                self.getData(payload);
                break;
        }
    },




    getData: async function (payload) {
        let self = this;
        // //var url = payload.config.apiBase + queryParams;
        //var url = 'http://swopenapi.seoul.go.kr/api/subway/' + payload.config.serviceKey + '/xml/realtimeStationArrival/0/4/' + payload.config.location;
        var url = 'http://swopenapi.seoul.go.kr/api/subway/4770714d726462733130375a4d595071/xml/realtimeStationArrival/0/4/%EC%9B%90%EB%8B%B9';
        request({
            url: url,
            method: 'GET'
        }, function (error, response, body) {
            if(!error & response.statusCode == 200){
                var result = convert.xml2json(body, { compact: true, spaces: 4 });
                var data = JSON.parse(result)
                if(Array.isArray(data.realtimeStationArrival.row)) {
                    var up = [data.realtimeStationArrival.row[0].trainLineNm._text, data.realtimeStationArrival.row[0].arvlMsg3._text, data.realtimeStationArrival.row[0].arvlMsg2._text];
                    var down = [data.realtimeStationArrival.row[2].trainLineNm._text, data.realtimeStationArrival.row[2].arvlMsg3._text, data.realtimeStationArrival.row[2].arvlMsg2._text];
                    var return_data = [up,down];
                    self.sendSocketNotification("Subway_DATA", return_data);
                } else {
                    self.sendSocketNotification("Subway_DATA_ERROR", data);
                }
            }
        });
    },


});