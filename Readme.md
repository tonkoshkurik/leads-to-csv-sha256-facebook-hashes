# Prepare leads hashes for facebook custom audience.
Making sha256 hash from db table

1) clone this repository and `git clone https://github.com/tonkoshkurik/leads-to-csv-sha256-facebook-hashes && cd to leads-to-csv-sha256-facebook-hashes`
2) you have to create .env file with your settings
3) node leads-hash-facebok.js     
```
DB_HOST=localhost
DB_USER=root
DB_PASS=''
DB_DATABASE='leads'
PHONE_COUNTRY_CODE='UA'
```
