const { createApp, ref } = Vue;
const urlFather = window.parent.location.href;
const url = new URL(urlFather);
const port = url.port;
const sub_url = url.hash.substring(1).split("/");
const db_name = sub_url[sub_url.length - 1];
/*

It's necessary to communicate the iframe with the Rocketbot view

*/
async function dataHandler(e) {
  // console.log("parent received message!:  ", e.data);
  // console.log(application.$data);
  if (e.data?.config) application.$data.config = e.data.config;
  if (e.data?.master) application.$data.master = e.data.master;
  if (e.data?.end) application.$data.end = e.data.end;
  // console.log("JS", e.data.config.robot.varsExposed);
  // console.log("VUE", application.$data.config.robot.varsExposed);
}
var message = {
  type: "iframe",
  commands: {},
};
var SendMessage = function () {
  parent.postMessage(message, "*");
};
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
// Listen to message from child window
eventer(messageEvent, dataHandler);

const application = new Vue({
  el: "#app",
  created() {
    this.getBots();
  },
  mounted() {},
  beforeUpdate() {},
  updated() {
    console.log("updated");
    this.setMessage();
  },
  data() {
    return {
      config: {
        source: "",
        excel: {
          pathfile: "",
          range: "",
          sheet: "",
        },
        xperience: {
          urlServer: "",
          apiKey: "",
          formToken: "",
        },
        database: {
          pathdb: "",
        },
        robot: {
          robotName: "",
          varsExposed: [],
        },
      },
      master: {
        source: "",
        robot: {
          robotName: "",
          varsExposed: [],
        },
        robotAsync: {
          robotName: "",
          file: "",
        },
        file: {},
      },
      end: {
        robotName: "",
        varsExposed: [],
      },
      inputdbmaster: "",
      inputfilemaster: "",
      bots: [],
      varsModel: [],
      btnSaveState: "",
    };
  },
  methods: {
    setMessage() {
      let objMessage = {};
      objMessage.config = this.config;
      objMessage.master = this.master;
      objMessage.end = this.end;
      if (this.config.source === "excel") {
        this.config.xperience = {};
        this.config.database = {};
        this.config.robot = { robotName: "" };
      }
      if (this.config.source === "xperience") {
        this.config.excel = {};
        this.config.database = {};
        this.config.robot = { robotName: "" };
      }

      if (this.config.source === "database") {
        this.config.excel = {};
        this.config.xperience = {};
        this.config.robot = { robotName: "" };
      }

      if (this.config.source === "robot") {
        this.config.excel = {};
        this.config.database = {};
        this.config.xperience = {};
      }
      if (this.config.source === "") {
        this.config.excel = {};
        this.config.database = {};
        this.config.xperience = {};
        this.config.robot = { robotName: "" };
      }

      if (this.config.source === "excel") {
        this.config.xperience = {};
        this.config.database = {};
        this.config.robot = { robotName: "" };
      }

      if (this.master.source === "robot") {
        this.master.robotAsync = {};
        this.master.file = {};
      }
      if (this.master.source === "robotAsync") {
        this.master.robot = { robotName: "" };
        this.master.file = {};
      }
      if (this.master.source === "filetowrite") {
        this.master.robotAsync = {};
        this.master.robot = { robotName: "" };
      }

      if (this.master.source === "") {
        this.master.robot = { robotName: "" };
        this.master.robotAsync = {};
        this.master.file = {};
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
    async probando() {},
    async getPath(e) {
      let body = "";
      try {
        const path = await fetch(`http://localhost:${port}/getfile`);
        body = await path.text();

        if (e.target.id === "btninputconfig") {
          console.log(e.target.id);
          document.getElementById("inputfileconfig").value = body.trim();
          this.config.excel.pathfile = body.trim();
        }
        if (e.target.id === "btndbconfig") {
          document.getElementById("inputDbPath").value = body.trim();
          this.config.database.pathdb = body.trim();
        }

        if (e.target.id === "btndbmaster") this.inputdbmaster = body.trim();
        if (e.target.id === "btnfilemaster") this.inputfilemaster = body.trim();
        this.setMessage();
      } catch (error) {
        console.log(error);
      }
    },
    getValues(robotName) {
      let aux = [];
      this.bots.forEach((bot) => {
        if (robotName === bot.name) {
          bot.exposed.form.forEach((varModel) => {
            aux.push({
              id: varModel.id,
              value: varModel.name || "",
            });
          });
        }
      });
      return aux;
    },
    getVars(e) {
      if (e.target.id === "robotselectconfig") {
        this.config.robot.varsExposed = this.getValues(
          this.config.robot.robotName
        );
      }
      if (e.target.id === "robotselectmaster") {
        this.master.robot.varsExposed = this.getValues(
          this.master.robot.robotName
        );
      }
      if (e.target.id === "endprocess") {
        this.end.varsExposed = this.getValues(this.end.robotName);
      }
    },
    resetVarsModel() {
      this.varsModel = [];
    },
    saveVarsModel() {
      const varsExposed = document.querySelectorAll(".vars-exposed");
      let varsResult = [];
      varsExposed.forEach((el) => {
        const id = el.querySelectorAll("td")[0].textContent;
        const value = el.querySelector("td input").value || "";

        varsResult.push({ id, value });
      });
      console.log(this.btnSaveState);
      if (this.btnSaveState === "configVars")
        this.config.robot.varsExposed = varsResult;

      if (this.btnSaveState === "endVars") this.end.varsExposed = varsResult;
      this.resetVarsModel();
    },
    setVars(e) {
      console.log(e.target.id);
      if (e.target.id === "configVars")
        this.varsModel = this.config.robot.varsExposed;

      if (e.target.id === "endVars") this.varsModel = this.end.varsExposed;
      this.btnSaveState = e.target.id;
    },

    // ******************CSS*******************
    restorePosition() {
      content.style.left = "0";
      content.style.top = "0";
      restoreButton.style.display = "none";
      zoomLevel = 1;
      content.style.transform = `scale(${zoomLevel})`;
    },
    zoomOut() {
      zoomLevel -= 0.1;
      content.style.transform = `scale(${zoomLevel})`;
    },
    zoomIn() {
      zoomLevel += 0.1;
      content.style.transform = `scale(${zoomLevel})`;
    },
  },
});

// ****************CSS*****************
let isDragging = false;
let zoomLevel = 1;
let startMouseX;
let startMouseY;
let startContentLeft;
let startContentTop;
let firstTime = true;
var resetButtons = false;
const content = document.getElementById("app");
const restoreButton = document.getElementById("restoreButton");

document.addEventListener("mousedown", (event) => {
  isDragging = true;
  startMouseX = event.clientX;
  startMouseY = event.clientY;
  startContentLeft = content.offsetLeft;
  startContentTop = content.offsetTop;
  content.style.cursor = "grabbing";

  restoreButton.style.display = "block";
});

document.addEventListener("mousemove", (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - startMouseX;
  const deltaY = event.clientY - startMouseY;

  content.style.left = startContentLeft + deltaX + "px";
  content.style.top = startContentTop + deltaY + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  content.style.cursor = "grab";
});

document.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    content.style.cursor = "grab";
  }
});
