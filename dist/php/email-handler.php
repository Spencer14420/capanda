<?php
require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/turnstile-config.php";
require_once __DIR__ . "/token-handler.php";

use spencer14420\PhpEmailHandler\EmailHandler;

//CSRF Token verification
if (!$tokenHandler->tokenIsValid($_POST["tokenInputToken"])) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Error: There was a issue with your session. Please refresh the page and try again.']);
    exit();
}

//Cloudflare Turnstile verification
$remote_addr = $_SERVER['REMOTE_ADDR'];
$cf_url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
$token = $_POST['turnstileToken'];

$data = array(
    "secret" => $turnstileSecret,
    "response" => $token,
    "remoteip" => $remote_addr
);

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $cf_url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);

if (curl_errno($curl)) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Error: Could not verify CAPTCHA']);
    exit();
}

$response = json_decode($response, true);

if ($response['error-codes'] && count($response['error-codes']) > 0) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => "Error: Could not verify CAPTCHA", 'turnstileError' => $response['error-codes']]);
    exit();
}

curl_close($curl);

//Send the message
try {
    $emailHandler = new EmailHandler(__DIR__ . "/email-config.php");
    $emailHandler->handleRequest();
} catch(Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]); 
}