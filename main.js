#!/usr/bin/env node

(async function() {
  const package = require("./package");
  try {
    const dym = require("didyoumean");
    const updateNotifier = (await import("update-notifier")).default;
    const fs = require("fs");

    updateNotifier({
      updateCheckInterval: 0,
      pkg: package
    }).notify({
      isGlobal: true
    });

    let [, cmd, text, file, ...options] = process.argv;
    cmd = cmd.split("/").at(-1);

    const options_list = [
      [
        [
          "case-sensitive",
          "cs"
        ],
        "By default, the method will perform case-insensitive comparisons. If you wish to force case sensitivity, add --case-sensitive or --cs to options"
      ]
    ];
    const accept = [".json", ".txt"];
    const hint = `
${package.name}@${package.version} By ${package.author}

  Usage: ${cmd} <text> <file> (options)

  List options:
${options_list.map(([name, desc]) => "    " + (Array.isArray(name) ? name.map(v => (v.length == 1 ? "-" : "--") + v).join(", ") : (name.length == 1 ? "-" : "--") + name) + "\n      " + desc)}

  Supported file:
    txt:
      list 1, list 2, list 3

      list 1
      list 2
      list 3
    json:
      ["list 1", "list 2", "list 3"]

  Example:
    $ ${cmd} "Hello world" example.txt --cs
    Hello world
`;

    if(process.argv.length < 4) return console.log(hint);
    if(options.some(v => options_list.some(([name]) => name == v.replace(/[^0-9A-z]/gi, "")))) return console.log(hint);
    if(accept.every(v => !file.endsWith(v))) return console.log(hint);
    if(!fs.existsSync(file)) return console.log(`${cmd}: cannot access \'${file}\': No such file or directory`);

    let content = fs.readFileSync(file)+"";
    if(file.endsWith(".json")) content = new Array(...new Set(JSON.parse(content).filter(v => typeof v == "string" || typeof v == "number").map(v => ""+v)));

    if(file.endsWith(".json") && !Array.isArray(content)) return console.log(hint);
    if(file.endsWith(".txt")) {
      if(content.includes("\n") && content.split("\n")[1]) content = content.split("\n");
      else content = content.split(", ");
    };

    if(options.includes("--case-sensitive") || options.includes("--cs")) dym.caseSensitive = true;

    let result = dym(text, content);
    if(result) console.log(result);
  } catch(e) {
    if(e.code == "EACCES") return console.log(`${cmd}: cannot access \'${file}\': Permission denied`);
    if(e.code == "EISDIR") return console.log(`${cmd}: ${file}: Is a directory`);

    if(e?.message?.includes?.("JSON")) return console.log(`${cmd}: ${file}: Is not a JSON`);

    console.log("Error!", `Report this log to ${package.bugs.url} :\n`);;
    console.error(e);
    return;
  };
})();
