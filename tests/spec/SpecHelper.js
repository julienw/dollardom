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
    }
  });
});
