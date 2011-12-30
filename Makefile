UGLIFYJS = uglifyjs

all: $$dom.min.js $$dom-with-animate.min.js $$dom-with-chain.min.js $$dom-with-chain-animate.min.js

%.min.js: %.dev.js
	$(UGLIFYJS) $< --unsafe
	@echo $@ : `wc -c $@` bytes minified, `gzip -nfc $@ | wc -c` bytes gzipped

generated:
	mkdir generated

generated/$$dom-with-animate.dev.js: generated $$dom.dev.js $$dom-animate.dev.js
	cat $^ > $@
	@echo $@ : `wc -c $@` bytes minified, `gzip -nfc $@ | wc -c` bytes gzipped

generated/$$dom-with-chain.dev.js: generated $$dom.dev.js $$dom-chain.dev.js
	cat $^ > $@
	@echo $@ : `wc -c $@` bytes minified, `gzip -nfc $@ | wc -c` bytes gzipped

generated/$$dom-with-chain-animate.dev.js: generated $$dom.dev.js $$dom-animate.dev.js $$dom-chain.dev.js
	cat $^ > $@
	@echo $@ : `wc -c $@` bytes minified, `gzip -nfc $@ | wc -c` bytes gzipped

clean:
	rm -f *.min.js
	rm -rf generated
