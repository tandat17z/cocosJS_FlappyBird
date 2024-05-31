var Background = cc.Sprite.extend({
    ctor:function(){
        this._super(res.background_png);
        this.scale = MW.BG_SCALE;
        this.anchorX = 0;
        this.anchorY = 0;
    }
});
