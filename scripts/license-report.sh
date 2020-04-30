#!/bin/sh

# Install license report before running this script:
# npm install -g license-report

license-report --package=../package.json \
--output=table \
--relatedTo.label=project \
--department.value=salesforce-marketingcloud \
--relatedTo.value=sfmc-example-jb-custom-activity \
> ../licenses.txt
