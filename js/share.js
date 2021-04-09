let downloadButton = document.querySelector(".downloadButtonLarge");
let copyButton = document.querySelector(".copyButtonLarge");
let audioTTS = document.querySelector('.audioTTS')

let noIDDiv = document.querySelector(".noIDDiv")
noIDDiv.style.display = "none"

function print(x){
    console.log(x)
}

const params = new URLSearchParams(window.location.search);

if (params.get('id') == null){
    audioTTS.style.display = "none"
    downloadButton.style.display = "none";
    copyButton.style.display = "none";

    noIDDiv.style.display = ""
}

ID = params.get('id')

downloadURL = "http://13.229.216.148:8001/mp3s?tts_id="+ID;
audioTTS.src = downloadURL;


async function main(type="download"){    
    if (type=="download"){
        downloadWindow = window.open(downloadURL, "_blank")
        window.setInterval(()=>{
            downloadWindow.close()
        }, 1500);
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

copyButton.addEventListener('click', () => {
    main("copy");
});