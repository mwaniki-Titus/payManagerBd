CREATE DATABASE PayManager;
USE PayManager;

CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY IDENTITY(1,1),
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Location VARCHAR(255),
    BirthDate DATE,
    Contact VARCHAR(15),
    Gender VARCHAR(10),
    admin BIT DEFAULT 0 NOT NULL,
    PositionID INT,
    ScheduleID INT,
    PhotoURL VARCHAR(999),
    Email VARCHAR(50),
    Password VARCHAR(50),
    BankName VARCHAR(50),
    BankBranch VARCHAR(50),
    AccountNumber VARCHAR(50),
    Bio VARCHAR(500),
    FOREIGN KEY (PositionID) REFERENCES Position(PositionID),
    FOREIGN KEY (ScheduleID) REFERENCES Schedule(ScheduleID)
);



DROP TABLE Employees


CREATE TABLE Position (
    PositionID INT PRIMARY KEY IDENTITY(1,1),
    PositionDescription VARCHAR(MAX) DEFAULT 'no position',
    GrossSalary INT DEFAULT 0
);

-- Inserting dummy data into the Position table
INSERT INTO Position (PositionDescription, GrossSalary)
VALUES
('Manager', 50000),
('Developer', 40000),
('Designer', 35000),
('HR', 45000),
('Accountant', 38000);


SELECT * FROM  Position

CREATE TABLE Schedule (
    ScheduleID INT PRIMARY KEY IDENTITY(1,1),
    InTime TIME,
    OutTime TIME,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Inserting dummy data into the Schedule table
INSERT INTO Schedule (InTime, OutTime)
VALUES
('08:00:00', '17:00:00'), 
('09:00:00', '18:00:00'), 
('10:00:00', '19:00:00'), 
('07:00:00', '16:00:00'), 
('11:00:00', '20:00:00'); 



CREATE TABLE EmployeeSchedule (
     ID INT PRIMARY KEY IDENTITY(1,1),
     ScheduleID INT FOREIGN KEY REFERENCES Schedule(ScheduleID),
     EmployeeID INT FOREIGN KEY REFERENCES Employees(EmployeeID)
);
 
DROP TABLE EmployeeSchedule

SELECT * FROM   EmployeeSchedule
-- Inserting dummy data into the EmployeeSchedule table
INSERT INTO EmployeeSchedule (ScheduleID, EmployeeID)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5)


CREATE TABLE Photo (
    PhotoID INT PRIMARY KEY IDENTITY(1,1),
    PhotoURL VARCHAR(MAX) DEFAULT 'no url',
    UploadedOn DATETIME DEFAULT GETDATE(),
    EmployeeID INT FOREIGN KEY REFERENCES Employees(EmployeeID)
);

-- Inserting dummy data into the Photo table
INSERT INTO Photo (PhotoURL, EmployeeID)
VALUES
('https://example.com/photo1.jpg', 1),
('https://example.com/photo2.jpg', 2),
('https://example.com/photo3.jpg', 3),
('https://example.com/photo4.jpg', 4),
('https://example.com/photo5.jpg', 5);

SELECT * FROM Photo

DROP TABLE Photo

CREATE TABLE Deductions (
    DeductionID INT PRIMARY KEY IDENTITY(1,1),
    Description VARCHAR(300),
    Amount DECIMAL(10,2),
    EmployeeID INT FOREIGN KEY REFERENCES Employees(EmployeeID),
    CreatedOn DATETIME DEFAULT GETDATE()
);

SELECT * FROM Deductions

DROP TABLE Deductions

-- Inserting dummy data into the Deductions table
INSERT INTO Deductions (Description, Amount, EmployeeID)
VALUES
('Tax', 100.00, 1),
('Insurance', 50.00, 2),
('Retirement', 75.00, 3),
('Healthcare', 60.00, 4),
('401k', 80.00, 5);


SELECT * FROM Deductions

CREATE TABLE CashAdvances (
    CashAdvanceID INT PRIMARY KEY IDENTITY(1,1),
    EmployeeID INT FOREIGN KEY REFERENCES Employees(EmployeeID),
    NumberOfHours INT DEFAULT 0,
    CreatedOn DATETIME DEFAULT GETDATE()
);

SELECT * FROM  CashAdvances

DROP TABLE CashAdvances

-- Inserting dummy data into the CashAdvances table
INSERT INTO CashAdvances (EmployeeID, NumberOfHours)
VALUES
(1, 3), -- John Doe's cash advance
(2, 2), -- Jane Smith's cash advance
(3, 4), -- Alice Johnson's cash advance
(4, 1), -- Bob Brown's cash advance
(5, 5); -- Eve Williams's cash advance

CREATE TABLE Overtime (
    OvertimeID INT PRIMARY KEY IDENTITY(1,1),
    NumberOfHours INT DEFAULT 0,
    RatePerHour DECIMAL(10,2) DEFAULT 0,
    CreatedOn DATETIME DEFAULT GETDATE(),
    EmployeeID INT FOREIGN KEY REFERENCES Employees(EmployeeID)
);

DROP TABLE  Overtime


SELECT * FROM Overtime
-- Inserting dummy data into the Overtime table
INSERT INTO Overtime (NumberOfHours, RatePerHour, EmployeeID)
VALUES
(3, 25.00, 2),
(5, 20.00, 1),
(4, 20.00, 3),
(6, 30.00, 4),
(2, 15.00, 5);
