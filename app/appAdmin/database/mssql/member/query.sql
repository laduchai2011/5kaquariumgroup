CREATE FUNCTION Signin_Member (@userName NVARCHAR(100), @password NVARCHAR(100)) RETURNS TABLE AS RETURN (
    SELECT
        *
    FROM
        dbo.member5k
    WHERE
        userName = @userName
        AND password = @password
);
GO