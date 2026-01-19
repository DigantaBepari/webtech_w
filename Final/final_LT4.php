<?php

function sum($a, $b) {
    return $a + $b;
}

echo sum(5, 3) . "<br>";
echo sum(10, 20) . "<br>";

function factorial($n) {
    if ($n <= 1) {
        return 1;
    }
    return $n * factorial($n - 1);
}

echo factorial(5) . "<br>";

function is_prime($n) {
    if ($n <= 1) {
        return false;
    }
    for ($i = 2; $i <= sqrt($n); $i++) {
        if ($n % $i == 0) {
            return false;
        }
    }
    return true;
}

$numbers = [2, 3, 4, 5, 10, 13];

foreach ($numbers as $num) {
    if (is_prime($num)) {
        echo $num . " is a prime number<br>";
    } else {
        echo $num . " is not a prime number<br>";
    }
}

?>
