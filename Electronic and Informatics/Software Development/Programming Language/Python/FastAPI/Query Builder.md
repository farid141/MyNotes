
# where

```python
statement = select(Hero).where(Hero.name == "Deadpond")
results = session.exec(statement)
```

<, >, ==, >=, <=, and != are all operators used for "where" comparisons.

# where or

```python
statement = select(Hero).where(or_(Hero.age <= 35, Hero.age > 90))
```

# select()

membuat object Select, terdapat beberapa member yang bisa digunakan
<https://docs.sqlalchemy.org/en/20/core/selectable.html#sqlalchemy.sql.expression.Select>

```python
statement = select(Hero).offset(3).limit(3)
```

# JOIN

```python
statement = select(Hero, Team).join(Team)
```

akan menghasilkan tupple

# LEFT OUTER JOIN

```python
statement = select(Hero, Team).join(Team, isouter=True)
```
