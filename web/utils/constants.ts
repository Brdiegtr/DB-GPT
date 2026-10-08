import { ModelType } from '@/types/chat';
import { DBType } from '@/types/db';
import { ModelIconInfo } from '@/types/models';

export const DEFAULT_ICON_URL = '/models/huggingface.svg';

export const MODEL_ICON_MAP: Record<ModelType, { label: string; icon: string }> = new Proxy({} as any, {
  get: (_target, prop) => {
    const modelId = prop as string;
    return {
      label: getModelLabel(modelId),
      icon: getModelIcon(modelId),
    };
  },
});

export const MODEL_ICON_INFO: Record<string, ModelIconInfo> = {
  deepseek: {
    label: 'DeepSeek',
    icon: '/models/deepseek.png',
    patterns: ['deepseek', 'r1'],
  },
  qwen: {
    label: 'Qwen',
    icon: '/models/qwen2.png',
    patterns: ['qwen', 'qwen2', 'qwen2.5', 'qwq', 'qvq'],
  },
  gemini: {
    label: 'Gemini',
    icon: '/models/gemini.png',
    patterns: ['gemini'],
  },
  moonshot: {
    label: 'Moonshot',
    icon: '/models/moonshot.png',
    patterns: ['moonshot', 'kimi'],
  },
  minimax: {
    label: 'MiniMax',
    icon: '/models/minimax.png',
    patterns: ['minimax', 'm3', 'm2.7'],
  },
  doubao: {
    label: 'Doubao',
    icon: '/models/doubao.png',
    patterns: ['doubao'],
  },
  ernie: {
    label: 'ERNIE',
    icon: '/models/ernie.png',
    patterns: ['ernie'],
  },
  proxyllm: {
    label: 'Proxy LLM',
    icon: '/models/chatgpt.png',
    patterns: ['proxy'],
  },
  chatgpt: {
    label: 'ChatGPT',
    icon: '/models/chatgpt.png',
    patterns: ['chatgpt', 'gpt', 'o1', 'o3'],
  },
  vicuna: {
    label: 'Vicuna',
    icon: '/models/vicuna.jpeg',
    patterns: ['vicuna'],
  },
  'glm-4': {
    label: 'GLM-4.7',
    icon: '/models/glm4.png',
    patterns: ['glm-4'],
  },
  chatglm: {
    label: 'ChatGLM',
    icon: '/models/glm4.png',
    patterns: ['chatglm', 'glm'],
  },
  llama: {
    label: 'Llama',
    icon: '/models/llama.jpg',
    patterns: ['llama', 'llama2', 'llama3'],
  },
  baichuan: {
    label: 'Baichuan',
    icon: '/models/baichuan.png',
    patterns: ['baichuan'],
  },
  claude: {
    label: 'Claude',
    icon: '/models/claude.png',
    patterns: ['claude'],
  },
  bard: {
    label: 'Bard',
    icon: '/models/bard.gif',
    patterns: ['bard'],
  },
  tongyi: {
    label: 'Tongyi',
    icon: '/models/tongyi.apng',
    patterns: ['tongyi'],
  },
  yi: {
    label: 'Yi',
    icon: '/models/yi.svg',
    patterns: ['yi'],
  },
  bailing: {
    label: 'Bailing',
    icon: '/models/bailing.svg',
    patterns: ['bailing'],
  },
  wizardlm: {
    label: 'WizardLM',
    icon: '/models/wizardlm.png',
    patterns: ['wizard'],
  },
  internlm: {
    label: 'InternLM',
    icon: '/models/internlm.png',
    patterns: ['internlm'],
  },
  solar: {
    label: 'Solar',
    icon: '/models/solar_logo.png',
    patterns: ['solar'],
  },
  gorilla: {
    label: 'Gorilla',
    icon: '/models/gorilla.png',
    patterns: ['gorilla'],
  },
  zhipu: {
    label: 'Zhipu',
    icon: '/models/glm4.png',
    patterns: ['zhipu'],
  },
  falcon: {
    label: 'Falcon',
    icon: '/models/falcon.jpeg',
    patterns: ['falcon'],
  },
  huggingface: {
    label: 'Hugging Face',
    icon: '/models/huggingface.svg',
    patterns: ['huggingface', 'hf'],
  },
};

export function getModelLabel(modelId: string): string {
  if (!modelId) return '';

  // 1. Try to match directly
  if (MODEL_ICON_INFO[modelId]?.label) {
    return MODEL_ICON_INFO[modelId].label;
  }

  // 2. Try to match by patterns to get the base name, then add version information
  const formattedModelId = modelId.toLowerCase();
  for (const key in MODEL_ICON_INFO) {
    const modelInfo = MODEL_ICON_INFO[key];

    if (modelInfo.patterns && modelInfo.patterns.some(pattern => formattedModelId.includes(pattern.toLowerCase()))) {
      // Try to extract version information from the model ID
      const versionMatch = modelId.match(/[-_](\d+b|\d+\.\d+b?|v\d+(\.\d+)?)/i);
      const sizePart = modelId.match(/[-_](\d+b)/i);

      // Build the display name
      let displayName = modelInfo.label;

      // Add version information
      if (versionMatch && !sizePart) {
        displayName += ` ${versionMatch[1]}`;
      }

      // Add size information
      if (sizePart) {
        displayName += ` ${sizePart[1]}`;
      }

      return displayName;
    }
  }

  // If no match
  return modelId;
}

export function getModelIcon(modelId: string): string {
  if (!modelId) return DEFAULT_ICON_URL;

  // Format the model ID for matching
  const formattedModelId = modelId.toLowerCase();

  // 1. Try to match directly
  if (MODEL_ICON_INFO[modelId]?.icon) {
    return MODEL_ICON_INFO[modelId].icon;
  }

  // 2. Try to match by patterns
  for (const key in MODEL_ICON_INFO) {
    const modelInfo = MODEL_ICON_INFO[key];

    // Check if the model ID contains one of the patterns
    if (modelInfo.patterns && modelInfo.patterns.some(pattern => formattedModelId.includes(pattern.toLowerCase()))) {
      return modelInfo.icon;
    }
  }

  // Try to match by the model prefix
  const modelParts = formattedModelId.split(/[-_]/);
  if (modelParts.length > 0) {
    const modelPrefix = modelParts[0];
    for (const key in MODEL_ICON_INFO) {
      if (modelPrefix === key.toLowerCase()) {
        return MODEL_ICON_INFO[key].icon;
      }
    }
  }

  // If no match, return the default icon
  return DEFAULT_ICON_URL;
}

export const dbMapper: Record<DBType, { label: string; icon: string; desc: string }> = {
  mysql: {
    label: 'MySQL',
    icon: '/icons/mysql.png',
    desc: 'Sistema de gestión de bases de datos relacionales de código abierto, rápido, fiable y escalable.',
  },
  oceanbase: {
    label: 'OceanBase',
    icon: '/icons/oceanbase.png',
    desc: 'Base de datos SQL distribuida ultrarrápida y económica.',
  },
  mssql: {
    label: 'MSSQL',
    icon: '/icons/mssql.png',
    desc: 'Sistema de base de datos relacional potente, escalable y seguro de Microsoft.',
  },
  duckdb: {
    label: 'DuckDB',
    icon: '/icons/duckdb.png',
    desc: 'Base de datos analítica en memoria con procesamiento eficiente de consultas.',
  },
  sqlite: {
    label: 'Sqlite',
    icon: '/icons/sqlite.png',
    desc: 'Base de datos relacional embebida y ligera, sencilla y portable.',
  },
  clickhouse: {
    label: 'ClickHouse',
    icon: '/icons/clickhouse.png',
    desc: 'Base de datos columnar para análisis de alto rendimiento y consultas en tiempo real.',
  },
  oracle: {
    label: 'Oracle',
    icon: '/icons/oracle.png',
    desc: 'Base de datos relacional robusta, escalable y segura, muy usada en empresas.',
  },
  access: {
    label: 'Access',
    icon: '/icons/access.png',
    desc: 'Base de datos relacional de Microsoft, fácil de usar, para aplicaciones pequeñas.',
  },
  mongodb: {
    label: 'MongoDB',
    icon: '/icons/mongodb.png',
    desc: 'Base de datos NoSQL de documentos, flexible y escalable, para apps web y móviles.',
  },
  doris: {
    label: 'ApacheDoris',
    icon: '/icons/doris.png',
    desc: 'Almacén de datos en tiempo real de código abierto de nueva generación.',
  },
  starrocks: {
    label: 'StarRocks',
    icon: '/icons/starrocks.png',
    desc: 'Base de datos analítica de código abierto y alto rendimiento.',
  },
  db2: {
    label: 'DB2',
    icon: '/icons/db2.png',
    desc: 'Sistema de base de datos relacional escalable y seguro desarrollado por IBM.',
  },
  hbase: {
    label: 'HBase',
    icon: '/icons/hbase.png',
    desc: 'Base de datos NoSQL distribuida y escalable para grandes volúmenes de datos estructurados y semiestructurados.',
  },
  redis: {
    label: 'Redis',
    icon: '/icons/redis.png',
    desc: 'Almacén de estructuras de datos en memoria, rápido y versátil, como caché, BD o broker.',
  },
  cassandra: {
    label: 'Cassandra',
    icon: '/icons/cassandra.png',
    desc: 'Base de datos NoSQL distribuida, escalable y tolerante a fallos para grandes volúmenes de datos.',
  },
  couchbase: {
    label: 'Couchbase',
    icon: '/icons/couchbase.png',
    desc: 'Base de datos NoSQL de documentos de alto rendimiento con arquitectura distribuida.',
  },
  omc: { label: 'Omc', icon: '/icons/odc.png', desc: 'Metadatos de Omc.' },
  postgresql: {
    label: 'PostgreSQL',
    icon: '/icons/postgresql.png',
    desc: 'Potente base de datos relacional de código abierto, extensible y fiel a los estándares SQL.',
  },
  gaussdb: {
    label: 'GaussDB',
    icon: '/icons/gaussdb.png',
    desc: 'Base de datos distribuida de Huawei compatible con PostgreSQL',
  },
  openGauss: {
    label: 'openGauss',
    icon: '/icons/opengauss.png',
    desc: 'Base de datos relacional de código abierto compatible con PostgreSQL.',
  },
  vertica: {
    label: 'Vertica',
    icon: '/icons/vertica.png',
    desc: 'Vertica es un almacén de datos SQL con consistencia fuerte y compatible con ACID, diseñado para la escala y complejidad del mundo actual orientado a datos.',
  },
  spark: { label: 'Spark', icon: '/icons/spark.png', desc: 'Motor unificado para análisis de datos a gran escala.' },
  hive: {
    label: 'Hive',
    icon: '/icons/hive.png',
    desc: 'Sistema de almacén de datos distribuido y tolerante a fallos.',
  },
  maxcompute: {
    label: 'MaxCompute',
    icon: '/icons/maxcompute.png',
    desc: 'Servicio de almacén de datos a gran escala y totalmente gestionado de Alibaba Cloud para análisis por lotes.',
  },
  space: { label: 'Space', icon: '/icons/knowledge.png', desc: 'knowledge analytics.' },
  tugraph: {
    label: 'TuGraph',
    icon: '/icons/tugraph.png',
    desc: 'TuGraph is a high-performance graph database jointly developed by Ant Group and Tsinghua University.',
  },
  neo4j: {
    label: 'Neo4j',
    icon: '/icons/neo4j.png',
    desc: 'Neo4j es una base de datos de grafos nativa y muy escalable, diseñada para aprovechar las relaciones entre datos.',
  },
};
