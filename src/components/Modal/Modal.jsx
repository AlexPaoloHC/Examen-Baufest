import React from 'react';

import './Modal.sass';

export const Modal = (props) => {
    return (
        <React.Fragment>
            <div className="c-modal__container p-100">
                <div className="c-modal__body">
                    <div className='c-modal__content'>
                        <div className='c-modal__close' onClick={props.onClose}>X</div>
                        {props.children}
                    </div>
                </div>
                <div className="c-modal__background"></div>
            </div>
        </React.Fragment>
    );
}