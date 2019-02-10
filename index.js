'use strict';
async function get(url, responseType='text'){
    return new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.responseType =  responseType;//'arraybuffer';
        xhr.open('GET', url, true);
        xhr.onload = ()=>{
            if(xhr.status == 200){
                resolve(xhr.response);
            } else {
                reject(Error(xhr.statusText));
            }
        };
        xhr.onerror = ()=>{reject(Error('network error'));};
        xhr.send();
    });
}

async function drawPitch(path, container){
    const res=await get(path.replace('.','_')+'.frq');
    const frq=JSON.parse(res);
    const canvas=container.getElementsByTagName('wave')[0].getElementsByTagName('canvas')[0].cloneNode(false);
    canvas.style['z-index']='4';
    container.getElementsByTagName('wave')[0].appendChild(canvas);
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle='hotpink';
    ctx.lineWidth=2;
    ctx.beginPath();
    for(let i=0;i<frq.length;++i){
        ctx.lineTo((50+i)/(frq.length+50)*canvas.width, canvas.height/2-frq[i]*10);
    }
    ctx.closePath();
    ctx.stroke();
}



const dstwaveform = WaveSurfer.create({
    container: '#dstwaveform',
    waveColor: 'turquoise',
    progressColor: 'lightseagreen',
    barWidth: 2
});
let dstpath = 'voicebanks/dst/_ああいあう↓.wav';

async function displayDstWave(path, container){
    dstwaveform.load(path);
    setTimeout(()=>{drawPitch(path, container);}, 800); // 描画終了を待つ
}

displayDstWave(dstpath, dstwaveform.container);


