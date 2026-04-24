# Python Fundamentals Notebook

## 1. Menjalankan Python pada Sistem
- Mengecek instalasi Python:
  ```bash
  python --version
  ```
- Menjalankan Python dari file:
  ```bash
  python file_name.py
  ```
- Menjalankan Python dari command line:
  ```bash
  python
  >>> print("Hello")
  ```

## 2. Virtual Environment
- Digunakan untuk isolasi lingkungan kerja.
- Cara setup:
  ```bash
  python -m venv .venv
  .venv\Scripts\Activate.ps1  # Aktifkan
  deactivate  # Nonaktifkan
  ```

## 3. Variabel
- Python menggunakan dynamic typing.
- Assignment:
  ```python
  x, y, z = "Orange", "Banana", "Cherry"
  x = y = z = "Apple"
  fruits = ["apple", "banana", "cherry"]
  a, b, c = fruits
  ```
- Scope: LEGB (Local, Enclosing, Global, Built-in)
- Tipe data:
  - str, int, float, complex
  - list, tuple, range
  - dict
  - set, frozenset
  - bool, bytes, bytearray, memoryview, NoneType

## 4. Function
- Basic function:
  ```python
  def greet(name):
      print(f"Hello {name}")
  ```
- Default & keyword args:
  ```python
  def intro(name, role="student"):
      print(f"{name} is a {role}")
  ```
- *args & **kwargs
- Lambda:
  ```python
  square = lambda x: x * x
  ```
- Functional Programming:
  ```python
  map(lambda x: x * x, numbers)
  filter(lambda x: x % 2 == 0, numbers)
  from functools import reduce
  reduce(lambda x, y: x + y, numbers)
  ```

## 5. Control Flow
- If-else:
  ```python
  if x > y:
      print("x > y")
  elif x == y:
      print("x == y")
  else:
      print("x < y")
  ```
- Match-case (Python 3.10+):
  ```python
  match value:
      case 0:
          print("Zero")
  ```
- Looping:
  - `while`, `for`, `for-else`
  - `break`, `continue`
- Exception Handling:
  ```python
  try:
      risky()
  except NameError:
      print("Name error")
  else:
      print("No error")
  finally:
      print("Always executed")
  ```

## 6. Object Oriented Programming (OOP)
- Class, instance, `self`, constructor (__init__)
- Example:
  ```python
  class Dog:
      species = "Canine"
      def __init__(self, name):
          self.name = name
  ```
- Inheritance:
  ```python
  class Student(Person):
      def __init__(self):
          super().__init__()
  ```
- Polymorphism
- Abstraction (with ABC)
  ```python
  from abc import ABC, abstractmethod
  
  class Dog(ABC): # Abstract Class
    def __init__(self, name):
      self.name = name
    
    @abstractmethod
    def sound(self): # Abstract Method
      pass
    
    def display_name(self): # Concrete Method
      print(f"Dog's Name: {self.name}")
    
  class Labrador(Dog): # Partial Abstraction
    def sound(self):
      print("Labrador Woof!")
  ``` 
- Encapsulation (_protected, __private)

## 7. Type Hints
- Basic hinting:
  ```python
  def add(a: int, b: int) -> int:
      return a + b
  ```
- Generics:
  ```python
  def process(items: list[str]):
      pass
  ```
- Union:
  ```python
  def process(item: int | str):
      pass
  ```
- Pydantic:
  ```python
  from pydantic import BaseModel
  class User(BaseModel):
      name: str
  ```

