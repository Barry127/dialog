(function($,document,window) {
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
            },200, function() {
                self.container.remove();
                if (self.modal) {
                    self.modal.remove();
                }
            });
            
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
                'style': 'display: none; z-index: 100000'
            });
            
            this.container.width(this.options.width);
            
            var domNodes = {
                modal: $('<div>', {
                    'class': 'dialog-modal',
                    'style': 'display: none; z-index: 99999'
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
            
            if (self.options.overlayClose && self.options.closable) {
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
            
            if (self.options.draggable) {
                if (self.options.showTitle) {
                    $el = domNodes.title;
                } else {
                    $el = domNodes.content;
                }
                
                $el.on('mousedown', function(e) {
                    var $this = $(this),
                        $drag = $this.addClass('active-handle').parent().addClass('draggable');
                        drg_w = $drag.outerWidth(),
                        drg_h = $drag.outerHeight(),
                        pos_x = $drag.offset().left + drg_w - e.pageX,
                        pos_y = $drag.offset().top + drg_h - e.pageY;
                        
                    $drag.parents().on('mousemove', function(e) {
                        var left = e.pageX + pos_x - drg_w,
                            top = e.pageY + pos_y - drg_h,
                            cw, ch;
                            
                        if (self.options.constrain) {
                            cw = $(window).width();
                            ch = $(window).height();
                            
                            left = (left < 0) ? 0 : left;
                            left = (left + drg_w > cw) ? cw - drg_w : left;
                            
                            top = (top < 0) ? 0 : top;
                            top = (top + drg_h > ch) ? ch - drg_h : top;
                        }
                        
                        $('.draggable').offset({
                            top: top,
                            left: left
                        }).on('mouseup', function() {
                            $(this).removeClass('draggable');
                        });
                    });
                }).on('mouseup', function() {
                    $(this).parents().off('mousemove');
                    $(this).removeClass('active-handle').parent().removeClass('draggable');
                });
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
        constrain: true, //Constrain draggable dialog within window
        draggable: true,
        icon: null,
        modal: true,
        onClose: null,
        overlayClose: true, //Close dialog by click on modal layer
        text: '',
        title: '',
        showTitle: true,
        width: 400
    };
})(jQuery,document,window);