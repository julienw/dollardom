# command to minify the javascript files
JSMINIFY = uglifyjs

# options to give to the minification command
JSMINIFY_OPTS = --unsafe --lift-vars

# modules to be built
MODULES = dollardom dollardom-animate dollardom-chain dollardom-chain-animate

# file names of minified files
MINIFIED = $(addsuffix .min.js,$(MODULES))

# file names of concatenated files
CONCAT = $(addsuffix .cat.js,$(MODULES))

# directory for source files
VPATH = src

# clear existing suffixes
.SUFFIXES:

# delete all created files if there is an error
.DELETE_ON_ERROR:

# concatenated files are intermediate, which means they'll be deleted at the end
.INTERMEDIATE: $(CONCAT)

# this is the default rule: build all minified files
all: $(MINIFIED)
.PHONY: all

# recipe for minifying concatenated javascript files
%.min.js: %.cat.js
	$(JSMINIFY) $(JSMINIFY_OPTS) $< > $@
	@echo ---- $@: `cat "$@" | wc -c` bytes minified, `gzip -nfc "$@" | wc -c` bytes gzipped
	@echo

# all concatenated files depend on main dollardom file
# the recipe just concatenates all specified prerequisites together
$(CONCAT): dollardom.js
	cat $^ > $@

# specify additional prerequisites for these targets
dollardom-animate.cat.js: animate.js

dollardom-chain.cat.js: chain.js

dollardom-chain-animate.cat.js: animate.js chain.js

# cleaning recipe
.PHONY: clean
clean:
	-rm -f *.min.js
