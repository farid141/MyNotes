# Buat response model

from pydantic import BaseModel
from typing import Generic, TypeVar

## Generic type untuk data response

Berguna jika kita ingin menyeragamkan struktur response

```py
DataT = TypeVar("DataT")

class BaseResponse(BaseModel, Generic[DataT]):
    message: str
    status: str
    data: DataT
```

## Implementasikan response model

```py
from fastapi import APIRouter, Depends, HTTPException
from app.schemas.base_response import BaseResponse
from app.schemas.user import UserRead
from app.services.user_service import UserService

router = APIRouter()

def get_user_service():
    return UserService()

@router.get("/users/{user_id}", response_model=BaseResponse[UserRead])
async def get_user(
    user_id: int,
    user_service: UserService = Depends(get_user_service)
):
    try:
        user = user_service.get_user_by_id(user_id)
        if not user:
            raise ValueError("User not found")

        # Wrap response dengan BaseResponse
        return BaseResponse[UserRead](
            message="User retrieved successfully",
            status="success",
            data=user
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
```
