import Button from "./Button";
import CorrectionOptions from "./CorrectionOptions";
import FeedbackMessage from "./FeedbackMessage";
import { useSelector } from 'react-redux';

function AnalysisResult({ analysisResult, analysisSteps ,setShowCorrection, handleSentimentCorrection, showCorrection, feedbackMessage }) {
    const prefixes = ['Input','Sequence','Padded sequence','Predictions']
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    return (
        <div className="w-full my-4">
            {analysisSteps && analysisSteps.length > 0 && (
                <div className='result-display border border-black rounded-lg mb-4 text-left p-4'>
                    <strong>Analysis Steps:</strong>
                    <ul>
                        {analysisSteps.map((step, index) => {
                            const prefixFound = prefixes.find(prefix => step.startsWith(prefix));
                            if (prefixFound) {
                                const [firstPart, ...rest] = step.split(':');
                                const restOfStep = rest.join(':');
                                return (
                                    <li key={index}>
                                        <strong>{`${firstPart}:`}</strong>{restOfStep}
                                    </li>
                                );
                            }
                            return <li key={index}>{step}</li>;
                        })}
                    </ul>

                    {analysisResult && analysisResult.length > 0 && (
                        <div className='analysis-result mt-2 text-left'>
                            <strong>Sentiment:</strong> <span className="result-content text-xl">{analysisResult}</span>

                            {/* Conditionally render the button based on isAuthenticated */}
                            {isAuthenticated && (
                                <Button onClick={() => setShowCorrection(show => !show)} color="green" className='w-full mt-2'>
                                    Verify Sentiment
                                </Button>
                            )}
                            {showCorrection && (
                                <CorrectionOptions handleSentimentCorrection={handleSentimentCorrection} />
                            )}
                            {feedbackMessage && <FeedbackMessage message={feedbackMessage} />}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AnalysisResult;
