<?php
// API access key from Google API's Console
define( 'API_ACCESS_KEY', 'AIzaSyApP-6_7uX0b0ugqe_b8GuPq4waPCKEVZM' );
$registrationIds = array( 'f8bKnAyXV08:APA91bF1a_RZb9KbUPqNb-uzl_5goNObR02GAvac9K-tOO7t8QocW8nVE2UJ0ExTHlMAD5qb8IlD8VvlUwD3ALArXz2JYxoypY0O9WDdYgOl-lXSKdh7WyV-qY0TYnS-K36635rzFvYp' );
// prep the bundle
$msg = array
(
	'message' 	=> 'here is a message. message',
	'title'		=> 'This is a title. title',
	'subtitle'	=> 'This is a subtitle. subtitle',
	'tickerText'	=> 'Ticker text here...Ticker text here...Ticker text here',
	'vibrate'	=> 1,
	'sound'		=> 1,
	'largeIcon'	=> 'large_icon',
	'smallIcon'	=> 'small_icon'
);
$fields = array
(
	'registration_ids' 	=> $registrationIds,
	'data'			=> $msg
);

$headers = array
(
	'Authorization: key=' . API_ACCESS_KEY,
	'Content-Type: application/json'
);

$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
$result = curl_exec($ch );
curl_close( $ch );
echo $result;
