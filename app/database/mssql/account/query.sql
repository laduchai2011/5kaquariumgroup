CREATE FUNCTION Login (@userName NVARCHAR(100), @password NVARCHAR(100)) RETURNS TABLE AS RETURN (
    SELECT
        *
    FROM
        dbo.account
    WHERE
        userName = @userName
        AND password = @password
);
GO

CREATE FUNCTION Signin (@userName NVARCHAR(100), @password NVARCHAR(100)) RETURNS TABLE AS RETURN (
    SELECT
        *
    FROM
        dbo.account
    WHERE
        userName = @userName
        AND password = @password
);
GO

    -- how to use:
SELECT
    *
FROM
    Login('laduchai', '123');


ALTER FUNCTION GetAccount (@userId INT) RETURNS TABLE AS RETURN (
    SELECT
        *
    FROM
        dbo.account
    WHERE
		status = 'normal' 
        id = @userId     
);
GO

ALTER FUNCTION GetAccountWithId (@userId INT) RETURNS TABLE AS RETURN (
    SELECT
        *
    FROM
        dbo.account
    WHERE
		status = 'normal' 
        AND id = @userId     
);
GO

SELECT * 
FROM sys.objects 
WHERE name = 'GetAccountWithId' AND type = 'IF';

CREATE FUNCTION GetStatistic (@userId INT) RETURNS TABLE AS RETURN (
    SELECT
        *
    FROM
        dbo.statistic
    WHERE
        userId = @userId     
);
GO

CREATE FUNCTION GetContacts (@userId INT) RETURNS TABLE AS RETURN (
    SELECT
        *
    FROM
        dbo.contact
    WHERE
        userId = @userId     
);
GO

CREATE FUNCTION GetRoleWithFK (@userId INT)
RETURNS TABLE
AS
RETURN
(
     SELECT
        *
    FROM
        dbo.role
    WHERE
        userId = @userId     
);
GO