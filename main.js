let inputStr = document.querySelector(".inputStr");
let downloadButton = document.querySelector(".downloadButton");
let playButton = document.querySelector(".playButton");
let copyButton = document.querySelector(".copyButton");
let audio = document.querySelector(".TTS");
let ID = "";

copyButton.style.display = "none"


async function getID(TTSstr){
    ID = await fetch("http://13.229.216.148:8001/save?text=" + TTSstr)
    .then((res) => res.text());
    
    return ID;
}

async function main(type="download"){
    let TTSstr = inputStr.value;
    if (TTSstr == "") return
    
    if (ID == ""){
        ID = await getID(TTSstr);
    }
    
    downloadURL = "http://13.229.216.148:8001/mp3s?tts_id="+ID;
    
    if (type=="download"){
        downloadWindow = window.open(downloadURL, "_blank")
        window.setInterval(()=>{
            downloadWindow.close()
        }, 1500);

        copyButton.style.display = "block"
    }
    
    else if (type=="play"){
        audio.src = downloadURL;
        audio.play();

        copyButton.style.display = ""
    }

    else if (type=="copy"){
        let dummyElem = document.createElement("textarea");
        document.body.appendChild(dummyElem);
        dummyElem.value = downloadURL;
        dummyElem.select();
        document.execCommand("copy");
        document.body.removeChild(dummyElem)

        alert("Link copied to clipboard!")
    }
}

downloadButton.addEventListener('click', () => {
    main("download");
});

playButton.addEventListener('click', () => {
    main("play");
});

copyButton.addEventListener('click', () => {
    main("copy");
});