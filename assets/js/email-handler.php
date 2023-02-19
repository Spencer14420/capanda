<?php
    if (isset($_POST["email"]) && isset($_POST["message"])) {
        //Send email to info@capanda.ca
        $name = $_POST["name"];
        $email = $_POST["email"];
        $headers = "From: admin@capanda.ca\r\nReply-To: $email";
        $message = "From: {$name} ({$email})\n\nMessage:\n". wordwrap($_POST["message"], 70);

        mail("info@capanda.ca", "Message from {$name} via capanda.ca", $message, $headers);

        //Send confirmation email to sender
        $headers = "From: info@capanda.ca";
        $message = "Dear {$name} ({$email}),\n\nYour message (shown below) has been recieved. We will get back to you as soon as possible.\n\nSincerely,\nCAPANDA\n\nYour message:\n". wordwrap($_POST["message"], 70);

        mail($email, "Your message to CAPANDA has been recieved", $message, $headers);
    }
?>