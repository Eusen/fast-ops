import {exec} from "../src/utils";

(() => {
  exec(`git add . && git commit -m "auto publish at ${Date.now()}" && git push`);
})();
