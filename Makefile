UGLIFYJS = uglifyjs

MODULES = dollardom dollardom-animate dollardom-chain dollardom-chain-animate
MINIFIED = $(addsuffix .min.js,$(MODULES))
CONCAT = $(addsuffix .cat.js,$(MODULES))

VPATH = src

.SUFFIXES:
.DELETE_ON_ERROR:
.INTERMEDIATE: $(CONCAT)

all: $(MINIFIED)
.PHONY: all

%.min.js: %.cat.js
	$(UGLIFYJS) $< --unsafe > $@
	@echo ---- $@: `cat "$@" | wc -c` bytes minified, `gzip -nfc "$@" | wc -c` bytes gzipped

$(CONCAT): dollardom.js
	cat $^ > $@

dollardom-animate.cat.js: animate.js

dollardom-chain.cat.js: chain.js

dollardom-chain-animate.cat.js: animate.js chain.js

.PHONY: clean
clean:
	-rm -f *.min.js
