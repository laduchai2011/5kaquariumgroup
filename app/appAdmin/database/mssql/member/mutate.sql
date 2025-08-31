CREATE PROCEDURE Signup_member5k
	  @userName NVARCHAR(100),
	  @password NVARCHAR(100),
	  @phone NVARCHAR(15),
	  @firstName NVARCHAR(20),
	  @lastName NVARCHAR(20)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO member5k (userName, password, phone, firstName, lastName, avatar, status, createTime)
	OUTPUT INSERTED.*
	VALUES (@userName, @password, @phone, @firstName, @lastName, NULL, 'normal', SYSDATETIMEOFFSET());
END

DELETE FROM account
GO

EXEC Signup_member5k
    @userName = N'adminladuchai',
    @password = N'passadminladuchai',
    @phone = N'0789860854',
    @firstName = N'la',
    @lastName = N'hai';