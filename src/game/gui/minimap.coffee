ig.module(
  'game.gui.minimap'
)
.requires(
  'impact.background-map'
)
.defines ->
  tj.Minimap = ig.BackgroundMap.extend
    chunkSize: 256
    preRender: true
    generated: false

    init: (data)->
      @parent(2, data, 'public/media/minimap_tileset.png');

    generate: (game)->
      return if @generated
      game ||= ig.game
      @preRenderMapToChunks()

      $container = $('<div id="minimap"></div>')
      $container.css({top:game.tileSize, right: game.rOffset})
      $container.append(@preRenderedChunks[0][0])
      $('body').append($container)
      @generated = true