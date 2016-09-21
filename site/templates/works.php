<?php snippet('header') ?>

<?php
$projects = $page->children()->visible();
$about = $pages->find('about');
?>

<span class="menu">

<?php foreach ($projects as $key => $project): ?>
	
	
		<h2>
			<a href="<?= $project->url() ?>">
				<?= $project->title()->html() ?><?php if ($project->date()){ echo ', ' . $project->date('Y'); } ?>
			</a>
		</h2>
	

<?php endforeach ?>

</span>

<span class="switch">
	<h2><a href="<?= $about->url() ?>"><?= $about->title()->html() ?></a></h2>
</span>

<?php snippet('footer') ?>