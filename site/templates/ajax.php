<?php
if(kirby()->request()->ajax()) {
	$page = page($uri);
	$site = site();
	?>

	<div class="inner" id="<?= $page->uid() ?>">
	<?php if ($page->content()->name() == "article"): ?>
		<h2><?= $page->title()->html() ?><?php if (!$page->subtitle()->empty()){ echo ', ' . $page->subtitle()->html(); } ?></h2>
	<?php endif ?>
	<?php if ($page->content()->name() == "news"): ?>
		<?php $articles = $page->children()->visible(); ?>
		<?php foreach ($articles as $key => $article): ?>
			<div class="article">
				<h2><?= $article->title()->html() ?><?php if (!$article->subtitle()->empty()){ echo ', ' . $article->subtitle()->html(); } ?></h2>
				<?= $article->text()->kt() ?>
			</div>
		<?php endforeach ?>
	<?php else: ?>
		<?= $page->text()->kt() ?>
	<?php endif ?>
	</div>

<?php
}
else {
	header::status('404');
}