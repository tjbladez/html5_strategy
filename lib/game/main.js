
  window.tj = {};

  ig.module('game.main').requires('impact.game', 'game.gui.frame', 'game.gui.minimap', 'game.levels.main').defines(function() {
    var height, width;
    width = parseInt($(document).width() / 32) * 32;
    height = parseInt($(document).height() / 32) * 32;
    tj.Main = ig.Game.extend({
      init: function() {
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        this.getDimensions();
        this.loadRandomizedLevel(LevelMain);
        this.rBorder = this.backgroundMaps[0].pxWidth - this.play_w;
        this.bBorder = this.backgroundMaps[0].pxHeight - this.play_h;
        this.frame = new tj.Frame(this);
        return this.minimap = new tj.Minimap(this);
      },
      loadRandomizedLevel: function(level) {
        level.layer[0].data.forEach(function(row, r_i) {
          return row.forEach(function(column, c_i) {
            var idx, newData;
            idx = parseInt((column - 1) / 4);
            newData = (idx * 4) + [1, 2, 3, 4].random();
            return level.layer[0].data[r_i][c_i] = newData;
          });
        });
        return this.loadLevel(level);
      },
      update: function() {
        if (ig.input.state('left')) {
          if (this.screen.x > 0) {
            this.screen.x -= 20;
          } else {
            this.screen.x = -this.tileSize;
          }
        }
        if (ig.input.state('right')) {
          if (this.screen.x < this.rBorder) {
            this.screen.x += 20;
          } else {
            this.screen.x = this.rBorder;
          }
        }
        if (ig.input.state('down')) {
          if (this.screen.y < this.bBorder) {
            this.screen.y += 20;
          } else {
            this.screen.y = this.bBorder;
          }
        }
        if (ig.input.state('up')) {
          if (this.screen.y > 0) {
            this.screen.y -= 20;
          } else {
            this.screen.y = -this.tileSize;
          }
        }
        this.minimap.update();
        return this.parent();
      },
      draw: function() {
        return this.parent();
      },
      getDimensions: function() {
        this.width = width;
        this.height = height;
        this.tileSize = 32;
        this.rOffset = $(document).width() % 32;
        this.bOffset = $(document).height() % 32;
        this.play_w = this.width - this.tileSize - 256 - 10;
        return this.play_h = this.height - this.tileSize;
      }
    });
    return ig.main('#canvas', tj.Main, 60, width, height, 1);
  });
