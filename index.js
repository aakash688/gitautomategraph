import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const simpleGit = require('simple-git');
const jsonfile = require('jsonfile');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

// Configure paths
const DATA_FILE = path.join(__dirname, 'data.json');
const LOG_FILE = path.join(__dirname, 'commit_log.txt');

// Initialize log file
fs.writeFileSync(LOG_FILE, 'Commit Log:\n', { flag: 'w' });

// Function to log messages to file and console
function logMessage(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  console.log(logEntry.trim());
  fs.appendFileSync(LOG_FILE, logEntry);
}

// Function to create a single commit
const makeCommit = (date) => {
  const data = {
    date: date.format(),
  };
  
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(DATA_FILE, data, (err) => {
      if (err) {
        logMessage(`Error writing to file: ${err}`);
        reject(err);
      } else {
        simpleGit().add([DATA_FILE]).commit(date.format(), { "--date": date.format() }).push((err, data) => {
          if (err) {
            logMessage(`Error committing: ${err}`);
            reject(err);
          } else {
            logMessage(`Committed: ${date.format()}`);
            resolve();
          }
        });
      }
    });
  });
};

const makeCommits = (n) => {
  if(n===0) return simpleGit().push();
  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date },makeCommits.bind(this,--n));
  });
};

makeCommits(1000);
