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

Merupakan `struct` yang digunakan merepresentasikan kolom tabel. Perilaku setiap field dapat ditentukan oleh `FieldTags` yang ditulis setelah `gorm:`

<https://gorm.io/docs/models.html#Fields-Tags>

### Convention

Konvensi kolom dan tabel

- `Primary Key`: GORM uses a field named ID as the default primary key for each model.
- `Table Names`: By default, GORM converts struct names to `snake_case` and `pluralizes` them for table names. For instance, a User struct becomes users in the database, and a GormUserName becomes gorm_user_names.
- `Column Names`: GORM automatically converts struct field names to `snake_case` for column names in the database.
- `Timestamp Fields`: GORM uses fields named CreatedAt and UpdatedAt to `automatically` track the creation and update times of records.

Jadi jika ada field `Id`, `CreatedAt` dan `UpdatedAt` pada model struct, akan berlaku behavior tersebut tanpa kita atur FieldTags nya

### Column

Kita bisa meng-override kolom dari konvensi dengan menambahkan FieldTags `column:<column_name>`.

```go
type User struct {
    Id int `gorm:"primarykey;column:id;autoincrement"`
    UpdatedAt time.Time `gorm:";column:updated_at;autoUpdateTime"`
}
```

### Table Name

Kita bisa meng-override nama tabel konvensi melalui method `TableName`.

```go
func (u *User) TableName() string{
    return "users"
}
```

### Field Permission

Mengatur perilaku field:

- `<-:create` create only, `<-:update` update only, `<-` create and update
- `->:false` no read permission
- `-` ignore

Secara default field pada struct akan menjadi kolom, kecuali yang menggunakan `-` field permission.

### Embedded Struct

Menambahkan field dari struct lain, tambahkan field `embedded`

```go
type User struct {
ID

Password
Name

CreatedAt
UpdatedAt
Information 
string

string
string
Name
time. Time `gorm:"column: created_at; autoCreateTime :<-: create"'
time. Time 'gorm:"column: updated_at; autoCreateTime; autoUpdateTime"
gorm:"-"*

gorm:"primary_key;column:id ;<-: create'"'
`gorm:"column: password"'
`gorm:"embedded"'

func (u *User) TableName() string {
    return "users"
}
```

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

## Raw SQL

```go
err := db.Raw(stmt, opt1, opt2).Scan(&var).Error // SELECT
err := db.Exec(stmt, opt1, opt2).Error // INSERT/UPDATE/DELETE
```

Pola dari kedua jenis query tersebut sama, kita bisa menggunakan karakter `?` yang nantinya akan direplace oleh `opt`.

Pada `Raw`, kita memanggil `Scan` yang berisi pointer untuk menyimpan hasil query, gunakan slices untuk query dengan hasil data lebih dari 1. Sebenarnya Gorm juga kompatibel `Row` dan `Rows` seperti package `db`

Pada `Exec` 
