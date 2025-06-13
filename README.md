# B.O.O.P Switzerland Website

This project involves the development of a modern, responsive website for B.O.O.P Switzerland, a global media powerhouse. The website was built iteratively, starting with a "Coming Soon" page and evolving into a comprehensive multi-page site with various features and a structured file organization.

## Project Overview

### Initial Phase: "Coming Soon" Page

The project began with the creation of a "Coming Soon" HTML page for B.O.O.P Switzerland. This page included:

*   A specific color palette extracted from a provided image.
*   A contact form initially using `mailto:`.

### Backend Integration: PHP Contact Form

To address the limitations of `mailto:`, a custom PHP backend (`php/contact.php`) was implemented for the contact form. This backend handles:

*   Form submission and validation.
*   Email sending (with detailed instructions for PHPMailer SMTP configuration provided).
*   Returning JSON responses for client-side feedback.

The HTML form was updated to use AJAX for seamless submission to the PHP backend.

### Website Expansion: Multi-Page Structure

The website evolved from a single "Coming Soon" page to a multi-page application, featuring a new `index.html` as the home page and separate pages for different content sections:

*   `index.html`: Home page with a hero section, tagline, and floating words animation.
*   `pages/about.html`: "About Us" section with company story, team, and values.
*   `pages/services.html`: Detailed "Our Services" section with specific service cards and SVG icons.
*   `pages/project.html`: "Our Projects" section with details on "The Oji Show".
*   `pages/contact.html`: "Contact Us" page with a contact form.

### Styling and Interactivity

All CSS was extracted from the HTML files into a separate `css/styles.css` file for better organization and maintainability. The website incorporates:

*   Modern and visually striking design elements, including gradients and glassmorphism.
*   Enhanced animations and transitions for a dynamic user experience.
*   A mobile menu for responsive navigation on smaller screens.
*   JavaScript for interactive elements, including scroll animations, parallax effects, and a typing/blinking cursor animation for the "Coming Soon" text.

### Legal Documentation

To ensure compliance and transparency, the following legal documents were created as separate HTML pages:

*   `pages/privacy-policy.html`: Comprehensive Privacy Policy.
*   `pages/terms.html`: Detailed Terms of Use.
*   `pages/cookies.html`: Explanation of Cookie Policy.
*   `pages/imprint.html`: Imprint/Legal Notice.

### Navigation and User Experience Enhancements

*   **Redesigned Footer:** A multi-column footer was implemented across all pages, matching a specific design style and including links to various sections (Help + Info, Company, Work with Us).
*   **Breadcrumbs:** Breadcrumbs (`HOME -> CURRENT PAGE`) were added to all secondary pages for improved navigation and user orientation.
*   **SVG Icons:** Specific SVG icons were integrated into the services page to visually represent each service.

### File Organization and Path Updates

To maintain a clean and standard project structure, the files were organized into dedicated directories:

*   `css/`: Contains `styles.css`.
*   `js/`: Contains `script.js`.
*   `images/`: (Planned for images).
*   `pages/`: Contains all secondary HTML pages (`about.html`, `services.html`, `project.html`, `contact.html`, `privacy-policy.html`, `terms.html`, `cookies.html`, `imprint.html`, `coming-soon.html`).
*   `php/`: Contains `contact.php`.

All file paths within the HTML, CSS, and JavaScript files were meticulously updated to reflect this new directory structure, ensuring all assets and links function correctly.

## Project Structure

```
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── php/
│   └── contact.php
├── pages/
│   ├── about.html
│   ├── services.html
│   ├── project.html
│   ├── contact.html
│   ├── privacy-policy.html
│   ├── terms.html
│   ├── cookies.html
│   ├── imprint.html
│   └── coming-soon.html
├── images/ (future use)
└── README.md
```

## How to Run Locally

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <repository-url>
    cd boop-switzerland-website
    ```
2.  **Set up a PHP server:** Ensure you have a local web server (e.g., Apache, Nginx) with PHP installed.
3.  **Configure PHP Mailer (if needed):** For the contact form to send emails, you will need to configure SMTP settings in `php/contact.php`. It is recommended to use environment variables for sensitive information like email passwords.
4.  **Open `index.html`:** Navigate to the project directory in your web browser or local server to view the website.

## Future Enhancements

*   Integrate images into the `images/` directory and update paths accordingly.
*   Further refine animations and responsiveness.
*   Implement a proper image management system.
*   Consider a database for dynamic content management.
