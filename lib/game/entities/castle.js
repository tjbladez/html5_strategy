
  ig.module('game.entities.castle').requires('impact.entity').defines(function() {
    return tj.Castle = ig.Entity.extend({
      size: {
        x: 64,
        y: 64
      },
      collides: ig.Entity.COLLIDES.NONE,
      type: ig.Entity.TYPE.A,
      checkAgainst: ig.Entity.TYPE.B,
      animSheet: new ig.AnimationSheet('public/media/castles.png', 64, 72),
      name: "Castle",
      init: function(x, y, opts) {
        this.addAnim('idle', 1, [0]);
        return this.parent(x, y, opts);
      }
    });
  });
