<?php snippet('header') ?>

<?php
$aboutPages = $page->children()->visible();
$works = $pages->find('works');
?>

<?php snippet('about-menu', array('about' => $page, 'aboutpages' => $aboutPages, 'works' => $works)) ?>

<div id="page_content">
</div>

<?php snippet('footer') ?>