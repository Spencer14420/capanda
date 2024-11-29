<?php
require_once __DIR__ . "/../../vendor/autoload.php";

use spencer14420\PhpEmailHandler\EmailHandler;

//Send the message
try {
    $emailHandler = new EmailHandler(__DIR__ . "/email-config.php");
    $emailHandler->handleRequest();
} catch(Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}