<?php
    if (isset($_POST["email"]) && isset($_POST["message"])) {
        $name = $_POST["name"];
        $email = $_POST["email"];
        $headers = "From: admin@capanda.ca" . "\r\n" . "Reply-To: $email";
        $message = "From: " . $name . " (" . $email . ")\n\nMessage:\n" . wordwrap($_POST["message"], 70);

        mail("info@capanda.ca", "New message sent from capanda.ca", $message, $headers);
    }
?>