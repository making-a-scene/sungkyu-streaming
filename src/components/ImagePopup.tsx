import React from 'react';
import '../App.css';

interface ImagePopupProps {
    imageSrc: string;
    onClose: () => void;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ imageSrc, onClose }) => {
    return (
        <div className="image-popup-overlay" onClick={onClose}>
            <div className="image-popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="image-popup-close" onClick={onClose}>
                    <img src={process.env.PUBLIC_URL + '/close-icon.svg'} alt="닫기" />
                </button>
                <img src={imageSrc} alt="" className="image-popup-img" />
            </div>
        </div>
    );
};

export default ImagePopup;
