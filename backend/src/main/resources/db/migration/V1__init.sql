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

CREATE TABLE branch (
                        branch_Id INT PRIMARY KEY AUTO_INCREMENT,
                        branch_name VARCHAR(100),
                        location VARCHAR(200),
                        branch_username VARCHAR(100),
                        contact_no VARCHAR(20),
                        password VARCHAR(200),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //

CREATE TRIGGER before_branch_insert
    BEFORE INSERT ON branch
    FOR EACH ROW
BEGIN
    SET NEW.branch_username = CONCAT(NEW.branch_name, '_', NEW.location);
END //

DELIMITER ;


DELIMITER //
CREATE PROCEDURE checkUsernameExists(IN username VARCHAR(255), OUT existsFlag BOOLEAN)
BEGIN
    DECLARE temp_count INT;
    SELECT COUNT(*) INTO temp_count FROM branch WHERE branch_name = username;
    SET existsFlag = (temp_count > 0);
END //
DELIMITER ;

-- Fayas --------------------------------------------

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
    contact_number VARCHAR(15) NOT NULL,
    branch_id INT NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branch (branch_Id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE INDEX idx_consumer_id ON consumer(id);

-- Siyam --------------------------------------------

CREATE TABLE IF NOT EXISTS payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    receipt_number INT UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    account_number BIGINT NOT NULL,
    FOREIGN KEY (account_number) REFERENCES consumer(account_no)
);

-- trigger start
DELIMITER //

CREATE TRIGGER after_payment_insert
    AFTER INSERT ON Payment
    FOR EACH ROW
BEGIN
    UPDATE EBill
    SET total_bill = total_bill - NEW.amount
    WHERE account_no = NEW.account_number;
END //
-- trigger end
-- view start
DELIMITER ;

CREATE VIEW payment_consumer_view AS
SELECT
    p.payment_id,
    p.account_number,
    p.receipt_number,
    CONCAT(c.first_name, ' ', c.last_name) AS full_name,
    c.address,
    p.payment_date,
    p.amount
FROM
    payment p
        JOIN
    consumer c ON p.account_number = c.account_no;
-- view end
-- stored procedure start
DELIMITER //

CREATE PROCEDURE GetPaymentsByConsumer(IN search_term VARCHAR(255))
BEGIN
    -- Check if any payments exist for the given account number or full name
    SELECT p.payment_id,p.account_number, p.receipt_number,c.address, p.amount, p.payment_date,CONCAT(c.first_name, ' ', c.last_name) AS full_name
    FROM payment p
             JOIN consumer c ON p.account_number = c.account_no
    WHERE p.account_number = search_term OR CONCAT(c.first_name, ' ', c.last_name) = search_term;
END //

DELIMITER ;
-- stored procedure end

-- akthar
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

-- Praveen --------------------------------------------

CREATE TABLE IF NOT EXISTS employee (
    emp_Id INT AUTO_INCREMENT PRIMARY KEY,
    emp_name VARCHAR(100) NOT NULL,
    branch_Id INT,
    address VARCHAR(200),
    contact_No varchar(15),
    FOREIGN KEY (branch_Id) REFERENCES branch(branch_Id)
    );

CREATE TABLE monthly_reading (
    reading_Id INT AUTO_INCREMENT PRIMARY KEY,
    emp_Id INT,
    reading_Date VARCHAR(20),
    account_no BIGINT,
    reading_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (emp_Id) REFERENCES employee(emp_Id),
    FOREIGN KEY (account_no) REFERENCES consumer(account_no)
);
