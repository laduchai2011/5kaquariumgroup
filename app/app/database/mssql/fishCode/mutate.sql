ALTER PROCEDURE AddFishCode
	  @name NVARCHAR(255),
	  @size NVARCHAR(255),
	  @amount NVARCHAR(255),
	  @price NVARCHAR(255),
	  @detail NVARCHAR(MAX),
	  @userId INT
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO fishCode (name, size, amount, price, detail, status, userId)
	OUTPUT INSERTED.*
	VALUES (@name, @size, @amount, @price, @detail, 'normal', @userId);
END;

delete dbo.fishCode