var Pipe = cc.Sprite.extend({
    ctor:function (arg, flippedY){
        this._super(res.pipe_png);
        this.flippedY = flippedY;
        this.setArg(arg);
    },
    setArg: function(arg){
        this.attr({
            scale: MW.PIPE_SCALE,
            anchorX: 0,
            anchorY: 0
        });

        this.x = arg.x;
        if( this.flippedY ){
            this.y = arg.y + arg.width;
        }
        else{
            this.y = arg.y - this.height*this.scale;
        }
    },
    getWidth: function(){
        return this.width * this.scale;
    },
    getHeight: function(){
        return this.height * this.scale;
    }
});

Pipe.create2p = function(arg){
    var pipe1 = new Pipe(arg, false);
    var pipe2 = new Pipe(arg, true);

    MW.CONTAINER.PIPES.push(pipe1);
    MW.CONTAINER.PIPES.push(pipe2
    );
    g_gameLayer.addChild(pipe1, 5);
    g_gameLayer.addChild(pipe2, 5);
}

Pipe.randArg = function(x){
    var rand   = Math.random()*150 + 250;
    var y_rand = Math.random()*250 + 200; // pipe.height = 432
    var w_rand = Math.random()*100 + 200;
    var arg = {
        x: x + rand,
        y: y_rand,
        width: w_rand
    };
    return arg;
}
Pipe.preset = function(){
    cc.log("Pipe: preset");

    MW.CONTAINER.PIPES = [];

    var x_bird = g_gameLayer._bird.x;
    var arg = Pipe.randArg(x_bird + cc.winSize.width - MW.BIRD_X - 300);
    Pipe.create2p(arg);

    for( let i = 0; i<9; ++i){
        console.log("add pipe" );
        var pipe = MW.CONTAINER.PIPES[MW.CONTAINER.PIPES.length - 1];
        var arg = Pipe.randArg(pipe.x);
        Pipe.create2p(arg);
    }
}