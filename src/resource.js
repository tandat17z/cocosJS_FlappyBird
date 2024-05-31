

var res = {
    background_png: 'res/img/background.png',
    bird_png: 'res/img/bird.png',
    ground_png: 'res/img/ground.png',
    pipe_png: 'res/img/pipe.png',

    explosion_wav: 'res/music/explosion.wav',
    hurt_wav: 'res/music/hurt.wav',
    jump_wav: 'res/music/jump.wav',
    marios_way_mp3: 'res/music/marios_way.mp3',
    score_wav: 'res/music/score.wav',

    flappy_ttf: 'res/font/flappy.ttf',
    font_ttf: 'res/font/font.ttf'
};

var g_homestate = [
    res.background_png,
    res.ground_png,

    res.marios_way_mp3,
    res.flappy_ttf,
    res.font_ttf
]
var g_playstate = [
    res.background_png,
    res.ground_png,
    res.bird_png,
    res.pipe_png,

    res.explosion_wav,
    res.hurt_wav,
    res.jump_wav,
    res.marios_way_mp3,
    res.score_wav,

    res.flappy_ttf,
    res.font_ttf
];
