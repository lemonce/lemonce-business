// database connection
process.env.MYSQL_USER = 'root';
process.env.MYSQL_PASSWORD = '';
process.env.MYSQL_DATABASE = 'lemonce';
process.env.MYSQL_HOST = '127.0.0.1';

// http port
process.env.PORT = 8081;

// https port
process.env.SSLPORT = 8082;

// url for license server
process.env.LICENSE_SERVER = 'http://139.129.225.83:8080/license';
process.env.LICENSE_ACTIVATE_PERIOD = 7200;