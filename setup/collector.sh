#!/bin/bash
#
# create the collectors
#

app=localhost:50100

curl -v "http://$app/collector/destroy/devfed01-vmstat-devfed01"
curl -v "http://$app/collector/destroy/devfed01-vmstat"
curl -v "http://$app/collector/create/?name=devfed01-vmstat&exec=vmstat&params=1&action=spawn&handler=singleStatRow&source=devfed01"
curl -v "http://$app/collector/destroy/vmstat-d-devfed01"
curl -v "http://$app/collector/destroy/devfed01-vmstat-d"
curl -v "http://$app/collector/create/?name=devfed01-vmstat-d&exec=vmstat&params=-d+1&action=spawn&handler=multipleStatRows&source=devfed01"



