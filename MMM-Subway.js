
Module.register("MMM-Subway", {
  // Default module config.
  defaults: {
    serviceKey : "4770714d726462733130375a4d595071",
    location : "%EC%9B%90%EB%8B%B9",
    updateInterval: 10000,
  },

  getStyles: function() {
    return ["Subway.css"]
  },

  start: function() {
      Log.info("Starting module: " + this.name);
      this.Subway_data = [[],[]] ;
      var self = this;
      this.loaded = false;
  },

  // HTML 화면 출력하는 부분
  getDom: function () {
    var wrapper = document.createElement("div");
    var subway_table = document.createElement("table");

    // 제목
    var name_tag = document.createElement("h4");
    name_tag.className = "tittle";
    name_tag.innerHTML =  "원당역 도착정보";
    wrapper.appendChild(name_tag);

    // 방면
    var tr1 = document.createElement("tr");
    var th_up = document.createElement("th");
    th_up.innerHTML = "상행선";
    th_up.className="cen";
    var th_down = document.createElement("th");
    th_down.innerHTML = "하행선";
    th_down.className="cen";
    tr1.appendChild(th_up);
    tr1.appendChild(th_down);
    subway_table.appendChild(tr1);


    // n 정류장 전
    var tr_time = document.createElement("tr");
    tr_time.className="cen";
    var up_time = document.createElement("td");
    up_time.innerHTML = this.Subway_data[0][2] + "  ";
    tr_time.appendChild(up_time);
    var down_time = document.createElement("td");
    down_time.innerHTML = "  " + this.Subway_data[1][2];
    tr_time.appendChild(down_time);
    subway_table.appendChild(tr_time);

    var tr_parse = document.createElement("tr");
    tr_parse.className="cen";
    tr_parse.innerHTML = "[ 현재위치 ]";
    subway_table.appendChild(tr_parse);

    //현재 지하철 위치
    var tr_location = document.createElement("tr");
    tr_location.className="cen";
    var up_location = document.createElement("td");
    up_location.innerHTML = this.Subway_data[0][1];
    tr_location.appendChild(up_location);
    var down_location = document.createElement("td");
    down_location.innerHTML = this.Subway_data[1][1];
    tr_location.appendChild(down_location);
    subway_table.appendChild(tr_location);


    wrapper.appendChild(subway_table);
    return wrapper;
  },

  getSubwayInfo: function() {
    Log.info("Requesting subway info");
    this.sendSocketNotification("GET_DATA",{

        "config" : this.config,
        "identifier" : this.identifier

    })
  },

  notificationReceived: function(notification, payload, sender){
    switch (notification) {
        case "DOM_OBJECTS_CREATED":
            this.getSubwayInfo();
            var timer = setInterval(() => {
                    this.getSubwayInfo();
            }, this.config.updateInterval);
            break;
    }
  },

  socketNotificationReceived: function (notification, payload) {
    switch (notification) {
        case "Subway_DATA":
            this.loaded = true;
            console.log("NotificationReceived:" + notification);
            this.Subway_data = payload;
            this.updateDom();
            break;
        case "Subway_DATA_ERROR":
            this.updateDom();
            break;
    }
  }

})