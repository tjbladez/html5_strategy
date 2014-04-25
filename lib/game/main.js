
  window.tj = {};

  ig.module('game.main').requires('impact.game', 'game.entities.player_castle', 'game.entities.neutral_castle', 'game.entities.enemy_castle', 'game.gui.frame', 'game.gui.minimap', 'game.levels.main').defines(function() {
    var height, width;
    width = parseInt($(document).width() / 32) * 32;
    height = parseInt($(document).height() / 32) * 32;
    tj.Main = ig.Game.extend({
      scrollSpeed: 20,
      init: function() {
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.MOUSE1, 'click');
        this.getDimensions();
        this.loadRandomizedLevel(LevelMain);
        this.rBorder = this.backgroundMaps[0].pxWidth - this.playW;
        this.bBorder = this.backgroundMaps[0].pxHeight - this.playH;
        this.frame = new tj.Frame(this);
        this.minimap = new tj.Minimap(this);
        return this.placeCastles();
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
        var c_x, c_y, x, y;
        if (ig.input.state('left')) this.scrollLeft();
        if (ig.input.state('right')) this.scrollRight();
        if (ig.input.state('up')) this.scrollUp();
        if (ig.input.state('down')) this.scrollDown();
        this.minimap.update();
        this.parent();
        if (ig.input.pressed('click')) {
          x = ig.input.mouse.x;
          y = ig.input.mouse.y;
          c_x = parseInt((this.screen.x + x) / 32);
          c_y = parseInt((this.screen.y + y) / 32);
          return console.log("Mouse " + x + "," + y, "Cell " + c_x + "," + c_y);
        }
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
        this.playW = this.width - this.tileSize - 256 - 10;
        return this.playH = this.height - this.tileSize;
      },
      scrollLeft: function() {
        return this.scrollToX(this.screen.x - this.scrollSpeed);
      },
      scrollRight: function() {
        return this.scrollToX(this.screen.x + this.scrollSpeed);
      },
      scrollDown: function() {
        return this.scrollToY(this.screen.y + this.scrollSpeed);
      },
      scrollUp: function() {
        return this.scrollToY(this.screen.y - this.scrollSpeed);
      },
      scrollToY: function(y) {
        if (y <= 0) y = -this.tileSize;
        if (y >= this.bBorder) y = this.bBorder;
        return this.screen.y = y;
      },
      scrollToX: function(x) {
        if (x <= 0) x = -this.tileSize;
        if (x >= this.rBorder) x = this.rBorder;
        return this.screen.x = x;
      },
      placeCastles: function() {
        var _this = this;
        this.castles = {
          player: [
            {
              x: 12,
              y: 12
            }
          ],
          enemy: [
            {
              x: 114,
              y: 59
            }
          ],
          neutral: [
            {
              x: 33,
              y: 10
            }, {
              x: 33,
              y: 30
            }, {
              x: 47,
              y: 54
            }, {
              x: 79,
              y: 53
            }, {
              x: 81,
              y: 76
            }, {
              x: 46,
              y: 77
            }, {
              x: 21,
              y: 83
            }, {
              x: 29,
              y: 117
            }, {
              x: 68,
              y: 98
            }, {
              x: 115,
              y: 117
            }, {
              x: 117,
              y: 86
            }, {
              x: 61,
              y: 7
            }, {
              x: 83,
              y: 38
            }, {
              x: 114,
              y: 19
            }
          ]
        };
        _(this.castles.player).each(function(i) {
          return _this.spawnEntity(tj.PlayerCastle, i.x * _this.tileSize, i.y * _this.tileSize - 8);
        });
        _(this.castles.neutral).each(function(i) {
          return _this.spawnEntity(tj.NeutralCastle, i.x * _this.tileSize, i.y * _this.tileSize - 8);
        });
        return _(this.castles.enemy).each(function(i) {
          return _this.spawnEntity(tj.EnemyCastle, i.x * _this.tileSize, i.y * _this.tileSize - 8);
        });
      }
    });
    return ig.main('#canvas', tj.Main, 60, width, height, 1);
  });
