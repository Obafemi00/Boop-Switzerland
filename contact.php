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

require_once __DIR__ . '/../vendor/autoload.php'; // Adjust path if needed

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__); // Adjust path if needed
$dotenv->load();

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
$mail->SMTPAuth   = true;
$mail->Host       = $_ENV['SMTP_HOST'];
$mail->Username   = $_ENV['SMTP_USERNAME'];
$mail->Password   = $_ENV['SMTP_PASSWORD'];
$mail->SMTPSecure = $_ENV['SMTP_SECURE'];
$mail->Port       = $_ENV['SMTP_PORT'];
    // Recipients
    $mail->setFrom('info@boopswitzerland.com', 'Boop Switzerland'); // Use your domain email
    $mail->addAddress('info@boopswitzerland.com'); // Where you want to receive the email
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(false);
    $mail->Subject = 'New message from Boop Switzerland Contact Form';
    $mail->Body    = "Name: $name\nEmail: $email\nMessage:\n$message";

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Mailer Error: ' . $mail->ErrorInfo]);
} 