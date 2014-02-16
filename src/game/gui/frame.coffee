ig.module(
  'game.gui.frame'
)
.requires(
  'game.gui.overlay'
)
.defines ->
  tj.Frame = ig.Class.extend
    init: (game)->
      #window border offset + buffer space + room for minimap
      rOffset = game.rOffset + 10 + 128*2
      @top = new tj.Overlay(className: 'top-frame', height: game.tileSize)
      @top.$el.css(top: 0, right: rOffset)

      @bottom = new tj.Overlay(className: 'bottom-frame', height: game.tileSize)
      @bottom.$el.css(bottom: 0+game.bOffset, right: rOffset)

      sHeight = game.height - game.tileSize*2

      @left = new tj.Overlay(className: 'left-frame', height: sHeight, width: game.tileSize)
      @left.$el.css(left: 0, top: game.tileSize, bottom: game.tileSize+game.bOffset, right: rOffset)

      @right = new tj.Overlay(className: 'right-frame', height: sHeight, width: game.tileSize)
      @right.$el.css(right: rOffset, top: game.tileSize, bottom:game.tileSize+game.bOffset)