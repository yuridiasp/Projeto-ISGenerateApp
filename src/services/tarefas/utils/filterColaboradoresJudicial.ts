import { iColaborador } from "@models/colaborador/iColaborador"

export function filterColaboradoresJudicial (estadoCliente: string, localAtendido: string, parceiro: string, vara: string, isMocked?: boolean) {
    const colaboradores = []

    //Última atualização: 24/05/2024
    // Padrão para data das viagens: ['DD/MM']
    const parceiros = ['ELIZEU ( PARCEIRO)','MARIA DO POV. PREGUIÇA','AGENOR (PARCEIRO)','ELIZANGELA ( PARCEIRA)','ERMINIO','AUGUSTO ( PARCEIRO)'],
        varaEstancia = ['7ª VARA FEDERAL', '1ª VARA CIVEL DE ESTÂNCIA', '2ª VARA CIVEL DE ESTÂNCIA', 'JUIZADO ESPECIAL CÍVEL E CRIMINAL DE ESTÂNCIA', 'VARA DE ESTÂNCIA', 'VARA DO TRABALHO DE ESTÂNCIA'],
        estancia: iColaborador[] = [
            {
                id: '22',
                nome: "SANDOVAL FILHO CORREIA LIMA FILHO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            }
        ],
        aracaju: iColaborador[] = [
            {
                id: '196',
                nome: "KAUÃ DE CARVALHO NASCIMENTO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '199',
                nome: "LUCAS NATHAN NOGUEIRA DA SILVA ",
                interiores: ["ESTANCIA", "TOBIAS BARRETO", "PEDRINHAS"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '188',
                nome: "VINICIUS SOUSA BOMFIM",
                interiores: ["UMBAUBA", "CARMOPOLIS", "LOTEAMENTO JEOVA (BOTAFOGO)"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '94',
                nome: "CARLOS HENRIQUE ESPASIANI",
                interiores: ["CAPELA", "JAPARATUBA", "CONDE/BA", "ALAGOINHAS"],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '131',
                nome: "ASLEY RODRIGO DE MELO LIMA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '161',
                nome: "YURI DIAS PEREIRA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
        ],
        brasilia: iColaborador[] = [
            {
                id: '215',
                nome: "JÚLIA ROBERTA DE FÁTIMA SOUSA ARAÚJO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '223',
                nome: "MATHEUS CAMPELO DA SILVA",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
            {
                id: '222',
                nome: "STEFANNY MORAIS DO NASCIMENTO",
                interiores: [],
                datasViagem: [],
                tarefas: 0
            },
        ]
    if (estadoCliente === 'GO' || estadoCliente === 'DF') {
        colaboradores.push(...brasilia)
    } else if ((localAtendido == "ESTANCIA") || ((parceiros.includes(parceiro)) && varaEstancia.includes(vara))) {
        colaboradores.push(...estancia)
    } else {
        if (varaEstancia.includes(vara)) {
            if (!isMocked)
                alert("Verificar executor manualmente!")
            colaboradores.push(...aracaju)
            colaboradores.push(...estancia)
        } else {
            colaboradores.push(...aracaju)
        }
    }

    return colaboradores
}