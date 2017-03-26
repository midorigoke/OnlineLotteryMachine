<?php
$list_array = json_decode($_POST[data], true);

$result = $list_array[array_rand($list_array)];

file_put_contents('list.txt', implode("\n", $list_array));

file_put_contents('result.txt', $result);

echo $result;
