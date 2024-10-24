
export default function Loading() {
    return (
        <div className="flex-col text-center flex items-center  justify-center h-dvh"> Loading...
            <span className="loading loading-spinner loading-lg  text-info" ></span>

            <div className="flex w-52 flex-col gap-4">
                <div className="flex items-center gap-4">
                    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4">
                        <div className="skeleton h-4 w-20"></div>
                        <div className="skeleton h-4 w-28"></div>
                    </div>
                </div>
                <div className="skeleton h-32 w-full"></div>
            </div>
        </div>
    );
}