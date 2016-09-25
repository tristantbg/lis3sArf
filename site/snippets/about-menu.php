<span class="menu">

	<?php foreach ($aboutpages as $key => $page): ?>
		
		<?php $pname = $page->content()->name() ?>
		
		<?php if ($pname == 'default'): ?>
		
			<h2>
				<a href="<?= $page->url() ?>" data-title="<?= $page->title()->html() ?>" data-target="page">
					<?= $page->title()->html() ?>
				</a>
			</h2>

		<?php elseif ($pname == 'feed' || $pname == 'news'): ?>

			<?php 
			$articles = $page->children()->visible();
			if ($articles->count() > 0): 
			?>
				<?php if ($pname == 'feed'): ?>
					
					<h2 class="feed">
						<?= $page->title()->html() ?>
					</h2>
					<div class="articles">
						<?php foreach ($articles as $key => $article): ?>
							<div class="article">
								<a href="<?= $article->url() ?>" data-title="<?= $article->title()->html() ?>" data-target="page">
									<em><?= $article->title()->html() ?></em><?php if (!$article->subtitle()->empty()){ echo ', ' . $article->subtitle()->html(); } ?>
								</a>
							</div>
						<?php endforeach ?>
					</div>

				<?php else: ?>

					<h2>
						<a href="<?= $page->url() ?>" data-title="<?= $page->title()->html() ?>" data-target="page">
							<?= $page->title()->html() ?>
						</a>
					</h2>

				<?php endif ?>

			<?php endif ?>

		<?php endif ?>

	<?php endforeach ?>

</span>

<span class="switch">
	<h2><a href="<?= $works->url() ?>"><?= $works->title()->html() ?></a></h2>
</span>