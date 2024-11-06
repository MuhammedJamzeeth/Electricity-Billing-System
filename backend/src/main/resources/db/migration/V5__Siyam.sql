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