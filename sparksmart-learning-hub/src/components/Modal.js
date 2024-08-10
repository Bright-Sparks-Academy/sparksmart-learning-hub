import React, {useState} from 'react'
import "./Modal.css"
import styled, { createGlobalStyle } from "styled-components";

const ChangeInfoButton = styled.button`
  background-color: lightgray;
  height: 1.5rem;
  width: 11rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  cursor: pointer;
`;

const CloseButton = styled.button`
  background-color: lightgray;
  height: 1.5rem;
  width: 5rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  cursor: pointer;
`;

//Function that creates a modal for entering either username/password for now.
const Modal = ({field, textField}) => {
    const[clickModal, setClickModal] = useState(false);
    //Changes the state of clicking on the modal.
    const toggleModal = () => setClickModal(!clickModal);
    return (
        <>
            <ChangeInfoButton onClick = {toggleModal} className = "btn-modal">
                Change {field}
            </ChangeInfoButton>
            {clickModal && 
                <div className = "modal">
                    <div className = "overlay">
                        <div className = "modal-content">
                            <h1>Change {field}</h1>
                            <h4>Please enter your new {field} below</h4>
                            {textField}
                            <CloseButton className = "close-modal" onClick = {toggleModal}>Exit</CloseButton>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Modal;