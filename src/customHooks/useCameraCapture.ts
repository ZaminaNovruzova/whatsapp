import { useRef, useState } from "react";

export function useCameraCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
    } catch (err) {
      console.error("Kamera açıla bilmədi:", err);
      alert("Kameraya icazə verilməyib və ya cihazda kamera yoxdur.");
    }
  }

  function takePhoto() {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png"); 
    setCapturedPhoto(dataUrl);
    stopCamera();
  }


  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;

    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (e) {
        console.log(e);
      }
      try {
      
        videoRef.current.srcObject = null;
      } catch (e) {
        console.log(e);
      }
      try {
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      } catch (e) {
        console.log(e);
      }
    }
    setIsCameraOn(false);
  }

  function clearCapturedPhoto() {
    setCapturedPhoto(null);
  }
  return {
    videoRef,
    startCamera,
    takePhoto,
    stopCamera,
    clearCapturedPhoto,
    capturedPhoto,
    isCameraOn
  };
}
