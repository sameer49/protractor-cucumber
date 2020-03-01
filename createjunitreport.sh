#!/bin/bash
file1="/reports/merged-output.json"

if [[ -f "$file1" ]]; then
    cat $file1 | ./node_modules/.bin/cucumber-junit > /reports/junitreport.xml
fi