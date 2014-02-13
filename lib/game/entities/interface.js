(function() {
  ig.module('game.entities.interface').requires('impact.entity').defines(function() {
    return ig.Interface = ig.Entity.extend({
      size: {
        x: 768,
        y: 768
      },
      animSheet: new ig.AnimationSheet('public/media/interface.png', 768, 768),
      init: function(x, y, opts) {
        this.parent(x, y, opts);
        return this.addAnim('idle', 1, [0]);
      },
      update: function() {
        if (ig.input.pressed('click')) {
          console.log('mouse x', ig.input.mouse.x, 'y', ig.input.mouse.y);
        }
        return this.parent();
      },
      draw: function() {
        return this.parent();
      }
    });
  });
}).call(this);
