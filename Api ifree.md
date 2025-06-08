этот апи для проверки на оригинальность
$myCheck["service"] = 0;
$myCheck["imei"] = "000000000000000";
$myCheck["key"] = "4KH-IFR-KW5-TSE-D7G-KWU-2SD-UCO";
$ch = curl_init("https://api.ifreeicloud.co.uk");
curl_setopt($ch, CURLOPT_POSTFIELDS, $myCheck);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);
$myResult = json_decode(curl_exec($ch));
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
if($httpcode != 200) {
echo "Error: HTTP Code $httpcode";
} elseif($myResult->success !== true) {
echo "Error: $myResult->error";
} else {
echo $myResult->response;
echo "<hr><pre>".print_r($myResult->object, true)."</pre><hr>"; // TEST ONLY
// Here you can access specific info!
// echo $myResult->object->model;
}
Этот апи для беплатной проверки



$myCheck["service"] = 4;
$myCheck["imei"] = "000000000000000";
$myCheck["key"] = "4KH-IFR-KW5-TSE-D7G-KWU-2SD-UCO";
$ch = curl_init("https://api.ifreeicloud.co.uk");
curl_setopt($ch, CURLOPT_POSTFIELDS, $myCheck);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);
$myResult = json_decode(curl_exec($ch));
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
if($httpcode != 200) {
echo "Error: HTTP Code $httpcode";
} elseif($myResult->success !== true) {
echo "Error: $myResult->error";
} else {
echo $myResult->response;
echo "<hr><pre>".print_r($myResult->object, true)."</pre><hr>"; // TEST ONLY
// Here you can access specific info!
// echo $myResult->object->model;
}

Этот апи для платной

$myCheck["service"] = 242;
$myCheck["imei"] = "000000000000000";
$myCheck["key"] = "4KH-IFR-KW5-TSE-D7G-KWU-2SD-UCO";
$ch = curl_init("https://api.ifreeicloud.co.uk");
curl_setopt($ch, CURLOPT_POSTFIELDS, $myCheck);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);
$myResult = json_decode(curl_exec($ch));
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
if($httpcode != 200) {
echo "Error: HTTP Code $httpcode";
} elseif($myResult->success !== true) {
echo "Error: $myResult->error";
} else {
echo $myResult->response;
echo "<hr><pre>".print_r($myResult->object, true)."</pre><hr>"; // TEST ONLY
// Here you can access specific info!
// echo $myResult->object->model;
}
