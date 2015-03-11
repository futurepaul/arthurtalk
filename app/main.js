// Get the 'speak' button
var button = document.getElementById('speak');

var clearButton = document.getElementById('clear');

// Get the text input element.
var speechMsgInput = document.getElementById('speech-msg');

// Create a new utterance for the specified text and add it to
// the queue.
function speak(text) {
  // Create a new instance of SpeechSynthesisUtterance.
	var msg = new SpeechSynthesisUtterance();
  	var voices = window.speechSynthesis.getVoices();
  // Set the text.
	msg.text = text;
  
  // Set the attributes.
    msg.pitch = 1;
	msg.rate = 0.75;
//	msg.voice = voices[10];
	msg.voiceURI = 'native';

  // Queue this utterance.
	window.speechSynthesis.speak(msg);
	console.log(msg.rate);
}

$("form").submit(function(e) {
e.preventDefault();
// rest of logic
});

// Set up an event listener for when the 'speak' button is clicked.
button.addEventListener('click', function(e) {
	if (speechMsgInput.value.length > 0) {
		speak(speechMsgInput.value);
		console.log(speechMsgInput.value);
		$("#words").append('<a class="draggable" href="#">' + speechMsgInput.value + '</a>');
		dragify();
	}	
});

clearButton.addEventListener('click', function(e) {
	speechMsgInput.value = "";
});

$("#word .draggable").click(function() {
	var text = $(this).text();
	console.log(text);
});

var dragify = function() {
	$('.draggable').draggable({
    revert: true,
    helper: 'clone'
	});
};

$("#speech-msg").droppable({
    drop: function (event, ui) {
    	var current = this.value;
        this.value = current + " " + $(ui.draggable).text();
        autoheight($("#speech-msg"));
        speak(speechMsgInput.value);
    }
});

function autoheight(a) { $(a).height(20); $(a).height($(a).prop('scrollHeight') + 20); }






