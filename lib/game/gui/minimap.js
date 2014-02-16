
  ig.module('game.gui.minimap').requires('impact.background-map').defines(function() {
    return tj.Minimap = ig.BackgroundMap.extend({
      chunkSize: 256,
      preRender: true,
      init: function(data) {
        return this.parent(2, data, 'public/media/minimap_tileset.png');
      },
      generate: function(game) {
        var $container;
        game || (game = ig.game);
        this.preRenderMapToChunks();
        $container = $('<div id="minimap"></div>');
        $container.css({
          top: game.tileSize,
          right: game.rOffset
        });
        $container.append(this.preRenderedChunks[0][0]);
        return $('body').append($container);
      }
    });
  });
