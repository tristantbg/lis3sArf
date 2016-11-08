<?php snippet('header') ?>

<?php
$works = $pages->find('works');
$gallery = $page->gallery()->toStructure();
$first = $page->image($gallery->first());
$placeholder = $site->image($site->placeholder());
$slidersize = $page->slidersize();
?>

<div class="slider image size-<?= $slidersize ?>" 
	<?php if($slidersize == '1'): ?>
	data-height-desktop="60" 
	data-height-mobile="40" 
	<?php elseif($slidersize == '2'): ?>
	data-height-desktop="80" 
	data-height-mobile="60" 
	<?php elseif($slidersize == '3'): ?>
	data-height-desktop="100" 
	data-height-mobile="80" 
	<?php elseif($slidersize == '4'): ?>
	data-height-desktop="120" 
	data-height-mobile="100" 
	<?php elseif($slidersize == '5'): ?>
	data-height-desktop="160" 
	data-height-mobile="110" 
	<?php elseif($slidersize == '6'): ?>
	data-height-desktop="180" 
	data-height-mobile="110" 
	<?php endif ?>
	data-ratio="<?= $first->ratio() ?>"
>
<span class="loading"><strong>Loading</strong></span>
	<?php foreach($gallery as $key => $imagename): ?>
			<?php $image = $page->image($imagename) ?>
				<?php 
				$srcset = '';
				for ($i = 750; $i <= 6000; $i += 250) $srcset .= resizeOnDemand($image, $i) . ' ' . $i . 'w,';
					?>

				<img 
				class="lazyimg<?php if ($key < 2){ echo ' lazyload'; } ?>"
				<?php if ($key == 0): ?>
				src="<?= thumb($image, array('width' => 200))->url() ?>" 
				<?php endif ?>
				data-ratio="<?= $image->ratio() ?>" 
				data-src=<?= resizeOnDemand($image, 4000) ?> 
				data-srcset="<?php echo $srcset ?>" 
				data-sizes="auto" 
				data-optimumx="1.7"
				data-fadeDuration="2.2"
				data-fadeWidth=".08"
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