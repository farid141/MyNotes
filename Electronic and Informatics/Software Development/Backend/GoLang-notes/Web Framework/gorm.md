# Gorm

Merupakan package untuk ORM, sehingga komunikasi ke DB melalui method, bukan raw SQL

## Koneksi Database

Gunakan driver database `github.com/go-sql-driver/mysql`

```go
import (
  "gorm.io/driver/mysql"
  "gorm.io/gorm"
)

func main() {
  // refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
  dsn := "user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
  db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
    // tambahkan konfigurasi
    Logger: logger.Default.LogMode(logger.info) // log setiap interaksi db
  })
}
```

## Model

Merupakan `struct` yang digunakan merepresentasikan kolom tabel.

### Column

Kita dapat mengatur property pada field struct model yang mengatur bagaimana cara pandang ke tabel terkait
<https://gorm.io/docs/models.html#Fields-Tags>

```go
type User struct {
    Id int `gorm:"primarykey;column:id;autoincrement"`
    UpdatedAt time.Time `gorm:";column:updated_at;autoUpdateTime"`
}
```

### Table Name

Secara default, GORM menggap nama tabel adalah konversi nama struct ke snake case dan jamak (kata terakhir)

Atau kita bisa definisikan nama tabel secara manual

```go
func (u *User) TableName() string{
    return "users"
}
```

### Convention

Konvensi kolom dan tabel

- `Primary Key`: GORM uses a field named ID as the default primary key for each model.
- `Table Names`: By default, GORM converts struct names to `snake_case` and `pluralizes` them for table names. For instance, a User struct becomes users in the database, and a GormUserName becomes gorm_user_names.
- `Column Names`: GORM automatically converts struct field names to `snake_case` for column names in the database.
- Timestamp Fields: GORM uses fields named CreatedAt and UpdatedAt to `automatically` track the creation and update times of records.

## CRUD

### Create

```go
user := User{
    Name: "Farid",
    Password: "sad"
}
db.Create(&user)

// batch
var users []User

for i:=0; i<10; i++{
    users = append(users, User{
        Name: "Farid"+i,
        Password: "sad"
    })
}
db.Create(&users)
```

## Hook

Merupakan method yang dipanggil ketika sebuah aksi ke model dijalankan, buat member function dari model.

`func (u User) BeforeCreate(db *gorm.DB) error`
