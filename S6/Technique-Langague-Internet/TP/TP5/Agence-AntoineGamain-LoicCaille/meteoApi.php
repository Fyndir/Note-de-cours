<?php

if (isset($_GET['query'])){
    
    $query = htmlspecialchars($_GET['query']);
    
} else {
    
    $query = '';
    
}  

echo $query;

?>