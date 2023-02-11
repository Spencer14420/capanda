<?php
    if (isset($_POST["email"]) && isset($_POST["message"])) {
        $to_email = "spencer@capanda.ca";
        $from_email = "website-messages@capanda.ca";
        $sendflag = $_REQUEST['sendflag'];    
        $name=$_REQUEST['name'];
        if ($sendflag == "send")
            {
                $subject= "New message sent from capanda.ca";
                $email = $_REQUEST['email'] ;
                $message = "\r\n" . "Name: $name" . "\r\n";
                $message = $message.$_REQUEST['message'] . "\r\n" ;
                $headers = "From: $from_email" . "\r\n" . "Reply-To: $email"  ;
                mail( $to_email, $subject, $message, $headers );
            }

    }
?>