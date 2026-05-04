two-way binding: jika one-way binding dilakukan dari script ke DOM, maka two-way juga akan mengirim dari update DOM ke script. Seperti perubahan nilai element input akan mengubah state yang terhubung dengan element tersebut

binding hanya limit ke element html:

- input dan text area, ada event @input
- select, ada event @change bernilai true/false
- textarea, ada event @change dengan atribut value

modifiers:

- .lazy
- .number, untuk mengkonvert nilai ke number otomatis
- .trim, menghilangkan whitespace otomatis
