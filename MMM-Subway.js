

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

  getHeader: function() {
    return "원당역 지하철 도착정보";
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

    // 대화 방면
    var tr_up = document.createElement("tr");
    var th_up = document.createElement("th");
    th_up.innerHTML = " 대화행 ";
    th_up.className="tittle";
    tr_up.appendChild(th_up);
    //대화행 시간
    var tr_uptime = document.createElement("tr");
    var up_time = document.createElement("td");
    up_time.className = "cen";
    up_time.innerHTML = this.Subway_data[0][2];
    tr_uptime.appendChild(up_time);
    
    // 오금 방면
    var tr_down = document.createElement("tr");
    var th_down = document.createElement("th");
    th_down.innerHTML = " 오금행 ";
    th_down.className="tittle";
    tr_down.appendChild(th_down);

    // 오금행 시간
    var tr_downtime = document.createElement("tr");
    var down_time = document.createElement("td");
    down_time.innerHTML = this.Subway_data[1][2];
    down_time.className = "cen";
    tr_downtime.appendChild(down_time);
    
    // table 에 추가
    subway_table.appendChild(tr_up);
    subway_table.appendChild(tr_uptime);
    subway_table.appendChild(tr_down);
    subway_table.appendChild(tr_downtime);

    // div 에 추가
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