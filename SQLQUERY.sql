use [4875-BlogDB]

IF EXISTS (SELECT 1 FROM sys.tables where OBJECT_ID = OBJECT_ID(N'[dbo].[TimeTable]'))
	DROP TABLE TimeTable
CREATE TABLE TimeTable (
	date DATE PRIMARY KEY,
);

IF EXISTS (SELECT 1 FROM sys.tables where OBJECT_ID = OBJECT_ID(N'[dbo].[TaskTable]'))
	DROP TABLE TaskTable
CREATE TABLE TaskTable (
	taskID INT IDENTITY(1,1) PRIMARY KEY,
	date DATE,
	title VARCHAR(20),
	detail VARCHAR(200),
	status BIT,
	time int,
	FOREIGN KEY (date) REFERENCES TimeTable(date),
);

IF EXISTS (SELECT 1 FROM sys.procedures WHERE OBJECT_ID = OBJECT_ID(N'[dbo].AddTask'))
	DROP PROCEDURE AddTask
GO
CREATE PROCEDURE AddTask
	@date Date,
	@title VARCHAR(20),
	@detail VARCHAR(200),
	@status BIT,
	@time int
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM TimeTable WHERE date = @date)
		BEGIN
			INSERT INTO TimeTable(date)
			VALUES(@date)
			INSERT INTO TaskTable(date, title, detail, status, time)
			VALUES (@date, @title, @detail, @status, @time)
		END
	ELSE
		BEGIN
			INSERT INTO TaskTable(date, title, detail, status, time)
			VALUES (@date, @title, @detail, @status, @time)
		END
END

IF EXISTS (SELECT 1 FROM sys.procedures WHERE OBJECT_ID = OBJECT_ID(N'[dbo].AllTasks'))
	DROP PROCEDURE AllTasks
GO
CREATE PROCEDURE AllTasks
AS
BEGIN
	SELECT t.taskID, t.date,t.title, t.detail, t.status, t.time  FROM TaskTable t 
	LEFT JOIN TimeTable s ON t.date = s.date;
END


execute AddTask '2023-08-17', 'task1', 'title1', false, 23
execute AddTask '2023-08-17', 'task1a', 'title1a', false, 23
execute AddTask '2023-08-18', 'task2', 'title2', false, 23
execute AddTask '2023-08-19', 'task3', 'title3', false, 23
execute AllTasks

select * from TimeTable


IF EXISTS (SELECT 1 FROM sys.procedures WHERE OBJECT_ID = OBJECT_ID(N'[dbo].UpdateStatus'))
	DROP PROCEDURE UpdateStatus
GO
CREATE PROCEDURE UpdateStatus
	@date Date,
	@taskID INT,
	@status BIT
AS
BEGIN
	UPDATE TaskTable
	SET status = @status
	WHERE date = @date AND taskID = @taskID
END

EXECUTE UpdateStatus '2023-08-17', 1, true

select * from TaskTable

