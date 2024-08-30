'use client';
import React, { useState } from 'react';
import { CustomStepper, StepDetail } from '@components';
import { FaCar, FaCogs, FaHammer, FaPaintBrush } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

const steps = [
	{ name: 'ZP1', icon: <FaHammer />, tooltip: 'Informação sobre ZP1', description: 'Detalhes do ZP1' },
	{ name: 'ZP2', icon: <IoMdSettings />, tooltip: 'Informação sobre ZP2', description: 'Detalhes do ZP2' },
	{ name: 'ZP3', icon: <IoMdSettings />, error: 'Error at Step 3', tooltip: 'Informação sobre ZP3' },
	{ name: 'ZP4', icon: <IoMdSettings />, tooltip: 'Informação sobre ZP4', description: 'Detalhes do ZP4' },
	{ name: 'ZP5', icon: <FaCar />, tooltip: 'Informação sobre ZP5', description: 'Detalhes do ZP5' },
	{ name: 'ZP6', icon: <FaPaintBrush />, tooltip: 'Informação sobre ZP6', description: 'Detalhes do ZP6' },
	{ name: 'ZP7', icon: <FaCogs />, tooltip: 'Informação sobre ZP7', description: 'Detalhes do ZP7' },
] as StepDetail[];

function ExampleUsage() {
	const [currentStep, setCurrentStep] = useState(0);

	const handleStepChange = (step: number) => {
		console.log('Active step is:', step);
		setCurrentStep(step);
	};

	return (
		<div>
			<CustomStepper steps={steps} currentStep={currentStep} onStepChange={handleStepChange} />
			<div style={{ marginTop: '20px' }}>
				<button onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}>Back</button>
				<button onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}>Next</button>
			</div>
		</div>
	);
}

export default ExampleUsage;
