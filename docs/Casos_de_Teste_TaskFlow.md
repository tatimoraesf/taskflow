# Casos de Teste - TaskFlow

## Objetivo
Este documento detalha os casos de teste funcionais para o sistema TaskFlow, visando garantir a qualidade das operações de gestão de tarefas, filtros e usabilidade da interface.

---

### CT001 - Criar Tarefa com Sucesso
**Objetivo:** Validar que o sistema permite a criação de uma tarefa preenchendo título, prioridade e descrição.

**Pré-Condições:**
- O sistema TaskFlow deve estar em execução.
- O usuário deve estar na página inicial.

**Passos:**
| Id | Ação | Resultado Esperado |
|----|------|-------------------|
| 1 | Digitar "Estudar Vitest" no campo de título | O texto deve ser inserido corretamente. |
| 2 | Selecionar a prioridade "Alta" | A prioridade "Alta" deve ser selecionada. |
| 3 | Digitar "Revisar mocks e spies" no campo de descrição | A descrição deve ser inserida. |
| 4 | Clicar no botão "Adicionar Tarefa" | A tarefa deve ser adicionada e um toast de sucesso deve aparecer. |

**Resultados Esperados:**
- A tarefa "Estudar Vitest" deve aparecer no topo da lista.
- O card da tarefa deve exibir a tag de prioridade "Alta" e a descrição informada.

**Critérios de Aceitação:**
- A tarefa deve persistir após recarregar a página (localStorage).

---

### CT002 - Impedir Criação de Tarefa sem Título
**Objetivo:** Validar que o sistema não permite adicionar tarefas vazias.

**Pré-Condições:**
- O sistema TaskFlow deve estar em execução.

**Passos:**
| Id | Ação | Resultado Esperado |
|----|------|-------------------|
| 1 | Deixar o campo de título vazio | O campo permanece vazio. |
| 2 | Clicar no botão "Adicionar Tarefa" | O sistema deve exibir uma mensagem de erro: "O título da tarefa é obrigatório". |

**Resultados Esperados:**
- Nenhuma tarefa deve ser adicionada à lista.

**Critérios de Aceitação:**
- O sistema deve validar campos obrigatórios antes do processamento.

---

### CT003 - Editar Tarefa Existente
**Objetivo:** Validar a alteração de dados de uma tarefa já cadastrada.

**Pré-Condições:**
- Deve existir pelo menos uma tarefa na lista.

**Passos:**
| Id | Ação | Resultado Esperado |
|----|------|-------------------|
| 1 | Clicar no ícone de "Lápis" (Editar) em uma tarefa | O modal de edição deve abrir com os dados atuais preenchidos. |
| 2 | Alterar o título para "Título Editado" | O novo título deve ser inserido. |
| 3 | Alterar a prioridade para "Média" | A nova prioridade deve ser selecionada. |
| 4 | Clicar em "Salvar alterações" | O modal deve fechar e os dados devem ser atualizados. |

**Resultados Esperados:**
- A tarefa na lista deve refletir as novas informações imediatamente.

**Critérios de Aceitação:**
- A tarefa editada deve manter seu estado de conclusão (feita ou não feita).

---

### CT004 - Cancelar Edição de Tarefa
**Objetivo:** Garantir que o cancelamento da edição não altera os dados da tarefa.

**Pré-Condições:**
- Deve existir pelo menos uma tarefa na lista.

**Passos:**
| Id | Ação | Resultado Esperado |
|----|------|-------------------|
| 1 | Abrir o modal de edição de uma tarefa | Modal exibido. |
| 2 | Alterar o título para qualquer valor | Texto alterado no modal. |
| 3 | Clicar no botão "Cancelar" ou fora do modal | O modal deve fechar. |

**Resultados Esperados:**
- A tarefa na lista deve permanecer com o título original.

**Critérios de Aceitação:**
- Nenhuma alteração deve ser persistida ao cancelar.

---

### CT005 - Excluir Tarefa com Confirmação
**Objetivo:** Validar o fluxo de exclusão de tarefas.

**Pré-Condições:**
- Deve existir uma tarefa cadastrada.

**Passos:**
| Id | Ação | Resultado Esperado |
|----|------|-------------------|
| 1 | Clicar no ícone de "Lixeira" | Os botões "Confirmar" e "Cancelar" devem aparecer no card. |
| 2 | Clicar em "Confirmar" | A tarefa deve sumir da lista e um toast de sucesso deve aparecer. |

**Resultados Esperados:**
- A tarefa deve ser removida permanentemente do localStorage.

**Critérios de Aceitação:**
- A barra de progresso deve ser atualizada automaticamente.

---

### CT006 - Alternar Status de Conclusão
**Objetivo:** Validar a marcação e desmarcação de tarefas.

**Pré-Condições:**
- Deve existir uma tarefa pendente na lista.

**Passos:**
| Id | Ação | Resultado Esperado |
|----|------|-------------------|
| 1 | Clicar no checkbox de uma tarefa | A tarefa deve ser marcada como concluída (estilo visual riscado). |
| 2 | Verificar a barra de progresso | A porcentagem de conclusão deve aumentar. |
| 3 | Desmarcar o checkbox | A tarefa volta ao estado pendente. |

**Resultados Esperados:**
- A tarefa concluída deve ser movida para o final da lista.

**Critérios de Aceitação:**
- O estado de conclusão deve persistir após o reload.

---

### CT007 - Buscar Tarefa por Título
**Objetivo:** Validar a funcionalidade de filtro em tempo real.

**Pré-Condições:**
- Ter tarefas com nomes diferentes (ex: "Compras", "Trabalho", "Academia").

**Passos:**
| Id | Ação | Resultado Esperado |
|----|------|-------------------|
| 1 | Digitar "Comp" na barra de busca | Apenas a tarefa "Compras" deve ser exibida. |
| 2 | Limpar o campo de busca | Todas as tarefas devem voltar a aparecer. |

**Resultados Esperados:**
- A listagem deve ser atualizada dinamicamente conforme a digitação.

---

### CT008 - Buscar Termo Inexistente
**Objetivo:** Validar o tratamento de busca sem resultados.

**Pré-Condições:**
- Ter tarefas cadastradas.

**Passos:**
| Id | Ação | Resultado Esperado |
|----|------|-------------------|
| 1 | Digitar um termo aleatório (ex: "xyz123") | A lista deve esvaziar. |

**Resultados Esperados:**
- O sistema deve exibir: "🔍 Nenhuma tarefa encontrada para 'xyz123'".
- Um botão "Limpar busca" deve estar disponível.

---

### CT009 - Visualizar Lista Vazia
**Objetivo:** Validar o estado inicial do sistema.

**Pré-Condições:**
- Banco de dados (localStorage) vazio.

**Passos:**
| Id | Ação | Resultado Esperado |
|----|------|-------------------|
| 1 | Acessar o sistema pela primeira vez | A tela deve exibir a ilustração de estado vazio. |

**Resultados Esperados:**
- O componente `EmptyState` deve ser visível.
- A barra de progresso deve exibir 0%.

---

### CT010 - Verificar Barra de Progresso
**Objetivo:** Validar a precisão do cálculo de progresso.

**Pré-Condições:**
- Ter 4 tarefas cadastradas.

**Passos:**
| Id | Ação | Resultado Esperado |
|----|------|-------------------|
| 1 | Marcar 2 tarefas como concluídas | A barra de progresso deve preencher 50%. |
| 2 | Adicionar uma 5ª tarefa | O progresso deve ser recalculado corretamente. |

**Resultados Esperados:**
- O progresso deve refletir fielmente a proporção (concluídas / total).

---

### CT011 - Ordenação de Tarefas
**Objetivo:** Validar que tarefas concluídas são priorizadas no fim da lista.

**Pré-Condições:**
- Ter múltiplas tarefas na lista.

**Passos:**
| Id | Ação | Resultado Esperado |
|----|------|-------------------|
| 1 | Concluir a primeira tarefa da lista | Ela deve ser movida automaticamente para a última posição. |

**Resultados Esperados:**
- A ordenação garante que o foco do usuário permaneça no que ainda precisa ser feito.
