<?php

/**
 * Paragraph Plugin
 *
 */
kirbytext::$pre[] = function($kirbytext, $text) {

  $text = preg_replace_callback('!\(paragraphs(…|\.{3})\)(.*?)\((…|\.{3})paragraphs\)!is', function($matches) use($kirbytext) {

    $paragraphs = $matches[2];

    return '<div class="paragraphs">'. kirbytext($paragraphs) .'</div>';

  }, $text);

  return $text;

};