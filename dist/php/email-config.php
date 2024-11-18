<?php
require_once __DIR__ . "/turnstile-config.php";

$fromEmail = "admin@nm.capanda.ca";
$mailboxEmail = "admin@nm.capanda.ca";
$replyToEmail = "admin@capanda.ca";
$siteDomain = "capanda.ca";
$siteName = "CAPANDA";
$captchaToken = $_POST['turnstileToken'];
$captchaVerifyURL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
$checkCsrf = true;
$csrfToken = $_POST["tokenInputToken"];