/** @jsx React.DOM */

var React = require('react/addons');
var Baobab = require('baobab');

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
}


var tree = new Baobab({
  phrases: [{key: 0,
  			text: 'John'},
  			{key: 1,
  			text: 'Jill'}],
  information: {
    title: 'My fancy App'
  }
});

var AddPhrase = React.createClass({
	mixins: [tree.mixin],
  	cursor: ['phrases'],
  	handleSubmit: function(e) {
  		e.preventDefault();
  		var phrase = React.findDOMNode(this.refs.phrase).value.trim();
  		if (!phrase) {
  			return;
  		}
  		var length = this.cursor.get().length;
  		this.cursor.push({key: length, text: phrase});
  		speak(phrase);
  		return;
  	},
  	render: function() {
  		return (
  			<form className="commentForm" onSubmit={this.handleSubmit}>
        		<input type="text" placeholder="Say something..." ref="phrase" />
        		<input type="submit" value="Speak" />
      		</form>
      	);
  	}
});

var Phrase = React.createClass({
	handleClick: function(event) {
		speak(this.props.phrase.text);
	},
	render: function() {
		var phrase = this.props.phrase;
		return <li draggable="true"
					onDragEnd={this.dragEnd}
					onDragStart={this.dragStart}
					onClick={this.handleClick}>
					<a href="#">{phrase.text} - {phrase.key}</a>
				</li>;
	}
});

var PhraseList = React.createClass({
  mixins: [tree.mixin],
  cursor: ['phrases'],
  render: function() {

    var data = this.cursor.get();

    return (
    	<ul>
    		{data.map(function(phrase) {
    			return <Phrase data-id={phrase.key} key={phrase.key} phrase={phrase}/>;
    		})}
		</ul>
	);
  }
});

var App = React.createClass({
	render: function() {
		return (
			<div>
				<div align="center">
					<AddPhrase />
				</div>
				<div id="words">
					<PhraseList />
				</div>
			</div>
		);
	}
});

React.render(<App />, document.getElementById("content"));

var placeholder = document.createElement("li");
placeholder.className = "placeholder";
