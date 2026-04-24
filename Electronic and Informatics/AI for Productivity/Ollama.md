# Ollama

Merupakan LLM local yang dengan mudah didownload dan dieksekusi melalui GUI atau terminal, membutuhkan model untuk berjalan

## Model

Navigasi ke menu model dalam ollama, akan terdapat list model yang dapat didownload dan dijalankan dari ollama

## Perintah Umum

```bash
ollama serve
ollama run <model_name>
```

## Setup Env

### Cursor

python, jupyter anysphere/ms-tools
run the jupyter notebook, with select kernel (choose venv
)

### UV

```bash
uv --version
uv self update
uv sync
```

### Models

OpenAI API 5$ (Pay As You go, only charge if credits/balance available), alternativ ollama, gemini.
closed source: Bard(google), [opus, haiku, sonet (anthropic)], grok
open source: llama (meta), mixtral, qwen(alibaba), gemma (google), phi (microsoft), deepsek, gpt-oss (openai)
Setting env API Key pada `OPENAI_API_KEY` `.env`

- chat interface(chatgpt)
- cloud apis, llm api, amazon bedrock, google vertex, dll
- direct: hugging face dengan ollama

Di Python dapat mengakses OpenAI client library yang kompatible dengan banyak provider lain (termasuk Ollama, gemini, dll), kalau ollama tidak perlu api

respose.choices[0].message.content

## Prompting LLM

Terdapat 2 jenis prompting agar hasil prompt lebih baik:

- system: melimitasi bagaimana response/perilaku LLM terhadap pertanyaan dan juga memframing kondisi saat ini
- user: Pertanyaan user

Pada body request payload, biasanya dibikin [{role: "system/user", content: "question/framing"}]
