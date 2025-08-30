CREATE PROCEDURE CheckUser
    @Username NVARCHAR(50),
    @Password NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Kullan�c� bilgilerini kontrol et
    IF EXISTS (
        SELECT 1
        FROM users
        WHERE username = @Username
          AND password = @Password
    )
    BEGIN
        -- E�er do�ruysa rol ve id bilgisini d�nd�r
        SELECT id, rol
        FROM users
        WHERE username = @Username
          AND password = @Password;
    END
    ELSE
    BEGIN
        -- Hata mesaj� d�nd�r
        RAISERROR('Kullan�c� ad� veya �ifre hatal�.', 16, 1);
    END
END;


EXEC CheckUser @Username = '2636', @Password = 'ale3292';
