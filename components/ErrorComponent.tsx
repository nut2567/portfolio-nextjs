// components/ErrorComponent.tsx

import React from 'react';

interface ErrorComponentProps {
    message?: string;
}

function ErrorComponent({ message }: ErrorComponentProps) {
    return (
        <div className="flex items-center justify-center bg-slate-700">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm text-center my-10">
                <h2 className="text-3xl font-semibold text-red-600 mb-4">เกิดข้อผิดพลาด</h2>
                <p className="text-gray-700">
                    {message || "ขออภัย เกิดข้อผิดพลาดในการโหลดข้อมูล"}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                >
                    ลองใหม่อีกครั้ง
                </button>
            </div>
        </div>
    );
};

export default ErrorComponent;
