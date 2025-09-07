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
GO

delete dbo.order

CREATE PROCEDURE AddOrderWithTransaction
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
	@isPay BIT,
	@myName NVARCHAR(100),
	@myPhone NVARCHAR(15),
	@address NVARCHAR(255),
	@contactId INT
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

		 -- Thêm orderContact
        INSERT INTO orderContact (name, phone, address, contactId, orderId)
        VALUES (@myName, @myPhone, @address, @contactId, @NewOrderId);

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

CREATE PROCEDURE GetOrdersWithFilter
    @page INT,
    @size INT,
	@sellerId INT, 
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
			AND (@sellerId = -1 OR o.sellerId = @sellerId) 
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
			AND (@sellerId = -1 OR o.sellerId = @sellerId) 
			AND (@isOrder IS NULL OR op.isOrder = @isOrder) 
			AND (@isConfirm IS NULL OR op.isConfirm = @isConfirm) 
			AND (@isSend IS NULL OR op.isSend = @isSend) 
			AND (@isReceive IS NULL OR op.isReceive = @isReceive)
END
GO

SELECT COUNT(*) FROM dbo.[order] WHERE status = 'normal';

EXEC GetOrdersWithFilter 
    @page = 1,
    @size = 10,
    @sellerId = -1,
    @isOrder = NULL,
    @isConfirm = NULL,
    @isSend = NULL,
    @isReceive = NULL;




DELETE FROM dbo.orderPaymentMethod
DELETE FROM dbo.orderProcess
DELETE FROM dbo.[order]



------------------------------for order new-config------------------------
CREATE PROCEDURE WebappSreenProductBuyNow 
	@label NVARCHAR(255),
	@total NVARCHAR(255),
	@note NVARCHAR(255),
	@userId INT,
	@title NVARCHAR(255),
	@image NVARCHAR(255),
	@name NVARCHAR(255),
	@size NVARCHAR(255),
	@amount NVARCHAR(255),
	@discount NVARCHAR(255),
	@fishCodeInProduct NVARCHAR(255),
	@price NVARCHAR(255),
	@productId INT,
	@sellerId INT,
	@paymentMethod NVARCHAR(255),
	@paymentInfo NVARCHAR(MAX),
	@isPay BIT,
	@myName NVARCHAR(100),
	@myPhone NVARCHAR(15),
	@address NVARCHAR(255),
	@contactId INT
AS
BEGIN
	SET NOCOUNT ON;

	 BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newOrderId INT;

		-- Thêm order
        INSERT INTO [order] (label, total, note, status, userId)
        VALUES (@label, @total, @note, 'normal', @userId);

		SET @newOrderId = SCOPE_IDENTITY();

		-- Thêm orderProduct
        INSERT INTO orderProduct (title, image, name, size, amount, discount, fishCodeInProduct, price, status, orderId, productId, sellerId)
        VALUES (@title, @image, @name, @size, @amount, @discount, @fishCodeInProduct, @price, 'normal', @newOrderId, @productId, @sellerId);

		-- Thêm orderProcess
        INSERT INTO orderProcess (isOrder, isConfirm, confirmUser, isSend, sendUser, isReceive, orderId)
        VALUES (1, 0, 0, 0, 0, 0, @newOrderId);

		 -- Thêm orderPaymentMethod
        INSERT INTO orderPaymentMethod (method, infor, isPay, orderId)
        VALUES (@paymentMethod, @paymentInfo, @isPay, @newOrderId);

		 -- Thêm orderContact
        INSERT INTO orderContact (name, phone, address, contactId, orderId)
        VALUES (@myName, @myPhone, @address, @contactId, @newOrderId);

		SELECT * FROM dbo.[order] WHERE id = @NewOrderId;
		COMMIT TRANSACTION;
	 END TRY
	 BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	 END CATCH
END;
GO

CREATE PROCEDURE WebappSreenProductAddProductIntoNewShoppingCart
	@label NVARCHAR(255),
	@total NVARCHAR(255),
	@note NVARCHAR(255),
	@userId INT,
	@title NVARCHAR(255),
	@image NVARCHAR(255),
	@name NVARCHAR(255),
	@size NVARCHAR(255),
	@amount NVARCHAR(255),
	@discount NVARCHAR(255),
	@fishCodeInProduct NVARCHAR(255),
	@price NVARCHAR(255),
	@productId INT,
	@sellerId INT,
	@paymentMethod NVARCHAR(255),
	@paymentInfo NVARCHAR(MAX),
	@isPay BIT,
	@myName NVARCHAR(100),
	@myPhone NVARCHAR(15),
	@address NVARCHAR(255),
	@contactId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newOrderId INT;

		-- Thêm order
        INSERT INTO [order] (label, total, note, status, userId)
        VALUES (@label, @total, @note, 'normal', @userId);

		SET @newOrderId = SCOPE_IDENTITY();

		-- Thêm orderProduct
        INSERT INTO orderProduct (title, image, name, size, amount, discount, fishCodeInProduct, price, status, orderId, productId, sellerId)
        VALUES (@title, @image, @name, @size, @amount, @discount, @fishCodeInProduct, @price, 'normal', @newOrderId, @productId, @sellerId);

		-- Thêm orderProcess
        INSERT INTO orderProcess (isOrder, isConfirm, confirmUser, isSend, sendUser, isReceive, orderId)
        VALUES (0, 0, 0, 0, 0, 0, @newOrderId);

		 -- Thêm orderPaymentMethod
        INSERT INTO orderPaymentMethod (method, infor, isPay, orderId)
        VALUES (@paymentMethod, @paymentInfo, @isPay, @newOrderId);

		 -- Thêm orderContact
        INSERT INTO orderContact (name, phone, address, contactId, orderId)
        VALUES (@myName, @myPhone, @address, @contactId, @newOrderId);

		SELECT * FROM dbo.[order] WHERE id = @NewOrderId;
		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO

CREATE PROCEDURE WebappSreenProducCreateShoppingCart
	@label NVARCHAR(255),
	@total NVARCHAR(255),
	@note NVARCHAR(255),
	@userId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newOrderId INT;

		-- Thêm order
        INSERT INTO [order] (label, total, note, status, userId)
        VALUES (@label, @total, @note, 'normal', @userId);

		SET @newOrderId = SCOPE_IDENTITY();

		-- Thêm orderProcess
        INSERT INTO orderProcess (isOrder, isConfirm, confirmUser, isSend, sendUser, isReceive, orderId)
        VALUES (0, 0, 0, 0, 0, 0, @newOrderId);

		SELECT * FROM dbo.[order] WHERE id = @NewOrderId;
		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO

ALTER PROCEDURE AddPaymentToNewCart
	@paymentMethod NVARCHAR(255),
	@paymentInfo NVARCHAR(MAX),
	@isPay BIT,
	@orderId INT
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO orderPaymentMethod (method, infor, isPay, orderId)
	OUTPUT INSERTED.*
	VALUES (@paymentMethod, @paymentInfo, @isPay, @orderId)
END;
GO

CREATE PROCEDURE AddContactToNewCart
	@myName NVARCHAR(100),
	@myPhone NVARCHAR(15),
	@address NVARCHAR(255),
	@contactId INT,
	@orderId INT
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO orderContact (name, phone, address, contactId, orderId)
	OUTPUT INSERTED.*
	VALUES (@myName, @myPhone, @address, @contactId, @orderId)
END;
GO

CREATE PROCEDURE AddProductToNewCart
	@title NVARCHAR(255),
	@image NVARCHAR(255),
	@name NVARCHAR(255),
	@size NVARCHAR(255),
	@amount NVARCHAR(255),
	@discount NVARCHAR(255),
	@fishCodeInProduct NVARCHAR(255),
	@price NVARCHAR(255),
	@productId INT,
	@sellerId INT,
	@orderId INT
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO orderProduct (title, image, name, size, amount, discount, fishCodeInProduct, price, status, orderId, productId, sellerId)
	OUTPUT INSERTED.*
	VALUES (@title, @image, @name, @size, @amount, @discount, @fishCodeInProduct, @price, 'normal', @orderId, @productId, @sellerId)
END;
GO