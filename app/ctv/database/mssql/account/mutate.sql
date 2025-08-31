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
END

EXEC Signup N'laduchai', N'passladuchai', N'0901234567', N'Hải', N'Lã';

DELETE FROM account
GO