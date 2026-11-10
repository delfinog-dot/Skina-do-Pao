import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Minus,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Check,
  X,
  ClipboardCheck,
  Camera,
  Search,
  Receipt,
  PieChart,
  Store,
  LogOut,
  Printer,
  Share2,
  TrendingUp,
  TrendingDown,
  Flame,
  Snowflake,
  Sun,
  Sunset,
  ArrowRightLeft,
  Zap,
  ShieldAlert,
  Lock,
  Database,
  Warehouse,
  History,
  KeyRound,
  Info,
  Download,
  FileText,
  Crown,
  DollarSign,
  Percent,
  Award,
  Sliders,
  Wallet
} from 'lucide-react';

// ============================================================================
// 1. BIBLIOTECA DE ÍCONES EM VETOR PURO (SVG Monoline - strokeWidth="1.8")
// ============================================================================

const IconPaoDeForma = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 10.5C3.8 9.5 3.5 7.5 4.5 6C5.5 4.5 7.5 4 9.5 4H14.5C16.5 4 18.5 4.5 19.5 6C20.5 7.5 20.2 9.5 19 10.5V18C19 19.1 18.1 20 17 20H7C5.9 20 5 19.1 5 18V10.5Z" />
    <path d="M8.5 10.5C8 9.8 8 8.6 8.8 7.8C9.4 7.2 10.5 7 12 7" opacity="0.65" />
    <circle cx="14.5" cy="14.5" r="0.6" fill="currentColor" />
    <circle cx="10" cy="15.5" r="0.6" fill="currentColor" />
  </svg>
);

const IconPaoHamburguer = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12C4 7.5 7.5 4.5 12 4.5C16.5 4.5 20 7.5 20 12H4Z" />
    <path d="M3 14.5H21" />
    <path d="M4.5 14.5L5.2 17.5C5.5 18.7 6.5 19.5 7.8 19.5H16.2C17.5 19.5 18.5 18.7 18.8 17.5L19.5 14.5" />
    <path d="M9.5 8.5L10.2 9" strokeWidth="2" />
    <path d="M14 8L14.7 8.5" strokeWidth="2" />
    <path d="M12 6.8H12.1" strokeWidth="2.2" />
  </svg>
);

const IconBiscoitinho = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3C13.8 3 15.2 3.8 16.5 4.5C17.8 5.2 19.5 6.2 20.2 7.8C20.9 9.4 20.5 11.2 20.8 12.8C21.1 14.4 20.2 16.5 19 17.8C17.8 19.1 16.2 20.2 14.5 20.6C12.8 21 11.2 21 9.5 20.5C7.8 20 6 19.2 4.8 17.8C3.6 16.4 3.2 14.5 3.2 12.5C3.2 10.5 3.8 8.5 5 7C6.2 5.5 7.8 4.2 9.5 3.5C10.3 3.2 11.1 3 12 3Z" />
    <circle cx="9.5" cy="9.5" r="1.1" fill="currentColor" />
    <circle cx="14.5" cy="9" r="0.9" fill="currentColor" />
    <circle cx="15" cy="14" r="1.2" fill="currentColor" />
    <circle cx="9" cy="14.8" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="0.7" fill="currentColor" />
  </svg>
);

const IconChurro = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 12C12 10.6 13.1 9.5 14.5 9.5C16.2 9.5 17.5 10.8 17.5 12.5C17.5 15 15.5 17 13 17C9.7 17 7 14.3 7 11C7 6.9 10.4 3.5 14.5 3.5C17.8 3.5 20.5 6.2 20.5 9.5" />
    <path d="M14.5 6.5C11.8 6.5 9.8 8.6 9.8 11.2C9.8 13.2 11.4 14.5 13.2 14.5" opacity="0.65" />
    <path d="M7.5 14.5L11.5 20.2C12 20.8 12.9 20.9 13.5 20.4L15.2 19" />
  </svg>
);

const IconPaoFrances = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6.2 17.8C3.5 15.1 4.2 10.1 7.8 6.5C11.4 2.9 16.4 2.2 19.1 4.9C21.8 7.6 21.1 12.6 17.5 16.2C13.9 19.8 8.9 20.5 6.2 17.8Z" />
    <path d="M8.5 13.8C10 10.8 12.2 8.6 15.2 7.1" />
    <path d="M10.2 15.2C12.2 13.5 14.2 11.5 15.8 9.2" opacity="0.7" />
  </svg>
);

const IconTorrada = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5.5 10C4.2 9 4 7 5 5.5C6 4.2 7.8 4 9.5 4H14.5C16.2 4 18 4.2 19 5.5C20 7 19.8 9 18.5 10V18C18.5 19.1 17.6 20 16.5 20H7.5C6.4 20 5.5 19.1 5.5 18V10Z" />
    <path d="M8 10.5C7.3 9.8 7.3 8.5 8 7.6C8.5 7 9.5 6.8 10.5 6.8H13.5C14.5 6.8 15.5 7 16 7.6C16.7 8.5 16.7 9.8 16 10.5V16.8H8V10.5Z" opacity="0.6" />
    <path d="M10.5 11.5L11.5 10.5" />
    <path d="M12.5 14.5L13.5 13.5" />
  </svg>
);

const IconRefrigerante = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="7" y="5" width="10" height="15" rx="2.5" />
    <path d="M8.5 5L9.5 3H14.5L15.5 5" />
    <path d="M7 10.5H17" opacity="0.65" />
    <path d="M7 14.5H17" opacity="0.65" />
    <path d="M11 3V2" />
  </svg>
);

const IconPresunto = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 13.5C4 9.5 7.5 6.5 12.5 6.5C17 6.5 20 9 20 12.5C20 16 16.5 18.5 11.5 18.5C6.5 18.5 4 16.5 4 13.5Z" />
    <path d="M7.5 11.5C9 10 12.5 9.5 15 11" opacity="0.65" />
    <circle cx="15.5" cy="13.5" r="0.9" fill="currentColor" />
    <circle cx="9.5" cy="14.5" r="0.8" fill="currentColor" />
  </svg>
);

const IconQueijo = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3.5 15.5L13.5 5.5C16.8 6.8 19.5 9.5 20.5 13L3.5 15.5Z" />
    <path d="M3.5 15.5V18.5C3.5 19.1 4 19.5 4.6 19.5H19.4C20 19.5 20.5 19 20.5 18.4V13" />
    <circle cx="12.5" cy="11.5" r="1.2" />
    <circle cx="9" cy="17.2" r="0.9" fill="currentColor" />
    <circle cx="15.5" cy="16.8" r="1.1" />
  </svg>
);

const IconIogurte = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 8.5H18L16.6 19C16.5 19.8 15.8 20.5 15 20.5H9C8.2 20.5 7.5 19.8 7.4 19L6 8.5Z" />
    <path d="M4.5 8.5H19.5" strokeWidth="2" />
    <path d="M8.5 8.5C8.5 6 10 4.5 12 4.5C14 4.5 15.5 6 15.5 8.5" />
    <path d="M14.5 4L16.5 2.5" />
    <path d="M9 13.5C10.5 14.5 13.5 14.5 15 13.5" opacity="0.65" />
  </svg>
);

const IconLogoSkina = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 22C3.5 18.5 4.5 12 9 7.5C13.5 3 20 2.5 23.5 6C27 9.5 26 16 21.5 20.5C17 25 10.5 25.5 6 22Z" />
    <path d="M10.5 17C12.5 13.2 15.2 10.5 19 8.5" />
    <path d="M13 19C15.5 16.8 18 14.2 20 11.5" opacity="0.7" />
    <path d="M6 27H26" strokeWidth="1.8" opacity="0.5" />
  </svg>
);

const MAPA_ICONES = {
  'pao-forma': { label: 'Pão de Forma', Componente: IconPaoDeForma },
  'pao-hamburguer': { label: 'Pão de Hambúrguer', Componente: IconPaoHamburguer },
  'biscoitinho': { label: 'Biscoitinho', Componente: IconBiscoitinho },
  'churro': { label: 'Churro', Componente: IconChurro },
  'pao-frances': { label: 'Pão Francês', Componente: IconPaoFrances },
  'torrada': { label: 'Torrada', Componente: IconTorrada },
  'refrigerante': { label: 'Refrigerante', Componente: IconRefrigerante },
  'presunto': { label: 'Presunto Fatiado', Componente: IconPresunto },
  'queijo': { label: 'Queijo Mussarela', Componente: IconQueijo },
  'iogurte': { label: 'Iogurte Natural', Componente: IconIogurte },
};

const STORAGE_KEY = 'skina_do_pao_erp_v4_executivo_pdf';

// ============================================================================
// 2. DADOS INICIAIS AUDITADOS (Com saldoVitrine, saldoDeposito e precoVenda)
// ============================================================================

const PRODUTOS_INICIAIS = [
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

  // INSUMOS DE VITRINE / GELADEIRA / FRIOS (Dependem de saldoDeposito para transferir à Vitrine)
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

// Perfis com RBAC (Role-Based Access Control) explícito
const PERFIS_RBAC = [
  {
    id: 'vitrine',
    papel: 'vitrine',
    nome: 'Clara Mendes',
    cargo: 'Balcão & Vitrine',
    pinPadrao: '1111',
    foco: 'Visão operacional limpa (4 abas): Conferência da vitrine, Comandas 80mm, Depósito➔Vitrine e Passagem de Turno. Sem acesso a Relatórios, PDF ou Custos.',
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
    cargo: 'Compras & Estoque (Depósito)',
    pinPadrao: '2222',
    foco: 'Visão operacional limpa (4 abas): Lança Notas Fiscais no Depósito, transfere frios/bebidas Depósito➔Vitrine e gere quantidades do catálogo. Sem Relatórios ou Dono/PDF.',
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
    nome: 'Seu Antônio',
    cargo: 'Proprietário · Acesso Total (Admin)',
    pinPadrao: '1234',
    foco: 'Visão completa (6 abas): Acesso exclusivo às abas Relatórios e Dono/PDF, Simulador de Margem, Custos e Emissão de PDF Oficial A4.',
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

const COMANDAS_COZINHA_INICIAIS = [
  {
    id: 'COZ-101',
    idempotencyKey: 'idem-coz-101',
    criadoEmISO: '2026-11-03T07:40:00.000Z',
    horario: '07:40',
    solicitante: 'Clara Mendes',
    prioridade: 'urgente',
    status: 'produzindo', // 'fila' | 'produzindo'
    observacao: 'Vitrine zerou pacote de hambúrguer e falta pão de forma!',
    itens: [
      { produtoId: 'pao-hamburguer', nome: 'Pão de hambúrguer', qtdSolicitada: 6, unidade: 'pacotes', setor: 'Forno Principal', iconeKey: 'pao-hamburguer' },
      { produtoId: 'pao-forma', nome: 'Pão de forma', qtdSolicitada: 4, unidade: 'unidades', setor: 'Forno Principal', iconeKey: 'pao-forma' },
    ],
  },
];

const TAREFAS_INSUMOS_INICIAIS = [
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

const HISTORICO_REPOSICOES_INICIAL = [
  {
    id: 'rep-101',
    idempotencyKey: 'ledger-rep-101',
    criadoEmISO: '2026-11-03T07:15:00.000Z',
    horario: '07:15',
    produtoId: 'refrigerante',
    produto: 'Refrigerante Lata/600ml',
    iconeKey: 'refrigerante',
    categoriaRelatorio: 'Insumo / Transferência Depósito ➔ Vitrine',
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
    categoriaRelatorio: 'Insumo / Transferência Depósito ➔ Vitrine',
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
    categoriaRelatorio: 'Produção / Cozinha ➔ Vitrine',
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

const HISTORICO_PERDAS_INICIAL = [
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

const HISTORICO_TURNOS_INICIAL = [
  {
    id: 'turno-01',
    idempotencyKey: 'ledger-shift-01',
    criadoEmISO: '2026-11-02T14:00:00.000Z',
    horario: 'Ontem · 14:00',
    turnoEncerrado: 'Manhã (06h às 14h)',
    turnoIniciado: 'Tarde (14h às 22h)',
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

// Presets de Notas Fiscais para demonstrar a trava de Idempotência (Chave Única)
const LOTES_NOTAS_EXEMPLO = {
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

// ============================================================================
// 3. UTILITÁRIOS PUROS (Sem Efeitos Colaterais em setState)
// ============================================================================

const gerarIdUnico = (prefixo = 'id') =>
  `${prefixo}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

const formatarNumero = (num) => Number(num || 0).toString().replace('.', ',');

const formatarMoeda = (val) =>
  Number(val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const horarioAgora = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

// Banner reutilizável indicando Modo Demonstração para hardware simulado
function BannerModoDemo({ titulo, descricao }) {
  return (
    <div className="bg-[#FDF6EC] border border-[#EED0AE] rounded-2xl px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-[#6E4726]">
      <Info className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
      <div>
        <span className="font-bold uppercase tracking-wider text-[10px] bg-[#F8E2C8] text-[#873E1B] px-2 py-0.5 rounded-md mr-1.5">
          Modo Demonstração (Simulação Local)
        </span>
        <strong className="text-[#3B2316]">{titulo}:</strong> {descricao}
      </div>
    </div>
  );
}

// ============================================================================
// 4. COMPONENTE PRINCIPAL (Integrando Persistência, RBAC e Submódulos)
// ============================================================================

export default function App() {
  // Carregamento inicial seguro a partir do localStorage
  const carregarEstadoSalvo = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const estadoInicial = useMemo(() => carregarEstadoSalvo(), []);

  // Autenticação e RBAC
  const [perfilAtivo, setPerfilAtivo] = useState(null);
  const [pinOpcionalInput, setPinOpcionalInput] = useState('');
  const [exigirPinNoLogin, setExigirPinNoLogin] = useState(false);
  const [telaAtual, setTelaAtual] = useState('conferencia');

  // Estados Persistidos no LocalStorage
  const [produtos, setProdutos] = useState(() => estadoInicial?.produtos || PRODUTOS_INICIAIS);
  const [comandasCozinha, setComandasCozinha] = useState(
    () => estadoInicial?.comandasCozinha || COMANDAS_COZINHA_INICIAIS
  );
  const [tarefasInsumos, setTarefasInsumos] = useState(
    () => estadoInicial?.tarefasInsumos || TAREFAS_INSUMOS_INICIAIS
  );
  const [historicoReposicoes, setHistoricoReposicoes] = useState(
    () => estadoInicial?.historicoReposicoes || HISTORICO_REPOSICOES_INICIAL
  );
  const [historicoPerdas, setHistoricoPerdas] = useState(
    () => estadoInicial?.historicoPerdas || HISTORICO_PERDAS_INICIAL
  );
  const [historicoTurnos, setHistoricoTurnos] = useState(
    () => estadoInicial?.historicoTurnos || HISTORICO_TURNOS_INICIAL
  );
  const [notasProcessadasIds, setNotasProcessadasIds] = useState(
    () => estadoInicial?.notasProcessadasIds || []
  );
  const [turnoAtual, setTurnoAtual] = useState(
    () => estadoInicial?.turnoAtual || 'Manhã (06h às 14h)'
  );
  const [caixaDia, setCaixaDia] = useState(
    () =>
      estadoInicial?.caixaDia || {
        pix: 1680.5,
        cartao: 2140.0,
        dinheiro: 720.0,
        sangriasDespesas: 185.0,
        totalNotasEntrada: 696.0,
      }
  );

  // Estados exclusivos do Painel do Dono e Gerador de PDF A4
  const [novaSangriaValor, setNovaSangriaValor] = useState('');
  const [novaSangriaDesc, setNovaSangriaDesc] = useState('');
  const [modalPdfAberto, setModalPdfAberto] = useState(false);
  const [escopoPdf, setEscopoPdf] = useState('executivo'); // 'executivo' | 'balanco' | 'reposicoes' | 'turno'

  // Regra Crítica de Visibilidade Exclusiva do Proprietário (Strict RBAC)
  const ehProprietario = useMemo(
    () => perfilAtivo?.papel === 'proprietario' || perfilAtivo?.id === 'proprietario',
    [perfilAtivo]
  );

  // Redirecionamento imediato e fecho do modal PDF se mudar de Dono para Funcionário
  useEffect(() => {
    if (perfilAtivo && !ehProprietario) {
      if (telaAtual === 'relatorios' || telaAtual === 'painel-dono') {
        setTelaAtual('conferencia');
      }
      if (modalPdfAberto) {
        setModalPdfAberto(false);
      }
    }
  }, [perfilAtivo, ehProprietario, telaAtual, modalPdfAberto]);

  // Sincronização automática com localStorage
  useEffect(() => {
    try {
      const payload = {
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignora erro de quota se o browser restringir storage
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

  // Estados de UI da Conferência
  const [filtroGiro, setFiltroGiro] = useState('todos');
  const [editandoId, setEditandoId] = useState(null);
  const [valorDigitado, setValorDigitado] = useState('');
  const [toast, setToast] = useState(null);

  // Modal de Confirmação de Variação Brusca (> 5x o mínimo)
  const [modalVariacaoBrusca, setModalVariacaoBrusca] = useState(null);

  // Modal de Perda / Quebra com validação de saldoVitrine
  const [modalPerdaProduto, setModalPerdaProduto] = useState(null);
  const [qtdPerdaInput, setQtdPerdaInput] = useState('1');
  const [motivoPerdaInput, setMotivoPerdaInput] = useState('Vencido');
  const [erroPerda, setErroPerda] = useState('');

  // Estados da Nota Fiscal (Exclusivo para entrada no saldoDeposito + Idempotência)
  const [chaveNotaSelecionada, setChaveNotaSelecionada] = useState('NF-000482');
  const [fornecedorNotaOCR, setFornecedorNotaOCR] = useState(
    LOTES_NOTAS_EXEMPLO['NF-000482'].fornecedor
  );
  const [itensNotaOCR, setItensNotaOCR] = useState(LOTES_NOTAS_EXEMPLO['NF-000482'].itens);
  const [scanningNota, setScanningNota] = useState(false);

  // Estados de Passagem de Turno Formalizada
  const [responsavelEntregando, setResponsavelEntregando] = useState('Clara Mendes');
  const [responsavelAssumindo, setResponsavelAssumindo] = useState('Mateus Rocha');
  const [checklistPassagem, setChecklistPassagem] = useState({
    vitrineConferida: true,
    friosAbastecidos: true,
    fornoLimpo: true,
    caixaParcialConferido: true,
  });
  const [obsPassagemTurno, setObsPassagemTurno] = useState(
    'Turma da tarde: atenção ao Pão de Hambúrguer. Frios conferidos na câmara.'
  );

  // Estados de Relatórios
  const [abaRelatorio, setAbaRelatorio] = useState('repostos');
  const [filtroRelatorioRepostos, setFiltroRelatorioRepostos] = useState('todos');

  // Estados do Catálogo com Busca Real e Validação Completa
  const [buscaCatalogo, setBuscaCatalogo] = useState('');
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [erroCatalogo, setErroCatalogo] = useState('');
  const [formProduto, setFormProduto] = useState({
    nome: '',
    tipoFluxo: 'cozinha',
    setor: 'Forno Principal',
    giroHorario: 'manha',
    minimum: 10,
    saldoVitrine: 10,
    saldoDeposito: 0,
    passo: 1,
    iconeKey: 'pao-frances',
    custoUnitario: 5.0,
    precoVenda: 11.0,
  });

  // Clique Triplo Rápido (+10)
  const trackerCliquesRef = useRef({});
  const [badgeMaisDezId, setBadgeMaisDezId] = useState(null);

  const dispararToast = (texto, tipo = 'sucesso') => {
    setToast({ texto, tipo });
    setTimeout(() => {
      setToast((atual) => (atual?.texto === texto ? null : atual));
    }, 3600);
  };

  // Restaurar dados de fábrica limpando o localStorage
  const restaurarDadosDeFabrica = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProdutos(PRODUTOS_INICIAIS);
    setComandasCozinha(COMANDAS_COZINHA_INICIAIS);
    setTarefasInsumos(TAREFAS_INSUMOS_INICIAIS);
    setHistoricoReposicoes(HISTORICO_REPOSICOES_INICIAL);
    setHistoricoPerdas(HISTORICO_PERDAS_INICIAL);
    setHistoricoTurnos(HISTORICO_TURNOS_INICIAL);
    setNotasProcessadasIds([]);
    setTurnoAtual('Manhã (06h às 14h)');
    dispararToast('🔄 Dados de fábrica restaurados no armazenamento local!');
  };

  // ============================================================================
  // CÁLCULOS DERIVADOS E MAPAS DE IDEMPOTÊNCIA
  // ============================================================================

  const todosAbaixoMinimo = useMemo(
    () => produtos.filter((p) => p.saldoVitrine < p.minimo),
    [produtos]
  );

  const faltantesCozinha = useMemo(
    () => produtos.filter((p) => p.tipoFluxo === 'cozinha' && p.saldoVitrine < p.minimo),
    [produtos]
  );

  const faltantesInsumos = useMemo(
    () => produtos.filter((p) => p.tipoFluxo === 'insumo' && p.saldoVitrine < p.minimo),
    [produtos]
  );

  // Mapa rápido para saber se um produto já está numa comanda ativa da cozinha (evita duplicatas)
  const mapaComandaAtivaPorProduto = useMemo(() => {
    const mapa = {};
    for (const cmd of comandasCozinha) {
      for (const it of cmd.itens) {
        mapa[it.produtoId] = cmd.id;
      }
    }
    return mapa;
  }, [comandasCozinha]);

  // Mapa rápido para saber se um insumo já possui tarefa de abastecimento aberta
  const mapaTarefaInsumoPorProduto = useMemo(() => {
    const mapa = {};
    for (const tar of tarefasInsumos) {
      mapa[tar.produtoId] = tar.id;
    }
    return mapa;
  }, [tarefasInsumos]);

  const produtosFiltradosConferencia = useMemo(() => {
    return produtos.filter((p) => {
      if (filtroGiro === 'manha') return p.giroHorario === 'manha';
      if (filtroGiro === 'tarde') return p.giroHorario === 'tarde';
      if (filtroGiro === 'faltantes') return p.saldoVitrine < p.minimo;
      if (filtroGiro === 'cozinha') return p.tipoFluxo === 'cozinha';
      if (filtroGiro === 'insumos') return p.tipoFluxo === 'insumo';
      return true;
    });
  }, [produtos, filtroGiro]);

  const notaAtualJaProcessada = notasProcessadasIds.includes(chaveNotaSelecionada);

  // ============================================================================
  // KPIs EXECUTIVOS EM TEMPO REAL (PAINEL DO DONO & RELATÓRIO PDF A4)
  // ============================================================================

  const kpisExecutivos = useMemo(() => {
    let custoTotalVitrine = 0;
    let custoTotalDeposito = 0;
    let vendaPotencialVitrine = 0;
    let somaMargens = 0;

    const analiseProdutos = produtos.map((p) => {
      const custo = Number(p.custoUnitario || 0);
      const preco = Number(p.precoVenda || custo * 2.1);
      const lucroUnitario = Number((preco - custo).toFixed(2));
      const margemPct = preco > 0 ? Number((((preco - custo) / preco) * 100).toFixed(1)) : 0;

      const valorCustoVitrine = Number((p.saldoVitrine * custo).toFixed(2));
      const valorCustoDeposito = Number((p.saldoDeposito * custo).toFixed(2));
      const valorVendaVitrine = Number((p.saldoVitrine * preco).toFixed(2));

      custoTotalVitrine += valorCustoVitrine;
      custoTotalDeposito += valorCustoDeposito;
      vendaPotencialVitrine += valorVendaVitrine;
      somaMargens += margemPct;

      return {
        ...p,
        precoVenda: preco,
        lucroUnitario,
        margemPct,
        valorCustoVitrine,
        valorCustoDeposito,
        valorVendaVitrine,
        valorPatrimonioTotal: Number((valorCustoVitrine + valorCustoDeposito).toFixed(2)),
      };
    });

    const patrimonioTotalCusto = Number((custoTotalVitrine + custoTotalDeposito).toFixed(2));
    const margemMediaGlobal =
      produtos.length > 0 ? Number((somaMargens / produtos.length).toFixed(1)) : 0;
    const lucroPotencialVitrine = Number((vendaPotencialVitrine - custoTotalVitrine).toFixed(2));

    const totalPerdasReais = Number(
      historicoPerdas.reduce((acc, item) => acc + Number(item.custoEstimado || 0), 0).toFixed(2)
    );
    const indiceDesperdicioPct =
      patrimonioTotalCusto > 0
        ? Number(((totalPerdasReais / (patrimonioTotalCusto + totalPerdasReais)) * 100).toFixed(2))
        : 0;

    // Curva ABC e Destaques Estratégicos
    const campeoesMargem = [...analiseProdutos]
      .sort((a, b) => b.margemPct - a.margemPct)
      .slice(0, 3);

    const riscoRuptura = analiseProdutos.filter((p) => p.saldoVitrine < p.minimo);

    const receitaBrutaCaixa = Number(
      (caixaDia.pix + caixaDia.cartao + caixaDia.dinheiro).toFixed(2)
    );
    const saldoLiquidoCaixa = Number(
      (receitaBrutaCaixa - (caixaDia.sangriasDespesas || 0) - caixaDia.totalNotasEntrada).toFixed(2)
    );

    return {
      custoTotalVitrine: Number(custoTotalVitrine.toFixed(2)),
      custoTotalDeposito: Number(custoTotalDeposito.toFixed(2)),
      patrimonioTotalCusto,
      vendaPotencialVitrine: Number(vendaPotencialVitrine.toFixed(2)),
      lucroPotencialVitrine,
      margemMediaGlobal,
      totalPerdasReais,
      indiceDesperdicioPct,
      dentroDaMetaDesperdicio: indiceDesperdicioPct <= 3.0,
      campeoesMargem,
      riscoRuptura,
      analiseProdutos,
      receitaBrutaCaixa,
      saldoLiquidoCaixa,
    };
  }, [produtos, historicoPerdas, caixaDia]);

  // Atualizar preço de venda ou custo unitário direto no Simulador Executivo do Dono
  const atualizarPrecoOuCustoExecutivo = (produtoId, campo, novoValor) => {
    const val = Math.max(0, Number(parseFloat(String(novoValor).replace(',', '.')) || 0));
    setProdutos((prev) =>
      prev.map((p) => (p.id === produtoId ? { ...p, [campo]: val } : p))
    );
  };

  // ============================================================================
  // MECÂNICA DE CLIQUE TRIPLO (+10) E VALIDAÇÃO DE VARIAÇÃO BRUSCA (> 5x MÍNIMO)
  // ============================================================================

  const incrementarComCliqueTriplo = (id, passoPadrao, callbackAlteracao) => {
    const agora = Date.now();
    const reg = trackerCliquesRef.current[id] || { cont: 0, ultimoTime: 0 };

    if (agora - reg.ultimoTime <= 600) {
      const novaContagem = reg.cont + 1;
      if (novaContagem >= 3) {
        const deltaCompensado = 10 - passoPadrao * 2;
        callbackAlteracao(deltaCompensado);
        trackerCliquesRef.current[id] = { cont: 0, ultimoTime: 0 };
        setBadgeMaisDezId(id);
        dispararToast('⚡ Clique triplo detetado: +10 unidades adicionadas!');
        setTimeout(() => {
          setBadgeMaisDezId((atual) => (atual === id ? null : atual));
        }, 1300);
        return;
      } else {
        trackerCliquesRef.current[id] = { cont: novaContagem, ultimoTime: agora };
      }
    } else {
      trackerCliquesRef.current[id] = { cont: 1, ultimoTime: agora };
    }

    callbackAlteracao(passoPadrao);
  };

  // Atualização pura de saldoVitrine com verificação de variação atípica (> 5x mínimo)
  const aplicarNovoSaldoVitrinePuro = (produtoId, novoValorBruto, ignorarAlertaBrusco = false) => {
    const num = Number(parseFloat(String(novoValorBruto).replace(',', '.')).toFixed(2));
    if (Number.isNaN(num) || num < 0) {
      dispararToast('Valor inválido. Digite um número maior ou igual a zero.', 'erro');
      return;
    }

    const prodAlvo = produtos.find((p) => p.id === produtoId);
    if (!prodAlvo) return;

    const delta = Number((num - prodAlvo.saldoVitrine).toFixed(2));
    if (delta === 0) return;

    const limiteVariacaoBrusca = Math.max(25, prodAlvo.minimo * 5);
    if (!ignorarAlertaBrusco && Math.abs(delta) >= limiteVariacaoBrusca) {
      setModalVariacaoBrusca({
        produto: prodAlvo,
        saldoAnterior: prodAlvo.saldoVitrine,
        novoSaldo: num,
        delta,
      });
      return;
    }

    // Cálculo 100% puro ANTES de chamar setState
    const horario = horarioAgora();
    const iso = new Date().toISOString();
    const novoProdutos = produtos.map((p) =>
      p.id === produtoId ? { ...p, saldoVitrine: num } : p
    );

    const registoLedger = {
      id: gerarIdUnico('rep-manual'),
      idempotencyKey: gerarIdUnico('idem-man'),
      criadoEmISO: iso,
      horario,
      produtoId: prodAlvo.id,
      produto: prodAlvo.nome,
      iconeKey: prodAlvo.iconeKey,
      categoriaRelatorio: 'Ajuste Manual de Conferência (Vitrine)',
      origemFluxo: 'Conferência Manual no Balcão',
      antesVitrine: prodAlvo.saldoVitrine,
      qtdReposta: delta,
      depoisVitrine: num,
      antesDeposito: prodAlvo.saldoDeposito,
      depoisDeposito: prodAlvo.saldoDeposito,
      unidade: prodAlvo.unidade,
      responsavel: perfilAtivo?.nome || 'Operador',
    };

    setProdutos(novoProdutos);
    setHistoricoReposicoes((prev) => [registoLedger, ...prev]);
  };

  const alterarQtdVitrine = (id, delta) => {
    const prod = produtos.find((p) => p.id === id);
    if (!prod) return;
    const novo = Math.max(0, Number((prod.saldoVitrine + delta).toFixed(2)));
    aplicarNovoSaldoVitrinePuro(id, novo, false);
  };

  // ============================================================================
  // AÇÕES COM IDEMPOTÊNCIA E FUNÇÕES PURAS (Cozinha, Insumos, Notas e Perdas)
  // ============================================================================

  // 1. Pedir item individual à Cozinha ou à Guia de Insumos (Sem duplicar se já existir!)
  const solicitarOuReforcarItem = (item) => {
    const falta = Math.max(item.passo * 2, Number((item.minimo - item.saldoVitrine).toFixed(2)));

    if (item.tipoFluxo === 'cozinha') {
      const comandaExistenteId = mapaComandaAtivaPorProduto[item.id];
      if (comandaExistenteId) {
        // Reforça a comanda existente de forma pura em vez de duplicar
        const novasComandas = comandasCozinha.map((cmd) => {
          if (cmd.id !== comandaExistenteId) return cmd;
          return {
            ...cmd,
            prioridade: 'urgente',
            itens: cmd.itens.map((it) =>
              it.produtoId === item.id
                ? { ...it, qtdSolicitada: Number((it.qtdSolicitada + item.passo * 2).toFixed(2)) }
                : it
            ),
          };
        });
        setComandasCozinha(novasComandas);
        dispararToast(
          `🔁 Pedido reforçado (+${item.passo * 2} ${item.unidade}) na comanda ativa #${comandaExistenteId}!`
        );
        return;
      }

      const novaComanda = {
        id: `COZ-${Math.floor(105 + Math.random() * 890)}`,
        idempotencyKey: gerarIdUnico('idem-coz'),
        criadoEmISO: new Date().toISOString(),
        horario: horarioAgora(),
        solicitante: perfilAtivo?.nome || 'Balcão',
        prioridade: 'urgente',
        status: 'fila',
        observacao: `🔥 FORNADA CRÍTICA: ${item.nome} solicitado pelo balcão.`,
        itens: [
          {
            produtoId: item.id,
            nome: item.nome,
            qtdSolicitada: falta,
            unidade: item.unidade,
            setor: item.setor,
            iconeKey: item.iconeKey,
          },
        ],
      };
      setComandasCozinha((prev) => [novaComanda, ...prev]);
      dispararToast(`🖨️ Nova comanda #${novaComanda.id} enviada para a Cozinha!`);
    } else {
      // Insumos (Frios/Bebidas): verifica se já está na Guia de Abastecimento
      const tarefaExistenteId = mapaTarefaInsumoPorProduto[item.id];
      if (tarefaExistenteId) {
        const novasTarefas = tarefasInsumos.map((t) =>
          t.id === tarefaExistenteId
            ? {
                ...t,
                prioridade: 'urgente',
                qtdAbastecer: Number((t.qtdAbastecer + item.passo * 2).toFixed(2)),
              }
            : t
        );
        setTarefasInsumos(novasTarefas);
        dispararToast(
          `🔁 Quantidade de ${item.nome} reforçada na Guia de Abastecimento existente!`
        );
        return;
      }

      const novaTarefa = {
        id: gerarIdUnico('ins'),
        idempotencyKey: gerarIdUnico('idem-ins'),
        produtoId: item.id,
        nome: item.nome,
        setor: item.setor,
        qtdAbastecer: falta,
        unidade: item.unidade,
        prioridade: 'urgente',
        iconeKey: item.iconeKey,
        instrucao: `Transferir do saldo do Depósito (${item.setor}) para a Vitrine`,
      };
      setTarefasInsumos((prev) => [novaTarefa, ...prev]);
      dispararToast(`❄️ ${item.nome} adicionado à Guia de Abastecimento!`);
    }
  };

  // 2. Enviar lote de itens faltantes da Cozinha (Apenas aqueles que AINDA NÃO possuem comanda ativa!)
  const enviarLoteParaCozinhaSemDuplicar = () => {
    const pendentesNaoSolicitados = faltantesCozinha.filter(
      (item) => !mapaComandaAtivaPorProduto[item.id]
    );

    if (pendentesNaoSolicitados.length === 0) {
      if (faltantesCozinha.length > 0) {
        dispararToast(
          'ℹ️ Todos os itens de forno abaixo do mínimo já possuem comanda ativa na Cozinha!'
        );
        setTelaAtual('cozinha');
      } else {
        dispararToast('Todos os pães e doces da cozinha já atingiram o mínimo!');
      }
      return;
    }

    const novaComanda = {
      id: `COZ-${Math.floor(110 + Math.random() * 880)}`,
      idempotencyKey: gerarIdUnico('idem-coz-lote'),
      criadoEmISO: new Date().toISOString(),
      horario: horarioAgora(),
      solicitante: perfilAtivo?.nome || 'Equipe Vitrine',
      prioridade: pendentesNaoSolicitados.some((i) => i.saldoVitrine === 0) ? 'urgente' : 'normal',
      status: 'fila',
      observacao: 'Ordem gerada pela conferência da vitrine (sem duplicar comandas abertas).',
      itens: pendentesNaoSolicitados.map((item) => ({
        produtoId: item.id,
        nome: item.nome,
        qtdSolicitada: Number((item.minimo - item.saldoVitrine).toFixed(2)),
        unidade: item.unidade,
        setor: item.setor,
        iconeKey: item.iconeKey,
      })),
    };

    setComandasCozinha((prev) => [novaComanda, ...prev]);
    dispararToast(`🖨️ Comanda #${novaComanda.id} enviada para a Cozinha!`);
    setTelaAtual('cozinha');
  };

  // 3. Sincronizar Guia de Abastecimento de Insumos (Mesclando sem sobrescrever ajustes manuais!)
  const sincronizarGuiaInsumosSemSobrescrever = () => {
    const novosInsumosFaltantes = faltantesInsumos.filter(
      (item) => !mapaTarefaInsumoPorProduto[item.id]
    );

    if (novosInsumosFaltantes.length === 0) {
      dispararToast('Guia de Abastecimento já contém todos os insumos pendentes!');
      setTelaAtual('abastecimento-insumos');
      return;
    }

    const novasTarefasCriadas = novosInsumosFaltantes.map((item) => ({
      id: gerarIdUnico('ins'),
      idempotencyKey: gerarIdUnico('idem-ins'),
      produtoId: item.id,
      nome: item.nome,
      setor: item.setor,
      qtdAbastecer: Number((item.minimo - item.saldoVitrine).toFixed(2)),
      unidade: item.unidade,
      prioridade: item.saldoVitrine === 0 ? 'urgente' : 'normal',
      iconeKey: item.iconeKey,
      instrucao:
        item.id === 'presunto' || item.id === 'queijo'
          ? 'Retirar peça do Depósito, fatiar e abastecer vitrine'
          : 'Transferir unidades do Depósito para a geladeira da vitrine',
    }));

    setTarefasInsumos((prev) => [...prev, ...novasTarefasCriadas]);
    dispararToast(`❄️ +${novasTarefasCriadas.length} insumo(s) adicionados à Guia sem apagar os atuais!`);
    setTelaAtual('abastecimento-insumos');
  };

  // 4. Concluir Comanda na Cozinha (100% PURO - Soma em saldoVitrine sem side-effects no setState)
  const concluirComandaCozinhaPura = (comanda) => {
    const horario = horarioAgora();
    const iso = new Date().toISOString();
    const novosRegistrosRelatorio = [];

    const produtosAtualizados = produtos.map((prod) => {
      const itemComanda = comanda.itens.find((i) => i.produtoId === prod.id);
      if (!itemComanda) return prod;

      const antesVitrine = prod.saldoVitrine;
      const depoisVitrine = Number((prod.saldoVitrine + itemComanda.qtdSolicitada).toFixed(2));

      novosRegistrosRelatorio.push({
        id: gerarIdUnico('rep-coz'),
        idempotencyKey: gerarIdUnico('ledger-coz'),
        criadoEmISO: iso,
        horario,
        produtoId: prod.id,
        produto: prod.nome,
        iconeKey: prod.iconeKey,
        categoriaRelatorio: 'Produção / Cozinha ➔ Vitrine',
        origemFluxo: `Comanda Impressa #${comanda.id}`,
        antesVitrine,
        qtdReposta: itemComanda.qtdSolicitada,
        depoisVitrine,
        antesDeposito: prod.saldoDeposito,
        depoisDeposito: prod.saldoDeposito,
        unidade: prod.unidade,
        responsavel: perfilAtivo?.nome || 'Cozinha',
      });

      return { ...prod, saldoVitrine: depoisVitrine };
    });

    setProdutos(produtosAtualizados);
    setHistoricoReposicoes((prev) => [...novosRegistrosRelatorio, ...prev]);
    setComandasCozinha((prev) => prev.filter((c) => c.id !== comanda.id));
    dispararToast(`✅ Fornada #${comanda.id} concluída! Saldo da Vitrine atualizado.`);
  };

  // 5. Transferir Insumo do Depósito para a Vitrine (Valida saldoDeposito antes de transferir!)
  const confirmarTransferenciaDepositoParaVitrine = (tarefa) => {
    const qtd = Number(tarefa.qtdAbastecer);
    if (Number.isNaN(qtd) || qtd <= 0) {
      dispararToast('Informe uma quantidade válida maior que zero.', 'erro');
      return;
    }

    const prodAlvo = produtos.find((p) => p.id === tarefa.produtoId);
    if (!prodAlvo) return;

    if (qtd > prodAlvo.saldoDeposito) {
      dispararToast(
        `❌ Saldo insuficiente no Depósito para ${prodAlvo.nome}! Disponível no depósito: ${formatarNumero(prodAlvo.saldoDeposito)} ${prodAlvo.unidade}. Lance uma Nota Fiscal primeiro.`,
        'erro'
      );
      return;
    }

    const horario = horarioAgora();
    const iso = new Date().toISOString();
    const antesVitrine = prodAlvo.saldoVitrine;
    const depoisVitrine = Number((antesVitrine + qtd).toFixed(2));
    const antesDeposito = prodAlvo.saldoDeposito;
    const depoisDeposito = Number((antesDeposito - qtd).toFixed(2));

    // Atualização 100% pura
    const produtosAtualizados = produtos.map((p) =>
      p.id === prodAlvo.id
        ? { ...p, saldoVitrine: depoisVitrine, saldoDeposito: depoisDeposito }
        : p
    );

    const novoRegisto = {
      id: gerarIdUnico('rep-ins'),
      idempotencyKey: gerarIdUnico('ledger-ins'),
      criadoEmISO: iso,
      horario,
      produtoId: prodAlvo.id,
      produto: prodAlvo.nome,
      iconeKey: prodAlvo.iconeKey,
      categoriaRelatorio: 'Insumo / Transferência Depósito ➔ Vitrine',
      origemFluxo: `Guia de Abastecimento (${tarefa.setor})`,
      antesVitrine,
      qtdReposta: qtd,
      depoisVitrine,
      antesDeposito,
      depoisDeposito,
      unidade: prodAlvo.unidade,
      responsavel: perfilAtivo?.nome || 'Operador',
    };

    setProdutos(produtosAtualizados);
    setHistoricoReposicoes((prev) => [novoRegisto, ...prev]);
    setTarefasInsumos((prev) => prev.filter((t) => t.id !== tarefa.id));
    dispararToast(
      `❄️ Transferido ${formatarNumero(qtd)} ${tarefa.unidade} do Depósito para a Vitrine!`
    );
  };

  // 6. Confirmar Entrada de Nota Fiscal (Exclusivo para saldoDeposito + RBAC + Idempotência)
  const confirmarEntradaNotaNoDepositoPuro = () => {
    if (!perfilAtivo?.permissoes?.lancarNotaFiscal) {
      dispararToast(
        '🔒 Permissão negada: Apenas Compras/Estoque ou Proprietário podem lançar Notas Fiscais.',
        'erro'
      );
      return;
    }

    if (notaAtualJaProcessada) {
      dispararToast(
        `⚠️ A Nota Fiscal ${chaveNotaSelecionada} já foi processada! Selecione outra nota para evitar duplicidade.`,
        'erro'
      );
      return;
    }

    const itensValidos = itensNotaOCR.filter((i) => i.qtdEmbalagens > 0);
    if (itensValidos.length === 0) {
      dispararToast('Adicione pelo menos 1 embalagem na nota para confirmar.', 'erro');
      return;
    }

    const horario = horarioAgora();
    const iso = new Date().toISOString();
    const novosLogsLedger = [];

    // Soma EXCLUSIVAMENTE no saldoDeposito (nunca direto na vitrine!)
    const produtosAtualizados = produtos.map((prod) => {
      const itemNota = itensValidos.find((n) => n.produtoId === prod.id);
      if (!itemNota) return prod;

      const unidadesConvertidas = Number(
        (itemNota.qtdEmbalagens * itemNota.fatorConversao).toFixed(2)
      );
      const antesDeposito = prod.saldoDeposito;
      const depoisDeposito = Number((antesDeposito + unidadesConvertidas).toFixed(2));

      novosLogsLedger.push({
        id: gerarIdUnico('rep-nf'),
        idempotencyKey: `${chaveNotaSelecionada}-${prod.id}`,
        criadoEmISO: iso,
        horario,
        produtoId: prod.id,
        produto: prod.nome,
        iconeKey: prod.iconeKey,
        categoriaRelatorio: 'Entrada Nota Fiscal ➔ Saldo Depósito',
        origemFluxo: `${chaveNotaSelecionada} (${itemNota.qtdEmbalagens} ${itemNota.tipoEmbalagem})`,
        antesVitrine: prod.saldoVitrine,
        qtdReposta: unidadesConvertidas,
        depoisVitrine: prod.saldoVitrine, // Vitrine permanece intacta até abastecer!
        antesDeposito,
        depoisDeposito,
        unidade: prod.unidade,
        responsavel: perfilAtivo.nome,
      });

      return { ...prod, saldoDeposito: depoisDeposito };
    });

    const totalFinanceiroNota = itensValidos.reduce(
      (acc, i) => acc + i.qtdEmbalagens * i.valorUnitarioEmbalagem,
      0
    );

    setProdutos(produtosAtualizados);
    setHistoricoReposicoes((prev) => [...novosLogsLedger, ...prev]);
    setNotasProcessadasIds((prev) => [...prev, chaveNotaSelecionada]);
    setCaixaDia((prev) => ({
      ...prev,
      totalNotasEntrada: Number((prev.totalNotasEntrada + totalFinanceiroNota).toFixed(2)),
    }));

    dispararToast(
      `✅ ${chaveNotaSelecionada} lançada no SALDO DO DEPÓSITO! Use a Guia de Insumos para transferir para a vitrine.`
    );
  };

  // 7. Registar Perda / Quebra (Bloqueia estritamente perda > saldoVitrine)
  const confirmarRegistroPerdaValidado = () => {
    if (!modalPerdaProduto) return;
    const qtdPerdida = Number(parseFloat(String(qtdPerdaInput).replace(',', '.')).toFixed(2));

    if (Number.isNaN(qtdPerdida) || qtdPerdida <= 0) {
      setErroPerda('Informe uma quantidade válida maior que zero.');
      return;
    }

    if (qtdPerdida > modalPerdaProduto.saldoVitrine) {
      setErroPerda(
        `Operação bloqueada: A perda (${formatarNumero(qtdPerdida)}) não pode ser maior que o saldo atual na vitrine (${formatarNumero(modalPerdaProduto.saldoVitrine)} ${modalPerdaProduto.unidade}).`
      );
      return;
    }

    const antesVitrine = modalPerdaProduto.saldoVitrine;
    const depoisVitrine = Number((antesVitrine - qtdPerdida).toFixed(2));

    const produtosAtualizados = produtos.map((p) =>
      p.id === modalPerdaProduto.id ? { ...p, saldoVitrine: depoisVitrine } : p
    );

    const novaPerda = {
      id: gerarIdUnico('perda'),
      idempotencyKey: gerarIdUnico('ledger-loss'),
      criadoEmISO: new Date().toISOString(),
      horario: horarioAgora(),
      produtoId: modalPerdaProduto.id,
      produto: modalPerdaProduto.nome,
      iconeKey: modalPerdaProduto.iconeKey,
      qtd: qtdPerdida,
      antesVitrine,
      depoisVitrine,
      unidade: modalPerdaProduto.unidade,
      motivo: motivoPerdaInput,
      custoEstimado: Number((qtdPerdida * (modalPerdaProduto.custoUnitario || 5)).toFixed(2)),
      responsavel: perfilAtivo?.nome || 'Equipe Skina',
    };

    setProdutos(produtosAtualizados);
    setHistoricoPerdas((prev) => [novaPerda, ...prev]);
    setModalPerdaProduto(null);
    setErroPerda('');
    dispararToast(
      `📉 Baixa por perda registada: -${formatarNumero(qtdPerdida)} ${modalPerdaProduto.unidade} de ${modalPerdaProduto.nome}`
    );
  };
  // 8. Emissão e Impressão Nativa de Documento PDF Oficial A4 (Exclusivo do Proprietário)
  const abrirPreviewPdfOficial = (escopoEscolhido = 'executivo') => {
    if (!ehProprietario) return;
    setEscopoPdf(escopoEscolhido);
    setModalPdfAberto(true);
  };

  const acionarImpressaoPdfA4 = () => {
    window.print();
    dispararToast('📄 Janela de impressão / Guardar como PDF A4 acionada!');
  };

  const descarregarDocumentoPdfHtml = () => {
    const conteudoA4 = document.getElementById('folha-oficial-pdf-a4');
    if (!conteudoA4) return;

    const htmlCompleto = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Relatorio_Oficial_Skina_do_Pao_${escopoPdf.toUpperCase()}.html</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @page { size: A4; margin: 12mm; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #FFF; color: #1C1917; }
  </style>
</head>
<body class="p-6">
  ${conteudoA4.innerHTML}
  <script>window.onload = () => setTimeout(() => window.print(), 400);</script>
</body>
</html>`;

    const blob = new Blob([htmlCompleto], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Relatorio_A4_Skina_do_Pao_${escopoPdf}_${new Date().toISOString().slice(0, 10)}.html`;
    a.click();
    URL.revokeObjectURL(url);
    dispararToast('📄 Documento A4 pronto para impressão/PDF transferido!');
  };

  // ============================================================================
  // ECRÃ DE LOGIN DIRETO DE TESTE + CONTROLO DE PERMISSÕES (RBAC)
  // ============================================================================

  if (!perfilAtivo) {
    return (
      <div className="min-h-screen bg-[#F5EFEA] text-[#2C1E18] font-sans antialiased flex flex-col justify-between p-5">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
          .font-serif-display { font-family: 'Fraunces', Georgia, serif; }
          .font-sans { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
        `}</style>

        <div className="max-w-md w-full mx-auto pt-2 pb-8 space-y-4">
          {/* Topo */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2.5 bg-[#FFFDFB] px-3.5 py-2 rounded-2xl border border-[#EBE0D6] shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#F3EAE0] text-[#4A3228] flex items-center justify-center">
                <IconLogoSkina className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-serif-display font-bold text-base text-[#3B2316] leading-none">
                  Skina do Pão
                </span>
                <span className="text-[11px] text-[#7A685F] font-medium">
                  ERP Auditado · RBAC & Persistência Local
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={restaurarDadosDeFabrica}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-[#FFFDFB] text-[#6E5A4F] border border-[#DDD0C3] hover:bg-[#F3EAE0]"
              title="Limpar LocalStorage e restaurar dados originais"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Fábrica
            </button>
          </div>

          {/* Card Explicativo da Arquitetura Auditada */}
          <div className="bg-[#FFFDFB] rounded-[28px] p-5 border border-[#EBE0D6] shadow-[0_8px_24px_rgba(44,30,24,0.06)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2F5938] bg-[#E6F0E8] px-2.5 py-0.5 rounded-full border border-[#C5DEC9] flex items-center gap-1">
                <Database className="w-3 h-3" />
                Salvo em LocalStorage
              </span>
              <label className="flex items-center gap-1.5 text-xs text-[#6E5A4F] cursor-pointer">
                <input
                  type="checkbox"
                  checked={exigirPinNoLogin}
                  onChange={(e) => setExigirPinNoLogin(e.target.checked)}
                  className="rounded accent-[#362218]"
                />
                Testar com PIN
              </label>
            </div>

            <h1 className="font-serif-display text-[25px] font-bold text-[#3B2316] leading-tight">
              Bom trabalho começa por aqui.
            </h1>
            <p className="text-xs text-[#6E5A4F] leading-relaxed">
              Escolha um perfil para testar as <strong>permissões reais (RBAC)</strong>, a separação entre <strong>Saldo do Depósito</strong> e <strong>Saldo da Vitrine</strong> e a prevenção de lançamentos duplicados.
            </p>

            {exigirPinNoLogin && (
              <div className="bg-[#FAF6F2] p-3 rounded-2xl border border-[#E2D5C8] flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#C86D51]" />
                <input
                  type="password"
                  placeholder="PIN (1111, 2222 ou 9999)"
                  value={pinOpcionalInput}
                  onChange={(e) => setPinOpcionalInput(e.target.value)}
                  className="bg-white border border-[#D8C8B8] rounded-xl px-3 py-1.5 text-xs font-bold flex-1"
                />
              </div>
            )}

            <div className="pt-2 border-t border-[#EFE6DD] grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#FDF3EB] px-3 py-2 rounded-xl border border-[#EED0AE]">
                <span className="text-[10px] font-bold uppercase text-[#9C441B] block">Vitrine Abaixo Mín.</span>
                <strong className="text-[#3B2316]">{faltantesCozinha.length} forno · {faltantesInsumos.length} frios</strong>
              </div>
              <div className="bg-[#E6EEF2] px-3 py-2 rounded-xl border border-[#C2D7E2]">
                <span className="text-[10px] font-bold uppercase text-[#264E63] block">Registos no Ledger</span>
                <strong className="text-[#1D3B4B]">{historicoReposicoes.length} movimentos salvos</strong>
              </div>
            </div>
          </div>

          {/* Perfis de Teste com RBAC */}
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#6E5A4F] px-1">
            Entrar com 1 toque (Permissões RBAC Ativas):
          </h2>

          <div className="space-y-2.5">
            {PERFIS_RBAC.map((perfil) => (
              <button
                key={perfil.id}
                type="button"
                onClick={() => {
                  if (exigirPinNoLogin && pinOpcionalInput !== perfil.pinPadrao) {
                    dispararToast(`PIN incorreto para ${perfil.nome}. Use ${perfil.pinPadrao}.`, 'erro');
                    return;
                  }
                  setPerfilAtivo(perfil);
                  if (perfil.papel !== 'proprietario') {
                    setModalPdfAberto(false);
                    setTelaAtual('conferencia');
                  } else {
                    setTelaAtual('painel-dono');
                  }
                  dispararToast(`Sessão iniciada: ${perfil.nome} (${perfil.cargo})`);
                }}
                className="w-full text-left bg-[#FFFDFB] hover:bg-[#FAF5F0] active:scale-[0.99] transition-all rounded-[22px] p-4 border border-[#EBE0D6] shadow-2xs flex items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#F3EAE0] text-[#4A3228] flex items-center justify-center shrink-0 font-serif-display font-bold text-base border border-[#E5D7C8]">
                    {perfil.nome.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif-display font-bold text-base text-[#2C1E18]">
                        {perfil.nome}
                      </h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${perfil.corBadge}`}>
                        {perfil.cargo}
                      </span>
                    </div>
                    <p className="text-[11.5px] text-[#6E5A4F] mt-1 leading-snug">
                      {perfil.foco}
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-[#362218] group-hover:bg-[#C86D51] text-white flex items-center justify-center shrink-0 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // ESTRUTURA PRINCIPAL LOGADA
  // ============================================================================

  return (
    <div className="min-h-screen bg-[#F5EFEA] text-[#2C1E18] font-sans antialiased pb-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-display { font-family: 'Fraunces', Georgia, serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
        @media print {
          body * { visibility: hidden; }
          #folha-oficial-pdf-a4, #folha-oficial-pdf-a4 * { visibility: visible; }
          #folha-oficial-pdf-a4 {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            border: none !important;
          }
          #area-impressao-80mm, #area-impressao-80mm * { visibility: visible; }
          #area-impressao-80mm { position: absolute; left: 0; top: 0; width: 76mm; }
        }
      `}</style>

      {/* TOAST GLOBAL */}
      {toast && (
        <div className="fixed top-4 inset-x-4 max-w-md mx-auto z-50 pointer-events-none">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-semibold ${
              toast.tipo === 'erro'
                ? 'bg-[#8C2D19] text-white border-[#B84A27]'
                : 'bg-[#2C1E18] text-[#FFFDFB] border-[#4A3228]'
            }`}
          >
            {toast.tipo === 'erro' ? (
              <ShieldAlert className="w-4 h-4 text-[#F8E2C8] shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#74B882] shrink-0" />
            )}
            <span>{toast.texto}</span>
          </div>
        </div>
      )}

      {/* BARRA SUPERIOR PERSISTENTE COM SELETOR RÁPIDO DE PERFIL (RBAC) */}
      <div className="bg-[#EFE6DD] border-b border-[#E2D5C8] px-4 py-2 sticky top-0 z-30">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => setTelaAtual('conferencia')}
              className="w-7 h-7 rounded-lg bg-[#362218] text-[#FFFDFB] flex items-center justify-center shrink-0"
            >
              <IconLogoSkina className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <select
                  value={perfilAtivo.id}
                  onChange={(e) => {
                    const novo = PERFIS_RBAC.find((p) => p.id === e.target.value);
                    if (novo) {
                      setPerfilAtivo(novo);
                      if (novo.papel !== 'proprietario') {
                        setModalPdfAberto(false);
                        if (telaAtual === 'relatorios' || telaAtual === 'painel-dono') {
                          setTelaAtual('conferencia');
                        }
                      }
                      dispararToast(`Perfil alternado para ${novo.nome} (${novo.cargo})`);
                    }
                  }}
                  className="bg-transparent font-serif-display font-bold text-xs text-[#2C1E18] focus:outline-none cursor-pointer truncate"
                  title="Alternar Perfil para testar visibilidade estrita RBAC"
                >
                  {PERFIS_RBAC.map((p) => (
                    <option key={p.id} value={p.id}>
                      👤 {p.nome} ({p.cargo.split(' ')[0]})
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-[10px] text-[#6E5A4F] block truncate">
                Turno: {turnoAtual} · {ehProprietario ? 'Modo Diretoria (6 abas)' : 'Modo Operacional (4 abas)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {ehProprietario && (
              <button
                type="button"
                onClick={() => abrirPreviewPdfOficial('executivo')}
                className="px-2 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 bg-[#362218] text-[#F5D6B8] border-[#362218]"
                title="Gerar Relatório Oficial em PDF (A4) - Exclusivo Proprietário"
              >
                <FileText className="w-3 h-3" />
                PDF A4
              </button>
            )}

            <button
              type="button"
              onClick={() => setTelaAtual('passagem-turno')}
              className={`px-2 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-colors ${
                telaAtual === 'passagem-turno'
                  ? 'bg-[#362218] text-white border-[#362218]'
                  : 'bg-[#FFFDFB] text-[#4A3228] border-[#DDD0C3]'
              }`}
            >
              <ArrowRightLeft className="w-3 h-3" />
              Turno
            </button>

            <button
              type="button"
              onClick={() => setTelaAtual('catalogo')}
              className={`px-2 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-colors ${
                telaAtual === 'catalogo'
                  ? 'bg-[#362218] text-white border-[#362218]'
                  : 'bg-[#FFFDFB] text-[#4A3228] border-[#DDD0C3]'
              }`}
            >
              <Store className="w-3 h-3" />
              Catálogo
            </button>

            <button
              type="button"
              onClick={() => setPerfilAtivo(null)}
              className="p-1.5 rounded-lg bg-[#E4D7C9] hover:bg-[#D8C7B6] text-[#3B2316]"
              title="Sair / Ecrã de Login"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-md mx-auto px-4 pt-4">
        
        {/* ====================================================================
            MÓDULO 0: PAINEL EXCLUSIVO DO DONO (Renderizado APENAS se ehProprietario === true)
           ==================================================================== */}
        {ehProprietario && telaAtual === 'painel-dono' && (
          <div className="space-y-4">
            {/* CABEÇALHO DO PAINEL DO DONO */}
            <div className="bg-gradient-to-br from-[#362218] via-[#2C1E18] to-[#4A3228] text-[#FFFDFB] rounded-[26px] p-5 shadow-lg space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-[#5A3E2E] text-[#F5D6B8] px-2.5 py-0.5 rounded-full">
                    <Crown className="w-3 h-3" />
                    Visão Geral Executiva · Seu Antônio
                  </span>
                  <h1 className="font-serif-display text-[26px] font-bold leading-tight mt-1.5">
                    Sua padaria, sob seu olhar.
                  </h1>
                  <p className="text-xs text-[#D9C8BC]">
                    Indicadores patrimoniais, Curva ABC, caixa e emissão de PDF Oficial A4.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => abrirPreviewPdfOficial('executivo')}
                  className="bg-[#C86D51] hover:bg-[#B55B3F] text-white px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-md shrink-0 active:scale-95 transition-transform"
                >
                  <FileText className="w-4 h-4" />
                  Emitir PDF A4
                </button>
              </div>

              {/* 4 KPIs Executivos Principais */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="bg-[#FFFDFB]/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
                  <span className="text-[10.5px] text-[#D9C8BC] flex items-center gap-1">
                    <Warehouse className="w-3.5 h-3.5 text-[#F5D6B8]" />
                    Patrimônio em Estoque (Custo)
                  </span>
                  <p className="font-serif-display font-bold text-lg text-white mt-0.5">
                    {formatarMoeda(kpisExecutivos.patrimonioTotalCusto)}
                  </p>
                  <span className="text-[10px] text-[#D9C8BC] block mt-0.5">
                    Vitrine: {formatarMoeda(kpisExecutivos.custoTotalVitrine)} · Dep.: {formatarMoeda(kpisExecutivos.custoTotalDeposito)}
                  </span>
                </div>

                <div className="bg-[#FFFDFB]/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
                  <span className="text-[10.5px] text-[#D9C8BC] flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5 text-[#86EFAC]" />
                    Margem Bruta & Giro Vitrine
                  </span>
                  <p className="font-serif-display font-bold text-lg text-[#86EFAC] mt-0.5">
                    {formatarNumero(kpisExecutivos.margemMediaGlobal)}% média
                  </p>
                  <span className="text-[10px] text-[#D9C8BC] block mt-0.5">
                    Venda vitrine: {formatarMoeda(kpisExecutivos.vendaPotencialVitrine)}
                  </span>
                </div>

                <div className="bg-[#FFFDFB]/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
                  <span className="text-[10.5px] text-[#D9C8BC] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#FDBA74]" />
                    Índice de Quebra / Perda
                  </span>
                  <p className="font-serif-display font-bold text-lg text-white mt-0.5">
                    {formatarMoeda(kpisExecutivos.totalPerdasReais)}{' '}
                    <span className="text-xs font-normal text-[#FDBA74]">
                      ({formatarNumero(kpisExecutivos.indiceDesperdicioPct)}%)
                    </span>
                  </p>
                  <span className="text-[10px] text-[#86EFAC] block mt-0.5">
                    {kpisExecutivos.dentroDaMetaDesperdicio
                      ? '✓ Dentro da meta (< 3%)'
                      : '⚠️ Acima do teto de 3%'}
                  </span>
                </div>

                <div className="bg-[#FFFDFB]/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
                  <span className="text-[10.5px] text-[#D9C8BC] flex items-center gap-1">
                    <Wallet className="w-3.5 h-3.5 text-[#F5D6B8]" />
                    Saldo Líquido do Dia
                  </span>
                  <p className="font-serif-display font-bold text-lg text-[#F5D6B8] mt-0.5">
                    {formatarMoeda(kpisExecutivos.saldoLiquidoCaixa)}
                  </p>
                  <span className="text-[10px] text-[#D9C8BC] block mt-0.5">
                    Bruto: {formatarMoeda(kpisExecutivos.receitaBrutaCaixa)}
                  </span>
                </div>
              </div>
            </div>

            {/* ATALHOS DE EMISSÃO DE DOCUMENTOS OFICIAIS EM PDF (A4) */}
            <div className="bg-[#FFFDFB] rounded-[22px] p-4 border border-[#EBE0D6] shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-display font-bold text-sm text-[#2C1E18] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#C86D51]" />
                  Central de Documentos Oficiais em PDF (Folha A4)
                </h3>
                <span className="text-[10px] font-bold bg-[#E6F0E8] text-[#2F5938] px-2 py-0.5 rounded-full">
                  Timbrado A4
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'executivo', titulo: '1. Dossiê Executivo do Dono', sub: 'KPIs, Curva ABC & Caixa' },
                  { id: 'balanco', titulo: '2. Balanço Físico-Financeiro', sub: 'Vitrine vs. Depósito (R$)' },
                  { id: 'reposicoes', titulo: '3. Auditoria de Reposições', sub: 'Frios, Forno & Perdas' },
                  { id: 'turno', titulo: '4. Termo de Passagem Turno', sub: 'Checklist & Assinaturas' },
                ].map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => abrirPreviewPdfOficial(doc.id)}
                    className="text-left p-2.5 rounded-xl bg-[#FAF6F2] hover:bg-[#F3EAE0] border border-[#E2D5C8] transition-colors"
                  >
                    <span className="font-bold text-xs text-[#2C1E18] block">{doc.titulo}</span>
                    <span className="text-[10.5px] text-[#6E5A4F]">{doc.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* MATRIZ CURVA ABC & ALERTAS ESTRATÉGICOS */}
            <div className="bg-[#FFFDFB] rounded-[22px] p-4 border border-[#EBE0D6] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-display font-bold text-base text-[#2C1E18] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#C86D51]" />
                  Inteligência de Margem & Risco de Ruptura
                </h3>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2F5938] block">
                  🏆 Top 3 Campeões de Margem Bruta
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {kpisExecutivos.campeoesMargem.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-[#E6F0E8]/70 border border-[#C5DEC9] rounded-xl p-2.5 text-center"
                    >
                      <span className="font-bold text-xs text-[#2C1E18] block truncate">
                        {prod.nome}
                      </span>
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

              {kpisExecutivos.riscoRuptura.length > 0 && (
                <div className="pt-2 border-t border-[#F4ECE3] space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B84A27] block">
                    ⚠️ Produtos Abaixo do Mínimo na Vitrine ({kpisExecutivos.riscoRuptura.length})
                  </span>
                  {kpisExecutivos.riscoRuptura.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between text-xs bg-[#FDF3EB] px-3 py-1.5 rounded-xl border border-[#EED0AE]"
                    >
                      <span className="font-bold text-[#2C1E18]">{p.nome}</span>
                      <span className="text-[#9C441B] font-semibold">
                        Vitrine: {formatarNumero(p.saldoVitrine)} / mín. {formatarNumero(p.minimo)} · Dep.: {formatarNumero(p.saldoDeposito)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SIMULADOR INTERATIVO DE PRECIFICAÇÃO & MARGEM */}
            <div className="bg-[#FFFDFB] rounded-[22px] p-4 border border-[#EBE0D6] shadow-2xs space-y-3">
              <div>
                <h3 className="font-serif-display font-bold text-base text-[#2C1E18] flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#C86D51]" />
                  Simulador de Precificação & Margem em Tempo Real
                </h3>
                <p className="text-xs text-[#6E5A4F]">
                  Ajuste o Custo ou Preço de Venda abaixo para recalcular instantaneamente o lucro unitário e a margem da padaria.
                </p>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {kpisExecutivos.analiseProdutos.map((prod) => (
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
                          onChange={(e) =>
                            atualizarPrecoOuCustoExecutivo(prod.id, 'custoUnitario', e.target.value)
                          }
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
                          onChange={(e) =>
                            atualizarPrecoOuCustoExecutivo(prod.id, 'precoVenda', e.target.value)
                          }
                          className="w-16 bg-white border border-[#4A3228] rounded-lg px-1.5 py-1 text-center font-bold text-xs text-[#2F5938]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FECHAMENTO DE CAIXA DA FRENTE DE LOJA */}
            <div className="bg-[#FFFDFB] rounded-[22px] p-4 border border-[#EBE0D6] shadow-2xs space-y-3">
              <h3 className="font-serif-display font-bold text-base text-[#2C1E18] flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-[#2F5938]" />
                Balanço da Frente de Loja & Sistema de Caixa
              </h3>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#FAF6F2] p-2.5 rounded-xl border border-[#E5D8CB]">
                  <span className="text-[10px] font-bold text-[#6E5A4F] block">PIX</span>
                  <input
                    type="number"
                    value={caixaDia.pix}
                    onChange={(e) =>
                      setCaixaDia((prev) => ({ ...prev, pix: parseFloat(e.target.value) || 0 }))
                    }
                    className="w-full text-center font-bold text-xs bg-transparent mt-0.5 focus:outline-none"
                  />
                </div>
                <div className="bg-[#FAF6F2] p-2.5 rounded-xl border border-[#E5D8CB]">
                  <span className="text-[10px] font-bold text-[#6E5A4F] block">Cartão</span>
                  <input
                    type="number"
                    value={caixaDia.cartao}
                    onChange={(e) =>
                      setCaixaDia((prev) => ({ ...prev, cartao: parseFloat(e.target.value) || 0 }))
                    }
                    className="w-full text-center font-bold text-xs bg-transparent mt-0.5 focus:outline-none"
                  />
                </div>
                <div className="bg-[#FAF6F2] p-2.5 rounded-xl border border-[#E5D8CB]">
                  <span className="text-[10px] font-bold text-[#6E5A4F] block">Espécie (R$)</span>
                  <input
                    type="number"
                    value={caixaDia.dinheiro}
                    onChange={(e) =>
                      setCaixaDia((prev) => ({
                        ...prev,
                        dinheiro: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-full text-center font-bold text-xs bg-transparent mt-0.5 focus:outline-none"
                  />
                </div>
              </div>

              {/* Lançar Sangria / Despesa Rápida */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Motivo da sangria/despesa (ex: Gelo, Gás)"
                  value={novaSangriaDesc}
                  onChange={(e) => setNovaSangriaDesc(e.target.value)}
                  className="flex-1 bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-2.5 py-1.5 text-xs"
                />
                <input
                  type="number"
                  placeholder="R$"
                  value={novaSangriaValor}
                  onChange={(e) => setNovaSangriaValor(e.target.value)}
                  className="w-20 bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-2.5 py-1.5 text-xs font-bold"
                />
                <button
                  type="button"
                  onClick={() => {
                    const val = parseFloat(novaSangriaValor);
                    if (!val || val <= 0) {
                      dispararToast('Informe um valor válido para a sangria.', 'erro');
                      return;
                    }
                    setCaixaDia((prev) => ({
                      ...prev,
                      sangriasDespesas: Number(((prev.sangriasDespesas || 0) + val).toFixed(2)),
                    }));
                    setNovaSangriaValor('');
                    setNovaSangriaDesc('');
                    dispararToast(`💸 Sangria de ${formatarMoeda(val)} registada no caixa!`);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#9E4224] text-white text-xs font-bold"
                >
                  Sangria
                </button>
              </div>

              <div className="bg-[#E6F0E8] border border-[#C5DEC9] rounded-xl p-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#2F5938] block">
                    Resultado Operacional Conciliado
                  </span>
                  <span className="text-[10.5px] text-[#4A6B53]">
                    Entradas ({formatarMoeda(kpisExecutivos.receitaBrutaCaixa)}) - Sangrias ({formatarMoeda(caixaDia.sangriasDespesas || 0)}) - NF-e ({formatarMoeda(caixaDia.totalNotasEntrada)})
                  </span>
                </div>
                <span className="font-serif-display font-bold text-base text-[#1F4226]">
                  {formatarMoeda(kpisExecutivos.saldoLiquidoCaixa)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            MÓDULO 1: CONFERÊNCIA DA VITRINE (Mostra Saldo Vitrine + Saldo Depósito + Idempotência)
           ==================================================================== */}
        {telaAtual === 'conferencia' && (
          <div>
            <header className="flex items-baseline justify-between mb-3">
              <div>
                <h1 className="font-serif-display text-[32px] font-bold tracking-tight text-[#3B2316] leading-none">
                  Conferência
                </h1>
                <p className="text-xs text-[#6E5A4F] mt-1">
                  Saldos separados: <strong>Vitrine</strong> vs. <strong>Depósito</strong>. Clique 3x rápido em <strong>+</strong> para <strong>+10</strong>.
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-xs font-bold bg-[#EAE0D5] text-[#3B2316] px-2.5 py-1 rounded-full">
                  {produtosFiltradosConferencia.length} itens
                </span>
                <button
                  type="button"
                  onClick={restaurarDadosDeFabrica}
                  className="p-1.5 rounded-full text-[#7A685F] hover:text-[#2C1E18] hover:bg-[#E9DFD5]"
                  title="Restaurar dados de fábrica"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Filtros de Giro do Horário e Setor */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-3 no-scrollbar">
              {[
                { id: 'todos', label: `Todos (${produtos.length})`, icone: null },
                { id: 'faltantes', label: `Abaixo do Mín. (${todosAbaixoMinimo.length})`, icone: AlertTriangle },
                { id: 'manha', label: 'Giro Manhã', icone: Sun },
                { id: 'tarde', label: 'Giro Tarde', icone: Sunset },
                { id: 'cozinha', label: 'Só Cozinha/Forno', icone: Flame },
                { id: 'insumos', label: 'Só Insumos/Frios', icone: Snowflake },
              ].map((aba) => {
                const IconeAba = aba.icone;
                const ativo = filtroGiro === aba.id;
                return (
                  <button
                    key={aba.id}
                    type="button"
                    onClick={() => setFiltroGiro(aba.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 border transition-all ${
                      ativo
                        ? 'bg-[#362218] text-[#FFFDFB] border-[#362218] shadow-2xs'
                        : 'bg-[#FFFDFB] text-[#5A4940] border-[#E5D8CB] hover:bg-[#F3EAE0]'
                    }`}
                  >
                    {IconeAba && <IconeAba className="w-3.5 h-3.5" />}
                    {aba.label}
                  </button>
                );
              })}
            </div>

            {/* Banner de Alerta com separação Cozinha vs Insumos */}
            {todosAbaixoMinimo.length > 0 ? (
              <div className="mb-4 rounded-2xl p-3.5 bg-[#F8E2C8] border border-[#EED0AE] text-[#2C1E18] space-y-2">
                <p className="text-[13px] leading-snug">
                  <strong className="font-bold text-[#B8592A]">Atenção:</strong>{' '}
                  {faltantesCozinha.length} produto(s) de <strong>Cozinha</strong> e{' '}
                  {faltantesInsumos.length} de <strong>Frios/Depósito</strong> abaixo do mínimo na vitrine.
                </p>
                <div className="flex flex-wrap gap-2">
                  {faltantesCozinha.length > 0 && (
                    <button
                      type="button"
                      onClick={enviarLoteParaCozinhaSemDuplicar}
                      className="text-[11px] font-bold bg-[#362218] text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs active:scale-95"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#F5D6B8]" />
                      Gerar Comanda Cozinha ({faltantesCozinha.length})
                    </button>
                  )}
                  {faltantesInsumos.length > 0 && (
                    <button
                      type="button"
                      onClick={sincronizarGuiaInsumosSemSobrescrever}
                      className="text-[11px] font-bold bg-[#264E63] text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs active:scale-95"
                    >
                      <Snowflake className="w-3.5 h-3.5 text-[#BAE6FD]" />
                      Sincronizar Guia de Frios ({faltantesInsumos.length})
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="mb-4 rounded-2xl px-4 py-3 bg-[#E6F0E8] border border-[#C5DEC9] text-[#2F5938] text-[13px] font-medium flex items-center justify-between">
                <span>
                  <strong>Vitrine em dia:</strong> Todos os itens atingiram a meta mínima!
                </span>
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              </div>
            )}

            {/* Lista de Cards de Produtos */}
            <div className="space-y-3">
              {produtosFiltradosConferencia.map((item) => {
                const IconeVetorial = MAPA_ICONES[item.iconeKey]?.Componente || IconPaoFrances;
                const abaixoDoMinimo = item.saldoVitrine < item.minimo;
                const falta = Math.max(0, Number((item.minimo - item.saldoVitrine).toFixed(2)));
                const progresso = Math.min(100, Math.max(0, (item.saldoVitrine / item.minimo) * 100));
                const estaZerado = item.saldoVitrine === 0;
                const ehCozinha = item.tipoFluxo === 'cozinha';

                const comandaAtivaId = mapaComandaAtivaPorProduto[item.id];
                const tarefaAtivaId = mapaTarefaInsumoPorProduto[item.id];

                return (
                  <div
                    key={item.id}
                    className="bg-[#FFFDFB] rounded-[22px] p-3.5 shadow-[0_4px_14px_rgba(44,30,24,0.05)] border border-[#EBE0D6] transition-all relative"
                  >
                    {badgeMaisDezId === item.id && (
                      <div className="absolute -top-2.5 right-4 bg-[#2F5938] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 animate-bounce z-10">
                        <Zap className="w-3 h-3" />
                        +10 Rápido!
                      </div>
                    )}

                    <div className="flex items-center gap-3.5">
                      {/* Ícone Vetorial */}
                      <div
                        className={`w-[62px] h-[62px] rounded-2xl ${
                          item.corFundoIcone || 'bg-[#F3EAE0]'
                        } flex items-center justify-center text-[#4A3228] shrink-0`}
                      >
                        <IconeVetorial className="w-9 h-9" />
                      </div>

                      {/* Dados do Produto */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="font-serif-display text-[18px] font-bold text-[#2C1E18] leading-tight truncate">
                            {item.nome}
                          </h2>

                          <span
                            className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              ehCozinha
                                ? 'bg-[#FDF3EB] text-[#873E1B] border-[#EED0AE]'
                                : 'bg-[#E6EEF2] text-[#264E63] border-[#C2D7E2]'
                            }`}
                          >
                            {ehCozinha ? (
                              <>
                                <Flame className="w-2.5 h-2.5" />
                                Cozinha
                              </>
                            ) : (
                              <>
                                <Warehouse className="w-2.5 h-2.5" />
                                Depósito: {formatarNumero(item.saldoDeposito)}
                              </>
                            )}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 mt-1.5">
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-normal text-[#3B2A22] leading-tight mb-1.5">
                              {item.unidade} · mín. {formatarNumero(item.minimo)}
                            </p>

                            <div className="w-full max-w-[148px]">
                              <div className="h-2 w-full bg-[#E5DDD5] rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${
                                    abaixoDoMinimo
                                      ? 'bg-[#6A4937]'
                                      : item.saldoVitrine > item.minimo
                                      ? 'bg-[#749F72]'
                                      : 'bg-[#5A3E2E]'
                                  }`}
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

                          {/* Stepper de Saldo da Vitrine */}
                          <div
                            className={`flex items-center rounded-2xl p-0.5 transition-colors shrink-0 ${
                              estaZerado ? 'bg-[#F5E1DA]' : 'bg-transparent'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => alterarQtdVitrine(item.id, -item.passo)}
                              disabled={item.saldoVitrine <= 0}
                              className="w-11 h-11 rounded-[15px] bg-[#BC9E84] hover:bg-[#B09074] disabled:opacity-40 text-[#2C1E18] flex items-center justify-center active:scale-95 transition-all"
                              aria-label={`Diminuir ${item.nome}`}
                            >
                              <Minus className="w-5 h-5 stroke-[2]" />
                            </button>

                            <div className="w-14 flex flex-col items-center justify-center px-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditandoId(editandoId === item.id ? null : item.id);
                                  setValorDigitado(formatarNumero(item.saldoVitrine));
                                }}
                                className="flex flex-col items-center justify-center focus:outline-none group"
                                title="Toque para digitar ou usar atalhos 10 / 30"
                              >
                                <span
                                  className={`font-bold text-[22px] leading-none tabular-nums tracking-tight group-hover:underline ${
                                    estaZerado
                                      ? 'text-[#B84A27]'
                                      : item.saldoVitrine > item.minimo
                                      ? 'text-[#52825D]'
                                      : 'text-[#2C1E18]'
                                  }`}
                                >
                                  {formatarNumero(item.saldoVitrine)}
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
                                incrementarComCliqueTriplo(item.id, item.passo, (delta) =>
                                  alterarQtdVitrine(item.id, delta)
                                )
                              }
                              className="w-11 h-11 rounded-[15px] bg-[#BC9E84] hover:bg-[#B09074] text-[#2C1E18] flex items-center justify-center active:scale-95 transition-all"
                              title="Clique 3x rápido para adicionar +10"
                              aria-label={`Aumentar ${item.nome}`}
                            >
                              <Plus className="w-5 h-5 stroke-[2]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gaveta Rápida de Edição Manual (10, 30, 50, +10, +30) */}
                    {editandoId === item.id && (
                      <div className="mt-3 pt-3 border-t border-[#EFE6DD] bg-[#FAF6F2] -mx-3.5 -mb-3.5 p-3.5 rounded-b-[22px] space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-[#4A3228]">
                            Definir Saldo da Vitrine (Valida variações bruscas):
                          </span>
                          <button
                            type="button"
                            onClick={() => setEditandoId(null)}
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
                                aplicarNovoSaldoVitrinePuro(item.id, valorDigitado);
                                setEditandoId(null);
                              }
                            }}
                            className="w-20 bg-white border border-[#4A3228] rounded-xl px-2.5 py-1.5 font-bold text-sm text-center"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              aplicarNovoSaldoVitrinePuro(item.id, valorDigitado);
                              setEditandoId(null);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#362218] text-white text-xs font-bold"
                          >
                            Aplicar
                          </button>

                          <div className="flex items-center gap-1 ml-auto">
                            {[
                              { label: '=10', acao: () => aplicarNovoSaldoVitrinePuro(item.id, 10) },
                              { label: '=30', acao: () => aplicarNovoSaldoVitrinePuro(item.id, 30) },
                              { label: '=50', acao: () => aplicarNovoSaldoVitrinePuro(item.id, 50) },
                              { label: '+10', acao: () => alterarQtdVitrine(item.id, 10) },
                              { label: '+30', acao: () => alterarQtdVitrine(item.id, 30) },
                            ].map((atalho) => (
                              <button
                                key={atalho.label}
                                type="button"
                                onClick={() => atalho.acao()}
                                className="px-2 py-1.5 rounded-lg bg-[#E9DFD5] hover:bg-[#D8C7B6] text-[#2C1E18] font-bold text-xs"
                              >
                                {atalho.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Barra Inferior do Card com Prevenção de Comandas/Tarefas Duplicadas */}
                    <div className="mt-2.5 pt-2 border-t border-[#F4ECE3] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => solicitarOuReforcarItem(item)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                          ehCozinha
                            ? comandaAtivaId
                              ? 'bg-[#E6F0E8] text-[#2F5938] border border-[#C5DEC9]'
                              : 'bg-[#FDF0EB] hover:bg-[#F9DEC9] text-[#B84A27]'
                            : tarefaAtivaId
                            ? 'bg-[#E6F0E8] text-[#2F5938] border border-[#C5DEC9]'
                            : 'bg-[#E6EEF2] hover:bg-[#D2E2EC] text-[#264E63]'
                        }`}
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
                            Pedir do Depósito ({formatarNumero(item.saldoDeposito)} disp.)
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => alterarQtdVitrine(item.id, 10)}
                          className="text-[11px] font-bold text-[#4A3228] bg-[#F3EAE0] hover:bg-[#E5D7C8] px-2 py-1 rounded-lg"
                        >
                          +10
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setErroPerda('');
                            setModalPerdaProduto(item);
                            setQtdPerdaInput(String(Math.min(item.passo, item.saldoVitrine)));
                            setMotivoPerdaInput('Vencido');
                          }}
                          className="text-[11px] font-semibold text-[#7A685F] hover:text-[#9E4224] px-2 py-1 rounded-lg hover:bg-[#F5E1DA]/50 transition-colors"
                        >
                          Perda/Quebra
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ====================================================================
            MÓDULO 2: COZINHA & IMPRESSORA TÉRMICA 80mm (Com Modo Demo + Print Real)
           ==================================================================== */}
        {telaAtual === 'cozinha' && (
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#C86D51]">
                <Flame className="w-3.5 h-3.5" />
                Setor de Produção · Impressora Térmica 80mm
              </span>
              <h1 className="font-serif-display text-[28px] font-bold text-[#3B2316] leading-tight">
                Comandas da Cozinha
              </h1>
            </div>

            <BannerModoDemo
              titulo="Impressora Térmica ESC/POS 80mm"
              descricao="Sem hardware USB ligado. Os tickets abaixo simulam a bobina térmica e o botão 'Imprimir 80mm' abre a janela nativa de impressão formatada."
            />

            {comandasCozinha.length === 0 ? (
              <div className="bg-[#FFFDFB] rounded-[26px] p-8 text-center border border-[#EBE0D6]">
                <CheckCircle2 className="w-12 h-12 text-[#4B7A56] mx-auto mb-2" />
                <h3 className="font-serif-display font-bold text-lg text-[#2C1E18]">
                  Nenhuma comanda pendente no forno!
                </h3>
                <p className="text-xs text-[#7A685F] mt-1">
                  Todas as fornadas solicitadas pela vitrine já foram entregues e registadas no Ledger.
                </p>
              </div>
            ) : (
              <div id="area-impressao-80mm" className="space-y-4">
                {comandasCozinha.map((comanda) => (
                  <div
                    key={comanda.id}
                    className="bg-[#FFFDF9] rounded-2xl border-2 border-[#D8C8B8] shadow-md overflow-hidden font-mono"
                  >
                    <div className="bg-[#362218] text-[#FFFDFB] px-4 py-2.5 flex items-center justify-between font-sans">
                      <div className="flex items-center gap-2">
                        <Printer className="w-4 h-4 text-[#F5D6B8]" />
                        <span className="font-bold text-xs tracking-wide">
                          COMANDA #{comanda.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="text-[10px] font-bold bg-[#5A3E2E] hover:bg-[#72503D] text-white px-2 py-0.5 rounded-md"
                        >
                          Imprimir 80mm
                        </button>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            comanda.prioridade === 'urgente'
                              ? 'bg-[#C85A32] text-white'
                              : 'bg-[#5A3E2E] text-[#F5D6B8]'
                          }`}
                        >
                          {comanda.prioridade === 'urgente' ? '🔥 URGENTE' : 'NORMAL'}
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
                        {comanda.itens.map((it, idx) => {
                          const Icone = MAPA_ICONES[it.iconeKey]?.Componente || IconPaoFrances;
                          return (
                            <div
                              key={idx}
                              className="flex items-center justify-between bg-[#F6EFE9] p-2.5 rounded-xl font-sans border border-[#E5D8CB]"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-[#FFFDFB] text-[#4A3228] flex items-center justify-center border border-[#E2D5C8]">
                                  <Icone className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="font-bold text-sm text-[#2C1E18]">{it.nome}</p>
                                  <span className="text-[10.5px] text-[#6E5A4F]">{it.setor}</span>
                                </div>
                              </div>
                              <span className="text-base font-bold text-[#9C441B] bg-[#F8E2C8] px-2.5 py-1 rounded-lg">
                                +{formatarNumero(it.qtdSolicitada)} {it.unidade}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-2 border-t border-dashed border-[#C7B6A6] font-sans flex items-center gap-2">
                        {comanda.status === 'fila' ? (
                          <button
                            type="button"
                            onClick={() => {
                              setComandasCozinha((prev) =>
                                prev.map((c) =>
                                  c.id === comanda.id ? { ...c, status: 'produzindo' } : c
                                )
                              );
                              dispararToast(`🔥 Comanda #${comanda.id} entrou no forno!`);
                            }}
                            className="flex-1 py-2.5 rounded-xl bg-[#C86D51] text-white font-bold text-xs flex items-center justify-center gap-1.5"
                          >
                            <Flame className="w-4 h-4" />
                            Iniciar Fornada
                          </button>
                        ) : (
                          <span className="px-3 py-2 rounded-xl bg-[#FDF3EB] text-[#9C441B] font-bold text-xs border border-[#EED0AE] flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 animate-bounce" />
                            No Forno
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => concluirComandaCozinhaPura(comanda)}
                          className="flex-1 py-2.5 rounded-xl bg-[#2F5938] hover:bg-[#23452B] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Check className="w-4 h-4" />
                          Pronto · Somar na Vitrine
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ====================================================================
            MÓDULO 3: GUIA DE ABASTECIMENTO (Transfere do Saldo Depósito ➔ Saldo Vitrine)
           ==================================================================== */}
        {telaAtual === 'abastecimento-insumos' && (
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#264E63]">
                <Snowflake className="w-3.5 h-3.5" />
                Transferência Controlada: Depósito ➔ Vitrine
              </span>
              <h1 className="font-serif-display text-[28px] font-bold text-[#3B2316] leading-tight">
                Abastecimento de Frios & Bebidas
              </h1>
              <p className="text-xs text-[#6E5A4F]">
                Cada confirmação desconta do <strong>Saldo do Depósito</strong> e soma no <strong>Saldo da Vitrine</strong>, bloqueando transferências acima do stock disponível no depósito.
              </p>
            </div>

            {faltantesInsumos.length > 0 && (
              <button
                type="button"
                onClick={sincronizarGuiaInsumosSemSobrescrever}
                className="w-full py-2.5 rounded-2xl bg-[#E6EEF2] text-[#264E63] border border-[#C2D7E2] font-bold text-xs flex items-center justify-center gap-2"
              >
                <Snowflake className="w-4 h-4" />
                Adicionar insumos abaixo do mínimo sem apagar ajustes atuais
              </button>
            )}

            {tarefasInsumos.length === 0 ? (
              <div className="bg-[#FFFDFB] rounded-[26px] p-8 text-center border border-[#EBE0D6]">
                <CheckCircle2 className="w-12 h-12 text-[#4B7A56] mx-auto mb-2" />
                <h3 className="font-serif-display font-bold text-lg text-[#2C1E18]">
                  Nenhuma transferência pendente!
                </h3>
                <p className="text-xs text-[#7A685F] mt-1">
                  Todos os insumos refrigerados da vitrine foram abastecidos.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {tarefasInsumos.map((tarefa) => {
                  const IconeVetorial = MAPA_ICONES[tarefa.iconeKey]?.Componente || IconRefrigerante;
                  const prodReal = produtos.find((p) => p.id === tarefa.produtoId);
                  const saldoVitrineAtual = prodReal ? prodReal.saldoVitrine : 0;
                  const saldoDepositoAtual = prodReal ? prodReal.saldoDeposito : 0;
                  const semEstoqueDeposito = tarefa.qtdAbastecer > saldoDepositoAtual;

                  return (
                    <div
                      key={tarefa.id}
                      className="bg-[#FFFDFB] rounded-[22px] p-4 border border-[#EBE0D6] shadow-2xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#E6EEF2] text-[#264E63] flex items-center justify-center shrink-0">
                            <IconeVetorial className="w-7 h-7" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#264E63] bg-[#E6EEF2] px-2 py-0.5 rounded-md">
                              {tarefa.setor}
                            </span>
                            <h3 className="font-serif-display font-bold text-base text-[#2C1E18] mt-1">
                              {tarefa.nome}
                            </h3>
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

                        {tarefa.prioridade === 'urgente' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F5E1DA] text-[#9E4224]">
                            Prioridade
                          </span>
                        )}
                      </div>

                      {semEstoqueDeposito && (
                        <div className="bg-[#F5E1DA] text-[#8C2D19] px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between">
                          <span>
                            ⚠️ Saldo insuficiente no Depósito ({formatarNumero(saldoDepositoAtual)} disp.).
                          </span>
                          <button
                            type="button"
                            onClick={() => setTelaAtual('nota-fiscal')}
                            className="underline font-bold ml-2"
                          >
                            Lançar Nota
                          </button>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-1.5 bg-[#F5EFEA] p-1 rounded-xl border border-[#E2D5C8]">
                          <button
                            type="button"
                            onClick={() =>
                              setTarefasInsumos((prev) =>
                                prev.map((t) =>
                                  t.id === tarefa.id
                                    ? { ...t, qtdAbastecer: Math.max(1, t.qtdAbastecer - 1) }
                                    : t
                                )
                              )
                            }
                            className="w-8 h-8 rounded-lg bg-[#BC9E84] text-[#2C1E18] flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={tarefa.qtdAbastecer}
                            onChange={(e) =>
                              setTarefasInsumos((prev) =>
                                prev.map((t) =>
                                  t.id === tarefa.id
                                    ? { ...t, qtdAbastecer: Math.max(0, parseFloat(e.target.value) || 0) }
                                    : t
                                )
                              )
                            }
                            className="w-12 text-center font-bold text-sm bg-transparent focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              incrementarComCliqueTriplo(`ins-${tarefa.id}`, 1, (delta) =>
                                setTarefasInsumos((prev) =>
                                  prev.map((t) =>
                                    t.id === tarefa.id
                                      ? { ...t, qtdAbastecer: t.qtdAbastecer + delta }
                                      : t
                                  )
                                )
                              )
                            }
                            className="w-8 h-8 rounded-lg bg-[#BC9E84] text-[#2C1E18] flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          disabled={semEstoqueDeposito}
                          onClick={() => confirmarTransferenciaDepositoParaVitrine(tarefa)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-[#264E63] hover:bg-[#1D3B4B] disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs"
                        >
                          <Check className="w-4 h-4" />
                          Transferir p/ Vitrine
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ====================================================================
            MÓDULO 4: NOTA FISCAL DE PRODUTOS (Soma no saldoDeposito + Idempotência + RBAC)
           ==================================================================== */}
        {telaAtual === 'nota-fiscal' && (
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#2F5938]">
                <Warehouse className="w-3.5 h-3.5" />
                Entrada Exclusiva no Saldo do Depósito · Chave Única
              </span>
              <h1 className="font-serif-display text-[28px] font-bold text-[#3B2316] leading-tight">
                Recebimento de Nota Fiscal
              </h1>
              <p className="text-xs text-[#6E5A4F]">
                Converte fardos e peças automaticamente e soma no <strong>Saldo do Depósito</strong>. Bloqueia confirmação duplicada da mesma nota.
              </p>
            </div>

            <BannerModoDemo
              titulo="Leitura Ótica de Nota Fiscal (OCR IA)"
              descricao="A câmara simula a extração automática de dados da NF-e. Alterne entre as notas de teste abaixo para verificar a trava contra confirmação duplicada."
            />

            {/* Aviso de Permissão RBAC caso seja a Clara (Vitrine) */}
            {!perfilAtivo.permissoes.lancarNotaFiscal && (
              <div className="bg-[#F5E1DA] border border-[#E2B8AA] rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs text-[#8C2D19]">
                <div className="flex items-center gap-2.5">
                  <Lock className="w-5 h-5 shrink-0" />
                  <span>
                    <strong>Perfil Restrito ({perfilAtivo.nome}):</strong> Operadores de vitrine podem consultar a nota, mas apenas <strong>Compras/Estoque (Mateus)</strong> ou <strong>Proprietário (Seu Antônio)</strong> podem confirmar a entrada no Depósito.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const mateus = PERFIS_RBAC.find((p) => p.id === 'estoque');
                    if (mateus) {
                      setPerfilAtivo(mateus);
                      dispararToast('Perfil alternado para Mateus Rocha (Compras/Estoque)!');
                    }
                  }}
                  className="shrink-0 bg-[#8C2D19] text-white font-bold px-3 py-1.5 rounded-xl"
                >
                  Trocar p/ Mateus
                </button>
              </div>
            )}

            {/* Seletor de Notas Fiscais para Testar Idempotência */}
            <div className="bg-[#2C1E18] rounded-[24px] p-4 text-white border border-[#4A3228] shadow-md space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-[#F5D6B8]" />
                  <span className="text-xs font-bold text-[#F5D6B8]">Chave da Nota Fiscal:</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {Object.keys(LOTES_NOTAS_EXEMPLO).map((chave) => {
                    const jaFoi = notasProcessadasIds.includes(chave);
                    return (
                      <button
                        key={chave}
                        type="button"
                        onClick={() => {
                          setChaveNotaSelecionada(chave);
                          setFornecedorNotaOCR(LOTES_NOTAS_EXEMPLO[chave].fornecedor);
                          setItensNotaOCR(LOTES_NOTAS_EXEMPLO[chave].itens);
                        }}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 ${
                          chaveNotaSelecionada === chave
                            ? 'bg-[#C86D51] text-white'
                            : 'bg-[#4A3228] text-[#D9C8BC]'
                        }`}
                      >
                        {chave}
                        {jaFoi && <Check className="w-3 h-3 text-[#86EFAC]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#4A3228]">
                <span className="text-[#D9C8BC] truncate">{fornecedorNotaOCR}</span>
                <button
                  type="button"
                  onClick={() => {
                    setScanningNota(true);
                    setTimeout(() => {
                      setScanningNota(false);
                      dispararToast(`✨ Simulação OCR concluída para ${chaveNotaSelecionada}!`);
                    }, 500);
                  }}
                  className="bg-[#4A3228] hover:bg-[#5E4033] text-[#F5D6B8] px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 shrink-0"
                >
                  <Camera className="w-3.5 h-3.5" />
                  {scanningNota ? 'A ler OCR...' : 'Simular Leitura OCR'}
                </button>
              </div>
            </div>

            {/* Lista de Itens da Nota Fiscal */}
            <div className="space-y-3">
              {itensNotaOCR.map((item) => {
                const Icone = MAPA_ICONES[item.iconeKey]?.Componente || IconRefrigerante;
                const totalConvertido = item.qtdEmbalagens * item.fatorConversao;
                const prodAtual = produtos.find((p) => p.id === item.produtoId);

                return (
                  <div
                    key={item.id}
                    className="bg-[#FFFDFB] rounded-[22px] p-4 border border-[#EBE0D6] shadow-2xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-[#F3EAE0] text-[#4A3228] flex items-center justify-center shrink-0">
                          <Icone className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#E6F0E8] text-[#2F5938] px-2 py-0.5 rounded-full">
                            OCR Demo: {item.confiancaIA}
                          </span>
                          <h3 className="font-serif-display font-bold text-sm text-[#2C1E18] mt-0.5">
                            {item.descricaoNota}
                          </h3>
                          <span className="text-[11px] text-[#6E5A4F]">
                            Saldo atual no Depósito: <strong>{formatarNumero(prodAtual?.saldoDeposito || 0)} {item.unidadeVitrine}</strong>
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
                      <span className="text-xs text-[#6E5A4F]">
                        Qtd. de {item.tipoEmbalagem} recebidos:
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={notaAtualJaProcessada}
                          onClick={() =>
                            setItensNotaOCR((prev) =>
                              prev.map((n) =>
                                n.id === item.id
                                  ? { ...n, qtdEmbalagens: Math.max(0, n.qtdEmbalagens - 1) }
                                  : n
                              )
                            )
                          }
                          className="w-9 h-9 rounded-xl bg-[#BC9E84] disabled:opacity-40 text-[#2C1E18] flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-9 text-center font-bold text-base">
                          {item.qtdEmbalagens}
                        </span>
                        <button
                          type="button"
                          disabled={notaAtualJaProcessada}
                          onClick={() =>
                            incrementarComCliqueTriplo(`nf-${item.id}`, 1, (delta) =>
                              setItensNotaOCR((prev) =>
                                prev.map((n) =>
                                  n.id === item.id
                                    ? { ...n, qtdEmbalagens: n.qtdEmbalagens + delta }
                                    : n
                                )
                              )
                            )
                          }
                          className="w-9 h-9 rounded-xl bg-[#BC9E84] disabled:opacity-40 text-[#2C1E18] flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Botão com Trava de Idempotência e RBAC */}
            <button
              type="button"
              disabled={notaAtualJaProcessada || !perfilAtivo.permissoes.lancarNotaFiscal}
              onClick={confirmarEntradaNotaNoDepositoPuro}
              className={`w-full py-3.5 rounded-[24px] font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all ${
                notaAtualJaProcessada
                  ? 'bg-[#E6F0E8] text-[#2F5938] border border-[#C5DEC9] cursor-not-allowed'
                  : !perfilAtivo.permissoes.lancarNotaFiscal
                  ? 'bg-[#D8C8B8] text-[#6E5A4F] cursor-not-allowed'
                  : 'bg-[#362218] hover:bg-[#2A1A12] text-white'
              }`}
            >
              {notaAtualJaProcessada ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Nota {chaveNotaSelecionada} Já Processada no Depósito (Idempotente)
                </>
              ) : !perfilAtivo.permissoes.lancarNotaFiscal ? (
                <>
                  <Lock className="w-4 h-4" />
                  Bloqueado para o perfil {perfilAtivo.cargo}
                </>
              ) : (
                <>
                  Confirmar Entrada no Depósito ({chaveNotaSelecionada}
                  {ehProprietario
                    ? ` · ${formatarMoeda(
                        itensNotaOCR.reduce(
                          (acc, i) => acc + i.qtdEmbalagens * i.valorUnitarioEmbalagem,
                          0
                        )
                      )}`
                    : ''}
                  )
                </>
              )}
            </button>
          </div>
        )}

        {/* ====================================================================
            MÓDULO 5: RELATÓRIOS & LIVRO-RAZÃO AUDITÁVEL (Exclusivo do Proprietário)
           ==================================================================== */}
        {ehProprietario && telaAtual === 'relatorios' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#C86D51]">
                  Livro-Razão Imutável (Ledger)
                </p>
                <h1 className="font-serif-display text-[28px] font-bold text-[#3B2316] leading-tight">
                  Auditoria & Relatórios
                </h1>
              </div>

              <button
                type="button"
                onClick={() => abrirPreviewPdfOficial('reposicoes')}
                className="bg-[#362218] hover:bg-[#2A1A12] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-[#F5D6B8]" />
                Gerar PDF Oficial A4
              </button>
            </div>

            {/* Abas do Relatório */}
            <div className="grid grid-cols-4 bg-[#E8DDD2] p-1 rounded-2xl gap-1">
              {[
                { id: 'repostos', label: `Movimentos (${historicoReposicoes.length})` },
                { id: 'perdas', label: `Perdas (${historicoPerdas.length})` },
                { id: 'turnos', label: `Turnos (${historicoTurnos.length})` },
                { id: 'balanco', label: 'Saldos & Caixa' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setAbaRelatorio(tab.id)}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all truncate ${
                    abaRelatorio === tab.id
                      ? 'bg-[#FFFDFB] text-[#2C1E18] shadow-2xs'
                      : 'text-[#6E5A4F]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* SUB-ABA 1: MOVIMENTOS E PRODUTOS REPOSTOS */}
            {abaRelatorio === 'repostos' && (
              <div className="space-y-3">
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {[
                    { id: 'todos', label: 'Todos os Movimentos' },
                    { id: 'insumos', label: 'Só Insumos (Frios/Bebidas)' },
                    { id: 'cozinha', label: 'Só Cozinha (Forno)' },
                    { id: 'notas', label: 'Entradas Nota Fiscal (Depósito)' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFiltroRelatorioRepostos(f.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border whitespace-nowrap ${
                        filtroRelatorioRepostos === f.id
                          ? 'bg-[#362218] text-white border-[#362218]'
                          : 'bg-[#FFFDFB] text-[#5A4940] border-[#E2D5C8]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-2.5">
                  {historicoReposicoes
                    .filter((r) => {
                      if (filtroRelatorioRepostos === 'insumos')
                        return r.categoriaRelatorio.includes('Insumo');
                      if (filtroRelatorioRepostos === 'cozinha')
                        return r.categoriaRelatorio.includes('Produção');
                      if (filtroRelatorioRepostos === 'notas')
                        return r.categoriaRelatorio.includes('Nota Fiscal');
                      return true;
                    })
                    .map((rep) => {
                      const Icone = MAPA_ICONES[rep.iconeKey]?.Componente || IconRefrigerante;
                      return (
                        <div
                          key={rep.id}
                          className="bg-[#FFFDFB] rounded-[20px] p-3.5 border border-[#EBE0D6] space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-10 h-10 rounded-2xl bg-[#F3EAE0] text-[#4A3228] flex items-center justify-center shrink-0">
                                <Icone className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A685F] block truncate">
                                  {rep.categoriaRelatorio} · {rep.origemFluxo}
                                </span>
                                <h4 className="font-serif-display font-bold text-sm text-[#2C1E18] truncate">
                                  {rep.produto}
                                </h4>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="inline-block font-bold text-xs bg-[#E6F0E8] text-[#2F5938] px-2.5 py-1 rounded-xl border border-[#C5DEC9]">
                                {rep.qtdReposta > 0 ? `+${formatarNumero(rep.qtdReposta)}` : formatarNumero(rep.qtdReposta)} {rep.unidade}
                              </span>
                            </div>
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
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* SUB-ABA 2: PERDAS E QUEBRAS */}
            {abaRelatorio === 'perdas' && (
              <div className="space-y-3">
                <div className="bg-[#FDF3EB] border border-[#EED0AE] rounded-[22px] p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#873E1B] block">
                      Impacto Financeiro de Quebras/Perdas
                    </span>
                    <p className="text-[11px] text-[#6E5A4F]">
                      Baixas validadas contra o saldo real da vitrine
                    </p>
                  </div>
                  <span className="font-serif-display font-bold text-xl text-[#9C441B]">
                    {formatarMoeda(historicoPerdas.reduce((acc, p) => acc + p.custoEstimado, 0))}
                  </span>
                </div>

                {historicoPerdas.map((perda) => {
                  const Icone = MAPA_ICONES[perda.iconeKey]?.Componente || IconPaoFrances;
                  return (
                    <div
                      key={perda.id}
                      className="bg-[#FFFDFB] rounded-[20px] p-3.5 border border-[#EBE0D6] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F5E1DA] text-[#9E4224] flex items-center justify-center">
                          <Icone className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#2C1E18]">{perda.produto}</h4>
                          <p className="text-xs text-[#7A685F]">
                            Motivo: <strong>{perda.motivo}</strong> · Vitrine: {formatarNumero(perda.antesVitrine)} ➔ {formatarNumero(perda.depoisVitrine)}
                          </p>
                          <span className="text-[10px] text-[#8C7A70]">
                            Responsável: {perda.responsavel} às {perda.horario}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#9E4224] bg-[#F5E1DA] px-2 py-0.5 rounded-lg">
                          -{formatarNumero(perda.qtd)} {perda.unidade}
                        </span>
                        <span className="block text-[11px] text-[#6E5A4F] mt-0.5">
                          {formatarMoeda(perda.custoEstimado)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SUB-ABA 3: HISTÓRICO FORMAL DE PASSAGENS DE TURNO */}
            {abaRelatorio === 'turnos' && (
              <div className="space-y-3">
                {historicoTurnos.map((t) => (
                  <div
                    key={t.id}
                    className="bg-[#FFFDFB] rounded-[20px] p-4 border border-[#EBE0D6] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-bold uppercase bg-[#E6F0E8] text-[#2F5938] px-2.5 py-0.5 rounded-full">
                        {t.turnoEncerrado} ➔ {t.turnoIniciado}
                      </span>
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

            {/* SUB-ABA 4: SALDOS SEPARADOS (VITRINE vs DEPÓSITO) E CAIXA (Com RBAC) */}
            {abaRelatorio === 'balanco' && (
              <div className="space-y-3">
                <div className="bg-[#FFFDFB] rounded-[22px] p-4 border border-[#EBE0D6] space-y-2.5">
                  <h3 className="font-serif-display font-bold text-base text-[#2C1E18]">
                    Posição de Stock Separada: Vitrine vs. Depósito
                  </h3>
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

                {perfilAtivo.permissoes.verFinanceiroCompleto ? (
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
                  <div className="bg-[#FAF6F2] border border-[#E2D5C8] rounded-2xl p-4 text-xs text-[#6E5A4F] flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-[#C86D51] shrink-0" />
                    <span>
                      Os totalizadores financeiros de faturamento são exclusivos do perfil <strong>Proprietário (Seu Antônio)</strong>.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ====================================================================
            MÓDULO 6: PASSAGEM DE TURNO FORMALIZADA (Grava evento auditável com 2 responsáveis)
           ==================================================================== */}
        {telaAtual === 'passagem-turno' && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C86D51]">
                Registo Auditável de Troca de Equipe
              </span>
              <h1 className="font-serif-display text-[28px] font-bold text-[#3B2316]">
                Passagem de Turno
              </h1>
              <p className="text-xs text-[#6E5A4F]">
                Formalize a entrega do balcão indicando quem entrega, quem assume e o checklist operacional.
              </p>
            </div>

            <div className="bg-[#FFFDFB] rounded-[22px] p-4 border border-[#EBE0D6] space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-[#4A3228] block mb-1">
                    Quem entrega o turno:
                  </label>
                  <select
                    value={responsavelEntregando}
                    onChange={(e) => setResponsavelEntregando(e.target.value)}
                    className="w-full bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-2.5 py-2 text-xs font-bold"
                  >
                    {PERFIS_RBAC.map((p) => (
                      <option key={p.id} value={p.nome}>
                        {p.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#4A3228] block mb-1">
                    Quem assume o turno:
                  </label>
                  <select
                    value={responsavelAssumindo}
                    onChange={(e) => setResponsavelAssumindo(e.target.value)}
                    className="w-full bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-2.5 py-2 text-xs font-bold"
                  >
                    {PERFIS_RBAC.map((p) => (
                      <option key={p.id} value={p.nome}>
                        {p.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F4ECE3] space-y-1.5">
                <h3 className="text-xs font-bold uppercase text-[#4A3228]">
                  Checklist Obrigatório do Turno
                </h3>
                {[
                  { key: 'vitrineConferida', label: 'Saldos da vitrine conferidos e atualizados' },
                  { key: 'friosAbastecidos', label: 'Bandejas de presunto e queijo verificadas' },
                  { key: 'fornoLimpo', label: 'Comandas urgentes comunicadas à cozinha' },
                  { key: 'caixaParcialConferido', label: 'Conferência parcial de caixa realizada' },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center gap-2.5 text-xs font-medium text-[#2C1E18] py-1 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checklistPassagem[item.key]}
                      onChange={(e) =>
                        setChecklistPassagem((prev) => ({
                          ...prev,
                          [item.key]: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 rounded accent-[#362218]"
                    />
                    {item.label}
                  </label>
                ))}
              </div>

              <textarea
                rows={2}
                value={obsPassagemTurno}
                onChange={(e) => setObsPassagemTurno(e.target.value)}
                className="w-full bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl p-2.5 text-xs"
                placeholder="Observações para o próximo turno..."
              />

              <button
                type="button"
                onClick={() => {
                  if (responsavelEntregando === responsavelAssumindo) {
                    dispararToast(
                      'Selecione colaboradores diferentes para quem entrega e quem assume o turno.',
                      'erro'
                    );
                    return;
                  }
                  const proximoTurno = turnoAtual.includes('Manhã')
                    ? 'Tarde (14h às 22h)'
                    : 'Manhã (06h às 14h)';

                  const novoEventoTurno = {
                    id: gerarIdUnico('turno'),
                    idempotencyKey: gerarIdUnico('ledger-shift'),
                    criadoEmISO: new Date().toISOString(),
                    horario: `Hoje · ${horarioAgora()}`,
                    turnoEncerrado: turnoAtual,
                    turnoIniciado: proximoTurno,
                    responsavelEntregou: responsavelEntregando,
                    responsavelAssumiu: responsavelAssumindo,
                    checklist: { ...checklistPassagem },
                    pendenciasSnapshot: `${comandasCozinha.length} comandas no forno · ${tarefasInsumos.length} insumos na guia`,
                    observacao: obsPassagemTurno.trim() || 'Passagem realizada sem ressalvas.',
                  };

                  setHistoricoTurnos((prev) => [novoEventoTurno, ...prev]);
                  setTurnoAtual(proximoTurno);
                  dispararToast(
                    `✅ Passagem de turno registada com sucesso! Turno ativo: ${proximoTurno}`
                  );
                  if (ehProprietario) {
                    setTelaAtual('relatorios');
                    setAbaRelatorio('turnos');
                  } else {
                    setTelaAtual('conferencia');
                  }
                }}
                className="w-full py-3 rounded-xl bg-[#362218] text-white font-bold text-xs"
              >
                Registar Passagem de Turno
              </button>
            </div>
          </div>
        )}

        {/* ====================================================================
            MÓDULO 7: CATÁLOGO DA VITRINE & DEPÓSITO (Com Busca Real, RBAC e Custos Ocultos p/ Funcionários)
           ==================================================================== */}
        {telaAtual === 'catalogo' && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C86D51]">
                {ehProprietario
                  ? 'Gestão de Produtos, Unidades, Passo e Custos'
                  : 'Gestão Operacional de Produtos, Unidades e Passo'}
              </span>
              <h1 className="font-serif-display text-[26px] font-bold text-[#3B2316]">
                Catálogo & Stock Inicial
              </h1>
            </div>

            {!perfilAtivo.permissoes.gerirCatalogoCustos && (
              <div className="bg-[#F5E1DA] border border-[#E2B8AA] rounded-2xl p-3 text-xs text-[#8C2D19] flex items-center gap-2">
                <Lock className="w-4 h-4 shrink-0" />
                <span>
                  O perfil <strong>{perfilAtivo.cargo}</strong> está em modo de leitura no catálogo. Alterne para Mateus ou Seu Antônio no topo para criar/editar produtos.
                </span>
              </div>
            )}

            {/* Formulário Validado de Cadastro / Edição */}
            <div className="bg-[#FFFDFB] rounded-[24px] p-4 border border-[#EBE0D6] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-display font-bold text-base text-[#2C1E18]">
                  {produtoEditando ? `Editando: ${produtoEditando.nome}` : 'Novo Produto no Catálogo'}
                </h3>
                {produtoEditando && (
                  <button
                    type="button"
                    onClick={() => {
                      setProdutoEditando(null);
                      setErroCatalogo('');
                    }}
                    className="text-xs text-[#7A685F] underline"
                  >
                    Cancelar edição
                  </button>
                )}
              </div>

              {erroCatalogo && (
                <div className="bg-[#F5E1DA] text-[#8C2D19] px-3 py-2 rounded-xl text-xs font-bold">
                  ⚠️ {erroCatalogo}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Nome obrigatório (mín. 2 letras)"
                  value={formProduto.nome}
                  onChange={(e) => setFormProduto({ ...formProduto, nome: e.target.value })}
                  className="col-span-2 bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-3 py-2 text-xs font-semibold"
                />

                <select
                  value={formProduto.tipoFluxo}
                  onChange={(e) =>
                    setFormProduto({
                      ...formProduto,
                      tipoFluxo: e.target.value,
                      setor:
                        e.target.value === 'cozinha'
                          ? 'Forno Principal'
                          : 'Depósito / Geladeira Frente',
                    })
                  }
                  className="bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  <option value="cozinha">🔥 Produção Cozinha</option>
                  <option value="insumo">❄️ Insumo (Depósito/Vitrine)</option>
                </select>

                <select
                  value={formProduto.unidade}
                  onChange={(e) => setFormProduto({ ...formProduto, unidade: e.target.value })}
                  className="bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  <option value="unidades">Unidade: unidades</option>
                  <option value="pacotes">Unidade: pacotes</option>
                  <option value="kg">Unidade: kg</option>
                  <option value="bandejas">Unidade: bandejas</option>
                </select>

                <div>
                  <label className="text-[10.5px] text-[#6E5A4F] block">Meta Mín. Vitrine</label>
                  <input
                    type="number"
                    min="0"
                    value={formProduto.minimo}
                    onChange={(e) => setFormProduto({ ...formProduto, minimo: e.target.value })}
                    className="w-full bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-3 py-1.5 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] text-[#6E5A4F] block">Passo (+ / -)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.1"
                    value={formProduto.passo}
                    onChange={(e) => setFormProduto({ ...formProduto, passo: e.target.value })}
                    className="w-full bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-3 py-1.5 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] text-[#6E5A4F] block">Saldo Vitrine</label>
                  <input
                    type="number"
                    min="0"
                    value={formProduto.saldoVitrine}
                    onChange={(e) =>
                      setFormProduto({ ...formProduto, saldoVitrine: e.target.value })
                    }
                    className="w-full bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-3 py-1.5 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] text-[#6E5A4F] block">Saldo Depósito</label>
                  <input
                    type="number"
                    min="0"
                    value={formProduto.saldoDeposito}
                    onChange={(e) =>
                      setFormProduto({ ...formProduto, saldoDeposito: e.target.value })
                    }
                    className="w-full bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-3 py-1.5 text-xs font-bold"
                  />
                </div>

                {ehProprietario && (
                  <div>
                    <label className="text-[10.5px] text-[#6E5A4F] block">Custo Unit. (R$)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={formProduto.custoUnitario}
                      onChange={(e) =>
                        setFormProduto({ ...formProduto, custoUnitario: e.target.value })
                      }
                      className="w-full bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-3 py-1.5 text-xs font-bold"
                    />
                  </div>
                )}

                <div className={ehProprietario ? '' : 'col-span-2'}>
                  <label className="text-[10.5px] text-[#6E5A4F] block">Ícone Vetorial</label>
                  <select
                    value={formProduto.iconeKey}
                    onChange={(e) => setFormProduto({ ...formProduto, iconeKey: e.target.value })}
                    className="w-full bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-2.5 py-1.5 text-xs"
                  >
                    {Object.entries(MAPA_ICONES).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="button"
                disabled={!perfilAtivo.permissoes.gerirCatalogoCustos}
                onClick={() => {
                  setErroCatalogo('');
                  const nomeLimpo = String(formProduto.nome || '').trim();
                  const minNum = Number(formProduto.minimo);
                  const vitrineNum = Number(formProduto.saldoVitrine);
                  const depositoNum = Number(formProduto.saldoDeposito);
                  const passoNum = Number(formProduto.passo);
                  const custoNum = Number(formProduto.custoUnitario);

                  if (nomeLimpo.length < 2) {
                    setErroCatalogo('O nome do produto deve ter pelo menos 2 caracteres.');
                    return;
                  }
                  if (Number.isNaN(minNum) || minNum < 0) {
                    setErroCatalogo('A meta mínima deve ser um valor maior ou igual a zero.');
                    return;
                  }
                  if (Number.isNaN(vitrineNum) || vitrineNum < 0 || Number.isNaN(depositoNum) || depositoNum < 0) {
                    setErroCatalogo('Os saldos de Vitrine e Depósito não podem ser negativos.');
                    return;
                  }
                  if (Number.isNaN(passoNum) || passoNum <= 0) {
                    setErroCatalogo('O passo de incremento deve ser maior que zero.');
                    return;
                  }
                  if (Number.isNaN(custoNum) || custoNum < 0) {
                    setErroCatalogo('O custo unitário deve ser maior ou igual a zero.');
                    return;
                  }

                  const payloadValidado = {
                    ...formProduto,
                    nome: nomeLimpo,
                    minimo: minNum,
                    saldoVitrine: vitrineNum,
                    saldoDeposito: depositoNum,
                    passo: passoNum,
                    custoUnitario: custoNum,
                  };

                  if (produtoEditando) {
                    setProdutos((prev) =>
                      prev.map((p) =>
                        p.id === produtoEditando.id ? { ...p, ...payloadValidado } : p
                      )
                    );
                    setProdutoEditando(null);
                    dispararToast('✅ Produto validado e atualizado no catálogo!');
                  } else {
                    setProdutos((prev) => [
                      ...prev,
                      {
                        id: gerarIdUnico('prod'),
                        ...payloadValidado,
                        corFundoIcone:
                          payloadValidado.tipoFluxo === 'cozinha'
                            ? 'bg-[#F3EAE0]'
                            : 'bg-[#E6EEF2]',
                      },
                    ]);
                    dispararToast('✅ Novo produto validado e adicionado!');
                  }
                  setFormProduto({ ...formProduto, nome: '' });
                }}
                className="w-full py-2.5 rounded-xl bg-[#362218] disabled:opacity-40 text-white font-bold text-xs"
              >
                {produtoEditando ? 'Salvar Alterações Validadas' : 'Cadastrar Produto Validado'}
              </button>
            </div>

            {/* Campo de Busca Ativo no Catálogo */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#7A685F] absolute left-3.5 top-3" />
              <input
                type="text"
                value={buscaCatalogo}
                onChange={(e) => setBuscaCatalogo(e.target.value)}
                placeholder="Pesquisar produto no catálogo por nome ou setor..."
                className="w-full bg-[#FFFDFB] border border-[#EBE0D6] rounded-2xl pl-9 pr-4 py-2.5 text-xs"
              />
            </div>

            {/* Lista Filtrada do Catálogo */}
            <div className="space-y-2">
              {produtos
                .filter(
                  (p) =>
                    p.nome.toLowerCase().includes(buscaCatalogo.toLowerCase()) ||
                    p.setor.toLowerCase().includes(buscaCatalogo.toLowerCase())
                )
                .map((p) => {
                  const Icone = MAPA_ICONES[p.iconeKey]?.Componente || IconPaoFrances;
                  return (
                    <div
                      key={p.id}
                      className="bg-[#FFFDFB] rounded-2xl p-3 border border-[#EBE0D6] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-10 h-10 rounded-xl ${p.corFundoIcone} flex items-center justify-center text-[#4A3228]`}>
                          <Icone className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#2C1E18]">{p.nome}</h4>
                          <span className="text-[10.5px] text-[#6E5A4F]">
                            Vitrine: <strong>{formatarNumero(p.saldoVitrine)}</strong> · Depósito: <strong>{formatarNumero(p.saldoDeposito)}</strong>
                            {ehProprietario ? ` · Custo: ${formatarMoeda(p.custoUnitario)}` : ''}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={!perfilAtivo.permissoes.gerirCatalogoCustos}
                        onClick={() => {
                          setErroCatalogo('');
                          setProdutoEditando(p);
                          setFormProduto(p);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-[#F5EFEA] disabled:opacity-40 text-xs font-bold text-[#4A3228]"
                      >
                        Editar
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </main>

      {/* ====================================================================
          MODAL 0: GERADOR E PREVIEW DE DOCUMENTO OFICIAL EM PDF (Exclusivo Proprietário)
         ==================================================================== */}
      {ehProprietario && modalPdfAberto && (
        <div className="fixed inset-0 bg-[#1C130E]/75 backdrop-blur-xs flex flex-col items-center justify-start p-3 sm:p-6 z-50 overflow-y-auto">
          {/* Barra de Controle Superior do Visualizador PDF A4 */}
          <div className="w-full max-w-3xl bg-[#2C1E18] text-white rounded-2xl p-3.5 mb-3 flex flex-wrap items-center justify-between gap-2 shadow-xl border border-[#4A3228]">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#F5D6B8]" />
              <div>
                <span className="font-serif-display font-bold text-sm block leading-none">
                  Gerador Oficial de Documento PDF (Formato A4)
                </span>
                <span className="text-[10.5px] text-[#D9C8BC]">
                  Selecione o escopo abaixo e clique em "Imprimir / Salvar PDF A4"
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'executivo', label: '1. Executivo Dono' },
                { id: 'balanco', label: '2. Estoque Físico-Fin.' },
                { id: 'reposicoes', label: '3. Reposições & Perdas' },
                { id: 'turno', label: '4. Passagem Turno' },
              ].map((op) => (
                <button
                  key={op.id}
                  type="button"
                  onClick={() => setEscopoPdf(op.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    escopoPdf === op.id
                      ? 'bg-[#C86D51] text-white'
                      : 'bg-[#4A3228] text-[#D9C8BC] hover:bg-[#5A3E2E]'
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={acionarImpressaoPdfA4}
                className="px-3 py-1.5 rounded-xl bg-[#2F5938] hover:bg-[#24472B] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                Imprimir / Salvar PDF A4
              </button>
              <button
                type="button"
                onClick={descarregarDocumentoPdfHtml}
                className="px-3 py-1.5 rounded-xl bg-[#F5D6B8] text-[#2C1E18] text-xs font-bold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                Baixar A4
              </button>
              <button
                type="button"
                onClick={() => setModalPdfAberto(false)}
                className="p-1.5 rounded-xl bg-[#4A3228] text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* FOLHA A4 REALISTA TIMBRADA */}
          <div
            id="folha-oficial-pdf-a4"
            className="w-full max-w-3xl bg-white text-[#1C1917] rounded-xl shadow-2xl border border-[#D6CEC2] p-6 sm:p-10 space-y-6 text-xs"
          >
            {/* Cabeçalho Oficial Timbrado */}
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
                <span className="font-bold text-[#2C1E18] block">
                  DOC: #PDF-{escopoPdf.toUpperCase()}-2026
                </span>
                <span>Data: {new Date().toLocaleDateString('pt-BR')} às {horarioAgora()}</span>
                <span className="block text-[#57534E]">Emitido por: {perfilAtivo.nome}</span>
              </div>
            </div>

            {/* Sumário Executivo em Todos os PDFs */}
            <div className="grid grid-cols-4 gap-3 bg-[#FAF6F2] p-3.5 rounded-xl border border-[#E5D8CB]">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#6E5A4F] block">
                  Patrimônio Custo
                </span>
                <strong className="text-sm text-[#2C1E18]">
                  {formatarMoeda(kpisExecutivos.patrimonioTotalCusto)}
                </strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#6E5A4F] block">
                  Venda Potencial Vitrine
                </span>
                <strong className="text-sm text-[#2F5938]">
                  {formatarMoeda(kpisExecutivos.vendaPotencialVitrine)}
                </strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#6E5A4F] block">
                  Margem Bruta Média
                </span>
                <strong className="text-sm text-[#264E63]">
                  {formatarNumero(kpisExecutivos.margemMediaGlobal)}%
                </strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#6E5A4F] block">
                  Quebras / Perdas
                </span>
                <strong className="text-sm text-[#9E4224]">
                  {formatarMoeda(kpisExecutivos.totalPerdasReais)} ({formatarNumero(kpisExecutivos.indiceDesperdicioPct)}%)
                </strong>
              </div>
            </div>

            {/* CONTEÚDO ESPECÍFICO CONFORME ESCOPO DO PDF */}
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
                    {kpisExecutivos.analiseProdutos.map((p, idx) => (
                      <tr
                        key={p.id}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF6F2]'}
                      >
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
                        <td className="py-1.5 px-2.5 text-right font-bold">
                          {formatarMoeda(p.valorPatrimonioTotal)}
                        </td>
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
                      <span>{t.turnoEncerrado} ➔ {t.turnoIniciado}</span>
                      <span>{t.horario}</span>
                    </div>
                    <p>
                      Entregue por: <strong>{t.responsavelEntregou}</strong> · Assumido por: <strong>{t.responsavelAssumiu}</strong>
                    </p>
                    <p className="text-[#57534E]">Observação: "{t.observacao}" ({t.pendenciasSnapshot})</p>
                  </div>
                ))}
              </div>
            )}

            {/* Rodapé Oficial de Assinaturas Físicas */}
            <div className="pt-8 border-t border-[#D8C8B8] grid grid-cols-2 gap-8 text-center text-[11px] text-[#57534E]">
              <div className="pt-6 border-t border-[#2C1E18]">
                <strong className="text-[#2C1E18] block">Seu Antônio (Proprietário / Diretoria)</strong>
                <span>Assinatura de Conferência Executiva</span>
              </div>
              <div className="pt-6 border-t border-[#2C1E18]">
                <strong className="text-[#2C1E18] block">{perfilAtivo.nome} ({perfilAtivo.cargo})</strong>
                <span>Responsável pela Emissão / Turno Atual</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 1: CONFIRMAÇÃO DE VARIAÇÃO BRUSCA (> 5x O MÍNIMO)
         ==================================================================== */}
      {modalVariacaoBrusca && (
        <div className="fixed inset-0 bg-[#2C1E18]/55 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#FFFDFB] w-full max-w-sm rounded-3xl p-5 border border-[#EBE0D6] shadow-2xl space-y-3.5">
            <div className="flex items-center gap-2 text-[#B84A27]">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-serif-display font-bold text-lg text-[#2C1E18]">
                Confirmar Variação Atípica?
              </h3>
            </div>

            <p className="text-xs text-[#6E5A4F] leading-relaxed">
              Está prestes a alterar o saldo de <strong>{modalVariacaoBrusca.produto.nome}</strong> na vitrine de{' '}
              <strong>{formatarNumero(modalVariacaoBrusca.saldoAnterior)}</strong> para{' '}
              <strong>{formatarNumero(modalVariacaoBrusca.novoSaldo)} {modalVariacaoBrusca.produto.unidade}</strong> (variação de{' '}
              {modalVariacaoBrusca.delta > 0 ? `+${modalVariacaoBrusca.delta}` : modalVariacaoBrusca.delta}).
            </p>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setModalVariacaoBrusca(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#EFE6DD] text-[#4A3228] font-bold text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  aplicarNovoSaldoVitrinePuro(
                    modalVariacaoBrusca.produto.id,
                    modalVariacaoBrusca.novoSaldo,
                    true
                  );
                  setModalVariacaoBrusca(null);
                  dispararToast('Variação atípica confirmada e registada no Ledger!');
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#B84A27] text-white font-bold text-xs"
              >
                Sim, Confirmar Saldo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 2: REGISTO DE PERDA / QUEBRA (Bloqueia Perda > Saldo Vitrine)
         ==================================================================== */}
      {modalPerdaProduto && (
        <div className="fixed inset-0 bg-[#2C1E18]/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4 z-50">
          <div className="bg-[#FFFDFB] w-full max-w-sm rounded-3xl p-5 border border-[#EBE0D6] shadow-2xl space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-display font-bold text-lg text-[#2C1E18]">
                Registar Perda / Quebra
              </h3>
              <button
                type="button"
                onClick={() => setModalPerdaProduto(null)}
                className="p-1 text-[#7A685F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#6E5A4F]">
              Produto: <strong>{modalPerdaProduto.nome}</strong> · Saldo disponível na vitrine:{' '}
              <strong className="text-[#2F5938]">
                {formatarNumero(modalPerdaProduto.saldoVitrine)} {modalPerdaProduto.unidade}
              </strong>
            </p>

            {erroPerda && (
              <div className="bg-[#F5E1DA] text-[#8C2D19] p-2.5 rounded-xl text-xs font-bold">
                {erroPerda}
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-[#4A3228] block mb-1">
                Quantidade perdida ({modalPerdaProduto.unidade} · máx {formatarNumero(modalPerdaProduto.saldoVitrine)})
              </label>
              <input
                type="number"
                step={modalPerdaProduto.passo}
                max={modalPerdaProduto.saldoVitrine}
                min="0"
                value={qtdPerdaInput}
                onChange={(e) => {
                  setErroPerda('');
                  setQtdPerdaInput(e.target.value);
                }}
                className="w-full bg-[#FAF6F2] border border-[#E2D5C8] rounded-xl px-3 py-2 font-bold text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#4A3228] block mb-1.5">
                Motivo da baixa:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {['Vencido', 'Queimado / Avaria', 'Amassado na Vitrine', 'Consumo Interno'].map(
                  (mot) => (
                    <button
                      key={mot}
                      type="button"
                      onClick={() => setMotivoPerdaInput(mot)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold border ${
                        motivoPerdaInput === mot
                          ? 'bg-[#9E4224] text-white border-[#9E4224]'
                          : 'bg-[#FAF6F2] text-[#5A4940] border-[#E2D5C8]'
                      }`}
                    >
                      {mot}
                    </button>
                  )
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={confirmarRegistroPerdaValidado}
              className="w-full py-3 rounded-xl bg-[#362218] text-white font-bold text-xs"
            >
              Confirmar Baixa Auditada
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          BARRA DE NAVEGAÇÃO INFERIOR (4 Abas para Funcionários · 6 Abas para o Dono)
         ==================================================================== */}
      <nav className="fixed bottom-0 inset-x-0 bg-[#FFFDFB]/95 backdrop-blur-md border-t border-[#E6D9CE] px-1.5 py-1.5 z-30">
        <div
          className={`max-w-md mx-auto grid ${
            ehProprietario ? 'grid-cols-6' : 'grid-cols-4'
          } gap-1`}
        >
          {[
            {
              id: 'conferencia',
              label: 'Conferência',
              Icon: ClipboardCheck,
              badge: todosAbaixoMinimo.length,
              corBadge: 'bg-[#C86D51]',
              apenasDono: false,
            },
            {
              id: 'cozinha',
              label: 'Cozinha 80mm',
              Icon: Flame,
              badge: comandasCozinha.length,
              corBadge: 'bg-[#B84A27]',
              apenasDono: false,
            },
            {
              id: 'abastecimento-insumos',
              label: 'Depósito➔Vitrine',
              Icon: Snowflake,
              badge: tarefasInsumos.length,
              corBadge: 'bg-[#264E63]',
              apenasDono: false,
            },
            {
              id: 'nota-fiscal',
              label: 'Nota Depósito',
              Icon: Receipt,
              badge: 0,
              apenasDono: false,
            },
            {
              id: 'relatorios',
              label: 'Relatórios',
              Icon: PieChart,
              badge: 0,
              apenasDono: true,
            },
            {
              id: 'painel-dono',
              label: 'Dono/PDF',
              Icon: Crown,
              badge: 0,
              apenasDono: true,
            },
          ]
            .filter((aba) => !aba.apenasDono || ehProprietario)
            .map((aba) => {
              const Icon = aba.Icon;
              const ativo = telaAtual === aba.id;
              return (
                <button
                  key={aba.id}
                  type="button"
                  onClick={() => setTelaAtual(aba.id)}
                  className={`flex flex-col items-center justify-center py-1.5 rounded-2xl relative transition-colors ${
                    ativo ? 'text-[#362218] font-bold bg-[#F3EAE0]' : 'text-[#8C7A70] font-medium'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2]" />
                  <span className="text-[9.5px] mt-0.5 truncate max-w-full px-0.5">{aba.label}</span>
                  {aba.badge > 0 && (
                    <span
                      className={`absolute top-1 right-1.5 w-4 h-4 rounded-full ${aba.corBadge} text-white text-[9px] font-bold flex items-center justify-center`}
                    >
                      {aba.badge}
                    </span>
                  )}
                </button>
              );
            })}
        </div>
      </nav>
    </div>
  );
}