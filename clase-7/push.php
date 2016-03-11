<?PHP
  function sendMessage(){
    $content = array(
      "en" => 'Sigle Device'
      );

    $fields = array(
      'app_id' => "db348c06-c2c5-4411-b756-734654ec37ca",
      //'included_segments' => array('All'),
      'include_player_ids' => ['f05cee59-abc9-4764-a464-39b31546e869'],
      'data' => array("foo" => "bar"),
      'contents' => $content
    );

    $fields = json_encode($fields);
    print("\nJSON sent:\n");
    print($fields);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json',
                           'Authorization: Basic OGU4YWZhYzItZjFjYy00YTVjLWIwNTUtNTU4MGYzMDNiMWVl'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
  }

  $response = sendMessage();
  $return["allresponses"] = $response;
  $return = json_encode( $return);

  print("\n\nJSON received:\n");
  print($return);
  print("\n");
?>
