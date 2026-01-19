<?php

class Book {
    public $title;
    public $author;
    public $year;

    public function __construct($title, $author, $year) {
        $this->title = $title;
        $this->author = $author;
        $this->year = $year;
    }

    public function setTitle($title) {
        $this->title = $title;
    }

    public function setAuthor($author) {
        $this->author = $author;
    }

    public function setYear($year) {
        $this->year = $year;
    }

    public function getDetails() {
        return "Title: " . $this->title . ", Author: " . $this->author . ", Year: " . $this->year;
    }
}

$book = new Book("1984", "George Orwell", 1949);

$book->setTitle("Clean Code");
$book->setAuthor("Robert C. Martin");
$book->setYear(2008);

echo $book->getDetails();

?>
