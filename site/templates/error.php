<?php snippet('header') ?>

<?php
$about = $pages->find('about');
$aboutPages = $about->children()->visible();
$works = $pages->find('works');
$pname = $page->content()->name();
?>

<?php snippet('about-menu', array('about' => $about, 'aboutpages' => $aboutPages, 'works' => $works)) ?>

<div id="page_content">
	<div class="inner">
		<?= $page->text()->kt() ?>
	</div>
</div>

<?php snippet('footer') ?>