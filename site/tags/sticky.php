<?php

kirbytext::$tags['sticky'] = array(
  'html' => function($tag) {
    return '<div class="stickytitle"><h2>'. $tag->attr('sticky') .'</h2></div>';
  }
);