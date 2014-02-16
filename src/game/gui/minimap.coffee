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

    init: (data)->
      @parent(2, data, 'public/media/minimap_tileset.png');

    generate: (game)->
      game ||= ig.game
      $container = $('#minimap')
      if $container.length
        $container.html(@preRenderedChunks[0][0])
      else
        @preRenderMapToChunks()
        $container = $('<div id="minimap"></div>')
        $container.css({top:game.tileSize, right: game.rOffset})
        $container.append(@preRenderedChunks[0][0])
        $('body').append($container)