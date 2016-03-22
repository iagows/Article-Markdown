$(function() {
	var editor = byId('input-text');
	editor.onkeyup = updatePreview;

	var dialog, page;
	page = "http://assemble.io/docs/Cheatsheet-Markdown.html";
	dialog = $("<div></div>")
		.html('<iframe style="border: 0; " src="' + page + '" width="100%" height="100%"></iframe>')
		.dialog({
			title: "Cheatsheet",
			autoOpen: false,
			dialogClass: 'dialog_fixed,ui-widget-header',
			modal: true,
			height: 500,
			width: 700,
			minWidth: 400,
			minHeight: 400,
			draggable: true,
			buttons: {
				"Ok": function() {
					dialog.dialog("close");
				}
			}
    	});

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
	}).click(function(){
		createImageTable();
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
	$("#others").buttonset();

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

	$("#cheat").click(function () {
		dialog.dialog("open");
	});

	updatePreview();
	pageScroll();
});

function createImageTable()
{
	var img = "\n\n| ![](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png) |\n";
	var line1 = "| :---: |\n";
	var sub = "| **Image num**: texto qualquer. |\n";

	var total = img + line1 + sub;

	add(total)
}

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
	var receiver = byId('text-receiver');
	var editor = byId('input-text');
	var text = editor.value;
	
	text = marked(text);

	receiver.innerHTML = text;
	Preview.Update();
	/*
	editor.style.height = "1px";
    editor.style.height = (25+editor.scrollHeight)+"px";*/
}

function pageScroll()
{
	// Stick the #nav to the top of the window
    var nav = $('#nav');
    var navHomeY = nav.offset().top;
    var isFixed = false;
    var $w = $(window);
    $w.scroll(function() {
        var scrollTop = $w.scrollTop();
        var shouldBeFixed = scrollTop > navHomeY;
        if (shouldBeFixed && !isFixed) {
            nav.css({
                position: 'fixed',
                top: 0,
                left: nav.offset().left,
                width: nav.width()
            });
            isFixed = true;
        }
        else if (!shouldBeFixed && isFixed)
        {
            nav.css({
                position: 'static'
            });
            isFixed = false;
        }
    });
}