# Viper

Ketika sebuah aplikasi golang dibuild untuk production, hasil production adalah code yang telah dicompile sehingga kita tidak bisa mengatur `environment variable`.

Mendukung file konfigurasi:

- json
- yaml
- env
- properties (Java)

`go get github.com/spf13/viper`

## File Env

Biasanya menggunakan file `.env`.

```go
var config *viper.Viper = viper.New()

config.SetConfigName("config")
config.SetConfigType("json")

// atau langsung file
config.SetConfigFile("config.json")

config.AddConfigPath(".")  //direktori config.json

config.ReadConfig() // dipanggil sekali
config.GetString("database.host")
config.GetInt("database.port")
```

## Environment Variable OS

Merupakan variable yang tersimpan dalam `OS, bukan file env`. Dapat dibaca dengan `BindEnv` atau `AutomaticEnv`.

```go
// satu persatu (env_os, identified_as, default_value)
err := viper.BindEnv("server.port", "APP_PORT", "FALLBACK_PORT")
if err != nil {
    log.Fatalf("Error binding environment variable: %v", err)
}

// otomatis
config.AutomaticEnv()
```

## Prioritas Sumber

Viper akan memberikan prioritas lebih tinggi ke `OS` daripada `file` jika keduanya dilakukan.
