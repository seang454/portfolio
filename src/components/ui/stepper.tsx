"use client";

import React, {
  Children,
  HTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void | Promise<void>;
  completedContent?: ReactNode;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  completeButtonText?: string;
  disableStepIndicators?: boolean;
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  completedContent,
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  completeButtonText = "Complete",
  disableStepIndicators = false,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = async () => {
    setDirection(1);
    try {
      await onFinalStepCompleted();
      updateStep(totalSteps + 1);
    } catch {
      setDirection(0);
    }
  };

  return (
    <div className="flex flex-col" {...rest}>
      <div className={`stepper-shell ${stepCircleContainerClassName}`}>
        <div className={`stepper-head ${stepContainerClassName}`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;

            return (
              <React.Fragment key={stepNumber}>
                <div className="stepper-indicator-wrap">
                  <span className="stepper-indicator-label">{`Step ${stepNumber}`}</span>
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                </div>
                {isNotLastStep ? <StepConnector isComplete={currentStep > stepNumber} /> : null}
              </React.Fragment>
            );
          })}
        </div>

        {isCompleted ? (
          <div className={`stepper-completed ${contentClassName}`}>{completedContent}</div>
        ) : (
          <>
            <StepContentWrapper
              isCompleted={isCompleted}
              currentStep={currentStep}
              direction={direction}
              className={`stepper-content ${contentClassName}`}
            >
              {stepsArray[currentStep - 1]}
            </StepContentWrapper>

            <div className={`stepper-footer ${footerClassName}`}>
              <div className={`mt-8 flex ${currentStep !== 1 ? "justify-between" : "justify-end"}`}>
                {currentStep !== 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="stepper-back"
                    {...backButtonProps}
                  >
                    {backButtonText}
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={isLastStep ? handleComplete : handleNext}
                  className="stepper-next"
                  {...nextButtonProps}
                >
                  {isLastStep ? completeButtonText : nextButtonText}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = "",
}: StepContentWrapperProps) {
  return (
    <div className={className}>
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted ? (
          <SlideTransition key={currentStep} direction={direction}>
            {children}
          </SlideTransition>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
}

function SlideTransition({ children, direction }: SlideTransitionProps) {
  return (
    <motion.div
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35 }}
      style={{ position: "relative" }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "-14%" : "14%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "8%" : "-8%",
    opacity: 0,
  }),
};

export function Step({ children }: { children: ReactNode }) {
  return <div className="stepper-pane">{children}</div>;
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators = false,
}: {
  step: number;
  currentStep: number;
  onClickStep: (clicked: number) => void;
  disableStepIndicators?: boolean;
}) {
  const status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

  return (
    <motion.button
      type="button"
      onClick={() => {
        if (step !== currentStep && !disableStepIndicators) {
          onClickStep(step);
        }
      }}
      className="stepper-indicator-button"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: "rgba(255,255,255,0.08)", color: "#a3afc2" },
          active: { scale: 1, backgroundColor: "#3d93ff", color: "#07111f" },
          complete: { scale: 1, backgroundColor: "#ff8b5d", color: "#07111f" },
        }}
        transition={{ duration: 0.25 }}
        className="stepper-indicator"
      >
        {status === "complete" ? <CheckIcon className="h-4 w-4" /> : <span className="text-sm">{step}</span>}
      </motion.div>
    </motion.button>
  );
}

function StepConnector({ isComplete }: { isComplete: boolean }) {
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: "transparent" },
    complete: { width: "100%", backgroundColor: "#3d93ff" },
  };

  return (
    <div className="stepper-connector-track">
      <motion.div
        className="stepper-connector-fill"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.35 }}
      />
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.08, type: "tween", ease: "easeOut", duration: 0.25 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
