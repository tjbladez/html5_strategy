
  ig.module('game.gui.overlay').defines(function() {
    return tj.Overlay = ig.Class.extend({
      className: 'gui-overlay',
      $el: null,
      init: function(opts) {
        var classes, height, width;
        if (opts == null) opts = {};
        classes = this.className;
        if (opts.className) classes += " " + opts.className;
        width = opts.width || ig.game.width;
        height = opts.height || ig.game.height;
        this.$el = $('<div></div>').addClass(classes).width(width).height(height);
        return $('canvas').after(this.$el);
      }
    });
  });
