(function($) {
    var dialog = {
        close: function() {
            self = this;
            
            if (typeof self.options.onClose === 'function') {
                self.options.onClose(self);
            }
            
            if (self.modal) {
                this.modal.animate({
                    opacity: 'hide'
                },200); 
            }
            
            this.container.animate({
                opacity: 'hide'
            },200);
            
            $(document).off('keyup');
        },
        
        createButtons: function(buttons) {
            return $.map(buttons, function(button) {
                return '<input type="button" value="' + button + '" />';
            }).join('');
        },
        
        init: function(opts) {
            this.options = $.extend({}, $.dialog.defaults, opts);
            this.options.width = (parseInt(this.options.width) > 200) ? parseInt(this.options.width) : 200;
            this.options.buttons = (typeof this.options.buttons === 'object' && this.options.buttons != null) ? this.options.buttons : [];
            
            this.container = $('<div>', {
                'class': 'dialog',
                'style': 'display: none; zIndex: 100001'
            });
            
            this.container.width(this.options.width);
            
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
            
            this.modal = domNodes.modal;
            
            domNodes.title.html(this.options.title);
            domNodes.content.html(this.options.text);
            domNodes.buttons.html(this.createButtons(this.options.buttons));
            
            var self = this;
            
            if (!self.options.showTitle) {
                domNodes.title.hide();
            }
            
            domNodes.closeButton.on('click', function() {
                self.close();
            });
            
            domNodes.buttons.find('input').on('click', function() {
                if (typeof self.options.callback === 'function') {
                    self.options.callback.call(self, $(this).val());
                }
                self.close();
            });
            
            if (self.options.icon != null) {
                domNodes.content.addClass('dialog-icon-' + this.options.icon)
            }
            
            $(document).on('keyup', function(e) {
                if (e.which == 27 && self.options.closable) {
                    self.close();
                }
            });
            
            if (self.options.modalClose && self.options.closable) {
                this.modal.on('click', function() {
                    self.close();
                });
            }
            
            domNodes.title.appendTo(this.container);
            if (self.options.closeButton && self.options.closable) {
                domNodes.closeButton.appendTo(this.container);
            }
            domNodes.content.appendTo(this.container);
            if (self.options.buttons.length > 0) {
                domNodes.buttons.appendTo(this.container);
            }
        },
        
        show: function() {
            var self = this;
            
            if (self.options.modal) {
                this.modal.appendTo('body').animate({
                    opacity: 'show'
                },1);
            }
            
            this.container.appendTo('body').animate({
                top: $(window).height() / 2 - this.container.outerHeight() / 2,
                left: $(window).width() / 2 - this.container.outerWidth() / 2
            },1).animate({
                opacity: 'show'
            },500);
        }
    };
    
    $.dialog = function(options) {
        var dialogWindow = Object.create(dialog);
        dialogWindow.init(options);
        return dialogWindow;
    };
    
    $.dialog.defaults = {
        buttons: [
            'Ok',
            'Cancel'
        ],
        callback: null,
        closable: true,
        closeButton: true,
        icon: null,
        id: '',
        modal: true,
        modalClose: true,
        onClose: null,
        text: '',
        title: '',
        showTitle: true,
        width: 400
    };
})(jQuery);