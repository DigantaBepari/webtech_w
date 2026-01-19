<?php

$name = "Arafat";
$age = 25;
$CGPA = 5.55;
$isOld = true;
$random1 = 5;
$random2 = 7.5;

echo "Number 1 = $random1 Number 2 = $random2 <br>";

echo "Addition = " . ($random1 + $random2) . "<br>";
echo "Multiplication = " . ($random1 * $random2) . "<br>";
echo "Subtraction = " . ($random1 - $random2) . "<br>";
echo "Division = " . ($random1 / $random2) . "<br>";

echo gettype($name) . "<br>";
echo gettype($age) . "<br>";
echo gettype($CGPA) . "<br>";
echo gettype($isOld) . "<br>";
echo gettype($random1) . "<br>";
echo gettype($random2) . "<br>";

?>
