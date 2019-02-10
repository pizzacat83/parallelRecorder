'use strict';

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'darkturquoise',
    progressColor: 'lightseagreen',
    barWidth: 2
});
var path = 'voicebanks/dst/_ああいあう↓.wav';
wavesurfer.load(path);
