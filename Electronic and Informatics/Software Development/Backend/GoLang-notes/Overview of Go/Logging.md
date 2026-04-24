# Logging

Merupakan cara untuk menyimpan rekaman proses yang terjadi pada aplikasi. Biasanya akan disimpan di file .log.

## Log Aggregator

Penyimpanan log di file .log hanya berupa text akan sulit kalau ingin mencarinya. Biasanya dilakukan penyimpanan ke database(`elastic search`) menggunakan aggregator (`flundi`, `filebit`) yang akan membaca dari .log secara periodik, karena jika langsung ke DB akan makan resource.

## Library

Sebenarnya sudah ada built-in log tetapi terlalu sederhana, untuk case lebih kompleks gunakan tambahan:

- logrus
- zap
- zerolog

Pada catatan ini, akan dibahas logging dengan logrus.

### Logrus

Bersifat singleton (tidak perlu buat obj dan passing obj).

```go
// Obj style
logger := logrus.New()
logger.Println("str")

// Singleton style
// Will log anything that is info or above (warn, error, fatal, panic). Default.
logrus.SetLevel(logrus.InfoLevel)
logrus.SetLevel(logrus.TraceLevel) // log anything

// level 
logrus.Trace("Something very low level.")
logrus.Debug("Useful debugging information.")
logrus.Info("Something noteworthy happened!")
logrus.Warn("You should probably take a look at this.")
logrus.Error("Something failed but I'm not quitting.")
// Calls os.Exit(1) after logging
logrus.Fatal("Bye.")
// Calls panic() after logging
logrus.Panic("I'm bailing.")
```

#### Output

Output logrus berupa io.Writer

```go
file, _ := os.OpenFile("file.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
// 0666 adalah permission dari file yg dibuat

logger.SetOutput(file)
```

#### Formatter

berguna untuk parsing lebih gampang untuk proses `agregator` file log ke db (data ditampung di file `.log`)

```go
logger.setFormatter(&logrus.JSONFormatter{})
```

#### Field

Secara default, pada Logrus akan memberikan beberapa field (`time, level, msg`). Kita juga bisa menambahkan field ke log jika mau.

```go
logger.WithFields(logrus.Fields{
    "username": "farid"
}).info("Hello World")
```
