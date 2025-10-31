"use client";

interface Props {
  rawHtml: string; // email HTML
  title: string; // email subject/filename
  label?: string;
}

const buildWrappedHTML = (raw: string, title: string) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>${title}</title>

<style>
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    background: #f5f7fa;
    padding: 40px;
    margin: 0;
  }
  .email-shell {
    max-width: 820px;
    margin: auto;
    background: white;
    border-radius: 14px;
    border: 1px solid #e5e9f0;
    padding: 32px;
    box-shadow: 0px 4px 18px rgba(0,0,0,0.06);
  }
  .email-title {
    font-size: 22px;
    font-weight: 700;
    color: #0A1533;
    margin-bottom: 24px;
  }
  p, span, div, td {
    font-size: 16px;
    line-height: 1.7;
    color: #1f2937;
  }
  img {
    max-width: 100%;
    border-radius: 8px;
    margin: 10px 0;
  }
  img[src*="logo"],
  img[src*="icon"],
  img[src*="facebook"], img[src*="instagram"],
  img[src*="linkedin"], img[src*="twitter"],
  img[src*="favicon"] {
    max-width: 32px !important;
    max-height: 32px !important;
    margin: 0 5px;
    border-radius: 4px;
  }
</style>
</head>

<body>
  <div class="email-shell">
    <div class="email-title">${title}</div>
    <div class="email-content">${raw}</div>
  </div>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    window.print();
    setTimeout(() => window.close(), 400);
  });
</script>

</body>
</html>
`;

export default function EmailPrintButton({
  rawHtml,
  title,
  label = "Save as PDF",
}: Props) {
  const printEmail = () => {
    const wrapped = buildWrappedHTML(rawHtml, title);
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Popup blocked — allow pop-ups for this site.");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(wrapped);
    printWindow.document.close();
  };

  return (
    <button
      onClick={printEmail}
      className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
    >
      {label}
    </button>
  );
}
