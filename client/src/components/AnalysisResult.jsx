import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";

function AnalysisResult({ analysisResult, analysisSteps ,setShowCorrection }) {
    const prefixes = ['Input','Sequence','Padded sequence','Predictions']
    return (
        <div className="w-full my-4">
            <div className='result-display border border-black rounded-lg mb-4 text-left p-4'>
                <strong>Analysis Steps:</strong>
                <ul>
                  {analysisSteps.map((step, index) => {
                    // Find if the step starts with any of the prefixes
                    const prefixFound = prefixes.find(prefix => step.startsWith(prefix));

                    if (prefixFound) {
                      // Split the step at the first occurrence of ":"
                      const [firstPart, ...rest] = step.split(':');
                      const restOfStep = rest.join(':'); // Re-join the rest in case it contains ':'

                      return (
                        <li key={index}>
                          <strong>{`${firstPart}:`}</strong>{restOfStep}
                        </li>
                      );
                    }

                    // Default rendering for steps that don't start with any of the defined prefixes
                    return <li key={index}>{step}</li>;
                  })}
                </ul>
                {analysisResult && (
                <div className='analysis-result border border-green-500 rounded-lg p-4 mt-4 text-left'>
                    <strong>Analysis Result:</strong> <span className="result-content">{analysisResult}</span>
                </div>
            )}
            </div>
            
            <Button onClick={() => setShowCorrection(show => !show)} color="green">
              Verify Sentiment
            </Button>
        </div>
    );
}

export default AnalysisResult;
