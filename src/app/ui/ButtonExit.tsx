"use client"
import React from 'react'

const ButtonExitButtonExit = () => {
    const handleDoubleClick = () => {
        console.log("close")
        window.ipcRenderer.send('close-app', {});
    }
    return (
        <div className="w-[100px] h-[100px]" onDoubleClick={handleDoubleClick}></div>
    );
}

export default ButtonExitButtonExit;