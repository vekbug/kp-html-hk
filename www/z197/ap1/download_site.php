<?php
$file = $_GET['file'];
download_tar('/www/' . $file . '.tar.gz');
function download_tar($tar_name){
    header("Content-Type: application/x-zip");
    header("Content-Transfer-Encoding: binary");
    header("Content-Length: " . filesize($tar_name));
    header("Content-Disposition: attachment; filename=" . basename($tar_name));
    readfile($tar_name);
    exit;
}