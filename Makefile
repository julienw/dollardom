# command to minify the javascript files
JSMINIFY = node_modules/.bin/uglifyjs

# options to give to the minification command
JSMINIFY_OPTS = -c unsafe -m --comments --

# command to run jshint
CHECKJS = node_modules/.bin/jshint

# modules to be built
MODULES = dollardom dollardom-animate dollardom-chain dollardom-chain-animate

# file names of minified files
MINIFIED = $(addsuffix .min.js,$(MODULES))

# file names of concatenated files
CONCAT = $(addsuffix .cat.js,$(MODULES))

# all sources
SOURCES = dollardom.js animate.js chain.js

# tools installed by npm
NPM_TOOLS = $(JSMINIFY) $(CHECKJS)

# directory for source files
VPATH = src

# keyword to identify the debug parts in the source code 
DEBUG_KEYWORD = debug

# clear existing suffixes
.SUFFIXES:

# delete all created files if there is an error
.DELETE_ON_ERROR:

# concatenated files are intermediate, which means they'll be deleted at the end
.INTERMEDIATE: $(CONCAT)

# this is the default rule: build all minified files
all: $(MINIFIED) dollardom-full.debug.js
.PHONY: all

# recipe for minifying concatenated javascript files
# it also removes the debug parts and checks the resulting file for correctness
%.min.js: %.cat.js | $(JSMINIFY)
	sed  -e '\#/\*!$(DEBUG_KEYWORD)!\*/#d' -e '\#/\*!$(DEBUG_KEYWORD)#,\#$(DEBUG_KEYWORD)!\*/#d' $< > $<.tmp
	$(CHECKJS) $<.tmp
	$(JSMINIFY) $(JSMINIFY_OPTS) $<.tmp > $@
	rm -f $<.tmp
	@echo ---- $@: `cat "$@" | wc -c` bytes minified, `gzip -nfc "$@" | wc -c` bytes gzipped
	@echo

# all concatenated files depend on main dollardom file
# the recipe just concatenates all specified prerequisites together
$(CONCAT): dollardom.js | checkjs
	cat $^ > $@

# specify additional prerequisites for these targets
dollardom-animate.cat.js: animate.js

dollardom-chain.cat.js: chain.js

dollardom-chain-animate.cat.js: animate.js chain.js

dollardom-full.debug.js: dollardom-chain-animate.cat.js
	cp -f $< $@

# cleaning recipe
.PHONY: clean
clean:
	-rm -f *.min.js
	-rm -f dollardom-full.debug.js
	-rm checkjs

checkjs: $(SOURCES) | $(CHECKJS)
	$(CHECKJS) $^
	touch checkjs

$(NPM_TOOLS): package.json
	npm install
	touch $@

