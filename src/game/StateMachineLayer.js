var StateMachineLayer = cc.Layer.extend({
    _gameLayer: null,
    _countdownLayer: null,
    _gameControllerLayer: null,
    _gameoverLayer: null,

    _stateRe: null,
    ctor: function(){
        this._super();
        stateMachineLayer = this;
        this.init();
    },
    init: function(){
        MW.STATE = MW.GAME_STATE.COUNTDOWN;
        this._gameLayer = new GameLayer();
        this.addChild(this._gameLayer);

        this._gameControllerLayer = new GameControllerLayer();
        this.addChild(this._gameControllerLayer);

        this.scheduleUpdate();
    },
    update:function(){
        switch(MW.STATE){
            case MW.GAME_STATE.COUNTDOWN:
                if( this._countdownLayer == null){
                    this._countdownLayer = new CountDownLayer()
                    this.addChild(this._countdownLayer);
                }
                break;

            case MW.GAME_STATE.PLAY:
                // xóa countdownLayer
                if( this._stateRe == MW.GAME_STATE.COUNTDOWN  ) {
                    this.removeChild(this._countdownLayer);
                    this._countdownLayer = null;

                    // create pipe để bắt đầu game
                    this._gameLayer.initPipe();
                }

                // resume
                else if( this._stateRe == MW.GAME_STATE.PAUSE  ){
                    this._gameLayer._bird.scheduleUpdate();
                }
                break;

            case MW.GAME_STATE.PAUSE:
                this._gameLayer._bird.unscheduleUpdate();
                break

            case MW.GAME_STATE.GAMEOVER:
                this._gameLayer._bird.unscheduleUpdate();

                if( this._gameoverLayer == null){
                    this._gameoverLayer = new GameoverLayer()
                    this.addChild(this._gameoverLayer);
                }

                break
        }
        this._stateRe = MW.STATE;
    }

});

StateMachineLayer.scene = function(){
    var scene = new cc.Scene();
    scene.addChild(new StateMachineLayer());
    return scene;
}