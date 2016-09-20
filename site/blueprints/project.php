<?php if(!defined('KIRBY')) exit ?>

title: Project
files: true
pages: false
fields:
  date:
    label: Year
    type:  date
    format: DD/MM/YYYY
    width: 1/4
  title:
    label: Title
    type:  text
    width: 2/4
  textmenu:
    label: Text menu
    type: select
    options:
      text: Text
      credits: Credits
    default: text
    width: 1/4
  category:
    label: Category
    type: text
    width: 1/4
  subtitle:
    label: Subtitle
    type: text
    width: 3/4
    offset: 1/3
    help: Only for exhibitions
  featured:
    label: Featured image
    type: image
    width: 1/4
  thumbsize:
    label: Thumb size
    type: select
    options:
      small: Small
      medium: Medium
      mediumleft: Medium Left
      mediumright: Medium Right
      large: Large
      largeleft: Large Left
      largeright: Large Right
    default: small
    width: 1/4
  offset:
    label: Top offset
    type: number
    help: Leave empty to align on top
    width: 1/4
  speed:
    label: Parallax speed
    type: number
    step: 10
    help: Leave empty to disable parallax
    width: 1/4
  text:
    label: Description
    type: textarea
  medias: 
    label: Images
    type: gallery