var NOSKILL = 0;
var DASHSKILL = 1;

var mainBird = null;

var Bird = cc.Sprite.extend({
    _vx: null,
    _vy: null,
    _start: null,

    _useSkill: null,
    _timeDash: null,
    _timePower: null,

    _t_useDash: null,
    ctor:function () {
        this._super(res.bird_png);
        mainBird = this;
        this.init();
    },
    init:function(){
        this._vx = MW.BIRD_SPEED/5;
        this._start = false;

        this.attr({
            scale: MW.BIRD_SCALE,
            anchorX: 0.65,
            anchorY: 0.5,
        });

        this._timeDash = 0;
        this._t_useDash = MW.t_useDASHSKILL;

        this._useSkill = NOSKILL;

        this.scheduleUpdate();
    },
    update:function (dt) {
        if ( MW.STATE == MW.GAME_STATE.PLAY){
            this._vx = MW.BIRD_SPEED;
            this._start = true;

            if( MW.KEYS[cc.KEY.space] || MW.CLICK){
                this._vy = MW.BIRD_SPEED*1.25;
            }

            // skill dash
            this._timeDash -= dt;
            if( MW.KEYS[cc.KEY.q] && this._timeDash <= 0 && this._useSkill == NOSKILL) this._useSkill = DASHSKILL;

            if( this._useSkill == DASHSKILL) this.dashSkill(dt);

        }
        this.updateMove(dt);

        // set rotation
        var angle = Math.atan(this._vy/this._vx)/Math.PI*180;
        this.setRotation(-angle);

        // ------------------------------------------------
        // if ((MW.KEYS[cc.KEY.w] || MW.KEYS[cc.KEY.up]) && this.y <= cc.winSize.height) {
        //     this.y += dt * 1000;
        // }
        // if ((MW.KEYS[cc.KEY.s] || MW.KEYS[cc.KEY.down]) && this.y >= 0) {
        //     this.y -= dt * 1000;
        // }
        // if ((MW.KEYS[cc.KEY.a] || MW.KEYS[cc.KEY.left]) && this.x - MW.BIRD_X >= 0) {
        //     this.x -= dt * 1000;
        // }
        // if ((MW.KEYS[cc.KEY.d] || MW.KEYS[cc.KEY.right])) {
        //     this.x += dt * 1000;
        // }
    },

    updateMove:function(dt)
    {
        this.x += dt*this._vx;
        if( this._start ){
            this.y += dt*this._vy;
            this._vy -= MW.GRAVITY*dt;
        }
    },

    dashSkill: function(dt){
        this._vx = MW.BIRD_SPEED*MW.DASH;
        this._t_useDash -= dt;

        if( this._t_useDash < 0) {
            this._useSkill = NOSKILL;
            this.resetDashSkill();
        }
    },
    resetDashSkill: function(){
        this._t_useDash = MW.t_useDASHSKILL;
        this._timeDash = MW.t_DASHSKILL;
    }
});
