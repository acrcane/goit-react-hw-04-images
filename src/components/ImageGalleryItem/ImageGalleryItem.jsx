// import React from "react";
import PropTypes from "prop-types";
import Modal from "components/Modal/Modal";
import { ListItem, GalleryImage} from "./ImageGalleryItem.styled";
import { useState } from "react";
import { createPortal } from "react-dom";




const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => { setShowModal(!showModal) }

        return(
        <ListItem className="gallery-item">
            <GalleryImage src = { webformatURL } alt = { tags } onClick = { toggleModal }/>
            { showModal && createPortal(
            <Modal onClose={toggleModal}>
                <img src={largeImageURL} alt={tags} />
            </Modal>,
                document.getElementById('modal-root')) }
        </ListItem>
    )
};

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags:PropTypes.string.isRequired,
}

export default ImageGalleryItem