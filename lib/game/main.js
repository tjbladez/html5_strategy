
  ig.module('game.main').requires('impact.game', 'impact.debug.debug', 'game.levels.main', 'game.entities.interface').defines(function() {
    var Main, height, width;
    width = parseInt(document.documentElement.clientWidth / 32) * 32;
    height = parseInt(document.documentElement.clientHeight / 32) * 32;
    Main = ig.Game.extend({
      init: function() {
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        this.width = width;
        this.height = height;
        this.tile = 32;
        this.loadRandomizedLevel(LevelMain);
        this.rightBorder = ig.game.backgroundMaps[0].pxWidth - ig.system.width;
        return this.bottomBorder = ig.game.backgroundMaps[0].pxHeight - ig.system.height;
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
        if (ig.input.state('left') && !this.screen.x <= 0) this.screen.x -= 20;
        if (ig.input.state('right')) this.screen.x += 20;
        if (ig.input.state('down')) this.screen.y += 20;
        if (ig.input.state('up') && !this.screen.y <= 0) this.screen.y -= 20;
        return this.parent();
      },
      draw: function() {
        return this.parent();
      }
    });
    return ig.main('#canvas', Main, 60, width, height, 1);
  });
