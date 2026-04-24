# Repository Pattern

Pattern dalam menulis code, dimana memisahkan antara business logic dan technical logic

## Database Connection

### database.go

Dipanggil untuk mendapatkan obj DB

```go
package belajar_golang_database

import (
 "database/sql"
 "time"
)

func GetConnection() *sql.DB {
 db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/belajar_golang_database?parseTime=true")
 if err != nil {
  panic(err)
 }

 db.SetMaxIdleConns(10)
 db.SetMaxOpenConns(100)
 db.SetConnMaxIdleTime(5 * time.Minute)
 db.SetConnMaxLifetime(60 * time.Minute)

 return db
}
```

## Controller/Handler

### repository/comment_repository_impl_test.go

- Memanggil repository dengan memberikan DB
- Gunakan fungsi dalam repo (insert, update, etc)

```go
package repository

import (
 belajar_golang_database "belajar-golang-database"
 "belajar-golang-database/entity"
 "context"
 "fmt"
 _ "github.com/go-sql-driver/mysql"
 "testing"
)

func TestCommentInsert(t *testing.T) {
 commentRepository := NewCommentRepository(belajar_golang_database.GetConnection())

 ctx := context.Background()
 comment := entity.Comment{
  Email:   "repository@test.com",
  Comment: "Test Repository",
 }

 result, err := commentRepository.Insert(ctx, comment)
 if err != nil {
  panic(err)
 }

 fmt.Println(result)
}

func TestFindById(t *testing.T) {
 commentRepository := NewCommentRepository(belajar_golang_database.GetConnection())

 comment, err := commentRepository.FindById(context.Background(), 37)
 if err != nil {
  panic(err)
 }

 fmt.Println(comment)
}

func TestFindAll(t *testing.T) {
 commentRepository := NewCommentRepository(belajar_golang_database.GetConnection())

 comments, err := commentRepository.FindAll(context.Background())
 if err != nil {
  panic(err)
 }

 for _, comment := range comments {
  fmt.Println(comment)
 }
}
```

## Repository Interface

Digunakan untuk kontrak untuk mendesain repository

```go
package repository

import (
 "belajar-golang-database/entity"
 "context"
)

type CommentRepository interface {
 Insert(ctx context.Context, comment entity.Comment) (entity.Comment, error)
 FindById(ctx context.Context, id int32) (entity.Comment, error)
 FindAll(ctx context.Context) ([]entity.Comment, error)
}
```

## Entity/Model

```go
package entity

type Comment struct {
 Id      int32
 Email   string
 Comment string
}
```

## Repository

```go
package repository

import (
 "belajar-golang-database/entity"
 "context"
 "database/sql"
 "errors"
 "strconv"
)

type commentRepositoryImpl struct {
 DB *sql.DB
}

func NewCommentRepository(db *sql.DB) CommentRepository {
 return &commentRepositoryImpl{DB: db}
}

func (repository *commentRepositoryImpl) Insert(ctx context.Context, comment entity.Comment) (entity.Comment, error) {
 script := "INSERT INTO comments(email, comment) VALUES (?, ?)"
 result, err := repository.DB.ExecContext(ctx, script, comment.Email, comment.Comment)
 if err != nil {
  return comment, err
 }
 id, err := result.LastInsertId()
 if err != nil {
  return comment, err
 }
 comment.Id = int32(id)
 return comment, nil
}

func (repository *commentRepositoryImpl) FindById(ctx context.Context, id int32) (entity.Comment, error) {
 script := "SELECT id, email, comment FROM comments WHERE id = ? LIMIT 1"
 rows, err := repository.DB.QueryContext(ctx, script, id)
 comment := entity.Comment{}
 if err != nil {
  return comment, err
 }
 defer rows.Close()
 if rows.Next() {
  // ada
  rows.Scan(&comment.Id, &comment.Email, &comment.Comment)
  return comment, nil
 } else {
  // tidak ada
  return comment, errors.New("Id " + strconv.Itoa(int(id)) + " Not Found")
 }
}

func (repository *commentRepositoryImpl) FindAll(ctx context.Context) ([]entity.Comment, error) {
 script := "SELECT id, email, comment FROM comments"
 rows, err := repository.DB.QueryContext(ctx, script)
 if err != nil {
  return nil, err
 }
 defer rows.Close()
 var comments []entity.Comment
 for rows.Next() {
  comment := entity.Comment{}
  rows.Scan(&comment.Id, &comment.Email, &comment.Comment)
  comments = append(comments, comment)
 }
 return comments, nil
}
```
