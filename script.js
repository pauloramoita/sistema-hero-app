document.addEventListener('DOMContentLoaded', () => {

    // 1. Referências ao DOM (Centralizadas e Otimizadas)
    const dom = {
        // Abas Principais
        mainSidebar: document.querySelector('.main-sidebar'),
        mainTabButtons: document.querySelectorAll('.main-tab-button'),
        mainTabContents: document.querySelectorAll('.main-tab-content'),
        headerApp: document.getElementById('header-app'),

        // Sub-abas
        subTabButtons: document.querySelectorAll('.sub-tab-button'),
        subTabContents: document.querySelectorAll('.tab-content'),

        // Pedidos
        formPedido: document.getElementById('form-pedido'),
        dataPedidoInput: document.getElementById('data-pedido'),
        lojaSelect: document.getElementById('loja'),
        valorUnidadeInput: document.getElementById('valor-unidade'),
        quantidadePedidaInput: document.getElementById('quantidade-pedida'),
        valorTotalInput: document.getElementById('valor-total'),
        btnDataHoje: document.getElementById('btn-data-hoje'),
        dataEntregaInput: document.getElementById('data-entrega'),
        btnSearch: document.getElementById('btn-search'),
        searchDataInicio: document.getElementById('search-data-inicio'),
        searchDataFim: document.getElementById('search-data-fim'),
        searchLoja: document.getElementById('search-loja'),
        searchProduto: document.getElementById('search-produto'),
        searchMarca: document.getElementById('search-marca'),
        searchFornecedor: document.getElementById('search-fornecedor'),
        totalResultsP: null,
        reportResultsDiv: document.getElementById('report-results'),
        btnGenerateReport: document.getElementById('btn-generate-report'),
        reportTypeSelect: document.getElementById('report-type'),
        btnExportExcel: document.getElementById('btn-export-excel'),
        sumResultsDiv: null,
        totalValorUnidadeSpan: null,
        totalQuantidadePedidaSpan: null,
        totalValorTotalSpan: null,
        selectAllCheckbox: null,
        reportSearchProduto: document.getElementById('report-search-produto'),
        reportSearchMarca: document.getElementById('report-search-marca'),
        reportSearchFornecedor: document.getElementById('report-search-fornecedor'),
        produtosDatalist: document.getElementById('produtos-list'),
        marcasDatalist: document.getElementById('marcas-list'),
        fornecedoresDatalist: document.getElementById('fornecedores-list'),
        formProdutoAdd: document.getElementById('form-produto-add'),
        formMarcaAdd: document.getElementById('form-marca-add'),
        formFornecedorAdd: document.getElementById('form-fornecedor-add'),
        listaProdutosCampos: document.getElementById('lista-produtos-campos'),
        listaMarcasCampos: document.getElementById('lista-marcas-campos'),
        listaFornecedoresCampos: document.getElementById('lista-fornecedores-campos'),
        tabelaPedidosBody: null,
        tabelaPedidos: null,
        resultsContainer: document.querySelector('#consultar-pedidos .results-container'),

        // Controle 043
        form043: document.getElementById('form-043'),
        data043Input: document.getElementById('data-043'),
        loja043Select: document.getElementById('loja-043'),
        tipoLancamentoSelect: document.getElementById('tipo-lancamento'),
        valor043Input: document.getElementById('valor-043'),
        descricao043Textarea: document.getElementById('descricao-043'),
        filtroConsulta043: document.getElementById('filtro-consulta-043'),
        searchData043: document.getElementById('search-data-043'),
        searchMes043: document.getElementById('search-mes-043'),
        searchAno043: document.getElementById('search-ano-043'),
        searchTipo043: document.getElementById('search-tipo-043'),
        searchLoja043: document.getElementById('search-loja-043'),
        btnSearch043: document.getElementById('btn-search-043'),
        results043Div: document.getElementById('results-043'),
        relatorioTipo043: document.getElementById('relatorio-tipo-043'),
        btnGenerateReport043: document.getElementById('btn-generate-report-043'),
        reportResults043Div: document.getElementById('report-results-043'),
        btnExportExcel043: document.getElementById('btn-export-excel-043'),
        reportSearchLoja043: document.getElementById('report-search-loja-043'),
        reportSearchData043: document.getElementById('report-search-data-043'),
        reportSearchMes043: document.getElementById('report-search-mes-043'),
        reportSearchAno043: document.getElementById('report-search-ano-043'),
        reportSearchTipo043: document.getElementById('report-search-tipo-043'),
        
        // Financeiro
        formLancamentoMensal: document.getElementById('form-lancamento-mensal'),
        lojaMensalSelect: document.getElementById('loja-mensal'),
        anoMensalSelect: document.getElementById('ano-mensal'),
        mesMensalSelect: document.getElementById('mes-mensal'),
        caixaEconomicaInput: document.getElementById('caixa-economica'),
        cofreInput: document.getElementById('cofre'),
        loteriaInput: document.getElementById('loteria'),
        pagbankhInput: document.getElementById('pagbankh'),
        pagbankdInput: document.getElementById('pagbankd'),
        investimentoInput: document.getElementById('investimento'),
        lucroMesInput: document.getElementById('lucro-mes'),
        totalMensalInput: document.getElementById('total-mensal'),
        relLojaMensalSelect: document.getElementById('rel-loja-mensal'),
        relAnoMensalSelect: document.getElementById('rel-ano-mensal'),
        relMesMensalSelect: document.getElementById('rel-mes-mensal'),
        btnGenerateRelatorioMensal: document.getElementById('btn-generate-relatorio-mensal'),
        relatorioMensalResultadosDiv: document.getElementById('relatorio-mensal-resultados'),
        btnExportExcelMensal: document.getElementById('btn-export-excel-mensal'),
        consLojaMensalSelect: document.getElementById('cons-loja-mensal'),
        consAnoMensalSelect: document.getElementById('cons-ano-mensal'),
        consMesMensalSelect: document.getElementById('cons-mes-mensal'),
        btnSearchMensal: document.getElementById('btn-search-mensal'),
        consultaMensalResultadosDiv: document.getElementById('consulta-mensal-resultados'),

        // Backup
        btnExportBackup: document.getElementById('btn-export-backup'),
        btnImportBackup: document.getElementById('btn-import-backup'),
        importFileInput: document.getElementById('import-file-input')
    };
    
    // 2. Estado do Aplicativo
    let state = {
        pedidos: JSON.parse(localStorage.getItem('pedidos')) || [],
        produtos: JSON.parse(localStorage.getItem('produtos')) || [],
        marcas: JSON.parse(localStorage.getItem('marcas')) || [],
        fornecedores: JSON.parse(localStorage.getItem('fornecedores')) || [],
        lancamentos: JSON.parse(localStorage.getItem('lancamentos')) || [],
        lancamentosMensais: JSON.parse(localStorage.getItem('lancamentosMensais')) || [],
        selectedPedidos: [],
    };

    // 3. Funções de Utilidade (Refatoradas para maior clareza)
    const utils = {
        formatCurrency: (value) => {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
        },
        parseCurrency: (text) => {
            if (!text) return 0;
            return parseFloat(text.replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
        },
        parseMensalValue: (text) => {
            if (!text) return 0;
            const isNegative = text.startsWith('-');
            const value = parseFloat(text.replace(/[R$\s-.]/g, '').replace(',', '.')) || 0;
            return isNegative ? -value : value;
        },
        displayMessage: (message) => {
            alert(message);
        },
        formatDateToBR: (dateString) => {
            if (!dateString) return '';
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        },
        getMonthName: (monthNumber) => {
            const date = new Date();
            date.setMonth(monthNumber - 1);
            return date.toLocaleString('pt-BR', { month: 'long' });
        },
        groupAndSumByDate: (lista) => {
            const dailySummary = lista.reduce((acc, item) => {
                const date = item.data;
                if (!acc[date]) {
                    acc[date] = { credito: 0, debito: 0 };
                }
                if (item.tipo === 'Credito') {
                    acc[date].credito += item.valor;
                } else {
                    acc[date].debito += item.valor;
                }
                return acc;
            }, {});

            const sortedDates = Object.keys(dailySummary).sort((a, b) => new Date(a) - new Date(b));
            
            const summaryArray = sortedDates.map(date => ({
                data: date,
                credito: dailySummary[date].credito,
                debito: dailySummary[date].debito,
                totalDia: dailySummary[date].credito - dailySummary[date].debito
            }));
            
            const grandTotalCredito = summaryArray.reduce((sum, item) => sum + item.credito, 0);
            const grandTotalDebito = summaryArray.reduce((sum, item) => sum + item.debito, 0);
    
            return { summary: summaryArray, grandTotalCredito, grandTotalDebito };
        },
        saveData: () => {
            for (const key in state) {
                if (Object.hasOwnProperty.call(state, key)) {
                    localStorage.setItem(key, JSON.stringify(state[key]));
                }
            }
        }
    };

    // 4. Lógica de Abas (Unificada)
    const tabManager = {
        switchMainTab: (targetId) => {
            dom.mainTabContents.forEach(tab => {
                tab.classList.remove('active');
            });
            dom.mainTabButtons.forEach(button => {
                button.classList.remove('active');
            });

            const targetTab = document.getElementById(targetId);
            if (targetTab) {
                targetTab.classList.add('active');
                document.querySelector(`.main-tab-button[data-target="${targetId}"]`).classList.add('active');
            }
            tabManager.handleSubTab(targetId);
        },
        switchSubTab: (targetId, parentId) => {
            const parentTabContent = document.getElementById(parentId);
            const subTabs = parentTabContent.querySelectorAll('.tab-content');
            const subButtons = parentTabContent.querySelectorAll('.sub-tab-button');

            subTabs.forEach(tab => tab.classList.remove('active'));
            subButtons.forEach(button => button.classList.remove('active'));

            const targetTab = document.getElementById(targetId);
            if (targetTab) {
                targetTab.classList.add('active');
                document.querySelector(`#${parentId} .sub-tab-button[data-target="${targetId}"]`).classList.add('active');
            }
            tabManager.handleSubTab(targetId);
        },
        handleSubTab: (tabId) => {
            switch (tabId) {
                case 'pedidos-container':
                    tabManager.switchSubTab('cadastrar-pedido', 'pedidos-container');
                    break;
                case 'controle-043-container':
                    tabManager.switchSubTab('inclusao-043', 'controle-043-container');
                    break;
                case 'financeiro-container':
                    tabManager.switchSubTab('lancamento-mensal', 'financeiro-container');
                    break;
                case 'consultar-pedidos':
                    pedidosModule.initializeSearch();
                    break;
                case 'cadastrar-campos-section':
                    camposModule.renderCampos();
                    break;
                case 'cadastrar-pedido':
                    pedidosModule.preencherCamposIniciais();
                    pedidosModule.updateDatalists();
                    break;
                case 'gerar-relatorio':
                    pedidosModule.resetReportView();
                    break;
                case 'inclusao-043':
                    controle043Module.preencherCamposIniciais();
                    break;
                case 'consulta-043':
                    controle043Module.preencherFiltros();
                    controle043Module.searchLancamentos();
                    break;
                case 'relatorio-043':
                    controle043Module.preencherFiltrosRelatorio();
                    controle043Module.generateReport();
                    break;
                case 'lancamento-mensal':
                    financeiroModule.preencherCampos();
                    break;
                case 'relatorio-mensal':
                    financeiroModule.preencherFiltrosRelatorio();
                    financeiroModule.generateRelatorio();
                    break;
                case 'consulta-mensal':
                    financeiroModule.preencherFiltrosConsulta();
                    financeiroModule.searchLancamentos();
                    break;
                case 'backup-container':
                    break;
            }
        }
    };

    // 5. Módulos do Aplicativo (Reorganizado por funcionalidade)
    const pedidosModule = {
        preencherCamposIniciais: () => {
            const today = new Date().toISOString().split('T')[0];
            dom.dataPedidoInput.value = today;
            dom.lojaSelect.value = 'Hero Joquei';
            const lastFornecedor = state.pedidos.length > 0 ? state.pedidos[state.pedidos.length - 1].fornecedor : '';
            document.getElementById('fornecedor').value = lastFornecedor;
            dom.valorUnidadeInput.value = '';
            dom.quantidadePedidaInput.value = '';
            dom.valorTotalInput.value = 'R$ 0,00';
            dom.formPedido.dataset.editingId = '';
        },
        handleInputMask: (e) => {
            const input = e.target;
            const isNegative = input.value.startsWith('-');
            let value = input.value.replace(/\D/g, ''); 
            
            if (input === dom.valorUnidadeInput || input === dom.valor043Input || input.classList.contains('mensal-value-input')) {
                value = value.padStart(3, '0');
                const integerPart = value.slice(0, -2).replace(/^0+/, '');
                const decimalPart = value.slice(-2);
                input.value = `${isNegative ? '-' : ''}R$ ${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${decimalPart}`;
            } else if (input === dom.quantidadePedidaInput) {
                value = value.padStart(3, '0');
                const integerPart = value.slice(0, -2).replace(/^0+/, '');
                const decimalPart = value.slice(-2);
                input.value = `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${decimalPart}`;
            }
        
            if (input === dom.valorUnidadeInput || input === dom.quantidadePedidaInput) {
                pedidosModule.calcularValorTotal();
            }
            if (input.classList.contains('mensal-value-input')) {
                financeiroModule.calcularTotais();
            }
        },
        calcularValorTotal: () => {
            const valorUnidade = utils.parseCurrency(dom.valorUnidadeInput.value);
            const quantidade = parseFloat(dom.quantidadePedidaInput.value.replace(/\./g, '').replace(',', '.')) || 0;
            const valorTotal = valorUnidade * quantidade;
            dom.valorTotalInput.value = utils.formatCurrency(valorTotal);
        },
        submitForm: (e) => {
            e.preventDefault();
            const novoPedido = {
                id: dom.formPedido.dataset.editingId ? parseInt(dom.formPedido.dataset.editingId) : Date.now(),
                dataPedido: dom.dataPedidoInput.value,
                loja: dom.lojaSelect.value,
                nomeProduto: document.getElementById('nome-produto').value,
                marcaProduto: document.getElementById('marca-produto').value,
                fornecedor: document.getElementById('fornecedor').value,
                valorUnidade: utils.parseCurrency(dom.valorUnidadeInput.value),
                medidaUnidade: document.getElementById('medida-unidade').value,
                quantidadePedida: parseFloat(dom.quantidadePedidaInput.value.replace(/\./g, '').replace(',', '.')),
                valorTotal: utils.parseCurrency(dom.valorTotalInput.value),
                dataEntrega: dom.dataEntregaInput.value,
            };

            if (dom.formPedido.dataset.editingId) {
                const index = state.pedidos.findIndex(p => p.id === novoPedido.id);
                if (index !== -1) {
                    state.pedidos[index] = { ...state.pedidos[index], ...novoPedido };
                }
            } else {
                state.pedidos.push(novoPedido);
            }

            utils.saveData();
            dom.formPedido.reset();
            utils.displayMessage('Pedido salvo com sucesso!');
            pedidosModule.preencherCamposIniciais();
            pedidosModule.updateDatalists();
            tabManager.switchSubTab('cadastrar-pedido', 'pedidos-container');
        },
        initializeSearch: () => {
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            dom.searchDataInicio.value = firstDayOfMonth.toISOString().split('T')[0];
            dom.searchDataFim.value = today.toISOString().split('T')[0];
            pedidosModule.searchPedidos();
        },
        searchPedidos: () => {
            const dataInicio = dom.searchDataInicio.value ? new Date(dom.searchDataInicio.value + 'T00:00:00') : null;
            const dataFim = dom.searchDataFim.value ? new Date(dom.searchDataFim.value + 'T23:59:59') : null;
            const searchLojaValue = dom.searchLoja.value;
            const searchProduto = dom.searchProduto.value.toLowerCase();
            const searchMarca = dom.searchMarca.value.toLowerCase();
            const searchFornecedor = dom.searchFornecedor.value.toLowerCase();
        
            const resultados = state.pedidos.filter(p => {
                const pedidoDate = new Date(p.dataPedido + 'T00:00:00');
                return (
                    (!dataInicio || pedidoDate >= dataInicio) &&
                    (!dataFim || pedidoDate <= dataFim) &&
                    (!searchLojaValue || p.loja === searchLojaValue) &&
                    p.nomeProduto.toLowerCase().includes(searchProduto) &&
                    p.marcaProduto.toLowerCase().includes(searchMarca) &&
                    p.fornecedor.toLowerCase().includes(searchFornecedor)
                );
            }).sort((a, b) => new Date(b.dataPedido) - new Date(a.dataPedido));
        
            pedidosModule.renderPedidos(resultados);
        },
        renderPedidos: (lista) => {
            const tabelaHTML = `
                <p id="total-results">Total de resultados: ${lista.length}</p>
                <div class="table-container">
                    <table id="tabela-pedidos">
                        <thead class="table-header">
                            <tr>
                                <th><input type="checkbox" id="select-all-checkbox" aria-label="Selecionar todos os pedidos"></th>
                                <th class="col-data">Data</th>
                                <th>Loja</th>
                                <th>Produto</th>
                                <th>Marca</th>
                                <th>Fornecedor</th>
                                <th>Valor Unidade</th>
                                <th>Medida</th>
                                <th>Qtd Pedida</th>
                                <th>Valor Total</th>
                                <th class="col-data">Entrega</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="summary-block">
                    <h4>Totais dos Itens Selecionados</h4>
                    <p>Valor Unidade Total: <span id="total-valor-unidade">0</span></p>
                    <p>Quantidade Pedida Total: <span id="total-quantidade-pedida">0</span></p>
                    <p>Valor Total: <span id="total-valor-total">0</span></p>
                </div>
            `;
            dom.resultsContainer.innerHTML = tabelaHTML;

            dom.tabelaPedidosBody = document.querySelector('#tabela-pedidos tbody');
            dom.selectAllCheckbox = document.getElementById('select-all-checkbox');
            dom.totalResultsP = document.getElementById('total-results');
            dom.sumResultsDiv = document.querySelector('.summary-block');
            dom.totalValorUnidadeSpan = document.getElementById('total-valor-unidade');
            dom.totalQuantidadePedidaSpan = document.getElementById('total-quantidade-pedida');
            dom.totalValorTotalSpan = document.getElementById('total-valor-total');

            const fragment = document.createDocumentFragment();
            lista.forEach(pedido => {
                const row = document.createElement('tr');
                const entregaCellContent = pedido.dataEntrega
                    ? utils.formatDateToBR(pedido.dataEntrega)
                    : `<span class="receive-icon" data-id="${pedido.id}"></span>`;
        
                row.innerHTML = `
                    <td><input type="checkbox" class="select-pedido-checkbox" data-id="${pedido.id}"></td>
                    <td>${utils.formatDateToBR(pedido.dataPedido)}</td>
                    <td>${pedido.loja}</td>
                    <td>${pedido.nomeProduto}</td>
                    <td>${pedido.marcaProduto}</td>
                    <td>${pedido.fornecedor}</td>
                    <td>${utils.formatCurrency(pedido.valorUnidade)}</td>
                    <td>${pedido.medidaUnidade}</td>
                    <td>${pedido.quantidadePedida.toFixed(2).replace('.', ',')}</td>
                    <td>${utils.formatCurrency(pedido.valorTotal)}</td>
                    <td>${entregaCellContent}</td>
                    <td class="action-buttons">
                        <button class="btn-action btn-edit" data-id="${pedido.id}">Editar</button>
                        <button class="btn-action btn-delete" data-id="${pedido.id}">Excluir</button>
                    </td>
                `;
                fragment.appendChild(row);
            });
            dom.tabelaPedidosBody.appendChild(fragment);
            if(dom.selectAllCheckbox) dom.selectAllCheckbox.checked = false;
        },
        handleTableClick: (e) => {
            const { target } = e;
            const id = parseInt(target.dataset.id);
            if (!id) return;
        
            if (target.classList.contains('receive-icon')) {
                const pedidoToUpdate = state.pedidos.find(p => p.id === id);
                if (pedidoToUpdate) {
                    pedidoToUpdate.dataEntrega = new Date().toISOString().split('T')[0];
                    utils.saveData();
                    pedidosModule.searchPedidos();
                }
            } else if (target.classList.contains('btn-edit')) {
                pedidosModule.editPedido(id);
            } else if (target.classList.contains('btn-delete')) {
                pedidosModule.deletePedido(id);
            }
        },
        handleCheckboxChange: (e) => {
            const { target } = e;
            if (target === dom.selectAllCheckbox) {
                document.querySelectorAll('.select-pedido-checkbox').forEach(checkbox => {
                    checkbox.checked = target.checked;
                });
            }
            state.selectedPedidos = Array.from(document.querySelectorAll('.select-pedido-checkbox:checked')).map(cb => parseInt(cb.dataset.id));
            pedidosModule.updateSelectedTotals();
        },
        updateSelectedTotals: () => {
            if (state.selectedPedidos.length === 0) {
                dom.sumResultsDiv.style.display = 'none';
                return;
            }
        
            dom.sumResultsDiv.style.display = 'block';
            const totals = state.selectedPedidos.reduce((acc, id) => {
                const pedido = state.pedidos.find(p => p.id === id);
                if (pedido) {
                    acc.valorUnidade += pedido.valorUnidade;
                    acc.quantidadePedida += pedido.quantidadePedida;
                    acc.valorTotal += pedido.valorTotal;
                }
                return acc;
            }, { valorUnidade: 0, quantidadePedida: 0, valorTotal: 0 });
        
            dom.totalValorUnidadeSpan.textContent = utils.formatCurrency(totals.valorUnidade);
            dom.totalQuantidadePedidaSpan.textContent = totals.quantidadePedida.toFixed(2).replace('.', ',');
            dom.totalValorTotalSpan.textContent = utils.formatCurrency(totals.valorTotal);
        },
        editPedido: (id) => {
            const pedidoToEdit = state.pedidos.find(p => p.id === id);
            if (pedidoToEdit) {
                dom.dataPedidoInput.value = pedidoToEdit.dataPedido;
                dom.lojaSelect.value = pedidoToEdit.loja;
                document.getElementById('nome-produto').value = pedidoToEdit.nomeProduto;
                document.getElementById('marca-produto').value = pedidoToEdit.marcaProduto;
                document.getElementById('fornecedor').value = pedidoToEdit.fornecedor;
                dom.valorUnidadeInput.value = utils.formatCurrency(pedidoToEdit.valorUnidade);
                document.getElementById('medida-unidade').value = pedidoToEdit.medidaUnidade;
                dom.quantidadePedidaInput.value = pedidoToEdit.quantidadePedida.toFixed(2).replace('.', ',');
                dom.valorTotalInput.value = utils.formatCurrency(pedidoToEdit.valorTotal);
                dom.dataEntregaInput.value = pedidoToEdit.dataEntrega;
                dom.formPedido.dataset.editingId = id;
                tabManager.switchSubTab('cadastrar-pedido', 'pedidos-container');
            }
        },
        deletePedido: (id) => {
            if (confirm('Tem certeza que deseja excluir este pedido?')) {
                state.pedidos = state.pedidos.filter(p => p.id !== id);
                utils.saveData();
                pedidosModule.searchPedidos();
                utils.displayMessage('Pedido excluído com sucesso!');
            }
        },
        resetReportView: () => {
            dom.btnExportExcel.style.display = 'none';
            dom.reportResultsDiv.innerHTML = '';
        },
        generateReport: () => {
            const reportType = dom.reportTypeSelect.value;
            const searchFilters = {
                produto: dom.reportSearchProduto.value.toLowerCase(),
                marca: dom.reportSearchMarca.value.toLowerCase(),
                fornecedor: dom.reportSearchFornecedor.value.toLowerCase()
            };

            let pedidosRelatorio = state.pedidos.filter(p => {
                return p.nomeProduto.toLowerCase().includes(searchFilters.produto) &&
                       p.marcaProduto.toLowerCase().includes(searchFilters.marca) &&
                       p.fornecedor.toLowerCase().includes(searchFilters.fornecedor);
            });

            switch (reportType) {
                case 'por-fornecedor':
                    pedidosRelatorio.sort((a, b) => a.fornecedor.localeCompare(b.fornecedor) || new Date(a.dataPedido) - new Date(b.dataPedido));
                    break;
                case 'por-produto':
                    pedidosRelatorio.sort((a, b) => a.nomeProduto.localeCompare(b.nomeProduto) || new Date(a.dataPedido) - new Date(b.dataPedido));
                    break;
                case 'por-marca':
                    pedidosRelatorio.sort((a, b) => a.marcaProduto.localeCompare(b.marcaProduto) || new Date(a.dataPedido) - new Date(b.dataPedido));
                    break;
                default:
                    pedidosRelatorio.sort((a, b) => new Date(a.dataPedido) - new Date(b.dataPedido));
            }
            
            const reportTitleMap = {
                'mensal-geral': 'Relatório Mensal de Pedidos',
                'por-produto': 'Relatório por Nome do Produto',
                'por-marca': 'Relatório por Marca do Produto',
                'por-fornecedor': 'Relatório por Fornecedor'
            };
            const reportTitle = reportTitleMap[reportType] || 'Relatório de Pedidos';
            
            let reportHtml = `<h2>${reportTitle}</h2>`;
            reportHtml += `
                <div class="table-container">
                    <table id="report-table">
                        <thead class="table-header">
                            <tr><th>Data</th><th>Loja</th><th>Produto</th><th>Marca</th><th>Fornecedor</th><th>Valor Unidade</th><th>Medida</th><th>Qtd Pedida</th><th>Valor Total</th></tr>
                        </thead>
                        <tbody>`;
            
            let totalSum = 0;
            pedidosRelatorio.forEach(p => {
                reportHtml += `<tr>
                    <td>${utils.formatDateToBR(p.dataPedido)}</td>
                    <td>${p.loja}</td>
                    <td>${p.nomeProduto}</td>
                    <td>${p.marcaProduto}</td>
                    <td>${p.fornecedor}</td>
                    <td>${utils.formatCurrency(p.valorUnidade)}</td>
                    <td>${p.medidaUnidade}</td>
                    <td>${p.quantidadePedida.toFixed(2).replace('.', ',')}</td>
                    <td>${utils.formatCurrency(p.valorTotal)}</td>
                </tr>`;
                totalSum += p.valorTotal;
            });
            
            reportHtml += `</tbody></table></div>`;
            reportHtml += `
                <div class="summary-block">
                    <h4>Valor Total Geral</h4>
                    <p>Total: <span class="valor-total">${utils.formatCurrency(totalSum)}</span></p>
                </div>
            `;
            
            dom.reportResultsDiv.innerHTML = reportHtml;
            dom.btnExportExcel.style.display = 'block';
        },
        updateDatalists: () => {
            const createOptions = (list) => list.map(item => `<option value="${item}"></option>`).join('');
            dom.produtosDatalist.innerHTML = createOptions(state.produtos.sort());
            dom.marcasDatalist.innerHTML = createOptions(state.marcas.sort());
            dom.fornecedoresDatalist.innerHTML = createOptions(state.fornecedores.sort());
        },
        exportExcel: () => {
            const table = document.getElementById('report-table');
            if (!table) {
                utils.displayMessage("Nenhum relatório para exportar.");
                return;
            }
            const worksheet = XLSX.utils.table_to_sheet(table);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório de Pedidos');
            XLSX.writeFile(workbook, 'relatorio_pedidos.xlsx');
        }
    };
    
    const controle043Module = {
        preencherCamposIniciais: () => {
            dom.data043Input.value = new Date().toISOString().split('T')[0];
            dom.form043.dataset.editingId = '';
            dom.form043.reset();
        },
        submitForm: (e) => {
            e.preventDefault();
            const novoLancamento = {
                id: dom.form043.dataset.editingId ? parseInt(dom.form043.dataset.editingId) : Date.now(),
                data: dom.data043Input.value,
                loja: dom.loja043Select.value,
                tipo: dom.tipoLancamentoSelect.value,
                valor: utils.parseCurrency(dom.valor043Input.value),
                descricao: dom.descricao043Textarea.value
            };
            
            if (dom.form043.dataset.editingId) {
                const index = state.lancamentos.findIndex(l => l.id === novoLancamento.id);
                if (index !== -1) {
                    state.lancamentos[index] = novoLancamento;
                }
            } else {
                state.lancamentos.push(novoLancamento);
            }
            
            utils.saveData();
            utils.displayMessage('Lançamento salvo com sucesso!');
            controle043Module.preencherCamposIniciais();
            tabManager.switchSubTab('inclusao-043', 'controle-043-container');
        },
        preencherFiltros: () => {
            const lancamentoYears = [...new Set(state.lancamentos.map(l => new Date(l.data).getFullYear()))].sort((a, b) => b - a);
            dom.searchAno043.innerHTML = `<option value="">Todos os Anos</option>` + lancamentoYears.map(year => `<option value="${year}">${year}</option>`).join('');
        },
        searchLancamentos: () => {
            const { searchData043, searchMes043, searchAno043, searchLoja043, searchTipo043, filtroConsulta043 } = dom;
            const resultados = state.lancamentos.filter(l => {
                const lancamentoDate = new Date(l.data + 'T00:00:00');
                return (
                    (!searchData043.value || l.data === searchData043.value) &&
                    (!searchMes043.value || (lancamentoDate.getMonth() + 1).toString().padStart(2, '0') === searchMes043.value) &&
                    (!searchAno043.value || lancamentoDate.getFullYear().toString() === searchAno043.value) &&
                    (!searchLoja043.value || l.loja === searchLoja043.value) &&
                    (!searchTipo043.value || l.tipo === searchTipo043.value)
                );
            }).sort((a, b) => new Date(b.data) - new Date(a.data));
            
            filtroConsulta043.value === 'sintetico' ?
                controle043Module.renderLancamentosSintetico(resultados) :
                controle043Module.renderLancamentosDetalhado(resultados);
        },
        renderLancamentosDetalhado: (lista) => {
            let totalCredito = 0;
            let totalDebito = 0;
            const html = lista.map(l => {
                if (l.tipo === 'Credito') totalCredito += l.valor;
                else totalDebito += l.valor;
                return `
                    <tr>
                        <td>${utils.formatDateToBR(l.data)}</td>
                        <td>${l.loja}</td>
                        <td class="valor-${l.tipo.toLowerCase()}">${l.tipo}</td>
                        <td>${utils.formatCurrency(l.valor)}</td>
                        <td>${l.descricao || '-'}</td>
                        <td class="action-buttons">
                            <button class="btn-action btn-edit-043" data-id="${l.id}">Editar</button>
                            <button class="btn-action btn-delete-043" data-id="${l.id}">Excluir</button>
                        </td>
                    </tr>
                `;
            }).join('');
            
            const saldo = totalCredito - totalDebito;
            dom.results043Div.innerHTML = `
                <div class="table-container">
                    <table id="tabela-043">
                        <thead class="table-header">
                            <tr><th>Data</th><th>Loja</th><th>Tipo</th><th>Valor</th><th>Descrição</th><th>Ações</th></tr>
                        </thead>
                        <tbody>${html}</tbody>
                    </table>
                </div>
                <div class="summary-block">
                    <h4>Totais de Lançamentos</h4>
                    <p>Total de Créditos: <span class="valor-credito">${utils.formatCurrency(totalCredito)}</span></p>
                    <p>Total de Débitos: <span class="valor-debito">${utils.formatCurrency(totalDebito)}</span></p>
                    <p>Saldo: <span class="valor-saldo">${utils.formatCurrency(saldo)}</span></p>
                </div>
            `;
        },
        renderLancamentosSintetico: (lista) => {
            if (lista.length === 0) {
                dom.results043Div.innerHTML = '<p>Nenhum resultado encontrado.</p>';
                return;
            }
            const { summary, grandTotalCredito, grandTotalDebito } = utils.groupAndSumByDate(lista);
            const saldoGeral = grandTotalCredito - grandTotalDebito;
            
            const html = summary.map(day => `
                <tr>
                    <td>${utils.formatDateToBR(day.data)}</td>
                    <td class="valor-credito">${utils.formatCurrency(day.credito)}</td>
                    <td class="valor-debito">${utils.formatCurrency(day.debito)}</td>
                    <td class="valor-saldo">${utils.formatCurrency(day.totalDia)}</td>
                </tr>
            `).join('');
            
            dom.results043Div.innerHTML = `
                <div class="table-container">
                    <table class="tabela-sintetico">
                        <thead class="table-header">
                            <tr><th>Data</th><th>Créditos</th><th>Débitos</th><th>Total do Dia</th></tr>
                        </thead>
                        <tbody>${html}</tbody>
                    </table>
                </div>
                <div class="summary-block">
                    <h4>Totais de Lançamentos</h4>
                    <p>Total de Créditos: <span class="valor-credito">${utils.formatCurrency(grandTotalCredito)}</span></p>
                    <p>Total de Débitos: <span class="valor-debito">${utils.formatCurrency(grandTotalDebito)}</span></p>
                    <p>Saldo: <span class="valor-saldo">${utils.formatCurrency(saldoGeral)}</span></p>
                </div>
            `;
        },
        handleResultsClick: (e) => {
            const { target } = e;
            const id = parseInt(target.dataset.id);
            if (!id) return;
        
            if (target.classList.contains('btn-edit-043')) {
                controle043Module.editLancamento(id);
            } else if (target.classList.contains('btn-delete-043')) {
                controle043Module.deleteLancamento(id);
            }
        },
        editLancamento: (id) => {
            const lancamentoToEdit = state.lancamentos.find(l => l.id === id);
            if (lancamentoToEdit) {
                dom.data043Input.value = lancamentoToEdit.data;
                dom.loja043Select.value = lancamentoToEdit.loja;
                dom.tipoLancamentoSelect.value = lancamentoToEdit.tipo;
                dom.valor043Input.value = utils.formatCurrency(lancamentoToEdit.valor);
                dom.descricao043Textarea.value = lancamentoToEdit.descricao;
                dom.form043.dataset.editingId = id;
                tabManager.switchSubTab('inclusao-043', 'controle-043-container');
            }
        },
        deleteLancamento: (id) => {
            if (confirm('Tem certeza que deseja excluir este lançamento?')) {
                state.lancamentos = state.lancamentos.filter(l => l.id !== id);
                utils.saveData();
                controle043Module.searchLancamentos();
                utils.displayMessage('Lançamento excluído com sucesso!');
            }
        },
        preencherFiltrosRelatorio: () => {
            const lancamentoYears = [...new Set(state.lancamentos.map(l => new Date(l.data).getFullYear()))].sort((a, b) => b - a);
            dom.reportSearchAno043.innerHTML = `<option value="">Todos os Anos</option>` + lancamentoYears.map(year => `<option value="${year}">${year}</option>`).join('');
        },
        generateReport: () => {
            const { reportSearchLoja043, reportSearchData043, reportSearchMes043, reportSearchAno043, reportSearchTipo043, relatorioTipo043 } = dom;
            const lancamentosRelatorio = state.lancamentos.filter(l => {
                const lancamentoDate = new Date(l.data + 'T00:00:00');
                return (
                    (!reportSearchLoja043.value || l.loja === reportSearchLoja043.value) &&
                    (!reportSearchData043.value || l.data === reportSearchData043.value) &&
                    (!reportSearchMes043.value || (lancamentoDate.getMonth() + 1).toString().padStart(2, '0') === reportSearchMes043.value) &&
                    (!reportSearchAno043.value || lancamentoDate.getFullYear().toString() === reportSearchAno043.value) &&
                    (!reportSearchTipo043.value || l.tipo === reportSearchTipo043.value)
                );
            });
        
            if (relatorioTipo043.value === 'soma-total') {
                controle043Module.renderReportSintetico(lancamentosRelatorio);
            } else {
                controle043Module.renderReportDetalhado(lancamentosRelatorio);
            }
            dom.btnExportExcel043.style.display = 'block';
        },
        renderReportDetalhado: (lista) => {
            let totalCredito = 0;
            let totalDebito = 0;
            const html = lista.map(l => {
                if (l.tipo === 'Credito') totalCredito += l.valor;
                else totalDebito += l.valor;
                return `
                    <tr>
                        <td>${utils.formatDateToBR(l.data)}</td>
                        <td>${l.loja}</td>
                        <td class="valor-${l.tipo.toLowerCase()}">${l.tipo}</td>
                        <td>${utils.formatCurrency(l.valor)}</td>
                        <td>${l.descricao || '-'}</td>
                    </tr>
                `;
            }).join('');
            const saldo = totalCredito - totalDebito;
            dom.reportResults043Div.innerHTML = `
                <div class="table-container">
                    <table id="tabela-relatorio-043">
                        <thead class="table-header">
                            <tr><th>Data</th><th>Loja</th><th>Tipo</th><th>Valor</th><th>Descrição</th></tr>
                        </thead>
                        <tbody>${html}</tbody>
                    </table>
                </div>
                <div class="summary-block">
                    <h4>Totais de Lançamentos</h4>
                    <p>Total de Créditos: <span class="valor-credito">${utils.formatCurrency(totalCredito)}</span></p>
                    <p>Total de Débitos: <span class="valor-debito">${utils.formatCurrency(totalDebito)}</span></p>
                    <p>Saldo: <span class="valor-saldo">${utils.formatCurrency(saldo)}</span></p>
                </div>
            `;
        },
        renderReportSintetico: (lista) => {
            const { summary, grandTotalCredito, grandTotalDebito } = utils.groupAndSumByDate(lista);
            const saldoGeral = grandTotalCredito - grandTotalDebito;
            const html = summary.map(day => `
                <tr>
                    <td>${utils.formatDateToBR(day.data)}</td>
                    <td class="valor-credito">${utils.formatCurrency(day.credito)}</td>
                    <td class="valor-debito">${utils.formatCurrency(day.debito)}</td>
                    <td class="valor-saldo">${utils.formatCurrency(day.totalDia)}</td>
                </tr>
            `).join('');
            dom.reportResults043Div.innerHTML = `
                <div class="table-container">
                    <table id="tabela-relatorio-043" class="tabela-sintetico">
                        <thead class="table-header">
                            <tr><th>Data</th><th>Créditos</th><th>Débitos</th><th>Total do Dia</th></tr>
                        </thead>
                        <tbody>${html}</tbody>
                    </table>
                </div>
                <div class="summary-block">
                    <h4>Totais de Lançamentos</h4>
                    <p>Total de Créditos: <span class="valor-credito">${utils.formatCurrency(grandTotalCredito)}</span></p>
                    <p>Total de Débitos: <span class="valor-debito">${utils.formatCurrency(grandTotalDebito)}</span></p>
                    <p>Saldo: <span class="valor-saldo">${utils.formatCurrency(saldo)}</span></p>
                </div>
            `;
        },
        exportExcel: () => {
            const table = document.getElementById('tabela-relatorio-043');
            if (!table) {
                utils.displayMessage("Nenhum relatório para exportar.");
                return;
            }
            const worksheet = XLSX.utils.table_to_sheet(table);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório 043');
            XLSX.writeFile(workbook, 'relatorio_043.xlsx');
        }
    };
    
    const financeiroModule = {
        preencherCampos: () => {
            const today = new Date();
            dom.anoMensalSelect.innerHTML = `<option value="${today.getFullYear()}">${today.getFullYear()}</option>`;
            dom.mesMensalSelect.value = (today.getMonth() + 1).toString().padStart(2, '0');
            dom.lojaMensalSelect.value = 'Hero Joquei';
            dom.formLancamentoMensal.dataset.editingId = '';
            financeiroModule.resetForm();
            financeiroModule.preencherFiltrosRelatorio();
            financeiroModule.preencherFiltrosConsulta();
        },
        resetForm: () => {
            dom.caixaEconomicaInput.value = '';
            dom.cofreInput.value = '';
            dom.loteriaInput.value = '';
            dom.pagbankhInput.value = '';
            dom.pagbankdInput.value = '';
            dom.investimentoInput.value = '0,00';
            dom.lucroMesInput.value = 'R$ 0,00';
            dom.totalMensalInput.value = 'R$ 0,00';
        },
        calcularTotais: () => {
            const caixaEconomica = utils.parseMensalValue(dom.caixaEconomicaInput.value);
            const cofre = utils.parseMensalValue(dom.cofreInput.value);
            const loteria = utils.parseMensalValue(dom.loteriaInput.value);
            const pagbankh = utils.parseMensalValue(dom.pagbankhInput.value);
            const pagbankd = utils.parseMensalValue(dom.pagbankdInput.value);
            const investimento = utils.parseMensalValue(dom.investimentoInput.value);
            
            const lucroMes = caixaEconomica + cofre + loteria + pagbankh + pagbankd;
            const total = lucroMes + investimento;
            
            dom.lucroMesInput.value = utils.formatCurrency(lucroMes);
            dom.totalMensalInput.value = utils.formatCurrency(total);
        },
        submitForm: (e) => {
            e.preventDefault();
            const { lojaMensalSelect, anoMensalSelect, mesMensalSelect, formLancamentoMensal } = dom;
            const novoLancamentoMensal = {
                id: formLancamentoMensal.dataset.editingId ? parseInt(formLancamentoMensal.dataset.editingId) : Date.now(),
                loja: lojaMensalSelect.value,
                ano: anoMensalSelect.value,
                mes: mesMensalSelect.value,
                caixaEconomica: utils.parseMensalValue(dom.caixaEconomicaInput.value),
                cofre: utils.parseMensalValue(dom.cofreInput.value),
                loteria: utils.parseMensalValue(dom.loteriaInput.value),
                pagbankh: utils.parseMensalValue(dom.pagbankhInput.value),
                pagbankd: utils.parseMensalValue(dom.pagbankdInput.value),
                investimento: utils.parseMensalValue(dom.investimentoInput.value),
                lucroMes: utils.parseMensalValue(dom.lucroMesInput.value),
                total: utils.parseMensalValue(dom.totalMensalInput.value),
            };
            
            if (formLancamentoMensal.dataset.editingId) {
                const index = state.lancamentosMensais.findIndex(l => l.id === novoLancamentoMensal.id);
                if (index !== -1) {
                    state.lancamentosMensais[index] = novoLancamentoMensal;
                }
            } else {
                state.lancamentosMensais.push(novoLancamentoMensal);
            }
            
            utils.saveData();
            utils.displayMessage('Lançamento mensal salvo com sucesso!');
            financeiroModule.preencherCampos();
        },
        preencherFiltrosRelatorio: () => {
            const lancamentoMensalYears = [...new Set(state.lancamentosMensais.map(l => l.ano))].sort((a, b) => b - a);
            dom.relAnoMensalSelect.innerHTML = `<option value="">Todos os Anos</option>` + lancamentoMensalYears.map(year => `<option value="${year}">${year}</option>`).join('');
            dom.consAnoMensalSelect.innerHTML = dom.relAnoMensalSelect.innerHTML;
        },
        generateRelatorio: () => {
            const { relLojaMensalSelect, relAnoMensalSelect, relMesMensalSelect } = dom;
            const filteredAndSorted = state.lancamentosMensais.filter(l => {
                return (
                    (!relLojaMensalSelect.value || l.loja === relLojaMensalSelect.value) &&
                    (!relAnoMensalSelect.value || l.ano === relAnoMensalSelect.value) &&
                    (!relMesMensalSelect.value || l.mes === relMesMensalSelect.value)
                );
            }).sort((a, b) => {
                if (a.ano !== b.ano) return a.ano - b.ano;
                return parseInt(a.mes) - parseInt(b.mes);
            });
            
            const monthlyData = filteredAndSorted.reduce((acc, l) => {
                const key = `${l.ano}-${l.mes}`;
                acc[key] = acc[key] || { 'Hero Joquei': 0, 'Hero Shopping': 0, 'Hero Centro': 0, investimento: 0, total: 0 };
                acc[key][l.loja] = l.lucroMes;
                acc[key].investimento += l.investimento;
                acc[key].total += l.total;
                return acc;
            }, {});
            
            const sortedKeys = Object.keys(monthlyData).sort((a, b) => {
                const [anoA, mesA] = a.split('-').map(Number);
                const [anoB, mesB] = b.split('-').map(Number);
                if (anoA !== anoB) return anoA - anoB;
                return mesA - mesB;
            });
            
            let finalTotals = { 'Hero Joquei': 0, 'Hero Shopping': 0, 'Hero Centro': 0, investimento: 0, totalGeral: 0 };
            let tableRows = sortedKeys.map(key => {
                const [ano, mes] = key.split('-');
                const data = monthlyData[key];
                const lucroJoquei = data['Hero Joquei'] || 0;
                const lucroShopping = data['Hero Shopping'] || 0;
                const lucroCentro = data['Hero Centro'] || 0;
                const investimentoMensal = data.investimento || 0;
                const totalMensal = data.total || 0;
                
                finalTotals['Hero Joquei'] += lucroJoquei;
                finalTotals['Hero Shopping'] += lucroShopping;
                finalTotals['Hero Centro'] += lucroCentro;
                finalTotals.investimento += investimentoMensal;
                finalTotals.totalGeral += totalMensal;
            
                return `
                    <tr>
                        <td>${utils.getMonthName(parseInt(mes))}/${ano}</td>
                        <td>${utils.formatCurrency(lucroJoquei)}</td>
                        <td>${utils.formatCurrency(lucroShopping)}</td>
                        <td>${utils.formatCurrency(lucroCentro)}</td>
                        <td>${utils.formatCurrency(investimentoMensal)}</td>
                        <td>${utils.formatCurrency(totalMensal)}</td>
                    </tr>
                `;
            }).join('');
            
            dom.relatorioMensalResultadosDiv.innerHTML = `
                <h2>Relatório Mensal de Lucros</h2>
                <div class="table-container">
                    <table id="tabela-mensal-relatorio">
                        <thead class="table-header">
                            <tr><th>Mês/Ano</th><th>Lucro H. Joquei</th><th>Lucro H. Shopping</th><th>Lucro H. Centro</th><th>Investimento</th><th>Total</th></tr>
                        </thead>
                        <tbody>${tableRows}</tbody>
                    </table>
                </div>
                <div class="summary-block">
                    <h4>Totais Acumulados</h4>
                    <p>Lucro H. Joquei: ${utils.formatCurrency(finalTotals['Hero Joquei'])}</p>
                    <p>Lucro H. Shopping: ${utils.formatCurrency(finalTotals['Hero Shopping'])}</p>
                    <p>Lucro H. Centro: ${utils.formatCurrency(finalTotals['Hero Centro'])}</p>
                    <p>Investimento: ${utils.formatCurrency(finalTotals.investimento)}</p>
                    <p>Total Geral: ${utils.formatCurrency(finalTotals.totalGeral)}</p>
                </div>
            `;
            dom.btnExportExcelMensal.style.display = 'block';
        },
        exportExcel: () => {
            const table = document.getElementById('tabela-mensal-relatorio');
            const tableAcumulada = document.getElementById('tabela-acumulados-mensal');
            if (!table) {
                utils.displayMessage("Nenhum relatório para exportar.");
                return;
            }
            const worksheet = XLSX.utils.table_to_sheet(table);
            if (tableAcumulada) {
                XLSX.utils.sheet_add_aoa(worksheet, [['']], { origin: -1 });
                XLSX.utils.sheet_add_dom(worksheet, tableAcumulada, { origin: -1, skiprows: 1 });
            }
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório Mensal');
            XLSX.writeFile(workbook, 'relatorio_financeiro_mensal.xlsx');
        },
        preencherFiltrosConsulta: () => {
            const lancamentoMensalYears = [...new Set(state.lancamentosMensais.map(l => l.ano))].sort((a, b) => b - a);
            const options = `<option value="">Todos os Anos</option>` + lancamentoMensalYears.map(year => `<option value="${year}">${year}</option>`).join('');
            dom.consAnoMensalSelect.innerHTML = options;
        },
        searchLancamentos: () => {
            const { consLojaMensalSelect, consAnoMensalSelect, consMesMensalSelect } = dom;
            const resultados = state.lancamentosMensais.filter(l => {
                return (
                    (!consLojaMensalSelect.value || l.loja === consLojaMensalSelect.value) &&
                    (!consAnoMensalSelect.value || l.ano === consAnoMensalSelect.value) &&
                    (!consMesMensalSelect.value || l.mes === consMesMensalSelect.value)
                );
            }).sort((a, b) => {
                if (a.ano !== b.ano) return a.ano - b.ano;
                return parseInt(a.mes) - parseInt(b.mes);
            });
            financeiroModule.renderConsulta(resultados);
        },
        renderConsulta: (lista) => {
            const html = lista.map(l => `
                <tr>
                    <td>${l.loja}</td>
                    <td>${utils.getMonthName(parseInt(l.mes))}/${l.ano}</td>
                    <td>${utils.formatCurrency(l.caixaEconomica)}</td>
                    <td>${utils.formatCurrency(l.cofre)}</td>
                    <td>${utils.formatCurrency(l.loteria)}</td>
                    <td>${utils.formatCurrency(l.pagbankh)}</td>
                    <td>${utils.formatCurrency(l.pagbankd)}</td>
                    <td>${utils.formatCurrency(l.investimento)}</td>
                    <td>${utils.formatCurrency(l.lucroMes)}</td>
                    <td>${utils.formatCurrency(l.total)}</td>
                    <td class="action-buttons">
                        <button class="btn-action btn-edit-mensal" data-id="${l.id}">Editar</button>
                        <button class="btn-action btn-delete-mensal" data-id="${l.id}">Excluir</button>
                    </td>
                </tr>
            `).join('');
            
            dom.consultaMensalResultadosDiv.innerHTML = `
                <h2>Resultados da Consulta</h2>
                <div class="table-container">
                    <table id="tabela-consulta-mensal">
                        <thead class="table-header">
                            <tr><th>Loja</th><th>Mês/Ano</th><th>Caixa Econômica</th><th>Cofre</th><th>Loteria</th><th>PagBank H</th><th>PagBank D</th><th>Investimento</th><th>Lucro Mês</th><th>Total</th><th>Ações</th></tr>
                        </thead>
                        <tbody>${html}</tbody>
                    </table>
                </div>
            `;
        },
        handleConsultaClick: (e) => {
            const { target } = e;
            const id = parseInt(target.dataset.id);
            if (!id) return;
        
            if (target.classList.contains('btn-edit-mensal')) {
                financeiroModule.editLancamento(id);
            } else if (target.classList.contains('btn-delete-mensal')) {
                financeiroModule.deleteLancamento(id);
            }
        },
        editLancamento: (id) => {
            const lancamentoToEdit = state.lancamentosMensais.find(l => l.id === id);
            if (lancamentoToEdit) {
                const { lojaMensalSelect, anoMensalSelect, mesMensalSelect, caixaEconomicaInput, cofreInput, loteriaInput, pagbankhInput, pagbankdInput, investimentoInput, lucroMesInput, totalMensalInput, formLancamentoMensal } = dom;
                lojaMensalSelect.value = lancamentoToEdit.loja;
                anoMensalSelect.innerHTML = `<option value="${lancamentoToEdit.ano}">${lancamentoToEdit.ano}</option>`;
                mesMensalSelect.value = lancamentoToEdit.mes;
                
                caixaEconomicaInput.value = utils.formatCurrency(lancamentoToEdit.caixaEconomica);
                cofreInput.value = utils.formatCurrency(lancamentoToEdit.cofre);
                loteriaInput.value = utils.formatCurrency(lancamentoToEdit.loteria);
                pagbankhInput.value = utils.formatCurrency(lancamentoToEdit.pagbankh);
                pagbankdInput.value = utils.formatCurrency(lancamentoToEdit.pagbankd);
                investimentoInput.value = utils.formatCurrency(lancamentoToEdit.investimento);
                lucroMesInput.value = utils.formatCurrency(lancamentoToEdit.lucroMes);
                totalMensalInput.value = utils.formatCurrency(lancamentoToEdit.total);
                
                formLancamentoMensal.dataset.editingId = id;
                tabManager.switchSubTab('lancamento-mensal', 'financeiro-container');
            }
        },
        deleteLancamento: (id) => {
            if (confirm('Tem certeza que deseja excluir este lançamento mensal?')) {
                state.lancamentosMensais = state.lancamentosMensais.filter(l => l.id !== id);
                utils.saveData();
                financeiroModule.searchLancamentos();
                utils.displayMessage('Lançamento mensal excluído com sucesso!');
            }
        }
    };
    
    const camposModule = {
        renderCampos: () => {
            camposModule.renderList(state.produtos, dom.listaProdutosCampos, 'produtos');
            camposModule.renderList(state.marcas, dom.listaMarcasCampos, 'marcas');
            camposModule.renderList(state.fornecedores, dom.listaFornecedoresCampos, 'fornecedores');
        },
        renderList: (list, ulElement, type) => {
            ulElement.innerHTML = '';
            const fragment = document.createDocumentFragment();
            list.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="item-text">${item}</span>
                    <div class="action-buttons">
                        <button class="btn-action btn-edit-campo" data-index="${index}" data-type="${type}">Editar</button>
                        <button class="btn-action btn-delete-campo" data-index="${index}" data-type="${type}">Excluir</button>
                    </div>
                `;
                fragment.appendChild(li);
            });
            ulElement.appendChild(fragment);
        },
        addCampo: (list, inputElement) => {
            const value = inputElement.value.trim();
            if (value && !list.includes(value)) {
                list.push(value);
                list.sort();
                utils.saveData();
                inputElement.value = '';
                camposModule.renderCampos();
                pedidosModule.updateDatalists();
                utils.displayMessage('Cadastrado com sucesso!');
            }
        },
        handleCamposClick: (e) => {
            const { target } = e;
            const li = target.closest('li');
            if (!li) return;
        
            const index = parseInt(target.dataset.index);
            const type = target.dataset.type;
            let list = state[type];
        
            if (target.classList.contains('btn-delete-campo')) {
                camposModule.deleteCampo(list, index, type);
            } else if (target.classList.contains('btn-edit-campo')) {
                camposModule.editCampo(li, list[index], index, type);
            } else if (target.classList.contains('btn-confirm')) {
                const input = li.querySelector('.edit-input');
                const newValue = input.value.trim();
                if (newValue && !list.includes(newValue)) {
                    list[index] = newValue;
                    list.sort();
                    utils.saveData();
                    camposModule.renderCampos();
                    pedidosModule.updateDatalists();
                    utils.displayMessage('Editado com sucesso!');
                } else {
                    utils.displayMessage('Valor inválido ou já existente.');
                }
            }
        },
        deleteCampo: (list, index, type) => {
            if (confirm(`Tem certeza que deseja excluir este(a) ${type.slice(0, -1)}?`)) {
                list.splice(index, 1);
                utils.saveData();
                camposModule.renderCampos();
                pedidosModule.updateDatalists();
                utils.displayMessage('Excluído com sucesso!');
            }
        },
        editCampo: (li, oldValue, index, type) => {
            li.innerHTML = `
                <input type="text" class="edit-input" value="${oldValue}" required>
                <div class="action-buttons">
                    <button class="btn-action btn-confirm" data-index="${index}" data-type="${type}">Salvar</button>
                </div>
            `;
            li.querySelector('.edit-input').focus();
        }
    };

    const backupModule = {
        exportData: () => {
            const data = {};
            for (const key in state) {
                if (Object.hasOwnProperty.call(state, key)) {
                    data[key] = state[key];
                }
            }
            
            const jsonContent = JSON.stringify(data, null, 2);
            
            const blob = new Blob([jsonContent], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `backup_sistema_hero_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            URL.revokeObjectURL(url);
            utils.displayMessage('Backup dos dados exportado com sucesso!');
        },
        importData: (e) => {
            const file = e.target.files[0];
            if (!file) {
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedData = JSON.parse(event.target.result);
                    
                    if (confirm('Atenção: Isso irá substituir todos os dados atuais do sistema. Tem certeza?')) {
                        for (const key in importedData) {
                            if (Object.hasOwnProperty.call(importedData, key)) {
                                state[key] = importedData[key];
                                localStorage.setItem(key, JSON.stringify(importedData[key]));
                            }
                        }
                        utils.displayMessage('Dados restaurados com sucesso! O aplicativo será recarregado.');
                        location.reload();
                    }
                } catch (error) {
                    utils.displayMessage('Erro ao importar o arquivo. Verifique se o arquivo está no formato JSON correto.');
                    console.error('Erro de importação:', error);
                }
            };
            reader.readAsText(file);
        }
    };
    
    // 6. Configuração de Eventos
    const setupEventListeners = () => {
        dom.mainTabButtons.forEach(button => button.addEventListener('click', () => tabManager.switchMainTab(button.dataset.target)));
        dom.subTabButtons.forEach(button => button.addEventListener('click', () => tabManager.switchSubTab(button.dataset.target, button.closest('.main-tab-content').id)));
        dom.headerApp.addEventListener('click', () => tabManager.switchMainTab('pedidos-container'));
        dom.formPedido.addEventListener('submit', pedidosModule.submitForm);
        dom.form043.addEventListener('submit', controle043Module.submitForm);
        dom.formLancamentoMensal.addEventListener('submit', financeiroModule.submitForm);
        dom.btnDataHoje.addEventListener('click', () => dom.dataEntregaInput.value = new Date().toISOString().split('T')[0]);
        dom.valorUnidadeInput.addEventListener('input', pedidosModule.handleInputMask);
        dom.quantidadePedidaInput.addEventListener('input', pedidosModule.handleInputMask);
        dom.valor043Input.addEventListener('input', pedidosModule.handleInputMask);
        document.querySelectorAll('.mensal-value-input').forEach(input => input.addEventListener('input', pedidosModule.handleInputMask));
        dom.btnSearch.addEventListener('click', pedidosModule.searchPedidos);
        dom.resultsContainer.addEventListener('click', pedidosModule.handleTableClick);
        dom.resultsContainer.addEventListener('change', pedidosModule.handleCheckboxChange);
        dom.btnGenerateReport.addEventListener('click', pedidosModule.generateReport);
        dom.btnExportExcel.addEventListener('click', pedidosModule.exportExcel);
        dom.btnSearch043.addEventListener('click', controle043Module.searchLancamentos);
        dom.results043Div.addEventListener('click', controle043Module.handleResultsClick);
        dom.btnGenerateReport043.addEventListener('click', controle043Module.generateReport);
        dom.btnExportExcel043.addEventListener('click', controle043Module.exportExcel);
        dom.btnGenerateRelatorioMensal.addEventListener('click', financeiroModule.generateRelatorio);
        dom.btnExportExcelMensal.addEventListener('click', financeiroModule.exportExcel);
        dom.btnSearchMensal.addEventListener('click', financeiroModule.searchLancamentos);
        dom.consultaMensalResultadosDiv.addEventListener('click', financeiroModule.handleConsultaClick);
        dom.formProdutoAdd.addEventListener('submit', (e) => { e.preventDefault(); camposModule.addCampo(state.produtos, document.getElementById('input-produto-add')); });
        dom.formMarcaAdd.addEventListener('submit', (e) => { e.preventDefault(); camposModule.addCampo(state.marcas, document.getElementById('input-marca-add')); });
        dom.formFornecedorAdd.addEventListener('submit', (e) => { e.preventDefault(); camposModule.addCampo(state.fornecedores, document.getElementById('input-fornecedor-add')); });
        dom.listaProdutosCampos.addEventListener('click', camposModule.handleCamposClick);
        dom.listaMarcasCampos.addEventListener('click', camposModule.handleCamposClick);
        dom.listaFornecedoresCampos.addEventListener('click', camposModule.handleCamposClick);
        
        // Eventos para a nova seção de backup
        if (dom.btnExportBackup) dom.btnExportBackup.addEventListener('click', backupModule.exportData);
        if (dom.btnImportBackup) {
            dom.btnImportBackup.addEventListener('click', () => {
                dom.importFileInput.click();
            });
            dom.importFileInput.addEventListener('change', backupModule.importData);
        }
    };

    // 7. Inicialização
    const init = () => {
        setupEventListeners();
        tabManager.switchMainTab('pedidos-container');
        pedidosModule.updateDatalists();
    };
    init();

});