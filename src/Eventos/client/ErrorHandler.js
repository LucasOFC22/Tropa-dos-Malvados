const client = require("../../../index");
const chalk = require("chalk");
const { MessageEmbed } = require("discord.js");
const { inspect } = require("util");
const emoji = require("../../config/emoji.json")
const Config = require("../../config/config.json")

client.on("error", (err) => {
  console.log(
    chalk.blue("——————————[ERROR]——————————\n") + err);
});
process.on("unhandledRejection", (reason, p) => {
  console.log(
    chalk.blue("——————————[Unhandled Rejection/Catch]——————————\n"),
    reason,
    p
  );
});
process.on("uncaughtException", (err, origin) => {
  console.log(
    chalk.blue("——————————[Uncaught Exception/Catch]——————————\n"),
    err,
    origin
  );
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(
    chalk.blue("——————————[Uncaught Exception/Catch (MONITOR)]——————————\n"),
    err,
    origin
  );
});
process.on("multipleResolves", (type, promise, reason) => {
  console.log(
    chalk.blue("——————————[Multiple Resolves]——————————\n"),
    type,
    promise,
    reason
  );
});
