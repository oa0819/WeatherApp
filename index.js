const http = require('http');
const fs = require('fs');
var requests = require('requests');


const homeFile = fs.readFileSync("index.html", "utf-8");
const server = http.createServer((req, res) => {
  if (req.url == '/') {
    requests("https://api.openweathermap.org/data/2.5/weather?q=Vadodara&appid=b09ce823ac009dd3ac5af2097aab8ef8")
      .on("data", (chunk) => {
        const objdata = JSON.parse(chunk);//object
        const arrdata = [objdata];//arr of object
        // console.log(arrdata[0].main.temp);
        var realTimedata = homeFile.replace("{%tempval%}", (arrdata[0].main.temp - 273).toFixed(2)).replace("{%tempmin%}", (arrdata[0].main.temp_min - 273).toFixed(2)).replace("{%tempmax%}", (arrdata[0].main.temp_max - 273).toFixed(2)).replace("{%location%}", arrdata[0].name).replace("{%country%}", arrdata[0].sys.country);
        //join to convert arr to string
        res.write(realTimedata);
        // console.log(realTimedata);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed", err);
        // console.log("end");
        res.end();
      })
  }
})
server.listen(8000, "127.0.0.1");