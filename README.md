Spark EOL
=========

Spark End-Of-Life desktop and mobile websites.

Based off Mozilla's [Playdoh][github-playdoh] and [Spark][github-spark].

Python dependencies are in the spark-lib repository also hosted on [github][github-sparklib].

Please refer to [Playdoh's docs][github-playdoh] for more information.

[github-playdoh]: http://github.com/mozilla/playdoh
[github-spark]: http://github.com/mozilla/spark
[github-sparklib]: http://github.com/mozilla/spark-lib


Getting started (all environments)
==================================

* git clone --recursive git://github.com/mozilla/spark-eol.git
* Optional: create a virtualenv before running the step below
* pip install -r requirements/compiled.txt


Dev installation
================

* Refer to 'Getting started' above
* cp settings_local.py-dev settings_local.py
* Configure the database in settings_local.py
* ./vendor/src/schematic/schematic migrations/ 
* ./manage.py runserver

When the dev installation is complete:
* Access desktop version: http://localhost:8000/
* Access mobile version: http://localhost:8000/m/


Stage installation
==================

* Refer to 'Getting started' above
* cp settings_local.py-dist settings_local.py
* Configure all required settings in settings_local.py for stage
* Run migrations: ./vendor/src/schematic/schematic migrations/ 
* Set up a cron job: ./bin/update_site.py -e stage


Production installation
=======================

* Refer to 'Getting started' above
* cp settings_local.py-dist settings_local.py
* Configure all required settings in settings_local.py for production
* Run migrations: ./vendor/src/schematic/schematic migrations/ 
* Run: ./bin/update_site.py -e prod

