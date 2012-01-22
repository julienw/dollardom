beforeEach(function() {
  function isArray(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]'; 
  }

  this.addMatchers({
    // M for Multiple
    toContainM: function() {
        for (var i = 0, l = arguments.length; i < l; i++) {
            this.toContain(arguments[i]);
        }

        return !this.isNot;
    },
    toThrowAssertion: function() {
	  var result = false;
	  var exception;
	  if (typeof this.actual != 'function') {
		throw new Error('Actual is not a function');
	  }
	  try {
		this.actual();
	  } catch (e) {
		exception = e;
	  }
	  if (exception) {
		result = /^assertion/.test(exception);
	  }

	  var not = this.isNot ? "not " : "";

	  this.message = function() {
		  if (exception) {
			  return "Expected function throwed an exception instead of the expected assertion:" + exception;
		  } else {
			  return "Expected function didn't throw the expected assertion.";
		  }
	  };

	  return result;
    }
  });
});
