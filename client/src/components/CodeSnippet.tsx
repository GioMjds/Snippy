import { FC } from "react"

const CodeSnippet: FC<{ code: string }> = ({ code }) => {
    const lines = code.split("\n");
    const initialLines = lines.slice(0, 20);
    const hasMoreLines = lines.length > 20;

    return (
        <div className="bg-gray-900 rounded-md overflow-hidden">
            {/* Code Snippet Area */}
            <div className={`p-4 font-mono text-sm text-gray-100 whitespace-pre ${hasMoreLines ? 'max-h-[300px] overflow-y-scroll' : ''}`}>
                {initialLines.map((line, index) => (
                    <div key={index} className="leading-relaxed">
                        <span className="text-gray-500 mr-4 inline-block w-4 text-right">{index + 1}</span>{line || <>&nbsp;</>}
                    </div>
                ))}
                {hasMoreLines && (
                    <div className="text-gray-500 leading-relaxed">
                        {lines.slice(20).map((line, index) => (
                            <div key={index + 20} className="leading-relaxed">
                                <span className="text-gray-500 mr-4 inline-block w-4 text-right">{index + 21}</span>{line || <>&nbsp;</>}
                            </div>
                        ))}
                    </div>
                )}
                <div>
                    {hasMoreLines && (
                        <div className="bg-gray-800 p-2 text-center text-gray-400 text-sm cursor-pointer hover:text-gray-300">
                            {/* You could add a button here to expand the full code if needed */}
                            Scroll for more code...
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CodeSnippet