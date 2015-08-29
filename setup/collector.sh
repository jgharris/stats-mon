#!/bin/bash
#
# create the collectors
#

app=localhost:50100


#curl -v "http://$app/collector/destroy/devfed01-vmstat"
#curl -v "http://$app/collector/destroy/vmstat"
#curl -v "http://$app/collector/create/?name=vmstat&exec=vmstat&params=1&action=spawn&handler=singleStatRow"
#curl -v "http://$app/collector/destroy/vmstat-d"
#curl -v "http://$app/collector/create/?name=vmstat-d&exec=vmstat&params=-d+1&action=spawn&handler=multipleStatRows"

curl -v "http://$app/publisher/destroy/devfed01-vmstat"
curl -v "http://$app/publisher/create/?name=devfed01-vmstat&collector=vmstat&source=devfed01"
curl -v "http://$app/publisher/destroy/devfed01-vmstat-d"
curl -v "http://$app/publisher/create/?name=devfed01-vmstat-d&collector=vmstat-d&source=devfed01-d"


