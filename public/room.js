const client = AgoraRTC.createClient({mode:"rtc",codec:"vp8"})
const extension = new VirtualBackgroundExtension();
AgoraRTC.registerExtensions([extension]);
let processor =null;
const image = document.createElement("img");
let localTracks=[]
let remoteUseres = {}




client.on("user-published",async (user,mediaType)=>{
    remoteUseres[user.uid]=user
    await client.subscribe(user,mediaType)

    if(mediaType ==="video"){
        let player = document.getElementById(`user-container-${user.uid}`)
        if (player != null){
            player.remove()
        }
        player = `<div class="video-container" id="user-container-${user.uid}">
        <div class="video-player" id="user-${user.uid}"></div>
         </div>`

        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)    
        user.videoTrack.play("user-"+user.uid)
    }
    if(mediaType==="audio")
        user.audioTrack.play()

})

client.on("user-left",async(user)=>{
    delete remoteUseres[user.uid]
    document.getElementById("user-container-"+user.uid).remove()
})

startStreaming()


async function startStreaming (){
    try {
        let UID = await client.join(APP_ID,CHANNEL,TOKEN)
        localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()
        let player = `<div class="video-container" id="user-container-${UID}">
                        <div class="video-player" id="user-${UID}"></div>
                  </div>`

        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
        localTracks[1].play('user-'+UID)
        await client.publish([localTracks[0],localTracks[1]])
        processor= extension.createProcessor();
        
        try {
            await processor.init("./node_modules/agora-extension-virtual-background/wasms");
        } catch (error) {
            console.log(error);  
        }
    } catch (error) {
        alert("You should allow the camera and microphone, also try changing you microphone")
    }   
}

//toggling microphone
document.getElementById("mic-btn").addEventListener("click",async(e)=>{
    if(localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.innerText="Mic On"
    }else{
        await localTracks[0].setMuted(true)
        e.target.innerText="Mic Off"
    }
})



//toggling camera
document.getElementById("camera-btn").addEventListener("click",async (e)=>{
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.innerText = "Camera On"
    }else{
        await localTracks[1].setMuted(true)
        e.target.innerText = "Camera Off"
    }
})


document.getElementById("blur-btn").addEventListener("click",async (e)=>{
    localTracks[1].pipe(processor).pipe(localTracks[1].processorDestination);
    processor.setOptions({type: 'blur', blurDegree: 2});
    await processor.enable();
    virtualBackgroundEnabled = true;
})


document.getElementById("fileInput").addEventListener("change",async (e)=>{
    let file = e.target.files[0]
    let fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload= ()=>{
        image.setAttribute("src",fileReader.result)
    }
})

document.getElementById("remove-background").addEventListener("click",()=>{
    localTracks[1].unpipe();
    virtualBackgroundEnabled=false
})
document.getElementById("add-background").addEventListener("click",async ()=>{
    localTracks[1].pipe(processor).pipe(localTracks[1].processorDestination);
    await processor.setOptions({type: 'img', source: image});
    await processor.enable();
    virtualBackgroundEnabled=true
})


document.getElementById("file").addEventListener("click",async (e)=>{
    document.getElementById('fileInput').click();
})
