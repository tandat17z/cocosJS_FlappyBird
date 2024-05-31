var HomeLayer = cc.Layer.extend({
    _text: null,
    ctor:function () {
        this._super();
        this.init();
    },
    init: function(){
        this.initBg();

        this.addTouchListener();
        this.addKeyboardListener();

        // Title
        var title = new ccui.Text();
        title.setString("Flappy bird");
        title.setFontName(res.flappy_ttf);
        title.setFontSize(MW.FONTSIZE1);
        title.setTextColor(cc.hexToColor(MW.FONTCOLOR));
        title.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 + 100);
        this.addChild(title);

        this._text = new ccui.Text();
        this._text.setString("Press Enter");
        this._text.setFontName(res.font_ttf);
        this._text.setFontSize(MW.FONTSIZE2);
        this._text.setTextColor(cc.hexToColor(MW.FONTCOLOR));
        this._text.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(this._text);

        // // Play
        // cc.MenuItemFont.setFontName(res.flappy_ttf);
        // cc.MenuItemFont.setFontSize(MW.FONTSIZE2);
        // var item = new cc.MenuItemFont("Press Enter", function(){
        //     cc.log("press enter");
        // });
        // item.setColor(cc.color(MW.FONTCOLOR));
        // item.attr({
        //     x: cc.winSize.width/2,
        //     y: cc.winSize.height/2 - 100,
        // });
        // // item.addChild(text)
        // var btnPlay = new cc.Menu(item);
        // btnPlay.x = 0;
        // btnPlay.y = 0;
        // this.addChild(btnPlay, 1, 2);

    },

    initBg: function(){
        var bg = new cc.Sprite(res.background_png);
        bg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
            scale: MW.BG_SCALE
        });
        this.addChild(bg, -10, 1);

        var ground = new cc.Sprite(res.ground_png);
        ground.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
            scale: MW.BG_SCALE
        });
        this.addChild(ground, -5, 1);
    },
    addTouchListener: function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event){
                cc.log("click: start game");
                self.startGame();
            },
            onMouseUp: function(event){

            },
        }, this);
    },
    addKeyboardListener:function(){
        var self = this;
        if( cc.sys.capabilities.hasOwnProperty('keyboard')){
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(key, event){
                    MW.KEYS[key] = true;
                    if( key == cc.KEY.enter) self.startGame();
                },
                onKeyReleased: function(key, event){
                    MW.KEYS[key] = false;
                }
            }, this);
        }
    },
    startGame: function(){
        cc.director.runScene( StateMachineLayer.scene() );
    }
});

HomeLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new HomeLayer();
    scene.addChild(layer);
    return scene;
};