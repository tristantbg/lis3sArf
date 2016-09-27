<?php if(!defined('KIRBY')) exit ?>

title: Video Project
files:
  type:
    - video
    - image
  width: 6000
  height: 6000
  size: 12000000
pages: false
fields:
  title:
    label: Title
    type:  text
    width: 3/4
  date:
    label: Year
    type:  date
    format: YYYY
    width: 1/4
  featured:
    label: Featured image
    type: image
    width: 3/4
  slidersize:
    label: Slider size
    type: select
    required: true
    options:
      1: 1
      2: 2
      3: 3
      4: 4
      5: 5
      6: 6
    default: 1
    width: 1/4
  text:
    label: Description
    type: textarea
  gallery: 
    label: Videos
    type: structure
    style: table
    fields: 
      media: 
        label: Video file
        type: select
        options: files