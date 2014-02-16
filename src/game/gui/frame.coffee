ig.module(
  'game.gui.frame'
)
.requires(
  'game.gui.overlay'
)
.defines ->
  tj.Frame = ig.Class.extend
    init: (game)->
      @top = new tj.Overlay(className: 'top-frame', height: game.tileSize)
      @top.$el.css(top: 0)

      @bottom = new tj.Overlay(className: 'bottom-frame', height: game.tileSize)
      @bottom.$el.css(bottom: 0+game.bOffset)

      sHeight = game.height - game.tileSize*2

      @left = new tj.Overlay(className: 'left-frame', height: sHeight, width: game.tileSize)
      @left.$el.css(left: 0, top: game.tileSize, bottom: game.tileSize+game.bOffset)

      @right = new tj.Overlay(className: 'right-frame', height: sHeight, width: game.tileSize)
      @right.$el.css(right: game.rOffset, top: game.tileSize, bottom:game.tileSize+game.bOffset)