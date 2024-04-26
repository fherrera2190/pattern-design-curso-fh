const urlFather = window.parent.location.href;
const url = new URL(urlFather);
const port = url.port;
const sub_url = url.hash.substring(1).split("/");
const db_name = sub_url[sub_url.length - 1];
const dbButton = document.getElementById("dbButton");
const inputDbPath = document.getElementById("inputDbPath");
const inputUrl = document.getElementById("inputUrl");
const inputPass = document.getElementById("inputapikey");
const master = document.getElementById("master");
const endProcess = document.getElementById("endProcess");
var message = {
  type: "iframe",
  commands: {},
};
// Envio message al padre
var SendMessage = function () {
  parent.postMessage(message, "*");
};

const setDb = async function () {
  try {
    let path = await fetch(`http://localhost:${port}/getfile`);
    const body = await path.text();
    inputDbPath.value = body.trim();
    inputDbPath.dispatchEvent(new Event("input"));
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

const addInputDbMessage = () => {
  message.commands = { ...message.commands, dbpath: inputDbPath.value.trim() };
  SendMessage();
};

const addInputUrlMessage = () => {
  message.commands = { ...message.commands, url: inputUrl.value.trim() };
  SendMessage();
};

const addInputPassMessage = () => {
  message.commands = { ...message.commands, apikey: inputPass.value };
  SendMessage();
};

const changeSelects = (e) => {
  if (e.target.id === "master")
    message.commands = { ...message.commands, master: e.target.value };
  if (e.target.id === "endprocess")
    message.commands = { ...message.commands, endprocess: e.target.value };
  SendMessage();
};

async function dataHandler(e) {
  message.commands = e.data;
  if (e.data && e.data.dbpath) inputDbPath.value = e.data.dbpath || "";
  if (e.data && e.data.url) inputUrl.value = e.data.url || "";
  if (e.data && e.data.apikey) inputPass.value = e.data.apikey || "";

  inputDbPath.addEventListener("input", addInputDbMessage);
  inputUrl.addEventListener("input", addInputUrlMessage);
  inputPass.addEventListener("input", addInputPassMessage);
  dbButton.addEventListener("click", setDb);

  var t = new FormData();
  t.append("db", db_name);
  try {
    response = await fetch(`http://localhost:${port}/getbots`, {
      method: "POST",
      body: t,
    });

    if (response.ok) {
      response = await response.json();
    } else {
      throw new Error("Something went wrong");
    }

    if (response.bots.length > 0) {
      let bots = response.bots;

      const selects = document.querySelectorAll(".select-robot");

      for (let index = 0; index < selects.length; index++) {
        const selectRobot = selects[index];
        selectRobot.addEventListener("change", changeSelects);
        bots.map((robot) => {
          const option = document.createElement("option");
          option.value = robot.name;
          option.text = robot.name;
          if (
            message.commands &&
            option.value === message.commands[selectRobot.id]
          )
            option.selected = true;
          selectRobot.appendChild(option);
        });
      }
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log("An error occurred");
    console.log(error);
  }

  return;
}

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
eventer(messageEvent, dataHandler);
