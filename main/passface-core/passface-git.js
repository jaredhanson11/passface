let fs = require('fs')
let passfaceUtilities = require('./passface-utilities')
let { dataStore } = require('./passface-datastore')
let passfaceConstants = require('./passface-constants')
let { spawnSync} = require('child_process')

function git_pull() {}

function git_commit() {}

function git_push() {}

module.exports.setup = function() {
  // Ensure git is installed on path
  const findProgram = passfaceUtilities.findProgram('git')
  if (findProgram.error) {
    alert('DOWNLOAD GIT AND DON\'T MOVE FORWARD')
  } else {
    dataStore.setGitPath(findProgram.path).save()
  }

  // Ensure password store repo has been setup
  var passStorePath = dataStore.passwordStorePath || passfaceConstants.DEFAULT_PASSWORD_STORE
  const gitRepo = gitRepoExists(passStorePath)
  if (gitRepo.error) {
    console.log("ASK FOR DIRECTORY TO SAVE PASSSTORE")
  } else {
    dataStore.setPasswordStorePath(gitRepo.path).save()
  }
}

function gitRepoExists(repoPath) {
  var ret = {error: null, path: repoPath}
  let args = ['-C', repoPath, 'status']
  let p1_gitstatus = spawnSync(dataStore.gitPath, args)
  const err = passfaceUtilities.checkError(p1_gitstatus.stdout, passfaceConstants.GIT_ERROR_CODES)
  if (err) {
    ret.error = err
    return ret
  } else {
    return ret
  }
}