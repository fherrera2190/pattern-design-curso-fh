var message = {
  type: "iframe",
  commands: {},
};
// Data from rocket
var SendMessage = function () {
  parent.postMessage(message, "*");
};

const urlFather = window.parent.location.href;
const url = new URL(urlFather);
const port = url.port;
const sub_url = url.hash.substring(1).split("/");
const db_name = sub_url[sub_url.length - 1];

let config = document.getElementById("selectconfig");
let master = document.getElementById("master");

// Inputs config
const arrayConfig = [
  document.getElementById("excelConfig"),
  document.getElementById("xperienceConfig"),
  document.getElementById("databaseConfig"),
  document.getElementById("robotConfig"),
];
// Inputs master
const arrayMaster = [
  document.getElementById("robot_master"),
  document.getElementById("robot_async_master"),
  document.getElementById("file_master"),
];

function fillInputs(values) {
  console.log(values);
  if (values.config.source === "excel") {
    config.options.item(0).selected = "selected";
    const inputs = arrayConfig[0].querySelectorAll("input");
    inputs[0].value = values.config.path || "";
    inputs[1].value = values.config.sheet || "";
    inputs[2].value = values.config.range || "";
    config.dispatchEvent(new Event("change"));
  }
  if (values.config.source === "xperience") {
    config.options.item(1).selected = "selected";
    const inputs = arrayConfig[1].querySelectorAll("input");
    inputs[0].value = values.config.urlServer || "";
    inputs[1].value = values.config.apiKey || "";
    inputs[2].value = values.config.formToken || "";
    config.dispatchEvent(new Event("change"));
  }
  if (values.config.source === "database") {
    config.options.item(2).selected = "selected";
    const inputs = arrayConfig[2].querySelectorAll("input");
    inputs[0].value = values.config.dbpath || "";
    config.dispatchEvent(new Event("change"));
  }
  if (values.config.source === "robot") {
    config.options.item(3).selected = "selected";
    const inputs = arrayConfig[3].querySelectorAll("input");
    inputs[0].value = values.config.robotName || "";
    config.dispatchEvent(new Event("change"));
  }

  for (let key in values.master) {
    console.log(key);
    if (key === "robotName") {
      master.options.item(0).selected = "selected";
      const inputs = arrayMaster[0].querySelectorAll("input");
      inputs[0].value = values.master.robotName || "";
      master.dispatchEvent(new Event("change"));
    }
    if (key === "robotAsyncName") {
      master.options.item(1).selected = "selected";
      const inputs = arrayMaster[1].querySelectorAll("input");
      inputs[0].value = values.master.robotAsyncName || "";
      master.dispatchEvent(new Event("change"));
    }
    if (key === "fileToWrite") {
      master.options.item(2).selected = "selected";
      const inputs = arrayMaster[2].querySelectorAll("input");
      inputs[0].value = values.master.fileToWrite || "";
      master.dispatchEvent(new Event("change"));
    }
  }

  if (values.end) {
    document.getElementById("endRobotName").value = values.end.robotName || "";
  }
}

function clearUndefined(objeto) {
  for (let clave in objeto) {
    if (
      objeto[clave] === null ||
      objeto[clave] === undefined ||
      objeto[clave] === ""
    ) {
      delete objeto[clave];
    }
  }
  return objeto;
}
function formatMessage(message) {
  let objectReturn = {
    config: {
      source: config.value.split("Config")[0],
      path: message?.inputexcelconfig,
      sheet: message?.inputsheetconfig,
      range: message?.inputrangeconfig,
      urlServer: message?.url_server,
      apiKey: message?.api_key,
      formToken: message?.form_token,
      dbpath: message?.inputDbPath,
      robotName: message?.robot_name,
    },
    master: {
      robotName: message?.master_robot_name,
      robotAsyncName: message?.robotasyncName,
      fileToWrite: message?.inputfilemaster,
    },
    end: {
      robotName: message?.endRobotName,
    },
  };
  objectReturn.config = clearUndefined(objectReturn.config);
  objectReturn.master = clearUndefined(objectReturn.master);
  objectReturn.end = clearUndefined(objectReturn.end);
  return objectReturn;
}

function setMessage() {
  const elementsToSend = document.querySelectorAll(".send-message input");
  let objMessage = {};
  elementsToSend.forEach((element) => {
    objMessage[element.id.trim()] = element.value.trim();
  });
  message.commands = formatMessage(objMessage);
  console.log(message.commands);
  SendMessage();
}

// Get path from endpoint
async function getPath() {
  const path = await fetch(`http://localhost:${port}/getfile`);
  const body = await path.text();
  return body.trim();
}
async function setInputValue(e) {
  try {
    if (e.target.id === "btninputconfig") {
      document.getElementById("inputexcelconfig").value = await getPath();
    }
    if (e.target.id === "btndbconfig") {
      document.getElementById("inputDbPath").value = await getPath();
    }
    if (e.target.id === "btnfilemaster") {
      document.getElementById("inputfilemaster").value = await getPath();
    }
    setMessage();

  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
//Hide inputs
function setHideValue(elements, name) {
  elements.forEach((element) => {
    if (element.id === name) {
      element.classList.remove("hide-element");
      element.classList.add("send-message");
    } else {
      element.classList.add("hide-element");
      element.classList.remove("send-message");
    }
  });
}

// Buttons Event
const btns = document.querySelectorAll(".btn-event");
btns.forEach((btn) => {
  btn.addEventListener("click", setInputValue);
});

const formEvents = document.querySelectorAll(".form-event");
formEvents.forEach((form) => {
  form.addEventListener("change", () => {
    setMessage();
  });
});

async function dataHandler(e) {
  message.commands = e.data;
  fillInputs(message.commands);
  return;
}

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
eventer(messageEvent, dataHandler);

// Config listner change
config.addEventListener("change", function (e) {
  setHideValue(arrayConfig, config.value);
});

// master listner change
master.addEventListener("change", function (e) {
  setHideValue(arrayMaster, master.value);
});
