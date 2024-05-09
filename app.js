const { createApp, ref } = Vue;
const urlFather = window.parent.location.href;
const url = new URL(urlFather);
// const port = url.port;
const port = 5000;
const sub_url = url.hash.substring(1).split("/");
const db_name = sub_url[sub_url.length - 1];
var message = {
  type: "iframe",
  commands: {},
};

const dict = {
  robot: "robotMaster",
  async: "robotAsyncMaster",
  file: "fileMaster",
};
var SendMessage = function () {
  parent.postMessage(message, "*");
};

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

eventer(messageEvent, (e) => {
  message.commands = e.data;
  createApp({
    setup() {
      return {};
    },
    mounted() {
      this.getBots();
    },
    data() {
      return {
        selectconfig: message.commands?.config
          ? message.commands.config.source
          : "",
        inputexcelconfig: message.commands?.config
          ? message.commands.config.pathfile
          : "",
        inputsheetconfig: message.commands?.config
          ? message.commands.config.sheet
          : "",
        inputrangeconfig: message.commands?.config
          ? message.commands.config.range
          : "",
        urlServer: message.commands?.config
          ? message.commands.config.urlServer
          : "",
        apiKey: message.commands?.config ? message.commands.config.apiKey : "",
        formToken: message.commands?.config
          ? message.commands.config.formToken
          : "",
        inputDbPath: message.commands?.config
          ? message.commands.config.dbPath
          : "",
        robotselectconfig: message.commands?.config
          ? message.commands.config.robotName
          : "",
        selectMaster: message.commands?.master
          ? dict[message.commands.master.typeRobot]
          : "",
        robotselectasyncmaster: message.commands?.master
          ? message.commands.master.robotName
          : "",
        inputdbmaster: message.commands?.master
          ? message.commands.master.dbPath
          : "",
        robotselectmaster: message.commands?.master
          ? message.commands.master.robotName
          : "",
        inputfilemaster: message.commands?.master
          ? message.commands.master.fileToWrite
          : "",
        selectEnd: message.commands?.end ? message.commands.end.robotName : "",
        bots: [],
      };
    },
    methods: {
      setMessage() {
        let objMessage = { ...message.commands };
        if (this.selectconfig === "excel") {
          objMessage.config = {
            source: "excel",
            pathfile: this.inputexcelconfig,
            range: this.inputrangeconfig,
            sheet: this.inputsheetconfig,
          };
        }
        if (this.selectconfig === "xperience") {
          objMessage.config = {
            source: "xperience",
            urlServer: this.urlServer,
            apiKey: this.apiKey,
            formToken: this.formToken,
          };
        }

        if (this.selectconfig === "database") {
          objMessage.config = {
            source: "database",
            dbPath: this.inputDbPath,
          };
        }
        if (this.selectconfig === "robot") {
          objMessage.config = {
            source: "robot",
            robotName: this.robotselectconfig,
          };
        }

        if (this.selectconfig === "") {
          objMessage.config = undefined;
        }

        if (this.selectMaster === "robotMaster") {
          objMessage.master = {
            typeRobot: "robot",
            robotName: this.robotselectmaster,
          };
        }

        if (this.selectMaster === "robotAsyncMaster") {
          objMessage.master = {
            typeRobot: "async",
            robotAsyncName: this.robotselectasyncmaster,
            dbpath: this.inputdbmaster,
          };
        }

        if (this.selectMaster === "fileMaster") {
          objMessage.master = {
            typeRobot: "file",
            fileToWrite: this.inputfilemaster,
          };
        }

        if (this.selectMaster === "") {
          objMessage.master = undefined;
        }

        if (this.selectEnd !== "") {
          objMessage.end = {
            typeRobot: "robot",
            robotName: this.selectEnd,
          };
        }

        if (this.selectEnd === "") {
          objMessage.end = undefined;
        }
        message.commands = objMessage;

        SendMessage();
      },
      async getBots() {
        let t = new FormData();
        t.append("db", db_name);
        try {
          response = await fetch(`http://localhost:${port}/getbots`, {
            method: "POST",
            body: t,
          });

          if (response.ok) {
            response = await response.json();
            this.bots = response.bots;
          } else {
            throw new Error("Something went wrong");
          }
        } catch (error) {
          console.log(error);
        }
      },
      async getPath(e) {
        let body = "";
        try {
          const path = await fetch(`http://localhost:${port}/getfile`);
          body = await path.text();
          if (e.target.id === "btninputconfig")
            this.inputexcelconfig = body.trim();

          if (e.target.id === "btndbconfig") this.inputDbPath = body.trim();

          if (e.target.id === "btndbmaster") this.inputdbmaster = body.trim();

          if (e.target.id === "btnfilemaster")
            this.inputfilemaster = body.trim();
          this.setMessage();
        } catch (error) {
          console.log(error);
        }
      },
    },
  }).mount("#app");
});
