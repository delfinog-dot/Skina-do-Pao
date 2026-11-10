# 🥐 Skina do Pão — Sistema Integrado de Gestão, Vitrine e Estoque

Sistema web completo desenvolvido em **React + TypeScript + Tailwind CSS** para a operação diária, controle de estoque em duas camadas (**Depósito vs. Vitrine**), emissão de comandas térmicas para a cozinha e auditoria financeira da padaria **Skina do Pão**.

---

## ✨ Principais Funcionalidades

### 1. 🔐 Controle de Acesso Estrito por Perfil (RBAC)
O sistema conta com tela de login dedicada e **ocultamento real de telas** na barra de navegação de acordo com o cargo do colaborador logado:

| Perfil | Colaborador(a) | Papel | Senha / PIN Padrão | Telas Liberadas | Telas Ocultadas / Restritas |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **Funcionária 1** | **Clara Mendes** | Balcão & Vitrine *(Restrito)* | **`1111`** | **3 Abas**:<br>• Conferência da Vitrine<br>• Cozinha 80mm<br>• Depósito ➔ Vitrine | 🔒 Nota Depósito<br>🔒 Relatórios<br>🔒 Dono/PDF |
| **Estoque & Compras** | **Mateus Rocha** | Depósito & Compras | **`2222`** | **4 Abas**:<br>• Conferência da Vitrine<br>• Cozinha 80mm<br>• Depósito ➔ Vitrine<br>• **Nota Depósito** | 🔒 Relatórios<br>🔒 Dono/PDF |
| **Dona / Proprietária** | **Dona Maria / Seu Antônio** | Diretoria / Admin Total | **`1234`** | **6 Abas (Acesso Total)**:<br>• Todas as telas operacionais<br>• **Relatórios Executivos**<br>• **Painel da Dona / PDF A4** | *(Nenhuma restrição)* |

---

### 2. 🚨 Comandas Urgentes com Alerta Piscando & Impressão Térmica 80mm
- **Notificação Urgente Piscando**: Sempre que um item da cozinha está com prioridade **Urgente** (ex.: vitrine zerada), a aba **Cozinha 80mm** na barra inferior pulsa em vermelho com indicador luminoso (`animate-ping`) e um banner flutuante alerta o operador em qualquer tela do aplicativo.
- **Simulação de Impressora Térmica 80mm (ESC/POS)**:
  - Ao clicar em **"Pedir"** em um item de forno ou **"Pedir Fornada Completa"**, o sistema dispara automaticamente a simulação da impressora térmica da cozinha (**EPSON TM-T20X 80mm**).
  - **Áudio Sintetizado Nativamente**: Através da *Web Audio API*, o navegador emite os dois bipes clássicos de alerta de comanda na cozinha seguidos pelo som mecânico da bobina térmica e corte de guilhotina (sem depender de arquivos de áudio externos).
  - **Comprovante Interativo**: Permite destacar o comprovante, reimprimir com som ou iniciar a fornada diretamente pelo modal.

---

### 3. 📦 Estoque em Duas Camadas (Depósito vs. Vitrine)
- **Separação Física e Contábil**: Notas fiscais de fornecedores abastecem **exclusivamente o Saldo do Depósito**.
- **Transferência Auditada (`Depósito ➔ Vitrine`)**: Frios, laticínios e bebidas saem do depósito para a vitrine com trava matemática (`Quantidade Transferida <= Saldo no Depósito`), evitando saldos negativos.
- **Produção Própria (`Cozinha ➔ Vitrine`)**: Pães, doces e salgados entram na vitrine assim que a cozinha conclui a fornada da comanda.

---

### 4. 🛡️ Prevenção de Erros e Auditoria (Ledger Imutável)
- **Idempotência de Comandas e Notas Fiscais**:
  - Se um pão já possui comanda aberta no forno, clicar em **"Pedir"** novamente apenas **reforça a quantidade** na comanda existente em vez de duplicar pedidos.
  - Notas fiscais possuem chave única (`NF-xxxx`), bloqueando lançamentos duplicados.
- **Atalho de Clique Triplo (`+10`)**: Clicar 3 vezes rapidamente no botão `+` incrementa `+10 unidades` de uma só vez para agilizar a contagem de pães.
- **Trava contra Variação Brusca**: Alterações manuais maiores que 50 unidades exigem confirmação em modal de segurança.
- **Persistência Automática (`LocalStorage`)**: Todas as contagens, comandas, notas, perdas e sangrias ficam salvas no navegador, com botão de **Reset Fábrica** na tela de login para restaurar o estado inicial de demonstração.

---

### 5. 👑 Painel da Dona, Simulador de Margem e PDF Oficial A4
- **Fechamento de Caixa e DRE Diário**: Cálculo em tempo real do Lucro Operacional Líquido (`Vendas - Custos de Insumos - Perdas/Quebras`), ticket médio e sangrias.
- **Simulador de Margem Bruta**: Edição rápida do custo unitário e preço de venda com cálculo instantâneo de markup.
- **Exportação em PDF Oficial A4**: Geração de documento executivo formatado em folha A4 com assinatura e carimbo de auditoria (via impressão nativa ou download de arquivo `.html` auto-imprimível).

---

## 🗂️ Arquitetura do Código

O código principal está organizado em [`skina_do_p_o_sistema_completo.tsx`](./skina_do_p_o_sistema_completo.tsx) dividido em **10 seções modulares**:

1. **Tipos e Interfaces**: Contratos TypeScript (`Produto`, `Perfil`, `Comanda`, `RegistroMovimento`, `NotaFiscal`, etc.).
2. **Constantes e Tokens Visuais**: Paleta de cores artesanal, chaves de armazenamento e configurações de turno.
3. ** Catálogo de Ícones**: Mapeamento centralizado de ícones vetoriais (`lucide-react`).
4. **Dados Iniciais (Seeds)**: Produtos da padaria, perfis RBAC, histórico inicial e notas fiscais de demonstração.
5. **Funções Puras e Utilitários**: Formatação monetária/numérica, cálculos de KPIs financeiros, gerador de CSV e template A4.
6. **Store Central (`useSkinaStore`)**: Gerenciamento de estado unificado, regras de negócio, travas de segurança, persistência em `localStorage` e sintetizador de áudio térmico.
7. **Componentes Base de UI**: `Botao`, `Chip`, `Modal`, `Campo`, `IconeProduto` e `ToastGlobal`.
8. **Telas do Sistema**:
   - `TelaLogin`: Autenticação com sugestão de senhas e resumo de permissões.
   - `BarraSuperior` & `BarraNavegacao`: Navegação adaptativa RBAC e alerta pulsante da cozinha.
   - `AlertaComandaUrgenteFlutuante` & `ModalImpressaoTermica`: Alertas em tempo real e simulação de bobina 80mm.
   - `TelaPainelDono`: Dashboard financeiro, caixa, sangrias e simulador de margem.
   - `TelaConferencia`: Contagem rápida da vitrine e disparo de reposição.
   - `TelaCozinha`: Gestão de fornadas e impressão de tickets de 80mm.
   - `TelaAbastecimentoInsumos`: Transferência controlada `Depósito ➔ Vitrine`.
   - `TelaNotaFiscal`: Entrada de mercadorias no depósito com câmera/scanner simulado.
   - `TelaRelatorios`, `TelaPassagemTurno` e `TelaCatalogo`.
9. **Modais Globais**: `ModalPdfOficial`, `ModalVariacaoBrusca` e `ModalPerdaProduto`.
10. **Roteador e Ponto de Entrada (`App`)**: Proteção de rotas por permissão e provedor de contexto.

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior).

### Opção 1: Inicialização com 1 Clique (Windows)
Dê dois cliques no arquivo **`iniciar_sistema.bat`** na pasta do projeto. Ele instalará as dependências (se necessário) e abrirá o sistema automaticamente no navegador.

### Opção 2: Via Terminal
```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento Vite
npm run dev
```
O sistema estará disponível em `http://localhost:5173`.

---

## 📄 Arquivos Complementares no Repositório
- `skina_do_p_o_sistema_completo.tsx` — Aplicação React completa e modularizada.
- `Diagnóstico Skina do Pão.html` — Documento interativo de diagnóstico operacional.
- `Planta da Skina do Pão.html` — Layout e planta baixa interativa da padaria.
- `Vitrine Skina do Pão.html` — Protótipo visual da vitrine.
- `Design.pdf` — Especificação de design e identidade visual.
