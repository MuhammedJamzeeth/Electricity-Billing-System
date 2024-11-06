CREATE TABLE branch (
                        branch_Id INT PRIMARY KEY AUTO_INCREMENT,
                        branch_name VARCHAR(100),
                        location VARCHAR(200),
                        branch_username VARCHAR(100),
                        contact_no VARCHAR(20)
);

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