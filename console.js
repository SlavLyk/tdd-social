const prompt = require("prompt-sync")({ sigint: true });

const startConsole = () => {
  let appInUse = true;
  while (appInUse) {
    let command = prompt("$: ");

    if (command === "exit") {
      console.log("Exiting app");
      appInUse = false;
    } else {
      console.log("Try again");
    }
  }

  return appInUse;
};

startConsole();

module.exports = { startConsole };
