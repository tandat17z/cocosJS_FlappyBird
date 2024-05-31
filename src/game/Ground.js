var Ground = cc.Sprite.extend({
    ctor:function(){
        this._super(res.ground_png);
        this.scale = MW.BG_SCALE;
        this.anchorX = 0;
        this.anchorY = 0;
    }
});
