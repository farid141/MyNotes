# Penjelasan

Merupakan code pada baris pertama yang ditemukan umumnya dalam script yang dijalankan pada OS linux digunakan untuk memberitahu OS `Interpreter mana yang digunakan untuk menjalankan script ini?`

## Kegunaan

Shebang tidaklah wajib, tapi memiliki beberapa ketuntungan ketika dituliskan dalam script

1. Portability: You don’t need to manually specify which interpreter to use each time. You can just run:

    ```bash
    ./myscript.py

    # instead of:
    python3 myscript.py
    ```

2. Clarity: Anyone reading your script knows immediately what language it's written in (e.g., Bash, Python, Perl).

3. Environment control: It ensures the script runs with the intended version of the interpreter.

## ✅ Is the **shebang (`#!`) only in Linux?**

* **Primarily used in Unix-like systems**, including:

  * **Linux**
  * **macOS**
  * **BSD variants**
* **Windows:**

  * Windows **does not natively support** shebang lines the same way.
  * However:

    * If you use tools like **Git Bash**, **WSL (Windows Subsystem for Linux)**, or **Cygwin**, they support shebang lines just like Linux.
    * In **Python on Windows**, the installer sets up file associations (e.g., `.py` runs with Python), so scripts can still work when double-clicked or run with `python script.py`.

---

## 🔣 Does it work in all programming languages?

Not exactly — here’s how it breaks down:

### ✅ Works in interpreted languages

The shebang works with **interpreted languages**, because the system uses the specified interpreter to run the whole script.

Examples:

* **Bash** (`#!/bin/bash`)
* **Python** (`#!/usr/bin/python3`)
* **Perl**, **Ruby**, **Node.js**, etc.

These languages **ignore** the `#!` line or treat it as a comment.

### ❌ Doesn’t apply to compiled languages

Languages like **C**, **C++**, **Rust**, or **Java** are **compiled**, not interpreted. You don’t run `.c` or `.java` files directly — you compile them into binaries (`.exe`, `.class`, etc.).

* Adding a shebang to a `.c` file won’t help — it won’t be used or understood.
* But in some cases, you can write a wrapper script with a shebang that runs a compiled binary or compiler command.

---

## ✅ Languages that treat `#!` as a comment

Many interpreters are designed to **ignore or tolerate the shebang** so that it doesn't interfere with the language syntax.

| Language | `#!` interpreted as...      |
| -------- | --------------------------- |
| Python   | Treated as a comment        |
| Bash     | Special directive           |
| Perl     | Comment after parsing       |
| Ruby     | Treated as a comment        |
| Node.js  | Skipped (in some cases)     |
| PHP      | Treated as a comment in CLI |

---

### 🧪 Fun fact

You can even make your own scripts with a shebang that launches **anything** — for example:

```bash
#!/usr/bin/env cowsay
Hello from a shebang!
```

If `cowsay` is installed, it will print the line below it using ASCII art of a cow.

---

### ✅ Summary

| Question                                            | Answer                                    |
| --------------------------------------------------- | ----------------------------------------- |
| Is shebang only on Linux/macOS?                     | Yes, mostly — not native to Windows.      |
| Does it work in all programming languages?          | No — only useful in **interpreted** ones. |
| What if the language doesn't treat `#!` as comment? | The interpreter may error or ignore it.   |

Want to test a shebang on your system together?
