<?php
require_once __DIR__ . "/../../vendor/autoload.php";
use spencer14420\SpAntiCsrf\AntiCsrf;
$tokenHandler = new AntiCsrf();
echo json_encode(['token' => $tokenHandler->generateToken()]);