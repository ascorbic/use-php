export const bootstrapCode = (
  path = "/",
  method = "GET",
  _GET = {},
  _POST = {},
) =>
  /* php */ `<?php
ini_set('session.save_path', '/home/web_user');
$stdErr = fopen('php://stderr', 'w');
$errors = [];
fwrite($stdErr, isset($_SESSION) && json_encode(['session' => $_SESSION]) . "\n");

header_register_callback(function() use($stdErr){
	fwrite($stdErr, json_encode(['headers'=>headers_list()]) . "\n");
});
register_shutdown_function(function() use($stdErr){
	fwrite($stdErr, json_encode(['session_id' => session_id()]) . "\n");
	fwrite($stdErr, json_encode(['headers'=>headers_list()]) . "\n");
	fwrite($stdErr, json_encode(['errors' => error_get_last()]) . "\n");
	fwrite($stdErr, json_encode(['session' => $_SESSION]) . "\n");
});
set_error_handler(function(...$args) use($stdErr, &$errors){
	fwrite($stdErr, json_encode($args, JSON_PRETTY_PRINT) . "\n" );
});
$request = (object) json_decode(
	'${JSON.stringify({ path, method, _GET, _POST })}'
	, JSON_OBJECT_AS_ARRAY
);
parse_str(substr($request->_GET, 1), $_GET);
$_POST = $request->_POST;
$origin  = 'http://localhost:3333';
$docroot = '/preload/drupal-7.59';
$script  = 'index.php';
$path = $request->path;
$path = preg_replace('/^\\/php-wasm/', '', $path);
$_SERVER['SERVER_SOFTWARE'] = 'deno';
$_SERVER['REQUEST_URI']     = $path;
$_SERVER['REMOTE_ADDR']     = '127.0.0.1';
$_SERVER['SERVER_NAME']     = $origin;
$_SERVER['SERVER_PORT']     = 3333;
$_SERVER['REQUEST_METHOD']  = $request->method;
$_SERVER['SCRIPT_FILENAME'] = $docroot . '/' . $script;
$_SERVER['SCRIPT_NAME']     = $docroot . '/' . $script;
$_SERVER['PHP_SELF']        = $docroot . '/' . $script;
$_SERVER['DOCUMENT_ROOT']   = '/';
$_SERVER['HTTPS']           = '';
chdir($docroot);
`;
