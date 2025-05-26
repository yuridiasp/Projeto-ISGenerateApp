import { describe, expect, it } from '@jest/globals'

import { getTipoTarefa } from '../../../../../../src/services/tarefas/index'

describe('Function getTipoTarefa: Recuperar o ID do tipo da tarefa a partir do texto do tipo da intimação', () => {

    const tiposTarefasMock = [
        { id: '44', nome: 'MANIFESTAÇÃO', normalizado: 'MANIFESTACAO' },
        { id: '89', nome: 'ACÓRDÃO', normalizado: 'ACORDAO' },
        { id: '28', nome: 'AUDIÊNCIA DE INSTRUÇÃO', normalizado: 'AUDIENCIA DE INSTRUCAO' },
        { id: '63', nome: 'LEMBRAR CLIENTE', normalizado: 'LEMBRAR CLIENTE' },
        { id: '15', nome: 'CONTATAR CLIENTE', normalizado: 'CONTATAR CLIENTE' },
    ]

    it('Tipo de intimação existe na lista de tipos de tarefa', () => {
        
        const tarefaMock = {
            tipoId: '',
            descricao: 'ACORDAO',
            dataParaFinalizacao: new Date(),
            responsavel: '',
            executor: ''
        }

        const getTipoTarefaMock = {
            tipoIntimacaoToUpperNormalized: 'ACORDAO'
        }
        
        const resultado = getTipoTarefa(tarefaMock, tiposTarefasMock, getTipoTarefaMock)
        expect(resultado).toBe('89')
    })

    it('Tipo de intimação não existe na lista de tipos de tarefa', () => {
        const tarefaMock = {
            tipoId: '',
            descricao: 'MANIFESTACAO SOBRE DOCUMENTOS',
            dataParaFinalizacao: new Date(),
            responsavel: '',
            executor: ''
        }

        const getTipoTarefaMock = {
            tipoIntimacaoToUpperNormalized: 'MANIFESTACAO SOBRE DOCUMENTOS'
        }

        const resultado = getTipoTarefa(tarefaMock, tiposTarefasMock, getTipoTarefaMock)
        expect(resultado).toBe('44')
    })
})