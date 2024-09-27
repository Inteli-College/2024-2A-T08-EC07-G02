'use client';
import React, { useState, useEffect } from 'react';
import { DefaultService } from '@client';
import {
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Alert,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
} from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CheckCircle, Error } from '@mui/icons-material';

export default function LastProcessedKNR() {
  const [knrData, setKnrData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    DefaultService.getLastKnrApiKnrLastProcessedGet()
      .then((response: any) => {
        setKnrData(response.knr);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar o último KNR processado:', error);
        setError('Falha ao buscar o último KNR processado.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!knrData) {
    return (
      <Container maxWidth="md">
        <Alert severity="info" sx={{ mt: 4 }}>
          Nenhum dado de KNR disponível no momento.
        </Alert>
      </Container>
    );
  }

  const predictionText = knrData.prediction === 'FAILURE' ? 'FALHA' : 'NORMAL';
  const predictionColor = knrData.prediction === 'FAILURE' ? 'error' : 'success';
  const predictionIcon =
    knrData.prediction === 'FAILURE' ? (
      <Error color="error" sx={{ mr: 1 }} />
    ) : (
      <CheckCircle color="success" sx={{ mr: 1 }} />
    );

  const steps = [
    'Recebimento do veículo',
    'Inspeção inicial',
    'Análise de dados',
    'Conclusão',
  ];

  const currentStep =
    knrData.prediction === 'FAILURE' ? steps.length - 1: steps.length;

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: 4, marginTop: 4 }} elevation={3}>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{ textAlign: 'center', fontWeight: 'bold' }}
        >
          Análise do Último Veículo Processado
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: 1,
                borderColor: 'grey.300',
                borderRadius: 2,
                padding: 2,
                backgroundColor: '#f9f9f9',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Detalhes do Veículo
              </Typography>
              <Typography variant="body1">
                <strong>ID do Veículo:</strong> {knrData.id}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Status da Análise:</strong>{' '}
                <Box
                  component="span"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: `${predictionColor}.main`,
                    fontWeight: 'bold',
                  }}
                >
                  {predictionIcon}
                  {predictionText}
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Data da Atualização:</strong>{' '}
                {format(new Date(knrData.updated_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stepper activeStep={currentStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label} completed={index < currentStep}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography variant="body2">
                      {index === 0 && 'Veículo recebido para análise.'}
                      {index === 1 && 'Realização de inspeção visual e funcional.'}
                      {index === 2 && 'Processamento e análise dos dados coletados.'}
                      {index === 3 && knrData.prediction === 'FAILURE'
                        ? <Alert severity="error">Possível falha detectada na análise.</Alert>
                        : 'Nenhuma falha detectada.'}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
