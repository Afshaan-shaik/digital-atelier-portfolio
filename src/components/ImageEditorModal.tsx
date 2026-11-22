import React, { useState, useRef, useEffect } from 'react';

interface ImageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (imageDataUrl: string, zoom: number, x: number, y: number) => void;
  onRemove: () => void;
  currentImage: string | null;
  currentZoom: number;
  currentX: number;
  currentY: number;
}

export const ImageEditorModal: React.FC<ImageEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onRemove,
  currentImage,
  currentZoom,
  currentX,
  currentY
}) => {
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(currentImage);
  const [zoom, setZoom] = useState(currentZoom);
  const [posX, setPosX] = useState(currentX);
  const [posY, setPosY] = useState(currentY);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSelectedImageSrc(currentImage);
    setZoom(currentZoom);
    setPosX(currentX);
    setPosY(currentY);
  }, [currentImage, currentZoom, currentX, currentY, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please select a JPG, PNG or WebP image.');
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setErrorMessage('Image size exceeds 12 MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedImageSrc(reader.result);
        setZoom(100);
        setPosX(50);
        setPosY(50);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (selectedImageSrc) {
      onSave(selectedImageSrc, zoom, posX, posY);
      onClose();
    }
  };

  const handleDownload = () => {
    if (!selectedImageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedImageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const width = 900;
      const height = 1100;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = '#11121A';
      ctx.fillRect(0, 0, width, height);

      const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight) * (zoom / 100);
      const drawWidth = img.naturalWidth * scale;
      const drawHeight = img.naturalHeight * scale;
      const overflowX = Math.max(0, drawWidth - width);
      const overflowY = Math.max(0, drawHeight - height);
      const offsetX = -(overflowX * (posX / 100));
      const offsetY = -(overflowY * (posY / 100));

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      const downloadLink = document.createElement('a');
      downloadLink.href = canvas.toDataURL('image/jpeg', 0.92);
      downloadLink.download = 'afshaan-sheikh-portrait.jpg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
    };
  };

  const handleResetSliders = () => {
    setZoom(100);
    setPosX(50);
    setPosY(50);
  };

  return (
    <div className="editorial-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="editorModalTitle">
      <div className="modal-dialog-panel">
        <div className="modal-header-row">
          <div>
            <span className="eyebrow-tag">PORTRAIT WORKSHOP</span>
            <h2 id="editorModalTitle">Frame your <em>portrait.</em></h2>
          </div>
          <button className="modal-close-btn" type="button" onClick={onClose} aria-label="Close Image Studio">
            ×
          </button>
        </div>

        <p className="modal-intro-text">
          Upload any portrait (JPG, PNG, WebP up to 12 MB) and calibrate the zoom and framing position to suit the editorial layout.
        </p>

        {/* Upload Trigger Dropzone */}
        <label className="upload-dropzone-label">
          <span className="upload-plus-icon" aria-hidden="true">＋</span>
          <div>
            <strong>Choose an image from your device</strong>
            <small>JPG, PNG or WebP · Up to 12 MB</small>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            hidden
          />
        </label>

        {errorMessage && (
          <p className="text-danger mt-2 mb-0" style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            {errorMessage}
          </p>
        )}

        {/* Live Preview Stage */}
        <div className="modal-preview-stage">
          {selectedImageSrc ? (
            <img
              src={selectedImageSrc}
              alt="Portrait Crop Preview"
              style={{
                objectPosition: `${posX}% ${posY}%`,
                transform: `scale(${zoom / 100})`,
                transition: 'transform 0.05s ease, object-position 0.05s ease'
              }}
            />
          ) : (
            <div className="empty-preview-note">No image selected. The monogram artwork will be shown as fallback.</div>
          )}
        </div>

        {/* Controls Grid */}
        {selectedImageSrc && (
          <div className="modal-sliders-grid">
            <div className="slider-label-wrap">
              <span className="slider-name">ZOOM ({zoom}%)</span>
              <input
                type="range"
                min="100"
                max="250"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                aria-label="Image Zoom"
              />
            </div>
            <div className="slider-label-wrap">
              <span className="slider-name">HORIZONTAL ({posX}%)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={posX}
                onChange={(e) => setPosX(Number(e.target.value))}
                aria-label="Horizontal Position"
              />
            </div>
            <div className="slider-label-wrap">
              <span className="slider-name">VERTICAL ({posY}%)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={posY}
                onChange={(e) => setPosY(Number(e.target.value))}
                aria-label="Vertical Position"
              />
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="modal-actions-row">
          {selectedImageSrc ? (
            <>
              <button className="btn-outline-champagne" type="button" onClick={handleResetSliders}>
                Reset Framing
              </button>
              <div className="d-flex gap-2">
                <button
                  className="btn-outline-champagne"
                  type="button"
                  onClick={() => {
                    setSelectedImageSrc(null);
                    onRemove();
                    onClose();
                  }}
                  style={{ color: '#D67A68', borderColor: 'rgba(214, 122, 104, 0.4)' }}
                >
                  Remove Photo
                </button>
                <button className="btn-champagne" type="button" onClick={handleSave}>
                  Save Framing
                </button>
              </div>
            </>
          ) : (
            <button className="btn-outline-champagne w-100" type="button" onClick={onClose}>
              Keep Monogram Art
            </button>
          )}
        </div>

        {selectedImageSrc && (
          <button
            type="button"
            className="btn-outline-champagne w-100 mt-3"
            onClick={handleDownload}
            style={{ fontSize: '0.75rem', padding: '10px' }}
          >
            Download Cropped Asset File ↓
          </button>
        )}
      </div>
    </div>
  );
};
