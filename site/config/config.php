<?php

/*

---------------------------------------
License Setup
---------------------------------------

Please add your license key, which you've received
via email after purchasing Kirby on http://getkirby.com/buy

It is not permitted to run a public website without a
valid license key. Please read the End User License Agreement
for more information: http://getkirby.com/license

*/

c::set('license', 'put your license key here');
c::set('tuto.widget', true);
c::set('tuto.widget.title', true);

/*

---------------------------------------
Kirby Configuration
---------------------------------------

By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out http://getkirby.com/docs/advanced/options

*/

c::set('cache', false);
c::set('home', 'works');
c::set('oembed.lazyvideo', true);
c::set('typography', true);
c::set('typography.ordinal.suffix', false);
c::set('typography.fractions', false);
c::set('typography.hyphenation.minlength', 5);
c::set('typography.hyphenation.headings', false);
c::set('typography.hyphenation.allcaps', false);
c::set('typography.hyphenation.titlecase', false);
//c::set('thumbs.driver', 'im');
c::set('thumbs.quality', 100);
c::set('sitemap.exclude', array('error'));
c::set('sitemap.important', array('about'));

c::set('routes', array(
    array(
        'pattern' => '(:all)/ajax',
        'action'  => function($uri) {
          tpl::load(kirby()->roots()->templates() . DS . 'ajax.php', array('uri' => $uri), false );
        }
    ),
    array(
        'pattern' => 'about/texts',
        'action'  => function($uri,$uid) {
          $parent = page('about');
      		go($parent);
        }
    ),
	array(
		'pattern' => 'robots.txt',
		'action' => function () {
			return new Response('
				User-agent: *
				Disallow: /thumbs/
				Allow: /thumbs/works
				Disallow: /content/*.txt$
				Disallow: /kirby/
				Disallow: /site/
				Disallow: /*.md$
				Sitemap: ' . u('sitemap.xml'), 'txt');
		}
	)
));