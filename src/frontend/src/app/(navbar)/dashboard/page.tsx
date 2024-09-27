'use client';
import React, { useState, useEffect } from 'react';
import { DefaultService } from '@client';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Container,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { saveAs } from 'file-saver';

export default function Dashboard() {
  const [failuresFile, setFailuresFile] = useState<File | null>(null);
  const [resultsFile, setResultsFile] = useState<File | null>(null);
  const [statusFile, setStatusFile] = useState<File | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modelsLoading, setModelsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    setModelsLoading(true);
    DefaultService.listModelsApiModelGet()
      .then((response: any) => {
        if (response && response.models) {
          setModels(response.models);
        }
        setModelsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching models:', error);
        setError('Failed to fetch models.');
        setModelsLoading(false);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!failuresFile || !resultsFile || !statusFile) {
      alert('Please upload all three files.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    DefaultService.requestApiModelTrainPost({
      formData: {
        failures: failuresFile,
        results: resultsFile,
        status: statusFile,
      },
    })
      .then((response) => {
        console.log('Model training started:', response);
        setSuccessMessage('Treinamento realizado com sucesso.');
        return DefaultService.listModelsApiModelGet();
      })
      .then((response: any) => {
        if (response && response.models) {
          setModels(response.models);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error training model:', error);
        setError('Falha ao treinar o modelo.');
        setLoading(false);
      });
  };

  const handleDownload = (modelId: string) => {
    setLoading(true);
    setError('');
    DefaultService.downloadModelApiModelDownloadModelIdGet({ modelId })
      .then((response: any) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        saveAs(blob, modelId);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error downloading model:', error);
        setError('Failed to download the model.');
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: 4, marginBottom: 4, marginTop: 4 }} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Treinamento de modelos
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{xs:12, sm:4}}>
              <Button variant="contained" component="label" fullWidth>
			  	Enviar Falhas
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setFailuresFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </Button>
              {failuresFile && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Arquivo selecionado: {failuresFile.name}
                </Typography>
              )}
            </Grid>
            <Grid size={{xs:12, sm:4}}>
              <Button variant="contained" component="label" fullWidth>
                Enviar Resultados
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setResultsFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </Button>
              {resultsFile && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Arquivo selecionado: {resultsFile.name}
                </Typography>
              )}
            </Grid>
            <Grid size={{xs:12, sm:4}}>
              <Button variant="contained" component="label" fullWidth>
                Enviar Status
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setStatusFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </Button>
              {statusFile && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Arquivo selecionado: {statusFile.name}
                </Typography>
              )}
            </Grid>
            <Grid size={{xs:12}}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} />}
              >
                {loading ? 'Treinando...' : 'Iniciar treinamento'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Paper sx={{ padding: 4, marginBottom: 4 }} elevation={3}>
        <Typography variant="h4" gutterBottom>
         Modelos disponíveis
        </Typography>
        {modelsLoading ? (
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : models.length === 0 ? (
          <Typography>Sem modelos disponíveis.</Typography>
        ) : (
          <Grid container spacing={2}>
            {models.map((model, index) => (
              <Grid size={{xs:12, sm:6, md:4}} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6"><b>{model.split('.')[0]}</b></Typography>
                    <Typography variant="body2">{model}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleDownload(model)}
                      disabled={loading}
                    >
                      Download
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
}
