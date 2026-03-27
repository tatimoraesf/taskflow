# PRD - TaskFlow

## 1. Visão Geral
- **Descrição do sistema**: O TaskFlow é uma aplicação web de gerenciamento de tarefas pessoal, projetada para ser simples, rápida e eficiente.
- **Objetivo do produto**: Permitir que usuários organizem suas atividades diárias, definam prioridades e acompanhem o progresso de suas tarefas de forma visual.
- **Público-alvo**: Profissionais, estudantes e qualquer pessoa que precise de uma ferramenta leve para organização de tarefas diárias sem a complexidade de sistemas empresariais pesados.

## 2. Funcionalidades Principais
- **Criação de Tarefas**: Adição de novas tarefas com título, descrição opcional e nível de prioridade.
- **Lista de Tarefas Dinâmica**: Exibição clara das tarefas cadastradas, com separação visual entre tarefas pendentes e concluídas.
- **Gerenciamento de Status**: Marcação de tarefas como concluídas ou pendentes através de checkboxes.
- **Edição de Tarefas**: Alteração de informações de tarefas já existentes por meio de uma interface modal.
- **Exclusão de Tarefas**: Remoção definitiva de tarefas com mecanismo de segurança (confirmação).
- **Busca em Tempo Real**: Filtro de tarefas pelo título para localização rápida.
- **Indicador de Progresso**: Barra visual que mostra a porcentagem de conclusão das tarefas do dia/lista.
- **Persistência Local**: Armazenamento automático dos dados no navegador, garantindo que as informações não sejam perdidas ao fechar a aba ou atualizar a página.

## 3. Jornadas do Usuário

### Fluxos Principais
- **Criar uma Tarefa**: No formulário superior, o usuário digita o título, seleciona a prioridade (Baixa, Média, Alta), adiciona uma descrição se desejar e clica em "Adicionar Tarefa". A tarefa aparece imediatamente no topo da lista.
- **Concluir uma Tarefa**: O usuário clica no checkbox ao lado da tarefa. A tarefa é movida para o final da lista, seu título recebe uma formatação visual (tachado) e o progresso na barra superior é atualizado.
- **Editar uma Tarefa**: O usuário clica no ícone de lápis em uma tarefa. Um modal se abre com os dados atuais. Após as alterações, o usuário salva e as informações são atualizadas instantaneamente.
- **Excluir uma Tarefa**: O usuário clica no ícone de lixeira. O botão muda para "Confirmar". Ao clicar novamente, a tarefa é removida.

### Fluxos Alternativos
- **Buscar Tarefa**: O usuário digita no campo de busca. A lista se ajusta para mostrar apenas os resultados correspondentes. Se não houver correspondência, uma mensagem informativa é exibida com a opção de limpar a busca.

### Cenários de Exceção
- **Título Vazio**: Se o usuário tentar adicionar uma tarefa sem título, o sistema impede a criação e exibe uma notificação de erro (toast).

## 4. Regras de Negócio
- **Validação**: O título da tarefa é obrigatório e não pode conter apenas espaços em branco.
- **Priorização**: Existem três níveis de prioridade (Baixa, Média, Alta), sendo "Média" o padrão.
- **Ordenação**: Tarefas pendentes têm prioridade de visualização sobre as concluídas e são listadas no topo. Dentro de cada grupo, as mais novas aparecem primeiro.
- **Persistência**: O sistema utiliza o `localStorage` do navegador sob a chave `taskflow-tasks`.
- **Registro de Data**: Cada tarefa registra sua data de criação (`createdAt`) e, opcionalmente, a data de conclusão (`completedAt`).

## 5. Estados e Comportamentos do Sistema
- **Lista Vazia**: Caso não haja tarefas cadastradas, o sistema exibe uma tela de boas-vindas (`EmptyState`).
- **Estado de Edição**: O sistema entra em modo de edição quando uma tarefa é selecionada, bloqueando interações de fundo por meio de um overlay modal.
- **Confirmação de Deleção**: A exclusão é um estado de dois passos para evitar remoções acidentais.

## 6. Arquitetura Funcional (Visão de Alto Nível)
- **Módulo de Estado (`useTasks`)**: Centraliza toda a lógica de manipulação de dados (CRUD) e filtragem.
- **Módulo de Persistência (`useLocalStorage`)**: Responsável por sincronizar o estado da aplicação com o armazenamento do navegador.
- **Componentes de UI**: Divididos em formulário de entrada, lista de itens (cards), feedback visual (toasts/progresso) e modais de interação.

## 7. Integrações Externas
- **Não identificado no código**: O sistema opera de forma totalmente client-side, sem consumo de APIs REST ou serviços de nuvem externos para armazenamento.
- **Bibliotecas Relevantes**: `lucide-react` (iconografia) e `react-hot-toast` (notificações).

## 8. Riscos e Pontos de Atenção
- **Limitação de Armazenamento**: Como os dados dependem do `localStorage`, há um limite de tamanho (geralmente 5MB) e os dados são específicos de cada navegador/dispositivo.
- **Inconsistência de Tipos**: A tipagem de datas vindo do JSON (localStorage) pode exigir atenção na desserialização (conversão de String para Date).
- **Concorrência**: Sem um backend, não há sincronização entre diferentes dispositivos do mesmo usuário.

## 9. Lacunas e Incertezas
- **Gestão de Categorias**: Não mapeado no código se haverá suporte a categorias ou tags futuramente.
- **Autenticação**: O sistema não possui controle de usuários ou login.
- **Limite de Tarefas**: Não há comportamento definido para listas extremamente longas (paginação ou virtualização). → "Não identificado no código"
