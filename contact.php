<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// If you used Composer:
require 'vendor/autoload.php';
// If you downloaded manually, use the correct path:
require 'path/to/phpmailer/src/PHPMailer.php';
require 'path/to/phpmailer/src/Exception.php';
require 'path/to/phpmailer/src/SMTP.php';

header('Content-Type: application/json');

// Set your email address
$to = 'info@boopswitzerland.com';

// Get POST data and sanitize
$name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

// Validate
if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Please fill in all fields with a valid email.']);
    exit;
}

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'mail.boopswitzerland.com'; // <-- Replace with your SMTP host
    $mail->SMTPAuth = true;
    $mail->Username = 'info@boopswitzerland.com'; // <-- Replace with your SMTP username
    $mail->Password = '?L!MiN3^Az.Q8n2'; // <-- Replace with your SMTP password
    $mail->SMTPSecure = 'ssl'; // Or 'tls' (ask your host)
    $mail->Port = 465; // Or 587 for TLS

    // Recipients
    $mail->setFrom('info@boopswitzerland.com', 'Boop Switzerland'); // Use your domain email
    $mail->addAddress('info@boopswitzerland.com'); // Where you want to receive the email
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(false);
    $mail->Subject = 'New message from Boop Switzerland Coming Soon page';
    $mail->Body    = "Name: $name\nEmail: $email\nMessage:\n$message";

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Mailer Error: ' . $mail->ErrorInfo]);
} 