import React, { useRef } from 'react';
import { X } from 'react-feather';
import PropTypes from 'prop-types';

const Modal = ({ title, children, onClose, showCloseBtn }) => {
    const modal = useRef();
    const modalBg = useRef();
    const modalContent = useRef();
    
    const modalCloseHandler = (e) => {
        e.preventDefault();
        modal.current.style.opacity = 0;
        modalBg.current.style.opacity = 0;
        modalContent.current.style.opacity = 0;
        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-start justify-center w-screen h-screen px-5 " ref={modal}>
            <div className="fixed w-screen h-screen bg-black opacity-40 " onClick={(e) => modalCloseHandler(e)} ref={modalBg} />
            <div className="z-10 max-w-sm p-5 mx-auto mt-12 bg-white shadow-2xl w-96 rounded-3xl dark:bg-blue-gray-900" ref={modalContent}>
                <div className="flex items-center justify-between mb-2 text-center dark:text-white">
                    <h2 className="text-2xl font-Roboto">{title}</h2>
                    {showCloseBtn && <X size={24} strokeWidth={1} className="cursor-pointer" onClick={(e) => modalCloseHandler(e)} />}
                </div>
                <div className="overflow-y-auto text-center bg-gray-500 rounded-lg" style={{ maxHeight: "calc(100vh - 150px)" }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
    duration: PropTypes.number,
    showCloseBtn: PropTypes.bool
}

export default Modal;
