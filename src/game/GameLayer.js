g_gameLayer = null;

var GameLayer = cc.Layer.extend({
    // map
    _bg: null,
    _ground: null,
    _bgnext: null,
    _groundnext: null,

    _widthFrame: null,

    // update map
    _pipenext_id: null,
    _pipeout_id: null,

    // check init pipe
    _chkInitPipe: false,
    ctor:function () {
        this._super();
        g_gameLayer = this;
        this.init();
    },

    init:function () {
        // Create Background
        this.initBg();

        // Create bird
        this._bird = new Bird();
        this._bird.x = MW.BIRD_X;
        this._bird.y = 350;
        this.addChild(this._bird, 20);

        // reset score
        MW.SCORE = 0;

        // schedule
        this.scheduleUpdate();
    },

    initBg:function() {
        this._bg = new Background();
        this._bg.attr({
            x: 0,
            y: 0
        })
        this._ground = new Ground();
        this._ground.attr({
            x: 0,
            y: 0
        })

        this._widthFrame = Math.min(this._bg.width, this._ground.width)*MW.BG_SCALE - 10;

        this._bgnext = new Background();
        this._bgnext.attr({
            x: this._widthFrame,
            y: 0
        })
        this._groundnext = new Ground();
        this._groundnext.attr({
            x: this._widthFrame,
            y: 0
        })

        this.addChild(this._bg, -10);
        this.addChild(this._ground, 10);
        this.addChild(this._bgnext, -10);
        this.addChild(this._groundnext, 10);
    },
    initPipe: function(){
        Pipe.preset();
        this._pipenext_id = 0;
        this._pipeout_id = 0;
        this._chkInitPipe = true;
    },
    update:function (dt) {
        // set camera
        this.x = MW.BIRD_X - this._bird.x;

        if( this.checkUpdateMap() ) this.updateMap();

        // playing
        if( MW.STATE == MW.GAME_STATE.PLAY && this._chkInitPipe ){
            if(this.checkCollideGround() || this.checkCollidePipe()){
                MW.STATE = MW.GAME_STATE.GAMEOVER;
            }
            // Update pipe
            if( this.checkUpdatePipe() ) this.updatePipe();
            this.scoreCounter();
        }
    },

    checkUpdatePipe: function(){
        var pipeout = MW.CONTAINER.PIPES[this._pipeout_id];
        var pipe_limit = pipeout.x + pipeout.getBoundingBox().width + 10;
        return pipe_limit < this._bird.x - MW.BIRD_X;
    },

    checkUpdateMap: function(){
        return this._bg.x+ this._widthFrame < this._bird.x - MW.BIRD_X;
    },

    updateMap:function(){
        console.log("update bg");

        this._bg.x = this._bgnext.x + this._widthFrame;
        this._ground.x = this._bgnext.x + this._widthFrame;

        var bg_temp = this._bgnext, ground_temp = this._groundnext;
        this._bgnext = this._bg;
        this._groundnext = this._ground;

        this._bg = bg_temp;
        this._ground = ground_temp;
    },

    updatePipe:function(){
        console.log("update pipe");
        var length = MW.CONTAINER.PIPES.length;
        var pipeout1 = MW.CONTAINER.PIPES[this._pipeout_id];
        var pipeout2 = MW.CONTAINER.PIPES[(this._pipeout_id + 1)%length];
        var pipere = MW.CONTAINER.PIPES[(this._pipeout_id + length - 2)%length];

        var arg = Pipe.randArg(pipere.x);
        pipeout1.setArg(arg);
        pipeout2.setArg(arg);

        this._pipeout_id = (this._pipeout_id + 2)%length;
    },

    checkCollideGround: function(){
        var aRect = this._bird.getBoundingBox();
        var bRect = this._ground.getBoundingBox();
        return cc.rectIntersectsRect(aRect, bRect);
    },

    checkCollidePipe:function() {
        var pipenext1 = MW.CONTAINER.PIPES[this._pipenext_id];
        var pipenext2 = MW.CONTAINER.PIPES[this._pipenext_id + 1];

        var aRect = this._bird.getBoundingBox();
        var bRect = pipenext1.getBoundingBox();
        var cRect = pipenext2.getBoundingBox();

        return cc.rectIntersectsRect(aRect, bRect) || cc.rectIntersectsRect(aRect, cRect);
    },

    scoreCounter:function(){
        var pipenext = MW.CONTAINER.PIPES[this._pipenext_id];
        if( this._bird.x > pipenext.x + pipenext.width*MW.PIPE_SCALE){
            MW.SCORE += 1;
            //update pipe next
            var length = MW.CONTAINER.PIPES.length;
            this._pipenext_id = (this._pipenext_id + 2)%length;
        }
    },
    //
    // onGameOver:function(){
    //     cc.log("on game over")
    //     var scene = new cc.Scene();
    //     scene.addChild(new ScoreState());
    //     cc.director.runScene(scene);
    // },
    //
    // pause: function(){
    //     this._state = STATE_PAUSE;
    // }
})