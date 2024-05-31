var CountDownLayer = cc.Layer.extend({
    _title : null,
    _count : null,
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._count = MW.T_COUNTDOWN;

        // Countdown
        this._title = new ccui.Text();
        this._title.attr({
            string: toString(this._count),
            fontName: res.flappy_ttf,
            fontSize: MW.FONTSIZE1,
            color: cc.hexToColor(MW.FONTCOLOR),
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2
        })
        this.addChild(this._title);

        this.scheduleUpdate();
    },
    update: function(dt){
        this._count -= dt;
        this._title.setString(Math.round(this._count));
        if( this._count < 0) {
            cc.log("after countdown");
            this.startGame();
        }
    },
    startGame: function(){
        MW.STATE = MW.GAME_STATE.PLAY;
    }
});