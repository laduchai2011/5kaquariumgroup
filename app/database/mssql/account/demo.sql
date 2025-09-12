EXEC Signup
    @userName = N'adminlahai',
    @password = N'adminlahai',
    @phone = N'0789860854',
    @firstName = N'Lã',
    @lastName = N'Hải';



ALTER LOGIN sa ENABLE;
ALTER LOGIN sa WITH PASSWORD = '201195laducHai'


EXEC Signup
    @userName = N'admintranduong',
    @password = N'admintranduong',
    @phone = N'0377656907',
    @firstName = N'Trần',
    @lastName = N'Dương';


EXEC Signup
    @userName = N'adminleduc',
    @password = N'adminleduc',
    @phone = N'0822211111',
    @firstName = N'Lê',
    @lastName = N'Đức';

DELETE FROM dbo.account
WHERE id = 5;


EXEC Signup
    @userName = N'laduchai1',
    @password = N'laduchai1',
    @phone = N'07898608541',
    @firstName = N'Lã',
    @lastName = N'Hải';