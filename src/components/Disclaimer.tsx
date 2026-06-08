import React from 'react';
import { Link } from 'react-router-dom';

interface DisclaimerProps {
  type?: 'inline' | 'footer' | 'full';
  customText?: string;
  className?: string;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ type = 'inline', customText, className = '' }) => {
  const fullDisclaimer = "Disclaimer: These figures are estimates based on standard assumptions and user inputs. This tool is for informational purposes only and does not replace professional financial, legal, engineering, or agricultural advice. We disclaim all liability for decisions, costs, losses, or damages arising from reliance on these results. Please consult qualified local professionals or certified advisors for guidance specific to your situation.";
  
  const footerDisclaimer = "This tool is for informational purposes only. Results do not replace professional advice.";

  if (type === 'footer') {
    return (
      <div className={`text-[12px] border-l-2 border-slate-300 dark:border-slate-600 pl-3 leading-relaxed text-slate-500 ${className}`}>
        {customText || footerDisclaimer}{' '}
        <Link to="/legal" className="text-slate-900 dark:text-slate-300 font-semibold hover:underline">Read full disclaimer</Link>.
      </div>
    );
  }

  if (type === 'full') {
    return (
      <div className={`prose prose-slate max-w-none text-[15px] ${className}`}>
        <p>
          <strong>Disclaimer:</strong> These figures are estimates based on standard assumptions and user inputs. 
          This tool is for informational purposes only and does not replace professional financial, legal, 
          engineering, or agricultural advice.
        </p>
        <p>
          We disclaim all liability for decisions, costs, losses, or damages arising from reliance on these results. 
          Please consult qualified local professionals or certified advisors for guidance specific to your situation.
        </p>
        {customText && <p>{customText}</p>}
      </div>
    );
  }

  // Inline format used under calculator results
  const textToUse = customText || fullDisclaimer;
  return (
    <div className={`mt-8 p-5 bg-slate-100 border border-slate-200 text-[12px] text-slate-600 leading-relaxed rounded-sm ${className}`}>
      {textToUse}
    </div>
  );
};
