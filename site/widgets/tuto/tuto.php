<?php
/**
 * Tutorial
 */

if (c::get('tuto.widget')) {
  return array(
    'title' => ($title = 'Help'),
    'html'  => function() {
      return tpl::load(__DIR__ . DS . 'template.php');
    }
  );
}
return false;
