CREATE PROCEDURE GetOrders
    @page INT,
    @size INT
AS
BEGIN
    -- Tập kết quả 1: dữ liệu phân trang
    WITH MyOrder AS (
        SELECT *,
               ROW_NUMBER() OVER (ORDER BY id DESC) AS rn
        FROM dbo.[order]
    )
    SELECT *
    FROM MyOrder
    WHERE rn BETWEEN ((@page - 1) * @size + 1) AND (@page * @size);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount FROM dbo.[order];
END
GO

CREATE PROCEDURE GetOrdersWithFKUserId
    @page INT,
    @size INT,
	@userId INT
AS
BEGIN
    -- Tập kết quả 1: dữ liệu phân trang
    WITH MyOrder AS (
        SELECT *,
               ROW_NUMBER() OVER (ORDER BY id DESC) AS rn
        FROM dbo.[order]
		WHERE userId = @userId
    )
    SELECT *
    FROM MyOrder
    WHERE rn BETWEEN ((@page - 1) * @size + 1) AND (@page * @size);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount FROM dbo.[order];
END
GO


------------------------------for order new-config------------------------
ALTER PROCEDURE WebappSreenProductGetShoppingCart
    @page INT,
    @size INT,
	@userId INT
AS
BEGIN
       -- Tập kết quả 1: dữ liệu phân trang
    WITH myOrder AS (
        SELECT o.*,
			ROW_NUMBER() OVER (ORDER BY o.id DESC) AS rn
        FROM dbo.[order] AS o
		INNER JOIN	
			dbo.orderProcess AS op ON o.id = op.orderId
		WHERE 
			status = 'normal' 
			AND op.isOrder = 0
			AND op.isConfirm = 0
			AND op.isSend = 0
			AND op.isReceive = 0
    )
    SELECT *
    FROM myOrder
    WHERE rn BETWEEN ((@page - 1) * @size + 1) AND (@page * @size);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount
	FROM dbo.[order] AS o
		INNER JOIN	
			dbo.orderProcess AS op ON o.id = op.orderId
		WHERE  
			status = 'normal' 
			AND op.isOrder =0
			AND op.isConfirm = 0
			AND op.isSend = 0
			AND op.isReceive = 0
END
GO