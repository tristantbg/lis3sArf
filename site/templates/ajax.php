<?php
if(kirby()->request()->ajax()) {
	$page = page($uri);
	$site = site();
	$pname = $page->content()->name();
	?>

	<div class="inner<?php if ($pname == "article"){ echo ' article'; } ?>" id="<?= $page->uid() ?>">
	<?php if ($pname == "article"): ?>
		<div class="stickytitle">
		<h2><?= $page->title()->html() ?><?php if (!$page->subtitle()->empty()){ echo ', ' . $page->subtitle()->html(); } ?></h2>
		</div>
	<?php endif ?>
	<?php if ($pname == "news"): ?>
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