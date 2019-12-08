<?php 

$type = $_GET['tp']; 

switch ($_GET['tp']) {
    case 'signup': signup();
        break;
    case 'login': login();
        break;
    case 'updateData': updateData();
        break;
    case 'displayData': displayData();
        break;

}
// elseif ($type == 'deleteTime') {
//     deleteTime();
// } 

function signup() {
    
    require 'config.php';

    $json = json_decode(file_get_contents('php://input'), true);
    $username = $json['username'];
    $password = $json['password'];
    $email = $json['email'];

    $username_check = preg_match("/^[A-Za-z0-9_]{4,10}$/i", $username);
    $email_check = preg_match('/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$/i', $email);
    $password_check = preg_match('/^[A-Za-z0-9!@#$%^&*()_]{4,20}$/i', $password);
    
    if ($username_check == 0) 
        echo '{"error":"Invalid username"}';
    elseif ($email_check==0) 
        echo '{"error":"Invalid email"}';
    elseif ($password_check == 0) 
        echo '{"error":"Invalid password"}';
    elseif (strlen(trim($username)) > 0 && strlen(trim($password)) > 0 && strlen(trim($email)) > 0 && 
        $email_check > 0 && $username_check>0 && $password_check > 0) {
        
        $userData = '';
        $query = "select * from users where username='$username' or email='$email'";
        $result = $db->query($query);
        
        if ($result->num_rows == 0) {
            $query = "INSERT INTO users(email, username, password) VALUES('$email', '$username', '$password')";
            $db->query($query);

            $userData ='';
            $query = "select * from users where username='$username' and password='$password'";
            
            $result= $db->query($query);
            $userData = $result->fetch_object();
            $user_id = $userData->user_id;
            $userData = json_encode($userData);
            echo '{"userData":'.$userData.'}';
        } else {
            echo '{"error":"username or email exists!"}';
        }
    } else {
        echo '{"text":"Enter valid data2"}';
    }
}

function login() { 
    require 'config.php'; 
    $json = json_decode(file_get_contents('php://input'), true); 
    $username = $json['username']; 
    $password = $json['password']; 

    $userData =''; 
    $query = "select * from users where username='$username' and password='$password'"; 
    $result = $db->query($query);
    $rowCount = $result->num_rows;
            
    if ($rowCount > 0) {
        $userData = $result->fetch_object();
        $username = $userData->username;
        $userData = json_encode($userData);
        echo '{"userData":'.$userData.'}';    
    } else {
        echo '{"error":"Wrong username and password"}';
    }
}

function updateData() {

    require 'config.php';
    $json = json_decode(file_get_contents('php://input'), true);
    $user_id = $json['user_id'];
    $date = $json['date'];
    $startTime = $json['startTime'];
    $endTime = $json['endTime'];
    
    if ($user_id != 0) {
        $query = "INSERT INTO time(user_id, date, start_from, end_at, content) VALUES ('$user_id', '$date', SEC_TO_TIME($startTime), SEC_TO_TIME($endTime), 'Enter you daily working summary')";
        $db->query($query);              
    }

    echo '{"sucess":"Added successfully"}';
}

function displayData() {
    
    require 'config.php';
    $json = json_decode(file_get_contents('php://input'), true);
    $user_id=$json['user_id'];
    
    $query = "SELECT content, date, start_from, end_at FROM time ORDER BY date";
    $result = $db->query($query); 


    $events = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $event = [];
        $event['title'] = $row['content'];
        $event['start'] = $row['date'] . 'T' . $row['start_from'];
        $event['end'] = $row['date'] . 'T' . $row['end_at'];
        $event['allDay'] = false;
        array_push($events, $event);
    }
    echo json_encode($events);
}
