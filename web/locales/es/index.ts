import { ChatEs } from './chat';
import { CommonEs } from './common';
import { FlowEs } from './flow';
import { ObservabilityEs } from './observability';
import WikiEs from './wiki';
import KsEs from './knowledgeSource';

const es: Record<string, unknown> = {
  ...ChatEs,
  ...FlowEs,
  ...CommonEs,
  ...ObservabilityEs,
  ...WikiEs,
  ...KsEs,
};

export default es;
