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