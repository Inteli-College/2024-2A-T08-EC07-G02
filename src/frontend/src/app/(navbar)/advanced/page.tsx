"use client";

import { useState } from "react";

export default function Advanced() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    console.log("Arquivo selecionado:", uploadedFile);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor, selecione um arquivo antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3333/datalake", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Arquivo enviado com sucesso!");
      } else {
        alert("Erro ao enviar o arquivo.");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
    }
  };

  return (
    <>
      <div className="flex justify-end space-x-4">

      <input
          id="fileInput"
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="flex space-x-4">
          <button
            className="text-white text-2xl text-center font-bold bg-blue-500 hover:bg-blue-600 rounded-lg p-2 w-auto"
            onClick={handleButtonClick}
          >
            Escolher Base
          </button>
          <button
            className="text-white text-2xl text-center font-bold bg-blue-500 hover:bg-blue-600 rounded-lg p-2 w-auto"
            onClick={handleUpload}
          >
            Enviar Base 
          </button>
        </div>
        {file && <p className="text-black mt-4">Arquivo selecionado: {file.name}</p>}
      </div>


    </>
  );
}
