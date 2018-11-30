MAKEFLAGS += --silent
MAKEFLAGS += --ignore-errors
real := $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))

help:
	echo $(real)
clean:
	rm -rf node_modules
	rm -rf errorShots
	rm -rf json_results
report:
	allure generate allure-results --clean && allure open
	allure open
