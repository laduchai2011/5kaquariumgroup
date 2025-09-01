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
	@paymentInfo NVARCHAR(MAX),
	@isPay BIT
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
        INSERT INTO orderProcess (isOrder, isConfirm, confirmUser, isSend, sendUser, isReceive, orderId)
        VALUES (1, 0, 0, 0, 0, 0, @NewOrderId);

        -- Thêm orderPaymentMethod
        INSERT INTO orderPaymentMethod (method, infor, isPay, orderId)
        VALUES (@paymentMethod, @paymentInfo, @isPay, @NewOrderId);

		SELECT * FROM dbo.[order] WHERE id = @NewOrderId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;

        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE ChangeOrderProcessIsOrder
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



ALTER PROCEDURE GetOrdersWithFilter
    @page INT,
    @size INT,
	@isOrder BIT,
	@isConfirm BIT,
	@isSend BIT,
	@isReceive BIT
AS
BEGIN
    -- Tập kết quả 1: dữ liệu phân trang
    WITH adminOrder AS (
        SELECT o.*,
			ROW_NUMBER() OVER (ORDER BY o.id DESC) AS rn
        FROM dbo.[order] AS o
		INNER JOIN	
			dbo.orderProcess AS op ON o.id = op.orderId
		WHERE status = 'normal' 
			AND (@isOrder IS NULL OR op.isOrder = @isOrder) 
			AND (@isConfirm IS NULL OR op.isConfirm = @isConfirm) 
			AND (@isSend IS NULL OR op.isSend = @isSend) 
			AND (@isReceive IS NULL OR op.isReceive = @isReceive)
    )
    SELECT *
    FROM adminOrder
    WHERE rn BETWEEN ((@page - 1) * @size + 1) AND (@page * @size);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount
	FROM dbo.[order] AS o
		INNER JOIN	
			dbo.orderProcess AS op ON o.id = op.orderId
		WHERE status = 'normal' 
			AND (@isOrder IS NULL OR op.isOrder = @isOrder) 
			AND (@isConfirm IS NULL OR op.isConfirm = @isConfirm) 
			AND (@isSend IS NULL OR op.isSend = @isSend) 
			AND (@isReceive IS NULL OR op.isReceive = @isReceive)
END
GO
