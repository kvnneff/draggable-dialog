BIN := ./node_modules/.bin
JS = $(wildcard index.js lib/*/*.js)
CSS = styles.css
TESTS = test/index.js
TEST = duo-test -c make

build-js: $(JS)
	@$(BIN)/duo index.js > build/build.js \
		--development

build-css: $(CSS)
	@$(BIN)/duo styles.css > build/build.css

build-tests:
	@mkdir -p $(dir $@)
	@$(BIN)/duo \
		--development \
		test/index.js > build/tests.js

build:
	$(MAKE) build-js 
	$(MAKE) build-css
	$(MAKE) build-tests

node_modules:
	npm install

test: build
	@$(BIN)/duo-test \
		-c 'make build' \
		--build build/tests.js \
		--reporter spec \
		browser

dist-build:
	@$(BIN)/duo \
		-g draggable-dialog \
		$(JS) > dist/draggable-dialog.js
	@$(BIN)/duo \
		$(CSS) > dist/draggable-dialog.css


dist-minify: dist/draggable-dialog.js
	@curl -s \
		-d compilation_level=SIMPLE_OPTIMIZATIONS \
		-d output_format=text \
		-d output_info=compiled_code \
		--data-urlencode "js_code@$<" \
		http://closure-compiler.appspot.com/compile \
		> $<.tmp
	@mv $<.tmp dist/draggable-dialog.min.js

clean:
	@rm -fr build/* components node_modules

.PHONY: clean test build build-js build-css build-tests