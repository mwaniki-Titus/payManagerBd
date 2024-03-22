CREATE DATABASE PayManager;
USE PayManager;

Drop database PayManager


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

SELECT * FROM  Employees 


CREATE TABLE Position (
    PositionID INT PRIMARY KEY IDENTITY(1,1),
    PositionDescription VARCHAR(MAX) DEFAULT 'no position',
    GrossSalary INT DEFAULT 0
);

-- Inserting dummy data into the Position table
INSERT INTO Position (PositionDescription, GrossSalary)
VALUES
('Manager', 50000),
('Developer', 40000)



DROP TABLE Position 
SELECT * FROM  Position

CREATE TABLE Attendance (
    AttendanceID INT PRIMARY KEY IDENTITY(1,1),
    EmployeeID INT,
    Date DATE,
    ScheduleID INT,
    TimeIn VARCHAR(255),
    TimeOut VARCHAR(255),
    Hours VARCHAR(255),
    CONSTRAINT FK_Employee_Attendance FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);


DROP TABLE Attendance

INSERT INTO Attendance (EmployeeID, Date, ScheduleID, TimeIn, TimeOut, Hours) VALUES
(1, '2024-03-20', 1, '09:00 AM', '05:00 PM', '8 hours'),
(2, '2024-03-20', 1, '09:30 AM', '06:00 PM', '8.5 hours')




CREATE TABLE Schedule (
    ScheduleID INT PRIMARY KEY IDENTITY(1,1),
    InTime TIME,
    OutTime TIME,
    ScheduleName VARCHAR(50)
);

DROP TABLE Schedule


-- Inserting dummy data into the Schedule table
INSERT INTO Schedule (InTime, OutTime, ScheduleName) VALUES
    
    ('09:00 AM', '01:00 PM', 'Late Shift'),
    ('01:00 AM', '04:00 PM', 'Early Shift');

SELECT * FROM Schedule;


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
('Nssf', 80.00, 5);

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
(1, 3),
(2, 2),
(3, 4),
(4, 1),
(5, 5);

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




 SELECT Position.*, Employees.*
        FROM Position
        INNER JOIN Employees ON Employees.PositionID = Position.PositionID;
        WHERE 


   SELECT Employees.*, Position.*
                FROM Employees
                
                JOIN Position ON Position.PositionID = Employees.PositionID;

  SELECT Employees.*,schedule.*, Position.*
                FROM Employees
                JOIN Schedule on Schedule.ScheduleID = Schedule.ScheduleID 
                JOIN Position ON Position.PositionID = Employees.PositionID

   SELECT Attendance.*, Employees.*
                FROM Attendance
                JOIN Employees ON Employees.EmployeeID = Attendance.EmployeeID
                WHERE AttendanceID = @AttendanceID
                
   SELECT Schedule.*, Employees.*
                FROM Schedule
                INNER JOIN Employees ON Employees.ScheduleID = Schedule.ScheduleID
                WHERE ScheduleID = @ScheduleID


                