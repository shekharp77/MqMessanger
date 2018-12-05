$(document).ready(function () {
  	$('#con').fadeOut(0);
	var publish = "ababcdcd*&^%092982";
	var subscribe = "ababcdcd*&^%092982";
	$('#con').click(function(){
		var topic = $('#topic').val();
		var target = $('#targettopic').val();
		subscribe = subscribe + topic;
		publish = publish + target;
		client.subscribe(subscribe);
		console.log(subscribe)
	});
  // Create a client instance: Broker, Port, Websocket Path, Client ID
  client = new Paho.MQTT.Client("iot.eclipse.org", Number(80), "/ws" ,"kincaiocaoicnao");
   
  // set callback handlers
  client.onConnectionLost = function (responseObject) {
      console.log("Connection Lost: "+responseObject.errorMessage);
  }
   
  client.onMessageArrived = function (message) {
    console.log("Message Arrived: "+message.payloadString);
  }
   
   client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  // Called when the connection is made
  function onConnect(){
      console.log("Connected!");
      $('#con').fadeIn(0);
  }

$("#box").animate({ scrollTop: $('#box').prop("scrollHeight")}, 1000);
  
  //-----------------------------------------------------------------------------------------------
  $(document).keypress(function(e) {
    if(e.which == 13) {
      var input=$('#msg').val();
      //if(input != ""){
      
        $('#box').append(
          "<table>"+
            "<tr>"+
            "<td style='margin-bottom:0%;'>"+
              "<img src='user.png'>"+
            "</td>"+
            "<td style='width:100%'>"+
              "<div class = 'jumbotron you'>"
              +input+
              "</div>"+
              "</td>"+
            "</tr>"+
          "</table>"
            );     
        $('html,body').animate({ scrollTop: 9999 }, 'slow');
      message = new Paho.MQTT.Message(input);
      // message.destinationName = "chat/dev";
      client.send(publish,input,2);
      $('#msg').val(" ");
      console.log(publish)
    //}
    }

});
  
    
   
  // Connect the client, providing an onConnect callback
  client.connect({
      onSuccess: onConnect, 
      mqttVersion: 3,
      keepAliveInterval:120
  
  })
  
  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
      $('#con').fadeOut(0);
    }
  }
  
  // called when a message arrives
  function onMessageArrived(message) {
    console.log(message.payloadString);
    $('#box').append(
          "<table>"+
            "<tr>"+
            "<td style='width:100%'>"+
              "<div class = 'jumbotron reply'>"
              +message.payloadString+
              "</div>"+
              "</td>"+
              "<td style='margin-bottom:0%;'>"+
              "<img src='bot.png'>"+
            "</td>"+
            "</tr>"+
          "</table>"
            );  
    $('html,body').animate({ scrollTop: 9999 }, 'slow');
  }
});