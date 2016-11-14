# Aristotheme Support Widget
Displays a widget in the kirby panel's dashboard showing support options.

## Options
All available options can be set in your config file in `/site/config/config.php` like this:

```php
c::set('option', 'value');
```

available options are:

Option                   | Type    | Description
-------------------------|---------|------------
aristotheme.widget       | Boolean | Display the Aristotheme widget in the dashboard.
aristotheme.widget.title | String  | The Widget Title
aristotheme.widget.links | array() | The links to be displayed in the widget.

## Adding links

Links can be setup with the `aristotheme.widget.links` option in your `/site/config/config.php`
Links are simple associative arrays with 3 fields required fields: **label**, **text** and **href**.

**Example:**

```php
c::set('aristotheme.widget.links', array(
  array(
    "label" => "Support",
    "text" => "On our Forum",
    "href" => "http://forum.example.com/support"
  ),
  array(
    ...
  )
));
```
