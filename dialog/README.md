Dialog - a jQuery dialog plugin
===============================
Dialog is a small jQuery plugin to create (modal) dialog windows.
It can be used to generate custom designed alert or confirm messages.

How to use
----------

Minimal configuration

**Javascript**
	
	$(document).ready(function() {
		var dialog = $.dialog(title: 'Hello world!', text: 'Hi there! I\'m a default dialog', icon: 'info');
		dialog.show();
	});


ALERT BOX
---------

**Javascript**

	$(document).ready(function() {
                var dialog = $.dialog({
			title: 'Alert!',
			text: 'Alert message goes here',
			icon: 'error'
		});
		dialog.show();
	});


CONFIRM BOX
-----------

**Javascript**

	$(document).ready(function() {
		var dialog = $.dialog({
			title: 'Are you sure?',
			text: 'Message goes here...',
			icon: 'help',
			buttons: ['Yes', 'No'],
			callback: function(clk) {
				console.log('You clicked ' + clk);
			}
		}).show();
	});


PARAMETERS
----------

You can set this parameters:

**buttons**
Type: _Object_

Set button text. Set _null_ or [] for no buttons.

Default: _['Ok', 'Cancel']_

**callback**
Type: _function_

Set a callback function to determine which button has been clicked. Set _null_ for empty.

Default: _null_

**closable**
Type: _bool_

Is the closable by close button and/or click on modal layer. Overwrites _closeButton_ and _overlayClose_. Does not affect button clicks.

Default: _false_

**closeButton**
Type: _bool_

Show close button? Closable overwrites closeButton.

Default _true_

**constrain**
Type: _bool_

Constrain (draggable) dialog within window boundries.

Default: _true_

**draggable**
Type: _bool_

Is the dialog draggable across the window?

Default: _true_

**icon**
Type: _string_

What kind of icon is shown? Set to _null_ or non available for no icon.

Standard available:
* error
* help
* info
* warning

Extendable in css by adding

	.dialog .dialog-icon-yourIconName {
		background-image: url(toYourIcon.png);
		/* more CSS */
	}

Default: _null_

**modal**
Type: _bool_

Is the dialog modal?

Default: _true_

**onClose**
Type: _function_

Function to run when the dialog closes. Set to _null_ for empty function.

Default: _null_

**overlayClose**
Type: _bool_

Close the dialog when clicking on the modal layer. closable overwrites overlayClose.

Default: _true_

**text**
Type: _string_

Text for the dialog.

Default: _''_

**title**
Type: _string_

Text for the dialog title. showTitle overwrites title.

Default: _''_

**showTitle**
Type: _bool_

Show title bar in top of dialog. showTitle overwrites title.

Default: _true_

**width**
Type: _int_

Width of the dialog in pixels. Min value is 200.

Default: _400_
