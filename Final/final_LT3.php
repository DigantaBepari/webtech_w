<?php

for ($i = 1; $i <= 20; $i++) {
    if ($i > 5) {
        break;
    }
    echo $i . " ";
}

echo "<br>";

$i = 1;
while ($i <= 20) {
    if ($i % 2 == 0) {
        echo $i . " ";
    }
    $i++;
}

echo "<br>";

$fruits = [
    "apple" => "red",
    "banana" => "yellow",
    "grape" => "purple",
    "orange" => "orange",
    "mango" => "yellow"
];

foreach ($fruits as $fruit => $color) {
    echo $fruit . " is " . $color . "<br>";
}

?>
