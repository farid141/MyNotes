# Deployment Issue

Sebuah service bisa saja menerima traffic terlalu besar ada beberapa cara mengatasi ini, salah satunya adalah load balancing

## Load Balancing

Menduplikasi service agar traffic dapat terbagi, bisa dilakukan dalam VM atau VM baru, ada beberapa masalah:

- harus menuliskan ip dan port service baru tersebut ke service eventbus
- konfigurasi firewall dan akses VM berbeda
- pengaturan dinamis, misal aktifkan VM cadangan ketika jam tertentu

Untuk masalah tersebut ada tools utama yang digunakan `docker` dan `kubernetes`.

## Kubernetes

Merupakan sebuah tools untuk manage suatu kluster dengan banyak node/VM. Kita dapat mengassign pod/container ke sebuah node dengan file config melalui kubectl. Dengan konfigurasi ini, kita dapat melakukan aksi ke node2 dalam cluster secara kondisional (traffic tinggi, waktu tertentu).

### Terminologi

- `cluster`: kumpulan dari beberapa nodes dan satu master
- `node`: vm yang menjalankan container
- `pod`: tempat container (biasanya 1 pod 1 container)
- `Deployment`: monitoring pods, menjamin pods berjalan, akan secara otomatis memperbarui container / pods jika ada image baru
- `service`: url pod dalam cluster yang mudah dipahami
- `Objects`: pod/deployment/service dalam config

### Config File

File yml utama yang berguna untuk konfigurasi cluster biasanya dibuat dalam git agar terekam. Untuk membuat multiple object dalam satu config file, gunakan `---` sebagai pemisah, biasanya untuk deployment dan service sekaligus

<!-- File config untuk membuat obj pods -->
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: posts
spec:
  containers:
    - name: posts
      image: dokerimg/posts:1.0.0 # default behavior akan mencari ke dockerhub jika tidak diberi version
```

### Commands

> pro tips: gunakan `k` sebagai alias `kubectl`, tergantung pada jenis terminal yang dipakai

- `kubectl apply -f [posts.yaml]` buat obj(pod/deployment/service) dari config
- `kubectl get pods`
- `kubectl get deployments`
- `kubectl exec -it [podname] [command]` akan meminta pilih container jika dalam 1 pod ada 2 container
- `kubectl logs [podname]`
- `kubectl describe pod [podname]`

### Deployment

Digunakan untuk manage beberapa Pods dalam cluster

<!-- posts-depl.yaml -->
```yaml
apiVersion: v1
kind: Deployment
metadata:
  name: posts-depl
spec:
  replicas: 1
  selector: # selector untuk deployment (terserah) key value pair
    matchLabels:
      app: posts
  template:
    metadata: # semua pods akan memiliki label app: posts
      labels: 
        app: posts
    spec:
      containers: # container yang akan DIBUAT dan DIMANAGE deployment ini
        - name: posts
          image: dokerimg/posts:1.0.0
```

#### Updating Deployments

Ada 2 cara:

##### Buat versi image baru

Ubah image version yang dicantumkan dalam `deployments`, lakukan `kubectl apply -f [depl filename]`. Kubernetes akan melihat bagian config file mana yang berubah, semisal hanya image version. Lebih cepat (tidak perlu push image)

##### Tidak menspesifikkan versi image

Jika versi tidak dispesifikkan, k8s akan mengambil dari dockerhub versi latest

1. push image `docker push [username/proj]`
2. `kubectl rollout restart deployment [posts-depl]`

Lebih bersih (tidak mengubah file config) tetapi lama karena harus push

### Services

Tipe services

- cluster IP (pod to pod)
- node port (outside cluster for develpment only not prod)
- load balancer
- external name

`kubectl get services`

<!-- post-srv.yaml -->
```yaml
apiVersion: v1
kind: Service
metadata:
  name: posts-srv
spec:
  type: NodePort
  selector: # selector untuk semua pod yang memiliki label app: posts
    app: posts
  ports:
    - name: posts
      protocol: TCP
      port: 4000
      targetPort: 4000
```

dengan cara tersebut, kita bisa akses node dari luar cluster lewat port yang akan digenerate dan akan terhubung dengan 4000.

#### Cluster IP

Menghubungkan antar pod
