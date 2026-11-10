/**
 * ============================================================================
 *  SKINA DO PÃO · ERP de Vitrine, Forno e Depósito
 * ============================================================================
 *
 *  Organização do arquivo (de cima para baixo):
 *
 *   1. Tipos ............ contratos de dados (Produto, Perfil, Comanda...)
 *   2. Design system .... paleta única, tons e classes reutilizáveis
 *   3. Ícones SVG ....... biblioteca monoline + mapa de ícones
 *   4. Dados iniciais ... catálogo, perfis RBAC, históricos e notas de exemplo
 *   5. Utilitários ...... funções puras (formatação, ids, cálculos, ledger)
 *   6. Store ............ hook `useSkinaStore` com TODO o estado e as ações
 *   7. Componentes base . Botão, Card, Chip, Stepper, Modal, Alerta...
 *   8. Telas ............ Login, Painel do Dono, Conferência, Cozinha...
 *   9. Modais globais ... PDF A4 e variação brusca
 *  10. App .............. ponto de entrada (Provider + roteamento por aba)
 *
 *  Regra de ouro: as telas só DESENHAM; quem decide e altera dados é a store.
 * ============================================================================
 */

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  ArrowRightLeft,
  Award,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Crown,
  Database,
  DollarSign,
  Download,
  FileText,
  Flame,
  Info,
  KeyRound,
  Lock,
  LogOut,
  Minus,
  Percent,
  PieChart,
  Plus,
  Printer,
  Receipt,
  RotateCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Snowflake,
  Store,
  Sun,
  Sunset,
  TrendingDown,
  TrendingUp,
  Wallet,
  Warehouse,
  X,
  Zap,
} from 'lucide-react';

// ============================================================================
// 1. TIPOS
// ============================================================================

type TipoFluxo = 'cozinha' | 'insumo';
type GiroHorario = 'manha' | 'tarde';
type Prioridade = 'urgente' | 'normal';
type StatusComanda = 'fila' | 'produzindo';
type TipoToast = 'sucesso' | 'erro';
type Papel = 'vitrine' | 'estoque' | 'proprietario';

type IdTela =
  | 'conferencia'
  | 'cozinha'
  | 'abastecimento-insumos'
  | 'nota-fiscal'
  | 'relatorios'
  | 'painel-dono'
  | 'passagem-turno'
  | 'catalogo';

type EscopoPdf = 'executivo' | 'balanco' | 'reposicoes' | 'turno';
type AbaRelatorio = 'repostos' | 'perdas' | 'turnos' | 'balanco';
type FiltroConferencia = 'todos' | 'faltantes' | 'manha' | 'tarde' | 'cozinha' | 'insumos';
type FiltroMovimento = 'todos' | 'insumos' | 'cozinha' | 'notas';

type ComponenteIcone = React.ComponentType<{ className?: string }>;

interface Produto {
  id: string;
  nome: string;
  tipoFluxo: TipoFluxo;
  setor: string;
  giroHorario: GiroHorario;
  unidade: string;
  minimo: number;
  saldoVitrine: number;
  saldoDeposito: number;
  passo: number;
  iconeKey: string;
  corFundoIcone: string;
  custoUnitario: number;
  precoVenda: number;
}

interface Permissoes {
  conferirVitrine: boolean;
  pedirCozinha: boolean;
  concluirCozinha: boolean;
  transferirInsumos: boolean;
  lancarNotaFiscal: boolean;
  gerirCatalogoCustos: boolean;
  verFinanceiroCompleto: boolean;
}

interface Perfil {
  id: string;
  papel: Papel;
  nome: string;
  cargo: string;
  pinPadrao: string;
  foco: string;
  corBadge: string;
  permissoes: Permissoes;
}

interface ItemComanda {
  produtoId: string;
  nome: string;
  qtdSolicitada: number;
  unidade: string;
  setor: string;
  iconeKey: string;
}

interface Comanda {
  id: string;
  idempotencyKey: string;
  criadoEmISO: string;
  horario: string;
  solicitante: string;
  prioridade: Prioridade;
  status: StatusComanda;
  observacao: string;
  itens: ItemComanda[];
}

interface TarefaInsumo {
  id: string;
  idempotencyKey: string;
  produtoId: string;
  nome: string;
  setor: string;
  qtdAbastecer: number;
  unidade: string;
  prioridade: Prioridade;
  iconeKey: string;
  instrucao: string;
}

/** Linha do livro-razão (ledger): toda mudança de saldo gera um registro destes. */
interface RegistroMovimento {
  id: string;
  idempotencyKey: string;
  criadoEmISO: string;
  horario: string;
  produtoId: string;
  produto: string;
  iconeKey: string;
  categoriaRelatorio: string;
  origemFluxo: string;
  antesVitrine: number;
  qtdReposta: number;
  depoisVitrine: number;
  antesDeposito: number;
  depoisDeposito: number;
  unidade: string;
  responsavel: string;
}

interface RegistroPerda {
  id: string;
  idempotencyKey: string;
  criadoEmISO: string;
  horario: string;
  produtoId: string;
  produto: string;
  iconeKey: string;
  qtd: number;
  antesVitrine: number;
  depoisVitrine: number;
  unidade: string;
  motivo: string;
  custoEstimado: number;
  responsavel: string;
}

interface ChecklistTurno {
  vitrineConferida: boolean;
  friosAbastecidos: boolean;
  fornoLimpo: boolean;
  caixaParcialConferido: boolean;
}

interface RegistroTurno {
  id: string;
  idempotencyKey: string;
  criadoEmISO: string;
  horario: string;
  turnoEncerrado: string;
  turnoIniciado: string;
  responsavelEntregou: string;
  responsavelAssumiu: string;
  checklist: ChecklistTurno;
  pendenciasSnapshot: string;
  observacao: string;
}

interface ItemNota {
  id: string;
  produtoId: string;
  iconeKey: string;
  descricaoNota: string;
  qtdEmbalagens: number;
  tipoEmbalagem: string;
  fatorConversao: number;
  unidadeVitrine: string;
  valorUnitarioEmbalagem: number;
  confiancaIA: string;
}

interface NotaFiscal {
  numeroNota: string;
  fornecedor: string;
  itens: ItemNota[];
}

interface CaixaDia {
  pix: number;
  cartao: number;
  dinheiro: number;
  sangriasDespesas: number;
  totalNotasEntrada: number;
}

/** Tudo o que é salvo no localStorage. */
interface EstadoPersistido {
  produtos: Produto[];
  comandasCozinha: Comanda[];
  tarefasInsumos: TarefaInsumo[];
  historicoReposicoes: RegistroMovimento[];
  historicoPerdas: RegistroPerda[];
  historicoTurnos: RegistroTurno[];
  notasProcessadasIds: string[];
  turnoAtual: string;
  caixaDia: CaixaDia;
  salvoEm?: string;
}

interface Toast {
  texto: string;
  tipo: TipoToast;
}

interface VariacaoBrusca {
  produto: Produto;
  saldoAnterior: number;
  novoSaldo: number;
  delta: number;
}

/** Campos do formulário do catálogo (números ficam como texto enquanto o usuário digita). */
interface FormProduto {
  nome: string;
  tipoFluxo: TipoFluxo;
  setor: string;
  giroHorario: GiroHorario;
  unidade: string;
  iconeKey: string;
  minimo: string;
  passo: string;
  saldoVitrine: string;
  saldoDeposito: string;
  custoUnitario: string;
  precoVenda: string;
}

interface DadosPassagemTurno {
  entregou: string;
  assumiu: string;
  checklist: ChecklistTurno;
  observacao: string;
}

// ============================================================================
// 2. DESIGN SYSTEM (paleta única + classes reutilizáveis)
// ----------------------------------------------------------------------------
// Antes havia ~15 tons de bege/marrom quase iguais espalhados pelo código.
// Agora todas as telas usam as mesmas combinações abaixo. Obs.: o Tailwind só
// gera classes que aparecem LITERALMENTE no código, por isso cada string é
// escrita por inteiro (nada de montar `bg-[${cor}]` dinamicamente).
//
//  Cacau (texto/primário) .. #2C1E18 · #362218 · #4A3228
//  Texto secundário ........ #6E5A4F · terciário #8C7A70
//  Superfícies ............. página #F5EFEA · card #FFFDFB · suave #FAF6F2 · realce #F3EAE0
//  Bordas .................. #EBE0D6 (cards) · #E2D5C8 (inputs)
//  Acento (terracota) ...... #C86D51
//  Estados ................. verde #2F5938 · azul #264E63 · laranja #9C441B · erro #8C2D19
// ============================================================================

/** Junta classes ignorando valores falsos: cx('a', cond && 'b') → 'a b'. */
const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const TONS = {
  verde: 'bg-[#E6F0E8] text-[#2F5938] border-[#C5DEC9]',
  azul: 'bg-[#E6EEF2] text-[#264E63] border-[#C2D7E2]',
  laranja: 'bg-[#FDF3EB] text-[#9C441B] border-[#EED0AE]',
  erro: 'bg-[#F5E1DA] text-[#8C2D19] border-[#E2B8AA]',
  neutro: 'bg-[#F3EAE0] text-[#4A3228] border-[#E5D7C8]',
} as const;
type Tom = keyof typeof TONS;

const COR_SOBRETITULO = {
  acento: 'text-[#C86D51]',
  azul: 'text-[#264E63]',
  verde: 'text-[#2F5938]',
} as const;

const ui = {
  card: 'bg-[#FFFDFB] rounded-[22px] border border-[#EBE0D6] shadow-2xs',
  cardSuave: 'bg-[#FAF6F2] rounded-xl border border-[#E5D8CB]',
  input:
    'w-full bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-3 py-2 text-xs font-semibold text-[#2C1E18] focus:outline-none focus:border-[#4A3228]',
  rotulo: 'text-[10.5px] font-semibold text-[#6E5A4F] block mb-1',
  tituloSecao: 'font-serif-display font-bold text-base text-[#2C1E18] flex items-center gap-1.5',
  tituloTela: 'font-serif-display text-[28px] font-bold text-[#2C1E18] leading-tight',
  textoSecundario: 'text-xs text-[#6E5A4F]',
  divisor: 'border-t border-[#F4ECE3]',
};

const VARIANTES_BOTAO = {
  primario: 'bg-[#362218] hover:bg-[#2A1A12] text-white',
  acento: 'bg-[#C86D51] hover:bg-[#B55B3F] text-white',
  sucesso: 'bg-[#2F5938] hover:bg-[#23452B] text-white',
  info: 'bg-[#264E63] hover:bg-[#1D3B4B] text-white',
  perigo: 'bg-[#9E4224] hover:bg-[#8C2D19] text-white',
  suave: 'bg-[#F3EAE0] hover:bg-[#E5D7C8] text-[#4A3228]',
  contorno: 'bg-[#FFFDFB] hover:bg-[#F3EAE0] text-[#4A3228] border border-[#DDD0C3]',
  claro: 'bg-[#F5D6B8] hover:bg-[#EEC9A4] text-[#2C1E18]',
  escuroSuave: 'bg-[#4A3228] hover:bg-[#5A3E2E] text-[#F5D6B8]',
} as const;
type VarianteBotao = keyof typeof VARIANTES_BOTAO;

const TAMANHOS_BOTAO = {
  sm: 'px-2.5 py-1 text-[11px] rounded-lg gap-1',
  md: 'px-3 py-2 text-xs rounded-xl gap-1.5',
  lg: 'w-full py-3 text-xs rounded-xl gap-2',
} as const;
type TamanhoBotao = keyof typeof TAMANHOS_BOTAO;

// ============================================================================
// 3. BIBLIOTECA DE ÍCONES EM VETOR (SVG monoline · strokeWidth 1.8)
// ============================================================================

interface PropsIcone {
  className?: string;
}

/** Moldura comum a todos os ícones: evita repetir os 6 atributos do <svg> em cada desenho. */
function SvgBase({
  className = 'w-7 h-7',
  viewBox = '0 0 24 24',
  strokeWidth = 1.8,
  children,
}: PropsIcone & { viewBox?: string; strokeWidth?: number; children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const IconPaoDeForma = ({ className }: PropsIcone) => (
  <SvgBase className={className}>
    <path d="M5 10.5C3.8 9.5 3.5 7.5 4.5 6C5.5 4.5 7.5 4 9.5 4H14.5C16.5 4 18.5 4.5 19.5 6C20.5 7.5 20.2 9.5 19 10.5V18C19 19.1 18.1 20 17 20H7C5.9 20 5 19.1 5 18V10.5Z" />
    <path d="M8.5 10.5C8 9.8 8 8.6 8.8 7.8C9.4 7.2 10.5 7 12 7" opacity="0.65" />
    <circle cx="14.5" cy="14.5" r="0.6" fill="currentColor" />
    <circle cx="10" cy="15.5" r="0.6" fill="currentColor" />
  </SvgBase>
);

const IconPaoHamburguer = ({ className }: PropsIcone) => (
  <SvgBase className={className}>
    <path d="M4 12C4 7.5 7.5 4.5 12 4.5C16.5 4.5 20 7.5 20 12H4Z" />
    <path d="M3 14.5H21" />
    <path d="M4.5 14.5L5.2 17.5C5.5 18.7 6.5 19.5 7.8 19.5H16.2C17.5 19.5 18.5 18.7 18.8 17.5L19.5 14.5" />
    <path d="M9.5 8.5L10.2 9" strokeWidth="2" />
    <path d="M14 8L14.7 8.5" strokeWidth="2" />
    <path d="M12 6.8H12.1" strokeWidth="2.2" />
  </SvgBase>
);

const IconBiscoitinho = ({ className }: PropsIcone) => (
  <SvgBase className={className}>
    <path d="M12 3C13.8 3 15.2 3.8 16.5 4.5C17.8 5.2 19.5 6.2 20.2 7.8C20.9 9.4 20.5 11.2 20.8 12.8C21.1 14.4 20.2 16.5 19 17.8C17.8 19.1 16.2 20.2 14.5 20.6C12.8 21 11.2 21 9.5 20.5C7.8 20 6 19.2 4.8 17.8C3.6 16.4 3.2 14.5 3.2 12.5C3.2 10.5 3.8 8.5 5 7C6.2 5.5 7.8 4.2 9.5 3.5C10.3 3.2 11.1 3 12 3Z" />
    <circle cx="9.5" cy="9.5" r="1.1" fill="currentColor" />
    <circle cx="14.5" cy="9" r="0.9" fill="currentColor" />
    <circle cx="15" cy="14" r="1.2" fill="currentColor" />
    <circle cx="9" cy="14.8" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="0.7" fill="currentColor" />
  </SvgBase>
);

const IconChurro = ({ className }: PropsIcone) => (
  <SvgBase className={className}>
    <path d="M12 12C12 10.6 13.1 9.5 14.5 9.5C16.2 9.5 17.5 10.8 17.5 12.5C17.5 15 15.5 17 13 17C9.7 17 7 14.3 7 11C7 6.9 10.4 3.5 14.5 3.5C17.8 3.5 20.5 6.2 20.5 9.5" />
    <path d="M14.5 6.5C11.8 6.5 9.8 8.6 9.8 11.2C9.8 13.2 11.4 14.5 13.2 14.5" opacity="0.65" />
    <path d="M7.5 14.5L11.5 20.2C12 20.8 12.9 20.9 13.5 20.4L15.2 19" />
  </SvgBase>
);

const IconPaoFrances = ({ className }: PropsIcone) => (
  <SvgBase className={className}>
    <path d="M6.2 17.8C3.5 15.1 4.2 10.1 7.8 6.5C11.4 2.9 16.4 2.2 19.1 4.9C21.8 7.6 21.1 12.6 17.5 16.2C13.9 19.8 8.9 20.5 6.2 17.8Z" />
    <path d="M8.5 13.8C10 10.8 12.2 8.6 15.2 7.1" />
    <path d="M10.2 15.2C12.2 13.5 14.2 11.5 15.8 9.2" opacity="0.7" />
  </SvgBase>
);

const IconTorrada = ({ className }: PropsIcone) => (
  <SvgBase className={className}>
    <path d="M5.5 10C4.2 9 4 7 5 5.5C6 4.2 7.8 4 9.5 4H14.5C16.2 4 18 4.2 19 5.5C20 7 19.8 9 18.5 10V18C18.5 19.1 17.6 20 16.5 20H7.5C6.4 20 5.5 19.1 5.5 18V10Z" />
    <path d="M8 10.5C7.3 9.8 7.3 8.5 8 7.6C8.5 7 9.5 6.8 10.5 6.8H13.5C14.5 6.8 15.5 7 16 7.6C16.7 8.5 16.7 9.8 16 10.5V16.8H8V10.5Z" opacity="0.6" />
    <path d="M10.5 11.5L11.5 10.5" />
    <path d="M12.5 14.5L13.5 13.5" />
  </SvgBase>
);

const IconRefrigerante = ({ className }: PropsIcone) => (
  <SvgBase className={className}>
    <rect x="7" y="5" width="10" height="15" rx="2.5" />
    <path d="M8.5 5L9.5 3H14.5L15.5 5" />
    <path d="M7 10.5H17" opacity="0.65" />
    <path d="M7 14.5H17" opacity="0.65" />
    <path d="M11 3V2" />
  </SvgBase>
);

const IconPresunto = ({ className }: PropsIcone) => (
  <SvgBase className={className}>
    <path d="M4 13.5C4 9.5 7.5 6.5 12.5 6.5C17 6.5 20 9 20 12.5C20 16 16.5 18.5 11.5 18.5C6.5 18.5 4 16.5 4 13.5Z" />
    <path d="M7.5 11.5C9 10 12.5 9.5 15 11" opacity="0.65" />
    <circle cx="15.5" cy="13.5" r="0.9" fill="currentColor" />
    <circle cx="9.5" cy="14.5" r="0.8" fill="currentColor" />
  </SvgBase>
);

const IconQueijo = ({ className }: PropsIcone) => (
  <SvgBase className={className}>
    <path d="M3.5 15.5L13.5 5.5C16.8 6.8 19.5 9.5 20.5 13L3.5 15.5Z" />
    <path d="M3.5 15.5V18.5C3.5 19.1 4 19.5 4.6 19.5H19.4C20 19.5 20.5 19 20.5 18.4V13" />
    <circle cx="12.5" cy="11.5" r="1.2" />
    <circle cx="9" cy="17.2" r="0.9" fill="currentColor" />
    <circle cx="15.5" cy="16.8" r="1.1" />
  </SvgBase>
);

const IconIogurte = ({ className }: PropsIcone) => (
  <SvgBase className={className}>
    <path d="M6 8.5H18L16.6 19C16.5 19.8 15.8 20.5 15 20.5H9C8.2 20.5 7.5 19.8 7.4 19L6 8.5Z" />
    <path d="M4.5 8.5H19.5" strokeWidth="2" />
    <path d="M8.5 8.5C8.5 6 10 4.5 12 4.5C14 4.5 15.5 6 15.5 8.5" />
    <path d="M14.5 4L16.5 2.5" />
    <path d="M9 13.5C10.5 14.5 13.5 14.5 15 13.5" opacity="0.65" />
  </SvgBase>
);

const IconLogoSkina = ({ className = 'w-10 h-10' }: PropsIcone) => (
  <SvgBase className={className} viewBox="0 0 32 32" strokeWidth={2}>
    <path d="M6 22C3.5 18.5 4.5 12 9 7.5C13.5 3 20 2.5 23.5 6C27 9.5 26 16 21.5 20.5C17 25 10.5 25.5 6 22Z" />
    <path d="M10.5 17C12.5 13.2 15.2 10.5 19 8.5" />
    <path d="M13 19C15.5 16.8 18 14.2 20 11.5" opacity="0.7" />
    <path d="M6 27H26" strokeWidth="1.8" opacity="0.5" />
  </SvgBase>
);

const MAPA_ICONES: Record<string, { label: string; Componente: ComponenteIcone }> = {
  'pao-forma': { label: 'Pão de Forma', Componente: IconPaoDeForma },
  'pao-hamburguer': { label: 'Pão de Hambúrguer', Componente: IconPaoHamburguer },
  biscoitinho: { label: 'Biscoitinho', Componente: IconBiscoitinho },
  churro: { label: 'Churro', Componente: IconChurro },
  'pao-frances': { label: 'Pão Francês', Componente: IconPaoFrances },
  torrada: { label: 'Torrada', Componente: IconTorrada },
  refrigerante: { label: 'Refrigerante', Componente: IconRefrigerante },
  presunto: { label: 'Presunto Fatiado', Componente: IconPresunto },
  queijo: { label: 'Queijo Mussarela', Componente: IconQueijo },
  iogurte: { label: 'Iogurte Natural', Componente: IconIogurte },
};

/** Devolve o componente de ícone de um produto (com um ícone reserva se a chave não existir). */
const obterIcone = (chave: string, reserva: ComponenteIcone = IconPaoFrances): ComponenteIcone =>
  MAPA_ICONES[chave]?.Componente ?? reserva;

// ============================================================================
// 4. CONSTANTES E DADOS INICIAIS
// ============================================================================

/** Mesma chave da versão anterior: os dados já salvos no navegador continuam valendo. */
const STORAGE_KEY = 'skina_do_pao_erp_v4_executivo_pdf';

// Regras de negócio centralizadas (antes eram "números mágicos" soltos no código)
const DURACAO_TOAST_MS = 3600;
const JANELA_CLIQUE_TRIPLO_MS = 600;
const DURACAO_BADGE_MAIS_DEZ_MS = 1300;
const FATOR_VARIACAO_BRUSCA = 5; // alerta se a variação for ≥ 5x o mínimo...
const VARIACAO_BRUSCA_MINIMA = 25; // ...ou ≥ 25 unidades, o que for maior
const META_DESPERDICIO_PCT = 3;
const MARGEM_PADRAO_SEM_PRECO = 2.1; // preço estimado = custo × 2,1 quando não há preço cadastrado
const CUSTO_PADRAO_PERDA = 5;

const TURNOS = {
  manha: 'Manhã (06h às 14h)',
  tarde: 'Tarde (14h às 22h)',
} as const;

/** Categorias do ledger. Usadas tanto para gravar quanto para filtrar relatórios. */
const CATEGORIA_MOVIMENTO = {
  ajuste: 'Ajuste Manual de Conferência (Vitrine)',
  producao: 'Produção / Cozinha ➔ Vitrine',
  transferencia: 'Insumo / Transferência Depósito ➔ Vitrine',
  notaFiscal: 'Entrada Nota Fiscal ➔ Saldo Depósito',
} as const;

const TELAS_EXCLUSIVAS_DONO: IdTela[] = ['relatorios', 'painel-dono'];

const SETOR_PADRAO_POR_FLUXO: Record<TipoFluxo, string> = {
  cozinha: 'Forno Principal',
  insumo: 'Depósito / Geladeira Frente',
};

const COR_FUNDO_POR_FLUXO: Record<TipoFluxo, string> = {
  cozinha: 'bg-[#F3EAE0]',
  insumo: 'bg-[#E6EEF2]',
};

const UNIDADES = ['unidades', 'pacotes', 'kg', 'bandejas'];
const MOTIVOS_PERDA = ['Vencido', 'Queimado / Avaria', 'Amassado na Vitrine', 'Consumo Interno'];

const CAIXA_INICIAL: CaixaDia = {
  pix: 1680.5,
  cartao: 2140.0,
  dinheiro: 720.0,
  sangriasDespesas: 185.0,
  totalNotasEntrada: 696.0,
};

const FORM_PRODUTO_VAZIO: FormProduto = {
  nome: '',
  tipoFluxo: 'cozinha',
  setor: SETOR_PADRAO_POR_FLUXO.cozinha,
  giroHorario: 'manha',
  unidade: 'unidades',
  iconeKey: 'pao-frances',
  minimo: '10',
  passo: '1',
  saldoVitrine: '10',
  saldoDeposito: '0',
  custoUnitario: '5',
  precoVenda: '11',
};

const ITENS_CHECKLIST_TURNO: Array<{ chave: keyof ChecklistTurno; rotulo: string }> = [
  { chave: 'vitrineConferida', rotulo: 'Saldos da vitrine conferidos e atualizados' },
  { chave: 'friosAbastecidos', rotulo: 'Bandejas de presunto e queijo verificadas' },
  { chave: 'fornoLimpo', rotulo: 'Comandas urgentes comunicadas à cozinha' },
  { chave: 'caixaParcialConferido', rotulo: 'Conferência parcial de caixa realizada' },
];

/** Uma única lista de documentos usada no Painel do Dono E no modal do PDF. */
const DOCUMENTOS_PDF: Array<{ id: EscopoPdf; titulo: string; curto: string; sub: string }> = [
  { id: 'executivo', titulo: '1. Dossiê Executivo do Dono', curto: '1. Executivo', sub: 'KPIs, Curva ABC & Caixa' },
  { id: 'balanco', titulo: '2. Balanço Físico-Financeiro', curto: '2. Estoque', sub: 'Vitrine vs. Depósito (R$)' },
  { id: 'reposicoes', titulo: '3. Auditoria de Reposições', curto: '3. Reposições & Perdas', sub: 'Frios, Forno & Perdas' },
  { id: 'turno', titulo: '4. Termo de Passagem de Turno', curto: '4. Turno', sub: 'Checklist & Assinaturas' },
];

const FILTROS_CONFERENCIA: Array<{ id: FiltroConferencia; rotulo: string; icone?: ComponenteIcone }> = [
  { id: 'todos', rotulo: 'Todos' },
  { id: 'faltantes', rotulo: 'Abaixo do Mín.', icone: AlertTriangle },
  { id: 'manha', rotulo: 'Giro Manhã', icone: Sun },
  { id: 'tarde', rotulo: 'Giro Tarde', icone: Sunset },
  { id: 'cozinha', rotulo: 'Só Cozinha/Forno', icone: Flame },
  { id: 'insumos', rotulo: 'Só Insumos/Frios', icone: Snowflake },
];

/** Regra de cada filtro da Conferência, isolada do JSX. */
const REGRAS_FILTRO_CONFERENCIA: Record<FiltroConferencia, (p: Produto) => boolean> = {
  todos: () => true,
  faltantes: (p) => p.saldoVitrine < p.minimo,
  manha: (p) => p.giroHorario === 'manha',
  tarde: (p) => p.giroHorario === 'tarde',
  cozinha: (p) => p.tipoFluxo === 'cozinha',
  insumos: (p) => p.tipoFluxo === 'insumo',
};

const FILTROS_MOVIMENTO: Array<{ id: FiltroMovimento; rotulo: string; categoria?: string }> = [
  { id: 'todos', rotulo: 'Todos os Movimentos' },
  { id: 'insumos', rotulo: 'Só Insumos (Frios/Bebidas)', categoria: CATEGORIA_MOVIMENTO.transferencia },
  { id: 'cozinha', rotulo: 'Só Cozinha (Forno)', categoria: CATEGORIA_MOVIMENTO.producao },
  { id: 'notas', rotulo: 'Entradas Nota Fiscal (Depósito)', categoria: CATEGORIA_MOVIMENTO.notaFiscal },
];

const PRODUTOS_INICIAIS: Produto[] = [
  // PRODUÇÃO PRÓPRIA (COZINHA / FORNO)
  {
    id: 'pao-forma',
    nome: 'Pão de forma',
    tipoFluxo: 'cozinha',
    setor: 'Forno Principal',
    giroHorario: 'manha',
    unidade: 'unidades',
    minimo: 4,
    saldoVitrine: 2,
    saldoDeposito: 0,
    passo: 1,
    iconeKey: 'pao-forma',
    corFundoIcone: 'bg-[#E7ECE4]',
    custoUnitario: 6.5,
    precoVenda: 14.0,
  },
  {
    id: 'pao-hamburguer',
    nome: 'Pão de hambúrguer',
    tipoFluxo: 'cozinha',
    setor: 'Forno Principal',
    giroHorario: 'tarde',
    unidade: 'pacotes',
    minimo: 6,
    saldoVitrine: 0,
    saldoDeposito: 0,
    passo: 1,
    iconeKey: 'pao-hamburguer',
    corFundoIcone: 'bg-[#F3EAE0]',
    custoUnitario: 7.2,
    precoVenda: 15.5,
  },
  {
    id: 'biscoitinho',
    nome: 'Biscoitinho',
    tipoFluxo: 'cozinha',
    setor: 'Confeitaria & Assados',
    giroHorario: 'tarde',
    unidade: 'pacotes',
    minimo: 8,
    saldoVitrine: 9,
    saldoDeposito: 4,
    passo: 1,
    iconeKey: 'biscoitinho',
    corFundoIcone: 'bg-[#E7ECE4]',
    custoUnitario: 5.0,
    precoVenda: 12.0,
  },
  {
    id: 'churro',
    nome: 'Churro',
    tipoFluxo: 'cozinha',
    setor: 'Confeitaria & Fritura',
    giroHorario: 'tarde',
    unidade: 'unidades',
    minimo: 5,
    saldoVitrine: 5,
    saldoDeposito: 0,
    passo: 1,
    iconeKey: 'churro',
    corFundoIcone: 'bg-[#F3EAE0]',
    custoUnitario: 3.2,
    precoVenda: 8.0,
  },
  {
    id: 'pao-frances',
    nome: 'Pão francês',
    tipoFluxo: 'cozinha',
    setor: 'Forno Principal',
    giroHorario: 'manha',
    unidade: 'kg',
    minimo: 3,
    saldoVitrine: 3.5,
    saldoDeposito: 0,
    passo: 0.5,
    iconeKey: 'pao-frances',
    corFundoIcone: 'bg-[#F3EAE0]',
    custoUnitario: 9.5,
    precoVenda: 22.9,
  },
  {
    id: 'torrada',
    nome: 'Torrada',
    tipoFluxo: 'cozinha',
    setor: 'Forno Principal',
    giroHorario: 'manha',
    unidade: 'pacotes',
    minimo: 4,
    saldoVitrine: 4,
    saldoDeposito: 3,
    passo: 1,
    iconeKey: 'torrada',
    corFundoIcone: 'bg-[#F3EAE0]',
    custoUnitario: 4.5,
    precoVenda: 10.5,
  },

  // INSUMOS DE VITRINE / GELADEIRA / FRIOS (dependem do saldoDeposito para abastecer a vitrine)
  {
    id: 'refrigerante',
    nome: 'Refrigerante Lata/600ml',
    tipoFluxo: 'insumo',
    setor: 'Depósito / Geladeira Frente',
    giroHorario: 'tarde',
    unidade: 'unidades',
    minimo: 24,
    saldoVitrine: 14,
    saldoDeposito: 36,
    passo: 1,
    iconeKey: 'refrigerante',
    corFundoIcone: 'bg-[#E6EEF2]',
    custoUnitario: 3.8,
    precoVenda: 7.5,
  },
  {
    id: 'presunto',
    nome: 'Presunto Fatiado (Vitrine)',
    tipoFluxo: 'insumo',
    setor: 'Bancada de Fatiados (Frios)',
    giroHorario: 'manha',
    unidade: 'bandejas',
    minimo: 10,
    saldoVitrine: 4,
    saldoDeposito: 20,
    passo: 1,
    iconeKey: 'presunto',
    corFundoIcone: 'bg-[#F6E4E1]',
    custoUnitario: 8.5,
    precoVenda: 18.9,
  },
  {
    id: 'queijo',
    nome: 'Queijo Mussarela (Vitrine)',
    tipoFluxo: 'insumo',
    setor: 'Bancada de Fatiados (Frios)',
    giroHorario: 'manha',
    unidade: 'bandejas',
    minimo: 10,
    saldoVitrine: 6,
    saldoDeposito: 18,
    passo: 1,
    iconeKey: 'queijo',
    corFundoIcone: 'bg-[#F8EDD6]',
    custoUnitario: 11.2,
    precoVenda: 24.9,
  },
  {
    id: 'iogurte',
    nome: 'Iogurte Natural / Polpa',
    tipoFluxo: 'insumo',
    setor: 'Câmara Fria / Laticínios',
    giroHorario: 'manha',
    unidade: 'unidades',
    minimo: 15,
    saldoVitrine: 9,
    saldoDeposito: 24,
    passo: 1,
    iconeKey: 'iogurte',
    corFundoIcone: 'bg-[#E7ECE4]',
    custoUnitario: 4.2,
    precoVenda: 9.5,
  },
];

/** Perfis com RBAC (Role-Based Access Control) explícito. */
const PERFIS_RBAC: Perfil[] = [
  {
    id: 'vitrine',
    papel: 'vitrine',
    nome: 'Clara Mendes',
    cargo: 'Funcionária 1 · Balcão & Vitrine',
    pinPadrao: '1111',
    foco: 'Acesso Restrito (3 abas): Conferência da vitrine, Cozinha 80mm e Depósito➔Vitrine. Telas de Nota Depósito, Relatórios e Dono/PDF são completamente ocultadas.',
    corBadge: 'bg-[#E6F0E8] text-[#2F5938] border-[#C5DEC9]',
    permissoes: {
      conferirVitrine: true,
      pedirCozinha: true,
      concluirCozinha: true,
      transferirInsumos: true,
      lancarNotaFiscal: false,
      gerirCatalogoCustos: false,
      verFinanceiroCompleto: false,
    },
  },
  {
    id: 'estoque',
    papel: 'estoque',
    nome: 'Mateus Rocha',
    cargo: 'Estoque & Compras (Depósito)',
    pinPadrao: '2222',
    foco: 'Acesso Estoque (4 abas): Conferência da vitrine, Cozinha 80mm, Depósito➔Vitrine e Lançamento de Notas Fiscais no Depósito. Sem acesso a Relatórios ou Painel da Dona.',
    corBadge: 'bg-[#E6EEF2] text-[#264E63] border-[#C2D7E2]',
    permissoes: {
      conferirVitrine: true,
      pedirCozinha: true,
      concluirCozinha: true,
      transferirInsumos: true,
      lancarNotaFiscal: true,
      gerirCatalogoCustos: true,
      verFinanceiroCompleto: false,
    },
  },
  {
    id: 'proprietario',
    papel: 'proprietario',
    nome: 'Dona Maria / Seu Antônio',
    cargo: 'Proprietária · Acesso Total (Admin)',
    pinPadrao: '1234',
    foco: 'Acesso Irrestrito (6 abas): Gestão completa da padaria, Nota Depósito, Relatórios Financeiros, Margens de Lucro, Gestão de Custos e Emissão de Relatório Oficial em PDF A4.',
    corBadge: 'bg-[#362218] text-[#FFFDFB] border-[#362218]',
    permissoes: {
      conferirVitrine: true,
      pedirCozinha: true,
      concluirCozinha: true,
      transferirInsumos: true,
      lancarNotaFiscal: true,
      gerirCatalogoCustos: true,
      verFinanceiroCompleto: true,
    },
  },
];

const COMANDAS_COZINHA_INICIAIS: Comanda[] = [
  {
    id: 'COZ-101',
    idempotencyKey: 'idem-coz-101',
    criadoEmISO: '2026-11-03T07:40:00.000Z',
    horario: '07:40',
    solicitante: 'Clara Mendes',
    prioridade: 'urgente',
    status: 'produzindo',
    observacao: 'Vitrine zerou pacote de hambúrguer e falta pão de forma!',
    itens: [
      { produtoId: 'pao-hamburguer', nome: 'Pão de hambúrguer', qtdSolicitada: 6, unidade: 'pacotes', setor: 'Forno Principal', iconeKey: 'pao-hamburguer' },
      { produtoId: 'pao-forma', nome: 'Pão de forma', qtdSolicitada: 4, unidade: 'unidades', setor: 'Forno Principal', iconeKey: 'pao-forma' },
    ],
  },
];

const TAREFAS_INSUMOS_INICIAIS: TarefaInsumo[] = [
  {
    id: 'ins-1',
    idempotencyKey: 'idem-ins-1',
    produtoId: 'presunto',
    nome: 'Presunto Fatiado (Vitrine)',
    setor: 'Bancada de Fatiados (Frios)',
    qtdAbastecer: 6,
    unidade: 'bandejas',
    prioridade: 'urgente',
    iconeKey: 'presunto',
    instrucao: 'Transferir do Depósito/Câmara Fria e fatiar 6 bandejas para a vitrine',
  },
  {
    id: 'ins-2',
    idempotencyKey: 'idem-ins-2',
    produtoId: 'queijo',
    nome: 'Queijo Mussarela (Vitrine)',
    setor: 'Bancada de Fatiados (Frios)',
    qtdAbastecer: 4,
    unidade: 'bandejas',
    prioridade: 'normal',
    iconeKey: 'queijo',
    instrucao: 'Transferir do Depósito e selar 4 bandejas de 200g',
  },
  {
    id: 'ins-3',
    idempotencyKey: 'idem-ins-3',
    produtoId: 'refrigerante',
    nome: 'Refrigerante Lata/600ml',
    setor: 'Depósito / Geladeira Frente',
    qtdAbastecer: 10,
    unidade: 'unidades',
    prioridade: 'normal',
    iconeKey: 'refrigerante',
    instrucao: 'Retirar 10 latas do saldo do Depósito e abastecer geladeira frontal',
  },
  {
    id: 'ins-4',
    idempotencyKey: 'idem-ins-4',
    produtoId: 'iogurte',
    nome: 'Iogurte Natural / Polpa',
    setor: 'Câmara Fria / Laticínios',
    qtdAbastecer: 6,
    unidade: 'unidades',
    prioridade: 'normal',
    iconeKey: 'iogurte',
    instrucao: 'Transferir da Câmara Fria para a vitrine refrigerada',
  },
];

const HISTORICO_REPOSICOES_INICIAL: RegistroMovimento[] = [
  {
    id: 'rep-101',
    idempotencyKey: 'ledger-rep-101',
    criadoEmISO: '2026-11-03T07:15:00.000Z',
    horario: '07:15',
    produtoId: 'refrigerante',
    produto: 'Refrigerante Lata/600ml',
    iconeKey: 'refrigerante',
    categoriaRelatorio: CATEGORIA_MOVIMENTO.transferencia,
    origemFluxo: 'Guia de Abastecimento (Depósito)',
    antesVitrine: 6,
    qtdReposta: 8,
    depoisVitrine: 14,
    antesDeposito: 44,
    depoisDeposito: 36,
    unidade: 'unidades',
    responsavel: 'Mateus Rocha',
  },
  {
    id: 'rep-102',
    idempotencyKey: 'ledger-rep-102',
    criadoEmISO: '2026-11-03T07:30:00.000Z',
    horario: '07:30',
    produtoId: 'presunto',
    produto: 'Presunto Fatiado (Vitrine)',
    iconeKey: 'presunto',
    categoriaRelatorio: CATEGORIA_MOVIMENTO.transferencia,
    origemFluxo: 'Bancada de Fatiados',
    antesVitrine: 1,
    qtdReposta: 3,
    depoisVitrine: 4,
    antesDeposito: 23,
    depoisDeposito: 20,
    unidade: 'bandejas',
    responsavel: 'Clara Mendes',
  },
  {
    id: 'rep-103',
    idempotencyKey: 'ledger-rep-103',
    criadoEmISO: '2026-11-03T08:00:00.000Z',
    horario: '08:00',
    produtoId: 'pao-frances',
    produto: 'Pão francês',
    iconeKey: 'pao-frances',
    categoriaRelatorio: CATEGORIA_MOVIMENTO.producao,
    origemFluxo: 'Comanda Cozinha #COZ-099',
    antesVitrine: 1.0,
    qtdReposta: 2.5,
    depoisVitrine: 3.5,
    antesDeposito: 0,
    depoisDeposito: 0,
    unidade: 'kg',
    responsavel: 'Clara Mendes',
  },
];

const HISTORICO_PERDAS_INICIAL: RegistroPerda[] = [
  {
    id: 'perda-1',
    idempotencyKey: 'ledger-loss-1',
    criadoEmISO: '2026-11-03T06:50:00.000Z',
    horario: '06:50',
    produtoId: 'pao-frances',
    produto: 'Pão francês',
    iconeKey: 'pao-frances',
    qtd: 0.5,
    antesVitrine: 4.0,
    depoisVitrine: 3.5,
    unidade: 'kg',
    motivo: 'Queimado / Avaria',
    custoEstimado: 4.75,
    responsavel: 'Clara Mendes',
  },
];

const HISTORICO_TURNOS_INICIAL: RegistroTurno[] = [
  {
    id: 'turno-01',
    idempotencyKey: 'ledger-shift-01',
    criadoEmISO: '2026-11-02T14:00:00.000Z',
    horario: 'Ontem · 14:00',
    turnoEncerrado: TURNOS.manha,
    turnoIniciado: TURNOS.tarde,
    responsavelEntregou: 'Clara Mendes',
    responsavelAssumiu: 'Mateus Rocha',
    checklist: {
      vitrineConferida: true,
      friosAbastecidos: true,
      fornoLimpo: true,
      caixaParcialConferido: true,
    },
    pendenciasSnapshot: '0 comandas no forno · 1 insumo pendente',
    observacao: 'Vitrine entregue abastecida. Pão francês com fornada fresca às 13h45.',
  },
];

/** Notas fiscais de exemplo para demonstrar a trava de idempotência (chave única). */
const LOTES_NOTAS_EXEMPLO: Record<string, NotaFiscal> = {
  'NF-000482': {
    numeroNota: 'NF-000482',
    fornecedor: 'Distribuidora Frios & Bebidas Acre LTDA',
    itens: [
      {
        id: 'nf-1',
        produtoId: 'refrigerante',
        iconeKey: 'refrigerante',
        descricaoNota: 'Fardo Refrigerante Lata 350ml (Pack c/ 12)',
        qtdEmbalagens: 2,
        tipoEmbalagem: 'fardos',
        fatorConversao: 12,
        unidadeVitrine: 'unidades',
        valorUnitarioEmbalagem: 42.0,
        confiancaIA: 'Alta (99%)',
      },
      {
        id: 'nf-2',
        produtoId: 'presunto',
        iconeKey: 'presunto',
        descricaoNota: 'Peça Presunto Cozido Magro Seara (Peça 3kg)',
        qtdEmbalagens: 2,
        tipoEmbalagem: 'peças',
        fatorConversao: 10,
        unidadeVitrine: 'bandejas',
        valorUnitarioEmbalagem: 84.0,
        confiancaIA: 'Alta (98%)',
      },
      {
        id: 'nf-3',
        produtoId: 'queijo',
        iconeKey: 'queijo',
        descricaoNota: 'Bloco Queijo Mussarela Laticínios Acre (Peça 3kg)',
        qtdEmbalagens: 2,
        tipoEmbalagem: 'blocos',
        fatorConversao: 10,
        unidadeVitrine: 'bandejas',
        valorUnitarioEmbalagem: 112.0,
        confiancaIA: 'Alta (97%)',
      },
      {
        id: 'nf-4',
        produtoId: 'iogurte',
        iconeKey: 'iogurte',
        descricaoNota: 'Caixa Iogurte Natural Integral (Caixa c/ 8 un)',
        qtdEmbalagens: 3,
        tipoEmbalagem: 'caixas',
        fatorConversao: 8,
        unidadeVitrine: 'unidades',
        valorUnitarioEmbalagem: 32.0,
        confiancaIA: 'Média (92%)',
      },
    ],
  },
  'NF-000519': {
    numeroNota: 'NF-000519',
    fornecedor: 'Laticínios & Bebidas Rio Branco S/A',
    itens: [
      {
        id: 'nf-b1',
        produtoId: 'refrigerante',
        iconeKey: 'refrigerante',
        descricaoNota: 'Pack Refrigerante 600ml (Fardo c/ 6)',
        qtdEmbalagens: 4,
        tipoEmbalagem: 'fardos',
        fatorConversao: 6,
        unidadeVitrine: 'unidades',
        valorUnitarioEmbalagem: 28.0,
        confiancaIA: 'Alta (99%)',
      },
      {
        id: 'nf-b2',
        produtoId: 'iogurte',
        iconeKey: 'iogurte',
        descricaoNota: 'Bandeja Iogurte Polpa Morango (c/ 12 un)',
        qtdEmbalagens: 2,
        tipoEmbalagem: 'bandejas',
        fatorConversao: 12,
        unidadeVitrine: 'unidades',
        valorUnitarioEmbalagem: 45.0,
        confiancaIA: 'Alta (96%)',
      },
    ],
  },
};

const CHAVE_NOTA_INICIAL = 'NF-000482';

// ============================================================================
// 5. UTILITÁRIOS PUROS (sem efeitos colaterais: mesma entrada → mesma saída)
// ============================================================================

const ID_FOLHA_A4 = 'folha-oficial-pdf-a4';
const ID_AREA_80MM = 'area-impressao-80mm';

/** Id único legível: "prefixo-1730000000000-ab12c". */
const gerarIdUnico = (prefixo = 'id') =>
  `${prefixo}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

/** Id curto de comanda baseado no relógio (não colide como o antigo Math.random de 3 dígitos). */
const gerarIdComanda = () => `COZ-${Date.now().toString(36).slice(-5).toUpperCase()}`;

/** Arredonda evitando lixo de ponto flutuante (0,1 + 0,2 = 0,30000000000000004). */
const arredondar = (valor: number, casas = 2) => Number((Number(valor) || 0).toFixed(casas));

/** Soma uma lista de números já arredondando o resultado. */
const somar = (valores: number[]) => arredondar(valores.reduce((total, v) => total + v, 0));

/** Converte texto digitado ("3,5" ou "3.5") em número. Retorna NaN se não for número. */
const paraNumero = (valor: unknown) => {
  const numero = parseFloat(String(valor ?? '').replace(',', '.'));
  return Number.isFinite(numero) ? numero : NaN;
};

/** 3.5 → "3,5" (sem separador de milhar, para poder ser lido de volta por `paraNumero`). */
const formatarNumero = (num: number) => String(arredondar(num)).replace('.', ',');

/** 1680.5 → "R$ 1.680,50". */
const formatarMoeda = (valor: number) =>
  Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/** Hora atual no formato "HH:MM". */
const horarioAgora = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

/** Par de campos de data usado em todo registro auditável. */
const carimboDeTempo = () => ({ criadoEmISO: new Date().toISOString(), horario: horarioAgora() });

const estaAbaixoDoMinimo = (p: Produto) => p.saldoVitrine < p.minimo;

/** Quanto falta para a vitrine atingir o mínimo (nunca negativo). */
const quantidadeFaltante = (p: Produto) => Math.max(0, arredondar(p.minimo - p.saldoVitrine));

/** Substitui, de forma imutável, o item com o `id` informado. */
function atualizarPorId<T extends { id: string }>(lista: T[], id: string, alterar: (item: T) => T): T[] {
  return lista.map((item) => (item.id === id ? alterar(item) : item));
}

/**
 * Fábrica única de registros do ledger. Antes, o mesmo objeto de 16 campos era
 * montado à mão em 4 lugares diferentes; agora todos passam por aqui.
 */
function criarMovimento({
  produto,
  categoria,
  origem,
  qtd,
  novoSaldoVitrine = produto.saldoVitrine,
  novoSaldoDeposito = produto.saldoDeposito,
  responsavel,
  idempotencyKey = gerarIdUnico('ledger'),
}: {
  produto: Produto;
  categoria: string;
  origem: string;
  qtd: number;
  novoSaldoVitrine?: number;
  novoSaldoDeposito?: number;
  responsavel: string;
  idempotencyKey?: string;
}): RegistroMovimento {
  return {
    id: gerarIdUnico('mov'),
    idempotencyKey,
    ...carimboDeTempo(),
    produtoId: produto.id,
    produto: produto.nome,
    iconeKey: produto.iconeKey,
    categoriaRelatorio: categoria,
    origemFluxo: origem,
    antesVitrine: produto.saldoVitrine,
    qtdReposta: qtd,
    depoisVitrine: novoSaldoVitrine,
    antesDeposito: produto.saldoDeposito,
    depoisDeposito: novoSaldoDeposito,
    unidade: produto.unidade,
    responsavel,
  };
}

/** Converte um produto em uma linha de comanda da cozinha. */
const itemDeComanda = (p: Produto, qtdSolicitada: number): ItemComanda => ({
  produtoId: p.id,
  nome: p.nome,
  qtdSolicitada,
  unidade: p.unidade,
  setor: p.setor,
  iconeKey: p.iconeKey,
});

/** Monta uma comanda nova (sempre começa na fila). */
function criarComanda(
  itens: ItemComanda[],
  dados: { solicitante: string; prioridade: Prioridade; observacao: string }
): Comanda {
  return {
    id: gerarIdComanda(),
    idempotencyKey: gerarIdUnico('idem-coz'),
    ...carimboDeTempo(),
    status: 'fila',
    itens,
    ...dados,
  };
}

/** Instrução padrão de abastecimento: frios precisam ser fatiados, o resto só transferido. */
const instrucaoPadraoInsumo = (p: Produto) =>
  p.id === 'presunto' || p.id === 'queijo'
    ? 'Retirar peça do Depósito, fatiar e abastecer vitrine'
    : `Transferir do saldo do Depósito (${p.setor}) para a Vitrine`;

/** Monta uma tarefa nova para a Guia de Abastecimento. */
const criarTarefaInsumo = (p: Produto, qtdAbastecer: number, prioridade: Prioridade): TarefaInsumo => ({
  id: gerarIdUnico('ins'),
  idempotencyKey: gerarIdUnico('idem-ins'),
  produtoId: p.id,
  nome: p.nome,
  setor: p.setor,
  qtdAbastecer,
  unidade: p.unidade,
  prioridade,
  iconeKey: p.iconeKey,
  instrucao: instrucaoPadraoInsumo(p),
});

/**
 * Calcula todos os indicadores executivos (patrimônio, margem, perdas, caixa).
 * É uma função pura: recebe os dados e devolve os números, sem tocar em estado.
 */
function calcularKpis(produtos: Produto[], perdas: RegistroPerda[], caixa: CaixaDia) {
  const analiseProdutos = produtos.map((p) => {
    const custo = Number(p.custoUnitario) || 0;
    const preco = Number.isFinite(p.precoVenda) ? p.precoVenda : arredondar(custo * MARGEM_PADRAO_SEM_PRECO);
    const valorCustoVitrine = arredondar(p.saldoVitrine * custo);
    const valorCustoDeposito = arredondar(p.saldoDeposito * custo);

    return {
      ...p,
      custoUnitario: custo,
      precoVenda: preco,
      lucroUnitario: arredondar(preco - custo),
      margemPct: preco > 0 ? arredondar(((preco - custo) / preco) * 100, 1) : 0,
      valorCustoVitrine,
      valorCustoDeposito,
      valorVendaVitrine: arredondar(p.saldoVitrine * preco),
      valorPatrimonioTotal: arredondar(valorCustoVitrine + valorCustoDeposito),
    };
  });

  const custoTotalVitrine = somar(analiseProdutos.map((p) => p.valorCustoVitrine));
  const custoTotalDeposito = somar(analiseProdutos.map((p) => p.valorCustoDeposito));
  const patrimonioTotalCusto = arredondar(custoTotalVitrine + custoTotalDeposito);
  const vendaPotencialVitrine = somar(analiseProdutos.map((p) => p.valorVendaVitrine));
  const margemMediaGlobal = analiseProdutos.length
    ? arredondar(somar(analiseProdutos.map((p) => p.margemPct)) / analiseProdutos.length, 1)
    : 0;

  const totalPerdasReais = somar(perdas.map((p) => Number(p.custoEstimado) || 0));
  const indiceDesperdicioPct =
    patrimonioTotalCusto > 0
      ? arredondar((totalPerdasReais / (patrimonioTotalCusto + totalPerdasReais)) * 100)
      : 0;

  const receitaBrutaCaixa = arredondar(caixa.pix + caixa.cartao + caixa.dinheiro);
  const saldoLiquidoCaixa = arredondar(
    receitaBrutaCaixa - (caixa.sangriasDespesas || 0) - caixa.totalNotasEntrada
  );

  return {
    analiseProdutos,
    custoTotalVitrine,
    custoTotalDeposito,
    patrimonioTotalCusto,
    vendaPotencialVitrine,
    lucroPotencialVitrine: arredondar(vendaPotencialVitrine - custoTotalVitrine),
    margemMediaGlobal,
    totalPerdasReais,
    indiceDesperdicioPct,
    dentroDaMetaDesperdicio: indiceDesperdicioPct <= META_DESPERDICIO_PCT,
    campeoesMargem: [...analiseProdutos].sort((a, b) => b.margemPct - a.margemPct).slice(0, 3),
    riscoRuptura: analiseProdutos.filter(estaAbaixoDoMinimo),
    receitaBrutaCaixa,
    saldoLiquidoCaixa,
  };
}

type Kpis = ReturnType<typeof calcularKpis>;
type ProdutoAnalisado = Kpis['analiseProdutos'][number];

/** Lê o que foi salvo no navegador. Se não houver nada (ou estiver corrompido), devolve {}. */
function carregarEstadoSalvo(): Partial<EstadoPersistido> {
  try {
    const bruto = localStorage.getItem(STORAGE_KEY);
    return bruto ? (JSON.parse(bruto) as Partial<EstadoPersistido>) : {};
  } catch {
    return {};
  }
}

/** Preenche o formulário do catálogo com os dados de um produto existente. */
const produtoParaForm = (p: Produto): FormProduto => ({
  nome: p.nome,
  tipoFluxo: p.tipoFluxo,
  setor: p.setor,
  giroHorario: p.giroHorario,
  unidade: p.unidade,
  iconeKey: p.iconeKey,
  minimo: String(p.minimo),
  passo: String(p.passo),
  saldoVitrine: String(p.saldoVitrine),
  saldoDeposito: String(p.saldoDeposito),
  custoUnitario: String(p.custoUnitario),
  precoVenda: String(p.precoVenda),
});

interface ResultadoValidacao {
  ok: boolean;
  erro?: string;
  dados?: Omit<Produto, 'id' | 'corFundoIcone'>;
}

/** Valida o formulário do catálogo. Retorna os dados limpos OU a mensagem de erro. */
function validarFormProduto(form: FormProduto): ResultadoValidacao {
  const nome = form.nome.trim();
  const minimo = paraNumero(form.minimo);
  const passo = paraNumero(form.passo);
  const saldoVitrine = paraNumero(form.saldoVitrine);
  const saldoDeposito = paraNumero(form.saldoDeposito);
  const custoUnitario = paraNumero(form.custoUnitario);
  const precoVenda = paraNumero(form.precoVenda);
  const negativoOuInvalido = (n: number) => Number.isNaN(n) || n < 0;

  if (nome.length < 2) return { ok: false, erro: 'O nome do produto deve ter pelo menos 2 caracteres.' };
  if (negativoOuInvalido(minimo)) return { ok: false, erro: 'A meta mínima deve ser maior ou igual a zero.' };
  if (negativoOuInvalido(saldoVitrine) || negativoOuInvalido(saldoDeposito))
    return { ok: false, erro: 'Os saldos de Vitrine e Depósito não podem ser negativos.' };
  if (Number.isNaN(passo) || passo <= 0) return { ok: false, erro: 'O passo de incremento deve ser maior que zero.' };
  if (negativoOuInvalido(custoUnitario)) return { ok: false, erro: 'O custo unitário deve ser maior ou igual a zero.' };
  if (negativoOuInvalido(precoVenda)) return { ok: false, erro: 'O preço de venda deve ser maior ou igual a zero.' };

  return {
    ok: true,
    dados: {
      nome,
      tipoFluxo: form.tipoFluxo,
      setor: form.setor,
      giroHorario: form.giroHorario,
      unidade: form.unidade,
      iconeKey: form.iconeKey,
      minimo,
      passo,
      saldoVitrine,
      saldoDeposito,
      custoUnitario,
      precoVenda,
    },
  };
}

/** Força o download de um texto como arquivo. */
function baixarArquivo(conteudo: string, nomeArquivo: string, tipo: string) {
  const url = URL.createObjectURL(new Blob([conteudo], { type: tipo }));
  const link = document.createElement('a');
  link.href = url;
  link.download = nomeArquivo;
  link.click();
  // Revogar na hora pode cancelar o download em alguns navegadores.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Embrulha o conteúdo da folha A4 num HTML autônomo que já abre a janela de impressão. */
const montarHtmlA4 = (conteudo: string, escopo: EscopoPdf) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Relatorio_Oficial_Skina_do_Pao_${escopo.toUpperCase()}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    @page { size: A4; margin: 12mm; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #FFF; color: #1C1917; }
    .font-serif-display { font-family: 'Fraunces', Georgia, serif; }
  </style>
</head>
<body class="p-6">
  ${conteudo}
  <script>window.onload = () => setTimeout(() => window.print(), 400);</script>
</body>
</html>`;

// ============================================================================
// 6. STORE — todo o estado e todas as regras de negócio num só lugar
// ----------------------------------------------------------------------------
// As telas leem dados e chamam ações via `useSkina()`. Nenhuma tela altera
// `produtos`, `historico...` ou `caixaDia` diretamente.
// ============================================================================

/** Sintetiza o bip de alerta e o som mecânico da impressora térmica 80mm via Web Audio API. */
function tocarSomImpressoraTermica() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Beep inicial duplo de comanda saindo na cozinha
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(880, now);
    osc1.frequency.setValueAtTime(1318.5, now + 0.12);
    gain1.gain.setValueAtTime(0.18, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.3);

    // Tracionamento da bobina de papel térmico (buzz mecânico)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(150, now + 0.28);
    osc2.frequency.linearRampToValueAtTime(85, now + 0.75);
    gain2.gain.setValueAtTime(0.09, now + 0.28);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.28);
    osc2.stop(now + 0.75);
  } catch {
    // Autoplay bloqueado ou sem suporte de áudio no cliente
  }
}

function useSkinaStore() {
  // ---------------------------------------------------------------- estado salvo (lido 1x)
  const [salvo] = useState(carregarEstadoSalvo);

  // ---------------------------------------------------------------- sessão e navegação
  const [perfilAtivo, setPerfilAtivo] = useState<Perfil | null>(null);
  const [telaAtual, setTelaAtual] = useState<IdTela>('conferencia');
  const [abaRelatorio, setAbaRelatorio] = useState<AbaRelatorio>('repostos');

  // ---------------------------------------------------------------- simulação de impressão térmica (80mm)
  const [comandaEmImpressao, setComandaEmImpressao] = useState<Comanda | null>(null);

  // ---------------------------------------------------------------- dados persistidos
  const [produtos, setProdutos] = useState<Produto[]>(() => salvo.produtos ?? PRODUTOS_INICIAIS);
  const [comandasCozinha, setComandasCozinha] = useState<Comanda[]>(
    () => salvo.comandasCozinha ?? COMANDAS_COZINHA_INICIAIS
  );
  const [tarefasInsumos, setTarefasInsumos] = useState<TarefaInsumo[]>(
    () => salvo.tarefasInsumos ?? TAREFAS_INSUMOS_INICIAIS
  );
  const [historicoReposicoes, setHistoricoReposicoes] = useState<RegistroMovimento[]>(
    () => salvo.historicoReposicoes ?? HISTORICO_REPOSICOES_INICIAL
  );
  const [historicoPerdas, setHistoricoPerdas] = useState<RegistroPerda[]>(
    () => salvo.historicoPerdas ?? HISTORICO_PERDAS_INICIAL
  );
  const [historicoTurnos, setHistoricoTurnos] = useState<RegistroTurno[]>(
    () => salvo.historicoTurnos ?? HISTORICO_TURNOS_INICIAL
  );
  const [notasProcessadasIds, setNotasProcessadasIds] = useState<string[]>(
    () => salvo.notasProcessadasIds ?? []
  );
  const [turnoAtual, setTurnoAtual] = useState<string>(() => salvo.turnoAtual ?? TURNOS.manha);
  const [caixaDia, setCaixaDia] = useState<CaixaDia>(() => salvo.caixaDia ?? CAIXA_INICIAL);

  // ---------------------------------------------------------------- UI global
  const [toast, setToast] = useState<Toast | null>(null);
  const [escopoPdf, setEscopoPdf] = useState<EscopoPdf | null>(null); // null = modal fechado
  const [variacaoBrusca, setVariacaoBrusca] = useState<VariacaoBrusca | null>(null);
  const [badgeMaisDezId, setBadgeMaisDezId] = useState<string | null>(null);

  const timerToastRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const timerBadgeRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const cliquesRef = useRef<Record<string, { contagem: number; ultimoClique: number }>>({});

  // ---------------------------------------------------------------- valores derivados
  const ehProprietario = perfilAtivo?.papel === 'proprietario';
  const permissoes = perfilAtivo?.permissoes;
  const responsavel = perfilAtivo?.nome ?? 'Operador';

  const produtoPorId = useMemo(() => new Map(produtos.map((p) => [p.id, p])), [produtos]);
  const todosAbaixoMinimo = useMemo(() => produtos.filter(estaAbaixoDoMinimo), [produtos]);
  const faltantesCozinha = useMemo(
    () => todosAbaixoMinimo.filter((p) => p.tipoFluxo === 'cozinha'),
    [todosAbaixoMinimo]
  );
  const faltantesInsumos = useMemo(
    () => todosAbaixoMinimo.filter((p) => p.tipoFluxo === 'insumo'),
    [todosAbaixoMinimo]
  );

  /** produtoId → id da comanda aberta (impede pedir o mesmo pão duas vezes). */
  const comandaAtivaPorProduto = useMemo(() => {
    const mapa: Record<string, string> = {};
    comandasCozinha.forEach((c) => c.itens.forEach((i) => (mapa[i.produtoId] = c.id)));
    return mapa;
  }, [comandasCozinha]);

  /** produtoId → id da tarefa aberta na Guia de Abastecimento. */
  const tarefaAtivaPorProduto = useMemo(() => {
    const mapa: Record<string, string> = {};
    tarefasInsumos.forEach((t) => (mapa[t.produtoId] = t.id));
    return mapa;
  }, [tarefasInsumos]);

  const kpis = useMemo(
    () => calcularKpis(produtos, historicoPerdas, caixaDia),
    [produtos, historicoPerdas, caixaDia]
  );

  /** Identifica se há comanda com prioridade urgente na cozinha. */
  const temComandaUrgente = useMemo(
    () => comandasCozinha.some((c) => c.prioridade === 'urgente'),
    [comandasCozinha]
  );

  /** Quantidade de comandas urgentes aguardando ou em produção no forno. */
  const qtdComandasUrgentes = useMemo(
    () => comandasCozinha.filter((c) => c.prioridade === 'urgente').length,
    [comandasCozinha]
  );

  // ---------------------------------------------------------------- efeitos
  // Salva automaticamente no localStorage sempre que um dado persistido muda.
  useEffect(() => {
    const payload: EstadoPersistido = {
      produtos,
      comandasCozinha,
      tarefasInsumos,
      historicoReposicoes,
      historicoPerdas,
      historicoTurnos,
      notasProcessadasIds,
      turnoAtual,
      caixaDia,
      salvoEm: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignora erro de cota se o navegador restringir o armazenamento.
    }
  }, [
    produtos,
    comandasCozinha,
    tarefasInsumos,
    historicoReposicoes,
    historicoPerdas,
    historicoTurnos,
    notasProcessadasIds,
    turnoAtual,
    caixaDia,
  ]);

  // Guarda de RBAC estrito: usuário sem permissão é imediatamente redirecionado para a conferência.
  useEffect(() => {
    if (!perfilAtivo) return;
    if (telaAtual === 'nota-fiscal' && !perfilAtivo.permissoes.lancarNotaFiscal) {
      setTelaAtual('conferencia');
    }
    if (TELAS_EXCLUSIVAS_DONO.includes(telaAtual) && !ehProprietario) {
      setTelaAtual('conferencia');
      setEscopoPdf(null);
    }
  }, [perfilAtivo, ehProprietario, telaAtual]);

  // Limpa temporizadores pendentes ao desmontar.
  useEffect(
    () => () => {
      clearTimeout(timerToastRef.current);
      clearTimeout(timerBadgeRef.current);
    },
    []
  );

  // ---------------------------------------------------------------- feedback
  /** Mostra a notificação flutuante por alguns segundos (reinicia o tempo se chamada de novo). */
  function dispararToast(texto: string, tipo: TipoToast = 'sucesso') {
    clearTimeout(timerToastRef.current);
    setToast({ texto, tipo });
    timerToastRef.current = setTimeout(() => setToast(null), DURACAO_TOAST_MS);
  }

  // ---------------------------------------------------------------- sessão
  /** Faz login. Se `pinDigitado` vier preenchido, ele precisa bater com o PIN do perfil. */
  function entrar(perfil: Perfil, pinDigitado?: string) {
    if (pinDigitado !== undefined && pinDigitado !== perfil.pinPadrao) {
      dispararToast(`PIN incorreto para ${perfil.nome}.`, 'erro');
      return;
    }
    setPerfilAtivo(perfil);
    setTelaAtual(perfil.papel === 'proprietario' ? 'painel-dono' : 'conferencia');
    dispararToast(`Sessão iniciada: ${perfil.nome} (${perfil.cargo})`);
  }

  /** Alterna o perfil sem sair (o efeito de RBAC acima cuida de redirecionar). */
  function trocarPerfil(idPerfil: string) {
    const novo = PERFIS_RBAC.find((p) => p.id === idPerfil);
    if (!novo) return;
    setPerfilAtivo(novo);
    dispararToast(`Perfil alternado para ${novo.nome} (${novo.cargo})`);
  }

  function sair() {
    setPerfilAtivo(null);
    setEscopoPdf(null);
  }

  /** Muda de aba bloqueando telas não autorizadas para o perfil atual (RBAC estrito). */
  function navegar(tela: IdTela) {
    if (tela === 'nota-fiscal' && !perfilAtivo?.permissoes.lancarNotaFiscal) {
      dispararToast('🔒 Acesso Restrito: Apenas Mateus (Estoque) e Dona têm acesso ao Nota Depósito.', 'erro');
      return;
    }
    if (TELAS_EXCLUSIVAS_DONO.includes(tela) && !ehProprietario) {
      dispararToast('🔒 Área exclusiva da Proprietária (Dona).', 'erro');
      return;
    }
    setTelaAtual(tela);
  }

  /** Apaga o localStorage e volta todos os dados para a demonstração original. */
  function restaurarDadosDeFabrica() {
    localStorage.removeItem(STORAGE_KEY);
    setProdutos(PRODUTOS_INICIAIS);
    setComandasCozinha(COMANDAS_COZINHA_INICIAIS);
    setTarefasInsumos(TAREFAS_INSUMOS_INICIAIS);
    setHistoricoReposicoes(HISTORICO_REPOSICOES_INICIAL);
    setHistoricoPerdas(HISTORICO_PERDAS_INICIAL);
    setHistoricoTurnos(HISTORICO_TURNOS_INICIAL);
    setNotasProcessadasIds([]);
    setTurnoAtual(TURNOS.manha);
    setCaixaDia(CAIXA_INICIAL);
    dispararToast('🔄 Dados de fábrica restaurados no armazenamento local!');
  }

  // ---------------------------------------------------------------- simulação térmica 80mm
  function fecharImpressaoComanda() {
    setComandaEmImpressao(null);
  }

  function imprimirComandaTermica(comanda: Comanda) {
    setComandaEmImpressao(comanda);
    tocarSomImpressoraTermica();
    dispararToast(`🖨️ [Térmica 80mm ESC/POS] Comanda #${comanda.id} impressa na Cozinha!`);
  }

  // ---------------------------------------------------------------- clique triplo (+10)
  /**
   * Cada clique soma `passo`. Se 3 cliques acontecerem em até 600 ms entre si,
   * o 3º clique completa o total para +10 (os dois primeiros já somaram 2×passo).
   */
  function incrementarComCliqueTriplo(id: string, passo: number, aplicar: (delta: number) => void) {
    const agora = Date.now();
    const anterior = cliquesRef.current[id];
    const emSequencia = anterior !== undefined && agora - anterior.ultimoClique <= JANELA_CLIQUE_TRIPLO_MS;
    const contagem = emSequencia ? anterior.contagem + 1 : 1;

    if (contagem < 3) {
      cliquesRef.current[id] = { contagem, ultimoClique: agora };
      aplicar(passo);
      return;
    }

    delete cliquesRef.current[id];
    aplicar(Math.max(0, arredondar(10 - passo * 2)));
    setBadgeMaisDezId(id);
    clearTimeout(timerBadgeRef.current);
    timerBadgeRef.current = setTimeout(() => setBadgeMaisDezId(null), DURACAO_BADGE_MAIS_DEZ_MS);
    dispararToast('⚡ Clique triplo detectado: total de +10 adicionado!');
  }

  // ---------------------------------------------------------------- vitrine
  /**
   * Define o saldo da vitrine de um produto e grava no ledger.
   * Variações muito grandes pedem confirmação antes (modal de variação brusca).
   */
  function definirSaldoVitrine(produtoId: string, valor: number | string, confirmado = false) {
    const numero = paraNumero(valor);
    if (Number.isNaN(numero) || numero < 0) {
      dispararToast('Valor inválido. Digite um número maior ou igual a zero.', 'erro');
      return;
    }
    const produto = produtoPorId.get(produtoId);
    if (!produto) return;

    const novoSaldo = arredondar(numero);
    const delta = arredondar(novoSaldo - produto.saldoVitrine);
    if (delta === 0) return;

    const limite = Math.max(VARIACAO_BRUSCA_MINIMA, produto.minimo * FATOR_VARIACAO_BRUSCA);
    if (!confirmado && Math.abs(delta) >= limite) {
      setVariacaoBrusca({ produto, saldoAnterior: produto.saldoVitrine, novoSaldo, delta });
      return;
    }

    const movimento = criarMovimento({
      produto,
      categoria: CATEGORIA_MOVIMENTO.ajuste,
      origem: 'Conferência Manual no Balcão',
      qtd: delta,
      novoSaldoVitrine: novoSaldo,
      responsavel,
    });
    setProdutos((prev) => atualizarPorId(prev, produtoId, (p) => ({ ...p, saldoVitrine: novoSaldo })));
    setHistoricoReposicoes((prev) => [movimento, ...prev]);
  }

  /** Soma (ou subtrai) `delta` do saldo atual da vitrine, nunca abaixo de zero. */
  function ajustarSaldoVitrine(produtoId: string, delta: number) {
    const produto = produtoPorId.get(produtoId);
    if (!produto) return;
    definirSaldoVitrine(produtoId, Math.max(0, arredondar(produto.saldoVitrine + delta)));
  }

  function confirmarVariacaoBrusca() {
    if (!variacaoBrusca) return;
    definirSaldoVitrine(variacaoBrusca.produto.id, variacaoBrusca.novoSaldo, true);
    setVariacaoBrusca(null);
    dispararToast('Variação atípica confirmada e registrada no Ledger!');
  }

  function cancelarVariacaoBrusca() {
    setVariacaoBrusca(null);
  }

  /** Dá baixa por perda/quebra. Retorna a mensagem de erro, ou `null` se deu certo. */
  function registrarPerda(produtoId: string, qtdDigitada: string, motivo: string): string | null {
    const produto = produtoPorId.get(produtoId);
    if (!produto) return 'Produto não encontrado.';

    const numero = paraNumero(qtdDigitada);
    if (Number.isNaN(numero) || numero <= 0) return 'Informe uma quantidade válida maior que zero.';

    const qtd = arredondar(numero);
    if (qtd > produto.saldoVitrine) {
      return `Operação bloqueada: a perda (${formatarNumero(qtd)}) não pode ser maior que o saldo atual na vitrine (${formatarNumero(produto.saldoVitrine)} ${produto.unidade}).`;
    }

    const depoisVitrine = arredondar(produto.saldoVitrine - qtd);
    const perda: RegistroPerda = {
      id: gerarIdUnico('perda'),
      idempotencyKey: gerarIdUnico('ledger-loss'),
      ...carimboDeTempo(),
      produtoId: produto.id,
      produto: produto.nome,
      iconeKey: produto.iconeKey,
      qtd,
      antesVitrine: produto.saldoVitrine,
      depoisVitrine,
      unidade: produto.unidade,
      motivo,
      custoEstimado: arredondar(qtd * (produto.custoUnitario || CUSTO_PADRAO_PERDA)),
      responsavel: perfilAtivo?.nome ?? 'Equipe Skina',
    };

    setProdutos((prev) => atualizarPorId(prev, produto.id, (p) => ({ ...p, saldoVitrine: depoisVitrine })));
    setHistoricoPerdas((prev) => [perda, ...prev]);
    dispararToast(`📉 Baixa por perda registrada: -${formatarNumero(qtd)} ${produto.unidade} de ${produto.nome}`);
    return null;
  }

  // ---------------------------------------------------------------- cozinha e insumos
  /**
   * Botão "Pedir" de cada card. Se já houver comanda/tarefa aberta para o
   * produto, apenas REFORÇA a quantidade (idempotência: nunca duplica pedidos).
   */
  function solicitarOuReforcarItem(produto: Produto) {
    const reforco = arredondar(produto.passo * 2);
    const quantidade = Math.max(reforco, quantidadeFaltante(produto));

    if (produto.tipoFluxo === 'cozinha') {
      const comandaId = comandaAtivaPorProduto[produto.id];
      if (comandaId) {
        let comandaReforcada: Comanda | null = null;
        setComandasCozinha((prev: Comanda[]) =>
          atualizarPorId<Comanda>(prev, comandaId, (c) => {
            const atual: Comanda = {
              ...c,
              prioridade: 'urgente',
              itens: c.itens.map((it) =>
                it.produtoId === produto.id ? { ...it, qtdSolicitada: arredondar(it.qtdSolicitada + reforco) } : it
              ),
            };
            comandaReforcada = atual;
            return atual;
          })
        );
        if (comandaReforcada) {
          imprimirComandaTermica(comandaReforcada);
        }
        dispararToast(`🔁 Pedido reforçado (+${formatarNumero(reforco)} ${produto.unidade}) na comanda #${comandaId}!`);
        return;
      }

      const comanda = criarComanda([itemDeComanda(produto, quantidade)], {
        solicitante: perfilAtivo?.nome ?? 'Balcão',
        prioridade: 'urgente',
        observacao: `🔥 FORNADA CRÍTICA: ${produto.nome} solicitado pelo balcão.`,
      });
      setComandasCozinha((prev) => [comanda, ...prev]);
      imprimirComandaTermica(comanda);
      dispararToast(`🖨️ Nova comanda #${comanda.id} emitida e impressa para a Cozinha!`);
      return;
    }

    const tarefaId = tarefaAtivaPorProduto[produto.id];
    if (tarefaId) {
      setTarefasInsumos((prev: TarefaInsumo[]) =>
        atualizarPorId<TarefaInsumo>(prev, tarefaId, (t) => ({
          ...t,
          prioridade: 'urgente',
          qtdAbastecer: arredondar(t.qtdAbastecer + reforco),
        }))
      );
      dispararToast(`🔁 Quantidade de ${produto.nome} reforçada na Guia de Abastecimento!`);
      return;
    }

    setTarefasInsumos((prev) => [criarTarefaInsumo(produto, quantidade, 'urgente'), ...prev]);
    dispararToast(`❄️ ${produto.nome} adicionado à Guia de Abastecimento!`);
  }

  /** Gera UMA comanda com todos os itens de forno abaixo do mínimo que ainda não foram pedidos. */
  function enviarLoteParaCozinha() {
    const pendentes = faltantesCozinha.filter((p) => !comandaAtivaPorProduto[p.id]);

    if (pendentes.length === 0) {
      if (faltantesCozinha.length > 0) {
        dispararToast('ℹ️ Todos os itens de forno abaixo do mínimo já possuem comanda ativa!');
        setTelaAtual('cozinha');
      } else {
        dispararToast('Todos os pães e doces da cozinha já atingiram o mínimo!');
      }
      return;
    }

    const comanda = criarComanda(
      pendentes.map((p) => itemDeComanda(p, quantidadeFaltante(p))),
      {
        solicitante: perfilAtivo?.nome ?? 'Equipe Vitrine',
        prioridade: pendentes.some((p) => p.saldoVitrine === 0) ? 'urgente' : 'normal',
        observacao: 'Ordem em lote gerada pela conferência da vitrine (sem duplicar comandas abertas).',
      }
    );
    setComandasCozinha((prev) => [comanda, ...prev]);
    imprimirComandaTermica(comanda);
    dispararToast(`🖨️ Comanda #${comanda.id} enviada e impressa na Cozinha!`);
    setTelaAtual('cozinha');
  }

  /** Acrescenta à Guia de Abastecimento os insumos faltantes, sem apagar ajustes já feitos. */
  function sincronizarGuiaInsumos() {
    const novos = faltantesInsumos.filter((p) => !tarefaAtivaPorProduto[p.id]);

    if (novos.length === 0) {
      dispararToast('Guia de Abastecimento já contém todos os insumos pendentes!');
    } else {
      const tarefas = novos.map((p) =>
        criarTarefaInsumo(p, quantidadeFaltante(p), p.saldoVitrine === 0 ? 'urgente' : 'normal')
      );
      setTarefasInsumos((prev) => [...prev, ...tarefas]);
      dispararToast(`❄️ +${tarefas.length} insumo(s) adicionados à Guia sem apagar os atuais!`);
    }
    setTelaAtual('abastecimento-insumos');
  }

  /** Move a comanda da fila para "no forno". */
  function iniciarFornada(comandaId: string) {
    setComandasCozinha((prev) => atualizarPorId(prev, comandaId, (c) => ({ ...c, status: 'produzindo' })));
    dispararToast(`🔥 Comanda #${comandaId} entrou no forno!`);
  }

  /** Fornada pronta: soma cada item no saldo da vitrine, grava no ledger e remove a comanda. */
  function concluirComanda(comanda: Comanda) {
    const qtdPorProduto = new Map(comanda.itens.map((i) => [i.produtoId, i.qtdSolicitada]));
    const movimentos: RegistroMovimento[] = [];

    comanda.itens.forEach((item) => {
      const produto = produtoPorId.get(item.produtoId);
      if (!produto) return;
      movimentos.push(
        criarMovimento({
          produto,
          categoria: CATEGORIA_MOVIMENTO.producao,
          origem: `Comanda Impressa #${comanda.id}`,
          qtd: item.qtdSolicitada,
          novoSaldoVitrine: arredondar(produto.saldoVitrine + item.qtdSolicitada),
          responsavel: perfilAtivo?.nome ?? 'Cozinha',
        })
      );
    });

    setProdutos((prev) =>
      prev.map((p) => {
        const qtd = qtdPorProduto.get(p.id);
        return qtd === undefined ? p : { ...p, saldoVitrine: arredondar(p.saldoVitrine + qtd) };
      })
    );
    setHistoricoReposicoes((prev) => [...movimentos, ...prev]);
    setComandasCozinha((prev) => prev.filter((c) => c.id !== comanda.id));
    dispararToast(`✅ Fornada #${comanda.id} concluída! Saldo da Vitrine atualizado.`);
  }

  /** Ajusta a quantidade de uma tarefa da guia (nunca negativa). */
  function alterarQtdTarefa(tarefaId: string, calcular: (atual: number) => number) {
    setTarefasInsumos((prev: TarefaInsumo[]) =>
      atualizarPorId<TarefaInsumo>(prev, tarefaId, (t) => ({ ...t, qtdAbastecer: Math.max(0, arredondar(calcular(t.qtdAbastecer))) }))
    );
  }

  /** Desconta do Depósito e soma na Vitrine — bloqueia se o depósito não tiver saldo. */
  function transferirDepositoParaVitrine(tarefa: TarefaInsumo) {
    const qtd = Number(tarefa.qtdAbastecer);
    if (!Number.isFinite(qtd) || qtd <= 0) {
      dispararToast('Informe uma quantidade válida maior que zero.', 'erro');
      return;
    }
    const produto = produtoPorId.get(tarefa.produtoId);
    if (!produto) return;

    if (qtd > produto.saldoDeposito) {
      dispararToast(
        `❌ Saldo insuficiente no Depósito para ${produto.nome}! Disponível: ${formatarNumero(produto.saldoDeposito)} ${produto.unidade}. Lance uma Nota Fiscal primeiro.`,
        'erro'
      );
      return;
    }

    const novoSaldoVitrine = arredondar(produto.saldoVitrine + qtd);
    const novoSaldoDeposito = arredondar(produto.saldoDeposito - qtd);
    const movimento = criarMovimento({
      produto,
      categoria: CATEGORIA_MOVIMENTO.transferencia,
      origem: `Guia de Abastecimento (${tarefa.setor})`,
      qtd,
      novoSaldoVitrine,
      novoSaldoDeposito,
      responsavel,
    });

    setProdutos((prev) =>
      atualizarPorId(prev, produto.id, (p) => ({ ...p, saldoVitrine: novoSaldoVitrine, saldoDeposito: novoSaldoDeposito }))
    );
    setHistoricoReposicoes((prev) => [movimento, ...prev]);
    setTarefasInsumos((prev) => prev.filter((t) => t.id !== tarefa.id));
    dispararToast(`❄️ Transferido ${formatarNumero(qtd)} ${tarefa.unidade} do Depósito para a Vitrine!`);
  }

  // ---------------------------------------------------------------- nota fiscal
  /**
   * Dá entrada de uma nota fiscal SOMENTE no saldo do Depósito.
   * Travas: permissão (RBAC) + chave única (a mesma nota não entra duas vezes).
   */
  function lancarNotaFiscal(chave: string, itens: ItemNota[]): boolean {
    if (!permissoes?.lancarNotaFiscal) {
      dispararToast('🔒 Permissão negada: apenas Compras/Estoque ou Proprietário lançam Notas Fiscais.', 'erro');
      return false;
    }
    if (notasProcessadasIds.includes(chave)) {
      dispararToast(`⚠️ A Nota Fiscal ${chave} já foi processada! Selecione outra para evitar duplicidade.`, 'erro');
      return false;
    }
    const validos = itens.filter((i) => i.qtdEmbalagens > 0);
    if (validos.length === 0) {
      dispararToast('Adicione pelo menos 1 embalagem na nota para confirmar.', 'erro');
      return false;
    }

    // Soma item a item (se a nota tiver 2 linhas do mesmo produto, ambas contam).
    const novosSaldos = new Map<string, number>();
    const movimentos: RegistroMovimento[] = [];
    validos.forEach((item) => {
      const produto = produtoPorId.get(item.produtoId);
      if (!produto) return;
      const antes = novosSaldos.get(produto.id) ?? produto.saldoDeposito;
      const unidades = arredondar(item.qtdEmbalagens * item.fatorConversao);
      const depois = arredondar(antes + unidades);
      novosSaldos.set(produto.id, depois);
      movimentos.push(
        criarMovimento({
          produto: { ...produto, saldoDeposito: antes },
          categoria: CATEGORIA_MOVIMENTO.notaFiscal,
          origem: `${chave} (${item.qtdEmbalagens} ${item.tipoEmbalagem})`,
          qtd: unidades,
          novoSaldoDeposito: depois, // a vitrine fica intacta até alguém abastecer
          responsavel,
          idempotencyKey: `${chave}-${item.id}`,
        })
      );
    });

    const totalNota = somar(validos.map((i) => i.qtdEmbalagens * i.valorUnitarioEmbalagem));

    setProdutos((prev) =>
      prev.map((p) => {
        const novo = novosSaldos.get(p.id);
        return novo === undefined ? p : { ...p, saldoDeposito: novo };
      })
    );
    setHistoricoReposicoes((prev) => [...movimentos, ...prev]);
    setNotasProcessadasIds((prev) => [...prev, chave]);
    setCaixaDia((prev) => ({ ...prev, totalNotasEntrada: arredondar(prev.totalNotasEntrada + totalNota) }));
    dispararToast(`✅ ${chave} lançada no SALDO DO DEPÓSITO! Use a Guia de Insumos para levar à vitrine.`);
    return true;
  }

  // ---------------------------------------------------------------- financeiro (dono)
  /** Simulador de margem: altera custo ou preço de venda de um produto. */
  function atualizarPrecoOuCusto(produtoId: string, campo: 'custoUnitario' | 'precoVenda', valor: string) {
    const numero = paraNumero(valor);
    const seguro = Number.isNaN(numero) ? 0 : Math.max(0, numero);
    setProdutos((prev) => atualizarPorId(prev, produtoId, (p) => ({ ...p, [campo]: seguro })));
  }

  /** Atualiza um dos meios de pagamento do caixa do dia. */
  function atualizarCaixa(campo: 'pix' | 'cartao' | 'dinheiro', valor: string) {
    const numero = paraNumero(valor);
    setCaixaDia((prev) => ({ ...prev, [campo]: Number.isNaN(numero) ? 0 : Math.max(0, numero) }));
  }

  /** Lança uma sangria/despesa no caixa. Retorna `true` se foi aceita. */
  function registrarSangria(valorDigitado: string, descricao: string): boolean {
    const valor = paraNumero(valorDigitado);
    if (Number.isNaN(valor) || valor <= 0) {
      dispararToast('Informe um valor válido para a sangria.', 'erro');
      return false;
    }
    setCaixaDia((prev) => ({ ...prev, sangriasDespesas: arredondar((prev.sangriasDespesas || 0) + valor) }));
    const motivo = descricao.trim() ? ` (${descricao.trim()})` : '';
    dispararToast(`💸 Sangria de ${formatarMoeda(valor)}${motivo} registrada no caixa!`);
    return true;
  }

  // ---------------------------------------------------------------- passagem de turno
  /** Grava a troca de turno (quem entrega, quem assume, checklist) e alterna Manhã ↔ Tarde. */
  function registrarPassagemTurno(dados: DadosPassagemTurno): boolean {
    if (dados.entregou === dados.assumiu) {
      dispararToast('Selecione colaboradores diferentes para quem entrega e quem assume o turno.', 'erro');
      return false;
    }
    const proximoTurno = turnoAtual.includes('Manhã') ? TURNOS.tarde : TURNOS.manha;
    const registro: RegistroTurno = {
      id: gerarIdUnico('turno'),
      idempotencyKey: gerarIdUnico('ledger-shift'),
      criadoEmISO: new Date().toISOString(),
      horario: `Hoje · ${horarioAgora()}`,
      turnoEncerrado: turnoAtual,
      turnoIniciado: proximoTurno,
      responsavelEntregou: dados.entregou,
      responsavelAssumiu: dados.assumiu,
      checklist: { ...dados.checklist },
      pendenciasSnapshot: `${comandasCozinha.length} comandas no forno · ${tarefasInsumos.length} insumos na guia`,
      observacao: dados.observacao.trim() || 'Passagem realizada sem ressalvas.',
    };

    setHistoricoTurnos((prev) => [registro, ...prev]);
    setTurnoAtual(proximoTurno);
    dispararToast(`✅ Passagem de turno registrada! Turno ativo: ${proximoTurno}`);
    if (ehProprietario) {
      setAbaRelatorio('turnos');
      setTelaAtual('relatorios');
    } else {
      setTelaAtual('conferencia');
    }
    return true;
  }

  // ---------------------------------------------------------------- catálogo
  /** Cria ou edita um produto. Retorna a mensagem de erro, ou `null` se salvou. */
  function salvarProduto(form: FormProduto, idEditando: string | null): string | null {
    if (!permissoes?.gerirCatalogoCustos) return 'Seu perfil não pode alterar o catálogo.';
    const resultado = validarFormProduto(form);
    if (!resultado.ok || !resultado.dados) return resultado.erro ?? 'Erro ao validar formulário.';

    if (idEditando) {
      setProdutos((prev: Produto[]) => atualizarPorId<Produto>(prev, idEditando, (p) => ({ ...p, ...resultado.dados! })));
      dispararToast('✅ Produto validado e atualizado no catálogo!');
    } else {
      const novo: Produto = {
        id: gerarIdUnico('prod'),
        corFundoIcone: COR_FUNDO_POR_FLUXO[resultado.dados.tipoFluxo],
        ...resultado.dados,
      };
      setProdutos((prev) => [...prev, novo]);
      dispararToast('✅ Novo produto validado e adicionado!');
    }
    return null;
  }

  // ---------------------------------------------------------------- PDF A4 (dono)
  function abrirPdf(escopo: EscopoPdf = 'executivo') {
    if (ehProprietario) setEscopoPdf(escopo);
  }

  function fecharPdf() {
    setEscopoPdf(null);
  }

  function imprimirPdf() {
    window.print();
    dispararToast('📄 Janela de impressão / Salvar como PDF A4 acionada!');
  }

  /** Baixa a folha A4 como um arquivo .html que abre a impressão sozinho. */
  function baixarPdfComoHtml() {
    const folha = document.getElementById(ID_FOLHA_A4);
    if (!folha || !escopoPdf) return;
    const data = new Date().toISOString().slice(0, 10);
    baixarArquivo(
      montarHtmlA4(folha.innerHTML, escopoPdf),
      `Relatorio_A4_Skina_do_Pao_${escopoPdf}_${data}.html`,
      'text/html;charset=utf-8'
    );
    dispararToast('📄 Documento A4 pronto para impressão/PDF baixado!');
  }

  return {
    // estado
    perfilAtivo,
    telaAtual,
    abaRelatorio,
    produtos,
    comandasCozinha,
    tarefasInsumos,
    historicoReposicoes,
    historicoPerdas,
    historicoTurnos,
    notasProcessadasIds,
    turnoAtual,
    caixaDia,
    toast,
    escopoPdf,
    variacaoBrusca,
    badgeMaisDezId,
    comandaEmImpressao,
    // derivados
    ehProprietario,
    produtoPorId,
    todosAbaixoMinimo,
    faltantesCozinha,
    faltantesInsumos,
    comandaAtivaPorProduto,
    tarefaAtivaPorProduto,
    kpis,
    temComandaUrgente,
    qtdComandasUrgentes,
    // ações
    setAbaRelatorio,
    dispararToast,
    entrar,
    trocarPerfil,
    sair,
    navegar,
    restaurarDadosDeFabrica,
    fecharImpressaoComanda,
    imprimirComandaTermica,
    incrementarComCliqueTriplo,
    definirSaldoVitrine,
    ajustarSaldoVitrine,
    confirmarVariacaoBrusca,
    cancelarVariacaoBrusca,
    registrarPerda,
    solicitarOuReforcarItem,
    enviarLoteParaCozinha,
    sincronizarGuiaInsumos,
    iniciarFornada,
    concluirComanda,
    alterarQtdTarefa,
    transferirDepositoParaVitrine,
    lancarNotaFiscal,
    atualizarPrecoOuCusto,
    atualizarCaixa,
    registrarSangria,
    registrarPassagemTurno,
    salvarProduto,
    abrirPdf,
    fecharPdf,
    imprimirPdf,
    baixarPdfComoHtml,
  };
}

type SkinaStore = ReturnType<typeof useSkinaStore>;

const SkinaContext = createContext<SkinaStore | null>(null);

/** Acesso à store em qualquer componente dentro do <App />. */
function useSkina(): SkinaStore {
  const contexto = useContext(SkinaContext);
  if (!contexto) throw new Error('useSkina() precisa estar dentro de <SkinaContext.Provider>.');
  return contexto;
}

/** Atalho para telas que só existem com alguém logado. */
function usePerfilLogado(): Perfil {
  const { perfilAtivo } = useSkina();
  if (!perfilAtivo) throw new Error('Nenhum perfil logado.');
  return perfilAtivo;
}

// ============================================================================
// 7. COMPONENTES BASE (peças visuais reutilizáveis em todas as telas)
// ============================================================================

type PropsBotao = React.ComponentProps<'button'> & {
  variante?: VarianteBotao;
  tamanho?: TamanhoBotao;
  icone?: ComponenteIcone;
};

function Botao({
  variante = 'primario',
  tamanho = 'md',
  icone: Icone,
  className,
  children,
  ...props
}: PropsBotao) {
  return (
    <button
      type="button"
      className={cx(
        'font-bold inline-flex items-center justify-center transition-all disabled:opacity-40 active:scale-[0.98]',
        VARIANTES_BOTAO[variante],
        TAMANHOS_BOTAO[tamanho],
        className
      )}
      {...props}
    >
      {Icone && <Icone className="w-3.5 h-3.5 shrink-0" />}
      {children}
    </button>
  );
}

/** Pílula/etiqueta colorida (ex: "Cozinha", "Urgente", "Manhã"). */
function Chip({
  tom = 'neutro',
  icone: Icone,
  children,
  className,
}: {
  tom?: Tom;
  icone?: ComponenteIcone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border',
        TONS[tom],
        className
      )}
    >
      {Icone && <Icone className="w-2.5 h-2.5 shrink-0" />}
      {children}
    </span>
  );
}

/** Cabeçalho padrão de tela: subtítulo em caixa alta + título em fonte serifada + descrição. */
function CabecalhoTela({
  sobretitulo,
  corSobretitulo = 'acento',
  icone: Icone,
  titulo,
  descricao,
  direita,
}: {
  sobretitulo?: string;
  corSobretitulo?: keyof typeof COR_SOBRETITULO;
  icone?: ComponenteIcone;
  titulo: string;
  descricao?: ReactNode;
  direita?: ReactNode;
}) {
  return (
    <header className="flex items-start justify-between gap-2 mb-3">
      <div>
        {sobretitulo && (
          <span
            className={cx(
              'inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider',
              COR_SOBRETITULO[corSobretitulo]
            )}
          >
            {Icone && <Icone className="w-3.5 h-3.5" />}
            {sobretitulo}
          </span>
        )}
        <h1 className={ui.tituloTela}>{titulo}</h1>
        {descricao && <p className={cx(ui.textoSecundario, 'mt-1')}>{descricao}</p>}
      </div>
      {direita && <div className="shrink-0">{direita}</div>}
    </header>
  );
}

/** Banner amarelo indicando que o hardware físico (impressora 80mm / OCR) está simulado. */
function BannerModoDemo({ titulo, descricao }: { titulo: string; descricao: string }) {
  return (
    <aside className="bg-[#FDF6EC] border border-[#EED0AE] rounded-2xl px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-[#6E4726]">
      <Info className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
      <div>
        <span className="font-bold uppercase tracking-wider text-[10px] bg-[#F8E2C8] text-[#873E1B] px-2 py-0.5 rounded-md mr-1.5">
          Modo Demonstração (Simulação Local)
        </span>
        <strong className="text-[#3B2316]">{titulo}:</strong> {descricao}
      </div>
    </aside>
  );
}

/** Caixa de alerta para permissões negadas ou avisos de bloqueio. */
function BannerAviso({
  titulo,
  mensagem,
  acao,
  tom = 'erro',
  icone: Icone = AlertTriangle,
}: {
  titulo?: string;
  mensagem: ReactNode;
  acao?: ReactNode;
  tom?: Tom;
  icone?: ComponenteIcone;
}) {
  return (
    <div className={cx('rounded-2xl p-3.5 border flex items-center justify-between gap-3 text-xs', TONS[tom])}>
      <div className="flex items-start gap-2.5 min-w-0">
        <Icone className="w-4 h-4 shrink-0 mt-0.5" />
        <div className="leading-snug">
          {titulo && <strong className="font-bold block mb-0.5">{titulo}</strong>}
          <span>{mensagem}</span>
        </div>
      </div>
      {acao && <div className="shrink-0">{acao}</div>}
    </div>
  );
}

/** Modal genérico com fundo escurecido. */
function Modal({
  aberto,
  onFechar,
  largura = 'max-w-sm',
  children,
}: {
  aberto: boolean;
  onFechar: () => void;
  largura?: string;
  children: ReactNode;
}) {
  if (!aberto) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-[#2C1E18]/55 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onFechar()}
    >
      <div className={cx('bg-[#FFFDFB] w-full rounded-3xl p-5 border border-[#EBE0D6] shadow-2xl space-y-3.5', largura)}>
        {children}
      </div>
    </div>
  );
}

/** Campo de formulário: rótulo opcional em cima + controle embaixo. */
function Campo({
  rotulo,
  children,
  className,
}: {
  rotulo?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {rotulo && <label className={ui.rotulo}>{rotulo}</label>}
      {children}
    </div>
  );
}

/** Ícone de um produto dentro da sua caixinha quadrada arredondada. */
function IconeProduto({
  iconeKey,
  corFundo,
  tamanho = 'w-11 h-11',
  tamanhoIcone = 'w-6 h-6',
}: {
  iconeKey: string;
  corFundo?: string;
  tamanho?: string;
  tamanhoIcone?: string;
}) {
  const Icone = obterIcone(iconeKey);
  return (
    <div
      className={cx(
        tamanho,
        corFundo ?? 'bg-[#F3EAE0]',
        'rounded-2xl text-[#4A3228] flex items-center justify-center shrink-0 border border-black/5'
      )}
    >
      <Icone className={tamanhoIcone} />
    </div>
  );
}

/** Notificação flutuante exibida no topo da tela. */
function ToastGlobal() {
  const { toast } = useSkina();
  if (!toast) return null;
  const ehErro = toast.tipo === 'erro';
  const Icone = ehErro ? ShieldAlert : CheckCircle2;

  return (
    <div className="fixed top-4 inset-x-4 max-w-md mx-auto z-50 pointer-events-none animate-slideDown">
      <div
        className={cx(
          'px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-semibold text-white',
          ehErro ? 'bg-[#8C2D19] border-[#B84A27]' : 'bg-[#2C1E18] border-[#4A3228]'
        )}
      >
        <Icone className={cx('w-4 h-4 shrink-0', ehErro ? 'text-[#F8E2C8]' : 'text-[#86EFAC]')} />
        <span>{toast.texto}</span>
      </div>
    </div>
  );
}

// ============================================================================
// 8. TELAS DO SISTEMA
// ============================================================================

// ----------------------------------------------------------------------------
// 8.0 TELA DE LOGIN & AUTENTICAÇÃO COM SUGESTÃO DE SENHAS
// ----------------------------------------------------------------------------
function TelaLogin() {
  const { entrar, restaurarDadosDeFabrica, faltantesCozinha, faltantesInsumos, historicoReposicoes } = useSkina();
  const [pin, setPin] = useState('');
  const [erroLogin, setErroLogin] = useState('');

  // Identifica perfil correspondente se o PIN bater com algum perfil
  const perfilPeloPin = useMemo(() => PERFIS_RBAC.find((p) => p.pinPadrao === pin.trim()), [pin]);

  function tentarLoginPorPin() {
    setErroLogin('');
    const limpo = pin.trim();
    if (!limpo) {
      setErroLogin('Digite um PIN para entrar.');
      return;
    }
    const perfil = PERFIS_RBAC.find((p) => p.pinPadrao === limpo);
    if (!perfil) {
      setErroLogin('PIN incorreto. Use 1111 (Funcionária 1), 2222 (Estoque) ou 1234 (Dona).');
      return;
    }
    entrar(perfil, limpo);
  }

  function preencherPinEEntrar(perfil: Perfil) {
    setPin(perfil.pinPadrao);
    setErroLogin('');
    entrar(perfil, perfil.pinPadrao);
  }

  return (
    <div className="min-h-screen bg-[#F5EFEA] text-[#2C1E18] font-sans antialiased flex flex-col justify-between p-4 sm:p-6">
      <div className="max-w-md w-full mx-auto pt-2 pb-8 space-y-4">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2.5 bg-[#FFFDFB] px-3.5 py-2 rounded-2xl border border-[#EBE0D6] shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-[#F3EAE0] text-[#4A3228] flex items-center justify-center">
              <IconLogoSkina className="w-6 h-6" />
            </div>
            <div>
              <span className="block font-serif-display font-bold text-base text-[#3B2316] leading-none">
                Skina do Pão
              </span>
              <span className="text-[11px] text-[#7A685F] font-medium">Controle de Acesso & RBAC Auditado</span>
            </div>
          </div>

          <Botao
            variante="contorno"
            tamanho="sm"
            icone={RotateCcw}
            onClick={restaurarDadosDeFabrica}
            title="Limpar LocalStorage e restaurar dados originais"
          >
            Reset Fábrica
          </Botao>
        </div>

        {/* Banner de Senhas Padrões Sugeridas */}
        <section className="bg-[#362218] text-[#FFFDFB] rounded-[24px] p-4.5 space-y-3 shadow-lg border border-[#4A3228]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#F5D6B8]" />
              <span className="font-bold text-xs uppercase tracking-wider text-[#F5D6B8]">
                Senhas Padrões Sugeridas
              </span>
            </div>
            <Chip tom="laranja" icone={ShieldCheck}>
              RBAC Ativo
            </Chip>
          </div>

          <p className="text-xs text-[#E8DCD2] leading-relaxed">
            Utilize os PINs padrão sugeridos para testar o nível de acesso e as restrições de cada colaborador:
          </p>

          <div className="grid grid-cols-3 gap-2 text-center">
            <button
              type="button"
              onClick={() => {
                setPin('1111');
                setErroLogin('');
              }}
              className="bg-[#4A3228] hover:bg-[#5E3F32] transition-colors p-2 rounded-xl border border-[#644638] text-left active:scale-95"
            >
              <span className="text-[10px] text-[#D8C5B8] block truncate">Funcionária 1</span>
              <strong className="text-base font-mono font-bold text-[#F5D6B8] block">1111</strong>
              <span className="text-[9px] text-[#B8A395] block mt-0.5">3 Abas · Balcão</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPin('2222');
                setErroLogin('');
              }}
              className="bg-[#4A3228] hover:bg-[#5E3F32] transition-colors p-2 rounded-xl border border-[#644638] text-left active:scale-95"
            >
              <span className="text-[10px] text-[#D8C5B8] block truncate">Estoque / Dep.</span>
              <strong className="text-base font-mono font-bold text-[#C2D7E2] block">2222</strong>
              <span className="text-[9px] text-[#B8A395] block mt-0.5">4 Abas · Notas</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPin('1234');
                setErroLogin('');
              }}
              className="bg-[#4A3228] hover:bg-[#5E3F32] transition-colors p-2 rounded-xl border border-[#644638] text-left active:scale-95"
            >
              <span className="text-[10px] text-[#D8C5B8] block truncate">Dona / Admin</span>
              <strong className="text-base font-mono font-bold text-[#FAD490] block">1234</strong>
              <span className="text-[9px] text-[#B8A395] block mt-0.5">6 Abas · Total</span>
            </button>
          </div>

          {/* Campo para Digitar PIN */}
          <div className="pt-2 border-t border-[#4A3228] flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="password"
                maxLength={6}
                placeholder="Digite o PIN (1111, 2222 ou 1234)"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setErroLogin('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && tentarLoginPorPin()}
                className="w-full bg-[#241710] border border-[#5A3F31] rounded-xl px-3 py-2 text-xs font-mono font-bold text-white placeholder:text-[#8C7A70] focus:outline-none focus:border-[#F5D6B8]"
              />
              {perfilPeloPin && (
                <span className="absolute right-2.5 top-2 text-[10px] font-bold text-[#86EFAC]">
                  ✓ {perfilPeloPin.nome.split(' ')[0]}
                </span>
              )}
            </div>
            <Botao
              variante="primario"
              tamanho="sm"
              icone={ArrowRight}
              onClick={tentarLoginPorPin}
              className="shrink-0 text-[#F5D6B8]"
            >
              Entrar
            </Botao>
          </div>

          {erroLogin && (
            <p className="text-[11px] font-semibold text-[#FCA5A5] bg-[#7F1D1D]/50 px-2.5 py-1 rounded-lg">
              {erroLogin}
            </p>
          )}
        </section>

        {/* Resumo Operacional */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#FDF3EB] px-3.5 py-2 rounded-2xl border border-[#EED0AE] shadow-2xs">
            <span className="text-[10px] font-bold uppercase text-[#9C441B] block">Vitrine Abaixo Mín.</span>
            <strong className="text-[#3B2316] text-xs">
              {faltantesCozinha.length} forno · {faltantesInsumos.length} frios
            </strong>
          </div>
          <div className="bg-[#E6EEF2] px-3.5 py-2 rounded-2xl border border-[#C2D7E2] shadow-2xs">
            <span className="text-[10px] font-bold uppercase text-[#264E63] block">Ledger de Auditoria</span>
            <strong className="text-[#1D3B4B] text-xs">{historicoReposicoes.length} movimentações</strong>
          </div>
        </div>

        {/* Cards dos Perfis */}
        <div className="space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#6E5A4F] px-1 flex items-center justify-between">
            <span>Perfis de Acesso Cadastrados:</span>
            <span className="text-[11px] font-normal lowercase">toque para login direto</span>
          </h2>

          {PERFIS_RBAC.map((perfil) => {
            const ehFuncionaria1 = perfil.id === 'vitrine';
            const ehEstoque = perfil.id === 'estoque';
            const ehDona = perfil.id === 'proprietario';

            return (
              <div
                key={perfil.id}
                className={cx(
                  'bg-[#FFFDFB] hover:bg-[#FAF6F2] transition-all rounded-[24px] p-4 border shadow-2xs space-y-2.5',
                  ehDona
                    ? 'border-[#C29367] ring-1 ring-[#C29367]/40'
                    : ehFuncionaria1
                    ? 'border-[#B2D8BB]'
                    : 'border-[#CBDCE6]'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={cx(
                        'w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-serif-display font-bold text-base border',
                        ehDona
                          ? 'bg-[#362218] text-[#FAD490] border-[#362218]'
                          : ehFuncionaria1
                          ? 'bg-[#EAF5EC] text-[#2F5938] border-[#C5DEC9]'
                          : 'bg-[#EBF2F7] text-[#264E63] border-[#C2D7E2]'
                      )}
                    >
                      {ehDona ? <Crown className="w-5 h-5" /> : perfil.nome.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif-display font-bold text-base text-[#2C1E18]">{perfil.nome}</h3>
                        <span className={cx('text-[10px] font-semibold px-2 py-0.5 rounded-full border', perfil.corBadge)}>
                          {perfil.cargo}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-[#6E5A4F] font-mono bg-[#F4EDE5] px-2 py-0.5 rounded-md font-semibold">
                          PIN Padrão: <strong>{perfil.pinPadrao}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <Botao
                    variante={ehDona ? 'primario' : 'contorno'}
                    tamanho="sm"
                    icone={ArrowRight}
                    onClick={() => preencherPinEEntrar(perfil)}
                    className={ehDona ? 'text-[#F5D6B8] shrink-0' : 'shrink-0'}
                  >
                    Entrar
                  </Botao>
                </div>

                <p className="text-[11.5px] text-[#6E5A4F] leading-snug">{perfil.foco}</p>

                {/* Tags explícitas de visibilidade de telas */}
                <div className="pt-2 border-t border-[#EFE6DD] flex items-center justify-between text-[10.5px]">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {ehFuncionaria1 && (
                      <>
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
                          ✓ 3 Telas: Vitrine · Cozinha 80mm · Reposição
                        </span>
                        <span className="text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md font-semibold">
                          🔒 Sem Notas Fiscais ou Custos
                        </span>
                      </>
                    )}
                    {ehEstoque && (
                      <>
                        <span className="text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md font-semibold border border-sky-200">
                          ✓ 4 Telas: Vitrine · Cozinha · Reposição · Nota Depósito
                        </span>
                        <span className="text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md font-semibold">
                          🔒 Sem Relatórios Executivos
                        </span>
                      </>
                    )}
                    {ehDona && (
                      <>
                        <span className="text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md font-semibold border border-amber-200">
                          👑 Visão Completa (6 Telas) · DRE · Margens · PDF A4
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 8.1 CABEÇALHO SUPERIOR E BARRA INFERIOR
// ----------------------------------------------------------------------------
function BarraSuperior() {
  const { perfilAtivo, trocarPerfil, turnoAtual, ehProprietario, telaAtual, navegar, sair, abrirPdf } = useSkina();
  if (!perfilAtivo) return null;

  return (
    <header className="bg-[#EFE6DD] border-b border-[#E2D5C8] px-4 py-2 sticky top-0 z-30">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => navegar('conferencia')}
            className="w-7 h-7 rounded-lg bg-[#362218] text-[#FFFDFB] flex items-center justify-center shrink-0"
            title="Ir para Conferência"
          >
            <IconLogoSkina className="w-4 h-4" />
          </button>

          <div className="min-w-0">
            <select
              value={perfilAtivo.id}
              onChange={(e) => trocarPerfil(e.target.value)}
              className="bg-transparent font-serif-display font-bold text-xs text-[#2C1E18] focus:outline-none cursor-pointer truncate max-w-[200px]"
              title="Alternar Perfil para testar visibilidade estrita RBAC"
            >
              {PERFIS_RBAC.map((p) => (
                <option key={p.id} value={p.id}>
                  👤 {p.nome} ({p.cargo.split(' · ')[0]})
                </option>
              ))}
            </select>
            <span className="text-[10px] text-[#6E5A4F] block truncate">
              Turno: {turnoAtual} ·{' '}
              {ehProprietario
                ? 'Diretoria Total (6 abas)'
                : perfilAtivo.permissoes.lancarNotaFiscal
                ? 'Estoque & Compras (4 abas)'
                : 'Balcão Restrito (3 abas)'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {ehProprietario && (
            <Botao
              variante="primario"
              tamanho="sm"
              icone={FileText}
              onClick={() => abrirPdf('executivo')}
              className="text-[#F5D6B8]"
              title="Gerar Relatório Oficial em PDF (A4) - Exclusivo Proprietária"
            >
              PDF A4
            </Botao>
          )}

          <Botao
            variante={telaAtual === 'passagem-turno' ? 'primario' : 'contorno'}
            tamanho="sm"
            icone={ArrowRightLeft}
            onClick={() => navegar('passagem-turno')}
          >
            Turno
          </Botao>

          <Botao
            variante={telaAtual === 'catalogo' ? 'primario' : 'contorno'}
            tamanho="sm"
            icone={Store}
            onClick={() => navegar('catalogo')}
          >
            Catálogo
          </Botao>

          <button
            type="button"
            onClick={sair}
            className="p-1.5 rounded-lg bg-[#E4D7C9] hover:bg-[#D8C7B6] text-[#3B2316]"
            title="Sair / Tela de Login"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}

function BarraNavegacao() {
  const {
    telaAtual,
    navegar,
    perfilAtivo,
    todosAbaixoMinimo,
    comandasCozinha,
    tarefasInsumos,
    temComandaUrgente,
  } = useSkina();

  const abas: Array<{
    id: IdTela;
    label: string;
    icone: ComponenteIcone;
    badge?: number;
    corBadge?: string;
    requerPermissao?: 'lancarNotaFiscal' | 'verFinanceiroCompleto';
  }> = [
    {
      id: 'conferencia',
      label: 'Conferência',
      icone: ClipboardCheck,
      badge: todosAbaixoMinimo.length,
      corBadge: 'bg-[#C86D51]',
    },
    {
      id: 'cozinha',
      label: 'Cozinha 80mm',
      icone: Flame,
      badge: comandasCozinha.length,
      corBadge: temComandaUrgente ? 'bg-[#DC2626]' : 'bg-[#B84A27]',
    },
    {
      id: 'abastecimento-insumos',
      label: 'Depósito➔Vitrine',
      icone: Snowflake,
      badge: tarefasInsumos.length,
      corBadge: 'bg-[#264E63]',
    },
    {
      id: 'nota-fiscal',
      label: 'Nota Depósito',
      icone: Receipt,
      requerPermissao: 'lancarNotaFiscal',
    },
    {
      id: 'relatorios',
      label: 'Relatórios',
      icone: PieChart,
      requerPermissao: 'verFinanceiroCompleto',
    },
    {
      id: 'painel-dono',
      label: 'Dono/PDF',
      icone: Crown,
      requerPermissao: 'verFinanceiroCompleto',
    },
  ];

  // RBAC estrito na navegação: remove da DOM qualquer tela que o usuário não possa acessar
  const abasVisiveis = abas.filter((aba) => {
    if (!aba.requerPermissao) return true;
    return Boolean(perfilAtivo?.permissoes[aba.requerPermissao]);
  });

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-[#FFFDFB]/95 backdrop-blur-md border-t border-[#E6D9CE] px-1.5 py-1.5 z-30 shadow-[0_-4px_20px_rgba(44,30,24,0.06)]">
      <div
        className="max-w-md mx-auto grid gap-1"
        style={{ gridTemplateColumns: `repeat(${abasVisiveis.length}, minmax(0, 1fr))` }}
      >
        {abasVisiveis.map((aba) => {
          const Icone = aba.icone;
          const ativo = telaAtual === aba.id;
          const ehCozinhaUrgente = aba.id === 'cozinha' && temComandaUrgente;

          return (
            <button
              key={aba.id}
              type="button"
              onClick={() => navegar(aba.id)}
              className={cx(
                'flex flex-col items-center justify-center py-1.5 rounded-2xl relative transition-all duration-200',
                ativo
                  ? 'text-[#362218] font-bold bg-[#F3EAE0]'
                  : ehCozinhaUrgente
                  ? 'text-[#B91C1C] font-semibold bg-[#FEF2F2] hover:bg-[#FEE2E2] ring-2 ring-red-400/80 animate-pulse'
                  : 'text-[#8C7A70] font-medium hover:bg-[#F9F5F0]'
              )}
            >
              <div className="relative">
                <Icone
                  className={cx(
                    'w-5 h-5 stroke-[2] transition-transform',
                    ehCozinhaUrgente && 'text-[#DC2626] scale-110'
                  )}
                />
                {ehCozinhaUrgente && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-80" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
                  </span>
                )}
              </div>
              <span
                className={cx(
                  'text-[9.5px] mt-0.5 truncate max-w-full px-0.5',
                  ehCozinhaUrgente && 'font-bold text-[#DC2626]'
                )}
              >
                {aba.label}
              </span>
              {aba.badge !== undefined && aba.badge > 0 && (
                <span
                  className={cx(
                    'absolute top-1 right-1.5 px-1 min-w-[16px] h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center shadow-xs',
                    ehCozinhaUrgente
                      ? 'bg-[#DC2626] animate-pulse ring-2 ring-red-300'
                      : aba.corBadge ?? 'bg-[#C86D51]'
                  )}
                >
                  {aba.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/** Alerta Flutuante piscando na tela quando há comandas urgentes aguardando produção no forno. */
function AlertaComandaUrgenteFlutuante() {
  const { temComandaUrgente, qtdComandasUrgentes, telaAtual, navegar } = useSkina();

  if (!temComandaUrgente || telaAtual === 'cozinha') return null;

  return (
    <div className="fixed bottom-20 inset-x-4 max-w-md mx-auto z-25 pointer-events-none">
      <div className="pointer-events-auto bg-[#881337] text-white p-3 rounded-2xl shadow-[0_10px_30px_rgba(136,19,55,0.4)] border border-[#FDA4AF]/40 flex items-center justify-between gap-3 animate-pulse">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#E11D48] text-white flex items-center justify-center shrink-0 shadow-sm relative">
            <Flame className="w-5 h-5 animate-bounce" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
            </span>
          </div>
          <div className="min-w-0">
            <span className="block font-bold text-xs text-white uppercase tracking-wider">
              🔥 Fornada Crítica Aguardando!
            </span>
            <span className="text-[11px] text-[#FECDD3] block truncate">
              {qtdComandasUrgentes} pedido(s) urgente(s) na Cozinha (Vitrine zerada)
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navegar('cozinha')}
          className="shrink-0 bg-white text-[#881337] hover:bg-[#FFF1F2] active:scale-95 transition-all text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1"
        >
          <span>Ver Cozinha</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/** Simulação interativa de impressora térmica 80mm ESC/POS (EPSON / Bematech) na Cozinha. */
function ModalImpressaoTermica() {
  const { comandaEmImpressao, fecharImpressaoComanda, imprimirComandaTermica, iniciarFornada } = useSkina();
  if (!comandaEmImpressao) return null;

  const comanda = comandaEmImpressao;
  const ehUrgente = comanda.prioridade === 'urgente';

  return (
    <div className="fixed inset-0 z-50 bg-[#2C1E18]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-sm w-full my-auto space-y-3">
        {/* Carcaça simulada da impressora térmica 80mm */}
        <div className="bg-[#241A15] rounded-t-2xl p-3 border-b-4 border-[#120D0A] shadow-xl text-white">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Printer className="w-4 h-4 text-[#F5D6B8]" />
              <span className="font-mono font-bold text-[11px] tracking-wide text-[#E8DCD2]">
                EPSON TM-T20X · 80mm ESC/POS
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                ONLINE (TCP/IP)
              </span>
            </div>
          </div>
          {/* Fenda da saída do papel térmico */}
          <div className="mt-2.5 h-2 bg-[#0D0907] rounded-full mx-2 border border-[#3E2D24] shadow-inner" />
        </div>

        {/* Bobina de papel térmico saindo da impressora */}
        <div className="bg-[#FFFDF8] text-[#1E1714] font-mono text-xs p-5 rounded-b-2xl shadow-2xl border border-[#D5C6B5] space-y-3 relative -mt-2">
          {/* Cabeçalho do Ticket */}
          <div className="border-b-2 border-dashed border-[#B5A493] pb-3 text-center space-y-1">
            <p className="font-bold text-sm tracking-wider uppercase font-sans">*** SKINA DO PÃO ***</p>
            <p className="text-[10px] text-[#5A463B]">PADARIA ARTESANAL & CAFÉ · CNPJ 12.345.678/0001-90</p>
            <p className="text-[11px] font-bold mt-1 text-[#3E2D24]">ORDEM DE PRODUÇÃO COZINHA 80mm</p>
          </div>

          <div className="text-[11px] space-y-0.5 border-b border-dashed border-[#B5A493] pb-2">
            <div className="flex justify-between font-bold">
              <span>COMANDA: #{comanda.id}</span>
              <span>HORA: {comanda.horario}</span>
            </div>
            <div className="flex justify-between text-[#5A463B]">
              <span>SOLICITANTE:</span>
              <span className="font-bold text-[#1E1714]">{comanda.solicitante}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span>PRIORIDADE:</span>
              <span
                className={cx(
                  'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                  ehUrgente ? 'bg-[#DC2626] text-white animate-pulse' : 'bg-[#E5D8CB] text-[#3E2D24]'
                )}
              >
                {ehUrgente ? '🚨 FORNADA URGENTE (VITRINE ZERADA)' : 'NORMAL'}
              </span>
            </div>
          </div>

          {/* Itens solicitados com destaque */}
          <div className="space-y-1.5 py-1 border-b border-dashed border-[#B5A493]">
            <div className="flex justify-between text-[10px] font-bold text-[#6E5A4F] uppercase border-b border-[#E8DCD2] pb-1">
              <span>QTD SOLICITADA</span>
              <span>ITEM / SETOR</span>
            </div>
            {comanda.itens.map((it, idx) => (
              <div key={idx} className="flex justify-between items-center py-1">
                <span className="text-sm font-bold text-[#9C441B] bg-[#FDF3EB] px-2 py-0.5 rounded border border-[#EED0AE]">
                  +{formatarNumero(it.qtdSolicitada)} {it.unidade}
                </span>
                <div className="text-right">
                  <span className="font-bold block text-xs">{it.nome}</span>
                  <span className="text-[10px] text-[#6E5A4F]">{it.setor}</span>
                </div>
              </div>
            ))}
          </div>

          {comanda.observacao && (
            <div className="bg-[#FAF2EB] p-2 rounded-lg border border-[#E5D8CB] text-[10.5px] text-[#63391F]">
              <strong>OBS:</strong> {comanda.observacao}
            </div>
          )}

          {/* Código de barras simulado e rodapé ESC/POS */}
          <div className="text-center pt-1 space-y-1">
            <div className="tracking-[4px] text-xs font-mono select-none text-[#5A463B]">
              ||| | ||||| ||| |||| || |||||| |
            </div>
            <p className="text-[9.5px] text-[#6E5A4F]">
              PORTA: 192.168.1.200:9100 · PROTOCOLO ESC/POS · GUILHOTINA ACIONADA ✂️
            </p>
          </div>

          {/* Ações da Simulação */}
          <div className="pt-3 border-t border-[#D5C6B5] flex flex-col gap-2 font-sans">
            <div className="grid grid-cols-2 gap-2">
              <Botao
                variante="contorno"
                tamanho="sm"
                icone={RotateCcw}
                onClick={() => imprimirComandaTermica(comanda)}
                title="Tocar áudio de impressão e re-emitir ticket"
              >
                Reimprimir (Áudio)
              </Botao>
              {comanda.status === 'fila' ? (
                <Botao
                  variante="acento"
                  tamanho="sm"
                  icone={Flame}
                  onClick={() => {
                    iniciarFornada(comanda.id);
                    fecharImpressaoComanda();
                  }}
                >
                  Pôr no Forno
                </Botao>
              ) : (
                <Botao
                  variante="sucesso"
                  tamanho="sm"
                  icone={Check}
                  onClick={fecharImpressaoComanda}
                >
                  OK · No Forno
                </Botao>
              )}
            </div>

            <Botao
              variante="primario"
              tamanho="md"
              icone={CheckCircle2}
              onClick={fecharImpressaoComanda}
              className="w-full"
            >
              ✂️ Destacar Comprovante e Continuar
            </Botao>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 8.2 PAINEL DO DONO (exclusivo do proprietário)
// ----------------------------------------------------------------------------
function TelaPainelDono() {
  const { kpis, abrirPdf, atualizarPrecoOuCusto, caixaDia, atualizarCaixa, registrarSangria } = useSkina();
  const [sangriaValor, setSangriaValor] = useState('');
  const [sangriaDesc, setSangriaDesc] = useState('');

  return (
    <div className="space-y-4">
      {/* Banner executivo */}
      <section className="bg-gradient-to-br from-[#362218] via-[#2C1E18] to-[#4A3228] text-[#FFFDFB] rounded-[26px] p-5 shadow-lg space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-[#5A3E2E] text-[#F5D6B8] px-2.5 py-0.5 rounded-full">
              <Crown className="w-3 h-3" />
              Visão Geral Executiva · Seu Antônio
            </span>
            <h1 className="font-serif-display text-[26px] font-bold leading-tight mt-1.5">
              Sua padaria, sob seu olhar.
            </h1>
            <p className="text-xs text-[#D9C8BC]">Indicadores patrimoniais, Curva ABC, caixa e emissão de PDF Oficial A4.</p>
          </div>

          <Botao
            variante="acento"
            tamanho="md"
            icone={FileText}
            onClick={() => abrirPdf('executivo')}
            className="shadow-md shrink-0"
          >
            Emitir PDF A4
          </Botao>
        </div>

        {/* 4 KPIs principais */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="bg-[#FFFDFB]/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <span className="text-[10.5px] text-[#D9C8BC] flex items-center gap-1">
              <Warehouse className="w-3.5 h-3.5 text-[#F5D6B8]" />
              Patrimônio em Estoque (Custo)
            </span>
            <p className="font-serif-display font-bold text-lg text-white mt-0.5">
              {formatarMoeda(kpis.patrimonioTotalCusto)}
            </p>
            <span className="text-[10px] text-[#D9C8BC] block mt-0.5">
              Vitrine: {formatarMoeda(kpis.custoTotalVitrine)} · Dep.: {formatarMoeda(kpis.custoTotalDeposito)}
            </span>
          </div>

          <div className="bg-[#FFFDFB]/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <span className="text-[10.5px] text-[#D9C8BC] flex items-center gap-1">
              <Percent className="w-3.5 h-3.5 text-[#86EFAC]" />
              Margem Bruta & Giro Vitrine
            </span>
            <p className="font-serif-display font-bold text-lg text-[#86EFAC] mt-0.5">
              {formatarNumero(kpis.margemMediaGlobal)}% média
            </p>
            <span className="text-[10px] text-[#D9C8BC] block mt-0.5">
              Venda vitrine: {formatarMoeda(kpis.vendaPotencialVitrine)}
            </span>
          </div>

          <div className="bg-[#FFFDFB]/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <span className="text-[10.5px] text-[#D9C8BC] flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-[#FDBA74]" />
              Índice de Quebra / Perda
            </span>
            <p className="font-serif-display font-bold text-lg text-white mt-0.5">
              {formatarMoeda(kpis.totalPerdasReais)}{' '}
              <span className="text-xs font-normal text-[#FDBA74]">
                ({formatarNumero(kpis.indiceDesperdicioPct)}%)
              </span>
            </p>
            <span className="text-[10px] text-[#86EFAC] block mt-0.5">
              {kpis.dentroDaMetaDesperdicio ? '✓ Dentro da meta (< 3%)' : '⚠️ Acima do teto de 3%'}
            </span>
          </div>

          <div className="bg-[#FFFDFB]/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <span className="text-[10.5px] text-[#D9C8BC] flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-[#F5D6B8]" />
              Saldo Líquido do Dia
            </span>
            <p className="font-serif-display font-bold text-lg text-[#F5D6B8] mt-0.5">
              {formatarMoeda(kpis.saldoLiquidoCaixa)}
            </p>
            <span className="text-[10px] text-[#D9C8BC] block mt-0.5">
              Bruto: {formatarMoeda(kpis.receitaBrutaCaixa)}
            </span>
          </div>
        </div>
      </section>

      {/* Atalhos para PDF A4 */}
      <section className={cx(ui.card, 'p-4 space-y-2.5')}>
        <div className="flex items-center justify-between">
          <h3 className={ui.tituloSecao}>
            <FileText className="w-4 h-4 text-[#C86D51]" />
            Central de Documentos Oficiais em PDF (Folha A4)
          </h3>
          <Chip tom="verde">Timbrado A4</Chip>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {DOCUMENTOS_PDF.map((doc) => (
            <button
              key={doc.id}
              type="button"
              onClick={() => abrirPdf(doc.id)}
              className="text-left p-2.5 rounded-xl bg-[#FAF6F2] hover:bg-[#F3EAE0] border border-[#E2D5C8] transition-colors"
            >
              <span className="font-bold text-xs text-[#2C1E18] block">{doc.titulo}</span>
              <span className="text-[10.5px] text-[#6E5A4F]">{doc.sub}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Campeões de Margem & Risco de Ruptura */}
      <section className={cx(ui.card, 'p-4 space-y-3')}>
        <h3 className={ui.tituloSecao}>
          <Award className="w-4 h-4 text-[#C86D51]" />
          Inteligência de Margem & Risco de Ruptura
        </h3>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2F5938] block">
            🏆 Top 3 Campeões de Margem Bruta
          </span>
          <div className="grid grid-cols-3 gap-2">
            {kpis.campeoesMargem.map((prod) => (
              <div key={prod.id} className="bg-[#E6F0E8]/70 border border-[#C5DEC9] rounded-xl p-2.5 text-center">
                <span className="font-bold text-xs text-[#2C1E18] block truncate">{prod.nome}</span>
                <span className="font-serif-display font-bold text-base text-[#2F5938]">
                  {formatarNumero(prod.margemPct)}%
                </span>
                <span className="text-[10px] text-[#4A6B53] block">
                  +{formatarMoeda(prod.lucroUnitario)}/{prod.unidade.slice(0, 2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {kpis.riscoRuptura.length > 0 && (
          <div className="pt-2 border-t border-[#F4ECE3] space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B84A27] block">
              ⚠️ Produtos Abaixo do Mínimo na Vitrine ({kpis.riscoRuptura.length})
            </span>
            {kpis.riscoRuptura.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between text-xs bg-[#FDF3EB] px-3 py-1.5 rounded-xl border border-[#EED0AE]"
              >
                <span className="font-bold text-[#2C1E18]">{p.nome}</span>
                <span className="text-[#9C441B] font-semibold">
                  Vitrine: {formatarNumero(p.saldoVitrine)} / mín. {formatarNumero(p.minimo)} · Dep.:{' '}
                  {formatarNumero(p.saldoDeposito)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Simulador de Margem em Tempo Real */}
      <section className={cx(ui.card, 'p-4 space-y-3')}>
        <div>
          <h3 className={ui.tituloSecao}>
            <Sliders className="w-4 h-4 text-[#C86D51]" />
            Simulador de Precificação & Margem em Tempo Real
          </h3>
          <p className="text-xs text-[#6E5A4F]">
            Ajuste Custo ou Preço de Venda abaixo para recalcular instantaneamente o lucro unitário e a margem da
            padaria.
          </p>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {kpis.analiseProdutos.map((prod) => (
            <div
              key={prod.id}
              className="bg-[#FAF6F2] rounded-xl p-2.5 border border-[#E5D8CB] flex items-center justify-between gap-2 text-xs"
            >
              <div className="min-w-0 flex-1">
                <span className="font-bold text-[#2C1E18] block truncate">{prod.nome}</span>
                <span className="text-[10.5px] text-[#6E5A4F]">
                  Lucro: <strong>{formatarMoeda(prod.lucroUnitario)}</strong> · Margem:{' '}
                  <strong className="text-[#2F5938]">{formatarNumero(prod.margemPct)}%</strong>
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <div>
                  <label className="text-[9.5px] text-[#7A685F] block">Custo R$</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={prod.custoUnitario}
                    onChange={(e) => atualizarPrecoOuCusto(prod.id, 'custoUnitario', e.target.value)}
                    className="w-16 bg-white border border-[#D8C8B8] rounded-lg px-1.5 py-1 text-center font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-[9.5px] text-[#7A685F] block">Venda R$</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={prod.precoVenda}
                    onChange={(e) => atualizarPrecoOuCusto(prod.id, 'precoVenda', e.target.value)}
                    className="w-16 bg-white border border-[#4A3228] rounded-lg px-1.5 py-1 text-center font-bold text-xs text-[#2F5938]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frente de Loja / Caixa */}
      <section className={cx(ui.card, 'p-4 space-y-3')}>
        <h3 className={ui.tituloSecao}>
          <DollarSign className="w-4 h-4 text-[#2F5938]" />
          Balanço da Frente de Loja & Sistema de Caixa
        </h3>

        <div className="grid grid-cols-3 gap-2 text-center">
          {(['pix', 'cartao', 'dinheiro'] as const).map((campo) => {
            const rotulos = { pix: 'PIX', cartao: 'Cartão', dinheiro: 'Espécie (R$)' };
            return (
              <div key={campo} className="bg-[#FAF6F2] p-2.5 rounded-xl border border-[#E5D8CB]">
                <span className="text-[10px] font-bold text-[#6E5A4F] block">{rotulos[campo]}</span>
                <input
                  type="number"
                  value={caixaDia[campo]}
                  onChange={(e) => atualizarCaixa(campo, e.target.value)}
                  className="w-full text-center font-bold text-xs bg-transparent mt-0.5 focus:outline-none"
                />
              </div>
            );
          })}
        </div>

        {/* Lançamento de Sangria */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            placeholder="Motivo da sangria/despesa (ex: Gelo, Gás)"
            value={sangriaDesc}
            onChange={(e) => setSangriaDesc(e.target.value)}
            className="flex-1 bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-2.5 py-1.5 text-xs"
          />
          <input
            type="number"
            placeholder="R$"
            value={sangriaValor}
            onChange={(e) => setSangriaValor(e.target.value)}
            className="w-20 bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-2.5 py-1.5 text-xs font-bold"
          />
          <Botao
            variante="perigo"
            tamanho="sm"
            onClick={() => {
              if (registrarSangria(sangriaValor, sangriaDesc)) {
                setSangriaValor('');
                setSangriaDesc('');
              }
            }}
          >
            Sangria
          </Botao>
        </div>

        <div className="bg-[#E6F0E8] border border-[#C5DEC9] rounded-xl p-3 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-[#2F5938] block">Resultado Operacional Conciliado</span>
            <span className="text-[10.5px] text-[#4A6B53]">
              Entradas ({formatarMoeda(kpis.receitaBrutaCaixa)}) - Sangrias ({formatarMoeda(caixaDia.sangriasDespesas || 0)}) - NF-e ({formatarMoeda(caixaDia.totalNotasEntrada)})
            </span>
          </div>
          <span className="font-serif-display font-bold text-base text-[#1F4226]">
            {formatarMoeda(kpis.saldoLiquidoCaixa)}
          </span>
        </div>
      </section>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 8.3 TELA DE CONFERÊNCIA DA VITRINE
// ----------------------------------------------------------------------------
function TelaConferencia() {
  const {
    produtos,
    todosAbaixoMinimo,
    faltantesCozinha,
    faltantesInsumos,
    enviarLoteParaCozinha,
    sincronizarGuiaInsumos,
    restaurarDadosDeFabrica,
  } = useSkina();

  const [filtro, setFiltro] = useState<FiltroConferencia>('todos');
  const [modalPerda, setModalPerda] = useState<Produto | null>(null);

  const produtosFiltrados = useMemo(
    () => produtos.filter(REGRAS_FILTRO_CONFERENCIA[filtro]),
    [produtos, filtro]
  );

  return (
    <div className="space-y-3">
      <CabecalhoTela
        titulo="Conferência"
        descricao={
          <>
            Saldos separados: <strong>Vitrine</strong> vs. <strong>Depósito</strong>. Clique 3x rápido em <strong>+</strong> para <strong>+10</strong>.
          </>
        }
        direita={
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold bg-[#EAE0D5] text-[#3B2316] px-2.5 py-1 rounded-full">
              {produtosFiltrados.length} itens
            </span>
            <button
              type="button"
              onClick={restaurarDadosDeFabrica}
              className="p-1.5 rounded-full text-[#7A685F] hover:text-[#2C1E18] hover:bg-[#E9DFD5] transition-colors"
              title="Restaurar dados de fábrica"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        }
      />

      {/* Barra de Filtros */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 no-scrollbar">
        {FILTROS_CONFERENCIA.map((f) => {
          const IconeFiltro = f.icone;
          const ativo = filtro === f.id;
          const contagem = f.id === 'faltantes' ? todosAbaixoMinimo.length : undefined;

          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltro(f.id)}
              className={cx(
                'px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 border transition-all',
                ativo
                  ? 'bg-[#362218] text-[#FFFDFB] border-[#362218] shadow-2xs'
                  : 'bg-[#FFFDFB] text-[#5A4940] border-[#E5D8CB] hover:bg-[#F3EAE0]'
              )}
            >
              {IconeFiltro && <IconeFiltro className="w-3.5 h-3.5" />}
              {f.rotulo}
              {contagem !== undefined && ` (${contagem})`}
            </button>
          );
        })}
      </div>

      {/* Alerta de Itens Abaixo do Mínimo */}
      {todosAbaixoMinimo.length > 0 ? (
        <aside className="rounded-2xl p-3.5 bg-[#F8E2C8] border border-[#EED0AE] text-[#2C1E18] space-y-2">
          <p className="text-[13px] leading-snug">
            <strong className="font-bold text-[#B8592A]">Atenção:</strong> {faltantesCozinha.length} produto(s) de{' '}
            <strong>Cozinha</strong> e {faltantesInsumos.length} de <strong>Frios/Depósito</strong> abaixo do mínimo na vitrine.
          </p>
          <div className="flex flex-wrap gap-2">
            {faltantesCozinha.length > 0 && (
              <Botao
                variante="primario"
                tamanho="sm"
                icone={Printer}
                onClick={enviarLoteParaCozinha}
                className="shadow-2xs"
              >
                Gerar Comanda Cozinha ({faltantesCozinha.length})
              </Botao>
            )}
            {faltantesInsumos.length > 0 && (
              <Botao
                variante="info"
                tamanho="sm"
                icone={Snowflake}
                onClick={sincronizarGuiaInsumos}
                className="shadow-2xs"
              >
                Sincronizar Guia de Frios ({faltantesInsumos.length})
              </Botao>
            )}
          </div>
        </aside>
      ) : (
        <div className="rounded-2xl px-4 py-3 bg-[#E6F0E8] border border-[#C5DEC9] text-[#2F5938] text-[13px] font-medium flex items-center justify-between">
          <span>
            <strong>Vitrine em dia:</strong> Todos os itens atingiram a meta mínima!
          </span>
          <CheckCircle2 className="w-4 h-4 shrink-0" />
        </div>
      )}

      {/* Lista de Produtos */}
      <div className="space-y-3">
        {produtosFiltrados.map((item) => (
          <CardProdutoConferencia key={item.id} produto={item} onAbrirPerda={() => setModalPerda(item)} />
        ))}
      </div>

      {/* Modal de perda disparado a partir da conferência */}
      <ModalPerdaProduto produto={modalPerda} onFechar={() => setModalPerda(null)} />
    </div>
  );
}

interface PropsCardConferencia {
  key?: React.Key;
  produto: Produto;
  onAbrirPerda: () => void;
}

/** Card individual da conferência com visual polido e gaveta manual rápida. */
function CardProdutoConferencia({
  produto,
  onAbrirPerda,
}: PropsCardConferencia) {
  const {
    ajustarSaldoVitrine,
    definirSaldoVitrine,
    incrementarComCliqueTriplo,
    badgeMaisDezId,
    comandaAtivaPorProduto,
    tarefaAtivaPorProduto,
    solicitarOuReforcarItem,
  } = useSkina();

  const [editando, setEditando] = useState(false);
  const [valorDigitado, setValorDigitado] = useState('');

  const abaixoDoMinimo = produto.saldoVitrine < produto.minimo;
  const falta = Math.max(0, arredondar(produto.minimo - produto.saldoVitrine));
  const progresso = Math.min(100, Math.max(0, (produto.saldoVitrine / produto.minimo) * 100));
  const estaZerado = produto.saldoVitrine === 0;
  const ehCozinha = produto.tipoFluxo === 'cozinha';

  const comandaAtivaId = comandaAtivaPorProduto[produto.id];
  const tarefaAtivaId = tarefaAtivaPorProduto[produto.id];

  return (
    <article className="bg-[#FFFDFB] rounded-[22px] p-3.5 shadow-[0_4px_14px_rgba(44,30,24,0.05)] border border-[#EBE0D6] transition-all relative">
      {badgeMaisDezId === produto.id && (
        <div className="absolute -top-2.5 right-4 bg-[#2F5938] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 animate-bounce z-10">
          <Zap className="w-3 h-3" />
          +10 Rápido!
        </div>
      )}

      <div className="flex items-center gap-3.5">
        <IconeProduto
          iconeKey={produto.iconeKey}
          corFundo={produto.corFundoIcone}
          tamanho="w-[62px] h-[62px]"
          tamanhoIcone="w-9 h-9"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-serif-display text-[18px] font-bold text-[#2C1E18] leading-tight truncate">
              {produto.nome}
            </h2>

            <Chip tom={ehCozinha ? 'laranja' : 'azul'} icone={ehCozinha ? Flame : Warehouse}>
              {ehCozinha ? 'Cozinha' : `Depósito: ${formatarNumero(produto.saldoDeposito)}`}
            </Chip>
          </div>

          <div className="flex items-center justify-between gap-3 mt-1.5">
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-normal text-[#3B2A22] leading-tight mb-1.5">
                {produto.unidade} · mín. {formatarNumero(produto.minimo)}
              </p>

              <div className="w-full max-w-[148px]">
                <div className="h-2 w-full bg-[#E5DDD5] rounded-full overflow-hidden">
                  <div
                    className={cx(
                      'h-full rounded-full transition-all duration-300',
                      abaixoDoMinimo
                        ? 'bg-[#6A4937]'
                        : produto.saldoVitrine > produto.minimo
                        ? 'bg-[#749F72]'
                        : 'bg-[#5A3E2E]'
                    )}
                    style={{ width: `${progresso}%` }}
                  />
                </div>

                {abaixoDoMinimo && !estaZerado && (
                  <div className="mt-1 flex justify-end">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#F6E4D7] text-[#5C341D]">
                      Falta {formatarNumero(falta)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Stepper Vitrine */}
            <div className={cx('flex items-center rounded-2xl p-0.5 transition-colors shrink-0', estaZerado && 'bg-[#F5E1DA]')}>
              <button
                type="button"
                onClick={() => ajustarSaldoVitrine(produto.id, -produto.passo)}
                disabled={produto.saldoVitrine <= 0}
                className="w-11 h-11 rounded-[15px] bg-[#BC9E84] hover:bg-[#B09074] disabled:opacity-40 text-[#2C1E18] flex items-center justify-center active:scale-95 transition-all"
                aria-label={`Diminuir ${produto.nome}`}
              >
                <Minus className="w-5 h-5 stroke-[2]" />
              </button>

              <div className="w-14 flex flex-col items-center justify-center px-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditando(!editando);
                    setValorDigitado(formatarNumero(produto.saldoVitrine));
                  }}
                  className="flex flex-col items-center justify-center focus:outline-none group"
                  title="Toque para digitar ou usar atalhos rápidos"
                >
                  <span
                    className={cx(
                      'font-bold text-[22px] leading-none tabular-nums tracking-tight group-hover:underline',
                      estaZerado
                        ? 'text-[#B84A27]'
                        : produto.saldoVitrine > produto.minimo
                        ? 'text-[#52825D]'
                        : 'text-[#2C1E18]'
                    )}
                  >
                    {formatarNumero(produto.saldoVitrine)}
                  </span>
                  {estaZerado && (
                    <span className="text-[10px] font-semibold text-[#9E4224] leading-tight mt-0.5">
                      Falta {formatarNumero(falta)}
                    </span>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  incrementarComCliqueTriplo(produto.id, produto.passo, (delta) =>
                    ajustarSaldoVitrine(produto.id, delta)
                  )
                }
                className="w-11 h-11 rounded-[15px] bg-[#BC9E84] hover:bg-[#B09074] text-[#2C1E18] flex items-center justify-center active:scale-95 transition-all"
                title="Clique 3x rápido para adicionar +10"
                aria-label={`Aumentar ${produto.nome}`}
              >
                <Plus className="w-5 h-5 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gaveta de edição manual rápida */}
      {editando && (
        <div className="mt-3 pt-3 border-t border-[#EFE6DD] bg-[#FAF6F2] -mx-3.5 -mb-3.5 p-3.5 rounded-b-[22px] space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-[#4A3228]">
              Definir Saldo da Vitrine (Valida variações atípicas):
            </span>
            <button
              type="button"
              onClick={() => setEditando(false)}
              className="text-xs text-[#7A685F] font-semibold"
            >
              Fechar
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              inputMode="decimal"
              autoFocus
              value={valorDigitado}
              onChange={(e) => setValorDigitado(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  definirSaldoVitrine(produto.id, valorDigitado);
                  setEditando(false);
                }
              }}
              className="w-20 bg-white border border-[#4A3228] rounded-xl px-2.5 py-1.5 font-bold text-sm text-center"
            />
            <Botao
              variante="primario"
              tamanho="sm"
              onClick={() => {
                definirSaldoVitrine(produto.id, valorDigitado);
                setEditando(false);
              }}
            >
              Aplicar
            </Botao>

            <div className="flex items-center gap-1 ml-auto">
              {[
                { label: '=10', acao: () => definirSaldoVitrine(produto.id, 10) },
                { label: '=30', acao: () => definirSaldoVitrine(produto.id, 30) },
                { label: '=50', acao: () => definirSaldoVitrine(produto.id, 50) },
                { label: '+10', acao: () => ajustarSaldoVitrine(produto.id, 10) },
                { label: '+30', acao: () => ajustarSaldoVitrine(produto.id, 30) },
              ].map((atalho) => (
                <button
                  key={atalho.label}
                  type="button"
                  onClick={atalho.acao}
                  className="px-2 py-1.5 rounded-lg bg-[#E9DFD5] hover:bg-[#D8C7B6] text-[#2C1E18] font-bold text-xs transition-colors"
                >
                  {atalho.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Rodapé do card: pedir fornecimento ou registrar perda */}
      <div className="mt-2.5 pt-2 border-t border-[#F4ECE3] flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => solicitarOuReforcarItem(produto)}
          className={cx(
            'text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors',
            ehCozinha
              ? comandaAtivaId
                ? 'bg-[#E6F0E8] text-[#2F5938] border border-[#C5DEC9]'
                : 'bg-[#FDF0EB] hover:bg-[#F9DEC9] text-[#B84A27]'
              : tarefaAtivaId
              ? 'bg-[#E6F0E8] text-[#2F5938] border border-[#C5DEC9]'
              : 'bg-[#E6EEF2] hover:bg-[#D2E2EC] text-[#264E63]'
          )}
        >
          {ehCozinha ? (
            comandaAtivaId ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Já pedido (#{comandaAtivaId}) · Reforçar?
              </>
            ) : (
              <>
                <Flame className="w-3.5 h-3.5" />
                Pedir Fornada (Cozinha)
              </>
            )
          ) : tarefaAtivaId ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Na Guia de Frios · Reforçar?
            </>
          ) : (
            <>
              <Snowflake className="w-3.5 h-3.5" />
              Pedir do Depósito ({formatarNumero(produto.saldoDeposito)} disp.)
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => ajustarSaldoVitrine(produto.id, 10)}
            className="text-[11px] font-bold text-[#4A3228] bg-[#F3EAE0] hover:bg-[#E5D7C8] px-2 py-1 rounded-lg transition-colors"
          >
            +10
          </button>
          <button
            type="button"
            onClick={onAbrirPerda}
            className="text-[11px] font-semibold text-[#7A685F] hover:text-[#9E4224] px-2 py-1 rounded-lg hover:bg-[#F5E1DA]/50 transition-colors"
          >
            Perda/Quebra
          </button>
        </div>
      </div>
    </article>
  );
}

// ----------------------------------------------------------------------------
// 8.4 TELA DA COZINHA & IMPRESSORA TÉRMICA 80mm
// ----------------------------------------------------------------------------
function TelaCozinha() {
  const { comandasCozinha, iniciarFornada, concluirComanda, imprimirComandaTermica } = useSkina();

  return (
    <div className="space-y-4">
      <CabecalhoTela
        sobretitulo="Setor de Produção · Impressora Térmica 80mm"
        corSobretitulo="acento"
        icone={Flame}
        titulo="Comandas da Cozinha"
      />

      <BannerModoDemo
        titulo="Impressora Térmica ESC/POS 80mm"
        descricao="Sem hardware USB ligado. Ao emitir reposição ou clicar em 'Simular 80mm', o sistema simula o ticket térmico da bobina com áudio mecânico de guilhotina e corte de papel."
      />

      {comandasCozinha.length === 0 ? (
        <div className="bg-[#FFFDFB] rounded-[26px] p-8 text-center border border-[#EBE0D6]">
          <CheckCircle2 className="w-12 h-12 text-[#4B7A56] mx-auto mb-2" />
          <h3 className="font-serif-display font-bold text-lg text-[#2C1E18]">Nenhuma comanda pendente no forno!</h3>
          <p className="text-xs text-[#7A685F] mt-1">
            Todas as fornadas solicitadas pela vitrine já foram entregues e registradas no Ledger.
          </p>
        </div>
      ) : (
        <div id={ID_AREA_80MM} className="space-y-4">
          {comandasCozinha.map((comanda) => {
            const ehUrgente = comanda.prioridade === 'urgente';
            return (
              <div
                key={comanda.id}
                className={cx(
                  'bg-[#FFFDF9] rounded-2xl border-2 shadow-md overflow-hidden font-mono transition-all',
                  ehUrgente ? 'border-red-500 ring-2 ring-red-400/50' : 'border-[#D8C8B8]'
                )}
              >
                <div
                  className={cx(
                    'text-[#FFFDFB] px-4 py-2.5 flex items-center justify-between font-sans',
                    ehUrgente ? 'bg-[#991B1B]' : 'bg-[#362218]'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Printer className="w-4 h-4 text-[#F5D6B8]" />
                    <span className="font-bold text-xs tracking-wide">COMANDA #{comanda.id}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => imprimirComandaTermica(comanda)}
                      className="text-[10px] font-bold bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors"
                      title="Simular Impressão Térmica 80mm com áudio ESC/POS"
                    >
                      <Printer className="w-3 h-3" />
                      Simular 80mm
                    </button>
                    <span
                      className={cx(
                        'text-[10px] font-bold uppercase px-2 py-0.5 rounded-full',
                        ehUrgente ? 'bg-[#DC2626] text-white animate-pulse' : 'bg-[#5A3E2E] text-[#F5D6B8]'
                      )}
                    >
                      {ehUrgente ? '🔥 URGENTE' : 'NORMAL'}
                    </span>
                  </div>
                </div>

              <div className="p-4 space-y-3 text-xs text-[#2C1E18]">
                <div className="flex justify-between border-b border-dashed border-[#C7B6A6] pb-2">
                  <span>HORA: {comanda.horario}</span>
                  <span>SOLICITANTE: {comanda.solicitante}</span>
                </div>

                {comanda.observacao && (
                  <div className="bg-[#F8E2C8]/70 border border-[#E6C59E] rounded-xl p-2.5 font-sans text-[11.5px] text-[#7D4522] font-semibold">
                    {comanda.observacao}
                  </div>
                )}

                <div className="space-y-2 py-1">
                  {comanda.itens.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-[#F6EFE9] p-2.5 rounded-xl font-sans border border-[#E5D8CB]"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconeProduto iconeKey={it.iconeKey} tamanho="w-9 h-9" tamanhoIcone="w-5 h-5" />
                        <div>
                          <p className="font-bold text-sm text-[#2C1E18]">{it.nome}</p>
                          <span className="text-[10.5px] text-[#6E5A4F]">{it.setor}</span>
                        </div>
                      </div>
                      <span className="text-base font-bold text-[#9C441B] bg-[#F8E2C8] px-2.5 py-1 rounded-lg">
                        +{formatarNumero(it.qtdSolicitada)} {it.unidade}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-dashed border-[#C7B6A6] font-sans flex items-center gap-2">
                  {comanda.status === 'fila' ? (
                    <Botao
                      variante="acento"
                      tamanho="md"
                      icone={Flame}
                      onClick={() => iniciarFornada(comanda.id)}
                      className="flex-1"
                    >
                      Iniciar Fornada
                    </Botao>
                  ) : (
                    <span className="px-3 py-2 rounded-xl bg-[#FDF3EB] text-[#9C441B] font-bold text-xs border border-[#EED0AE] flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 animate-bounce" />
                      No Forno
                    </span>
                  )}

                  <Botao
                    variante="sucesso"
                    tamanho="md"
                    icone={Check}
                    onClick={() => concluirComanda(comanda)}
                    className="flex-1 shadow-xs"
                  >
                    Pronto · Somar na Vitrine
                  </Botao>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// 8.5 TELA DE ABASTECIMENTO DE INSUMOS (Depósito ➔ Vitrine)
// ----------------------------------------------------------------------------
function TelaAbastecimentoInsumos() {
  const {
    tarefasInsumos,
    faltantesInsumos,
    sincronizarGuiaInsumos,
    alterarQtdTarefa,
    incrementarComCliqueTriplo,
    transferirDepositoParaVitrine,
    produtoPorId,
    navegar,
  } = useSkina();

  return (
    <div className="space-y-4">
      <CabecalhoTela
        sobretitulo="Transferência Controlada: Depósito ➔ Vitrine"
        corSobretitulo="azul"
        icone={Snowflake}
        titulo="Abastecimento de Frios & Bebidas"
        descricao={
          <>
            Cada confirmação desconta do <strong>Saldo do Depósito</strong> e soma no{' '}
            <strong>Saldo da Vitrine</strong>, bloqueando transferências acima do estoque disponível.
          </>
        }
      />

      {faltantesInsumos.length > 0 && (
        <Botao
          variante="info"
          tamanho="lg"
          icone={Snowflake}
          onClick={sincronizarGuiaInsumos}
          className="bg-[#E6EEF2] text-[#264E63] border border-[#C2D7E2] hover:bg-[#D5E4EC]"
        >
          Adicionar insumos abaixo do mínimo sem apagar ajustes atuais
        </Botao>
      )}

      {tarefasInsumos.length === 0 ? (
        <div className="bg-[#FFFDFB] rounded-[26px] p-8 text-center border border-[#EBE0D6]">
          <CheckCircle2 className="w-12 h-12 text-[#4B7A56] mx-auto mb-2" />
          <h3 className="font-serif-display font-bold text-lg text-[#2C1E18]">Nenhuma transferência pendente!</h3>
          <p className="text-xs text-[#7A685F] mt-1">Todos os insumos refrigerados da vitrine foram abastecidos.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tarefasInsumos.map((tarefa) => {
            const prodReal = produtoPorId.get(tarefa.produtoId);
            const saldoVitrineAtual = prodReal ? prodReal.saldoVitrine : 0;
            const saldoDepositoAtual = prodReal ? prodReal.saldoDeposito : 0;
            const semEstoqueDeposito = tarefa.qtdAbastecer > saldoDepositoAtual;

            return (
              <div key={tarefa.id} className={cx(ui.card, 'p-4 space-y-3')}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <IconeProduto
                      iconeKey={tarefa.iconeKey}
                      corFundo="bg-[#E6EEF2]"
                      tamanho="w-12 h-12"
                      tamanhoIcone="w-7 h-7"
                    />
                    <div>
                      <Chip tom="azul">{tarefa.setor}</Chip>
                      <h3 className="font-serif-display font-bold text-base text-[#2C1E18] mt-1">{tarefa.nome}</h3>
                      <div className="flex items-center gap-3 text-[11.5px] text-[#6E5A4F] mt-0.5">
                        <span>
                          Vitrine: <strong>{formatarNumero(saldoVitrineAtual)}</strong>
                        </span>
                        <span>·</span>
                        <span className={semEstoqueDeposito ? 'text-[#B84A27] font-bold' : 'text-[#2F5938] font-bold'}>
                          Depósito: {formatarNumero(saldoDepositoAtual)} {tarefa.unidade}
                        </span>
                      </div>
                    </div>
                  </div>

                  {tarefa.prioridade === 'urgente' && <Chip tom="erro">Prioridade</Chip>}
                </div>

                {semEstoqueDeposito && (
                  <div className="bg-[#F5E1DA] text-[#8C2D19] px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between">
                    <span>⚠️ Saldo insuficiente no Depósito ({formatarNumero(saldoDepositoAtual)} disp.).</span>
                    <button
                      type="button"
                      onClick={() => navegar('nota-fiscal')}
                      className="underline font-bold ml-2 hover:opacity-80"
                    >
                      Lançar Nota
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1.5 bg-[#F5EFEA] p-1 rounded-xl border border-[#E2D5C8]">
                    <button
                      type="button"
                      onClick={() => alterarQtdTarefa(tarefa.id, (q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-[#BC9E84] text-[#2C1E18] flex items-center justify-center hover:bg-[#B09074] transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={tarefa.qtdAbastecer}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        alterarQtdTarefa(tarefa.id, () => val);
                      }}
                      className="w-12 text-center font-bold text-sm bg-transparent focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        incrementarComCliqueTriplo(`ins-${tarefa.id}`, 1, (delta) =>
                          alterarQtdTarefa(tarefa.id, (q) => q + delta)
                        )
                      }
                      className="w-8 h-8 rounded-lg bg-[#BC9E84] text-[#2C1E18] flex items-center justify-center hover:bg-[#B09074] transition-colors"
                      title="Clique 3x rápido para adicionar +10"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <Botao
                    variante="info"
                    tamanho="md"
                    icone={Check}
                    disabled={semEstoqueDeposito}
                    onClick={() => transferirDepositoParaVitrine(tarefa)}
                    className="flex-1 shadow-2xs"
                  >
                    Transferir p/ Vitrine
                  </Botao>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// 8.6 TELA DE NOTA FISCAL (Entrada no Saldo do Depósito com Idempotência)
// ----------------------------------------------------------------------------
function TelaNotaFiscal() {
  const {
    notasProcessadasIds,
    lancarNotaFiscal,
    dispararToast,
    perfilAtivo,
    trocarPerfil,
    ehProprietario,
    produtoPorId,
    incrementarComCliqueTriplo,
  } = useSkina();

  const [chaveNota, setChaveNota] = useState(CHAVE_NOTA_INICIAL);
  const [fornecedor, setFornecedor] = useState(LOTES_NOTAS_EXEMPLO[CHAVE_NOTA_INICIAL].fornecedor);
  const [itensNota, setItensNota] = useState(LOTES_NOTAS_EXEMPLO[CHAVE_NOTA_INICIAL].itens);
  const [lendoOcr, setLendoOcr] = useState(false);

  const notaJaProcessada = notasProcessadasIds.includes(chaveNota);
  const podeLancar = perfilAtivo?.permissoes.lancarNotaFiscal ?? false;

  function trocarLoteNota(chave: string) {
    setChaveNota(chave);
    setFornecedor(LOTES_NOTAS_EXEMPLO[chave].fornecedor);
    setItensNota(LOTES_NOTAS_EXEMPLO[chave].itens);
  }

  function simularOcr() {
    setLendoOcr(true);
    setTimeout(() => {
      setLendoOcr(false);
      dispararToast(`✨ Simulação OCR concluída para ${chaveNota}!`);
    }, 500);
  }

  function alterarQtdEmbalagens(idItem: string, delta: number) {
    setItensNota((prev) =>
      prev.map((it) => (it.id === idItem ? { ...it, qtdEmbalagens: Math.max(0, it.qtdEmbalagens + delta) } : it))
    );
  }

  const valorTotalNota = somar(itensNota.map((i) => i.qtdEmbalagens * i.valorUnitarioEmbalagem));

  return (
    <div className="space-y-4">
      <CabecalhoTela
        sobretitulo="Entrada Exclusiva no Saldo do Depósito · Chave Única"
        corSobretitulo="verde"
        icone={Warehouse}
        titulo="Recebimento de Nota Fiscal"
        descricao={
          <>
            Converte fardos e caixas automaticamente e soma no <strong>Saldo do Depósito</strong>. Bloqueia
            confirmação duplicada da mesma nota.
          </>
        }
      />

      <BannerModoDemo
        titulo="Leitura Ótica de Nota Fiscal (OCR IA)"
        descricao="A câmera simula a extração de dados da NF-e. Alterne entre as notas de teste para verificar a trava de idempotência contra confirmação duplicada."
      />

      {/* Trava RBAC: apenas Compras ou Dono lançam NF */}
      {!podeLancar && (
        <BannerAviso
          tom="erro"
          icone={Lock}
          mensagem={
            <span>
              <strong>Perfil Restrito ({perfilAtivo?.nome}):</strong> Apenas{' '}
              <strong>Compras/Estoque (Mateus)</strong> ou <strong>Proprietário (Seu Antônio)</strong> podem confirmar
              a entrada no Depósito.
            </span>
          }
          acao={
            <Botao variante="perigo" tamanho="sm" onClick={() => trocarPerfil('estoque')}>
              Trocar p/ Mateus
            </Botao>
          }
        />
      )}

      {/* Caixa de seleção de nota fiscal de teste */}
      <section className="bg-[#2C1E18] rounded-[24px] p-4 text-white border border-[#4A3228] shadow-md space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#F5D6B8]" />
            <span className="text-xs font-bold text-[#F5D6B8]">Chave da Nota Fiscal:</span>
          </div>

          <div className="flex items-center gap-1.5">
            {Object.keys(LOTES_NOTAS_EXEMPLO).map((chave) => {
              const processada = notasProcessadasIds.includes(chave);
              const selecionada = chaveNota === chave;
              return (
                <button
                  key={chave}
                  type="button"
                  onClick={() => trocarLoteNota(chave)}
                  className={cx(
                    'px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-colors',
                    selecionada ? 'bg-[#C86D51] text-white' : 'bg-[#4A3228] text-[#D9C8BC] hover:bg-[#5A3E2E]'
                  )}
                >
                  {chave}
                  {processada && <Check className="w-3 h-3 text-[#86EFAC]" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1 border-t border-[#4A3228]">
          <span className="text-[#D9C8BC] truncate">{fornecedor}</span>
          <Botao variante="escuroSuave" tamanho="sm" icone={Camera} onClick={simularOcr}>
            {lendoOcr ? 'Lendo OCR...' : 'Simular Leitura OCR'}
          </Botao>
        </div>
      </section>

      {/* Lista de Itens da Nota */}
      <div className="space-y-3">
        {itensNota.map((item) => {
          const totalConvertido = item.qtdEmbalagens * item.fatorConversao;
          const prodAtual = produtoPorId.get(item.produtoId);

          return (
            <div key={item.id} className={cx(ui.card, 'p-4 space-y-3')}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <IconeProduto iconeKey={item.iconeKey} tamanho="w-11 h-11" tamanhoIcone="w-6 h-6" />
                  <div>
                    <Chip tom="verde">OCR Demo: {item.confiancaIA}</Chip>
                    <h3 className="font-serif-display font-bold text-sm text-[#2C1E18] mt-0.5">
                      {item.descricaoNota}
                    </h3>
                    <span className="text-[11px] text-[#6E5A4F]">
                      Saldo atual no Depósito:{' '}
                      <strong>
                        {formatarNumero(prodAtual?.saldoDeposito || 0)} {item.unidadeVitrine}
                      </strong>
                    </span>
                  </div>
                </div>

                {ehProprietario && (
                  <span className="font-bold text-xs text-[#4A3228]">
                    {formatarMoeda(item.qtdEmbalagens * item.valorUnitarioEmbalagem)}
                  </span>
                )}
              </div>

              <div className="bg-[#F5EFEA] rounded-xl p-2.5 border border-[#E2D5C8] flex items-center justify-between text-xs">
                <span className="text-[#5A4940]">
                  Conversão: <strong>{item.qtdEmbalagens} {item.tipoEmbalagem}</strong> × {item.fatorConversao}
                </span>
                <span className="font-bold text-[#264E63] bg-[#E6EEF2] px-2.5 py-0.5 rounded-lg border border-[#C2D7E2]">
                  = +{totalConvertido} {item.unidadeVitrine} no Depósito
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[#6E5A4F]">Qtd. de {item.tipoEmbalagem} recebidos:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={notaJaProcessada}
                    onClick={() => alterarQtdEmbalagens(item.id, -1)}
                    className="w-9 h-9 rounded-xl bg-[#BC9E84] disabled:opacity-40 text-[#2C1E18] flex items-center justify-center hover:bg-[#B09074] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-9 text-center font-bold text-base">{item.qtdEmbalagens}</span>
                  <button
                    type="button"
                    disabled={notaJaProcessada}
                    onClick={() =>
                      incrementarComCliqueTriplo(`nf-${item.id}`, 1, (delta) =>
                        alterarQtdEmbalagens(item.id, delta)
                      )
                    }
                    className="w-9 h-9 rounded-xl bg-[#BC9E84] disabled:opacity-40 text-[#2C1E18] flex items-center justify-center hover:bg-[#B09074] transition-colors"
                    title="Clique 3x rápido para adicionar +10"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botão de confirmação com travas */}
      <Botao
        variante={notaJaProcessada ? 'sucesso' : podeLancar ? 'primario' : 'contorno'}
        tamanho="lg"
        disabled={notaJaProcessada || !podeLancar}
        onClick={() => lancarNotaFiscal(chaveNota, itensNota)}
        className="rounded-[24px] py-3.5 shadow-lg"
      >
        {notaJaProcessada ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Nota {chaveNota} Já Processada no Depósito (Idempotente)
          </>
        ) : !podeLancar ? (
          <>
            <Lock className="w-4 h-4" />
            Bloqueado para o perfil {perfilAtivo?.cargo}
          </>
        ) : (
          <>
            Confirmar Entrada no Depósito ({chaveNota}
            {ehProprietario ? ` · ${formatarMoeda(valorTotalNota)}` : ''})
          </>
        )}
      </Botao>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 8.7 TELA DE RELATÓRIOS (Auditoria & Livro-Razão)
// ----------------------------------------------------------------------------
function TelaRelatorios() {
  const {
    abaRelatorio,
    setAbaRelatorio,
    historicoReposicoes,
    historicoPerdas,
    historicoTurnos,
    produtos,
    caixaDia,
    abrirPdf,
    perfilAtivo,
  } = useSkina();

  const [filtroMovimento, setFiltroMovimento] = useState<FiltroMovimento>('todos');

  const movimentosFiltrados = useMemo(() => {
    const regra = FILTROS_MOVIMENTO.find((f) => f.id === filtroMovimento);
    if (!regra?.categoria) return historicoReposicoes;
    return historicoReposicoes.filter((r) => r.categoriaRelatorio.includes(regra.categoria!));
  }, [historicoReposicoes, filtroMovimento]);

  return (
    <div className="space-y-4">
      <CabecalhoTela
        sobretitulo="Livro-Razão Imutável (Ledger)"
        corSobretitulo="acento"
        titulo="Auditoria & Relatórios"
        direita={
          <Botao
            variante="primario"
            tamanho="sm"
            icone={FileText}
            onClick={() => abrirPdf('reposicoes')}
            className="text-[#F5D6B8]"
          >
            Gerar PDF Oficial A4
          </Botao>
        }
      />

      {/* Seletor de sub-abas */}
      <div className="grid grid-cols-4 bg-[#E8DDD2] p-1 rounded-2xl gap-1">
        {[
          { id: 'repostos', rotulo: `Movimentos (${historicoReposicoes.length})` },
          { id: 'perdas', rotulo: `Perdas (${historicoPerdas.length})` },
          { id: 'turnos', rotulo: `Turnos (${historicoTurnos.length})` },
          { id: 'balanco', rotulo: 'Saldos & Caixa' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setAbaRelatorio(tab.id as AbaRelatorio)}
            className={cx(
              'py-2 px-1 rounded-xl text-[11px] font-bold transition-all truncate',
              abaRelatorio === tab.id ? 'bg-[#FFFDFB] text-[#2C1E18] shadow-2xs' : 'text-[#6E5A4F]'
            )}
          >
            {tab.rotulo}
          </button>
        ))}
      </div>

      {/* Sub-aba 1: Movimentos */}
      {abaRelatorio === 'repostos' && (
        <div className="space-y-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {FILTROS_MOVIMENTO.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFiltroMovimento(f.id)}
                className={cx(
                  'px-2.5 py-1 rounded-lg text-[11px] font-bold border whitespace-nowrap transition-colors',
                  filtroMovimento === f.id
                    ? 'bg-[#362218] text-white border-[#362218]'
                    : 'bg-[#FFFDFB] text-[#5A4940] border-[#E2D5C8]'
                )}
              >
                {f.rotulo}
              </button>
            ))}
          </div>

          <div className="space-y-2.5">
            {movimentosFiltrados.map((rep) => (
              <article key={rep.id} className={cx(ui.card, 'p-3.5 space-y-2')}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IconeProduto iconeKey={rep.iconeKey} tamanho="w-10 h-10" tamanhoIcone="w-5 h-5" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A685F] block truncate">
                        {rep.categoriaRelatorio} · {rep.origemFluxo}
                      </span>
                      <h4 className="font-serif-display font-bold text-sm text-[#2C1E18] truncate">{rep.produto}</h4>
                    </div>
                  </div>

                  <span className="shrink-0 font-bold text-xs bg-[#E6F0E8] text-[#2F5938] px-2.5 py-1 rounded-xl border border-[#C5DEC9]">
                    {rep.qtdReposta > 0 ? `+${formatarNumero(rep.qtdReposta)}` : formatarNumero(rep.qtdReposta)}{' '}
                    {rep.unidade}
                  </span>
                </div>

                <div className="bg-[#FAF6F2] px-3 py-1.5 rounded-xl border border-[#EFE6DD] flex items-center justify-between text-[11px] text-[#5A4940]">
                  <span>
                    Vitrine: <strong>{formatarNumero(rep.antesVitrine)} ➔ {formatarNumero(rep.depoisVitrine)}</strong>
                  </span>
                  <span>
                    Depósito: <strong>{formatarNumero(rep.antesDeposito)} ➔ {formatarNumero(rep.depoisDeposito)}</strong>
                  </span>
                  <span className="text-[#8C7A70]">
                    {rep.horario} · {rep.responsavel}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Sub-aba 2: Perdas */}
      {abaRelatorio === 'perdas' && (
        <div className="space-y-3">
          <div className="bg-[#FDF3EB] border border-[#EED0AE] rounded-[22px] p-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#873E1B] block">Impacto Financeiro de Quebras/Perdas</span>
              <p className="text-[11px] text-[#6E5A4F]">Baixas validadas contra o saldo real da vitrine</p>
            </div>
            <span className="font-serif-display font-bold text-xl text-[#9C441B]">
              {formatarMoeda(somar(historicoPerdas.map((p) => p.custoEstimado)))}
            </span>
          </div>

          <div className="space-y-2">
            {historicoPerdas.map((perda) => (
              <div key={perda.id} className={cx(ui.card, 'p-3.5 flex items-center justify-between gap-3')}>
                <div className="flex items-center gap-3 min-w-0">
                  <IconeProduto
                    iconeKey={perda.iconeKey}
                    corFundo="bg-[#F5E1DA]"
                    tamanho="w-10 h-10"
                    tamanhoIcone="w-5 h-5"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-[#2C1E18] truncate">{perda.produto}</h4>
                    <p className="text-xs text-[#7A685F]">
                      Motivo: <strong>{perda.motivo}</strong> · Vitrine: {formatarNumero(perda.antesVitrine)} ➔{' '}
                      {formatarNumero(perda.depoisVitrine)}
                    </p>
                    <span className="text-[10px] text-[#8C7A70]">
                      Responsável: {perda.responsavel} às {perda.horario}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[#9E4224] bg-[#F5E1DA] px-2 py-0.5 rounded-lg">
                    -{formatarNumero(perda.qtd)} {perda.unidade}
                  </span>
                  <span className="block text-[11px] text-[#6E5A4F] mt-0.5">{formatarMoeda(perda.custoEstimado)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-aba 3: Passagens de Turno */}
      {abaRelatorio === 'turnos' && (
        <div className="space-y-3">
          {historicoTurnos.map((t) => (
            <div key={t.id} className={cx(ui.card, 'p-4 space-y-2')}>
              <div className="flex items-center justify-between">
                <Chip tom="verde">
                  {t.turnoEncerrado} ➔ {t.turnoIniciado}
                </Chip>
                <span className="text-xs text-[#7A685F] font-semibold">{t.horario}</span>
              </div>
              <p className="text-xs text-[#2C1E18]">
                Entregue por <strong>{t.responsavelEntregou}</strong> · Assumido por{' '}
                <strong>{t.responsavelAssumiu}</strong>
              </p>
              <p className="text-[11px] text-[#6E5A4F] bg-[#FAF6F2] p-2.5 rounded-xl border border-[#EFE6DD]">
                "{t.observacao}" ({t.pendenciasSnapshot})
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Sub-aba 4: Saldos & Caixa */}
      {abaRelatorio === 'balanco' && (
        <div className="space-y-3">
          <div className={cx(ui.card, 'p-4 space-y-2.5')}>
            <h3 className={ui.tituloSecao}>Posição de Estoque Separada: Vitrine vs. Depósito</h3>
            <div className="space-y-1.5">
              {produtos.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-[#F4ECE3] last:border-0"
                >
                  <span className="font-semibold text-[#2C1E18]">{p.nome}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#F3EAE0] text-[#4A3228] font-bold">
                      Vitrine: {formatarNumero(p.saldoVitrine)}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#E6EEF2] text-[#264E63] font-bold">
                      Depósito: {formatarNumero(p.saldoDeposito)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {perfilAtivo?.permissoes.verFinanceiroCompleto ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#E6F0E8] border border-[#C5DEC9] rounded-[22px] p-4">
                <span className="text-xs font-semibold text-[#2F5938] flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Receita Caixa Hoje
                </span>
                <p className="font-serif-display font-bold text-xl text-[#1F4226] mt-1">
                  {formatarMoeda(caixaDia.pix + caixaDia.cartao + caixaDia.dinheiro)}
                </p>
              </div>

              <div className="bg-[#F8E2C8] border border-[#EED0AE] rounded-[22px] p-4">
                <span className="text-xs font-semibold text-[#873E1B] flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  Compras (Notas NF-e)
                </span>
                <p className="font-serif-display font-bold text-xl text-[#6E3012] mt-1">
                  {formatarMoeda(caixaDia.totalNotasEntrada)}
                </p>
              </div>
            </div>
          ) : (
            <BannerAviso
              tom="neutro"
              icone={Lock}
              mensagem={
                <span>
                  Os totalizadores de faturamento são exclusivos do perfil <strong>Proprietário (Seu Antônio)</strong>.
                </span>
              }
            />
          )}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// 8.8 TELA DE PASSAGEM DE TURNO
// ----------------------------------------------------------------------------
function TelaPassagemTurno() {
  const { registrarPassagemTurno } = useSkina();

  const [entregando, setEntregando] = useState('Clara Mendes');
  const [assumindo, setAssumindo] = useState('Mateus Rocha');
  const [checklist, setChecklist] = useState<ChecklistTurno>({
    vitrineConferida: true,
    friosAbastecidos: true,
    fornoLimpo: true,
    caixaParcialConferido: true,
  });
  const [obs, setObs] = useState('Turma da tarde: atenção ao Pão de Hambúrguer. Frios conferidos na câmara.');

  return (
    <div className="space-y-4">
      <CabecalhoTela
        sobretitulo="Registro Auditável de Troca de Equipe"
        corSobretitulo="acento"
        titulo="Passagem de Turno"
        descricao="Formalize a entrega do balcão indicando quem entrega, quem assume e o checklist operacional."
      />

      <div className={cx(ui.card, 'p-4 space-y-3')}>
        <div className="grid grid-cols-2 gap-2.5">
          <Campo rotulo="Quem entrega o turno:">
            <select
              value={entregando}
              onChange={(e) => setEntregando(e.target.value)}
              className={ui.input}
            >
              {PERFIS_RBAC.map((p) => (
                <option key={p.id} value={p.nome}>
                  {p.nome}
                </option>
              ))}
            </select>
          </Campo>

          <Campo rotulo="Quem assume o turno:">
            <select
              value={assumindo}
              onChange={(e) => setAssumindo(e.target.value)}
              className={ui.input}
            >
              {PERFIS_RBAC.map((p) => (
                <option key={p.id} value={p.nome}>
                  {p.nome}
                </option>
              ))}
            </select>
          </Campo>
        </div>

        <div className="pt-2 border-t border-[#F4ECE3] space-y-1.5">
          <h3 className="text-xs font-bold uppercase text-[#4A3228]">Checklist Obrigatório do Turno</h3>
          {ITENS_CHECKLIST_TURNO.map((item) => (
            <label
              key={item.chave}
              className="flex items-center gap-2.5 text-xs font-medium text-[#2C1E18] py-1 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checklist[item.chave]}
                onChange={(e) => setChecklist((prev) => ({ ...prev, [item.chave]: e.target.checked }))}
                className="w-4 h-4 rounded accent-[#362218]"
              />
              {item.rotulo}
            </label>
          ))}
        </div>

        <textarea
          rows={2}
          value={obs}
          onChange={(e) => setObs(e.target.value)}
          className={ui.input}
          placeholder="Observações para o próximo turno..."
        />

        <Botao
          variante="primario"
          tamanho="lg"
          onClick={() =>
            registrarPassagemTurno({
              entregou: entregando,
              assumiu: assumindo,
              checklist,
              observacao: obs,
            })
          }
        >
          Registrar Passagem de Turno
        </Botao>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 8.9 TELA DE CATÁLOGO & ESTOQUE INICIAL
// ----------------------------------------------------------------------------
function TelaCatalogo() {
  const { produtos, salvarProduto, ehProprietario, perfilAtivo } = useSkina();

  const [busca, setBusca] = useState('');
  const [editando, setEditando] = useState<Produto | null>(null);
  const [erroForm, setErroForm] = useState('');
  const [form, setForm] = useState<FormProduto>(FORM_PRODUTO_VAZIO);

  const podeEditar = perfilAtivo?.permissoes.gerirCatalogoCustos ?? false;

  function iniciarEdicao(p: Produto) {
    setErroForm('');
    setEditando(p);
    setForm(produtoParaForm(p));
  }

  function cancelarEdicao() {
    setErroForm('');
    setEditando(null);
    setForm(FORM_PRODUTO_VAZIO);
  }

  function submeter() {
    const erro = salvarProduto(form, editando?.id ?? null);
    if (erro) {
      setErroForm(erro);
    } else {
      cancelarEdicao();
    }
  }

  const produtosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();
    if (!termo) return produtos;
    return produtos.filter(
      (p) => p.nome.toLowerCase().includes(termo) || p.setor.toLowerCase().includes(termo)
    );
  }, [produtos, busca]);

  return (
    <div className="space-y-4">
      <CabecalhoTela
        sobretitulo={
          ehProprietario
            ? 'Gestão de Produtos, Unidades, Passo e Custos'
            : 'Gestão Operacional de Produtos, Unidades e Passo'
        }
        corSobretitulo="acento"
        titulo="Catálogo & Estoque Inicial"
      />

      {!podeEditar && (
        <BannerAviso
          tom="erro"
          icone={Lock}
          mensagem={
            <span>
              O perfil <strong>{perfilAtivo?.cargo}</strong> está em modo de leitura no catálogo. Alterne para
              Mateus ou Seu Antônio no topo para cadastrar ou editar produtos.
            </span>
          }
        />
      )}

      {/* Formulário de Cadastro / Edição */}
      <section className={cx(ui.card, 'p-4 space-y-3')}>
        <div className="flex items-center justify-between">
          <h3 className={ui.tituloSecao}>
            {editando ? `Editando: ${editando.nome}` : 'Novo Produto no Catálogo'}
          </h3>
          {editando && (
            <button type="button" onClick={cancelarEdicao} className="text-xs text-[#7A685F] underline">
              Cancelar edição
            </button>
          )}
        </div>

        {erroForm && (
          <div className="bg-[#F5E1DA] text-[#8C2D19] px-3 py-2 rounded-xl text-xs font-bold">
            ⚠️ {erroForm}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2.5">
          <input
            type="text"
            placeholder="Nome obrigatório (mín. 2 letras)"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className={cx(ui.input, 'col-span-2')}
          />

          <select
            value={form.tipoFluxo}
            onChange={(e) => {
              const tipo = e.target.value as TipoFluxo;
              setForm({
                ...form,
                tipoFluxo: tipo,
                setor: SETOR_PADRAO_POR_FLUXO[tipo],
              });
            }}
            className={ui.input}
          >
            <option value="cozinha">🔥 Produção Cozinha</option>
            <option value="insumo">❄️ Insumo (Depósito/Vitrine)</option>
          </select>

          <select
            value={form.unidade}
            onChange={(e) => setForm({ ...form, unidade: e.target.value })}
            className={ui.input}
          >
            {UNIDADES.map((u) => (
              <option key={u} value={u}>
                Unidade: {u}
              </option>
            ))}
          </select>

          <Campo rotulo="Meta Mín. Vitrine">
            <input
              type="number"
              min="0"
              value={form.minimo}
              onChange={(e) => setForm({ ...form, minimo: e.target.value })}
              className={ui.input}
            />
          </Campo>

          <Campo rotulo="Passo (+ / -)">
            <input
              type="number"
              step="0.5"
              min="0.1"
              value={form.passo}
              onChange={(e) => setForm({ ...form, passo: e.target.value })}
              className={ui.input}
            />
          </Campo>

          <Campo rotulo="Saldo Vitrine">
            <input
              type="number"
              min="0"
              value={form.saldoVitrine}
              onChange={(e) => setForm({ ...form, saldoVitrine: e.target.value })}
              className={ui.input}
            />
          </Campo>

          <Campo rotulo="Saldo Depósito">
            <input
              type="number"
              min="0"
              value={form.saldoDeposito}
              onChange={(e) => setForm({ ...form, saldoDeposito: e.target.value })}
              className={ui.input}
            />
          </Campo>

          {ehProprietario && (
            <Campo rotulo="Custo Unit. (R$)">
              <input
                type="number"
                step="0.1"
                min="0"
                value={form.custoUnitario}
                onChange={(e) => setForm({ ...form, custoUnitario: e.target.value })}
                className={ui.input}
              />
            </Campo>
          )}

          <Campo rotulo="Ícone Vetorial" className={ehProprietario ? '' : 'col-span-2'}>
            <select
              value={form.iconeKey}
              onChange={(e) => setForm({ ...form, iconeKey: e.target.value })}
              className={ui.input}
            >
              {Object.entries(MAPA_ICONES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </Campo>
        </div>

        <Botao
          variante="primario"
          tamanho="lg"
          disabled={!podeEditar}
          onClick={submeter}
        >
          {editando ? 'Salvar Alterações Validadas' : 'Cadastrar Produto Validado'}
        </Botao>
      </section>

      {/* Busca */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#7A685F] absolute left-3.5 top-3" />
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Pesquisar produto no catálogo por nome ou setor..."
          className="w-full bg-[#FFFDFB] border border-[#EBE0D6] rounded-2xl pl-9 pr-4 py-2.5 text-xs text-[#2C1E18] focus:outline-none"
        />
      </div>

      {/* Lista Filtrada */}
      <div className="space-y-2">
        {produtosFiltrados.map((p) => (
          <div key={p.id} className={cx(ui.card, 'p-3 flex items-center justify-between')}>
            <div className="flex items-center gap-2.5 min-w-0">
              <IconeProduto iconeKey={p.iconeKey} corFundo={p.corFundoIcone} tamanho="w-10 h-10" tamanhoIcone="w-6 h-6" />
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-[#2C1E18] truncate">{p.nome}</h4>
                <span className="text-[10.5px] text-[#6E5A4F] block truncate">
                  Vitrine: <strong>{formatarNumero(p.saldoVitrine)}</strong> · Depósito:{' '}
                  <strong>{formatarNumero(p.saldoDeposito)}</strong>
                  {ehProprietario && ` · Custo: ${formatarMoeda(p.custoUnitario)}`}
                </span>
              </div>
            </div>

            <Botao
              variante="suave"
              tamanho="sm"
              disabled={!podeEditar}
              onClick={() => iniciarEdicao(p)}
              className="shrink-0"
            >
              Editar
            </Botao>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 9. MODAIS GLOBAIS
// ============================================================================

// ----------------------------------------------------------------------------
// 9.1 MODAL DO PDF OFICIAL A4 (Exclusivo do Proprietário)
// ----------------------------------------------------------------------------
function ModalPdfOficial() {
  const { escopoPdf, abrirPdf, fecharPdf, imprimirPdf, baixarPdfComoHtml, kpis, historicoReposicoes, historicoTurnos, perfilAtivo } = useSkina();
  if (!escopoPdf || !perfilAtivo) return null;

  return (
    <div className="fixed inset-0 bg-[#1C130E]/75 backdrop-blur-xs flex flex-col items-center justify-start p-3 sm:p-6 z-50 overflow-y-auto">
      {/* Barra de Controle Superior */}
      <div className="w-full max-w-3xl bg-[#2C1E18] text-white rounded-2xl p-3.5 mb-3 flex flex-wrap items-center justify-between gap-2 shadow-xl border border-[#4A3228]">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#F5D6B8]" />
          <div>
            <span className="font-serif-display font-bold text-sm block leading-none">
              Gerador Oficial de Documento PDF (Formato A4)
            </span>
            <span className="text-[10.5px] text-[#D9C8BC]">Selecione o escopo abaixo e acione a impressão</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {DOCUMENTOS_PDF.map((op) => (
            <button
              key={op.id}
              type="button"
              onClick={() => abrirPdf(op.id)}
              className={cx(
                'px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors',
                escopoPdf === op.id ? 'bg-[#C86D51] text-white' : 'bg-[#4A3228] text-[#D9C8BC] hover:bg-[#5A3E2E]'
              )}
            >
              {op.curto}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Botao variante="sucesso" tamanho="sm" icone={Printer} onClick={imprimirPdf} className="shadow-xs">
            Imprimir / Salvar PDF A4
          </Botao>
          <Botao variante="claro" tamanho="sm" icone={Download} onClick={baixarPdfComoHtml}>
            Baixar A4
          </Botao>
          <button
            type="button"
            onClick={fecharPdf}
            className="p-1.5 rounded-xl bg-[#4A3228] hover:bg-[#5A3E2E] text-white transition-colors"
            title="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FOLHA A4 TIMBRADA */}
      <div
        id={ID_FOLHA_A4}
        className="w-full max-w-3xl bg-white text-[#1C1917] rounded-xl shadow-2xl border border-[#D6CEC2] p-6 sm:p-10 space-y-6 text-xs"
      >
        {/* Cabeçalho Timbrado */}
        <div className="border-b-2 border-[#2C1E18] pb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2C1E18] text-[#FFFDFB] flex items-center justify-center shrink-0">
              <IconLogoSkina className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-serif-display font-bold text-xl text-[#2C1E18] tracking-tight">
                SKINA DO PÃO — PADARIA & CONFEITARIA ARTESANAL
              </h1>
              <p className="text-[11px] text-[#57534E]">
                CNPJ: 14.892.301/0001-45 · Rio Branco, AC · Sistema ERP de Controle de Vitrine, Forno & Depósito
              </p>
            </div>
          </div>

          <div className="text-right shrink-0 font-mono text-[10.5px]">
            <span className="font-bold text-[#2C1E18] block">DOC: #PDF-{escopoPdf.toUpperCase()}-2026</span>
            <span>
              Data: {new Date().toLocaleDateString('pt-BR')} às {horarioAgora()}
            </span>
            <span className="block text-[#57534E]">Emitido por: {perfilAtivo.nome}</span>
          </div>
        </div>

        {/* Sumário Executivo */}
        <div className="grid grid-cols-4 gap-3 bg-[#FAF6F2] p-3.5 rounded-xl border border-[#E5D8CB]">
          <div>
            <span className="text-[10px] font-bold uppercase text-[#6E5A4F] block">Patrimônio Custo</span>
            <strong className="text-sm text-[#2C1E18]">{formatarMoeda(kpis.patrimonioTotalCusto)}</strong>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-[#6E5A4F] block">Venda Potencial Vitrine</span>
            <strong className="text-sm text-[#2F5938]">{formatarMoeda(kpis.vendaPotencialVitrine)}</strong>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-[#6E5A4F] block">Margem Bruta Média</span>
            <strong className="text-sm text-[#264E63]">{formatarNumero(kpis.margemMediaGlobal)}%</strong>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-[#6E5A4F] block">Quebras / Perdas</span>
            <strong className="text-sm text-[#9E4224]">
              {formatarMoeda(kpis.totalPerdasReais)} ({formatarNumero(kpis.indiceDesperdicioPct)}%)
            </strong>
          </div>
        </div>

        {/* Tabelas de Conteúdo Conforme Escopo */}
        {(escopoPdf === 'executivo' || escopoPdf === 'balanco') && (
          <div className="space-y-3">
            <h2 className="font-serif-display font-bold text-sm text-[#2C1E18] uppercase tracking-wider border-b border-[#E5D8CB] pb-1">
              Balanço Físico-Financeiro Auditado (Vitrine vs. Depósito e Margem)
            </h2>
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#EFE6DD] text-[#2C1E18] border-b border-[#D8C8B8]">
                  <th className="py-2 px-2.5">Produto</th>
                  <th className="py-2 px-2">Setor</th>
                  <th className="py-2 px-2 text-right">Saldo Vitrine</th>
                  <th className="py-2 px-2 text-right">Saldo Depósito</th>
                  <th className="py-2 px-2 text-right">Custo Unit.</th>
                  <th className="py-2 px-2 text-right">Preço Venda</th>
                  <th className="py-2 px-2 text-right">Margem</th>
                  <th className="py-2 px-2.5 text-right">Patrimônio (R$)</th>
                </tr>
              </thead>
              <tbody>
                {kpis.analiseProdutos.map((p, idx) => (
                  <tr key={p.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF6F2]'}>
                    <td className="py-1.5 px-2.5 font-bold">{p.nome}</td>
                    <td className="py-1.5 px-2 text-[#57534E]">{p.setor}</td>
                    <td className="py-1.5 px-2 text-right font-semibold">
                      {formatarNumero(p.saldoVitrine)} {p.unidade}
                    </td>
                    <td className="py-1.5 px-2 text-right">
                      {formatarNumero(p.saldoDeposito)} {p.unidade}
                    </td>
                    <td className="py-1.5 px-2 text-right">{formatarMoeda(p.custoUnitario)}</td>
                    <td className="py-1.5 px-2 text-right">{formatarMoeda(p.precoVenda)}</td>
                    <td className="py-1.5 px-2 text-right font-bold text-[#2F5938]">
                      {formatarNumero(p.margemPct)}%
                    </td>
                    <td className="py-1.5 px-2.5 text-right font-bold">{formatarMoeda(p.valorPatrimonioTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(escopoPdf === 'executivo' || escopoPdf === 'reposicoes') && (
          <div className="space-y-3">
            <h2 className="font-serif-display font-bold text-sm text-[#2C1E18] uppercase tracking-wider border-b border-[#E5D8CB] pb-1">
              Histórico Auditado de Reposições (Cozinha, Frios & Notas Fiscais)
            </h2>
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#EFE6DD] text-[#2C1E18] border-b border-[#D8C8B8]">
                  <th className="py-1.5 px-2">Hora</th>
                  <th className="py-1.5 px-2">Produto</th>
                  <th className="py-1.5 px-2">Fluxo / Origem</th>
                  <th className="py-1.5 px-2 text-right">Vitrine (Antes➔Depois)</th>
                  <th className="py-1.5 px-2 text-right">Depósito (Antes➔Depois)</th>
                  <th className="py-1.5 px-2 text-right">Responsável</th>
                </tr>
              </thead>
              <tbody>
                {historicoReposicoes.map((r, idx) => (
                  <tr key={r.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF6F2]'}>
                    <td className="py-1.5 px-2 font-mono">{r.horario}</td>
                    <td className="py-1.5 px-2 font-bold">{r.produto}</td>
                    <td className="py-1.5 px-2 text-[#57534E]">{r.origemFluxo}</td>
                    <td className="py-1.5 px-2 text-right font-semibold">
                      {formatarNumero(r.antesVitrine)} ➔ {formatarNumero(r.depoisVitrine)} {r.unidade}
                    </td>
                    <td className="py-1.5 px-2 text-right">
                      {formatarNumero(r.antesDeposito)} ➔ {formatarNumero(r.depoisDeposito)}
                    </td>
                    <td className="py-1.5 px-2 text-right">{r.responsavel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {escopoPdf === 'turno' && (
          <div className="space-y-3">
            <h2 className="font-serif-display font-bold text-sm text-[#2C1E18] uppercase tracking-wider border-b border-[#E5D8CB] pb-1">
              Termo Oficial de Passagem de Turno & Checklist Operacional
            </h2>
            {historicoTurnos.map((t) => (
              <div key={t.id} className="p-3 rounded-xl border border-[#D8C8B8] bg-[#FAF6F2] space-y-1">
                <div className="flex justify-between font-bold">
                  <span>
                    {t.turnoEncerrado} ➔ {t.turnoIniciado}
                  </span>
                  <span>{t.horario}</span>
                </div>
                <p>
                  Entregue por: <strong>{t.responsavelEntregou}</strong> · Assumido por:{' '}
                  <strong>{t.responsavelAssumiu}</strong>
                </p>
                <p className="text-[#57534E]">
                  Observação: "{t.observacao}" ({t.pendenciasSnapshot})
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Assinaturas Físicas */}
        <div className="pt-8 border-t border-[#D8C8B8] grid grid-cols-2 gap-8 text-center text-[11px] text-[#57534E]">
          <div className="pt-6 border-t border-[#2C1E18]">
            <strong className="text-[#2C1E18] block">Seu Antônio (Proprietário / Diretoria)</strong>
            <span>Assinatura de Conferência Executiva</span>
          </div>
          <div className="pt-6 border-t border-[#2C1E18]">
            <strong className="text-[#2C1E18] block">
              {perfilAtivo.nome} ({perfilAtivo.cargo})
            </strong>
            <span>Responsável pela Emissão / Turno Atual</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 9.2 MODAL DE CONFIRMAÇÃO DE VARIAÇÃO BRUSCA (> 5x O MÍNIMO)
// ----------------------------------------------------------------------------
function ModalVariacaoBrusca() {
  const { variacaoBrusca, confirmarVariacaoBrusca, cancelarVariacaoBrusca } = useSkina();
  if (!variacaoBrusca) return null;

  return (
    <Modal aberto={true} onFechar={cancelarVariacaoBrusca}>
      <div className="flex items-center gap-2 text-[#B84A27]">
        <AlertTriangle className="w-6 h-6 shrink-0" />
        <h3 className="font-serif-display font-bold text-lg text-[#2C1E18]">Confirmar Variação Atípica?</h3>
      </div>

      <p className="text-xs text-[#6E5A4F] leading-relaxed">
        Você está prestes a alterar o saldo de <strong>{variacaoBrusca.produto.nome}</strong> na vitrine de{' '}
        <strong>{formatarNumero(variacaoBrusca.saldoAnterior)}</strong> para{' '}
        <strong>
          {formatarNumero(variacaoBrusca.novoSaldo)} {variacaoBrusca.produto.unidade}
        </strong>{' '}
        (variação de {variacaoBrusca.delta > 0 ? `+${variacaoBrusca.delta}` : variacaoBrusca.delta}).
      </p>

      <div className="flex gap-2 pt-1">
        <Botao variante="suave" tamanho="md" onClick={cancelarVariacaoBrusca} className="flex-1">
          Cancelar
        </Botao>
        <Botao variante="perigo" tamanho="md" onClick={confirmarVariacaoBrusca} className="flex-1">
          Sim, Confirmar Saldo
        </Botao>
      </div>
    </Modal>
  );
}

// ----------------------------------------------------------------------------
// 9.3 MODAL DE REGISTRO DE PERDA / QUEBRA (Valida Perda <= Saldo Vitrine)
// ----------------------------------------------------------------------------
function ModalPerdaProduto({
  produto,
  onFechar,
}: {
  produto: Produto | null;
  onFechar: () => void;
}) {
  const { registrarPerda } = useSkina();

  const [qtd, setQtd] = useState('1');
  const [motivo, setMotivo] = useState(MOTIVOS_PERDA[0]);
  const [erro, setErro] = useState('');

  // Ao abrir para um produto, reseta o valor para 1 passo
  useEffect(() => {
    if (produto) {
      setQtd(String(Math.min(produto.passo, produto.saldoVitrine)));
      setMotivo(MOTIVOS_PERDA[0]);
      setErro('');
    }
  }, [produto]);

  if (!produto) return null;

  function confirmar() {
    if (!produto) return;
    const err = registrarPerda(produto.id, qtd, motivo);
    if (err) {
      setErro(err);
    } else {
      onFechar();
    }
  }

  return (
    <Modal aberto={true} onFechar={onFechar}>
      <div className="flex items-center justify-between">
        <h3 className="font-serif-display font-bold text-lg text-[#2C1E18]">Registrar Perda / Quebra</h3>
        <button type="button" onClick={onFechar} className="p-1 text-[#7A685F] hover:text-[#2C1E18]">
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className="text-xs text-[#6E5A4F]">
        Produto: <strong>{produto.nome}</strong> · Saldo disponível na vitrine:{' '}
        <strong className="text-[#2F5938]">
          {formatarNumero(produto.saldoVitrine)} {produto.unidade}
        </strong>
      </p>

      {erro && <div className="bg-[#F5E1DA] text-[#8C2D19] p-2.5 rounded-xl text-xs font-bold">{erro}</div>}

      <Campo
        rotulo={`Quantidade perdida (${produto.unidade} · máx ${formatarNumero(produto.saldoVitrine)})`}
      >
        <input
          type="number"
          step={produto.passo}
          max={produto.saldoVitrine}
          min="0"
          value={qtd}
          onChange={(e) => {
            setErro('');
            setQtd(e.target.value);
          }}
          className={ui.input}
        />
      </Campo>

      <Campo rotulo="Motivo da baixa:">
        <div className="grid grid-cols-2 gap-1.5">
          {MOTIVOS_PERDA.map((mot) => {
            const ativo = motivo === mot;
            return (
              <button
                key={mot}
                type="button"
                onClick={() => setMotivo(mot)}
                className={cx(
                  'py-2 px-2.5 rounded-xl text-xs font-bold border transition-colors',
                  ativo ? 'bg-[#9E4224] text-white border-[#9E4224]' : 'bg-[#FAF6F2] text-[#5A4940] border-[#E2D5C8]'
                )}
              >
                {mot}
              </button>
            );
          })}
        </div>
      </Campo>

      <Botao variante="primario" tamanho="lg" onClick={confirmar}>
        Confirmar Baixa Auditada
      </Botao>
    </Modal>
  );
}

// ============================================================================
// 10. APP PRINCIPAL
// ============================================================================

/** Router interno: mapeia o id da tela para o seu respectivo componente com RBAC estrito. */
function ConteudoTela() {
  const { telaAtual, ehProprietario, perfilAtivo } = useSkina();

  switch (telaAtual) {
    case 'painel-dono':
      return ehProprietario ? <TelaPainelDono /> : <TelaConferencia />;
    case 'conferencia':
      return <TelaConferencia />;
    case 'cozinha':
      return <TelaCozinha />;
    case 'abastecimento-insumos':
      return <TelaAbastecimentoInsumos />;
    case 'nota-fiscal':
      return perfilAtivo?.permissoes.lancarNotaFiscal ? <TelaNotaFiscal /> : <TelaConferencia />;
    case 'relatorios':
      return ehProprietario ? <TelaRelatorios /> : <TelaConferencia />;
    case 'passagem-turno':
      return <TelaPassagemTurno />;
    case 'catalogo':
      return <TelaCatalogo />;
    default:
      return <TelaConferencia />;
  }
}

/** Layout exibido apenas quando há um usuário logado. */
function LayoutLogado() {
  const { perfilAtivo } = useSkina();
  if (!perfilAtivo) return <TelaLogin />;

  return (
    <div className="min-h-screen bg-[#F5EFEA] text-[#2C1E18] font-sans antialiased pb-28">
      {/* Estilos globais e regras de impressão para A4 e Térmica 80mm */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-display { font-family: 'Fraunces', Georgia, serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media print {
          body * { visibility: hidden; }
          #${ID_FOLHA_A4}, #${ID_FOLHA_A4} * { visibility: visible; }
          #${ID_FOLHA_A4} {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            border: none !important;
          }
          #${ID_AREA_80MM}, #${ID_AREA_80MM} * { visibility: visible; }
          #${ID_AREA_80MM} { position: absolute; left: 0; top: 0; width: 76mm; }
        }
      `}</style>

      {/* Notificação Flutuante Global */}
      <ToastGlobal />

      {/* Alerta de Comanda Urgente Pulsando */}
      <AlertaComandaUrgenteFlutuante />

      {/* Barra Superior */}
      <BarraSuperior />

      {/* Conteúdo da Tela */}
      <main className="max-w-md mx-auto px-4 pt-4">
        <ConteudoTela />
      </main>

      {/* Barra de Navegação Inferior com RBAC Estrito */}
      <BarraNavegacao />

      {/* Modais Globais do Sistema */}
      <ModalPdfOficial />
      <ModalVariacaoBrusca />
      <ModalImpressaoTermica />
    </div>
  );
}

/** Ponto de entrada do sistema: conecta a Store através do Provider e renderiza o app. */
export default function App() {
  const store = useSkinaStore();

  return (
    <SkinaContext.Provider value={store}>
      <LayoutLogado />
    </SkinaContext.Provider>
  );
}
