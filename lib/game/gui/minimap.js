
  ig.module('game.gui.minimap').requires('impact.background-map').defines(function() {
    return tj.Minimap = ig.BackgroundMap.extend({
      chunkSize: 256,
      preRender: true,
      enabled: false,
      foreground: true,
      generated: false,
      scaleRatio: 16,
      init: function(game) {
        var data, tileSize;
        data = game.backgroundMaps[0].data;
        tileSize = game.tileSize / this.scaleRatio;
        this.canvasH = tileSize * data.length;
        this.canvasW = tileSize * data[0].length;
        this.parent(tileSize, data, 'public/media/minimap_tileset.png');
        this.castleImgs = new ig.Image('public/media/minimap_castles.png');
        this.viewableH = Math.round(ig.game.playH / ig.game.tileSize * 2);
        return this.viewableW = Math.round(ig.game.playW / ig.game.tileSize * 2);
      },
      generate: function() {
        var _this = this;
        if (!this.tiles.loaded || this.generated) return;
        this.preRenderMapToChunks();
        this.$map = $('<div id="minimap"></div>');
        this.$map.css({
          top: ig.game.tileSize,
          right: ig.game.rOffset
        });
        this.$map.append(this.preRenderedChunks[0][0]);
        this.$map.on('click', function(e) {
          return _this.moveTo(e.offsetX, e.offsetY);
        });
        this.$dynamic = $('<canvas class="dynamic"></canvas>');
        this.$dynamic.prop('width', this.canvasW);
        this.$dynamic.prop('height', this.canvasH);
        this.$map.append(this.$dynamic);
        $('body').append(this.$map);
        return this.generated = true;
      },
      update: function() {
        var ctx;
        if (this.generated) {
          ctx = this.$dynamic[0].getContext('2d');
          ctx.clearRect(0, 0, this.canvasW, this.canvasH);
          this.updateCurrentLocation(ctx);
          return this.updateCastles(ctx);
        } else {
          return this.generate();
        }
      },
      updateCurrentLocation: function(ctx) {
        var x, y;
        x = Math.round(ig.game.screen.x / ig.game.tileSize * 2);
        y = Math.round(ig.game.screen.y / ig.game.tileSize * 2);
        return ctx.strokeRect(x, y, this.viewableW, this.viewableH);
      },
      updateCastles: function(ctx) {
        var _this = this;
        _(ig.game.castles.player).each(function(i) {
          return ctx.drawImage(_this.castleImgs.data, 0, 0, 6, 5, i.x * 2, i.y * 2, 6, 5);
        });
        _(ig.game.castles.neutral).each(function(i) {
          return ctx.drawImage(_this.castleImgs.data, 6, 0, 6, 5, i.x * 2, i.y * 2, 6, 5);
        });
        return _(ig.game.castles.enemy).each(function(i) {
          return ctx.drawImage(_this.castleImgs.data, 12, 0, 6, 5, i.x * 2, i.y * 2, 6, 5);
        });
      },
      moveTo: function(mouseX, mouseY) {
        var targetX, targetY, x, y;
        targetX = mouseX - Math.round(this.viewableW / 2);
        if (targetX < 0) targetX = 0;
        targetY = mouseY - Math.round(this.viewableH / 2);
        if (targetY < 0) targetY = 0;
        x = Math.round(targetX * ig.game.tileSize / 2);
        y = Math.round(targetY * ig.game.tileSize / 2);
        ig.game.scrollToX(x);
        return ig.game.scrollToY(y);
      }
    });
  });
