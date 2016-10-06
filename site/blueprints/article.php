<?php if(!defined('KIRBY')) exit ?>

title: Article
pages: false
files: false
fields:
  title:
    label: Title
    type:  text
    width: 2/3
  italic:
    label: Title in italic ?
    type: toggle
    text: yes/no
    default: yes
    width: 1/3
  subtitle:
    label: Subtitle
    type: text
  text:
    label: Text
    type:  textarea