#/bin/bash
# this build script was shamelessly taken from Modernizr
# then it is Copyright Paul Irish and under BSD and MIT dual licence
# as per http://www.modernizr.com/license/

IN='src/dollardom.js'
OUT='dollardom.min.js'
IN_WITH_ANIMATE='src/animate.js'
OUT_WITH_ANIMATE='dollardom-animate.min.js'

SIZE_MIN=`uglifyjs "$IN" --unsafe | tee "$OUT" | wc -c`
SIZE_GZIP=`gzip -nfc "$OUT" | wc -c`

echo without animate : $SIZE_MIN bytes minified, $SIZE_GZIP bytes gzipped

SIZE_MIN=`cat "${IN}" "${IN_WITH_ANIMATE}" | uglifyjs --unsafe | tee "${OUT_WITH_ANIMATE}" | wc -c`
SIZE_GZIP=`gzip -nfc "${OUT_WITH_ANIMATE}" | wc -c`

echo with animate : $SIZE_MIN bytes minified, $SIZE_GZIP bytes gzipped

if [ "$1" == "--test" ]; then
    rm "$OUT" "${OUT_WITH_ANIMATE}"
fi
