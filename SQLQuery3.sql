-- ogrenci otomatik ilk �ifre olu�turma trigr� start

Alter TRIGGER trg_InsertAnaTablo
ON Ogrenciler
AFTER INSERT
AS
BEGIN
    INSERT INTO users (password, username, rol,id)
    SELECT 
        LOWER(LEFT(ISNULL(i.BabaAdSoyad,''), 2)) +
        LOWER(LEFT(ISNULL(i.AnneAdSoyad,''), 2)) +
        SUBSTRING(ISNULL(i.TCKimlikNo,''), 5, 4),  -- password
        i.OgrenciNumara,                             -- username
        '3',                                       -- rol
		i.OgrenciId
    FROM inserted i;
END;
-- ogrenci otomatik ilk �ifre olu�turma trigr� stop



-- Ogretmen otomatik ilk �ifre olu�turma trigr� start
ALTER TRIGGER trg_InsertAnaTabloOGRETMEN
ON Ogretmenler
AFTER INSERT
AS
BEGIN
    INSERT INTO users (password, username, rol,id)
    SELECT 
    
        SUBSTRING(ISNULL(i.TCKimlikNo,''), 5, 4),
        i.Eposta,
        '2',
		i.OgretmenID
    FROM inserted i;
END;
GO


-- Ogretmen otomatik ilk �ifre olu�turma trigr� stop












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
