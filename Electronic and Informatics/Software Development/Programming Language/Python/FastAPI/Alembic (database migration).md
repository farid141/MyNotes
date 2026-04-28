# Penjelasan

Alembic merupakan library database migration

1. alembic init alembic
2. Configure Alembic (alembic/env.py) for use SQLModel

    ```py
    from sqlmodel import SQLModel
    from your_project.database import engine  # Adjust based on your project

    from app.db.models import user, item, transaction  # Import all models!

    def run_migrations_online():
        from alembic import context
        connectable = engine

        with connectable.connect() as connection:
            context.configure(connection=connection, target_metadata=SQLModel.metadata)

            with context.begin_transaction():
                context.run_migrations()
    ```

3. Generate migration automatically `alembic revision --autogenerate -m "some message"`
4. Run migration `alembic upgrade head`
5. (If you use sqlmodel instead sqlalchemy) import sqlmodel in every generated migrations
import sqlmodel  # ✅ Add this line

 Limitations of --autogenerate

- Alembic won't detect changes to default values or computed columns.
- If you delete a column, it may not generate the proper DROP COLUMN unless explicitly specified.
- It does not automatically apply migrations; you must run alembic upgrade head.
