import React from "react";
import PropTypes from "prop-types";
import { Overlay, ModalWinow } from "./Modal.styled";
import { useEffect } from "react";


const Modal = ({ children, onClose }) => {

    useEffect(() => {
        const handleKeyDown = event => {
        if (event.code === 'Escape') {
            onClose();
        }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
        window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onClose])

    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) { 
        onClose(); 
        }
    }

    return(
        <Overlay onClick={handleBackdropClick}>
            <ModalWinow> {children}  </ModalWinow>
        </Overlay>
    )
};

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
};

// Modal.propTypes = {
//     children: PropTypes.element.isRequired
// };

export default Modal