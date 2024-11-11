<?php
require_once __DIR__ . "/email-config.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Error: Invalid request method.']);
    exit;
}

if (!isset($_POST["email"]) || !isset($_POST["message"])) {
    echo json_encode(['status' => 'error', 'message' => 'Error: Missing required fields.']);
    exit;
}


$name = !empty($_POST["name"]) ? $_POST["name"] : "somebody";
$email = $_POST["email"];
$headers = "From: {$siteName} <{$fromEmail}>\r\nReply-To: $email";
$message = "From: {$name} ({$email})\n\nMessage:\n" . wordwrap($_POST["message"], 70);

//Send message to the mailbox
$messageSent = mail($mailboxEmail, "Message from {$name} via {$siteDomain}", $message, $headers);

if (!$messageSent) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to send the message. Please try again later.']);
    exit;
}

//Send confirmation email to sender
$headers = "From: {$siteName} <{$fromEmail}>\r\nReply-To: $replyToEmail";
$message = "Dear {$name} ({$email}),\n\nYour message (shown below) has been recieved. We will get back to you as soon as possible.\n\nSincerely,\n{$siteName}\n\nPlease note: This message was sent to the email address provided in our contact form. If you did not enter your email, please disregard this message.\n\nYour message:\n" . wordwrap($_POST["message"], 70);
mail($email, "Your message to {$siteName} has been recieved", $message, $headers);

echo json_encode(['status' => 'success']);