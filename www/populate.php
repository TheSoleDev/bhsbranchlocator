<?php



// $spreadsheet_url="https://spreadsheets.google.com/feeds/list/1c_gBTUtbMk7QBVZHSQVl-qxRfUwQRR5BBCCG2_XTMtY/worksheets/public/values?alt=json";

// if(!ini_set('default_socket_timeout',    15)) echo "<!-- unable to change socket timeout -->";

// if (($handle = fopen($spreadsheet_url, "r")) !== FALSE) 
// {
//     while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) 
//     {
//             $spreadsheet_data[]=$data;
//     }

//     fclose($handle);
// }
// else
//     die("Problem reading csv");


// echo '<pre>';
// print_r($spreadsheet_data);

$dbhost = 'localhost';
$dbuser = 'root';
$dbpassword = 'germs123';
$db = new PDO('mysql:host='.$dbhost.';dbname=bhs_branches', $dbuser, $dbpassword,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

    try {
            $query_province ='SELECT DISTINCT(province) as province_name FROM tbl_branches';
            $stmt_province = $db->prepare($query_province);
            $stmt_province->execute();
            $arr_province = array('province' =>$stmt_province->fetchAll(PDO::FETCH_ASSOC));


            $query_branch ='SELECT * FROM tbl_branches';
            $stmt_branch = $db->prepare($query_branch);
            $stmt_branch->execute();
            $arr_branch =  array('branch' =>$stmt_branch->fetchAll(PDO::FETCH_ASSOC));


            $arr_data = array_merge($arr_province,$arr_branch);

            $json = json_encode($arr_data);

            echo '<pre>';
            print_r( $json);

    } catch (PDOException $e) {
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }

    
?>
