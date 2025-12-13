import React, { useState } from 'react';
import '../App.css';
import {toast, ToastContainer} from "react-toastify";

const SocialIcons: React.FC = () => {
    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText("sungkyustream@gmail.com");
            toast.success("이메일 주소가 클립보드에 복사되었습니다!");
        } catch (e) {
            toast.error("이메일 주소 복사에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="social-icons">
            <img src={process.env.PUBLIC_URL + '/email.svg'} alt="Email" className="social-icon social-icon-email"
                 onClick={(e) => copyEmail()}/>
            <ToastContainer />
            <a href="https://x.com/sungkyustream" target="_blank" rel="noreferrer">
                <img src={process.env.PUBLIC_URL + '/xlogo.svg'} alt="X" className="social-icon social-icon-x" />
            </a>
        </div>
    );
};

export default SocialIcons;