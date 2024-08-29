'use client';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { ReactNode, useEffect, useState } from 'react';
import { StepIconProps } from '@mui/material/StepIcon';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { IoMdSettings } from 'react-icons/io';
import { FaCar, FaCogs, FaHammer, FaPaintBrush } from 'react-icons/fa';
import { Typography } from '@mui/material';

const steps = ['ZP1', 'ZP2', 'ZP3', 'ZP4', 'ZP5', 'ZP6', 'ZP7'];

const ColorlibStepIconRoot = styled('div')<{
	ownerState: { completed?: boolean; active?: boolean; error?: boolean };
}>(({ theme, ownerState }) => ({
	backgroundColor: ownerState.error && ownerState.active ? 'rgb(255,77,77)' : ownerState.active || ownerState.completed ? theme.palette.primary.main : theme.palette.grey[400],
	zIndex: 1,
	color: '#fff',
	width: 50,
	height: 50,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	boxShadow: ownerState.active ? '0 4px 10px 0 rgba(0,0,0,.25)' : 'none',
	backgroundImage:
		ownerState.error && ownerState.active
			? 'linear-gradient(136deg, rgb(255,77,77) 0%, rgb(255,0,0) 50%, rgb(180,0,0) 100%)'
			: ownerState.active || ownerState.completed
			? `linear-gradient(136deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`
			: 'none',
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 22,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage: `linear-gradient(95deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`,
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage: `linear-gradient(95deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`,
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 3,
		border: 0,
		backgroundColor: theme.palette.grey[300],
		borderRadius: 1,
		...(theme.palette.mode === 'dark' && {
			backgroundColor: theme.palette.grey[700],
		}),
	},
}));

function ColorlibStepIcon(props: StepIconProps) {
	const { active, completed, className, error } = props;

	const icons: { [index: string]: React.ReactElement<any> } = {
		1: <FaHammer />,
		2: <IoMdSettings />,
		3: <IoMdSettings />,
		4: <IoMdSettings />,
		5: <FaCar />,
		6: <FaPaintBrush />,
		7: <FaCogs />,
	};

	return (
		<ColorlibStepIconRoot ownerState={{ completed, active, error }} className={className}>
			{icons[String(props.icon)]}
		</ColorlibStepIconRoot>
	);
}

interface ErrorStep {
	step: number;
	error: string;
}

export default function HorizontalLinearStepper() {
	const [activeStep, setActiveStep] = useState(0);
	const [errored, setErrored] = useState(new Set<ErrorStep>([]));

	const getStepError = (step: number) => {
		const errorStep = Array.from(errored).find((error) => error.step === step);
		return errorStep ? errorStep.error : null;
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};
	// Uncomment this to enable autoNext to test the stepper
	/*
	const autoNext = () => {
		if (activeStep < steps.length - 1) {
			setTimeout(() => {
				handleNext();
			}, 1000);
		} else {
			setTimeout(() => {
				handleReset();
			}, 1000);
		}
	};

	useEffect(() => {
		autoNext();
	}, [activeStep]);
	*/

	return (
		<Box sx={{ width: '100%' }}>
			<Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />}>
				{steps.map((label, index) => {
					const stepProps: { completed?: boolean } = {};
					const labelProps: {
						optional?: ReactNode;
						error?: boolean;
					} = {};
					const stepError = getStepError(index);
					if (stepError && activeStep === index) {
						labelProps.optional = (
							<Typography variant="caption" color="error">
								{stepError}
							</Typography>
						);
						labelProps.error = true;
					}

					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon}>
								{label}
							</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</Box>
	);
}
