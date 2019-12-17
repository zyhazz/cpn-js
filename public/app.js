var app, io;

$(document).ready(function(){
    var app = new Vue({
        el: "#app",
        data: {
          heading: "aa",
          text: "wlolo."
        }
    });
    io = io();
});


  