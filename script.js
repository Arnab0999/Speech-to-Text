var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();
var listening = 'I am Listening...';
var noWork = 'Not listening. \n Press Speak button and say anything.';
var stListen = 'Press Stop button to stop Listening.';
var Textbox = document.getElementById('textbox');
var instructions = document.getElementById('instructions');
var bottomInstr = document.getElementById('bottom');
var Content = '';

recognition.continuous = true;

recognition.onresult = function(event) {

  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;
 
    Content += transcript;
    Textbox.value = Content;
  
};
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
recognition.onstart = function() {
  instructions.innerHTML=listening; 
  bottomInstr.innerHTML=stListen;
}

recognition.onspeechend = function() {
  instructions.innerHTML=noWork;
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.innerHTML='Try again.';  
  }
}

$('#start-btn').on('click', function(e) {
  if (Content.length) {
    Content += ' ';
    Textbox.value = Content;
  }
  recognition.start();
  addvalue();
});
$('#stop-btn').on('click',function(e){
  recognition.stop();
  instructions.innerHTML=noWork;
  bottomInstr.innerHTML='';
})
$('#textbox').on('input', function(e){
  Content = Textbox.value;
})
