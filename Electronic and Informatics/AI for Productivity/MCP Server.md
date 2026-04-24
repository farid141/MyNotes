# MCP Server

Digunakan untuk menghubungkan LLM dengan primitive yang didefinisikan (tools, resource, tools)

## Hubungkan MCP Server dengan LLM cli

Kita bisa hubungkan MCP server yang berjalan dengan command `uv run install mcp server.py`

atau secara manual tambahkan ke claude code

`claude-cli/settings/developer/claude_desktop_configuration.json`

```json
{
  "mcpServers": {
    "weather": {
      "command": "uv",
      "args": ["run", "python", "server.py"]
    }
  }
}
```

## Mengoperasikan MCP

Berikan pertanyaan ke AI CLI `can you do ... using mcp tool`

## MCP Primitives

- prompts
- resources
- tools

primitive berbentuk fungsi diwrap decorator didalamnya terdapat comment berupa deskripsi agar bisa dipahami llm.

### Tools

jadi yang dimaksud menghubungkan tools, itu sebenarnya kita mendefinisikan pemanggilan ke fungsi (biasanya api aplikasi lain yang berjalan), didalam mcp server kita. Jadi mcp server harus bisa akses api tsb.

```py
import requests
from fastmcp import FastMCP

# Inisialisasi Server
mcp = FastMCP("Super Assistant Tools")

# melakukan aksi tertentu bisa mengembalikan nilai atau tidak
@mcp.tool(
  name="get_weather",
  description="Ambil data cuaca dari API lokal berdasarkan nama kota."
)
def get_weather_tool(city: str):
  """
  Mendapatkan waktu saat ini.
  
  Args:
      timezone: Timezone yang diinginkan (default: Asia/Jakarta)
  
  Returns:
      String waktu dalam format yang mudah dibaca
  """
  response = requests.get(f"http://localhost:5000/weather?city={city}")
  return response.json()

# Mengembalikan prompt yang akan digunakan mcp client
@mcp.prompt()
def generate_sql_prompt(table_name: str) -> str:
    """Template untuk generate query SQL."""
    return f"""Anda adalah ahli SQL. Buatkan query untuk tabel '{table_name}'.
Ikuti best practices:
- Gunakan prepared statements
- Hindari SELECT *
- Tambahkan index yang sesuai"""

# ========== RESOURCE: System Info ==========
@mcp.resource("system://info")
def get_system_info() -> str:
    """Informasi tentang sistem operasi saat ini."""
    import platform
    info = {
        "os": platform.system(),
        "os_version": platform.version(),
        "python_version": platform.python_version(),
        "machine": platform.machine()
    }
    return json.dumps(info, indent=2)

```
