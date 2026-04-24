# Intro

instalasi bisa pakai flywheel, laragon, dll.
setiap project wordpress memiliki directory.
jika kita buat file .php di public, dapat diakses dari url

admin page ada di url /wp-admin

themes
pada halaman admin appearance->themes
Folder utama ada di app/public/wp-content/themes berisi tema terinstall.
untuk membuat tema, bikin folder didalamnya dan berisi 2 file: index.php (Home page) dan style.css
untuk memberikan informasi tambahan yang tampil pada admin, kita bisa tambahin comment style.css
ada beberapa file opsional:
- screenshot.png

terdapat beberapa fungsi php bawaan wordpress:
- bloginfo() memunculkan informasi dari setting admin
- while(have_posts()){
the_post();

// ambil atribut post
the_title();
the_content();
the_permalink();//url ke halaman post
}

halaman url tersebut (individual post) bisa diakses dari single.php. Didalamnya kita juga dapat mengakses current post
//single.php
the_post()
the_title()

create pages from wp-admin
kita bisa bikin page baru yang mengarah ke /slug_page
bisa juga dioverride dengan page.php

footer dan header
buat dengan footer.php dan header.php dan panggil di halaman dengan cara get_header() dan get_footer();
oleh karena itu buat closing dari html header di html footer

meload css gunakan get_head()

function.php
bisa digunakan untuk menambahkan aksi, agar dijalankan wordpress
add_action('wp_enqueue_scripts', my_func)

function my_func(){
	wp_enqueue_style('nick_name', get_stylesheet_uri()) // get_stylesheet_uri() secara default load style.css, bisa diberi argument file path
								// wp_enqueue_style param kedua dapat berupa string url.
}
wp_enqueue_script('nick_name', get_theme_file_uri(), [dependency], version, load_after_body) //load js

load css dengan background berupa url, dengan menulis php script
get_theme_file_uri(file_path);

wordpress editor, bisa gunakan alternatif plugin "elementor" untuk lebih rich feature

permalink dapat diatur di settings, lebih baik pakai slug agr lebih SEO

menggunakan tema
1. activate tema, akan muncul tema di sidebar
2. dalam tema, masuk ke starter template dan install

Elementor
edit template dengan elementor
1. select 6 dot pada container
2. button bisa diketik dan akan muncul dropdown pilih halaman

Melihat struktur html, klik kanan dan structure, atau ctrl+i

environment
dev: admin akses, sandboxed/playground
prod