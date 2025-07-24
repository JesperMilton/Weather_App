#!/bin/bash

npx google-closure-compiler \
--language_in ECMASCRIPT_2017 \
--language_out ECMASCRIPT_2017 \
--warning_level DEFAULT \
--module_resolution=BROWSER \
--compilation_level SIMPLE_OPTIMIZATIONS \
--js=modules/apiKey.js \
--js=modules/GetUserLocation.js \
--js=modules/FetchAPI.js \
--js=modules/RefreshPage.js \
--js=modules/App.js \
--js=index.js \
--js_output_file=out.js;