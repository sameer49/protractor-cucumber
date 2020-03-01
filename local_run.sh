#!/bin/bash

REPORT_FILEPATH=${REPORT_FILEPATH:="./reports/summary.txt"}
TEST_URL=${TEST_URL:="https://www.delta.com/apac/en"}
BROWSER_COUNT=${BROWSER_COUNT:=1}
BROWSER_NAME=${BROWSER_NAME:=chrome}
BROWSER_VERSION=${BROWSER_VERSION:=69.0}
#PLATFORM=${PLATFORM:=saucelab}
PLATFORM=${PLATFORM:=local}
PLATFORM_NAME=${PLATFORM_NAME:='Windows10'}

SERIAL_RUN_CMD="./node_modules/protractor/bin/protractor"
PARALLEL_RUN_CMD="./node_modules/protractor-flake/bin/protractor-flake --protractor-path=./node_modules/protractor/bin/protractor --parser cucumber --node-bin node --max-attempts=0 --"

PARAMS=" --params.test.TEST_URL=$TEST_URL"
PARAMS+=" --params.test.BROWSER_COUNT=$BROWSER_COUNT"
PARAMS+=" --params.test.BROWSER_NAME=$BROWSER_NAME"
PARAMS+=" --params.test.BROWSER_VERSION=$BROWSER_VERSION"
PARAMS+=" --params.test.PLATFORM=$PLATFORM"
PARAMS+=" --params.test.PLATFORM_NAME=$PLATFORM_NAME"

echo $PARAMS

CONF_FILE="conf_local.js"

if [[ $PLATFORM == "saucelab" ]]; then
    CONF_FILE="conf_saucelab.js"
fi

echo $CONF_FILE

if (($# == 1)); then
    echo "############### Running "$1" Tag ###############"
    $PARALLEL_RUN_CMD $CONF_FILE $PARAMS --cucumberOpts.tags="$1" --disableChecks
    exit 1
fi

if [[ $BROWSER_COUNT > 1 ]]; then
    echo "Running Tests Parallely"
    PARALLEL_RUN_CMD+=" --capabilities.maxInstances=$BROWSER_COUNT "
    $PARALLEL_RUN_CMD $CONF_FILE $PARAMS
    else
    echo "Running Tests Serialy"
    $SERIAL_RUN_CMD $CONF_FILE $PARAMS
fi

if [[ -f "$REPORT_FILEPATH" ]]; then
    echo "========================================================================"
    echo "Test Summary report generated in: $REPORT_FILEPATH"
    echo "========================================================================"
    echo "Test Run Summary"
    echo "----------------"
    cat $REPORT_FILEPATH
    echo ''
    echo "========================================================================"
else
    echo "========================================================================"
    echo "Test Summary is not generated."
    echo "========================================================================"
fi
