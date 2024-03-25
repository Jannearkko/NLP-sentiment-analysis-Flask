import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import LoadingSpinner from './LoadingSpinner';
import AnalysisResult from './AnalysisResult';
import Button from './Button';

const socket = io('http://localhost:5000');

function TextInputComponent() {
    const [inputText, setInputText] = useState('');
    const [analysisSteps, setAnalysisSteps] = useState([]);
    const [analysisResult, setAnalysisResult] = useState([]);
    const [documentId, setDocumentId] = useState('');
    const [correctedSentiment, setCorrectedSentiment] = useState('');
    const [showCorrection, setShowCorrection] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        socket.on('analysis_step', (data) => {
            setAnalysisSteps(prevSteps => [...prevSteps, data.message]);
        })

        socket.on('analysis_update', (data) => {
            setAnalysisResult(prevSteps => [...prevSteps, data.result]);
            setDocumentId(data._id);
            setIsLoading(false);
        });

        socket.on('analysis_error', (error) => {
            setAnalysisResult(prevSteps => [...prevSteps, error.error]);
            setIsLoading(false);
        });

        socket.on('correction_response', (data) => {
            setFeedbackMessage(data.message);
            setIsLoading(false);
        });

        socket.on('correction_error', (error) => {
            setFeedbackMessage(error.error);
            setIsLoading(false);
        })

        return () => {
            socket.off('analysis_step');
            socket.off('analysis_update');
            socket.off('analysis_error');
            socket.off('correction_response');
            socket.off('correction_error');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFeedbackMessage('');
        setAnalysisSteps([]);
        setAnalysisResult([]);
        setInputText('');
        
        socket.emit('analyse_text', { text: inputText });
    };
    const handleSentimentCorrection = async (sentiment) => {
        setCorrectedSentiment(sentiment);
        setAnalysisResult(sentiment)
        setShowCorrection(false);
    
        socket.emit('submit_correction', { _id: documentId, correctedSentiment: sentiment });
    };

    return (
        <div className='flex flex-col items-center justify-center my-5 w-full max-w-md mx-auto'>
            <form onSubmit={handleSubmit} className='w-full'>
                <input
                    type="text"
                    className="w-full h-15 p-2.5 mb-2.5 text-lg border rounded border-gray-300"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text to analyze"
                />
                <Button 
                    type="submit"
                    color='blue'
                    className='w-full'
                    >
                    Analyze
                </Button>
            </form>
            {isLoading && <LoadingSpinner />}
            {!isLoading && analysisResult && (
                <AnalysisResult 
                analysisResult={analysisResult} 
                analysisSteps={analysisSteps} 
                setShowCorrection={setShowCorrection} 
                handleSentimentCorrection={handleSentimentCorrection} 
                showCorrection={showCorrection} 
                feedbackMessage={feedbackMessage}
                />
            )}
            
            </div>
  );
}

export default TextInputComponent;
