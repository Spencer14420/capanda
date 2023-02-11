<?php
    if (isset($_POST["email"]) && isset($_POST["message"])) {
        $name = htmlspecialchars($_POST["name"]);
        $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
        $headers = "From: admin@capanda.ca" . "\r\n" . "Reply-To: $email";
        $message = "From: " . $name . " (" . $email . ")\n\nMessage:\n" . wordwrap(htmlspecialchars($_POST["message"]), 70);

        mail("info@capanda.ca", "New message sent from capanda.ca", $message, $headers);
    }
?>