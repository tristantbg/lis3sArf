<?php
// link tag
kirbytext::$tags['link'] = array(
  'attr' => array(
    'text',
    'class',
    'role',
    'title',
    'rel',
    'lang',
    'target',
    'popup'
  ),
  'html' => function($tag) {

    $link = url($tag->attr('link'), $tag->attr('lang'));
    $text = $tag->attr('text');

    if(empty($text)) {
      $text = $link;
    } 

    if(str::isURL($text)) {
      $text = url::short($text);
    }

    return html::a($link, $text, array(
      'rel'    => $tag->attr('rel'),
      'class'  => $tag->attr('class'),
      'role'  => $tag->attr('role'),
      'title'  => $tag->attr('title'),
      'target' => "_blank",
    ));

  }
);