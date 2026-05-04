# SQLModel

Membuat table dari model

```py
class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: int | None = None # NULLABLE COLUMN

Field(default=None)
```

## DATABASE URL FORMAT

<https://docs.sqlalchemy.org/en/14/core/engines.html>
`dialect+driver://username:password@host:port/database`

# untuk aplikasi prototype, kita bisa membuat database dibuat ketika startup dengan memanggil

SQLModel.metadata.create_all(engine)

# mencegah tereksekusinya sebuah statement dalam file ketika file diimport

if __name__ == "__main__":
    create_db_and_tables()

hanya akan dipanggil ketika script dieksekusi, BUKAN diimport

## Untuk sebuah code yang memakan banyak resource, sebaiknya dalam with block

```py
with Session(engine) as session:
    session.add(hero_1)
    session.add(hero_2)
    session.add(hero_3)

    session.commit()
```
