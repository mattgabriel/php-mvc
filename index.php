<?php
//===============================================
// Debug
//===============================================
ini_set('display_errors','On');
error_reporting(E_ALL);

//===============================================
// mod_rewrite
//===============================================
//Please configure via .htaccess or httpd.conf

//===============================================
// Madatory KISSMVC Settings (please configure)
//===============================================
define('APP_PATH','app/'); //with trailing slash pls
define('WEB_FOLDER','/'); //with trailing slash pls
//define('WEB_URL','http://95.138.170.179'.WEB_FOLDER); //http://www.xxx.com without trailing slash
define('WEB_URL','http://filtered.com'.WEB_FOLDER); //http://www.xxx.com without trailing slash

//===============================================
// Other Settings
//===============================================
$GLOBALS['sitename']='Filtered';

//===============================================
// Includes
//===============================================
require('kissmvc.php');

//===============================================
// Session
//===============================================

session_start();

//===============================================
// Uncaught Exception Handling
//===============================================s

set_exception_handler('uncaught_exception_handler');

function uncaught_exception_handler($e) {
  ob_end_clean(); //dump out remaining buffered text
  $vars['message']=$e;
  die(View::do_fetch(APP_PATH.'errors/exception_uncaught.php',$vars));
}

function custom_error($msg='') {
  $vars['msg']=$msg;
  die(View::do_fetch(APP_PATH.'errors/custom_error.php',$vars));
}


//===============================================
// Database
//===============================================

function getdbh() {
  if (!isset($GLOBALS['dbh']))
    try {
      //$GLOBALS['dbh'] = new PDO('sqlite:'.APP_PATH.'db/kissmvc.sqlite');
      $GLOBALS['dbh'] = new PDO('mysql:host=localhost;dbname=Ewb', 'root', '3x3l1_2');

    } catch (PDOException $e) {
      die('Connection failed: '.$e->getMessage());
    }
  return $GLOBALS['dbh'];
}


//===============================================
// Autoloading for Business Classes
//===============================================
// Assumes Model Classes start with capital letters and Helpers start with lower case letters

function __autoload($classname) {
  $a=$classname[0];
  if ($a >= 'A' && $a <='Z')
    require_once(APP_PATH.'models/'.$classname.'.php');
  else
    require_once(APP_PATH.'helpers/'.$classname.'.php');  
}


//===============================================
// Start the controller
//===============================================
$controller = new Controller(APP_PATH.'controllers/',WEB_FOLDER,'main','index');