# Prepare leads hashes for facebook custom audience.
Making sha256 hash from db table

1) clone this repository `git clone https://github.com/tonkoshkurik/leads-to-csv-sha256-facebook-hashes && cd to leads-to-csv-sha256-facebook-hashes`
2) you have to create .env file with your settings
```
DB_HOST=localhost
DB_USER=root
DB_PASS=''
DB_DATABASE='leads'
PHONE_COUNTRY_CODE='UA'
```
3) run script with `node leads-hash-facebok.js`  
4) it will create file `leads.csv` in this folder :) 
