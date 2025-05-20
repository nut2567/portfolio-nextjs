"use client";
const DownloadPdfButton: React.FC = () => {
  const handleDownload = async () => {
    const response = await fetch("/api/download-pdf");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Resume.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload} className="btn btn-primary mb-4">
      Download Resume PDF <i className="material-icons ">download</i>
    </button>
  );
};

export default DownloadPdfButton;
