import React from 'react'

export default function FormikFeedback({msg}) {
    return (
        <div>
            <div className="p-2 mb-2 text-xs text-red-400 bg-red-200" role="alert">
                <span className="font-medium">{msg}</span>
            </div>

        </div>
    )
}
