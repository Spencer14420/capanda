<?php
require_once __DIR__ . "/email-config.php";

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

//Sanitize inputs
$email = filter_var($_POST["email"] ?? "", FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars($_POST["message"] ?? "");
$name = htmlspecialchars($_POST["name"] ?? "somebody");

if (empty($email) || empty($message)) {
    echo json_encode(['status' => 'error', 'message' => 'Error: Missing required fields.']);
    http_response_code(422);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Error: Invalid email address.']);
    http_response_code(422);
    exit;
}

$headers = "From: {$siteName} <{$fromEmail}>\r\nReply-To: $email";
$body = "From: {$name} ({$email})\n\nMessage:\n" . wordwrap($message, 70);

//Send message to the mailbox
$messageSent = mail($mailboxEmail, "Message from {$name} via {$siteDomain}", $body, $headers);

if (!$messageSent) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to send the message. Please try again later.']);
    http_response_code(500);
    exit;
}

//Send confirmation email to sender
$headers = "From: {$siteName} <{$fromEmail}>\r\nReply-To: $replyToEmail";
$message = "Dear {$name} ({$email}),\n\nYour message (shown below) has been received. We will get back to you as soon as possible.\n\nSincerely,\n{$siteName}\n\nPlease note: This message was sent to the email address provided in our contact form. If you did not enter your email, please disregard this message.\n\nYour message:\n" . wordwrap($_POST["message"], 70);
mail($email, "Your message to {$siteName} has been received", $message, $headers);

echo json_encode(['status' => 'success']);
