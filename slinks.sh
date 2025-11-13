#!/bin/bash


ln -s /var/www/production.backend.zimmer-im-revier.de/public/fileadmin /var/www/production.frontend.zimmer-im-revier.de/dist/fileadmin
ln -s /var/www/production.backend.zimmer-im-revier.de/public/typo3 /var/www/production.frontend.zimmer-im-revier.de/dist/typo3
ln -s /var/www/production.backend.zimmer-im-revier.de/public/typo3conf /var/www/production.frontend.zimmer-im-revier.de/dist/typo3conf

ln -s /var/www/production.frontend.zimmer-im-revier.de/.nuxt/dist/client/ /var/www/production.frontend.zimmer-im-revier.de/dist/_nuxt
