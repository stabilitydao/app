import React, { useRef, useEffect } from 'react';
import { X } from 'react-feather';
import PropTypes from 'prop-types';

const Modal = ({ title, children, onClose, showCloseBtn }) => {
    const modal = useRef();
    const modalBg = useRef();
    const modalContent = useRef();

    useEffect((isKeyPressed) => {
        window.addEventListener("keydown", isKeyPressed)
        return () => {
            window.removeEventListener("keydown", isKeyPressed)
        }
    }, [])

    function isKeyPressed(event) {
        if (event.key === "Escape") {
            onClose()
        }
    }

    const modalCloseHandler = (e) => {
        e.preventDefault();
        modal.current.style.opacity = 0;
        modalBg.current.style.opacity = 0;
        modalContent.current.style.opacity = 0;
        onClose();
    }

    return (
        <div className="fixed inset-0 z-20 flex items-start justify-center px-5" ref={modal}>
            <div className="fixed inset-0 bg-black opacity-40 " onClick={(e) => modalCloseHandler(e)} ref={modalBg} />
            <div className="z-10 max-w-sm p-5 mx-auto mt-12 bg-white shadow-2xl w-96 rounded-3xl dark:bg-slate-900 relative" ref={modalContent}>
                <div className="flex items-center justify-between mb-2 text-center dark:text-white">
                    <h2 className="text-2xl font-Roboto">{title}</h2>
                    {showCloseBtn && <X size={24} strokeWidth={1} className="cursor-pointer absolute right-6 top-6" onClick={(e) => modalCloseHandler(e)} />}
                </div>
                <div className="overflow-y-auto text-center rounded-lg" style={{ maxHeight: "calc(100vh - 150px)" }}>
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
