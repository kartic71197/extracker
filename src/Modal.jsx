import React, { useEffect, useRef } from "react";

    const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-xl shadow-lg"
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
