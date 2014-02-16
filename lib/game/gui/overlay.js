
  ig.module('game.gui.overlay').defines(function() {
    return ig.Overlay = ig.Class.extend({
      className: 'overlay',
      defaultVisible: false,
      init: function() {
        var $canvas;
        $canvas = $(ig.system.canvas);
        this.$el = $('div').addClass(this.className).css({
          position: 'absolute',
          display: 'none'
        }).width($canvas.width()).height($canvas.height());
        $('body').append(this.$el);
        return this.$el.toggle(this.defaultVisible);
      }
    });
  });
