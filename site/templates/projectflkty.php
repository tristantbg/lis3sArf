<?php snippet('header') ?>

<?php
$works = $pages->find('works');
$gallery = $page->gallery()->toStructure();
$imgNb = $gallery->count();
?>

<div class="slider size-<?= $page->slidersize() ?>">

<?php foreach ($gallery as $index => $slide): ?>

	<div class="gallery_cell<?php if ($index == 0) {echo ' is-selected';} ?>" style="z-index: <?= $imgNb - $index ?>">
			<img class="content lazyimg" alt="<?php  echo $page->title()->html().' — © '.$page->date("Y").' '.$site->title(); ?>" data-flickity-lazyload="<?php echo resizeOnDemand($page->image($slide), 1000, true) ?>" height="100%" width="auto" />
			<noscript>
				<img class="content" alt="<?php  echo $page->title()->html().' — © '.$page->date("Y").' '.$site->title(); ?>" src="<?php echo resizeOnDemand($page->image($slide), 1000, true) ?>" height="100%" width="auto" />
			</noscript>	
	</div>

<?php endforeach ?>

</div>

<span class="back">
	<h2><a href="<?= $works->url() ?>">Back</a></h2>
</span>

<?php snippet('footer') ?>