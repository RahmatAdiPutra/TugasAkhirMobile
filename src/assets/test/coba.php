<form action="" method="post" enctype="multipart/form-data">
   Välj din txt fil: <input name="uploaded" type="file" /><br /> 
<input type="submit" value="Simpan" name="simpan">
</form>


<?php
$simpan = isset($_POST["simpan"]) ? $_POST["simpan"] : "";
if($simpan == "Simpan") {
	$target = "upload/"; 
	$target = $target . basename( $_FILES['uploaded']['name']) ; 
	$ok=1;

	if ($uploaded_size > 350000) { 
	echo "Your file is too large.<br>"; $ok=0; 
	}

	if ($uploaded_type !=="text/plain") { 
	echo "Only txt files allowed<br>"; $ok=0; 
	} 

	if ($ok==0) { 
	echo "Sorry your file was not uploaded"; 
	} else { 
	            if(move_uploaded_file($_FILES['uploaded']['tmp_name'], $target)) { 
	                     echo "The file ". basename( $_FILES['uploadedfile']['name']). " has been uploaded"; 
	            } else { echo "Sorry, there was a problem uploading your file."; } 
	} 
}

?>