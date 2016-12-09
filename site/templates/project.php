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
	data-width-mobile-landscape="50" 
	data-width-mobile="100" 
	<?php elseif($slidersize == '2'): ?>
	data-height-desktop="80" 
	data-width-mobile-landscape="50" 
	data-width-mobile="120" 
	<?php elseif($slidersize == '3'): ?>
	data-height-desktop="100" 
	data-width-mobile-landscape="70" 
	data-width-mobile="140" 
	<?php elseif($slidersize == '4'): ?>
	data-height-desktop="120" 
	data-width-mobile-landscape="70" 
	data-width-mobile="180" 
	<?php elseif($slidersize == '5'): ?>
	data-height-desktop="140" 
	data-width-mobile-landscape="100" 
	data-width-mobile="220" 
	<?php elseif($slidersize == '6'): ?>
	data-height-desktop="160" 
	data-width-mobile-landscape="120" 
	data-width-mobile="260" 
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
				class="lazyimg<?php if ($key < 2){ echo ' lazyload'; } if($key == 0) { echo ' displayed'; } ?>"
				<?php if ($key == 0): ?>
				src="<?= thumb($image, array('width' => 200))->url() ?>" 
				<?php endif ?>
				data-ratio="<?= $image->ratio() ?>" 
				data-src=<?= resizeOnDemand($image, 4000) ?> 
				data-srcset="<?php echo $srcset ?>" 
				data-sizes="auto" 
				data-optimumx="1.7"
				data-fadeDuration="<?= $site->fadeduration()->value() ?>"
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