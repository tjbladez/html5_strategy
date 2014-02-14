
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
        this.loadLevel(LevelMain);
        this.rightBorder = ig.game.backgroundMaps[0].pxWidth - ig.system.width;
        this.bottomBorder = ig.game.backgroundMaps[0].pxHeight - ig.system.height;
        return console.log("right border", this.rightBorder, this.width);
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
