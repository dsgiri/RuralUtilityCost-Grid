import { ToolMetadata } from './config';

// Import all tools
import { XYMatrix } from './tools/XYMatrix';
import { IfThenLogic } from './tools/IfThenLogic';
import { WeightedScore } from './tools/WeightedScore';
import { DecisionTree } from './tools/DecisionTree';
import { PriorityMatrix } from './tools/PriorityMatrix';
import { CostBenefit } from './tools/CostBenefit';
import { SwotAnalysis } from './tools/SwotAnalysis';
import { RadarProfile } from './tools/RadarProfile';
import { ImpactEffort } from './tools/ImpactEffort';
import { MoscowBoard } from './tools/MoscowBoard';
import { RiceScore } from './tools/RiceScore';
import { ForceField } from './tools/ForceField';
import { FiveWhys } from './tools/FiveWhys';
import { SmartGoals } from './tools/SmartGoals';
import { PestleAnalysis } from './tools/PestleAnalysis';
import { RaciMatrix } from './tools/RaciMatrix';
import { AllocationRing } from './tools/AllocationRing';
import { ProjectTimeline } from './tools/ProjectTimeline';
import { Disclaimer } from '../../components/Disclaimer';

export function ToolRenderer({ tool }: { tool: ToolMetadata }) {
  let ContentToRender = null;
  switch (tool.id) {
    case 'xy-matrix': ContentToRender = XYMatrix; break;
    case 'if-then': ContentToRender = IfThenLogic; break;
    case 'weighted-score': ContentToRender = WeightedScore; break;
    case 'decision-tree': ContentToRender = DecisionTree; break;
    case 'priority-matrix': ContentToRender = PriorityMatrix; break;
    case 'cost-benefit': ContentToRender = CostBenefit; break;
    case 'swot': ContentToRender = SwotAnalysis; break;
    case 'radar': ContentToRender = RadarProfile; break;
    case 'impact-effort': ContentToRender = ImpactEffort; break;
    case 'moscow': ContentToRender = MoscowBoard; break;
    case 'rice': ContentToRender = RiceScore; break;
    case 'force-field': ContentToRender = ForceField; break;
    case 'five-whys': ContentToRender = FiveWhys; break;
    case 'smart-goals': ContentToRender = SmartGoals; break;
    case 'pestle': ContentToRender = PestleAnalysis; break;
    case 'raci': ContentToRender = RaciMatrix; break;
    case 'allocation-ring': ContentToRender = AllocationRing; break;
    case 'timeline': ContentToRender = ProjectTimeline; break;
    default: 
      ContentToRender = () => (
        <div className="p-8 text-center text-slate-500">
           Component for {tool.name} is not fully built yet.
        </div>
      );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 sm:p-8">
        <ContentToRender />
      </div>
      <div className="px-6 sm:px-8 pb-6">
        <Disclaimer type="inline" />
      </div>
    </div>
  );
}
