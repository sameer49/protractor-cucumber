#!/bin/bash
echo '############### Updating Webdriver ###############'
node ./node_modules/protractor/bin/webdriver-manager update --versions.chrome 2.37 --gecko false
