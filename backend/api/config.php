<?php
    $db = new mysqli("localhost", "username", "password", "calendar");

    if(!$db) {
        die("database connection error");
    }
        
?>