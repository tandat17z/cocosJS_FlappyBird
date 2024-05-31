var GameoverLayer = cc.Layer.extend({
    _lblCurScore: null,
    _lblBestScore: null,
    _lblPlayAgain: null,
    ctor: function(){
        this._super();
        this.init();
    },
    init: function(){
        MW.BEST_SCORE = Math.max(MW.BEST_SCORE, MW.SCORE);

        //lblScore
        this._lblCurScore = new ccui.Text();
        this._lblCurScore.attr({
            string: "Score: " + MW.SCORE,
            fontName: res.font_ttf,
            fontSize: MW.FONTSIZE1,
            color: cc.hexToColor(MW.FONTCOLOR),
            x: cc.winSize.width/2,
            y: cc.winSize.height/2 + 100
        });
        this.addChild(this._lblCurScore);

        //lblBestScore
        this._lblBestScore = new ccui.Text();
        this._lblBestScore.attr({
            string: "Best: " + MW.BEST_SCORE,
            fontName: res.font_ttf,
            fontSize: MW.FONTSIZE2,
            color: cc.hexToColor(MW.FONTCOLOR),
            x: cc.winSize.width/2,
            y: cc.winSize.height/2
        });
        this.addChild(this._lblBestScore);

        //lblPlayAgain
        this._lblPlayAgain = new ccui.Text();
        this._lblPlayAgain.attr({
            string: "Again",
            fontName: res.font_ttf,
            fontSize: MW.FONTSIZE2,
            color: cc.hexToColor(MW.FONTCOLOR),
            x: cc.winSize.width/2,
            y: cc.winSize.height/2 - 100
        });
        this.addChild(this._lblPlayAgain);

        // ---------------------------------
        this.addTouchListener();
        this.scheduleUpdate();
    },
    update: function(){
        if( MW.KEYS[cc.KEY.enter] ){
            this.againAction();
        }
    },
    addTouchListener:function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                var x = event.getLocationX();
                var y = event.getLocationY();
                var location = new cc.p(x, y);

                if (MW.STATE == MW.GAME_STATE.GAMEOVER && cc.rectContainsPoint(self._lblPlayAgain.getBoundingBox(), location)) {
                    cc.log("Again");
                    self.againAction();
                }
            },
            onMouseUp: function (event) {

            },
        }, this);
    },

    againAction: function(){
        cc.director.runScene( StateMachineLayer.scene() );
    }
})