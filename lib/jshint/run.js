/**
 * base of this run script comes from the Jasmine project
 * Copyright (c) 2008-2011 Pivotal Labs
 * MIT License
 *
 * heavily rewritten by Julien Wajsberg
 * Copyright (c) 2011 Julien Wajsberg
 */

var fs = require("fs");
var JSHINT = require("./jshint").JSHINT;

function times(str, nb) {
    var result = str;
    for (var i = 1; i < nb; i++) {
        result += str;
    }

    return result;
}

var tabregex = /\t/g;
var errorsByType = {};

function doErrorByTypeWithError(error) {
    var raw = error.raw;
    if (raw) {
        var errorType = errorsByType[raw] = errorsByType[raw] || [];
        errorType.push(error);
    } else {
        displayErrorsByType();
        displayError(error);
    }
}

function parseErrors(file, errors, doWithError) {
    doWithError = doWithError || displayError;
    if (! errors) {
        return;
    }

    for (var i = 0, l = errors.length; i < l; i++) {
        var error = errors[i];
        if (!error) {
            continue;
        }

        error.file = file;
        doWithError(error);

    }
}

function displayErrorsByType() {
    for (var raw in errorsByType) {
        errorsByType[raw].forEach(displayError);
    }
}

function displayError(error) {
        var matches, nbTab;

        var reason = error.reason,
            line = error.line,
            chr = error.character,
            evidence = error.evidence,
            file = error.file;

        if (evidence) {
            /* we try to display tabs correctly */
            matches = evidence.match(tabregex);
            nbTab = 0;
            if (matches !== null) {
                nbTab = matches.length;
            }
            evidence = evidence.replace(tabregex, '    ');

            console.log("%s at %s:%d:%d", reason, file, line, chr);
            console.log("%s", evidence);
            console.log("%s^", times(" ", chr - 1 + nbTab * 3));
        } else {
            console.log(reason);
        }
}

function displayHelp() {
    console.log("node lib/jshint/run.js [order function]");
    console.log("Order functions are :");
    console.log("-f or --order-by-file : display errors in the order they are found");
    console.log("-t or --order-by-type : display errors sorted by type of the error");
    console.log("Default is 'order by file'");
}

(function() {
  var ansi = {
    green: '\033[32m',
    red: '\033[31m',
    yellow: '\033[33m',
    none: '\033[0m'
  };
  var passed = true;
  var doWithErrorFunctions = {
      "--order-by-type": doErrorByTypeWithError,
      "-t": doErrorByTypeWithError,
      "--order-by-file": displayError,
      "-f": displayError
  };

  // parse arguments
  var arg = process.argv[2];

  var processFunc = displayError,
	  firstFile = 2;
  
  if (arg[0] === '-') {
	  if (arg === '--help') {
		  displayHelp();
		  process.exit(1);
	  }
      processFunc = doWithErrorFunctions[arg] || displayError;
      firstFile = 3;
  }
  
  var files = process.argv.slice(firstFile);

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var ok = JSHINT(fs.readFileSync(file, "utf8"));

    var errors = JSHINT.errors || [];

    if (ok) {
      console.log(ansi.green + file + " passed." + ansi.none);
    } else {
      console.log(ansi.red + file + " has errors:" + ansi.none);

      // choose processFunc depending on the arguments
      parseErrors(file, errors, processFunc);
    }

    passed = passed && ok;
  }

  var msg, exitValue;
  if (passed) {
      msg = ansi.green + "JSHint PASSED." + ansi.none;
      exitValue = 0;
  } else {
      msg = ansi.red + "JSHint failed." + ansi.none;
      exitValue = 1;
  }

  console.log(msg);
  process.exit(exitValue);


})();

