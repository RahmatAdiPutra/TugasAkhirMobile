<html>
<head>
<title>Membuat dan Membaca File Txt</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>
<body>
<h1><strong>Membuat dan Membaca File Txt</strong><hr>
 </h1>
<p> Proses Penulisan File TXT:<br>
 <?php
$namafile = "kota.txt";
$handle = fopen ($namafile, "w");
if (!$handle) {
 echo "Gagal";
} else {
 fwrite ($handle, "Kota Payakumbuh, termasuk salah satu kota penyelengara tour de singkarak<br>");
 fputs ($handle, "Lomba Balap Sepeda Tahunanan provinsi sumatra barat\n");
 //file_put_contents ($namafile, "Jakarta");
 echo "Sukses di inputkan";
}
fclose($handle);
?>
</p>
<p> Tulisan yang di inputkan pada file txt :<br>
 <?php
$namafile = "kota.txt";
$handle = fopen ($namafile, "r");
if (!$handle) {
 echo "Gagal";
} else {
 $isi = fgets ($handle, 2048);
 $isi2 = fread ($handle, 2048);
 echo "Isi 1 : $isi<br>";
 echo "Isi 2 : $isi2<br>";
}
fclose($handle);
?>
</p>
</body>
</html>
