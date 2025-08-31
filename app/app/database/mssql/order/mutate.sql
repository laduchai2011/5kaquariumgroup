CREATE PROCEDURE AddOrder
	  @title NVARCHAR(255),
	  @image NVARCHAR(255),
	  @name NVARCHAR(255),
	  @size NVARCHAR(255),
	  @amount NVARCHAR(255),
	  @discount NVARCHAR(255),
	  @fishCodeInProduct NVARCHAR(255),
	  @price NVARCHAR(255),
	  @userId INT,
	  @productId INT,
	  @sellerId INT
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO [order] (title, image, name, size, amount, discount, fishCodeInProduct, price, status, userId, productId, sellerId)
	OUTPUT INSERTED.*
	VALUES (@title, @image, @name, @size, @amount, @discount, @fishCodeInProduct, @price, 'normal', @userId, @productId, @sellerId);
END;

delete dbo.order

ALTER PROCEDURE AddOrderWithTransaction
    @title NVARCHAR(255),
	@image NVARCHAR(255),
	@name NVARCHAR(255),
	@size NVARCHAR(255),
	@amount NVARCHAR(255),
	@discount NVARCHAR(255),
	@fishCodeInProduct NVARCHAR(255),
	@price NVARCHAR(255),
	@userId INT,
	@productId INT,
	@sellerId INT,
	@paymentMethod NVARCHAR(255),
	@paymentInfo NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @NewOrderId INT;

        -- Thêm order
        INSERT INTO [order] (title, image, name, size, amount, discount, fishCodeInProduct, price, status, userId, productId, sellerId)
        VALUES (@title, @image, @name, @size, @amount, @discount, @fishCodeInProduct, @price, 'normal', @userId, @productId, @sellerId);

        SET @NewOrderId = SCOPE_IDENTITY();

        -- Thêm orderProcess
        INSERT INTO orderProcess (isOrder, isConfirm, confirmUser, isSend, sendUser, isReceive, isPay, orderId)
        VALUES (1, 0, 0, 0, 0, 0, 0, @NewOrderId);

        -- Thêm orderPaymentMethod
        INSERT INTO orderPaymentMethod (method, infor, orderId)
        VALUES (@paymentMethod, @paymentInfo, @NewOrderId);

		SELECT * FROM dbo.[order] WHERE id = @NewOrderId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;

        THROW;
    END CATCH
END;
GO

ALTER PROCEDURE ChangeOrderProcessIsOrder
	  @orderId INT,
	  @isOrder BIT
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE dbo.orderProcess
	SET isOrder = @isOrder
	OUTPUT INSERTED.*
	WHERE orderId = @orderId
END;
GO
