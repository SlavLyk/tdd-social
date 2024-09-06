import { consoleInput } from "./social-media.js";
import promptConfig from "prompt-sync";

const prompt = promptConfig({ sigint: true });

const startConsole = () => {
  let appInUse = true;
  while (appInUse) {
    let command = prompt("$: ");

    if (command === "exit") {
      console.log("Exiting app");
      appInUse = false;
    } else {
      console.log(consoleInput(command));
    }
  }

  return appInUse;
};

startConsole();

module.exports = { startConsole };
