# Hacking

network hack for fun
using kali Linux

## man in the middle (bettercap tools)

1. getting all device connected to router

    > sudo bettercap -iface wlan0
    > net.probe on
    > net.show
    > set arp.spoof.fullduplex true

2. arp spoofing
    kita tahu identitas ip address dan mac dari target dan router

    logikanya,kalau semua orang konek ke device A untuk internet, device A dapat melihat semua traffic.
    filter by DNS pada wireshark, kamu dapat melihat website yang diakses

3. evil twin
    membuat halaman login seperti google dll yang connect

    fitur auto-connect wifi melakukan broadcasting

    kali linux wsl

4. nmap: scanning ip range by ip address atau bahkan url

    kalo kita sebagai client network dan jalanin wireshark apa semua traffic jaringan tersebut akan kelihatan

    dengan https walaupun paket kelihatan, tapi terenkripsi

5. metasploit
    mencari celah dari versi sistem kemudian mendapatkan akses penuh ke sistem tersebut (too powerfull, and easy, cant see fundamental)

    airmon
    airodump
    aircrack highly illegal

    password cracking tool: jhon the ripper, hydra, hashcat, digunakan untuk mereverse hash password

    bisa dengan kombinasi atau rockyou.txt yang berisi password yang sering digunakan
