CREATE USER IF NOT EXISTS 'group07'@'localhost' IDENTIFIED BY 'Str0ngP@ssw0rd!';


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

CREATE INDEX idx_users_name ON branch(branch_username);

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


DELIMITER //

CREATE PROCEDURE updateBranchUsername(IN id INT, IN new_branch_name VARCHAR(255), IN new_location VARCHAR(255))
BEGIN
    DECLARE new_username VARCHAR(255);

    SET new_username = CONCAT(new_branch_name, '_', new_location);

    UPDATE branch
    SET branch_name = new_branch_name,
        location = new_location,
        branch_username = new_username
    WHERE branch_Id = id;
END //


DELIMITER ;



-- Fayas --------------------------------------------

CREATE TABLE IF NOT EXISTS consumer (
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
    FOREIGN KEY (branch_id) REFERENCES branch (branch_Id)

    );



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

-- akthar----------------


-- Create the EBill table with updated data types
CREATE TABLE EBill (
                       bill_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       account_no BIGINT NOT NULL,
                       crnt_date DATE,
                       last_date DATE,
                       total_unit INT,
                       crnt_unit INT,
                       month_bill DECIMAL(10, 2),
                       total_bill DECIMAL(10, 2),
                       FOREIGN KEY (account_no) REFERENCES Consumer(account_no)
);

-- Create an index on account_no for faster lookups
CREATE INDEX idx_account_no ON EBill (account_no);

-- Create the MonthwiseDetails table with updated data types
CREATE TABLE MonthwiseDetails (
                                  m_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  account_no BIGINT NOT NULL,
                                  crnt_date DATE,
                                  crnt_unit INT,
                                  month_bill DECIMAL(10, 2),
                                  bill_status VARCHAR(50)
);

-- Create a stored function for checking account validity
DELIMITER //

CREATE FUNCTION ebillCheck(accountNo BIGINT)
    RETURNS VARCHAR(255)
    DETERMINISTIC
BEGIN
    DECLARE result VARCHAR(255);

    IF EXISTS (SELECT 1 FROM Consumer WHERE account_no = accountNo) THEN
        SET result = 'Account approved';
ELSE
        SET result = 'Invalid Account No';
END IF;

RETURN result;
END //

DELIMITER ;

-- Create a stored function to calculate the month bill based on phase
DELIMITER //

CREATE FUNCTION calculateMonthBill(accountNo BIGINT, crntUnit INT)
    RETURNS DOUBLE
    DETERMINISTIC
BEGIN
    DECLARE previousTotalUnit INT DEFAULT 0;
    DECLARE phase INT;
    DECLARE monthBill DOUBLE DEFAULT 0.0;
    DECLARE calckedUnit INT;

    -- Get the previous total unit
SELECT IFNULL(SUM(total_unit), 0) INTO previousTotalUnit
FROM EBill
WHERE account_no = accountNo;

-- Get the phase from the Consumer table
SELECT CAST(phase AS UNSIGNED) INTO phase
FROM Consumer
WHERE account_no = accountNo;

-- Calculate the billed units
SET calckedUnit = crntUnit - previousTotalUnit;

    -- Phase-based billing logic
    IF phase = 1 THEN
        IF calckedUnit < 58 THEN
            SET monthBill = (calckedUnit * 15.00) + 400;
ELSE
            SET monthBill = (58 * 15.00) + ((calckedUnit - 58) * 12.00) + 400;
END IF;
    ELSEIF phase = 3 THEN
        IF calckedUnit < 58 THEN
            SET monthBill = (calckedUnit * 12.00) + 400;
ELSE
            SET monthBill = (58 * 12.00) + ((calckedUnit - 58) * 10.00) + 400;
END IF;
END IF;

RETURN monthBill;
END //

DELIMITER ;

-- Trigger to update bill status after inserting into MonthwiseDetails
DELIMITER //
DELIMITER //

CREATE TRIGGER update_bill_status
    BEFORE INSERT ON MonthwiseDetails
    FOR EACH ROW
BEGIN
    DECLARE total_last_three_months DECIMAL(10, 2);

    -- Calculate the sum of `monthBill` for the last three months for this account
    SELECT IFNULL(SUM(month_bill), 0) INTO total_last_three_months
    FROM MonthwiseDetails
    WHERE account_no = NEW.account_no
    ORDER BY crnt_date DESC
        LIMIT 3;

    -- Check against the `totalBill` in the `EBill` table and set the bill status accordingly
    IF total_last_three_months > (SELECT total_bill FROM EBill WHERE account_no = NEW.account_no) THEN
        SET NEW.bill_status = 'Redbill';
    ELSE
        SET NEW.bill_status = 'normal';
END IF;
END //

DELIMITER ;

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

-- employee count for dashboard
SELECT COUNT(*) AS employee_count FROM employee;

-- branch count
SELECT COUNT(*) AS branch_count FROM branch;

-- user count
SELECT COUNT(*) AS user_count FROM consumer;

-- payment count
SELECT COUNT(*) AS payment_count FROM payment;

-- graph
SELECT
    EXTRACT(MONTH FROM payment_date) AS month,
    SUM(amount) AS total_payment
FROM
    payment
GROUP BY
    EXTRACT(MONTH FROM payment_date)
ORDER BY
    month;

