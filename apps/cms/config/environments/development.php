<?php
/**
 * Configuration overrides for WP_ENV === 'development'
 */

use Roots\WPConfig\Config;
use function Env\env;

Config::define('SAVEQUERIES', true);
Config::define('WP_DEBUG', true);
Config::define('WP_DEBUG_DISPLAY', true);
Config::define('WP_DEBUG_LOG', env('WP_DEBUG_LOG') ?? true);
Config::define('WP_DISABLE_FATAL_ERROR_HANDLER', true);
Config::define('SCRIPT_DEBUG', true);
Config::define('DISALLOW_INDEXING', true);
Config::define('WP_HOME', env('HEADLESS_URL'));

ini_set('display_errors', '0');

// Enable plugin and theme updates and installation from the admin
Config::define('DISALLOW_FILE_MODS', false);
Config::define( 'GRAPHQL_JWT_AUTH_SECRET_KEY', env('GRAPHQL_JWT_AUTH_SECRET_KEY') );
Config::define( 'HEADLESS_URL', env('HEADLESS_URL') );
Config::define( 'HEADLESS_SECRET', env('HEADLESS_SECRET') );
Config::define( 'GRAPHQL_JWT_AUTH_CORS_ENABLE', true);
Config::define( 'GRAPHQL_API_AUTH_SECRET_KEY', true);


