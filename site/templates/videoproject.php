<?php snippet('header') ?>

<?php
$works = $pages->find('works');
$gallery = $page->gallery()->toStructure();
$videolist = [];
?>

<div class="slider size-<?= $page->slidersize() ?>">
<span class="loading"><strong>Loading…</strong></span>
	
		<div class="videoContainer">

		<video id="videoPlayer" controls loop preload="auto" poster="<? $poster = $page->featured(); if(!$poster->empty()) { resizeOnDemand($page->image($page->featured()), 1200); } ?>" height="100%" width="auto" >
				<source src="<?= $gallery->first()->media()->toFile()->url() ?>" type="video/mp4" />
				<p>Your browser does not support the video tag.</p>
			</video>
			<div class="control">
				<div class="btmControl">
				<div class="progress-bar">
						<div class="progress">
							<span class="bufferBar"></span>
							<span class="timeBar"></span>
						</div>
					</div>
					<div class="btnPlay btn" title="Play/Pause video"><span class="icon-pause"></span></div>
					
				<!--<div class="volume" title="Set volume">
					<span class="volumeBar"></span>
				</div>-->
				<div class="sound sound2 btn" title="Mute/Unmute sound"><span class="icon-sound"></span></div>
				<div class="btnFS btn" title="Switch to full screen"><span class="icon-fullscreen"></span></div>
			</div>
			
		</div>
	</div>
</div>

<?php 
foreach($gallery as $key => $video):
	array_push($videolist, $video->media()->toFile()->url());
endforeach 
?>

<script>
var videolist =<?= json_encode($videolist) ?>;
</script>

<?php snippet('footer') ?>