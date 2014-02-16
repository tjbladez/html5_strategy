
  ig.module('game.gui.frame').requires('game.gui.overlay').defines(function() {
    return tj.Frame = ig.Class.extend({
      init: function(game) {
        var sHeight;
        this.top = new tj.Overlay({
          className: 'top-frame',
          height: game.tileSize
        });
        this.top.$el.css({
          top: 0
        });
        this.bottom = new tj.Overlay({
          className: 'bottom-frame',
          height: game.tileSize
        });
        this.bottom.$el.css({
          bottom: 0 + game.bOffset
        });
        sHeight = game.height - game.tileSize * 2;
        this.left = new tj.Overlay({
          className: 'left-frame',
          height: sHeight,
          width: game.tileSize
        });
        this.left.$el.css({
          left: 0,
          top: game.tileSize,
          bottom: game.tileSize + game.bOffset
        });
        this.right = new tj.Overlay({
          className: 'right-frame',
          height: sHeight,
          width: game.tileSize
        });
        return this.right.$el.css({
          right: game.rOffset,
          top: game.tileSize,
          bottom: game.tileSize + game.bOffset
        });
      }
    });
  });
