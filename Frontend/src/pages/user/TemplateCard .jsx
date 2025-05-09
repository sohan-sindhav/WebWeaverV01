const TemplateCard = ({ name, html, css, creator, category }) => {
  const srcDoc = `
       <html>
         <head>
           <style>${css}</style>
         </head>
         <body>${html}</body>
       </html>
     `;

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 w-full max-w-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-indigo-400">{name}</h3>
        <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
          {category}
        </span>
      </div>

      <iframe
        srcDoc={srcDoc}
        title={name}
        sandbox=""
        className="w-full h-48 border rounded bg-white"
      ></iframe>

      <p className="mt-2 text-sm text-gray-400">
        Creator: <span className="text-white font-medium">{creator}</span>
      </p>
    </div>
  );
};
