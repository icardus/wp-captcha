<?php
/*
Plugin Name: Easy Login CAPCHA
Description: Adds a simple CAPTCHA to the WordPress login page.
Version: 1.0
Author: Ignasi Cardús
License: GPL
*/

function custom_login_captcha_enqueue_scripts() {
    // Enqueue style
    wp_enqueue_style('custom-login-captcha-style', plugin_dir_url(__FILE__) . 'style.css');

    // Enqueue script only on the login page
    if (is_login_page()) {
        wp_enqueue_script('custom-login-captcha-script', plugin_dir_url(__FILE__) . 'script.js', array('jquery'), '1.0', true);
    }
}

add_action('login_enqueue_scripts', 'custom_login_captcha_enqueue_scripts');

// Function to check if the current page is the login page
function is_login_page() {
    return in_array($GLOBALS['pagenow'], array('wp-login.php', 'wp-register.php'));
}

