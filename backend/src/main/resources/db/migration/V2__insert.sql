INSERT INTO admin (username, password) VALUES ('admin', '$2a$10$hetGOYyl53foqdLMC.kEUeT6HbDGG9FKoKalGOqKUOy0cOk5ZOv3a');

-- Fayas --------------------------------------------

INSERT INTO consumer (id,account_no,first_name, last_name, email, meter_no,join_date, address, phase, contact_number)
VALUES
    (1,4561897562,'Amal', 'Perera', 'amal.perera@example.com', 1000000001,'2024-08-21', 'No. 10, Main Street, Colombo 07, Sri Lanka', '1-Phase', '+94-71-123-4567'),
    (2,6789543862,'Kamal', 'Fernando', 'kamal.fernando@example.com', 1000000002,'2024-03-11', 'No. 15, Main Street, Colombo 07, Sri Lanka', '3-Phase', '+94-71-234-5678'),
    (3,2946786425,'Saman', 'Silva', 'saman.silva@example.com', 1000000003,'2000-01-21', 'No. 20, Main Street, Colombo 07, Sri Lanka', '1-Phase', '+94-77-345-6789'),
    (4,8947612864,'Nimal', 'Weerasinghe', 'nimal.weerasinghe@example.com', 1000000004,'2001-01-01', 'No. 25, Main Street, Colombo 07, Sri Lanka', '3-Phase', '+94-77-456-7890'),
    (5,4589756176,'Chandana', 'Jayawardena', 'chandana.jayawardena@example.com', 1000000005,'2002-11-02','No. 30, Main Street, Colombo 07, Sri Lanka', '1-Phase', '+94-75-567-8901'),
    (6,2789869789,'Ruwan', 'Ratnayake', 'ruwan.ratnayake@example.com', 1000000006,'1098-06-30','No. 35, Main Street, Colombo 07, Sri Lanka', '3-Phase', '+94-75-678-9012'),
    (7,2467824634,'Kumara', 'Wickramasinghe', 'kumara.wickramasinghe@example.com', 1000000007, '1995-01-02','No. 40, Main Street, Colombo 07, Sri Lanka', '1-Phase', '+94-72-789-0123'),
    (8,7964528945,'Sunil', 'De Silva', 'sunil.desilva@example.com', 1000000008,'2024-08-21', 'No. 45, Main Street, Colombo 07, Sri Lanka', '3-Phase', '+94-72-890-1234'),
    (9,6523781453,'Ajith', 'Gunawardena', 'ajith.gunawardena@example.com', 1000000009, '2024-08-21','No. 50, Main Street, Colombo 07, Sri Lanka', '1-Phase', '+94-70-901-2345'),
    (10,5468985334,'Ravi', 'Dias', 'ravi.dias@example.com', 1000000010,'2024-08-21', 'No. 55, Main Street, Colombo 07, Sri Lanka', '1-Phase', '+94-70-012-3456'),
    (11,1789246824,'Nuwan', 'Peris', 'nuwan.peris@example.com', 1000000011,'2024-08-21', 'No. 60, Main Street, Colombo 07, Sri Lanka', '1-Phase', '+94-78-123-4567'),
    (12,5624799264,'Dilshan', 'Senanayake', 'dilshan.senanayake@example.com', 1000000012, '2024-08-21','No. 65, Main Street, Colombo 07, Sri Lanka', '3-Phase', '+94-78-234-5678'),
    (13,7562479852,'Shan', 'Fonseka', 'shan.fonseka@example.com', 1000000013, '2024-08-21','No. 70, Main Street, Colombo 07, Sri Lanka', '1-Phase', '+94-76-345-6789'),
    (14,1237324567,'Pradeep', 'Wijesinghe', 'pradeep.wijesinghe@example.com', 1000000014, '2024-08-21','No. 75, Main Street, Colombo 07, Sri Lanka', '1-Phase', '+94-76-456-7890'),
    (15,9825761543,'Thilina', 'Kumara', 'thilina.kumara@example.com', 1000000015, '2024-08-21','No. 80, Main Street, Colombo 07, Sri Lanka', '1-Phase', '+94-76-567-8901');

 INSERT INTO payment (receipt_number, amount, payment_date, account_number) VALUES
            (10001, 150.75, '2024-01-15', 4561897562),
            (10002, 200.50, '2024-02-20', 6789543862),
            (10003, 125.00, '2024-03-10', 2946786425),
            (10004, 300.00, '2024-04-25', 8947612864),
            (10005, 175.25, '2024-05-30', 4589756176);

 INSERT INTO EBill (account_no, crnt_date, last_date, total_unit, crnt_unit, month_bill, total_bill) VALUES
         (4561897562, '2024-01-01', '2024-01-31', 100, 120, 150.75, 150.75),
         (6789543862, '2024-02-01', '2024-02-28', 200, 180, 200.50, 200.50),
         (2946786425, '2024-03-01', '2024-03-31', 150, 170, 125.00, 125.00),
         (8947612864, '2024-04-01', '2024-04-30', 250, 240, 300.00, 300.00),
         (4589756176, '2024-05-01', '2024-05-31', 180, 190, 175.25, 175.25);

-- praveen --------------------------------------------

INSERT INTO `electricity-billing-system`.`branch` (`branch_Id`, `branch_name`, `location`, `branch_username`, `contact_no`) VALUES (2, 'Colombo CEB', 'Colombo - 11', 'CEB_colombo@gmail.com', '011-3454675');

INSERT INTO employee (emp_Id, emp_Name, address, branch_Id, contact_No) VALUES
(1001, 'Nimal Perera', '123 Galle Road, Colombo', 2, '0712345678'),
(1002, 'Sunil Fernando', '456 Kandy Road, Kandy', 2, '0723456789'),
(1003, 'Priya Wijesekera', '789 Negombo Street, Negombo', 2, '0734567890'),
(1004, 'Kavinda Silva', '321 Jaffna Road, Jaffna', 2, '0745678901'),
(1005, 'Dilani Gunasekara', '654 Matara Avenue, Matara', 2, '0756789012'),
(1006, 'Amila Rajapaksha', '987 Anuradhapura Road, Anuradhapura', 2, '0767890123'),
(1007, 'Ruwan Wickramasinghe', '135 Galle Face, Colombo', 2, '0778901234'),
(1008, 'Tharindu Jayasuriya', '246 Colombo Road, Nugegoda', 2, '0789012345'),
(1009, 'Chathura Bandara', '357 Kandy Road, Nuwara Eliya', 2, '0790123456'),
(1010, 'Lakshitha Perera', '468 Batticaloa Road, Batticaloa', 2, '0801234567');
