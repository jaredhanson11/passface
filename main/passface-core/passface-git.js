let passfaceUtilities = require('./passface-utilities')
let { dataStore } = require('./passface-datastore')
let { spawnSync} = require('child_process')

function git_pull() {}

function git_commit() {}

function git_push() {}

module.exports.setup = function() {
  const findProgram = passfaceUtilities.findProgram('git')
  if (findProgram.error) {
    alert('DOWNLOAD GIT AND DON\'t MOVE FORWARD')
  } else {
    dataStore.setGitPath(findProgram.path)
  }
}