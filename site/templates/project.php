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
				for ($i = 250; $i <= 6000; $i += 250) $srcset .= resizeOnDemand($image, $i) . ' ' . $i . 'w,';
					?>

				<img 
				class="lazyimg<?php if ($key < 2){ echo ' lazyload'; } ?>"
				<?php if ($key == 0): ?>
				src="<?= thumb($image, array('width' => 200))->url() ?>" 
				<?php endif ?>
				data-src=<?= resizeOnDemand($image, 4000) ?> 
				data-srcset="<?php echo $srcset ?>" 
				data-sizes="auto" 
				data-optimumx="1.8"
				data-fadeDuration="2.3"
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