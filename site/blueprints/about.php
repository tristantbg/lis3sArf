<?php if(!defined('KIRBY')) exit ?>

title: About
files: false
pages:
  template:
    - project
    - page
    - feed
    - news
deletable: false
fields:
  title:
    label: Title
    type:  text
  text:
    label: Introduction
    type:  textarea
  awards:
    label: Awards
    type: structure
    style: table
    fields:
      year: 
        label: Year
        type:  text
      text: 
        label: Text
        type:  textarea
  books:
    label: Books
    type: structure
    entry: >
      <table style="width:100%; font-size: 11px">
      	<tr>
      		<td style="width:25%">Image</td>
      		<td style="width:25%">Year</td>
      		<td style="width:25%">Text</td>
      	</tr>
      	<tr>
      		<td style="width:25%"><img src="{{_fileUrl}}{{content}}" width="60px"/><br>{{content}}</td>
      		<td style="width:25%">{{year}}</td>
      		<td style="width:25%">{{text}}</td>
      	</tr>
      </table>
    fields:
      content: 
        label: Image
        type:  image
        width: 1/2
      year: 
        label: Year
        type:  text
      text: 
        label: Text
        type:  text
  texts:
    label: Interviews, Texts & Reviews
    type: structure
    style: table
    fields:
      year: 
        label: Year
        type:  text
      text: 
        label: Text
        type:  textarea
  contact:
    label: Contact
    type:  textarea
  blog:
    label: Blog
    type:  textarea
  credits:
    label: Credits
    type:  textarea