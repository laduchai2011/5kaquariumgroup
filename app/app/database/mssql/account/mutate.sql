CREATE PROCEDURE Signup
	  @userName NVARCHAR(100),
	  @password NVARCHAR(100),
	  @phone NVARCHAR(15),
	  @firstName NVARCHAR(20),
	  @lastName NVARCHAR(20)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO account (userName, password, phone, firstName, lastName, avatar, status, createTime)
	OUTPUT INSERTED.*
	VALUES (@userName, @password, @phone, @firstName, @lastName, NULL, 'normal', SYSDATETIMEOFFSET());
END;

DELETE FROM account
GO

CREATE PROCEDURE ChangeName
	  @userId INT,
	  @firstName NVARCHAR(100),
	  @lastName NVARCHAR(100)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE account
	SET firstName = @firstName, lastName = @lastName
	WHERE id = @userId;

	SELECT * FROM account WHERE id = @userId;
END;

ALTER PROCEDURE ChangeAvatar
	  @userId INT,
	  @avatar NVARCHAR(255)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE account
	SET avatar = @avatar
	WHERE id = @userId;

	SELECT * FROM account WHERE id = @userId;
END;

ALTER PROCEDURE AddContact
	  @name NVARCHAR(100),
	  @phone NVARCHAR(15),
	  @address NVARCHAR(100),
	  @userId INT
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO contact (name, phone, address, status, userId)
	OUTPUT INSERTED.*
	VALUES (@name, @phone, @address, 'normal', @userId);
END;


CREATE PROCEDURE CreateStatistic
	  @userId INT
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO statistic (myRank, allOrder, allMoney, preMonthOrder, thisMonthOrder, preMonthMoney, thisMonthMoney, status, userId)
	OUTPUT INSERTED.*
	VALUES (0, 0, 0, 0, 0, 0, 0, 'normal', @userId);
END;

CREATE PROCEDURE AddAdmin
	  @userId INT
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO role (role, status, userId)
	OUTPUT INSERTED.*
	VALUES ('admin', 'normal', @userId);
END;

EXEC AddAdmin
    @userId = 1