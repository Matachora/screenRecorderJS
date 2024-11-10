const $startButton = document.querySelector('#start');
const $stopButton = document.querySelector('#stop');

$startButton.addEventListener('click', async () => {
  const media = await navigator.mediaDevices.getDisplayMedia({
    video: { frameRate: { ideal: 30 } }
  });
  const mediarecorder = new MediaRecorder(media, {
    mimeType: 'video/webm;codecs=vp8,opus'
  });
  mediarecorder.start();

  // Ocultar el botón de inicio y mostrar el de detener
  $startButton.style.display = 'none';
  $stopButton.style.display = 'inline-block';

  const [video] = media.getVideoTracks();
  video.addEventListener("ended", () => {
    mediarecorder.stop();
    $startButton.style.display = 'inline-block';
    $stopButton.style.display = 'none';
  });

  $stopButton.addEventListener('click', () => {
    mediarecorder.stop();
    media.getTracks().forEach(track => track.stop()); // Detener todas las pistas de medios
    $startButton.style.display = 'inline-block';
    $stopButton.style.display = 'none';
  });

  mediarecorder.addEventListener("dataavailable", (e) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(e.data);
    link.download = "captura.webm";
    link.click();
  });
});
