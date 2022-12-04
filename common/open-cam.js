function openCam() {

    const constraints = {
        video: true
    }
    console.log('Open Camera ...');
    getCameraSelection();
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        const updatedConstraints = {
            ...constraints,
            deviceId: {
              exact: 0
            }
        };
        startStream(constraints);
    }
}

const startStream = async (constraints) => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleStream(stream);
};

const handleStream = (stream) => {
    document.getElementById('stream').srcObject = stream;
    streamStarted = true;
};

const getCameraSelection = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    const options = videoDevices.map(videoDevice => {
      return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
    });
    // cameraOptions.innerHTML = options.join('');
};


async function captureCam(){

    var _VIDEO = document.getElementById("stream"), _CANVAS = document.getElementById("canvas")
    // Video metadata is loaded
    _CANVAS.width = _VIDEO.videoWidth;
    _CANVAS.height = _VIDEO.videoHeight;

    var _CANVAS_CTX = _CANVAS.getContext("2d");

    // Placing the current frame image of the video in the canvas
    _CANVAS_CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight);
    return _CANVAS.toDataURL() ;
}