ALTER PROCEDURE GetOrders
    @page INT,
    @size INT
AS
BEGIN
    -- Tập kết quả 1: dữ liệu phân trang
    WITH MyOrder AS (
        SELECT *,
               ROW_NUMBER() OVER (ORDER BY id DESC) AS rn
        FROM dbo.order
    )
    SELECT *
    FROM MyOrder
    WHERE rn BETWEEN ((@page - 1) * @size + 1) AND (@page * @size);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount FROM dbo.order;
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