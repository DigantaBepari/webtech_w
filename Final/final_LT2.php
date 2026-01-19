<?php

$temperature = 18;

if (!is_numeric($temperature)) {
    echo "Invalid temperature value.<br>";
} else {
    if ($temperature < 10) {
        echo "It's cold<br>";
    } elseif ($temperature >= 10 && $temperature <= 25) {
        echo "It's warm<br>";
    } else {
        echo "It's hot<br>";
    }
}

$day = 3;

if (!is_int($day) || $day < 1 || $day > 7) {
    echo "Invalid day value.<br>";
} else {
    switch ($day) {
        case 1:
            echo "Monday";
            break;
        case 2:
            echo "Tuesday";
            break;
        case 3:
            echo "Wednesday";
            break;
        case 4:
            echo "Thursday";
            break;
        case 5:
            echo "Friday";
            break;
        case 6:
            echo "Saturday";
            break;
        case 7:
            echo "Sunday";
            break;
    }
}

?>
