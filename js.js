$(function() {
	var editor = byId('input-text');
	editor.onkeyup = updatePreview;
	//botões
	$("#link").button({
		icons: {
			primary: "ui-icon-link"
		},
		text: false
	});
	$("#image").button({
		icons: {
			primary: "ui-icon-image"
		},
		text: false
	});
	$("#referencia").button({
		icons: {
			primary: "ui-icon-tag"
		},
		text: false
	});

	$("#buttons").buttonset();
	$("#text-bts").buttonset();
	$("#list-bts").buttonset().next().buttonset();
	$("#more-bts").buttonset();

	$("#head-bt").click(function(){
		var opt = byId("headers");
		var text = opt.options[opt.selectedIndex].label;
		addAtLineBegining(text+ " ");
	});
	$("#headers").selectmenu();

	$("#negrito").click(function() {
		addAtSelection("**");
	});

	$("#italico").click(function() {
		addAtSelection("*");
	});

	$("#taxado").click(function() {
		addAtSelection("~~");
	});

	$("#linha").click(function() {
		addAtLineBegining("___\n");
	});

	$("#lista").click(function() {
		addAtLineBegining("* ");
	});


	$("#ordenada").click(function() {
		addAtLineBegining("1. ");
	});

	$("#citacao").click(function() {
		addAtLineBegining("> ");
	});

});

function addAt(string, position)
{
	var input = byId("input-text");
	var content = input.value;
	var newText = content.substring(0, position)+ string + content.substring(position);
	input.value = newText;
	//movendo a posição do cursor
	if(input.setSelectionRange)
	{
		input.focus();
		input.setSelectionRange(position,position);
	}
	updatePreview();
}

function addAtLineBegining(string)
{
	var input = byId("input-text");
	var content = input.value;
	var temp = content.substring(0, input.selectionStart);
	var index = temp.lastIndexOf("\n");
	addAt(string, index+1);
}

function add(string)
{
	var input = byId("input-text");
	addAt(string, input.selectionStart);
}

function addAtSelection(string)
{
	var input = byId("input-text");
	var start = input.selectionStart;
	var end = input.selectionEnd;

	if('selectionStart' in input)
	{
		if(start!=end)
		{
			addAt(string, end);
			addAt(string, start);
		}
		else
		{
			addAt(string+"your text here"+string, start);
		}
	}
}

function byId(id)
{
	return document.getElementById(id);
}

function updatePreview()
{
	var receiverDiv = byId('text-receiver');
	var editor = byId('input-text');
	var text = editor.value;
	text = marked(text);

	receiverDiv.innerHTML = text;
}
