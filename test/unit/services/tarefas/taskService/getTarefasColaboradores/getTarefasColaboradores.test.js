describe('Function getTarefasColaboradores: Realiza contagem das tarefas de intimações de um colaborador', () => {
    const { JSDOM } = require("jsdom")

    const { getTarefasColaboradores } = require("../../../../../../dist/services/tarefas/taskService")

    const html = `<html lang="pt-br"><head>
        <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

	

    <title>Korbil ADV: Fábio Ribeiro Advogados</title>

	<link rel="shortcut icon" href="http://fabioribeiro.eastus.cloudapp.azure.com/img/estrutura/favicon.ico">
	<link rel="icon" href="http://fabioribeiro.eastus.cloudapp.azure.com/img/estrutura/favicon.ico" type="image/x-icon">

    <!-- Bootstrap -->
    
        <link href="http://fabioribeiro.eastus.cloudapp.azure.com/css/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    
    <link href="http://fabioribeiro.eastus.cloudapp.azure.com/css/bootstrap-select.css" rel="stylesheet">
    <link href="http://fabioribeiro.eastus.cloudapp.azure.com/css/bootstrap-datetimepicker.css" rel="stylesheet">
    <link href="http://fabioribeiro.eastus.cloudapp.azure.com/css/bootstrap-colorpicker.min.css" rel="stylesheet">
	<link href="http://fabioribeiro.eastus.cloudapp.azure.com/css/editable/css/bootstrap-editable.css" rel="stylesheet">

    <!-- Validação -->
    <link href="http://fabioribeiro.eastus.cloudapp.azure.com/css/parsley.css" rel="stylesheet">

    <!-- Jquery UI -->
    <link href="http://fabioribeiro.eastus.cloudapp.azure.com/css/jqueryUI/jquery-ui.theme.min.css" rel="stylesheet">
    <link href="http://fabioribeiro.eastus.cloudapp.azure.com/css/jqueryUI/jquery-ui.min.css" rel="stylesheet">
    <link href="http://fabioribeiro.eastus.cloudapp.azure.com/css/jqueryUI/jquery-ui.structure.min.css" rel="stylesheet">

    

    <!-- Projeto -->
    <link href="http://fabioribeiro.eastus.cloudapp.azure.com/css/estilo.min.css" rel="stylesheet">
    <link href="http://fabioribeiro.eastus.cloudapp.azure.com/arquivosDesteCliente/estilo-cliente.css" rel="stylesheet">
    <link href="http://fabioribeiro.eastus.cloudapp.azure.com/css/estilo-manual.css" rel="stylesheet">

    <script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/jquery.min.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    
<meta id="bbafmabaelnnkondpfpjmdklbmfnbmol"><style>
        progress {
            width: 50%;
            height: 20px;
        }

        progress::-webkit-progress-bar {
            background-color: #eee;
            border-radius: 10px;
            box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        }

        progress::-webkit-progress-value {
            border-radius: 10px;
            transition: width 0.5s;
            background: linear-gradient(to right, #4caf50, #81c784);
        }

        progress::-moz-progress-bar {
            border-radius: 10px;
            transition: width 0.5s;
            background: linear-gradient(to right, #4caf50, #81c784);
        }

        progress::-ms-fill {
            border-radius: 10px;
            transition: width 0.5s;
            background: linear-gradient(to right, #4caf50, #81c784);
        }
    </style></head>
<body style="height: 100vh;">

	

	<noscript>
		O seu navegador não suporta JavaScript!<br />
		Para uma melhor experiência em nosso site, utilize um navegador com suporte a JavaScript ou habilite este recurso em seu navegador.
	</noscript>

	<section class="fdt-conteudo">
        <aside class="fdt_ml">
            <div class="fdt_ml-logoFT hidden-xs"><a href="http://www.korbil.com.br" target="_blank"><img src="http://fabioribeiro.eastus.cloudapp.azure.com/img/logotipos/logotipoWebappKorbil.png" class="img-responsive" width="100"></a></div><div class="fdt_ml-logoFT-xs visible-xs"><a href="http://www.korbil.com.br" target="_blank"><img src="http://fabioribeiro.eastus.cloudapp.azure.com/img/logotipos/logotipoWebappKorbil.png" class="img-responsive" width="70"></a></div><div class="fdt_ml-logo"><img src="http://fabioribeiro.eastus.cloudapp.azure.com/arquivosDesteCliente/logotipoSistema.png" class="img-responsive" width="100"></div>
            <div class="fdt_ml-menuInicio hidden-xs">Menu principal</div>
            <div class="fdt_ml-menuInicio visible-xs">Menu</div>
                        <nav>
                <ul class="fdt_ml-menu">
					
							<li>
								<a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/dashboard.asp">
									<i class="fa fa-th"></i>
									<span class="fdt_ml-menu-titulo" style="width: auto;">Dashboard</span>
								</a>
							</li>
						
						<li>
							<a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/aprovacoesPendentes.asp">
								<i class="fa fa-hourglass-o"></i>
								<span class="fdt_ml-menu-titulo" style="width: auto;">Aprov. pendentes</span>
							</a>
						</li>
						
							<li>
								<a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/compromissos/default.asp">
									<i class="fa fa-tasks"></i>
									<span class="fdt_ml-menu-titulo" style="width: auto;">Compromissos</span> 
								</a>
							</li>
						
							<li>
								<a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/tarefas/default.asp">
									<i class="fa fa-check"></i>
									<span class="fdt_ml-menu-titulo" style="width: auto;">Tarefas</span> 
								</a>
							</li>
						
							<li class="fdt_ml-menu-item" "="">
								<a class="fdt_ml-menu-toggle">
									<i class="fa fa-book"></i>
									<span class="fdt_ml-menu-titulo" style="width: auto;">Pré-processos</span>
									<span class="fdt_ml-menu-seta"><i class="fa fa-angle-left"></i></span>
								</a>
								<ul class="fdt_ml-menu-dropdown">
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/pre/dashboard.asp"><i class="fa fa-th"></i>Dashboard</a></li>
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/pre/preProcessos/default.asp"><i class="fa fa-book"></i>Pré-processo</a></li>
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/pre/statusTipos/default.asp"><i class="fa fa-list"></i>Etapas do processo</a></li>
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/pre/checklistsGrupos/default.asp"><i class="fa fa-list"></i>Checklists</a></li>
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/pre/motivosPerda/default.asp"><i class="fa fa-list"></i>Motivos de perda</a></li>
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/pre/origens/default.asp"><i class="fa fa-list"></i>Origens</a></li>
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/pre/arquivosStatus/default.asp"><i class="fa fa-list"></i>Status dos arquivos</a></li>
									
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/pre/relatorios/ciclo.asp"><i class="fa fa-tv"></i>Ciclo de vendas</a></li>
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/pre/relatorios/clientesPrimeiraVez.asp"><i class="fa fa-tv"></i>Clientes primeira vez</a></li>
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/pre/relatorios/perdidos.asp"><i class="fa fa-tv"></i>Perdidos</a></li>
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/pre/relatorios/origens.asp"><i class="fa fa-tv"></i>Origens</a></li>
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/pre/relatorios/metas.asp"><i class="fa fa-tv"></i>Metas</a></li>
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/pre/relatorios/volume.asp"><i class="fa fa-tv"></i>Volume</a></li>
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/pre/relatorios/conversao.asp"><i class="fa fa-tv"></i>Conversão por etapa</a></li>
								</ul>
							</li>
							<li>
								<a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/processos/default.asp">
									<i class="fa fa-legal"></i>
									<span class="fdt_ml-menu-titulo" style="width: auto;">Processos</span>
								</a>
							</li>
						
							<li>
								<a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/inss/default.asp">
									<i class="fa fa-calendar"></i>
									<span class="fdt_ml-menu-titulo" style="width: auto;">INSS</span>
								</a>
							</li>
						
							<li>
								<a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/clientes/default.asp?bsAdvClientes=l">
									<i class="fa fa-building-o"></i>
									<span class="fdt_ml-menu-titulo" style="width: auto;">Clientes</span>
								</a>
							</li>
						
							<li>
								<a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/revisaoDocs/default.asp">
									<i class="fa fa-file-text-o"></i>
									<span class="fdt_ml-menu-titulo" style="width: auto;">Revisão de docs.</span>
								</a>
							</li>
							<li>
								<a href="http://fabioribeiro.eastus.cloudapp.azure.com/ftp/navegacao.asp">
									<i class="fa fa-file-text-o"></i>
									<span class="fdt_ml-menu-titulo" style="width: auto;">Arquivos FR</span>
								</a>
							</li>
													<li class="fdt_ml-menu-item" "="">
								<a class="fdt_ml-menu-toggle">
									<i class="fa fa-magnet"></i>
									<span class="fdt_ml-menu-titulo" style="width: auto;">Follow-ups</span>
									<span class="fdt_ml-menu-seta"><i class="fa fa-angle-left"></i></span>
								</a>
								<ul class="fdt_ml-menu-dropdown">
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/flw/dashboard.asp"><i class="fa fa-th"></i>Dashboard</a></li>
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/flw/followups/default.asp"><i class="fa fa-magnet"></i>Follow-ups</a></li>
									
										<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/flw/acoes/default.asp"><i class="fa fa-list"></i>Ações</a></li>
										<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/fab/tiposHistorico/default.asp"><i class="fa fa-list"></i>Tipos de follow-ups</a></li>
									
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/flw/calendario/default.asp"><i class="fa fa-calendar"></i>Calendário</a></li>
								</ul>
							</li>
							<li class="fdt_ml-menu-item">
								<a class="fdt_ml-menu-toggle">
									<i class="fa fa-lightbulb-o"></i>
									<span class="fdt_ml-menu-titulo" style="width: auto;">Oportunidades</span>
									<span class="fdt_ml-menu-seta"><i class="fa fa-angle-left"></i></span>
								</a>
								<ul class="fdt_ml-menu-dropdown">
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/opo/dashboard.asp"><i class="fa fa-th"></i>Dashboard</a></li>
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/opo/oportunidades/default.asp"><i class="fa fa-lightbulb-o"></i>Oportunidades</a></li>
									
										<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/opo/situacoes/default.asp"><i class="fa fa-list"></i>Situações</a></li>
										<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/opo/tipos/default.asp"><i class="fa fa-list"></i>Tipos</a></li>
										<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/fab/motivosPerda/default.asp"><i class="fa fa-list"></i>Motivos de perda</a></li>
										<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/fab/motivosAproveitamento/default.asp"><i class="fa fa-list"></i>Motivos de<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aproveitamento</a></li>
									
								</ul>
							</li>

               </ul>
            </nav>

        </aside>
        <section class="fdt-contedudo-principal" style="display: block; overflow-y: auto;">
			<!-- CABEÇALHO -->
            <header class="fdt-contedudo-cabecalho">
                <nav class="navbar">
                    <div class="" id="fdt-mt-header">
                         <ul class="nav navbar-nav">


						    
								<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/fab/bemVindo.asp"><span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Bem-vindo"><i class="fa fa-fw fa-home fdt-cor-chumbo"></i>&nbsp;</span></a></li>
							

							<!-- acessos rápidos -->
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Acesso rápido"><i class="fa fa-fw fa-bolt fdt-cor-roxo"></i>&nbsp;</span></a>
                                <ul class="dropdown-menu fdt-menu-user">

                                    <li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/clientes/default.asp?org=prc" class="fdt-cor-roxo"><i class="fa fa-fw fa-legal"></i>&nbsp;Novo processo</a></li><li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/clientes/formulario.asp" class="fdt-cor-roxo"><i class="fa fa-fw fa-building-o"></i>&nbsp;Novo cliente</a></li><li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/clientes/default.asp?org=hist" class="fdt-cor-roxo"><i class="fa fa-fw fa-history"></i>&nbsp;Novo histórico em cliente</a></li><li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/processos/default.asp?org=cmp" class="fdt-cor-roxo"><i class="fa fa-fw fa-tasks"></i>&nbsp;Novo compromisso</a></li><li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/tarefas/formulario.asp" class="fdt-cor-roxo"><i class="fa fa-fw fa-check"></i>&nbsp;Nova tarefa</a></li><li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/clientes/default.asp?org=tar" class="fdt-cor-roxo"><i class="fa fa-fw fa-check"></i>&nbsp;Nova tarefa de cliente</a></li><li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/clientes/default.asp?org=flw" class="fdt-cor-roxo"><i class="fa fa-fw fa-magnet"></i>&nbsp;Novo follow-up</a></li><li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/clientes/default.asp?org=opo" class="fdt-cor-roxo"><i class="fa fa-fw fa-lightbulb-o"></i>&nbsp;Nova oportunidade</a></li>
                                </ul>
                            </li>
                            
							
								<li class="dropdown">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Dashboards"><i class="fa fa-fw fa-th fdt-cor-laranja"></i>&nbsp;</span></a>
									<ul class="dropdown-menu fdt-menu-user">
										<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/dashboard.asp" class="fdt-cor-laranja"><i class="fa fa-fw fa-legal"></i>&nbsp;Advocacia</a></li><li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/opo/dashboard.asp" class="fdt-cor-laranja"><i class="fa fa-fw fa-lightbulb-o"></i>&nbsp;Oportunidades</a></li><li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/flw/dashboard.asp" class="fdt-cor-laranja"><i class="fa fa-fw fa-magnet"></i>&nbsp;Follow-ups</a></li>
									</ul>
								</li>
							
								<li class="dropdown">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Agendas"><i class="fa fa-fw fa-calendar fdt-cor-oliva"></i>&nbsp;</span></a>
									<ul class="dropdown-menu fdt-menu-user">
										
											<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/calendario/compromissos.asp" class="fdt-cor-oliva"><i class="fa fa-fw fa-tasks"></i>&nbsp;Compromissos</a></li>
											<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/calendario/tarefas.asp" class="fdt-cor-oliva"><i class="fa fa-fw fa-check"></i>&nbsp;Tarefas</a></li>
										<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/flw/calendario/default.asp" class="fdt-cor-oliva"><i class="fa fa-fw fa-magnet"></i>&nbsp;Follow-ups</a></li>
									</ul>
								</li>
							
							
                         
						 
							<!-- links temporários -->
                            
						
							<!-- aniversariantes -->
							
								<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/clientes/defaultAvancada.asp?bsAdvClientes=s&amp;bsAdvClientesDiaNascimento=27&amp;bsAdvClientesMesNascimento=9"><span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Aniversariantes do dia"><i class="fa fa-fw fa-birthday-cake fdt-cor-verde"></i>&nbsp;<span class="fdt-label-show label label-danger">96</span></span></a></li>
							
								<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/fab/lembretes/default.asp"><span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Lembretes"><i class="fa fa-fw fa-bell fdt-cor-azul"></i>&nbsp;</span></a></li>
							

							<!-- meus dados e sair para tela mobile -->
							<li class="visible-xs"><a href="http://fabioribeiro.eastus.cloudapp.azure.com/fab/meusDados/formulario.asp"><span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Trocar&nbsp;senha"><i class="fa fa-fw fa-user fdt-cor-oliva"></i>&nbsp;</span></a></li>
                            <li class="visible-xs"><a href="http://fabioribeiro.eastus.cloudapp.azure.com/logoutScript.asp"><span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Sair"><i class="fa fa-fw fa-power-off fdt-cor-chumbo"></i>&nbsp;</span></a></li>


                        <li class="dropdown mensagens hidden-xs" id="painelBTNSupADM"><a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span data-toggle="tooltip" data-placement="bottom" title="Painel do Supervisor ADM" data-original-title="Painel do Supervisor ADM"><i class="fa fa-fw fa-table fdt-cor-azul"></i></span></a>
                    <ul id="panelSupADM" class="dropdown-menu hidden-xs">
                        <li class="fdt-dropdown-cabecalho" style="color: #005689;">Painel do Supervisor</li>
                        <li class="fdt-widget-lembretes">
                            <ul>
                                <li>
                                    <li class="fdt-widget-lembretes" style="display: flex; justify-content: center; align-items: center; gap: 10px; padding: 10px 0;">
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #34454E; width: 10px; height: 10px;"></span>Tarefas Atrasadas
                            </div>
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #A5D5EF; width: 10px; height: 10px;"></span>Tarefas Ativas
                            </div>
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #CCC; width: 10px; height: 10px;"></span>Tarefas Encerradas
                            </div>
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #ADADAD; width: 10px; height: 10px;"></span>Total de Tarefas
                            </div>
                        </li><table class="tabela"><tbody><tr><th style="background: rgb(0 86 137);">&nbsp;</th><th data-date="atrasadas" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">Tarefas atrasadas</th><th colspan="3" data-date="2024-09-27" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">27/09/2024<br>Sexta</th><th colspan="3" data-date="2024-09-28" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">28/09/2024<br>Sábado</th><th colspan="3" data-date="2024-09-29" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">29/09/2024<br>Domingo</th><th colspan="3" data-date="2024-09-30" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">30/09/2024<br>Segunda</th><th colspan="3" data-date="2024-10-01" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">01/10/2024<br>Terça</th><th colspan="3" data-date="2024-10-02" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">02/10/2024<br>Quarta</th><th colspan="3" data-date="2024-10-03" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">03/10/2024<br>Quinta</th><th colspan="3" data-date="2024-10-04" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">04/10/2024<br>Sexta</th></tr><tr><th data-nome="asley" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">ASLEY</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="asley" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="asley" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="asley" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="asley" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="asley" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="asley" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="asley" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="asley" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="asley" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="asley" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="asley" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="asley" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="asley" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="asley" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="asley" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="asley" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="asley" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="asley" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="asley" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="asley" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="asley" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="asley" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="asley" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="asley" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="asley" data-date="2024-10-04">-</td></tr><tr><th data-nome="henrique" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">HENRIQUE</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="henrique" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henrique" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henrique" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henrique" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henrique" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henrique" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henrique" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henrique" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henrique" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henrique" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henrique" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henrique" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henrique" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henrique" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henrique" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henrique" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henrique" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henrique" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henrique" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henrique" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henrique" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henrique" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henrique" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henrique" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henrique" data-date="2024-10-04">-</td></tr><tr><th data-nome="diego" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">DIEGO</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="diego" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="diego" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="diego" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="diego" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="diego" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="diego" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="diego" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="diego" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="diego" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="diego" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="diego" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="diego" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="diego" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="diego" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="diego" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="diego" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="diego" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="diego" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="diego" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="diego" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="diego" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="diego" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="diego" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="diego" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="diego" data-date="2024-10-04">-</td></tr><tr><th data-nome="jhonathan" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">JHONATHAN</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="jhonathan" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="jhonathan" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="jhonathan" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="jhonathan" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="jhonathan" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="jhonathan" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="jhonathan" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="jhonathan" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="jhonathan" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="jhonathan" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="jhonathan" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="jhonathan" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="jhonathan" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="jhonathan" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="jhonathan" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="jhonathan" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="jhonathan" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="jhonathan" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="jhonathan" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="jhonathan" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="jhonathan" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="jhonathan" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="jhonathan" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="jhonathan" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="jhonathan" data-date="2024-10-04">-</td></tr><tr><th data-nome="juliano" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">JULIANO</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="juliano" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="juliano" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="juliano" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="juliano" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="juliano" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="juliano" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="juliano" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="juliano" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="juliano" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="juliano" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="juliano" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="juliano" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="juliano" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="juliano" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="juliano" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="juliano" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="juliano" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="juliano" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="juliano" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="juliano" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="juliano" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="juliano" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="juliano" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="juliano" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="juliano" data-date="2024-10-04">-</td></tr><tr><th data-nome="kauã" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">KAUÃ</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="kauã" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="kauã" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="kauã" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="kauã" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="kauã" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="kauã" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="kauã" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="kauã" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="kauã" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="kauã" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="kauã" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="kauã" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="kauã" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="kauã" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="kauã" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="kauã" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="kauã" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="kauã" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="kauã" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="kauã" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="kauã" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="kauã" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="kauã" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="kauã" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="kauã" data-date="2024-10-04">-</td></tr><tr><th data-nome="leandro" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">LEANDRO</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="leandro" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leandro" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leandro" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leandro" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leandro" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leandro" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leandro" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leandro" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leandro" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leandro" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leandro" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leandro" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leandro" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leandro" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leandro" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leandro" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leandro" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leandro" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leandro" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leandro" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leandro" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leandro" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leandro" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leandro" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leandro" data-date="2024-10-04">-</td></tr><tr><th data-nome="leonardo" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">LEONARDO</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="leonardo" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leonardo" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leonardo" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leonardo" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leonardo" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leonardo" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leonardo" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leonardo" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leonardo" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leonardo" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leonardo" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leonardo" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leonardo" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leonardo" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leonardo" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leonardo" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leonardo" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leonardo" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leonardo" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leonardo" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leonardo" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leonardo" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="leonardo" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="leonardo" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="leonardo" data-date="2024-10-04">-</td></tr><tr><th data-nome="lucas" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">LUCAS</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="lucas" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="lucas" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="lucas" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="lucas" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="lucas" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="lucas" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="lucas" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="lucas" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="lucas" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="lucas" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="lucas" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="lucas" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="lucas" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="lucas" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="lucas" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="lucas" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="lucas" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="lucas" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="lucas" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="lucas" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="lucas" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="lucas" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="lucas" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="lucas" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="lucas" data-date="2024-10-04">-</td></tr><tr><th data-nome="murilo" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">MURILO</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="murilo" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="murilo" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="murilo" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="murilo" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="murilo" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="murilo" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="murilo" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="murilo" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="murilo" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="murilo" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="murilo" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="murilo" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="murilo" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="murilo" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="murilo" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="murilo" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="murilo" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="murilo" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="murilo" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="murilo" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="murilo" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="murilo" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="murilo" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="murilo" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="murilo" data-date="2024-10-04">-</td></tr><tr><th data-nome="renata" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">RENATA</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="renata" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="renata" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="renata" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="renata" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="renata" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="renata" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="renata" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="renata" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="renata" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="renata" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="renata" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="renata" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="renata" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="renata" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="renata" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="renata" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="renata" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="renata" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="renata" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="renata" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="renata" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="renata" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="renata" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="renata" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="renata" data-date="2024-10-04">-</td></tr><tr><th data-nome="thiago" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">THIAGO</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="thiago" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="thiago" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="thiago" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="thiago" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="thiago" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="thiago" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="thiago" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="thiago" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="thiago" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="thiago" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="thiago" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="thiago" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="thiago" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="thiago" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="thiago" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="thiago" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="thiago" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="thiago" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="thiago" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="thiago" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="thiago" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="thiago" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="thiago" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="thiago" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="thiago" data-date="2024-10-04">-</td></tr><tr><th data-nome="vinicius" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">VINICIUS</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="vinicius" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="vinicius" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="vinicius" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="vinicius" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="vinicius" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="vinicius" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="vinicius" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="vinicius" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="vinicius" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="vinicius" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="vinicius" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="vinicius" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="vinicius" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="vinicius" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="vinicius" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="vinicius" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="vinicius" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="vinicius" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="vinicius" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="vinicius" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="vinicius" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="vinicius" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="vinicius" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="vinicius" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="vinicius" data-date="2024-10-04">-</td></tr><tr><th data-nome="yuri" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">YURI</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="yuri" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="yuri" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="yuri" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="yuri" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="yuri" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="yuri" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="yuri" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="yuri" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="yuri" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="yuri" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="yuri" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="yuri" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="yuri" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="yuri" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="yuri" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="yuri" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="yuri" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="yuri" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="yuri" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="yuri" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="yuri" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="yuri" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="yuri" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="yuri" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="yuri" data-date="2024-10-04">-</td></tr>
                                
                            
                        
                        
                    </tbody></table></li></ul></li><div id="contentBarADM" style="position: absolute; flex-direction: column; justify-content: center; align-items: center; background: rgb(204, 204, 204); top: 0px; left: 0px; width: 100%; height: 100%;"><p style="font-size: 1.5em; color: rgb(64, 56, 58);">Carregando...</p><progress id="barADM" max="100"></progress></div></ul></li><li class="dropdown mensagens hidden-xs" id="painelBTNSupSAC"><a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span data-toggle="tooltip" data-placement="bottom" title="Painel do Supervisor SAC" data-original-title="Painel do Supervisor SAC"><i class="fa fa-fw fa-table fdt-cor-verde"></i></span></a>
                    <ul id="panelSupSAC" class="dropdown-menu hidden-xs">
                        <li class="fdt-dropdown-cabecalho" style="color: #005689;">Painel do Supervisor</li>
                        <li class="fdt-widget-lembretes">
                            <ul>
                                <li>
                                    <li class="fdt-widget-lembretes" style="display: flex; justify-content: center; align-items: center; gap: 10px; padding: 10px 0;">
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #34454E; width: 10px; height: 10px;"></span>Tarefas Atrasadas
                            </div>
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #A5D5EF; width: 10px; height: 10px;"></span>Tarefas Ativas
                            </div>
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #CCC; width: 10px; height: 10px;"></span>Tarefas Encerradas
                            </div>
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #ADADAD; width: 10px; height: 10px;"></span>Total de Tarefas
                            </div>
                        </li><table class="tabela"><tbody><tr><th style="background: rgb(0 86 137);">&nbsp;</th><th data-date="atrasadas" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">Tarefas atrasadas</th><th colspan="3" data-date="2024-09-27" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">27/09/2024<br>Sexta</th><th colspan="3" data-date="2024-09-28" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">28/09/2024<br>Sábado</th><th colspan="3" data-date="2024-09-29" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">29/09/2024<br>Domingo</th><th colspan="3" data-date="2024-09-30" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">30/09/2024<br>Segunda</th><th colspan="3" data-date="2024-10-01" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">01/10/2024<br>Terça</th><th colspan="3" data-date="2024-10-02" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">02/10/2024<br>Quarta</th><th colspan="3" data-date="2024-10-03" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">03/10/2024<br>Quinta</th><th colspan="3" data-date="2024-10-04" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">04/10/2024<br>Sexta</th></tr><tr><th data-nome="hellen" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">HELLEN</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="hellen" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="hellen" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="hellen" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="hellen" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="hellen" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="hellen" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="hellen" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="hellen" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="hellen" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="hellen" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="hellen" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="hellen" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="hellen" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="hellen" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="hellen" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="hellen" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="hellen" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="hellen" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="hellen" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="hellen" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="hellen" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="hellen" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="hellen" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="hellen" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="hellen" data-date="2024-10-04">-</td></tr><tr><th data-nome="helton" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">HELTON</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="helton" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="helton" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="helton" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="helton" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="helton" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="helton" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="helton" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="helton" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="helton" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="helton" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="helton" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="helton" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="helton" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="helton" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="helton" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="helton" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="helton" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="helton" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="helton" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="helton" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="helton" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="helton" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="helton" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="helton" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="helton" data-date="2024-10-04">-</td></tr><tr><th data-nome="henyr" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">HENYR</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="henyr" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henyr" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henyr" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henyr" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henyr" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henyr" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henyr" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henyr" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henyr" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henyr" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henyr" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henyr" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henyr" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henyr" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henyr" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henyr" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henyr" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henyr" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henyr" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henyr" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henyr" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henyr" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="henyr" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="henyr" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="henyr" data-date="2024-10-04">-</td></tr><tr><th data-nome="layne" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">LAYNE</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="layne" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="layne" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="layne" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="layne" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="layne" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="layne" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="layne" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="layne" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="layne" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="layne" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="layne" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="layne" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="layne" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="layne" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="layne" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="layne" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="layne" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="layne" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="layne" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="layne" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="layne" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="layne" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="layne" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="layne" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="layne" data-date="2024-10-04">-</td></tr><tr><th data-nome="liniker" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">LINIKER</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="liniker" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="liniker" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="liniker" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="liniker" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="liniker" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="liniker" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="liniker" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="liniker" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="liniker" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="liniker" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="liniker" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="liniker" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="liniker" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="liniker" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="liniker" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="liniker" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="liniker" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="liniker" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="liniker" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="liniker" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="liniker" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="liniker" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="liniker" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="liniker" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="liniker" data-date="2024-10-04">-</td></tr><tr><th data-nome="marco aurelio" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">MARCO AURELIO</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="marco aurelio" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="marco aurelio" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="marco aurelio" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="marco aurelio" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="marco aurelio" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="marco aurelio" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="marco aurelio" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="marco aurelio" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="marco aurelio" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="marco aurelio" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="marco aurelio" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="marco aurelio" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="marco aurelio" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="marco aurelio" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="marco aurelio" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="marco aurelio" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="marco aurelio" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="marco aurelio" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="marco aurelio" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="marco aurelio" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="marco aurelio" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="marco aurelio" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="marco aurelio" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="marco aurelio" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="marco aurelio" data-date="2024-10-04">-</td></tr><tr><th data-nome="tricya" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">TRICYA</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="tricya" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="tricya" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="tricya" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="tricya" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="tricya" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="tricya" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="tricya" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="tricya" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="tricya" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="tricya" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="tricya" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="tricya" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="tricya" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="tricya" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="tricya" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="tricya" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="tricya" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="tricya" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="tricya" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="tricya" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="tricya" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="tricya" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="tricya" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="tricya" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="tricya" data-date="2024-10-04">-</td></tr>
                                
                            
                        
                        
                    </tbody></table></li></ul></li><div id="contentBarSAC" style="position: absolute; flex-direction: column; justify-content: center; align-items: center; background: rgb(204, 204, 204); top: 0px; left: 0px; width: 100%; height: 100%;"><p style="font-size: 1.5em; color: rgb(64, 56, 58);">Carregando...</p><progress id="barSAC" max="100"></progress></div></ul></li><li class="dropdown mensagens hidden-xs" id="painelBTNSupFINANCEIRO"><a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span data-toggle="tooltip" data-placement="bottom" title="Painel do Supervisor FINANCEIRO" data-original-title="Painel do Supervisor FINANCEIRO"><i class="fa fa-fw fa-table fdt-cor-vermelho"></i></span></a>
                    <ul id="panelSupFINANCEIRO" class="dropdown-menu hidden-xs">
                        <li class="fdt-dropdown-cabecalho" style="color: #005689;">Painel do Supervisor</li>
                        <li class="fdt-widget-lembretes">
                            <ul>
                                <li>
                                    <li class="fdt-widget-lembretes" style="display: flex; justify-content: center; align-items: center; gap: 10px; padding: 10px 0;">
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #34454E; width: 10px; height: 10px;"></span>Tarefas Atrasadas
                            </div>
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #A5D5EF; width: 10px; height: 10px;"></span>Tarefas Ativas
                            </div>
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #CCC; width: 10px; height: 10px;"></span>Tarefas Encerradas
                            </div>
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #ADADAD; width: 10px; height: 10px;"></span>Total de Tarefas
                            </div>
                        </li><table class="tabela"><tbody><tr><th style="background: rgb(0 86 137);">&nbsp;</th><th data-date="atrasadas" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">Tarefas atrasadas</th><th colspan="3" data-date="2024-09-27" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">27/09/2024<br>Sexta</th><th colspan="3" data-date="2024-09-28" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">28/09/2024<br>Sábado</th><th colspan="3" data-date="2024-09-29" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">29/09/2024<br>Domingo</th><th colspan="3" data-date="2024-09-30" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">30/09/2024<br>Segunda</th><th colspan="3" data-date="2024-10-01" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">01/10/2024<br>Terça</th><th colspan="3" data-date="2024-10-02" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">02/10/2024<br>Quarta</th><th colspan="3" data-date="2024-10-03" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">03/10/2024<br>Quinta</th><th colspan="3" data-date="2024-10-04" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">04/10/2024<br>Sexta</th></tr><tr><th data-nome="aline" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">ALINE</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="aline" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="aline" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="aline" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="aline" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="aline" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="aline" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="aline" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="aline" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="aline" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="aline" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="aline" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="aline" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="aline" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="aline" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="aline" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="aline" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="aline" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="aline" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="aline" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="aline" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="aline" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="aline" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="aline" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="aline" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="aline" data-date="2024-10-04">-</td></tr><tr><th data-nome="camila" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">CAMILA</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="camila" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="camila" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="camila" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="camila" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="camila" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="camila" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="camila" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="camila" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="camila" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="camila" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="camila" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="camila" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="camila" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="camila" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="camila" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="camila" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="camila" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="camila" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="camila" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="camila" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="camila" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="camila" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="camila" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="camila" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="camila" data-date="2024-10-04">-</td></tr><tr><th data-nome="luciana araujo" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">LUCIANA ARAUJO</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="luciana araujo" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana araujo" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana araujo" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana araujo" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana araujo" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana araujo" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana araujo" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana araujo" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana araujo" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana araujo" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana araujo" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana araujo" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana araujo" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana araujo" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana araujo" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana araujo" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana araujo" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana araujo" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana araujo" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana araujo" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana araujo" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana araujo" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana araujo" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana araujo" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana araujo" data-date="2024-10-04">-</td></tr><tr><th data-nome="luciana lima" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">LUCIANA LIMA</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="luciana lima" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana lima" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana lima" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana lima" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana lima" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana lima" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana lima" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana lima" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana lima" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana lima" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana lima" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana lima" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana lima" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana lima" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana lima" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana lima" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana lima" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana lima" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana lima" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana lima" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana lima" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana lima" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="luciana lima" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="luciana lima" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="luciana lima" data-date="2024-10-04">-</td></tr><tr><th data-nome="overlandia" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">OVERLANDIA</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="overlandia" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="overlandia" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="overlandia" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="overlandia" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="overlandia" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="overlandia" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="overlandia" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="overlandia" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="overlandia" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="overlandia" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="overlandia" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="overlandia" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="overlandia" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="overlandia" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="overlandia" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="overlandia" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="overlandia" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="overlandia" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="overlandia" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="overlandia" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="overlandia" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="overlandia" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="overlandia" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="overlandia" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="overlandia" data-date="2024-10-04">-</td></tr><tr><th data-nome="sheyla" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">SHEYLA</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="sheyla" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="sheyla" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="sheyla" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="sheyla" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="sheyla" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="sheyla" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="sheyla" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="sheyla" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="sheyla" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="sheyla" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="sheyla" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="sheyla" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="sheyla" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="sheyla" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="sheyla" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="sheyla" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="sheyla" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="sheyla" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="sheyla" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="sheyla" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="sheyla" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="sheyla" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="sheyla" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="sheyla" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="sheyla" data-date="2024-10-04">-</td></tr><tr><th data-nome="victor" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">VICTOR</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="victor" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="victor" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="victor" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="victor" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="victor" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="victor" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="victor" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="victor" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="victor" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="victor" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="victor" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="victor" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="victor" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="victor" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="victor" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="victor" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="victor" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="victor" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="victor" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="victor" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="victor" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="victor" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="victor" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="victor" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="victor" data-date="2024-10-04">-</td></tr>
                                
                            
                        
                        
                    </tbody></table></li></ul></li><div id="contentBarFINANCEIRO" style="position: absolute; flex-direction: column; justify-content: center; align-items: center; background: rgb(204, 204, 204); top: 0px; left: 0px; width: 100%; height: 100%;"><p style="font-size: 1.5em; color: rgb(64, 56, 58);">Carregando...</p><progress id="barFINANCEIRO" max="100"></progress></div></ul></li><li class="dropdown mensagens hidden-xs" id="painelBTNSupINSS"><a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span data-toggle="tooltip" data-placement="bottom" title="Painel do Supervisor INSS" data-original-title="Painel do Supervisor INSS"><i class="fa fa-fw fa-table fdt-cor-preto"></i></span></a>
                    <ul id="panelSupINSS" class="dropdown-menu hidden-xs">
                        <li class="fdt-dropdown-cabecalho" style="color: #005689;">Painel do Supervisor</li>
                        <li class="fdt-widget-lembretes">
                            <ul>
                                <li>
                                    <li class="fdt-widget-lembretes" style="display: flex; justify-content: center; align-items: center; gap: 10px; padding: 10px 0;">
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #34454E; width: 10px; height: 10px;"></span>Tarefas Atrasadas
                            </div>
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #A5D5EF; width: 10px; height: 10px;"></span>Tarefas Ativas
                            </div>
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #CCC; width: 10px; height: 10px;"></span>Tarefas Encerradas
                            </div>
                            <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                                <span style="background: #ADADAD; width: 10px; height: 10px;"></span>Total de Tarefas
                            </div>
                        </li><table class="tabela"><tbody><tr><th style="background: rgb(0 86 137);">&nbsp;</th><th data-date="atrasadas" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">Tarefas atrasadas</th><th colspan="3" data-date="2024-09-27" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">27/09/2024<br>Sexta</th><th colspan="3" data-date="2024-09-28" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">28/09/2024<br>Sábado</th><th colspan="3" data-date="2024-09-29" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">29/09/2024<br>Domingo</th><th colspan="3" data-date="2024-09-30" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">30/09/2024<br>Segunda</th><th colspan="3" data-date="2024-10-01" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">01/10/2024<br>Terça</th><th colspan="3" data-date="2024-10-02" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">02/10/2024<br>Quarta</th><th colspan="3" data-date="2024-10-03" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">03/10/2024<br>Quinta</th><th colspan="3" data-date="2024-10-04" class="dRow" style="text-align: center; padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">04/10/2024<br>Sexta</th></tr><tr><th data-nome="daniel" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">DANIEL</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="daniel" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="daniel" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="daniel" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="daniel" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="daniel" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="daniel" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="daniel" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="daniel" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="daniel" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="daniel" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="daniel" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="daniel" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="daniel" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="daniel" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="daniel" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="daniel" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="daniel" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="daniel" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="daniel" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="daniel" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="daniel" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="daniel" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="daniel" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="daniel" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="daniel" data-date="2024-10-04">-</td></tr><tr><th data-nome="flavio" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">FLAVIO</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="flavio" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="flavio" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="flavio" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="flavio" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="flavio" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="flavio" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="flavio" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="flavio" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="flavio" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="flavio" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="flavio" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="flavio" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="flavio" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="flavio" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="flavio" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="flavio" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="flavio" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="flavio" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="flavio" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="flavio" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="flavio" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="flavio" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="flavio" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="flavio" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="flavio" data-date="2024-10-04">-</td></tr><tr><th data-nome="gabriel" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">GABRIEL</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="gabriel" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="gabriel" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="gabriel" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="gabriel" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="gabriel" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="gabriel" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="gabriel" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="gabriel" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="gabriel" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="gabriel" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="gabriel" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="gabriel" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="gabriel" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="gabriel" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="gabriel" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="gabriel" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="gabriel" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="gabriel" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="gabriel" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="gabriel" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="gabriel" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="gabriel" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="gabriel" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="gabriel" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="gabriel" data-date="2024-10-04">-</td></tr><tr><th data-nome="miqueas" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">MIQUEAS</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="miqueas" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="miqueas" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="miqueas" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="miqueas" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="miqueas" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="miqueas" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="miqueas" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="miqueas" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="miqueas" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="miqueas" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="miqueas" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="miqueas" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="miqueas" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="miqueas" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="miqueas" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="miqueas" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="miqueas" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="miqueas" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="miqueas" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="miqueas" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="miqueas" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="miqueas" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="miqueas" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="miqueas" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="miqueas" data-date="2024-10-04">-</td></tr><tr><th data-nome="osmar" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">OSMAR</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="osmar" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="osmar" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="osmar" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="osmar" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="osmar" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="osmar" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="osmar" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="osmar" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="osmar" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="osmar" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="osmar" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="osmar" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="osmar" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="osmar" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="osmar" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="osmar" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="osmar" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="osmar" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="osmar" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="osmar" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="osmar" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="osmar" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="osmar" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="osmar" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="osmar" data-date="2024-10-04">-</td></tr><tr><th data-nome="silvania" class="nCollumn" style="padding: 0.5rem; background: rgb(28, 84, 117); color: rgb(255, 255, 255);">SILVANIA</th><td style="background: rgb(52, 69, 78); color: rgb(255, 255, 255); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="atrasadas" data-nome="silvania" data-date="atrasadas">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="silvania" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="silvania" data-date="2024-09-27">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="silvania" data-date="2024-09-27">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="silvania" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="silvania" data-date="2024-09-28">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="silvania" data-date="2024-09-28">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="silvania" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="silvania" data-date="2024-09-29">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="silvania" data-date="2024-09-29">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="silvania" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="silvania" data-date="2024-09-30">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="silvania" data-date="2024-09-30">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="silvania" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="silvania" data-date="2024-10-01">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="silvania" data-date="2024-10-01">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="silvania" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="silvania" data-date="2024-10-02">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="silvania" data-date="2024-10-02">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="silvania" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="silvania" data-date="2024-10-03">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="silvania" data-date="2024-10-03">-</td><td data-toggle="tooltip" data-original-title="Ativas" data-placement="Top" style="background: rgb(165, 213, 239); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Ativas" data-nome="silvania" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Encerradas" data-placement="Top" style="background: rgb(204, 204, 204); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Encerradas" data-nome="silvania" data-date="2024-10-04">-</td>
                    <td data-toggle="tooltip" data-original-title="Total" data-placement="Top" style="background: rgb(173, 173, 173); padding: 0.5rem; text-align: center; border: 1px solid lightgray;" data-categoria="Total" data-nome="silvania" data-date="2024-10-04">-</td></tr>
                                
                            
                        
                        
                    </tbody></table></li></ul></li><div id="contentBarINSS" style="position: absolute; flex-direction: column; justify-content: center; align-items: center; background: rgb(204, 204, 204); top: 0px; left: 0px; width: 100%; height: 100%;"><p style="font-size: 1.5em; color: rgb(64, 56, 58);">Carregando...</p><progress id="barINSS" max="100"></progress></div></ul></li><li class="dropdown"><a href="#" title="Tarefas recebidas para hoje" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <span data-toggle="tooltip" data-placement="bottom" title="Tarefas recebidas para hoje" "="" data-original-title="Tarefas recebidas para hoje">
                        <i class="fa fa-fw fa-tasks fdt-cor-preto"></i>
                        &nbsp;
                        <span class="fdt-label-show label label-danger" id="contagemTarefasHoje">
                            0
                        </span>
                    </span>
                </a>
                <ul class="dropdown-menu fdt-menu-user">
                        <li>
                            <a href="http://fabioribeiro.eastus.cloudapp.azure.com/adv/tarefas/default.asp?bsAdvTarefas=s&amp;bsAdvTarefasStatus=p&amp;bsAdvTarefasExecutor=161&amp;bsAdvTarefasDe=27/09/2024&amp;bsAdvTarefasAte=27/09/2024" class="fdt-cor-black">
                                <i class="fa fa-fw fa-tasks"></i>
                                &nbsp;
                                Visualizar Tarefas
                            </a>
                        </li>
                        <li id="limparNotification">
                            <a href="#" class="fdt-cor-black">
                                <i class="fa fa-fw fa-exclamation-triangle"></i>
                                &nbsp;
                                Limpar Notificações
                            </a>
                        </li>
                </ul></li></ul>



						<!-- meus dados e sair para tela normal -->
                        <ul class="nav navbar-nav navbar-right hidden-xs">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle fdt-menu-borda" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-fw fa-user"></i>&nbsp; YURI DIAS <span class="caret"></span></a>
                                <ul class="dropdown-menu fdt-menu-user">
									<li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/fab/meusDados/formulario.asp"><i class="fa fa-fw fa-user"></i>&nbsp;Trocar senha</a></li>
                                    <li><a href="http://fabioribeiro.eastus.cloudapp.azure.com/logoutScript.asp"><i class="fa fa-fw fa-power-off"></i>&nbsp;Sair</a></li>
                                </ul>
                            </li>
                        </ul>



                    </div>
                </nav>
            </header>
            <!-- /CABEÇALHO -->
            <!-- TÍTULO / CAMINHO-->
			<div class="fdt-pg-cabecalho"><h2><i class="fa fa-fw fa-check"></i>&nbsp;&nbsp;Tarefas</h2></div>
            <!-- /TÍTULO / CAMINHO-->
            <!-- CONTEÚDO-->
            <div class="fdt-espaco">
                <div class="fdt-conteudo-central">

				<div class="fdt-pg-header">
                	<a href="defaultAvancada.asp" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Pesquisa avançada"><i class="fdt-icon-header fa fa-sliders fa-chumbo"></i></a>
					
					<a href="../clientes/default.asp?org=tar" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Incluir tarefa de cliente"><i class="fdt-icon-header fa fa-plus fa-roxo"></i></a>
					
				</div>
				<div class="fdt-pg-conteudo">

 					

					<div class="fdt-filtro" style="display:block !important;">
						<form id="fdt-form" method="post" action="default.asp" novalidate="">
							<input type="hidden" name="bsAdvTarefas" value="s">
                            <div class="row">
 								<div class="form-group col-sm-3">
									<label for="bsAdvTarefasResponsavel"><b>**Responsável</b>:</label>
									<div class="btn-group bootstrap-select form-control"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" data-id="bsAdvTarefasResponsavel" title=""><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open"><div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"></div><ul class="dropdown-menu inner" role="menu"><li data-original-index="0" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text"></span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ALÃ FEITOSA CARVALHO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ALINE RIBEIRO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ANA CAROLINA SOARES DE MELO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ANSELMO DAVID DOS SANTOS RODRIGUES</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ARTHUR PORTO ROSENDO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ASLEY RODRIGO DE MELO LIMA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="7"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">BRUNO PRADO GUIMARAES</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="8"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">CAMILA TOJAL MACHADO SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="9"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">CARLOS FERNANDES PEREIRA DA SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="10"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">CARLOS HENRIQUE ESPASIANI </span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="11"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">CARLOS ROBERTO SANTOS ARAUJO DA SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="12"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">CRISTINA BEZERRA DA SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="13"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">DANIEL CABRAL PEREIRA SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="14"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">DIEGO DOS SANTOS SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="15"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">DIEGO MELO SOBRINHO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="16"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">EDUARDO PAIXÃO ROCHA SOBRINHO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="17"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">EFRAIM SILVA CORREA DOS SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="18"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ENZO RIBEIRO </span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="19"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ERINALDO FARO SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="20"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">FABIO RIBEIRO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="21"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">FELIPE PANTA CARDOSO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="22"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Fernando Batista</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="23"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">FERNANDO HENRIQUE BARBOZA NASCIMENTO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="24"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">FLAVIO LUCAS LIMA SOUZA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="25"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">GABRIEL DAVILA FILGUEIRAS MELLONE</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="26"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">GABRIEL EDSON BARBOSA ARIMATEIA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="27"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">GABRIEL FRANÇA VITAL</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="28"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">GLENISSON NASCIMENTO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="29"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">GUILHERME JASMIM</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="30"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">GUILHERME MIGUEL GUIMARÃES SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="31"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">HELLEN VITORIA ROCHA SILVA SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="32"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">HELTON FRADES BRABEC SOUZA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="33"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">HENYR GOIS DOS SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="34"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ITALO DE ANDRADE BEZERRA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="35"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">JHONATHAN DA FONSECA ALMEIDA FLOR</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="36"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">JOSÉ HENRIQUE VASCONCELOS RODRIGUES FONTES</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="37"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">JOSE PEDRO DE GOIS NETO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="38"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">JÚLIA ROBERTA DE FÁTIMA SOUSA ARAÚJO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="39"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">JULIANO OLIVEIRA DE SOUZA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="40"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">KAUÃ DE CARVALHO NASCIMENTO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="41"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">KEVEN FARO DE CARVALHO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="42"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LAIS PEREIRA MORAES</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="43"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LAYNE DA SILVA GOIS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="44"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LEANDRO SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="45"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LEONARDO TEIXEIRA SANTOS SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="46"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LINIKER BERNARDO SOARES</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="47"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LUCAS NATHAN NOGUEIRA DA SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="48"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LUCIANA DOS SANTOS ARAUJO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="49"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LUCIANA LIMA REZENDE</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="50"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LUIZ CARLOS LOPES DOS SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="51"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MARCO AURELIO LEITE GOMES</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="52"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MARCUS VINICIUS DE SOUZA MORAIS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="53"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MARIA LUANNA DE LIMA SOUZA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="54"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MATHEUS CAMPELO DA SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="55"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MATHEUS CORREIA SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="56"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MATHEUS MATOS BARRETO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="57"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MIQUEAS CAMPOS DA SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="58"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MURILLO VICTOR SANTOS ROCHA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="59"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">OSMAR SILVA VIANA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="60"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">OVERLANDIA SANTOS MELO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="61"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">PAULO VICTOR SANTANA TEIXEIRA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="62"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">PAUTISTA BRASILIA ADVOGADOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="63"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">PAUTISTA CIVEL ADVOGADOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="64"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">PAUTISTA PREVIDENCIARIO ADVOGADOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="65"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">PAUTISTA TRABALHISTA ADVOGADOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="66"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">RENATA DE JESUS SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="67"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">RODRIGO AGUIAR SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="68"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">SANDOVAL FILHO CORREIA LIMA FILHO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="69"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">SARA GONÇALVES PINHEIRO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="70"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">SHEYLA SANTANA SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="71"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">SILVANIA PINHEIRO DE LEMOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="72"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">STEFANNY MORAIS DO NASCIMENTO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="73"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Suporte Fábrica de Tempo </span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="74"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">THALYSON KELSON LIMA TORRES</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="75"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">THIAGO SANTOS SANTANA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="76"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">TRICYA MATEUS ROLEMBERG</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="77"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">VICTOR MENDES DOS SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="78"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">VINICIUS SOUSA BOMFIM</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="79"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">WILKE RODRIGUES DE JESUS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="80"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">YAN THADEU PORTO DE OLIVEIRA SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="81"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">YURI DIAS PEREIRA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select name="bsAdvTarefasResponsavel" id="bsAdvTarefasResponsavel" class="form-control selectpicker" data-live-search="true" data-parsley-id="4" tabindex="-98">
										<option value=""></option>
												<option value="166">ALÃ FEITOSA CARVALHO</option>
												
												<option value="14">ALINE RIBEIRO</option>
												
												<option value="134">ANA CAROLINA SOARES DE MELO</option>
												
												<option value="180">ANSELMO DAVID DOS SANTOS RODRIGUES</option>
												
												<option value="219">ARTHUR PORTO ROSENDO</option>
												
												<option value="131">ASLEY RODRIGO DE MELO LIMA</option>
												
												<option value="25">BRUNO PRADO GUIMARAES</option>
												
												<option value="216">CAMILA TOJAL MACHADO SANTOS</option>
												
												<option value="226">CARLOS FERNANDES PEREIRA DA SILVA</option>
												
												<option value="94">CARLOS HENRIQUE ESPASIANI </option>
												
												<option value="96">CARLOS ROBERTO SANTOS ARAUJO DA SILVA</option>
												
												<option value="135">CRISTINA BEZERRA DA SILVA</option>
												
												<option value="132">DANIEL CABRAL PEREIRA SANTOS</option>
												
												<option value="204">DIEGO DOS SANTOS SILVA</option>
												
												<option value="1">DIEGO MELO SOBRINHO</option>
												
												<option value="192">EDUARDO PAIXÃO ROCHA SOBRINHO</option>
												
												<option value="210">EFRAIM SILVA CORREA DOS SANTOS</option>
												
												<option value="189">ENZO RIBEIRO </option>
												
												<option value="225">ERINALDO FARO SANTOS</option>
												
												<option value="2">FABIO RIBEIRO</option>
												
												<option value="108">FELIPE PANTA CARDOSO</option>
												
												<option value="97">Fernando Batista</option>
												
												<option value="158">FERNANDO HENRIQUE BARBOZA NASCIMENTO</option>
												
												<option value="139">FLAVIO LUCAS LIMA SOUZA</option>
												
												<option value="187">GABRIEL DAVILA FILGUEIRAS MELLONE</option>
												
												<option value="211">GABRIEL EDSON BARBOSA ARIMATEIA</option>
												
												<option value="115">GABRIEL FRANÇA VITAL</option>
												
												<option value="104">GLENISSON NASCIMENTO</option>
												
												<option value="100">GUILHERME JASMIM</option>
												
												<option value="224">GUILHERME MIGUEL GUIMARÃES SILVA</option>
												
												<option value="213">HELLEN VITORIA ROCHA SILVA SANTOS</option>
												
												<option value="205">HELTON FRADES BRABEC SOUZA</option>
												
												<option value="62">HENYR GOIS DOS SANTOS</option>
												
												<option value="159">ITALO DE ANDRADE BEZERRA</option>
												
												<option value="197">JHONATHAN DA FONSECA ALMEIDA FLOR</option>
												
												<option value="230">JOSÉ HENRIQUE VASCONCELOS RODRIGUES FONTES</option>
												
												<option value="190">JOSE PEDRO DE GOIS NETO</option>
												
												<option value="215">JÚLIA ROBERTA DE FÁTIMA SOUSA ARAÚJO</option>
												
												<option value="51">JULIANO OLIVEIRA DE SOUZA</option>
												
												<option value="196">KAUÃ DE CARVALHO NASCIMENTO</option>
												
												<option value="93">KEVEN FARO DE CARVALHO</option>
												
												<option value="47">LAIS PEREIRA MORAES</option>
												
												<option value="140">LAYNE DA SILVA GOIS</option>
												
												<option value="64">LEANDRO SANTOS</option>
												
												<option value="221">LEONARDO TEIXEIRA SANTOS SILVA</option>
												
												<option value="193">LINIKER BERNARDO SOARES</option>
												
												<option value="199">LUCAS NATHAN NOGUEIRA DA SILVA</option>
												
												<option value="11">LUCIANA DOS SANTOS ARAUJO</option>
												
												<option value="127">LUCIANA LIMA REZENDE</option>
												
												<option value="212">LUIZ CARLOS LOPES DOS SANTOS</option>
												
												<option value="201">MARCO AURELIO LEITE GOMES</option>
												
												<option value="28">MARCUS VINICIUS DE SOUZA MORAIS</option>
												
												<option value="231">MARIA LUANNA DE LIMA SOUZA</option>
												
												<option value="223">MATHEUS CAMPELO DA SILVA</option>
												
												<option value="175">MATHEUS CORREIA SANTOS</option>
												
												<option value="164">MATHEUS MATOS BARRETO</option>
												
												<option value="162">MIQUEAS CAMPOS DA SILVA</option>
												
												<option value="198">MURILLO VICTOR SANTOS ROCHA</option>
												
												<option value="154">OSMAR SILVA VIANA</option>
												
												<option value="148">OVERLANDIA SANTOS MELO</option>
												
												<option value="52">PAULO VICTOR SANTANA TEIXEIRA</option>
												
												<option value="73">PAUTISTA BRASILIA ADVOGADOS</option>
												
												<option value="70">PAUTISTA CIVEL ADVOGADOS</option>
												
												<option value="71">PAUTISTA PREVIDENCIARIO ADVOGADOS</option>
												
												<option value="72">PAUTISTA TRABALHISTA ADVOGADOS</option>
												
												<option value="203">RENATA DE JESUS SANTOS</option>
												
												<option value="55">RODRIGO AGUIAR SANTOS</option>
												
												<option value="22">SANDOVAL FILHO CORREIA LIMA FILHO</option>
												
												<option value="23">SARA GONÇALVES PINHEIRO</option>
												
												<option value="207">SHEYLA SANTANA SANTOS</option>
												
												<option value="24">SILVANIA PINHEIRO DE LEMOS</option>
												
												<option value="222">STEFANNY MORAIS DO NASCIMENTO</option>
												
												<option value="36">Suporte Fábrica de Tempo </option>
												
												<option value="206">THALYSON KELSON LIMA TORRES</option>
												
												<option value="217">THIAGO SANTOS SANTANA</option>
												
												<option value="153">TRICYA MATEUS ROLEMBERG</option>
												
												<option value="120">VICTOR MENDES DOS SANTOS</option>
												
												<option value="188">VINICIUS SOUSA BOMFIM</option>
												
												<option value="147">WILKE RODRIGUES DE JESUS</option>
												
												<option value="229">YAN THADEU PORTO DE OLIVEIRA SANTOS</option>
												
												<option value="161">YURI DIAS PEREIRA</option>
												
									</select></div>
								</div>
 								<div class="form-group col-sm-3">
									<label for="bsAdvTarefasExecutor"><b>**Executor</b>:</label>
									<div class="btn-group bootstrap-select show-tick form-control"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" data-id="bsAdvTarefasExecutor" title="YURI DIAS PEREIRA"><span class="filter-option pull-left">YURI DIAS PEREIRA</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open"><div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"></div><ul class="dropdown-menu inner" role="menu"><li data-original-index="0"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ALÃ FEITOSA CARVALHO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ALINE RIBEIRO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ANA CAROLINA SOARES DE MELO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ANSELMO DAVID DOS SANTOS RODRIGUES</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ARTHUR PORTO ROSENDO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ASLEY RODRIGO DE MELO LIMA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">BRUNO PRADO GUIMARAES</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="7"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">CAMILA TOJAL MACHADO SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="8"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">CARLOS FERNANDES PEREIRA DA SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="9"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">CARLOS HENRIQUE ESPASIANI </span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="10"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">CARLOS ROBERTO SANTOS ARAUJO DA SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="11"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">CRISTINA BEZERRA DA SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="12"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">DANIEL CABRAL PEREIRA SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="13"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">DIEGO DOS SANTOS SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="14"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">DIEGO MELO SOBRINHO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="15"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">EDUARDO PAIXÃO ROCHA SOBRINHO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="16"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">EFRAIM SILVA CORREA DOS SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="17"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ENZO RIBEIRO </span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="18"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ERINALDO FARO SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="19"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">FABIO RIBEIRO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="20"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">FELIPE PANTA CARDOSO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="21"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Fernando Batista</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="22"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">FERNANDO HENRIQUE BARBOZA NASCIMENTO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="23"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">FLAVIO LUCAS LIMA SOUZA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="24"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">GABRIEL DAVILA FILGUEIRAS MELLONE</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="25"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">GABRIEL EDSON BARBOSA ARIMATEIA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="26"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">GABRIEL FRANÇA VITAL</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="27"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">GLENISSON NASCIMENTO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="28"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">GUILHERME JASMIM</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="29"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">GUILHERME MIGUEL GUIMARÃES SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="30"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">HELLEN VITORIA ROCHA SILVA SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="31"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">HELTON FRADES BRABEC SOUZA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="32"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">HENYR GOIS DOS SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="33"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">ITALO DE ANDRADE BEZERRA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="34"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">JHONATHAN DA FONSECA ALMEIDA FLOR</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="35"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">JOSÉ HENRIQUE VASCONCELOS RODRIGUES FONTES</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="36"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">JOSE PEDRO DE GOIS NETO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="37"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">JÚLIA ROBERTA DE FÁTIMA SOUSA ARAÚJO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="38"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">JULIANO OLIVEIRA DE SOUZA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="39"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">KAUÃ DE CARVALHO NASCIMENTO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="40"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">KEVEN FARO DE CARVALHO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="41"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LAIS PEREIRA MORAES</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="42"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LAYNE DA SILVA GOIS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="43"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LEANDRO SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="44"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LEONARDO TEIXEIRA SANTOS SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="45"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LINIKER BERNARDO SOARES</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="46"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LUCAS NATHAN NOGUEIRA DA SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="47"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LUCIANA DOS SANTOS ARAUJO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="48"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LUCIANA LIMA REZENDE</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="49"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">LUIZ CARLOS LOPES DOS SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="50"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MARCO AURELIO LEITE GOMES</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="51"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MARCUS VINICIUS DE SOUZA MORAIS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="52"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MARIA LUANNA DE LIMA SOUZA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="53"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MATHEUS CAMPELO DA SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="54"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MATHEUS CORREIA SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="55"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MATHEUS MATOS BARRETO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="56"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MIQUEAS CAMPOS DA SILVA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="57"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">MURILLO VICTOR SANTOS ROCHA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="58"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">OSMAR SILVA VIANA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="59"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">OVERLANDIA SANTOS MELO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="60"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">PAULO VICTOR SANTANA TEIXEIRA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="61"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">PAUTISTA BRASILIA ADVOGADOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="62"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">PAUTISTA CIVEL ADVOGADOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="63"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">PAUTISTA PREVIDENCIARIO ADVOGADOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="64"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">PAUTISTA TRABALHISTA ADVOGADOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="65"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">RENATA DE JESUS SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="66"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">RODRIGO AGUIAR SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="67"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">SANDOVAL FILHO CORREIA LIMA FILHO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="68"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">SARA GONÇALVES PINHEIRO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="69"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">SHEYLA SANTANA SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="70"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">SILVANIA PINHEIRO DE LEMOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="71"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">STEFANNY MORAIS DO NASCIMENTO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="72"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Suporte Fábrica de Tempo </span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="73"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">THALYSON KELSON LIMA TORRES</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="74"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">THIAGO SANTOS SANTANA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="75"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">TRICYA MATEUS ROLEMBERG</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="76"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">VICTOR MENDES DOS SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="77"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">VINICIUS SOUSA BOMFIM</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="78"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">WILKE RODRIGUES DE JESUS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="79"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">YAN THADEU PORTO DE OLIVEIRA SANTOS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="80" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">YURI DIAS PEREIRA</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select name="bsAdvTarefasExecutor" id="bsAdvTarefasExecutor" class="form-control selectpicker" data-live-search="true" multiple="" data-parsley-multiple="bsAdvTarefasExecutor" data-parsley-id="6" tabindex="-98">
										
												<option value="166">ALÃ FEITOSA CARVALHO</option>
												
												<option value="14">ALINE RIBEIRO</option>
												
												<option value="134">ANA CAROLINA SOARES DE MELO</option>
												
												<option value="180">ANSELMO DAVID DOS SANTOS RODRIGUES</option>
												
												<option value="219">ARTHUR PORTO ROSENDO</option>
												
												<option value="131">ASLEY RODRIGO DE MELO LIMA</option>
												
												<option value="25">BRUNO PRADO GUIMARAES</option>
												
												<option value="216">CAMILA TOJAL MACHADO SANTOS</option>
												
												<option value="226">CARLOS FERNANDES PEREIRA DA SILVA</option>
												
												<option value="94">CARLOS HENRIQUE ESPASIANI </option>
												
												<option value="96">CARLOS ROBERTO SANTOS ARAUJO DA SILVA</option>
												
												<option value="135">CRISTINA BEZERRA DA SILVA</option>
												
												<option value="132">DANIEL CABRAL PEREIRA SANTOS</option>
												
												<option value="204">DIEGO DOS SANTOS SILVA</option>
												
												<option value="1">DIEGO MELO SOBRINHO</option>
												
												<option value="192">EDUARDO PAIXÃO ROCHA SOBRINHO</option>
												
												<option value="210">EFRAIM SILVA CORREA DOS SANTOS</option>
												
												<option value="189">ENZO RIBEIRO </option>
												
												<option value="225">ERINALDO FARO SANTOS</option>
												
												<option value="2">FABIO RIBEIRO</option>
												
												<option value="108">FELIPE PANTA CARDOSO</option>
												
												<option value="97">Fernando Batista</option>
												
												<option value="158">FERNANDO HENRIQUE BARBOZA NASCIMENTO</option>
												
												<option value="139">FLAVIO LUCAS LIMA SOUZA</option>
												
												<option value="187">GABRIEL DAVILA FILGUEIRAS MELLONE</option>
												
												<option value="211">GABRIEL EDSON BARBOSA ARIMATEIA</option>
												
												<option value="115">GABRIEL FRANÇA VITAL</option>
												
												<option value="104">GLENISSON NASCIMENTO</option>
												
												<option value="100">GUILHERME JASMIM</option>
												
												<option value="224">GUILHERME MIGUEL GUIMARÃES SILVA</option>
												
												<option value="213">HELLEN VITORIA ROCHA SILVA SANTOS</option>
												
												<option value="205">HELTON FRADES BRABEC SOUZA</option>
												
												<option value="62">HENYR GOIS DOS SANTOS</option>
												
												<option value="159">ITALO DE ANDRADE BEZERRA</option>
												
												<option value="197">JHONATHAN DA FONSECA ALMEIDA FLOR</option>
												
												<option value="230">JOSÉ HENRIQUE VASCONCELOS RODRIGUES FONTES</option>
												
												<option value="190">JOSE PEDRO DE GOIS NETO</option>
												
												<option value="215">JÚLIA ROBERTA DE FÁTIMA SOUSA ARAÚJO</option>
												
												<option value="51">JULIANO OLIVEIRA DE SOUZA</option>
												
												<option value="196">KAUÃ DE CARVALHO NASCIMENTO</option>
												
												<option value="93">KEVEN FARO DE CARVALHO</option>
												
												<option value="47">LAIS PEREIRA MORAES</option>
												
												<option value="140">LAYNE DA SILVA GOIS</option>
												
												<option value="64">LEANDRO SANTOS</option>
												
												<option value="221">LEONARDO TEIXEIRA SANTOS SILVA</option>
												
												<option value="193">LINIKER BERNARDO SOARES</option>
												
												<option value="199">LUCAS NATHAN NOGUEIRA DA SILVA</option>
												
												<option value="11">LUCIANA DOS SANTOS ARAUJO</option>
												
												<option value="127">LUCIANA LIMA REZENDE</option>
												
												<option value="212">LUIZ CARLOS LOPES DOS SANTOS</option>
												
												<option value="201">MARCO AURELIO LEITE GOMES</option>
												
												<option value="28">MARCUS VINICIUS DE SOUZA MORAIS</option>
												
												<option value="231">MARIA LUANNA DE LIMA SOUZA</option>
												
												<option value="223">MATHEUS CAMPELO DA SILVA</option>
												
												<option value="175">MATHEUS CORREIA SANTOS</option>
												
												<option value="164">MATHEUS MATOS BARRETO</option>
												
												<option value="162">MIQUEAS CAMPOS DA SILVA</option>
												
												<option value="198">MURILLO VICTOR SANTOS ROCHA</option>
												
												<option value="154">OSMAR SILVA VIANA</option>
												
												<option value="148">OVERLANDIA SANTOS MELO</option>
												
												<option value="52">PAULO VICTOR SANTANA TEIXEIRA</option>
												
												<option value="73">PAUTISTA BRASILIA ADVOGADOS</option>
												
												<option value="70">PAUTISTA CIVEL ADVOGADOS</option>
												
												<option value="71">PAUTISTA PREVIDENCIARIO ADVOGADOS</option>
												
												<option value="72">PAUTISTA TRABALHISTA ADVOGADOS</option>
												
												<option value="203">RENATA DE JESUS SANTOS</option>
												
												<option value="55">RODRIGO AGUIAR SANTOS</option>
												
												<option value="22">SANDOVAL FILHO CORREIA LIMA FILHO</option>
												
												<option value="23">SARA GONÇALVES PINHEIRO</option>
												
												<option value="207">SHEYLA SANTANA SANTOS</option>
												
												<option value="24">SILVANIA PINHEIRO DE LEMOS</option>
												
												<option value="222">STEFANNY MORAIS DO NASCIMENTO</option>
												
												<option value="36">Suporte Fábrica de Tempo </option>
												
												<option value="206">THALYSON KELSON LIMA TORRES</option>
												
												<option value="217">THIAGO SANTOS SANTANA</option>
												
												<option value="153">TRICYA MATEUS ROLEMBERG</option>
												
												<option value="120">VICTOR MENDES DOS SANTOS</option>
												
												<option value="188">VINICIUS SOUSA BOMFIM</option>
												
												<option value="147">WILKE RODRIGUES DE JESUS</option>
												
												<option value="229">YAN THADEU PORTO DE OLIVEIRA SANTOS</option>
												
												<option value="161" selected="">YURI DIAS PEREIRA</option>
												
									</select></div>
								</div>
                                <div class="col-sm-6">
                                    <label for="bsAdvTarefasDe"><b>*Período</b>:</label>
                                    <div class="datepicker input-group">
                                        <input type="text" name="bsAdvTarefasDe" id="bsAdvTarefasDe" value="27/09/2024" class="input-sm form-control fdt-mask-data" data-parsley-id="8">
                                        <span class="input-group-addon">até</span>
                                        <input type="text" name="bsAdvTarefasAte" id="bsAdvTarefasAte" value="27/09/2024" class="input-sm form-control fdt-mask-data" data-parsley-id="10">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
 								<div class="form-group col-sm-3">
									<label for="bsAdvTarefasTecnica">Operação:</label>
									<div class="btn-group bootstrap-select form-control"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" data-id="bsAdvTarefasTecnica" title="Todos"><span class="filter-option pull-left">Todos</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner" role="menu"><li data-original-index="0" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Todos</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Técnicas</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Normais</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select name="bsAdvTarefasTecnica" id="bsAdvTarefasTecnica" class="form-control selectpicker" data-parsley-id="12" tabindex="-98">
										<option value="">Todos</option>
										<option value="1">Técnicas</option>
										<option value="0">Normais</option>
									</select></div>
								</div>
 								<div class="form-group col-sm-3">
									<label for="bsAdvTarefasTipo">Tipo:</label>
									<div class="btn-group bootstrap-select form-control"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" data-id="bsAdvTarefasTipo" title="Todos"><span class="filter-option pull-left">Todos</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open"><div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"></div><ul class="dropdown-menu inner" role="menu"><li data-original-index="0" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Todos</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Acompanhamento comercial</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Acompanhamento Ouvidoria</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Acompanhamento redes sociais</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Acompanhar</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Acompanhar Implantação de Benefício</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Acórdão</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="7"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Agravo</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="8"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Análise</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="9"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Analise comercial</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="10"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Análise de Contrato</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="11"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Análise de exigência INSS Digital</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="12"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Análise de Processo</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="13"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Análise INSS Digital</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="14"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Andamento Processual</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="15"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Apelação</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="16"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Atendimento (Externo)</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="17"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Atendimento (Interno)</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="18"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Ato Ordinatório</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="19"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Atualizar Cálculos</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="20"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Audiência Conciliatória</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="21"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Audiência de Instrução</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="22"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Audiência de Instrução e Julgamento</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="23"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Audiência de Interrogatório</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="24"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Audiência de Julgamento</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="25"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Audiência de Sustentação Oral</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="26"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Audiência Inaugural</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="27"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Audiência Razões Finais</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="28"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Audiência Una</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="29"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Benefício Implantado</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="30"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Cálculos</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="31"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Cálculos de Revisão</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="32"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">CARGA DO PROCESSO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="33"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Carta Comercial</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="34"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Chat GPT</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="35"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Ciência</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="36"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Consulta</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="37"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Contatar Cliente</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="38"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Contatar Cliente (Advogado)</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="39"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Contato Comercial</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="40"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Contrarrazões</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="41"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Criar Pré-processo</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="42"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Cumprimento de sentença</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="43"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Cumprimento Exigência INSS Digital</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="44"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Decisão</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="45"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Demora Injustificada</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="46"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Despacho</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="47"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Diligência</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="48"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Diligência (Acompanhamento Processual)</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="49"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Diligência (Cópias)</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="50"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Diligência (Protocolo)</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="51"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Distribuir</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="52"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Elaboração de Contrato</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="53"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Elaboração de Parecer</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="54"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Elaboração de Petição</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="55"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Elaboração de Relatório</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="56"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Embargo</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="57"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Emendar</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="58"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Envio de AR</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="59"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Execução</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="60"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Exigência INSS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="61"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Gestão</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="62"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Intervenção - Controle INSS Digital</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="63"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Intimação</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="64"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Lembrar Cliente</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="65"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Mandado de Segurança</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="66"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Manifestação</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="67"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Marcar/Remarcar atendimento</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="68"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Nova Entrada</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="69"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Nova Entrada Processo ADM INSS Digital</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="70"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Pedido de Prorrogação Auxílio Doença - ADM</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="71"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Pedido de Prorrogação Auxílio Doença - Judicial</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="72"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Pendências ADM</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="73"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Pendencias INSS</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="74"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Pesquisa de Jurisprudência/Doutrina</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="75"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Prioridade - Perícia</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="76"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Processo</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="77"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Processo Administrativo Indeferido</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="78"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Processo Arquivado</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="79"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Protocolo Aux. Doença Adm</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="80"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Protocolo de Processo Adm - Com pendência</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="81"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Protocolo de Processo Adm - INSS Digital</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="82"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Provas</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="83"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Quesitos</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="84"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Razões Finais</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="85"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Recebimento de Alvará</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="86"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Recebimento de Honorários</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="87"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Recebimento de Precatório</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="88"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Recebimento de RPV</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="89"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Recurso</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="90"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Refazer Cálculos</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="91"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Réplica</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="92"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Reunião</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="93"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Reunião com Cliente</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="94"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Reunião com Equipe</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="95"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Reunião com Sócio(s)</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="96"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Revisão de Prazo</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="97"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Revisão de Relatório</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="98"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">RPV ANTIGO</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="99"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">RPV TRF1 Bahia</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="100"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">RPV TRF1 Brasìlia</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="101"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">RPV TRF1 Goiàs</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="102"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">RPV TRF5 Aracaju</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="103"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">RPV TRF5 Estância</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="104"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Sentença</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="105"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Sessão de Julgamento</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="106"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">SMS e WhatsApp</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="107"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Sustentação Oral</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="108"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Tarefa Encerrada Sem Providência</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select name="bsAdvTarefasTipo" id="bsAdvTarefasTipo" class="form-control selectpicker" data-live-search="true" data-parsley-id="14" tabindex="-98">
										<option value="">Todos</option>
										
												<option value="94">Acompanhamento comercial</option>
												
												<option value="78">Acompanhamento Ouvidoria</option>
												
												<option value="91">Acompanhamento redes sociais</option>
												
												<option value="106">Acompanhar</option>
												
												<option value="119">Acompanhar Implantação de Benefício</option>
												
												<option value="89">Acórdão</option>
												
												<option value="52">Agravo</option>
												
												<option value="77">Análise</option>
												
												<option value="93">Analise comercial</option>
												
												<option value="7">Análise de Contrato</option>
												
												<option value="98">Análise de exigência INSS Digital</option>
												
												<option value="39">Análise de Processo</option>
												
												<option value="68">Análise INSS Digital</option>
												
												<option value="86">Andamento Processual</option>
												
												<option value="49">Apelação</option>
												
												<option value="23">Atendimento (Externo)</option>
												
												<option value="24">Atendimento (Interno)</option>
												
												<option value="101">Ato Ordinatório</option>
												
												<option value="41">Atualizar Cálculos</option>
												
												<option value="25">Audiência Conciliatória</option>
												
												<option value="28">Audiência de Instrução</option>
												
												<option value="27">Audiência de Instrução e Julgamento</option>
												
												<option value="67">Audiência de Interrogatório</option>
												
												<option value="29">Audiência de Julgamento</option>
												
												<option value="31">Audiência de Sustentação Oral</option>
												
												<option value="30">Audiência Inaugural</option>
												
												<option value="79">Audiência Razões Finais</option>
												
												<option value="26">Audiência Una</option>
												
												<option value="123">Benefício Implantado</option>
												
												<option value="37">Cálculos</option>
												
												<option value="105">Cálculos de Revisão</option>
												
												<option value="43">CARGA DO PROCESSO</option>
												
												<option value="92">Carta Comercial</option>
												
												<option value="120">Chat GPT</option>
												
												<option value="113">Ciência</option>
												
												<option value="16">Consulta</option>
												
												<option value="15">Contatar Cliente</option>
												
												<option value="75">Contatar Cliente (Advogado)</option>
												
												<option value="74">Contato Comercial</option>
												
												<option value="51">Contrarrazões</option>
												
												<option value="122">Criar Pré-processo</option>
												
												<option value="46">Cumprimento de sentença</option>
												
												<option value="71">Cumprimento Exigência INSS Digital</option>
												
												<option value="82">Decisão</option>
												
												<option value="110">Demora Injustificada</option>
												
												<option value="81">Despacho</option>
												
												<option value="65">Diligência</option>
												
												<option value="21">Diligência (Acompanhamento Processual)</option>
												
												<option value="17">Diligência (Cópias)</option>
												
												<option value="18">Diligência (Protocolo)</option>
												
												<option value="73">Distribuir</option>
												
												<option value="6">Elaboração de Contrato</option>
												
												<option value="4">Elaboração de Parecer</option>
												
												<option value="20">Elaboração de Petição</option>
												
												<option value="5">Elaboração de Relatório</option>
												
												<option value="53">Embargo</option>
												
												<option value="35">Emendar</option>
												
												<option value="121">Envio de AR</option>
												
												<option value="84">Execução</option>
												
												<option value="96">Exigência INSS</option>
												
												<option value="118">Gestão</option>
												
												<option value="70">Intervenção - Controle INSS Digital</option>
												
												<option value="36">Intimação</option>
												
												<option value="63">Lembrar Cliente</option>
												
												<option value="109">Mandado de Segurança</option>
												
												<option value="44">Manifestação</option>
												
												<option value="115">Marcar/Remarcar atendimento</option>
												
												<option value="54">Nova Entrada</option>
												
												<option value="99">Nova Entrada Processo ADM INSS Digital</option>
												
												<option value="103">Pedido de Prorrogação Auxílio Doença - ADM</option>
												
												<option value="102">Pedido de Prorrogação Auxílio Doença - Judicial</option>
												
												<option value="83">Pendências ADM</option>
												
												<option value="104">Pendencias INSS</option>
												
												<option value="19">Pesquisa de Jurisprudência/Doutrina</option>
												
												<option value="116">Prioridade - Perícia</option>
												
												<option value="112">Processo</option>
												
												<option value="111">Processo Administrativo Indeferido</option>
												
												<option value="117">Processo Arquivado</option>
												
												<option value="108">Protocolo Aux. Doença Adm</option>
												
												<option value="107">Protocolo de Processo Adm - Com pendência</option>
												
												<option value="97">Protocolo de Processo Adm - INSS Digital</option>
												
												<option value="85">Provas</option>
												
												<option value="87">Quesitos</option>
												
												<option value="88">Razões Finais</option>
												
												<option value="57">Recebimento de Alvará</option>
												
												<option value="100">Recebimento de Honorários</option>
												
												<option value="56">Recebimento de Precatório</option>
												
												<option value="38">Recebimento de RPV</option>
												
												<option value="50">Recurso</option>
												
												<option value="42">Refazer Cálculos</option>
												
												<option value="48">Réplica</option>
												
												<option value="40">Reunião</option>
												
												<option value="32">Reunião com Cliente</option>
												
												<option value="33">Reunião com Equipe</option>
												
												<option value="34">Reunião com Sócio(s)</option>
												
												<option value="3">Revisão de Prazo</option>
												
												<option value="22">Revisão de Relatório</option>
												
												<option value="55">RPV ANTIGO</option>
												
												<option value="58">RPV TRF1 Bahia</option>
												
												<option value="59">RPV TRF1 Brasìlia</option>
												
												<option value="60">RPV TRF1 Goiàs</option>
												
												<option value="61">RPV TRF5 Aracaju</option>
												
												<option value="62">RPV TRF5 Estância</option>
												
												<option value="80">Sentença</option>
												
												<option value="90">Sessão de Julgamento</option>
												
												<option value="76">SMS e WhatsApp</option>
												
												<option value="66">Sustentação Oral</option>
												
												<option value="69">Tarefa Encerrada Sem Providência</option>
												
									</select></div>
								</div>	
 								<div class="form-group col-sm-3">
									<label for="bsAdvTarefasStatus">Status:</label>
									<div class="btn-group bootstrap-select form-control"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" data-id="bsAdvTarefasStatus" title="Todos" aria-expanded="false"><span class="filter-option pull-left">Todos</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open" style="max-height: 373px; overflow: hidden; min-height: 42px;"><div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"></div><ul class="dropdown-menu inner" role="menu" style="max-height: 329px; overflow-y: auto; min-height: 0px;"><li data-original-index="0" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Todos</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1" class="active"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Pendentes</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Encerrados</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select name="bsAdvTarefasStatus" id="bsAdvTarefasStatus" class="form-control selectpicker" data-live-search="true" data-parsley-id="16" tabindex="-98">
										<option value="">Todos</option>
										<option value="p" selected="">Pendentes</option>
										<option value="e">Encerrados</option>
									</select></div>
								</div>
 								<div class="form-group col-sm-3">
									<label for="bsAdvTarefasPauta">Pauta:</label>
									<div class="btn-group bootstrap-select form-control"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" data-id="bsAdvTarefasPauta" title="Todos"><span class="filter-option pull-left">Todos</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner" role="menu"><li data-original-index="0" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Todos</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Sim</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Sim, com responsável</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Sim, pend. responsável</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">Não</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select name="bsAdvTarefasPauta" id="bsAdvTarefasPauta" class="form-control selectpicker" data-parsley-id="18" tabindex="-98">
										<option value="">Todos</option>
										<option value="S">Sim</option>
										<option value="SR">Sim, com responsável</option>
										<option value="SP">Sim, pend. responsável</option>
										<option value="N">Não</option>
									</select></div>
								</div>
								<div class="form-group col-sm-2">
									<label for="bsAdvTarefasCliente">Cliente:</label>
									<input type="text" name="bsAdvTarefasCliente" id="bsAdvTarefasCliente" value="" class="form-control" data-parsley-id="20">
								</div>
								<div class="form-group col-sm-2">
									<label for="bsAdvTarefasPreProcesso">Pasta do pré-processo:</label>
									<input type="text" name="bsAdvTarefasPreProcesso" id="bsAdvTarefasPreProcesso" value="" class="form-control" data-parsley-id="22">
								</div>
								<div class="form-group col-sm-2">
									<label for="bsAdvTarefasCpf">CPF:</label>
									<input type="text" name="bsAdvTarefasCpf" id="bsAdvTarefasCpf" value="" class="form-control fdt-mask-cpf" data-parsley-id="24">
								</div>
								<div class="form-group col-sm-2">
									<label for="bsAdvTarefasCompromisso">Id.Compromisso:</label>
									<input type="text" name="bsAdvTarefasCompromisso" id="bsAdvTarefasCompromisso" value="" class="form-control" data-parsley-id="26">
								</div>
                                <div class="col-sm-2">
		                            <input type="submit" name="filtrar" value="Filtrar" class="botaoFiltro btn fdt-btn-oliva">
		                            <a id="Conteudo_ResetarFiltro" class="botaoFiltro btn btn-danger" href="default.asp?bsAdvTarefas=l&amp;exportarExcel=">Limpar</a>
                                </div>
								
                            </div>
                        </form>
	                </div>

	                

	                    <div class="table-responsive">
							
	                        <table class="table table-hover">
								<thead>
	                                <tr>
										<th class="text-center" width="20"></th>
										<th class="text-center" width="30"></th>
										<th>Descrição<br><span class="nor ita cin fs13">Local</span></th>
										<th>Tipo<br><span class="nor ita cin fs13">Compromisso</span></th>
										<th>Cliente<br><span class="nor ita cin fs13">Status</span></th>
										<th>Responsável<br><span class="nor ita cin fs13">Executor</span></th>
										<th class="text-center" width="30"><i class="icon fa fa-clock-o" data-toggle="tooltip" data-placement="top" title="" data-original-title="Agendada"></i></th>
										<th>Data/Prazo<br><span class="nor ita cin fs13">Horário</span></th>
										<th class="text-center" width="30"><i class="icon fa fa-exclamation-triangle" data-toggle="tooltip" data-placement="top" title="" data-original-title="Atenção"></i></th>
									</tr>
								</thead>
								<tbody>
									
											<tr>
												<td class="text-center fdt-counter">1</td>
												<td width="30" class="fdt-acao">
													<div class="fdt-acoes-mostra"><a class="fdt-acoes" data-toggle="tooltip" data-placement="top" title="" data-original-title="Ações"><i class="fa fa-bars"></i></a>
														<div class="fdt-acoes-hide" style="width: 230px; display: none;">
															<a href="ficha.asp?idPK=596478" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Visualizar"><i class="fa fa-eye fa-azul"></i></a>
															
																		<a href="#" onclick="return false;" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Sem Responsabilidade"><i class="fa fa-edit fa-cinza"></i></a>
																	
																	<a href="finalizarScript.asp?idPK=596478&amp;superior=False&amp;idResponsavelAvisado=54" class="fdt-icon confirmaOperacao" data-mensagemconfirmacao="Deseja finalizar esta tarefa?" data-toggle="tooltip" data-placement="top" title="" data-original-title="Finalizar"><i class="fa fa-flag-checkered fa-laranja"></i></a>
																
																	<a href="../clientes/ficha.asp?idPK=16510&amp;idTRorg=596478" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Ficha do cliente"><i class="fdt-icon-header fa fa-building-o fa-coral"></i></a>
																
																<a href="historicoAtualizacoes.asp?idPK=596478" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Hist. Atualização"><i class="fa fa-keyboard-o fdt-cor-chumbo"></i></a>
																
																		<a href="#" onclick="return false;" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Finalizada"><i class="fa fa-times fa-cinza"></i></a>
																	
														<a rel="noreferrer noopener" target="_blank" href="https://pje1g.trf5.jus.br/pje/login.seam" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="PJE2X"><i class="fdt-icon-header fa fa-link fa-vermelho"></i></a></div>
													</div>
												</td>
												<td>00085853620244058500 - PERÍCIA MÉDICA DE JOSE CARL...<br><span class="ita cin fs13"></span></td>
												<td>Lembrar Cliente<br><span class="ita cin fs13">PERÍCIA MÉDICA</span></td>
												<td>
													JOSE CARLOS DOS SANTOS<br>
													<span class="text-center fdt-cor-vermelho-indigo"><i class="icon fa fa-clock-o"></i>&nbsp;Pendente</span>
												</td>
												<td>JULIANO OLIVEIRA DE SOUZA
														<br><span class="tag fdt-bg-dourado ita cin fs13">Criado por: ASLEY RODRIGO</span>
													
													<br><span class="ita cin fs13">YURI DIAS PEREIRA</span>
												</td>
												<td class="text-center">
													
														<i class="icon fa fa-circle-o-notch fdt-cor-cinza" data-toggle="tooltip" data-placement="top" title="" data-original-title="Não"></i>
													
												</td>
												<td>27/09/2024<br><span class="ita cin fs13"></span></td>
												<td class="text-center">
													
															<i class="icon fa fa-check-square fdt-cor-verde" data-toggle="tooltip" data-placement="top" title="" data-original-title="Dentro do prazo do compromisso"></i>
														
												</td>
											</tr>
	  										
											<tr>
												<td class="text-center fdt-counter">2</td>
												<td width="30" class="fdt-acao">
													<div class="fdt-acoes-mostra"><a class="fdt-acoes" data-toggle="tooltip" data-placement="top" title="" data-original-title="Ações"><i class="fa fa-bars"></i></a>
														<div class="fdt-acoes-hide" style="width: 230px; display: none;">
															<a href="ficha.asp?idPK=604047" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Visualizar"><i class="fa fa-eye fa-azul"></i></a>
															
																		<a href="#" onclick="return false;" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Sem Responsabilidade"><i class="fa fa-edit fa-cinza"></i></a>
																	
																	<a href="finalizarScript.asp?idPK=604047&amp;superior=False&amp;idResponsavelAvisado=54" class="fdt-icon confirmaOperacao" data-mensagemconfirmacao="Deseja finalizar esta tarefa?" data-toggle="tooltip" data-placement="top" title="" data-original-title="Finalizar"><i class="fa fa-flag-checkered fa-laranja"></i></a>
																
																	<a href="../clientes/ficha.asp?idPK=18572&amp;idTRorg=604047" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Ficha do cliente"><i class="fdt-icon-header fa fa-building-o fa-coral"></i></a>
																
																<a href="historicoAtualizacoes.asp?idPK=604047" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Hist. Atualização"><i class="fa fa-keyboard-o fdt-cor-chumbo"></i></a>
																
																		<a href="#" onclick="return false;" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Finalizada"><i class="fa fa-times fa-cinza"></i></a>
																	
														<a rel="noreferrer noopener" target="_blank" href="https://pje1g.trf5.jus.br/pje/login.seam" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="PJE2X"><i class="fdt-icon-header fa fa-link fa-vermelho"></i></a></div>
													</div>
												</td>
												<td>00107973020244058500 - PERÍCIA MÉDICA DE JOSÉ GONÇ...<br><span class="ita cin fs13"></span></td>
												<td>Contatar Cliente<br><span class="ita cin fs13">PERÍCIA MÉDICA</span></td>
												<td>
													JOSÉ GONÇALO DA COSTA<br>
													<span class="text-center fdt-cor-vermelho-indigo"><i class="icon fa fa-clock-o"></i>&nbsp;Pendente</span>
												</td>
												<td>JULIANO OLIVEIRA DE SOUZA
														<br><span class="tag fdt-bg-dourado ita cin fs13">Criado por: ASLEY RODRIGO</span>
													
													<br><span class="ita cin fs13">YURI DIAS PEREIRA</span>
												</td>
												<td class="text-center">
													
														<i class="icon fa fa-circle-o-notch fdt-cor-cinza" data-toggle="tooltip" data-placement="top" title="" data-original-title="Não"></i>
													
												</td>
												<td>27/09/2024<br><span class="ita cin fs13"></span></td>
												<td class="text-center">
													
															<i class="icon fa fa-check-square fdt-cor-verde" data-toggle="tooltip" data-placement="top" title="" data-original-title="Dentro do prazo do compromisso"></i>
														
												</td>
											</tr>
	  										
											<tr>
												<td class="text-center fdt-counter">3</td>
												<td width="30" class="fdt-acao">
													<div class="fdt-acoes-mostra"><a class="fdt-acoes" data-toggle="tooltip" data-placement="top" title="" data-original-title="Ações"><i class="fa fa-bars"></i></a>
														<div class="fdt-acoes-hide" style="width: 230px; display: none;">
															<a href="ficha.asp?idPK=604158" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Visualizar"><i class="fa fa-eye fa-azul"></i></a>
															
																		<a href="#" onclick="return false;" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Sem Responsabilidade"><i class="fa fa-edit fa-cinza"></i></a>
																	
																	<a href="finalizarScript.asp?idPK=604158&amp;superior=False&amp;idResponsavelAvisado=54" class="fdt-icon confirmaOperacao" data-mensagemconfirmacao="Deseja finalizar esta tarefa?" data-toggle="tooltip" data-placement="top" title="" data-original-title="Finalizar"><i class="fa fa-flag-checkered fa-laranja"></i></a>
																
																	<a href="../clientes/ficha.asp?idPK=12083&amp;idTRorg=604158" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Ficha do cliente"><i class="fdt-icon-header fa fa-building-o fa-coral"></i></a>
																
																<a href="historicoAtualizacoes.asp?idPK=604158" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Hist. Atualização"><i class="fa fa-keyboard-o fdt-cor-chumbo"></i></a>
																
																		<a href="#" onclick="return false;" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Finalizada"><i class="fa fa-times fa-cinza"></i></a>
																	
														<a rel="noreferrer noopener" target="_blank" href="https://www.tjse.jus.br/portaldoadvogado/" class="fdt-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="TJSE"><i class="fdt-icon-header fa fa-link fa-vermelho"></i></a></div>
													</div>
												</td>
												<td>202410201331 - AUDIÊNCIA CONCILIATÓRIA DE LUZINETE...<br><span class="ita cin fs13"></span></td>
												<td>Contatar Cliente<br><span class="ita cin fs13">AUDIÊNCIA DE CONCILIAÇÃO</span></td>
												<td>
													LUZINETE MELINDA DOS SANTOS NEPOMUCENO<br>
													<span class="text-center fdt-cor-vermelho-indigo"><i class="icon fa fa-clock-o"></i>&nbsp;Pendente</span>
												</td>
												<td>JULIANO OLIVEIRA DE SOUZA
														<br><span class="tag fdt-bg-dourado ita cin fs13">Criado por: ASLEY RODRIGO</span>
													
													<br><span class="ita cin fs13">YURI DIAS PEREIRA</span>
												</td>
												<td class="text-center">
													
														<i class="icon fa fa-circle-o-notch fdt-cor-cinza" data-toggle="tooltip" data-placement="top" title="" data-original-title="Não"></i>
													
												</td>
												<td>27/09/2024<br><span class="ita cin fs13"></span></td>
												<td class="text-center">
													
															<i class="icon fa fa-check-square fdt-cor-verde" data-toggle="tooltip" data-placement="top" title="" data-original-title="Dentro do prazo do compromisso"></i>
														
												</td>
											</tr>
	  										
	                           </tbody>
	                        </table>                        

	                    </div>
	                
                </div>
                </div>
                <!-- /ConteudoCentral -->
                <footer>
										<span class="bol" style="color:#289a8e;">Korbil ADV: Fábio Ribeiro Advogados</span>
					<span style="font-size:11px;"><a href="http://fabioribeiro.eastus.cloudapp.azure.com/fab/versionamento.asp" data-toggle="tooltip" data-placement="top" title="" data-original-title="Consulte a versão atual e o histórico de atualizações"><i class="fa fa-link"></i> Versão e histórico de atualizações</a><br>Servidor de banco de dados: tcp:fabioribeiro.database.windows.net</span>
					<span style="font-size:11px; padding-top:10px;"><i>Korbil Webapp é uma solução da Fábrica de Tempo</i></span>
					<span style="font-size:11px;"><i><a href="http://www.korbil.com.br" target="_blank" data-toggle="tooltip" data-placement="top" title="" data-original-title="Conheça a solução completa Korbil"><i class="fa fa-link"></i> www.korbil.com.br</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.fabricadetempo.com.br" target="_blank" data-toggle="tooltip" data-placement="top" title="" data-original-title="Conheça as demais soluções da Fábrica de Tempo"><i class="fa fa-link"></i> www.fabricadetempo.com.br</a></i></span>
					<span style="font-size:11px; padding-top:10px;" class="nor ita cin" id="manterLogado">Usuário: YURI DIAS, logado desde 27/09/2024 12:00:37, há 55 minutos.</span>
                </footer>
            </div>
            <!-- /conteudoEspaco -->
        </section>
        <!-- /conteudoPrincipal -->
    </section>
    <!-- /conteudo -->

	

    <script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/jquery-ui.min.js"></script>
    
    <!-- MOMENT para calendar e datetimepicker -->
    <script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/moment.min.js"></script>
    <script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/moment-pt-br.js"></script>


    


    <!-- BOOTSTRAP -->
    
    	<script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/bootstrap.min.js"></script>
    
		<!-- VALIDAÇÃO E MÁSCARAS -->
		<script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/jquery.maskedinput.min.js"></script>
		<script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/jquery.validate.min.js"></script>
		<script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/additional-methods.min.js"></script>
		<script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/parsley.min.js"></script>
		<script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/i18n/pt-br.js"></script>
		<script type="text/javascript">
			window.Parsley.setLocale('pt-br');
		</script>
		<script>

			var mask = {
				money: function () {
					var el = this
					, exec = function (v) {
						v = v.replace(/\D/g, "");
						v = new String(Number(v));
						var len = v.length;
						if (1 == len)
							v = v.replace(/(\d)/, "0.0$1");
						else if (2 == len)
							v = v.replace(/(\d)/, "0.$1");
						else if (len > 2) {
							v = v.replace(/(\d{2})$/, '.$1');
						}
						return v;
					};

					setTimeout(function () {
						el.value = exec(el.value);
					}, 1);
				}

			}
			$(".fdt-mask-cnpj").mask("99.999.999/9999-99");
			$(".fdt-mask-cpf").mask("999.999.999-99");
			$(".fdt-mask-telefone").mask("(99) 9999-9999");
			$(".fdt-mask-celular").mask("(99) 99999-9999");
			$(".fdt-mask-cep").mask("99999-999");
			$(".fdt-mask-data").mask("99/99/9999");
			$(".fdt-mask-hora").mask("99:99");

			jQuery(".fdt-mask-telefoneCelular")
					.mask("(99) 9999-9999?9")
					.focusout(function (event) {
						var target, phone, element;
						target = (event.currentTarget) ? event.currentTarget : event.srcElement;
						phone = target.value.replace(/\D/g, '');
						element = $(target);
						element.unmask();
						if (phone.length > 10) {
							element.mask("(99) 99999-999?9");
						} else {
							element.mask("(99) 9999-9999?9");
						}
					});



				$(function () {
					$('#fdt-form').parsley().on('field:validated', function () {
						var ok = $('.parsley-error').length === 0;
						$('.bs-callout-info').toggleClass('hidden', !ok);
						$('.bs-callout-warning').toggleClass('hidden', ok);
					})
					.on('form:submit', function () {
						return true;
					});
				});

		</script>
	


    <!-- maskMoney -->
    <script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/jquery.maskMoney.min.js"></script>
    <script>
        $(function () {
            $(".fdt-mask-decimal-1").maskMoney({
                symbol: 'R$ ', precision: 1, showSymbol: false, thousands: '.', decimal: ',', symbolStay: false, allowZero: true
            });
            $(".fdt-mask-decimal-2").maskMoney({
                symbol: 'R$ ', precision: 2, showSymbol: false, thousands: '.', decimal: ',', symbolStay: false, allowZero: true
            });
            $(".fdt-mask-decimal-3").maskMoney({
                symbol: 'R$ ', precision: 3, showSymbol: false, thousands: '.', decimal: ',', symbolStay: false, allowZero: true
            });
            $(".fdt-mask-decimal-4").maskMoney({
                symbol: 'R$ ', precision: 4, showSymbol: false, thousands: '.', decimal: ',', symbolStay: false, allowZero: true
            });
            $(".fdt-mask-decimal-5").maskMoney({
                symbol: 'R$ ', precision: 5, showSymbol: false, thousands: '.', decimal: ',', symbolStay: false, allowZero: true
            });
            $(".fdt-mask-decimal").maskMoney({
                symbol: 'R$ ', showSymbol: false, thousands: '.', decimal: ',', symbolStay: false, allowZero: true
            });
            $(".fdt-mask-inteiro").maskMoney({
                symbol: 'R$ ', precision: 0, showSymbol: false, thousands: '', decimal: ',', symbolStay: false,  allowZero: true,  allowNegative: false
            });
            $(".fdt-mask-inteiro-negativo").maskMoney({
                symbol: 'R$ ', precision: 0, showSymbol: false, thousands: '', decimal: ',', symbolStay: false,  allowZero: true,  allowNegative: true
            });
        });
    </script>


	



    <!-- BOOTSTRAP EXTENSÕES -->
	<script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/bootstrap-datetimepicker.js"></script>
	<script>
		$('.datepicker input').datetimepicker({
			format: 'DD/MM/YYYY',
		});
		$('.datepicker-desab input').datetimepicker({
			format: 'DD/MM/YYYY',
			daysOfWeekDisabled: [0, 6]
		});
		$('.datepicker-dia input').datetimepicker({
			format: 'DD',
			viewMode: 'days'
		});
		$('.datepicker-mes input').datetimepicker({
			format: 'MMMM',
			viewMode: 'months'
		});
		$('.datepicker-ano input').datetimepicker({
			format: 'YYYY',
			viewMode: 'years'
		});
		$('.datepicker-dh input').datetimepicker({
		});
		$('.datepicker-hora input').datetimepicker({
			format: 'LT'
		});
		$(function () {
			$('#datepicker-periodo1').datetimepicker({
				keepOpen: true
			});
			$('#datepicker-periodo2').datetimepicker({
				useCurrent: false //Important! See issue #1075
			});
			$("#datepicker-periodo1").on("dp.change", function (e) {
				$('#datepicker-periodo2').data("DateTimePicker").minDate(e.date);
			});
        });
	</script>


    <!-- bootBox -->
	<script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/bootbox.min.js"></script>
    <script>
        var Alerta = (function() {
            "use strict";

            var elem,
                hideHandler,
                that = {};

            that.init = function(options) {
                elem = $(options.selector);
            };

            that.show = function(text) {
                clearTimeout(hideHandler);

                elem.find(".bb-texto").html(text);
                elem.delay(200).fadeIn().delay(4000).fadeOut();
            };

            return that;
        }());
        $(function () {
			Alerta.init({
				"selector": ".bb-alert"
			});
		});
    </script>

    <!-- bootSelect -->
    <script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/bootstrap-select.min.js"></script>

	

    <!-- CKEDITOR -->
    

	<!-- popover -->
	<script>
		$(function () {
			$('[data-toggle="popover"]').popover()
		})
	</script>

	<script>
		$(document).ready(function($){
			$(".bb-alert").delay(4000).fadeOut();
		});
	</script>
    <script src="http://fabioribeiro.eastus.cloudapp.azure.com/js/main.js"></script>
    <script type="text/javascript">
	$('.confirmaFormulario').submit(function (e) {
		var currentForm = this;
		var mensagemConfirmacao = $(this).attr("data-mensagemConfirmacao");
		e.preventDefault();
		bootbox.confirm(mensagemConfirmacao, function (result) {
			if (!result) {
				Alerta.show("Operação cancelada.");
				$(".bb-alert").addClass("fdt-bg-vermelho");
			} else {
				//Alerta.show("Operação confirmada.");
				//$(".bb-alert").addClass("fdt-bg-verde");
				currentForm.submit();
			}
		});
	});

	$('.confirmaOperacao').click(function (e) {
		var link = $(this).attr("href");
		var mensagemConfirmacao = $(this).attr("data-mensagemConfirmacao");
		e.preventDefault();
		bootbox.confirm(mensagemConfirmacao, function (result) {
			if (result === false) {
				Alerta.show("Operação cancelada.");
				$(".bb-alert").addClass("fdt-bg-vermelho");
			} else {
				window.location.href = link;
			}
		});
	});

	

	$("#modalFechar").on("show.bs.modal", function(e) {
		var link = $(e.relatedTarget);
		var tituloModal = link.attr("data-tituloModal");
		$(this).find(".modal-body").load(link.attr("href"));
		$(this).find(".modal-title").html(tituloModal);
	});

	$("#modalSemFechar").on("show.bs.modal", function(e) {
		var link = $(e.relatedTarget);
		var tituloModal = link.attr("data-tituloModal");
		$(this).find(".modal-body").load(link.attr("href"));
		$(this).find(".modal-title").html(tituloModal);
	});

	

		ajaxMantemLogado();

		setInterval(ajaxMantemLogado, 60000); 

		function ajaxMantemLogado() {
			$("#manterLogado").load('http://fabioribeiro.eastus.cloudapp.azure.com/fab/ajax/manterLogadoScript.asp');
		}

	

</script>




</body></html>`
	
    it('Contagem de tarefas de intimações a partir de um documento html', async () => {
        const colaborador = {
            mock: {
                tarefas: 0
            },
            expect: {
                tarefas: 3
            }
        }

        const data = new Date("2024-09-27")
    
        const getTarefasColaboradoresMock = {
            dom: new JSDOM(html)
        }

        const resultado = await getTarefasColaboradores(colaborador.mock, data, null, getTarefasColaboradoresMock)

        expect(colaborador.expect.tarefas).toBe(resultado.tarefas)
    })
})