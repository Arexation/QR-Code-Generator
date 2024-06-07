const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrCode = document.querySelector('.QRCODE');
const bgQR = document.querySelector('.bgC');
const sizes = document.getElementById('size');
const qrText = document.getElementById('qr-text');

let size = sizes.value;
let bgsize = 1450;

generateBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    isEmptyInput();
});

sizes.addEventListener('change',(e)=>{
    size = e.target.value;
    isEmptyInput();
});

function changeDownloadName(newName) {
    var downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.setAttribute('download', newName);
}

downloadBtn.addEventListener('click', ()=>{
    let img = document.querySelector('.QRCODE img');
    let fileName = "QR Code_" + qrText.value + "_" + size + "x" + size + ".png";
    changeDownloadName(fileName);

    if(img !== null){
        let imgAtrr = img.getAttribute('src');
        downloadBtn.setAttribute("href", imgAtrr);
    }
    else{
        downloadBtn.setAttribute("href", `${document.querySelector('canvas').toDataURL()}`);
    }
});

function isEmptyInput(){
    qrText.value.length > 0 ? generateQRCode() : alert("Enter the text or URL to generate your QR code");;
    sizes.value.length > 0 ? generateQRCode() : alert("Enter the size of your QR code");;
    parseFloat(sizes.value) > 0 ? generateQRCode() : alert("Enter the positive size for the QR code!");;
}


function generateQRCode() {
    qrCode.innerHTML = "Your QR Code:";
    bgQR.innerHTML = "";

    new QRCode(qrCode, {
        text: qrText.value,
        height: size,
        width: size,
        colorLight: "#fff",
        colorDark: "#000",
    });
    new QRCode(bgQR, {
        text: qrText.value,
        height: bgsize,
        width: bgsize,
        colorLight: "#fafafc",
        colorDark: "#77B5A8",
    });

    setTimeout(() => {
        let qrCanvas = bgQR.querySelector("canvas");

        if (qrCanvas) {
            
            let qrDataURL = qrCanvas.toDataURL("image/png");

            let styleElement = document.createElement('style');
            styleElement.id = 'dynamicBackgroundStyle';
            styleElement.innerHTML = `
                body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: url(${qrDataURL});
                    background-size: ${bgsize}px;
                    background-repeat: no-repeat;
                    background-position: center;
                    filter: blur(15px);
                    z-index: -1;
                }
            `;

            let existingStyleElement = document.getElementById('dynamicBackgroundStyle');
            if (existingStyleElement) {
                document.head.removeChild(existingStyleElement);
            }

            document.head.appendChild(styleElement);
        }
    }, 100);
}

var ALERT_BUTTON_TEXT = "Ok";

if(document.getElementById) {
	window.alert = function(txt) {
		createCustomAlert(txt);
	}
}

function createCustomAlert(txt) {
	d = document;

	if(d.getElementById("modalContainer")) return;

	mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
	mObj.id = "modalContainer";
	mObj.style.height = d.documentElement.scrollHeight + "px";
	
	alertObj = mObj.appendChild(d.createElement("div"));
	alertObj.id = "alertBox";
	if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
	alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
	alertObj.style.visiblity="visible";


	msg = alertObj.appendChild(d.createElement("p"));
	//msg.appendChild(d.createTextNode(txt));
	msg.innerHTML = txt;

	btn = alertObj.appendChild(d.createElement("a"));
	btn.id = "closeBtn";
	btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
	btn.href = "#";
	btn.focus();
	btn.onclick = function() { removeCustomAlert();return false; }

	alertObj.style.display = "block";
	
}

function removeCustomAlert() {
	document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
function ful(){
alert('Alert this pages');
}