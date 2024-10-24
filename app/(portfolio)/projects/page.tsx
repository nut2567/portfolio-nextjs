import { Suspense } from 'react'
export default function Git() {
    return (

        <div className="flex flex-col gap-4">
            <Suspense fallback={
                <div></div>
                }>
                <h3 className="text-foreground">Git</h3>
                <div className="flex flex-col gap-2">
                    <p>
                        Git is a free and open source distributed version control
                        system designed to handle everything from small to very large
                        projects with speed and efficiency.
                    </p>

                </div>
            </Suspense>
        </div>
    )
}   