import React from 'react';

function LimitReachedMessage() {
    return (
            <div className='result-display border rounded-lg mb-4 text-left p-4 bg-red-300'>
                <h2 className='text-xl font-semibold mb-2'>Limit Reached</h2>
                <p>You have reached the limit of 5 analyses per hour. Please wait or log in to continue.</p>
            </div>
    );
}

export default LimitReachedMessage;