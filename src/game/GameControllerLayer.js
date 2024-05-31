var GameControllerLayer = cc.Layer.extend({
    _lblScore: null,
    _lblPause: null,
    _lblResume: null,
    _lblPlayAgain: null,

    _lblDashSkill: null,

    ctor: function(){
        this._super();
        this.init();
    },
    init: function(){
        MW.STATE = MW.GAME_STATE.COUNTDOWN;

        // lbl score
        this._lblScore = new ccui.Text();
        this._lblScore.attr({
            string: "Score: " +  MW.SCORE,
            fontName: res.font_ttf,
            fontSize: MW.FONTSIZE2,
            color: cc.hexToColor(MW.FONTCOLOR),
            anchorX: 0,
            anchorY: 1,
            x: 0,
            y: cc.winSize.height
        });
        this.addChild(this._lblScore);

        // lbl score
        this._lblDashSkill = new ccui.Text();
        this._lblDashSkill.attr({
            string: "Dash Skill: ",
            fontName: res.font_ttf,
            fontSize: MW.FONTSIZE2,
            color: cc.hexToColor(MW.FONTCOLOR),
            anchorX: 0,
            anchorY: 1,
            x: 0,
            y: cc.winSize.height - 100
        });
        this.addChild(this._lblDashSkill);


        //lblPause
        this._lblPause = new ccui.Text();
        this._lblPause.attr({
            string: "Pause",
            fontName: res.font_ttf,
            fontSize: MW.FONTSIZE2,
            color: cc.hexToColor(MW.FONTCOLOR),
            anchorX: 1,
            anchorY: 1,
            x: cc.winSize.width,
            y: cc.winSize.height
        });
        this.addChild(this._lblPause);

        //lblResume
        this._lblResume = new ccui.Text();
        this._lblResume.attr({
            string: "Resume",
            fontName: res.font_ttf,
            fontSize: MW.FONTSIZE2,
            color: cc.hexToColor(MW.FONTCOLOR),
            x: cc.winSize.width/2,
            y: cc.winSize.height/2 + 100
        });
        this._lblResume.setVisible(false);
        this.addChild(this._lblResume);

        //lblPlayAgain
        this._lblPlayAgain = new ccui.Text();
        this._lblPlayAgain.attr({
            string: "Again",
            fontName: res.font_ttf,
            fontSize: MW.FONTSIZE2,
            color: cc.hexToColor(MW.FONTCOLOR),
            x: cc.winSize.width/2,
            y: cc.winSize.height/2
        });
        this._lblPlayAgain.setVisible(false);
        this.addChild(this._lblPlayAgain);

        // -------------------------------------
        this.addTouchListener();
        this.addKeyboardListener();

        this.scheduleUpdate();
    },
    update:function(){
        this._lblScore.setString("Score: " +  MW.SCORE);
        if( MW.STATE == MW.GAME_STATE.PLAY && MW.KEYS[cc.KEY.p] ) {
            cc.log("Pause");
            this.pauseAction();
        }

        if( mainBird._useSkill == DASHSKILL){
            this._lblDashSkill.setString("DashSkill: " + mainBird._t_useDash.toFixed(2));
        }
        else if (mainBird._timeDash <= 0){
            this._lblDashSkill.setString("DashSkill: " + "OK");
        }
        else{
            this._lblDashSkill.setString("DashSkill: " + Math.round(mainBird._timeDash));
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

                if (MW.STATE == MW.GAME_STATE.PLAY && cc.rectContainsPoint(self._lblPause.getBoundingBox(), location)) {
                    cc.log("Pause");
                    self.pauseAction();
                } else if (MW.STATE == MW.GAME_STATE.PAUSE && cc.rectContainsPoint(self._lblPlayAgain.getBoundingBox(), location)) {
                    cc.log("Again");
                    self.againAction();
                } else if (MW.STATE == MW.GAME_STATE.PAUSE && cc.rectContainsPoint(self._lblResume.getBoundingBox(), location)) {
                    cc.log("Resume");
                    self.resumeAction();
                }
                else{
                    MW.CLICK = true;
                }
            },
            onMouseUp: function (event) {
                MW.CLICK = false;
            },
        }, this);
    },
    addKeyboardListener:function(){
        //Add code here
        if( cc.sys.capabilities.hasOwnProperty('keyboard')){
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(key, event){
                    MW.KEYS[key] = true;
                },
                onKeyReleased: function(key, event){
                    MW.KEYS[key] = false;
                }
            }, this);
        }
    },
    pauseAction: function(){
        MW.STATE = MW.GAME_STATE.PAUSE;

        this._lblPause.setVisible(false);
        this._lblResume.setVisible(true);
        this._lblPlayAgain.setVisible(true);
    },
    resumeAction: function(){
        MW.STATE = MW.GAME_STATE.PLAY;

        this._lblPause.setVisible(true);
        this._lblResume.setVisible(false);
        this._lblPlayAgain.setVisible(false);
    },
    againAction: function(){
        cc.director.runScene( StateMachineLayer.scene() );
    }
})