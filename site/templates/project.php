<?php snippet('header') ?>

<?php
$works = $pages->find('works');
$gallery = $page->gallery()->toStructure();
$placeholder = $site->image($site->placeholder());
?>

<div class="slider size-<?= $page->slidersize() ?>">
<span class="loading"><strong>Loading…</strong></span>
	<?php foreach($gallery as $key => $imagename): ?>
			<?php $image = $page->image($imagename) ?>
				<?php 
				$srcset = '';
				for ($i = 500; $i <= 6000; $i += 500) $srcset .= resizeOnDemand($image, $i) . ' ' . $i . 'w,';
					?>

				<img 
				class="lazyimg<?php if ($key < 3){ echo ' lazyload'; } ?>"
				<?php if ($key == 0): ?>
				src="<?= thumb($image, array('width' => 200))->url() ?>" 
				<?php endif ?>
				data-src=<?= resizeOnDemand($image, 2000) ?> 
				data-srcset="<?php echo $srcset ?>" 
				data-sizes="auto" 
				data-optimumx="1.5"
				data-fadeDuration="<?= $page->fadeduration()->value() ?>"
				data-fadeWidth=".05"
				height="100%" 
				width="auto" 
				alt="<?= site()->title()->html().' — '.page()->title()->html() ?>" />
				
				<noscript>
					<img src="<?= resizeOnDemand($image, 1500) ?>" alt="<?= site()->title()->html().' — '.page()->title()->html() ?>" 
				width="auto" height="100%" />
				</noscript>
	<?php endforeach ?>
</div>

<?php snippet('footer') ?>