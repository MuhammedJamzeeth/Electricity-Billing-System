CREATE USER IF NOT EXISTS 'group07'@'localhost' IDENTIFIED BY '1234';

GRANT ALL PRIVILEGES ON *.* TO 'group07'@'localhost' WITH GRANT OPTION;

FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS `electricity-billing-system`;

CREATE TABLE IF NOT EXISTS admin (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       password VARCHAR(100) NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(50) NOT NULL,
                       email VARCHAR(50) UNIQUE NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_admin_username ON admin(username);
CREATE INDEX idx_users_name ON users(name);


CREATE TABLE IF NOT EXISTS consumer (
    id INT NOT NULL,
    account_no BIGINT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    meter_no BIGINT UNIQUE NOT NULL,
    join_date DATE NOT NULL,
    address VARCHAR(255) NOT NULL,
    phase VARCHAR(15) NOT NULL,
    contact_number VARCHAR(15) NOT NULL
    );


CREATE INDEX idx_consumer_id ON consumer(id);

CREATE TABLE IF NOT EXISTS payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    receipt_number INT UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    account_number BIGINT NOT NULL,
    FOREIGN KEY (account_number) REFERENCES consumer(account_no)
);


DELIMITER //

CREATE TRIGGER after_payment_insert
    AFTER INSERT ON Payment
    FOR EACH ROW
BEGIN
    UPDATE EBill
    SET total_bill = total_bill - NEW.amount
    WHERE account_no = NEW.account_number;
END //

DELIMITER ;

CREATE TABLE IF NOT EXISTS EBill (
   bill_id BIGINT AUTO_INCREMENT PRIMARY KEY,
   account_no BIGINT NOT NULL,
   crnt_date DATE,
   last_date DATE,
   total_unit INT,
   crnt_unit INT,
   month_bill DECIMAL(10, 2),
   total_bill DECIMAL(10, 2),
   FOREIGN KEY (account_no) REFERENCES consumer(account_no)
);

