import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReviewForm from './CreateReviewForm'
import { useSelector } from 'react-redux'

function CreateReviewModal({ oneSpot }) {
    console.log('oneSpot', oneSpot)
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false)
    if (!sessionUser) return null;
    return sessionUser && sessionUser.id !== oneSpot.ownerId && (
        <div className='reviewbutton'>
            <h3 id='leaveanddeletereview' onClick={() => setShowModal(true)}>Leave a review</h3>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateReviewForm setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    )
}

export default CreateReviewModal;
