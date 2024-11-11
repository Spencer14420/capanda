<?php

header('Content-Type: application/json');

$action = $_GET['action'] ?? null;

switch ($action) {
    case "sendMessage":
        require_once __DIR__ . "/dist/php/email-handler.php";
        break;
    
    default:
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid action specified']);
    break;
}