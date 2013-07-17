(function($) {
    var dialog = {
        close: function() {
            self = this;
            
            if (typeof self.options.onClose === 'function') {
                self.options.onClose(self);
            }
            
            this.container.animate({
                opacity: 'hide'
            },200);
        },
        
        createButtons: function(buttons) {
            return $.map(buttons, function(button) {
                return '<input type="button" value="' + button + '" />';
            }).join('');
        },
        
        init: function(text, opts) {
            this.options = $.extend({}, $.dialog.defaults, opts);
            this.options
            this.text = text;
            
            this.container = $('<div>', {
                'class': 'dialog',
                'style': 'display: none; zIndex: 100001'
            });
            
            var domNodes = {
                modal: $('<div>', {
                    'class': 'dialog-modal',
                    'style': 'display: none; zIndex: 100000'
                }),
                title: $('<div>', {
                    'class': 'dialog-title'
                }),
                closeButton: $('<div>', {
                    'class': 'dialog-close'
                }),
                content: $('<div>', {
                    'class': 'dialog-content'
                }),
                buttons: $('<div>', {
                    'class': 'dialog-buttons'
                })
            }
            
            domNodes.title.html(this.options.title);
            domNodes.content.html(text);
            domNodes.buttons.html(this.createButtons(this.options.buttons));
            
            var self = this;
            
            if (!self.options.showTitle) {
                domNodes.title.hide();
            }
            
            if (self.options.modal) {
                self.modal = domNodes.modal;
                self.modal.appendTo('body');
            }
            
            domNodes.closeButton.html('X');
            
            domNodes.closeButton.on('click', function() {
                self.close();
            });
            
            domNodes.buttons.find('input').on('click', function() {
                if (typeof self.options.callback === 'function') {
                    self.options.callback.call(self, $(this).val());
                }
                self.close();
            });
            
            domNodes.closeButton.appendTo(this.container);
            domNodes.title.appendTo(this.container);
            domNodes.content.appendTo(this.container);
            domNodes.buttons.appendTo(this.container);
        },
        
        show: function() {
            var self = this;
            
            if (self.options.modal) {
                self.modal.show();
            }
            
            this.container.appendTo('body').animate({
                top: $(window).height() / 2 - this.container.outerHeight() / 2,
                left: $(window).width() / 2 - this.container.outerWidth() / 2
            },1).animate({
                opacity: 'show'
            },300);
        }
    };
    
    $.dialog = function(text,options) {
        var dialogWindow = Object.create(dialog);
        dialogWindow.init(text,options);
        return dialogWindow;
    };
    
    $.dialog.defaults = {
        buttons: [
            'Ok',
            'Cancel'
        ],
        callback: null,
        icon: 'none',
        id: '',
        modal: false,
        onClose: null,
        title: '',
        showTitle: true
    };
})(jQuery);