import Button from "./Button";

function CorrectionOptions({ handleSentimentCorrection }) {
    // Define a mapping from sentiment to button color
    const sentimentColors = {
        'Positive': 'green',
        'Negative': 'red',
        'Neutral': 'gray'
    };

    return (
        <div className='flex flex-col items-center w-full mt-4'>
            <p className='mb-4'>Please select the correct sentiment:</p>
            <div className='flex flex-row justify-around w-full'>
                {['Positive', 'Negative', 'Neutral'].map((sentiment) => (
                    <Button 
                        key={sentiment} 
                        onClick={() => handleSentimentCorrection(sentiment)} 
                        color={sentimentColors[sentiment]}
                        className='m-2'
                    >
                        {sentiment}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default CorrectionOptions;
