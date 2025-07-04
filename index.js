const simpleGit = require('simple-git')();
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
function log(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  console.log(logEntry.trim());
  fs.appendFileSync(LOG_FILE, logEntry);
}

// Function to create a single commit
async function makeCommit(date) {
  const data = { date: date.format() };
  
  try {
    // Write to data file
    await jsonfile.writeFile(DATA_FILE, data);
    
    // Configure git
    await simpleGit.add(DATA_FILE);
    await simpleGit.commit('Update data', [DATA_FILE], {
      '--date': date.format()
    });
    
    log(`Committed: ${date.format()}`);
    return true;
  } catch (error) {
    log(`Error: ${error.message}`);
    return false;
  }
}

// Function to generate random date between two dates
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Main function to create multiple commits
async function makeCommits(count) {
  const startDate = new Date('2016-01-01');
  const endDate = new Date('2024-08-31');
  
  log(`Starting to create ${count} commits between ${startDate.toISOString()} and ${endDate.toISOString()}`);
  
  for (let i = 0; i < count; i++) {
    const randomDateValue = randomDate(startDate, endDate);
    const date = moment(randomDateValue);
    
    log(`[${i+1}/${count}] Processing commit for ${date.format('YYYY-MM-DD')}`);
    
    const success = await makeCommit(date);
    if (!success) {
      log(`Failed to create commit ${i+1}, continuing with next...`);
    }
    
    // Add a small delay between commits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  log('All commits completed!');
  log('Pushing to remote repository...');
  
  try {
    await simpleGit.push('origin', 'main');
    log('Successfully pushed all commits to remote repository!');
  } catch (error) {
    log(`Error pushing to remote: ${error.message}`);
  }
}

// Start creating commits (100 commits for testing)
makeCommits(100).catch(error => {
  log(`Fatal error: ${error.message}`);
  process.exit(1);
});
