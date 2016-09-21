<?php snippet('header') ?>

<?php
$works = $pages->find('works');
$gallery = $page->gallery()->toStructure();
?>

<div class="slider size-<?= $page->slidersize() ?>">
	<?php foreach($gallery as $key => $imagename): ?>
			<?php $image = $page->image($imagename) ?>
				<?php 
				$srcset = '';
				for ($i = 200; $i <= 1200; $i += 200) $srcset .= resizeOnDemand($image, $i) . ' ' . $i . 'w,';
					?>

				<img 
				class="img-container lazyimg"
				srcset="<?php echo $srcset ?>" 
				data-sizes="auto" 
				data-optimumx="1.2"
				data-fadeDuration="3"
				data-fadeWidth=".1"
				alt="<?= site()->title()->html().' — '.page()->title()->html() ?>" />
				
				<noscript>
					<img src="<?= resizeOnDemand($image, 1500) ?>" alt="<?= site()->title()->html().' — '.page()->title()->html() ?>" 
				width="auto" height="100%" />
				</noscript>
	<?php endforeach ?>
</div>

<span class="back">
	<h2><a href="<?= $works->url() ?>">Back</a></h2>
</span>

<?php snippet('footer') ?>