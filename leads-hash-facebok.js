require('dotenv').config();
const PhoneNumber = require("awesome-phonenumber");
const fs = require("fs");
const mysql = require("mysql");

const sha256 = require("js-sha256").sha256;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

connection.connect();

connection.query("SELECT DISTINCT email, phone from leads", function(
  err,
  rows,
  fields
) {
  if (err) throw err;

  let data = [];
  rows.forEach(element => {
    let phone = element.phone;

    if (phone) {
      phone = new PhoneNumber(phone, process.env.PHONE_COUNTRY_CODE);
      if (phone.isValid()) {
        let newObj = {};
        Object.keys(element).forEach(key => {
          if (key === "phone") {
            phone = phone.getNumber().replace(/\D/g, "");
            newObj[key] = sha256(phone);
          } else {
            newObj[key] = sha256(element[key]);
          }
        });
        data.push(newObj);
      }
    }
  });
  let csv = convertArrayOfObjectsToCSV({ data });
  fs.writeFile("leads.csv", csv, err => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
});

function convertArrayOfObjectsToCSV(args) {
  let result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = args.columnDelimiter || ",";
  lineDelimiter = args.lineDelimiter || "\n";

  keys = Object.keys(data[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
    ctr = 0;
    keys.forEach(function(key) {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

connection.end();
