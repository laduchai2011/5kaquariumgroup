ALTER PROCEDURE GetFishCodes
    @page INT,
    @size INT
AS
BEGIN
    -- Tập kết quả 1: dữ liệu phân trang
    WITH FishCode AS (
        SELECT *,
               ROW_NUMBER() OVER (ORDER BY id DESC) AS rn
        FROM dbo.fishCode
    )
    SELECT *
    FROM FishCode
    WHERE rn BETWEEN ((@page - 1) * @size + 1) AND (@page * @size);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount FROM dbo.fishCode;
END
GO

ALTER PROCEDURE GetFishCodesAccordingtoName
    @page INT,
    @size INT
AS
BEGIN
    -- Tập kết quả 1: dữ liệu phân trang
    WITH FishCode AS (
        SELECT *,
               ROW_NUMBER() OVER (ORDER BY name ASC) AS rn
        FROM dbo.fishCode
    )
    SELECT *
    FROM FishCode
    WHERE rn BETWEEN ((@page - 1) * @size + 1) AND (@page * @size);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount FROM dbo.fishCode;
END
GO

DROP FUNCTION dbo.GetFishCodes;
GO


ALTER FUNCTION GetFishCodeWithId (@id INT) RETURNS TABLE AS RETURN (
    SELECT
        *
    FROM
        dbo.fishCode
    WHERE
        id = @id
);
GO

ALTER PROCEDURE GetAllFishCodesAccordingtoNameForFilter
AS
BEGIN
    WITH FishCode AS (
    SELECT id, name,
           ROW_NUMBER() OVER (ORDER BY name ASC) AS rn
    FROM dbo.fishCode
	)
	SELECT id, name
	FROM FishCode
	ORDER BY name ASC;
END
GO