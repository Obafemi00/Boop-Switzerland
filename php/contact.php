<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// PHPMailer namespace imports (must be at the top)
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Set headers for JSON response
header('Content-Type: application/json');

// Block known bad IPs and user agents
$bad_ips = ['1.2.3.4', '5.6.7.8']; // Add more as needed
$bad_agents = ['curl', 'bot', 'spider', 'python', 'wget'];
$user_ip = $_SERVER['REMOTE_ADDR'] ?? '';
$user_agent = strtolower($_SERVER['HTTP_USER_AGENT'] ?? '');
foreach ($bad_ips as $bad_ip) {
    if (strpos($user_ip, $bad_ip) !== false) {
        http_response_code(403);
        echo json_encode(['success' => false, 'error' => 'Forbidden']);
        exit;
    }
}
foreach ($bad_agents as $bad_agent) {
    if (strpos($user_agent, $bad_agent) !== false) {
        http_response_code(403);
        echo json_encode(['success' => false, 'error' => 'Forbidden']);
        exit;
    }
}

// Honeypot check
if (!empty($_POST['website'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Bot detected (honeypot).']);
    exit;
}

// Time-based check (at least 3 seconds)
if (empty($_POST['form_time']) || (time() - intval($_POST['form_time'])/1000) < 3) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Form submitted too quickly.']);
    exit;
}

// Google reCAPTCHA v3 check
if (empty($_POST['g-recaptcha-response'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'reCAPTCHA not completed.']);
    exit;
}
$recaptcha_secret = '6LcEXGorAAAAADkHIRM0QNyrAMHQ6v6d8S-hC85y';
$recaptcha_response = $_POST['g-recaptcha-response'];
$recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
$recaptcha = file_get_contents($recaptcha_url . '?secret=' . urlencode($recaptcha_secret) . '&response=' . urlencode($recaptcha_response) . '&remoteip=' . urlencode($user_ip));
$recaptcha = json_decode($recaptcha, true);
if (empty($recaptcha['success']) || $recaptcha['score'] < 0.5 || (isset($recaptcha['action']) && $recaptcha['action'] !== 'contact')) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'reCAPTCHA verification failed.']);
    exit;
}

// JS token check
if (empty($_POST['js_token'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'JavaScript validation failed.']);
    exit;
}

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize form data
    $name = sanitize_input($_POST['name']);
    $email = sanitize_input($_POST['email']);
    $subject = sanitize_input($_POST['subject']);
    $message = sanitize_input($_POST['message']);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'error' => 'Invalid email format']);
        exit;
    }

    // PHPMailer integration
    require_once __DIR__ . '/PHPMailer/PHPMailer.php';
    require_once __DIR__ . '/PHPMailer/SMTP.php';
    require_once __DIR__ . '/PHPMailer/Exception.php';

    $mail = new PHPMailer(true);
    try {
        //Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.example.com'; // Set your SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'your@email.com';   // SMTP username
        $mail->Password   = 'yourpassword';     // SMTP password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        //Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress('info@boopswitzerland.com');
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = '<div style="font-family:Montserrat,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.07);">
            <h2 style="color:#17918B;margin-bottom:16px;">New Contact Form Submission</h2>
            <table style="width:100%;border-collapse:collapse;">
                <tr><td style="font-weight:bold;padding:8px 0;width:120px;">Name:</td><td style="padding:8px 0;">' . htmlspecialchars($name) . '</td></tr>
                <tr><td style="font-weight:bold;padding:8px 0;">Email:</td><td style="padding:8px 0;">' . htmlspecialchars($email) . '</td></tr>
                <tr><td style="font-weight:bold;padding:8px 0;">Subject:</td><td style="padding:8px 0;">' . htmlspecialchars($subject) . '</td></tr>
                <tr><td style="font-weight:bold;padding:8px 0;vertical-align:top;">Message:</td><td style="padding:8px 0;white-space:pre-line;">' . nl2br(htmlspecialchars($message)) . '</td></tr>
            </table>
            <div style="margin-top:24px;font-size:0.95em;color:#888;">This message was sent from the B.O.O.P Switzerland website contact form.</div>
        </div>';
        $mail->AltBody = "New Contact Form Submission\n\nName: $name\nEmail: $email\nSubject: $subject\nMessage:\n$message\n\nThis message was sent from the B.O.O.P Switzerland website contact form.";

        $mail->send();
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Mailer Error: ' . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?> 